import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'ar' | 'fr' | 'en';

interface TranslationContextType {
  t: (key: string) => string;
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
}

const translations = {
  ar: {
    // Welcome & Auth
    findBestWorkers: 'اعثر على أفضل العمال',
    connectWithSkilledWorkers: 'تواصل مع العمال المهرة في منطقتك',
    findNearbyWorkers: 'العثور على العمال القريبين',
    gpsLocation: 'باستخدام تحديد الموقع الجغرافي',
    directChat: 'دردشة مباشرة',
    communicateDirectly: 'تواصل مباشرة مع العمال',
    verifiedWorkers: 'عمال موثقين',
    trustedAndRated: 'موثوقين ومقيمين',
    getStarted: 'ابدأ الآن',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    continueAsGuest: 'المتابعة كضيف',
    welcomeBack: 'مرحباً بعودتك',
    signInToContinue: 'سجل دخولك للمتابعة',
    createAccount: 'إنشاء حساب جديد',
    joinHireMeCommunity: 'انضم إلى مجتمع HireMe',
    
    // Navigation
    home: 'الرئيسية',
    workers: 'العمال',
    chat: 'المحادثات',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    
    // Common
    welcome: 'مرحباً',
    guest: 'ضيف',
    location: 'الموقع',
    searchWorkers: 'البحث عن العمال',
    emergencyService: 'خدمة الطوارئ',
    available24h: 'متاحة على مدار الساعة',
    jobCategories: 'أقسام المهن',
    featuredWorkers: 'العمال المميزون',
    recentJobs: 'الأعمال الأخيرة',
    workerName: 'العامل',
    electricalRepair: 'إصلاح كهربائي',
    completed: 'مكتمل',
    rate: 'قيم',
    
    // Professions
    electrician: 'كهربائي',
    plumber: 'سمكري',
    painter: 'دهان',
    construction: 'بناء',
    mechanic: 'ميكانيكي',
    carpenter: 'نجار',
    
    // Workers
    findWorkers: 'العثور على العمال',
    searchByNameOrProfession: 'البحث بالاسم أو المهنة',
    all: 'الكل',
    available: 'متاح',
    verified: 'موثق',
    certified: 'معتمد',
    call: 'اتصال',
    
    // Chat
    messages: 'الرسائل',
    searchConversations: 'البحث في المحادثات',
    
    // Profile
    completedJobs: 'الأعمال المكتملة',
    rating: 'التقييم',
    hiremeCoins: 'عملات HireMe',
    contactInfo: 'معلومات الاتصال',
    achievements: 'الإنجازات',
    verifiedAccount: 'حساب موثق',
    identityVerified: 'تم التحقق من الهوية',
    certifiedWorker: 'عامل معتمد',
    skillsCertified: 'تم اعتماد المهارات',
    topRated: 'الأعلى تقييماً',
    excellentService: 'خدمة ممتازة',
    earned: 'تم الحصول عليه',
    skills: 'المهارات',
    recentReviews: 'التقييمات الأخيرة',
    editProfile: 'تعديل الملف الشخصي',
    shareProfile: 'مشاركة الملف الشخصي',
    
    // Settings
    account: 'الحساب',
    notifications: 'الإشعارات',
    manageNotifications: 'إدارة الإشعارات',
    appearance: 'المظهر',
    darkMode: 'الوضع الداكن',
    enabled: 'مفعل',
    disabled: 'معطل',
    language: 'اللغة',
    selectLanguage: 'اختيار اللغة',
    primaryColor: 'اللون الأساسي',
    customizeAppColor: 'تخصيص لون التطبيق',
    fontSize: 'حجم الخط',
    adjustTextSize: 'ضبط حجم النص',
    selectColor: 'اختيار اللون',
    security: 'الأمان',
    privacy: 'الخصوصية',
    managePrivacySettings: 'إدارة إعدادات الخصوصية',
    support: 'الدعم',
    help: 'المساعدة',
    getFAQsAndSupport: 'الحصول على الأسئلة الشائعة والدعم',
    logout: 'تسجيل الخروج',
    
    // Forms
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    emailAddress: 'عنوان البريد الإلكتروني',
    phoneNumber: 'رقم الهاتف',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    signingIn: 'جاري تسجيل الدخول...',
    orContinueWith: 'أو المتابعة مع',
    continueWithGoogle: 'المتابعة مع Google',
    dontHaveAccount: 'ليس لديك حساب؟',
    fullName: 'الاسم الكامل',
    citizen: 'مواطن',
    worker: 'عامل',
    profession: 'المهنة',
    yearsOfExperience: 'سنوات الخبرة',
    byCreatingAccount: 'بإنشاء حساب، أنت توافق على',
    termsAndConditions: 'الشروط والأحكام',
    creatingAccount: 'جاري إنشاء الحساب...',
    
    // Errors
    error: 'خطأ',
    pleaseEillAllFields: 'يرجى ملء جميع الحقول',
    passwordsDoNotMatch: 'كلمات المرور غير متطابقة',
    pleaseEillAllWorkerFields: 'يرجى ملء جميع حقول العامل',
    invalidCredentials: 'بيانات الدخول غير صحيحة',
    loginFailed: 'فشل في تسجيل الدخول',
    signupFailed: 'فشل في إنشاء الحساب',
  },
  
  fr: {
    // Welcome & Auth
    findBestWorkers: 'Trouvez les meilleurs ouvriers',
    connectWithSkilledWorkers: 'Connectez-vous avec des ouvriers qualifiés dans votre région',
    findNearbyWorkers: 'Trouver des ouvriers à proximité',
    gpsLocation: 'Utilisation de la géolocalisation',
    directChat: 'Chat direct',
    communicateDirectly: 'Communiquez directement avec les ouvriers',
    verifiedWorkers: 'Ouvriers vérifiés',
    trustedAndRated: 'Fiables et notés',
    getStarted: 'Commencer',
    alreadyHaveAccount: 'Vous avez déjà un compte ?',
    continueAsGuest: 'Continuer comme invité',
    welcomeBack: 'Bon retour',
    signInToContinue: 'Connectez-vous pour continuer',
    createAccount: 'Créer un compte',
    joinHireMeCommunity: 'Rejoignez la communauté HireMe',
    
    // Navigation
    home: 'Accueil',
    workers: 'Ouvriers',
    chat: 'Messages',
    profile: 'Profil',
    settings: 'Paramètres',
    
    // Common
    welcome: 'Bienvenue',
    guest: 'Invité',
    location: 'Localisation',
    searchWorkers: 'Rechercher des ouvriers',
    emergencyService: 'Service d\'urgence',
    available24h: 'Disponible 24h/7j',
    jobCategories: 'Catégories de métiers',
    featuredWorkers: 'Ouvriers en vedette',
    recentJobs: 'Travaux récents',
    workerName: 'Ouvrier',
    electricalRepair: 'Réparation électrique',
    completed: 'Terminé',
    rate: 'Noter',
    
    // Professions
    electrician: 'Électricien',
    plumber: 'Plombier',
    painter: 'Peintre',
    construction: 'Construction',
    mechanic: 'Mécanicien',
    carpenter: 'Charpentier',
    
    // Workers
    findWorkers: 'Trouver des ouvriers',
    searchByNameOrProfession: 'Rechercher par nom ou profession',
    all: 'Tous',
    available: 'Disponible',
    verified: 'Vérifié',
    certified: 'Certifié',
    call: 'Appeler',
    
    // Chat
    messages: 'Messages',
    searchConversations: 'Rechercher dans les conversations',
    
    // Profile
    completedJobs: 'Travaux terminés',
    rating: 'Note',
    hiremeCoins: 'Pièces HireMe',
    contactInfo: 'Informations de contact',
    achievements: 'Réalisations',
    verifiedAccount: 'Compte vérifié',
    identityVerified: 'Identité vérifiée',
    certifiedWorker: 'Ouvrier certifié',
    skillsCertified: 'Compétences certifiées',
    topRated: 'Le mieux noté',
    excellentService: 'Service excellent',
    earned: 'Obtenu',
    skills: 'Compétences',
    recentReviews: 'Avis récents',
    editProfile: 'Modifier le profil',
    shareProfile: 'Partager le profil',
    
    // Settings & Forms (abbreviated for space)
    account: 'Compte',
    settings: 'Paramètres',
    email: 'Email',
    phone: 'Téléphone',
    password: 'Mot de passe',
    signIn: 'Se connecter',
    signUp: 'S\'inscrire',
    error: 'Erreur',
    logout: 'Déconnexion',
  },
  
  en: {
    // Welcome & Auth
    findBestWorkers: 'Find the Best Workers',
    connectWithSkilledWorkers: 'Connect with skilled workers in your area',
    findNearbyWorkers: 'Find Nearby Workers',
    gpsLocation: 'Using GPS location',
    directChat: 'Direct Chat',
    communicateDirectly: 'Communicate directly with workers',
    verifiedWorkers: 'Verified Workers',
    trustedAndRated: 'Trusted and rated',
    getStarted: 'Get Started',
    alreadyHaveAccount: 'Already have an account?',
    continueAsGuest: 'Continue as Guest',
    welcomeBack: 'Welcome Back',
    signInToContinue: 'Sign in to continue',
    createAccount: 'Create Account',
    joinHireMeCommunity: 'Join the HireMe Community',
    
    // Navigation
    home: 'Home',
    workers: 'Workers',
    chat: 'Chat',
    profile: 'Profile',
    settings: 'Settings',
    
    // Common
    welcome: 'Welcome',
    guest: 'Guest',
    location: 'Location',
    searchWorkers: 'Search Workers',
    emergencyService: 'Emergency Service',
    available24h: 'Available 24/7',
    jobCategories: 'Job Categories',
    featuredWorkers: 'Featured Workers',
    recentJobs: 'Recent Jobs',
    workerName: 'Worker',
    electricalRepair: 'Electrical Repair',
    completed: 'Completed',
    rate: 'Rate',
    
    // Professions
    electrician: 'Electrician',
    plumber: 'Plumber',
    painter: 'Painter',
    construction: 'Construction',
    mechanic: 'Mechanic',
    carpenter: 'Carpenter',
    
    // Workers
    findWorkers: 'Find Workers',
    searchByNameOrProfession: 'Search by name or profession',
    all: 'All',
    available: 'Available',
    verified: 'Verified',
    certified: 'Certified',
    call: 'Call',
    
    // Chat
    messages: 'Messages',
    searchConversations: 'Search conversations',
    
    // Profile & Settings (abbreviated)
    completedJobs: 'Completed Jobs',
    rating: 'Rating',
    hiremeCoins: 'HireMe Coins',
    contactInfo: 'Contact Info',
    achievements: 'Achievements',
    account: 'Account',
    settings: 'Settings',
    email: 'Email',
    phone: 'Phone',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    error: 'Error',
    logout: 'Logout',
  },
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  useEffect(() => {
    loadStoredLanguage();
  }, []);

  const loadStoredLanguage = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem('@language');
      if (storedLanguage && ['ar', 'fr', 'en'].includes(storedLanguage)) {
        setLanguageState(storedLanguage as Language);
      }
    } catch (error) {
      console.error('Error loading stored language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      setLanguageState(lang);
      await AsyncStorage.setItem('@language', lang);
    } catch (error) {
      console.error('Error storing language:', error);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value: TranslationContextType = {
    t,
    language,
    setLanguage,
  };

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
};