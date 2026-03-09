from flask import Flask, request, jsonify
from flask_cors import CORS
from predictions import predict_crop, predict_fertilizer
from weather import get_weather, get_forecast
from config import (
    MARKET_LOCATIONS, VEGETABLE_PRICES, CROP_PRICES,
    PESTICIDE_EFFECTS, FERTILIZER_EFFECTS,
    SOIL_REMEDIATION
)
import random
import math

app = Flask(__name__)
CORS(app)


# ============================================
# HOME ROUTE
# ============================================
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "running",
        "app": "Smart Farmer AI",
        "version": "2.0",
        "endpoints": {
            "/api/health": "GET - Health check",
            "/api/weather": "GET - Current weather by city",
            "/api/forecast": "GET - 5-day forecast by city",
            "/api/predict/crop": "POST - Predict best crop",
            "/api/predict/fertilizer": "POST - Predict best fertilizer",
            "/api/market-prices": "POST - Market prices for crops",
            "/api/soil-analysis": "POST - Soil health analysis"
        }
    })


# ============================================
# HEALTH CHECK
# ============================================
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "message": "All systems running"})


# ============================================
# CURRENT WEATHER API
# ============================================
@app.route("/api/weather", methods=["GET"])
def weather():
    city = request.args.get("city", "").strip()

    if not city:
        return jsonify({"error": "City name required. Use ?city=Hyderabad"}), 400

    result = get_weather(city)

    if "error" in result:
        return jsonify(result), 400

    return jsonify(result)


# ============================================
# 5-DAY FORECAST API
# ============================================
@app.route("/api/forecast", methods=["GET"])
def forecast():
    city = request.args.get("city", "").strip()

    if not city:
        return jsonify({"error": "City name required. Use ?city=Hyderabad"}), 400

    result = get_forecast(city)

    if "error" in result:
        return jsonify(result), 400

    return jsonify(result)


# ============================================
# CROP PREDICTION API
# ============================================
@app.route("/api/predict/crop", methods=["POST"])
def crop_prediction():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided. Send JSON body"}), 400

        required = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
        missing = [f for f in required if f not in data]

        if missing:
            return jsonify({
                "error": f"Missing fields: {missing}",
                "required": required,
                "example": {
                    "N": 90, "P": 42, "K": 43,
                    "temperature": 25, "humidity": 82,
                    "ph": 6.5, "rainfall": 200
                }
            }), 400

        result = predict_crop(
            N=float(data["N"]),
            P=float(data["P"]),
            K=float(data["K"]),
            temperature=float(data["temperature"]),
            humidity=float(data["humidity"]),
            ph=float(data["ph"]),
            rainfall=float(data["rainfall"])
        )

        if "error" in result:
            return jsonify(result), 500

        return jsonify(result)

    except ValueError as e:
        return jsonify({"error": f"Invalid number format: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500


# ============================================
# FERTILIZER PREDICTION API
# ============================================
@app.route("/api/predict/fertilizer", methods=["POST"])
def fertilizer_prediction():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided. Send JSON body"}), 400

        required = [
            "soil_type", "soil_ph", "soil_moisture", "organic_carbon",
            "electrical_conductivity", "N", "P", "K",
            "temperature", "humidity", "rainfall",
            "crop_type", "growth_stage", "season",
            "irrigation", "previous_crop", "region",
            "fertilizer_usage", "yield_last"
        ]
        missing = [f for f in required if f not in data]

        if missing:
            return jsonify({
                "error": f"Missing fields: {missing}",
                "required": required,
                "example": {
                    "soil_type": "Loamy", "soil_ph": 6.5,
                    "soil_moisture": 40, "organic_carbon": 1.2,
                    "electrical_conductivity": 0.5,
                    "N": 30, "P": 20, "K": 15,
                    "temperature": 28, "humidity": 65,
                    "rainfall": 100, "crop_type": "Rice",
                    "growth_stage": "Vegetative", "season": "Kharif",
                    "irrigation": "Drip", "previous_crop": "Wheat",
                    "region": "North", "fertilizer_usage": "Urea",
                    "yield_last": 4000
                }
            }), 400

        result = predict_fertilizer(
            soil_type=str(data["soil_type"]),
            soil_ph=float(data["soil_ph"]),
            soil_moisture=float(data["soil_moisture"]),
            organic_carbon=float(data["organic_carbon"]),
            electrical_conductivity=float(data["electrical_conductivity"]),
            N=float(data["N"]),
            P=float(data["P"]),
            K=float(data["K"]),
            temperature=float(data["temperature"]),
            humidity=float(data["humidity"]),
            rainfall=float(data["rainfall"]),
            crop_type=str(data["crop_type"]),
            growth_stage=str(data["growth_stage"]),
            season=str(data["season"]),
            irrigation=str(data["irrigation"]),
            previous_crop=str(data["previous_crop"]),
            region=str(data["region"]),
            fertilizer_usage=str(data["fertilizer_usage"]),
            yield_last=float(data["yield_last"])
        )

        if "error" in result:
            return jsonify(result), 500

        return jsonify(result)

    except ValueError as e:
        return jsonify({"error": f"Invalid number format: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500


# ============================================
# MARKET PRICES API
# ============================================
@app.route("/api/market-prices", methods=["POST"])
def market_prices():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        crop = data.get("crop", "").strip().lower()
        location = data.get("location", "").strip()
        radius_km = float(data.get("radius_km", 50))

        if not crop:
            return jsonify({"error": "Crop name required"}), 400
        if not location:
            return jsonify({"error": "Location required"}), 400

        # Get base price
        all_prices = {**CROP_PRICES, **{k: v['base'] for k, v in VEGETABLE_PRICES.items()}}
        base_price = all_prices.get(crop.replace(' ', '_'), None)
        if base_price is None:
            # Fuzzy match
            for key, val in all_prices.items():
                if crop in key or key in crop:
                    base_price = val
                    crop = key
                    break
        if base_price is None:
            return jsonify({
                "error": f"Crop '{crop}' not found",
                "available_crops": sorted(list(all_prices.keys()))
            }), 400

        # Get markets for location
        markets_list = MARKET_LOCATIONS.get(location.title(), MARKET_LOCATIONS['default'])

        # Generate prices with realistic variation
        random.seed(hash(f"{crop}{location}") % 2**32)
        markets = []
        for i, m in enumerate(markets_list):
            variation = random.uniform(-0.25, 0.35)
            price = round(base_price * (1 + variation), 2)
            distance = round(random.uniform(3, min(radius_km, 80)), 1)

            markets.append({
                "name": m["name"],
                "distance_km": distance,
                "price_per_kg": price,
                "price_per_quintal": round(price * 100, 2),
                "price_per_bag": round(price * 50, 2),
                "trend": random.choice(["up", "down", "stable"]),
                "last_updated": "Today",
            })

        # Sort by distance
        markets.sort(key=lambda x: x["distance_km"])

        return jsonify({
            "crop": crop.replace('_', ' ').title(),
            "location": location.title(),
            "radius_km": radius_km,
            "markets": markets,
            "avg_price_per_kg": round(sum(m["price_per_kg"] for m in markets) / len(markets), 2),
            "min_price_per_kg": min(m["price_per_kg"] for m in markets),
            "max_price_per_kg": max(m["price_per_kg"] for m in markets),
            "best_market": min(markets, key=lambda x: -x["price_per_kg"])["name"],
        })

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500


# ============================================
# SOIL ANALYSIS API
# ============================================
@app.route("/api/soil-analysis", methods=["POST"])
def soil_analysis():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        previous_pesticides = data.get("previous_pesticides", [])
        previous_fertilizers = data.get("previous_fertilizers", [])
        soil_type = data.get("soil_type", "Unknown")
        previous_crop = data.get("previous_crop", "Unknown")

        if isinstance(previous_pesticides, str):
            previous_pesticides = [p.strip() for p in previous_pesticides.split(",") if p.strip()]
        if isinstance(previous_fertilizers, str):
            previous_fertilizers = [f.strip() for f in previous_fertilizers.split(",") if f.strip()]

        # Analyze pesticide effects
        pesticide_analysis = []
        max_severity = 'low'
        for pest in previous_pesticides:
            info = PESTICIDE_EFFECTS.get(pest, None)
            if info:
                pesticide_analysis.append({
                    "name": pest,
                    "type": info["type"],
                    "persistence": info["persistence"],
                    "effects": info["effects"],
                    "severity": info["severity"],
                })
                if info["severity"] == 'high':
                    max_severity = 'high'
                elif info["severity"] == 'medium' and max_severity != 'high':
                    max_severity = 'medium'
            else:
                pesticide_analysis.append({
                    "name": pest,
                    "type": "Unknown",
                    "persistence": "Unknown",
                    "effects": ["No data available for this pesticide. Consult local agriculture officer."],
                    "severity": "unknown",
                })

        # Analyze fertilizer effects
        fertilizer_analysis = []
        for fert in previous_fertilizers:
            info = FERTILIZER_EFFECTS.get(fert, None)
            if info:
                fertilizer_analysis.append({
                    "name": fert,
                    "effects": info["effects"],
                    "severity": info["severity"],
                })
                if info["severity"] == 'high':
                    max_severity = 'high'
                elif info["severity"] == 'medium' and max_severity != 'high':
                    max_severity = 'medium'
            else:
                fertilizer_analysis.append({
                    "name": fert,
                    "effects": ["No specific data available."],
                    "severity": "unknown",
                })

        # Determine soil health score
        score_map = {'low': 85, 'medium': 60, 'high': 35, 'unknown': 50}
        soil_health_score = score_map.get(max_severity, 50)

        # Get remediation solutions
        if max_severity == 'high':
            solutions = SOIL_REMEDIATION['high_chemical_load'] + SOIL_REMEDIATION['general']
        elif max_severity == 'medium':
            solutions = SOIL_REMEDIATION['moderate_chemical_load'] + SOIL_REMEDIATION['general']
        else:
            solutions = SOIL_REMEDIATION['general']

        return jsonify({
            "soil_health_score": soil_health_score,
            "overall_severity": max_severity,
            "pesticide_analysis": pesticide_analysis,
            "fertilizer_analysis": fertilizer_analysis,
            "remediation_solutions": solutions,
            "recommendation": "Maintain rich organic matter and avoid monocropping." if max_severity != 'high' else "Immediate organic remediation required. Stop chemical use."
        })

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500


# ============================================
# SOIL DATA (LOCATION BASED MOCK)
# ============================================
@app.route("/api/soil-data", methods=["GET"])
def get_soil_data():
    try:
        location = request.args.get("location", "").strip().lower()
        if not location:
            return jsonify({"error": "Location required"}), 400

        from predictions import REGION_SOIL_PROFILES
        
        # Simple string-matching heuristic against the defined Indian states/regions
        matched_profile = REGION_SOIL_PROFILES["default"]
        for region in REGION_SOIL_PROFILES.keys():
            if region != "default" and (region in location or location in region):
                matched_profile = REGION_SOIL_PROFILES[region]
                break
                
        # Optional: apply tiny random fuzz to make it look dynamic
        import random
        profile = dict(matched_profile)
        profile["N"] = max(0, profile["N"] + random.randint(-5, 5))
        profile["P"] = max(0, profile["P"] + random.randint(-5, 5))
        profile["K"] = max(0, profile["K"] + random.randint(-5, 5))
        profile["moisture"] = max(0, profile["moisture"] + random.randint(-5, 5))
        profile["ph"] = round(profile["ph"] + random.uniform(-0.3, 0.3), 1)

        return jsonify({
            "location": location.title(),
            "soil_profile": profile
        })
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

# ============================================
# START SERVER
# ============================================
if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("AGRI-CONNECT - API SERVER v2.0")
    print("=" * 60)
    print("Endpoints:")
    print("  GET  http://127.0.0.1:5000/")
    print("  GET  http://127.0.0.1:5000/api/health")
    print("  GET  http://127.0.0.1:5000/api/weather?city=Hyderabad")
    print("  GET  http://127.0.0.1:5000/api/forecast?city=Hyderabad")
    print("  POST http://127.0.0.1:5000/api/predict/crop")
    print("  POST http://127.0.0.1:5000/api/predict/fertilizer")
    print("  POST http://127.0.0.1:5000/api/market-prices")
    print("  POST http://127.0.0.1:5000/api/soil-analysis")
    print("=" * 60 + "\n")

    app.run(debug=True, port=5000)