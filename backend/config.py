"""
Smart Farmer System — Configuration
"""

import os
from dotenv import load_dotenv

load_dotenv()

# ============================================
# API KEY
# ============================================
OPENWEATHERMAP_API_KEY = os.getenv('OPENWEATHERMAP_API_KEY', '').strip()
if not OPENWEATHERMAP_API_KEY:
    print("WARNING: OPENWEATHERMAP_API_KEY not found in .env")

# ============================================
# PATHS
# ============================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
MODEL_DIR = os.path.join(BASE_DIR, 'models')

CROP_DATA_FILE = os.path.join(DATA_DIR, 'Crop_recommendation.csv')
FERTILIZER_DATA_FILE = os.path.join(DATA_DIR, 'fertilizer_recommendation.csv')

CROP_MODEL_FILE = os.path.join(MODEL_DIR, 'crop_model.pkl')
CROP_ENCODER_FILE = os.path.join(MODEL_DIR, 'crop_encoder.pkl')
FERTILIZER_MODEL_FILE = os.path.join(MODEL_DIR, 'fertilizer_model.pkl')
FERTILIZER_ENCODER_FILE = os.path.join(MODEL_DIR, 'fertilizer_encoder.pkl')
SOIL_ENCODER_FILE = os.path.join(MODEL_DIR, 'soil_encoder.pkl')
CROP_TYPE_ENCODER_FILE = os.path.join(MODEL_DIR, 'crop_type_encoder.pkl')

DEFAULT_COUNTRY_CODE = "IN"

# ============================================
# CROP PRICES (per kg in rupees)
# ============================================
CROP_PRICES = {
    'rice': 25, 'maize': 18, 'chickpea': 50, 'kidneybeans': 80,
    'pigeonpeas': 60, 'mothbeans': 55, 'mungbean': 70,
    'blackgram': 60, 'lentil': 55, 'pomegranate': 120,
    'banana': 25, 'mango': 60, 'grapes': 80, 'watermelon': 12,
    'muskmelon': 20, 'apple': 100, 'orange': 40, 'papaya': 20,
    'coconut': 15, 'cotton': 55, 'jute': 45, 'coffee': 250,
}

CROP_BASE_YIELD = {
    'rice': 4500, 'maize': 4000, 'chickpea': 1500, 'kidneybeans': 1200,
    'pigeonpeas': 1000, 'mothbeans': 800, 'mungbean': 900,
    'blackgram': 1000, 'lentil': 1200, 'pomegranate': 8000,
    'banana': 30000, 'mango': 10000, 'grapes': 20000,
    'watermelon': 25000, 'muskmelon': 15000, 'apple': 12000,
    'orange': 15000, 'papaya': 40000, 'coconut': 12000,
    'cotton': 1800, 'jute': 2500, 'coffee': 1500,
}

LABOR_COST_PER_HECTARE = 5000
OTHER_COST_PER_HECTARE = 5000

# ============================================
# FERTILIZER INFO
# ============================================
FERTILIZER_INFO = {
    "Urea":          {"npk": "46-0-0",   "qty_per_ha": 100, "cost_per_kg": 7},
    "DAP":           {"npk": "18-46-0",  "qty_per_ha": 50,  "cost_per_kg": 27},
    "MOP":           {"npk": "0-0-60",   "qty_per_ha": 40,  "cost_per_kg": 18},
    "NPK":           {"npk": "17-17-17", "qty_per_ha": 65,  "cost_per_kg": 22},
    "Compost":       {"npk": "2-1-1",    "qty_per_ha": 5000,"cost_per_kg": 2},
    "Zinc Sulphate": {"npk": "0-0-0+Zn", "qty_per_ha": 25,  "cost_per_kg": 45},
}

# ============================================
# PEST DATABASE
# ============================================
PEST_DATABASE = {
    'rice':   {'pests': ['Brown Plant Hopper', 'Stem Borer', 'Leaf Folder'],
               'organic': ['Neem oil 5ml/L', 'Light traps'],
               'chemical': ['Imidacloprid 17.8% SL']},
    'wheat':  {'pests': ['Armyworm', 'Aphids', 'Rust Disease'],
               'organic': ['Neem seed kernel extract 5%'],
               'chemical': ['Chlorpyrifos 20% EC']},
    'maize':  {'pests': ['Fall Armyworm', 'Shoot Borer'],
               'organic': ['Bt spray', 'Pheromone traps'],
               'chemical': ['Emamectin benzoate 5% SG']},
    'cotton': {'pests': ['Pink Bollworm', 'Whitefly'],
               'organic': ['Yellow sticky traps', 'Neem oil'],
               'chemical': ['Spinosad 45% SC']},
}

DEFAULT_PEST_INFO = {
    'pests': ['General insects', 'Soil-borne diseases'],
    'organic': ['Neem oil spray 5ml/L', 'Crop rotation'],
    'chemical': ['Consult local agriculture officer'],
}

# ============================================
# MARKET LOCATIONS (Simulated Mandi Data)
# ============================================
MARKET_LOCATIONS = {
    'Hyderabad': [
        {'name': 'Bowenpally Mandi', 'lat': 17.4700, 'lon': 78.4500},
        {'name': 'Gaddiannaram Mandi', 'lat': 17.3500, 'lon': 78.5300},
        {'name': 'Kukatpally Market', 'lat': 17.4900, 'lon': 78.3900},
        {'name': 'Mehdipatnam Mandi', 'lat': 17.3900, 'lon': 78.4400},
        {'name': 'Secunderabad Market', 'lat': 17.4400, 'lon': 78.5000},
    ],
    'Delhi': [
        {'name': 'Azadpur Mandi', 'lat': 28.7100, 'lon': 77.1800},
        {'name': 'Okhla Mandi', 'lat': 28.5600, 'lon': 77.2700},
        {'name': 'Ghazipur Mandi', 'lat': 28.6200, 'lon': 77.3200},
        {'name': 'Shahdara Market', 'lat': 28.6700, 'lon': 77.2900},
    ],
    'Mumbai': [
        {'name': 'Vashi APMC Market', 'lat': 19.0700, 'lon': 73.0000},
        {'name': 'Crawford Market', 'lat': 18.9500, 'lon': 72.8300},
        {'name': 'Dadar Market', 'lat': 19.0200, 'lon': 72.8400},
    ],
    'Bangalore': [
        {'name': 'Yeshwanthpur APMC', 'lat': 13.0200, 'lon': 77.5500},
        {'name': 'KR Market', 'lat': 12.9600, 'lon': 77.5800},
        {'name': 'Madiwala Market', 'lat': 12.9200, 'lon': 77.6200},
    ],
    'Chennai': [
        {'name': 'Koyambedu Market', 'lat': 13.0700, 'lon': 80.1900},
        {'name': 'Thiruvanmiyur Market', 'lat': 12.9800, 'lon': 80.2600},
    ],
    'default': [
        {'name': 'Central Agricultural Market', 'lat': 20.0, 'lon': 78.0},
        {'name': 'District Mandi', 'lat': 20.1, 'lon': 78.1},
        {'name': 'Block Market Yard', 'lat': 20.05, 'lon': 78.05},
    ]
}

VEGETABLE_PRICES = {
    'tomato': {'base': 25, 'unit': 'kg'},
    'potato': {'base': 18, 'unit': 'kg'},
    'onion': {'base': 30, 'unit': 'kg'},
    'brinjal': {'base': 22, 'unit': 'kg'},
    'cabbage': {'base': 15, 'unit': 'kg'},
    'cauliflower': {'base': 28, 'unit': 'kg'},
    'carrot': {'base': 35, 'unit': 'kg'},
    'green_chilli': {'base': 40, 'unit': 'kg'},
    'capsicum': {'base': 50, 'unit': 'kg'},
    'ladies_finger': {'base': 30, 'unit': 'kg'},
    'beans': {'base': 45, 'unit': 'kg'},
    'cucumber': {'base': 20, 'unit': 'kg'},
    'bitter_gourd': {'base': 35, 'unit': 'kg'},
    'ridge_gourd': {'base': 25, 'unit': 'kg'},
    'bottle_gourd': {'base': 18, 'unit': 'kg'},
    'drumstick': {'base': 55, 'unit': 'kg'},
    'spinach': {'base': 20, 'unit': 'kg'},
    'coriander': {'base': 60, 'unit': 'kg'},
    'mint': {'base': 50, 'unit': 'kg'},
}

# ============================================
# PESTICIDE/FERTILIZER EFFECTS ON SOIL
# ============================================
PESTICIDE_EFFECTS = {
    'Imidacloprid': {
        'type': 'Insecticide',
        'persistence': 'High (40-100 days)',
        'effects': [
            'Reduces beneficial soil microorganisms',
            'Toxic to earthworms at high concentrations',
            'Can leach into groundwater',
            'Affects pollinator insects near treated areas',
        ],
        'severity': 'high',
    },
    'Chlorpyrifos': {
        'type': 'Insecticide',
        'persistence': 'Moderate (14-60 days)',
        'effects': [
            'Disrupts soil microbial balance',
            'Toxic to aquatic organisms if runoff occurs',
            'Reduces nitrogen-fixing bacteria',
        ],
        'severity': 'high',
    },
    'Glyphosate': {
        'type': 'Herbicide',
        'persistence': 'Moderate (2-197 days)',
        'effects': [
            'Chelates essential micronutrients (Mn, Zn, Fe)',
            'May reduce beneficial mycorrhizal fungi',
            'Affects soil enzyme activity',
        ],
        'severity': 'medium',
    },
    'Neem oil': {
        'type': 'Organic pesticide',
        'persistence': 'Low (3-7 days)',
        'effects': [
            'Minimal soil impact — biodegrades quickly',
            'Safe for earthworms and beneficial insects',
        ],
        'severity': 'low',
    },
    'Spinosad': {
        'type': 'Bio-insecticide',
        'persistence': 'Low (1-7 days)',
        'effects': [
            'Low toxicity to soil organisms',
            'Biodegrades rapidly in soil',
        ],
        'severity': 'low',
    },
    'Emamectin benzoate': {
        'type': 'Insecticide',
        'persistence': 'Moderate (7-14 days)',
        'effects': [
            'Moderate impact on soil organisms',
            'Binds to soil particles reducing leaching risk',
        ],
        'severity': 'medium',
    },
}

FERTILIZER_EFFECTS = {
    'Urea': {
        'effects': [
            'Increases soil acidity over time',
            'Can cause nitrogen leaching into groundwater',
            'Reduces soil organic matter if used excessively',
            'May lead to ammonia volatilization losses',
        ],
        'severity': 'medium',
    },
    'DAP': {
        'effects': [
            'Can increase soil acidity slightly',
            'Excessive use leads to phosphorus buildup',
            'May cause zinc deficiency in soil',
        ],
        'severity': 'medium',
    },
    'MOP': {
        'effects': [
            'High chloride content can damage salt-sensitive crops',
            'May increase soil salinity over time',
        ],
        'severity': 'medium',
    },
    'NPK': {
        'effects': [
            'Balanced impact on soil when used correctly',
            'Excessive use can still cause nutrient imbalance',
        ],
        'severity': 'low',
    },
    'Compost': {
        'effects': [
            'Improves soil structure and water retention',
            'Enhances beneficial microbial activity',
            'Minimal negative effects — highly recommended',
        ],
        'severity': 'low',
    },
}

# ============================================
# CARBON EMISSION FACTORS (IPCC 2019 / FAO)
# Source: IPCC 2019 Refinement, Vol 4, Ch 5 & 11
# Units: kg CO2-equivalent per hectare per season
# ============================================

# Crop-specific emissions (kg CO2e/ha/season)
# Includes: field emissions (CH4 for rice, N2O from soil),
# energy for cultivation, residue decomposition
# Source: IPCC 2006 GL Vol4 Ch5 (rice CH4), Ch11 (N2O)
CROP_CARBON_EMISSIONS = {
    'rice': {
        'field_emission': 3800,      # CH4 from flooded paddies: ~1.3 kg CH4/ha/day x 120 days x 25 GWP = 3900, adjusted for intermittent flooding
        'cultivation_energy': 350,    # Diesel for puddling, transplanting
        'residue_decomposition': 180, # Straw decomposition
        'total': 4330,
        'source': 'IPCC 2006 Vol4 Ch5 Table 5.11 - Baseline EF 1.30 kg CH4/ha/day'
    },
    'wheat': {
        'field_emission': 450,       # N2O from soil: ~1% of applied N (100kg N/ha) x 44/28 x 265 GWP
        'cultivation_energy': 280,
        'residue_decomposition': 120,
        'total': 850,
        'source': 'IPCC 2019 Vol4 Ch11 Table 11.1 - EF1 = 0.01 kg N2O-N/kg N'
    },
    'maize': {
        'field_emission': 380,
        'cultivation_energy': 300,
        'residue_decomposition': 150,
        'total': 830,
        'source': 'IPCC 2019 Vol4 Ch11 - Direct N2O + energy use'
    },
    'cotton': {
        'field_emission': 520,
        'cultivation_energy': 420,
        'residue_decomposition': 100,
        'total': 1040,
        'source': 'IPCC 2019 Vol4 Ch11 + high pesticide energy input'
    },
    'sugarcane': {
        'field_emission': 600,
        'cultivation_energy': 380,
        'residue_decomposition': 250,
        'total': 1230,
        'source': 'IPCC 2019 Vol4 Ch11 + trash burning emissions'
    },
    'chickpea': {
        'field_emission': 180,       # Legume - fixes N, lower emissions
        'cultivation_energy': 150,
        'residue_decomposition': 60,
        'total': 390,
        'source': 'IPCC 2019 Vol4 Ch11 - reduced EF for legumes'
    },
    'potato': {
        'field_emission': 350,
        'cultivation_energy': 320,
        'residue_decomposition': 80,
        'total': 750,
        'source': 'IPCC 2019 Vol4 Ch11'
    },
    'tomato': {
        'field_emission': 300,
        'cultivation_energy': 280,
        'residue_decomposition': 70,
        'total': 650,
        'source': 'IPCC 2019 Vol4 Ch11'
    },
    'banana': {
        'field_emission': 250,
        'cultivation_energy': 200,
        'residue_decomposition': 180,
        'total': 630,
        'source': 'FAO 2017 - Banana carbon footprint study'
    },
    'mango': {
        'field_emission': 150,
        'cultivation_energy': 180,
        'residue_decomposition': 80,
        'total': 410,
        'source': 'FAO perennial tree crop guidelines'
    },
    'coffee': {
        'field_emission': 280,
        'cultivation_energy': 350,
        'residue_decomposition': 120,
        'total': 750,
        'source': 'IPCC 2019 + ICO coffee lifecycle data'
    },
    'default': {
        'field_emission': 350,
        'cultivation_energy': 280,
        'residue_decomposition': 100,
        'total': 730,
        'source': 'IPCC 2019 Vol4 Ch11 - global average for annual crops'
    }
}

# Fertilizer manufacturing + field emission factors (kg CO2e per kg of fertilizer)
# Source: IPCC 2006 GL Vol4 Ch11 + IFA Fertilizer Industry Handbook 2018
FERTILIZER_CARBON_FACTORS = {
    'Urea': {
        'manufacturing': 3.5,        # kg CO2e/kg - Haber-Bosch process + transport
        'field_n2o': 2.3,            # 1% of 0.46 kg N per kg Urea x 44/28 x 265 GWP / kg
        'total_per_kg': 5.8,
        'source': 'IFA 2018 + IPCC 2019 Vol4 Ch11 EF1'
    },
    'DAP': {
        'manufacturing': 2.8,
        'field_n2o': 1.05,           # 18% N content
        'total_per_kg': 3.85,
        'source': 'IFA 2018 + IPCC EF for 18% N'
    },
    'MOP': {
        'manufacturing': 0.58,       # Mining + processing only, no N
        'field_n2o': 0.0,
        'total_per_kg': 0.58,
        'source': 'IFA 2018 - potash mining lifecycle'
    },
    'NPK': {
        'manufacturing': 2.1,
        'field_n2o': 0.99,           # 17% N content
        'total_per_kg': 3.09,
        'source': 'IFA 2018 + IPCC EF for 17% N'
    },
    'Compost': {
        'manufacturing': 0.1,        # Minimal - local production
        'field_n2o': 0.12,           # ~2% N, low emission
        'total_per_kg': 0.22,
        'source': 'IPCC 2019 Vol4 Ch11 Table 11.1 - organic amendments'
    },
    'Zinc Sulphate': {
        'manufacturing': 1.2,
        'field_n2o': 0.0,
        'total_per_kg': 1.2,
        'source': 'Industrial LCA data'
    },
    'SSP': {
        'manufacturing': 0.95,
        'field_n2o': 0.0,
        'total_per_kg': 0.95,
        'source': 'IFA 2018 - Single Super Phosphate'
    },
    'default': {
        'manufacturing': 2.0,
        'field_n2o': 1.0,
        'total_per_kg': 3.0,
        'source': 'IPCC default for mixed fertilizer'
    }
}

# Irrigation method emissions (kg CO2e/ha/season)
# Source: IPCC 2006 GL + Indian Agricultural Research Institute studies
IRRIGATION_CARBON_FACTORS = {
    'Flood': {
        'energy_emission': 800,      # Pumping large volumes
        'methane_bonus': 400,        # Additional CH4 from waterlogging
        'total': 1200,
        'source': 'IPCC 2006 Vol4 Ch5 + IARI pumping energy data'
    },
    'Sprinkler': {
        'energy_emission': 350,
        'methane_bonus': 0,
        'total': 350,
        'source': 'IARI irrigation energy benchmarks'
    },
    'Drip': {
        'energy_emission': 150,
        'methane_bonus': 0,
        'total': 150,
        'source': 'IARI - most efficient method'
    },
    'Rainfed': {
        'energy_emission': 0,
        'methane_bonus': 0,
        'total': 0,
        'source': 'Zero pumping energy'
    },
    'default': {
        'energy_emission': 400,
        'methane_bonus': 100,
        'total': 500,
        'source': 'Indian average'
    }
}

# Tillage practice emissions (kg CO2e/ha)
# Source: FAO Conservation Agriculture guidelines + IPCC
TILLAGE_CARBON_FACTORS = {
    'Conventional': {
        'fuel_emission': 180,        # Multiple passes with tractor
        'soil_carbon_loss': 250,     # Breaking soil releases stored C
        'total': 430,
        'source': 'FAO CA guidelines + IPCC 2019 Vol4 Ch5'
    },
    'Reduced': {
        'fuel_emission': 90,
        'soil_carbon_loss': 120,
        'total': 210,
        'source': 'FAO - 50% reduction from conventional'
    },
    'Zero': {
        'fuel_emission': 30,         # Only direct seeding
        'soil_carbon_loss': 0,       # Preserves soil carbon
        'total': 30,
        'source': 'FAO Zero-till guidelines'
    },
    'default': {
        'fuel_emission': 180,
        'soil_carbon_loss': 250,
        'total': 430,
        'source': 'Assumed conventional for India'
    }
}

# Carbon sequestration offsets (kg CO2e/ha/year SAVED)
# Source: IPCC 2019 Vol4 Ch5 Table 5.5 + FAO
CARBON_SEQUESTRATION = {
    'organic_farming': 500,          # Increased soil organic carbon
    'cover_crops': 350,              # Green manuring between seasons
    'agroforestry': 800,             # Trees on farmland
    'crop_residue_retention': 200,   # Not burning stubble
    'biochar_application': 600,      # Charcoal-based soil amendment
    'mulching': 150,                 # Moisture + carbon retention
}

# India national average for comparison
INDIA_AVG_CARBON_PER_HECTARE = 2500  # kg CO2e/ha/year (INCCA 2010 report)
GLOBAL_AVG_CARBON_PER_HECTARE = 3200 # kg CO2e/ha/year (FAO 2019 global avg)

SOIL_REMEDIATION = {
    'high_chemical_load': [
        'Apply 5-10 tonnes/hectare of farmyard manure (FYM) to rebuild soil biology',
        'Practice green manuring with dhaincha or sunhemp',
        'Use bio-fertilizers (Rhizobium, Azotobacter) to restore microbial balance',
        'Apply lime (2-4 tonnes/ha) if soil pH has dropped below 5.5',
        'Allow a fallow period of one season with cover crops',
    ],
    'moderate_chemical_load': [
        'Add 3-5 tonnes/hectare of vermicompost',
        'Use Trichoderma-based bio-fungicides to restore soil health',
        'Rotate with leguminous crops (moong, urad) to fix nitrogen naturally',
        'Reduce chemical fertilizer dose by 25% and supplement with organics',
    ],
    'low_chemical_load': [
        'Continue organic practices — soil is in good condition',
        'Add neem cake (200 kg/ha) as a soil conditioner',
        'Maintain crop rotation schedule',
    ],
    'general': [
        'Get soil tested every 6 months to monitor nutrient levels',
        'Use drip irrigation to reduce fertilizer runoff',
        'Mulch with crop residues to conserve moisture and add organic matter',
        'Avoid burning crop stubble — incorporate it into soil instead',
    ],
}
