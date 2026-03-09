// ============================================
// Agri-Connect — Internationalization (i18n)
// Supports: English, Telugu, Hindi, Marathi
// ============================================

const LANG_KEY = 'agriconnect-lang';

// Speech recognition language codes
export const SPEECH_LANGS = {
    en: 'en-IN',
    te: 'te-IN',
    hi: 'hi-IN',
    mr: 'mr-IN',
};

const translations = {
    // ========== NAVBAR ==========
    'nav.brand': {
        en: 'Agri-Connect', te: 'అగ్రి-కనెక్ట్', hi: 'एग्री-कनेक्ट', mr: 'ऍग्री-कनेक्ट'
    },
    'nav.home': {
        en: '🏠 Home', te: '🏠 హోమ్', hi: '🏠 होम', mr: '🏠 होम'
    },
    'nav.analysis': {
        en: '🌾 Farm Analysis', te: '🌾 వ్యవసాయ విశ్లేషణ', hi: '🌾 खेत विश्लेषण', mr: '🌾 शेती विश्लेषण'
    },
    'nav.market': {
        en: '💰 Market Prices', te: '💰 మార్కెట్ ధరలు', hi: '💰 बाज़ार भाव', mr: '💰 बाजारभाव'
    },
    'nav.weather': {
        en: '🌤️ Weather', te: '🌤️ వాతావరణం', hi: '🌤️ मौसम', mr: '🌤️ हवामान'
    },
    'nav.cropDoctor': {
        en: '🩺 Crop Doctor', te: '🩺 పంట వైద్యుడు', hi: '🩺 फसल डॉक्टर', mr: '🩺 पीक डॉक्टर'
    },
    'nav.carbon': {
        en: '🌍 Carbon', te: '🌍 కార్బన్', hi: '🌍 कार्बन', mr: '🌍 कार्बन'
    },
    'nav.chatbot': {
        en: '💬 Chatbot', te: '💬 చాట్‌బాట్', hi: '💬 चैटबॉट', mr: '💬 चॅटबॉट'
    },
    'nav.cropCalendar': {
        en: '🗓️ Crop Calendar', te: '🗓️ పంట క్యాలెండర్', hi: '🗓️ फसल कैलेंडर', mr: '🗓️ पीक कॅलेंडर'
    },
    'nav.schemes': {
        en: '🏛️ Schemes', te: '🏛️ పథకాలు', hi: '🏛️ योजनाएं', mr: '🏛️ योजना'
    },

    // ========== HERO SECTION ==========
    'hero.badge': {
        en: 'AI-Powered Farming Assistant',
        te: 'AI-ఆధారిత వ్యవసాయ సహాయకుడు',
        hi: 'AI-संचालित कृषि सहायक',
        mr: 'AI-संचालित शेती सहाय्यक'
    },
    'hero.title1': {
        en: 'Grow Smarter with', te: 'తెలివిగా పండించండి', hi: 'स्मार्ट खेती करें', mr: 'स्मार्ट शेती करा'
    },
    'hero.title2': {
        en: 'Agri-Connect', te: 'అగ్రి-కనెక్ట్', hi: 'एग्री-कनेक्ट', mr: 'ऍग्री-कनेक्ट'
    },
    'hero.subtitle': {
        en: 'Get AI-driven crop recommendations, real-time market prices, weather forecasts, and soil health analysis — all in one place. Built for Indian farmers.',
        te: 'AI ఆధారిత పంట సిఫార్సులు, నిజ-సమయ మార్కెట్ ధరలు, వాతావరణ సూచనలు మరియు నేల ఆరోగ్య విశ్లేషణ — అన్నీ ఒకే చోట. భారతీయ రైతుల కోసం.',
        hi: 'AI-संचालित फसल सिफारिशें, रीयल-टाइम बाज़ार भाव, मौसम पूर्वानुमान और मिट्टी स्वास्थ्य विश्लेषण — सब एक जगह। भारतीय किसानों के लिए।',
        mr: 'AI-संचालित पीक शिफारशी, रिअल-टाइम बाजारभाव, हवामान अंदाज आणि माती आरोग्य विश्लेषण — सर्व एकाच ठिकाणी. भारतीय शेतकऱ्यांसाठी.'
    },
    'hero.startAnalysis': {
        en: '🌾 Start Farm Analysis', te: '🌾 వ్యవసాయ విశ్లేషణ ప్రారంభించండి', hi: '🌾 खेत विश्लेषण शुरू करें', mr: '🌾 शेती विश्लेषण सुरू करा'
    },
    'hero.checkMarket': {
        en: '💰 Check Market Prices', te: '💰 మార్కెట్ ధరలు చూడండి', hi: '💰 बाज़ार भाव देखें', mr: '💰 बाजारभाव तपासा'
    },

    // ========== STATS ==========
    'stats.cropsSupported': {
        en: 'Crops Supported', te: 'పంటలు మద్దతు', hi: 'समर्थित फसलें', mr: 'समर्थित पिके'
    },
    'stats.weatherForecast': {
        en: 'Weather Forecast', te: 'వాతావరణ సూచన', hi: 'मौसम पूर्वानुमान', mr: 'हवामान अंदाज'
    },
    'stats.fertilizers': {
        en: 'Fertilizers Analysed', te: 'ఎరువులు విశ్లేషించబడ్డాయి', hi: 'उर्वरक विश्लेषित', mr: 'खते विश्लेषित'
    },
    'stats.voiceInput': {
        en: 'Voice Input', te: 'వాయిస్ ఇన్‌పుట్', hi: 'वॉइस इनपुट', mr: 'व्हॉइस इनपुट'
    },

    // ========== FEATURE CARDS ==========
    'feature.cropRec.title': {
        en: 'Smart Crop Recommendation', te: 'తెలివైన పంట సిఫార్సు', hi: 'स्मार्ट फसल सिफारिश', mr: 'स्मार्ट पीक शिफारस'
    },
    'feature.cropRec.desc': {
        en: 'Enter your location & soil data. AI predicts the best crop with yield estimates, profit calculations, and government sell prices.',
        te: 'మీ స్థానం & నేల డేటా నమోదు చేయండి. AI ఉత్తమ పంట, దిగుబడి అంచనాలు, లాభ లెక్కింపులు మరియు ప్రభుత్వ ధరలను అంచనా వేస్తుంది.',
        hi: 'अपना स्थान और मिट्टी डेटा दर्ज करें। AI सर्वश्रेष्ठ फसल, उपज अनुमान, लाभ गणना और सरकारी बिक्री मूल्य की भविष्यवाणी करता है।',
        mr: 'तुमचे स्थान आणि माती डेटा प्रविष्ट करा. AI सर्वोत्तम पीक, उत्पादन अंदाज, नफा गणना आणि सरकारी विक्री किंमतीचा अंदाज देतो.'
    },
    'feature.soilHealth.title': {
        en: 'Soil Health Analysis', te: 'నేల ఆరోగ్య విశ్లేషణ', hi: 'मिट्टी स्वास्थ्य विश्लेषण', mr: 'माती आरोग्य विश्लेषण'
    },
    'feature.soilHealth.desc': {
        en: 'Understand how previous pesticides & fertilizers affect your soil. Get remediation solutions to improve yield for the next season.',
        te: 'మునుపటి పురుగుమందులు & ఎరువులు మీ నేలను ఎలా ప్రభావితం చేస్తాయో అర్థం చేసుకోండి. తదుపరి సీజన్ కోసం దిగుబడి మెరుగుపరచడానికి పరిష్కారాలు పొందండి.',
        hi: 'समझें कि पिछले कीटनाशक और उर्वरक आपकी मिट्टी को कैसे प्रभावित करते हैं। अगले सीजन के लिए उपज सुधारने के उपाय पाएं।',
        mr: 'मागील कीटकनाशके आणि खतांचा तुमच्या मातीवर कसा परिणाम होतो ते समजून घ्या. पुढील हंगामासाठी उत्पादन सुधारण्याचे उपाय मिळवा.'
    },
    'feature.market.title': {
        en: 'Market Price Comparison', te: 'మార్కెట్ ధర పోలిక', hi: 'बाज़ार मूल्य तुलना', mr: 'बाजारभाव तुलना'
    },
    'feature.market.desc': {
        en: 'Compare crop prices at mandis within your specified radius. Find the best selling price for your produce nearby.',
        te: 'మీ పరిధిలో మండీలలో పంట ధరలను పోల్చండి. మీ ఉత్పత్తులకు సమీపంలో ఉత్తమ విక్రయ ధరను కనుగొనండి.',
        hi: 'अपनी निर्दिष्ट त्रिज्या में मंडियों में फसल की कीमतों की तुलना करें। अपनी उपज के लिए आसपास का सबसे अच्छा बिक्री मूल्य खोजें।',
        mr: 'तुमच्या निर्दिष्ट त्रिज्येतील बाजारांमध्ये पीक किंमतींची तुलना करा. तुमच्या उत्पादनासाठी जवळचा सर्वोत्तम विक्री दर शोधा.'
    },
    'feature.weather.title': {
        en: 'Weather Dashboard', te: 'వాతావరణ డాష్‌బోర్డ్', hi: 'मौसम डैशबोर्ड', mr: 'हवामान डॅशबोर्ड'
    },
    'feature.weather.desc': {
        en: 'Real-time weather data with 5-day forecasts and smart farming advisories — when to spray, irrigate, or harvest.',
        te: 'నిజ-సమయ వాతావరణ డేటా, 5-రోజుల సూచనలు మరియు తెలివైన వ్యవసాయ సలహాలు — ఎప్పుడు పిచికారీ చేయాలి, నీరు పెట్టాలి లేదా కోయాలి.',
        hi: 'रीयल-टाइम मौसम डेटा, 5-दिन का पूर्वानुमान और स्मार्ट खेती सलाह — कब छिड़काव, सिंचाई या कटाई करें।',
        mr: 'रिअल-टाइम हवामान डेटा, 5-दिवसांचा अंदाज आणि स्मार्ट शेती सल्ला — कधी फवारणी, सिंचन किंवा कापणी करावी.'
    },
    'feature.fertilizer.title': {
        en: 'Fertilizer Recommendation', te: 'ఎరువు సిఫార్సు', hi: 'उर्वरक सिफारिश', mr: 'खत शिफारस'
    },
    'feature.fertilizer.desc': {
        en: 'AI suggests the right fertilizer based on soil type, crop, season, and growth stage. With NPK ratios and cost estimates.',
        te: 'మట్టి రకం, పంట, సీజన్ మరియు వృద్ధి దశ ఆధారంగా AI సరైన ఎరువును సూచిస్తుంది. NPK నిష్పత్తులు మరియు ఖర్చు అంచనాలతో.',
        hi: 'AI मिट्टी प्रकार, फसल, मौसम और विकास चरण के आधार पर सही उर्वरक सुझाता है। NPK अनुपात और लागत अनुमान के साथ।',
        mr: 'AI माती प्रकार, पीक, हंगाम आणि वाढीच्या टप्प्यानुसार योग्य खताची शिफारस करतो. NPK प्रमाण आणि खर्चाचा अंदाज.'
    },
    'feature.voice.title': {
        en: 'Voice Input Support', te: 'వాయిస్ ఇన్‌పుట్ మద్దతు', hi: 'वॉइस इनपुट सपोर्ट', mr: 'व्हॉइस इनपुट सपोर्ट'
    },
    'feature.voice.desc': {
        en: 'Speak your inputs instead of typing. Supports English, Telugu, Hindi, and Marathi. Just tap the microphone icon on any input field.',
        te: 'టైప్ చేయడానికి బదులు మీ ఇన్‌పుట్‌లను మాట్లాడండి. ఆంగ్లం, తెలుగు, హిందీ మరియు మరాఠీకి మద్దతు. ఏదైనా ఇన్‌పుట్ ఫీల్డ్‌లో మైక్రోఫోన్ ఐకాన్ నొక్కండి.',
        hi: 'टाइप करने के बजाय बोलकर इनपुट दें। अंग्रेजी, तेलुगु, हिंदी और मराठी सपोर्ट करता है। किसी भी इनपुट फील्ड पर माइक्रोफोन आइकन टैप करें।',
        mr: 'टायपिंगऐवजी बोलून इनपुट द्या. इंग्रजी, तेलुगू, हिंदी आणि मराठी सपोर्ट. कोणत्याही इनपुट फील्डवर मायक्रोफोन आयकॉन टॅप करा.'
    },
    'feature.cropDoctor.title': {
        en: 'Crop Disease Detection', te: 'పంట వ్యాధి నిర్ధారణ', hi: 'फसल रोग पहचान', mr: 'पीक रोग ओळख'
    },
    'feature.cropDoctor.desc': {
        en: 'Upload a photo of a crop leaf and AI will instantly detect diseases and suggest treatment plans with medicine recommendations.',
        te: 'పంట ఆకు ఫోటో అప్‌లోడ్ చేయండి, AI వెంటనే వ్యాధులను గుర్తించి, మందుల సిఫార్సులతో చికిత్స ప్రణాళికలను సూచిస్తుంది.',
        hi: 'फसल की पत्ती की फोटो अपलोड करें और AI तुरंत बीमारियों का पता लगाएगा और दवा सिफारिशों के साथ उपचार योजना सुझाएगा।',
        mr: 'पिकाच्या पानाचा फोटो अपलोड करा आणि AI त्वरित रोग ओळखून औषध शिफारशींसह उपचार योजना सुचवेल.'
    },
    'feature.carbon.title': {
        en: 'Carbon Footprint Estimator', te: 'కార్బన్ ఫుట్‌ప్రింట్ అంచనా', hi: 'कार्बन फुटप्रिंट अनुमान', mr: 'कार्बन फूटप्रिंट अंदाज'
    },
    'feature.carbon.desc': {
        en: 'Calculate your farm\'s carbon emissions using IPCC-backed data. Get a rating (A–E), breakdown by activity, and actionable suggestions to reduce your footprint.',
        te: 'IPCC డేటా ఆధారంగా మీ వ్యవసాయ క్షేత్రం యొక్క కార్బన్ ఉద్గారాలను లెక్కించండి. రేటింగ్ (A–E) మరియు తగ్గింపు సూచనలు పొందండి.',
        hi: 'IPCC डेटा का उपयोग करके अपने खेत के कार्बन उत्सर्जन की गणना करें। रेटिंग (A–E) और कमी के सुझाव प्राप्त करें।',
        mr: 'IPCC डेटावर आधारित तुमच्या शेताचे कार्बन उत्सर्जन मोजा. रेटिंग (A–E) आणि कमी करण्याचे उपाय मिळवा.'
    },
    'feature.chatbot.title': {
        en: 'AI Farming Chatbot', te: 'AI వ్యవసాయ చాట్‌బాట్', hi: 'AI कृषि चैटबॉट', mr: 'AI शेती चॅटबॉट'
    },
    'feature.chatbot.desc': {
        en: 'Ask questions about crops, soil, weather, and pests in English, Telugu, Hindi, or Marathi. Get instant expert answers.',
        te: 'పంటలు, నేల, వాతావరణం మరియు పురుగుల గురించి తెలుగు, ఆంగ్లం, హిందీ లేదా మరాఠీలో ప్రశ్నలు అడగండి.',
        hi: 'फसलों, मिट्टी, मौसम और कीटों के बारे में अंग्रेजी, तेलुगू, हिंदी या मराठी में प्रश्न पूछें।',
        mr: 'पिके, माती, हवामान आणि किडींबद्दल इंग्रजी, तेलुगू, हिंदी किंवा मराठीत प्रश्न विचारा.'
    },
    'feature.cropCalendar.title': {
        en: 'Crop Calendar', te: 'పంట క్యాలెండర్', hi: 'फसल कैलेंडर', mr: 'पीक कॅलेंडर'
    },
    'feature.cropCalendar.desc': {
        en: 'Region-wise sowing and harvesting windows for 14+ crops. Know exactly when to sow and when to harvest based on your region and season.',
        te: '14+ పంటలకు ప్రాంతం-వారీ నాటు మరియు కోత విండోలు. మీ ప్రాంతం మరియు సీజన్ ఆధారంగా ఎప్పుడు నాటాలో మరియు కోయాలో తెలుసుకోండి.',
        hi: '14+ फसलों के लिए क्षेत्र-वार बुवाई और कटाई विंडो। अपने क्षेत्र और मौसम के आधार पर कब बोएं और कटाई करें।',
        mr: '14+ पिकांसाठी प्रदेश-निहाय पेरणी आणि काढणीचे कालावधी. तुमच्या प्रदेश आणि हंगामानुसार केव्हा पेरायचे ते जाणून घ्या.'
    },
    'feature.schemes.title': {
        en: 'Government Schemes', te: 'ప్రభుత్వ పథకాలు', hi: 'सरकारी योजनाएं', mr: 'सरकारी योजना'
    },
    'feature.schemes.desc': {
        en: 'Explore PM-KISAN, PMFBY, KCC, PM-KUSUM and 8+ real government agriculture schemes. Check eligibility and learn how to apply.',
        te: 'PM-KISAN, PMFBY, KCC, PM-KUSUM మరియు 8+ నిజమైన ప్రభుత్వ వ్యవసాయ పథకాలను చూడండి. అర్హత తనిఖీ చేయండి మరియు దరఖాస్తు చేయడం నేర్చుకోండి.',
        hi: 'PM-KISAN, PMFBY, KCC, PM-KUSUM और 8+ असली सरकारी कृषि योजनाओं की खोज करें। पात्रता जांचें और आवेदन करना सीखें।',
        mr: 'PM-KISAN, PMFBY, KCC, PM-KUSUM आणि 8+ खऱ्या सरकारी कृषी योजना पहा. पात्रता तपासा आणि अर्ज कसा करायचा ते जाणून घ्या.'
    },
    'home.featuresTitle': {
        en: 'Everything a Farmer Needs', te: 'రైతుకు అవసరమైన ప్రతిదీ', hi: 'किसान को जो भी चाहिए', mr: 'शेतकऱ्यांना जे हवे ते सर्व'
    },
    'home.featuresSubtitle': {
        en: 'Powered by Machine Learning and Real-Time Weather Data',
        te: 'మెషిన్ లెర్నింగ్ మరియు రియల్-టైమ్ వాతావరణ డేటా ద్వారా',
        hi: 'मशीन लर्निंग और रीयल-टाइम मौसम डेटा द्वारा संचालित',
        mr: 'मशीन लर्निंग आणि रिअल-टाइम हवामान डेटा द्वारा संचालित'
    },

    // ========== ANALYSIS PAGE ==========
    'analysis.title': {
        en: '🌾 Farm Analysis', te: '🌾 వ్యవసాయ విశ్లేషణ', hi: '🌾 खेत विश्लेषण', mr: '🌾 शेती विश्लेषण'
    },
    'analysis.subtitle': {
        en: 'Get AI-powered crop & fertilizer recommendations with profit estimates',
        te: 'AI ఆధారిత పంట & ఎరువు సిఫార్సులు లాభ అంచనాలతో పొందండి',
        hi: 'AI-संचालित फसल और उर्वरक सिफारिशें लाभ अनुमान के साथ पाएं',
        mr: 'AI-संचालित पीक आणि खत शिफारशी नफा अंदाजासह मिळवा'
    },
    'analysis.step1': {
        en: 'Step 1: Your Location', te: 'దశ 1: మీ స్థానం', hi: 'चरण 1: आपका स्थान', mr: 'चरण 1: तुमचे स्थान'
    },
    'analysis.step1.desc': {
        en: 'Enter your farm location. Weather will be auto-fetched.',
        te: 'మీ పొలం స్థానం నమోదు చేయండి. వాతావరణం స్వయంచాలకంగా పొందబడుతుంది.',
        hi: 'अपने खेत का स्थान दर्ज करें। मौसम स्वतः प्राप्त होगा।',
        mr: 'तुमच्या शेताचे स्थान प्रविष्ट करा. हवामान स्वयंचलितपणे मिळेल.'
    },
    'analysis.location': {
        en: 'Village / City / District', te: 'గ్రామం / నగరం / జిల్లా', hi: 'गांव / शहर / जिला', mr: 'गाव / शहर / जिल्हा'
    },
    'analysis.locationPlaceholder': {
        en: 'e.g. Warangal, Hyderabad, Nizamabad',
        te: 'ఉదా. వరంగల్, హైదరాబాద్, నిజామాబాద్',
        hi: 'जैसे वारंगल, हैदराबाद, निज़ामाबाद',
        mr: 'उदा. वारंगल, हैदराबाद, निजामाबाद'
    },
    'analysis.landArea': {
        en: 'Land Area', te: 'భూమి వైశాల్యం', hi: 'भूमि क्षेत्र', mr: 'जमीन क्षेत्र'
    },
    'analysis.acres': {
        en: '(acres)', te: '(ఎకరాలు)', hi: '(एकड़)', mr: '(एकर)'
    },
    'analysis.region': {
        en: 'Region', te: 'ప్రాంతం', hi: 'क्षेत्र', mr: 'प्रदेश'
    },
    'analysis.useLocation': {
        en: '📍 Use Current Location', te: '📍 ప్రస్తుత స్థానం ఉపయోగించండి', hi: '📍 वर्तमान स्थान उपयोग करें', mr: '📍 सध्याचे स्थान वापरा'
    },
    'analysis.nextCrop': {
        en: 'Next: Crop Details →', te: 'తదుపరి: పంట వివరాలు →', hi: 'अगला: फसल विवरण →', mr: 'पुढे: पीक तपशील →'
    },
    'analysis.step2': {
        en: 'Step 2: Previous Crop & Chemicals', te: 'దశ 2: మునుపటి పంట & రసాయనాలు', hi: 'चरण 2: पिछली फसल और रसायन', mr: 'चरण 2: मागील पीक आणि रसायने'
    },
    'analysis.step2.desc': {
        en: 'Tell us what you grew last season and what chemicals you used.',
        te: 'గత సీజన్‌లో మీరు ఏమి పండించారు మరియు ఏ రసాయనాలు ఉపయోగించారో చెప్పండి.',
        hi: 'बताएं कि पिछले सीजन में आपने क्या उगाया और कौन से रसायन इस्तेमाल किए।',
        mr: 'मागील हंगामात काय पिकवले आणि कोणती रसायने वापरली ते सांगा.'
    },
    'analysis.prevCrop': {
        en: 'Previous Crop', te: 'మునుపటి పంట', hi: 'पिछली फसल', mr: 'मागील पीक'
    },
    'analysis.season': {
        en: 'Season', te: 'సీజన్', hi: 'मौसम', mr: 'हंगाम'
    },
    'analysis.prevFertilizer': {
        en: 'Previous Fertilizer Used', te: 'మునుపు ఉపయోగించిన ఎరువు', hi: 'पिछला उपयोग किया गया उर्वरक', mr: 'मागील वापरलेले खत'
    },
    'analysis.prevPesticide': {
        en: 'Previous Pesticide Used', te: 'మునుపు ఉపయోగించిన పురుగుమందు', hi: 'पिछला उपयोग किया गया कीटनाशक', mr: 'मागील वापरलेले कीटकनाशक'
    },
    'analysis.lastYield': {
        en: 'Last Season Yield', te: 'గత సీజన్ దిగుబడి', hi: 'पिछले सीजन की उपज', mr: 'मागील हंगामातील उत्पादन'
    },
    'analysis.kgTotal': {
        en: '(kg total)', te: '(మొత్తం కిలోలు)', hi: '(कुल किग्रा)', mr: '(एकूण किग्रॅ)'
    },
    'analysis.irrigation': {
        en: 'Irrigation Type', te: 'నీటిపారుదల రకం', hi: 'सिंचाई प्रकार', mr: 'सिंचन प्रकार'
    },
    'analysis.back': {
        en: '← Back', te: '← వెనుకకు', hi: '← पीछे', mr: '← मागे'
    },
    'analysis.nextSoil': {
        en: 'Next: Soil Details →', te: 'తదుపరి: నేల వివరాలు →', hi: 'अगला: मिट्टी विवरण →', mr: 'पुढे: माती तपशील →'
    },
    'analysis.step3': {
        en: 'Step 3: Soil Test Data', te: 'దశ 3: నేల పరీక్ష డేటా', hi: 'चरण 3: मिट्टी परीक्षण डेटा', mr: 'चरण 3: माती चाचणी डेटा'
    },
    'analysis.step3.desc': {
        en: 'Enter your soil test report values. These help the AI make accurate predictions.',
        te: 'మీ నేల పరీక్ష నివేదిక విలువలను నమోదు చేయండి. ఇవి AI ఖచ్చితమైన అంచనాలు చేయడానికి సహాయపడతాయి.',
        hi: 'अपनी मिट्टी परीक्षण रिपोर्ट के मान दर्ज करें। ये AI को सटीक भविष्यवाणी करने में मदद करते हैं।',
        mr: 'तुमच्या माती चाचणी अहवालाची मूल्ये प्रविष्ट करा. हे AI ला अचूक अंदाज वर्तवण्यात मदत करतात.'
    },
    'analysis.soilType': {
        en: 'Soil Type', te: 'నేల రకం', hi: 'मिट्टी प्रकार', mr: 'माती प्रकार'
    },
    'analysis.nitrogen': {
        en: 'Nitrogen (N)', te: 'నత్రజని (N)', hi: 'नाइट्रोजन (N)', mr: 'नायट्रोजन (N)'
    },
    'analysis.phosphorus': {
        en: 'Phosphorus (P)', te: 'భాస్వరం (P)', hi: 'फॉस्फोरस (P)', mr: 'फॉस्फरस (P)'
    },
    'analysis.potassium': {
        en: 'Potassium (K)', te: 'పొటాషియం (K)', hi: 'पोटैशियम (K)', mr: 'पोटॅशियम (K)'
    },
    'analysis.soilPh': {
        en: 'Soil pH', te: 'నేల pH', hi: 'मिट्टी pH', mr: 'माती pH'
    },
    'analysis.rainfall': {
        en: 'Annual Rainfall', te: 'వార్షిక వర్షపాతం', hi: 'वार्षिक वर्षा', mr: 'वार्षिक पाऊस'
    },
    'analysis.soilMoisture': {
        en: 'Soil Moisture', te: 'నేల తేమ', hi: 'मिट्टी नमी', mr: 'माती ओलावा'
    },
    'analysis.organicCarbon': {
        en: 'Organic Carbon', te: 'సేంద్రియ కార్బన్', hi: 'जैविक कार्बन', mr: 'सेंद्रिय कार्बन'
    },
    'analysis.ec': {
        en: 'Elec. Conductivity', te: 'విద్యుత్ వాహకత', hi: 'विद्युत चालकता', mr: 'विद्युत वाहकता'
    },
    'analysis.analyze': {
        en: '🚀 Analyze My Farm', te: '🚀 నా పొలాన్ని విశ్లేషించండి', hi: '🚀 मेरा खेत विश्लेषित करें', mr: '🚀 माझ्या शेताचे विश्लेषण करा'
    },
    'analysis.analyzing': {
        en: '🔬 Analyzing your farm data...', te: '🔬 మీ పొలం డేటాను విశ్లేషిస్తోంది...', hi: '🔬 आपके खेत का डेटा विश्लेषित हो रहा है...', mr: '🔬 तुमच्या शेताचा डेटा विश्लेषित होत आहे...'
    },
    'analysis.newAnalysis': {
        en: '🔄 New Analysis', te: '🔄 కొత్త విశ్లేషణ', hi: '🔄 नया विश्लेषण', mr: '🔄 नवीन विश्लेषण'
    },

    // ========== MARKET PAGE ==========
    'market.title': {
        en: '💰 Market Prices', te: '💰 మార్కెట్ ధరలు', hi: '💰 बाज़ार भाव', mr: '💰 बाजारभाव'
    },
    'market.subtitle': {
        en: 'Compare crop & vegetable prices at nearby mandis within your radius',
        te: 'మీ పరిధిలో సమీపంలోని మండీలలో పంట & కూరగాయల ధరలను పోల్చండి',
        hi: 'अपने दायरे में आसपास की मंडियों में फसल और सब्जी कीमतों की तुलना करें',
        mr: 'तुमच्या त्रिज्येतील जवळच्या बाजारांमध्ये पीक आणि भाजीपाला किंमतींची तुलना करा'
    },
    'market.crop': {
        en: 'Crop / Vegetable', te: 'పంట / కూరగాయ', hi: 'फसल / सब्जी', mr: 'पीक / भाजीपाला'
    },
    'market.cropPlaceholder': {
        en: 'e.g. Tomato, Rice, Onion', te: 'ఉదా. టమాటా, వరి, ఉల్లిపాయ', hi: 'जैसे टमाटर, चावल, प्याज', mr: 'उदा. टोमॅटो, तांदूळ, कांदा'
    },
    'market.location': {
        en: 'Your Location', te: 'మీ స్థానం', hi: 'आपका स्थान', mr: 'तुमचे स्थान'
    },
    'market.locationPlaceholder': {
        en: 'e.g. Hyderabad, Delhi', te: 'ఉదా. హైదరాబాద్, ఢిల్లీ', hi: 'जैसे हैदराबाद, दिल्ली', mr: 'उदा. हैदराबाद, दिल्ली'
    },
    'market.radius': {
        en: 'Search Radius', te: 'శోధన వ్యాసార్థం', hi: 'खोज त्रिज्या', mr: 'शोध त्रिज्या'
    },
    'market.useMyLocation': {
        en: '📍 Use My Location', te: '📍 నా స్థానం ఉపయోగించండి', hi: '📍 मेरा स्थान उपयोग करें', mr: '📍 माझे स्थान वापरा'
    },
    'market.search': {
        en: 'Search Prices', te: 'ధరలు శోధించండి', hi: 'भाव खोजें', mr: 'भाव शोधा'
    },

    // ========== WEATHER PAGE ==========
    'weather.title': {
        en: '🌤️ Weather Dashboard', te: '🌤️ వాతావరణ డాష్‌బోర్డ్', hi: '🌤️ मौसम डैशबोर्ड', mr: '🌤️ हवामान डॅशबोर्ड'
    },
    'weather.subtitle': {
        en: 'Get real-time weather and 5-day forecast with farming advisories',
        te: 'వ్యవసాయ సలహాలతో నిజ-సమయ వాతావరణం మరియు 5-రోజుల సూచన పొందండి',
        hi: 'खेती सलाह के साथ रीयल-टाइम मौसम और 5-दिन का पूर्वानुमान पाएं',
        mr: 'शेती सल्ल्यासह रिअल-टाइम हवामान आणि 5-दिवसांचा अंदाज मिळवा'
    },
    'weather.location': {
        en: 'Location', te: 'స్థానం', hi: 'स्थान', mr: 'स्थान'
    },
    'weather.placeholder': {
        en: 'Enter city or village name', te: 'నగరం లేదా గ్రామం పేరు నమోదు చేయండి', hi: 'शहर या गांव का नाम दर्ज करें', mr: 'शहर किंवा गावाचे नाव प्रविष्ट करा'
    },
    'weather.useMyLocation': {
        en: '📍 Use My Location', te: '📍 నా స్థానం ఉపయోగించండి', hi: '📍 मेरा स्थान उपयोग करें', mr: '📍 माझे स्थान वापरा'
    },
    'weather.getWeather': {
        en: 'Get Weather', te: 'వాతావరణం పొందండి', hi: 'मौसम पाएं', mr: 'हवामान मिळवा'
    },
    'weather.humidity': {
        en: 'Humidity', te: 'తేమ', hi: 'आर्द्रता', mr: 'आर्द्रता'
    },
    'weather.rainfallLabel': {
        en: 'Rainfall', te: 'వర్షపాతం', hi: 'वर्षा', mr: 'पाऊस'
    },
    'weather.wind': {
        en: 'Wind', te: 'గాలి', hi: 'हवा', mr: 'वारा'
    },
    'weather.clouds': {
        en: 'Clouds', te: 'మేఘాలు', hi: 'बादल', mr: 'ढग'
    },
    'weather.forecast': {
        en: '📅 5-Day Forecast', te: '📅 5-రోజుల సూచన', hi: '📅 5-दिन का पूर्वानुमान', mr: '📅 5-दिवसांचा अंदाज'
    },
    'weather.advisory': {
        en: '🌾 Farming Advisory', te: '🌾 వ్యవసాయ సలహా', hi: '🌾 खेती सलाह', mr: '🌾 शेती सल्ला'
    },

    // ========== CROP DOCTOR PAGE ==========
    'cropDoctor.title': {
        en: '🩺 Crop Doctor', te: '🩺 పంట వైద్యుడు', hi: '🩺 फसल डॉक्टर', mr: '🩺 पीक डॉक्टर'
    },
    'cropDoctor.subtitle': {
        en: 'Upload a photo of a crop leaf to detect diseases and get treatment recommendations',
        te: 'వ్యాధులను గుర్తించి చికిత్స సిఫార్సులు పొందడానికి పంట ఆకు ఫోటో అప్‌లోడ్ చేయండి',
        hi: 'रोग पहचान और उपचार सिफारिशें पाने के लिए फसल की पत्ती की फोटो अपलोड करें',
        mr: 'रोग ओळखण्यासाठी आणि उपचार शिफारशी मिळविण्यासाठी पिकाच्या पानाचा फोटो अपलोड करा'
    },
    'cropDoctor.upload': {
        en: '📸 Tap to Scan Leaf', te: '📸 ఆకును స్కాన్ చేయండి', hi: '📸 स्कैन करें', mr: '📸 स्कॅन करा'
    },
    'cropDoctor.dragDrop': {
        en: 'or drag & drop an image here', te: 'లేదా ఇక్కడ చిత్రాన్ని ఉంచండి', hi: 'या यहां चित्र खींचें और छोड़ें', mr: 'किंवा येथे चित्र ड्रॅग करा'
    },
    'cropDoctor.analyze': {
        en: '🔍 Analyze', te: '🔍 విశ్లేషించండి', hi: '🔍 विश्लेषण करें', mr: '🔍 विश्लेषण करा'
    },
    'cropDoctor.analyzing': {
        en: 'Analyzing leaf...', te: 'ఆకును విశ్లేషిస్తోంది...', hi: 'पत्ती का विश्लेषण हो रहा है...', mr: 'पानाचे विश्लेषण होत आहे...'
    },
    'cropDoctor.medicine': {
        en: 'Medicine', te: 'మందులు', hi: 'दवा', mr: 'औषध'
    },
    'cropDoctor.plan': {
        en: 'Treatment Plan', te: 'చికిత్స ప్రణాళిక', hi: 'उपचार योजना', mr: 'उपचार योजना'
    },
    'cropDoctor.confidence': {
        en: 'Confidence Scores', te: 'విశ్వాస స్కోర్లు', hi: 'विश्वास स्कोर', mr: 'विश्वास स्कोर'
    },
    'cropDoctor.scanAnother': {
        en: '🔄 Scan Another Leaf', te: '🔄 మరొక ఆకును స్కాన్ చేయండి', hi: '🔄 और एक पत्ती स्कैन करें', mr: '🔄 आणखी एक पान स्कॅन करा'
    },

    // ========== CARBON ESTIMATION ==========
    'carbon.title': {
        en: 'Carbon Footprint Estimator', te: 'కార్బన్ ఫుట్‌ప్రింట్ అంచనా', hi: 'कार्बन फुटप्रिंट अनुमान', mr: 'कार्बन फूटप्रिंट अंदाज'
    },
    'carbon.subtitle': {
        en: "Calculate your farm's greenhouse gas emissions using IPCC Tier 1 factors for Indian agriculture",
        te: 'భారత వ్యవసాయానికి IPCC Tier 1 కారకాలు ఉపయోగించి మీ వ్యవసాయ క్షేత్రం యొక్క గ్రీన్‌హౌస్ గ్యాస్ ఉద్గారాలను లెక్కించండి',
        hi: 'भारतीय कृषि के लिए IPCC Tier 1 कारकों का उपयोग करके अपने खेत के ग्रीनहाउस गैस उत्सर्जन की गणना करें',
        mr: 'भारतीय शेतीसाठी IPCC Tier 1 घटकांचा वापर करून तुमच्या शेताचे हरितगृह वायू उत्सर्जन मोजा'
    },
    'carbon.formTitle': {
        en: 'Farm Details', te: 'వ్యవసాయ వివరాలు', hi: 'खेत का विवरण', mr: 'शेताचे तपशील'
    },
    'carbon.crop': { en: 'Crop', te: 'పంట', hi: 'फसल', mr: 'पीक' },
    'carbon.area': { en: 'Farm Area', te: 'వ్యవసాయ విస్తీర్ణం', hi: 'खेत का क्षेत्रफल', mr: 'शेताचे क्षेत्र' },
    'carbon.fertilizer': { en: 'Fertilizer Type', te: 'ఎరువు రకం', hi: 'उर्वरक प्रकार', mr: 'खत प्रकार' },
    'carbon.fertQty': { en: 'Fertilizer Quantity', te: 'ఎరువు పరిమాణం', hi: 'उर्वरक मात्रा', mr: 'खत प्रमाण' },
    'carbon.irrigation': { en: 'Irrigation Type', te: 'నీటిపారుదల రకం', hi: 'सिंचाई प्रकार', mr: 'सिंचाई प्रकार' },
    'carbon.tillage': { en: 'Tillage Method', te: 'దున్నడం పద్ధతి', hi: 'जुताई विधि', mr: 'मशागत पद्धत' },
    'carbon.residue': { en: 'Crop Residue Management', te: 'పంట అవశేష నిర్వహణ', hi: 'फसल अवशेष प्रबंधन', mr: 'पीक अवशेष व्यवस्थापन' },
    'carbon.practices': {
        en: 'Sustainable Practices (select all that apply)', te: 'సుస్థిర పద్ధతులు (వర్తించేవి అన్నీ ఎంచుకోండి)',
        hi: 'टिकाऊ प्रथाएं (लागू सभी चुनें)', mr: 'शाश्वत पद्धती (लागू असलेल्या सर्व निवडा)'
    },
    'carbon.calculate': { en: 'Calculate Carbon Footprint', te: 'కార్బన్ ఫుట్‌ప్రింట్ లెక్కించండి', hi: 'कार्बन फुटप्रिंट की गणना करें', mr: 'कार्बन फूटप्रिंट मोजा' },
    'carbon.results': { en: 'Your Carbon Results', te: 'మీ కార్బన్ ఫలితాలు', hi: 'आपके कार्बन परिणाम', mr: 'तुमचे कार्बन परिणाम' },
    'carbon.rating': { en: 'Carbon Rating', te: 'కార్బన్ రేటింగ్', hi: 'कार्बन रेटिंग', mr: 'कार्बन रेटिंग' },
    'carbon.suggestions': {
        en: 'Suggestions to Reduce Footprint', te: 'ఫుట్‌ప్రింట్ తగ్గించడానికి సూచనలు',
        hi: 'फुटप्रिंट कम करने के सुझाव', mr: 'फूटप्रिंट कमी करण्याचे उपाय'
    },
    'carbon.totalEmissions': { en: 'Total Emissions', te: 'మొత్తం ఉద్గారాలు', hi: 'कुल उत्सर्जन', mr: 'एकूण उत्सर्जन' },
    'carbon.perHectare': { en: 'Per Hectare', te: 'హెక్టేరుకు', hi: 'प्रति हेक्टेयर', mr: 'प्रति हेक्टर' },
    'carbon.sequestration': { en: 'Carbon Sequestered', te: 'కార్బన్ సీక్వెస్ట్రేషన్', hi: 'कार्बन अनुक्रमण', mr: 'कार्बन संचयन' },
    'carbon.netEmissions': { en: 'Net Emissions', te: 'నికర ఉద్గారాలు', hi: 'शुद्ध उत्सर्जन', mr: 'निव्वळ उत्सर्जन' },
    'carbon.breakdown': { en: 'Emissions Breakdown', te: 'ఉద్గారాల విభజన', hi: 'उत्सर्जन का विवरण', mr: 'उत्सर्जनाचे तपशील' },
    'carbon.comparison': { en: 'vs National Average', te: 'జాతీయ సగటుతో పోలిక', hi: 'राष्ट्रीय औसत से तुलना', mr: 'राष्ट्रीय सरासरीशी तुलना' },
    'carbon.equivalents': { en: 'CO₂ Equivalents', te: 'CO₂ సమానాలు', hi: 'CO₂ समतुल्य', mr: 'CO₂ समतुल्य' },
    'carbon.equivalent.cars': { en: 'km driven in average car', te: 'సగటు కారులో km ప్రయాణం', hi: 'औसत कार में km की ड्राइव', mr: 'सरासरी गाडीने km प्रवास' },
    'carbon.equivalent.trees': { en: 'trees to plant to offset (per year)', te: 'అఫ్‌సెట్ చేయడానికి నాటాల్సిన చెట్లు', hi: 'ऑफसेट के लिए पेड़ (प्रति वर्ष)', mr: 'ऑफसेट करण्यासाठी झाडे (वार्षिक)' },
    'carbon.equivalent.flights': { en: 'hours of domestic flight', te: 'దేశీయ విమాన గంటలు', hi: 'घरेलू उड़ान के घंटे', mr: 'देशांतर्गत उड्डाण तास' },
    'carbon.download': { en: 'Download Report', te: 'నివేదిక డౌన్‌లోడ్ చేయండి', hi: 'रिपोर्ट डाउनलोड करें', mr: 'अहवाल डाउनलोड करा' },
    'carbon.dataSource': {
        en: 'Emission factors based on IPCC AR5 Tier 1 guidelines for Indian agriculture. National averages from DARE/ICAR research.',
        te: 'భారత వ్యవసాయానికి IPCC AR5 Tier 1 మార్గదర్శకాల ఆధారంగా ఉద్గార కారకాలు.',
        hi: 'भारतीय कृषि के लिए IPCC AR5 Tier 1 दिशानिर्देशों पर आधारित उत्सर्जन कारक।',
        mr: 'भारतीय शेतीसाठी IPCC AR5 Tier 1 मार्गदर्शक तत्त्वांवर आधारित उत्सर्जन घटक.'
    },
    'carbon.resultsPlaceholder': { en: 'Fill in the form to see results', te: 'ఫలితాలు చూడటానికి ఫారం పూరించండి', hi: 'परिणाम देखने के लिए फॉर्म भरें', mr: 'परिणाम पाहण्यासाठी फॉर्म भरा' },
    'carbon.resultsPlaceholderDesc': {
        en: 'Your carbon footprint breakdown and improvement suggestions will appear here',
        te: 'మీ కార్బన్ ఫుట్‌ప్రింట్ విభజన మరియు మెరుగుదల సూచనలు ఇక్కడ కనిపిస్తాయి',
        hi: 'आपका कार्बन फुटप्रिंट विवरण और सुधार के सुझाव यहां दिखाई देंगे',
        mr: 'तुमचे कार्बन फूटप्रिंट तपशील आणि सुधारणा सूचना येथे दिसतील'
    },

    // ========== CHATBOT ==========
    'chatbot.title': { en: 'AI Farming Assistant', te: 'AI వ్యవసాయ సహాయకుడు', hi: 'AI कृषि सहायक', mr: 'AI शेती सहाय्यक' },
    'chatbot.subtitle': {
        en: 'Ask questions about crops, soil, weather, and pests in any language',
        te: 'పంటలు, నేల, వాతావరణం మరియు పురుగుల గురించి ఏ భాషలోనైనా ప్రశ్నలు అడగండి',
        hi: 'किसी भी भाषा में फसलों, मिट्टी, मौसम और कीटों के बारे में प्रश्न पूछें',
        mr: 'कोणत्याही भाषेत पिके, माती, हवामान आणि किडींबद्दल प्रश्न विचारा'
    },
    'chatbot.welcome': {
        en: "Hello! I'm your Agri-Connect farming assistant 🌾. Ask me about crops, soil, weather, or market prices!",
        te: 'నమస్కారం! నేను మీ అగ్రి-కనెక్ట్ వ్యవసాయ సహాయకుడిని 🌾. పంటలు, నేల, వాతావరణం లేదా మార్కెట్ ధరల గురించి అడగండి!',
        hi: 'नमस्ते! मैं आपका अग्री-कनेक्ट कृषि सहायक हूँ 🌾। फसलें, मिट्टी, मौसम या बाज़ार भाव के बारे में पूछें!',
        mr: 'नमस्कार! मी तुमचा ऍग्री-कनेक्ट शेती सहाय्यक आहे 🌾. पिके, माती, हवामान किंवा बाजारभावाबद्दल विचारा!'
    },
    'chatbot.placeholder': { en: 'Ask me anything about farming...', te: 'వ్యవసాయం గురించి ఏదైనా అడగండి...', hi: 'खेती के बारे में कुछ भी पूछें...', mr: 'शेतीबद्दल काहीही विचारा...' },
    'chatbot.send': { en: 'Send', te: 'పంపు', hi: 'भेजें', mr: 'पाठवा' },
    'chatbot.langHint': {
        en: 'Type in English, తెలుగు, हिंदी, or मराठी — auto-detected',
        te: 'ఆంగ్లం, తెలుగు, హిందీ లేదా మరాఠీలో టైప్ చేయండి — స్వయంచాలకంగా గుర్తించబడుతుంది',
        hi: 'अंग्रेजी, तेलुगू, हिंदी या मराठी में टाइप करें — स्वचालित रूप से पहचाना जाता है',
        mr: 'इंग्रजी, तेलुगू, हिंदी किंवा मराठीत टाइप करा — स्वयंचलितपणे ओळखले जाते'
    },

    // ========== CROP CALENDAR ==========
    'cropCalendar.title': { en: 'Crop Calendar', te: 'పంట క్యాలెండర్', hi: 'फसल कैलेंडर', mr: 'पीक कॅलेंडर' },
    'cropCalendar.subtitle': {
        en: 'Region-wise sowing and harvesting windows for major Indian crops',
        te: 'ప్రధాన భారతీయ పంటలకు ప్రాంతం-వారీ నాటు మరియు కోత విండోలు',
        hi: 'प्रमुख भारतीय फसलों के लिए क्षेत्र-वार बुवाई और कटाई विंडो',
        mr: 'प्रमुख भारतीय पिकांसाठी प्रदेश-निहाय पेरणी आणि काढणीचे कालावधी'
    },
    'cropCalendar.region': { en: 'Region', te: 'ప్రాంతం', hi: 'क्षेत्र', mr: 'प्रदेश' },
    'cropCalendar.season': { en: 'Season', te: 'సీజన్', hi: 'मौसम', mr: 'हंगाम' },
    'cropCalendar.load': { en: 'Load Calendar', te: 'క్యాలెండర్ లోడ్ చేయండి', hi: 'कैलेंडर लोड करें', mr: 'कॅलेंडर लोड करा' },
    'cropCalendar.placeholder': {
        en: 'Select a region and season, then click Load Calendar',
        te: 'ప్రాంతం మరియు సీజన్ ఎంచుకోండి, తరువాత క్యాలెండర్ లోడ్ చేయండి నొక్కండి',
        hi: 'क्षेत्र और मौसम चुनें, फिर कैलेंडर लोड करें पर क्लिक करें',
        mr: 'प्रदेश आणि हंगाम निवडा, नंतर कॅलेंडर लोड करा वर क्लिक करा'
    },

    // ========== GOVT SCHEMES ==========
    'schemes.title': { en: 'Government Agriculture Schemes', te: 'ప్రభుత్వ వ్యవసాయ పథకాలు', hi: 'सरकारी कृषि योजनाएं', mr: 'सरकारी कृषी योजना' },
    'schemes.subtitle': {
        en: 'Explore real Indian government schemes for farmers — PM-KISAN, PMFBY, KCC, PM-KUSUM and more',
        te: 'రైతుల కోసం నిజమైన భారతీయ ప్రభుత్వ పథకాలను చూడండి — PM-KISAN, PMFBY, KCC, PM-KUSUM మరియు మరిన్ని',
        hi: 'किसानों के लिए असली भारतीय सरकारी योजनाओं की खोज करें — PM-KISAN, PMFBY, KCC, PM-KUSUM और अधिक',
        mr: 'शेतकऱ्यांसाठी खऱ्या भारतीय सरकारी योजना — PM-KISAN, PMFBY, KCC, PM-KUSUM आणि बरेच काही'
    },
    'schemes.eligibility': { en: 'Eligibility', te: 'అర్హత', hi: 'पात्रता', mr: 'पात्रता' },
    'schemes.benefit': { en: 'Benefit', te: 'లాభం', hi: 'लाभ', mr: 'फायदा' },
    'schemes.apply': { en: 'Apply Now', te: 'ఇప్పుడు దరఖాస్తు చేయండి', hi: 'अभी आवेदन करें', mr: 'आता अर्ज करा' },
    'schemes.howToApply': { en: 'How to Apply', te: 'దరఖాస్తు ఎలా చేయాలి', hi: 'आवेदन कैसे करें', mr: 'अर्ज कसा करायचा' },

    // ========== FOOTER ==========
    'footer.brand': {
        en: '🌾 Agri-Connect', te: '🌾 అగ్రి-కనెక్ట్', hi: '🌾 एग्री-कनेक्ट', mr: '🌾 ऍग्री-कनेक्ट'
    },
    'footer.desc': {
        en: 'Empowering Indian farmers with AI-driven crop recommendations, real-time market prices, and weather insights. Built for the backbone of our nation.',
        te: 'AI ఆధారిత పంట సిఫార్సులు, నిజ-సమయ మార్కెట్ ధరలు మరియు వాతావరణ అంతర్దృష్టులతో భారతీయ రైతులను శక్తివంతం చేయడం.',
        hi: 'AI-संचालित फसल सिफारिशों, रीयल-टाइम बाज़ार भाव और मौसम अंतर्दृष्टि से भारतीय किसानों को सशक्त बनाना।',
        mr: 'AI-संचालित पीक शिफारशी, रिअल-टाइम बाजारभाव आणि हवामान अंतर्दृष्टी द्वारे भारतीय शेतकऱ्यांना सक्षम बनवणे.'
    },
    'footer.copyright': {
        en: '© 2026 Agri-Connect. Made with ❤️ for Indian Farmers.',
        te: '© 2026 అగ్రి-కనెక్ట్. భారతీయ రైతుల కోసం ❤️ తో తయారు చేయబడింది.',
        hi: '© 2026 एग्री-कनेक्ट। भारतीय किसानों के लिए ❤️ से बनाया गया।',
        mr: '© 2026 ऍग्री-कनेक्ट. भारतीय शेतकऱ्यांसाठी ❤️ ने बनवलेले.'
    },

    // ========== COMMON ==========
    'common.listening': {
        en: '🎤 Listening... Speak now', te: '🎤 వింటోంది... ఇప్పుడు మాట్లాడండి', hi: '🎤 सुन रहा है... अब बोलें', mr: '🎤 ऐकत आहे... आता बोला'
    },
    'common.micDenied': {
        en: 'Microphone access denied. Please allow microphone in browser settings.',
        te: 'మైక్రోఫోన్ యాక్సెస్ నిరాకరించబడింది. బ్రౌజర్ సెట్టింగ్‌లలో మైక్రోఫోన్‌ను అనుమతించండి.',
        hi: 'माइक्रोफ़ोन एक्सेस अस्वीकृत। कृपया ब्राउज़र सेटिंग्स में माइक्रोफ़ोन की अनुमति दें।',
        mr: 'मायक्रोफोन ऍक्सेस नाकारली. कृपया ब्राउझर सेटिंग्जमध्ये मायक्रोफोनला परवानगी द्या.'
    },
    'common.noVoice': {
        en: 'Voice input not supported in this browser', te: 'ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ మద్దతు లేదు', hi: 'इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है', mr: 'या ब्राउझरमध्ये व्हॉइस इनपुट समर्थित नाही'
    },
    'common.south': { en: 'South', te: 'దక్షిణ', hi: 'दक्षिण', mr: 'दक्षिण' },
    'common.north': { en: 'North', te: 'ఉత్తర', hi: 'उत्तर', mr: 'उत्तर' },
    'common.east': { en: 'East', te: 'తూర్పు', hi: 'पूर्व', mr: 'पूर्व' },
    'common.west': { en: 'West', te: 'పశ్చిమ', hi: 'पश्चिम', mr: 'पश्चिम' },
};

// ============================================
// State
// ============================================
let currentLang = localStorage.getItem(LANG_KEY) || 'en';
const listeners = [];

// ============================================
// Public API
// ============================================

/**
 * Get current language code
 */
export function getCurrentLang() {
    return currentLang;
}

/**
 * Set language and notify all listeners
 */
export function setLang(lang) {
    if (!['en', 'te', 'hi', 'mr'].includes(lang)) return;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    listeners.forEach(cb => cb(lang));
}

/**
 * Translate a key to the current language
 */
export function t(key) {
    const entry = translations[key];
    if (!entry) return key;
    return entry[currentLang] || entry['en'] || key;
}

/**
 * Register a callback for language changes
 * Returns an unsubscribe function
 */
export function onLangChange(callback) {
    listeners.push(callback);
    return () => {
        const idx = listeners.indexOf(callback);
        if (idx !== -1) listeners.splice(idx, 1);
    };
}

/**
 * Get speech recognition language code for current language
 */
export function getSpeechLang() {
    return SPEECH_LANGS[currentLang] || 'en-IN';
}
