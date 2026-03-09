"""
Smart Farmer AI - Weather Module
Current weather + 5-Day Forecast + Farming Advisory
Uses OpenWeatherMap API
"""

import requests
from datetime import datetime
from config import OPENWEATHERMAP_API_KEY, DEFAULT_COUNTRY_CODE


def get_weather(city):
    """
    Fetch CURRENT weather for a city
    Returns: dict with all weather details
    """
    if not OPENWEATHERMAP_API_KEY:
        return {"error": "API key not configured. Add OPENWEATHERMAP_API_KEY to .env"}

    try:
        url = "http://api.openweathermap.org/data/2.5/weather"
        params = {
            "q": f"{city},{DEFAULT_COUNTRY_CODE}",
            "appid": OPENWEATHERMAP_API_KEY,
            "units": "metric"
        }

        response = requests.get(url, params=params, timeout=10)

        if response.status_code == 401:
            return {"error": "Invalid API key. Check your .env file"}
        if response.status_code == 404:
            return {"error": f"City '{city}' not found. Check spelling"}
        if response.status_code != 200:
            return {"error": f"API error: {response.status_code}"}

        data = response.json()

        rainfall = 0
        if "rain" in data:
            rainfall = data["rain"].get("1h", data["rain"].get("3h", 0))

        return {
            "city": data["name"],
            "temperature": round(data["main"]["temp"], 1),
            "feels_like": round(data["main"]["feels_like"], 1),
            "temp_min": round(data["main"]["temp_min"], 1),
            "temp_max": round(data["main"]["temp_max"], 1),
            "humidity": round(data["main"]["humidity"], 1),
            "pressure": data["main"]["pressure"],
            "rainfall": round(rainfall, 2),
            "description": data["weather"][0]["description"].title(),
            "wind_speed": data["wind"]["speed"],
            "icon": data["weather"][0]["icon"],
            "clouds": data["clouds"]["all"],
            "visibility": data.get("visibility", 0),
        }

    except requests.exceptions.Timeout:
        return {"error": "Request timed out. Try again"}
    except requests.exceptions.ConnectionError:
        return {"error": "No internet connection"}
    except Exception as e:
        return {"error": f"Unexpected error: {str(e)}"}


def get_forecast(city):
    """
    Fetch 5-DAY / 3-HOUR forecast for a city
    Returns daily summary with farming advisory
    """
    if not OPENWEATHERMAP_API_KEY:
        return {"error": "API key not configured"}

    try:
        url = "http://api.openweathermap.org/data/2.5/forecast"
        params = {
            "q": f"{city},{DEFAULT_COUNTRY_CODE}",
            "appid": OPENWEATHERMAP_API_KEY,
            "units": "metric"
        }

        response = requests.get(url, params=params, timeout=10)

        if response.status_code == 401:
            return {"error": "Invalid API key"}
        if response.status_code == 404:
            return {"error": f"City '{city}' not found"}
        if response.status_code != 200:
            return {"error": f"API error: {response.status_code}"}

        data = response.json()

        # Group by date
        daily = {}
        for item in data["list"]:
            date = item["dt_txt"].split(" ")[0]

            if date not in daily:
                daily[date] = {
                    "date": date,
                    "temps": [],
                    "humidity": [],
                    "rainfall": 0,
                    "descriptions": [],
                    "icons": [],
                    "wind_speeds": [],
                    "clouds": []
                }

            daily[date]["temps"].append(item["main"]["temp"])
            daily[date]["humidity"].append(item["main"]["humidity"])
            daily[date]["wind_speeds"].append(item["wind"]["speed"])
            daily[date]["descriptions"].append(item["weather"][0]["description"])
            daily[date]["icons"].append(item["weather"][0]["icon"])
            daily[date]["clouds"].append(item["clouds"]["all"])

            if "rain" in item:
                daily[date]["rainfall"] += item["rain"].get("3h", 0)

        # Build forecast
        forecast = []
        for date, info in list(daily.items())[:5]:
            day_name = datetime.strptime(date, "%Y-%m-%d").strftime("%A")
            short_day = datetime.strptime(date, "%Y-%m-%d").strftime("%a")

            forecast.append({
                "date": date,
                "day": day_name,
                "short_day": short_day,
                "temp_min": round(min(info["temps"]), 1),
                "temp_max": round(max(info["temps"]), 1),
                "temp_avg": round(sum(info["temps"]) / len(info["temps"]), 1),
                "humidity_avg": round(sum(info["humidity"]) / len(info["humidity"]), 1),
                "humidity_min": round(min(info["humidity"]), 1),
                "humidity_max": round(max(info["humidity"]), 1),
                "rainfall_total": round(info["rainfall"], 2),
                "wind_avg": round(sum(info["wind_speeds"]) / len(info["wind_speeds"]), 1),
                "cloud_avg": round(sum(info["clouds"]) / len(info["clouds"]), 1),
                "description": max(set(info["descriptions"]), key=info["descriptions"].count).title(),
                "icon": info["icons"][len(info["icons"]) // 2],
            })

        advisory = generate_advisory(forecast)

        return {
            "city": data["city"]["name"],
            "country": data["city"]["country"],
            "forecast": forecast,
            "advisory": advisory
        }

    except requests.exceptions.Timeout:
        return {"error": "Request timed out"}
    except requests.exceptions.ConnectionError:
        return {"error": "No internet connection"}
    except Exception as e:
        return {"error": f"Unexpected error: {str(e)}"}


def generate_advisory(forecast):
    """
    Smart farming advisory based on 5-day forecast
    """
    advisories = []

    total_rain = sum(day["rainfall_total"] for day in forecast)
    avg_temp = sum(day["temp_avg"] for day in forecast) / len(forecast)
    avg_humidity = sum(day["humidity_avg"] for day in forecast) / len(forecast)
    max_temp = max(day["temp_max"] for day in forecast)
    min_temp = min(day["temp_min"] for day in forecast)

    # Rain advisory
    if total_rain > 100:
        advisories.append({
            "type": "danger",
            "title": "HEAVY RAIN ALERT",
            "message": f"Total {total_rain:.1f}mm rain in 5 days! Protect crops. Ensure drainage. Delay harvesting."
        })
    elif total_rain > 50:
        advisories.append({
            "type": "warning",
            "title": "Heavy Rain Expected",
            "message": f"Total {total_rain:.1f}mm rain expected. Delay spraying. Check drainage channels."
        })
    elif total_rain > 20:
        advisories.append({
            "type": "info",
            "title": "Moderate Rain Expected",
            "message": f"Total {total_rain:.1f}mm rain expected. Good for crops. Reduce irrigation."
        })
    elif total_rain < 5:
        advisories.append({
            "type": "warning",
            "title": "Dry Weather Ahead",
            "message": "Very little rain expected. Increase irrigation. Use mulching to retain moisture."
        })

    # Temperature
    if max_temp > 42:
        advisories.append({
            "type": "danger",
            "title": "EXTREME HEAT ALERT",
            "message": f"Max temp {max_temp:.1f}C! Water crops early morning & evening. Use shade nets."
        })
    elif max_temp > 38:
        advisories.append({
            "type": "warning",
            "title": "Heat Wave Warning",
            "message": f"Max temp {max_temp:.1f}C. Increase watering. Avoid midday field work."
        })
    elif min_temp < 5:
        advisories.append({
            "type": "danger",
            "title": "FROST ALERT",
            "message": f"Min temp {min_temp:.1f}C! Cover seedlings. Protect sensitive crops from frost."
        })
    elif min_temp < 10:
        advisories.append({
            "type": "warning",
            "title": "Cold Weather Alert",
            "message": f"Min temp {min_temp:.1f}C. Cover tender plants at night."
        })

    # Humidity
    if avg_humidity > 85:
        advisories.append({
            "type": "warning",
            "title": "Very High Humidity - Disease Risk",
            "message": f"Avg humidity {avg_humidity:.0f}%. High risk of fungal/bacterial diseases. Spray fungicide."
        })
    elif avg_humidity > 75:
        advisories.append({
            "type": "info",
            "title": "High Humidity",
            "message": f"Avg humidity {avg_humidity:.0f}%. Monitor for leaf spot and blight diseases."
        })

    # Best spray day
    dry_days = [d for d in forecast if d["rainfall_total"] < 2 and d["wind_avg"] < 15]
    if dry_days:
        best_day = dry_days[0]
        advisories.append({
            "type": "tip",
            "title": "Best Day to Spray Pesticide/Fertilizer",
            "message": f"{best_day['day']} ({best_day['date']}) - Low rain, low wind. Ideal for spraying."
        })

    # Best irrigation day
    hot_dry = [d for d in forecast if d["temp_max"] > 32 and d["rainfall_total"] < 2]
    if hot_dry:
        advisories.append({
            "type": "tip",
            "title": "Irrigation Needed",
            "message": f"{len(hot_dry)} hot dry days ahead. Water crops early morning (6-8 AM) for best absorption."
        })

    # Harvest advisory
    consecutive_dry = 0
    for d in forecast:
        if d["rainfall_total"] < 2:
            consecutive_dry += 1
        else:
            break
    if consecutive_dry >= 3:
        advisories.append({
            "type": "tip",
            "title": "Good Harvest Window",
            "message": f"Next {consecutive_dry} days are dry. Good time to harvest if crop is ready."
        })

    if not advisories:
        advisories.append({
            "type": "info",
            "title": "Normal Weather",
            "message": "Weather looks good for farming. Continue regular schedule."
        })

    return advisories


# ============================================
# STANDALONE TEST
# ============================================
if __name__ == "__main__":
    W = 65

    city = "Hyderabad"

    print()
    print("+" + "-" * (W - 2) + "+")
    print("|" + " SMART FARMER AI - WEATHER MODULE ".center(W - 2) + "|")
    print("+" + "-" * (W - 2) + "+")

    # Current
    print("|" + f" CURRENT WEATHER - {city.upper()} ".center(W - 2, "-") + "|")
    current = get_weather(city)

    if "error" in current:
        print(f"|  Error: {current['error']:<{W-5}}|")
    else:
        print(f"|  City:        {current['city']:<{W-17}}|")
        print(f"|  Temperature: {current['temperature']}C (feels {current['feels_like']}C){' '*(W-45)}|")
        print(f"|  Range:       {current['temp_min']}C - {current['temp_max']}C{' '*(W-38)}|")
        print(f"|  Humidity:    {current['humidity']}%{' '*(W-22)}|")
        print(f"|  Rainfall:    {current['rainfall']}mm{' '*(W-23)}|")
        print(f"|  Weather:     {current['description']:<{W-17}}|")
        print(f"|  Wind:        {current['wind_speed']} m/s{' '*(W-26)}|")

    print("+" + "-" * (W - 2) + "+")

    # Forecast
    forecast = get_forecast(city)
    if "error" not in forecast:
        print("|" + " 5-DAY FORECAST ".center(W - 2, "-") + "|")
        for day in forecast["forecast"]:
            line = f"  {day['short_day']} {day['date']}  {day['temp_min']:5.1f}-{day['temp_max']:5.1f}C  H:{day['humidity_avg']:3.0f}%  R:{day['rainfall_total']:5.1f}mm  {day['description']}"
            print(f"|{line:<{W-2}}|")

        print("+" + "-" * (W - 2) + "+")
        print("|" + " FARMING ADVISORY ".center(W - 2, "-") + "|")
        for adv in forecast["advisory"]:
            if adv["type"] == "danger":
                icon = "[!!!]"
            elif adv["type"] == "warning":
                icon = "[!! ]"
            elif adv["type"] == "tip":
                icon = "[>> ]"
            else:
                icon = "[-- ]"

            title_line = f"  {icon} {adv['title']}"
            print(f"|{title_line:<{W-2}}|")

            # Word wrap message
            msg = adv["message"]
            max_msg = W - 12
            while msg:
                chunk = msg[:max_msg]
                msg = msg[max_msg:]
                print(f"|{'':>8}{chunk:<{W-10}}|")

    print("+" + "-" * (W - 2) + "+")
    print()