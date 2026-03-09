"""
Chatbot Module — Agri-Connect
Rule-based multilingual agricultural chatbot
Supports: English, Telugu, Hindi, Marathi
"""

import re

# ============================================
# LANGUAGE DETECTION
# ============================================

def detect_language(text):
    """
    Detect script/language from Unicode ranges.
    Returns: 'te', 'hi', 'mr', or 'en'

    Note: Hindi and Marathi both use Devanagari script (U+0900–U+097F), so this
    function cannot distinguish between them based on script alone. Marathi text
    will be detected as 'hi'. Use the lang_hint parameter in get_reply() to
    explicitly set 'mr' when the interface language is Marathi.
    """
    for ch in text:
        cp = ord(ch)
        if 0x0C00 <= cp <= 0x0C7F:
            return 'te'   # Telugu script
        if 0x0900 <= cp <= 0x097F:
            # Hindi and Marathi both use Devanagari — default to 'hi'
            return 'hi'
    return 'en'


# ============================================
# MULTILINGUAL RESPONSES
# ============================================

GREETINGS = {
    'en': "Hello! I'm your Agri-Connect farming assistant 🌾. Ask me about crops, soil, weather, fertilizers, or market prices!",
    'te': "నమస్కారం! నేను మీ అగ్రి-కనెక్ట్ వ్యవసాయ సహాయకుడిని 🌾. పంటలు, నేల, వాతావరణం, ఎరువులు లేదా మార్కెట్ ధరల గురించి అడగండి!",
    'hi': "नमस्ते! मैं आपका अग्री-कनेक्ट कृषि सहायक हूँ 🌾। फसलें, मिट्टी, मौसम, उर्वरक या बाज़ार भाव के बारे में पूछें!",
    'mr': "नमस्कार! मी तुमचा ऍग्री-कनेक्ट शेती सहाय्यक आहे 🌾. पिके, माती, हवामान, खते किंवा बाजारभावाबद्दल विचारा!",
}

FALLBACK = {
    'en': "I'm not sure about that. Try asking about a specific crop like rice, wheat, or cotton. You can ask: 'When to sow rice?' or 'What fertilizer for wheat?'",
    'te': "నాకు అది తెలియదు. వరి, గోధుమ లేదా పత్తి వంటి నిర్దిష్ట పంట గురించి అడగండి. మీరు అడగవచ్చు: 'వరి ఎప్పుడు నాటాలి?' లేదా 'గోధుమకు ఏ ఎరువు?'",
    'hi': "मुझे इसके बारे में यकीन नहीं है। चावल, गेहूं या कपास जैसी किसी फसल के बारे में पूछें। आप पूछ सकते हैं: 'चावल कब बोएं?' या 'गेहूं के लिए कौन सा उर्वरक?'",
    'mr': "मला याबद्दल माहिती नाही. भात, गहू किंवा कापूस यांसारख्या विशिष्ट पिकाबद्दल विचारा. तुम्ही विचारू शकता: 'भात कधी लावायचा?' किंवा 'गव्हासाठी कोणते खत?'",
}

WEATHER_REDIRECT = {
    'en': "For live weather, use the 🌤️ Weather page. It shows real-time temperature, humidity, rainfall, and 5-day forecasts for any Indian city.",
    'te': "లైవ్ వాతావరణం కోసం 🌤️ వెదర్ పేజీని ఉపయోగించండి. ఇది భారతదేశంలోని ఏ నగరానికైనా నిజ-సమయ ఉష్ణోగ్రత, తేమ, వర్షపాతం మరియు 5-రోజుల అంచనాలను చూపిస్తుంది.",
    'hi': "लाइव मौसम के लिए 🌤️ मौसम पेज का उपयोग करें। यह किसी भी भारतीय शहर के लिए रीयल-टाइम तापमान, नमी, वर्षा और 5-दिन के पूर्वानुमान दिखाता है।",
    'mr': "लाइव हवामानासाठी 🌤️ हवामान पेज वापरा. हे कोणत्याही भारतीय शहरासाठी रिअल-टाइम तापमान, आर्द्रता, पाऊस आणि 5-दिवसांचा अंदाज दाखवते.",
}

MARKET_REDIRECT = {
    'en': "For current market prices, use the 💰 Market Prices page. It shows mandi prices for 40+ crops across major Indian cities.",
    'te': "ప్రస్తుత మార్కెట్ ధరల కోసం 💰 మార్కెట్ ధరలు పేజీని ఉపయోగించండి. ఇది ప్రధాన భారతీయ నగరాల్లో 40+ పంటలకు మండి ధరలను చూపిస్తుంది.",
    'hi': "वर्तमान बाज़ार भाव के लिए 💰 बाज़ार भाव पेज का उपयोग करें। यह प्रमुख भारतीय शहरों में 40+ फसलों के मंडी भाव दिखाता है।",
    'mr': "चालू बाजारभावासाठी 💰 बाजारभाव पेज वापरा. हे प्रमुख भारतीय शहरांमधील 40+ पिकांचे मंडी दर दाखवते.",
}

# ============================================
# CROP KNOWLEDGE BASE
# ============================================

CROP_KNOWLEDGE = {
    'rice': {
        'names': {
            'en': ['rice', 'paddy'],
            'te': ['వరి', 'బియ్యం', 'ధాన్యం'],
            'hi': ['चावल', 'धान', 'धान्य'],
            'mr': ['भात', 'तांदूळ', 'धान'],
        },
        'en': {
            'season': 'Kharif (Jun–Jul sowing, Oct–Nov harvest) and Rabi in South India (Dec–Jan sowing, Apr–May harvest)',
            'soil': 'Clay or clay-loam soil with good water retention (pH 5.5–7.0)',
            'water': 'High water requirement — 1200–2000 mm/season. Flood or AWD (Alternate Wetting & Drying) irrigation',
            'pests': 'Brown Plant Hopper, Stem Borer, Leaf Folder, Blast disease',
            'fertilizer': 'N:P:K = 120:60:60 kg/ha. Apply Urea in 3 splits. Top-dress at tillering and panicle initiation',
            'harvest': '110–145 days after sowing depending on variety. Harvest when 80% grains are golden yellow',
            'msp': '₹2,183/quintal (Kharif 2023–24)',
        },
        'te': {
            'season': 'ఖరీఫ్ (జూన్–జూలై నాటు, అక్టోబర్–నవంబర్ కోత) మరియు దక్షిణ భారతంలో రబీ (డిసెంబర్–జనవరి నాటు)',
            'soil': 'మంచి నీటి నిలుపుదల కలిగిన బంకమట్టి లేదా బంకమట్టి-లోమ్ నేల (pH 5.5–7.0)',
            'water': 'అధిక నీటి అవసరం — సీజన్‌కు 1200–2000 మి.మీ. వరదనీరు లేదా AWD నీటిపారుదల',
            'pests': 'బ్రౌన్ ప్లాంట్ హాపర్, స్టెమ్ బోరర్, లీఫ్ ఫోల్డర్, బ్లాస్ట్ వ్యాధి',
            'fertilizer': 'N:P:K = 120:60:60 కి.గ్రా/హెక్టేరు. యూరియాను 3 విభజనలలో వేయండి',
            'harvest': 'నాట్లు వేసిన 110–145 రోజులు. 80% గింజలు బంగారు పసుపు రంగుకు వచ్చినప్పుడు కోయండి',
            'msp': '₹2,183/క్వింటాల్ (ఖరీఫ్ 2023–24)',
        },
        'hi': {
            'season': 'खरीफ (जून–जुलाई बुवाई, अक्टूबर–नवंबर कटाई) और दक्षिण भारत में रबी (दिसंबर–जनवरी बुवाई)',
            'soil': 'अच्छी जल-धारण क्षमता वाली चिकनी या चिकनी-दोमट मिट्टी (pH 5.5–7.0)',
            'water': 'अधिक जल आवश्यकता — सीजन में 1200–2000 मिमी। बाढ़ या AWD सिंचाई',
            'pests': 'भूरा पौधा फुदका, तना छेदक, पत्ता लपेटक, ब्लास्ट रोग',
            'fertilizer': 'N:P:K = 120:60:60 किग्रा/हेक्टेयर। यूरिया को 3 भागों में दें',
            'harvest': 'बुवाई के 110–145 दिन बाद। जब 80% दाने सुनहरे हो जाएं',
            'msp': '₹2,183/क्विंटल (खरीफ 2023–24)',
        },
        'mr': {
            'season': 'खरीप (जून–जुलै पेरणी, ऑक्टोबर–नोव्हेंबर काढणी) आणि दक्षिण भारतात रब्बी (डिसेंबर–जानेवारी)',
            'soil': 'चांगली पाणी टिकवण्याची क्षमता असलेली भारी किंवा मध्यम जमीन (pH 5.5–7.0)',
            'water': 'जास्त पाणी लागते — हंगामात 1200–2000 मिमी. पूर किंवा AWD सिंचन',
            'pests': 'तपकिरी तुडतुडे, खोड किडा, पान गुंडाळणारा, ब्लास्ट रोग',
            'fertilizer': 'N:P:K = 120:60:60 किग्रा/हेक्टर. युरिया 3 हप्त्यांत द्या',
            'harvest': 'पेरणीनंतर 110–145 दिवस. 80% दाणे सोनेरी झाल्यावर काढणी',
            'msp': '₹2,183/क्विंटल (खरीप 2023–24)',
        },
    },
    'wheat': {
        'names': {
            'en': ['wheat'],
            'te': ['గోధుమ'],
            'hi': ['गेहूं', 'गेहू'],
            'mr': ['गहू', 'गव्हू'],
        },
        'en': {
            'season': 'Rabi season — sow Nov–Dec, harvest Mar–Apr',
            'soil': 'Well-drained loamy or clay-loam soil (pH 6.0–7.5)',
            'water': 'Moderate — 4–6 irrigations. Critical stages: CRI, tillering, jointing, grain-filling',
            'pests': 'Aphids, Army Worm, Yellow Rust, Loose Smut',
            'fertilizer': 'N:P:K = 120:60:40 kg/ha. Apply DAP at sowing + Urea at 1st & 2nd irrigation',
            'harvest': '120–140 days. Harvest when grains are hard and straw is yellow-dry',
            'msp': '₹2,275/quintal (Rabi 2023–24)',
        },
        'te': {
            'season': 'రబీ సీజన్ — నవంబర్–డిసెంబర్ నాటు, మార్చి–ఏప్రిల్ కోత',
            'soil': 'బాగా నీరు ఆరిపోయే లోమ్ లేదా బంకమట్టి-లోమ్ నేల (pH 6.0–7.5)',
            'water': 'మితమైనది — 4–6 నీటిపారుదలలు. క్రాన్ రూట్ ఇనిషియేషన్, టిల్లరింగ్, జాయింటింగ్ దశలలో నీరు అవసరం',
            'pests': 'పేనుపురుగు, సైన్యపురుగు, పసుపు తుప్పు, వదులు అంగారు',
            'fertilizer': 'N:P:K = 120:60:40 కి.గ్రా/హె. నాటు సమయంలో DAP + 1వ & 2వ నీటిపారుదలలో యూరియా',
            'harvest': '120–140 రోజులు. గింజలు గట్టిగా మరియు గడ్డి పసుపు-పొడిగా ఉన్నప్పుడు కోయండి',
            'msp': '₹2,275/క్వింటాల్ (రబీ 2023–24)',
        },
        'hi': {
            'season': 'रबी — नवंबर–दिसंबर बुवाई, मार्च–अप्रैल कटाई',
            'soil': 'अच्छी जल निकासी वाली दोमट या चिकनी-दोमट मिट्टी (pH 6.0–7.5)',
            'water': 'मध्यम — 4–6 सिंचाई। क्राई, कल्ले फूटने, जोड़ बनने, दाना भरने पर जरूरी',
            'pests': 'माहू, सेना कीड़ा, पीला रतुआ, खुली कंडुआ',
            'fertilizer': 'N:P:K = 120:60:40 किग्रा/हे. बुवाई पर DAP + पहली व दूसरी सिंचाई पर यूरिया',
            'harvest': '120–140 दिन। जब दाने कठोर और पुआल सूख जाए',
            'msp': '₹2,275/क्विंटल (रबी 2023–24)',
        },
        'mr': {
            'season': 'रब्बी — नोव्हेंबर–डिसेंबर पेरणी, मार्च–एप्रिल काढणी',
            'soil': 'चांगला निचरा होणारी मध्यम जमीन (pH 6.0–7.5)',
            'water': 'मध्यम — 4–6 पाण्या. मुळे फुटणे, फुटवे, कांडे व दाणे भरताना पाणी द्यावे',
            'pests': 'मावा, लष्करी अळी, पिवळी गंज, सुट्टी करपा',
            'fertilizer': 'N:P:K = 120:60:40 किग्रा/हे. पेरणीवेळी DAP + 1ली व 2री पाण्यावर युरिया',
            'harvest': '120–140 दिवस. दाणे टणक व काड सुकल्यावर काढणी',
            'msp': '₹2,275/क्विंटल (रब्बी 2023–24)',
        },
    },
    'maize': {
        'names': {
            'en': ['maize', 'corn'],
            'te': ['మొక్కజొన్న'],
            'hi': ['मक्का', 'मकई'],
            'mr': ['मका', 'भुट्टा'],
        },
        'en': {
            'season': 'Kharif (Jun–Jul), Rabi (Oct–Nov in South India)',
            'soil': 'Well-drained sandy-loam to clay-loam (pH 5.8–7.5)',
            'water': 'Moderate — 5–7 irrigations. Critical at tasseling and grain-filling stages',
            'pests': 'Fall Armyworm, Shoot Borer, Stem Borer, Turcicum Leaf Blight',
            'fertilizer': 'N:P:K = 120:60:40 kg/ha. Top-dress nitrogen at knee-height and tasseling',
            'harvest': '90–120 days. Harvest when husks are dry and silks are dark brown',
            'msp': '₹1,962/quintal (Kharif 2023–24)',
        },
        'te': {
            'season': 'ఖరీఫ్ (జూన్–జూలై), రబీ (అక్టోబర్–నవంబర్ దక్షిణ భారతంలో)',
            'soil': 'బాగా నీరు ఆరిపోయే ఇసుక-లోమ్ నేల (pH 5.8–7.5)',
            'water': 'మితమైనది — 5–7 నీటిపారుదలలు. టాసెలింగ్ మరియు గింజ నింపే దశలలో క్రిటికల్',
            'pests': 'ఫాల్ ఆర్మీవార్మ్, షూట్ బోరర్, స్టెమ్ బోరర్',
            'fertilizer': 'N:P:K = 120:60:40 కి.గ్రా/హె. మోకాలు ఎత్తు మరియు టాసెలింగ్ వద్ద నైట్రోజన్ వేయండి',
            'harvest': '90–120 రోజులు. హస్క్‌లు పొడిగా మరియు సిల్క్‌లు ముదురు గోధుమ రంగులో ఉన్నప్పుడు',
            'msp': '₹1,962/క్వింటాల్',
        },
        'hi': {
            'season': 'खरीफ (जून–जुलाई), रबी (अक्टूबर–नवंबर दक्षिण भारत में)',
            'soil': 'अच्छी जल निकासी वाली बलुई-दोमट मिट्टी (pH 5.8–7.5)',
            'water': 'मध्यम — 5–7 सिंचाई। नर-फूल और दाना भरने पर जरूरी',
            'pests': 'फॉल आर्मीवार्म, शूट बोरर, तना छेदक',
            'fertilizer': 'N:P:K = 120:60:40 किग्रा/हे.',
            'harvest': '90–120 दिन। जब भुट्टे के आवरण सूखें',
            'msp': '₹1,962/क्विंटल',
        },
        'mr': {
            'season': 'खरीप (जून–जुलै), रब्बी (ऑक्टोबर–नोव्हेंबर दक्षिण भारतात)',
            'soil': 'चांगला निचरा होणारी वालुकामय-मध्यम जमीन (pH 5.8–7.5)',
            'water': 'मध्यम — 5–7 पाण्या. नर-फुले व दाणे भरताना महत्त्वाचे',
            'pests': 'फॉल आर्मीवर्म, कोंब किडा, खोड किडा',
            'fertilizer': 'N:P:K = 120:60:40 किग्रा/हे.',
            'harvest': '90–120 दिवस. कणसाचे आवरण सुकल्यावर काढणी',
            'msp': '₹1,962/क्विंटल',
        },
    },
    'cotton': {
        'names': {
            'en': ['cotton'],
            'te': ['పత్తి'],
            'hi': ['कपास'],
            'mr': ['कापूस'],
        },
        'en': {
            'season': 'Kharif — sow May–Jun, harvest Oct–Feb (long duration crop)',
            'soil': 'Deep black cotton soil (Vertisols) or red loamy soil (pH 6.0–8.0)',
            'water': 'Moderate — 5–8 irrigations. Critical at squaring, flowering, and boll development',
            'pests': 'Pink Bollworm, Whitefly, Thrips, American Bollworm, Aphids',
            'fertilizer': 'N:P:K = 120:60:60 kg/ha for hybrid cotton. Apply in 3 splits',
            'harvest': '170–200 days. Pick when 3–4 bolls per plant are open',
            'msp': '₹6,620/quintal Medium-staple (2023–24)',
        },
        'te': {
            'season': 'ఖరీఫ్ — మే–జూన్ విత్తు, అక్టోబర్–ఫిబ్రవరి కోత',
            'soil': 'లోతైన నల్లరేగడి నేల (వెర్టిసోల్స్) లేదా ఎర్ర లోమ్ నేల (pH 6.0–8.0)',
            'water': 'మితమైనది — 5–8 నీటిపారుదలలు. పువ్వుల మొగ్గ, పుష్పం మరియు కాయ అభివృద్ధిలో క్రిటికల్',
            'pests': 'పింక్ బాల్‌వర్మ్, తెల్ల నల్లి, రసాయనాలు, అమెరికన్ బాల్‌వర్మ్',
            'fertilizer': 'హైబ్రిడ్ పత్తికి N:P:K = 120:60:60 కి.గ్రా/హె.',
            'harvest': '170–200 రోజులు. 3–4 కాయలు తెరుచుకున్నప్పుడు కోయండి',
            'msp': '₹6,620/క్వింటాల్ (2023–24)',
        },
        'hi': {
            'season': 'खरीफ — मई–जून बुवाई, अक्टूबर–फरवरी चुनाई',
            'soil': 'गहरी काली मिट्टी या लाल दोमट मिट्टी (pH 6.0–8.0)',
            'water': 'मध्यम — 5–8 सिंचाई। फूल कली, फूल और टिंडा विकास पर जरूरी',
            'pests': 'गुलाबी सुंडी, सफेद मक्खी, थ्रिप्स, अमेरिकन सुंडी',
            'fertilizer': 'हाइब्रिड कपास के लिए N:P:K = 120:60:60 किग्रा/हे.',
            'harvest': '170–200 दिन। 3–4 टिंडे खुलने पर चुनाई',
            'msp': '₹6,620/क्विंटल (2023–24)',
        },
        'mr': {
            'season': 'खरीप — मे–जून पेरणी, ऑक्टोबर–फेब्रुवारी वेचणी',
            'soil': 'खोल काळी जमीन किंवा लाल मध्यम जमीन (pH 6.0–8.0)',
            'water': 'मध्यम — 5–8 पाण्या. फुलांच्या कळ्या, फुले व बोंडे यावेळी महत्त्वाचे',
            'pests': 'गुलाबी बोंड अळी, पांढरी माशी, फुलकिडे, अमेरिकन बोंड अळी',
            'fertilizer': 'हायब्रिड कापसासाठी N:P:K = 120:60:60 किग्रा/हे.',
            'harvest': '170–200 दिवस. 3–4 बोंडे उघडल्यावर वेचणी',
            'msp': '₹6,620/क्विंटल (2023–24)',
        },
    },
    'tomato': {
        'names': {
            'en': ['tomato', 'tomatoes'],
            'te': ['టమాటా', 'టొమాటో'],
            'hi': ['टमाटर', 'टोमैटो'],
            'mr': ['टोमॅटो', 'टमाटे'],
        },
        'en': {
            'season': 'Year-round in South India; Rabi (Oct–Jan) in North India',
            'soil': 'Well-drained sandy-loam to loam (pH 6.0–7.0)',
            'water': 'Regular irrigation — drip preferred. 400–600 mm per season',
            'pests': 'Fruit Borer, Whitefly, Early/Late Blight, Leaf Curl Virus',
            'fertilizer': 'N:P:K = 150:75:75 kg/ha. Heavy feeder. Foliar spray of micronutrients at flowering',
            'harvest': '65–80 days after transplanting. Pick when 50–75% red',
            'msp': 'Market-driven — typically ₹15–60/kg',
        },
        'te': {
            'season': 'దక్షిణ భారతంలో సంవత్సరం పొడవునా; ఉత్తర భారతంలో రబీ (అక్టోబర్–జనవరి)',
            'soil': 'బాగా నీరు ఆరిపోయే ఇసుక-లోమ్ నేల (pH 6.0–7.0)',
            'water': 'నియమిత నీటిపారుదల — డ్రిప్ మేలు. సీజన్‌కు 400–600 మి.మీ.',
            'pests': 'ఫ్రూట్ బోరర్, తెల్ల నల్లి, ముట్టుకోళ్ళు, ఆకు మడత వైరస్',
            'fertilizer': 'N:P:K = 150:75:75 కి.గ్రా/హె.',
            'harvest': 'మొక్క నాటిన 65–80 రోజులు. 50–75% ఎర్రగా మారినప్పుడు',
            'msp': 'మార్కెట్ ధర — సాధారణంగా ₹15–60/కి.గ్రా.',
        },
        'hi': {
            'season': 'दक्षिण भारत में साल भर; उत्तर भारत में रबी (अक्टूबर–जनवरी)',
            'soil': 'अच्छी जल निकासी वाली बलुई-दोमट (pH 6.0–7.0)',
            'water': 'नियमित सिंचाई — ड्रिप अनुशंसित। प्रति सीजन 400–600 मिमी',
            'pests': 'फल छेदक, सफेद मक्खी, अगेती/पछेती अंगमारी, पत्ता मरोड़ विषाणु',
            'fertilizer': 'N:P:K = 150:75:75 किग्रा/हे.',
            'harvest': 'रोपाई के 65–80 दिन बाद। 50–75% लाल होने पर तोड़ें',
            'msp': 'बाज़ार दर — सामान्यतः ₹15–60/किग्रा',
        },
        'mr': {
            'season': 'दक्षिण भारतात वर्षभर; उत्तर भारतात रब्बी (ऑक्टोबर–जानेवारी)',
            'soil': 'चांगला निचरा होणारी वालुकामय-मध्यम जमीन (pH 6.0–7.0)',
            'water': 'नियमित पाणी — ठिबक सिंचन उत्तम. हंगामात 400–600 मिमी',
            'pests': 'फळे पोखरणारी अळी, पांढरी माशी, करपा, पान मुडपणे विषाणू',
            'fertilizer': 'N:P:K = 150:75:75 किग्रा/हे.',
            'harvest': 'लावणीनंतर 65–80 दिवस. 50–75% लाल झाल्यावर तोडणी',
            'msp': 'बाजार दर — साधारणतः ₹15–60/किग्रा',
        },
    },
}

# ============================================
# KEYWORD PATTERNS
# ============================================

def _make_pattern(words):
    return re.compile('|'.join(re.escape(w) for w in words), re.IGNORECASE | re.UNICODE)

GREETING_PATTERN = _make_pattern([
    'hello', 'hi', 'hey', 'namaste', 'namaskar', 'vanakkam',
    'నమస్కారం', 'నమస్తే', 'హలో', 'హాయ్',
    'नमस्ते', 'हेलो', 'हाय', 'नमस्कार',
    'नमस्कार', 'हॅलो', 'हाय',
])

WEATHER_PATTERN = _make_pattern([
    'weather', 'rain', 'temperature', 'humidity', 'forecast', 'rainfall',
    'వాతావరణం', 'వర్షం', 'ఉష్ణోగ్రత', 'తేమ',
    'मौसम', 'बारिश', 'तापमान', 'नमी', 'पूर्वानुमान',
    'हवामान', 'पाऊस', 'तापमान',
])

MARKET_PATTERN = _make_pattern([
    'price', 'prices', 'market', 'mandi', 'rate', 'sell', 'cost',
    'ధర', 'ధరలు', 'మార్కెట్', 'మండి', 'అమ్మకం',
    'भाव', 'दाम', 'बाज़ार', 'मंडी', 'बिक्री',
    'दर', 'बाजार', 'मंडी', 'किंमत',
])

FERTILIZER_PATTERN = _make_pattern([
    'fertilizer', 'fertiliser', 'urea', 'dap', 'npk', 'manure', 'compost', 'nitrogen',
    'ఎరువు', 'ఎరువులు', 'యూరియా', 'కాంపోస్ట్',
    'उर्वरक', 'खाद', 'यूरिया', 'डीएपी',
    'खत', 'युरिया', 'कंपोस्ट',
])

PEST_PATTERN = _make_pattern([
    'pest', 'disease', 'insect', 'borer', 'worm', 'fungus', 'spray', 'pesticide',
    'పురుగు', 'వ్యాధి', 'కీటకం', 'పురుగుమందు',
    'कीट', 'बीमारी', 'कीड़ा', 'फफूंद', 'कीटनाशक',
    'किड', 'रोग', 'बुरशी', 'कीटकनाशक',
])

HARVEST_PATTERN = _make_pattern([
    'harvest', 'when to cut', 'when to pick', 'cutting time', 'ready to harvest',
    'కోత', 'కోయడం', 'పంట కోయడం', 'ఎప్పుడు కోయాలి',
    'कटाई', 'फसल काटना', 'कब काटें',
    'काढणी', 'केव्हा काढायचे',
])

SOW_PATTERN = _make_pattern([
    'sow', 'sowing', 'plant', 'planting', 'when to grow', 'seed', 'seeds',
    'నాటు', 'విత్తడం', 'నాటుకోవడం', 'ఎప్పుడు నాటాలి',
    'बोना', 'बुवाई', 'कब बोएं', 'रोपाई',
    'पेरणी', 'केव्हा पेरायचे', 'लावणी',
])

SOIL_PATTERN = _make_pattern([
    'soil', 'soil type', 'ph', 'land', 'ground',
    'నేల', 'మట్టి', 'భూమి',
    'मिट्टी', 'भूमि', 'जमीन',
    'माती', 'जमीन',
])


# ============================================
# TOPIC RESPONSES (per language)
# ============================================

def get_topic_response(topic, lang):
    return {
        'fertilizer': {
            'en': "For fertilizer recommendations, use the 🌾 Farm Analysis page — it predicts the exact fertilizer type and quantity based on your soil, crop, and region.",
            'te': "ఎరువు సిఫార్సుల కోసం, 🌾 వ్యవసాయ విశ్లేషణ పేజీ ఉపయోగించండి — ఇది మీ నేల, పంట మరియు ప్రాంతం ఆధారంగా ఖచ్చితమైన ఎరువు రకం మరియు పరిమాణాన్ని అంచనా వేస్తుంది.",
            'hi': "उर्वरक सिफारिशों के लिए, 🌾 खेत विश्लेषण पेज का उपयोग करें — यह आपकी मिट्टी, फसल और क्षेत्र के आधार पर सटीक उर्वरक प्रकार और मात्रा की भविष्यवाणी करता है।",
            'mr': "खत शिफारशींसाठी, 🌾 शेती विश्लेषण पेज वापरा — हे तुमची माती, पीक आणि प्रदेश यावर आधारित अचूक खत प्रकार आणि प्रमाण सांगते.",
        }.get(lang, "Use the Farm Analysis page for personalized fertilizer recommendations."),
        'pest': {
            'en': "For pest and disease identification, use the 🩺 Crop Doctor page — upload a photo of the affected leaf and get AI-powered diagnosis and treatment.",
            'te': "పురుగు మరియు వ్యాధి గుర్తింపు కోసం, 🩺 క్రాప్ డాక్టర్ పేజీ ఉపయోగించండి — ప్రభావిత ఆకు ఫోటో అప్‌లోడ్ చేసి AI-ఆధారిత నిర్ధారణ మరియు చికిత్స పొందండి.",
            'hi': "कीट और रोग पहचान के लिए, 🩺 फसल डॉक्टर पेज का उपयोग करें — प्रभावित पत्ती की फोटो अपलोड करें और AI-संचालित निदान और उपचार पाएं।",
            'mr': "किड आणि रोग ओळखण्यासाठी, 🩺 पीक डॉक्टर पेज वापरा — बाधित पानाचा फोटो अपलोड करा आणि AI-आधारित निदान आणि उपचार मिळवा.",
        }.get(lang, "Use the Crop Doctor page to identify pests and diseases."),
    }.get(topic, {}).get(lang, "")


# ============================================
# MAIN CHATBOT FUNCTION
# ============================================

def _build_crop_info_response(crop_data, lang, query_type):
    """Build a response for crop queries."""
    info = crop_data.get(lang) or crop_data.get('en') or {}
    crop_name_map = crop_data.get('names', {})
    crop_display = (crop_name_map.get(lang) or crop_name_map.get('en') or ['this crop'])[0]

    if query_type == 'sow':
        key = 'season'
        label_map = {
            'en': f"🌱 {crop_display} Sowing Season:",
            'te': f"🌱 {crop_display} నాటు కాలం:",
            'hi': f"🌱 {crop_display} बुवाई का समय:",
            'mr': f"🌱 {crop_display} पेरणीचा काळ:",
        }
    elif query_type == 'harvest':
        key = 'harvest'
        label_map = {
            'en': f"🌾 {crop_display} Harvest Time:",
            'te': f"🌾 {crop_display} కోత సమయం:",
            'hi': f"🌾 {crop_display} कटाई का समय:",
            'mr': f"🌾 {crop_display} काढणीचा काळ:",
        }
    elif query_type == 'fertilizer':
        key = 'fertilizer'
        label_map = {
            'en': f"🧪 {crop_display} Fertilizer:",
            'te': f"🧪 {crop_display} ఎరువు:",
            'hi': f"🧪 {crop_display} उर्वरक:",
            'mr': f"🧪 {crop_display} खत:",
        }
    elif query_type == 'pest':
        key = 'pests'
        label_map = {
            'en': f"🐛 {crop_display} Common Pests & Diseases:",
            'te': f"🐛 {crop_display} సాధారణ పురుగులు & వ్యాధులు:",
            'hi': f"🐛 {crop_display} सामान्य कीट और रोग:",
            'mr': f"🐛 {crop_display} सामान्य किड व रोग:",
        }
    elif query_type == 'water':
        key = 'water'
        label_map = {
            'en': f"💧 {crop_display} Water Requirements:",
            'te': f"💧 {crop_display} నీటి అవసరాలు:",
            'hi': f"💧 {crop_display} पानी की जरूरत:",
            'mr': f"💧 {crop_display} पाण्याची गरज:",
        }
    elif query_type == 'msp':
        key = 'msp'
        label_map = {
            'en': f"💰 {crop_display} MSP:",
            'te': f"💰 {crop_display} MSP:",
            'hi': f"💰 {crop_display} MSP:",
            'mr': f"💰 {crop_display} MSP:",
        }
    else:
        # Full info
        parts = []
        for k, icon in [('season', '🗓️'), ('soil', '🌱'), ('water', '💧'), ('fertilizer', '🧪'), ('pests', '🐛'), ('harvest', '🌾'), ('msp', '💰')]:
            if k in info:
                parts.append(f"{icon} {info[k]}")
        label = label_map_full = {
            'en': f"📋 {crop_display} — Complete Farming Guide:\n\n",
            'te': f"📋 {crop_display} — పూర్తి వ్యవసాయ మార్గదర్శి:\n\n",
            'hi': f"📋 {crop_display} — पूर्ण खेती मार्गदर्शिका:\n\n",
            'mr': f"📋 {crop_display} — संपूर्ण शेती मार्गदर्शक:\n\n",
        }.get(lang, f"📋 {crop_display}:\n\n")
        return label + '\n'.join(parts)

    label = label_map.get(lang, label_map.get('en', ''))
    value = info.get(key, '')
    if not value:
        return ''
    return f"{label}\n{value}"


def get_reply(message, lang_hint='auto'):
    """
    Process a user message and return a chatbot response.

    Args:
        message: User's message text
        lang_hint: Language code or 'auto'

    Returns:
        dict with keys: reply, language, suggestions
    """
    if not message or not message.strip():
        return {
            'reply': FALLBACK.get('en'),
            'language': 'en',
            'suggestions': ['Rice farming tips', 'Wheat sowing time', 'Cotton pests'],
        }

    # Detect language
    if lang_hint == 'auto' or not lang_hint:
        lang = detect_language(message)
    else:
        lang = lang_hint if lang_hint in ('en', 'te', 'hi', 'mr') else detect_language(message)

    msg_lower = message.lower()

    # 1. Greetings
    if GREETING_PATTERN.search(message):
        sugg_map = {
            'en': ['When to sow rice?', 'Wheat fertilizer schedule', 'Cotton pest control'],
            'te': ['వరి ఎప్పుడు నాటాలి?', 'గోధుమ ఎరువు షెడ్యూల్', 'పత్తి పురుగు నియంత్రణ'],
            'hi': ['चावल कब बोएं?', 'गेहूं उर्वरक अनुसूची', 'कपास कीट नियंत्रण'],
            'mr': ['भात कधी लावायचा?', 'गहू खत वेळापत्रक', 'कापूस किड नियंत्रण'],
        }
        return {
            'reply': GREETINGS.get(lang, GREETINGS['en']),
            'language': lang,
            'suggestions': sugg_map.get(lang, sugg_map['en']),
        }

    # 2. Weather queries
    if WEATHER_PATTERN.search(message):
        sugg_map = {
            'en': ['Rice sowing season', 'Wheat water needs', 'Maize harvest time'],
            'te': ['వరి నాటు కాలం', 'గోధుమ నీటి అవసరాలు', 'మొక్కజొన్న కోత సమయం'],
            'hi': ['चावल बुवाई का मौसम', 'गेहूं पानी की जरूरत', 'मक्का कटाई का समय'],
            'mr': ['भात पेरणी हंगाम', 'गहू पाण्याची गरज', 'मका काढणीचा काळ'],
        }
        return {
            'reply': WEATHER_REDIRECT.get(lang, WEATHER_REDIRECT['en']),
            'language': lang,
            'suggestions': sugg_map.get(lang, sugg_map['en']),
        }

    # 3. Market price queries
    if MARKET_PATTERN.search(message):
        sugg_map = {
            'en': ['Rice market price', 'Wheat mandi rate', 'Cotton price today'],
            'te': ['వరి మార్కెట్ ధర', 'గోధుమ మండి రేటు', 'నేడు పత్తి ధర'],
            'hi': ['चावल बाज़ार भाव', 'गेहूं मंडी दर', 'आज कपास का भाव'],
            'mr': ['भात बाजारभाव', 'गहू मंडी दर', 'आज कापूस दर'],
        }
        return {
            'reply': MARKET_REDIRECT.get(lang, MARKET_REDIRECT['en']),
            'language': lang,
            'suggestions': sugg_map.get(lang, sugg_map['en']),
        }

    # 4. Crop-specific queries
    matched_crop = None
    matched_crop_key = None
    for crop_key, crop_data in CROP_KNOWLEDGE.items():
        for lang_code, names in crop_data.get('names', {}).items():
            for name in names:
                if name.lower() in msg_lower or name in message:
                    matched_crop = crop_data
                    matched_crop_key = crop_key
                    break
            if matched_crop:
                break
        if matched_crop:
            break

    if matched_crop:
        # Determine query type
        if SOW_PATTERN.search(message):
            query_type = 'sow'
        elif HARVEST_PATTERN.search(message):
            query_type = 'harvest'
        elif FERTILIZER_PATTERN.search(message):
            query_type = 'fertilizer'
        elif PEST_PATTERN.search(message):
            query_type = 'pest'
        elif SOIL_PATTERN.search(message):
            query_type = 'soil'
        elif MARKET_PATTERN.search(message):
            query_type = 'msp'
        elif 'water' in msg_lower or 'irrigation' in msg_lower or 'irrigate' in msg_lower:
            query_type = 'water'
        else:
            query_type = 'full'

        reply = _build_crop_info_response(matched_crop, lang, query_type)
        if not reply:
            # Fall back to full info
            reply = _build_crop_info_response(matched_crop, lang, 'full')

        crop_name = (matched_crop.get('names', {}).get(lang) or matched_crop.get('names', {}).get('en') or [matched_crop_key])[0]
        sugg_map = {
            'en': [f"{crop_name} sowing time", f"{crop_name} fertilizer", f"{crop_name} pests"],
            'te': [f"{crop_name} నాటు కాలం", f"{crop_name} ఎరువు", f"{crop_name} పురుగులు"],
            'hi': [f"{crop_name} बुवाई का समय", f"{crop_name} उर्वरक", f"{crop_name} कीट"],
            'mr': [f"{crop_name} पेरणी काळ", f"{crop_name} खत", f"{crop_name} किड"],
        }

        return {
            'reply': reply,
            'language': lang,
            'suggestions': sugg_map.get(lang, sugg_map['en']),
        }

    # 5. Generic fertilizer/pest queries
    if FERTILIZER_PATTERN.search(message):
        resp = get_topic_response('fertilizer', lang)
        if not resp:
            resp = get_topic_response('fertilizer', 'en')
        return {
            'reply': resp,
            'language': lang,
            'suggestions': [],
        }

    if PEST_PATTERN.search(message):
        resp = get_topic_response('pest', lang)
        if not resp:
            resp = get_topic_response('pest', 'en')
        return {
            'reply': resp,
            'language': lang,
            'suggestions': [],
        }

    # 6. Fallback
    sugg_map = {
        'en': ['Rice farming guide', 'Wheat sowing season', 'Cotton market price'],
        'te': ['వరి వ్యవసాయ మార్గదర్శి', 'గోధుమ నాటు కాలం', 'పత్తి మార్కెట్ ధర'],
        'hi': ['चावल की खेती गाइड', 'गेहूं बुवाई का मौसम', 'कपास बाज़ार भाव'],
        'mr': ['भात शेती मार्गदर्शक', 'गहू पेरणी हंगाम', 'कापूस बाजारभाव'],
    }
    return {
        'reply': FALLBACK.get(lang, FALLBACK['en']),
        'language': lang,
        'suggestions': sugg_map.get(lang, sugg_map['en']),
    }
