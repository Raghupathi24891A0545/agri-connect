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

# ============================================
# CROP CALENDAR — Region × Season × Crop
# ============================================
CROP_CALENDAR = {
    'rice': {
        'South': {
            'Kharif': {'sow': 'Jun 15 – Jul 15', 'harvest': 'Nov – Dec'},
            'Rabi':   {'sow': 'Dec – Jan',        'harvest': 'Apr – May'},
        },
        'North': {
            'Kharif': {'sow': 'Jun – Jul',         'harvest': 'Oct – Nov'},
        },
        'East': {
            'Kharif': {'sow': 'Jun – Jul',         'harvest': 'Oct – Nov'},
            'Rabi':   {'sow': 'Nov – Dec',         'harvest': 'Mar – Apr'},
        },
        'West': {
            'Kharif': {'sow': 'Jun 15 – Jul 15',  'harvest': 'Nov – Dec'},
        },
    },
    'wheat': {
        'North': {
            'Rabi': {'sow': 'Nov 1 – Dec 15', 'harvest': 'Mar – Apr'},
        },
        'Central': {
            'Rabi': {'sow': 'Nov – Dec',       'harvest': 'Mar – Apr'},
        },
        'South': {
            'Rabi': {'sow': 'Nov 15 – Dec 15', 'harvest': 'Mar – Apr'},
        },
        'East': {
            'Rabi': {'sow': 'Nov – Dec',       'harvest': 'Feb – Mar'},
        },
    },
    'maize': {
        'North': {
            'Kharif': {'sow': 'Jun – Jul',     'harvest': 'Sep – Oct'},
            'Rabi':   {'sow': 'Oct – Nov',     'harvest': 'Feb – Mar'},
        },
        'South': {
            'Kharif': {'sow': 'Jun – Jul',     'harvest': 'Sep – Oct'},
            'Rabi':   {'sow': 'Oct – Nov',     'harvest': 'Feb – Mar'},
            'Zaid':   {'sow': 'Jan – Feb',     'harvest': 'May – Jun'},
        },
        'East': {
            'Kharif': {'sow': 'Jun – Jul',     'harvest': 'Sep – Oct'},
        },
        'West': {
            'Kharif': {'sow': 'Jun – Jul',     'harvest': 'Sep – Oct'},
            'Rabi':   {'sow': 'Nov – Dec',     'harvest': 'Mar – Apr'},
        },
    },
    'cotton': {
        'North': {
            'Kharif': {'sow': 'Apr – May',     'harvest': 'Oct – Jan'},
        },
        'South': {
            'Kharif': {'sow': 'May – Jun',     'harvest': 'Nov – Feb'},
        },
        'Central': {
            'Kharif': {'sow': 'May – Jun',     'harvest': 'Oct – Jan'},
        },
        'West': {
            'Kharif': {'sow': 'May – Jun',     'harvest': 'Oct – Jan'},
        },
    },
    'sugarcane': {
        'North': {
            'Rabi': {'sow': 'Feb – Mar',       'harvest': 'Dec – Mar (14–16 months)'},
        },
        'South': {
            'Kharif': {'sow': 'Jun – Aug',     'harvest': 'Dec – Apr (14–18 months)'},
        },
        'West': {
            'Rabi': {'sow': 'Oct – Nov',       'harvest': 'Oct – Jan (12 months)'},
        },
    },
    'chickpea': {
        'North': {
            'Rabi': {'sow': 'Oct 15 – Nov 15', 'harvest': 'Feb – Mar'},
        },
        'Central': {
            'Rabi': {'sow': 'Oct – Nov',        'harvest': 'Feb – Mar'},
        },
        'South': {
            'Rabi': {'sow': 'Oct – Nov',        'harvest': 'Jan – Feb'},
        },
    },
    'tomato': {
        'North': {
            'Rabi':   {'sow': 'Oct – Nov (nursery)', 'harvest': 'Jan – Mar'},
            'Kharif': {'sow': 'Jun – Jul (nursery)', 'harvest': 'Aug – Oct'},
        },
        'South': {
            'Kharif': {'sow': 'Jun – Jul',     'harvest': 'Aug – Nov'},
            'Rabi':   {'sow': 'Oct – Nov',     'harvest': 'Dec – Feb'},
            'Zaid':   {'sow': 'Jan – Feb',     'harvest': 'Apr – Jun'},
        },
        'East': {
            'Rabi': {'sow': 'Oct – Nov',       'harvest': 'Jan – Mar'},
        },
        'West': {
            'Rabi': {'sow': 'Oct – Nov',       'harvest': 'Jan – Mar'},
            'Zaid': {'sow': 'Jan – Feb',       'harvest': 'Apr – Jun'},
        },
    },
    'potato': {
        'North': {
            'Rabi': {'sow': 'Oct – Nov',       'harvest': 'Feb – Mar'},
        },
        'East': {
            'Rabi': {'sow': 'Oct – Nov',       'harvest': 'Jan – Feb'},
        },
        'South': {
            'Rabi': {'sow': 'Nov – Dec',       'harvest': 'Feb – Mar'},
        },
    },
    'onion': {
        'North': {
            'Rabi': {'sow': 'Oct – Nov (nursery)', 'harvest': 'Mar – May'},
        },
        'South': {
            'Kharif': {'sow': 'Jun – Jul',     'harvest': 'Sep – Oct'},
            'Rabi':   {'sow': 'Oct – Dec',     'harvest': 'Feb – Apr'},
        },
        'West': {
            'Rabi': {'sow': 'Oct – Nov',       'harvest': 'Feb – Apr'},
        },
    },
    'soybean': {
        'North': {
            'Kharif': {'sow': 'Jun 20 – Jul 15', 'harvest': 'Sep – Oct'},
        },
        'Central': {
            'Kharif': {'sow': 'Jun – Jul',       'harvest': 'Sep – Oct'},
        },
        'West': {
            'Kharif': {'sow': 'Jun – Jul',       'harvest': 'Sep – Oct'},
        },
    },
    'groundnut': {
        'South': {
            'Kharif': {'sow': 'Jun – Jul',       'harvest': 'Oct – Nov'},
            'Rabi':   {'sow': 'Nov – Dec',       'harvest': 'Mar – Apr'},
        },
        'North': {
            'Kharif': {'sow': 'Jun – Jul',       'harvest': 'Oct – Nov'},
        },
        'West': {
            'Kharif': {'sow': 'Jun – Jul',       'harvest': 'Sep – Oct'},
        },
    },
    'mustard': {
        'North': {
            'Rabi': {'sow': 'Oct – Nov',         'harvest': 'Feb – Mar'},
        },
        'Central': {
            'Rabi': {'sow': 'Oct – Nov',         'harvest': 'Feb – Mar'},
        },
        'East': {
            'Rabi': {'sow': 'Oct – Nov',         'harvest': 'Feb – Mar'},
        },
    },
    'sunflower': {
        'South': {
            'Kharif': {'sow': 'Jun – Jul',       'harvest': 'Sep – Oct'},
            'Rabi':   {'sow': 'Oct – Nov',       'harvest': 'Feb – Mar'},
        },
        'North': {
            'Kharif': {'sow': 'Jun – Jul',       'harvest': 'Sep – Oct'},
            'Rabi':   {'sow': 'Jan – Feb',       'harvest': 'Apr – May'},
        },
    },
    'banana': {
        'South': {
            'Kharif': {'sow': 'May – Jun',       'harvest': '11–14 months after planting'},
        },
        'West': {
            'Kharif': {'sow': 'Jun – Jul',       'harvest': '11–14 months after planting'},
        },
    },
    'mango': {
        'South': {
            'Rabi': {'sow': 'Dec – Jan (grafts)','harvest': 'Apr – Jun (3–5 years after planting)'},
        },
        'North': {
            'Rabi': {'sow': 'Jan – Feb (grafts)','harvest': 'May – Jul (3–5 years after planting)'},
        },
    },
}

# ============================================
# GOVERNMENT SCHEMES
# ============================================
GOVT_SCHEMES = [
    {
        'id': 'pm_kisan',
        'name': 'PM-KISAN',
        'full_name': 'Pradhan Mantri Kisan Samman Nidhi',
        'ministry': 'Ministry of Agriculture & Farmers Welfare',
        'description': 'Direct income support of ₹6,000 per year to all land-holding farmer families, paid in 3 equal installments of ₹2,000 every 4 months.',
        'benefit_amount': '₹6,000/year (₹2,000 × 3 installments)',
        'eligibility': 'All land-holding farmer families with cultivable land. Excludes institutional landholders, income taxpayers, pensioners with ₹10,000+/month pension.',
        'how_to_apply': '1. Visit pmkisan.gov.in  2. Click "New Farmer Registration"  3. Enter Aadhaar number and bank details  4. State Agriculture Department verifies',
        'website': 'https://pmkisan.gov.in',
        'category': 'Income Support',
        'icon': '💰',
    },
    {
        'id': 'pmfby',
        'name': 'PMFBY',
        'full_name': 'Pradhan Mantri Fasal Bima Yojana',
        'ministry': 'Ministry of Agriculture & Farmers Welfare',
        'description': 'Comprehensive crop insurance scheme covering yield losses due to natural calamities, pests, and diseases.',
        'benefit_amount': 'Full insured sum for crop loss. Premium: 1.5% for Rabi, 2% for Kharif, 5% for commercial/horticulture',
        'eligibility': 'All farmers growing notified crops. Compulsory for loanee farmers, voluntary for others.',
        'how_to_apply': '1. Enroll at nearest Common Service Centre (CSC) or bank  2. Last date: 10 days before sowing  3. Submit land records, Aadhaar, and bank details',
        'website': 'https://pmfby.gov.in',
        'category': 'Crop Insurance',
        'icon': '🛡️',
    },
    {
        'id': 'kcc',
        'name': 'KCC',
        'full_name': 'Kisan Credit Card',
        'ministry': 'Ministry of Agriculture & Farmers Welfare / NABARD',
        'description': 'Provides farmers with affordable short-term credit for agricultural needs, post-harvest expenses, and allied activities.',
        'benefit_amount': 'Credit up to ₹3 lakh at 4% interest per annum (with 3% interest subvention from Government)',
        'eligibility': 'All farmers, tenant farmers, sharecroppers, SHGs/JLGs engaged in agriculture.',
        'how_to_apply': '1. Visit nearest bank or cooperative  2. Fill KCC application form  3. Submit land documents, ID proof  4. Card issued within 14 working days',
        'website': 'https://www.nabard.org/content.aspx?id=596',
        'category': 'Credit',
        'icon': '💳',
    },
    {
        'id': 'soil_health_card',
        'name': 'Soil Health Card Scheme',
        'full_name': 'Soil Health Card Scheme',
        'ministry': 'Ministry of Agriculture & Farmers Welfare',
        'description': 'Provides free soil health cards to farmers with information on nutrient status and recommendations for fertilizer dosage.',
        'benefit_amount': 'Free soil testing and health card. Nutrient management advice to reduce fertilizer cost by 10–20%.',
        'eligibility': 'All farmers across India. Soil testing done every 2 years.',
        'how_to_apply': '1. Contact local Krishi Vigyan Kendra (KVK) or Agriculture Department  2. Provide soil sample from farm  3. Card issued within 3 months',
        'website': 'https://soilhealth.dac.gov.in',
        'category': 'Soil Health',
        'icon': '🧪',
    },
    {
        'id': 'pm_kusum',
        'name': 'PM-KUSUM',
        'full_name': 'Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan',
        'ministry': 'Ministry of New and Renewable Energy',
        'description': 'Scheme to provide solar pumps to farmers and install solar power plants on barren/fallow land to generate additional income.',
        'benefit_amount': 'Subsidy up to 60% on solar pump installation (30% from Centre, 30% from State). Farmer pays only 10% after bank loan.',
        'eligibility': 'Individual farmers, cooperatives, panchayats, FPOs. Farmers with land near transmission lines for grid-connected plants.',
        'how_to_apply': '1. Apply through State Nodal Agency (SNA) or DISCOM  2. Visit state agriculture/energy department website  3. Submit land documents and Aadhaar',
        'website': 'https://mnre.gov.in/solar/schemes',
        'category': 'Renewable Energy',
        'icon': '☀️',
    },
    {
        'id': 'e_nam',
        'name': 'e-NAM',
        'full_name': 'National Agriculture Market',
        'ministry': 'Ministry of Agriculture & Farmers Welfare / SFAC',
        'description': 'Pan-India electronic trading portal for agricultural commodities, connecting farmers directly with buyers to get better prices.',
        'benefit_amount': 'Access to pan-India buyers. Average 5–10% better price realization. Zero trading commission for farmers.',
        'eligibility': 'All farmers in states with integrated mandis. Currently 1,000+ mandis across 18 states integrated.',
        'how_to_apply': '1. Register at enam.gov.in with Aadhaar and bank details  2. Get quality assay done at mandi lab  3. Upload produce and receive bids from buyers',
        'website': 'https://enam.gov.in',
        'category': 'Market Access',
        'icon': '🏪',
    },
    {
        'id': 'pkvy',
        'name': 'PKVY',
        'full_name': 'Paramparagat Krishi Vikas Yojana',
        'ministry': 'Ministry of Agriculture & Farmers Welfare',
        'description': 'Promotes organic farming through cluster approach. Provides financial assistance for certification, organic input production, and marketing.',
        'benefit_amount': '₹50,000/hectare over 3 years for organic farming. Includes PGS-India certification support and marketing assistance.',
        'eligibility': 'Groups of 50 farmers (cluster) with minimum 50 acres land. Areas not under organic farming before.',
        'how_to_apply': '1. Form farmer group (50 farmers, 50 acres)  2. Apply through District Agriculture Officer  3. Prepare organic farming plan  4. Funds released in 3 installments',
        'website': 'https://pgsindia-ncof.gov.in',
        'category': 'Organic Farming',
        'icon': '🌿',
    },
    {
        'id': 'rkvy',
        'name': 'RKVY',
        'full_name': 'Rashtriya Krishi Vikas Yojana',
        'ministry': 'Ministry of Agriculture & Farmers Welfare',
        'description': 'Provides funds to states for agricultural development projects including infrastructure, mechanization, and technology adoption.',
        'benefit_amount': 'Grants for farm infrastructure, equipment subsidy (up to 50%), training programs.',
        'eligibility': 'Individual farmers through state government projects. Contact District Agriculture Department for ongoing schemes.',
        'how_to_apply': '1. Contact District Agriculture Officer  2. Apply for specific component (mechanization/infrastructure/horticulture)  3. Subsidy credited directly to bank account',
        'website': 'https://rkvy.nic.in',
        'category': 'Agricultural Development',
        'icon': '🏗️',
    },
]
