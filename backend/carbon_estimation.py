"""
Carbon Estimation Module — Agri-Connect
Based on IPCC Tier 1 emission factors for Indian agriculture
Source: IPCC AR5, Indian GHG Inventory, DARE/ICAR research
"""

# ============================================
# IPCC TIER 1 EMISSION FACTORS
# kg CO2-equivalent per hectare per season
# ============================================

CROP_EMISSION_FACTORS = {
    'rice':         1320,   # Methane from flooded paddy — IPCC AR5 CH4 EF
    'wheat':         450,
    'maize':         380,
    'cotton':        520,
    'sugarcane':     680,
    'potato':        350,
    'tomato':        350,
    'vegetables':    350,
    'chickpea':      200,   # Nitrogen fixation offset lowers net
    'lentil':        200,
    'pigeonpeas':    200,
    'mungbean':      200,
    'blackgram':     200,
    'kidneybeans':   200,
    'mothbeans':     200,
    'mango':         280,
    'banana':        280,
    'grapes':        280,
    'apple':         280,
    'pomegranate':   280,
    'orange':        280,
    'papaya':        280,
    'coconut':       280,
    'watermelon':    350,
    'muskmelon':     350,
    'jute':          420,
    'coffee':        310,
}

# Fertilizer emission factors — kg CO2-eq per kg of fertilizer applied
# Source: IPCC 2006 Guidelines Vol 4 Ch 11
FERTILIZER_EMISSION_FACTORS = {
    'urea':     5.6,
    'dap':      3.2,
    'npk':      4.1,
    'compost':  0.5,
    'mop':      2.8,
    'none':     0.0,
}

# Irrigation emission factors — kg CO2-eq per hectare per season
# Source: Electricity consumption × Indian grid emission factor (0.82 kg CO2/kWh)
IRRIGATION_EMISSION_FACTORS = {
    'flood':       450,
    'sprinkler':   180,
    'drip':        120,
    'rainfed':       0,
}

# Tillage emission factors — kg CO2-eq per hectare
# Source: IPCC 2006 Vol 4 Ch 5 — soil carbon disturbance
TILLAGE_EMISSION_FACTORS = {
    'conventional':  200,
    'minimum':       100,
    'zero':           50,
    'no-till':        50,
}

# Residue management
RESIDUE_EMISSION_FACTORS = {
    'burned':        800,   # Open-field burning — CH4 + N2O + CO2 (IPCC 2006 Vol 4 Ch 2)
    'incorporated':    0,
    'removed':         0,
    'mulched':         0,
}

# Carbon sequestration offsets — kg CO2-eq per hectare (negative = sequestration)
SEQUESTRATION_FACTORS = {
    'compost_organic':  -150,
    'cover_cropping':   -200,
    'agroforestry':     -500,
    'biochar':          -350,
    'zero_tillage':      -80,
    'drip_irrigation':   -50,
}

# National averages by crop for comparison (kg CO2-eq/ha, based on DARE/ICAR estimates)
NATIONAL_AVERAGES = {
    'rice':         2100,
    'wheat':         890,
    'maize':         700,
    'cotton':        950,
    'sugarcane':    1200,
    'vegetables':    600,
    'potato':        600,
    'chickpea':      450,
    'lentil':        450,
    'mango':         500,
    'banana':        520,
    'default':       800,
}

# ============================================
# RATING THRESHOLDS
# ============================================

def get_rating(net_per_hectare, crop):
    """
    Rate the farm's carbon footprint compared to national average.
    A = excellent (≤50% of national avg)
    B = good (50–75%)
    C = average (75–110%)
    D = high (110–150%)
    E = very high (>150%)
    """
    national_avg = NATIONAL_AVERAGES.get(crop.lower(), NATIONAL_AVERAGES['default'])
    if national_avg == 0:
        return 'A'
    ratio = net_per_hectare / national_avg
    if ratio <= 0.50:
        return 'A'
    elif ratio <= 0.75:
        return 'B'
    elif ratio <= 1.10:
        return 'C'
    elif ratio <= 1.50:
        return 'D'
    else:
        return 'E'


def get_suggestions(breakdown, rating, practices, crop):
    """Generate actionable suggestions to reduce carbon footprint."""
    suggestions = []

    if breakdown.get('residue', 0) > 0:
        suggestions.append('Stop crop residue burning — incorporate residues into soil to save ~800 kg CO2-eq/ha and improve soil organic matter.')

    if breakdown.get('irrigation', 0) > 200:
        suggestions.append('Switch to drip irrigation from flood irrigation — saves ~330 kg CO2-eq/ha and reduces water use by 40%.')

    if breakdown.get('fertilizer', 0) > 300:
        suggestions.append('Reduce synthetic fertilizer use and replace 20–30% with compost or bio-fertilizers. Apply only recommended doses.')

    if breakdown.get('tillage', 0) > 100:
        suggestions.append('Adopt zero-tillage or minimum tillage — reduces soil carbon loss by ~150 kg CO2-eq/ha and lowers fuel costs.')

    if 'compost_organic' not in practices:
        suggestions.append('Apply compost or farmyard manure — sequesters ~150 kg CO2-eq/ha while improving soil health and yield.')

    if 'cover_cropping' not in practices:
        suggestions.append('Grow cover crops (green manure) in off-season — sequesters ~200 kg CO2-eq/ha and suppresses weeds.')

    if 'agroforestry' not in practices:
        suggestions.append('Plant boundary trees (agroforestry) — can offset ~500 kg CO2-eq/ha and provide additional income.')

    if crop.lower() == 'rice' and 'alternate_wetting' not in practices:
        suggestions.append('Use Alternate Wetting and Drying (AWD) technique for paddy — reduces methane emissions by 30–40%.')

    if rating in ('D', 'E'):
        suggestions.insert(0, 'Your farm has a HIGH carbon footprint. Prioritize residue management and irrigation changes for the biggest impact.')

    return suggestions[:5]  # Return top 5 suggestions


def calculate_carbon(
    crop,
    area_hectares,
    fertilizer_type,
    fertilizer_qty_kg,
    irrigation_type,
    tillage_type,
    residue_management,
    practices=None
):
    """
    Calculate carbon footprint for a farm using IPCC Tier 1 factors.

    Args:
        crop: Crop name (string)
        area_hectares: Farm area in hectares
        fertilizer_type: One of urea/dap/npk/compost/mop/none
        fertilizer_qty_kg: Total fertilizer quantity in kg (per season)
        irrigation_type: One of flood/sprinkler/drip/rainfed
        tillage_type: One of conventional/minimum/zero
        residue_management: One of burned/incorporated/removed/mulched
        practices: List of sustainable practices (compost_organic, cover_cropping, agroforestry, biochar, etc.)

    Returns:
        Dictionary with full carbon breakdown and recommendations
    """
    if practices is None:
        practices = []

    area = float(area_hectares)
    if area <= 0:
        raise ValueError(f"area_hectares must be greater than 0, got {area}")
    fert_qty = max(0.0, float(fertilizer_qty_kg))

    crop_key = crop.lower().replace(' ', '_').replace('-', '_')
    crop_ef = CROP_EMISSION_FACTORS.get(crop_key, CROP_EMISSION_FACTORS.get('vegetables', 350))

    fert_key = fertilizer_type.lower().strip()
    fert_ef = FERTILIZER_EMISSION_FACTORS.get(fert_key, 0)

    irr_key = irrigation_type.lower().strip()
    irr_ef = IRRIGATION_EMISSION_FACTORS.get(irr_key, 0)

    till_key = tillage_type.lower().strip()
    till_ef = TILLAGE_EMISSION_FACTORS.get(till_key, 200)

    res_key = residue_management.lower().strip()
    res_ef = RESIDUE_EMISSION_FACTORS.get(res_key, 0)

    # Per-hectare emissions
    crop_emissions = crop_ef
    fertilizer_emissions = (fert_ef * fert_qty) / area if area > 0 else 0
    irrigation_emissions = irr_ef
    tillage_emissions = till_ef
    residue_emissions = res_ef

    total_per_ha = (
        crop_emissions
        + fertilizer_emissions
        + irrigation_emissions
        + tillage_emissions
        + residue_emissions
    )

    # Sequestration from sustainable practices
    sequestration_per_ha = 0
    for practice in practices:
        p_key = practice.lower().strip()
        sequestration_per_ha += SEQUESTRATION_FACTORS.get(p_key, 0)

    net_per_ha = total_per_ha + sequestration_per_ha  # sequestration is negative

    # Scale to total farm
    total_emissions = round(total_per_ha * area, 1)
    sequestration_total = round(sequestration_per_ha * area, 1)
    net_emissions = round(net_per_ha * area, 1)

    # Rating
    rating = get_rating(max(0, net_per_ha), crop_key)

    # Breakdown
    breakdown = {
        'crop':        round(crop_emissions * area, 1),
        'fertilizer':  round(fertilizer_emissions * area, 1),
        'irrigation':  round(irrigation_emissions * area, 1),
        'tillage':     round(tillage_emissions * area, 1),
        'residue':     round(residue_emissions * area, 1),
    }

    # Suggestions
    breakdown_per_ha = {
        'crop':        crop_emissions,
        'fertilizer':  fertilizer_emissions,
        'irrigation':  irrigation_emissions,
        'tillage':     tillage_emissions,
        'residue':     residue_emissions,
    }
    suggestions = get_suggestions(breakdown_per_ha, rating, practices, crop_key)

    # Equivalents (for context)
    # Average Indian car emits ~120 g CO2/km
    # One tree sequesters ~21 kg CO2/year
    # One hour of flight ≈ 255 kg CO2 per passenger
    net_positive = max(0, net_emissions)
    equivalents = {
        'car_km':       round(net_positive / 0.12),      # km driven in average car
        'trees_needed': round(net_positive / 21),         # trees to plant to offset
        'flight_hours': round(net_positive / 255, 1),     # hours of domestic flight
    }

    national_avg_per_ha = NATIONAL_AVERAGES.get(crop_key, NATIONAL_AVERAGES['default'])

    return {
        'total_emissions_kg':   total_emissions,
        'per_hectare_emissions': round(total_per_ha, 1),
        'breakdown':            breakdown,
        'sequestration_kg':     sequestration_total,
        'net_emissions_kg':     net_emissions,
        'net_per_hectare':      round(net_per_ha, 1),
        'rating':               rating,
        'suggestions':          suggestions,
        'comparison': {
            'national_avg_per_ha':  national_avg_per_ha,
            'your_farm_per_ha':     round(max(0, net_per_ha), 1),
            'vs_national':          round((net_per_ha / national_avg_per_ha - 1) * 100, 1) if national_avg_per_ha else 0,
        },
        'equivalent': equivalents,
    }
