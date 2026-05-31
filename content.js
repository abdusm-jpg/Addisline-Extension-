const DEBUG = false
const ENABLE_ALL_AUTOMATION = true
const COOKIE_DEBUG = false
const ENABLE_CMP_FINGERPRINT_DEBUG = false
const ENABLE_PASSIVE_COOKIE_INTELLIGENCE = false
const ENABLE_INITIAL_MORE_OPTIONS_FLOW = false
const ENABLE_DEEP_CMP_NAVIGATION = false
const ENABLE_DEEP_CMP_DIAGNOSTICS = false
const ENABLE_DEEP_PREFERENCE_TRAVERSAL = false
const ENABLE_OPTIONAL_TOGGLE_AUTOMATION = false
const ENABLE_MUTATION_DOM_FALLBACKS = false
const ENABLE_SHADOW_ROOT_OBSERVATION = false
const ENABLE_BASIC_REJECT_MUTATION_FALLBACK = false
const ENABLE_LATE_CMP_MUTATION_WAKEUP = true
const ENABLE_SETTINGS_RETRY_FLOW = false
const ENABLE_LIGHTWEIGHT_SETTINGS_OPEN = true
const ENABLE_CMP_SPECIFIC_HELPERS = false
const ENABLE_CUSTOM_VISUAL_SWITCH_DETECTION = false
const ENABLE_VERBOSE_DIAGNOSTICS = false
const ENABLE_FC_PROVIDER_AUTOMATION = false
const REJECT_FLOW_DEBUG = false

let protectionEnabled = false
let protectionMode = 'normal'
let excludedDomains = []
let observer = null
let debounceTimer = null
let preferencesTimer = null
let preferencesRetryTimers = []
let readyStateStartupListener = null
let lastScanAt = 0
let pageScanCount = 0
let observerMutationScanCount = 0
let scanBudgetExhausted = false
let rejectFlowCompleted = false
let delayedLateScanScheduled = false
let lateCMPMutationWakeupUsed = false
let emergencyVisibleCMPScanUsed = false
let lateBannerRecoveryScanUsed = false
let lateBannerRecoveryScanActive = false
let lateBannerRecoveryCheckScheduled = false
let lateHydrationRecheckScheduled = false
let lateHydrationRecheckRan = false
let lateHydrationRecheckActive = false
let lateDiagnosticSnapshotScheduled = false
let lastScanDetectedControlCount = 0
let lastPrioritizedCmpRootsFound = 0
let lastPrioritizedRootTexts = []
let lastPrioritizedRootControlCount = 0
let lastCmpModalSignalsDetected = false
let lastModalGeometryMatched = false
let lastExplicitRejectControlDetected = false
let lastNewsletterSignalsDetected = false
let lastDerivedCmpRootFromControl = false
let lastDerivedControlText = ''
let lastMainDocumentControlProbeCount = 0
let lastShadowControlProbeCount = 0
let lastAccessibleIframeCount = 0
let lastInaccessibleIframeCount = 0
let lastIframeProbeMatchedControls = []
let lastIframeCmpDetected = false
let lastIframeRejectDetected = false
let lastIframeDomain = ''
let lastIframeInspectionSummaries = []
let lastSettingsSaveDetected = false
let lastSettingsSaveClicked = false
let lastSettingsSaveVerification = ''
let lastDiagnosticDecisionTrace = null
let lastRejectCandidateDiagnostics = []
let lastDirectClickableDiagnostics = []
let lastCookieTextScopeDiagnostics = null
let lastLateDiagnosticSnapshot = null
let lastDomScopeDiagnostics = null
let lastIframeAccessibilityDiagnostics = null
let lastBottomBannerDiagnostics = null
let lastExperimentalBottomBannerProbe = null
let lastRejectVerificationDiagnostics = null
let lastFundingChoicesControlDiagnostics = null
let lastFundingChoicesClickedSliderKeys = []
let lastFundingChoicesPreferenceToggleActions = []
let lastFundingChoicesMainRequiredActiveBefore = 0
let lastFundingChoicesMainRequiredActiveAfter = 0
let lastFundingChoicesMainClickedCount = 0
let lastFundingChoicesMainToggleMethod = ''
let lastFundingChoicesProviderPreferenceOpened = false
let lastFundingChoicesProviderToggleCount = 0
let lastFundingChoicesActiveProviderToggleCount = 0
let lastFundingChoicesProviderInspectedCount = 0
let lastFundingChoicesProviderActiveFoundCount = 0
let lastFundingChoicesProviderClickedCount = 0
let lastFundingChoicesProviderTimeBudgetExceeded = false
let lastFundingChoicesProviderToggleMethod = ''
let lastFundingChoicesProviderPreferenceTextMatch = ''
let lastFundingChoicesProviderPreferenceClickableTargetTag = ''
let lastFundingChoicesProviderPreferenceClickMethod = ''
let lastFundingChoicesProviderPreferenceClickSuccess = false
let lastFundingChoicesProviderPreferenceScrollAttempts = 0
let lastFundingChoicesProviderPreferenceScrollTop = 0
let lastFundingChoicesProviderManageVendorsSelectorExecuted = false
let lastFundingChoicesProviderManageVendorsFoundImmediate = false
let lastFundingChoicesProviderManageVendorsFound300ms = false
let lastFundingChoicesProviderManageVendorsFound800ms = false
let lastFundingChoicesProviderManageVendorsFound1500ms = false
let lastFundingChoicesProviderManageVendorsCountImmediate = 0
let lastFundingChoicesProviderManageVendorsCount300ms = 0
let lastFundingChoicesProviderManageVendorsCount800ms = 0
let lastFundingChoicesProviderManageVendorsCount1500ms = 0
let lastFundingChoicesProviderManageVendorsFoundDelayed = false
let lastFundingChoicesProviderManageVendorsElementDiagnostics = null
let lastFundingChoicesProviderManageVendorsRejectedReason = ''
let lastFundingChoicesProviderManageVendorsSensitiveBypass = false
let lastFundingChoicesProviderManageVendorsMode = ''
let lastFundingChoicesProviderManageVendorsAllowClick = false
let lastFundingChoicesProviderManageVendorsFound = false
let lastFundingChoicesProviderManageVendorsClicked = false
let lightweightSettingsOpenAttempted = false
let lastDirectRejectScanBudgetCapped = false
let lastLightweightSettingsBudgetCapped = false
let startupScanScheduled = false
let diagnosticLifecycleStartedAt = Date.now()
let diagnosticLifecycleWatchdogTimer = null
let lastPassiveIntelligenceAt = 0
let scanBurstCount = 0
let noCMPScanCount = 0
let protectedDomainRecorded = false
let lastDiagnosticAction = ''
let lastDiagnosticError = ''
let providerInfoModalCloseAttempts = 0
let statsUpdateQueue = Promise.resolve()
let activeCookieContainer = null
let preferenceTraversalClickCount = 0
let preferenceTraversalActive = false
let pageActionCount = 0
let pageTraversalCount = 0
let lastObserverScanScheduledAt = 0
let lastShadowObserveAt = 0
let loadingScanDeferred = false
let moreOptionsNavigationOpened = false
let moreOptionsNavigationOpeningUntil = 0
let deepCMPNavigationOpened = false
let deepCMPNavigationObservationUntil = 0
const cookieDebugLogCooldowns = new Map()
const rejectFlowLogCooldowns = new Map()
const loggedCMPFingerprints = new Set()
const providerInfoModalSignatures = new Map()
const processedActionElements = new WeakSet()
const bannerActionCooldowns = new Map()
const successfulCookieActionCooldowns = new Map()
const hiddenBannerCooldowns = new Map()
const dismissedBannerSuppressions = new Map()
const rejectFallbackSettingsCooldowns = new Map()
const preferenceExpansionSignatures = new Map()
const preferenceTraversalCooldowns = new Map()
const moreOptionsNavigationCooldowns = new Map()
const deepCMPNavigationCooldowns = new Map()
const unstablePreferenceToggleSignatures = new Map()
const observedShadowRoots = new WeakSet()
const pendingAutomationTimers = new Set()
const pendingIdleCallbacks = new Set()

const STATS_KEY = 'stats'
const COOKIE_AUDIT_KEY = 'lastCookieAudit'
const CURRENT_SITE_DIAGNOSTIC_KEY = 'currentSiteDiagnostic'
const PROTECTED_DOMAINS_KEY = 'protectedDomains'
const BANNER_ACTION_COOLDOWN_MS = 10000
const COOKIE_ACTION_SUCCESS_COOLDOWN_MS = 60000
const BANNER_HIDE_COOLDOWN_MS = 60000
const BANNER_SUPPRESSION_TTL_MS = 45000
const REJECT_FALLBACK_SETTINGS_COOLDOWN_MS = 30000
const MAX_SUPPRESSION_HIDES = 3
const MAX_BANNER_HIDE_ATTEMPTS = 1
const SCAN_DEBOUNCE_MS = 800
const MIN_SCAN_INTERVAL_MS = 3000
const MAX_SCAN_BURST = 3
const SCAN_BURST_RESET_MS = 15000
const OBSERVER_COOLDOWN_MS = 2500
const SHADOW_OBSERVE_COOLDOWN_MS = 5000
const COOKIE_DEBUG_LOG_COOLDOWN_MS = 5000
const MAX_COOKIE_AUDIT_NAMES = 120
const MAX_COOKIE_AUDIT_SAMPLES_PER_CATEGORY = 6
const PAGE_LOADING_SCAN_DELAY_MS = 1500
const LATE_CMP_RESCAN_DELAY_MS = 3500
const LATE_BANNER_RECOVERY_CHECK_DELAY_MS = 4000
const LATE_HYDRATION_RECHECK_DELAY_MS = 1000
const LATE_DIAGNOSTIC_SNAPSHOT_DELAY_MS = 2000
const DIAGNOSTIC_LIFECYCLE_WATCHDOG_MS = 7000
const MAX_SCANS_PER_PAGE = 8
const MAX_MUTATION_SCANS_PER_PAGE = 5
const MAX_NO_CMP_SCANS = 3
const MAX_DOM_QUERY_RESULTS = 300
const MAX_COOKIE_CANDIDATES_PER_SCAN = 10
const MAX_SELECTOR_CANDIDATE_EVALUATIONS = 90
const SELECTOR_CANDIDATE_BUDGET_MS = 180
const MAX_CLICKABLE_CONTROLS_PER_SCAN = 70
const MAX_DIRECT_CONTROL_PRIORITIZATION_INPUT = 160
const DIRECT_REJECT_SCAN_BUDGET_MS = 450
const SETTINGS_FALLBACK_BUDGET_MS = 350
const SETTINGS_SAVE_LOOKUP_BUDGET_MS = 250
const FUNDING_CHOICES_HELPER_BUDGET_MS = 800
const FUNDING_CHOICES_PANEL_DELAY_MS = 500
const FUNDING_CHOICES_PROVIDER_PANEL_DELAY_MS = 350
const FUNDING_CHOICES_SLIDER_SCAN_BUDGET_MS = 300
const MAX_FUNDING_CHOICES_TOGGLE_CLICKS = 10
const MAX_FUNDING_CHOICES_PROVIDER_TOGGLE_CLICKS = 30
const MAX_FUNDING_CHOICES_PROVIDER_TOGGLE_INSPECT = 30
const MAX_FUNDING_CHOICES_PROVIDER_ACTIVE_CLICKS = 10
const FUNDING_CHOICES_PROVIDER_TOGGLE_BUDGET_MS = 500
const MAX_DIAGNOSTIC_CONTROLS = 5
const MAX_DIAGNOSTIC_DECISION_TRACE_STEPS = 48
const MAX_REJECT_CANDIDATE_DIAGNOSTICS = 5
const MAX_DIRECT_CLICKABLE_DIAGNOSTICS_PER_GROUP = 5
const MAX_DIRECT_CLICKABLE_DIAGNOSTIC_TEXT = 80
const MAX_COOKIE_TEXT_SCOPE_MATCHES = 10
const MAX_LATE_DIAGNOSTIC_SNAPSHOT_SAMPLES = 5
const MAX_COOKIE_TEXT_SCOPE_NODES = 800
const MAX_COOKIE_TEXT_SCOPE_SHADOW_ROOTS = 20
const MAX_DOM_SCOPE_FIXED_STICKY_SAMPLES = 5
const MAX_IFRAME_ACCESSIBILITY_DIAGNOSTICS = 5
const MAX_BOTTOM_BANNER_DIAGNOSTICS = 5
const MAX_BOTTOM_BANNER_CONTROL_TEXTS = 5
const MAX_EXPERIMENTAL_BOTTOM_BANNER_PROBE_CANDIDATES = 5
const MAX_FUNDING_CHOICES_CONTROL_DIAGNOSTICS = 8
const MAX_PRIORITIZED_CMP_ROOTS = 4
const MAX_PRIORITIZED_CMP_ROOT_SCAN = 80
const MAX_SAME_ORIGIN_CMP_IFRAMES = 2
const MAX_LIGHTWEIGHT_VISIBLE_TOGGLE_ACTIONS = 5
const MAX_PAGE_ACTIONS = 40
const MAX_PAGE_TRAVERSALS = 500
const TOGGLE_PERSISTENCE_VERIFY_MS = 650
const PREFERENCE_EXPANSION_TTL_MS = 60000
const MAX_PREFERENCE_TRAVERSAL_DEPTH = 3
const PREFERENCE_TRAVERSAL_COOLDOWN_MS = 15000
const PREFERENCE_TRAVERSAL_BUDGET_MS = 2500
const MAX_PREFERENCE_TRAVERSAL_CLICKS = 4
const MORE_OPTIONS_NAVIGATION_COOLDOWN_MS = 30000
const DEEP_CMP_NAVIGATION_COOLDOWN_MS = 30000
const DEEP_CMP_NAVIGATION_OBSERVATION_MS = 4500
const PASSIVE_INTELLIGENCE_SCAN_COOLDOWN_MS = 30000
const MUTATION_SCAN_HINT_TEXTS = [
  'cookie',
  'cookies',
  'consent',
  'privacy',
  'gdpr',
  'cmp',
  'banner',
  'sourcepoint',
  'sp message',
  'sp_message',
  'sp-message',
  'message container',
  'preferenc',
  'privacidad',
  'cookies',
  'consentimiento',
  'preferencias',
]

const DEFAULT_STATS = {
  bannersHidden: 0,
  trackersReduced: 0,
  autoRejects: 0,
  vendorsDenied: 0,
  legitimateInterestsDisabled: 0,
  protectedSites: 0,
}

const safeRejectTexts = [
  'rechazar',
  'rechazar todo',
  'rechazar todas',
  'rechazar las no necesarias',
  'rechazar no necesarias',
  'denegar',
  'no consentir',
  'no consiento',
  'no doy mi consentimiento',
  'no dar consentimiento',
  'continuar sin consentir',
  'continuar sin consentimiento',
  'no acepto',
  'no acepto cookies',
  'continuar sin aceptar',
  'solo necesarias',
  'solo cookies necesarias',
  'usar solo necesarias',
  'reject',
  'reject all',
  'reject optional cookies',
  'reject non-essential cookies',
  'decline',
  'disagree and close',
  'continue without accepting',
  'continue without consent',
  'decline all',
  'no consent',
  'do not consent',
  'refuser les cookies',
  'tout refuser',
  'alle ablehnen',
  'nicht akzeptieren',
  'rifiuta tutto',
  'non accetto',
  'solo necesarias',
  'only necessary',
  'necessary only',
  'essential only',
  'essential cookies only',
  'use essential cookies only',
]

const totalRejectTexts = [
  'reject all',
  'reject all btn',
  'rejectall',
  'reject optional cookies',
  'reject non-essential cookies',
  'reject non essential cookies',
  'rechazar todo',
  'rechazar todas',
  'rechazar las no necesarias',
  'rechazar no necesarias',
  'rechazar cookies',
  'rechazar cookies opcionales',
  'rechazar cookies no esenciales',
  'no consentir',
  'no consiento',
  'no doy mi consentimiento',
  'no dar consentimiento',
  'continuar sin consentir',
  'continuar sin consentimiento',
  'rechazar consentimiento',
  'denegar consentimiento',
  'no acepto',
  'no acepto cookies',
  'continuar sin aceptar',
  'solo necesarias',
  'solo cookies necesarias',
  'usar solo necesarias',
  'decline all',
  'decline all btn',
  'declineall',
  'disagree and close',
  'continue without accepting',
  'continue without consent',
  'decline optional cookies',
  'decline non-essential cookies',
  'no consent',
  'do not consent',
  'i do not consent',
  'deny all',
  'deny all btn',
  'denyall',
  'denegar',
  'denegar todo',
  'refuser les cookies',
  'refuser les cookies optionnels',
  'tout refuser',
  'ne pas accepter les cookies',
  'alle ablehnen',
  'optionale cookies ablehnen',
  'nicht notwendige cookies ablehnen',
  'cookies nicht akzeptieren',
  'rifiuta tutto',
  'rifiuta cookie opzionali',
  'rifiuta cookie non essenziali',
  'non accetto i cookie',
  'ch2 deny all btn',
  'ch2denyallbtn',
]

const rejectTexts = [
  'reject',
  'rechazar',
  'denegar',
  'no consentir',
  'no consiento',
  'continuar sin consentir',
  'continuar sin consentimiento',
  'decline',
  'disagree and close',
  'continuar sin aceptar',
  'rechazar las no necesarias',
  'rechazar no necesarias',
  'solo necesarias',
  'solo cookies necesarias',
  'usar solo necesarias',
  'continue without accepting',
  'continue without consent',
  'essential cookies only',
  'use essential cookies only',
  'refuser',
  'ablehnen',
  'rifiuta',
]

const necessaryOnlyTexts = [
  'only necessary',
  'solo necesarias',
  'solo esenciales',
  'cookies necesarias',
  'solo cookies necesarias',
  'usar solo necesarias',
  'necessary only',
  'essential only',
  'essential cookies only',
  'use essential cookies only',
]

const settingsTexts = [
  'manage cookies',
  'manage settings',
  'cookie settings',
  'privacy settings',
  'manage options',
  'more options',
  'show purposes',
  'manage purposes',
  'purpose settings',
  'view purposes',
  'configurar cookies',
  'gestionar configuracion',
  'gestionar opciones',
  'gestionar preferencias',
  'gestion de opciones',
  'personalizar opciones',
  'mas informacion y personalizacion',
  'opciones',
  'configurar opciones',
  'administrar opciones',
  'administrar preferencias',
  'preferencias',
  'opciones de privacidad',
]

const directSettingsTexts = [
  ...settingsTexts,
]

const unsafeAcceptTexts = [
  'accept all',
  'accept',
  'aceptar todo',
  'aceptar',
  'allow all',
  'i agree',
  'consentir',
]

const directSafeRejectTexts = [
  ...totalRejectTexts,
]

const negativeConsentRejectTexts = [
  'no consentir',
  'no consiento',
  'no doy mi consentimiento',
  'no dar consentimiento',
  'continuar sin consentir',
  'continuar sin consentimiento',
  'rechazar consentimiento',
  'denegar consentimiento',
]

const fundingChoicesManageOptionTexts = [
  'gestionar opcions',
  'gestionar opciones',
  'manage options',
  'more options',
  'mas opciones',
  'mes opcions',
  'configurar opcions',
  'configurar opciones',
  'personalizar opciones',
]

const fundingChoicesProviderPreferenceTexts = [
  'preferencies de proveidors',
  'preferencia de proveidors',
  'preferencias de proveedores',
  'preferencia de proveedores',
  'preferencies dels proveidors',
  'preferencias de partners',
  'vendor preferences',
  'provider preferences',
  'partner preferences',
]

const fundingChoicesProviderInformationalListTexts = [
  'llista de partners',
  'lista de partners',
  'llista de proveidors',
  'lista de proveedores',
  'vendors list',
  'fc vendors list dialog',
  'partner list',
  'partners list',
]

const fundingChoicesSafeActionTexts = [
  ...negativeConsentRejectTexts,
  'rechazar',
  'rechazar todo',
  'rechazar todas',
  'rebutjar',
  'rebutjar tot',
  'continuar sin consentir',
  'continuar sin consentimiento',
  'continuar sense consentir',
  'guardar',
  'guardar preferencias',
  'guardar cambios',
  'desar',
  'desa',
  'confirmar mis opciones',
  'confirmar opciones',
  'confirmar les meves opcions',
  'confirma les opcions',
  'guardar opciones',
  'confirm choices',
  'save choices',
]

const fundingChoicesUnsafePositiveTexts = [
  'aceptar',
  'aceptar todo',
  'accept',
  'accept all',
  'acceptar',
  'acceptar tot',
  'consentir',
  'dar consentimiento',
  'donar consentiment',
  'allow all',
]

const fundingChoicesRequiredToggleTexts = [
  'necessary',
  'strictly necessary',
  'essential',
  'required',
  'always active',
  'always enabled',
  'obligatory',
  'obligatorio',
  'obligatoria',
  'necesarias',
  'necesarios',
  'necessaries',
  'necessaris',
  'necessaria',
  'necessari',
  'esenciales',
  'essencials',
  'sempre actiu',
  'siempre activo',
  'tecnicas',
  'tecniques',
]

const fundingChoicesOptionalToggleTexts = [
  'consentiment',
  'consentimiento',
  'proveidors',
  'proveïdors',
  'proveedores',
  'providers',
  'optional',
  'opcional',
  'opcionals',
  'marketing',
  'advertising',
  'ads',
  'anuncios',
  'publicidad',
  'publicitat',
  'analytics',
  'analitica',
  'analiticas',
  'analitiques',
  'estadisticas',
  'estadistiques',
  'statistics',
  'measurement',
  'medicion',
  'mesura',
  'personalizacion',
  'personalitzacio',
  'personalization',
  'social',
  'third party',
  'terceros',
  'tercers',
  'partners',
  'socios',
]

const fundingChoicesPreferenceCategoryTexts = [
  'consentiment',
  'consentimiento',
  'consent',
  'interes legitim',
  'interes legitimo',
  'interessos legitims',
  'intereses legitimos',
  'legitimate interest',
  'legitimate interests',
]

const directSafeRejectClassSignals = [
  'ch2denyallbtn',
  'denyall',
  'rejectall',
  'declineall',
  'ot pc refuse all handler',
  'onetrust reject all handler',
  'didomi disagree',
  'didomi deny',
  'uc deny all',
  'uc reject all',
  'CybotCookiebotDialogBodyButtonDecline',
  'twcc__decline-button',
  'decline-button',
]

const optionalPreferenceTexts = [
  'analytics',
  'analitica',
  'analitica web',
  'marketing',
  'advertising',
  'ads',
  'personalization',
  'personalisation',
  'statistics',
  'measurement',
  'medicion',
  'tracking',
  'trackers',
  'profiling',
  'social media',
  'social networks',
  'redes sociales',
  'sociales',
  'vendors',
  'vendor',
  'partners',
  'partner',
  'providers',
  'proveedores',
  'proveedores externos',
  'external providers',
  'advertising partners',
  'ibm',
  'trustarc',
  'onetrust',
  'didomi',
  'cookiebot',
  'quantcast',
  'sourcepoint',
  'usercentrics',
  'quantcast choice',
  'interes legitimo',
  'intereses legitimos',
  'legitimate interest',
  'legitimate interest management',
  'sell my data',
  'share my data',
  'venta de datos',
  'compartir datos',
]

const legitimateInterestCounterTexts = [
  'interes legitimo',
  'intereses legitimos',
  'legitimate interest',
  'legitimate interests',
  'legitimate purposes',
  'vendor legitimate interest',
  'legitimate',
  'legitimate basis',
  'legitimate interest basis',
  'legitimate interest purposes',
  'legitimate interest processing',
  'legitimate interest consent',
  'object',
  'object to',
  'objection',
  'oppose',
  'opposition',
  'li purpose',
  'li purposes',
  'interes legítimo',
  'intereses legítimos',
  'base legitima',
  'base legítima',
  'finalidad legitima',
  'finalidad legítima',
  'finalidades legitimas',
  'finalidades legítimas',
  'tratamiento legitimo',
  'tratamiento legítimo',
]

const vendorCounterTexts = [
  'proveedores',
  'proveedores externos',
  'vendors',
  'vendor',
  'partners',
  'partner',
  'advertising partners',
  'external providers',
  'providers',
  'provider',
  'third party',
  'third parties',
]

const trackerCounterTexts = [
  'advertising',
  'advertising partners',
  'analytics',
  'marketing',
  'statistics',
  'measurement',
  'personalization',
  'personalisation',
  'tracking',
  'trackers',
  'profiling',
  'social media',
  'social networks',
  'redes sociales',
  'sell my data',
  'share my data',
  'venta de datos',
  'compartir datos',
]

const providerInfoModalTexts = [
  'proveedores externos',
  'external providers',
  'vendor information',
  'partners',
  'legitimate interest',
  'interes legitimo',
  'intereses legitimos',
]

const providerInfoModalCloseTexts = [
  'cerrar',
  'close',
  'volver',
  'back',
  'aceptar informacion',
  'entendido',
]

const providerInfoModalUnsafeCloseTexts = [
  'accept all',
  'accept cookies',
  'aceptar todo',
  'aceptar cookies',
  'allow all',
  'i agree',
  'consentir',
]

const PROVIDER_INFO_MODAL_MAX_CLOSE_ATTEMPTS = 3

const preferenceSectionTexts = [
  'purposes',
  'purpose',
  'categories',
  'category',
  'features',
  'special features',
  'vendors',
  'vendor preferences',
  'partners',
  'show partners',
  'show vendors',
  'vendor list',
  'partner preferences',
  'proveedores',
  'proveedores externos',
  'preferencias de proveedores',
  'preferencias sobre proveedores',
  'interes legitimo',
  'intereses legitimos',
  'legitimate interest',
  'object',
  'oppose',
  'gestionar interes legitimo',
  'gestion de interes legitimo',
  'legitimate interest management',
  'analytics',
  'marketing',
  'advertising',
  'personalization',
  'tracking',
  'social media',
]

const preferenceExpansionTexts = [
  'show purposes',
  'manage purposes',
  'view purposes',
  'purpose settings',
  'purposes',
  'categories',
  'show partners',
  'show vendors',
  'manage vendors',
  'manage partners',
  'vendor list',
  'partners',
  'vendors',
  'providers',
  'legitimate interest',
  'legitimate interests',
  'object',
  'object to',
  'oppose',
  'objection',
  'details',
  'more options',
  'more choices',
  'customize',
  'customise',
  'expand',
  'accordion',
  'advanced settings',
  'privacy options',
]

const unsafePreferenceExpansionTexts = [
  ...unsafeAcceptTexts,
  'continue',
  'subscribe',
  'sign in',
  'log in',
  'login',
  'paywall',
  'payment',
  'checkout',
  'go to spanish site',
  'change region',
  'select region',
  'choose region',
  'language',
  'country',
]

const essentialPreferenceTexts = [
  'necessary',
  'strictly necessary',
  'essential',
  'técnico',
  'tecnico',
  'tecnicas',
  'necesarias',
  'obligatorias',
  'seguridad',
  'sesión',
  'sesion',
]

const savePreferenceTexts = [
  'save choices',
  'save preferences',
  'confirm choices',
  'confirm my choices',
  'apply choices',
  'apply settings',
  'save settings',
  'submit preferences',
  'continue with selected',
  'continue with selection',
  'use selected',
  'save my choices',
  'save and exit',
  'submit all choices',
  'agree to selected',
  'confirmar opciones',
  'confirmar mis opciones',
  'guardar cambios',
  'guardar preferencias',
  'confirmar preferencias',
  'aplicar preferencias',
  'guardar configuracion',
  'guardar configuraciÃ³n',
  'enviar preferencias',
  'continuar con seleccion',
  'continuar con selecciÃ³n',
  'guardar y salir',
]

const bannerKeywords = [
  'cookie',
  'cookies',
  'consent',
  'privacy',
  'privacidad',
  'preferencias',
  'gdpr',
  'rgpd',
  'cookies opcionales',
  'permitir cookies opcionales',
]

const nonCookieModalTexts = [
  'you seem to be in',
  'you are visiting from',
  'select your language',
  'choose your language',
  'language selector',
  'go to spanish site',
  'spanish site',
  'change region',
  'select region',
  'choose region',
  'region selector',
  'country selector',
  'regional site',
  'location',
  'country',
  'language',
  'idioma',
  'pais',
  'paÃ­s',
  'region',
  'regiÃ³n',
  'espaÃ±a',
  'spain',
  'newsletter',
  'sign up for our newsletter',
  'subscribe',
  'subscription',
  'premium',
  'paywall',
  'download our app',
  'install app',
  'open in app',
]

const marketingPopupTexts = [
  'newsletter',
  'subscribe',
  'subscription',
  'suscribete',
  'suscribete',
  'descuento',
  'discount',
  'promo',
  'promotion',
  'email signup',
  'sign up for email',
  'sign up for our newsletter',
  'first order',
  'coupon',
  'cupon',
  'oferta',
]

const explicitRejectControlTexts = [
  'reject',
  'reject all',
  'decline',
  'decline all',
  'rechazar',
  'rechazar todo',
  'rechazar todas',
  'rechazar las no necesarias',
  'rechazar no necesarias',
  'no consentir',
  'no consiento',
  'continuar sin consentimiento',
  'no acepto',
]

const cmpRootDerivationControlTexts = [
  'rechazar todas',
  'rechazar todo',
  'rechazar las no necesarias',
  'no consentir',
  'no acepto',
  'personalizar',
  'aceptar todas',
]

const cmpReachabilityProbeTexts = [
  'rechazar todas',
  'rechazar todo',
  'no consentir',
  'aceptar todas',
  'personalizar',
]

const knownCmpKeywords = [
  'onetrust',
  'ot sdk',
  'ot-sdk',
  'didomi',
  'cookiebot',
  'cybotcookiebot',
  'trustarc',
  'truste',
  'usercentrics',
  'uc-center',
  'uc banner',
  'quantcast',
  'qc-cmp',
  'sourcepoint',
  'sp message',
]

const COOKIE_INTENT_KEYWORDS = {
  rejectAll: [
    ...totalRejectTexts,
    ...directSafeRejectClassSignals,
    'reject optional',
    'reject non essential',
    'reject non-essential',
    'deny optional',
    'deny consent',
    'rechazar opcionales',
    'rechazar no esenciales',
    'no consentir',
    'no consiento',
    'no doy mi consentimiento',
    'continuar sin consentimiento',
    'denegar consentimiento',
  ],
  acceptAll: [
    ...unsafeAcceptTexts,
    'accept optional',
    'allow optional',
    'aceptar opcionales',
  ],
  essentialOnly: [
    ...necessaryOnlyTexts,
    'strictly necessary only',
    'use necessary cookies only',
    'solo cookies necesarias',
    'solo tecnicas',
    'solo técnicas',
    'solo obligatorias',
  ],
  managePreferences: [
    ...settingsTexts,
    'customize',
    'customise',
    'personalizar',
    'set choices',
    'my choices',
    'mis opciones',
    'personalizar cookies',
    'configurar cookies',
    'opciones cookies',
    'cookie settings',
    'privacy settings',
  ],
  savePreferences: [
    ...savePreferenceTexts,
    'save selection',
    'save choices',
    'apply selection',
    'apply selected',
    'confirm selection',
    'submit choices',
    'submit consent',
    'agree to current selection',
    'guardar seleccion',
    'guardar selección',
    'guardar configuracion',
    'guardar configuración',
  ],
  analyticsReject: [
    'analytics',
    'statistics',
    'measurement',
    'analitica',
    'analítica',
    'estadisticas',
    'estadísticas',
    'medicion',
    'medición',
  ],
  marketingReject: [
    'marketing',
    'advertising',
    'ads',
    'publicidad',
    'anuncios',
    'advertising partners',
  ],
  personalizationReject: [
    'personalization',
    'personalisation',
    'personalized content',
    'personalizacion',
    'personalización',
    'contenido personalizado',
  ],
  trackingReject: [
    'tracking',
    'trackers',
    'profiling',
    'sell my data',
    'share my data',
    'rastreo',
    'rastreadores',
    'perfilado',
    'venta de datos',
    'compartir datos',
  ],
  socialReject: [
    'social media',
    'social networks',
    'redes sociales',
    'sociales',
  ],
  vendorReject: [
    'vendors',
    'vendor',
    'partners',
    'partner',
    'providers',
    'proveedores',
    'proveedores externos',
    'external providers',
    'advertising partners',
    'third party',
    'third parties',
],

   legitimateInterestReject: [
    'interes legitimo',
    'intereses legitimos',
    'interes legítimo',
    'intereses legítimos',
    'legitimate interest',
    'legitimate interests',
    'legitimate purposes',
    'vendor legitimate interest',
    'li purpose',
    'li purposes',
    'base legítima',
    'finalidad legítima',
],

   strictPrivacyMode: [
    'strict privacy',
    'privacy strict',
    'modo estricto',
    'privacidad estricta',
    'strict mode',
    'modo de privacidad estricta',
  ],
  }

const COOKIE_ACTION_PRIORITY = [
  'rejectAll',
  'essentialOnly',
  'analyticsReject',
  'marketingReject',
  'personalizationReject',
  'trackingReject',
  'socialReject',
  'managePreferences',
  'savePreferences',
  'acceptAll',
]

const PROTECTION_MODE_CONFIGS = {
  soft: {
    allowAutoReject: false,
    allowSettingsOpen: false,
    allowDeepTraversal: false,
    allowHide: false,
    allowSuppression: false,
    maxTraversalDepth: 0,
    maxTraversalClicks: 0,
    scanAggressiveness: 'detect',
  },
  normal: {
    allowAutoReject: true,
    allowSettingsOpen: true,
    allowDeepTraversal: true,
    allowHide: true,
    allowSuppression: true,
    maxTraversalDepth: MAX_PREFERENCE_TRAVERSAL_DEPTH,
    maxTraversalClicks: MAX_PREFERENCE_TRAVERSAL_CLICKS,
    scanAggressiveness: 'normal',
  },
  strict: {
    allowAutoReject: true,
    allowSettingsOpen: true,
    allowDeepTraversal: true,
    allowHide: true,
    allowSuppression: true,
    maxTraversalDepth: 5,
    maxTraversalClicks: 8,
    scanAggressiveness: 'strict',
  },
}

const sensitiveAreaKeywords = [
  'login',
  'log in',
  'signin',
  'sign in',
  'register',
  'registro',
  'signup',
  'sign up',
  'checkout',
  'payment',
  'pago',
  'billing',
  'carrito',
  'cart',
  'newsletter',
  'subscribe',
  'suscribete',
  'suscríbete',
  'age verification',
  'verify age',
  'mayor de edad',
  'paywall',
  'premium content',
  'app download',
  'download app',
  'install app',
  'promotion',
  'promo',
  'descuento',
  'oferta',
]

function log(...args) {
  if (DEBUG) {
    console.log('[ADDISLINE SM]', ...args)
  }
}

function getCookieDebugElementSummary(element) {
  if (!element) {
    return null
  }

  return {
    tagName: element.tagName?.toLowerCase?.() || '',
    id: element.id || '',
    className: getClassNameText(element).slice(0, 120),
    text: getActionText(element).slice(0, 140),
  }
}

function cookieDebugLog(event, details = {}) {
  if (!COOKIE_DEBUG) {
    return
  }

  const now = Date.now()
  const signature =
    `${event}:${JSON.stringify(details).slice(0, 600)}`
  const lastLoggedAt =
    cookieDebugLogCooldowns.get(signature) || 0

  if (now - lastLoggedAt < COOKIE_DEBUG_LOG_COOLDOWN_MS) {
    return
  }

  cookieDebugLogCooldowns.set(signature, now)
  console.log('[Addisline]', event, details)
}

function rejectFlowLog(event, details = {}) {
  if (!REJECT_FLOW_DEBUG) {
    return
  }

  const now = Date.now()
  const signature =
    `${event}:${JSON.stringify(details).slice(0, 400)}`
  const lastLoggedAt =
    rejectFlowLogCooldowns.get(signature) || 0

  if (now - lastLoggedAt < COOKIE_DEBUG_LOG_COOLDOWN_MS) {
    return
  }

  rejectFlowLogCooldowns.set(signature, now)
  console.log('[Addisline]', event, details)
}

function logRuntimeError(scope, error) {
  try {
    console.error('[Addisline] Runtime error', {
      scope,
      message: error?.message || String(error || 'unknown error'),
    })
  } catch {
    // Console access should never affect page behavior.
  }

  cookieDebugLog('Runtime error', {
    scope,
    message: error?.message || String(error || 'unknown error'),
    stack: String(error?.stack || '').slice(0, 500),
  })
}

cookieDebugLog('Content script started', {
  domain: getCurrentDomain(),
  readyState: document.readyState,
  isTopFrame: isTopFrameContext(),
  hasExtensionContext: hasExtensionContext(),
})

function runCMPFingerprintDebugDetection(root = document) {
  if (!ENABLE_CMP_FINGERPRINT_DEBUG) {
    return null
  }

  const detector =
    globalThis?.AddislineCMPFingerprint?.detectCMPFingerprint

  if (typeof detector !== 'function') {
    return null
  }

  let fingerprint = null

  try {
    fingerprint = detector(root)
  } catch {
    return null
  }

  const cmpName =
    fingerprint?.cmpName || 'unknown'

  if (
    !cmpName ||
    cmpName === 'unknown' ||
    loggedCMPFingerprints.has(cmpName)
  ) {
    return fingerprint
  }

  loggedCMPFingerprints.add(cmpName)
  cookieDebugLog(`CMP detected: ${cmpName}`, {
    confidence: fingerprint.confidence || 0,
    signals: Array.isArray(fingerprint.signals)
      ? fingerprint.signals.slice(0, 5)
      : [],
  })

  return fingerprint
}

function exposeContentScriptLoadedMarker() {
  try {
    window.__addislineContentScriptLoaded = true
  } catch {
    // Isolated worlds can hide this from the page console.
  }

  try {
    document.documentElement.dataset.addislineContentScriptLoaded = 'true'
  } catch {
    // Some pages can replace or lock the root element while loading.
  }
}

exposeContentScriptLoadedMarker()

function isAddislineTestMode() {
  try {
    if (window.__ADDISLINE_TEST_MODE__ === true) {
      return true
    }
  } catch {
    // Page-level globals can be inaccessible across isolated worlds.
  }

  try {
    if (localStorage.getItem('ADDISLINE_TEST_MODE') === 'true') {
      return true
    }
  } catch {
    // Storage can be blocked on some pages.
  }

  try {
    return document.documentElement.dataset.addislineTestMode === 'true'
  } catch {
    return false
  }
}

function truncateTestText(value, limit = 120) {
  return normalizeMatchText(value)
    .slice(0, limit)
}

function getElementTestSummary(element) {
  if (!element) return null

  const rect =
    getSafeClientRect(element)

  return {
    tag: String(element.tagName || '').toLowerCase(),
    id: truncateTestText(element.id, 80),
    className: truncateTestText(getClassNameText(element), 120),
    role: truncateTestText(element.getAttribute?.('role'), 40),
    text: truncateTestText(getActionText(element), 120),
    visible: isVisible(element),
    width: rect ? Math.round(rect.width) : 0,
    height: rect ? Math.round(rect.height) : 0,
  }
}

function updateAddislineTestReport(partial = {}) {
  if (!isAddislineTestMode()) return

  try {
    const previous =
      (
        window.__addislineTestReport &&
        typeof window.__addislineTestReport === 'object'
      )
        ? window.__addislineTestReport
        : {}

    const recentEvents =
      Array.isArray(previous.recentEvents)
        ? previous.recentEvents.slice(-19)
        : []

    const event =
      partial.event
        ? {
            at: Date.now(),
            name: truncateTestText(partial.event, 80),
          }
        : null

    window.__addislineTestReport = {
      ...previous,
      ...partial,
      currentDomain: getCurrentDomain(),
      updatedAt: Date.now(),
      recentEvents: event
        ? [...recentEvents, event]
        : recentEvents,
    }
  } catch {
    // Test diagnostics must never affect page behavior.
  }
}

function getVerificationTestState(state) {
  if (!state) return null

  return {
    active: Boolean(state.active),
    bannerVisible: Boolean(state.bannerVisible),
    ariaHidden: Boolean(state.ariaHidden),
    cssHidden: Boolean(state.cssHidden),
    modalPresent: Boolean(state.modalPresent),
    overlayPresent: Boolean(state.overlayPresent),
    scrollRestored: Boolean(state.scrollRestored),
  }
}

function canUsePageActionBudget(reason = 'action') {
  if (pageActionCount >= MAX_PAGE_ACTIONS) {
    log('page action budget stopped', reason)
    return false
  }

  pageActionCount += 1
  return true
}

function canUseTraversalBudget(reason = 'traversal') {
  if (pageTraversalCount >= MAX_PAGE_TRAVERSALS) {
    log('traversal stopped by budget', reason)
    return false
  }

  pageTraversalCount += 1
  return true
}

function hasExtensionContext() {
  try {
    return Boolean(
      typeof chrome !== 'undefined' &&
        chrome.runtime &&
        chrome.runtime.id &&
        chrome.storage &&
        chrome.storage.local
    )
  } catch {
    return false
  }
}

function safeStorageGet(defaults, callback) {
  if (!hasExtensionContext()) return

  try {
    chrome.storage.local.get(defaults, (data) => {
      try {
        if (
          !hasExtensionContext() ||
          chrome.runtime.lastError
        ) {
          return
        }

        callback(data || defaults)
      } catch (error) {
        logRuntimeError('storage_get_callback', error)
      }
    })
  } catch (error) {
    logRuntimeError('storage_get', error)
  }
}

function safeStorageSet(values) {
  if (!hasExtensionContext()) return

  try {
    chrome.storage.local.set(values, () => {
      try {
        if (chrome.runtime.lastError) {
          return
        }
      } catch {
        // Extension context invalidated.
      }
    })
  } catch {
    // Extension context invalidated.
  }
}

function hasSyncStorageContext() {
  try {
    return Boolean(
      hasExtensionContext() &&
        chrome.storage &&
        chrome.storage.sync
    )
  } catch {
    return false
  }
}

function safeSyncStorageGet(defaults) {
  return new Promise((resolve) => {
    if (!hasSyncStorageContext()) {
      resolve(defaults)
      return
    }

    try {
      chrome.storage.sync.get(defaults, (data) => {
        try {
          if (
            !hasSyncStorageContext() ||
            chrome.runtime.lastError
          ) {
            resolve(defaults)
            return
          }

          resolve(data || defaults)
        } catch {
          resolve(defaults)
        }
      })
    } catch {
      resolve(defaults)
    }
  })
}

function safeSyncStorageSet(values) {
  return new Promise((resolve) => {
    if (!hasSyncStorageContext()) {
      resolve(false)
      return
    }

    try {
      chrome.storage.sync.set(values, () => {
        try {
          resolve(!chrome.runtime.lastError)
        } catch {
          resolve(false)
        }
      })
    } catch {
      resolve(false)
    }
  })
}

function normalizeStats(stats) {
  return {
    bannersHidden: stats?.bannersHidden || 0,
    trackersReduced: stats?.trackersReduced || 0,
    autoRejects: stats?.autoRejects || 0,
    vendorsDenied: stats?.vendorsDenied || 0,
    legitimateInterestsDisabled:
      stats?.legitimateInterestsDisabled || 0,
    protectedSites: stats?.protectedSites || 0,
  }
}

function setLastAction(action) {
  if (!action || lastDiagnosticAction === action) return

  lastDiagnosticAction = action

  safeStorageSet({
    lastAction: action,
  })
}

function setLastError(error) {
  const safeError = error ? String(error).slice(0, 160) : ''

  if (lastDiagnosticError === safeError) return

  lastDiagnosticError = safeError

  safeStorageSet({
    lastError: safeError,
  })
}

function getReliableDiagnosticRoots(candidates = [], extraControls = []) {
  const roots = []
  const addRoot = (root) => {
    if (
      root &&
      isReliableCMPRoot(root) &&
      !roots.includes(root)
    ) {
      roots.push(root)
    }
  }

  extraControls
    .filter(Boolean)
    .forEach((control) => {
      addRoot(getCookieContainer(control))
    })

  ;(Array.isArray(candidates) ? candidates : [])
    .forEach(addRoot)

  return roots.slice(0, 2)
}

function getDiagnosticRootSummary(candidates = [], extraControls = []) {
  const root =
    getReliableDiagnosticRoots(candidates, extraControls)[0]

  if (!root) {
    return {
      root: null,
      rootTag: '',
      rootClass: '',
      rootReason: '',
      excludedAsMarketingPopup: false,
    }
  }

  return {
    root,
    rootTag: String(root.tagName || '').toLowerCase(),
    rootClass: getClassNameText(root).slice(0, 160),
    rootReason: getInitialCMPRootReason(root),
    excludedAsMarketingPopup: isMarketingPopupWithoutCMPActions(root),
  }
}

function getDiagnosticControlTexts(candidates = [], extraControls = []) {
  const texts = []
  const seen = new Set()
  const addControlText = (control) => {
    const text =
      normalizeMatchText(getActionText(control))

    if (!text || seen.has(text)) return

    seen.add(text)
    texts.push(text.slice(0, 80))
  }

  extraControls
    .filter(Boolean)
    .forEach((control) => {
      const root =
        getCookieContainer(control)

      if (
        root &&
        isReliableCMPRoot(root) &&
        root.contains(control)
      ) {
        addControlText(control)
      }
    })

  getReliableDiagnosticRoots(candidates, extraControls)
    .forEach((candidate) => {
      getDirectClickableControls(candidate)
        .slice(0, 8)
        .forEach(addControlText)
    })

  return texts.slice(0, MAX_DIAGNOSTIC_CONTROLS)
}

function getMatchedRejectPhraseNormalized(text) {
  const normalizedText =
    normalizeMatchText(text)

  if (!normalizedText) return ''

  const phrases = [
    ...totalRejectTexts,
    ...safeRejectTexts,
    ...rejectTexts,
    ...necessaryOnlyTexts,
  ]
    .map(normalizeMatchText)
    .filter(Boolean)
    .sort((first, second) =>
      second.length - first.length
    )

  return phrases.find((phrase) =>
    textHasPhrase(normalizedText, phrase)
  ) || ''
}

function createDiagnosticDecisionTrace(source = 'scanPage') {
  return {
    source,
    startedAt: Date.now(),
    scanCount: pageScanCount,
    mutationScanCount: observerMutationScanCount,
    steps: [],
  }
}

function addDiagnosticDecisionStep(trace, step = {}) {
  if (
    !trace ||
    !Array.isArray(trace.steps)
  ) {
    return
  }

  if (trace.steps.length >= MAX_DIAGNOSTIC_DECISION_TRACE_STEPS) {
    if (!step.force) {
      return
    }
    trace.steps.splice(
      0,
      trace.steps.length - MAX_DIAGNOSTIC_DECISION_TRACE_STEPS + 1
    )
  }

  trace.steps.push({
    strategy: String(step.strategy || 'unknown').slice(0, 60),
    status: String(step.status || 'ran').slice(0, 24),
    reason: String(step.reason || '').slice(0, 80),
    found: Math.max(0, Number(step.found) || 0),
    scanned: Math.max(0, Number(step.scanned) || 0),
    elapsedMs: Math.max(0, Number(step.elapsedMs) || 0),
  })
}

function finalizeDiagnosticDecisionTrace(trace) {
  if (!trace) return null

  return {
    source: String(trace.source || 'scanPage').slice(0, 40),
    scanCount: Math.max(0, Number(trace.scanCount) || 0),
    mutationScanCount:
      Math.max(0, Number(trace.mutationScanCount) || 0),
    elapsedMs:
      Math.max(0, Date.now() - (Number(trace.startedAt) || Date.now())),
    steps: (Array.isArray(trace.steps) ? trace.steps : [])
      .slice(0, MAX_DIAGNOSTIC_DECISION_TRACE_STEPS),
  }
}

function updateLastDiagnosticDecisionTrace(trace) {
  lastDiagnosticDecisionTrace =
    finalizeDiagnosticDecisionTrace(trace)
  return lastDiagnosticDecisionTrace
}

function appendLastDiagnosticDecisionStep(step = {}) {
  const trace =
    lastDiagnosticDecisionTrace &&
    typeof lastDiagnosticDecisionTrace === 'object'
      ? {
          ...lastDiagnosticDecisionTrace,
          steps:
            Array.isArray(lastDiagnosticDecisionTrace.steps)
              ? [...lastDiagnosticDecisionTrace.steps]
              : [],
        }
      : {
          source: 'async',
          scanCount: pageScanCount,
          mutationScanCount: observerMutationScanCount,
          elapsedMs: 0,
          steps: [],
        }

  addDiagnosticDecisionStep(trace, step)
  lastDiagnosticDecisionTrace = {
    source: String(trace.source || 'async').slice(0, 40),
    scanCount: Math.max(0, Number(trace.scanCount) || 0),
    mutationScanCount:
      Math.max(0, Number(trace.mutationScanCount) || 0),
    elapsedMs: Math.max(0, Number(trace.elapsedMs) || 0),
    steps:
      (Array.isArray(trace.steps) ? trace.steps : [])
        .slice(0, MAX_DIAGNOSTIC_DECISION_TRACE_STEPS),
  }

  return lastDiagnosticDecisionTrace
}

function getRejectCandidateMatchDetails(control, container = document) {
  const text =
    getActionText(control)
  const classText =
    getClassNameText(control)
  const idText =
    control?.id || ''
  const matchedBy = []

  if (textMatchesDictionaryCookieIntent(text, 'rejectAll')) {
    matchedBy.push('dictionary_reject_all')
  }
  if (textHasAny(text, totalRejectTexts)) {
    matchedBy.push('total_reject_text')
  }
  if (textHasAny(text, rejectTexts)) {
    matchedBy.push('reject_text')
  }
  if (isNoAceptoControl(control)) {
    matchedBy.push('no_acepto')
  }
  if (
    textHasAny(classText, directSafeRejectClassSignals) ||
    textHasAny(idText, directSafeRejectClassSignals)
  ) {
    matchedBy.push('direct_safe_signal')
  }

  return {
    matchedBy,
    rejectAllScore:
      getCookieIntentScore(control, container, 'rejectAll'),
    essentialOnlyScore:
      getCookieIntentScore(control, container, 'essentialOnly'),
    legacyRejectScore:
      scoreTextAgainstKeywords(text, rejectTexts, 8),
  }
}

function getRejectCandidateDiagnostic(control, source, container = document) {
  const nearestContainer =
    getCookieContainer(control) || container || document
  const details =
    getRejectCandidateMatchDetails(control, nearestContainer)
  const rejectedBy = []
  const signature =
    getBannerActionSignature(control)
  const lastActionAt =
    bannerActionCooldowns.get(signature) || 0
  const blockedByCooldown =
    Boolean(
      signature &&
      Date.now() - lastActionAt < BANNER_ACTION_COOLDOWN_MS
    )

  if (!isVisible(control)) rejectedBy.push('not_visible')
  if (getCookieDebugDisabledState(control) === 'disabled') {
    rejectedBy.push('disabled')
  }
  if (isInsideNonCookieModal(control)) {
    rejectedBy.push('non_cookie_modal')
  }
  if (hasUnsafeAcceptText(control)) {
    rejectedBy.push('unsafe_accept_text')
  }
  if (hasVisibleSettingsIntent(control)) {
    rejectedBy.push('settings_intent')
  }
  if (processedActionElements.has(control)) {
    rejectedBy.push('processed_state')
  }
  if (blockedByCooldown) {
    rejectedBy.push('cooldown')
  }
  if (isSensitiveActionControl(control, nearestContainer)) {
    rejectedBy.push('sensitive_context')
  }
  if (details.matchedBy.length === 0) {
    rejectedBy.push('no_reject_match')
  } else if (
    details.rejectAllScore < 8 &&
    details.essentialOnlyScore < 8 &&
    details.legacyRejectScore < 8
  ) {
    rejectedBy.push('score_below_threshold')
  }

  return {
    source: String(source || 'unknown').slice(0, 40),
    text: getActionText(control).slice(0, 120),
    tagName: control?.tagName?.toLowerCase?.() || '',
    role: String(control?.getAttribute?.('role') || '').slice(0, 40),
    visible: isVisible(control),
    disabledState: getCookieDebugDisabledState(control),
    containerFound: Boolean(nearestContainer && nearestContainer !== document),
    containerPotential:
      nearestContainer && nearestContainer !== document
        ? isPotentialCookieContainer(nearestContainer)
        : false,
    matchedBy: details.matchedBy.slice(0, 5),
    rejectedBy: rejectedBy.slice(0, 8),
    rejectAllScore: Math.max(0, Number(details.rejectAllScore) || 0),
    essentialOnlyScore:
      Math.max(0, Number(details.essentialOnlyScore) || 0),
    legacyRejectScore:
      Math.max(0, Number(details.legacyRejectScore) || 0),
    blockReason: getBasicRejectBlockReason(control),
  }
}

function hasRejectCandidateDiagnosticSignal(control) {
  const signal =
    normalizeMatchText([
      getActionText(control),
      control?.id,
      getClassNameText(control),
      control?.getAttribute?.('aria-label'),
      control?.getAttribute?.('title'),
      control?.value,
      control?.getAttribute?.('value'),
    ].join(' '))

  return (
    textMatchesDictionaryCookieIntent(signal, 'rejectAll') ||
    textHasAny(signal, totalRejectTexts) ||
    textHasAny(signal, rejectTexts) ||
    textHasAny(signal, directSafeRejectClassSignals) ||
    textHasPhrase(signal, 'no acepto')
  )
}

function recordRejectCandidateDiagnostics(
  source,
  controls = [],
  container = document
) {
  if (!ENABLE_VERBOSE_DIAGNOSTICS) return

  const diagnostics =
    uniqueElements(Array.isArray(controls) ? controls : [])
      .filter(hasRejectCandidateDiagnosticSignal)
      .slice(0, MAX_REJECT_CANDIDATE_DIAGNOSTICS)
      .map((control) =>
        getRejectCandidateDiagnostic(control, source, container)
      )

  if (diagnostics.length === 0) return

  lastRejectCandidateDiagnostics =
    (
      source === 'direct_scan'
        ? [
            ...diagnostics,
            ...lastRejectCandidateDiagnostics,
          ]
        : [
            ...lastRejectCandidateDiagnostics,
            ...diagnostics,
          ]
    ).slice(0, MAX_REJECT_CANDIDATE_DIAGNOSTICS)
}

function resetRejectCandidateDiagnostics() {
  lastRejectCandidateDiagnostics = []
}

function hasCookieIntentSignal(control) {
  const signal =
    normalizeMatchText([
      getActionText(control),
      control?.id,
      getClassNameText(control),
      control?.getAttribute?.('aria-label'),
      control?.getAttribute?.('title'),
      control?.value,
      control?.getAttribute?.('value'),
    ].join(' '))

  return (
    textHasAny(signal, bannerKeywords) ||
    textHasAny(signal, preferenceSectionTexts) ||
    textMatchesDictionaryCookieIntent(signal, 'openSettings') ||
    textMatchesDictionaryCookieIntent(signal, 'manageSettings') ||
    textMatchesDictionaryCookieIntent(signal, 'rejectAll')
  )
}

function hasSettingsIntentSignal(control) {
  const signal =
    normalizeMatchText([
      getActionText(control),
      control?.id,
      getClassNameText(control),
      control?.getAttribute?.('aria-label'),
      control?.getAttribute?.('title'),
      control?.value,
      control?.getAttribute?.('value'),
    ].join(' '))

  return (
    textMatchesDictionaryCookieIntent(signal, 'openSettings') ||
    textMatchesDictionaryCookieIntent(signal, 'manageSettings') ||
    textMatchesLightweightSettingsOpen(signal) ||
    textHasAny(signal, settingsTexts)
  )
}

function hasAcceptIntentSignal(control) {
  const signal =
    normalizeMatchText([
      getActionText(control),
      control?.id,
      getClassNameText(control),
      control?.getAttribute?.('aria-label'),
      control?.getAttribute?.('title'),
      control?.value,
      control?.getAttribute?.('value'),
    ].join(' '))

  return (
    textMatchesDictionaryCookieIntent(signal, 'avoidAcceptAll') ||
    getCookieIntentScore(control, document, 'acceptAll') >= 8
  )
}

function getDirectClickableIntentSummary(control) {
  return {
    cookieIntent: hasCookieIntentSignal(control),
    rejectIntent: hasRejectCandidateDiagnosticSignal(control),
    settingsIntent: hasSettingsIntentSignal(control),
    acceptIntent: hasAcceptIntentSignal(control),
  }
}

function getViewportIntersectionState(rect) {
  if (!rect) return false

  const viewportWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    0
  const viewportHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    0

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < viewportHeight &&
    rect.left < viewportWidth
  )
}

function getVisibilityDiagnostic(element) {
  const rect =
    getSafeClientRect(element)
  const style =
    safeGetComputedStyle(element)
  const hasGeometry =
    Boolean(
      rect &&
      (
        (element?.offsetWidth || 0) > 0 ||
        (element?.offsetHeight || 0) > 0 ||
        rect.width > 0 ||
        rect.height > 0
      )
    )
  const display =
    style?.display || ''
  const visibility =
    style?.visibility || ''
  const opacity =
    style?.opacity || ''
  const finalVisible =
    isVisible(element)
  let finalReason = 'visible'

  if (!isGeometryElement(element)) {
    finalReason = 'not_geometry_element'
  } else if (!rect) {
    finalReason = 'missing_rect'
  } else if (!style) {
    finalReason = 'missing_computed_style'
  } else if (!hasGeometry) {
    finalReason = 'zero_geometry'
  } else if (display === 'none') {
    finalReason = 'display_none'
  } else if (visibility === 'hidden') {
    finalReason = 'visibility_hidden'
  } else if (Number(opacity) === 0) {
    finalReason = 'opacity_zero'
  }

  return {
    x: rect ? Math.round(rect.x) : 0,
    y: rect ? Math.round(rect.y) : 0,
    width: rect ? Math.round(rect.width) : 0,
    height: rect ? Math.round(rect.height) : 0,
    display: String(display || '').slice(0, 40),
    visibility: String(visibility || '').slice(0, 40),
    opacity: String(opacity || '').slice(0, 20),
    viewportIntersecting: getViewportIntersectionState(rect),
    ariaHidden: String(element?.getAttribute?.('aria-hidden') || '').slice(0, 20),
    offsetParentExists: Boolean(element?.offsetParent),
    finalVisible,
    finalReason,
  }
}

function getDirectClickableDiagnostic(control, index) {
  const type =
    String(control?.getAttribute?.('type') || '').slice(0, 40)
  const blockReason =
    getBasicRejectBlockReason(control)
  const intents =
    getDirectClickableIntentSummary(control)

  return {
    index: Math.max(0, Number(index) || 0),
    tagName: control?.tagName?.toLowerCase?.() || '',
    role: String(control?.getAttribute?.('role') || '').slice(0, 40),
    type,
    text:
      normalizeMatchText(getActionText(control))
        .slice(0, MAX_DIRECT_CLICKABLE_DIAGNOSTIC_TEXT),
    visible: isVisible(control),
    disabled: getCookieDebugDisabledState(control) === 'disabled',
    cookieIntent: intents.cookieIntent,
    rejectIntent: intents.rejectIntent,
    settingsIntent: intents.settingsIntent,
    acceptIntent: intents.acceptIntent,
    visibilityDiagnostics: getVisibilityDiagnostic(control),
    blockReason: String(blockReason || '').slice(0, 80),
  }
}

function recordDirectClickableDiagnostics(controls = []) {
  if (!ENABLE_VERBOSE_DIAGNOSTICS) return

  const safeControls =
    Array.isArray(controls) ? controls : []
  const diagnostics =
    safeControls.map((control, index) => ({
      control,
      diagnostic: getDirectClickableDiagnostic(control, index),
    }))
  const intentDiagnostics =
    diagnostics
      .filter(({ diagnostic }) =>
        diagnostic.cookieIntent ||
        diagnostic.rejectIntent ||
        diagnostic.settingsIntent ||
        diagnostic.acceptIntent
      )
      .slice(0, MAX_DIRECT_CLICKABLE_DIAGNOSTICS_PER_GROUP)
      .map(({ diagnostic }) => diagnostic)
  const visibleDiagnostics =
    diagnostics
      .filter(({ diagnostic }) => diagnostic.visible)
      .slice(0, MAX_DIRECT_CLICKABLE_DIAGNOSTICS_PER_GROUP)
      .map(({ diagnostic }) => diagnostic)
  const invisibleDiagnostics =
    diagnostics
      .filter(({ diagnostic }) => !diagnostic.visible)
      .slice(0, MAX_DIRECT_CLICKABLE_DIAGNOSTICS_PER_GROUP)
      .map(({ diagnostic }) => diagnostic)

  lastDirectClickableDiagnostics = {
    totalScanned: safeControls.length,
    cookieLikeCount: diagnostics
      .filter(({ diagnostic }) => diagnostic.cookieIntent)
      .length,
    rejectIntentCount: diagnostics
      .filter(({ diagnostic }) => diagnostic.rejectIntent)
      .length,
    settingsIntentCount: diagnostics
      .filter(({ diagnostic }) => diagnostic.settingsIntent)
      .length,
    acceptIntentCount: diagnostics
      .filter(({ diagnostic }) => diagnostic.acceptIntent)
      .length,
    visibleCount: diagnostics
      .filter(({ diagnostic }) => diagnostic.visible)
      .length,
    invisibleCount: diagnostics
      .filter(({ diagnostic }) => !diagnostic.visible)
      .length,
    intentControls: intentDiagnostics,
    visibleControls: visibleDiagnostics,
    invisibleControls: invisibleDiagnostics,
  }
}

function resetDirectClickableDiagnostics() {
  lastDirectClickableDiagnostics = {
    totalScanned: 0,
    cookieLikeCount: 0,
    rejectIntentCount: 0,
    settingsIntentCount: 0,
    acceptIntentCount: 0,
    visibleCount: 0,
    invisibleCount: 0,
    intentControls: [],
    visibleControls: [],
    invisibleControls: [],
  }
}

function textMatchesCookieScopeDiagnostic(text) {
  const normalizedText =
    normalizeMatchText(text)

  return (
    textMatchesDictionaryCookieIntent(normalizedText, 'rejectAll') ||
    textMatchesDictionaryCookieIntent(normalizedText, 'openSettings') ||
    textMatchesDictionaryCookieIntent(normalizedText, 'manageSettings') ||
    textHasAny(normalizedText, totalRejectTexts) ||
    textHasAny(normalizedText, rejectTexts) ||
    textHasAny(normalizedText, settingsTexts) ||
    textHasAny(normalizedText, [
      'cookie',
      'cookies',
      'consent',
      'privacy',
      'privacidad',
      'preferencias',
      'decline',
      'accept',
      'aceptar',
      'rechazar',
      'reject',
    ])
  )
}

function getNearestClickableAncestorTag(element) {
  let current =
    isElementLike(element) ? element : element?.parentElement
  let depth = 0

  while (current && depth < 8) {
    if (
      safeMatches(
        current,
        [
          'button',
          'a',
          '[role="button"]',
          'input',
          '[onclick]',
          '[tabindex]',
        ].join(',')
      )
    ) {
      return current.tagName?.toLowerCase?.() || ''
    }

    current = current.parentElement
    depth += 1
  }

  return ''
}

function getCookieTextScopeMatch(element, scope) {
  return {
    scope,
    tagName: element?.tagName?.toLowerCase?.() || '',
    text:
      normalizeMatchText([
        getActionText(element),
        element?.textContent?.slice(0, 300),
      ].join(' '))
        .slice(0, 120),
    visible: isVisible(element),
    nearestClickableAncestorTag:
      getNearestClickableAncestorTag(element),
  }
}

function collectCookieTextMatchesFromRoot(root, scope, state) {
  if (
    !root ||
    !state ||
    state.matches.length >= MAX_COOKIE_TEXT_SCOPE_MATCHES ||
    state.nodesVisited >= MAX_COOKIE_TEXT_SCOPE_NODES
  ) {
    return
  }

  const walkerRoot =
    root.body || root.documentElement || root
  const ownerDocument =
    root.ownerDocument || root
  const walker =
    ownerDocument.createTreeWalker?.(
      walkerRoot,
      NodeFilter.SHOW_ELEMENT
    )

  if (!walker) return

  let node =
    walker.currentNode

  while (
    node &&
    state.matches.length < MAX_COOKIE_TEXT_SCOPE_MATCHES &&
    state.nodesVisited < MAX_COOKIE_TEXT_SCOPE_NODES
  ) {
    state.nodesVisited += 1

    if (
      isElementLike(node) &&
      !safeMatches(
        node,
        'html, body, script, style, noscript, template'
      )
    ) {
      const text =
        normalizeMatchText([
          getActionText(node),
          node.textContent?.slice(0, 300),
        ].join(' '))

      if (text && textMatchesCookieScopeDiagnostic(text)) {
        state.matches.push(
          getCookieTextScopeMatch(node, scope)
        )
      }
    }

    node = walker.nextNode()
  }
}

function getIframeDiagnosticDomain(iframe) {
  try {
    const src =
      iframe.getAttribute?.('src') || iframe.src || ''
    return src ? new URL(src, window.location.href).hostname : ''
  } catch {
    return ''
  }
}

function inspectIframeAccess(iframe) {
  try {
    const iframeDocument =
      iframe.contentDocument ||
      iframe.contentWindow?.document

    if (!iframeDocument) {
      return {
        accessible: false,
        document: null,
        failureType: 'missing_document',
      }
    }

    if (!iframeDocument.documentElement) {
      return {
        accessible: false,
        document: null,
        failureType: 'missing_document_element',
      }
    }

    return {
      accessible: true,
      document: iframeDocument,
      failureType: '',
    }
  } catch (error) {
    const message =
      String(error?.message || error || '').toLowerCase()
    const failureType =
      message.includes('permission') ||
      message.includes('cross-origin') ||
      message.includes('cross origin') ||
      message.includes('denied')
        ? 'cross_origin_access_denied'
        : 'access_error'

    return {
      accessible: false,
      document: null,
      failureType,
    }
  }
}

function getIframeCookieTextState(iframeDocument) {
  const bodyText =
    normalizeMatchText(iframeDocument?.body?.innerText || '')
  const bodyTextExists =
    bodyText.length > 0
  const cookieTextExists =
    bodyTextExists && textMatchesCookieScopeDiagnostic(bodyText)
  const controls =
    iframeDocument
      ? getDiagnosticClickableControlsFromRoot(iframeDocument)
      : []
  const controlTexts =
    controls
      .map((control) =>
        normalizeMatchText(getActionText(control))
      )
      .filter(Boolean)
  const controlCookieTextExists =
    controlTexts.some(textMatchesCookieScopeDiagnostic)

  return {
    bodyTextExists,
    cookieTextExists:
      Boolean(cookieTextExists || controlCookieTextExists),
  }
}

function getIframeAccessibilityDiagnostic(iframe, index) {
  const rect =
    getSafeClientRect(iframe)
  const access =
    inspectIframeAccess(iframe)
  const textState =
    access.accessible
      ? getIframeCookieTextState(access.document)
      : {
          bodyTextExists: false,
          cookieTextExists: false,
        }

  return {
    index,
    src:
      String(
        iframe.getAttribute?.('src') ||
          iframe.src ||
          ''
      ).slice(0, 180),
    domain:
      String(getIframeDiagnosticDomain(iframe) || '').slice(0, 120),
    accessible: Boolean(access.accessible),
    accessFailureType:
      String(access.failureType || '').slice(0, 80),
    visible: isVisible(iframe),
    meaningfulVisible: isVisibleMeaningfulIframe(iframe),
    width: rect ? Math.round(rect.width) : 0,
    height: rect ? Math.round(rect.height) : 0,
    bodyTextExists: Boolean(textState.bodyTextExists),
    cookieTextExists: Boolean(textState.cookieTextExists),
  }
}

function updateIframeAccessibilityDiagnostics() {
  if (!ENABLE_VERBOSE_DIAGNOSTICS) return

  const iframes =
    safeQuerySelectorAll(document, 'iframe')

  lastIframeAccessibilityDiagnostics = {
    iframeCount: iframes.length,
    iframes:
      iframes
        .slice(0, MAX_IFRAME_ACCESSIBILITY_DIAGNOSTICS)
        .map((iframe, index) =>
          getIframeAccessibilityDiagnostic(iframe, index)
        ),
  }
}

function resetIframeAccessibilityDiagnostics() {
  lastIframeAccessibilityDiagnostics = null
}

function updateCookieTextScopeDiagnostics() {
  if (!ENABLE_VERBOSE_DIAGNOSTICS) return

  lastCookieTextScopeDiagnostics =
    buildCookieTextScopeDiagnostics()
}

function buildCookieTextScopeDiagnostics() {
  const state = {
    matches: [],
    nodesVisited: 0,
  }
  let shadowRootCount = 0
  let accessibleIframeCount = 0
  let inaccessibleIframeCount = 0
  const inaccessibleIframeDomains = []

  collectCookieTextMatchesFromRoot(document, 'main', state)

  safeQuerySelectorAll(document, '*')
    .slice(0, MAX_COOKIE_TEXT_SCOPE_NODES)
    .forEach((element) => {
      if (
        shadowRootCount >= MAX_COOKIE_TEXT_SCOPE_SHADOW_ROOTS ||
        state.matches.length >= MAX_COOKIE_TEXT_SCOPE_MATCHES ||
        state.nodesVisited >= MAX_COOKIE_TEXT_SCOPE_NODES
      ) {
        return
      }

      const shadowRoot =
        element?.shadowRoot

      if (!shadowRoot) return

      shadowRootCount += 1
      collectCookieTextMatchesFromRoot(
        shadowRoot,
        'shadow',
        state
      )
    })

  safeQuerySelectorAll(document, 'iframe')
    .filter(isVisibleMeaningfulIframe)
    .slice(0, MAX_SAME_ORIGIN_CMP_IFRAMES)
    .forEach((iframe) => {
      if (
        state.matches.length >= MAX_COOKIE_TEXT_SCOPE_MATCHES ||
        state.nodesVisited >= MAX_COOKIE_TEXT_SCOPE_NODES
      ) {
        return
      }

      try {
        const iframeDocument =
          getAccessibleIframeDocument(iframe)

        if (!iframeDocument?.documentElement) {
          inaccessibleIframeCount += 1
          const domain =
            getIframeDiagnosticDomain(iframe)
          if (domain) inaccessibleIframeDomains.push(domain)
          return
        }

        accessibleIframeCount += 1
        collectCookieTextMatchesFromRoot(
          iframeDocument,
          'iframe',
          state
        )
      } catch {
        inaccessibleIframeCount += 1
        const domain =
          getIframeDiagnosticDomain(iframe)
        if (domain) inaccessibleIframeDomains.push(domain)
      }
    })

  return {
    totalMatches: state.matches.length,
    nodesVisited: state.nodesVisited,
    mainDocumentMatched:
      state.matches.some((match) => match.scope === 'main'),
    shadowRootCount,
    shadowMatched:
      state.matches.some((match) => match.scope === 'shadow'),
    accessibleIframeCount,
    inaccessibleIframeCount,
    inaccessibleIframeDomains:
      [...new Set(inaccessibleIframeDomains)]
        .slice(0, MAX_SAME_ORIGIN_CMP_IFRAMES),
    iframeMatched:
      state.matches.some((match) => match.scope === 'iframe'),
    matches:
      state.matches.slice(0, MAX_COOKIE_TEXT_SCOPE_MATCHES),
  }
}

function resetCookieTextScopeDiagnostics() {
  lastCookieTextScopeDiagnostics = null
}

function getZIndexNumber(style) {
  const value =
    Number(style?.zIndex)

  return Number.isFinite(value) ? value : 0
}

function getDomScopeFixedStickySample(element) {
  const style =
    safeGetComputedStyle(element)
  const rect =
    getSafeClientRect(element)

  return {
    tagName: element?.tagName?.toLowerCase?.() || '',
    id: String(element?.id || '').slice(0, 60),
    className: getClassNameText(element).slice(0, 80),
    text:
      normalizeMatchText([
        getActionText(element),
        element?.textContent?.slice(0, 200),
      ].join(' '))
        .slice(0, 100),
    visible: isVisible(element),
    position: String(style?.position || '').slice(0, 20),
    zIndex: getZIndexNumber(style),
    x: rect ? Math.round(rect.x) : 0,
    y: rect ? Math.round(rect.y) : 0,
    width: rect ? Math.round(rect.width) : 0,
    height: rect ? Math.round(rect.height) : 0,
    cookieText:
      textMatchesCookieScopeDiagnostic([
        getActionText(element),
        element?.textContent?.slice(0, 300),
      ].join(' ')),
  }
}

function updateDomScopeDiagnostics() {
  if (!ENABLE_VERBOSE_DIAGNOSTICS) return

  const allElements =
    safeQuerySelectorAll(document, '*')
      .slice(0, MAX_COOKIE_TEXT_SCOPE_NODES)
  const fixedStickyElements = []
  let openShadowRootCount = 0

  allElements.forEach((element) => {
    if (element?.shadowRoot) {
      openShadowRootCount += 1
    }

    const style =
      safeGetComputedStyle(element)

    if (
      style &&
      (
        style.position === 'fixed' ||
        style.position === 'sticky'
      )
    ) {
      fixedStickyElements.push(element)
    }
  })

  const visibleFixedSticky =
    fixedStickyElements
      .filter(isVisible)
      .sort((first, second) =>
        getZIndexNumber(safeGetComputedStyle(second)) -
        getZIndexNumber(safeGetComputedStyle(first))
      )
      .slice(0, MAX_DOM_SCOPE_FIXED_STICKY_SAMPLES)
      .map(getDomScopeFixedStickySample)
  const iframeDomains = []
  const iframes =
    safeQuerySelectorAll(document, 'iframe')

  iframes
    .slice(0, MAX_SAME_ORIGIN_CMP_IFRAMES)
    .forEach((iframe) => {
      const domain =
        getIframeDiagnosticDomain(iframe)
      if (domain) iframeDomains.push(domain)
    })

  lastDomScopeDiagnostics = {
    bodyTextLength:
      Math.max(0, Number(document.body?.innerText?.length) || 0),
    elementsScanned: allElements.length,
    fixedStickyScannedCount: fixedStickyElements.length,
    visibleFixedStickyCount:
      fixedStickyElements.filter(isVisible).length,
    topVisibleFixedStickyElements: visibleFixedSticky,
    openShadowRootCount,
    iframeCount: iframes.length,
    iframeDomains:
      [...new Set(iframeDomains)]
        .slice(0, MAX_SAME_ORIGIN_CMP_IFRAMES),
  }
}

function resetDomScopeDiagnostics() {
  lastDomScopeDiagnostics = null
}

function getBottomBannerTextSignals(element) {
  const signal =
    normalizeMatchText([
      getActionText(element),
      getText(element).slice(0, 1200),
      element?.id,
      getClassNameText(element),
      element?.getAttribute?.('aria-label'),
      getDatasetText(element),
    ].join(' '))

  return {
    cookie:
      textHasAny(signal, bannerKeywords) ||
      textHasAny(signal, ['cookie', 'cookies', 'consent']),
    reject:
      textMatchesDictionaryCookieIntent(signal, 'rejectAll') ||
      textHasAny(signal, totalRejectTexts) ||
      textHasAny(signal, rejectTexts),
    settings:
      textMatchesDictionaryCookieIntent(signal, 'openSettings') ||
      textMatchesDictionaryCookieIntent(signal, 'manageSettings') ||
      textMatchesLightweightSettingsOpen(signal) ||
      textHasAny(signal, settingsTexts),
    accept:
      textMatchesDictionaryCookieIntent(signal, 'avoidAcceptAll') ||
      textHasAny(signal, ['accept', 'aceptar', 'allow all']),
  }
}

function isBottomPositionedElement(element) {
  const rect =
    getSafeClientRect(element)

  if (!rect || !isVisible(element)) return false

  const viewportHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    1
  const viewportWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    1
  const nearBottom =
    rect.bottom >= viewportHeight * 0.82 ||
    rect.top >= viewportHeight * 0.55
  const meaningfulSize =
    rect.width >= Math.min(260, viewportWidth * 0.65) &&
    rect.height >= 45

  return nearBottom && meaningfulSize
}

function getBottomBannerControlTexts(element) {
  return safeQuerySelectorAll(
    element,
    [
      'button',
      'a',
      '[role="button"]',
      'input[type="button"]',
      'input[type="submit"]',
    ].join(',')
  )
    .slice(0, MAX_CLICKABLE_CONTROLS_PER_SCAN)
    .map((control) =>
      normalizeMatchText(getActionText(control)).slice(0, 80)
    )
    .filter(Boolean)
    .slice(0, MAX_BOTTOM_BANNER_CONTROL_TEXTS)
}

function getBottomBannerDiagnostic(element) {
  const rect =
    getSafeClientRect(element)
  const style =
    safeGetComputedStyle(element)
  const signals =
    getBottomBannerTextSignals(element)

  return {
    tagName: element?.tagName?.toLowerCase?.() || '',
    id: String(element?.id || '').slice(0, 60),
    className: getClassNameText(element).slice(0, 100),
    text:
      normalizeMatchText([
        getActionText(element),
        getText(element).slice(0, 500),
      ].join(' '))
        .slice(0, 160),
    visible: isVisible(element),
    x: rect ? Math.round(rect.x) : 0,
    y: rect ? Math.round(rect.y) : 0,
    width: rect ? Math.round(rect.width) : 0,
    height: rect ? Math.round(rect.height) : 0,
    viewportBottomDistance:
      rect
        ? Math.round(
            (
              window.innerHeight ||
              document.documentElement.clientHeight ||
              0
            ) - rect.bottom
          )
        : 0,
    position: String(style?.position || '').slice(0, 24),
    zIndex: getZIndexNumber(style),
    cookieTextSignal: signals.cookie,
    rejectTextSignal: signals.reject,
    settingsTextSignal: signals.settings,
    acceptTextSignal: signals.accept,
    controlTexts: getBottomBannerControlTexts(element),
  }
}

function updateBottomBannerDiagnostics() {
  if (!ENABLE_VERBOSE_DIAGNOSTICS) return

  const candidates =
    safeQuerySelectorAll(
      document,
      [
        'div',
        'section',
        'aside',
        'dialog',
        '[role="dialog"]',
        '[role="region"]',
        '[class*="banner" i]',
        '[class*="cookie" i]',
        '[class*="consent" i]',
        '[id*="cookie" i]',
        '[id*="consent" i]',
      ].join(',')
    )
      .slice(0, MAX_COOKIE_TEXT_SCOPE_NODES)
      .filter((element) => {
        if (!isBottomPositionedElement(element)) return false

        const signals =
          getBottomBannerTextSignals(element)

        return (
          signals.cookie ||
          signals.reject ||
          signals.settings ||
          signals.accept
        )
      })
      .slice(0, MAX_BOTTOM_BANNER_DIAGNOSTICS)
      .map(getBottomBannerDiagnostic)

  lastBottomBannerDiagnostics = {
    candidateCount: candidates.length,
    candidates,
  }
}

function resetBottomBannerDiagnostics() {
  lastBottomBannerDiagnostics = null
}

function getExperimentalBottomProbeControls(element) {
  return safeQuerySelectorAll(
    element,
    [
      'button',
      'a',
      '[role="button"]',
      'input[type="button"]',
      'input[type="submit"]',
      '[onclick]',
      '[tabindex]',
    ].join(',')
  )
    .slice(0, MAX_CLICKABLE_CONTROLS_PER_SCAN)
}

function getExperimentalBottomProbeControlSummary(element) {
  const controls =
    getExperimentalBottomProbeControls(element)

  return controls
    .map((control) => ({
      text:
        normalizeMatchText(getActionText(control)).slice(0, 80),
      visible: isVisible(control),
      tagName: control?.tagName?.toLowerCase?.() || '',
      reject: hasRejectCandidateDiagnosticSignal(control),
      accept: hasAcceptIntentSignal(control),
      settings: hasSettingsIntentSignal(control),
      cookie: hasCookieIntentSignal(control),
    }))
    .filter((control) =>
      control.text ||
      control.reject ||
      control.accept ||
      control.settings ||
      control.cookie
    )
    .slice(0, MAX_BOTTOM_BANNER_CONTROL_TEXTS)
}

function getExperimentalBottomProbeFlags(element) {
  const signals =
    getBottomBannerTextSignals(element)
  const controls =
    getExperimentalBottomProbeControlSummary(element)

  return {
    cookie:
      signals.cookie ||
      controls.some((control) => control.cookie),
    reject:
      signals.reject ||
      controls.some((control) => control.reject),
    accept:
      signals.accept ||
      controls.some((control) => control.accept),
    settings:
      signals.settings ||
      controls.some((control) => control.settings),
    controls,
  }
}

function isPageStructureElement(element) {
  return Boolean(
    safeClosest(
      element,
      [
        'footer',
        'nav',
        'menu',
        '[role="navigation"]',
        '[role="contentinfo"]',
        '[class*="footer" i]',
        '[class*="sitemap" i]',
        '[class*="breadcrumb" i]',
      ].join(',')
    )
  )
}

function isExperimentalBottomProbeCandidate(element) {
  if (!isElementLike(element) || !isVisible(element)) {
    return false
  }

  const rect =
    getSafeClientRect(element)
  if (!rect) return false

  const viewportWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    1
  const viewportHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    1
  const bottomDistance =
    viewportHeight - rect.bottom

  if (
    bottomDistance < -4 ||
    bottomDistance > 40 ||
    rect.height < 40 ||
    rect.height > 400 ||
    rect.width < viewportWidth * 0.4
  ) {
    return false
  }

  const flags =
    getExperimentalBottomProbeFlags(element)
  const hasAnySignal =
    flags.cookie ||
    flags.reject ||
    flags.accept ||
    flags.settings
  const strongCookieWithAction =
    flags.cookie &&
    (
      flags.reject ||
      flags.accept ||
      flags.settings
    )

  if (!hasAnySignal) return false
  if (isPageStructureElement(element) && !strongCookieWithAction) {
    return false
  }

  return true
}

function getExperimentalBottomProbeCandidate(element) {
  const rect =
    getSafeClientRect(element)
  const style =
    safeGetComputedStyle(element)
  const viewportHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    0
  const flags =
    getExperimentalBottomProbeFlags(element)

  return {
    tagName: element?.tagName?.toLowerCase?.() || '',
    id: String(element?.id || '').slice(0, 60),
    className: getClassNameText(element).slice(0, 100),
    text:
      normalizeMatchText([
        getActionText(element),
        element?.textContent?.slice(0, 500),
      ].join(' '))
        .slice(0, 160),
    x: rect ? Math.round(rect.x) : 0,
    y: rect ? Math.round(rect.y) : 0,
    width: rect ? Math.round(rect.width) : 0,
    height: rect ? Math.round(rect.height) : 0,
    bottomDistance:
      rect ? Math.round(viewportHeight - rect.bottom) : 0,
    position: String(style?.position || '').slice(0, 24),
    zIndex: getZIndexNumber(style),
    cookie: flags.cookie,
    reject: flags.reject,
    accept: flags.accept,
    settings: flags.settings,
    controls: flags.controls,
  }
}

function buildExperimentalBottomBannerProbe() {
  const selectors = [
    'div',
    'section',
    'aside',
    'dialog',
    '[role="dialog"]',
    '[role="region"]',
    '[class*="banner" i]',
    '[class*="cookie" i]',
    '[class*="consent" i]',
    '[class*="privacy" i]',
    '[id*="cookie" i]',
    '[id*="consent" i]',
    '[id*="privacy" i]',
  ].join(',')
  const candidates =
    safeQuerySelectorAll(document, selectors)
      .slice(0, MAX_COOKIE_TEXT_SCOPE_NODES)
      .filter(isExperimentalBottomProbeCandidate)
      .map(getExperimentalBottomProbeCandidate)
      .sort((first, second) => {
        if (first.bottomDistance !== second.bottomDistance) {
          return first.bottomDistance - second.bottomDistance
        }

        return second.zIndex - first.zIndex
      })
      .slice(0, MAX_EXPERIMENTAL_BOTTOM_BANNER_PROBE_CANDIDATES)

  return {
    ran: true,
    candidateCount: candidates.length,
    candidates,
  }
}

function updateExperimentalBottomBannerProbe(diagnosticClassification, reason) {
  if (!ENABLE_VERBOSE_DIAGNOSTICS) return null

  if (
    diagnosticClassification !== 'non_blocking_bottom_cookie_banner_possible' &&
    reason !== 'reject_candidate_not_found'
  ) {
    return null
  }

  lastExperimentalBottomBannerProbe =
    buildExperimentalBottomBannerProbe()

  return lastExperimentalBottomBannerProbe
}

function resetExperimentalBottomBannerProbe() {
  lastExperimentalBottomBannerProbe = null
}

function resetRejectVerificationDiagnostics() {
  lastRejectVerificationDiagnostics = null
}

function getDiagnosticClickableControlsFromRoot(root) {
  return safeQuerySelectorAll(
    root,
    [
      'button',
      'a',
      '[role="button"]',
      'input',
      '[onclick]',
      '[tabindex]',
    ].join(',')
  )
    .slice(0, MAX_PRIORITIZED_CMP_ROOT_SCAN)
}

function collectLateDiagnosticControls() {
  const controls = []
  const addControls = (root) => {
    controls.push(...getDiagnosticClickableControlsFromRoot(root))
  }

  addControls(document)

  safeQuerySelectorAll(document, '*')
    .slice(0, MAX_COOKIE_TEXT_SCOPE_NODES)
    .forEach((element) => {
      if (controls.length >= MAX_DOM_QUERY_RESULTS) return
      if (!element?.shadowRoot) return

      addControls(element.shadowRoot)
    })

  let accessibleIframeCount = 0
  let inaccessibleIframeCount = 0
  const inaccessibleIframeDomains = []

  safeQuerySelectorAll(document, 'iframe')
    .filter(isVisibleMeaningfulIframe)
    .slice(0, MAX_SAME_ORIGIN_CMP_IFRAMES)
    .forEach((iframe) => {
      if (controls.length >= MAX_DOM_QUERY_RESULTS) return

      try {
        const iframeDocument =
          getAccessibleIframeDocument(iframe)

        if (!iframeDocument?.documentElement) {
          inaccessibleIframeCount += 1
          const domain =
            getIframeDiagnosticDomain(iframe)
          if (domain) inaccessibleIframeDomains.push(domain)
          return
        }

        accessibleIframeCount += 1
        addControls(iframeDocument)
      } catch {
        inaccessibleIframeCount += 1
        const domain =
          getIframeDiagnosticDomain(iframe)
        if (domain) inaccessibleIframeDomains.push(domain)
      }
    })

  return {
    controls: uniqueElements(controls).slice(0, MAX_DOM_QUERY_RESULTS),
    accessibleIframeCount,
    inaccessibleIframeCount,
    inaccessibleIframeDomains:
      [...new Set(inaccessibleIframeDomains)]
        .slice(0, MAX_SAME_ORIGIN_CMP_IFRAMES),
  }
}

function getLateDiagnosticControlSample(control) {
  const intents =
    getDirectClickableIntentSummary(control)

  return {
    type: 'control',
    tagName: control?.tagName?.toLowerCase?.() || '',
    text:
      normalizeMatchText(getActionText(control))
        .slice(0, MAX_DIRECT_CLICKABLE_DIAGNOSTIC_TEXT),
    visible: isVisible(control),
    cookieIntent: intents.cookieIntent,
    rejectIntent: intents.rejectIntent,
    settingsIntent: intents.settingsIntent,
    acceptIntent: intents.acceptIntent,
  }
}

function buildLateDiagnosticSnapshot(reason = 'scan_exhausted') {
  const textDiagnostics =
    buildCookieTextScopeDiagnostics()
  const controlDiagnostics =
    collectLateDiagnosticControls()
  const controls =
    controlDiagnostics.controls
  const visibleControls =
    controls.filter(isVisible)
  const cookieLikeControls =
    controls.filter(hasCookieIntentSignal)
  const rejectLikeControls =
    controls.filter(hasRejectCandidateDiagnosticSignal)
  const controlSamples =
    uniqueElements([
      ...rejectLikeControls,
      ...cookieLikeControls,
      ...visibleControls,
    ])
      .slice(0, MAX_LATE_DIAGNOSTIC_SNAPSHOT_SAMPLES)
      .map(getLateDiagnosticControlSample)
  const textSamples =
    (Array.isArray(textDiagnostics.matches)
      ? textDiagnostics.matches
      : [])
      .slice(
        0,
        Math.max(
          0,
          MAX_LATE_DIAGNOSTIC_SNAPSHOT_SAMPLES -
            controlSamples.length
        )
      )
      .map((match) => ({
        type: 'text',
        scope: String(match.scope || '').slice(0, 24),
        tagName: String(match.tagName || '').slice(0, 24),
        text: String(match.text || '').slice(0, 120),
        visible: Boolean(match.visible),
        nearestClickableAncestorTag:
          String(match.nearestClickableAncestorTag || '').slice(0, 24),
      }))

  return {
    reason: String(reason || 'scan_exhausted').slice(0, 80),
    delayedMs: LATE_DIAGNOSTIC_SNAPSHOT_DELAY_MS,
    capturedAt: new Date().toISOString(),
    cookieTextAppeared:
      Math.max(0, Number(textDiagnostics.totalMatches) || 0) > 0,
    textMatchCount:
      Math.max(0, Number(textDiagnostics.totalMatches) || 0),
    visibleClickableControlsCount: visibleControls.length,
    cookieLikeDirectControlsCount: cookieLikeControls.length,
    rejectLikeDirectControlsCount: rejectLikeControls.length,
    accessibleIframeCount:
      Math.max(0, Number(textDiagnostics.accessibleIframeCount) || 0) +
      controlDiagnostics.accessibleIframeCount,
    inaccessibleIframeCount:
      Math.max(0, Number(textDiagnostics.inaccessibleIframeCount) || 0) +
      controlDiagnostics.inaccessibleIframeCount,
    inaccessibleIframeDomains:
      [
        ...(Array.isArray(textDiagnostics.inaccessibleIframeDomains)
          ? textDiagnostics.inaccessibleIframeDomains
          : []),
        ...controlDiagnostics.inaccessibleIframeDomains,
      ]
        .filter(Boolean)
        .slice(0, MAX_SAME_ORIGIN_CMP_IFRAMES),
    samples:
      [
        ...controlSamples,
        ...textSamples,
      ].slice(0, MAX_LATE_DIAGNOSTIC_SNAPSHOT_SAMPLES),
  }
}

function storeLateDiagnosticSnapshot(snapshot) {
  if (!hasExtensionContext() || !snapshot) return

  lastLateDiagnosticSnapshot = snapshot

  safeStorageGet({
    [CURRENT_SITE_DIAGNOSTIC_KEY]: null,
  }, (data) => {
    const current =
      data?.[CURRENT_SITE_DIAGNOSTIC_KEY]

    if (!current || typeof current !== 'object') {
      return
    }

    safeStorageSet({
      [CURRENT_SITE_DIAGNOSTIC_KEY]: {
        ...current,
        lateDiagnosticSnapshot: snapshot,
        lastUpdatedAt: new Date().toISOString(),
      },
    })
  })
}

function mergeLateDiagnosticSnapshotMarker(partial = {}) {
  const snapshot = {
    ...(lastLateDiagnosticSnapshot || {}),
    ...partial,
    reason:
      String(
        partial.reason ||
          lastLateDiagnosticSnapshot?.reason ||
          'scan_exhausted'
      ).slice(0, 80),
  }

  lastLateDiagnosticSnapshot = snapshot

  if (!hasExtensionContext()) return

  safeStorageGet({
    [CURRENT_SITE_DIAGNOSTIC_KEY]: null,
  }, (data) => {
    const current =
      data?.[CURRENT_SITE_DIAGNOSTIC_KEY]

    if (!current || typeof current !== 'object') {
      return
    }

    safeStorageSet({
      [CURRENT_SITE_DIAGNOSTIC_KEY]: {
        ...current,
        lateDiagnosticSnapshot: snapshot,
        lastUpdatedAt: new Date().toISOString(),
      },
    })
  })
}

function scheduleLateDiagnosticSnapshot(reason = 'scan_exhausted') {
  if (!ENABLE_VERBOSE_DIAGNOSTICS) {
    return
  }

  if (
    lateDiagnosticSnapshotScheduled ||
    !hasExtensionContext() ||
    !shouldRunOnThisSite()
  ) {
    return
  }

  lateDiagnosticSnapshotScheduled = true
  mergeLateDiagnosticSnapshotMarker({
    scheduled: true,
    ran: false,
    reason,
    delayedMs: LATE_DIAGNOSTIC_SNAPSHOT_DELAY_MS,
  })

  setTimeout(() => {
    try {
      const snapshot =
        buildLateDiagnosticSnapshot(reason)

      storeLateDiagnosticSnapshot({
        ...snapshot,
        scheduled: true,
        ran: true,
      })
    } catch (error) {
      mergeLateDiagnosticSnapshotMarker({
        scheduled: true,
        ran: false,
        reason,
        error:
          String(error?.message || error || 'snapshot_failed')
            .slice(0, 120),
      })
      logRuntimeError('late_diagnostic_snapshot', error)
    }
  }, LATE_DIAGNOSTIC_SNAPSHOT_DELAY_MS)
}

function getDiagnosticClassification({
  status = '',
  reason = '',
  matchedRejectText = '',
  blockedReason = '',
  cookieTextScopeDiagnostics = null,
  directClickableDiagnostics = null,
  domScopeDiagnostics = null,
  iframeAccessibilityDiagnostics = null,
  bottomBannerDiagnostics = null,
  prioritizedCmpRootsFound = 0,
  explicitRejectControlDetected = false,
} = {}) {
  const cookieTextCount =
    Math.max(0, Number(cookieTextScopeDiagnostics?.totalMatches) || 0)
  const rejectIntentCount =
    Math.max(0, Number(directClickableDiagnostics?.rejectIntentCount) || 0)
  const cookieLikeCount =
    Math.max(0, Number(directClickableDiagnostics?.cookieLikeCount) || 0)
  const visibleDirectCount =
    Math.max(0, Number(directClickableDiagnostics?.visibleCount) || 0)
  const invisibleDirectCount =
    Math.max(0, Number(directClickableDiagnostics?.invisibleCount) || 0)
  const fixedStickyCount =
    Math.max(0, Number(domScopeDiagnostics?.visibleFixedStickyCount) || 0)
  const shadowRootCount =
    Math.max(0, Number(domScopeDiagnostics?.openShadowRootCount) || 0)
  const bottomBannerCount =
    Math.max(0, Number(bottomBannerDiagnostics?.candidateCount) || 0)
  const iframeEntries =
    Array.isArray(iframeAccessibilityDiagnostics?.iframes)
      ? iframeAccessibilityDiagnostics.iframes
      : []
  const blockedIframe =
    iframeEntries.some((iframe) =>
      iframe &&
      iframe.accessible === false &&
      iframe.visible === true
    )
  const accessibleIframeCookieText =
    iframeEntries.some((iframe) =>
      iframe &&
      iframe.accessible === true &&
      iframe.cookieTextExists === true
    )
  const cmpDetected =
    cookieTextCount > 0 ||
    cookieLikeCount > 0 ||
    Number(prioritizedCmpRootsFound) > 0 ||
    Boolean(explicitRejectControlDetected) ||
    accessibleIframeCookieText
  const rejectDetected =
    rejectIntentCount > 0 ||
    Boolean(matchedRejectText)

  if (blockedIframe) {
    return 'blocked_by_iframe_access'
  }

  if (
    bottomBannerCount > 0 &&
    !rejectDetected
  ) {
    return 'non_blocking_bottom_cookie_banner_possible'
  }

  if (
    cmpDetected &&
    !rejectDetected &&
    (
      visibleDirectCount === 0 ||
      invisibleDirectCount > visibleDirectCount
    )
  ) {
    return 'blocked_by_visibility_gate'
  }

  if (cmpDetected && !rejectDetected) {
    return 'cmp_detected_no_reject'
  }

  if (
    !cmpDetected &&
    (
      reason === 'no_cmp_after_bounded_scans' ||
      reason === 'reject_candidate_not_found' ||
      blockedReason === 'scan_budget_exhausted' ||
      status === 'skipped'
    ) &&
    cookieTextCount === 0 &&
    rejectIntentCount === 0 &&
    fixedStickyCount === 0 &&
    shadowRootCount === 0
  ) {
    return 'possible_unreachable_or_opaque_cmp'
  }

  return 'no_cmp_detected'
}

function recordCurrentSiteDiagnostic({
  status = 'skipped',
  reason = '',
  candidates = [],
  detectedControls = null,
  matchedRejectElement = null,
  matchedRejectText = '',
  blockedReason = '',
  prioritizedCmpRootsFound = lastPrioritizedCmpRootsFound,
  prioritizedRootTexts = lastPrioritizedRootTexts,
  prioritizedRootControlCount = lastPrioritizedRootControlCount,
  cmpModalSignalsDetected = lastCmpModalSignalsDetected,
  modalGeometryMatched = lastModalGeometryMatched,
  explicitRejectControlDetected = lastExplicitRejectControlDetected,
  newsletterSignalsDetected = lastNewsletterSignalsDetected,
  derivedCmpRootFromControl = lastDerivedCmpRootFromControl,
  derivedControlText = lastDerivedControlText,
  mainDocumentControlProbeCount = lastMainDocumentControlProbeCount,
  shadowControlProbeCount = lastShadowControlProbeCount,
  accessibleIframeCount = lastAccessibleIframeCount,
  inaccessibleIframeCount = lastInaccessibleIframeCount,
  iframeProbeMatchedControls = lastIframeProbeMatchedControls,
  iframeCmpDetected = lastIframeCmpDetected,
  iframeRejectDetected = lastIframeRejectDetected,
  iframeDomain = lastIframeDomain,
  iframeInspectionSummaries = lastIframeInspectionSummaries,
  lateHydrationRecheckScheduled: diagnosticLateHydrationRecheckScheduled = lateHydrationRecheckScheduled,
  lateHydrationRecheckRan: diagnosticLateHydrationRecheckRan = lateHydrationRecheckRan,
  settingsSaveDetected = lastSettingsSaveDetected,
  settingsSaveClicked = lastSettingsSaveClicked,
  settingsSaveVerification = lastSettingsSaveVerification,
  decisionTrace = lastDiagnosticDecisionTrace,
  rejectCandidateDiagnostics = lastRejectCandidateDiagnostics,
  directClickableDiagnostics = lastDirectClickableDiagnostics,
  cookieTextScopeDiagnostics = lastCookieTextScopeDiagnostics,
  lateDiagnosticSnapshot = lastLateDiagnosticSnapshot,
  domScopeDiagnostics = lastDomScopeDiagnostics,
  iframeAccessibilityDiagnostics = lastIframeAccessibilityDiagnostics,
  bottomBannerDiagnostics = lastBottomBannerDiagnostics,
  experimentalBottomBannerProbe = lastExperimentalBottomBannerProbe,
  rejectVerificationDiagnostics = lastRejectVerificationDiagnostics,
  fundingChoicesControlDiagnostics = lastFundingChoicesControlDiagnostics,
  elapsedMs = null,
} = {}) {
  if (!hasExtensionContext()) return

  const rootSummary =
    getDiagnosticRootSummary(candidates, [matchedRejectElement])
  const now =
    new Date().toISOString()
  const diagnosticClassification =
    getDiagnosticClassification({
      status,
      reason,
      matchedRejectText:
        matchedRejectText ||
        (
          matchedRejectElement
            ? getActionText(matchedRejectElement)
            : ''
        ),
      blockedReason,
      cookieTextScopeDiagnostics,
      directClickableDiagnostics,
      domScopeDiagnostics,
      iframeAccessibilityDiagnostics,
      bottomBannerDiagnostics,
      prioritizedCmpRootsFound,
      explicitRejectControlDetected,
    })
  const resolvedExperimentalBottomBannerProbe =
    updateExperimentalBottomBannerProbe(
      diagnosticClassification,
      reason
    ) ||
    experimentalBottomBannerProbe
  const diagnostic = {
    domain: getCurrentDomain(),
    url: String(window.location.href || '').slice(0, 500),
    tabId: null,
    source: 'content-script',
    status,
    diagnosticClassification,
    reason: String(reason || '').slice(0, 120),
    detectedControls:
      Array.isArray(detectedControls)
        ? detectedControls.slice(0, MAX_DIAGNOSTIC_CONTROLS)
        : getDiagnosticControlTexts(candidates, [matchedRejectElement]),
    matchedRejectText:
      String(
        matchedRejectText ||
          (
            matchedRejectElement
              ? getActionText(matchedRejectElement)
              : ''
          )
      ).slice(0, 120),
    matchedRejectPhraseNormalized:
      getMatchedRejectPhraseNormalized(
        matchedRejectText ||
          (
            matchedRejectElement
              ? getActionText(matchedRejectElement)
              : ''
          )
      ),
    blockedReason: String(blockedReason || '').slice(0, 120),
    elapsedMs:
      elapsedMs === null
        ? null
        : Math.max(0, Number(elapsedMs) || 0),
    rootTag: rootSummary.rootTag,
    rootClass: rootSummary.rootClass,
    rootReason: rootSummary.rootReason,
    excludedAsMarketingPopup: Boolean(rootSummary.excludedAsMarketingPopup),
    prioritizedCmpRootsFound:
      Math.max(0, Number(prioritizedCmpRootsFound) || 0),
    prioritizedRootTexts:
      (Array.isArray(prioritizedRootTexts)
        ? prioritizedRootTexts
        : [])
        .filter(Boolean)
        .slice(0, 3),
    prioritizedRootControlCount:
      Math.max(0, Number(prioritizedRootControlCount) || 0),
    cmpModalSignalsDetected:
      Boolean(cmpModalSignalsDetected),
    modalGeometryMatched:
      Boolean(modalGeometryMatched),
    explicitRejectControlDetected:
      Boolean(explicitRejectControlDetected),
    newsletterSignalsDetected:
      Boolean(newsletterSignalsDetected),
    derivedCmpRootFromControl:
      Boolean(derivedCmpRootFromControl),
    derivedControlText:
      String(derivedControlText || '').slice(0, 120),
    mainDocumentControlProbeCount:
      Math.max(0, Number(mainDocumentControlProbeCount) || 0),
    shadowControlProbeCount:
      Math.max(0, Number(shadowControlProbeCount) || 0),
    accessibleIframeCount:
      Math.max(0, Number(accessibleIframeCount) || 0),
    inaccessibleIframeCount:
      Math.max(0, Number(inaccessibleIframeCount) || 0),
    iframeProbeMatchedControls:
      (Array.isArray(iframeProbeMatchedControls)
        ? iframeProbeMatchedControls
        : [])
        .filter(Boolean)
        .slice(0, 5),
    iframeCmpDetected:
      Boolean(iframeCmpDetected),
    iframeRejectDetected:
      Boolean(iframeRejectDetected),
    iframeDomain:
      String(iframeDomain || '').slice(0, 120),
    iframeInspectionSummaries:
      (Array.isArray(iframeInspectionSummaries)
        ? iframeInspectionSummaries
        : [])
        .slice(0, MAX_SAME_ORIGIN_CMP_IFRAMES),
    lateHydrationRecheckScheduled:
      Boolean(diagnosticLateHydrationRecheckScheduled),
    lateHydrationRecheckRan:
      Boolean(diagnosticLateHydrationRecheckRan),
    settingsSaveDetected:
      Boolean(settingsSaveDetected),
    settingsSaveClicked:
      Boolean(settingsSaveClicked),
    settingsSaveVerification:
      String(settingsSaveVerification || '').slice(0, 120),
    decisionTrace:
      decisionTrace && typeof decisionTrace === 'object'
        ? {
            source:
              String(decisionTrace.source || '').slice(0, 40),
            scanCount:
              Math.max(0, Number(decisionTrace.scanCount) || 0),
            mutationScanCount:
              Math.max(0, Number(decisionTrace.mutationScanCount) || 0),
            elapsedMs:
              Math.max(0, Number(decisionTrace.elapsedMs) || 0),
            steps:
              (Array.isArray(decisionTrace.steps)
                ? decisionTrace.steps
                : [])
                .slice(0, MAX_DIAGNOSTIC_DECISION_TRACE_STEPS),
          }
        : null,
    rejectCandidateDiagnostics:
      (Array.isArray(rejectCandidateDiagnostics)
        ? rejectCandidateDiagnostics
        : [])
        .slice(0, MAX_REJECT_CANDIDATE_DIAGNOSTICS),
    directClickableDiagnostics:
      directClickableDiagnostics &&
      typeof directClickableDiagnostics === 'object'
        ? {
            totalScanned:
              Math.max(0, Number(directClickableDiagnostics.totalScanned) || 0),
            cookieLikeCount:
              Math.max(0, Number(directClickableDiagnostics.cookieLikeCount) || 0),
            rejectIntentCount:
              Math.max(0, Number(directClickableDiagnostics.rejectIntentCount) || 0),
            settingsIntentCount:
              Math.max(0, Number(directClickableDiagnostics.settingsIntentCount) || 0),
            acceptIntentCount:
              Math.max(0, Number(directClickableDiagnostics.acceptIntentCount) || 0),
            visibleCount:
              Math.max(0, Number(directClickableDiagnostics.visibleCount) || 0),
            invisibleCount:
              Math.max(0, Number(directClickableDiagnostics.invisibleCount) || 0),
            intentControls:
              (Array.isArray(directClickableDiagnostics.intentControls)
                ? directClickableDiagnostics.intentControls
                : [])
                .slice(0, MAX_DIRECT_CLICKABLE_DIAGNOSTICS_PER_GROUP),
            visibleControls:
              (Array.isArray(directClickableDiagnostics.visibleControls)
                ? directClickableDiagnostics.visibleControls
                : [])
                .slice(0, MAX_DIRECT_CLICKABLE_DIAGNOSTICS_PER_GROUP),
            invisibleControls:
              (Array.isArray(directClickableDiagnostics.invisibleControls)
                ? directClickableDiagnostics.invisibleControls
                : [])
                .slice(0, MAX_DIRECT_CLICKABLE_DIAGNOSTICS_PER_GROUP),
          }
        : null,
    cookieTextScopeDiagnostics:
      cookieTextScopeDiagnostics &&
      typeof cookieTextScopeDiagnostics === 'object'
        ? {
            totalMatches:
              Math.max(0, Number(cookieTextScopeDiagnostics.totalMatches) || 0),
            nodesVisited:
              Math.max(0, Number(cookieTextScopeDiagnostics.nodesVisited) || 0),
            mainDocumentMatched:
              Boolean(cookieTextScopeDiagnostics.mainDocumentMatched),
            shadowRootCount:
              Math.max(0, Number(cookieTextScopeDiagnostics.shadowRootCount) || 0),
            shadowMatched:
              Boolean(cookieTextScopeDiagnostics.shadowMatched),
            accessibleIframeCount:
              Math.max(0, Number(cookieTextScopeDiagnostics.accessibleIframeCount) || 0),
            inaccessibleIframeCount:
              Math.max(0, Number(cookieTextScopeDiagnostics.inaccessibleIframeCount) || 0),
            inaccessibleIframeDomains:
              (Array.isArray(cookieTextScopeDiagnostics.inaccessibleIframeDomains)
                ? cookieTextScopeDiagnostics.inaccessibleIframeDomains
                : [])
                .filter(Boolean)
                .slice(0, MAX_SAME_ORIGIN_CMP_IFRAMES),
            iframeMatched:
              Boolean(cookieTextScopeDiagnostics.iframeMatched),
            matches:
              (Array.isArray(cookieTextScopeDiagnostics.matches)
                ? cookieTextScopeDiagnostics.matches
                : [])
                .slice(0, MAX_COOKIE_TEXT_SCOPE_MATCHES),
          }
        : null,
    lateDiagnosticSnapshot:
      ENABLE_VERBOSE_DIAGNOSTICS &&
      lateDiagnosticSnapshot &&
      typeof lateDiagnosticSnapshot === 'object'
        ? lateDiagnosticSnapshot
        : null,
    domScopeDiagnostics:
      domScopeDiagnostics &&
      typeof domScopeDiagnostics === 'object'
        ? {
            bodyTextLength:
              Math.max(0, Number(domScopeDiagnostics.bodyTextLength) || 0),
            elementsScanned:
              Math.max(0, Number(domScopeDiagnostics.elementsScanned) || 0),
            fixedStickyScannedCount:
              Math.max(0, Number(domScopeDiagnostics.fixedStickyScannedCount) || 0),
            visibleFixedStickyCount:
              Math.max(0, Number(domScopeDiagnostics.visibleFixedStickyCount) || 0),
            topVisibleFixedStickyElements:
              (Array.isArray(domScopeDiagnostics.topVisibleFixedStickyElements)
                ? domScopeDiagnostics.topVisibleFixedStickyElements
                : [])
                .slice(0, MAX_DOM_SCOPE_FIXED_STICKY_SAMPLES),
            openShadowRootCount:
              Math.max(0, Number(domScopeDiagnostics.openShadowRootCount) || 0),
            iframeCount:
              Math.max(0, Number(domScopeDiagnostics.iframeCount) || 0),
            iframeDomains:
              (Array.isArray(domScopeDiagnostics.iframeDomains)
                ? domScopeDiagnostics.iframeDomains
                : [])
                .filter(Boolean)
                .slice(0, MAX_SAME_ORIGIN_CMP_IFRAMES),
          }
        : null,
    iframeAccessibilityDiagnostics:
      iframeAccessibilityDiagnostics &&
      typeof iframeAccessibilityDiagnostics === 'object'
        ? {
            iframeCount:
              Math.max(0, Number(iframeAccessibilityDiagnostics.iframeCount) || 0),
            iframes:
              (Array.isArray(iframeAccessibilityDiagnostics.iframes)
                ? iframeAccessibilityDiagnostics.iframes
                : [])
                .slice(0, MAX_IFRAME_ACCESSIBILITY_DIAGNOSTICS),
          }
        : null,
    bottomBannerDiagnostics:
      bottomBannerDiagnostics &&
      typeof bottomBannerDiagnostics === 'object'
        ? {
            candidateCount:
              Math.max(0, Number(bottomBannerDiagnostics.candidateCount) || 0),
            candidates:
              (Array.isArray(bottomBannerDiagnostics.candidates)
                ? bottomBannerDiagnostics.candidates
                : [])
                .slice(0, MAX_BOTTOM_BANNER_DIAGNOSTICS),
          }
        : null,
    experimentalBottomBannerProbe:
      resolvedExperimentalBottomBannerProbe &&
      typeof resolvedExperimentalBottomBannerProbe === 'object'
        ? {
            ran:
              Boolean(resolvedExperimentalBottomBannerProbe.ran),
            candidateCount:
              Math.max(0, Number(resolvedExperimentalBottomBannerProbe.candidateCount) || 0),
            candidates:
              (Array.isArray(resolvedExperimentalBottomBannerProbe.candidates)
                ? resolvedExperimentalBottomBannerProbe.candidates
                : [])
                .slice(0, MAX_EXPERIMENTAL_BOTTOM_BANNER_PROBE_CANDIDATES),
          }
        : null,
    rejectVerificationDiagnostics:
      rejectVerificationDiagnostics &&
      typeof rejectVerificationDiagnostics === 'object'
        ? {
            outcome:
              String(rejectVerificationDiagnostics.outcome || '').slice(0, 80),
            clickedControlText:
              String(rejectVerificationDiagnostics.clickedControlText || '').slice(0, 120),
            verificationDelayMs:
              Math.max(0, Number(rejectVerificationDiagnostics.verificationDelayMs) || 0),
            clickedControlConnected:
              Boolean(rejectVerificationDiagnostics.clickedControlConnected),
            clickedControlVisible:
              Boolean(rejectVerificationDiagnostics.clickedControlVisible),
            clickedControlVisibility:
              rejectVerificationDiagnostics.clickedControlVisibility || null,
            rootConnected:
              Boolean(rejectVerificationDiagnostics.rootConnected),
            rootStillSame:
              Boolean(rejectVerificationDiagnostics.rootStillSame),
            rootVisible:
              Boolean(rejectVerificationDiagnostics.rootVisible),
            rootVisibility:
              rejectVerificationDiagnostics.rootVisibility || null,
            rootGeometry:
              rejectVerificationDiagnostics.rootGeometry || null,
            rootStyle:
              rejectVerificationDiagnostics.rootStyle || null,
            stateRootConnected:
              Boolean(rejectVerificationDiagnostics.stateRootConnected),
            stateRootVisible:
              Boolean(rejectVerificationDiagnostics.stateRootVisible),
            stateRootGeometry:
              rejectVerificationDiagnostics.stateRootGeometry || null,
            pageInteractionAvailable:
              Boolean(rejectVerificationDiagnostics.pageInteractionAvailable),
            scrollRestored:
              Boolean(rejectVerificationDiagnostics.scrollRestored),
            bannerVisible:
              Boolean(rejectVerificationDiagnostics.bannerVisible),
            modalPresent:
              Boolean(rejectVerificationDiagnostics.modalPresent),
            overlayPresent:
              Boolean(rejectVerificationDiagnostics.overlayPresent),
            ariaHidden:
              Boolean(rejectVerificationDiagnostics.ariaHidden),
            cssHidden:
              Boolean(rejectVerificationDiagnostics.cssHidden),
            active:
              Boolean(rejectVerificationDiagnostics.active),
            replacement:
              rejectVerificationDiagnostics.replacement &&
              typeof rejectVerificationDiagnostics.replacement === 'object'
                ? {
                    detected:
                      Boolean(rejectVerificationDiagnostics.replacement.detected),
                    count:
                      Math.max(0, Number(rejectVerificationDiagnostics.replacement.count) || 0),
                    samples:
                      (Array.isArray(rejectVerificationDiagnostics.replacement.samples)
                        ? rejectVerificationDiagnostics.replacement.samples
                        : [])
                        .slice(0, 1),
                  }
                : null,
          }
        : null,
    fundingChoicesControlDiagnostics:
      fundingChoicesControlDiagnostics &&
      typeof fundingChoicesControlDiagnostics === 'object'
        ? {
            collectedAt:
              String(fundingChoicesControlDiagnostics.collectedAt || '').slice(0, 40),
            controlCount:
              Math.max(0, Number(fundingChoicesControlDiagnostics.controlCount) || 0),
            sliderCount:
              Math.max(0, Number(fundingChoicesControlDiagnostics.sliderCount) || 0),
            activeSliderCount:
              Math.max(0, Number(fundingChoicesControlDiagnostics.activeSliderCount) || 0),
            preferenceToggleCount:
              Math.max(0, Number(fundingChoicesControlDiagnostics.preferenceToggleCount) || 0),
            activePreferenceToggleCount:
              Math.max(0, Number(fundingChoicesControlDiagnostics.activePreferenceToggleCount) || 0),
            mainRequiredActiveBefore:
              Math.max(0, Number(fundingChoicesControlDiagnostics.mainRequiredActiveBefore) || 0),
            mainRequiredActiveAfter:
              Math.max(0, Number(fundingChoicesControlDiagnostics.mainRequiredActiveAfter) || 0),
            mainClickedCount:
              Math.max(0, Number(fundingChoicesControlDiagnostics.mainClickedCount) || 0),
            mainToggleMethod:
              String(fundingChoicesControlDiagnostics.mainToggleMethod || '').slice(0, 40),
            providerPreferenceOpened:
              Boolean(fundingChoicesControlDiagnostics.providerPreferenceOpened),
            providerToggleCount:
              Math.max(0, Number(fundingChoicesControlDiagnostics.providerToggleCount) || 0),
            activeProviderToggleCount:
              Math.max(0, Number(fundingChoicesControlDiagnostics.activeProviderToggleCount) || 0),
            providerInspectedCount:
              Math.max(0, Number(fundingChoicesControlDiagnostics.providerInspectedCount) || 0),
            providerActiveFoundCount:
              Math.max(0, Number(fundingChoicesControlDiagnostics.providerActiveFoundCount) || 0),
            providerClickedCount:
              Math.max(0, Number(fundingChoicesControlDiagnostics.providerClickedCount) || 0),
            providerTimeBudgetExceeded:
              Boolean(fundingChoicesControlDiagnostics.providerTimeBudgetExceeded),
            providerToggleMethod:
              String(fundingChoicesControlDiagnostics.providerToggleMethod || '').slice(0, 40),
            providerPreferenceTextMatch:
              String(fundingChoicesControlDiagnostics.providerPreferenceTextMatch || '').slice(0, 90),
            providerPreferenceClickableTargetTag:
              String(fundingChoicesControlDiagnostics.providerPreferenceClickableTargetTag || '').slice(0, 40),
            providerPreferenceClickMethod:
              String(fundingChoicesControlDiagnostics.providerPreferenceClickMethod || '').slice(0, 40),
            providerPreferenceClickSuccess:
              Boolean(fundingChoicesControlDiagnostics.providerPreferenceClickSuccess),
            providerPreferenceScrollAttempts:
              Math.max(0, Number(fundingChoicesControlDiagnostics.providerPreferenceScrollAttempts) || 0),
            providerPreferenceScrollTop:
              Math.max(0, Number(fundingChoicesControlDiagnostics.providerPreferenceScrollTop) || 0),
            providerManageVendorsSelectorExecuted:
              Boolean(fundingChoicesControlDiagnostics.providerManageVendorsSelectorExecuted),
            providerManageVendorsFoundImmediate:
              Boolean(fundingChoicesControlDiagnostics.providerManageVendorsFoundImmediate),
            providerManageVendorsFound300ms:
              Boolean(fundingChoicesControlDiagnostics.providerManageVendorsFound300ms),
            providerManageVendorsFound800ms:
              Boolean(fundingChoicesControlDiagnostics.providerManageVendorsFound800ms),
            providerManageVendorsFound1500ms:
              Boolean(fundingChoicesControlDiagnostics.providerManageVendorsFound1500ms),
            providerManageVendorsCountImmediate:
              Math.max(0, Number(fundingChoicesControlDiagnostics.providerManageVendorsCountImmediate) || 0),
            providerManageVendorsCount300ms:
              Math.max(0, Number(fundingChoicesControlDiagnostics.providerManageVendorsCount300ms) || 0),
            providerManageVendorsCount800ms:
              Math.max(0, Number(fundingChoicesControlDiagnostics.providerManageVendorsCount800ms) || 0),
            providerManageVendorsCount1500ms:
              Math.max(0, Number(fundingChoicesControlDiagnostics.providerManageVendorsCount1500ms) || 0),
            providerManageVendorsFoundDelayed:
              Boolean(fundingChoicesControlDiagnostics.providerManageVendorsFoundDelayed),
            providerManageVendorsElement:
              fundingChoicesControlDiagnostics.providerManageVendorsElement &&
              typeof fundingChoicesControlDiagnostics.providerManageVendorsElement === 'object'
                ? {
                    tagName:
                      String(fundingChoicesControlDiagnostics.providerManageVendorsElement.tagName || '').slice(0, 24),
                    className:
                      String(fundingChoicesControlDiagnostics.providerManageVendorsElement.className || '').slice(0, 120),
                    connected:
                      Boolean(fundingChoicesControlDiagnostics.providerManageVendorsElement.connected),
                    offsetParent:
                      Boolean(fundingChoicesControlDiagnostics.providerManageVendorsElement.offsetParent),
                    display:
                      String(fundingChoicesControlDiagnostics.providerManageVendorsElement.display || '').slice(0, 30),
                    visibility:
                      String(fundingChoicesControlDiagnostics.providerManageVendorsElement.visibility || '').slice(0, 30),
                    opacity:
                      String(fundingChoicesControlDiagnostics.providerManageVendorsElement.opacity || '').slice(0, 20),
                    pointerEvents:
                      String(fundingChoicesControlDiagnostics.providerManageVendorsElement.pointerEvents || '').slice(0, 30),
                    disabled:
                      Boolean(fundingChoicesControlDiagnostics.providerManageVendorsElement.disabled),
                    ariaHidden:
                      String(fundingChoicesControlDiagnostics.providerManageVendorsElement.ariaHidden || '').slice(0, 20),
                    rectWidth:
                      Math.max(0, Number(fundingChoicesControlDiagnostics.providerManageVendorsElement.rectWidth) || 0),
                    rectHeight:
                      Math.max(0, Number(fundingChoicesControlDiagnostics.providerManageVendorsElement.rectHeight) || 0),
                    text:
                      String(fundingChoicesControlDiagnostics.providerManageVendorsElement.text || '').slice(0, 120),
                  }
                : null,
            manageVendorsRejectedReason:
              String(fundingChoicesControlDiagnostics.manageVendorsRejectedReason || '').slice(0, 80),
            manageVendorsSensitiveBypass:
              Boolean(fundingChoicesControlDiagnostics.manageVendorsSensitiveBypass),
            manageVendorsMode:
              String(fundingChoicesControlDiagnostics.manageVendorsMode || '').slice(0, 20),
            manageVendorsAllowClick:
              Boolean(fundingChoicesControlDiagnostics.manageVendorsAllowClick),
            providerManageVendorsFound:
              Boolean(fundingChoicesControlDiagnostics.providerManageVendorsFound),
            providerManageVendorsClicked:
              Boolean(fundingChoicesControlDiagnostics.providerManageVendorsClicked),
            clickableOwnerCount:
              Math.max(0, Number(fundingChoicesControlDiagnostics.clickableOwnerCount) || 0),
            preferenceToggleActions:
              (Array.isArray(fundingChoicesControlDiagnostics.preferenceToggleActions)
                ? fundingChoicesControlDiagnostics.preferenceToggleActions
                : [])
                .slice(0, MAX_FUNDING_CHOICES_CONTROL_DIAGNOSTICS)
                .map((action) => ({
                  ariaLabel:
                    String(action?.ariaLabel || '').slice(0, 90),
                  scope:
                    String(action?.scope || '').slice(0, 20),
                  inputId:
                    String(action?.inputId || '').slice(0, 60),
                  inputName:
                    String(action?.inputName || '').slice(0, 60),
                  inputClass:
                    String(action?.inputClass || '').slice(0, 90),
                  inputOuterHTML:
                    String(action?.inputOuterHTML || '').slice(0, 220),
                  wrapperOuterHTML:
                    String(action?.wrapperOuterHTML || '').slice(0, 220),
                  labelOuterHTML:
                    String(action?.labelOuterHTML || '').slice(0, 220),
                  ancestorOuterHTML:
                    String(action?.ancestorOuterHTML || '').slice(0, 220),
                  sliderClass:
                    String(action?.sliderClass || '').slice(0, 90),
                  ariaPressedBefore:
                    String(action?.ariaPressedBefore || '').slice(0, 20),
                  checkedBefore:
                    Boolean(action?.checkedBefore),
                  activeBefore:
                    Boolean(action?.activeBefore),
                  visibleInput:
                    Boolean(action?.visibleInput),
                  labelClass:
                    String(action?.labelClass || '').slice(0, 90),
                  wrapperClass:
                    String(action?.wrapperClass || '').slice(0, 90),
                  clickTarget:
                    String(action?.clickTarget || '').slice(0, 40),
                  clicked:
                    Boolean(action?.clicked),
                  clickDispatched:
                    Boolean(action?.clickDispatched),
                  ariaPressedAfter:
                    String(action?.ariaPressedAfter || '').slice(0, 20),
                  checkedAfter:
                    Boolean(action?.checkedAfter),
                  activeAfter:
                    Boolean(action?.activeAfter),
                  stillActive:
                    Boolean(action?.stillActive),
                  skippedReason:
                    String(action?.skippedReason || '').slice(0, 80),
                })),
            controls:
              (Array.isArray(fundingChoicesControlDiagnostics.controls)
                ? fundingChoicesControlDiagnostics.controls
                : [])
                .slice(0, MAX_FUNDING_CHOICES_CONTROL_DIAGNOSTICS),
          }
        : null,
    lastUpdatedAt: now,
  }

  safeStorageSet({
    [CURRENT_SITE_DIAGNOSTIC_KEY]: diagnostic,
  })
}

function clearCurrentSiteDiagnostic(reason = 'stale') {
  safeStorageSet({
    [CURRENT_SITE_DIAGNOSTIC_KEY]: {
      domain: getCurrentDomain(),
      url: String(window.location.href || '').slice(0, 500),
      tabId: null,
      source: 'content-script',
      status: 'skipped',
      reason,
      detectedControls: [],
      matchedRejectText: '',
      matchedRejectPhraseNormalized: '',
      blockedReason: '',
      elapsedMs: 0,
      rootTag: '',
      rootClass: '',
      rootReason: '',
      excludedAsMarketingPopup: false,
      prioritizedCmpRootsFound: 0,
      prioritizedRootTexts: [],
      prioritizedRootControlCount: 0,
      cmpModalSignalsDetected: false,
      modalGeometryMatched: false,
      explicitRejectControlDetected: false,
      newsletterSignalsDetected: false,
      derivedCmpRootFromControl: false,
      derivedControlText: '',
      mainDocumentControlProbeCount: 0,
      shadowControlProbeCount: 0,
      accessibleIframeCount: 0,
      inaccessibleIframeCount: 0,
      iframeProbeMatchedControls: [],
      iframeCmpDetected: false,
      iframeRejectDetected: false,
      iframeDomain: '',
      iframeInspectionSummaries: [],
      lateHydrationRecheckScheduled: false,
      lateHydrationRecheckRan: false,
      settingsSaveDetected: false,
      settingsSaveClicked: false,
      settingsSaveVerification: '',
      decisionTrace: null,
      rejectCandidateDiagnostics: [],
      directClickableDiagnostics: null,
      cookieTextScopeDiagnostics: null,
      lateDiagnosticSnapshot: lastLateDiagnosticSnapshot,
      domScopeDiagnostics: null,
      iframeAccessibilityDiagnostics: null,
      bottomBannerDiagnostics: null,
      experimentalBottomBannerProbe: null,
      rejectVerificationDiagnostics: null,
      fundingChoicesControlDiagnostics: null,
      lastUpdatedAt: new Date().toISOString(),
    },
  })
}

function isDiagnosticLifecycleStillActive(diagnostic) {
  return Boolean(
    diagnostic &&
      typeof diagnostic === 'object' &&
      diagnostic.source === 'content-script' &&
      diagnostic.status === 'active' &&
      diagnostic.reason === 'content_script_running'
  )
}

function finalizeStuckDiagnosticLifecycle(reason = 'scan_lifecycle_timeout') {
  const elapsedMs =
    Math.max(0, Date.now() - diagnosticLifecycleStartedAt)

  safeStorageGet({
    [CURRENT_SITE_DIAGNOSTIC_KEY]: null,
  }, (data) => {
    const diagnostic =
      data?.[CURRENT_SITE_DIAGNOSTIC_KEY]

    if (!isDiagnosticLifecycleStillActive(diagnostic)) {
      return
    }

    safeStorageSet({
      [CURRENT_SITE_DIAGNOSTIC_KEY]: {
        ...diagnostic,
        status: 'skipped',
        reason,
        blockedReason: 'scan_not_finalized',
        elapsedMs,
        decisionTrace: lastDiagnosticDecisionTrace,
        lastUpdatedAt: new Date().toISOString(),
      },
    })
  })
}

function scheduleDiagnosticLifecycleWatchdog() {
  if (diagnosticLifecycleWatchdogTimer) {
    return
  }

  diagnosticLifecycleWatchdogTimer =
    setTimeout(() => {
      diagnosticLifecycleWatchdogTimer = null

      if (!hasExtensionContext()) return

      finalizeStuckDiagnosticLifecycle('scan_lifecycle_timeout')
    }, DIAGNOSTIC_LIFECYCLE_WATCHDOG_MS)
}

diagnosticLifecycleStartedAt = Date.now()
scheduleDiagnosticLifecycleWatchdog()
recordCurrentSiteDiagnostic({
  status: 'active',
  reason: 'content_script_running',
  detectedControls: [],
})

function normalizeDomain(value) {
  return (value || '')
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')
    .split('/')[0]
    .split(':')[0]
    .replace(/\.$/, '')
    .replace(/^www\./, '')
}

function getCurrentDomain() {
  return normalizeDomain(window.location.hostname)
}

function getEmptyCookieAuditCounts() {
  return {
    essentialSessionSecurity: 0,
    consentPreference: 0,
    analytics: 0,
    advertisingMarketing: 0,
    trackingSocial: 0,
    unknown: 0,
  }
}

function getEmptyCookieAuditSamples() {
  return {
    essentialSessionSecurity: [],
    consentPreference: [],
    analytics: [],
    advertisingMarketing: [],
    trackingSocial: [],
    unknown: [],
  }
}

function normalizeCookieNameForAudit(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
}

function cookieAuditNameHasAny(name, terms) {
  const normalizedName =
    normalizeCookieNameForAudit(name)

  if (!normalizedName) return false

  return terms.some((term) =>
    normalizedName.includes(term)
  )
}

function classifyCookieNameForAudit(name) {
  const normalizedName =
    normalizeCookieNameForAudit(name)

  if (!normalizedName) return 'unknown'

  if (
    normalizedName === 'phpsessid' ||
    normalizedName === 'jsessionid' ||
    normalizedName === 'asp.net_sessionid' ||
    normalizedName === 'sessionid' ||
    normalizedName.endsWith('_session') ||
    cookieAuditNameHasAny(normalizedName, [
      'csrf',
      'xsrf',
      'auth',
      'security',
      'secure',
      'session',
      'logged_in',
      'wordpress_logged_in',
    ])
  ) {
    return 'essentialSessionSecurity'
  }

  if (
    cookieAuditNameHasAny(normalizedName, [
      'consent',
      'cookieconsent',
      'cookiescriptconsent',
      'onetrust',
      'optanon',
      'didomi',
      'euconsent',
      'gdpr',
      'privacy',
      'preference',
      'prefs',
      'ccpa',
      'tcf',
      'cmp',
    ])
  ) {
    return 'consentPreference'
  }

  if (
    normalizedName === '_ga' ||
    normalizedName === '_gid' ||
    normalizedName === '_gat' ||
    normalizedName.startsWith('_ga_') ||
    normalizedName.startsWith('_hj') ||
    normalizedName.startsWith('ga_') ||
    cookieAuditNameHasAny(normalizedName, [
      'analytics',
      'matomo',
      'piwik',
      'plausible',
      'amplitude',
      'mixpanel',
      'segment',
      'hotjar',
    ])
  ) {
    return 'analytics'
  }

  if (
    normalizedName === '_fbp' ||
    normalizedName === '_fbc' ||
    normalizedName === 'fr' ||
    normalizedName === 'ide' ||
    normalizedName === 'test_cookie' ||
    normalizedName.startsWith('_gcl') ||
    normalizedName.startsWith('gcl_') ||
    cookieAuditNameHasAny(normalizedName, [
      'doubleclick',
      'marketing',
      'campaign',
      'criteo',
      'taboola',
      'outbrain',
    ])
  ) {
    return 'advertisingMarketing'
  }

  if (
    normalizedName === '_ttp' ||
    normalizedName === 'bcookie' ||
    normalizedName === 'bscookie' ||
    normalizedName === 'personalization_id' ||
    normalizedName.startsWith('li_') ||
    cookieAuditNameHasAny(normalizedName, [
      'track',
      'tracker',
      'social',
      'pixel',
      'linkedin',
      'twitter',
      'ttclid',
      'tiktok',
    ])
  ) {
    return 'trackingSocial'
  }

  return 'unknown'
}

function readCookieNamesForAudit() {
  try {
    return String(document.cookie || '')
      .split(';')
      .map((cookie) => cookie.split('=')[0].trim())
      .filter(Boolean)
      .slice(0, MAX_COOKIE_AUDIT_NAMES)
  } catch {
    return []
  }
}

function buildCookieAudit(context = {}) {
  const names =
    readCookieNamesForAudit()
  const counts =
    getEmptyCookieAuditCounts()
  const samples =
    getEmptyCookieAuditSamples()

  names.forEach((name) => {
    const category =
      classifyCookieNameForAudit(name)

    counts[category] += 1

    if (
      samples[category].length <
      MAX_COOKIE_AUDIT_SAMPLES_PER_CATEGORY
    ) {
      samples[category].push(name)
    }
  })

  return {
    domain: getCurrentDomain(),
    auditedAt: Date.now(),
    actionType: context.type || '',
    readableCookieCount: names.length,
    categories: counts,
    samples,
  }
}

function recordCookieAuditAfterSuccessfulAction(context = {}) {
  const audit =
    buildCookieAudit(context)

  safeStorageSet({
    [COOKIE_AUDIT_KEY]: audit,
  })

  updateAddislineTestReport({
    event: 'cookieAudit',
    lastCookieAudit: audit,
  })

  rejectFlowLog('Cookie audit completed', {
    readableCookieCount: audit.readableCookieCount,
    categories: audit.categories,
  })

  return audit
}

function isTopFrameContext() {
  try {
    return window.self === window.top
  } catch {
    return false
  }
}

function isPageActiveForAutomation() {
  try {
    return document.visibilityState !== 'hidden'
  } catch {
    return true
  }
}

function isDomainExcluded(domain, domains) {
  const normalizedDomain = normalizeDomain(domain || '')

  if (!normalizedDomain) return false

  try {
    return (Array.isArray(domains) ? domains : [])
      .map(normalizeDomain)
      .filter(Boolean)
      .some((excludedDomain) =>
        normalizedDomain === excludedDomain ||
        normalizedDomain.endsWith(`.${excludedDomain}`)
      )
  } catch {
    return false
  }
}

function shouldRunOnThisSite() {
  return (
    ENABLE_ALL_AUTOMATION &&
    isTopFrameContext() &&
    isPageActiveForAutomation() &&
    protectionEnabled &&
    !isDomainExcluded(getCurrentDomain(), excludedDomains)
  )
}

function getNormalizedProtectionMode() {
  if (protectionMode === 'soft') return 'soft'
  if (protectionMode === 'strict') return 'strict'

  return 'normal'
}

function getProtectionModeConfig() {
  return PROTECTION_MODE_CONFIGS[getNormalizedProtectionMode()] ||
    PROTECTION_MODE_CONFIGS.normal
}

async function incrementStat(statName, amount = 1) {
  if (!shouldRunOnThisSite()) return

  statsUpdateQueue = statsUpdateQueue
    .then(async () => {
      const stored =
        await safeSyncStorageGet({
          [STATS_KEY]: DEFAULT_STATS,
        })

      const stats =
        normalizeStats(stored[STATS_KEY])

      stats[statName] =
        (stats[statName] || 0) + amount

      await safeSyncStorageSet({
        [STATS_KEY]: stats,
      })

      // Send protection event to background
      sendProtectionEvent({
        bannersHidden: statName === 'bannersHidden' ? amount : 0,
        trackersReduced: statName === 'trackersReduced' ? amount : 0,
        vendorsDenied: statName === 'vendorsDenied' ? amount : 0,
        legitimateInterestsDisabled: statName === 'legitimateInterestsDisabled' ? amount : 0,
        source: 'content',
        timestamp: new Date().toISOString(),
      })
    })
    .catch(() => {})

  await statsUpdateQueue
}

async function setStatValue(statName, value) {
  const stored =
    await safeSyncStorageGet({
      [STATS_KEY]: DEFAULT_STATS,
    })

  const stats =
    normalizeStats(stored[STATS_KEY])

  stats[statName] =
    value

  await safeSyncStorageSet({
    [STATS_KEY]: stats,
  })
}

function normalizeProtectedDomainRecord(record) {
  if (typeof record === 'string') {
    const domain =
      normalizeDomain(record)

    return domain
      ? {
          domain,
          firstSeenAt: '',
          lastActionAt: '',
          lastRejectAt: '',
          actionCount: 0,
        }
      : null
  }

  if (!record || typeof record !== 'object') {
    return null
  }

  const domain =
    normalizeDomain(record.domain)

  if (!domain) return null

  return {
    domain,
    firstSeenAt: String(record.firstSeenAt || ''),
    lastActionAt: String(record.lastActionAt || ''),
    lastRejectAt: String(record.lastRejectAt || ''),
    actionCount: Math.max(0, Number(record.actionCount) || 0),
  }
}

function getProtectedDomainRecordDomain(record) {
  return normalizeDomain(
    typeof record === 'string'
      ? record
      : record?.domain
  )
}

function recordProtectedSite(actionType = 'visit', forceUpdate = false) {
  if (
    (
      protectedDomainRecorded &&
      !forceUpdate
    ) ||
    !shouldRunOnThisSite()
  ) {
    return
  }

  const currentDomain = getCurrentDomain()

  if (!currentDomain) return

  if (!forceUpdate) {
    protectedDomainRecorded = true
  }

  safeStorageGet(
    {
      [PROTECTED_DOMAINS_KEY]: [],
    },
    (stored) => {
      const now =
        new Date().toISOString()
      const records =
        (Array.isArray(stored[PROTECTED_DOMAINS_KEY])
          ? stored[PROTECTED_DOMAINS_KEY]
          : [])
          .map(normalizeProtectedDomainRecord)
          .filter(Boolean)
      const existingRecord =
        records.find((record) =>
          record.domain === currentDomain
        )
      const hasAction =
        actionType && actionType !== 'visit'

      if (
        existingRecord &&
        !forceUpdate &&
        !hasAction
      ) {
        return
      }

      const nextRecord = {
        ...(existingRecord || {
          domain: currentDomain,
          firstSeenAt: now,
          actionCount: 0,
        }),
        lastActionAt: hasAction
          ? now
          : existingRecord?.lastActionAt || '',
        lastRejectAt: actionType === 'reject'
          ? now
          : existingRecord?.lastRejectAt || '',
        actionCount: hasAction
          ? (existingRecord?.actionCount || 0) + 1
          : existingRecord?.actionCount || 0,
      }
      const nextProtectedDomains = [
        nextRecord,
        ...records.filter((record) =>
          record.domain !== currentDomain
        ),
      ].slice(0, 100)

      safeStorageSet({
        [PROTECTED_DOMAINS_KEY]: nextProtectedDomains,
      })

      setStatValue(
        'protectedSites',
        new Set(
          nextProtectedDomains
            .map(getProtectedDomainRecordDomain)
            .filter(Boolean)
        ).size
      )
    }
  )
}

function getText(element) {
  if (!element) return ''

  return String(
    element.innerText ||
    element.textContent ||
    ''
  ).toLowerCase().trim()
}

function getDatasetText(element) {
  return Object.values(element?.dataset || {})
    .filter(Boolean)
    .join(' ')
}

function getElementActionText(element) {
  if (!element) return ''

  return normalizeMatchText([
    element.innerText,
    element.textContent,
    element.getAttribute?.('aria-label'),
    element.getAttribute?.('aria-controls'),
    element.getAttribute?.('aria-expanded'),
    element.getAttribute?.('role'),
    element.getAttribute?.('title'),
    element.value,
    element.getAttribute?.('value'),
    element.id,
    getClassNameText(element),
    element.getAttribute?.('data-action'),
    element.getAttribute?.('data-testid'),
    getDatasetText(element),
  ]
    .filter(Boolean)
    .join(' ')
  )
}

function getActionText(element) {
  return getElementActionText(element)
}

function isVisible(element) {
  if (!isGeometryElement(element)) return false

  const rect = getSafeClientRect(element)
  if (!rect) return false

  const style = safeGetComputedStyle(element)
  if (!style) return false

  return (
    ((element.offsetWidth || 0) > 0 ||
      (element.offsetHeight || 0) > 0 ||
      rect.width > 0 ||
      rect.height > 0) &&
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    Number(style.opacity) !== 0
  )
}

function isElementLike(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      value.nodeType === 1 &&
      typeof value.getBoundingClientRect === 'function'
  )
}

function isGeometryElement(value) {
  return isElementLike(value)
}

function safeGetRect(element) {
  if (!isElementLike(element)) return null

  try {
    return element.getBoundingClientRect()
  } catch {
    return null
  }
}

function getSafeClientRect(element) {
  return safeGetRect(element)
}

function safeGetComputedStyle(element) {
  if (!isElementLike(element)) return null

  try {
    const view =
      element.ownerDocument?.defaultView || window

    return view.getComputedStyle(element)
  } catch {
    return null
  }
}

function safeMatches(element, selector) {
  if (!isElementLike(element) || typeof element.matches !== 'function') {
    return false
  }

  try {
    return element.matches(selector)
  } catch {
    return false
  }
}

function safeClosest(element, selector) {
  if (!isElementLike(element) || typeof element.closest !== 'function') {
    return null
  }

  try {
    return element.closest(selector)
  } catch {
    return null
  }
}

function safeQuerySelectorAll(root, selector) {
  if (!root || typeof root.querySelectorAll !== 'function') {
    return []
  }

  try {
    return Array.from(root.querySelectorAll(selector))
  } catch {
    return []
  }
}

function normalizeMatchText(value) {
  return String(value || '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenizeMatchText(value) {
  return normalizeMatchText(value)
    .split(' ')
    .filter(Boolean)
}

function textHasPhrase(text, phrase) {
  const normalizedText =
    normalizeMatchText(text)

  const normalizedPhrase =
    normalizeMatchText(phrase)

  if (!normalizedText || !normalizedPhrase) {
    return false
  }

  return new RegExp(
    `(^|\\s)${escapeRegExp(normalizedPhrase)}(?=\\s|$)`
  ).test(normalizedText)
}

function escapeRegExp(value) {
  return String(value)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function textHasAny(text, values) {
  if (!Array.isArray(values)) return false

  const normalizedText =
    normalizeMatchText(text)

  return values.some((value) =>
    textHasPhrase(normalizedText, value)
  )
}

function textMatchesDictionaryCookieIntent(text, intentName) {
  const matcher =
    globalThis?.AddislineCookieIntentDictionary?.textMatchesCookieIntent

  if (typeof matcher !== 'function') {
    return false
  }

  try {
    return matcher(text, intentName) === true
  } catch {
    return false
  }
}

function scheduleAutomationTimeout(callback, delay) {
  if (!ENABLE_ALL_AUTOMATION) {
    return null
  }

  const timerId = setTimeout(() => {
    pendingAutomationTimers.delete(timerId)

    if (!shouldRunOnThisSite()) {
      return
    }

    callback()
  }, delay)

  pendingAutomationTimers.add(timerId)
  return timerId
}

function runWhenIdle(callback, timeout = 1200) {
  if (!ENABLE_ALL_AUTOMATION) {
    return null
  }

  if (typeof requestIdleCallback === 'function') {
    const idleId = requestIdleCallback(() => {
      pendingIdleCallbacks.delete(idleId)

      if (!shouldRunOnThisSite()) {
        return
      }

      callback()
    }, { timeout })

    pendingIdleCallbacks.add(idleId)
    return idleId
  }

  return scheduleAutomationTimeout(callback, Math.min(timeout, 250))
}

function querySelectorAllDeep(selector, root = document) {
  const results = []
  const visitedRoots = new WeakSet()

  function collect(currentRoot) {
    if (!currentRoot || visitedRoots.has(currentRoot)) {
      return
    }

    if (!canUseTraversalBudget('querySelectorAllDeep')) {
      return
    }

    visitedRoots.add(currentRoot)

    const selectedElements =
      safeQuerySelectorAll(currentRoot, selector)

    results.push(...selectedElements)
    if (results.length >= MAX_DOM_QUERY_RESULTS) {
      results.length = MAX_DOM_QUERY_RESULTS
      return
    }

    if (!ENABLE_SHADOW_ROOT_OBSERVATION) {
      return
    }

    safeQuerySelectorAll(currentRoot, '*').forEach((element) => {
      if (results.length >= MAX_DOM_QUERY_RESULTS) {
        return
      }
      if (element.shadowRoot) {
        collect(element.shadowRoot)
      }
    })
  }

  collect(root)

  return Array.from(new Set(results))
}

function looksLikeCookieBanner(element) {
  const text = [
    getText(element),
    getElementActionText(element),
  ].join(' ')

  if (!text || text.length < 20) return false
  if (text.length > 2500) return false

  return bannerKeywords.some((keyword) => text.includes(keyword))
}

function hasCookieBannerSignal(element) {
  const signal = [
    getText(element),
    getElementActionText(element),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return textHasAny(signal, bannerKeywords)
}

function hasStrongCookieSignal(element) {
  const signal = [
    getText(element),
    getElementActionText(element),
    element?.id,
    getClassNameText(element),
    element?.getAttribute?.('aria-label'),
    element?.getAttribute?.('data-testid'),
    getDatasetText(element),
  ]
    .filter(Boolean)
    .join(' ')

  return (
    textHasAny(signal, [
      'cookie',
      'cookies',
      'consent',
      'gdpr',
      'rgpd',
      'cmp',
    ]) ||
    hasKnownCmpSignal(element)
  )
}

function isLikelyNonCookieModal(element) {
  if (!isElementLike(element)) return false

  const signal = [
    getText(element).slice(0, 1200),
    getElementActionText(element).slice(0, 800),
    element.id,
    getClassNameText(element),
    element.getAttribute?.('aria-label'),
  ]
    .filter(Boolean)
    .join(' ')

  return (
    textHasAny(signal, nonCookieModalTexts) &&
    !hasStrongCookieSignal(element)
  )
}

function isInsideNonCookieModal(element) {
  const modal =
    safeClosest(
      element,
      [
        'dialog',
        '[role="dialog"]',
        '[aria-modal="true"]',
        '[class*="modal" i]',
        '[class*="popup" i]',
        '[class*="overlay" i]',
      ].join(',')
    )

  return Boolean(modal && isLikelyNonCookieModal(modal))
}

function isTextFragmentOrControl(element) {
  return safeMatches(
    element,
    [
      'button',
      'a',
      'span',
      'strong',
      'p',
      'em',
      'b',
      'i',
      'small',
      'label',
      'input',
      'textarea',
      'select',
      '[role="button"]',
    ].join(',')
  )
}

function hasCookieAttributeSignal(element) {
  const signal = [
    element.id,
    getClassNameText(element),
    element.getAttribute?.('aria-label'),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return textHasAny(signal, bannerKeywords)
}

function hasKnownCmpSignal(element) {
  const signal = [
    element?.id,
    getClassNameText(element),
    element?.getAttribute?.('aria-label'),
    element?.getAttribute?.('data-testid'),
    getDatasetText(element),
    getText(element).slice(0, 900),
  ]
    .filter(Boolean)
    .join(' ')

  return textHasAny(signal, knownCmpKeywords)
}

function isExcludedCMPRootContext(element) {
  const excludedRoot =
    safeClosest(
      element,
      [
        'footer',
        'header',
        'nav',
        'menu',
        '[role="navigation"]',
        '[role="menu"]',
        '[class*="footer" i]',
        '[class*="header" i]',
        '[class*="nav" i]',
        '[class*="menu" i]',
      ].join(',')
    )

  return Boolean(excludedRoot)
}

function hasCMPRootEvidence(element) {
  return (
    hasCookieBannerSignal(element) ||
    hasKnownCmpSignal(element)
  )
}

function hasCMPActionSignal(element) {
  const signal =
    normalizeMatchText([
      getText(element).slice(0, 1200),
      getElementActionText(element).slice(0, 800),
      element?.id,
      getClassNameText(element),
      element?.getAttribute?.('aria-label'),
      getDatasetText(element),
    ].join(' '))

  return (
    textMatchesDictionaryCookieIntent(signal, 'rejectAll') ||
    textMatchesDictionaryCookieIntent(signal, 'openSettings') ||
    textHasAny(signal, [
      'reject',
      'rechazar',
      'rechazar todo',
      'rechazar todas',
      'no acepto',
      'consent',
      'cookies',
      'cookie',
      'privacy',
      'privacidad',
      'gestionar cookies',
      'cookie settings',
      'privacy settings',
    ])
  )
}

function hasExplicitRejectControl(root) {
  return safeQuerySelectorAll(
    root,
    [
      'button',
      'a',
      '[role="button"]',
      'input[type="button"]',
      'input[type="submit"]',
    ].join(',')
  )
    .slice(0, 20)
    .some((control) => {
      if (
        !isVisible(control) ||
        getCookieDebugDisabledState(control) === 'disabled' ||
        hasUnsafeAcceptText(control)
      ) {
        return false
      }

      const text =
        getActionText(control)

      return (
        textMatchesDictionaryCookieIntent(text, 'rejectAll') ||
        textHasAny(text, explicitRejectControlTexts) ||
        textHasAny(text, totalRejectTexts) ||
        isNoAceptoControl(control)
      )
    })
}

function hasVisibleConsentOrRejectControl(root) {
  return safeQuerySelectorAll(
    root,
    [
      'button',
      'a',
      '[role="button"]',
      'input[type="button"]',
      'input[type="submit"]',
    ].join(',')
  )
    .slice(0, 16)
    .some((control) => {
      if (
        !isVisible(control) ||
        getCookieDebugDisabledState(control) === 'disabled' ||
        hasUnsafeAcceptText(control)
      ) {
        return false
      }

      const text =
        getActionText(control)

      return (
        textMatchesDictionaryCookieIntent(text, 'rejectAll') ||
        textMatchesDictionaryCookieIntent(text, 'openSettings') ||
        textHasAny(text, [
          'reject',
          'rechazar',
          'no acepto',
          'decline',
          'consent',
          'cookies',
          'cookie settings',
          'gestionar cookies',
        ])
      )
    })
}

function hasNewsletterSignals(element) {
  const signal =
    normalizeMatchText([
      getText(element).slice(0, 1200),
      getElementActionText(element).slice(0, 800),
      element?.id,
      getClassNameText(element),
      element?.getAttribute?.('aria-label'),
      getDatasetText(element),
    ].join(' '))
  const hasEmailField =
    safeQuerySelectorAll(
      element,
      [
        'input[type="email"]',
        'input[name*="email" i]',
        'input[id*="email" i]',
        'input[placeholder*="email" i]',
        'input[autocomplete="email" i]',
      ].join(',')
    ).length > 0

  return (
    hasEmailField ||
    textHasAny(signal, marketingPopupTexts)
  )
}

function isMarketingPopupWithoutCMPActions(element) {
  return (
    hasNewsletterSignals(element) &&
    !hasExplicitRejectControl(element) &&
    !hasVisibleConsentOrRejectControl(element)
  )
}

function isReliableCMPRoot(element) {
  const modalSignals =
    getCMPModalSignalSummary(element)

  return Boolean(
    isElementLike(element) &&
      isVisible(element) &&
      !isTextFragmentOrControl(element) &&
      element !== document.body &&
      element !== document.documentElement &&
      !isExcludedCMPRootContext(element) &&
      !isLikelyNonCookieModal(element) &&
      !isMarketingPopupWithoutCMPActions(element) &&
      (
        hasCMPRootEvidence(element) ||
        modalSignals.cmpModalSignalsDetected
      ) &&
      hasVisibleClickableControl(element)
  )
}

function isPotentialCookieContainer(element) {
  if (
    !isElementLike(element) ||
    !isVisible(element) ||
    isTextFragmentOrControl(element) ||
    element === document.body ||
    element === document.documentElement ||
    isExcludedCMPRootContext(element) ||
    isLikelyNonCookieModal(element) ||
    isMarketingPopupWithoutCMPActions(element) ||
    safeMatches(element, 'form, nav, header, main, article')
  ) {
    return false
  }

  const textLength = getText(element).length

  if (textLength < 20 || textLength > 3500) {
    return false
  }

  const modalSignals =
    getCMPModalSignalSummary(element)

  return (
    (
      hasCMPRootEvidence(element) ||
      modalSignals.explicitRejectControlDetected ||
      modalSignals.cmpModalSignalsDetected
    ) &&
    hasVisibleClickableControl(element)
  )
}

function getCookieContainer(element) {
  let current = element
  let bestMatch = null
  let depth = 0

  while (
    current &&
    current !== document.body &&
    current !== document.documentElement &&
    depth < 8
  ) {
    if (isPotentialCookieContainer(current)) {
      bestMatch = current
    }

    current = current.parentElement
    depth += 1
  }

  return bestMatch
}

function getCookieContainerWithCache(element, potentialCache) {
  let current = element
  let bestMatch = null
  let depth = 0

  while (
    current &&
    current !== document.body &&
    current !== document.documentElement &&
    depth < 8
  ) {
    let isPotential =
      potentialCache.get(current)

    if (typeof isPotential !== 'boolean') {
      isPotential =
        isPotentialCookieContainer(current)
      potentialCache.set(current, isPotential)
    }

    if (isPotential) {
      bestMatch = current
    }

    current = current.parentElement
    depth += 1
  }

  return bestMatch
}

function hasVisibleClickableControl(root) {
  return safeQuerySelectorAll(
    root,
    [
      'button',
      'a',
      '[role="button"]',
      'input[type="button"]',
      'input[type="submit"]',
    ].join(',')
  )
    .slice(0, 12)
    .some((control) =>
      isVisible(control) &&
      getCookieDebugDisabledState(control) !== 'disabled'
    )
}

function getVisibleClickableControlCount(root) {
  return safeQuerySelectorAll(
    root,
    [
      'button',
      'a',
      '[role="button"]',
      'input[type="button"]',
      'input[type="submit"]',
    ].join(',')
  )
    .slice(0, 20)
    .filter((control) =>
      isVisible(control) &&
      getCookieDebugDisabledState(control) !== 'disabled'
    ).length
}

function hasVisibleCMPActionControl(root) {
  return safeQuerySelectorAll(
    root,
    [
      'button',
      'a',
      '[role="button"]',
      'input[type="button"]',
      'input[type="submit"]',
    ].join(',')
  )
    .slice(0, 16)
    .some((control) => {
      if (
        !isVisible(control) ||
        getCookieDebugDisabledState(control) === 'disabled' ||
        hasUnsafeAcceptText(control)
      ) {
        return false
      }

      const text =
        getActionText(control)

      return (
        textMatchesDictionaryCookieIntent(text, 'rejectAll') ||
        textMatchesDictionaryCookieIntent(text, 'openSettings') ||
        textHasAny(text, [
          'reject',
          'rechazar',
          'no acepto',
          'decline',
          'cookies',
          'privacy',
          'privacidad',
          'gestionar cookies',
          'cookie settings',
          'privacy settings',
        ])
      )
    })
}

function getPrioritizedRootTextSnippet(root) {
  return normalizeMatchText(
    [
      getText(root).slice(0, 180),
      getElementActionText(root).slice(0, 120),
    ].join(' ')
  ).slice(0, 120)
}

function isCenteredModalLikeRoot(element, rect) {
  const viewportWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    1
  const viewportHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    1
  const centerX =
    rect.left + rect.width / 2
  const centerY =
    rect.top + rect.height / 2

  return (
    rect.width >= Math.min(260, viewportWidth * 0.8) &&
    rect.height >= 120 &&
    Math.abs(centerX - viewportWidth / 2) <= viewportWidth * 0.35 &&
    Math.abs(centerY - viewportHeight / 2) <= viewportHeight * 0.4
  )
}

function getCMPModalSignalSummary(element) {
  const rect =
    getSafeClientRect(element)
  const style =
    safeGetComputedStyle(element)

  if (!rect || !style) {
    return {
      cmpModalSignalsDetected: false,
      modalGeometryMatched: false,
      explicitRejectControlDetected: false,
      newsletterSignalsDetected: false,
    }
  }

  const viewportWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    1
  const viewportHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    1
  const viewportArea =
    viewportWidth * viewportHeight
  const zIndex =
    Number.parseInt(style.zIndex, 10)
  const dialogLike =
    safeMatches(element, 'dialog, [role="dialog"], [aria-modal="true"]')
  const overlayPosition =
    style.position === 'fixed' ||
    style.position === 'sticky' ||
    (
      style.position === 'absolute' &&
      Number.isFinite(zIndex) &&
      zIndex >= 10
    )
  const highZIndex =
    Number.isFinite(zIndex) &&
    zIndex >= 10
  const centered =
    isCenteredModalLikeRoot(element, rect)
  const largeVisible =
    rect.width >= Math.min(320, viewportWidth * 0.7) &&
    rect.height >= 120 &&
    (rect.width * rect.height) >= viewportArea * 0.06
  const modalGeometryMatched =
    dialogLike ||
    overlayPosition ||
    highZIndex ||
    centered ||
    largeVisible
  const cmpTextSignal =
    hasCMPRootEvidence(element) ||
    hasCMPActionSignal(element)
  const explicitRejectControlDetected =
    hasExplicitRejectControl(element)
  const newsletterSignalsDetected =
    hasNewsletterSignals(element)
  const actionControlSignal =
    hasVisibleCMPActionControl(element) ||
    explicitRejectControlDetected
  const cmpModalSignalsDetected =
    modalGeometryMatched &&
    (cmpTextSignal || explicitRejectControlDetected) &&
    actionControlSignal

  return {
    cmpModalSignalsDetected,
    modalGeometryMatched,
    explicitRejectControlDetected,
    newsletterSignalsDetected,
  }
}

function isLikelyVisibleCMPModalRoot(element) {
  if (
    !isElementLike(element) ||
    !isVisible(element) ||
    element === document.body ||
    element === document.documentElement ||
    isExcludedCMPRootContext(element) ||
    safeMatches(element, 'form, nav, header, main, article') ||
    isMarketingPopupWithoutCMPActions(element) ||
    isLikelyNonCookieModal(element)
  ) {
    return false
  }

  const rect =
    getSafeClientRect(element)

  if (!rect || rect.width < 220 || rect.height < 80) {
    return false
  }

  const style =
    safeGetComputedStyle(element)
  if (!style) return false

  const zIndex =
    Number.parseInt(style.zIndex, 10)
  const modalSignals =
    getCMPModalSignalSummary(element)
  const modalLike =
    safeMatches(element, 'dialog, [role="dialog"], [aria-modal="true"]') ||
    style.position === 'fixed' ||
    style.position === 'sticky' ||
    (
      Number.isFinite(zIndex) &&
      zIndex >= 10
    ) ||
    isCenteredModalLikeRoot(element, rect)

  if (
    (!modalLike && !modalSignals.modalGeometryMatched) ||
    !hasVisibleClickableControl(element)
  ) {
    return false
  }

  const signal =
    [
      getText(element).slice(0, 1200),
      getElementActionText(element).slice(0, 600),
      element.id,
      getClassNameText(element),
      element.getAttribute?.('aria-label'),
      getDatasetText(element),
    ]
      .filter(Boolean)
      .join(' ')

  return (
    textHasAny(signal, bannerKeywords) ||
    hasKnownCmpSignal(element) ||
    modalSignals.cmpModalSignalsDetected
  )
}

function findLikelyCMPModalRootFromControl(control) {
  if (
    !isElementLike(control) ||
    !isVisible(control) ||
    hasUnsafeAcceptText(control)
  ) {
    return null
  }

  const actionText =
    getActionText(control)

  if (
    !textMatchesDictionaryCookieIntent(actionText, 'rejectAll') &&
    !textMatchesDictionaryCookieIntent(actionText, 'openSettings') &&
    !textHasAny(actionText, ['reject', 'rechazar', 'no acepto', 'cookies', 'privacy'])
  ) {
    return null
  }

  let current =
    control.parentElement
  let depth = 0
  let bestRoot = null

  while (
    current &&
    current !== document.body &&
    current !== document.documentElement &&
    depth < 8
  ) {
    if (
      isLikelyVisibleCMPModalRoot(current) ||
      (
        !isExcludedCMPRootContext(current) &&
        !isMarketingPopupWithoutCMPActions(current) &&
        !isLikelyNonCookieModal(current) &&
        getCMPModalSignalSummary(current).cmpModalSignalsDetected
      )
    ) {
      bestRoot = current
    }

    current = current.parentElement
    depth += 1
  }

  return bestRoot
}

function textMatchesCMPRootDerivationControl(text) {
  const normalizedText =
    normalizeMatchText(text)

  return (
    textHasAny(normalizedText, cmpRootDerivationControlTexts) ||
    textMatchesDictionaryCookieIntent(normalizedText, 'rejectAll') ||
    textMatchesLightweightSettingsOpen(normalizedText)
  )
}

function textMatchesCMPReachabilityProbe(text) {
  return textHasAny(
    normalizeMatchText(text),
    cmpReachabilityProbeTexts
  )
}

function isReachabilityProbeControlVisible(control) {
  if (!isElementLike(control)) return false

  const rect =
    getSafeClientRect(control)

  if (!rect || rect.width <= 0 || rect.height <= 0) {
    return false
  }

  try {
    const view =
      control.ownerDocument?.defaultView || window
    const style =
      view.getComputedStyle(control)

    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      Number(style.opacity) !== 0
    )
  } catch {
    return isVisible(control)
  }
}

function getCMPReachabilityProbeControls(root) {
  return safeQuerySelectorAll(
    root,
    [
      'button',
      'a',
      '[role="button"]',
      'input[type="button"]',
      'input[type="submit"]',
    ].join(',')
  )
    .slice(0, MAX_PRIORITIZED_CMP_ROOT_SCAN)
    .filter((control) =>
      isReachabilityProbeControlVisible(control) &&
      textMatchesCMPReachabilityProbe(getActionText(control))
    )
}

function getCMPReachabilityProbeText(control) {
  return normalizeMatchText(getActionText(control)).slice(0, 80)
}

function getIframeInspectionSummary(iframeDocument) {
  const controls =
    safeQuerySelectorAll(
      iframeDocument,
      getPriorityControlSelectors()
    )
      .slice(0, 40)
  const controlTexts =
    controls
      .map((control) =>
        normalizeMatchText(getActionText(control)).slice(0, 80)
      )
      .filter(Boolean)
      .slice(0, 10)

  return {
    iframeUrl: String(iframeDocument.location?.href || '').slice(0, 180),
    iframeOrigin: String(iframeDocument.location?.origin || '').slice(0, 120),
    iframeReadyState: String(iframeDocument.readyState || ''),
    iframeBodyExists: Boolean(iframeDocument.body),
    iframeBodyTextPreview:
      normalizeMatchText(iframeDocument.body?.innerText || '')
        .slice(0, 300),
    iframeControlCount: controls.length,
    iframeControlTexts: controlTexts,
  }
}

function updateCMPReachabilityProbeDiagnostics() {
  const mainControls =
    getCMPReachabilityProbeControls(document)

  let shadowControlCount = 0
  safeQuerySelectorAll(document, '*')
    .slice(0, MAX_PRIORITIZED_CMP_ROOT_SCAN)
    .forEach((element) => {
      const shadowRoot =
        element?.shadowRoot

      if (!shadowRoot) return

      shadowControlCount +=
        getCMPReachabilityProbeControls(shadowRoot).length
    })

  let accessibleIframeCount = 0
  let inaccessibleIframeCount = 0
  const iframeProbeMatchedControls = []
  const iframeInspectionSummaries = []

  safeQuerySelectorAll(document, 'iframe')
    .filter(isVisibleMeaningfulIframe)
    .slice(0, MAX_SAME_ORIGIN_CMP_IFRAMES)
    .forEach((iframe) => {
      try {
        const iframeDocument =
          getAccessibleIframeDocument(iframe)

        if (!iframeDocument?.documentElement) {
          inaccessibleIframeCount += 1
          return
        }

        accessibleIframeCount += 1
        iframeInspectionSummaries.push(
          getIframeInspectionSummary(iframeDocument)
        )

        getCMPReachabilityProbeControls(iframeDocument)
          .slice(0, 3)
          .forEach((control) => {
            iframeProbeMatchedControls.push(
              getCMPReachabilityProbeText(control)
            )
          })
      } catch {
        inaccessibleIframeCount += 1
      }
    })

  lastMainDocumentControlProbeCount =
    mainControls.length
  lastShadowControlProbeCount =
    shadowControlCount
  lastAccessibleIframeCount =
    accessibleIframeCount
  lastInaccessibleIframeCount =
    inaccessibleIframeCount
  lastIframeProbeMatchedControls =
    iframeProbeMatchedControls.slice(0, 5)
  lastIframeInspectionSummaries =
    iframeInspectionSummaries
}

function getVisibleCMPControlCount(root) {
  return safeQuerySelectorAll(
    root,
    [
      'button',
      'a',
      '[role="button"]',
      'input[type="button"]',
      'input[type="submit"]',
    ].join(',')
  )
    .slice(0, 12)
    .filter((control) =>
      isVisible(control) &&
      textMatchesCMPRootDerivationControl(getActionText(control))
    ).length
}

function hasDerivedCMPRootTextEvidence(root) {
  const text =
    normalizeMatchText([
      getText(root).slice(0, 1000),
      getElementActionText(root).slice(0, 600),
      root?.id,
      getClassNameText(root),
      root?.getAttribute?.('aria-label'),
      getDatasetText(root),
    ].join(' '))

  return (
    hasCMPRootEvidence(root) ||
    textHasAny(text, [
      'cookie',
      'cookies',
      'privacy',
      'privacidad',
      'consent',
      'consentimiento',
    ])
  )
}

function isDerivedCMPRootCandidate(root) {
  if (
    !isElementLike(root) ||
    !isVisible(root) ||
    root === document.body ||
    root === document.documentElement ||
    isTextFragmentOrControl(root) ||
    isExcludedCMPRootContext(root) ||
    isLikelyNonCookieModal(root) ||
    isMarketingPopupWithoutCMPActions(root)
  ) {
    return false
  }

  const rect =
    getSafeClientRect(root)

  if (!rect || rect.width < 220 || rect.height < 70) {
    return false
  }

  const visibleControlCount =
    getVisibleClickableControlCount(root)
  const cmpControlCount =
    getVisibleCMPControlCount(root)
  const modalSignals =
    getCMPModalSignalSummary(root)
  const modalLikeSize =
    modalSignals.modalGeometryMatched ||
    (
      rect.width >= 260 &&
      rect.height >= 90
    )

  return (
    modalLikeSize &&
    visibleControlCount >= 2 &&
    (
      hasDerivedCMPRootTextEvidence(root) ||
      cmpControlCount >= 2 ||
      modalSignals.explicitRejectControlDetected
    )
  )
}

function deriveCMPRootFromVisibleControl(control) {
  if (
    !isElementLike(control) ||
    !isVisible(control)
  ) {
    return null
  }

  const controlText =
    getActionText(control)

  if (!textMatchesCMPRootDerivationControl(controlText)) {
    return null
  }

  let current =
    control.parentElement
  let depth = 0
  let bestRoot = null

  while (
    current &&
    current !== document.body &&
    current !== document.documentElement &&
    depth < 5
  ) {
    if (isDerivedCMPRootCandidate(current)) {
      bestRoot = current
    }

    current = current.parentElement
    depth += 1
  }

  return bestRoot
}

function findButtonDerivedCMPRoots(root = document) {
  return safeQuerySelectorAll(
    root,
    [
      'button',
      'a',
      '[role="button"]',
      'input[type="button"]',
      'input[type="submit"]',
    ].join(',')
  )
    .slice(0, MAX_PRIORITIZED_CMP_ROOT_SCAN)
    .filter((control) =>
      isVisible(control) &&
      textMatchesCMPRootDerivationControl(getActionText(control))
    )
    .map((control) => ({
      control,
      root: deriveCMPRootFromVisibleControl(control),
    }))
}

function getAccessibleIframeDocument(iframe) {
  try {
    const iframeDocument =
      iframe.contentDocument ||
      iframe.contentWindow?.document

    if (!iframeDocument?.documentElement) {
      return null
    }

    return iframeDocument
  } catch {
    return null
  }
}

function isVisibleMeaningfulIframe(iframe) {
  if (!isVisible(iframe)) return false

  const rect =
    getSafeClientRect(iframe)

  return Boolean(
    rect &&
      rect.width >= 220 &&
      rect.height >= 100
  )
}

function getFrameDomain(frameDocument) {
  try {
    return new URL(frameDocument.location.href).hostname
  } catch {
    return ''
  }
}

function getPriorityRootSelectors() {
  return [
    'dialog',
    '[role="dialog"]',
    '[aria-modal="true"]',
    '[class*="modal" i]',
    '[class*="overlay" i]',
    '[class*="popup" i]',
    '[style*="z-index" i]',
    'body > div',
  ].join(',')
}

function getPriorityControlSelectors() {
  return [
    'button',
    'a',
    '[role="button"]',
    'input[type="button"]',
    'input[type="submit"]',
  ].join(',')
}

function findPriorityCMPRootsInDocument(rootDocument) {
  const directRoots =
    safeQuerySelectorAll(rootDocument, getPriorityRootSelectors())
      .slice(0, MAX_PRIORITIZED_CMP_ROOT_SCAN)
      .filter(isLikelyVisibleCMPModalRoot)

  const controlRoots =
    safeQuerySelectorAll(rootDocument, getPriorityControlSelectors())
      .slice(0, MAX_PRIORITIZED_CMP_ROOT_SCAN)
      .map(findLikelyCMPModalRootFromControl)
      .filter(Boolean)
  const buttonDerivedRoots =
    findButtonDerivedCMPRoots(rootDocument)

  return uniqueElements([
    ...directRoots,
    ...controlRoots,
    ...buttonDerivedRoots
      .map((result) => result.root)
      .filter(Boolean),
  ])
    .sort((first, second) =>
      getPrioritizedCMPRootScore(second) -
      getPrioritizedCMPRootScore(first)
    )
    .slice(0, MAX_PRIORITIZED_CMP_ROOTS)
}

function findSameOriginIframeCMPRoots() {
  const iframeRoots = []

  lastIframeCmpDetected = false
  lastIframeRejectDetected = false
  lastIframeDomain = ''

  safeQuerySelectorAll(document, 'iframe')
    .filter(isVisibleMeaningfulIframe)
    .slice(0, MAX_SAME_ORIGIN_CMP_IFRAMES)
    .forEach((iframe) => {
      const iframeDocument =
        getAccessibleIframeDocument(iframe)

      if (!iframeDocument) return

      const roots =
        findPriorityCMPRootsInDocument(iframeDocument)

      if (roots.length === 0) return

      if (!lastIframeDomain) {
        lastIframeDomain = getFrameDomain(iframeDocument)
      }

      lastIframeCmpDetected = true
      if (
        roots.some((root) =>
          getCMPModalSignalSummary(root).explicitRejectControlDetected ||
          hasExplicitRejectControl(root)
        )
      ) {
        lastIframeRejectDetected = true
      }

      iframeRoots.push(...roots)
    })

  return uniqueElements(iframeRoots)
    .slice(0, MAX_PRIORITIZED_CMP_ROOTS)
}

function getPrioritizedCMPRootScore(root) {
  const summary =
    getCMPModalSignalSummary(root)
  const rect =
    getSafeClientRect(root)
  const viewportHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    1
  const text =
    normalizeMatchText([
      getText(root).slice(0, 1000),
      getElementActionText(root).slice(0, 600),
    ].join(' '))
  let score = 0

  if (summary.explicitRejectControlDetected) score += 1000
  if (summary.cmpModalSignalsDetected) score += 350
  if (summary.modalGeometryMatched) score += 120
  if (hasCMPRootEvidence(root)) score += 220
  if (hasKnownCmpSignal(root)) score += 260
  if (hasVisibleCMPActionControl(root)) score += 180

  if (
    rect &&
    rect.top >= viewportHeight * 0.45 &&
    textHasAny(text, ['cookie', 'cookies', 'privacy', 'privacidad']) &&
    summary.explicitRejectControlDetected
  ) {
    score += 300
  }

  if (summary.newsletterSignalsDetected) {
    score -= summary.explicitRejectControlDetected ? 120 : 550
  }

  return score
}

function findPrioritizedVisibleCMPRoots() {
  updateCMPReachabilityProbeDiagnostics()

  const roots =
    uniqueElements([
      ...findPriorityCMPRootsInDocument(document),
      ...findSameOriginIframeCMPRoots(),
    ])
    .sort((first, second) =>
      getPrioritizedCMPRootScore(second) -
      getPrioritizedCMPRootScore(first)
    )
    .slice(0, MAX_PRIORITIZED_CMP_ROOTS)

  lastCmpModalSignalsDetected =
    roots.some((root) =>
      getCMPModalSignalSummary(root).cmpModalSignalsDetected
    )
  lastModalGeometryMatched =
    roots.some((root) =>
      getCMPModalSignalSummary(root).modalGeometryMatched
    )
  lastExplicitRejectControlDetected =
    roots.some((root) =>
      getCMPModalSignalSummary(root).explicitRejectControlDetected
    )
  lastNewsletterSignalsDetected =
    roots.some((root) =>
      getCMPModalSignalSummary(root).newsletterSignalsDetected
    )
  const derivedMatch =
    findButtonDerivedCMPRoots().find((result) =>
      roots.includes(result.root)
    )
  lastDerivedCmpRootFromControl =
    Boolean(derivedMatch)
  lastDerivedControlText =
    derivedMatch
      ? getActionText(derivedMatch.control)
        .slice(0, 120)
      : ''

  return roots
}

function findCookieBannerCandidates(decisionTrace = null) {
  const startedAt = Date.now()

  if (
    activeCookieContainer &&
    isVisible(activeCookieContainer) &&
    isPotentialCookieContainer(activeCookieContainer)
  ) {
    addDiagnosticDecisionStep(decisionTrace, {
      strategy: 'cmp.active_container',
      status: 'found',
      found: 1,
      scanned: 1,
      elapsedMs: Date.now() - startedAt,
    })
    if (isAddislineTestMode()) {
      updateAddislineTestReport({
        event: 'findCookieBannerCandidates:active',
        bannerCandidateCount: 1,
        chosenCandidateSummary: getElementTestSummary(activeCookieContainer),
      })
    }
    lastPrioritizedCmpRootsFound = 0
    lastPrioritizedRootTexts = []
    lastPrioritizedRootControlCount = 0
    lastCmpModalSignalsDetected = false
    lastModalGeometryMatched = false
    lastExplicitRejectControlDetected = false
    lastNewsletterSignalsDetected = false
    lastDerivedCmpRootFromControl = false
    lastDerivedControlText = ''
    lastMainDocumentControlProbeCount = 0
    lastShadowControlProbeCount = 0
    lastAccessibleIframeCount = 0
    lastInaccessibleIframeCount = 0
    lastIframeProbeMatchedControls = []
    lastIframeCmpDetected = false
    lastIframeRejectDetected = false
    lastIframeDomain = ''
    lastIframeInspectionSummaries = []
    return [activeCookieContainer]
  }

  addDiagnosticDecisionStep(decisionTrace, {
    strategy: 'cmp.active_container',
    status: 'skipped',
    reason: activeCookieContainer
      ? 'cached_container_not_visible_or_invalid'
      : 'no_cached_container',
    scanned: activeCookieContainer ? 1 : 0,
    elapsedMs: Date.now() - startedAt,
  })

  const prioritizedStartedAt = Date.now()
  const prioritizedRoots =
    findPrioritizedVisibleCMPRoots()
  const prioritizedRootSet =
    new Set(prioritizedRoots)

  lastPrioritizedCmpRootsFound =
    prioritizedRoots.length
  lastPrioritizedRootTexts =
    prioritizedRoots
      .map(getPrioritizedRootTextSnippet)
      .filter(Boolean)
      .slice(0, 3)
  lastPrioritizedRootControlCount =
    prioritizedRoots.reduce(
      (count, root) =>
        count + getVisibleClickableControlCount(root),
      0
    )
  addDiagnosticDecisionStep(decisionTrace, {
    strategy: 'cmp.prioritized_visible_roots',
    status: prioritizedRoots.length > 0 ? 'found' : 'not_found',
    found: prioritizedRoots.length,
    scanned: MAX_PRIORITIZED_CMP_ROOT_SCAN,
    elapsedMs: Date.now() - prioritizedStartedAt,
  })

  const selectorStartedAt = Date.now()
  const selectorMatches = [
    ...prioritizedRoots,
    ...Array.from(
      querySelectorAllDeep(
        [
          '[id*="cookie" i]',
          '[class*="cookie" i]',
          '[id*="consent" i]',
          '[class*="consent" i]',
          '[id*="privacy" i]',
          '[class*="privacy" i]',
          '[id*="onetrust" i]',
          '[class*="onetrust" i]',
          '[id*="ot-sdk" i]',
          '[class*="ot-sdk" i]',
          '[id*="onetrust-pc" i]',
          '[id*="didomi" i]',
          '[class*="didomi" i]',
          '[id*="didomi-popup" i]',
          '[class*="didomi-popup" i]',
          '[id*="cookiebot" i]',
          '[class*="cookiebot" i]',
          '[id*="CybotCookiebotDialog" i]',
          '[id*="trustarc" i]',
          '[class*="trustarc" i]',
          '[id*="truste" i]',
          '[class*="truste" i]',
          '[id*="usercentrics" i]',
          '[class*="usercentrics" i]',
          '[id*="uc-center" i]',
          '[class*="uc-center" i]',
          '[id*="uc-privacy" i]',
          '[class*="uc-privacy" i]',
          '[id*="quantcast" i]',
          '[class*="quantcast" i]',
          '[id*="qc-cmp" i]',
          '[class*="qc-cmp" i]',
          '[aria-label*="cookie" i]',
          '[aria-label*="consent" i]',
          '[aria-label*="privacy" i]',
          '[data-action*="cookie" i]',
          '[data-action*="consent" i]',
          'dialog',
          '[role="dialog"]',
          '[aria-modal="true"]',
        ].join(',')
      )
    ),
  ]
  const containers = []
  const potentialCache = new WeakMap()
  let selectorEvaluatedCount = 0
  let selectorBudgetExceeded = false

  for (const candidate of selectorMatches) {
    if (
      selectorEvaluatedCount >= MAX_SELECTOR_CANDIDATE_EVALUATIONS ||
      Date.now() - selectorStartedAt >= SELECTOR_CANDIDATE_BUDGET_MS
    ) {
      selectorBudgetExceeded = true
      break
    }

    selectorEvaluatedCount += 1

    const container =
      getCookieContainerWithCache(candidate, potentialCache) ||
      (
        prioritizedRootSet.has(candidate) &&
        isLikelyVisibleCMPModalRoot(candidate)
          ? candidate
          : null
      )

    if (container) {
      containers.push(container)
    }
  }

  const uniqueContainers =
    Array.from(new Set(containers))
  const candidates =
    uniqueContainers.filter((candidate) =>
      !uniqueContainers.some((otherCandidate) => {
        if (
          otherCandidate === candidate ||
          !otherCandidate.contains(candidate)
        ) {
          return false
        }

        let otherIsPotential =
          potentialCache.get(otherCandidate)

        if (typeof otherIsPotential !== 'boolean') {
          otherIsPotential =
            isPotentialCookieContainer(otherCandidate)
          potentialCache.set(otherCandidate, otherIsPotential)
        }

        return otherIsPotential
      })
    )

  activeCookieContainer =
    candidates[0] || null
  addDiagnosticDecisionStep(decisionTrace, {
    strategy: 'cmp.selector_candidates',
    status: candidates.length > 0 ? 'found' : 'not_found',
    reason: selectorBudgetExceeded ? 'budget_capped' : '',
    found: candidates.length,
    scanned: selectorEvaluatedCount,
    elapsedMs: Date.now() - selectorStartedAt,
  })

  if (isAddislineTestMode()) {
    updateAddislineTestReport({
      event: 'findCookieBannerCandidates',
      bannerCandidateCount: candidates.length,
      prioritizedCmpRootsFound: lastPrioritizedCmpRootsFound,
      prioritizedRootTexts: lastPrioritizedRootTexts,
      prioritizedRootControlCount: lastPrioritizedRootControlCount,
      chosenCandidateSummary: getElementTestSummary(activeCookieContainer),
    })
  }

  return candidates.slice(0, MAX_COOKIE_CANDIDATES_PER_SCAN)
}

function getInitialCMPRootReason(element) {
  if (!element) return 'none'

  const signal =
    normalizeMatchText([
      element.id,
      getClassNameText(element),
      element.getAttribute?.('aria-label'),
      element.getAttribute?.('data-testid'),
      element.getAttribute?.('data-cmp'),
      element.getAttribute?.('data-consent'),
      getDatasetText(element),
    ].join(' '))

  if (textHasPhrase(signal, 'sp message container')) {
    return 'sourcepoint_message_container'
  }

  if (textHasPhrase(signal, 'sp message')) {
    return 'sourcepoint_message'
  }

  if (hasKnownCmpSignal(element)) {
    return 'known_cmp_signal'
  }

  if (hasCookieBannerSignal(element)) {
    return 'cookie_banner_signal'
  }

  if (safeMatches(element, 'dialog, [role="dialog"], [aria-modal="true"]')) {
    return 'visible_modal_or_dialog'
  }

  if (getCMPModalSignalSummary(element).cmpModalSignalsDetected) {
    return 'modal_geometry_cmp_signals'
  }

  return 'candidate'
}

function getInitialCMPRootDiagnostics(root, reason) {
  return {
    selectedRootTag: root?.tagName?.toLowerCase?.() || 'document',
    rootId: root?.id || '',
    rootClass: getClassNameText(root).slice(0, 160),
    rootReason: reason,
  }
}

function findInitialCMPRootFromControl(control) {
  let current =
    control?.parentElement || null
  let depth = 0

  while (
    current &&
    current !== document.body &&
    current !== document.documentElement &&
    depth < 10
  ) {
    if (
      isVisible(current) &&
      !isLikelyNonCookieModal(current) &&
      (
        isPotentialCookieContainer(current) ||
        hasKnownCmpSignal(current) ||
        hasCookieBannerSignal(current) ||
        textHasPhrase(
          [
            current.id,
            getClassNameText(current),
            getDatasetText(current),
          ].join(' '),
          'sp message'
        )
      )
    ) {
      return current
    }

    current = current.parentElement
    depth += 1
  }

  return null
}

function getInitialCMPRootCandidates() {
  return Array.from(
    querySelectorAllDeep(
      [
        '[id*="sp_message" i]',
        '[class*="sp_message" i]',
        '[id*="sp-message" i]',
        '[class*="sp-message" i]',
        '[id*="message_container" i]',
        '[class*="message_container" i]',
        '[id*="cookie" i]',
        '[class*="cookie" i]',
        '[id*="consent" i]',
        '[class*="consent" i]',
        '[id*="privacy" i]',
        '[class*="privacy" i]',
        '[id*="cmp" i]',
        '[class*="cmp" i]',
        '[data-cmp]',
        '[data-consent]',
        'dialog',
        '[role="dialog"]',
        '[aria-modal="true"]',
      ].join(',')
    )
  ).slice(0, MAX_COOKIE_CANDIDATES_PER_SCAN)
    .filter((candidate) =>
      candidate &&
      candidate !== document.body &&
      candidate !== document.documentElement &&
      isVisible(candidate) &&
      !isTextFragmentOrControl(candidate) &&
      !isLikelyNonCookieModal(candidate)
    )
}

function selectInitialCMPRoot(candidates = []) {
  const explicitCandidate =
    candidates.find((candidate) =>
      candidate &&
      candidate !== document.body &&
      candidate !== document.documentElement &&
      isVisible(candidate)
    )

  if (explicitCandidate) {
    return {
      root: explicitCandidate,
      reason: 'banner_candidate',
    }
  }

  const moreOptionsControl =
    findInitialMoreOptionsControl(document)

  const controlRoot =
    findInitialCMPRootFromControl(moreOptionsControl)

  if (controlRoot) {
    return {
      root: controlRoot,
      reason: getInitialCMPRootReason(controlRoot),
    }
  }

  const rootCandidates =
    getInitialCMPRootCandidates()
      .filter((candidate) =>
        (
          moreOptionsControl &&
          candidate.contains?.(moreOptionsControl)
        ) ||
        textMatchesInitialMoreOptions(getElementActionText(candidate)) ||
        hasKnownCmpSignal(candidate) ||
        hasCookieBannerSignal(candidate)
      )
      .sort((first, second) =>
        getText(first).length - getText(second).length
      )

  if (rootCandidates[0]) {
    return {
      root: rootCandidates[0],
      reason: getInitialCMPRootReason(rootCandidates[0]),
    }
  }

  return {
    root: document,
    reason: 'document_fallback',
  }
}

function hasSensitiveInput(element) {
  return Boolean(
    safeQuerySelectorAll(
      element,
      [
        'input[type="password"]',
        'input[type="email"]',
        'input[name*="card" i]',
        'input[id*="card" i]',
        'input[autocomplete*="cc-" i]',
        'textarea',
      ].join(',')
    ).length
  )
}

function hasSensitiveContext(element) {
  const context = safeClosest(
    element,
    'form, nav, header, main, article'
  )

  if (context) return true

  const signal = [
    element.id,
    getClassNameText(element),
    element.getAttribute?.('aria-label'),
    getText(element).slice(0, 600),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return sensitiveAreaKeywords.some((keyword) =>
    signal.includes(keyword)
  )
}

function looksLikeMainContent(element) {
  const rect = getSafeClientRect(element)
  if (!rect) return false

  const viewportArea = window.innerWidth * window.innerHeight
  const area = rect.width * rect.height
  const textLength = getText(element).length

  return (
    area >= viewportArea * 0.65 &&
    textLength > 500 &&
    Boolean(
      element.querySelector?.(
        'h1, h2, h3, p, article, main, table, ul, ol'
      )
    )
  )
}

function isSafeToHide(element) {
  if (
    !shouldRunOnThisSite() ||
    !element ||
    element === document.body ||
    element === document.documentElement ||
    element.dataset.addislineHidden === 'true'
  ) {
    return false
  }

  if (
    isTextFragmentOrControl(element) ||
    safeMatches(element, 'form, nav, header, main, article') ||
    isLikelyNonCookieModal(element) ||
    hasSensitiveInput(element) ||
    hasSensitiveContext(element) ||
    looksLikeMainContent(element)
  ) {
    return false
  }

  return (
    isPotentialCookieContainer(element) &&
    (
      looksLikeCookieBanner(element) ||
      hasCookieAttributeSignal(element)
    )
  )
}

function hasPageScrollLock() {
  return [
    document.documentElement,
    document.body,
  ].some((element) => {
    if (!isElementLike(element)) return false

    const style = safeGetComputedStyle(element)
    if (!style) return false

    return (
      style.overflow === 'hidden' ||
      style.overflowY === 'hidden' ||
      style.position === 'fixed' ||
      element.style.overflow ||
      element.style.overflowY ||
      element.style.position
    )
  })
}

function restorePageInteractionForCookieBanner(element, options = {}) {
  const force =
    Boolean(options.force)

  if (
    (!force && !shouldRunOnThisSite()) ||
    !element ||
    (
      !force &&
      (
        !isPotentialCookieContainer(element) ||
        !hasCookieBannerSignal(element)
      )
    ) ||
    !hasPageScrollLock()
  ) {
    return
  }

  ;[
    document.documentElement,
    document.body,
  ].forEach((target) => {
    target.style.removeProperty('overflow')
    target.style.removeProperty('overflow-y')
    target.style.removeProperty('position')
  })
}

function cleanupCookieInteractionLeftovers(element, options = {}) {
  const force =
    Boolean(options.force)

  if (!force && !shouldRunOnThisSite()) return false

  restorePageInteractionForCookieBanner(element, { force })

  if (!force && hasActiveCookieOverlay()) {
    return false
  }

  let cleaned = false

  ;[
    document.documentElement,
    document.body,
  ].forEach((target) => {
    if (!target) return

    if (
      target.style.overflow ||
      target.style.overflowY ||
      target.style.position
    ) {
      cleaned = true
    }

    target.style.removeProperty('overflow')
    target.style.removeProperty('overflow-y')
    target.style.removeProperty('position')

    if (target.hasAttribute('inert')) {
      target.removeAttribute('inert')
      cleaned = true
    }

    target.style.removeProperty('pointer-events')
  })

  Array.from(document.body?.children || [])
    .filter((child) =>
      child.hasAttribute?.('inert') &&
      !isPotentialCookieContainer(child) &&
      !isLikelyNonCookieModal(child)
    )
    .slice(0, 12)
    .forEach((child) => {
      child.removeAttribute('inert')
      cleaned = true
    })

  if (cleaned || !hasPageScrollLock()) {
    log('page interaction restored')
  }

  if (cleaned) {
    log('overlay cleanup executed')
  }

  return cleaned
}

function scanCookieOverlays() {
  if (
    !shouldRunOnThisSite() ||
    getProtectionModeConfig().scanAggressiveness !== 'strict'
  ) {
    return
  }

  document.querySelectorAll(
    [
      '[id*="cookie" i][class*="overlay" i]',
      '[class*="cookie" i][class*="overlay" i]',
      '[id*="consent" i][class*="overlay" i]',
      '[class*="consent" i][class*="overlay" i]',
      '[id*="privacy" i][class*="overlay" i]',
      '[class*="privacy" i][class*="overlay" i]',
      '[id*="cookie" i][class*="backdrop" i]',
      '[class*="cookie" i][class*="backdrop" i]',
      '[id*="consent" i][class*="backdrop" i]',
      '[class*="consent" i][class*="backdrop" i]',
    ].join(',')
  ).forEach((overlay) => {
    if (!hasCookieBannerSignal(overlay)) return
    if (isLikelyNonCookieModal(overlay)) return
    hideElement(overlay)
  })
}

function getActionControls(container) {
  const containerSignal = [
    getElementActionText(container),
    getText(container).slice(0, 1200),
  ].join(' ')

  if (
    !textHasAny(
      containerSignal,
      [
        ...bannerKeywords,
        ...preferenceSectionTexts,
        ...optionalPreferenceTexts,
        ...settingsTexts,
        ...savePreferenceTexts,
        ...rejectTexts,
        ...totalRejectTexts,
      ]
    )
  ) {
    return []
  }

  const primaryControls =
    querySelectorAllDeep(
      [
        'button',
        'a',
        '[role="button"]',
        'input',
        'input[type="button"]',
        'input[type="submit"]',
      ].join(','),
      container
    )
  const secondaryControls =
    querySelectorAllDeep(
      [
        'span',
        'strong',
        'div',
        '[aria-controls]',
        '[aria-expanded]',
        '[data-action]',
        '[onclick]',
        '[tabindex]',
      ].join(','),
      container
    )

  return prioritizeControlsBeforeCap(
    [
      ...primaryControls,
      ...secondaryControls,
    ],
    MAX_CLICKABLE_CONTROLS_PER_SCAN
  )
}

function getNearbyActionContext(element, container) {
  const parent =
    element?.parentElement

  const closestControlGroup =
    safeClosest(
      element,
      [
        'li',
        'p',
        'label',
        'fieldset',
        'section',
        '[role="group"]',
        '[class*="button" i]',
        '[class*="action" i]',
        '[class*="choice" i]',
        '[class*="preference" i]',
      ].join(',')
    )

  const cmpContext =
    safeClosest(
      element,
      [
        '[id*="cookie" i]',
        '[class*="cookie" i]',
        '[id*="consent" i]',
        '[class*="consent" i]',
        '[id*="cmp" i]',
        '[class*="cmp" i]',
        '[id*="privacy" i]',
        '[class*="privacy" i]',
        '[role="dialog"]',
        '[aria-modal="true"]',
      ].join(',')
    )

  return {
    text: normalizeMatchText(getText(element)),
    aria: normalizeMatchText(
      [
        element?.getAttribute?.('aria-label'),
        getElementReferenceText(element, 'aria-labelledby'),
        getElementReferenceText(element, 'aria-describedby'),
      ].join(' ')
    ),
    title: normalizeMatchText(element?.getAttribute?.('title')),
    role: normalizeMatchText(element?.getAttribute?.('role')),
    classText: normalizeMatchText(
      [
        element?.id,
        getClassNameText(element),
        element?.getAttribute?.('data-action'),
        element?.getAttribute?.('data-testid'),
        getDatasetText(element),
      ].join(' ')
    ),
    controlState: normalizeMatchText(
      [
        element?.getAttribute?.('aria-controls'),
        element?.getAttribute?.('aria-expanded'),
        element?.getAttribute?.('type'),
      ].join(' ')
    ),
    nearby: normalizeMatchText(
      [
        parent ? getText(parent).slice(0, 260) : '',
        closestControlGroup ? getText(closestControlGroup).slice(0, 420) : '',
      ].join(' ')
    ),
    container: normalizeMatchText(
      [
        container ? getText(container).slice(0, 1200) : '',
        container ? getElementActionText(container).slice(0, 600) : '',
        cmpContext ? getText(cmpContext).slice(0, 1000) : '',
        cmpContext ? getElementActionText(cmpContext).slice(0, 600) : '',
      ].join(' ')
    ),
  }
}

function scoreTextAgainstKeywords(text, keywords, weight) {
  const normalizedText =
    normalizeMatchText(text)

  if (!normalizedText) return 0

  const tokenSet =
    new Set(tokenizeMatchText(normalizedText))

  return keywords.reduce((score, keyword) => {
    const normalizedKeyword =
      normalizeMatchText(keyword)

    if (!normalizedKeyword) return score

    if (textHasPhrase(normalizedText, normalizedKeyword)) {
      return score + weight
    }

    const keywordTokens =
      tokenizeMatchText(normalizedKeyword)

    if (
      keywordTokens.length > 1 &&
      keywordTokens.every((token) => tokenSet.has(token))
    ) {
      return score + Math.max(1, weight - 2)
    }

    return score
  }, 0)
}

function getCookieIntentScore(element, container, intent) {
  if (!element || !COOKIE_INTENT_KEYWORDS[intent]) {
    return 0
  }

  const context =
    getNearbyActionContext(element, container)

  const keywords =
    COOKIE_INTENT_KEYWORDS[intent]

  let score = 0

  score += scoreTextAgainstKeywords(context.text, keywords, 8)
  score += scoreTextAgainstKeywords(context.aria, keywords, 7)
  score += scoreTextAgainstKeywords(context.title, keywords, 6)
  score += scoreTextAgainstKeywords(context.role, keywords, 2)
  score += scoreTextAgainstKeywords(context.classText, keywords, 5)
  score += scoreTextAgainstKeywords(context.controlState, keywords, 2)
  score += scoreTextAgainstKeywords(context.nearby, keywords, 3)
  score += scoreTextAgainstKeywords(context.container, keywords, 1)

  const hasDirectNegativeConsentReject =
    textHasAny(
      [
        context.text,
        context.aria,
        context.title,
        context.classText,
      ].join(' '),
      negativeConsentRejectTexts
    )

  if (
    intent !== 'acceptAll' &&
    !hasDirectNegativeConsentReject &&
    scoreTextAgainstKeywords(
      [
        context.text,
        context.aria,
        context.title,
        context.classText,
      ].join(' '),
      COOKIE_INTENT_KEYWORDS.acceptAll,
      8
    ) >= 8
  ) {
    score -= 20
  }

  return score
}

function getBestCookieIntent(element, container) {
  const scoredIntents =
    COOKIE_ACTION_PRIORITY
      .map((intent) => ({
        intent,
        score: getCookieIntentScore(element, container, intent),
      }))
      .filter((result) => result.score > 0)

  return scoredIntents
    .sort((first, second) => {
      if (second.score !== first.score) {
        return second.score - first.score
      }

      return (
        COOKIE_ACTION_PRIORITY.indexOf(first.intent) -
        COOKIE_ACTION_PRIORITY.indexOf(second.intent)
      )
    })[0] || {
      intent: 'none',
      score: 0,
    }
}

function findBestActionByIntent(container, intent, minimumScore = 8) {
  return getActionControls(container)
    .filter((control) =>
      isVisible(control) &&
      !isSensitiveActionControl(control, container)
    )
    .map((control) => ({
      control,
      score: getCookieIntentScore(control, container, intent),
    }))
    .filter((candidate) => candidate.score >= minimumScore)
    .sort((first, second) => second.score - first.score)[0]?.control || null
}

function findBestExplicitRejectActionByIntent(container, intent, minimumScore = 8) {
  return getActionControls(container)
    .filter((control) =>
      hasVisibleRejectIntent(control) &&
      !isSensitiveActionControl(control, container)
    )
    .map((control) => ({
      control,
      score: getCookieIntentScore(control, container, intent),
    }))
    .filter((candidate) => candidate.score >= minimumScore)
    .sort((first, second) => second.score - first.score)[0]?.control || null
}

function findBestActionByKeywords(container, keywords, minimumScore = 8) {
  return getActionControls(container)
    .filter((control) =>
      isVisible(control) &&
      !hasUnsafeAcceptText(control) &&
      !hasVisibleSettingsIntent(control) &&
      !isSensitiveActionControl(control, container)
    )
    .map((control) => ({
      control,
      score:
        scoreTextAgainstKeywords(getActionText(control), keywords, 8),
    }))
    .filter((candidate) => candidate.score >= minimumScore)
    .sort((first, second) => second.score - first.score)[0]?.control || null
}

function isSensitiveActionControl(control, container) {
  const context =
    getNearbyActionContext(control, container)

  const sensitiveSignal =
    normalizeMatchText(
      [
        context.text,
        context.aria,
        context.title,
        context.classText,
        context.nearby,
      ].join(' ')
    )

  if (textHasAny(sensitiveSignal, sensitiveAreaKeywords)) {
    return true
  }

  const cmpSignal =
    normalizeMatchText(context.container)

  return (
    !textHasAny(cmpSignal, bannerKeywords) &&
    !textHasAny(cmpSignal, preferenceSectionTexts)
  )
}

function hasUnsafeAcceptText(element) {
  const directActionSignal =
    normalizeMatchText([
      getActionText(element),
      element?.getAttribute?.('aria-label'),
      element?.getAttribute?.('title'),
      element?.value,
      element?.getAttribute?.('value'),
    ].join(' '))

  if (textHasAny(directActionSignal, negativeConsentRejectTexts)) {
    return false
  }

  return getCookieIntentScore(element, null, 'acceptAll') >= 8
}

function getCompactActionText(element) {
  return getActionText(element)
    .replace(/\s+/g, '')
}

function hasDirectSafeRejectSignal(element) {
  if (!element || hasUnsafeAcceptText(element)) {
    return false
  }

  const actionText = getActionText(element)
  const classText = getClassNameText(element)
  const idText = element.id || ''

  if (
    textMatchesDictionaryCookieIntent(actionText, 'rejectAll') ||
    textHasAny(actionText, rejectTexts) ||
    textHasAny(actionText, totalRejectTexts) ||
    textHasAny(classText, directSafeRejectClassSignals) ||
    textHasAny(idText, directSafeRejectClassSignals)
  ) {
    return true
  }

  return false
}

function hasDirectSettingsSignal(element) {
  if (!element || hasUnsafeAcceptText(element)) {
    return false
  }

  if (textMatchesDictionaryCookieIntent(getActionText(element), 'openSettings')) {
    return true
  }

  if (textMatchesLightweightSettingsOpen(getActionText(element))) {
    return true
  }

  return getCookieIntentScore(element, null, 'managePreferences') >= 8
}

function findActionByTexts(container, texts) {
  return findBestActionByKeywords(container, texts)
}

function uniqueElements(elements) {
  return Array.from(new Set(
    (Array.isArray(elements) ? elements : [])
      .filter(Boolean)
  ))
}

function hasVisibleRejectIntent(control) {
  if (
    !control ||
    !isVisible(control) ||
    isInsideNonCookieModal(control) ||
    hasUnsafeAcceptText(control)
  ) {
    return false
  }

  const text =
    getActionText(control)

  return (
    !hasVisibleSettingsIntent(control) &&
    (
      textMatchesDictionaryCookieIntent(text, 'rejectAll') ||
      textHasAny(text, totalRejectTexts) ||
      textHasAny(text, rejectTexts) ||
      isNoAceptoControl(control)
    )
  )
}

function hasVisibleSettingsIntent(control) {
  if (
    !control ||
    !isVisible(control) ||
    isInsideNonCookieModal(control) ||
    hasUnsafeAcceptText(control)
  ) {
    return false
  }

  const text =
    getActionText(control)

  return (
    !textMatchesDictionaryCookieIntent(text, 'avoidAcceptAll') &&
    (
      textMatchesDictionaryCookieIntent(text, 'openSettings') ||
      textMatchesLightweightSettingsOpen(text)
    )
  )
}

function hasElapsedBudget(startedAt, budgetMs) {
  return Boolean(
    startedAt &&
    budgetMs &&
    Date.now() - startedAt >= budgetMs
  )
}

function prioritizeControlsBeforeCap(controls, limit, options = {}) {
  const uniqueControls =
    uniqueElements(controls)
      .slice(0, MAX_DIRECT_CONTROL_PRIORITIZATION_INPUT)
  const startedAt =
    Number(options.startedAt) || 0
  const budgetMs =
    Number(options.budgetMs) || 0

  if (hasElapsedBudget(startedAt, budgetMs)) {
    return uniqueControls.slice(0, limit)
  }

  const rejectControls =
    []
  const settingsControls =
    []
  const remainingControls =
    []

  for (const control of uniqueControls) {
    if (hasElapsedBudget(startedAt, budgetMs)) {
      remainingControls.push(control)
      continue
    }

    if (hasVisibleRejectIntent(control)) {
      rejectControls.push(control)
      continue
    }

    if (hasVisibleSettingsIntent(control)) {
      settingsControls.push(control)
      continue
    }

    remainingControls.push(control)
  }

  return [
    ...rejectControls,
    ...settingsControls,
    ...remainingControls,
  ].slice(0, limit)
}

function getDirectClickableControls(container = document, options = {}) {
  const primaryControls =
    querySelectorAllDeep(
      [
        'button',
        'a',
        '[role="button"]',
        'input',
        'input[type="button"]',
        'input[type="submit"]',
      ].join(','),
      container
    )
  const secondaryControls =
    querySelectorAllDeep(
      [
        'span',
        'strong',
        'div',
        '[aria-controls]',
        '[aria-expanded]',
        '[data-action]',
        '[onclick]',
        '[tabindex]',
      ].join(','),
      container
    )

  return prioritizeControlsBeforeCap(
    [
      ...primaryControls,
      ...secondaryControls,
    ],
    MAX_CLICKABLE_CONTROLS_PER_SCAN,
    options
  )
}

function getDirectRejectDiagnostic(control) {
  const text =
    getActionText(control)
  const container =
    getCookieContainer(control) || document
  const rejectedBy = []
  const matchedBy = []

  if (!isVisible(control)) rejectedBy.push('not_visible')
  if (isInsideNonCookieModal(control)) rejectedBy.push('non_cookie_modal')
  if (hasUnsafeAcceptText(control)) rejectedBy.push('unsafe_accept_text')

  if (textMatchesDictionaryCookieIntent(text, 'rejectAll')) {
    matchedBy.push('dictionary_reject_all')
  }
  if (textHasAny(text, totalRejectTexts)) {
    matchedBy.push('total_reject_text')
  }
  if (textHasAny(text, rejectTexts)) {
    matchedBy.push('reject_text')
  }
  if (hasDirectSafeRejectSignal(control)) {
    matchedBy.push('direct_safe_signal')
  }

  if (
    matchedBy.length === 0 &&
    isSensitiveActionControl(control, container)
  ) {
    rejectedBy.push('sensitive_context')
  }

  if (matchedBy.length === 0) {
    rejectedBy.push('no_reject_match')
  }

  return {
    text: text.slice(0, 160),
    tagName: control?.tagName?.toLowerCase?.() || '',
    role: control?.getAttribute?.('role') || '',
    matchedBy,
    rejectedBy,
    control: getCookieDebugElementSummary(control),
  }
}

function traceDirectRejectExtraction(controls) {
  if (!ENABLE_VERBOSE_DIAGNOSTICS) return

  const safeControls =
    Array.isArray(controls) ? controls : []

  traceNoAceptoRejectButton(safeControls)
}

function getNoAceptoSignal(element) {
  return normalizeMatchText([
    element?.innerText,
    element?.textContent,
    element?.getAttribute?.('aria-label'),
    element?.getAttribute?.('title'),
    element?.value,
    element?.getAttribute?.('value'),
    getActionText(element),
  ]
    .filter(Boolean)
    .join(' ')
  )
}

function isNoAceptoControl(element) {
  return textHasPhrase(getNoAceptoSignal(element), 'no acepto')
}

function getNoAceptoRejectDiagnostic(control) {
  const actionText =
    getActionText(control)
  const signalText =
    getNoAceptoSignal(control)
  const container =
    getCookieContainer(control) || document
  const signature =
    getBannerActionSignature(control)
  const lastActionAt =
    bannerActionCooldowns.get(signature) || 0
  const blockedByCooldown =
    Boolean(
      signature &&
      Date.now() - lastActionAt < BANNER_ACTION_COOLDOWN_MS
    )
  const blockedByProcessedState =
    processedActionElements.has(control)
  const blockedByAvoidAcceptAll =
    textMatchesDictionaryCookieIntent(actionText, 'avoidAcceptAll')
  const blockedByUnsafeAcceptText =
    hasUnsafeAcceptText(control)
  const blockedByNonCookieModal =
    isInsideNonCookieModal(control)
  const matchedAsRejectAll =
    textMatchesDictionaryCookieIntent(actionText, 'rejectAll') ||
    textHasAny(actionText, totalRejectTexts)
  const matchedAsRejectText =
    textHasAny(actionText, rejectTexts)
  const blockedBySensitiveContext =
    !matchedAsRejectAll &&
    !matchedAsRejectText &&
    isSensitiveActionControl(control, container)

  return {
    foundInDom: true,
    visible: isVisible(control),
    matchedAsRejectAll,
    matchedAsRejectText,
    blockedByAvoidAcceptAll,
    blockedByCooldown,
    blockedByProcessedState,
    blockedBySafetySensitiveContext: Boolean(
      blockedByUnsafeAcceptText ||
      blockedByNonCookieModal ||
      blockedBySensitiveContext
    ),
    safety: {
      unsafeAcceptText: blockedByUnsafeAcceptText,
      nonCookieModal: blockedByNonCookieModal,
      sensitiveContext: blockedBySensitiveContext,
    },
    basicRejectBlockReason: getBasicRejectBlockReason(control),
    actionText: actionText.slice(0, 180),
    signalText: signalText.slice(0, 180),
    control: getCookieDebugElementSummary(control),
  }
}

function traceNoAceptoRejectButton(controls) {
  const scannedControls =
    Array.isArray(controls) ? controls : []
  const noAceptoControls =
    scannedControls
      .filter(isNoAceptoControl)
      .slice(0, 5)

  if (noAceptoControls.length === 0) {
    return
  }

  rejectFlowLog('NO ACEPTO found', {
    foundInDom: noAceptoControls.length > 0,
    control: getCookieDebugElementSummary(noAceptoControls[0]),
  })
}

function logNoAceptoRejectClickOutcome(control, clicked, reason) {
  if (!control || !isNoAceptoControl(control)) {
    return
  }

  if (clicked) {
    rejectFlowLog('NO ACEPTO clicked', {
      control: getCookieDebugElementSummary(control),
    })
    return
  }

  rejectFlowLog('NO ACEPTO blocked', {
    reason: reason || 'unknown',
    blockReason:
      getNoAceptoRejectDiagnostic(control).basicRejectBlockReason,
    control: getCookieDebugElementSummary(control),
  })
}

function classifyCMPBanner(container = document) {
  const controls =
    getDirectClickableControls(container)
      .filter(isVisible)
  const hasReject =
    controls.some((control) => {
      const text =
        getActionText(control)

      return (
        !hasUnsafeAcceptText(control) &&
        !hasVisibleSettingsIntent(control) &&
        (
          textMatchesDictionaryCookieIntent(text, 'rejectAll') ||
          textHasAny(text, totalRejectTexts) ||
          hasDirectSafeRejectSignal(control)
        )
      )
    })
  const hasSettings =
    controls.some((control) => {
      const text =
        getActionText(control)

      return (
        !hasUnsafeAcceptText(control) &&
        !textMatchesDictionaryCookieIntent(text, 'avoidAcceptAll') &&
        (
          textMatchesDictionaryCookieIntent(text, 'openSettings') ||
          textMatchesLightweightSettingsOpen(text)
        )
      )
    })
  const hasSave =
    controls.some((control) =>
      textMatchesDictionaryCookieIntent(
        getActionText(control),
        'savePreferences'
      )
    )
  const hasAcceptUnsafe =
    controls.some((control) =>
      hasUnsafeAcceptText(control) ||
      textMatchesDictionaryCookieIntent(
        getActionText(control),
        'avoidAcceptAll'
      )
    )

  let classification = 'unknownUnsafe'

  if (hasReject) {
    classification = 'directRejectAvailable'
  } else if (hasSettings || hasSave) {
    classification = 'settingsAvailable'
  } else if (hasAcceptUnsafe) {
    classification = 'acceptOnlyUnsafe'
  }

  return {
    classification,
    directRejectAvailable: hasReject,
    settingsAvailable: hasSettings || hasSave,
    acceptOnlyUnsafe: !hasReject && !hasSettings && hasAcceptUnsafe,
    unknownUnsafe:
      !hasReject &&
      !hasSettings &&
      !hasSave &&
      !hasAcceptUnsafe,
    controlCount: controls.length,
  }
}

function textMatchesLightweightSettingsOpen(text) {
  const normalizedText =
    normalizeMatchText(text)

  return (
    textHasPhrase(normalizedText, 'more options') ||
    textHasPhrase(normalizedText, 'manage options') ||
    textHasPhrase(normalizedText, 'cookie settings') ||
    textHasPhrase(normalizedText, 'privacy settings') ||
    textHasPhrase(normalizedText, 'gestionar configuracion') ||
    textHasPhrase(normalizedText, 'personalizar opciones') ||
    textHasPhrase(normalizedText, 'mas informacion y personalizacion') ||
    textHasPhrase(normalizedText, 'manage preferences') ||
    textMatchesDictionaryCookieIntent(normalizedText, 'openSettings')
  )
}

function findLightweightSettingsControl(container = document) {
  const startedAt = Date.now()
  const controls =
    getDirectClickableControls(container, {
      startedAt,
      budgetMs: SETTINGS_FALLBACK_BUDGET_MS,
    })

  for (const control of controls) {
    if (Date.now() - startedAt >= SETTINGS_FALLBACK_BUDGET_MS) {
      lastLightweightSettingsBudgetCapped = true
      return null
    }

      const text =
        getActionText(control)

      if (
        isVisible(control) &&
        !isInsideNonCookieModal(control) &&
        !hasUnsafeAcceptText(control) &&
        !textMatchesDictionaryCookieIntent(text, 'avoidAcceptAll') &&
        textMatchesLightweightSettingsOpen(text) &&
        !isSensitiveActionControl(control, container)
      ) {
        return control
      }
  }

  return null
}

function hasStrongSettingsSaveSignal(container = document) {
  const startedAt = Date.now()
  const controls =
    getDirectClickableControls(container, {
      startedAt,
      budgetMs: SETTINGS_FALLBACK_BUDGET_MS,
    })
      .slice(0, 30)
  let hasSettings = false
  let hasSave = false

  for (const control of controls) {
    if (Date.now() - startedAt >= SETTINGS_FALLBACK_BUDGET_MS) {
      lastLightweightSettingsBudgetCapped = true
      break
    }

    if (!isVisible(control) || hasUnsafeAcceptText(control)) {
      continue
    }

    const text =
      getActionText(control)

    hasSettings =
      hasSettings ||
      (
        !textMatchesDictionaryCookieIntent(text, 'avoidAcceptAll') &&
        textMatchesLightweightSettingsOpen(text)
      )
    hasSave =
      hasSave ||
      textMatchesLightweightSettingsSave(text) ||
      textMatchesDictionaryCookieIntent(text, 'savePreferences')

    if (hasSettings && hasSave) {
      return true
    }
  }

  return false
}

function getLightweightSettingsDiagnostics(container = document) {
  const controls =
    getDirectClickableControls(container)
  const settingControls =
    controls
      .filter((control) =>
        hasVisibleSettingsIntent(control)
      )
      .slice(0, 8)

  return {
    scannedControlCount: controls.length,
    settingControlCount: settingControls.length,
    firstMatchingSettingsControl:
      getCookieDebugElementSummary(settingControls[0]),
    firstSettingControls:
      settingControls.map(getCookieDebugElementSummary),
  }
}

function getSettingsAvailableClassification(candidates) {
  const bannerCandidates =
    Array.isArray(candidates) && candidates.length > 0
      ? candidates
      : [document]

  const classifications =
    bannerCandidates
    .slice(0, 4)
    .map((candidate) => ({
      candidate,
      ...classifyCMPBanner(candidate),
    }))

  const selected =
    classifications.find((entry) =>
      entry.classification === 'settingsAvailable' &&
      !entry.directRejectAvailable
    ) || null

  rejectFlowLog('Lightweight settings classification', {
    selected: selected?.classification || 'none',
    classifications: classifications.map((entry) => ({
      classification: entry.classification,
      directRejectAvailable: entry.directRejectAvailable,
      settingsAvailable: entry.settingsAvailable,
      controlCount: entry.controlCount,
      candidate: getCookieDebugElementSummary(entry.candidate),
    })),
  })

  return selected
}

function getLightweightSettingsBlockReason(control) {
  if (!shouldRunOnThisSite()) return 'site_not_enabled'
  if (hasSuccessfulCookieActionCooldown()) return 'success_cooldown'
  if (!control) return 'candidate_not_found'
  if (!isVisible(control)) return 'not_visible'
  if (hasUnsafeAcceptText(control)) return 'unsafe_accept_text'
  if (processedActionElements.has(control)) return 'processed_state'
  if (pageActionCount >= MAX_PAGE_ACTIONS) return 'page_action_budget'

  const signature =
    getBannerActionSignature(control)
  const lastActionAt =
    bannerActionCooldowns.get(signature) || 0

  if (
    signature &&
    Date.now() - lastActionAt < BANNER_ACTION_COOLDOWN_MS
  ) {
    return 'cooldown'
  }

  return ''
}

function isElementInViewport(element) {
  if (!element || !isVisible(element)) return false

  const rect =
    getSafeClientRect(element)

  if (!rect) return false

  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (
      window.innerHeight ||
      document.documentElement.clientHeight
    ) &&
    rect.left <= (
      window.innerWidth ||
      document.documentElement.clientWidth
    )
  )
}

function isProviderOrVendorToggleContext(control) {
  const text =
    normalizeMatchText(getPreferenceDecisionText(control))

  return textHasAny(text, [
    'vendor',
    'vendors',
    'provider',
    'providers',
    'partner',
    'partners',
    'third party',
    'third-party',
    'terceros',
    'proveedores',
    'socios',
  ])
}

function isLightweightVisibleOptionalToggle(control) {
  if (
    !control ||
    !isElementInViewport(control) ||
    !isExplicitToggleControl(control) ||
    isSensitiveActionControl(control, getCookieContainer(control) || document)
  ) {
    return false
  }

  if (isProviderOrVendorToggleContext(control)) {
    return false
  }

  if (
    classifyToggleContext(control) !== 'optional' &&
    !isConsentOrLegitimateInterestToggle(control)
  ) {
    return false
  }

  return isConsentToggleEnabled(control) || isToggleEnabled(control)
}

function getLightweightToggleSkipReason(control) {
  if (!control) return 'missing_control'
  if (!isVisible(control)) return 'not_visible'
  if (!isElementInViewport(control)) return 'outside_viewport'
  if (!isExplicitToggleControl(control)) return 'not_toggle_control'
  if (
    isSensitiveActionControl(control, getCookieContainer(control) || document)
  ) {
    return 'sensitive_context'
  }
  if (isProviderOrVendorToggleContext(control)) return 'provider_or_vendor'

  const toggleContext =
    classifyToggleContext(control)

  if (
    toggleContext !== 'optional' &&
    !isConsentOrLegitimateInterestToggle(control)
  ) {
    return `context_${toggleContext}`
  }
  if (
    !isConsentToggleEnabled(control) &&
    !isToggleEnabled(control)
  ) {
    return 'not_active'
  }

  return ''
}

function getVisibleToggleDebugSummary(control) {
  const labelText =
    normalizeMatchText([
      getAssociatedLabelText(control),
      getElementReferenceText(control, 'aria-labelledby'),
      getElementReferenceText(control, 'aria-describedby'),
    ].join(' '))
  const decisionText =
    normalizeMatchText(getPreferenceDecisionText(control))
  const consentState =
    getConsentToggleState(control)
  const legacyActiveState =
    isToggleEnabled(control)

  return {
    labelText: labelText.slice(0, 180),
    decisionText: decisionText.slice(0, 220),
    ariaChecked: control?.getAttribute?.('aria-checked') || '',
    ariaPressed: control?.getAttribute?.('aria-pressed') || '',
    role: control?.getAttribute?.('role') || '',
    className: getClassNameText(control).slice(0, 180),
    computedActiveState: consentState,
    legacyActiveState,
    control: getCookieDebugElementSummary(control),
  }
}

function isConsentOrLegitimateInterestToggle(control) {
  const text =
    normalizeMatchText([
      getAssociatedLabelText(control),
      getPreferenceDecisionText(control),
      getActionText(control),
    ].join(' '))

  return hasConsentOrLegitimateInterestText(text)
}

function getVisibleTogglePassDiagnostics(panel) {
  const toggles =
    panel ? getToggleControls(panel) : []
  const customToggles =
    (
      ENABLE_CUSTOM_VISUAL_SWITCH_DETECTION && panel
    )
      ? getCustomVisualToggleControls(panel)
      : []
  const visibleToggles =
    toggles.filter(isVisible)
  const activeToggles =
    visibleToggles.filter((control) =>
      isConsentToggleEnabled(control) || isToggleEnabled(control)
    )
  const activeCustomToggles =
    ENABLE_CUSTOM_VISUAL_SWITCH_DETECTION
      ? customToggles.filter((control) =>
          isVisible(control) &&
          (
            isConsentToggleEnabled(control) ||
            isToggleEnabled(control) ||
            hasVisualEnabledState(control)
          )
        )
      : []
  const eligibleToggles =
    activeToggles.filter(isLightweightVisibleOptionalToggle)
  const skippedToggles =
    visibleToggles
      .map((control) => ({
        reason: getLightweightToggleSkipReason(control),
        ...getVisibleToggleDebugSummary(control),
      }))
      .filter((entry) => entry.reason)
      .slice(0, 8)
  const watchedSkippedToggles =
    visibleToggles
      .filter(isConsentOrLegitimateInterestToggle)
      .map((control) => ({
        reason: getLightweightToggleSkipReason(control),
        ...getVisibleToggleDebugSummary(control),
      }))
      .filter((entry) => entry.reason)
      .slice(0, 6)
  const saveControl =
    findFinalConfirmationControl(panel)

  return {
    totalToggleCount: toggles.length,
    visibleToggleCandidatesCount: visibleToggles.length,
    activeToggleCandidatesCount: activeToggles.length,
    customToggleCandidatesFound: customToggles.length,
    activeCustomTogglesFound: activeCustomToggles.length,
    eligibleToggleCandidatesCount: eligibleToggles.length,
    skippedToggleReasons: skippedToggles,
    watchedSkippedConsentToggles: watchedSkippedToggles,
    saveButtonFound: Boolean(saveControl),
    saveButton: getCookieDebugElementSummary(saveControl),
  }
}

function disableVisibleTopLevelConsentToggles(panel) {
  if (
    !shouldRunOnThisSite() ||
    !panel ||
    !getProtectionModeConfig().allowSettingsOpen
  ) {
    return 0
  }

  let disabledCount = 0

  getToggleControls(panel)
    .filter(isLightweightVisibleOptionalToggle)
    .slice(0, MAX_LIGHTWEIGHT_VISIBLE_TOGGLE_ACTIONS)
    .forEach((control) => {
      if (!shouldRunOnThisSite()) return
      if (!isLightweightVisibleOptionalToggle(control)) return

      if (clickElementSafely(control)) {
        disabledCount += 1
        incrementStat('trackersReduced')
      }
    })

  return disabledCount
}

function runLightweightVisibleTogglePass(panel) {
  if (
    !shouldRunOnThisSite() ||
    !panel ||
    rejectFlowCompleted
  ) {
    return false
  }

  if (!ENABLE_CMP_SPECIFIC_HELPERS) {
    return false
  }

  const cmpSpecificResult =
    runLightweightCMPSpecificPanelPass(panel)

  if (cmpSpecificResult) {
    return true
  }

  const beforeDiagnostics =
    getVisibleTogglePassDiagnostics(panel)

  rejectFlowLog('Lightweight visible toggle pass started', {
    panel: getCookieDebugElementSummary(panel),
    ...beforeDiagnostics,
  })

  const disabledCount =
    disableVisibleTopLevelConsentToggles(panel)
  const saveControlBeforeClick =
    findFinalConfirmationControl(panel)
  const saveAttempted =
    saveCookiePreferences(panel)

  rejectFlowLog('Lightweight visible toggle pass', {
    togglesClickedCount: disabledCount,
    saveButtonFound: Boolean(saveControlBeforeClick),
    saveClicked: saveAttempted,
    saveButton: getCookieDebugElementSummary(saveControlBeforeClick),
    panel: getCookieDebugElementSummary(panel),
  })

  if (saveAttempted) {
    return true
  }

  return disabledCount > 0
}

const LIGHTWEIGHT_CMP_SELECTORS = Object.freeze({
  sourcepoint: Object.freeze({
    roots: Object.freeze([
      '[id*="sp_message" i]',
      '[class*="sp_message" i]',
      '[id*="sp-message" i]',
      '[class*="sp-message" i]',
      '[class*="sp_message_container" i]',
      '[class*="sp-message-container" i]',
    ]),
    reject: Object.freeze([
      'button[title*="reject" i]',
      'button[aria-label*="reject" i]',
      '[role="button"][title*="reject" i]',
      '[role="button"][aria-label*="reject" i]',
    ]),
    settings: Object.freeze([
      'button[title*="more options" i]',
      'button[aria-label*="more options" i]',
      '[role="button"][title*="more options" i]',
      '[role="button"][aria-label*="more options" i]',
    ]),
    toggles: Object.freeze([
      '[aria-checked="true"]',
      '[role="switch"][aria-checked="true"]',
      'input[type="checkbox"]:checked',
    ]),
    save: Object.freeze([
      'button[title*="save" i]',
      'button[aria-label*="save" i]',
      'button[title*="confirm" i]',
      'button[aria-label*="confirm" i]',
      '[role="button"][title*="save" i]',
      '[role="button"][aria-label*="confirm" i]',
    ]),
  }),
  onetrust: Object.freeze({
    roots: Object.freeze([
      '#onetrust-banner-sdk',
      '#onetrust-pc-sdk',
      '[id*="onetrust" i]',
      '[class*="onetrust" i]',
      '[id*="ot-sdk" i]',
      '[class*="ot-sdk" i]',
    ]),
    reject: Object.freeze([
      '#onetrust-reject-all-handler',
      'button[id*="reject" i]',
      'button[class*="reject" i]',
    ]),
    settings: Object.freeze([
      '#onetrust-pc-btn-handler',
      'button[id*="pc-btn" i]',
      'button[class*="settings" i]',
    ]),
    toggles: Object.freeze([
      '#onetrust-pc-sdk input[type="checkbox"]:checked',
      '#onetrust-pc-sdk [aria-checked="true"]',
      '#onetrust-pc-sdk [role="switch"][aria-checked="true"]',
    ]),
    save: Object.freeze([
      '.save-preference-btn-handler',
      '#save-preference-btn-handler',
      '#onetrust-pc-sdk button[class*="save" i]',
    ]),
  }),
  didomi: Object.freeze({
    roots: Object.freeze([
      '#didomi-host',
      '#didomi-popup',
      '#didomi-notice',
      '[id*="didomi" i]',
      '[class*="didomi" i]',
    ]),
    reject: Object.freeze([
      '#didomi-notice-disagree-button',
      'button[id*="disagree" i]',
      'button[class*="disagree" i]',
      'button[class*="decline" i]',
    ]),
    settings: Object.freeze([
      '#didomi-notice-learn-more-button',
      'button[id*="learn-more" i]',
      'button[class*="preferences" i]',
      'button[class*="settings" i]',
    ]),
    toggles: Object.freeze([
      '#didomi-host input[type="checkbox"]:checked',
      '#didomi-host [aria-checked="true"]',
      '#didomi-host [role="switch"][aria-checked="true"]',
    ]),
    save: Object.freeze([
      '#didomi-save-button',
      '#didomi-host button[id*="save" i]',
      '#didomi-host button[class*="save" i]',
      '#didomi-host button[class*="agree" i]',
    ]),
  }),
})

function normalizeCMPName(value) {
  const normalized =
    normalizeMatchText(value)

  if (textHasPhrase(normalized, 'sourcepoint')) return 'sourcepoint'
  if (textHasPhrase(normalized, 'one trust') || textHasPhrase(normalized, 'onetrust')) return 'onetrust'
  if (textHasPhrase(normalized, 'didomi')) return 'didomi'

  return normalized
}

function getDetectedCMPName(root = document) {
  try {
    const detector =
      globalThis?.AddislineCMPFingerprint?.detectCMPFingerprint

    if (typeof detector === 'function') {
      const result =
        detector(root)
      const cmpName =
        normalizeCMPName(result?.cmpName || '')

      if (LIGHTWEIGHT_CMP_SELECTORS[cmpName]) {
        return cmpName
      }
    }
  } catch {
    // Fall back to local lightweight detector below.
  }

  const localResult =
    detectCMPFingerprint(root)
  const localName =
    normalizeCMPName(localResult?.cmp || '')

  return LIGHTWEIGHT_CMP_SELECTORS[localName]
    ? localName
    : ''
}

function queryCMPSelectorList(root, selectors, limit = 12) {
  const searchRoot =
    root || document
  const controls = []

  selectors.forEach((selector) => {
    try {
      controls.push(
        ...Array.from(searchRoot.querySelectorAll(selector))
      )
    } catch {
      // Ignore unsupported selectors from third-party CMP variants.
    }
  })

  return uniqueElements(controls)
    .slice(0, limit)
}

function getCMPRoot(cmpName, root = document) {
  const selectors =
    LIGHTWEIGHT_CMP_SELECTORS[cmpName]?.roots || []

  return queryCMPSelectorList(document, selectors, 8)
    .find((candidate) =>
      isVisible(candidate) &&
      (
        root === document ||
        candidate === root ||
        candidate.contains(root) ||
        root.contains?.(candidate)
      )
    ) || root || document
}

function getCMPSpecificControls(cmpName, type, root = document) {
  const selectors =
    LIGHTWEIGHT_CMP_SELECTORS[cmpName]?.[type] || []
  const cmpRoot =
    getCMPRoot(cmpName, root)

  return queryCMPSelectorList(cmpRoot, selectors, 16)
    .filter((control) =>
      isVisible(control) &&
      !hasUnsafeAcceptText(control) &&
      !isSensitiveActionControl(control, cmpRoot)
    )
}

function clickCMPSpecificControl(control) {
  return Boolean(
    control &&
    canProcessBannerAction(control) &&
    clickElementSafely(control)
  )
}

function getFundingChoicesRoot(root = document) {
  const scopedRoot =
    safeClosest(
      root,
      '.fc-data-preferences-dialog, .fc-consent-root, [class*="fc-consent-root" i], [id*="fc-consent" i], [class*="fundingchoices" i], [id*="fundingchoices" i]'
    )

  if (scopedRoot) return scopedRoot

  return safeQuerySelectorAll(
    document,
    '.fc-data-preferences-dialog, .fc-consent-root, [class*="fc-consent-root" i], [id*="fc-consent" i], [class*="fundingchoices" i], [id*="fundingchoices" i]'
  )
    .find((element) =>
      isVisible(element)
    ) || null
}

function getVisibleFundingChoicesPanel() {
  return safeQuerySelectorAll(
    document,
    '.fc-consent-root, .fc-data-preferences-dialog, .fc-dialog'
  )
    .find((element) =>
      isVisible(element)
    ) || null
}

function isFundingChoicesRoot(root) {
  return Boolean(getFundingChoicesRoot(root))
}

function isFundingChoicesSafeAction(control, root) {
  if (
    !control ||
    !root ||
    !root.contains(control) ||
    !isVisible(control) ||
    isInsideNonCookieModal(control) ||
    isSensitiveActionControl(control, root)
  ) {
    return false
  }

  const text =
    getActionText(control)
  const hasNegativeConsent =
    textHasAny(text, negativeConsentRejectTexts)

  if (
    !hasNegativeConsent &&
    (
      hasUnsafeAcceptText(control) ||
      textHasAny(text, fundingChoicesUnsafePositiveTexts)
    )
  ) {
    return false
  }

  return (
    hasNegativeConsent ||
    textHasAny(text, fundingChoicesSafeActionTexts) ||
    textMatchesDictionaryCookieIntent(text, 'rejectAll') ||
    textMatchesDictionaryCookieIntent(text, 'savePreferences')
  )
}

function findFundingChoicesControl(root, texts, startedAt, budgetMs) {
  const controls =
    getDirectClickableControls(root, {
      startedAt,
      budgetMs,
    })

  for (const control of controls) {
    if (hasElapsedBudget(startedAt, budgetMs)) {
      return null
    }

    if (
      root.contains(control) &&
      isVisible(control) &&
      !hasUnsafeAcceptText(control) &&
      !isSensitiveActionControl(control, root) &&
      textHasAny(getActionText(control), texts)
    ) {
      return control
    }
  }

  return null
}

function findFundingChoicesSafeAction(root, startedAt, budgetMs) {
  const controls =
    getDirectClickableControls(root, {
      startedAt,
      budgetMs,
    })

  for (const control of controls) {
    if (hasElapsedBudget(startedAt, budgetMs)) {
      return null
    }

    if (isFundingChoicesSafeAction(control, root)) {
      return control
    }
  }

  return null
}

function getFundingChoicesSliderWrapper(control, root) {
  const wrapper =
    safeClosest(control, '.fc-preference-slider')

  return wrapper && root?.contains?.(wrapper)
    ? wrapper
    : null
}

function getFundingChoicesSliderInput(control, root) {
  const wrapper =
    getFundingChoicesSliderWrapper(control, root)

  if (!wrapper) return null

  return safeQuerySelectorAll(
    wrapper,
    'input[type="checkbox"], [role="button"][aria-pressed], [aria-checked]'
  )
    .find((input) =>
      root.contains(input)
    ) || null
}

function getFundingChoicesSliderDiagnostic(control, root) {
  const wrapper =
    getFundingChoicesSliderWrapper(control, root)
  const input =
    getFundingChoicesSliderInput(control, root)

  return {
    wrapperFound: Boolean(wrapper),
    inputFound: Boolean(input),
    input: input || null,
    ariaPressed:
      String(input?.getAttribute?.('aria-pressed') || '').slice(0, 20),
    ariaLabel:
      normalizeMatchText(input?.getAttribute?.('aria-label') || '').slice(0, 90),
  }
}

function getFundingChoicesSliderKey(control, root) {
  const input =
    getFundingChoicesSliderInput(control, root) || control

  return normalizeMatchText([
    input?.getAttribute?.('data-id'),
    input?.getAttribute?.('aria-label'),
    input?.getAttribute?.('name'),
    input?.id,
  ].join(' ')).slice(0, 120)
}

function isFundingChoicesPreferencesPanel(root) {
  if (!root) return false

  if (
    safeQuerySelectorAll(
      root,
      'label.fc-preference-slider-container, .fc-preference-slider'
    ).length > 0
  ) {
    return true
  }

  return textHasAny(getText(root).slice(0, 1000), [
    'preferencies',
    'preferencias',
    'preferences',
  ])
}

function isFundingChoicesProviderPreferencesPanel(root) {
  if (!root) return false

  const classText =
    getClassNameText(root)
  const descendantClassSignal =
    safeQuerySelectorAll(
      root,
      '[class*="fc-vendor" i], [class*="vendor" i], [class*="vendors" i], [class*="provider" i], [class*="providers" i], [class*="proveidor" i], [class*="proveedor" i], [id*="vendor" i], [id*="provider" i]'
    )
      .slice(0, 8)
      .map((element) =>
        `${getClassNameText(element)} ${element?.id || ''}`
      )
      .join(' ')
  const text =
    getText(root).slice(0, 2500)
  const signal =
    normalizeMatchText(`${classText} ${descendantClassSignal} ${text}`)

  return textHasAny(signal, [
    'preferencies de proveidors',
    'preferencia de proveidors',
    'preferencias de proveedores',
    'preferencia de proveedores',
    'preferencies dels proveidors',
    'provider preferences',
    'vendor preferences',
    'fc-vendors',
    'fc vendors',
    'vendors panel',
    'providers panel',
  ])
}

function isCurrentFundingChoicesProviderPreferencesPanel(root) {
  const visiblePanel =
    getVisibleFundingChoicesPanel()
  const currentRoot =
    getFundingChoicesRoot(root) || null

  return [
    visiblePanel,
    currentRoot,
    root,
  ].some((candidate) =>
    candidate && isFundingChoicesProviderPreferencesPanel(candidate)
  )
}

function findFundingChoicesPreferenceInputByKey(root, key) {
  if (!root || !key) return null

  const startedAt =
    Date.now()

  return getFundingChoicesPreferenceToggleInputs(
    root,
    startedAt,
    FUNDING_CHOICES_SLIDER_SCAN_BUDGET_MS
  )
    .find((input) =>
      getFundingChoicesSliderKey(input, root) === key
    ) || null
}

function getFundingChoicesPreferenceToggleLabel(input, root) {
  const container =
    safeClosest(input, 'label.fc-preference-slider-container') ||
    safeClosest(input, '.fc-preference-slider')?.parentElement ||
    input?.parentElement

  const parts = [
    input?.getAttribute?.('aria-label'),
    getActionText(input),
    getAssociatedLabelText(input),
  ]

  if (container && root?.contains?.(container)) {
    parts.push(getActionText(container).slice(0, 300))
    parts.push(getText(container).slice(0, 500))
  }

  return normalizeMatchText(parts.join(' '))
}

function isFundingChoicesPreferenceCategoryToggle(input, root) {
  return textHasAny(
    getFundingChoicesPreferenceToggleLabel(input, root),
    fundingChoicesPreferenceCategoryTexts
  )
}

function getFundingChoicesPreferenceToggleState(input) {
  const ariaPressed =
    normalizeMatchText(input?.getAttribute?.('aria-pressed') || '')
  const ariaChecked =
    normalizeMatchText(input?.getAttribute?.('aria-checked') || '')

  if (ariaPressed === 'true' || ariaChecked === 'true' || input?.checked === true) {
    return 'enabled'
  }

  if (ariaPressed === 'false' || ariaChecked === 'false' || input?.checked === false) {
    return 'disabled'
  }

  return 'unknown'
}

function getFundingChoicesPreferenceToggleRank(input, root) {
  const label =
    getFundingChoicesPreferenceToggleLabel(input, root)
  const active =
    getFundingChoicesPreferenceToggleState(input) === 'enabled'

  let rank = active ? 100 : 0

  if (textHasAny(label, [
    'interes legitim',
    'interes legitimo',
    'interessos legitims',
    'intereses legitimos',
    'legitimate interest',
    'legitimate interests',
  ])) {
    rank += 20
  }

  if (textHasAny(label, [
    'consentiment',
    'consentimiento',
    'consent',
  ])) {
    rank += 10
  }

  return rank
}

function prioritizeFundingChoicesPreferenceToggleInputs(inputs, root) {
  return [...inputs]
    .sort((a, b) =>
      getFundingChoicesPreferenceToggleRank(b, root) -
      getFundingChoicesPreferenceToggleRank(a, root)
    )
}

function getFundingChoicesPreferenceToggleActionDiagnostic(input, root) {
  if (!input) {
    return {
      ariaLabel: '',
      inputId: 'none',
      inputName: 'none',
      inputClass: '',
      inputOuterHTML: '',
      wrapperOuterHTML: '',
      labelOuterHTML: '',
      ancestorOuterHTML: '',
      sliderClass: '',
      ariaPressedBefore: '',
      checkedBefore: false,
      activeBefore: false,
      visibleInput: false,
      labelClass: '',
      wrapperClass: '',
      clickTarget: '',
      clicked: false,
      clickDispatched: false,
      ariaPressedAfter: '',
      checkedAfter: false,
      activeAfter: false,
      stillActive: false,
      skippedReason: 'fc_toggle_input_not_found',
    }
  }

  const inputMeta =
    getSafeElementMeta(input)
  const label =
    safeClosest(input, 'label.fc-preference-slider-container')
  const wrapper =
    safeClosest(input, '.fc-preference-slider')
  const slider =
    wrapper && root?.contains?.(wrapper)
      ? safeQuerySelectorAll(wrapper, '.fc-slider-el')[0] || null
      : null
  const ancestor =
    safeClosest(input, 'button, [role="button"]')
  const activeBefore =
    getFundingChoicesPreferenceToggleState(input) === 'enabled'

  return {
    ariaLabel:
      normalizeMatchText(input?.getAttribute?.('aria-label') || '').slice(0, 90),
    inputId:
      inputMeta.id || 'none',
    inputName:
      inputMeta.name || 'none',
    inputClass:
      inputMeta.className.slice(0, 90),
    inputOuterHTML:
      String(input?.outerHTML || '').slice(0, 220),
    wrapperOuterHTML:
      String(wrapper?.outerHTML || '').slice(0, 220),
    labelOuterHTML:
      String(label?.outerHTML || '').slice(0, 220),
    ancestorOuterHTML:
      String(ancestor?.outerHTML || '').slice(0, 220),
    sliderClass:
      getClassNameText(slider).slice(0, 90),
    ariaPressedBefore:
      String(input?.getAttribute?.('aria-pressed') || '').slice(0, 20),
    checkedBefore:
      Boolean(input?.checked),
    activeBefore,
    visibleInput:
      Boolean(input && isVisible(input)),
    labelClass:
      getClassNameText(label).slice(0, 90),
    wrapperClass:
      getClassNameText(wrapper).slice(0, 90),
    clickTarget:
      '',
    clicked:
      false,
    clickDispatched:
      false,
    ariaPressedAfter:
      '',
    checkedAfter:
      false,
    activeAfter:
      activeBefore,
    stillActive:
      activeBefore,
    skippedReason:
      '',
  }
}

function getFundingChoicesPreferenceToggleClickTarget(input, root) {
  if (!input || !root?.contains?.(input)) return null
  if (isVisible(input)) return input

  const label =
    safeClosest(input, 'label.fc-preference-slider-container')
  if (label && root.contains(label) && isVisible(label)) return label

  const wrapper =
    safeClosest(input, '.fc-preference-slider')
  if (wrapper && root.contains(wrapper) && isVisible(wrapper)) return wrapper

  return null
}

function getFundingChoicesPreferenceClickTargets(input, root) {
  if (!input || !root?.contains?.(input)) return []

  const label =
    safeClosest(input, 'label.fc-preference-slider-container')
  const wrapper =
    safeClosest(input, '.fc-preference-slider')
  const slider =
    wrapper && root.contains(wrapper)
      ? safeQuerySelectorAll(wrapper, '.fc-slider-el')[0] || null
      : null

  return [
    { element: input, type: 'input' },
    { element: label, type: 'label' },
    { element: slider, type: 'slider' },
  ].filter(({ element }) =>
    element && root.contains(element)
  )
}

function dispatchFundingChoicesPreferenceToggleClick(element, root) {
  if (
    !shouldRunOnThisSite() ||
    !element ||
    !root?.contains?.(element) ||
    processedActionElements.has(element) ||
    !canUsePageActionBudget('fundingChoicesPreferenceToggle')
  ) {
    return false
  }

  processedActionElements.add(element)

  try {
    const eventView =
      element.ownerDocument?.defaultView || window

    if (typeof eventView.PointerEvent === 'function') {
      element.dispatchEvent(
        new eventView.PointerEvent('pointerdown', {
          bubbles: true,
          cancelable: true,
          view: eventView,
          pointerType: 'mouse',
          isPrimary: true,
        })
      )

      element.dispatchEvent(
        new eventView.PointerEvent('pointerup', {
          bubbles: true,
          cancelable: true,
          view: eventView,
          pointerType: 'mouse',
          isPrimary: true,
        })
      )
    }

    element.dispatchEvent(
      new eventView.MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: eventView,
      })
    )

    element.dispatchEvent(
      new eventView.MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        view: eventView,
      })
    )

    element.click()

    element.dispatchEvent(
      new eventView.Event('change', {
        bubbles: true,
        cancelable: true,
      })
    )

    return true
  } catch (error) {
    log('Funding Choices toggle click failed:', error)
    return false
  }
}

function dispatchFundingChoicesKeyboardToggle(input, root, key) {
  if (
    !shouldRunOnThisSite() ||
    !input ||
    !root?.contains?.(input) ||
    !canUsePageActionBudget('fundingChoicesProviderKeyboardToggle')
  ) {
    return false
  }

  try {
    const eventView =
      input.ownerDocument?.defaultView || window
    const keyCode =
      key === 'Enter' ? 13 : 32

    if (typeof input.focus === 'function') {
      input.focus()
    }

    input.dispatchEvent(
      new eventView.KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        view: eventView,
        key,
        code: key === 'Enter' ? 'Enter' : 'Space',
        keyCode,
        which: keyCode,
      })
    )

    input.dispatchEvent(
      new eventView.KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        view: eventView,
        key,
        code: key === 'Enter' ? 'Enter' : 'Space',
        keyCode,
        which: keyCode,
      })
    )

    return true
  } catch (error) {
    log('Funding Choices keyboard toggle failed:', error)
    return false
  }
}

function getFundingChoicesProviderActivationMethods(input, root, preferredMethod = '') {
  const label =
    safeClosest(input, 'label.fc-preference-slider-container')
  const wrapper =
    safeClosest(input, '.fc-preference-slider')
  const slider =
    wrapper && root?.contains?.(wrapper)
      ? safeQuerySelectorAll(wrapper, '.fc-slider-el')[0] || null
      : null
  const methods = [
    {
      name: 'input_pointer_click',
      run: () => dispatchFundingChoicesPreferenceToggleClick(input, root),
    },
    {
      name: 'label_pointer_click',
      run: () => dispatchFundingChoicesPreferenceToggleClick(label, root),
    },
    {
      name: 'wrapper_pointer_click',
      run: () => dispatchFundingChoicesPreferenceToggleClick(wrapper, root),
    },
    {
      name: 'slider_pointer_click',
      run: () => dispatchFundingChoicesPreferenceToggleClick(slider, root),
    },
    {
      name: 'keyboard_space',
      run: () => dispatchFundingChoicesKeyboardToggle(input, root, ' '),
    },
    {
      name: 'keyboard_enter',
      run: () => dispatchFundingChoicesKeyboardToggle(input, root, 'Enter'),
    },
  ].filter((method) =>
    typeof method.run === 'function'
  )

  if (!preferredMethod) return methods

  const preferred =
    methods.find((method) =>
      method.name === preferredMethod
    )

  return preferred
    ? [preferred, ...methods.filter((method) => method !== preferred)]
    : methods
}

function getFundingChoicesMainActivationMethods(input, root, preferredMethod = '') {
  const label =
    safeClosest(input, 'label.fc-preference-slider-container')
  const wrapper =
    safeClosest(input, '.fc-preference-slider')
  const slider =
    wrapper && root?.contains?.(wrapper)
      ? safeQuerySelectorAll(wrapper, '.fc-slider-el')[0] || null
      : null
  const methods = [
    {
      name: 'input_pointer_click',
      run: () => dispatchFundingChoicesPreferenceToggleClick(input, root),
    },
    {
      name: 'label_pointer_click',
      run: () => dispatchFundingChoicesPreferenceToggleClick(label, root),
    },
    {
      name: 'wrapper_pointer_click',
      run: () => dispatchFundingChoicesPreferenceToggleClick(wrapper, root),
    },
    {
      name: 'slider_pointer_click',
      run: () => dispatchFundingChoicesPreferenceToggleClick(slider, root),
    },
    {
      name: 'keyboard_space',
      run: () => dispatchFundingChoicesKeyboardToggle(input, root, ' '),
    },
    {
      name: 'keyboard_enter',
      run: () => dispatchFundingChoicesKeyboardToggle(input, root, 'Enter'),
    },
  ].filter((method) =>
    typeof method.run === 'function'
  )

  if (!preferredMethod) return methods

  const preferred =
    methods.find((method) =>
      method.name === preferredMethod
    )

  return preferred
    ? [preferred, ...methods.filter((method) => method !== preferred)]
    : methods
}

function getFundingChoicesCurrentPreferenceInput(root, key, fallback) {
  return findFundingChoicesPreferenceInputByKey(root, key) || fallback
}

function getFundingChoicesPreferenceToggleInputs(root, startedAt, budgetMs) {
  if (!root) return []

  const inputs = []
  const seen = new Set()
  const selectors = [
    'label.fc-preference-slider-container .fc-preference-slider input[type="checkbox"][role="button"]',
    '.fc-preference-slider input[type="checkbox"][role="button"]',
    '.fc-preference-slider input[type="checkbox"]',
    '.fc-preference-slider [role="button"][aria-pressed]',
    '.fc-preference-slider [aria-checked]',
  ].join(',')

  for (const input of safeQuerySelectorAll(root, selectors)) {
    if (
      inputs.length >= MAX_DIRECT_CONTROL_PRIORITIZATION_INPUT ||
      hasElapsedBudget(startedAt, budgetMs)
    ) {
      break
    }

    if (!input || !root.contains(input) || seen.has(input)) {
      continue
    }

    seen.add(input)

    if (isFundingChoicesPreferenceCategoryToggle(input, root)) {
      inputs.push(input)
    }
  }

  return inputs
}

function handleFundingChoicesPreferenceCategoryToggles(root, options = {}) {
  const startedAt =
    Date.now()
  const scope =
    String(options.scope || 'main')
  const maxClicks =
    Math.max(
      0,
      Number(options.maxClicks) || MAX_FUNDING_CHOICES_TOGGLE_CLICKS
    )
  const preferenceTrace =
    options.preferenceTrace || 'fc.preference_toggles'
  const disableTrace =
    options.disableTrace || 'fc.disable_required_categories'
  const inputs =
    prioritizeFundingChoicesPreferenceToggleInputs(
      getFundingChoicesPreferenceToggleInputs(
        root,
        startedAt,
        FUNDING_CHOICES_SLIDER_SCAN_BUDGET_MS
      ),
      root
    )
  const activeInputs =
    inputs.filter((input) =>
      getFundingChoicesPreferenceToggleState(input) === 'enabled'
    )

  if (scope === 'provider') {
    lastFundingChoicesProviderToggleCount = inputs.length
    lastFundingChoicesActiveProviderToggleCount = activeInputs.length
  } else {
    lastFundingChoicesMainRequiredActiveBefore = activeInputs.length
  }

  const diagnosticInputs =
    scope === 'provider'
      ? inputs.slice(0, MAX_FUNDING_CHOICES_CONTROL_DIAGNOSTICS)
      : (
          activeInputs.length > 0
            ? activeInputs.slice(0, 5)
            : inputs.slice(0, MAX_FUNDING_CHOICES_CONTROL_DIAGNOSTICS)
        )
  const actionDiagnostics =
    new Map()
  const diagnostics =
    diagnosticInputs
      .map((input) => {
        const diagnostic =
          getFundingChoicesPreferenceToggleActionDiagnostic(input, root)

        if (scope === 'provider') {
          diagnostic.scope = 'provider'
        } else {
          diagnostic.scope = 'main'
        }

        if (getFundingChoicesPreferenceToggleState(input) !== 'enabled') {
          diagnostic.skippedReason = 'inactive'
        }

        actionDiagnostics.set(input, diagnostic)
        return diagnostic
      })

  lastFundingChoicesPreferenceToggleActions =
    scope === 'provider'
      ? [
          ...diagnostics,
          ...lastFundingChoicesPreferenceToggleActions,
        ].slice(0, MAX_FUNDING_CHOICES_CONTROL_DIAGNOSTICS)
      : diagnostics

  appendLastDiagnosticDecisionStep({
    strategy: preferenceTrace,
    status: inputs.length > 0 ? 'found' : 'not_found',
    found: inputs.length,
    scanned: inputs.length,
    elapsedMs: Date.now() - startedAt,
    reason: hasElapsedBudget(startedAt, FUNDING_CHOICES_SLIDER_SCAN_BUDGET_MS)
      ? 'budget_capped'
      : '',
  })

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.after_preference_toggles',
    status: 'ran',
    found: inputs.length,
    scanned: inputs.length,
    elapsedMs: Date.now() - startedAt,
    force: true,
  })

  if (
    ENABLE_FC_PROVIDER_AUTOMATION &&
    scope === 'main' &&
    preferenceTrace === 'fc.preference_toggles'
  ) {
    appendLastDiagnosticDecisionStep({
      strategy: 'fc.EXECUTION_REACHED_AFTER_PREFERENCE_TOGGLES',
      status: 'ran',
      found: activeInputs.length,
      scanned: inputs.length,
      elapsedMs: Date.now() - startedAt,
      force: true,
    })
    appendLastDiagnosticDecisionStep({
      strategy: 'fc.before_manage_vendors',
      status: 'ran',
      found: activeInputs.length,
      scanned: inputs.length,
      elapsedMs: Date.now() - startedAt,
      force: true,
    })
    appendLastDiagnosticDecisionStep({
      strategy: 'fc.manage_vendors_normal_flow_invoked',
      status: 'ran',
      found: activeInputs.length,
      scanned: inputs.length,
      elapsedMs: Date.now() - startedAt,
      force: true,
    })
    options.manageVendorsControl =
      findFundingChoicesManageVendorsButton(root, Date.now(), {
        mode: 'normal',
        allowClick: true,
      })
    appendLastDiagnosticDecisionStep({
      strategy: 'fc.after_manage_vendors_lookup',
      status: options.manageVendorsControl ? 'found' : 'not_found',
      found: options.manageVendorsControl ? 1 : 0,
      scanned: 1,
      elapsedMs: Date.now() - startedAt,
      force: true,
    })
  }

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.after_preference_scan',
    status: 'ran',
    found: inputs.length,
    scanned: inputs.length,
    elapsedMs: Date.now() - startedAt,
  })

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.before_required_match',
    status: 'ran',
    found: activeInputs.length,
    scanned: inputs.length,
    elapsedMs: Date.now() - startedAt,
  })

  if (inputs.length === 0) {
    appendLastDiagnosticDecisionStep({
      strategy:
        scope === 'provider'
          ? 'fc.provider_toggles'
          : 'fc.matched_required_toggles',
      status: 'not_found',
      reason:
        scope === 'provider'
          ? 'fc_provider_toggles_not_found'
          : 'fc_matching_required_toggles_not_found',
      found: 0,
      scanned: 0,
      elapsedMs: Date.now() - startedAt,
    })

    return {
      ok: false,
      reason:
        scope === 'provider'
          ? 'fc_provider_toggles_not_safely_handled'
          : 'fc_matching_required_toggles_not_found',
      blockedReason: 'no_matching_preference_sliders',
      disabledCount: 0,
      activeCount: 0,
    }
  }

  let disabledCount = 0
  const mainClickedKeys =
    new Set()

  if (scope !== 'provider') {
    appendLastDiagnosticDecisionStep({
      strategy: 'fc.matched_required_toggles',
      status: activeInputs.length > 0 ? 'found' : 'not_found',
      reason: activeInputs.length > 0
        ? ''
        : 'fc_matching_required_toggles_not_found',
      found: activeInputs.length,
      scanned: inputs.length,
      elapsedMs: Date.now() - startedAt,
    })
  }

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.after_required_match',
    status: 'ran',
    found: activeInputs.length,
    scanned: inputs.length,
    elapsedMs: Date.now() - startedAt,
  })

  for (const input of activeInputs.slice(0, maxClicks)) {
    const actionDiagnostic =
      actionDiagnostics.get(input) ||
      getFundingChoicesPreferenceToggleActionDiagnostic(input, root)

    if (!actionDiagnostics.has(input)) {
      if (scope === 'provider') {
        actionDiagnostic.scope = 'provider'
      }
      lastFundingChoicesPreferenceToggleActions.push(actionDiagnostic)
    }

    if (!shouldRunOnThisSite()) {
      actionDiagnostic.skippedReason = 'site_not_enabled'
      break
    }

    if (!root.contains(input)) {
      actionDiagnostic.skippedReason = 'outside_fc_root'
      continue
    }

    if (
      input.disabled ||
      input.getAttribute?.('disabled') !== null ||
      input.getAttribute?.('aria-disabled') === 'true'
    ) {
      actionDiagnostic.skippedReason = 'disabled'
      continue
    }

    const sliderKey =
      getFundingChoicesSliderKey(input, root)
    let dispatchedForInput = false

    if (scope === 'provider') {
      const providerMethods =
        getFundingChoicesProviderActivationMethods(
          input,
          root,
          lastFundingChoicesProviderToggleMethod
        )

      for (const method of providerMethods) {
        const currentBefore =
          getFundingChoicesCurrentPreferenceInput(root, sliderKey, input)

        if (getFundingChoicesPreferenceToggleState(currentBefore) !== 'enabled') {
          break
        }

        if (!method.run()) {
          continue
        }

        dispatchedForInput = true
        actionDiagnostic.clickTarget =
          actionDiagnostic.clickTarget
            ? `${actionDiagnostic.clickTarget},${method.name}`
            : method.name
        actionDiagnostic.clickDispatched = true
        actionDiagnostic.clicked = true

        const currentAfter =
          getFundingChoicesCurrentPreferenceInput(root, sliderKey, input)
        actionDiagnostic.ariaPressedAfter =
          String(currentAfter?.getAttribute?.('aria-pressed') || '').slice(0, 20)
        actionDiagnostic.checkedAfter =
          Boolean(currentAfter?.checked)

        if (getFundingChoicesPreferenceToggleState(currentAfter) !== 'enabled') {
          disabledCount += 1
          lastFundingChoicesProviderClickedCount += 1
          lastFundingChoicesProviderToggleMethod = method.name
          if (sliderKey) {
            lastFundingChoicesClickedSliderKeys.push(sliderKey)
          }
          break
        }
      }
    } else {
      const clickTargets =
        getFundingChoicesPreferenceClickTargets(input, root)

      if (clickTargets.length === 0) {
        actionDiagnostic.skippedReason = 'click_target_not_found'
        continue
      }

      for (const { element, type } of clickTargets) {
        if (getFundingChoicesPreferenceToggleState(input) !== 'enabled') {
          break
        }

        if (!dispatchFundingChoicesPreferenceToggleClick(element, root)) {
          continue
        }

        dispatchedForInput = true
        actionDiagnostic.clickTarget =
          actionDiagnostic.clickTarget
            ? `${actionDiagnostic.clickTarget},${type}`
            : type
        actionDiagnostic.clickDispatched = true
        actionDiagnostic.clicked = true
        lastFundingChoicesMainClickedCount += 1
        lastFundingChoicesMainToggleMethod =
          lastFundingChoicesMainToggleMethod || type
        if (sliderKey) {
          mainClickedKeys.add(sliderKey)
          if (!lastFundingChoicesClickedSliderKeys.includes(sliderKey)) {
            lastFundingChoicesClickedSliderKeys.push(sliderKey)
          }
        }
        actionDiagnostic.ariaPressedAfter =
          String(
            (findFundingChoicesPreferenceInputByKey(root, sliderKey) || input)
              ?.getAttribute?.('aria-pressed') || ''
          ).slice(0, 20)
        actionDiagnostic.checkedAfter =
          Boolean((findFundingChoicesPreferenceInputByKey(root, sliderKey) || input)?.checked)

        const currentAfter =
          getFundingChoicesCurrentPreferenceInput(root, sliderKey, input)

        if (getFundingChoicesPreferenceToggleState(currentAfter) !== 'enabled') {
          disabledCount += 1
          break
        }
      }
    }

    const refreshedInput =
      findFundingChoicesPreferenceInputByKey(root, sliderKey)
    const currentInput =
      refreshedInput || input
    const clickedInputRemoved =
      scope !== 'provider' &&
      dispatchedForInput &&
      sliderKey &&
      !refreshedInput
    actionDiagnostic.ariaPressedAfter =
      String(currentInput?.getAttribute?.('aria-pressed') || '').slice(0, 20)
    actionDiagnostic.checkedAfter =
      Boolean(currentInput?.checked)
    actionDiagnostic.activeAfter =
      !clickedInputRemoved &&
      getFundingChoicesPreferenceToggleState(currentInput) === 'enabled'
    actionDiagnostic.stillActive =
      actionDiagnostic.activeAfter

    if (actionDiagnostic.stillActive && !actionDiagnostic.skippedReason) {
      actionDiagnostic.skippedReason =
        dispatchedForInput
          ? 'click_did_not_disable'
          : 'click_not_dispatched'
    }

    if (
      scope === 'provider' &&
      actionDiagnostic.stillActive &&
      actionDiagnostic.skippedReason === 'click_did_not_disable'
    ) {
      actionDiagnostic.skippedReason =
        dispatchedForInput
          ? 'provider_toggle_activation_method_not_found'
          : 'provider_toggle_click_failed'
    }
  }

  const mainToggleMethodFound =
    scope !== 'provider' &&
    (
      disabledCount > 0 ||
      lastFundingChoicesMainClickedCount > 0 ||
      Boolean(lastFundingChoicesMainToggleMethod)
    )

  if (scope === 'provider') {
    appendLastDiagnosticDecisionStep({
      strategy: 'fc.provider_toggle_method',
      status: disabledCount > 0 ? 'found' : 'not_found',
      reason:
        disabledCount > 0
          ? lastFundingChoicesProviderToggleMethod
          : 'provider_toggle_activation_method_not_found',
      found: disabledCount,
      scanned: activeInputs.length,
      elapsedMs: Date.now() - startedAt,
    })
  } else {
    appendLastDiagnosticDecisionStep({
      strategy: 'fc.main_toggle_method',
      status: mainToggleMethodFound ? 'found' : 'not_found',
      reason:
        mainToggleMethodFound
          ? lastFundingChoicesMainToggleMethod
          : 'fc_main_toggle_activation_method_not_found',
      found: disabledCount,
      scanned: activeInputs.length,
      elapsedMs: Date.now() - startedAt,
    })
  }

  const mainPanelTransitionedToProvider =
    scope !== 'provider' &&
    lastFundingChoicesMainClickedCount > 0 &&
    isCurrentFundingChoicesProviderPreferencesPanel(root)
  const remainingActive =
    mainPanelTransitionedToProvider
      ? []
      : prioritizeFundingChoicesPreferenceToggleInputs(
          getFundingChoicesPreferenceToggleInputs(
            root,
            Date.now(),
            FUNDING_CHOICES_SLIDER_SCAN_BUDGET_MS
          ),
          root
        )
          .filter((input) =>
            getFundingChoicesPreferenceToggleState(input) === 'enabled'
          )
  const remainingActiveKeys =
    new Set(
      remainingActive
        .map((input) =>
          getFundingChoicesSliderKey(input, root)
        )
        .filter(Boolean)
    )
  const clickedInactiveCount =
    scope === 'provider'
      ? 0
      : Array.from(mainClickedKeys)
          .filter((key) => !remainingActiveKeys.has(key))
          .length

  if (scope !== 'provider' && clickedInactiveCount > disabledCount) {
    disabledCount = clickedInactiveCount
  }

  if (scope === 'provider') {
    lastFundingChoicesActiveProviderToggleCount = remainingActive.length
  } else {
    lastFundingChoicesMainRequiredActiveAfter =
      mainPanelTransitionedToProvider
        ? 0
        : remainingActive.length
  }

  const incompleteDisable =
    (
      !mainPanelTransitionedToProvider &&
      activeInputs.length > disabledCount
    ) ||
    hasElapsedBudget(startedAt, FUNDING_CHOICES_SLIDER_SCAN_BUDGET_MS)
  const effectiveRemainingActiveCount =
    mainPanelTransitionedToProvider
      ? 0
      : remainingActive.length
  const mainPanelTransitionReason =
    mainPanelTransitionedToProvider
      ? 'fc_main_toggles_clicked_panel_transitioned'
      : ''

  appendLastDiagnosticDecisionStep({
    strategy: disableTrace,
    status:
      mainPanelTransitionedToProvider
        ? 'done'
        : effectiveRemainingActiveCount === 0 && !incompleteDisable
        ? 'done'
        : 'blocked',
    found: disabledCount,
    scanned: activeInputs.length,
    elapsedMs: Date.now() - startedAt,
      reason:
        mainPanelTransitionReason ||
        (effectiveRemainingActiveCount > 0 || incompleteDisable
        ? scope === 'provider' && disabledCount === 0 && activeInputs.length > 0
          ? 'provider_toggle_activation_method_not_found'
          : scope !== 'provider' && !mainToggleMethodFound && activeInputs.length > 0
          ? 'fc_main_toggle_activation_method_not_found'
          : 'fc_required_toggles_still_active'
        : ''),
  })

  if (mainPanelTransitionedToProvider) {
    return {
      ok: false,
      reason: 'fc_main_toggles_clicked_panel_transitioned',
      blockedReason: 'provider_preferences_panel',
      disabledCount,
      activeCount: activeInputs.length,
    }
  }

  if (remainingActive.length > 0 || incompleteDisable) {
    appendLastDiagnosticDecisionStep({
      strategy: `${disableTrace}.return`,
      status: 'skipped',
      reason:
        scope === 'provider' && disabledCount === 0 && activeInputs.length > 0
          ? 'provider_toggle_activation_method_not_found'
          : scope !== 'provider' && !mainToggleMethodFound && activeInputs.length > 0
          ? 'fc_main_toggle_activation_method_not_found'
          : scope === 'provider'
          ? 'fc_provider_toggles_still_active'
          : 'fc_required_toggles_still_active',
      found: remainingActive.length,
      scanned: activeInputs.length,
      elapsedMs: Date.now() - startedAt,
    })

    return {
      ok: false,
      reason:
        scope === 'provider' && disabledCount === 0 && activeInputs.length > 0
          ? 'provider_toggle_activation_method_not_found'
          : scope !== 'provider' && !mainToggleMethodFound && activeInputs.length > 0
          ? 'fc_main_toggle_activation_method_not_found'
          : scope === 'provider'
          ? 'fc_provider_toggles_still_active'
          : 'fc_required_toggles_still_active',
      blockedReason:
        scope === 'provider' && disabledCount === 0 && activeInputs.length > 0
          ? 'provider_toggle_activation_method_not_found'
          : scope !== 'provider' && !mainToggleMethodFound && activeInputs.length > 0
          ? 'fc_main_toggle_activation_method_not_found'
          : 'matching_toggles_still_active',
      disabledCount,
      activeCount: activeInputs.length,
    }
  }

  return {
    ok: true,
    reason: '',
    blockedReason: '',
    disabledCount,
    activeCount: activeInputs.length,
  }
}

function isFundingChoicesProviderToggleOnScreen(input, root) {
  if (!input || !root?.contains?.(input)) return false

  const targets =
    getFundingChoicesPreferenceClickTargets(input, root)

  return targets.some(({ element }) =>
    element && isElementInViewport(element)
  )
}

function getBoundedFundingChoicesProviderToggleInputs(root, startedAt) {
  if (!root) return []

  const selectors = [
    'label.fc-preference-slider-container .fc-preference-slider input[type="checkbox"][role="button"]',
    '.fc-preference-slider input[type="checkbox"][role="button"]',
    '.fc-preference-slider input[type="checkbox"]',
    '.fc-preference-slider [role="button"][aria-pressed]',
    '.fc-preference-slider [aria-checked]',
  ].join(',')
  const inputs = []
  const seen = new Set()

  for (const input of safeQuerySelectorAll(root, selectors)) {
    if (
      inputs.length >= MAX_FUNDING_CHOICES_PROVIDER_TOGGLE_INSPECT ||
      hasElapsedBudget(startedAt, FUNDING_CHOICES_PROVIDER_TOGGLE_BUDGET_MS)
    ) {
      break
    }

    if (!input || !root.contains(input) || seen.has(input)) {
      continue
    }

    seen.add(input)
    inputs.push(input)
  }

  return inputs
}

function handleFundingChoicesProviderPanelToggles(root) {
  const startedAt =
    Date.now()
  const inputs =
    getBoundedFundingChoicesProviderToggleInputs(root, startedAt)
  const activeInputs =
    inputs.filter((input) =>
      getFundingChoicesPreferenceToggleState(input) === 'enabled'
    )
  const prioritizedActiveInputs =
    [...activeInputs].sort((first, second) =>
      Number(isFundingChoicesProviderToggleOnScreen(second, root)) -
      Number(isFundingChoicesProviderToggleOnScreen(first, root))
    )
  const diagnostics =
    inputs
      .slice(0, MAX_FUNDING_CHOICES_CONTROL_DIAGNOSTICS)
      .map((input) => {
        const diagnostic =
          getFundingChoicesPreferenceToggleActionDiagnostic(input, root)
        diagnostic.scope = 'provider'
        if (getFundingChoicesPreferenceToggleState(input) !== 'enabled') {
          diagnostic.skippedReason = 'inactive'
        }
        return diagnostic
      })
  const actionDiagnostics =
    new Map(
      diagnostics.map((diagnostic, index) => [
        inputs[index],
        diagnostic,
      ])
    )

  lastFundingChoicesProviderToggleCount = inputs.length
  lastFundingChoicesActiveProviderToggleCount = activeInputs.length
  lastFundingChoicesProviderInspectedCount = inputs.length
  lastFundingChoicesProviderActiveFoundCount = activeInputs.length
  lastFundingChoicesProviderTimeBudgetExceeded = false
  lastFundingChoicesPreferenceToggleActions = [
    ...diagnostics,
    ...lastFundingChoicesPreferenceToggleActions,
  ].slice(0, MAX_FUNDING_CHOICES_CONTROL_DIAGNOSTICS)

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.provider_toggles',
    status: inputs.length > 0 ? 'found' : 'not_found',
    found: inputs.length,
    scanned: inputs.length,
    elapsedMs: Date.now() - startedAt,
  })

  if (inputs.length === 0) {
    return {
      ok: false,
      reason: 'fc_provider_toggles_not_found',
      blockedReason: 'no_matching_preference_sliders',
      disabledCount: 0,
      activeCount: 0,
    }
  }

  let disabledCount = 0

  for (const input of prioritizedActiveInputs.slice(0, MAX_FUNDING_CHOICES_PROVIDER_ACTIVE_CLICKS)) {
    if (hasElapsedBudget(startedAt, FUNDING_CHOICES_PROVIDER_TOGGLE_BUDGET_MS)) {
      lastFundingChoicesProviderTimeBudgetExceeded = true
      break
    }

    const diagnostic =
      actionDiagnostics.get(input) ||
      getFundingChoicesPreferenceToggleActionDiagnostic(input, root)
    diagnostic.scope = 'provider'

    const sliderKey =
      getFundingChoicesSliderKey(input, root)
    const providerMethods =
      getFundingChoicesProviderActivationMethods(
        input,
        root,
        lastFundingChoicesProviderToggleMethod
      )
    let dispatched = false

    for (const method of providerMethods) {
      if (hasElapsedBudget(startedAt, FUNDING_CHOICES_PROVIDER_TOGGLE_BUDGET_MS)) {
        lastFundingChoicesProviderTimeBudgetExceeded = true
        break
      }

      if (getFundingChoicesPreferenceToggleState(input) !== 'enabled') {
        break
      }

      if (!method.run()) {
        continue
      }

      dispatched = true
      diagnostic.clickTarget =
        diagnostic.clickTarget
          ? `${diagnostic.clickTarget},${method.name}`
          : method.name
      diagnostic.clickDispatched = true
      diagnostic.clicked = true

      diagnostic.ariaPressedAfter =
        String(input?.getAttribute?.('aria-pressed') || '').slice(0, 20)
      diagnostic.checkedAfter =
        Boolean(input?.checked)
      diagnostic.activeAfter =
        getFundingChoicesPreferenceToggleState(input) === 'enabled'
      diagnostic.stillActive =
        diagnostic.activeAfter

      if (!diagnostic.activeAfter) {
        disabledCount += 1
        lastFundingChoicesProviderClickedCount += 1
        lastFundingChoicesProviderToggleMethod = method.name
        if (sliderKey) {
          lastFundingChoicesClickedSliderKeys.push(sliderKey)
        }
        break
      }
    }

    if (diagnostic.stillActive && !diagnostic.skippedReason) {
      diagnostic.skippedReason =
        dispatched
          ? 'provider_toggle_activation_method_not_found'
          : 'provider_toggle_click_failed'
    }
  }

  if (hasElapsedBudget(startedAt, FUNDING_CHOICES_PROVIDER_TOGGLE_BUDGET_MS)) {
    lastFundingChoicesProviderTimeBudgetExceeded = true
  }

  const remainingActiveVisible =
    inputs.filter((input) =>
      getFundingChoicesPreferenceToggleState(input) === 'enabled' &&
      isFundingChoicesProviderToggleOnScreen(input, root)
    )

  lastFundingChoicesActiveProviderToggleCount = remainingActiveVisible.length

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.disable_provider_toggles',
    status:
      remainingActiveVisible.length === 0 &&
      !lastFundingChoicesProviderTimeBudgetExceeded
        ? 'done'
        : 'blocked',
    reason:
      lastFundingChoicesProviderTimeBudgetExceeded
        ? 'budget_capped'
        : remainingActiveVisible.length > 0
        ? 'active_visible_provider_toggles_remain'
        : '',
    found: disabledCount,
    scanned: inputs.length,
    elapsedMs: Date.now() - startedAt,
  })

  if (remainingActiveVisible.length === 0 && !lastFundingChoicesProviderTimeBudgetExceeded) {
    return {
      ok: true,
      reason: '',
      blockedReason: '',
      disabledCount,
      activeCount: activeInputs.length,
    }
  }

  return {
    ok: false,
    reason:
      lastFundingChoicesProviderTimeBudgetExceeded && disabledCount > 0
        ? 'fc_provider_partial_disable_budget_capped'
        : 'fc_provider_toggle_click_failed',
    blockedReason:
      lastFundingChoicesProviderTimeBudgetExceeded
        ? 'budget_capped'
        : 'provider_toggle_click_failed',
    disabledCount,
    activeCount: activeInputs.length,
  }
}

function getFundingChoicesToggleClickTarget(control, root) {
  if (!control || !root || !root.contains(control)) return null

  const sliderInput =
    getFundingChoicesSliderInput(control, root)

  if (sliderInput) {
    return sliderInput
  }

  const directOwner =
    safeClosest(
      control,
      'button, label, [role="switch"], [role="checkbox"], [aria-checked], [aria-pressed], input[type="checkbox"], input[type="radio"]'
    )

  if (directOwner && root.contains(directOwner)) {
    return directOwner
  }

  let current =
    control.parentElement
  let depth = 0

  while (
    current &&
    current !== root &&
    root.contains(current) &&
    depth < 5
  ) {
    if (
      typeof current.click === 'function' &&
      (
        current.getAttribute?.('onclick') ||
        current.getAttribute?.('tabindex') ||
        textHasAny(getClassNameText(current), [
          'fc slider',
          'fc toggle',
          'slider',
          'toggle',
          'switch',
        ]) ||
        safeQuerySelectorAll(current, 'input[type="checkbox"], input[type="radio"], [role="switch"], [role="checkbox"], [aria-checked], [aria-pressed]').length > 0
      )
    ) {
      return current
    }

    current = current.parentElement
    depth += 1
  }

  return null
}

function getFundingChoicesToggleContextText(control, root) {
  const sliderInput =
    getFundingChoicesSliderInput(control, root)
  const parts = [
    sliderInput?.getAttribute?.('aria-label'),
    getActionText(control),
    getActionText(sliderInput),
    getAssociatedLabelText(control),
    getAssociatedLabelText(sliderInput),
    getPreferenceDecisionText(control),
    getNearbyPreferenceText(control),
  ]
  let current =
    control?.parentElement || null
  let depth = 0

  while (
    current &&
    current !== root &&
    root?.contains?.(current) &&
    depth < 4
  ) {
    parts.push(getActionText(current).slice(0, 300))
    parts.push(getText(current).slice(0, 500))
    current = current.parentElement
    depth += 1
  }

  return normalizeMatchText(parts.join(' '))
}

function getFundingChoicesToggleState(control, root) {
  const sliderInput =
    getFundingChoicesSliderInput(control, root)
  const target =
    getFundingChoicesToggleClickTarget(control, root)
  const classSignal =
    normalizeMatchText([
      getClassNameText(control),
      getClassNameText(target),
      getClassNameText(control?.parentElement),
      getClassNameText(target?.parentElement),
      getClassNameText(control?.parentElement?.parentElement),
      getClassNameText(target?.parentElement?.parentElement),
    ].join(' '))
  const ariaChecked =
    normalizeMatchText(
      sliderInput?.getAttribute?.('aria-checked') ||
        control?.getAttribute?.('aria-checked') ||
        target?.getAttribute?.('aria-checked') ||
        ''
    )
  const ariaPressed =
    normalizeMatchText(
      sliderInput?.getAttribute?.('aria-pressed') ||
        control?.getAttribute?.('aria-pressed') ||
        target?.getAttribute?.('aria-pressed') ||
        ''
    )
  const dataState =
    normalizeMatchText(
      control?.getAttribute?.('data-state') ||
        target?.getAttribute?.('data-state') ||
        ''
    )
  const dataChecked =
    normalizeMatchText(
      control?.getAttribute?.('data-checked') ||
        target?.getAttribute?.('data-checked') ||
        ''
    )

  if (
    ariaChecked === 'false' ||
    ariaPressed === 'false' ||
    dataState === 'off' ||
    dataState === 'unchecked' ||
    dataState === 'inactive' ||
    dataChecked === 'false'
  ) {
    return 'disabled'
  }

  if (
    sliderInput?.checked === true ||
    control?.checked === true ||
    target?.checked === true ||
    ariaChecked === 'true' ||
    ariaPressed === 'true' ||
    dataState === 'on' ||
    dataState === 'checked' ||
    dataState === 'active' ||
    dataChecked === 'true' ||
    textHasAny(classSignal, [
      'active',
      'checked',
      'enabled',
      'selected',
      'on',
      'switch on',
      'toggle on',
      'slider on',
      'is active',
      'is checked',
    ]) ||
    isConsentToggleEnabled(target) ||
    isToggleEnabled(target)
  ) {
    return 'enabled'
  }

  if (
    textHasAny(classSignal, [
      'fc slider active',
      'fc active',
      'fc selected',
      'slider active',
      'slider selected',
    ])
  ) {
    return 'enabled'
  }

  return 'unknown'
}

function getFundingChoicesToggleSafety(control, root) {
  const target =
    getFundingChoicesToggleClickTarget(control, root)
  const contextText =
    getFundingChoicesToggleContextText(control, root)
  const state =
    getFundingChoicesToggleState(control, root)

  if (!control || !root || !root.contains(control)) {
    return { state, safe: false, reason: 'outside_fc_root', target }
  }

  if (!target || !root.contains(target)) {
    return { state, safe: false, reason: 'missing_click_target', target }
  }

  if (!isVisible(control) && !isVisible(target)) {
    return { state, safe: false, reason: 'not_visible', target }
  }

  if (
    target.disabled ||
    target.getAttribute?.('disabled') !== null ||
    target.getAttribute?.('aria-disabled') === 'true'
  ) {
    return { state, safe: false, reason: 'disabled', target }
  }

  if (state !== 'enabled') {
    return { state, safe: false, reason: 'not_active', target }
  }

  if (textHasAny(contextText, fundingChoicesRequiredToggleTexts)) {
    return { state, safe: false, reason: 'required_or_essential', target }
  }

  if (!textHasAny(contextText, fundingChoicesOptionalToggleTexts)) {
    return { state, safe: false, reason: 'optional_context_not_clear', target }
  }

  if (isSensitiveActionControl(target, root)) {
    return { state, safe: false, reason: 'sensitive_context', target }
  }

  return { state, safe: true, reason: '', target }
}

function getFundingChoicesToggleCandidates(root) {
  if (!root) return []

  const startedAt =
    Date.now()
  const selector =
    [
      '.fc-slider-el',
      '[role="switch"]',
      '[role="checkbox"]',
      '[aria-checked]',
      '[aria-pressed]',
      'input[type="checkbox"]',
      'input[type="radio"]',
      '[class*="toggle" i]',
      '[class*="switch" i]',
      '[class*="slider" i]',
    ].join(',')
  const controls = []
  const seenTargets = new Set()
  const seenKeys = new Set()

  for (const control of safeQuerySelectorAll(root, selector)) {
    if (
      controls.length >= MAX_DIRECT_CONTROL_PRIORITIZATION_INPUT ||
      hasElapsedBudget(startedAt, FUNDING_CHOICES_SLIDER_SCAN_BUDGET_MS)
    ) {
      break
    }

    if (!root.contains(control) || !isFundingChoicesToggleLike(control)) {
      continue
    }

    const target =
      getFundingChoicesToggleClickTarget(control, root)
    const sliderKey =
      getFundingChoicesSliderKey(control, root)

    if (
      (target && seenTargets.has(target)) ||
      (sliderKey && seenKeys.has(sliderKey))
    ) {
      continue
    }

    if (isVisible(control) || (target && isVisible(target))) {
      if (target) {
        seenTargets.add(target)
      }
      if (sliderKey) {
        seenKeys.add(sliderKey)
      }
      controls.push(control)
    }
  }

  return uniqueElements(controls)
}

function handleFundingChoicesActiveToggles(root) {
  const startedAt =
    Date.now()
  const toggles =
    getFundingChoicesToggleCandidates(root)
  const activeToggles =
    toggles
      .map((control) => ({
        control,
        safety: getFundingChoicesToggleSafety(control, root),
      }))
      .filter(({ safety }) =>
        safety.state === 'enabled'
      )

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.active_toggles',
    status: activeToggles.length > 0 ? 'found' : 'not_found',
    found: activeToggles.length,
    scanned: toggles.length,
    elapsedMs: Date.now() - startedAt,
    reason: hasElapsedBudget(startedAt, FUNDING_CHOICES_SLIDER_SCAN_BUDGET_MS)
      ? 'budget_capped'
      : '',
  })

  const unsafeActiveToggle =
    activeToggles.find(({ safety }) => !safety.safe)

  if (unsafeActiveToggle) {
    const terminalReason =
      unsafeActiveToggle.safety.reason === 'missing_click_target'
        ? 'fc_slider_owner_not_found'
        : 'fc_active_toggles_not_safely_handled'

    appendLastDiagnosticDecisionStep({
      strategy: 'fc.disable_toggles',
      status: 'skipped',
      reason: unsafeActiveToggle.safety.reason,
      found: 0,
      scanned: activeToggles.length,
      elapsedMs: Date.now() - startedAt,
    })

    return {
      ok: false,
      reason: terminalReason,
      blockedReason: unsafeActiveToggle.safety.reason,
      disabledCount: 0,
      activeCount: activeToggles.length,
    }
  }

  let disabledCount = 0

  for (const { control, safety } of activeToggles.slice(0, MAX_FUNDING_CHOICES_TOGGLE_CLICKS)) {
    if (!shouldRunOnThisSite()) break
    if (!safety.safe || !safety.target) continue

    if (clickElementSafely(safety.target)) {
      disabledCount += 1
      const key =
        getFundingChoicesSliderKey(control, root)
      if (key) {
        lastFundingChoicesClickedSliderKeys.push(key)
      }
      incrementStat('trackersReduced')
    }
  }

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.disable_toggles',
    status:
      activeToggles.length === 0 || disabledCount === activeToggles.length
        ? 'done'
        : 'partial',
    found: disabledCount,
    scanned: activeToggles.length,
    elapsedMs: Date.now() - startedAt,
  })

  const remainingActiveToggles =
    getFundingChoicesToggleCandidates(root)
      .map((control) => ({
        control,
        safety: getFundingChoicesToggleSafety(control, root),
      }))
      .filter(({ safety }) =>
        safety.state === 'enabled' &&
        safety.safe
      )

  if (
    disabledCount < activeToggles.length ||
    remainingActiveToggles.length > 0
  ) {
    return {
      ok: false,
      reason: 'fc_active_toggles_not_safely_handled',
      blockedReason:
        remainingActiveToggles.length > 0
          ? 'active_optional_toggles_remaining'
          : 'toggle_click_failed_or_capped',
      disabledCount,
      activeCount: activeToggles.length,
    }
  }

  return {
    ok: true,
    reason: '',
    blockedReason: '',
    disabledCount,
    activeCount: activeToggles.length,
  }
}

function isFundingChoicesToggleLike(control) {
  if (!control) return false

  const role =
    normalizeMatchText(control.getAttribute?.('role') || '')
  const type =
    normalizeMatchText(control.getAttribute?.('type') || '')
  const signal =
    normalizeMatchText([
      role,
      type,
      control.getAttribute?.('aria-checked'),
      control.getAttribute?.('aria-pressed'),
      control.getAttribute?.('data-checked'),
      getClassNameText(control),
    ].join(' '))

  return (
    role === 'switch' ||
    role === 'checkbox' ||
    type === 'checkbox' ||
    textHasAny(signal, ['toggle', 'switch', 'checkbox', 'slider'])
  )
}

function getFundingChoicesBlockedReason(control, root) {
  if (!control) return 'missing_control'
  if (!root || !root.contains(control)) return 'outside_fc_root'
  if (!isVisible(control)) return 'not_visible'
  if (isInsideNonCookieModal(control)) return 'non_cookie_modal'
  if (isSensitiveActionControl(control, root)) return 'sensitive_context'

  const text =
    getActionText(control)
  const hasNegativeConsent =
    textHasAny(text, negativeConsentRejectTexts)

  if (
    !hasNegativeConsent &&
    (
      hasUnsafeAcceptText(control) ||
      textHasAny(text, fundingChoicesUnsafePositiveTexts)
    )
  ) {
    return 'accept_or_positive_consent'
  }

  return ''
}

function getFundingChoicesControlDiagnostic(control, root) {
  const text =
    getActionText(control)
  const sliderDiagnostic =
    getFundingChoicesSliderDiagnostic(control, root)
  const sliderKey =
    getFundingChoicesSliderKey(control, root)
  const owner =
    getFundingChoicesToggleClickTarget(control, root)
  const safety =
    isFundingChoicesToggleLike(control)
      ? getFundingChoicesToggleSafety(control, root)
      : null
  const saveIntent =
    textMatchesLightweightSettingsSave(text) ||
    textMatchesDictionaryCookieIntent(text, 'savePreferences')
  const rejectIntent =
    textHasAny(text, fundingChoicesSafeActionTexts) ||
    textMatchesDictionaryCookieIntent(text, 'rejectAll')
  const acceptIntent =
    textHasAny(text, fundingChoicesUnsafePositiveTexts) ||
    textMatchesDictionaryCookieIntent(text, 'acceptAll')

  return {
    tagName:
      control?.tagName?.toLowerCase?.() || '',
    role:
      String(control?.getAttribute?.('role') || '').slice(0, 40),
    text:
      normalizeMatchText(text).slice(0, 90),
    visible:
      Boolean(control && (isVisible(control) || (owner && isVisible(owner)))),
    toggleLike:
      isFundingChoicesToggleLike(control),
    checked:
      String(
        control?.checked ??
          control?.getAttribute?.('aria-checked') ??
          control?.getAttribute?.('aria-pressed') ??
          ''
      ).slice(0, 20),
    sliderState:
      String(safety?.state || '').slice(0, 20),
    sliderWrapperFound:
      Boolean(sliderDiagnostic.wrapperFound),
    sliderInputFound:
      Boolean(sliderDiagnostic.inputFound),
    ariaPressed:
      String(sliderDiagnostic.ariaPressed || '').slice(0, 20),
    ariaLabel:
      String(sliderDiagnostic.ariaLabel || '').slice(0, 90),
    active:
      safety?.state === 'enabled',
    clicked:
      Boolean(sliderKey && lastFundingChoicesClickedSliderKeys.includes(sliderKey)),
    clickableOwnerFound:
      Boolean(owner),
    ownerText:
      normalizeMatchText(getActionText(owner)).slice(0, 90),
    rejectIntent:
      Boolean(rejectIntent && !acceptIntent),
    saveIntent:
      Boolean(saveIntent && !acceptIntent),
    acceptIntent:
      Boolean(acceptIntent),
    blockedReason:
      String(safety?.reason || getFundingChoicesBlockedReason(control, root)).slice(0, 80),
  }
}

function collectFundingChoicesControlDiagnostics(root) {
  if (!root) {
    lastFundingChoicesControlDiagnostics = null
    return null
  }

  const sliders =
    getFundingChoicesToggleCandidates(root)
  const activeSliders =
    sliders.filter((control) =>
      getFundingChoicesToggleState(control, root) === 'enabled'
    )
  const clickableOwnerCount =
    sliders.filter((control) =>
      Boolean(getFundingChoicesToggleClickTarget(control, root))
    ).length
  const preferenceToggleInputs =
    prioritizeFundingChoicesPreferenceToggleInputs(
      getFundingChoicesPreferenceToggleInputs(
        root,
        Date.now(),
        FUNDING_CHOICES_SLIDER_SCAN_BUDGET_MS
      ),
      root
    )
  const activePreferenceToggleCount =
    preferenceToggleInputs.filter((input) =>
      getFundingChoicesPreferenceToggleState(input) === 'enabled'
    ).length
  const preferenceToggleActions =
    (
      lastFundingChoicesPreferenceToggleActions.length > 0
        ? lastFundingChoicesPreferenceToggleActions
        : preferenceToggleInputs.map((input) => {
            const diagnostic =
              getFundingChoicesPreferenceToggleActionDiagnostic(input, root)

            if (!diagnostic.activeBefore) {
              diagnostic.skippedReason = 'inactive'
            }

            return diagnostic
          })
    )
      .slice(0, MAX_FUNDING_CHOICES_CONTROL_DIAGNOSTICS)
  const controls =
    uniqueElements([
      ...sliders,
      ...getDirectClickableControls(root)
        .filter((control) =>
          root.contains(control) &&
          isVisible(control)
        ),
    ])
      .slice(0, MAX_FUNDING_CHOICES_CONTROL_DIAGNOSTICS)
      .map((control) =>
        getFundingChoicesControlDiagnostic(control, root)
      )

  lastFundingChoicesControlDiagnostics = {
    collectedAt: new Date().toISOString(),
    controlCount: controls.length,
    sliderCount: sliders.length,
    activeSliderCount: activeSliders.length,
    preferenceToggleCount: preferenceToggleInputs.length,
    activePreferenceToggleCount,
    mainRequiredActiveBefore: lastFundingChoicesMainRequiredActiveBefore,
    mainRequiredActiveAfter: lastFundingChoicesMainRequiredActiveAfter,
    mainClickedCount: lastFundingChoicesMainClickedCount,
    mainToggleMethod: lastFundingChoicesMainToggleMethod,
    providerPreferenceOpened: lastFundingChoicesProviderPreferenceOpened,
    providerToggleCount: lastFundingChoicesProviderToggleCount,
    activeProviderToggleCount: lastFundingChoicesActiveProviderToggleCount,
    providerInspectedCount: lastFundingChoicesProviderInspectedCount,
    providerActiveFoundCount: lastFundingChoicesProviderActiveFoundCount,
    providerClickedCount: lastFundingChoicesProviderClickedCount,
    providerTimeBudgetExceeded: lastFundingChoicesProviderTimeBudgetExceeded,
    providerToggleMethod: lastFundingChoicesProviderToggleMethod,
    providerPreferenceTextMatch: lastFundingChoicesProviderPreferenceTextMatch,
    providerPreferenceClickableTargetTag: lastFundingChoicesProviderPreferenceClickableTargetTag,
    providerPreferenceClickMethod: lastFundingChoicesProviderPreferenceClickMethod,
    providerPreferenceClickSuccess: lastFundingChoicesProviderPreferenceClickSuccess,
    providerPreferenceScrollAttempts: lastFundingChoicesProviderPreferenceScrollAttempts,
    providerPreferenceScrollTop: lastFundingChoicesProviderPreferenceScrollTop,
    providerManageVendorsSelectorExecuted: lastFundingChoicesProviderManageVendorsSelectorExecuted,
    providerManageVendorsFoundImmediate: lastFundingChoicesProviderManageVendorsFoundImmediate,
    providerManageVendorsFound300ms: lastFundingChoicesProviderManageVendorsFound300ms,
    providerManageVendorsFound800ms: lastFundingChoicesProviderManageVendorsFound800ms,
    providerManageVendorsFound1500ms: lastFundingChoicesProviderManageVendorsFound1500ms,
    providerManageVendorsCountImmediate: lastFundingChoicesProviderManageVendorsCountImmediate,
    providerManageVendorsCount300ms: lastFundingChoicesProviderManageVendorsCount300ms,
    providerManageVendorsCount800ms: lastFundingChoicesProviderManageVendorsCount800ms,
    providerManageVendorsCount1500ms: lastFundingChoicesProviderManageVendorsCount1500ms,
    providerManageVendorsFoundDelayed: lastFundingChoicesProviderManageVendorsFoundDelayed,
    providerManageVendorsElement: lastFundingChoicesProviderManageVendorsElementDiagnostics,
    manageVendorsRejectedReason: lastFundingChoicesProviderManageVendorsRejectedReason,
    manageVendorsSensitiveBypass: lastFundingChoicesProviderManageVendorsSensitiveBypass,
    manageVendorsMode: lastFundingChoicesProviderManageVendorsMode,
    manageVendorsAllowClick: lastFundingChoicesProviderManageVendorsAllowClick,
    providerManageVendorsFound: lastFundingChoicesProviderManageVendorsFound,
    providerManageVendorsClicked: lastFundingChoicesProviderManageVendorsClicked,
    clickableOwnerCount,
    preferenceToggleActions,
    controls,
  }

  return lastFundingChoicesControlDiagnostics
}

function getFundingChoicesLightweightControlDiagnostic(control) {
  const meta =
    getSafeElementMeta(control)

  return {
    tagName: meta.tagName,
    role:
      String(control?.getAttribute?.('role') || '').slice(0, 40),
    text:
      normalizeMatchText(getActionText(control)).slice(0, 90),
    visible:
      Boolean(control && isVisible(control)),
    toggleLike:
      Boolean(
        control?.matches?.(
          '.fc-slider-el, [role="switch"], [role="checkbox"], [aria-checked], [aria-pressed], input[type="checkbox"], input[type="radio"]'
        )
      ),
    checked:
      String(
        control?.checked ??
          control?.getAttribute?.('aria-checked') ??
          control?.getAttribute?.('aria-pressed') ??
          ''
      ).slice(0, 20),
    sliderState: '',
    sliderWrapperFound: false,
    sliderInputFound: false,
    ariaPressed:
      String(control?.getAttribute?.('aria-pressed') || '').slice(0, 20),
    ariaLabel:
      normalizeMatchText(control?.getAttribute?.('aria-label') || '').slice(0, 90),
    active:
      false,
    clicked:
      false,
    clickableOwnerFound:
      false,
    ownerText:
      '',
    rejectIntent:
      false,
    saveIntent:
      false,
    acceptIntent:
      textHasAny(getActionText(control), fundingChoicesUnsafePositiveTexts),
    blockedReason:
      '',
  }
}

function collectFundingChoicesLightweightControlDiagnostics(root) {
  if (!root) {
    lastFundingChoicesControlDiagnostics = null
    return null
  }

  const controls =
    safeQuerySelectorAll(
      root,
      'button, a, [role="button"], [tabindex], input[type="checkbox"], [aria-pressed], [aria-checked], .fc-slider-el'
    )
      .filter((control) =>
        root.contains(control) &&
        isVisible(control)
      )
      .slice(0, MAX_FUNDING_CHOICES_CONTROL_DIAGNOSTICS)
      .map(getFundingChoicesLightweightControlDiagnostic)

  lastFundingChoicesControlDiagnostics = {
    collectedAt: new Date().toISOString(),
    controlCount: controls.length,
    sliderCount: 0,
    activeSliderCount: 0,
    preferenceToggleCount: 0,
    activePreferenceToggleCount: 0,
    mainRequiredActiveBefore: lastFundingChoicesMainRequiredActiveBefore,
    mainRequiredActiveAfter: lastFundingChoicesMainRequiredActiveAfter,
    mainClickedCount: lastFundingChoicesMainClickedCount,
    mainToggleMethod: lastFundingChoicesMainToggleMethod,
    providerPreferenceOpened: lastFundingChoicesProviderPreferenceOpened,
    providerToggleCount: lastFundingChoicesProviderToggleCount,
    activeProviderToggleCount: lastFundingChoicesActiveProviderToggleCount,
    providerInspectedCount: lastFundingChoicesProviderInspectedCount,
    providerActiveFoundCount: lastFundingChoicesProviderActiveFoundCount,
    providerClickedCount: lastFundingChoicesProviderClickedCount,
    providerTimeBudgetExceeded: lastFundingChoicesProviderTimeBudgetExceeded,
    providerToggleMethod: lastFundingChoicesProviderToggleMethod,
    providerPreferenceTextMatch: lastFundingChoicesProviderPreferenceTextMatch,
    providerPreferenceClickableTargetTag: lastFundingChoicesProviderPreferenceClickableTargetTag,
    providerPreferenceClickMethod: lastFundingChoicesProviderPreferenceClickMethod,
    providerPreferenceClickSuccess: lastFundingChoicesProviderPreferenceClickSuccess,
    providerPreferenceScrollAttempts: lastFundingChoicesProviderPreferenceScrollAttempts,
    providerPreferenceScrollTop: lastFundingChoicesProviderPreferenceScrollTop,
    providerManageVendorsSelectorExecuted: lastFundingChoicesProviderManageVendorsSelectorExecuted,
    providerManageVendorsFoundImmediate: lastFundingChoicesProviderManageVendorsFoundImmediate,
    providerManageVendorsFound300ms: lastFundingChoicesProviderManageVendorsFound300ms,
    providerManageVendorsFound800ms: lastFundingChoicesProviderManageVendorsFound800ms,
    providerManageVendorsFound1500ms: lastFundingChoicesProviderManageVendorsFound1500ms,
    providerManageVendorsCountImmediate: lastFundingChoicesProviderManageVendorsCountImmediate,
    providerManageVendorsCount300ms: lastFundingChoicesProviderManageVendorsCount300ms,
    providerManageVendorsCount800ms: lastFundingChoicesProviderManageVendorsCount800ms,
    providerManageVendorsCount1500ms: lastFundingChoicesProviderManageVendorsCount1500ms,
    providerManageVendorsFoundDelayed: lastFundingChoicesProviderManageVendorsFoundDelayed,
    providerManageVendorsElement: lastFundingChoicesProviderManageVendorsElementDiagnostics,
    manageVendorsRejectedReason: lastFundingChoicesProviderManageVendorsRejectedReason,
    manageVendorsSensitiveBypass: lastFundingChoicesProviderManageVendorsSensitiveBypass,
    manageVendorsMode: lastFundingChoicesProviderManageVendorsMode,
    manageVendorsAllowClick: lastFundingChoicesProviderManageVendorsAllowClick,
    providerManageVendorsFound: lastFundingChoicesProviderManageVendorsFound,
    providerManageVendorsClicked: lastFundingChoicesProviderManageVendorsClicked,
    clickableOwnerCount: 0,
    preferenceToggleActions:
      lastFundingChoicesPreferenceToggleActions
        .slice(0, MAX_FUNDING_CHOICES_CONTROL_DIAGNOSTICS),
    controls,
  }

  return lastFundingChoicesControlDiagnostics
}

function recordFundingChoicesSkipped(root, reason, blockedReason = '') {
  const fundingChoicesControlDiagnostics =
    collectFundingChoicesLightweightControlDiagnostics(root)

  recordCurrentSiteDiagnostic({
    status: 'skipped',
    reason,
    candidates: root ? [root] : [],
    blockedReason,
    fundingChoicesControlDiagnostics,
  })
  rejectFlowCompleted = true
  stopObserver()
}

function hasFundingChoicesMainToggleStableSuccess(mainToggleResult = null) {
  return Boolean(
    mainToggleResult &&
      lastFundingChoicesMainClickedCount > 0 &&
      Math.max(0, Number(lastFundingChoicesMainRequiredActiveAfter) || 0) === 0
  )
}

function finalizeFundingChoicesMainToggleStableSuccess(
  root,
  matchedElement = null,
  reason = 'fc_main_toggles_stable_without_confirm'
) {
  const currentRoot =
    getFundingChoicesRoot(root) || root

  recordCurrentSiteDiagnostic({
    status: 'partial',
    reason,
    candidates: currentRoot ? [currentRoot] : [],
    matchedRejectElement: matchedElement,
    matchedRejectText: matchedElement ? getActionText(matchedElement) : '',
    blockedReason: '',
    fundingChoicesControlDiagnostics: lastFundingChoicesControlDiagnostics,
  })
  recordCookieAuditAfterSuccessfulAction({
    type: 'save',
    container: currentRoot,
    element: matchedElement || currentRoot,
  })
  finalizeCookieActionSuccess({
    type: 'save',
    container: currentRoot,
    element: matchedElement || currentRoot,
  })
  setLastAction('preferences_saved')
  setLastError('')
}

function getFundingChoicesProviderControlSignal(control) {
  return normalizeMatchText([
    getElementActionText(control),
    control?.getAttribute?.('aria-label'),
    control?.getAttribute?.('title'),
    control?.id,
    getClassNameText(control),
  ].join(' '))
}

function isFundingChoicesProviderPreferenceControl(control, root) {
  if (
    !control ||
    !root?.contains?.(control) ||
    !isVisible(control) ||
    hasUnsafeAcceptText(control) ||
    isSensitiveActionControl(control, root)
  ) {
    return false
  }

  const signal =
    getFundingChoicesProviderControlSignal(control)

  if (textHasAny(signal, fundingChoicesProviderInformationalListTexts)) {
    return false
  }

  return (
    textHasAny(signal, fundingChoicesProviderPreferenceTexts) &&
    !textHasAny(signal, fundingChoicesUnsafePositiveTexts)
  )
}

function getFundingChoicesProviderTextSearchSignal(element) {
  return normalizeMatchText([
    getText(element),
    getElementActionText(element),
    element?.getAttribute?.('aria-label'),
    element?.getAttribute?.('title'),
    element?.id,
    getClassNameText(element),
  ].join(' '))
}

function getFundingChoicesProviderTextClickableTarget(element, root) {
  let current =
    element
  let depth = 0

  while (
    current &&
    root?.contains?.(current) &&
    depth < 5
  ) {
    const style =
      safeGetComputedStyle(current)

    if (
      safeMatches(current, 'button, a, [role="button"], [tabindex]') ||
      current.getAttribute?.('onclick') ||
      style?.cursor === 'pointer'
    ) {
      return current
    }

    current = current.parentElement
    depth += 1
  }

  return null
}

function findFundingChoicesScrollableContainer(root) {
  const candidates =
    [
      ...safeQuerySelectorAll(root, '*')
        .slice(0, MAX_DIRECT_CONTROL_PRIORITIZATION_INPUT),
      root,
    ]

  return candidates.find((element) => {
    if (!element || !root.contains(element)) return false

    const style =
      safeGetComputedStyle(element)
    const overflowSignal =
      `${style?.overflowY || ''} ${style?.overflow || ''}`

    return (
      element.scrollHeight > element.clientHeight + 40 &&
      textHasAny(overflowSignal, ['auto', 'scroll'])
    )
  }) || root
}

function findFundingChoicesProviderPreferenceTextControl(root, startedAt, budgetMs) {
  const elements =
    safeQuerySelectorAll(
      root,
      'span, div, p, li, label, strong, em, small, button, a, [role="button"], [tabindex]'
    )
      .slice(0, MAX_DIRECT_CONTROL_PRIORITIZATION_INPUT)

  for (const element of elements) {
    if (hasElapsedBudget(startedAt, budgetMs)) {
      break
    }

    if (!element || !root.contains(element) || !isVisible(element)) {
      continue
    }

    const signal =
      getFundingChoicesProviderTextSearchSignal(element)

    if (!signal || textHasAny(signal, fundingChoicesProviderInformationalListTexts)) {
      continue
    }

    if (!textHasAny(signal, fundingChoicesProviderPreferenceTexts)) {
      continue
    }

    const target =
      getFundingChoicesProviderTextClickableTarget(element, root)

    lastFundingChoicesProviderPreferenceTextMatch =
      signal.slice(0, 90)
    lastFundingChoicesProviderPreferenceClickableTargetTag =
      target?.tagName?.toLowerCase?.() || ''
    lastFundingChoicesProviderPreferenceClickMethod =
      target === element ? 'text_element' : 'clickable_ancestor'

    appendLastDiagnosticDecisionStep({
      strategy: 'fc.provider_preferences_text_search',
      status: target ? 'found' : 'not_found',
      reason: signal.slice(0, 80),
      found: target ? 1 : 0,
      elapsedMs: Date.now() - startedAt,
    })

    if (target && isFundingChoicesProviderPreferenceControl(target, root)) {
      return target
    }

    if (
      target &&
      root.contains(target) &&
      isVisible(target) &&
      !hasUnsafeAcceptText(target) &&
      !isSensitiveActionControl(target, root)
    ) {
      return target
    }
  }

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.provider_preferences_text_search',
    status: 'not_found',
    reason: 'provider_preferences_text_not_found',
    found: 0,
    elapsedMs: Date.now() - startedAt,
  })

  return null
}

function findFundingChoicesProviderPreferenceTextControlWithScroll(root, startedAt, budgetMs) {
  const scrollContainer =
    findFundingChoicesScrollableContainer(root)
  const originalScrollTop =
    Number(scrollContainer?.scrollTop) || 0
  const maxAttempts = 5

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    if (hasElapsedBudget(startedAt, budgetMs)) {
      break
    }

    lastFundingChoicesProviderPreferenceScrollAttempts = attempt
    lastFundingChoicesProviderPreferenceScrollTop =
      Math.max(0, Number(scrollContainer?.scrollTop) || 0)

    appendLastDiagnosticDecisionStep({
      strategy: 'fc.provider_preferences_scroll_search',
      status: 'ran',
      found: 0,
      scanned: attempt,
      elapsedMs: Date.now() - startedAt,
      reason: `scrollTop:${lastFundingChoicesProviderPreferenceScrollTop}`,
    })

    const control =
      findFundingChoicesProviderPreferenceTextControl(root, startedAt, budgetMs)

    if (control) {
      lastFundingChoicesProviderPreferenceScrollAttempts = attempt + 1
      lastFundingChoicesProviderPreferenceScrollTop =
        Math.max(0, Number(scrollContainer?.scrollTop) || 0)
      return control
    }

    if (
      !scrollContainer ||
      scrollContainer.scrollHeight <= scrollContainer.clientHeight ||
      scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 4
    ) {
      break
    }

    scrollContainer.scrollTop =
      Math.min(
        scrollContainer.scrollHeight,
        scrollContainer.scrollTop + Math.max(160, Math.floor(scrollContainer.clientHeight * 0.75))
      )
  }

  if (scrollContainer && typeof scrollContainer.scrollTop === 'number') {
    scrollContainer.scrollTop = originalScrollTop
  }

  return null
}

function getFundingChoicesManageVendorsElementDiagnostics(element) {
  if (!element) return null

  const meta =
    getSafeElementMeta(element)
  const style =
    getComputedStyle(element)
  const rect =
    element.getBoundingClientRect?.() || null

  return {
    tagName: meta.tagName.slice(0, 24),
    className: meta.className.slice(0, 120),
    connected: Boolean(element.isConnected),
    offsetParent: Boolean(element.offsetParent),
    display: String(style?.display || '').slice(0, 30),
    visibility: String(style?.visibility || '').slice(0, 30),
    opacity: String(style?.opacity || '').slice(0, 20),
    pointerEvents: String(style?.pointerEvents || '').slice(0, 30),
    disabled: Boolean(element.disabled),
    ariaHidden: String(element.getAttribute?.('aria-hidden') || '').slice(0, 20),
    rectWidth: Math.round(Math.max(0, Number(rect?.width) || 0)),
    rectHeight: Math.round(Math.max(0, Number(rect?.height) || 0)),
    text: normalizeMatchText(getActionText(element)).slice(0, 120),
  }
}

function isFundingChoicesManageVendorsNavigationButton(element) {
  if (
    !element ||
    !element.matches?.(
      'button.fc-manage-vendors, .fc-navigation-button.fc-manage-vendors, [class*="fc-manage-vendors"]'
    )
  ) {
    return false
  }

  const signal =
    normalizeMatchText([
      getActionText(element),
      element.getAttribute?.('aria-label'),
      element.getAttribute?.('title'),
      getClassNameText(element),
    ].join(' '))

  if (
    textHasAny(signal, fundingChoicesUnsafePositiveTexts) ||
    textMatchesDictionaryCookieIntent(signal, 'acceptAll')
  ) {
    return false
  }

  return textHasAny(signal, [
    ...fundingChoicesProviderPreferenceTexts,
    'proveidors',
    'proveedores',
    'providers',
    'provider',
    'vendors',
    'vendor',
    'preferencies',
    'preferencias',
    'preferences',
  ])
}

function getFundingChoicesManageVendorsRejectedReason(element, root) {
  if (!element) return 'selector_not_found'
  if (!root?.contains?.(element)) return 'outside_fc_root'
  if (!element.isConnected) return 'not_connected'
  if (element.disabled) return 'disabled'
  if (element.getAttribute?.('aria-hidden') === 'true') return 'aria_hidden'
  const style =
    getComputedStyle(element)
  const opacity =
    Number(style?.opacity)
  if (style?.display === 'none') return 'display_none'
  if (style?.visibility === 'hidden') return 'visibility_hidden'
  if (Number.isFinite(opacity) && opacity <= 0) return 'opacity_zero'
  if (style?.pointerEvents === 'none') return 'pointer_events_none'
  if (hasUnsafeAcceptText(element)) return 'unsafe_accept_text'
  if (isSensitiveActionControl(element, root)) {
    if (isFundingChoicesManageVendorsNavigationButton(element)) {
      lastFundingChoicesProviderManageVendorsSensitiveBypass = true
      appendLastDiagnosticDecisionStep({
        strategy: 'fc.manage_vendors_sensitive_bypass',
        status: 'ran',
        found: 1,
        scanned: 1,
        force: true,
      })
      return ''
    }

    return 'sensitive_action_control'
  }

  return ''
}

function getFundingChoicesManageVendorsLookup(root) {
  const visiblePreferencesPanel =
    document.querySelector('.fc-data-preferences-dialog, .fc-consent-root')
  const fcRoot =
    getFundingChoicesRoot(root) ||
    (
      visiblePreferencesPanel && isVisible(visiblePreferencesPanel)
        ? visiblePreferencesPanel
        : null
    ) ||
    root ||
    document
  const selector =
    'button.fc-manage-vendors, .fc-navigation-button.fc-manage-vendors, [class*="fc-manage-vendors"]'
  const buttons =
    uniqueElements([
      ...safeQuerySelectorAll(fcRoot, 'button.fc-manage-vendors'),
      ...safeQuerySelectorAll(document, 'button.fc-manage-vendors'),
    ])
  const directControl =
    fcRoot?.querySelector?.('button.fc-manage-vendors') ||
    fcRoot?.querySelector?.('.fc-navigation-button.fc-manage-vendors') ||
    document.querySelector(selector) ||
    null
  const effectiveRoot =
    directControl && fcRoot?.contains?.(directControl)
      ? fcRoot
      : safeClosest(
          directControl,
          '.fc-data-preferences-dialog, .fc-consent-root, [class*="fc-consent-root" i], [id*="fc-consent" i], [class*="fundingchoices" i], [id*="fundingchoices" i]'
        ) ||
        fcRoot ||
        document
  const rejectedReason =
    directControl
      ? getFundingChoicesManageVendorsRejectedReason(directControl, effectiveRoot)
      : 'selector_not_found'
  const control =
    directControl &&
    !rejectedReason
      ? directControl
      : safeQuerySelectorAll(
          effectiveRoot,
          selector
        )
          .find((element) =>
            !getFundingChoicesManageVendorsRejectedReason(element, effectiveRoot)
          ) || null

  if (buttons.length === 1 || directControl) {
    const diagnosticTarget =
      directControl || buttons[0]
    lastFundingChoicesProviderManageVendorsElementDiagnostics =
      getFundingChoicesManageVendorsElementDiagnostics(diagnosticTarget)
    lastFundingChoicesProviderManageVendorsRejectedReason =
      control
        ? ''
        : rejectedReason ||
          getFundingChoicesManageVendorsRejectedReason(diagnosticTarget, effectiveRoot)
  } else if (!control) {
    lastFundingChoicesProviderManageVendorsRejectedReason =
      buttons.length === 0 ? 'selector_not_found' : 'multiple_candidates_not_selected'
  }

  return {
    control,
    count: buttons.length,
    rejectedReason: lastFundingChoicesProviderManageVendorsRejectedReason,
  }
}

function recordFundingChoicesManageVendorsTimedLookup(
  root,
  timing,
  startedAt,
  options = {}
) {
  const lookup =
    getFundingChoicesManageVendorsLookup(root)
  const found =
    Boolean(lookup.control)
  const count =
    Math.max(0, Number(lookup.count) || 0)
  const mode =
    String(options.mode || 'normal').slice(0, 20)

  lastFundingChoicesProviderManageVendorsSelectorExecuted = true
  lastFundingChoicesProviderManageVendorsMode = mode
  lastFundingChoicesProviderManageVendorsAllowClick =
    Boolean(options.allowClick)

  if (mode === 'normal' && options.allowClick) {
    appendLastDiagnosticDecisionStep({
      strategy: 'fc.manage_vendors_normal_flow_invoked',
      status: 'ran',
      found: found ? 1 : 0,
      scanned: count,
      elapsedMs: Date.now() - startedAt,
      force: true,
    })
  }

  lastFundingChoicesProviderManageVendorsFound =
    lastFundingChoicesProviderManageVendorsFound || found

  if (timing === 'immediate') {
    lastFundingChoicesProviderManageVendorsFoundImmediate = found
    lastFundingChoicesProviderManageVendorsCountImmediate = count
  } else if (timing === '300ms') {
    lastFundingChoicesProviderManageVendorsFound300ms = found
    lastFundingChoicesProviderManageVendorsCount300ms = count
  } else if (timing === '800ms') {
    lastFundingChoicesProviderManageVendorsFound800ms = found
    lastFundingChoicesProviderManageVendorsCount800ms = count
  } else if (timing === '1500ms') {
    lastFundingChoicesProviderManageVendorsFound1500ms = found
    lastFundingChoicesProviderManageVendorsCount1500ms = count
  }

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.manage_vendors_selector_executed',
    status: 'ran',
    found: found ? 1 : 0,
    scanned: count,
    elapsedMs: Date.now() - startedAt,
    force: true,
  })

  appendLastDiagnosticDecisionStep({
    strategy:
      timing === 'immediate'
        ? 'fc.manage_vendors_lookup_immediate'
        : `fc.manage_vendors_lookup_${timing}`,
    status: 'ran',
    found: found ? 1 : 0,
    scanned: count,
    elapsedMs: Date.now() - startedAt,
    force: true,
  })

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.manage_vendors_button',
    status: found ? 'found' : 'not_found',
    found: found ? 1 : 0,
    scanned: count,
    elapsedMs: Date.now() - startedAt,
    force: true,
  })

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.manage_vendors_visibility_check',
    status: found ? 'passed' : 'rejected',
    reason: lookup.rejectedReason || '',
    found: found ? 1 : 0,
    scanned: count,
    elapsedMs: Date.now() - startedAt,
    force: true,
  })

  return lookup.control
}

function findFundingChoicesManageVendorsButton(root, startedAt, options = {}) {
  return recordFundingChoicesManageVendorsTimedLookup(
    root,
    'immediate',
    startedAt,
    options
  )
}

function clickFundingChoicesManageVendorsButton(control) {
  if (
    !shouldRunOnThisSite() ||
    !control ||
    !control.isConnected ||
    hasUnsafeAcceptText(control)
  ) {
    lastFundingChoicesProviderManageVendorsRejectedReason =
      'fc_manage_vendors_not_interactable'
    return false
  }

  if (!canUsePageActionBudget('fundingChoicesManageVendors')) {
    lastFundingChoicesProviderManageVendorsRejectedReason =
      'page_action_budget'
    return false
  }

  try {
    control.scrollIntoView?.({
      block: 'center',
    })
  } catch {
    // Best-effort alignment for FC's zero-geometry navigation button.
  }

  processedActionElements.add(control)

  try {
    const eventView =
      control.ownerDocument?.defaultView || window

    if (typeof eventView.PointerEvent === 'function') {
      control.dispatchEvent(
        new eventView.PointerEvent('pointerdown', {
          bubbles: true,
          cancelable: true,
          view: eventView,
          pointerType: 'mouse',
          isPrimary: true,
        })
      )
      control.dispatchEvent(
        new eventView.PointerEvent('pointerup', {
          bubbles: true,
          cancelable: true,
          view: eventView,
          pointerType: 'mouse',
          isPrimary: true,
        })
      )
    }

    control.dispatchEvent(
      new eventView.MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: eventView,
      })
    )
    control.dispatchEvent(
      new eventView.MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        view: eventView,
      })
    )
    control.click()
    lastFundingChoicesProviderManageVendorsRejectedReason = ''
    return true
  } catch (error) {
    lastFundingChoicesProviderManageVendorsRejectedReason =
      'fc_manage_vendors_click_failed'
    log('Funding Choices manage vendors click failed:', error)
    return false
  }
}

function refreshFundingChoicesDiagnosticsForVisiblePanel(source = 'popup') {
  const panel =
    getVisibleFundingChoicesPanel()

  if (!panel) {
    return false
  }

  const startedAt =
    Date.now()

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.popup_state_refresh',
    status: 'ran',
    reason: source,
    found: 1,
    scanned: 1,
    elapsedMs: 0,
    force: true,
  })

  collectFundingChoicesLightweightControlDiagnostics(panel)
  recordCurrentSiteDiagnostic({
    status: 'settingsOpened',
    reason: 'fc_popup_state_refresh',
    candidates: [panel],
    matchedRejectElement: null,
    matchedRejectText: '',
    blockedReason: '',
    fundingChoicesControlDiagnostics: lastFundingChoicesControlDiagnostics,
    elapsedMs: Date.now() - startedAt,
  })

  return true
}

function findFundingChoicesProviderPreferenceControl(root, startedAt, budgetMs) {
  if (!ENABLE_FC_PROVIDER_AUTOMATION) {
    return null
  }

  const manageVendorsButton =
    findFundingChoicesManageVendorsButton(root, startedAt, {
      mode: 'normal',
      allowClick: true,
    })

  if (manageVendorsButton) {
    lastFundingChoicesProviderPreferenceClickMethod =
      'manage_vendors_selector'
    lastFundingChoicesProviderPreferenceClickableTargetTag =
      manageVendorsButton.tagName?.toLowerCase?.() || ''
    return manageVendorsButton
  }

  const controls =
    uniqueElements([
      ...safeQuerySelectorAll(
        root,
        'button, a, [role="button"], [tabindex], [class*="vendor" i], [class*="vendors" i], [class*="partner" i], [class*="partners" i], [class*="proveidor" i], [class*="proveedor" i]'
      ),
      ...getDirectClickableControls(root, {
        startedAt,
        budgetMs,
      }),
    ])
  let informationalFound = false

  for (const control of controls) {
    if (hasElapsedBudget(startedAt, budgetMs)) {
      break
    }

    const signal =
      getFundingChoicesProviderControlSignal(control)

    if (
      root.contains(control) &&
      isVisible(control) &&
      textHasAny(signal, fundingChoicesProviderInformationalListTexts)
    ) {
      informationalFound = true
      appendLastDiagnosticDecisionStep({
        strategy: 'fc.provider_preferences_skipped_informational_list',
        status: 'skipped',
        reason: signal.slice(0, 80),
        found: 1,
        elapsedMs: Date.now() - startedAt,
      })
      continue
    }

    appendLastDiagnosticDecisionStep({
      strategy: 'fc.provider_preferences_candidate',
      status: textHasAny(signal, fundingChoicesProviderPreferenceTexts)
        ? 'matched'
        : 'skipped',
      reason: signal.slice(0, 80),
      found: textHasAny(signal, fundingChoicesProviderPreferenceTexts) ? 1 : 0,
      elapsedMs: Date.now() - startedAt,
    })

    if (isFundingChoicesProviderPreferenceControl(control, root)) {
      return control
    }
  }

  if (informationalFound) {
    appendLastDiagnosticDecisionStep({
      strategy: 'fc.provider_preferences_candidate',
      status: 'not_found',
      reason: 'only_informational_provider_list_found',
      found: 0,
      elapsedMs: Date.now() - startedAt,
    })
  }

  return findFundingChoicesProviderPreferenceTextControlWithScroll(root, startedAt, budgetMs)
}

function openFundingChoicesProviderPreferences(root, preferredProviderControl = null) {
  if (!ENABLE_FC_PROVIDER_AUTOMATION) {
    return {
      ok: false,
      opened: false,
      reason: 'fc_provider_automation_disabled',
      blockedReason: 'provider_automation_disabled',
    }
  }

  const startedAt =
    Date.now()
  let providerControl =
    preferredProviderControl &&
    root.contains(preferredProviderControl) &&
    isVisible(preferredProviderControl)
      ? preferredProviderControl
      : null

  if (providerControl) {
    lastFundingChoicesProviderPreferenceClickMethod =
      'manage_vendors_selector'
    lastFundingChoicesProviderPreferenceClickableTargetTag =
      providerControl.tagName?.toLowerCase?.() || ''
    lastFundingChoicesProviderManageVendorsFound = true
  } else {
    providerControl =
      findFundingChoicesProviderPreferenceControl(
        root,
        startedAt,
        FUNDING_CHOICES_HELPER_BUDGET_MS
      )
  }

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.provider_preferences',
    status: providerControl ? 'found' : 'not_found',
    reason: hasElapsedBudget(startedAt, FUNDING_CHOICES_HELPER_BUDGET_MS)
      ? 'budget_capped'
      : '',
    found: providerControl ? 1 : 0,
    elapsedMs: Date.now() - startedAt,
  })

  if (!providerControl) {
    return {
      ok: false,
      opened: false,
      reason: 'fc_provider_preferences_control_not_found',
      blockedReason: 'provider_preferences_control_not_found',
    }
  }

  if (lastFundingChoicesProviderPreferenceClickMethod === 'manage_vendors_selector') {
    try {
      providerControl.scrollIntoView?.({
        block: 'center',
      })
    } catch {
      // Best-effort alignment before the FC click.
    }
  }

  const providerControlClicked =
    lastFundingChoicesProviderPreferenceClickMethod === 'manage_vendors_selector'
      ? clickFundingChoicesManageVendorsButton(providerControl)
      : clickCMPSpecificControl(providerControl)

  if (!providerControlClicked) {
    lastFundingChoicesProviderPreferenceClickSuccess = false
    appendLastDiagnosticDecisionStep({
      strategy: 'fc.provider_preferences',
      status: 'skipped',
      reason:
        lastFundingChoicesProviderPreferenceClickMethod === 'manage_vendors_selector'
          ? lastFundingChoicesProviderManageVendorsRejectedReason ||
            'fc_manage_vendors_click_failed'
          : 'provider_preferences_click_failed',
      found: 1,
      elapsedMs: Date.now() - startedAt,
    })

    return {
      ok: false,
      opened: false,
      reason: 'fc_provider_toggles_not_safely_handled',
      blockedReason:
        lastFundingChoicesProviderPreferenceClickMethod === 'manage_vendors_selector'
          ? lastFundingChoicesProviderManageVendorsRejectedReason ||
            'fc_manage_vendors_click_failed'
          : 'provider_preferences_click_failed',
    }
  }

  lastFundingChoicesProviderPreferenceClickableTargetTag =
    providerControl?.tagName?.toLowerCase?.() || ''
  if (lastFundingChoicesProviderPreferenceClickMethod === 'manage_vendors_selector') {
    lastFundingChoicesProviderManageVendorsClicked = true
    appendLastDiagnosticDecisionStep({
      strategy: 'fc.manage_vendors_clicked_normal_flow',
      status: 'clicked',
      found: 1,
      scanned: 1,
      elapsedMs: Date.now() - startedAt,
      force: true,
    })
  }
  lastFundingChoicesProviderPreferenceClickMethod =
    lastFundingChoicesProviderPreferenceClickMethod || 'control'
  lastFundingChoicesProviderPreferenceClickSuccess = true

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.provider_preferences',
    status: 'clicked',
    found: 1,
    elapsedMs: Date.now() - startedAt,
  })

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.provider_preferences_text_click',
    status: 'clicked',
    reason: lastFundingChoicesProviderPreferenceClickMethod,
    found: 1,
    elapsedMs: Date.now() - startedAt,
  })

  lastFundingChoicesProviderPreferenceOpened = true

  return {
    ok: true,
    opened: true,
    reason: '',
    blockedReason: '',
  }
}

function finishFundingChoicesFlowAfterProvider(currentRoot, mainToggleResult = null) {
  try {
    const providerRoot =
      getFundingChoicesRoot(currentRoot) || currentRoot

    if (
      ENABLE_FC_PROVIDER_AUTOMATION &&
      lastFundingChoicesProviderPreferenceOpened &&
      !(mainToggleResult && mainToggleResult.ok)
    ) {
      const mainRecheckResult =
        handleFundingChoicesPreferenceCategoryToggles(currentRoot, {
          scope: 'main',
          maxClicks: MAX_FUNDING_CHOICES_TOGGLE_CLICKS,
          preferenceTrace: 'fc.preference_toggles_recheck',
          disableTrace: 'fc.disable_required_categories_recheck',
        })

      if (!mainRecheckResult.ok) {
        appendLastDiagnosticDecisionStep({
          strategy: 'fc.provider_toggles',
          status: 'skipped',
          reason: 'main_required_toggles_still_active_after_transition',
          found: 0,
          scanned: mainRecheckResult.activeCount,
        })
        recordFundingChoicesSkipped(
          currentRoot,
          mainRecheckResult.reason,
          mainRecheckResult.blockedReason
        )
        return
      }

      if (!ENABLE_FC_PROVIDER_AUTOMATION) {
        appendLastDiagnosticDecisionStep({
          strategy: 'fc.provider_toggles',
          status: 'skipped',
          reason: 'fc_provider_automation_disabled',
          found: 0,
          scanned: 0,
          force: true,
        })
        recordFundingChoicesSkipped(
          providerRoot,
          'fc_provider_automation_disabled',
          'provider_automation_disabled'
        )
        return
      }

      const providerToggleResult =
        handleFundingChoicesProviderPanelToggles(providerRoot)

      if (!providerToggleResult.ok) {
        const providerReason =
          providerToggleResult.blockedReason === 'no_matching_preference_sliders'
            ? 'fc_provider_toggles_not_found'
            : providerToggleResult.reason

        recordFundingChoicesSkipped(
          providerRoot,
          providerReason,
          providerToggleResult.blockedReason
        )
        return
      }
    }

    if (ENABLE_FC_PROVIDER_AUTOMATION) {
      const toggleResult =
        handleFundingChoicesActiveToggles(providerRoot)

      if (!toggleResult.ok) {
        recordFundingChoicesSkipped(
          providerRoot,
          toggleResult.reason,
          toggleResult.blockedReason
        )
        return
      }

      collectFundingChoicesControlDiagnostics(providerRoot)
    } else {
      collectFundingChoicesLightweightControlDiagnostics(providerRoot)
    }
  } catch (error) {
    log('Funding Choices toggle diagnostics failed:', error)
    lastFundingChoicesPreferenceToggleActions = [
      {
        ariaLabel: '',
        inputId: 'none',
        inputName: 'none',
        inputClass: '',
        ariaPressedBefore: '',
        checkedBefore: false,
        visibleInput: false,
        labelClass: '',
        wrapperClass: '',
        clickTarget: '',
        clickDispatched: false,
        ariaPressedAfter: '',
        checkedAfter: false,
        stillActive: false,
        skippedReason: 'fc_toggle_input_not_found',
      },
    ]
    recordFundingChoicesSkipped(
      currentRoot,
      'fc_post_preference_flow_error',
      error?.message || 'unknown_error'
    )
    return
  }

  if (
    mainToggleResult &&
    !mainToggleResult.ok &&
    !hasFundingChoicesMainToggleStableSuccess(mainToggleResult)
  ) {
    appendLastDiagnosticDecisionStep({
      strategy: 'fc.confirm_save',
      status: 'skipped',
      reason: mainToggleResult.reason,
      found: 0,
      scanned: mainToggleResult.activeCount,
    })
    recordFundingChoicesSkipped(
      getFundingChoicesRoot(currentRoot) || currentRoot,
      mainToggleResult.reason,
      mainToggleResult.blockedReason
    )
    return
  }

  const saveStartedAt =
    Date.now()
  const safeAction =
    findFundingChoicesSafeAction(
      getFundingChoicesRoot(currentRoot) || currentRoot,
      saveStartedAt,
      FUNDING_CHOICES_HELPER_BUDGET_MS
    )

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.confirm_save',
    status: safeAction ? 'found' : 'not_found',
    reason: hasElapsedBudget(saveStartedAt, FUNDING_CHOICES_HELPER_BUDGET_MS)
      ? 'budget_capped'
      : '',
    found: safeAction ? 1 : 0,
    elapsedMs: Date.now() - saveStartedAt,
  })

  if (!safeAction) {
    if (hasFundingChoicesMainToggleStableSuccess(mainToggleResult)) {
      finalizeFundingChoicesMainToggleStableSuccess(
        getFundingChoicesRoot(currentRoot) || currentRoot
      )
      return
    }

    recordFundingChoicesSkipped(
      getFundingChoicesRoot(currentRoot) || currentRoot,
      'fc_settings_safe_action_not_found',
      hasElapsedBudget(saveStartedAt, FUNDING_CHOICES_HELPER_BUDGET_MS)
        ? 'budget_capped'
        : ''
    )
    return
  }

  if (!clickCMPSpecificControl(safeAction)) {
    if (hasFundingChoicesMainToggleStableSuccess(mainToggleResult)) {
      finalizeFundingChoicesMainToggleStableSuccess(
        getFundingChoicesRoot(currentRoot) || currentRoot,
        safeAction,
        'fc_main_toggles_stable_confirm_click_failed'
      )
      return
    }

    recordCurrentSiteDiagnostic({
      status: 'failed',
      reason: 'fc_safe_action_click_failed',
      candidates: [getFundingChoicesRoot(currentRoot) || currentRoot],
      matchedRejectElement: safeAction,
      matchedRejectText: getActionText(safeAction),
      blockedReason: 'click_failed',
      fundingChoicesControlDiagnostics: lastFundingChoicesControlDiagnostics,
    })
    rejectFlowCompleted = true
    stopObserver()
    return
  }

  incrementStat('autoRejects')
  schedulePostActionVerification({
    type: hasVisibleRejectIntent(safeAction) ? 'reject' : 'save',
    container: getFundingChoicesRoot(currentRoot) || currentRoot,
    element: safeAction,
  })
  setLastAction('auto_reject')
  setLastError('')
}

function continueFundingChoicesProviderPreferenceFlow(
  currentRoot,
  preferenceToggleResult,
  manageVendorsControl = null
) {
  if (!ENABLE_FC_PROVIDER_AUTOMATION) {
    return false
  }

  appendLastDiagnosticDecisionStep({
    strategy: 'fc.before_provider_preferences',
    status: 'ran',
    reason: preferenceToggleResult.ok ? '' : preferenceToggleResult.reason,
    found: preferenceToggleResult.disabledCount,
    scanned: preferenceToggleResult.activeCount,
  })

  const providerPreferenceResult =
    openFundingChoicesProviderPreferences(currentRoot, manageVendorsControl)

  if (!providerPreferenceResult.ok) {
    appendLastDiagnosticDecisionStep({
      strategy: 'fc.provider_preferences.return',
      status: 'skipped',
      reason: providerPreferenceResult.blockedReason || providerPreferenceResult.reason,
      found: 0,
      scanned: 1,
    })
    recordFundingChoicesSkipped(
      currentRoot,
      providerPreferenceResult.reason,
      providerPreferenceResult.blockedReason
    )
    return true
  }

  if (providerPreferenceResult.opened) {
    setTimeout(() => {
      if (!shouldRunOnThisSite() || rejectFlowCompleted) return
      finishFundingChoicesFlowAfterProvider(currentRoot, preferenceToggleResult)
    }, FUNDING_CHOICES_PROVIDER_PANEL_DELAY_MS)
    return true
  }

  if (!preferenceToggleResult.ok) {
    appendLastDiagnosticDecisionStep({
      strategy: 'fc.provider_preferences.branch',
      status: 'skipped',
      reason: 'main_required_toggles_still_active',
      found: 0,
      scanned: preferenceToggleResult.activeCount,
    })
    recordFundingChoicesSkipped(
      currentRoot,
      preferenceToggleResult.reason,
      preferenceToggleResult.blockedReason
    )
    return true
  }

  return false
}

function scheduleFundingChoicesManageVendorsTimingLookups(
  currentRoot,
  preferenceToggleResult
) {
  return

  const startedAt =
    Date.now()
  const timings = [
    [300, '300ms'],
    [800, '800ms'],
    [1500, '1500ms'],
  ]

  timings.forEach(([delay, label], index) => {
    setTimeout(() => {
      if (!shouldRunOnThisSite() || lastFundingChoicesProviderPreferenceOpened) {
        return
      }

      const manageVendorsControl =
        recordFundingChoicesManageVendorsTimedLookup(
          currentRoot,
          label,
          startedAt,
          {
            mode: 'normal',
            allowClick: true,
          }
        )

      collectFundingChoicesControlDiagnostics(currentRoot)
      recordCurrentSiteDiagnostic({
        status: 'settingsOpened',
        reason: 'fc_manage_vendors_timing_probe',
        candidates: [currentRoot],
        matchedRejectElement: manageVendorsControl,
        matchedRejectText: getActionText(manageVendorsControl),
        fundingChoicesControlDiagnostics: lastFundingChoicesControlDiagnostics,
      })

      if (manageVendorsControl) {
        lastFundingChoicesProviderManageVendorsFoundDelayed = true
        continueFundingChoicesProviderPreferenceFlow(
          currentRoot,
          preferenceToggleResult,
          manageVendorsControl
        )
        return
      }

      if (index === timings.length - 1) {
        continueFundingChoicesProviderPreferenceFlow(
          currentRoot,
          preferenceToggleResult,
          null
        )
      }
    }, delay)
  })
}

function attemptVisibleFundingChoicesManageVendorsNormalFlow(decisionTrace = null) {
  const panel =
    getVisibleFundingChoicesPanel()

  if (!panel) {
    return false
  }

  const startedAt =
    Date.now()

  addDiagnosticDecisionStep(decisionTrace, {
    strategy: 'fc.visible_preferences_panel_normal_flow',
    status: 'found',
    found: 1,
    scanned: 1,
    elapsedMs: 0,
  })
  updateLastDiagnosticDecisionTrace(decisionTrace)

  const preferenceToggleResult =
    handleFundingChoicesPreferenceCategoryToggles(
      panel,
      {
        scope: 'main',
        maxClicks: MAX_FUNDING_CHOICES_TOGGLE_CLICKS,
        preferenceTrace: 'fc.preference_toggles',
        disableTrace: 'fc.disable_required_categories',
        manageVendorsControl: null,
      }
    )

  finishFundingChoicesFlowAfterProvider(panel, preferenceToggleResult)
  return true
}

function completeFundingChoicesManageOptionsFlow(root, openedControl) {
  const startedAt =
    Date.now()
  const currentRoot =
    getFundingChoicesRoot(root || document)

  if (!currentRoot) {
    appendLastDiagnosticDecisionStep({
      strategy: 'fc.active_toggles',
      status: 'not_found',
      reason: 'fc_root_not_found',
      elapsedMs: Date.now() - startedAt,
    })
    recordFundingChoicesSkipped(root, 'fc_settings_safe_action_not_found', 'fc_root_not_found')
    return
  }

  try {
    lastFundingChoicesClickedSliderKeys = []
    lastFundingChoicesPreferenceToggleActions = []
    lastFundingChoicesMainRequiredActiveBefore = 0
    lastFundingChoicesMainRequiredActiveAfter = 0
    lastFundingChoicesMainClickedCount = 0
    lastFundingChoicesMainToggleMethod = ''
    lastFundingChoicesProviderPreferenceOpened = false
    lastFundingChoicesProviderToggleCount = 0
    lastFundingChoicesActiveProviderToggleCount = 0
    lastFundingChoicesProviderInspectedCount = 0
    lastFundingChoicesProviderActiveFoundCount = 0
    lastFundingChoicesProviderClickedCount = 0
    lastFundingChoicesProviderTimeBudgetExceeded = false
    lastFundingChoicesProviderToggleMethod = ''
    lastFundingChoicesProviderPreferenceTextMatch = ''
    lastFundingChoicesProviderPreferenceClickableTargetTag = ''
    lastFundingChoicesProviderPreferenceClickMethod = ''
    lastFundingChoicesProviderPreferenceClickSuccess = false
    lastFundingChoicesProviderPreferenceScrollAttempts = 0
    lastFundingChoicesProviderPreferenceScrollTop = 0
    lastFundingChoicesProviderManageVendorsSelectorExecuted = false
    lastFundingChoicesProviderManageVendorsFoundImmediate = false
    lastFundingChoicesProviderManageVendorsFound300ms = false
    lastFundingChoicesProviderManageVendorsFound800ms = false
    lastFundingChoicesProviderManageVendorsFound1500ms = false
    lastFundingChoicesProviderManageVendorsCountImmediate = 0
    lastFundingChoicesProviderManageVendorsCount300ms = 0
    lastFundingChoicesProviderManageVendorsCount800ms = 0
    lastFundingChoicesProviderManageVendorsCount1500ms = 0
    lastFundingChoicesProviderManageVendorsFoundDelayed = false
    lastFundingChoicesProviderManageVendorsElementDiagnostics = null
    lastFundingChoicesProviderManageVendorsRejectedReason = ''
    lastFundingChoicesProviderManageVendorsSensitiveBypass = false
    lastFundingChoicesProviderManageVendorsMode = ''
    lastFundingChoicesProviderManageVendorsAllowClick = false
    lastFundingChoicesProviderManageVendorsFound = false
    lastFundingChoicesProviderManageVendorsClicked = false

    const preferenceToggleResult =
      handleFundingChoicesPreferenceCategoryToggles(
        currentRoot,
        {
          scope: 'main',
          maxClicks: MAX_FUNDING_CHOICES_TOGGLE_CLICKS,
          preferenceTrace: 'fc.preference_toggles',
          disableTrace: 'fc.disable_required_categories',
          manageVendorsControl: null,
        }
      )

    finishFundingChoicesFlowAfterProvider(currentRoot, preferenceToggleResult)
    return
  } catch (error) {
    log('Funding Choices toggle diagnostics failed:', error)
    lastFundingChoicesPreferenceToggleActions = [
      {
        ariaLabel: '',
        inputId: 'none',
        inputName: 'none',
        inputClass: '',
        ariaPressedBefore: '',
        checkedBefore: false,
        visibleInput: false,
        labelClass: '',
        wrapperClass: '',
        clickTarget: '',
        clickDispatched: false,
        ariaPressedAfter: '',
        checkedAfter: false,
        stillActive: false,
        skippedReason: 'fc_toggle_input_not_found',
      },
    ]
    recordFundingChoicesSkipped(
      currentRoot,
      'fc_post_preference_flow_error',
      error?.message || 'unknown_error'
    )
    return
  }

  finishFundingChoicesFlowAfterProvider(currentRoot)
}

function attemptFundingChoicesManageOptionsFlow(root = document, decisionTrace = null) {
  if (
    !shouldRunOnThisSite() ||
    !getProtectionModeConfig().allowSettingsOpen
  ) {
    return false
  }

  const startedAt =
    Date.now()
  const fcRoot =
    getFundingChoicesRoot(root) ||
    (
      document.querySelector('.fc-data-preferences-dialog, .fc-consent-root')
    )

  if (!fcRoot) {
    addDiagnosticDecisionStep(decisionTrace, {
      strategy: 'fc.manage_options',
      status: 'skipped',
      reason: 'fc_root_not_found',
      elapsedMs: Date.now() - startedAt,
    })
    return false
  }

  const preferencesPanelDetected =
    isFundingChoicesPreferencesPanel(fcRoot)

  addDiagnosticDecisionStep(decisionTrace, {
    strategy: 'fc.preferences_panel_detected',
    status: preferencesPanelDetected ? 'found' : 'not_found',
    reason: '',
    found: preferencesPanelDetected ? 1 : 0,
    elapsedMs: Date.now() - startedAt,
  })

  if (preferencesPanelDetected) {
    lightweightSettingsOpenAttempted = true
    updateLastDiagnosticDecisionTrace(decisionTrace)
    completeFundingChoicesManageOptionsFlow(fcRoot, null)
    return true
  }

  if (lightweightSettingsOpenAttempted) {
    return false
  }

  const manageControl =
    findFundingChoicesControl(
      fcRoot,
      fundingChoicesManageOptionTexts,
      startedAt,
      FUNDING_CHOICES_HELPER_BUDGET_MS
    )

  addDiagnosticDecisionStep(decisionTrace, {
    strategy: 'fc.manage_options',
    status: manageControl ? 'found' : 'not_found',
    reason: hasElapsedBudget(startedAt, FUNDING_CHOICES_HELPER_BUDGET_MS)
      ? 'budget_capped'
      : '',
    found: manageControl ? 1 : 0,
    elapsedMs: Date.now() - startedAt,
  })

  if (!manageControl) {
    return false
  }

  if (!clickCMPSpecificControl(manageControl)) {
    recordCurrentSiteDiagnostic({
      status: 'failed',
      reason: 'fc_manage_options_click_failed',
      candidates: [fcRoot],
      matchedRejectElement: manageControl,
      matchedRejectText: getActionText(manageControl),
      blockedReason: 'click_failed',
    })
    rejectFlowCompleted = true
    stopObserver()
    return true
  }

  lightweightSettingsOpenAttempted = true
  collectFundingChoicesLightweightControlDiagnostics(fcRoot)
  recordCurrentSiteDiagnostic({
    status: 'settingsOpened',
    reason: 'fc_manage_options_clicked',
    candidates: [fcRoot],
    matchedRejectElement: manageControl,
    matchedRejectText: getActionText(manageControl),
    fundingChoicesControlDiagnostics: lastFundingChoicesControlDiagnostics,
  })
  stopObserver()
  setLastAction('settings_opened')
  setLastError('')

  setTimeout(() => {
    try {
      if (!shouldRunOnThisSite() || rejectFlowCompleted) return

      completeFundingChoicesManageOptionsFlow(fcRoot, manageControl)
    } catch (error) {
      logRuntimeError('funding_choices_followup', error)
      recordFundingChoicesSkipped(fcRoot, 'fc_settings_safe_action_not_found', 'followup_error')
    }
  }, FUNDING_CHOICES_PANEL_DELAY_MS)

  return true
}

function attemptCMPSpecificReject(root = document) {
  if (
    !ENABLE_CMP_SPECIFIC_HELPERS ||
    !shouldRunOnThisSite() ||
    !getProtectionModeConfig().allowAutoReject
  ) {
    return false
  }

  const cmpName =
    getDetectedCMPName(root)

  if (!cmpName) return false

  const rejectControl =
    getCMPSpecificControls(cmpName, 'reject', root)
      .find((control) =>
        hasVisibleRejectIntent(control) ||
        textMatchesDictionaryCookieIntent(getActionText(control), 'rejectAll')
      )

  if (!rejectControl) return false

  if (!clickCMPSpecificControl(rejectControl)) {
    rejectFlowLog('CMP-specific reject blocked', {
      cmpName,
      control: getCookieDebugElementSummary(rejectControl),
    })
    return false
  }

  rejectFlowLog('CMP-specific reject clicked', {
    cmpName,
    control: getCookieDebugElementSummary(rejectControl),
  })
  incrementStat('autoRejects')
  schedulePostActionVerification({
    type: 'reject',
    container: getCMPRoot(cmpName, root),
    element: rejectControl,
  })
  stopObserver()
  setLastAction('auto_reject')
  setLastError('')
  return true
}

function attemptCMPSpecificSettingsOpen(root = document) {
  if (
    !ENABLE_CMP_SPECIFIC_HELPERS ||
    !shouldRunOnThisSite() ||
    !getProtectionModeConfig().allowSettingsOpen ||
    lightweightSettingsOpenAttempted
  ) {
    return false
  }

  const cmpName =
    getDetectedCMPName(root)

  if (!cmpName) return false

  const settingsControl =
    getCMPSpecificControls(cmpName, 'settings', root)
      .find(hasVisibleSettingsIntent)

  if (!settingsControl) return false

  if (!clickCMPSpecificControl(settingsControl)) {
    rejectFlowLog('CMP-specific settings blocked', {
      cmpName,
      control: getCookieDebugElementSummary(settingsControl),
    })
    return false
  }

  lightweightSettingsOpenAttempted = true
  rejectFlowLog('CMP-specific settings opened', {
    cmpName,
    control: getCookieDebugElementSummary(settingsControl),
  })
  stopObserver()
  setLastAction('settings_opened')
  setLastError('')

  setTimeout(() => {
    try {
      if (!shouldRunOnThisSite() || rejectFlowCompleted) return

      runLightweightVisibleTogglePass(
        getCMPRoot(cmpName, document)
      )
    } catch (error) {
      logRuntimeError('cmp_specific_settings_followup', error)
    }
  }, 900)

  return true
}

function runLightweightCMPSpecificPanelPass(panel) {
  if (!ENABLE_CMP_SPECIFIC_HELPERS) {
    return false
  }

  const cmpName =
    getDetectedCMPName(panel)

  if (!cmpName) return false

  const cmpRoot =
    getCMPRoot(cmpName, panel)
  let togglesClicked = 0

  getCMPSpecificControls(cmpName, 'toggles', cmpRoot)
    .filter((control) =>
      !isProviderOrVendorToggleContext(control) &&
      (isConsentToggleEnabled(control) || isToggleEnabled(control))
    )
    .slice(0, MAX_LIGHTWEIGHT_VISIBLE_TOGGLE_ACTIONS)
    .forEach((control) => {
      if (clickCMPSpecificControl(control)) {
        togglesClicked += 1
        incrementStat('trackersReduced')
      }
    })

  const saveControl =
    getCMPSpecificControls(cmpName, 'save', cmpRoot)[0] ||
    findFinalConfirmationControl(cmpRoot)
  const saveClicked =
    clickCMPSpecificControl(saveControl)

  rejectFlowLog('CMP-specific panel pass', {
    cmpName,
    togglesClicked,
    saveClicked,
    saveControl: getCookieDebugElementSummary(saveControl),
  })

  if (saveClicked) {
    schedulePostActionVerification({
      type: 'save',
      container: cmpRoot,
      element: saveControl,
    })
    return true
  }

  return togglesClicked > 0
}

function textMatchesLightweightSettingsSave(text) {
  const normalizedText =
    normalizeMatchText(text)

  return textHasAny(normalizedText, [
    'guardar cambios',
    'guardar configuracion',
    'guardar preferencias',
    'confirmar mis opciones',
    'confirm choices',
    'save choices',
    'apply choices',
  ])
}

function findLightweightSettingsSaveControl(panel = document) {
  const startedAt = Date.now()
  const controls =
    getDirectClickableControls(panel, {
      startedAt,
      budgetMs: SETTINGS_SAVE_LOOKUP_BUDGET_MS,
    })

  for (const control of controls) {
    if (Date.now() - startedAt >= SETTINGS_SAVE_LOOKUP_BUDGET_MS) {
      lastLightweightSettingsBudgetCapped = true
      return null
    }

      const text =
        getActionText(control)

      if (
        isVisible(control) &&
        getCookieDebugDisabledState(control) !== 'disabled' &&
        !hasUnsafeAcceptText(control) &&
        !isSensitiveActionControl(control, panel) &&
        (
          textMatchesLightweightSettingsSave(text) ||
          textMatchesDictionaryCookieIntent(text, 'savePreferences')
        )
      ) {
        return control
      }
  }

  return null
}

function getLightweightSettingsCompletionPanel(openedControl) {
  return (
    findCookiePreferencesPanel() ||
    getCookieContainer(openedControl) ||
    activeCookieContainer ||
    document
  )
}

function scheduleLightweightSettingsSaveCompletion(openedControl, candidates) {
  scheduleAutomationTimeout(() => {
    if (
      !shouldRunOnThisSite() ||
      rejectFlowCompleted ||
      !lightweightSettingsOpenAttempted
    ) {
      return
    }

    const panel =
      getLightweightSettingsCompletionPanel(openedControl)
    const saveControl =
      findLightweightSettingsSaveControl(panel)

    lastSettingsSaveDetected =
      Boolean(saveControl)

    if (!saveControl) {
      lastSettingsSaveClicked = false
      lastSettingsSaveVerification = 'save_not_found'
      recordCurrentSiteDiagnostic({
        status: 'skipped',
        reason: 'settings_save_not_found',
        candidates: panel && panel !== document ? [panel] : candidates,
        detectedControls: openedControl ? [getActionText(openedControl)] : [],
        blockedReason: lastLightweightSettingsBudgetCapped
          ? 'budget_capped'
          : '',
        settingsSaveDetected: false,
        settingsSaveClicked: false,
        settingsSaveVerification: 'save_not_found',
      })
      rejectFlowCompleted = true
      stopObserver()
      return
    }

    const clicked =
      canProcessBannerAction(saveControl) &&
      clickElementSafely(saveControl, {
        includePointerEvents: true,
      })

    lastSettingsSaveClicked =
      Boolean(clicked)

    if (!clicked) {
      lastSettingsSaveVerification = 'click_failed'
      recordCurrentSiteDiagnostic({
        status: 'failed',
        reason: 'settings_save_click_failed',
        candidates: panel && panel !== document ? [panel] : candidates,
        detectedControls: getDiagnosticControlTexts(
          panel && panel !== document ? [panel] : candidates,
          [saveControl]
        ),
        settingsSaveDetected: true,
        settingsSaveClicked: false,
        settingsSaveVerification: 'click_failed',
      })
      rejectFlowCompleted = true
      stopObserver()
      return
    }

    scheduleAutomationTimeout(() => {
      const state =
        getBannerVerificationState(panel)
      const verification =
        state.active ? 'banner_still_visible' : 'closed'

      lastSettingsSaveVerification =
        verification

      recordCurrentSiteDiagnostic({
        status: state.active ? 'settingsOpened' : 'rejected',
        reason: state.active
          ? 'settings_save_verification_failed'
          : 'settings_save_verified',
        candidates: state.container || panel
          ? [state.container || panel]
          : candidates,
        matchedRejectElement: saveControl,
        matchedRejectText: getActionText(saveControl),
        blockedReason: state.active ? 'banner_still_visible' : '',
        settingsSaveDetected: true,
        settingsSaveClicked: true,
        settingsSaveVerification: verification,
      })

      if (!state.active) {
        const verifiedContext = {
          type: 'save',
          container: state.container || panel,
          element: saveControl,
        }

        recordCookieAuditAfterSuccessfulAction(verifiedContext)
        finalizeCookieActionSuccess(verifiedContext)
        return
      }

      rejectFlowCompleted = true
      stopObserver()
    }, 900)
  }, 900)
}

function attemptLightweightSettingsOpen(candidates) {
  const startedAt = Date.now()
  lastLightweightSettingsBudgetCapped = false

  if (
    !ENABLE_LIGHTWEIGHT_SETTINGS_OPEN ||
    lightweightSettingsOpenAttempted ||
    !shouldRunOnThisSite() ||
    !getProtectionModeConfig().allowSettingsOpen
  ) {
    return false
  }

  if (
    lastDirectRejectScanBudgetCapped &&
    !hasStrongSettingsSaveSignal(
      Array.isArray(candidates) && candidates[0]
        ? candidates[0]
        : document
    )
  ) {
    lastLightweightSettingsBudgetCapped = true
    rejectFlowLog('Lightweight settings blocked: direct_scan_budget_capped', {
      reason: 'direct_scan_budget_capped',
    })
    return false
  }

  const settingsClassification =
    getSettingsAvailableClassification(candidates)

  if (!settingsClassification) {
    rejectFlowLog('Lightweight settings blocked: no_settings_available', {
      candidateCount: Array.isArray(candidates) ? candidates.length : 0,
    })
    return false
  }

  const settingsDiagnostics =
    ENABLE_VERBOSE_DIAGNOSTICS || REJECT_FLOW_DEBUG
      ? getLightweightSettingsDiagnostics(settingsClassification.candidate)
      : {
          scannedControlCount: 0,
          settingControlCount: 0,
        }

  rejectFlowLog('Lightweight settings controls scanned', {
    classification: settingsClassification.classification,
    ...settingsDiagnostics,
  })

  const control =
    findLightweightSettingsControl(settingsClassification.candidate)

  if (Date.now() - startedAt >= SETTINGS_FALLBACK_BUDGET_MS) {
    lastLightweightSettingsBudgetCapped = true
  }

  if (!control) {
    rejectFlowLog('Lightweight settings blocked: candidate_not_found', {
      classification: settingsClassification.classification,
      budgetCapped: lastLightweightSettingsBudgetCapped,
      ...settingsDiagnostics,
    })
    return false
  }

  const blockReason =
    getLightweightSettingsBlockReason(control)

  if (blockReason) {
    rejectFlowLog(`Lightweight settings blocked: ${blockReason}`, {
      reason: blockReason,
      control: getCookieDebugElementSummary(control),
    })
    return false
  }

  if (!canProcessBannerAction(control)) {
    rejectFlowLog('Lightweight settings blocked: action_gate', {
      reason: 'action_gate',
      control: getCookieDebugElementSummary(control),
    })
    return false
  }

  rejectFlowLog('Priority selected: settings', {
    control: getCookieDebugElementSummary(control),
  })

  lightweightSettingsOpenAttempted = true

  if (!clickElementSafely(control)) {
    rejectFlowLog('Lightweight settings blocked: click_failed', {
      reason: 'click_failed',
      control: getCookieDebugElementSummary(control),
    })
    return false
  }

  rejectFlowLog('Lightweight settings opened', {
    clicked: true,
    control: getCookieDebugElementSummary(control),
  })
  lastSettingsSaveDetected = false
  lastSettingsSaveClicked = false
  lastSettingsSaveVerification = 'pending'
  recordCurrentSiteDiagnostic({
    status: 'settingsOpened',
    reason: 'settings_control_clicked',
    candidates,
    detectedControls: getDiagnosticControlTexts(candidates, [control]),
    settingsSaveDetected: false,
    settingsSaveClicked: false,
    settingsSaveVerification: 'pending',
  })
  scanBudgetExhausted = true
  scheduleLightweightSettingsSaveCompletion(control, candidates)
  setLastAction('settings_opened')
  setLastError('')

  return true
}

function logCMPBannerClassifications(candidates) {
  const bannerCandidates =
    Array.isArray(candidates) && candidates.length > 0
      ? candidates
      : [document]

  const classifications =
    bannerCandidates
      .slice(0, 4)
      .map((candidate) => ({
        ...classifyCMPBanner(candidate),
        candidate: getCookieDebugElementSummary(candidate),
      }))

  rejectFlowLog('Lightweight CMP banner classification', {
    classifications,
  })

  if (isAddislineTestMode()) {
    updateAddislineTestReport({
      event: 'lightweight-banner-classification',
      bannerClassification:
        classifications[0]?.classification || 'unknownUnsafe',
      lastSkipReason:
        classifications[0]?.classification === 'settingsAvailable'
          ? 'settings_required'
          : classifications[0]?.classification === 'acceptOnlyUnsafe'
            ? 'accept_only_unsafe'
            : classifications[0]?.classification === 'unknownUnsafe'
              ? 'unknown_unsafe'
              : '',
    })
  }
}

function findDirectSafeRejectControl(decisionTrace = null) {
  if (!shouldRunOnThisSite()) {
    addDiagnosticDecisionStep(decisionTrace, {
      strategy: 'reject.direct_scan',
      status: 'skipped',
      reason: 'site_not_enabled',
    })
    return null
  }

  if (getFundingChoicesRoot(document)) {
    addDiagnosticDecisionStep(decisionTrace, {
      strategy: 'reject.direct_scan',
      status: 'skipped',
      reason: 'funding_choices_helper_active',
    })
    lastDirectRejectScanBudgetCapped = false
    return null
  }

  const startedAt = Date.now()
  lastDirectRejectScanBudgetCapped = false
  const controls =
    getDirectClickableControls(document, {
      startedAt,
      budgetMs: DIRECT_REJECT_SCAN_BUDGET_MS,
    })

  traceDirectRejectExtraction(controls)
  recordDirectClickableDiagnostics(controls)
  recordRejectCandidateDiagnostics(
    'direct_scan',
    controls,
    document
  )

  let scannedControls = 0
  let control = null

  for (const candidateControl of controls) {
    if (Date.now() - startedAt >= DIRECT_REJECT_SCAN_BUDGET_MS) {
      lastDirectRejectScanBudgetCapped = true
      break
    }

    scannedControls += 1

    if (!isVisible(candidateControl)) continue
    if (isInsideNonCookieModal(candidateControl)) continue
    if (hasUnsafeAcceptText(candidateControl)) continue
    if (hasVisibleSettingsIntent(candidateControl)) continue

    const actionText = getActionText(candidateControl)
    const hasExplicitRejectIntent =
      textMatchesDictionaryCookieIntent(actionText, 'rejectAll') ||
      textHasAny(actionText, totalRejectTexts)
    const hasRejectText =
      textHasAny(actionText, rejectTexts)

    if (
      hasExplicitRejectIntent ||
      hasRejectText
    ) {
      control = candidateControl
      break
    }

    const container =
      getCookieContainer(candidateControl) || document

    if (isSensitiveActionControl(candidateControl, container)) continue

    if (hasDirectSafeRejectSignal(candidateControl)) {
      control = candidateControl
      break
    }
  }

  addDiagnosticDecisionStep(decisionTrace, {
    strategy: 'reject.direct_scan',
    status: control ? 'found' : 'not_found',
    reason: lastDirectRejectScanBudgetCapped ? 'budget_capped' : '',
    found: control ? 1 : 0,
    scanned: scannedControls,
    elapsedMs: Date.now() - startedAt,
  })

  return control || null
}

function findDirectSettingsControl() {
  if (
    !shouldRunOnThisSite() ||
    !getProtectionModeConfig().allowSettingsOpen
  ) {
    return null
  }

  return getDirectClickableControls(document)
    .find((control) => {
      if (!isVisible(control)) return false
      if (isInsideNonCookieModal(control)) return false
      if (isSensitiveActionControl(control, document)) return false
      if (textMatchesDictionaryCookieIntent(getActionText(control), 'openSettings')) {
        cookieDebugLog('More Options detected', {
          control: getCookieDebugElementSummary(control),
        })
      }
      return hasDirectSettingsSignal(control)
    })
}

function textMatchesInitialMoreOptions(text) {
  const normalizedText =
    normalizeMatchText(text)

  return (
    textMatchesDictionaryCookieIntent(normalizedText, 'openSettings') ||
    textHasPhrase(normalizedText, 'more options') ||
    textHasPhrase(normalizedText, 'options') ||
    textHasPhrase(normalizedText, 'privacy options')
  )
}

function getInitialMoreOptionsControlText(control) {
  return normalizeMatchText([
    getActionText(control),
    control?.textContent,
    control?.innerText,
    control?.getAttribute?.('title'),
    control?.getAttribute?.('aria-label'),
  ].join(' '))
}

function getInitialMoreOptionsControls(container = document) {
  const controls = []
  const seenControls = new Set()
  const buttonSelector =
    'button, [role="button"], input[type="button"], input[type="submit"]'

  function addControl(control) {
    if (!control || seenControls.has(control)) return

    seenControls.add(control)
    controls.push(control)
  }

  if (safeMatches(container, buttonSelector)) {
    addControl(container)
  }

  getDirectClickableControls(container)
    .forEach(addControl)

  querySelectorAllDeep(buttonSelector, container)
    .forEach(addControl)

  return controls
}

function textMatchesDirectCMPFallbackNavigation(text) {
  const normalizedText =
    normalizeMatchText(text)

  return (
    textMatchesDictionaryCookieIntent(normalizedText, 'openSettings') ||
    textMatchesDictionaryCookieIntent(normalizedText, 'manageSettings') ||
    textHasPhrase(normalizedText, 'more options') ||
    textHasPhrase(normalizedText, 'options') ||
    textHasPhrase(normalizedText, 'manage settings')
  )
}

function findDirectVisibleCMPFallbackControl() {
  return Array.from(
    querySelectorAllDeep(
      [
        'button',
        'a',
        '[role="button"]',
        'input[type="button"]',
        'input[type="submit"]',
      ].join(',')
    )
  )
    .find((control) => {
      const text =
        getInitialMoreOptionsControlText(control)

      return (
        isVisible(control) &&
        getCookieDebugDisabledState(control) !== 'disabled' &&
        !isInsideNonCookieModal(control) &&
        !hasUnsafeAcceptText(control) &&
        !textMatchesDictionaryCookieIntent(text, 'avoidAcceptAll') &&
        textMatchesDirectCMPFallbackNavigation(text)
      )
    }) || null
}

function textMatchesPriorityCMPControl(text) {
  const normalizedText =
    normalizeMatchText(text)

  return (
    textMatchesDictionaryCookieIntent(normalizedText, 'rejectAll') ||
    textMatchesDictionaryCookieIntent(normalizedText, 'openSettings') ||
    textMatchesDictionaryCookieIntent(normalizedText, 'manageSettings') ||
    textHasAny(normalizedText, totalRejectTexts) ||
    textHasAny(normalizedText, rejectTexts) ||
    textHasPhrase(normalizedText, 'more options') ||
    textHasPhrase(normalizedText, 'manage settings')
  )
}

function findVisiblePriorityCMPControl() {
  return Array.from(
    querySelectorAllDeep(
      [
        'button',
        'a',
        '[role="button"]',
        'input[type="button"]',
        'input[type="submit"]',
      ].join(',')
    )
  )
    .find((control) => {
      const text =
        getInitialMoreOptionsControlText(control) ||
        getActionText(control)

      return (
        isVisible(control) &&
        getCookieDebugDisabledState(control) !== 'disabled' &&
        !isInsideNonCookieModal(control) &&
        !hasUnsafeAcceptText(control) &&
        !textMatchesDictionaryCookieIntent(text, 'avoidAcceptAll') &&
        textMatchesPriorityCMPControl(text)
      )
    }) || null
}

function hasVisiblePriorityCMPRoot() {
  return getInitialCMPRootCandidates().length > 0
}

function getVisibleLateBannerRecoveryRoots() {
  return getInitialCMPRootCandidates()
    .filter((root) =>
      root &&
      root !== document.body &&
      root !== document.documentElement &&
      isVisible(root)
    )
    .slice(0, 2)
}

function triggerLateBannerRecoveryScan(reason = 'scan_budget_exhausted') {
  if (
    lateBannerRecoveryScanUsed ||
    lateBannerRecoveryScanActive ||
    rejectFlowCompleted ||
    !isPageActiveForAutomation() ||
    !shouldRunOnThisSite() ||
    lastScanDetectedControlCount > 0
  ) {
    return false
  }

  const recoveryRoots =
    getVisibleLateBannerRecoveryRoots()

  if (recoveryRoots.length === 0) {
    return false
  }

  lateBannerRecoveryScanUsed = true
  lateBannerRecoveryScanActive = true
  scanBudgetExhausted = false

  recordCurrentSiteDiagnostic({
    status: 'skipped',
    reason: 'recovery_scan_triggered',
    candidates: recoveryRoots,
    detectedControls: [],
    blockedReason: reason,
  })

  scheduleAutomationTimeout(() => {
    runWhenIdle(() => {
      scanPage()
    })
  }, 0)

  return true
}

function scheduleLateBannerRecoveryCheck(reason = 'scan_budget_exhausted') {
  if (
    lateBannerRecoveryCheckScheduled ||
    lateBannerRecoveryScanUsed ||
    rejectFlowCompleted ||
    lastScanDetectedControlCount > 0
  ) {
    return false
  }

  lateBannerRecoveryCheckScheduled = true

  scheduleAutomationTimeout(() => {
    lateBannerRecoveryCheckScheduled = false

    if (!triggerLateBannerRecoveryScan(reason)) {
      stopObserver()
    }
  }, LATE_BANNER_RECOVERY_CHECK_DELAY_MS)

  return true
}

function hasLateHydrationCMPHint() {
  updateCMPReachabilityProbeDiagnostics()

  return (
    lastMainDocumentControlProbeCount > 0 ||
    lastShadowControlProbeCount > 0 ||
    lastIframeProbeMatchedControls.length > 0 ||
    getVisibleLateBannerRecoveryRoots().length > 0 ||
    findSameOriginIframeCMPRoots().length > 0
  )
}

function scheduleLateHydrationRecheck(reason = 'no_cmp_after_bounded_scans') {
  if (
    lateHydrationRecheckScheduled ||
    lateHydrationRecheckRan ||
    rejectFlowCompleted ||
    lastScanDetectedControlCount > 0 ||
    lastPrioritizedCmpRootsFound > 0 ||
    !isPageActiveForAutomation() ||
    !shouldRunOnThisSite()
  ) {
    return false
  }

  lateHydrationRecheckScheduled = true

  recordCurrentSiteDiagnostic({
    status: 'skipped',
    reason: 'late_hydration_recheck_scheduled',
    detectedControls: [],
    blockedReason: reason,
    lateHydrationRecheckScheduled: true,
    lateHydrationRecheckRan,
  })

  scheduleAutomationTimeout(() => {
    lateHydrationRecheckScheduled = false

    if (
      lateHydrationRecheckRan ||
      rejectFlowCompleted ||
      !isPageActiveForAutomation() ||
      !shouldRunOnThisSite()
    ) {
      return
    }

    if (!hasLateHydrationCMPHint()) {
      recordCurrentSiteDiagnostic({
        status: 'skipped',
        reason: 'late_hydration_recheck_no_hint',
        detectedControls: [],
        blockedReason: reason,
        lateHydrationRecheckScheduled: false,
        lateHydrationRecheckRan: false,
      })
      stopObserver()
      return
    }

    lateHydrationRecheckRan = true
    lateHydrationRecheckActive = true
    scanBudgetExhausted = false

    recordCurrentSiteDiagnostic({
      status: 'skipped',
      reason: 'late_hydration_recheck_ran',
      detectedControls: [],
      blockedReason: reason,
      lateHydrationRecheckScheduled: false,
      lateHydrationRecheckRan: true,
    })

    runWhenIdle(() => {
      scanPage()
    })
  }, LATE_HYDRATION_RECHECK_DELAY_MS)

  return true
}

function getInitialMoreOptionsCandidateDebug(control, container = document) {
  const text =
    getInitialMoreOptionsControlText(control)
  const visibility =
    isVisible(control)
  const disabledState =
    getCookieDebugDisabledState(control)
  const avoidAcceptAll =
    textMatchesDictionaryCookieIntent(text, 'avoidAcceptAll')
  const matchedIntent =
    textMatchesInitialMoreOptions(text)
  const nearestContainer =
    getCookieContainer(control) || container
  const sensitive =
    isSensitiveActionControl(control, nearestContainer)
  const signature =
    getInitialMoreOptionsSignature(control, nearestContainer)
  const actionCooldown =
    Boolean(
      signature &&
      Date.now() - (
        bannerActionCooldowns.get(signature) || 0
      ) < BANNER_ACTION_COOLDOWN_MS
    )
  const processed =
    processedActionElements.has(control)
  const rejectionReasons = []

  if (!visibility) rejectionReasons.push('not_visible')
  if (disabledState === 'disabled') rejectionReasons.push('disabled')
  if (isInsideNonCookieModal(control)) rejectionReasons.push('non_cookie_modal')
  if (hasUnsafeAcceptText(control)) rejectionReasons.push('unsafe_accept')
  if (avoidAcceptAll) rejectionReasons.push('avoid_accept_all')
  if (!matchedIntent) rejectionReasons.push('no_open_settings_intent')
  if (sensitive) rejectionReasons.push('sensitive_context')
  if (actionCooldown) rejectionReasons.push('action_cooldown')
  if (processed) rejectionReasons.push('processed')

  return {
    text: text.slice(0, 180),
    tagName: control?.tagName?.toLowerCase?.() || '',
    title: control?.getAttribute?.('title') || '',
    ariaLabel: control?.getAttribute?.('aria-label') || '',
    visibility: visibility ? 'visible' : 'hidden',
    disabledState,
    matchedIntent,
    avoidAcceptAll,
    actionCooldown,
    processed,
    rejectionReasons,
    control: getCookieDebugElementSummary(control),
  }
}

function getInitialMoreOptionsButtonDiagnostics(
  container = document,
  controls = []
) {
  const buttons =
    controls.filter((control) =>
      control?.tagName?.toLowerCase?.() === 'button' ||
      control?.getAttribute?.('role') === 'button' ||
      safeMatches(control, 'input[type="button"], input[type="submit"]')
    )
  const matchingButton =
    buttons.find((button) =>
      textMatchesInitialMoreOptions(
        getInitialMoreOptionsControlText(button)
      )
    )

  return {
    totalButtonsScanned: buttons.length,
    firstMatchingButton: matchingButton
      ? getInitialMoreOptionsCandidateDebug(matchingButton, container)
      : null,
    firstButtons: buttons
      .slice(0, 8)
      .map((button) =>
        getInitialMoreOptionsCandidateDebug(button, container)
      ),
  }
}

function logInitialFlowSkipped(reason, details = {}) {
  cookieDebugLog(`Initial flow skipped: ${reason}`, details)
}

function isSafeInitialMoreOptionsControl(control, container = document) {
  if (!control) return false

  const text =
    getInitialMoreOptionsControlText(control)
  const nearestContainer =
    getCookieContainer(control) || container

  return (
    isVisible(control) &&
    getCookieDebugDisabledState(control) !== 'disabled' &&
    !isInsideNonCookieModal(control) &&
    !hasUnsafeAcceptText(control) &&
    !isSensitiveActionControl(control, nearestContainer) &&
    !textMatchesDictionaryCookieIntent(text, 'avoidAcceptAll') &&
    textMatchesInitialMoreOptions(text)
  )
}

function isInitialMoreOptionsSignalControl(control) {
  if (!control) return false

  const text =
    getInitialMoreOptionsControlText(control)

  return (
    isVisible(control) &&
    getCookieDebugDisabledState(control) !== 'disabled' &&
    !isInsideNonCookieModal(control) &&
    !hasUnsafeAcceptText(control) &&
    !textMatchesDictionaryCookieIntent(text, 'avoidAcceptAll') &&
    textMatchesInitialMoreOptions(text)
  )
}

function findInitialMoreOptionsControl(container = document) {
  const controls =
    getInitialMoreOptionsControls(container)
  const matchingCandidates =
    controls
      .filter((control) =>
        textMatchesInitialMoreOptions(
          getInitialMoreOptionsControlText(control)
        )
      )
      .slice(0, 8)
      .map((control) =>
        getInitialMoreOptionsCandidateDebug(control, container)
      )

  if (matchingCandidates.length > 0) {
    cookieDebugLog('cookie.more_options.candidates', {
      count: matchingCandidates.length,
      candidates: matchingCandidates,
    })
  }

  const safeControl =
    controls.find((control) =>
    isSafeInitialMoreOptionsControl(control, container)
  ) || null

  cookieDebugLog('cookie.more_options.button_scan', {
    controlCount: controls.length,
    safeControlFound: Boolean(safeControl),
    safeControl: getCookieDebugElementSummary(safeControl),
    ...getInitialMoreOptionsButtonDiagnostics(container, controls),
  })

  return safeControl
}

function getInitialMoreOptionsSignature(control, container) {
  return normalizeMatchText(
    [
      getCurrentDomain(),
      getActionText(control).slice(0, 160),
      container ? getBannerHideSignature(container) : '',
    ].join(' ')
  ).slice(0, 420)
}

function attemptInitialMoreOptionsNavigation(
  container = document,
  rootReason = 'provided_root'
) {
  if (!ENABLE_INITIAL_MORE_OPTIONS_FLOW) {
    return false
  }

  const rootDiagnostics =
    getInitialCMPRootDiagnostics(
      container === document ? null : container,
      container === document ? 'document_fallback' : rootReason
    )

  cookieDebugLog('Starting initial CMP analysis', {
    domain: getCurrentDomain(),
    container: getCookieDebugElementSummary(container),
    ...rootDiagnostics,
    moreOptionsNavigationOpened,
    waitingForMoreOptionsPanel: Date.now() < moreOptionsNavigationOpeningUntil,
    allowSettingsOpen: getProtectionModeConfig().allowSettingsOpen,
  })

  if (moreOptionsNavigationOpened) {
    logInitialFlowSkipped('more_options_already_opened', {
      domain: getCurrentDomain(),
    })
    return false
  }

  if (!shouldRunOnThisSite()) {
    logInitialFlowSkipped('site_not_enabled', {
      domain: getCurrentDomain(),
    })
    return false
  }

  if (!getProtectionModeConfig().allowSettingsOpen) {
    logInitialFlowSkipped('settings_open_disabled_by_mode', {
      domain: getCurrentDomain(),
      mode: getNormalizedProtectionMode(),
    })
    return false
  }

  const control =
    findInitialMoreOptionsControl(container) ||
    findInitialMoreOptionsControl(document)

  if (!control) {
    logInitialFlowSkipped('more_options_control_not_found', {
      domain: getCurrentDomain(),
      container: getCookieDebugElementSummary(container),
      ...rootDiagnostics,
      containerDiagnostics: getInitialMoreOptionsButtonDiagnostics(
        container,
        getInitialMoreOptionsControls(container)
      ),
      documentDiagnostics: getInitialMoreOptionsButtonDiagnostics(
        document,
        getInitialMoreOptionsControls(document)
      ),
    })
    return false
  }

  const signature =
    getInitialMoreOptionsSignature(control, container)
  const lastClickedAt =
    moreOptionsNavigationCooldowns.get(signature) || 0

  if (
    signature &&
    Date.now() - lastClickedAt < MORE_OPTIONS_NAVIGATION_COOLDOWN_MS
  ) {
    logInitialFlowSkipped('more_options_cooldown', {
      domain: getCurrentDomain(),
      control: getInitialMoreOptionsCandidateDebug(control, container),
      cooldownMs: MORE_OPTIONS_NAVIGATION_COOLDOWN_MS,
    })
    cookieDebugLog('cookie.more_options.skipped', {
      reason: 'more_options_cooldown',
      control: getInitialMoreOptionsCandidateDebug(control, container),
    })
    return false
  }

  const canProcess =
    canProcessBannerAction(control)

  cookieDebugLog('cookie.more_options.action_gate', {
    canProcess,
    control: getInitialMoreOptionsCandidateDebug(control, container),
  })

  if (!canProcess) {
    logInitialFlowSkipped('action_cooldown_or_processed', {
      domain: getCurrentDomain(),
      control: getInitialMoreOptionsCandidateDebug(control, container),
    })
    return false
  }

  cookieDebugLog('More Options detected', {
    control: getCookieDebugElementSummary(control),
  })

  const clicked =
    clickElementSafely(control)

  cookieDebugLog('cookie.more_options.click_result', {
    clicked,
    control: getInitialMoreOptionsCandidateDebug(control, container),
  })

  if (!clicked) {
    logInitialFlowSkipped('click_failed', {
      domain: getCurrentDomain(),
      control: getInitialMoreOptionsCandidateDebug(control, container),
    })
    cookieDebugLog('cookie.more_options.click_failed', {
      control: getCookieDebugElementSummary(control),
    })
    return false
  }

  if (signature) {
    moreOptionsNavigationCooldowns.set(signature, Date.now())
  }

  moreOptionsNavigationOpened = true
  moreOptionsNavigationOpeningUntil =
    Date.now() + 1200

  cookieDebugLog('Opening More Options', {
    control: getCookieDebugElementSummary(control),
  })

  setTimeout(() => {
    const panel =
      findCookiePreferencesPanel()

    cookieDebugLog('Preferences panel opened', {
      found: Boolean(panel),
      panel: getCookieDebugElementSummary(panel),
    })

    traceDeepCMPPanelScanning('more_options_opened', panel)
  }, 900)

  schedulePreferencesFlow()
  setLastAction('settings_opened')
  setLastError('')

  return true
}

function getCookieDebugDisabledState(control) {
  if (!control) {
    return 'unknown'
  }

  if (
    control.disabled ||
    control.getAttribute?.('disabled') !== null ||
    control.getAttribute?.('aria-disabled') === 'true'
  ) {
    return 'disabled'
  }

  return 'enabled'
}

function getSettingsCandidateDebugInfo(control, container) {
  const text =
    getActionText(control)
  const visible =
    isVisible(control)
  const disabledState =
    getCookieDebugDisabledState(control)
  const insideNonCookieModal =
    isInsideNonCookieModal(control)
  const unsafeAccept =
    hasUnsafeAcceptText(control)
  const sensitive =
    isSensitiveActionControl(control, container || document)
  const dictionaryMatch =
    textMatchesDictionaryCookieIntent(text, 'openSettings')
  const legacyTextMatch =
    textHasAny(text, settingsTexts)
  const score =
    getCookieIntentScore(control, container || document, 'managePreferences')

  const rejectedBy = []

  if (!visible) rejectedBy.push('not_visible')
  if (disabledState === 'disabled') rejectedBy.push('disabled')
  if (insideNonCookieModal) rejectedBy.push('non_cookie_modal')
  if (unsafeAccept) rejectedBy.push('unsafe_accept')
  if (sensitive) rejectedBy.push('sensitive_context')
  if (!dictionaryMatch && !legacyTextMatch && score < 8) {
    rejectedBy.push('no_settings_signal')
  }

  return {
    text: text.slice(0, 160),
    tagName: control?.tagName?.toLowerCase?.() || '',
    role: control?.getAttribute?.('role') || '',
    visibility: visible ? 'visible' : 'hidden',
    disabledState,
    dictionaryMatch,
    legacyTextMatch,
    score,
    rejectedBy,
  }
}

function traceRejectedSettingsCandidates(container, reason) {
  const containerControls =
    container ? getDirectClickableControls(container) : []
  const documentControls =
    getDirectClickableControls(document)
  const controls =
    Array.from(new Set([
      ...containerControls,
      ...documentControls,
    ]))

  const candidateDetails =
    controls
      .map((control) =>
        getSettingsCandidateDebugInfo(control, container)
      )
      .filter((candidate) =>
        candidate.dictionaryMatch ||
        candidate.legacyTextMatch ||
        candidate.score > 0 ||
        textHasAny(candidate.text, ['opciones', 'options', 'choices'])
      )
      .slice(0, 12)

  cookieDebugLog('cookie.settings.candidate_extraction', {
    reason,
    containerControls: containerControls.length,
    documentControls: documentControls.length,
    tracedCandidates: candidateDetails.length,
  })

  if (candidateDetails.length > 0) {
    cookieDebugLog('cookie.settings.rejected_candidates', {
      reason,
      candidates: candidateDetails,
    })
  }
}

function getBannerActionSignature(element) {
  const container =
    getCookieContainer(element) ||
    safeClosest(
      element,
      [
        '[role="dialog"]',
        '[aria-modal="true"]',
        '[id*="cookie" i]',
        '[class*="cookie" i]',
        '[id*="consent" i]',
        '[class*="consent" i]',
        '[id*="privacy" i]',
        '[class*="privacy" i]',
      ].join(',')
    )

  return normalizeMatchText(
    [
      getCurrentDomain(),
      container ? container.id : '',
      container ? getClassNameText(container) : '',
      container ? getText(container).slice(0, 180) : '',
      getActionText(element).slice(0, 120),
    ].join(' ')
  ).slice(0, 360)
}

function getDomainActionCooldownKey() {
  return normalizeMatchText(getCurrentDomain())
}

function hasSuccessfulCookieActionCooldown() {
  const key =
    getDomainActionCooldownKey()

  if (!key) return false

  const expiresAt =
    successfulCookieActionCooldowns.get(key) || 0

  if (expiresAt <= Date.now()) {
    successfulCookieActionCooldowns.delete(key)
    return false
  }

  return true
}

function markSuccessfulCookieActionCooldown(element = null) {
  const domainKey =
    getDomainActionCooldownKey()
  const actionSignature =
    element ? getBannerActionSignature(element) : ''
  const expiresAt =
    Date.now() + COOKIE_ACTION_SUCCESS_COOLDOWN_MS

  if (domainKey) {
    successfulCookieActionCooldowns.set(domainKey, expiresAt)
  }

  if (actionSignature) {
    bannerActionCooldowns.set(actionSignature, Date.now())
  }
}

function finalizeCookieActionSuccess(context = {}) {
  recordProtectedSite(context.type || 'action', true)
  markSuccessfulCookieActionCooldown(context.element)
  rejectFlowCompleted = true
  scanBudgetExhausted = true
  clearTimeout(debounceTimer)
  clearTimeout(preferencesTimer)
  preferencesRetryTimers.forEach(clearTimeout)
  preferencesRetryTimers = []
  stopObserver()
}

function getBannerHideSignature(element) {
  const container =
    getCookieContainer(element) || element

  return normalizeMatchText(
    [
      getCurrentDomain(),
      container ? container.id : '',
      container ? getClassNameText(container) : '',
      container ? getText(container).slice(0, 220) : '',
    ].join(' ')
  ).slice(0, 360)
}

function cleanupBannerSuppressions() {
  const now = Date.now()

  for (const [signature, record] of dismissedBannerSuppressions.entries()) {
    if (!record || record.expiresAt <= now) {
      dismissedBannerSuppressions.delete(signature)
    }
  }
}

function getCmpFingerprint(element) {
  const signal =
    normalizeMatchText(
      [
        element?.id,
        getClassNameText(element),
        element?.getAttribute?.('data-testid'),
        element?.getAttribute?.('data-cmp'),
        element?.getAttribute?.('data-consent'),
        getDatasetText(element),
        getText(element).slice(0, 900),
      ].join(' ')
    )

  return knownCmpKeywords.find((keyword) =>
    textHasPhrase(signal, keyword)
  ) || 'generic-cmp'
}

function getBannerTextFingerprint(element) {
  return tokenizeMatchText(getText(element).slice(0, 900))
    .filter((token) => token.length > 2)
    .slice(0, 32)
    .join(' ')
    .slice(0, 220)
}

function getBannerSuppressionSignature(element) {
  const container =
    getCookieContainer(element) || element

  return normalizeMatchText(
    [
      getCurrentDomain(),
      getCmpFingerprint(container),
      container?.getAttribute?.('role'),
      container?.id,
      getClassNameText(container).slice(0, 140),
      getBannerTextFingerprint(container),
    ].join(' ')
  ).slice(0, 520)
}

function markBannerSuppressed(element, reason = 'dismissed') {
  if (!element) return

  const signature =
    getBannerSuppressionSignature(element)

  if (!signature) return

  dismissedBannerSuppressions.set(signature, {
    expiresAt: Date.now() + BANNER_SUPPRESSION_TTL_MS,
    hiddenCount: 0,
    reason,
  })

  log('banner suppressed', reason, signature.slice(0, 120))
}

function getBannerSuppression(element) {
  cleanupBannerSuppressions()

  const signature =
    getBannerSuppressionSignature(element)

  if (!signature) return null

  const record =
    dismissedBannerSuppressions.get(signature)

  if (!record || record.expiresAt <= Date.now()) {
    dismissedBannerSuppressions.delete(signature)
    return null
  }

  return {
    signature,
    record,
  }
}

function suppressReRenderedBanner(element) {
  if (!getProtectionModeConfig().allowSuppression) {
    updateAddislineTestReport({
      event: 'suppressReRenderedBanner:mode',
      lastSkipReason: 'suppression_disabled_by_mode',
    })
    return false
  }

  const suppression =
    getBannerSuppression(element)

  if (!suppression) {
    updateAddislineTestReport({
      event: 'suppressReRenderedBanner:none',
      lastActionResult: 'no_suppression_match',
    })
    return false
  }

  if (!isSafeToHide(element)) {
    updateAddislineTestReport({
      event: 'suppressReRenderedBanner:unsafe',
      lastSkipReason: 'suppression_not_safe_to_hide',
      lastActionResult: 'suppression_skipped',
    })
    return false
  }

  if (suppression.record.hiddenCount >= MAX_SUPPRESSION_HIDES) {
    log('banner suppression budget reached')
    updateAddislineTestReport({
      event: 'suppressReRenderedBanner:budget',
      lastSkipReason: 'suppression_budget_reached',
      lastActionResult: 'suppression_skipped',
      budgetOrCooldownBlockedWork: true,
    })
    return false
  }

  element.dataset.addislineHidden = 'true'
  element.style.setProperty('display', 'none', 'important')
  suppression.record.hiddenCount += 1
  restorePageInteractionForCookieBanner(element)
  log('banner suppressed', suppression.record.reason)
  updateAddislineTestReport({
    event: 'suppressReRenderedBanner:hidden',
    lastActionResult: 'suppressed_rerender',
  })
  return true
}

function canHideCookieBanner(element) {
  const signature =
    getBannerHideSignature(element)

  if (!signature) return true

  const existing =
    hiddenBannerCooldowns.get(signature) || {
      count: 0,
      lastHiddenAt: 0,
    }

  const now = Date.now()

  if (
    now - existing.lastHiddenAt < BANNER_HIDE_COOLDOWN_MS &&
    existing.count >= MAX_BANNER_HIDE_ATTEMPTS
  ) {
    return false
  }

  hiddenBannerCooldowns.set(signature, {
    count:
      now - existing.lastHiddenAt < BANNER_HIDE_COOLDOWN_MS
        ? existing.count + 1
        : 1,
    lastHiddenAt: now,
  })

  return true
}

function canProcessBannerAction(element) {
  if (!element) return false

  if (hasSuccessfulCookieActionCooldown()) {
    return false
  }

  if (processedActionElements.has(element)) {
    return false
  }

  const signature =
    getBannerActionSignature(element)

  const lastActionAt =
    bannerActionCooldowns.get(signature) || 0

  if (
    signature &&
    Date.now() - lastActionAt < BANNER_ACTION_COOLDOWN_MS
  ) {
    return false
  }

  if (signature) {
    bannerActionCooldowns.set(signature, Date.now())
  }

  return true
}

function getBasicRejectBlockReason(control) {
  if (!shouldRunOnThisSite()) return 'site_not_enabled'
  if (hasSuccessfulCookieActionCooldown()) return 'success_cooldown'
  if (!control) return 'candidate_not_found'
  if (!isVisible(control)) return 'not_visible'
  if (hasUnsafeAcceptText(control)) return 'unsafe_accept_text'
  if (processedActionElements.has(control)) return 'processed_state'
  if (pageActionCount >= MAX_PAGE_ACTIONS) return 'page_action_budget'

  const signature =
    getBannerActionSignature(control)
  const lastActionAt =
    bannerActionCooldowns.get(signature) || 0

  if (
    signature &&
    Date.now() - lastActionAt < BANNER_ACTION_COOLDOWN_MS
  ) {
    return 'cooldown'
  }

  return ''
}

function clickElementSafely(element, options = {}) {
  if (
    !shouldRunOnThisSite() ||
    !element ||
    !isVisible(element) ||
    hasUnsafeAcceptText(element)
  ) {
    return false
  }

  if (
    processedActionElements.has(element) &&
    !options.allowProcessedRetry
  ) {
    return false
  }

  if (!canUsePageActionBudget('clickElementSafely')) {
    return false
  }

  processedActionElements.add(element)
  try {
    const eventView =
      element.ownerDocument?.defaultView || window

    if (
      options.includePointerEvents &&
      typeof eventView.PointerEvent === 'function'
    ) {
      element.dispatchEvent(
        new eventView.PointerEvent('pointerdown', {
          bubbles: true,
          cancelable: true,
          view: eventView,
          pointerType: 'mouse',
          isPrimary: true,
        })
      )

      element.dispatchEvent(
        new eventView.PointerEvent('pointerup', {
          bubbles: true,
          cancelable: true,
          view: eventView,
          pointerType: 'mouse',
          isPrimary: true,
        })
      )
    }

    element.dispatchEvent(
      new eventView.MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: eventView,
      })
    )

    element.dispatchEvent(
      new eventView.MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        view: eventView,
      })
    )

    element.click()

    return true
  } catch (error) {
    log('Safe click failed:', error)
    return false
  }
}

function clickElementForProviderModalClose(element) {
  if (
    !shouldRunOnThisSite() ||
    !element ||
    !isVisible(element) ||
    !isSafeProviderModalCloseControl(element)
  ) {
    return false
  }

  element.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  )

  element.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  )

  element.click()

  return true
}

function decideCookieAction(container, decisionTrace = null) {
  const modeConfig =
    getProtectionModeConfig()

  function finish(action) {
    if (isAddislineTestMode()) {
      const skipReason =
        action.reason ||
        (
          action.type === 'none' && !action.element
            ? 'no_safe_action'
            : ''
        )

      updateAddislineTestReport({
        event: 'decideCookieAction',
        chosenActionType: action.type,
        chosenActionIntent: action.intent || skipReason || 'none',
        chosenCandidateSummary: getElementTestSummary(container),
        lastSkipReason: skipReason,
      })
    }

    return action
  }

  if (!shouldRunOnThisSite()) {
    addDiagnosticDecisionStep(decisionTrace, {
      strategy: 'reject.container_scan',
      status: 'skipped',
      reason: 'site_not_enabled',
    })
    return finish({
      type: 'none',
      element: null,
    })
  }

  if (!modeConfig.allowAutoReject) {
    addDiagnosticDecisionStep(decisionTrace, {
      strategy: 'reject.container_scan',
      status: 'skipped',
      reason: 'auto_reject_disabled',
    })
    return finish({
      type: 'none',
      element: null,
    })
  }

  const controls =
    getActionControls(container)
  const scannedControls =
    controls.length
  recordRejectCandidateDiagnostics(
    'candidate_scan',
    controls,
    container
  )

  const rejectAllStartedAt = Date.now()
  const totalReject =
    findBestExplicitRejectActionByIntent(container, 'rejectAll')
  addDiagnosticDecisionStep(decisionTrace, {
    strategy: 'reject.container_reject_all',
    status: totalReject ? 'found' : 'not_found',
    found: totalReject ? 1 : 0,
    scanned: scannedControls,
    elapsedMs: Date.now() - rejectAllStartedAt,
  })

  if (totalReject) {
    cookieDebugLog('cookie.reject.detected', {
      source: 'container_intent',
      intent: 'rejectAll',
      control: getCookieDebugElementSummary(totalReject),
    })

    return finish({
      type: 'reject',
      element: totalReject,
      intent: 'rejectAll',
      container,
    })
  }

  const essentialStartedAt = Date.now()
  const necessaryOnly =
    findBestExplicitRejectActionByIntent(container, 'essentialOnly')
  addDiagnosticDecisionStep(decisionTrace, {
    strategy: 'reject.container_essential_only',
    status: necessaryOnly ? 'found' : 'not_found',
    found: necessaryOnly ? 1 : 0,
    scanned: scannedControls,
    elapsedMs: Date.now() - essentialStartedAt,
  })

  if (necessaryOnly) {
    cookieDebugLog('cookie.reject.detected', {
      source: 'container_intent',
      intent: 'essentialOnly',
      control: getCookieDebugElementSummary(necessaryOnly),
    })

    return finish({
      type: 'reject',
      element: necessaryOnly,
      intent: 'essentialOnly',
      container,
    })
  }

  const categoryStartedAt = Date.now()
  const rejectCategory =
    [
      'analyticsReject',
      'marketingReject',
      'personalizationReject',
      'trackingReject',
    ]
      .map((intent) =>
        findBestExplicitRejectActionByIntent(container, intent, 10)
      )
      .find(Boolean)
  addDiagnosticDecisionStep(decisionTrace, {
    strategy: 'reject.container_category',
    status: rejectCategory ? 'found' : 'not_found',
    found: rejectCategory ? 1 : 0,
    scanned: scannedControls,
    elapsedMs: Date.now() - categoryStartedAt,
  })

  if (rejectCategory) {
    const rejectCategoryIntent =
      getBestCookieIntent(rejectCategory, container).intent

    cookieDebugLog('cookie.reject.detected', {
      source: 'category_intent',
      intent: rejectCategoryIntent,
      control: getCookieDebugElementSummary(rejectCategory),
    })

    return finish({
      type: 'reject',
      element: rejectCategory,
      intent: rejectCategoryIntent,
      container,
    })
  }

  const legacyStartedAt = Date.now()
  const reject = findBestActionByKeywords(container, rejectTexts)
  addDiagnosticDecisionStep(decisionTrace, {
    strategy: 'reject.container_legacy_keywords',
    status: reject ? 'found' : 'not_found',
    found: reject ? 1 : 0,
    scanned: scannedControls,
    elapsedMs: Date.now() - legacyStartedAt,
  })

  if (reject) {
    cookieDebugLog('cookie.reject.detected', {
      source: 'legacy_keywords',
      intent: 'rejectAll',
      control: getCookieDebugElementSummary(reject),
    })

    return finish({
      type: 'reject',
      element: reject,
      intent: 'rejectAll',
      container,
    })
  }

  if (!modeConfig.allowSettingsOpen) {
    addDiagnosticDecisionStep(decisionTrace, {
      strategy: 'settings.container_scan',
      status: 'skipped',
      reason: 'settings_open_disabled',
      scanned: scannedControls,
    })
    return finish({
      type: 'none',
      element: null,
    })
  }

  const settingsStartedAt = Date.now()
  const settings = findBestActionByIntent(container, 'managePreferences')
  addDiagnosticDecisionStep(decisionTrace, {
    strategy: 'settings.container_manage_preferences',
    status: settings ? 'found' : 'not_found',
    found: settings ? 1 : 0,
    scanned: scannedControls,
    elapsedMs: Date.now() - settingsStartedAt,
  })

  if (settings) {
    cookieDebugLog('cookie.settings.detected', {
      source: 'container_intent',
      control: getCookieDebugElementSummary(settings),
    })

    return finish({
      type: 'settings',
      element: settings,
      container,
    })
  }

  const saveStartedAt = Date.now()
  const save = findBestActionByIntent(container, 'savePreferences')
  addDiagnosticDecisionStep(decisionTrace, {
    strategy: 'settings.container_save_preferences',
    status: save ? 'found' : 'not_found',
    found: save ? 1 : 0,
    scanned: scannedControls,
    elapsedMs: Date.now() - saveStartedAt,
  })

  if (save) {
    cookieDebugLog('cookie.save.detected', {
      source: 'container_intent',
      control: getCookieDebugElementSummary(save),
    })

    return finish({
      type: 'save',
      element: save,
      container,
    })
  }

  const acceptStartedAt = Date.now()
  const accept = findBestActionByIntent(container, 'acceptAll')
  addDiagnosticDecisionStep(decisionTrace, {
    strategy: 'settings.container_accept_last_resort',
    status: accept ? 'skipped' : 'not_found',
    reason: accept ? 'accept_all_is_last_resort' : '',
    found: accept ? 1 : 0,
    scanned: scannedControls,
    elapsedMs: Date.now() - acceptStartedAt,
  })

  if (accept) {
    return finish({
      type: 'none',
      element: null,
      reason: 'accept_all_is_last_resort',
    })
  }

  return finish({
    type: 'none',
    element: null,
  })
}

function getCookieActionContextText(action, context = {}) {
  const container =
    context.container ||
    action?.container ||
    getCookieContainer(action?.element)

  return normalizeMatchText(
    [
      getActionText(action?.element),
      container ? getText(container).slice(0, 1600) : '',
      container ? getElementActionText(container).slice(0, 800) : '',
    ].join(' ')
  )
}

function buildStatsFromSuccessfulCookieAction(action, context = {}) {
  if (
    !action ||
    action.type !== 'reject' ||
    !['rejectAll', 'essentialOnly'].includes(action.intent)
  ) {
    return []
  }

  const stats = ['trackersReduced']
  const unifiedReport = context.unifiedReport || null
  const preference = unifiedReport?.preference || context.preferenceReport || null
  const contextText = getCookieActionContextText(action, context)

  const hasVendorOutcome = Boolean(
    preference?.center?.hasVendors ||
    detectVendorSection(contextText)
  )

  const hasLegitimateInterestOutcome = Boolean(
    preference?.center?.hasLegitimateInterests ||
    detectLegitimateInterestSection(contextText)
  )

  if (hasVendorOutcome) {
    stats.push('vendorsDenied')
  }

  if (hasLegitimateInterestOutcome) {
    stats.push('legitimateInterestsDisabled')
  }

  return [...new Set(stats)]
}

function recordStatsFromSuccessfulCookieAction(action, context = {}) {
  buildStatsFromSuccessfulCookieAction(action, context)
    .forEach((statName) => {
      incrementStat(statName)
    })
}

function executeCookieAction(action) {
  const modeConfig =
    getProtectionModeConfig()

  if (
    !shouldRunOnThisSite() ||
    !action ||
    !action.element
  ) {
    return false
  }

  if (
    (
      action.type === 'reject' &&
      !modeConfig.allowAutoReject
    ) ||
    (
      ['settings', 'save'].includes(action.type) &&
      !modeConfig.allowSettingsOpen
    )
  ) {
    return false
  }

  if (
    hasUnsafeAcceptText(action.element) ||
    !canProcessBannerAction(action.element)
  ) {
    return false
  }

  if (
    !clickElementSafely(action.element, {
      includePointerEvents: action.type === 'reject',
    })
  ) {
    cookieDebugLog('cookie.action.click_failed', {
      type: action.type,
      intent: action.intent || '',
      control: getCookieDebugElementSummary(action.element),
    })
    return false
  }

  if (action.type === 'reject') {
    cookieDebugLog('cookie.reject.clicked', {
      intent: action.intent || '',
      control: getCookieDebugElementSummary(action.element),
    })
    incrementStat('autoRejects')
    recordStatsFromSuccessfulCookieAction(action, {
      container: action.container,
    })
    schedulePostActionVerification({
      type: 'reject',
      container: action.container,
      element: action.element,
    })
    stopObserver()
    setLastAction('auto_reject')
    setLastError('')
    log('Consentimiento rechazado de forma segura')
  }

  if (action.type === 'settings') {
    cookieDebugLog('cookie.settings.clicked', {
      control: getCookieDebugElementSummary(action.element),
    })
    schedulePreferencesFlow()
    setLastAction('settings_opened')
    setLastError('')
    log('Configuracion de cookies abierta')
  }

  if (action.type === 'save') {
    cookieDebugLog('cookie.save.clicked', {
      control: getCookieDebugElementSummary(action.element),
    })
    schedulePostActionVerification({
      type: 'save',
      container: action.container,
      element: action.element,
    })
    setLastAction('preferences_saved')
    setLastError('')
    log('Preferencias de cookies guardadas')
  }

  return true
}

function hasActiveCookieOverlay() {
  return Array.from(
    document.querySelectorAll(
      [
        '[id*="cookie" i][class*="overlay" i]',
        '[class*="cookie" i][class*="overlay" i]',
        '[id*="consent" i][class*="overlay" i]',
        '[class*="consent" i][class*="overlay" i]',
        '[id*="cookie" i][class*="backdrop" i]',
        '[class*="cookie" i][class*="backdrop" i]',
        '[id*="consent" i][class*="backdrop" i]',
        '[class*="consent" i][class*="backdrop" i]',
      ].join(',')
    )
  ).some((overlay) =>
    isVisible(overlay) &&
    hasCookieBannerSignal(overlay) &&
    !isLikelyNonCookieModal(overlay)
  )
}

function getBannerVerificationState(container) {
  const currentContainer =
    (
      container &&
      document.documentElement.contains(container) &&
      isPotentialCookieContainer(container)
    )
      ? container
      : findCookieBannerCandidates()[0]

  const style =
    safeGetComputedStyle(currentContainer)

  const bannerVisible =
    Boolean(currentContainer && isVisible(currentContainer))

  const ariaHidden =
    currentContainer?.getAttribute?.('aria-hidden') === 'true'

  const cssHidden =
    Boolean(
      style &&
      (
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        Number(style.opacity) === 0
      )
    )

  const modalPresent =
    Boolean(
      safeMatches(
        currentContainer,
        'dialog, [role="dialog"], [aria-modal="true"]'
      ) ||
      findCookiePreferencesPanel()
    )

  const overlayPresent =
    hasActiveCookieOverlay()

  const scrollRestored =
    !hasPageScrollLock()

  return {
    active:
      Boolean(
        bannerVisible ||
        (
          modalPresent &&
          currentContainer &&
          !ariaHidden &&
          !cssHidden
        ) ||
        overlayPresent ||
        !scrollRestored
      ),
    container: currentContainer,
    bannerVisible,
    ariaHidden,
    cssHidden,
    modalPresent,
    overlayPresent,
    scrollRestored,
  }
}

function getVerificationElementStyleSummary(element) {
  const style =
    safeGetComputedStyle(element)

  return {
    display:
      String(style?.display || '').slice(0, 40),
    visibility:
      String(style?.visibility || '').slice(0, 40),
    opacity:
      String(style?.opacity || '').slice(0, 20),
    pointerEvents:
      String(style?.pointerEvents || '').slice(0, 40),
    position:
      String(style?.position || '').slice(0, 40),
    zIndex:
      String(style?.zIndex || '').slice(0, 40),
  }
}

function getVerificationRectSummary(element) {
  const rect =
    getSafeClientRect(element)

  return {
    x: rect ? Math.round(rect.x) : 0,
    y: rect ? Math.round(rect.y) : 0,
    width: rect ? Math.round(rect.width) : 0,
    height: rect ? Math.round(rect.height) : 0,
    top: rect ? Math.round(rect.top) : 0,
    bottom: rect ? Math.round(rect.bottom) : 0,
  }
}

function getConsentReplacementSummary(originalRoot, stateRoot) {
  const replacement =
    stateRoot &&
    stateRoot !== originalRoot &&
    isVisible(stateRoot)

  return {
    detected: Boolean(replacement),
    count: replacement ? 1 : 0,
    samples:
      replacement
        ? [
            {
              tagName:
                stateRoot?.tagName?.toLowerCase?.() || '',
              text:
                normalizeMatchText(
                  getElementActionText(stateRoot)
                ).slice(0, 100),
              rect:
                getVerificationRectSummary(stateRoot),
            },
          ]
        : [],
  }
}

function getRejectVerificationOutcome({
  state,
  originalRootConnected,
  originalRootVisible,
  rootHidden,
  clickedControlConnected,
  replacementDetected,
}) {
  if (replacementDetected) {
    return 'banner_replaced'
  }

  if (
    state?.active &&
    (
      !originalRootConnected ||
      !clickedControlConnected
    )
  ) {
    return 'verification_dom_stale'
  }

  if (!state?.active && !originalRootConnected) {
    return 'banner_removed'
  }

  if (!state?.active && rootHidden) {
    return 'banner_hidden'
  }

  if (
    !state?.active &&
    originalRootConnected &&
    !originalRootVisible
  ) {
    return 'root_persisted_but_inactive'
  }

  if (!state?.active) {
    return 'root_persisted_but_inactive'
  }

  return 'banner_still_active'
}

function buildRejectVerificationDiagnostics(context, state) {
  const clickedControl =
    context?.element || null
  const originalRoot =
    context?.container || null
  const stateRoot =
    state?.container || null
  const clickedControlConnected =
    Boolean(
      clickedControl &&
      document.documentElement.contains(clickedControl)
    )
  const originalRootConnected =
    Boolean(
      originalRoot &&
      document.documentElement.contains(originalRoot)
    )
  const stateRootConnected =
    Boolean(
      stateRoot &&
      document.documentElement.contains(stateRoot)
    )
  const clickedControlVisible =
    Boolean(clickedControl && isVisible(clickedControl))
  const originalRootVisible =
    Boolean(originalRoot && isVisible(originalRoot))
  const stateRootVisible =
    Boolean(stateRoot && isVisible(stateRoot))
  const rootStyle =
    getVerificationElementStyleSummary(originalRoot || stateRoot)
  const rootHidden =
    Boolean(
      state?.ariaHidden ||
      state?.cssHidden ||
      rootStyle.display === 'none' ||
      rootStyle.visibility === 'hidden' ||
      Number(rootStyle.opacity) === 0
    )
  const replacement =
    getConsentReplacementSummary(originalRoot, stateRoot)
  const outcome =
    getRejectVerificationOutcome({
      state,
      originalRootConnected,
      originalRootVisible,
      rootHidden,
      clickedControlConnected,
      replacementDetected: replacement.detected,
    })

  lastRejectVerificationDiagnostics = {
    outcome,
    clickedControlText:
      String(
        clickedControl ? getActionText(clickedControl) : ''
      ).slice(0, 120),
    verificationDelayMs: 900,
    clickedControlConnected,
    clickedControlVisible,
    clickedControlVisibility:
      clickedControl
        ? getVisibilityDiagnostic(clickedControl)
        : null,
    rootConnected: originalRootConnected,
    rootStillSame:
      Boolean(originalRoot && stateRoot && originalRoot === stateRoot),
    rootVisibility:
      originalRoot
        ? getVisibilityDiagnostic(originalRoot)
        : null,
    rootVisible: originalRootVisible,
    rootGeometry:
      getVerificationRectSummary(originalRoot || stateRoot),
    rootStyle,
    stateRootConnected,
    stateRootVisible,
    stateRootGeometry:
      getVerificationRectSummary(stateRoot),
    pageInteractionAvailable:
      Boolean(state?.scrollRestored && !hasPageScrollLock()),
    scrollRestored:
      Boolean(state?.scrollRestored),
    bannerVisible:
      Boolean(state?.bannerVisible),
    modalPresent:
      Boolean(state?.modalPresent),
    overlayPresent:
      Boolean(state?.overlayPresent),
    ariaHidden:
      Boolean(state?.ariaHidden),
    cssHidden:
      Boolean(state?.cssHidden),
    active:
      Boolean(state?.active),
    replacement,
  }

  return lastRejectVerificationDiagnostics
}

function isRejectVerificationRemovedOrInactiveSuccess(
  diagnostics,
  state
) {
  if (!diagnostics || typeof diagnostics !== 'object') {
    return false
  }

  const successfulOutcomes = [
    'verification_dom_stale',
    'banner_removed',
    'banner_hidden',
    'root_persisted_but_inactive',
  ]
  const clickedStillVisible =
    Boolean(
      diagnostics.clickedControlConnected &&
      diagnostics.clickedControlVisible
    )
  const rootStillVisible =
    Boolean(
      diagnostics.rootConnected &&
      diagnostics.rootVisible
    )
  const visibleActiveBanner =
    Boolean(
      state?.bannerVisible ||
      state?.modalPresent ||
      state?.overlayPresent
    )
  const clickedGoneOrHidden =
    Boolean(
      !diagnostics.clickedControlConnected ||
      !diagnostics.clickedControlVisible
    )
  const rootGoneOrHidden =
    Boolean(
      !diagnostics.rootConnected ||
      !diagnostics.rootVisible ||
      diagnostics.ariaHidden ||
      diagnostics.cssHidden
    )

  return (
    successfulOutcomes.includes(diagnostics.outcome) &&
    clickedGoneOrHidden &&
    rootGoneOrHidden &&
    !clickedStillVisible &&
    !rootStillVisible &&
    !visibleActiveBanner
  )
}

function runSingleVerificationFollowUp(context, state) {
  const modeConfig =
    getProtectionModeConfig()

  if (
    !shouldRunOnThisSite() ||
    (
      !modeConfig.allowHide &&
      !modeConfig.allowSettingsOpen
    )
  ) {
    return false
  }

  const container =
    state.container ||
    findCookiePreferencesPanel() ||
    findCookieBannerCandidates()[0]

  if (!container) return false

  if (context.type === 'save' && modeConfig.allowSettingsOpen) {
    const panel =
      findCookiePreferencesPanel()

    if (panel && saveCookiePreferences(panel, { skipVerification: true })) {
      return true
    }
  }

  if (modeConfig.allowSuppression && suppressReRenderedBanner(container)) {
    return true
  }

  if (modeConfig.allowHide && hideElement(container)) {
    return true
  }

  restorePageInteractionForCookieBanner(container)
  return false
}

function getRejectFallbackSettingsSignature(context, container) {
  return normalizeMatchText(
    [
      getCurrentDomain(),
      context?.intent || '',
      context?.element ? getActionText(context.element).slice(0, 120) : '',
      container ? getBannerHideSignature(container) : '',
    ].join(' ')
  ).slice(0, 420)
}

function attemptRejectFallbackSettingsFlow(context, state) {
  if (!ENABLE_SETTINGS_RETRY_FLOW) {
    return false
  }

  const modeConfig =
    getProtectionModeConfig()

  if (
    !context ||
    context.type !== 'reject' ||
    !modeConfig.allowSettingsOpen ||
    !shouldRunOnThisSite()
  ) {
    return false
  }

  const container =
    state?.container ||
    context.container ||
    findCookiePreferencesPanel() ||
    findCookieBannerCandidates()[0]

  if (!container) {
    return false
  }

  const signature =
    getRejectFallbackSettingsSignature(context, container)
  const lastFallbackAt =
    rejectFallbackSettingsCooldowns.get(signature) || 0

  if (
    signature &&
    Date.now() - lastFallbackAt < REJECT_FALLBACK_SETTINGS_COOLDOWN_MS
  ) {
    cookieDebugLog('Reject verification failed', {
      fallbackBlocked: 'cooldown',
      intent: context.intent || '',
      control: getCookieDebugElementSummary(context.element),
    })
    return false
  }

  cookieDebugLog('Reject verification failed', {
    fallbackBlocked: '',
    intent: context.intent || '',
    control: getCookieDebugElementSummary(context.element),
  })

  const settingsControl =
    findBestActionByIntent(container, 'managePreferences') ||
    findDirectSettingsControl()

  const settingsRejectedBy = []

  if (!settingsControl) {
    settingsRejectedBy.push('not_found')
  } else {
    if (hasUnsafeAcceptText(settingsControl)) {
      settingsRejectedBy.push('unsafe_accept')
    }

    if (isSensitiveActionControl(settingsControl, container)) {
      settingsRejectedBy.push('sensitive_context')
    }
  }

  if (settingsRejectedBy.length > 0) {
    cookieDebugLog('cookie.reject_fallback.settings_unavailable', {
      hasSettingsControl: Boolean(settingsControl),
      rejectedBy: settingsRejectedBy,
      control: getCookieDebugElementSummary(settingsControl),
    })
    traceRejectedSettingsCandidates(container, settingsRejectedBy.join(','))
    return false
  }

  const settingsAlreadyProcessed =
    processedActionElements.has(settingsControl)
  const settingsActionSignature =
    getBannerActionSignature(settingsControl)
  const settingsActionOnCooldown =
    Boolean(
      settingsActionSignature &&
      Date.now() - (
        bannerActionCooldowns.get(settingsActionSignature) || 0
      ) < BANNER_ACTION_COOLDOWN_MS
    )

  if (settingsAlreadyProcessed || settingsActionOnCooldown) {
    cookieDebugLog('Allowing one-time fallback settings attempt', {
      reason: settingsAlreadyProcessed
        ? 'already_processed'
        : 'action_cooldown',
      control: getCookieDebugElementSummary(settingsControl),
    })
  } else if (!canProcessBannerAction(settingsControl)) {
    cookieDebugLog('cookie.reject_fallback.settings_unavailable', {
      hasSettingsControl: true,
      rejectedBy: ['action_cooldown_or_processed'],
      control: getCookieDebugElementSummary(settingsControl),
    })
    traceRejectedSettingsCandidates(container, 'action_cooldown_or_processed')
    return false
  }

  if (signature) {
    rejectFallbackSettingsCooldowns.set(signature, Date.now())
  }

  if (
    settingsActionSignature &&
    !settingsActionOnCooldown
  ) {
    bannerActionCooldowns.set(settingsActionSignature, Date.now())
  }

  if (
    !clickElementSafely(settingsControl, {
      allowProcessedRetry: settingsAlreadyProcessed,
    })
  ) {
    cookieDebugLog('cookie.reject_fallback.settings_click_failed', {
      control: getCookieDebugElementSummary(settingsControl),
    })
    return false
  }

  cookieDebugLog('Falling back to settings flow', {
    source: 'reject_verification',
    control: getCookieDebugElementSummary(settingsControl),
  })

  schedulePreferencesFlow()
  setLastAction('settings_opened')
  setLastError('')
  log('Configuracion de cookies abierta tras rechazo fallido')

  return true
}

function schedulePostActionVerification(context = {}) {
  setTimeout(() => {
    if (!shouldRunOnThisSite()) return

    const state =
      getBannerVerificationState(context.container)
    const verificationDiagnostics =
      context.type === 'reject'
        ? buildRejectVerificationDiagnostics(context, state)
        : lastRejectVerificationDiagnostics

    cookieDebugLog('cookie.panel.verification', {
      type: context.type || '',
      active: state.active,
      bannerVisible: state.bannerVisible,
      modalPresent: state.modalPresent,
      overlayPresent: state.overlayPresent,
      scrollRestored: state.scrollRestored,
    })

    if (isAddislineTestMode()) {
      updateAddislineTestReport({
        event: 'schedulePostActionVerification',
        lastVerificationState: getVerificationTestState(state),
        lastActionResult: state.active
          ? 'verification_active'
          : 'verification_inactive',
      })
    }

    const rejectRemovedOrInactiveSuccess =
      context.type === 'reject' &&
      isRejectVerificationRemovedOrInactiveSuccess(
        verificationDiagnostics,
        state
      )

    if (!state.active || rejectRemovedOrInactiveSuccess) {
      if (context.type === 'reject') {
        recordCurrentSiteDiagnostic({
          status: 'rejected',
          reason: rejectRemovedOrInactiveSuccess
            ? 'reject_verified_after_banner_removal'
            : 'reject_verified',
          candidates: state.container || context.container
            ? [state.container || context.container]
            : [],
          matchedRejectElement: context.element,
          matchedRejectText: context.element
            ? getActionText(context.element)
            : '',
          rejectVerificationDiagnostics: verificationDiagnostics,
        })
        rejectFlowLog('Basic reject verification passed', {
          bannerVisible: state.bannerVisible,
          modalPresent: state.modalPresent,
          overlayPresent: state.overlayPresent,
          outcome:
            verificationDiagnostics?.outcome || '',
        })
      }

      cleanupCookieInteractionLeftovers(state.container || context.container)

      if (state.container || context.container) {
        markBannerSuppressed(
          state.container || context.container,
          context.type || 'verified'
        )
      }
      const verifiedContext = {
        ...context,
        container: state.container || context.container,
      }

      recordCookieAuditAfterSuccessfulAction(verifiedContext)
      finalizeCookieActionSuccess(verifiedContext)
      return
    }

    log('banner verification failed', {
      type: context.type,
      bannerVisible: state.bannerVisible,
      ariaHidden: state.ariaHidden,
      cssHidden: state.cssHidden,
      modalPresent: state.modalPresent,
      overlayPresent: state.overlayPresent,
      scrollRestored: state.scrollRestored,
    })

    if (context.type === 'reject') {
      recordCurrentSiteDiagnostic({
        status: 'failed',
        reason: 'reject_verification_failed',
        candidates: context.container ? [context.container] : [],
        matchedRejectElement: context.element,
        matchedRejectText: context.element
          ? getActionText(context.element)
          : '',
        blockedReason: 'banner_still_visible',
        rejectVerificationDiagnostics: verificationDiagnostics,
      })
      rejectFlowLog('Basic reject verification failed', {
        bannerVisible: state.bannerVisible,
        modalPresent: state.modalPresent,
        overlayPresent: state.overlayPresent,
      })
    }

    if (attemptRejectFallbackSettingsFlow(context, state)) {
      return
    }

    if (runSingleVerificationFollowUp(context, state)) {
      cleanupCookieInteractionLeftovers(state.container || context.container)
      markBannerSuppressed(
        state.container || context.container,
        `${context.type || 'action'}-follow-up`
      )
    }
  }, 900)
}

function schedulePreferencesFlow() {
  if (!ENABLE_SETTINGS_RETRY_FLOW) {
    return
  }

  clearTimeout(preferencesTimer)
  preferencesRetryTimers.forEach(clearTimeout)
  preferencesRetryTimers = []

  runCookiePreferencesRetries()
}

function runCookiePreferencesRetries() {
  const retryDelays = [
    500,
    1000,
    2000,
    3500,
    6500,
    9000,
  ]

  let completed = false

  retryDelays.forEach((delay) => {
    const retryTimer = setTimeout(() => {
      if (
        completed ||
        !shouldRunOnThisSite() ||
        !getProtectionModeConfig().allowSettingsOpen
      ) {
        return
      }

      if (handleCookiePreferences()) {
        completed = true
      }
    }, delay)

    preferencesRetryTimers.push(retryTimer)
  })
}

function parseRGBColor(value) {
  const match =
    String(value || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)

  if (!match) return null

  return {
    red: Number(match[1]),
    green: Number(match[2]),
    blue: Number(match[3]),
  }
}

function isBlueEnabledColor(value) {
  const color =
    parseRGBColor(value)

  if (!color) return false

  return (
    color.blue >= 120 &&
    color.blue > color.red + 25 &&
    color.blue > color.green - 10
  )
}

function hasVisualEnabledState(control) {
  if (!ENABLE_CUSTOM_VISUAL_SWITCH_DETECTION) return false
  if (!control || !isVisible(control)) return false

  const style =
    safeGetComputedStyle(control)
  if (!style) return false

  const classText =
    normalizeMatchText(getClassNameText(control))
  const stateText =
    normalizeMatchText([
      control.getAttribute?.('data-state'),
      control.getAttribute?.('data-checked'),
      control.getAttribute?.('data-enabled'),
      control.getAttribute?.('aria-checked'),
      control.getAttribute?.('aria-pressed'),
      classText,
    ].join(' '))

  if (
    textHasAny(stateText, [
      'active',
      'checked',
      'enabled',
      'selected',
      'switch on',
      'toggle on',
      'is on',
      'is active',
      'is checked',
    ])
  ) {
    return true
  }

  if (
    isBlueEnabledColor(style.backgroundColor) ||
    isBlueEnabledColor(style.borderColor) ||
    isBlueEnabledColor(style.color)
  ) {
    return true
  }

  const hasTranslatedKnob =
    isSwitchSizedElement(control) &&
    Array.from(control.children || [])
      .slice(0, 4)
      .some((child) => {
        if (!isVisible(child)) return false
        const transform =
          safeGetComputedStyle(child)?.transform
        const matrixMatch =
          String(transform || '').match(/matrix\([^,]+,[^,]+,[^,]+,[^,]+,\s*([-.\d]+)/)

        return matrixMatch && Number(matrixMatch[1]) > 4
      })

  if (hasTranslatedKnob) {
    return true
  }

  return Array.from(control.children || [])
    .slice(0, 4)
    .some((child) => {
      if (!isVisible(child)) return false
      const childStyle =
        safeGetComputedStyle(child)
      if (!childStyle) return false

      return (
        isBlueEnabledColor(childStyle.backgroundColor) ||
        isBlueEnabledColor(childStyle.borderColor) ||
        isBlueEnabledColor(childStyle.color)
      )
    })
}

function hasConsentOrLegitimateInterestText(text) {
  const normalizedText =
    normalizeMatchText(text)

  return (
    textHasPhrase(normalizedText, 'consent') ||
    textHasPhrase(normalizedText, 'legitimate interest') ||
    textHasPhrase(normalizedText, 'interes legitimo') ||
    textHasPhrase(normalizedText, 'intereses legitimos')
  )
}

function isSwitchSizedElement(element) {
  if (!element || !isVisible(element)) return false

  const rect =
    getSafeClientRect(element)

  if (!rect) return false

  return (
    rect.width >= 22 &&
    rect.width <= 96 &&
    rect.height >= 12 &&
    rect.height <= 52 &&
    rect.width / Math.max(rect.height, 1) >= 1.15
  )
}

function isLikelyCustomVisualSwitchControl(element) {
  if (
    !element ||
    !isVisible(element) ||
    hasUnsafeAcceptText(element)
  ) {
    return false
  }

  const classText =
    normalizeMatchText(getClassNameText(element))
  const actionText =
    normalizeMatchText(getActionText(element))
  const ariaState =
    normalizeMatchText([
      element.getAttribute?.('aria-checked'),
      element.getAttribute?.('aria-pressed'),
      element.getAttribute?.('role'),
      element.getAttribute?.('data-state'),
      element.getAttribute?.('data-checked'),
      element.getAttribute?.('data-enabled'),
    ].join(' '))

  return (
    safeMatches(
      element,
      '[aria-checked], [aria-pressed], [role="switch"], [role="checkbox"], [data-state], [data-checked], [data-enabled], [class*="switch" i], [class*="toggle" i], [class*="slider" i], button'
    ) ||
    textHasAny(classText, ['switch', 'toggle', 'slider', 'knob', 'thumb']) ||
    textHasAny(actionText, ['switch', 'toggle']) ||
    textHasAny(ariaState, ['true', 'false', 'switch', 'checkbox', 'on', 'off']) ||
    isSwitchSizedElement(element)
  )
}

function getNearbyCustomSwitchRows(container) {
  if (!ENABLE_CUSTOM_VISUAL_SWITCH_DETECTION) return []

  return querySelectorAllDeep(
    [
      'label',
      'li',
      'p',
      'div',
      'section',
      '[role="group"]',
      '[class*="row" i]',
      '[class*="item" i]',
      '[class*="purpose" i]',
      '[class*="category" i]',
      '[class*="preference" i]',
    ].join(','),
    container
  )
    .filter((element) =>
      isVisible(element) &&
      hasConsentOrLegitimateInterestText(getText(element).slice(0, 500))
    )
    .slice(0, 16)
}

function getCustomVisualToggleControls(container) {
  if (!ENABLE_CUSTOM_VISUAL_SWITCH_DETECTION) return []

  const rows =
    getNearbyCustomSwitchRows(container)
  const controls = []

  rows.forEach((row) => {
    const searchRoots =
      uniqueElements([
        row,
        row.parentElement,
        row.nextElementSibling,
        row.previousElementSibling,
      ])

    searchRoots.forEach((root) => {
      if (!root || !isVisible(root)) return

      const candidates =
        safeMatches(root, '*')
          ? [
              root,
              ...querySelectorAllDeep(
                [
                  'button',
                  'span',
                  'div',
                  '[role="switch"]',
                  '[role="checkbox"]',
                  '[aria-checked]',
                  '[aria-pressed]',
                  '[data-state]',
                  '[data-checked]',
                  '[data-enabled]',
                  '[class*="switch" i]',
                  '[class*="toggle" i]',
                  '[class*="slider" i]',
                ].join(','),
                root
              ),
            ]
          : []

      candidates
        .filter(isLikelyCustomVisualSwitchControl)
        .forEach((candidate) => controls.push(candidate))
    })
  })

  return uniqueElements(controls)
    .filter((control) =>
      isVisible(control) &&
      isElementInViewport(control) &&
      !isProviderOrVendorToggleContext(control)
    )
    .slice(0, MAX_CLICKABLE_CONTROLS_PER_SCAN)
}

function getToggleControls(container) {
  const standardControls = Array.from(
    querySelectorAllDeep(
      [
        'input[type="checkbox"]',
        'input[type="radio"]',
        '[role="checkbox"]',
        '[role="switch"]',
        '[role="slider"]',
        '[aria-checked="true"]',
        '[aria-pressed="true"]',
        'button',
        '[aria-checked]',
        '[aria-pressed]',
        '[data-state]',
        '[data-checked]',
        '[data-enabled]',
        '[data-action*="toggle" i]',
        '[data-action*="switch" i]',
        '[data-action*="vendor" i]',
        '[data-action*="partner" i]',
        '[data-action*="purpose" i]',
        '[data-action*="category" i]',
        '[data-action*="legitimate" i]',
        '[data-action*="interest" i]',
        '[class*="toggle" i]',
        '[class*="switch" i]',
        '[class*="slider" i]',
        '[class*="checkbox" i]',
        '[class*="Switch" i]',
        '[class*="Toggle" i]',
      ].join(',')
      ,
      container
    )
  )

  return uniqueElements([
    ...standardControls,
    ...getCustomVisualToggleControls(container),
  ])
}

function getNearbyPreferenceText(control) {
  const labelledBy = control.getAttribute?.('aria-labelledby') || ''
  const describedBy = control.getAttribute?.('aria-describedby') || ''

  const relatedText = `${labelledBy} ${describedBy}`
    .split(/\s+/)
    .filter(Boolean)
    .map((id) => document.getElementById(id))
    .filter(Boolean)
    .map(getText)
    .join(' ')

  const label = safeClosest(control, 'label')
  const context = safeClosest(
    control,
    [
      'li',
      'fieldset',
      '[role="group"]',
      '[class*="purpose" i]',
      '[class*="category" i]',
      '[class*="preference" i]',
      '[class*="vendor" i]',
      '[class*="partner" i]',
      '[class*="provider" i]',
      '[class*="toggle" i]',
      '[class*="switch" i]',
      'section',
      'div',
    ].join(',')
  )

  return [
    getActionText(control),
    relatedText,
    label ? getText(label) : '',
    context ? getText(context) : '',
    context ? getElementActionText(context) : '',
    control.parentElement ? getText(control.parentElement) : '',
    control.parentElement ? getElementActionText(control.parentElement) : '',
    control.previousElementSibling ? getText(control.previousElementSibling) : '',
    control.previousElementSibling ? getElementActionText(control.previousElementSibling) : '',
    control.nextElementSibling ? getText(control.nextElementSibling) : '',
    control.nextElementSibling ? getElementActionText(control.nextElementSibling) : '',

  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function getElementReferenceText(control, attributeName) {
  return (control.getAttribute?.(attributeName) || '')
    .split(/\s+/)
    .filter(Boolean)
    .map((id) => document.getElementById(id))
    .filter(Boolean)
    .map((element) =>
      [
        getText(element),
        getElementActionText(element),
      ].join(' ')
    )
    .join(' ')
}

function getAssociatedLabelText(control) {
  const controlId =
    control.id

  const explicitLabel =
    controlId
      ? document.querySelector?.(
          `label[for="${CSS.escape(controlId)}"]`
        )
      : null

  const closestLabel =
    safeClosest(control, 'label')

  return [
    explicitLabel ? getText(explicitLabel) : '',
    closestLabel ? getText(closestLabel) : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function getHeadingContextText(control) {
  const headings = []
  let current = control.parentElement
  let depth = 0

  while (
    current &&
    current !== document.body &&
    current !== document.documentElement &&
    depth < 5
  ) {
    const heading =
      current.querySelector?.(
        'h1, h2, h3, h4, h5, h6, [role="heading"]'
      )

    if (heading) {
      headings.push(getText(heading))
    }

    current = current.parentElement
    depth += 1
  }

  return headings.join(' ')
}

function getAncestorContextText(control) {
  const parts = []
  let current = control.parentElement
  let depth = 0

  while (
    current &&
    current !== document.body &&
    current !== document.documentElement &&
    depth < 4
  ) {
    parts.push(getText(current).slice(0, 800))
    parts.push(getElementActionText(current).slice(0, 800))

    current = current.parentElement
    depth += 1
  }

  const section =
    safeClosest(
      control,
      [
        'section',
        'fieldset',
        'li',
        '[role="group"]',
        '[role="tabpanel"]',
        '[role="dialog"]',
        '[aria-modal="true"]',
        '[class*="vendor" i]',
        '[class*="partner" i]',
        '[class*="provider" i]',
        '[class*="purpose" i]',
        '[class*="legitimate" i]',
        '[class*="interest" i]',
      ].join(',')
    )

  if (section) {
    parts.push(getText(section).slice(0, 1200))
    parts.push(getElementActionText(section).slice(0, 1200))
  }

  return parts.join(' ')
}

function getControlledPreferenceContextText(control) {
  const parts = []
  const tabPanel =
    safeClosest(control, '[role="tabpanel"], [id]')

  if (tabPanel?.id) {
    try {
      const tab =
        document.querySelector?.(
          `[aria-controls="${CSS.escape(tabPanel.id)}"]`
        )

      if (tab) {
        parts.push(getText(tab))
        parts.push(getElementActionText(tab))
      }
    } catch {
      // Invalid or transient tab ids can appear while CMPs render.
    }
  }

  const selectedTab =
    safeClosest(control, '[role="dialog"], [aria-modal="true"], [class*="preference" i], [class*="consent" i]')
      ?.querySelector?.('[role="tab"][aria-selected="true"]')

  if (selectedTab) {
    parts.push(getText(selectedTab))
    parts.push(getElementActionText(selectedTab))
  }

  return parts.join(' ')
}

function getPreferenceDecisionText(control) {
  return [
    getNearbyPreferenceText(control),
    getElementReferenceText(control, 'aria-labelledby'),
    getElementReferenceText(control, 'aria-describedby'),
    getAssociatedLabelText(control),
    getHeadingContextText(control),
    getAncestorContextText(control),
    getControlledPreferenceContextText(control),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function isEssentialPreferenceControl(control) {
  return textHasAny(
    getPreferenceDecisionText(control),
    essentialPreferenceTexts
  )
}

function isOptionalPreferenceControl(control) {
  const text = getPreferenceDecisionText(control)

  return (
    (
      textHasAny(text, optionalPreferenceTexts) ||
      textHasAny(text, COOKIE_INTENT_KEYWORDS.analyticsReject) ||
      textHasAny(text, COOKIE_INTENT_KEYWORDS.marketingReject) ||
      textHasAny(text, COOKIE_INTENT_KEYWORDS.personalizationReject) ||
      textHasAny(text, COOKIE_INTENT_KEYWORDS.trackingReject) ||
      textHasAny(text, COOKIE_INTENT_KEYWORDS.socialReject)
    ) &&
    !isEssentialPreferenceControl(control)
  )
}

function isExplicitToggleControl(control) {
  if (!control) return false

  const classText =
    getClassNameText(control)

  const actionText =
    getActionText(control)

  return Boolean(
    safeMatches(
      control,
      [
        'input[type="checkbox"]',
        '[role="checkbox"]',
        '[role="switch"]',
        '[role="slider"]',
        '[aria-checked]',
        '[aria-pressed]',
        '[data-state]',
        '[data-checked]',
        '[data-enabled]',
        '[class*="toggle" i]',
        '[class*="switch" i]',
        '[class*="slider" i]',
        '[class*="checkbox" i]',
        '[data-action*="toggle" i]',
        '[data-action*="switch" i]',
      ].join(',')
    ) ||
    textHasAny(classText, ['toggle', 'switch', 'slider', 'checkbox']) ||
    textHasAny(actionText, ['toggle', 'switch'])
  )
}

function getDeniedPreferenceStats(control) {
  if (
    !isExplicitToggleControl(control) ||
    isEssentialPreferenceControl(control)
  ) {
    return {
      stats: [],
      action: '',
    }
  }

  const text =
    getPreferenceDecisionText(control)

  const stats = []

  if (
    textHasAny(text, vendorCounterTexts) ||
    textHasAny(text, COOKIE_INTENT_KEYWORDS.vendorReject)
  ) {
    stats.push('vendorsDenied')
    stats.push('trackersReduced')
  }

  if (
    textHasAny(text, legitimateInterestCounterTexts) ||
    textHasAny(
      text,
      COOKIE_INTENT_KEYWORDS.legitimateInterestReject
    )
  ) {
    stats.push('legitimateInterestsDisabled')
    stats.push('trackersReduced')
  }

  if (textHasAny(text, trackerCounterTexts)) {
    stats.push('trackersReduced')
  }

  if (
    stats.length === 0 &&
    textHasAny(text, [
      'purpose',
      'purposes',
      'category',
      'categories',
    ])
  ) {
    stats.push('trackersReduced')
  }

  if (
    stats.length === 0 &&
    isOptionalPreferenceControl(control)
  ) {
    stats.push('trackersReduced')
  }

  if (stats.length === 0) {
    return {
      stats: [],
      action: '',
    }
  }

  return {
    stats: [...new Set(stats)],
    action: stats.includes('legitimateInterestsDisabled')
      ? 'legitimate_interest_disabled'
      : stats.includes('vendorsDenied')
        ? 'vendor_denied'
        : 'tracker_reduced',
  }
}

function isPreferenceSectionControl(control) {
  if (
    !control ||
    !isVisible(control) ||
    hasUnsafeAcceptText(control)
  ) {
    return false
  }

  const text =
    getActionText(control)

  if (
    !textHasAny(text, preferenceSectionTexts) &&
    getCookieIntentScore(control, null, 'managePreferences') < 6
  ) {
    return false
  }

  if (control.getAttribute?.('aria-expanded') === 'true') {
    return false
  }

  if (
    control.getAttribute?.('role') === 'tab' &&
    control.getAttribute?.('aria-selected') === 'true'
  ) {
    return false
  }

  if (
    safeMatches(
      control,
      'input[type="checkbox"], input[type="radio"], [role="switch"], [role="checkbox"], [aria-checked], [class*="toggle" i], [class*="switch" i], [class*="slider" i]'
    )
  ) {
    return false
  }

  if (textHasAny(text, essentialPreferenceTexts)) {
    return false
  }

  return (
    text.length <= 600 ||
    Boolean(
      safeMatches(
        control,
        'button, a, [role="button"], [role="tab"], [aria-controls], [aria-expanded], [data-action], [onclick], [tabindex]'
      )
    )
  )
}

function cleanupPreferenceExpansionSignatures() {
  const now = Date.now()

  for (const [signature, timestamp] of preferenceExpansionSignatures.entries()) {
    if (now - timestamp > PREFERENCE_EXPANSION_TTL_MS) {
      preferenceExpansionSignatures.delete(signature)
    }
  }
}

function getPreferencePanelSignature(panel) {
  return normalizeMatchText(
    [
      getCurrentDomain(),
      panel?.id,
      getClassNameText(panel).slice(0, 120),
      getText(panel).slice(0, 220),
    ].join(' ')
  ).slice(0, 420)
}

function canStartPreferenceTraversal(panel) {
  const modeConfig =
    getProtectionModeConfig()

  if (!modeConfig.allowDeepTraversal) {
    log('preference traversal skipped: mode')
    return false
  }

  if (preferenceTraversalActive) {
    log('preference traversal skipped: active')
    return false
  }

  if (preferenceTraversalClickCount >= modeConfig.maxTraversalClicks) {
    log('preference traversal skipped: click budget')
    return false
  }

  const signature =
    getPreferencePanelSignature(panel)

  if (!signature) return true

  const lastTraversalAt =
    preferenceTraversalCooldowns.get(signature) || 0

  if (
    Date.now() - lastTraversalAt < PREFERENCE_TRAVERSAL_COOLDOWN_MS
  ) {
    log('preference traversal skipped: cooldown')
    return false
  }

  preferenceTraversalCooldowns.set(signature, Date.now())
  preferenceTraversalActive = true

  setTimeout(() => {
    preferenceTraversalActive = false
  }, PREFERENCE_TRAVERSAL_BUDGET_MS + 1000)

  return true
}

function getPreferenceTraversalBlockReason(panel) {
  if (!isAddislineTestMode()) return ''

  if (preferenceTraversalActive) return 'active'
  const modeConfig =
    getProtectionModeConfig()

  if (!modeConfig.allowDeepTraversal) return 'mode'

  if (preferenceTraversalClickCount >= modeConfig.maxTraversalClicks) {
    return 'click_budget'
  }

  const signature =
    getPreferencePanelSignature(panel)

  if (!signature) return ''

  const lastTraversalAt =
    preferenceTraversalCooldowns.get(signature) || 0

  if (
    lastTraversalAt &&
    Date.now() - lastTraversalAt < PREFERENCE_TRAVERSAL_COOLDOWN_MS
  ) {
    return 'cooldown'
  }

  return ''
}

function getPreferenceExpansionSignature(control, depth) {
  return normalizeMatchText(
    [
      getCurrentDomain(),
      depth,
      getActionText(control).slice(0, 160),
      control?.getAttribute?.('aria-label'),
      control?.getAttribute?.('role'),
      control?.id,
      getClassNameText(control).slice(0, 120),
    ].join(' ')
  ).slice(0, 420)
}

function getPreferenceExpansionControlScore(control) {
  const text =
    normalizeMatchText(
      [
        getActionText(control),
        getNearbyActionContext(control, null).nearby,
        getAncestorContextText(control).slice(0, 700),
      ].join(' ')
    )

  let score = 0

  if (textHasAny(text, ['purpose', 'purposes', 'category', 'categories'])) {
    score += 50
  }

  if (textHasAny(text, ['vendor', 'vendors', 'partner', 'partners', 'provider', 'providers'])) {
    score += 40
  }

  if (textHasAny(text, ['legitimate interest', 'object', 'oppose', 'objection'])) {
    score += 35
  }

  if (textHasAny(text, [
    'details',
    'more options',
    'more choices',
    'expand',
    'customize',
    'customise',
    'accordion',
    'tab',
    'show more',
    'view list',
  ])) {
    score += 20
  }

  if (
    control.getAttribute?.('role') === 'tab' ||
    control.getAttribute?.('aria-controls') ||
    control.getAttribute?.('aria-expanded') === 'false'
  ) {
    score += 10
  }

  return score
}

function isSafePreferenceExpansionControl(control, panel, depth) {
  if (
    !control ||
    !isVisible(control) ||
    isInsideNonCookieModal(control) ||
    hasUnsafeAcceptText(control) ||
    isSensitiveActionControl(control, panel)
  ) {
    return false
  }

  const actionText =
    normalizeMatchText(getActionText(control))

  const contextText =
    normalizeMatchText(
      [
        actionText,
        getNearbyActionContext(control, panel).nearby,
        getAncestorContextText(control).slice(0, 700),
      ].join(' ')
    )

  const unsafeText =
    normalizeMatchText(
      [
        actionText,
        getNearbyActionContext(control, panel).nearby,
      ].join(' ')
    )

  if (
    textHasAny(unsafeText, unsafePreferenceExpansionTexts) ||
    textMatchesDictionaryCookieIntent(actionText, 'savePreferences') ||
    textHasAny(actionText, savePreferenceTexts) ||
    textMatchesDictionaryCookieIntent(actionText, 'rejectAll') ||
    textHasAny(actionText, totalRejectTexts) ||
    textHasAny(actionText, rejectTexts) ||
    textHasAny(actionText, necessaryOnlyTexts)
  ) {
    return false
  }

  if (
    control.getAttribute?.('aria-expanded') === 'true' ||
    (
      control.getAttribute?.('role') === 'tab' &&
      control.getAttribute?.('aria-selected') === 'true'
    )
  ) {
    return false
  }

  if (
    safeMatches(
      control,
      'input[type="checkbox"], input[type="radio"], [role="switch"], [role="checkbox"], [aria-checked], [class*="toggle" i], [class*="switch" i], [class*="slider" i]'
    )
  ) {
    return false
  }

  const signature =
    getPreferenceExpansionSignature(control, depth)

  if (
    signature &&
    preferenceExpansionSignatures.has(signature)
  ) {
    return false
  }

  return (
    textHasAny(contextText, preferenceExpansionTexts) ||
    (
      Boolean(
        safeMatches(
          control,
          'button, a, [role="button"], [role="tab"], [aria-controls], [aria-expanded], [data-action], [onclick], [tabindex]'
        )
      ) &&
      textHasAny(contextText, preferenceSectionTexts)
    )
  )
}

function getPreferenceTraversalSnapshot(panel) {
  if (!panel) {
    return {
      textLength: 0,
      toggleCount: 0,
      expansionCount: 0,
      actionableCount: 0,
    }
  }

  const toggles =
    getToggleControls(panel).filter(isVisible)

  const expansions =
    getDirectClickableControls(panel)
      .filter((control) =>
        isSafePreferenceExpansionControl(control, panel, 0)
      )

  return {
    textLength: getText(panel).length,
    toggleCount: toggles.length,
    expansionCount: expansions.length,
    actionableCount:
      toggles.filter(isToggleEnabled).length +
      expansions.length +
      (findBestActionByIntent(panel, 'savePreferences') ? 1 : 0),
  }
}

function hasPreferenceTraversalChanged(previous, next) {
  return Boolean(
    !previous ||
    !next ||
    previous.toggleCount !== next.toggleCount ||
    previous.expansionCount !== next.expansionCount ||
    previous.actionableCount !== next.actionableCount ||
    Math.abs(previous.textLength - next.textLength) > 40
  )
}

function traversePreferenceCenterDepth(panel, options = {}) {
  const modeConfig =
    getProtectionModeConfig()

  if (
    !shouldRunOnThisSite() ||
    !modeConfig.allowDeepTraversal ||
    !panel
  ) {
    return 0
  }

  const depth = Math.max(0, options.depth || 0)
  const startedAt = options.startedAt || Date.now()
  const maxDepth = Math.min(
    modeConfig.maxTraversalDepth,
    Math.max(1, options.maxDepth || modeConfig.maxTraversalDepth)
  )

  if (depth >= maxDepth) {
    updateAddislineTestReport({
      event: 'traversePreferenceCenterDepth:skip',
      traversalDepth: depth,
      traversalClickCount: preferenceTraversalClickCount,
      lastSkipReason: 'max_depth',
    })
    return 0
  }

  if (!canUseTraversalBudget('preference traversal')) {
    updateAddislineTestReport({
      event: 'traversePreferenceCenterDepth:budget',
      traversalDepth: depth,
      traversalClickCount: preferenceTraversalClickCount,
      lastSkipReason: 'traversal_budget',
      budgetOrCooldownBlockedWork: true,
    })
    return 0
  }

  if (Date.now() - startedAt > PREFERENCE_TRAVERSAL_BUDGET_MS) {
    log('preference traversal skipped: runtime budget')
    updateAddislineTestReport({
      event: 'traversePreferenceCenterDepth:runtime-budget',
      traversalDepth: depth,
      traversalClickCount: preferenceTraversalClickCount,
      lastSkipReason: 'runtime_budget',
      budgetOrCooldownBlockedWork: true,
    })
    return 0
  }

  if (preferenceTraversalClickCount >= modeConfig.maxTraversalClicks) {
    log('preference traversal skipped: click budget')
    updateAddislineTestReport({
      event: 'traversePreferenceCenterDepth:click-budget',
      traversalDepth: depth,
      traversalClickCount: preferenceTraversalClickCount,
      lastSkipReason: 'click_budget',
      budgetOrCooldownBlockedWork: true,
    })
    return 0
  }

  cleanupPreferenceExpansionSignatures()

  const beforeSnapshot =
    getPreferenceTraversalSnapshot(panel)

  const controls =
    getDirectClickableControls(panel)
      .filter((control) =>
        isSafePreferenceExpansionControl(control, panel, depth)
      )
      .map((control) => ({
        control,
        score: getPreferenceExpansionControlScore(control),
      }))
      .filter((candidate) => candidate.score > 0)
      .sort((first, second) => second.score - first.score)
      .slice(0, 1)

  let openedCount = 0

  if (controls.length === 0) {
    log('no new controls found')
    updateAddislineTestReport({
      event: 'traversePreferenceCenterDepth:no-controls',
      traversalDepth: depth,
      traversalClickCount: preferenceTraversalClickCount,
      expansionCount: beforeSnapshot.expansionCount,
      toggleCount: beforeSnapshot.toggleCount,
      lastSkipReason: 'no_new_controls',
    })
  }

  controls.forEach(({ control }) => {
    if (!shouldRunOnThisSite()) return

    const signature =
      getPreferenceExpansionSignature(control, depth)

    if (
      preferenceTraversalClickCount < modeConfig.maxTraversalClicks &&
      canProcessBannerAction(control) &&
      clickElementSafely(control)
    ) {
      if (signature) {
        preferenceExpansionSignatures.set(signature, Date.now())
      }

      openedCount += 1
      preferenceTraversalClickCount += 1
    }
  })

  updateAddislineTestReport({
    event: 'traversePreferenceCenterDepth',
    traversalDepth: depth,
    traversalClickCount: preferenceTraversalClickCount,
    expansionCount: beforeSnapshot.expansionCount,
    toggleCount: beforeSnapshot.toggleCount,
    lastActionResult: openedCount > 0
      ? 'expanded_section'
      : 'no_expansion',
  })

  if (openedCount > 0) {
    setTimeout(() => {
      const updatedPanel =
        findCookiePreferencesPanel() || panel
      const disabledCount =
        disableOptionalPreferenceControls(updatedPanel)
      const afterSnapshot =
        getPreferenceTraversalSnapshot(updatedPanel)

      if (disabledCount > 0) {
        saveCookiePreferences(updatedPanel)
      }

      if (
        hasPreferenceTraversalChanged(beforeSnapshot, afterSnapshot)
      ) {
        traversePreferenceCenterDepth(updatedPanel, {
          ...options,
          depth: depth + 1,
          maxDepth,
          startedAt,
        })
      } else {
        log('no new controls found')
      }
    }, 450)
  }

  return openedCount
}

function openPreferenceSections(panel) {
  if (
    !shouldRunOnThisSite() ||
    !getProtectionModeConfig().allowDeepTraversal ||
    !panel
  ) {
    return 0
  }

  let openedCount = 0

  getDirectClickableControls(panel)
    .filter(isPreferenceSectionControl)
    .slice(0, 6)
    .forEach((control) => {
      if (!shouldRunOnThisSite()) return

      if (
        canProcessBannerAction(control) &&
        clickElementSafely(control)
      ) {
        openedCount += 1
      }
    })

  return openedCount
}

function getConsentToggleState(control) {
  if (!control || !isVisible(control)) return 'unknown'

  if (
    control.disabled ||
    control.getAttribute?.('disabled') !== null ||
    control.getAttribute?.('aria-disabled') === 'true'
  ) {
    return 'disabled'
  }

  if (safeMatches(control, 'input[type="checkbox"]')) {
    return control.checked ? 'enabled' : 'disabled'
  }

  if (safeMatches(control, 'input[type="radio"]')) {
    return control.checked ? 'enabled' : 'disabled'
  }

  const role = normalizeMatchText(control.getAttribute?.('role'))
  const ariaChecked = normalizeMatchText(control.getAttribute?.('aria-checked'))
  const ariaPressed = normalizeMatchText(control.getAttribute?.('aria-pressed'))
  const checked = normalizeMatchText(control.getAttribute?.('checked'))
  const hasCheckedAttribute =
    typeof control.hasAttribute === 'function' &&
    control.hasAttribute('checked')
  const dataState = normalizeMatchText(control.getAttribute?.('data-state'))
  const dataChecked = normalizeMatchText(control.getAttribute?.('data-checked'))
  const dataEnabled = normalizeMatchText(control.getAttribute?.('data-enabled'))
  const actionText = getActionText(control)
  const classText = normalizeMatchText(getClassNameText(control))

  if (
    ariaChecked === 'false' ||
    ariaPressed === 'false' ||
    checked === 'false' ||
    dataState === 'unchecked' ||
    dataState === 'off' ||
    dataState === 'disabled' ||
    dataState === 'inactive' ||
    dataChecked === 'false' ||
    dataEnabled === 'false'
  ) {
    return 'disabled'
  }

  if (
    ariaChecked === 'true' ||
    ariaPressed === 'true' ||
    hasCheckedAttribute ||
    checked === 'true' ||
    checked === 'checked' ||
    dataState === 'checked' ||
    dataState === 'on' ||
    dataState === 'enabled' ||
    dataState === 'active' ||
    dataChecked === 'true' ||
    dataEnabled === 'true' ||
    textHasAny(actionText, [
      'enabled',
      'active',
      'selected',
      'on',
      'checked',
    ]) ||
    textHasAny(classText, [
      'active',
      'checked',
      'enabled',
      'selected',
      'switch on',
      'toggle on',
      'is on',
      'is active',
      'is checked',
    ])
  ) {
    return 'enabled'
  }

  if (hasVisualEnabledState(control)) {
    return 'enabled'
  }

  if (
    role === 'switch' ||
    role === 'checkbox'
  ) {
    return 'unknown'
  }

  return 'unknown'
}

function isConsentToggleEnabled(element) {
  return getConsentToggleState(element) === 'enabled'
}

function logConsentToggleState(control, state) {
  if (state !== 'enabled' && state !== 'disabled') return
  if (classifyToggleContext(control) !== 'optional') return

  cookieDebugLog(
    state === 'enabled'
      ? 'Toggle detected as ENABLED'
      : 'Toggle detected as DISABLED',
    {
      control: getCookieDebugElementSummary(control),
      role: control?.getAttribute?.('role') || '',
      ariaChecked: control?.getAttribute?.('aria-checked') || '',
      ariaPressed: control?.getAttribute?.('aria-pressed') || '',
    }
  )
}

function isToggleEnabled(control) {
  if (!isVisible(control)) return false

  if (
    control.disabled ||
    control.getAttribute?.('aria-disabled') === 'true'
  ) {
    return false
  }

  if (safeMatches(control, 'input[type="checkbox"]')) {
    return control.checked
  }

  if (safeMatches(control, 'input[type="radio"]')) {
    return control.checked
  }

  const ariaChecked = control.getAttribute?.('aria-checked')
  const ariaPressed = control.getAttribute?.('aria-pressed')
  const dataState = normalizeMatchText(control.getAttribute?.('data-state'))
  const dataChecked = normalizeMatchText(control.getAttribute?.('data-checked'))
  const dataEnabled = normalizeMatchText(control.getAttribute?.('data-enabled'))
  const actionText = getActionText(control)
  const classText = getClassNameText(control).toLowerCase()

  if (
    ariaChecked === 'false' ||
    ariaPressed === 'false' ||
    dataState === 'unchecked' ||
    dataState === 'off' ||
    dataState === 'disabled' ||
    dataState === 'inactive' ||
    dataChecked === 'false' ||
    dataEnabled === 'false'
  ) {
    return false
  }

  return (
    ariaChecked === 'true' ||
    ariaPressed === 'true' ||
    dataState === 'checked' ||
    dataState === 'on' ||
    dataState === 'enabled' ||
    dataState === 'active' ||
    dataChecked === 'true' ||
    dataEnabled === 'true' ||
    textHasAny(actionText, [
      'enabled',
      'active',
      'selected',
      'on',
      'checked',
    ]) ||
    classText.includes('active') ||
    classText.includes('checked') ||
    classText.includes('enabled') ||
    classText.includes('selected') ||
    classText.includes('switch-on') ||
    classText.includes('toggle-on') ||
    classText.includes('is-on')
  )
}

function getPreferenceToggleSignature(control) {
  return normalizeMatchText(
    [
      getCurrentDomain(),
      getActionText(control).slice(0, 160),
      getNearbyPreferenceText(control).slice(0, 260),
      control?.getAttribute?.('aria-label'),
      control?.getAttribute?.('aria-labelledby'),
      control?.getAttribute?.('name'),
      control?.id,
      getClassNameText(control).slice(0, 120),
    ].join(' ')
  ).slice(0, 520)
}

function isUnstablePreferenceToggle(control) {
  const signature =
    getPreferenceToggleSignature(control)

  return Boolean(
    signature &&
    unstablePreferenceToggleSignatures.has(signature)
  )
}

function markUnstablePreferenceToggle(control) {
  const signature =
    getPreferenceToggleSignature(control)

  if (!signature) return

  unstablePreferenceToggleSignatures.set(signature, Date.now())
  log('unstable toggle skipped')
}

function getExplicitPreferenceControls(container) {
  return Array.from(
    querySelectorAllDeep(
      [
        'input[type="checkbox"]',
        'input[type="radio"]',
        '[role="checkbox"]',
        '[role="switch"]',
        '[role="slider"]',
        '[aria-checked]',
        '[aria-pressed]',
        '[data-state]',
        '[data-checked]',
        '[data-enabled]',
        '[class*="toggle" i]',
        '[class*="switch" i]',
        '[class*="slider" i]',
        '[class*="checkbox" i]',
        '[data-action*="toggle" i]',
        '[data-action*="switch" i]',
        '[data-action*="vendor" i]',
        '[data-action*="partner" i]',
        '[data-action*="purpose" i]',
        '[data-action*="category" i]',
        '[data-action*="legitimate" i]',
        '[data-action*="interest" i]',
      ].join(',')
      ,
      container
    )
  )
}

function isSafeProviderModalCloseControl(control) {
  if (!control || !isVisible(control)) {
    return false
  }

  const text =
    normalizeMatchText(getActionText(control))

  if (!text) return false

  if (
    text.includes('accept') &&
    !text.includes('accept information')
  ) {
    return false
  }

  if (
    text.includes('aceptar') &&
    !text.includes('aceptar informacion')
  ) {
    return false
  }

  if (textHasAny(text, providerInfoModalUnsafeCloseTexts)) {
    return false
  }

  return textHasAny(text, providerInfoModalCloseTexts)
}

function findProviderInfoModalCloseControl(modal) {
  return getDirectClickableControls(modal)
    .find(isSafeProviderModalCloseControl)
}

function getProviderInfoModalSignature(modal) {
  return normalizeMatchText(
    [
      modal.id,
      getClassNameText(modal),
      getText(modal).slice(0, 220),
    ].join(' ')
  )
    .slice(0, 260)
}

function isProviderInfoModal(modal) {
  if (
    !modal ||
    !isVisible(modal) ||
    modal === document.body ||
    modal === document.documentElement
  ) {
    return false
  }

  const text = [
    getText(modal),
    getElementActionText(modal),
  ].join(' ')

  if (!textHasAny(text, providerInfoModalTexts)) {
    return false
  }

  if (
    getExplicitPreferenceControls(modal)
      .some((control) => isVisible(control))
  ) {
    return false
  }

  if (findActionByTexts(modal, savePreferenceTexts)) {
    return false
  }

  return Boolean(findProviderInfoModalCloseControl(modal))
}

function findProviderInfoModal() {
  return Array.from(
    document.querySelectorAll(
      [
        '[role="dialog"]',
        '[aria-modal="true"]',
        '[class*="modal" i]',
        '[class*="popup" i]',
        '[class*="overlay" i]',
        '[id*="vendor" i]',
        '[class*="vendor" i]',
        '[id*="provider" i]',
        '[class*="provider" i]',
        '[id*="partner" i]',
        '[class*="partner" i]',
        '[id*="legitimate" i]',
        '[class*="legitimate" i]',
        '[id*="interest" i]',
        '[class*="interest" i]',
      ].join(',')
    )
  )
    .filter(isProviderInfoModal)
    .sort((first, second) => {
      const firstRect =
        getSafeClientRect(first)
      const secondRect =
        getSafeClientRect(second)

      const firstArea =
        firstRect
          ? firstRect.width * firstRect.height
          : Number.POSITIVE_INFINITY

      const secondArea =
        secondRect
          ? secondRect.width * secondRect.height
          : Number.POSITIVE_INFINITY

      return firstArea - secondArea
    })[0] || null
}

function closeProviderInfoModalIfPresent() {
  if (
    !shouldRunOnThisSite() ||
    !getProtectionModeConfig().allowSettingsOpen
  ) {
    return {
      closed: false,
      loop: false,
    }
  }

  const modal =
    findProviderInfoModal()

  if (!modal) {
    return {
      closed: false,
      loop: false,
    }
  }

  const signature =
    getProviderInfoModalSignature(modal)

  cookieDebugLog('cookie.provider_modal.detected', {
    signature,
    modal: getCookieDebugElementSummary(modal),
  })

  const modalAttempts =
    providerInfoModalSignatures.get(signature) || 0

  if (
    providerInfoModalCloseAttempts >= PROVIDER_INFO_MODAL_MAX_CLOSE_ATTEMPTS ||
    modalAttempts >= PROVIDER_INFO_MODAL_MAX_CLOSE_ATTEMPTS
  ) {
    setLastAction('provider_modal_loop_detected')
    log('Bucle de modal de proveedores detectado')
    cookieDebugLog('cookie.provider_modal.loop_blocked', {
      signature,
      totalAttempts: providerInfoModalCloseAttempts,
      modalAttempts,
    })

    return {
      closed: false,
      loop: true,
    }
  }

  const closeControl =
    findProviderInfoModalCloseControl(modal)

  if (!closeControl) {
    cookieDebugLog('cookie.provider_modal.close_missing', {
      signature,
    })

    return {
      closed: false,
      loop: false,
    }
  }

  if (!clickElementForProviderModalClose(closeControl)) {
    cookieDebugLog('cookie.provider_modal.close_failed', {
      signature,
      control: getCookieDebugElementSummary(closeControl),
    })

    return {
      closed: false,
      loop: false,
    }
  }

  providerInfoModalCloseAttempts += 1
  providerInfoModalSignatures.set(signature, modalAttempts + 1)

  cookieDebugLog('cookie.provider_modal.closed', {
    signature,
    attempts: providerInfoModalCloseAttempts,
    control: getCookieDebugElementSummary(closeControl),
  })

  setTimeout(() => {
    handleCookiePreferences()
  }, 450)

  return {
    closed: true,
    loop: false,
  }
}

function findCookiePreferencesPanel() {
  const preferencePanelTexts = [
    ...bannerKeywords,
    ...preferenceSectionTexts,
    ...knownCmpKeywords,
  ]

  const candidates = Array.from(
    querySelectorAllDeep(
      [
        '[id*="cookie" i]',
        '[class*="cookie" i]',
        '[id*="consent" i]',
        '[class*="consent" i]',
        '[id*="privacy" i]',
        '[class*="privacy" i]',
        '[id*="preference" i]',
        '[class*="preference" i]',
        '[id*="vendor" i]',
        '[class*="vendor" i]',
        '[id*="partner" i]',
        '[class*="partner" i]',
        '[id*="provider" i]',
        '[class*="provider" i]',
        '[id*="proveedor" i]',
        '[class*="proveedor" i]',
        '[id*="legitimate" i]',
        '[class*="legitimate" i]',
        '[id*="interest" i]',
        '[class*="interest" i]',
        '[id*="onetrust" i]',
        '[class*="onetrust" i]',
        '[id*="ot-sdk" i]',
        '[class*="ot-sdk" i]',
        '[id*="onetrust-pc" i]',
        '[id*="didomi" i]',
        '[class*="didomi" i]',
        '[id*="didomi-popup" i]',
        '[class*="didomi-popup" i]',
        '[id*="cookiebot" i]',
        '[class*="cookiebot" i]',
        '[id*="CybotCookiebotDialog" i]',
        '[id*="trustarc" i]',
        '[class*="trustarc" i]',
        '[id*="truste" i]',
        '[class*="truste" i]',
        '[id*="usercentrics" i]',
        '[class*="usercentrics" i]',
        '[id*="uc-center" i]',
        '[class*="uc-center" i]',
        '[id*="uc-privacy" i]',
        '[class*="uc-privacy" i]',
        '[id*="quantcast" i]',
        '[class*="quantcast" i]',
        '[id*="qc-cmp" i]',
        '[class*="qc-cmp" i]',
        '[role="dialog"]',
        '[role="tabpanel"]',
        '[role="tablist"]',
        '[aria-modal="true"]',
      ].join(',')
    )
  )
    .filter(isVisible)
    .map((element) => ({
      element,
      text: getText(element),
      actionText: getElementActionText(element),
      toggleCount: getToggleControls(element).length,
      settingsControl: findActionByTexts(element, settingsTexts),
      saveControl: findActionByTexts(element, savePreferenceTexts),
      cmpSignal: hasKnownCmpSignal(element),
    }))
    .filter((candidate) =>
      (
        candidate.toggleCount > 0 ||
        candidate.settingsControl ||
        candidate.saveControl ||
        candidate.cmpSignal
      ) &&
      textHasAny(
        [
          candidate.text,
          candidate.actionText,
        ].join(' '),
        preferencePanelTexts
      )
    )
    .sort((first, second) =>
      (second.toggleCount + (second.cmpSignal ? 2 : 0)) -
      (first.toggleCount + (first.cmpSignal ? 2 : 0))
    )

  const confirmedCandidate =
    candidates.find((candidate) =>
      isConfirmedPreferencesPanel(candidate.element)
    )

  if (confirmedCandidate) {
    cookieDebugLog('Preferences panel confirmed', {
      panel: getCookieDebugElementSummary(confirmedCandidate.element),
      signals: getPanelModeSignals(confirmedCandidate.element),
    })
    return confirmedCandidate.element
  }

  if (candidates[0]) {
    cookieDebugLog('Initial consent banner detected', {
      panelCandidate: getCookieDebugElementSummary(candidates[0].element),
      signals: getPanelModeSignals(candidates[0].element),
    })
  }

  return null
}

function getPanelModeSignals(element) {
  if (!element) {
    return {
      hasMoreOptions: false,
      hasManageSettings: false,
      hasProviders: false,
      hasSave: false,
      toggleCount: 0,
    }
  }

  const actionText =
    getElementActionText(element)
  const text =
    normalizeMatchText([
      getText(element),
      actionText,
    ].join(' '))
  const controls =
    getInitialMoreOptionsControls(element)
  const hasMoreOptions =
    controls.some((control) =>
      isInitialMoreOptionsSignalControl(control)
    )
  const deepNavigationCandidates =
    getDeepCMPNavigationCandidates(element)
  const hasManageSettings =
    deepNavigationCandidates.some((candidate) =>
      candidate.intents.includes('manageSettings')
    )
  const hasProviders =
    deepNavigationCandidates.some((candidate) =>
      candidate.intents.includes('viewProviders')
    )
  const hasSave =
    textMatchesDictionaryCookieIntent(text, 'savePreferences') ||
    textHasAny(text, savePreferenceTexts)
  const toggleCount =
    getToggleControls(element).filter(isVisible).length

  return {
    hasMoreOptions,
    hasManageSettings,
    hasProviders,
    hasSave,
    toggleCount,
    deepNavigationControlCount: deepNavigationCandidates.length,
  }
}

function isConfirmedPreferencesPanel(element) {
  const signals =
    getPanelModeSignals(element)

  if (
    signals.hasMoreOptions &&
    !signals.hasManageSettings &&
    !signals.hasProviders &&
    !signals.hasSave &&
    signals.toggleCount === 0
  ) {
    return false
  }

  return (
    signals.hasManageSettings ||
    signals.hasProviders ||
    signals.hasSave ||
    signals.toggleCount > 0
  )
}

function getDeepCMPPanelRootCandidates() {
  return Array.from(
    querySelectorAllDeep(
      [
        'dialog',
        '[role="dialog"]',
        '[aria-modal="true"]',
        '[role="tabpanel"]',
        '[class*="modal" i]',
        '[class*="overlay" i]',
        '[class*="pm-section" i]',
        '[class*="page-action" i]',
        '[class*="preference" i]',
        '[class*="provider" i]',
        '[class*="vendor" i]',
        '[class*="partner" i]',
        '[class*="privacy" i]',
        '[id*="preference" i]',
        '[id*="provider" i]',
        '[id*="vendor" i]',
        '[id*="partner" i]',
        '[id*="privacy" i]',
        '[class*="pm-main" i]',
      ].join(',')
    )
  )
    .filter((element) =>
      element &&
      element !== document.body &&
      element !== document.documentElement &&
      isVisible(element)
    )
    .slice(0, 8)
}

function getDeepCMPPanelDiagnostics(root) {
  const safeRoot =
    root || document
  const buttons =
    querySelectorAllDeep('button, [role="button"]', safeRoot)
  const roleSwitchesAndCheckboxes =
    querySelectorAllDeep(
      '[role="switch"], [role="checkbox"], [aria-checked]',
      safeRoot
    )
  const checkboxInputs =
    querySelectorAllDeep('input[type="checkbox"]', safeRoot)
  const visibleClickables =
    getDirectClickableControls(safeRoot)
      .filter(isVisible)
  const traversalNodes =
    getDeepCMPTraversalNodes(safeRoot)
  const pageActionDiagnostics =
    getDeepCMPPageActionDiagnostics(safeRoot)
  const deepNavigationControls =
    getDeepCMPNavigationCandidates(safeRoot)
      .slice(0, 10)
      .map(({ control, text, intents, clickability }) => ({
        ...getCookieDebugElementSummary(control),
        extractedText: text.slice(0, 180),
        tagName: control?.tagName?.toLowerCase?.() || '',
        intents,
        clickability,
      }))

  return {
    root: getCookieDebugElementSummary(root),
    textLength: root ? getText(root).length : getText(document.body).length,
    buttonCount: buttons.length,
    roleSwitchOrCheckboxCount: roleSwitchesAndCheckboxes.length,
    checkboxInputCount: checkboxInputs.length,
    visibleClickableCount: visibleClickables.length,
    traversalNodeCount: traversalNodes.length,
    pageActionNodeCount: pageActionDiagnostics.length,
    pageActionDiagnostics,
    deepNavigationControlCount: deepNavigationControls.length,
    deepNavigationControls,
    anchorDiagnostics: getDeepCMPAnchorDiagnostics(safeRoot),
    deepAnchorScan: getDeepCMPAnchorScanDiagnostics(safeRoot),
    toggleCount: getToggleControls(safeRoot).length,
  }
}

function getVisibleDeepCMPNavigationControls(root) {
  const safeRoot =
    root || document

  return getDeepCMPNavigationCandidates(safeRoot)
    .filter(({ control, text }) => {
      if (!control || !isVisible(control)) return false
      if (hasUnsafeAcceptText(control)) return false
      if (isSensitiveActionControl(control, safeRoot)) return false
      return !textMatchesDictionaryCookieIntent(text, 'avoidAcceptAll')
    })
    .map(({ control }) => control)
}

function getDeepCMPNavigationClickabilityIndicators(control) {
  const style =
    safeGetComputedStyle(control)

  return {
    role: control?.getAttribute?.('role') || '',
    tabIndex: control?.getAttribute?.('tabindex') || '',
    href: control?.getAttribute?.('href') || '',
    hasOnClick: typeof control?.onclick === 'function' ||
      Boolean(control?.getAttribute?.('onclick')),
    hasHref: Boolean(control?.getAttribute?.('href')),
    hasAriaControls: Boolean(control?.getAttribute?.('aria-controls')),
    hasDataAction: Boolean(control?.getAttribute?.('data-action')),
    cursor: style?.cursor || '',
  }
}

function hasDeepCMPNavigationClickability(control) {
  const indicators =
    getDeepCMPNavigationClickabilityIndicators(control)

  return (
    indicators.hasOnClick ||
    indicators.hasHref ||
    indicators.hasAriaControls ||
    indicators.hasDataAction ||
    indicators.cursor === 'pointer' ||
    indicators.tabIndex !== '' ||
    ['button', 'tab', 'link'].includes(
      normalizeMatchText(indicators.role)
    ) ||
    safeMatches(control, 'button, a')
  )
}

function getDeepCMPNavigationCandidateText(control) {
  return normalizeMatchText([
    getActionText(control),
    control?.innerText,
    control?.textContent,
    getText(control).slice(0, 180),
    control?.getAttribute?.('aria-label'),
    control?.getAttribute?.('title'),
    control?.getAttribute?.('href'),
    control?.getAttribute?.('data-action'),
    control?.getAttribute?.('data-testid'),
    getDatasetText(control),
  ].join(' '))
}

function getDeepCMPTextNodeCandidateText(element) {
  return normalizeMatchText([
    element?.innerText,
    element?.textContent,
    element?.getAttribute?.('aria-label'),
    element?.getAttribute?.('title'),
    element?.getAttribute?.('data-action'),
    element?.getAttribute?.('data-testid'),
    getDatasetText(element),
  ].join(' '))
}

function getDeepCMPNavigationIntentsFromText(text) {
  return [
    textMatchesDictionaryCookieIntent(text, 'manageSettings')
      ? 'manageSettings'
      : '',
    textMatchesDictionaryCookieIntent(text, 'viewProviders')
      ? 'viewProviders'
      : '',
  ].filter(Boolean)
}

function findNearestDeepCMPClickableParent(element, root) {
  let current =
    element
  let depth = 0

  while (
    current &&
    current !== document.body &&
    current !== document.documentElement &&
    depth < 5
  ) {
    if (
      isVisible(current) &&
      hasDeepCMPNavigationClickability(current)
    ) {
      return current
    }

    if (current === root) {
      break
    }

    current = current.parentElement
    depth += 1
  }

  return null
}

function getDeepCMPTraversalNodes(root) {
  return Array.from(
    querySelectorAllDeep(
      [
        'button',
        'a',
        'div',
        'span',
        'p',
        'li',
        'section',
        'article',
        '[class*="page-action" i]',
        '[class*="pm-section" i]',
        '[role="button"]',
        '[role="tab"]',
        '[role="link"]',
        '[aria-controls]',
        '[data-action]',
        '[onclick]',
        '[tabindex]',
      ].join(','),
      root || document
    )
  )
}

function getTextBasedDeepCMPNavigationCandidates(root) {
  const safeRoot =
    root || document

  return getDeepCMPTraversalNodes(safeRoot)
    .filter((element) =>
      element &&
      element !== safeRoot &&
      isVisible(element)
    )
    .map((element) => {
      const text =
        getDeepCMPTextNodeCandidateText(element)
      const intents =
        getDeepCMPNavigationIntentsFromText(text)
      const control =
        intents.length > 0
          ? findNearestDeepCMPClickableParent(element, safeRoot)
          : null

      return {
        control,
        sourceElement: element,
        text,
        intents,
      clickability: getDeepCMPNavigationClickabilityIndicators(control),
    }
  })
    .filter((candidate) =>
      candidate.control &&
      candidate.intents.length > 0 &&
      !textMatchesDictionaryCookieIntent(candidate.text, 'avoidAcceptAll')
    )
}

function getDeepCMPPageActionDiagnostics(root) {
  return getDeepCMPTraversalNodes(root || document)
    .filter((element) =>
      textHasAny(getClassNameText(element), ['page action']) ||
      normalizeMatchText(getClassNameText(element)).includes('page action')
    )
    .slice(0, 12)
    .map((element) => {
      const text =
        getDeepCMPTextNodeCandidateText(element)
      const intents =
        getDeepCMPNavigationIntentsFromText(text)
      const clickableParent =
        findNearestDeepCMPClickableParent(element, root || document)
      const rejectionReasons = []

      if (!isVisible(element)) rejectionReasons.push('not_visible')
      if (intents.length === 0) rejectionReasons.push('no_deep_navigation_intent')
      if (textMatchesDictionaryCookieIntent(text, 'avoidAcceptAll')) {
        rejectionReasons.push('avoid_accept_all')
      }
      if (!clickableParent) rejectionReasons.push('no_clickable_parent')

      return {
        text: getText(element).slice(0, 180),
        extractedText: text.slice(0, 220),
        tagName: element.tagName?.toLowerCase?.() || '',
        className: getClassNameText(element).slice(0, 160),
        visibility: isVisible(element) ? 'visible' : 'hidden',
        intents,
        clickableParent: getCookieDebugElementSummary(clickableParent),
        clickability:
          getDeepCMPNavigationClickabilityIndicators(clickableParent),
        rejectionReasons,
      }
    })
}

function getDeepCMPNavigationCandidates(root) {
  const safeRoot =
    root || document

  const directCandidates = getDeepCMPTraversalNodes(safeRoot)
    .filter((control) =>
      control &&
      control !== safeRoot &&
      isVisible(control)
    )
    .map((control) => {
      const text =
        getDeepCMPNavigationCandidateText(control)
      const intents = [
        textMatchesDictionaryCookieIntent(text, 'manageSettings')
          ? 'manageSettings'
          : '',
        textMatchesDictionaryCookieIntent(text, 'viewProviders')
          ? 'viewProviders'
          : '',
      ].filter(Boolean)

      return {
        control,
        text,
        intents,
        clickability: getDeepCMPNavigationClickabilityIndicators(control),
      }
    })
    .filter((candidate) =>
      candidate.intents.length > 0 &&
      hasDeepCMPNavigationClickability(candidate.control) &&
      !textMatchesDictionaryCookieIntent(candidate.text, 'avoidAcceptAll')
    )

  const textCandidates =
    getTextBasedDeepCMPNavigationCandidates(safeRoot)

  const seenControls =
    new Set()

  return [
    ...directCandidates,
    ...textCandidates,
  ].filter((candidate) => {
    if (!candidate.control || seenControls.has(candidate.control)) {
      return false
    }

    seenControls.add(candidate.control)
    return true
  })
}

function getDeepCMPNavigationIntent(control, providedText = '') {
  const text =
    providedText || getDeepCMPNavigationCandidateText(control)

  if (textMatchesDictionaryCookieIntent(text, 'manageSettings')) {
    return 'manageSettings'
  }

  if (textMatchesDictionaryCookieIntent(text, 'viewProviders')) {
    return 'viewProviders'
  }

  return 'unknown'
}

function getDeepCMPAnchorDiagnostics(root) {
  return Array.from(
    querySelectorAllDeep('a', root || document)
  )
    .slice(0, 20)
    .map((anchor) => {
      const extractedText =
        getDeepCMPNavigationCandidateText(anchor)
      const visibility =
        isVisible(anchor) ? 'visible' : 'hidden'
      const intents = [
        textMatchesDictionaryCookieIntent(extractedText, 'manageSettings')
          ? 'manageSettings'
          : '',
        textMatchesDictionaryCookieIntent(extractedText, 'viewProviders')
          ? 'viewProviders'
          : '',
      ].filter(Boolean)
      const rejectionReasons = []

      if (visibility !== 'visible') rejectionReasons.push('not_visible')
      if (textMatchesDictionaryCookieIntent(extractedText, 'avoidAcceptAll')) {
        rejectionReasons.push('avoid_accept_all')
      }
      if (intents.length === 0) rejectionReasons.push('no_deep_navigation_intent')
      if (!hasDeepCMPNavigationClickability(anchor)) {
        rejectionReasons.push('not_clickable')
      }

      return {
        text: getText(anchor).slice(0, 160),
        extractedText: extractedText.slice(0, 180),
        href: anchor.getAttribute?.('href') || '',
        tagName: anchor.tagName?.toLowerCase?.() || '',
        visibility,
        intents,
        clickability: getDeepCMPNavigationClickabilityIndicators(anchor),
        rejectionReasons,
      }
    })
    .filter((diagnostic) =>
      diagnostic.intents.length > 0 ||
      textHasAny(diagnostic.extractedText, [
        'manage',
        'settings',
        'providers',
        'vendors',
        'partners',
      ])
    )
    .slice(0, 10)
}

function getAnchorComputedVisibility(anchor) {
  if (!anchor) return 'missing'

  const rect =
    getSafeClientRect(anchor)

  if (!rect) return 'invalid-geometry'

  const style =
    safeGetComputedStyle(anchor)
  if (!style) return 'invalid-style'

  if (!isVisible(anchor)) {
    return [
      'hidden',
      `display:${style.display}`,
      `visibility:${style.visibility}`,
      `opacity:${style.opacity}`,
      `rect:${Math.round(rect.width)}x${Math.round(rect.height)}`,
      `offset:${anchor.offsetWidth}x${anchor.offsetHeight}`,
    ].join(' ')
  }

  return [
    'visible',
    `display:${style.display}`,
    `visibility:${style.visibility}`,
    `opacity:${style.opacity}`,
    `rect:${Math.round(rect.width)}x${Math.round(rect.height)}`,
  ].join(' ')
}

function getAnchorNearbyText(anchor) {
  const nearbyContainer =
    safeClosest(anchor, 'li, p, div, section')

  return normalizeMatchText([
    anchor?.parentElement ? getText(anchor.parentElement).slice(0, 220) : '',
    nearbyContainer
      ? getText(nearbyContainer).slice(0, 220)
      : '',
  ].join(' ')).slice(0, 260)
}

function getDeepCMPAnchorScanDiagnostics(root) {
  const anchors =
    Array.from(querySelectorAllDeep('a', root || document))

  return {
    totalAnchorCount: anchors.length,
    firstAnchors: anchors.slice(0, 10).map((anchor) => {
      const extractedText =
        getDeepCMPNavigationCandidateText(anchor)
      const intents = [
        textMatchesDictionaryCookieIntent(extractedText, 'manageSettings')
          ? 'manageSettings'
          : '',
        textMatchesDictionaryCookieIntent(extractedText, 'viewProviders')
          ? 'viewProviders'
          : '',
      ].filter(Boolean)
      const rejectionReasons = []

      if (!isVisible(anchor)) rejectionReasons.push('not_visible')
      if (textMatchesDictionaryCookieIntent(extractedText, 'avoidAcceptAll')) {
        rejectionReasons.push('avoid_accept_all')
      }
      if (intents.length === 0) rejectionReasons.push('no_deep_navigation_intent')
      if (!hasDeepCMPNavigationClickability(anchor)) {
        rejectionReasons.push('not_clickable')
      }

      return {
        text: getText(anchor).slice(0, 180),
        extractedText: extractedText.slice(0, 220),
        nearbyText: getAnchorNearbyText(anchor),
        href: anchor.getAttribute?.('href') || '',
        tagName: anchor.tagName?.toLowerCase?.() || '',
        computedVisibility: getAnchorComputedVisibility(anchor),
        intents,
        clickability: getDeepCMPNavigationClickabilityIndicators(anchor),
        rejectionReasons,
      }
    }),
  }
}

function getDeepCMPNavigationSignature(control, panel) {
  return normalizeMatchText(
    [
      getCurrentDomain(),
      getDeepCMPNavigationIntent(control),
      getDeepCMPNavigationCandidateText(control).slice(0, 160),
      panel ? getPreferencePanelSignature(panel) : '',
    ].join(' ')
  ).slice(0, 520)
}

function attemptControlledDeepCMPNavigation(panel) {
  if (!ENABLE_DEEP_CMP_NAVIGATION) {
    return false
  }

  if (
    !panel ||
    !shouldRunOnThisSite() ||
    !getProtectionModeConfig().allowSettingsOpen
  ) {
    cookieDebugLog('cookie.deep_navigation.skipped', {
      reason: !panel
        ? 'no_panel'
        : !shouldRunOnThisSite()
          ? 'site_not_enabled'
          : 'settings_open_disabled',
    })
    return false
  }

  const controls =
    getVisibleDeepCMPNavigationControls(panel)

  cookieDebugLog('cookie.deep_navigation.controls', {
    deepNavigationControlCount: controls.length,
    firstControl: controls[0]
      ? {
          text: getActionText(controls[0]).slice(0, 160),
          extractedText:
            getDeepCMPNavigationCandidateText(controls[0]).slice(0, 180),
          href: controls[0]?.getAttribute?.('href') || '',
          tagName: controls[0]?.tagName?.toLowerCase?.() || '',
          intents: [
            textMatchesDictionaryCookieIntent(
              getDeepCMPNavigationCandidateText(controls[0]),
              'manageSettings'
            )
              ? 'manageSettings'
              : '',
            textMatchesDictionaryCookieIntent(
              getDeepCMPNavigationCandidateText(controls[0]),
              'viewProviders'
            )
              ? 'viewProviders'
              : '',
          ].filter(Boolean),
          clickability:
            getDeepCMPNavigationClickabilityIndicators(controls[0]),
        }
      : null,
  })

  if (controls[0]) {
    cookieDebugLog('Deep text navigation control detected', {
      control: getCookieDebugElementSummary(controls[0]),
      extractedText:
        getDeepCMPNavigationCandidateText(controls[0]).slice(0, 180),
      intents: getDeepCMPNavigationIntentsFromText(
        getDeepCMPNavigationCandidateText(controls[0])
      ),
      clickability:
        getDeepCMPNavigationClickabilityIndicators(controls[0]),
    })
  }

  if (deepCMPNavigationOpened) {
    cookieDebugLog('cookie.deep_navigation.skipped', {
      reason: 'already_opened',
    })
    return false
  }

  if (Date.now() < deepCMPNavigationObservationUntil) {
    cookieDebugLog('cookie.deep_navigation.skipped', {
      reason: 'observation_window',
    })
    return false
  }

  const control =
    controls.find((candidate) => {
        const signature =
          getDeepCMPNavigationSignature(candidate, panel)
        const lastClickedAt =
          deepCMPNavigationCooldowns.get(signature) || 0

        return (
          signature &&
          Date.now() - lastClickedAt >= DEEP_CMP_NAVIGATION_COOLDOWN_MS
        )
      })

  if (!control) {
    cookieDebugLog('cookie.deep_navigation.skipped', {
      reason: controls.length > 0
        ? 'cooldown'
        : 'no_controls',
    })
    return false
  }

  const intent =
    getDeepCMPNavigationIntent(control)
  const signature =
    getDeepCMPNavigationSignature(control, panel)

  if (
    !signature ||
    !canProcessBannerAction(control)
  ) {
    cookieDebugLog('cookie.deep_navigation.skipped', {
      reason: !signature
        ? 'missing_signature'
        : 'action_cooldown_or_processed',
      control: getCookieDebugElementSummary(control),
    })
    return false
  }

  if (!clickElementSafely(control)) {
    cookieDebugLog('cookie.deep_navigation.click_failed', {
      intent,
      control: getCookieDebugElementSummary(control),
    })
    return false
  }

  deepCMPNavigationCooldowns.set(signature, Date.now())
  deepCMPNavigationOpened = true
  deepCMPNavigationObservationUntil =
    Date.now() + DEEP_CMP_NAVIGATION_OBSERVATION_MS

  cookieDebugLog(
    intent === 'manageSettings'
      ? 'Opening manage settings'
      : 'Opening providers panel',
    {
      intent,
      control: getCookieDebugElementSummary(control),
    }
  )

  setTimeout(() => {
    const updatedPanel =
      findCookiePreferencesPanel() || panel

    cookieDebugLog('Deep panel updated', {
      intent,
      panel: getCookieDebugElementSummary(updatedPanel),
    })
    traceDeepCMPPanelScanning('deep_navigation_updated', updatedPanel)
  }, 900)

  return true
}

function traceDeepCMPPanelScanning(reason, preferredRoot = null) {
  if (!ENABLE_DEEP_CMP_DIAGNOSTICS) {
    return null
  }

  const panel =
    preferredRoot || findCookiePreferencesPanel()
  const roots =
    Array.from(new Set([
      panel,
      ...getDeepCMPPanelRootCandidates(),
    ].filter(Boolean)))
      .slice(0, 6)

  cookieDebugLog('cookie.deep_panel.scan', {
    reason,
    activePanelFound: Boolean(panel),
    rootCount: roots.length,
    roots: roots.map(getDeepCMPPanelDiagnostics),
  })

  if (roots[0]) {
    cookieDebugLog('deep anchor scan', {
      reason,
      root: getCookieDebugElementSummary(roots[0]),
      ...getDeepCMPAnchorScanDiagnostics(roots[0]),
    })
  }

  return panel || null
}

function scheduleTogglePersistenceVerification(panel, controls) {
  if (!ENABLE_OPTIONAL_TOGGLE_AUTOMATION) {
    return
  }

  const trackedControls =
    Array.from(new Set(controls || []))
      .filter(Boolean)
      .map((control) => ({
        control,
        signature: getPreferenceToggleSignature(control),
      }))
      .filter((entry) => entry.signature)

  if (trackedControls.length === 0) return

  setTimeout(() => {
    if (!shouldRunOnThisSite()) return

    const currentPanel =
      findCookiePreferencesPanel() || panel

    trackedControls.forEach(({ control, signature }) => {
      if (unstablePreferenceToggleSignatures.has(signature)) {
        log('unstable toggle skipped')
        return
      }

      const currentControl =
        (
          control &&
          document.documentElement.contains(control)
        )
          ? control
          : getToggleControls(currentPanel).find((candidate) =>
              getPreferenceToggleSignature(candidate) === signature
            )

      if (!currentControl || !isToggleEnabled(currentControl)) {
        return
      }

      log('toggle reverted')

      processedActionElements.delete(currentControl)

      if (
        !isUnstablePreferenceToggle(currentControl) &&
        clickElementSafely(currentControl)
      ) {
        setTimeout(() => {
          if (!shouldRunOnThisSite()) return

          if (isToggleEnabled(currentControl)) {
            markUnstablePreferenceToggle(currentControl)
            return
          }

          saveCookiePreferences(currentPanel)
        }, 300)
      } else {
        markUnstablePreferenceToggle(currentControl)
      }
    })
  }, TOGGLE_PERSISTENCE_VERIFY_MS)
}

function disableOptionalPreferenceControls(panel) {
  if (
    !ENABLE_OPTIONAL_TOGGLE_AUTOMATION ||
    !shouldRunOnThisSite() ||
    !getProtectionModeConfig().allowSettingsOpen ||
    !panel
  ) {
    return 0
  }

  let disabledCount = 0
  const disabledControls = []

  function recordDeniedPreferenceStats(control, deniedPreference, stats) {
    const uncountedStats = stats.filter((statName) =>
      (
        statName !== 'legitimateInterestsDisabled' ||
        control.dataset.addislineLegitimateCounted !== 'true'
      ) &&
      (
        statName !== 'vendorsDenied' ||
        control.dataset.addislineVendorCounted !== 'true'
      ) &&
      (
        statName !== 'trackersReduced' ||
        control.dataset.addislineTrackerCounted !== 'true'
      )
    )

    if (uncountedStats.length === 0) {
      return false
    }

    uncountedStats.forEach((statName) => {
      incrementStat(statName)
    })

    if (
      uncountedStats.includes('legitimateInterestsDisabled')
    ) {
      control.dataset.addislineLegitimateCounted = 'true'
    }

    if (uncountedStats.includes('vendorsDenied')) {
      control.dataset.addislineVendorCounted = 'true'
    }

    if (uncountedStats.includes('trackersReduced')) {
      control.dataset.addislineTrackerCounted = 'true'
    }

    setLastAction(deniedPreference.action)
    setLastError('')

    return true
  }

  getToggleControls(panel).forEach((control) => {
    if (!shouldRunOnThisSite()) return
    if (isUnstablePreferenceToggle(control)) {
      log('unstable toggle skipped')
      return
    }

    const deniedPreference =
      getDeniedPreferenceStats(control)

    const statsToIncrement =
      deniedPreference.stats.filter((statName) =>
        (
          statName !== 'legitimateInterestsDisabled' ||
          control.dataset.addislineLegitimateCounted !== 'true'
        ) &&
        (
          statName !== 'vendorsDenied' ||
          control.dataset.addislineVendorCounted !== 'true'
        ) &&
        (
          statName !== 'trackersReduced' ||
          control.dataset.addislineTrackerCounted !== 'true'
        )
      )

    if (
      isToggleEnabled(control) &&
      statsToIncrement.length > 0
    ) {
      if (clickElementSafely(control)) {
        if (
          !isToggleEnabled(control) &&
          recordDeniedPreferenceStats(
            control,
            deniedPreference,
            statsToIncrement
          )
        ) {
          disabledCount += 1
          disabledControls.push(control)
          return
        }

        setTimeout(() => {
          if (
            !shouldRunOnThisSite() ||
            isToggleEnabled(control)
          ) {
            return
          }

          if (
            recordDeniedPreferenceStats(
              control,
              deniedPreference,
              statsToIncrement
            )
          ) {
            scheduleTogglePersistenceVerification(panel, [control])
            saveCookiePreferences(panel)
          }
        }, 250)
      }
    }
  })

  if (disabledControls.length > 0) {
    scheduleTogglePersistenceVerification(panel, disabledControls)
  }

  return disabledCount
}

function findFinalConfirmationControl(panel) {
  if (!panel) return null

  const explicitSave =
    findBestActionByIntent(panel, 'savePreferences', 8) ||
    findActionByTexts(panel, savePreferenceTexts)

  if (
    explicitSave &&
    !hasUnsafeAcceptText(explicitSave) &&
    !isSensitiveActionControl(explicitSave, panel)
  ) {
    log('final confirmation found')
    cookieDebugLog('cookie.save.detected', {
      source: 'explicit_save',
      control: getCookieDebugElementSummary(explicitSave),
    })
    return explicitSave
  }

  const scoredSaveControl =
    getActionControls(panel)
    .filter((control) =>
      isVisible(control) &&
      !hasUnsafeAcceptText(control) &&
      !isSensitiveActionControl(control, panel)
    )
    .map((control) => {
      const actionText =
        getActionText(control)

      const contextText =
        normalizeMatchText(
          [
            actionText,
            getNearbyActionContext(control, panel).nearby,
            getAncestorContextText(control).slice(0, 500),
          ].join(' ')
        )

      let score =
        getCookieIntentScore(control, panel, 'savePreferences')

      if (
        textMatchesDictionaryCookieIntent(actionText, 'savePreferences') ||
        textHasAny(actionText, savePreferenceTexts)
      ) score += 30
      if (textHasAny(contextText, ['selected', 'selection', 'choices', 'preferences'])) score += 12
      if (textHasAny(actionText, ['continue', 'next', 'done', 'finish'])) score += 4
      if (textHasAny(actionText, unsafeAcceptTexts)) score -= 40

      return {
        control,
        score,
      }
    })
    .filter((candidate) => candidate.score >= 18)
    .sort((first, second) => second.score - first.score)[0]?.control || null

  if (scoredSaveControl) {
    cookieDebugLog('cookie.save.detected', {
      source: 'scored_save',
      control: getCookieDebugElementSummary(scoredSaveControl),
    })
  }

  return scoredSaveControl
}

function saveCookiePreferences(panel, options = {}) {
  if (!getProtectionModeConfig().allowSettingsOpen) {
    return false
  }

  const saveControl =
    findFinalConfirmationControl(panel)

  if (
    saveControl &&
    !hasUnsafeAcceptText(saveControl) &&
    shouldRunOnThisSite() &&
    !isSensitiveActionControl(saveControl, panel) &&
    canProcessBannerAction(saveControl)
  ) {
    if (!clickElementSafely(saveControl)) {
      cookieDebugLog('cookie.save.click_failed', {
        control: getCookieDebugElementSummary(saveControl),
      })
      return false
    }

    cookieDebugLog('cookie.save.clicked', {
      skipVerification: Boolean(options.skipVerification),
      control: getCookieDebugElementSummary(saveControl),
    })
    log('Preferencias de cookies guardadas')
    if (!options.skipVerification) {
      schedulePostActionVerification({
        type: 'save',
        container: panel,
        element: saveControl,
      })
    }
    return true
  }

  return false
}

function handleCookiePreferences() {
  const modeConfig =
    getProtectionModeConfig()

  cookieDebugLog('cookie.preferences.start', {
    shouldRun: shouldRunOnThisSite(),
    mode: getNormalizedProtectionMode(),
  })
  if (
    !shouldRunOnThisSite() ||
    !modeConfig.allowSettingsOpen
  ) {
    return false
  }

  const providerModalResult =
    closeProviderInfoModalIfPresent()

  if (providerModalResult.loop) {
    return true
  }

  if (providerModalResult.closed) {
    return false
  }

  const panel = findCookiePreferencesPanel()
  cookieDebugLog('cookie.preferences.panel', {
    found: Boolean(panel),
    panel: getCookieDebugElementSummary(panel),
  })
  if (ENABLE_DEEP_CMP_DIAGNOSTICS) {
    traceDeepCMPPanelScanning('preferences_flow', panel)
  }
  if (isAddislineTestMode()) {
    const panelSnapshot =
      panel ? getPreferenceTraversalSnapshot(panel) : null

    updateAddislineTestReport({
      event: 'handleCookiePreferences:panel',
      preferencePanelFound: Boolean(panel),
      toggleCount: panelSnapshot?.toggleCount || 0,
      expansionCount: panelSnapshot?.expansionCount || 0,
      traversalDepth: 0,
      traversalClickCount: preferenceTraversalClickCount,
      lastSkipReason: panel ? '' : 'preference_panel_not_found',
    })
  }

  if (!panel) {
    log('Panel de preferencias no encontrado')
    cookieDebugLog('cookie.preferences.panel_missing')
    return false
  }

  if (
    ENABLE_DEEP_CMP_NAVIGATION &&
    moreOptionsNavigationOpened &&
    !deepCMPNavigationOpened
  ) {
    traceDeepCMPPanelScanning('more_options_preferences_flow', panel)
    attemptControlledDeepCMPNavigation(panel)
    return false
  }

  const rejectAction = decideCookieAction(panel)
  cookieDebugLog('cookie.preferences.action', {
    type: rejectAction.type,
    intent: rejectAction.intent || rejectAction.reason || '',
    control: getCookieDebugElementSummary(rejectAction.element),
  })
  if (isAddislineTestMode()) {
    const traversalBlockReason =
      getPreferenceTraversalBlockReason(panel)

    updateAddislineTestReport({
      event: 'handleCookiePreferences:action',
      chosenActionType: rejectAction.type,
      chosenActionIntent: rejectAction.intent || rejectAction.reason || 'none',
      lastSkipReason: traversalBlockReason || rejectAction.reason || '',
      budgetOrCooldownBlockedWork: Boolean(traversalBlockReason),
    })
  }

  if (
    rejectAction.type === 'reject' &&
    executeCookieAction(rejectAction)
  ) {
    return true
  }

  if (
    ENABLE_DEEP_CMP_NAVIGATION &&
    (
      deepCMPNavigationOpened ||
      Date.now() < deepCMPNavigationObservationUntil
    )
  ) {
    traceDeepCMPPanelScanning('deep_navigation_observation', panel)
    return false
  }

  if (
    ENABLE_DEEP_CMP_NAVIGATION &&
    attemptControlledDeepCMPNavigation(panel)
  ) {
    return false
  }

  const openedSections =
    ENABLE_DEEP_PREFERENCE_TRAVERSAL &&
    modeConfig.allowDeepTraversal &&
    canStartPreferenceTraversal(panel)
      ? traversePreferenceCenterDepth(panel, {
          maxDepth: modeConfig.maxTraversalDepth,
          startedAt: Date.now(),
        })
      : 0

  const disabledCount =
    disableOptionalPreferenceControls(panel)

  if (openedSections > 0) {
    setTimeout(() => {
      const updatedPanel =
        findCookiePreferencesPanel() || panel

      const delayedDisabledCount =
        disableOptionalPreferenceControls(updatedPanel)

      if (delayedDisabledCount > 0 || disabledCount > 0) {
        saveCookiePreferences(updatedPanel)
      }
    }, 700)
  }

  if (disabledCount > 0) {
    return saveCookiePreferences(panel)
  }

  if (openedSections > 0) {
    return false
  }

  return saveCookiePreferences(panel)
}

function hideElement(element) {
  if (!shouldRunOnThisSite()) return false
  if (!getProtectionModeConfig().allowHide) return false
  if (!isSafeToHide(element)) return false
  if (!canHideCookieBanner(element)) {
    setLastAction('banner_hide_loop_blocked')
    setLastError('')
    return false
  }

  element.dataset.addislineHidden = 'true'
  element.style.setProperty('display', 'none', 'important')

  incrementStat('bannersHidden')
  setLastAction('banner_hidden')
  setLastError('')
  restorePageInteractionForCookieBanner(element)
  markBannerSuppressed(element, 'hidden')

  log('Banner ocultado')
  return true
}

function shouldDeferScanForLoading() {
  if (
    document.readyState !== 'loading' ||
    loadingScanDeferred ||
    (
      performance?.now?.() || PAGE_LOADING_SCAN_DELAY_MS
    ) > PAGE_LOADING_SCAN_DELAY_MS
  ) {
    return false
  }

  loadingScanDeferred = true
  setTimeout(() => {
    loadingScanDeferred = false
    scheduleScan()
  }, PAGE_LOADING_SCAN_DELAY_MS)

  return true
}

function canRunPageScan(source = 'scan') {
  if (!isPageActiveForAutomation()) {
    return false
  }

  if (lateBannerRecoveryScanActive) {
    lateBannerRecoveryScanActive = false
    pageScanCount += 1
    return true
  }

  if (lateHydrationRecheckActive) {
    lateHydrationRecheckActive = false
    pageScanCount += 1
    return true
  }

  if (scanBudgetExhausted || rejectFlowCompleted) {
    return false
  }

  if (pageScanCount >= MAX_SCANS_PER_PAGE) {
    scanBudgetExhausted = true
    recordCurrentSiteDiagnostic({
      status: 'skipped',
      reason: 'scan_budget_exhausted',
      blockedReason: source,
    })
    scheduleLateDiagnosticSnapshot('scan_budget_exhausted')
    if (scheduleLateHydrationRecheck(source)) {
      return false
    }
    if (triggerLateBannerRecoveryScan(source)) {
      return false
    }
    rejectFlowLog('Basic reject blocked: scan_budget_exhausted', {
      source,
      maxScans: MAX_SCANS_PER_PAGE,
    })
    stopObserver()
    return false
  }

  pageScanCount += 1
  return true
}

function scanPage() {
  try {
    if (!canRunPageScan('scanPage')) {
      return
    }

    const decisionTrace =
      createDiagnosticDecisionTrace('scanPage')
    updateLastDiagnosticDecisionTrace(decisionTrace)
    resetRejectCandidateDiagnostics()
    resetDirectClickableDiagnostics()
    resetCookieTextScopeDiagnostics()
    resetDomScopeDiagnostics()
    resetIframeAccessibilityDiagnostics()
    resetBottomBannerDiagnostics()
    resetExperimentalBottomBannerProbe()
    resetRejectVerificationDiagnostics()

    const modeConfig =
      getProtectionModeConfig()

    if (!shouldRunOnThisSite()) {
      logInitialFlowSkipped('site_not_enabled_before_scan', {
        domain: getCurrentDomain(),
      })
      recordCurrentSiteDiagnostic({
        status: 'skipped',
        reason: 'site_not_enabled',
      })
      updateAddislineTestReport({
        event: 'scanPage:stop',
        lastSkipReason: 'site_not_enabled',
      })
      stopObserver()
      return
    }

    cleanupBannerSuppressions()

    if (attemptVisibleFundingChoicesManageVendorsNormalFlow(decisionTrace)) {
      if (
        lastDiagnosticDecisionTrace &&
        Array.isArray(lastDiagnosticDecisionTrace.steps)
      ) {
        decisionTrace.steps = lastDiagnosticDecisionTrace.steps.slice()
      }
      updateLastDiagnosticDecisionTrace(decisionTrace)
      return
    }

    if (shouldDeferScanForLoading()) {
      logInitialFlowSkipped('page_loading_deferred', {
        domain: getCurrentDomain(),
        readyState: document.readyState,
      })
      updateAddislineTestReport({
        event: 'scanPage:deferred',
        lastSkipReason: 'page_loading',
        budgetOrCooldownBlockedWork: true,
      })
      recordCurrentSiteDiagnostic({
        status: 'skipped',
        reason: 'page_loading',
      })
      return
    }

    const candidates = findCookieBannerCandidates(decisionTrace)
      .filter((candidate) =>
        !modeConfig.allowSuppression ||
        !suppressReRenderedBanner(candidate)
      )
    updateCookieTextScopeDiagnostics()
    updateDomScopeDiagnostics()
    updateIframeAccessibilityDiagnostics()
    updateBottomBannerDiagnostics()
    lastScanDetectedControlCount =
      getDiagnosticControlTexts(candidates).length
    updateLastDiagnosticDecisionTrace(decisionTrace)

    cookieDebugLog('cookie.scan.candidates', {
      count: candidates.length,
      first: getCookieDebugElementSummary(candidates[0]),
    })

    if (ENABLE_CMP_FINGERPRINT_DEBUG) {
      runCMPFingerprintDebugDetection(candidates[0] || document)
    }
    if (isAddislineTestMode()) {
      updateAddislineTestReport({
        event: 'scanPage:candidates',
        bannerCandidateCount: candidates.length,
        chosenCandidateSummary: getElementTestSummary(candidates[0]),
      })
    }
    if (ENABLE_PASSIVE_COOKIE_INTELLIGENCE) {
      runPassiveCookieIntelligenceForCandidates(candidates)
    }

    rejectFlowLog('Basic reject flow active', {
      candidateCount: candidates.length,
      allowAutoReject: modeConfig.allowAutoReject,
    })
    logCMPBannerClassifications(candidates)

    if (
      modeConfig.allowAutoReject &&
      attemptCMPSpecificReject(candidates[0] || document)
    ) {
      addDiagnosticDecisionStep(decisionTrace, {
        strategy: 'reject.cmp_specific_helper',
        status: 'found',
        found: 1,
      })
      updateLastDiagnosticDecisionTrace(decisionTrace)
      return
    }

    addDiagnosticDecisionStep(decisionTrace, {
      strategy: 'reject.cmp_specific_helper',
      status: ENABLE_CMP_SPECIFIC_HELPERS ? 'not_found' : 'skipped',
      reason: ENABLE_CMP_SPECIFIC_HELPERS ? '' : 'helper_disabled',
    })

    if (modeConfig.allowAutoReject) {
      for (const candidate of candidates) {
        if (!isPotentialCookieContainer(candidate)) continue

        const action = decideCookieAction(candidate, decisionTrace)
        updateLastDiagnosticDecisionTrace(decisionTrace)

        if (action.type === 'reject' && action.element) {
          rejectFlowLog('Basic reject candidate found', {
            source: 'candidate_scan',
            intent: action.intent || '',
            control: getCookieDebugElementSummary(action.element),
          })
          rejectFlowLog('Priority selected: directReject', {
            source: 'candidate_scan',
            intent: action.intent || '',
            control: getCookieDebugElementSummary(action.element),
          })
        }

        const actionExecuted =
          action.type === 'reject'
            ? executeCookieAction(action)
            : false

        if (action.type === 'reject' && action.element) {
          logNoAceptoRejectClickOutcome(
            action.element,
            actionExecuted,
            actionExecuted ? '' : 'candidate_action_gate_or_click_failed'
          )
        }

        if (actionExecuted) {
          recordCurrentSiteDiagnostic({
            status: 'rejected',
            reason: 'candidate_reject_clicked',
            candidates,
            matchedRejectElement: action.element,
            matchedRejectText: getActionText(action.element),
          })
          if (action.type === 'reject') {
            rejectFlowLog('Basic reject clicked', {
              source: 'candidate_scan',
              intent: action.intent || '',
              control: getCookieDebugElementSummary(action.element),
            })
          }
          updateAddislineTestReport({
            event: 'scanPage:action-executed',
            chosenActionType: action.type,
            chosenActionIntent: action.intent || 'none',
            lastActionResult: 'action_executed',
          })
          return
        }

        if (action.type === 'reject' && action.element) {
          recordCurrentSiteDiagnostic({
            status: 'failed',
            reason: 'candidate_reject_not_clicked',
            candidates,
            matchedRejectElement: action.element,
            matchedRejectText: getActionText(action.element),
            blockedReason: 'action_gate_or_click_failed',
          })
          rejectFlowLog('Basic reject blocked: action_gate_or_click_failed', {
            source: 'candidate_scan',
            intent: action.intent || '',
            control: getCookieDebugElementSummary(action.element),
          })
        }
      }
    }
    if (!modeConfig.allowAutoReject) {
      addDiagnosticDecisionStep(decisionTrace, {
        strategy: 'reject.container_scan',
        status: 'skipped',
        reason: 'auto_reject_disabled',
      })
    }

    const directRejectControl =
      modeConfig.allowAutoReject
        ? findDirectSafeRejectControl(decisionTrace)
        : null
    if (!modeConfig.allowAutoReject) {
      addDiagnosticDecisionStep(decisionTrace, {
        strategy: 'reject.direct_scan',
        status: 'skipped',
        reason: 'auto_reject_disabled',
      })
    }
    updateLastDiagnosticDecisionTrace(decisionTrace)

    if (directRejectControl) {
      rejectFlowLog('Basic reject candidate found', {
        source: 'direct_scan',
        control: getCookieDebugElementSummary(directRejectControl),
      })
      rejectFlowLog('Priority selected: directReject', {
        source: 'direct_scan',
        control: getCookieDebugElementSummary(directRejectControl),
      })
      cookieDebugLog('cookie.reject.detected', {
        source: 'direct_scan',
        control: getCookieDebugElementSummary(directRejectControl),
      })
    }

    if (!directRejectControl) {
      recordCurrentSiteDiagnostic({
        status: 'skipped',
        reason: 'reject_candidate_not_found',
        candidates,
      })
      rejectFlowLog('Basic reject blocked: candidate_not_found', {
        source: 'direct_scan',
      })
    }

    const directRejectBlockReason =
      getBasicRejectBlockReason(directRejectControl)

    if (directRejectBlockReason && directRejectControl) {
      recordCurrentSiteDiagnostic({
        status: 'failed',
        reason: 'direct_reject_blocked',
        candidates,
        matchedRejectElement: directRejectControl,
        matchedRejectText: getActionText(directRejectControl),
        blockedReason: directRejectBlockReason,
      })
      rejectFlowLog(`Basic reject blocked: ${directRejectBlockReason}`, {
        source: 'direct_scan',
        control: getCookieDebugElementSummary(directRejectControl),
      })
    }

    const directRejectCanProcess =
      directRejectControl &&
      !directRejectBlockReason &&
      canProcessBannerAction(directRejectControl)
    const directRejectClicked =
      directRejectControl &&
      directRejectCanProcess
        ? clickElementSafely(directRejectControl, {
            includePointerEvents: true,
          })
        : false

    if (directRejectControl) {
      logNoAceptoRejectClickOutcome(
        directRejectControl,
        directRejectClicked,
        directRejectClicked
          ? ''
          : directRejectBlockReason ||
            (
              directRejectCanProcess === false
                ? 'action_cooldown_or_processed'
                : 'click_failed'
            )
      )
    }

    if (
      directRejectControl &&
      directRejectCanProcess &&
      directRejectClicked
    ) {
      recordCurrentSiteDiagnostic({
        status: 'rejected',
        reason: 'direct_reject_clicked',
        candidates,
        matchedRejectElement: directRejectControl,
        matchedRejectText: getActionText(directRejectControl),
      })
      rejectFlowLog('Basic reject clicked', {
        source: 'direct_scan',
        control: getCookieDebugElementSummary(directRejectControl),
      })
      cookieDebugLog('cookie.reject.clicked', {
        source: 'direct_scan',
        control: getCookieDebugElementSummary(directRejectControl),
      })
      const directRejectContainer =
        getCookieContainer(directRejectControl)
      const directRejectAction = {
        type: 'reject',
        element: directRejectControl,
        intent: getBestCookieIntent(
          directRejectControl,
          directRejectContainer || document
        ).intent,
        container: directRejectContainer,
      }

      incrementStat('autoRejects')
      recordStatsFromSuccessfulCookieAction(directRejectAction, {
        container: directRejectContainer,
      })
      schedulePostActionVerification({
        type: 'reject',
        container: directRejectContainer,
        element: directRejectControl,
      })
      stopObserver()
      setLastAction('auto_reject')
      setLastError('')
      log('Rechazo directo prioritario ejecutado')
      updateAddislineTestReport({
        event: 'scanPage:direct-reject',
        chosenActionType: 'reject',
        chosenActionIntent: directRejectAction.intent || 'none',
        lastActionResult: 'direct_reject_executed',
      })
      return
    }

    if (
      directRejectControl &&
      directRejectCanProcess === false &&
      !directRejectBlockReason
    ) {
      recordCurrentSiteDiagnostic({
        status: 'failed',
        reason: 'direct_reject_blocked',
        candidates,
        matchedRejectElement: directRejectControl,
        matchedRejectText: getActionText(directRejectControl),
        blockedReason: 'action_cooldown_or_processed',
      })
      rejectFlowLog('Basic reject blocked: action_cooldown_or_processed', {
        source: 'direct_scan',
        control: getCookieDebugElementSummary(directRejectControl),
      })
    }

    if (
      directRejectControl &&
      directRejectCanProcess &&
      !directRejectClicked
    ) {
      recordCurrentSiteDiagnostic({
        status: 'failed',
        reason: 'direct_reject_click_failed',
        candidates,
        matchedRejectElement: directRejectControl,
        matchedRejectText: getActionText(directRejectControl),
        blockedReason: 'click_failed',
      })
      rejectFlowLog('Basic reject blocked: click_failed', {
        source: 'direct_scan',
        control: getCookieDebugElementSummary(directRejectControl),
      })
    }

    if (attemptFundingChoicesManageOptionsFlow(candidates[0] || document, decisionTrace)) {
      updateLastDiagnosticDecisionTrace(decisionTrace)
      return
    }
    updateLastDiagnosticDecisionTrace(decisionTrace)

    if (attemptCMPSpecificSettingsOpen(candidates[0] || document)) {
      addDiagnosticDecisionStep(decisionTrace, {
        strategy: 'settings.cmp_specific_helper',
        status: 'found',
        found: 1,
      })
      updateLastDiagnosticDecisionTrace(decisionTrace)
      return
    }
    addDiagnosticDecisionStep(decisionTrace, {
      strategy: 'settings.cmp_specific_helper',
      status: ENABLE_CMP_SPECIFIC_HELPERS ? 'not_found' : 'skipped',
      reason: ENABLE_CMP_SPECIFIC_HELPERS ? '' : 'helper_disabled',
    })

    if (
      ENABLE_LIGHTWEIGHT_SETTINGS_OPEN &&
      attemptLightweightSettingsOpen(candidates)
    ) {
      addDiagnosticDecisionStep(decisionTrace, {
        strategy: 'settings.lightweight_open',
        status: 'found',
        found: 1,
      })
      updateLastDiagnosticDecisionTrace(decisionTrace)
      return
    }
    addDiagnosticDecisionStep(decisionTrace, {
      strategy: 'settings.lightweight_open',
      status: ENABLE_LIGHTWEIGHT_SETTINGS_OPEN ? 'not_found' : 'skipped',
      reason: ENABLE_LIGHTWEIGHT_SETTINGS_OPEN
        ? (
            lastLightweightSettingsBudgetCapped
              ? 'budget_capped'
              : ''
          )
        : 'helper_disabled',
    })
    updateLastDiagnosticDecisionTrace(decisionTrace)

    if (candidates.length === 0 && !directRejectControl) {
      noCMPScanCount += 1

      if (noCMPScanCount >= MAX_NO_CMP_SCANS) {
        scanBudgetExhausted = true
        recordCurrentSiteDiagnostic({
          status: 'skipped',
          reason: 'no_cmp_after_bounded_scans',
          candidates,
          blockedReason: 'scan_budget_exhausted',
        })
        scheduleLateDiagnosticSnapshot('no_cmp_after_bounded_scans')
        if (scheduleLateHydrationRecheck('no_cmp_after_bounded_scans')) {
          return
        }
        if (scheduleLateBannerRecoveryCheck('no_cmp_after_bounded_scans')) {
          return
        }
        rejectFlowLog('Basic reject blocked: no_cmp_after_bounded_scans', {
          maxNoCMPScans: MAX_NO_CMP_SCANS,
        })
        stopObserver()
        return
      }
    } else {
      noCMPScanCount = 0
    }

    if (
      ENABLE_INITIAL_MORE_OPTIONS_FLOW &&
      !moreOptionsNavigationOpened &&
      modeConfig.allowSettingsOpen
    ) {
      const initialRoot =
        selectInitialCMPRoot(candidates)
      const moreOptionsContainer =
        initialRoot.root

      cookieDebugLog('cookie.initial_cmp.root_selected', {
        domain: getCurrentDomain(),
        candidateCount: candidates.length,
        ...getInitialCMPRootDiagnostics(
          moreOptionsContainer === document ? null : moreOptionsContainer,
          initialRoot.reason
        ),
      })

      if (
        attemptInitialMoreOptionsNavigation(
          moreOptionsContainer,
          initialRoot.reason
        )
      ) {
        return
      }
    } else {
      logInitialFlowSkipped(
        moreOptionsNavigationOpened
          ? 'more_options_already_opened_before_attempt'
          : 'settings_open_disabled_before_attempt',
        {
          domain: getCurrentDomain(),
          moreOptionsNavigationOpened,
          allowSettingsOpen: modeConfig.allowSettingsOpen,
        }
      )
    }

    if (
      ENABLE_DEEP_CMP_DIAGNOSTICS &&
      candidates.length === 0
    ) {
      if (Date.now() < moreOptionsNavigationOpeningUntil) {
        cookieDebugLog('cookie.deep_panel.scan_skipped', {
          reason: 'waiting_for_more_options_panel',
        })
      } else {
        const deepPanel =
          traceDeepCMPPanelScanning('zero_banner_candidates')

        if (deepPanel) {
          attemptControlledDeepCMPNavigation(deepPanel)
        }
      }
    }

    const directSettingsControl =
      ENABLE_SETTINGS_RETRY_FLOW &&
      modeConfig.allowSettingsOpen
        ? findDirectSettingsControl()
        : null

    if (directSettingsControl) {
      cookieDebugLog('cookie.settings.detected', {
        source: 'direct_scan',
        control: getCookieDebugElementSummary(directSettingsControl),
      })
    }

    if (
      directSettingsControl &&
      canProcessBannerAction(directSettingsControl) &&
      clickElementSafely(directSettingsControl)
    ) {
      cookieDebugLog('cookie.settings.clicked', {
        source: 'direct_scan',
        control: getCookieDebugElementSummary(directSettingsControl),
      })
      schedulePreferencesFlow()
      setLastAction('settings_opened')
      setLastError('')
      log('Configuracion de cookies abierta')
      updateAddislineTestReport({
        event: 'scanPage:settings',
        chosenActionType: 'settings',
        chosenActionIntent: 'managePreferences',
        lastActionResult: 'settings_opened',
      })
      return
    }

    let hiddenCandidate = false

    if (modeConfig.allowHide) {
      for (const candidate of candidates) {
        if (hideElement(candidate)) {
          hiddenCandidate = true
        }
      }
    }

    if (modeConfig.scanAggressiveness === 'strict') {
      scanCookieOverlays()
    }

    if (
      candidates.length > 0 &&
      !hiddenCandidate
    ) {
      setLastAction('no_safe_action')
      setLastError('')
      recordCurrentSiteDiagnostic({
        status: 'skipped',
        reason: 'no_safe_action',
        candidates,
      })
      updateAddislineTestReport({
        event: 'scanPage:no-safe-action',
        lastActionResult: 'no_safe_action',
        lastSkipReason: 'no_safe_action',
      })
      scanBudgetExhausted = true
      stopObserver()
    } else {
      updateAddislineTestReport({
        event: 'scanPage:complete',
        lastActionResult: hiddenCandidate
          ? 'candidate_hidden'
          : 'no_candidates',
      })
      if (hiddenCandidate) {
        scanBudgetExhausted = true
        stopObserver()
      }
    }
  } catch (error) {
    setLastError(error?.message || 'Error en content script')
    recordCurrentSiteDiagnostic({
      status: 'skipped',
      reason: 'scan_not_finalized',
      blockedReason:
        String(error?.message || 'scan_error').slice(0, 120),
      elapsedMs:
        Math.max(0, Date.now() - diagnosticLifecycleStartedAt),
      decisionTrace: lastDiagnosticDecisionTrace,
    })
    updateAddislineTestReport({
      event: 'scanPage:error',
      lastActionResult: 'error',
      lastSkipReason: truncateTestText(error?.message || 'content_script_error', 120),
    })
  }
}
function getMutationNodeText(node) {
  if (!node) return ''

  if (node.nodeType === Node.TEXT_NODE) {
    return normalizeMatchText(node.textContent || '')
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return ''
  }

  return normalizeMatchText(
    [
      node.id || '',
      getClassNameText(node),
      node.getAttribute?.('role') || '',
      node.getAttribute?.('aria-label') || '',
      node.getAttribute?.('data-testid') || '',
      node.getAttribute?.('data-cmp') || '',
      node.getAttribute?.('data-consent') || '',
      node.getAttribute?.('data-cookie') || '',
      node.textContent?.slice(0, 300) || '',
    ].join(' ')
  )
}

function mutationLooksCookieRelated(mutation) {
  const targetText =
    getMutationNodeText(mutation.target)

  if (textHasAny(targetText, MUTATION_SCAN_HINT_TEXTS)) {
    return true
  }

  for (const node of mutation.addedNodes || []) {
    const nodeText =
      getMutationNodeText(node)

    if (textHasAny(nodeText, MUTATION_SCAN_HINT_TEXTS)) {
      return true
    }
  }

  return false
}

function isVisibleFixedOrStickyCMPElement(element) {
  if (
    !isElementLike(element) ||
    !isVisible(element) ||
    isLikelyNonCookieModal(element)
  ) {
    return false
  }

  const style =
    safeGetComputedStyle(element)
  if (!style) return false

  const isOverlayPosition =
    style.position === 'fixed' ||
    style.position === 'sticky'

  return (
    isPotentialCookieContainer(element) ||
    (
      isOverlayPosition &&
      (
        hasCookieBannerSignal(element) ||
        hasKnownCmpSignal(element)
      )
    )
  )
}

function mutationHasVisibleLateCMPWakeup(mutations) {
  if (
    !ENABLE_LATE_CMP_MUTATION_WAKEUP ||
    lateCMPMutationWakeupUsed ||
    !Array.isArray(mutations)
  ) {
    return false
  }

  return mutations.some((mutation) => {
    if (isVisibleFixedOrStickyCMPElement(mutation.target)) {
      return true
    }

    return Array.from(mutation.addedNodes || [])
      .some((node) =>
        isVisibleFixedOrStickyCMPElement(node)
      )
  })
}

function getMutationCMPDetectionDiagnostics() {
  const roots =
    getInitialCMPRootCandidates()
      .slice(0, 8)
      .map((root) => ({
        ...getInitialCMPRootDiagnostics(
          root,
          getInitialCMPRootReason(root)
        ),
        text: getText(root).slice(0, 160),
      }))

  return {
    visibleCMPRootCount: roots.length,
    visibleCMPRoots: roots,
  }
}

function getMutationClassificationDiagnostics(mutations) {
  const safeMutations =
    Array.isArray(mutations) ? mutations : []
  const previews =
    safeMutations
      .slice(0, 5)
      .map((mutation) => {
        const targetText =
          getMutationNodeText(mutation.target)
        const addedNodeTexts =
          Array.from(mutation.addedNodes || [])
            .slice(0, 4)
            .map(getMutationNodeText)
            .filter(Boolean)
            .map((text) => text.slice(0, 180))

        return {
          type: mutation.type || '',
          target: targetText.slice(0, 180),
          targetMatched: textHasAny(targetText, MUTATION_SCAN_HINT_TEXTS),
          addedNodeCount: mutation.addedNodes?.length || 0,
          addedNodeTexts,
          addedNodeMatched: addedNodeTexts.some((text) =>
            textHasAny(text, MUTATION_SCAN_HINT_TEXTS)
          ),
        }
      })

  return {
    mutationCount: safeMutations.length,
    reason: 'no_cookie_hint_in_mutation_target_or_added_nodes',
    previews,
    ...getMutationCMPDetectionDiagnostics(),
  }
}

function hasVisibleCMPRootForMutationFallback() {
  if (!ENABLE_MUTATION_DOM_FALLBACKS) {
    return false
  }

  return getInitialCMPRootCandidates()
    .some((root) =>
      root &&
      root !== document.body &&
      root !== document.documentElement &&
      isVisible(root)
    )
}

function hasDirectVisibleCMPFallbackControl() {
  if (!ENABLE_MUTATION_DOM_FALLBACKS) {
    return false
  }

  return Boolean(findDirectVisibleCMPFallbackControl())
}

function shouldScanForMutations(mutations) {
  if (!Array.isArray(mutations)) {
    return true
  }

  if (mutations.length === 0) {
    return false
  }

  if (mutations.some(mutationLooksCookieRelated)) {
    return true
  }

  if (ENABLE_BASIC_REJECT_MUTATION_FALLBACK) {
    return true
  }

  if (mutationHasVisibleLateCMPWakeup(mutations)) {
    return true
  }

  return (
    hasDirectVisibleCMPFallbackControl() ||
    hasVisibleCMPRootForMutationFallback()
  )
}

function getMutationScanPriority(mutations) {
  if (!Array.isArray(mutations)) {
    return {
      shouldScan: true,
      reason: 'scheduled_scan',
      control: null,
    }
  }

  if (mutations.length === 0) {
    return {
      shouldScan: false,
      reason: 'empty_mutations',
      control: null,
    }
  }

  if (mutations.some(mutationLooksCookieRelated)) {
    return {
      shouldScan: true,
      reason: 'cookie_mutation_hint',
      control: null,
    }
  }

  if (ENABLE_BASIC_REJECT_MUTATION_FALLBACK) {
    return {
      shouldScan: true,
      reason: 'basic_reject_mutation_fallback',
      control: null,
    }
  }

  if (mutationHasVisibleLateCMPWakeup(mutations)) {
    return {
      shouldScan: true,
      reason: 'visible_overlay_or_cmp_mutation',
      control: null,
    }
  }

  const priorityControl =
    findVisiblePriorityCMPControl()

  if (priorityControl) {
    return {
      shouldScan: true,
      reason: 'visible_reject_or_settings_control',
      control: priorityControl,
    }
  }

  if (hasVisiblePriorityCMPRoot()) {
    return {
      shouldScan: true,
      reason: 'visible_cmp_keyword_root',
      control: null,
    }
  }

  if (
    hasDirectVisibleCMPFallbackControl() ||
    hasVisibleCMPRootForMutationFallback()
  ) {
    return {
      shouldScan: true,
      reason: 'visible_cmp_fallback',
      control: null,
    }
  }

  return {
    shouldScan: false,
    reason: 'low_confidence_mutation',
    control: null,
  }
}

function scheduleScan(mutations = null) {
  try {
    if (scanBudgetExhausted || rejectFlowCompleted) {
      if (
        scanBudgetExhausted &&
        !rejectFlowCompleted &&
        Array.isArray(mutations) &&
        mutationHasVisibleLateCMPWakeup(mutations) &&
        triggerLateBannerRecoveryScan('scan_budget_exhausted')
      ) {
        return
      }

      return
    }

    if (!shouldRunOnThisSite()) {
      logInitialFlowSkipped('scheduler_site_not_enabled', {
        domain: getCurrentDomain(),
      })
      stopObserver()
      return
    }

    const now = Date.now()

    if (
      mutations &&
      now - lastObserverScanScheduledAt < OBSERVER_COOLDOWN_MS
    ) {
      logInitialFlowSkipped('observer_cooldown', {
        domain: getCurrentDomain(),
        cooldownMs: OBSERVER_COOLDOWN_MS,
      })
      return
    }

    const mutationPriority =
      getMutationScanPriority(mutations)
    const hasMutationCookieHint =
      mutationPriority.reason === 'scheduled_scan' ||
      mutationPriority.reason === 'cookie_mutation_hint'
    const hasLateCMPMutationWakeup =
      mutationPriority.reason === 'visible_overlay_or_cmp_mutation'

    if (!mutationPriority.shouldScan) {
      logInitialFlowSkipped('mutation_not_cookie_related', {
        domain: getCurrentDomain(),
        priorityReason: mutationPriority.reason,
        ...(
          COOKIE_DEBUG
            ? getMutationClassificationDiagnostics(mutations)
            : {}
        ),
      })
      return
    }

    if (mutations) {
      if (
        observerMutationScanCount >= MAX_MUTATION_SCANS_PER_PAGE
      ) {
        if (
          mutationPriority.control &&
          !emergencyVisibleCMPScanUsed
        ) {
          emergencyVisibleCMPScanUsed = true
          rejectFlowLog('Basic reject emergency visible CMP recovery scan', {
            reason: mutationPriority.reason,
            control: getCookieDebugElementSummary(mutationPriority.control),
          })
        } else {
          rejectFlowLog('Basic reject blocked: mutation_scan_budget_exhausted', {
            maxMutationScans: MAX_MUTATION_SCANS_PER_PAGE,
            priorityReason: mutationPriority.reason,
            emergencyVisibleCMPScanUsed,
          })
          stopObserver()
          return
        }
      } else {
        observerMutationScanCount += 1
      }
    }

    if (hasLateCMPMutationWakeup) {
      lateCMPMutationWakeupUsed = true
      rejectFlowLog('Basic reject late CMP wakeup', {
        source: 'visible_overlay_or_cmp_mutation',
      })
    }

    const hasCMPFallbackRoot =
      ENABLE_MUTATION_DOM_FALLBACKS &&
      Array.isArray(mutations) &&
      mutations.length > 0 &&
      !hasMutationCookieHint &&
      hasVisibleCMPRootForMutationFallback()
    const directCMPFallbackControl =
      (
        ENABLE_MUTATION_DOM_FALLBACKS &&
        Array.isArray(mutations) &&
        mutations.length > 0 &&
        !hasMutationCookieHint
      )
        ? findDirectVisibleCMPFallbackControl()
        : null

    if (mutationPriority.control) {
      rejectFlowLog('Basic reject visible CMP priority scan', {
        reason: mutationPriority.reason,
        control: getCookieDebugElementSummary(mutationPriority.control),
      })
    }

    if (directCMPFallbackControl) {
      cookieDebugLog('cookie.mutation_gate.direct_visible_fallback_allowed', {
        domain: getCurrentDomain(),
        control: getCookieDebugElementSummary(directCMPFallbackControl),
      })
    }

    if (hasCMPFallbackRoot) {
      cookieDebugLog('cookie.mutation_gate.fallback_allowed', {
        domain: getCurrentDomain(),
        ...(
          COOKIE_DEBUG
            ? getMutationClassificationDiagnostics(mutations)
            : {}
        ),
      })
    }

    lastObserverScanScheduledAt = now

    if (now - lastScanAt > SCAN_BURST_RESET_MS) {
      scanBurstCount = 0
    }

    scanBurstCount += 1

    if (scanBurstCount > MAX_SCAN_BURST) {
      clearTimeout(debounceTimer)

      logInitialFlowSkipped('scan_burst_delayed', {
        domain: getCurrentDomain(),
        maxScanBurst: MAX_SCAN_BURST,
      })

      debounceTimer = scheduleAutomationTimeout(() => {
        try {
          scanBurstCount = 0
          runWhenIdle(() => {
            observeOpenShadowRoots()
            scanPage()
          })
        } catch (error) {
          logRuntimeError('delayed_scan_scheduler', error)
        }
      }, SCAN_BURST_RESET_MS)

      return
    }

    const delay =
      Math.max(
        SCAN_DEBOUNCE_MS,
        MIN_SCAN_INTERVAL_MS - (now - lastScanAt)
      )

    clearTimeout(debounceTimer)

    debounceTimer = scheduleAutomationTimeout(() => {
      try {
        lastScanAt = Date.now()
        runWhenIdle(() => {
          observeOpenShadowRoots()
          scanPage()
        })
      } catch (error) {
        logRuntimeError('initial_scan_scheduler', error)
      }
    }, delay)
  } catch (error) {
    logRuntimeError('schedule_scan', error)
  }
}

function observeOpenShadowRoots() {
  if (!observer || !ENABLE_SHADOW_ROOT_OBSERVATION) return

  const now = Date.now()

  if (now - lastShadowObserveAt < SHADOW_OBSERVE_COOLDOWN_MS) {
    return
  }

  lastShadowObserveAt = now

  querySelectorAllDeep('*').forEach((element) => {
    const root = element.shadowRoot

    if (!root || observedShadowRoots.has(root)) {
      return
    }

    try {
      observer.observe(root, {
        childList: true,
        subtree: true,
      })
      observedShadowRoots.add(root)
    } catch {
      // Some shadow roots can be detached while CMPs re-render.
    }
  })
}

function handleMutationProcessing(mutations) {
  try {
    if (!isPageActiveForAutomation()) {
      return
    }

    scheduleAutomationTimeout(() => {
      try {
        scheduleScan(mutations)
      } catch (error) {
        logRuntimeError('mutation_processing_deferred', error)
      }
    }, 0)
  } catch (error) {
    logRuntimeError('mutation_processing', error)
  }
}

function scheduleDelayedLateCMPRescan() {
  if (delayedLateScanScheduled) {
    return
  }

  delayedLateScanScheduled = true

  scheduleAutomationTimeout(() => {
    try {
      if (
        !shouldRunOnThisSite() ||
        !isPageActiveForAutomation() ||
        scanBudgetExhausted ||
        rejectFlowCompleted
      ) {
        return
      }

      rejectFlowLog('Basic reject late CMP rescan', {
        delayMs: LATE_CMP_RESCAN_DELAY_MS,
      })
      scheduleScan()
    } catch (error) {
      logRuntimeError('late_cmp_rescan', error)
    }
  }, LATE_CMP_RESCAN_DELAY_MS)
}

function scheduleInitialObserverStartup() {
  if (
    !ENABLE_ALL_AUTOMATION ||
    !isPageActiveForAutomation()
  ) {
    stopObserver()
    return
  }

  if (startupScanScheduled) {
    return
  }

  startupScanScheduled = true

  const startWhenIdle = () => {
    runWhenIdle(() => {
      startupScanScheduled = false
      startObserver()
    }, 1800)
  }

  if (
    document.readyState === 'interactive' ||
    document.readyState === 'complete'
  ) {
    scheduleAutomationTimeout(startWhenIdle, 250)
    return
  }

  const handleReadyState = () => {
    if (
      document.readyState !== 'interactive' &&
      document.readyState !== 'complete'
    ) {
      return
    }

    document.removeEventListener('readystatechange', handleReadyState)
    readyStateStartupListener = null
    scheduleAutomationTimeout(startWhenIdle, 250)
  }

  readyStateStartupListener = handleReadyState
  document.addEventListener('readystatechange', handleReadyState)
}

function startObserver() {
  try {
    if (
      !shouldRunOnThisSite() ||
      !isPageActiveForAutomation()
    ) {
      stopObserver()
      return
    }

    if (observer) {
      cookieDebugLog('Observer already attached', {
        domain: getCurrentDomain(),
      })
      return
    }

    recordProtectedSite()

    observer = new MutationObserver(handleMutationProcessing)

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    })

    cookieDebugLog('Observer attached', {
      domain: getCurrentDomain(),
      root: getCookieDebugElementSummary(document.documentElement),
    })

    try {
      observeOpenShadowRoots()
    } catch (error) {
      logRuntimeError('observer_shadow_setup', error)
    }

    cookieDebugLog('Initial scan scheduled', {
      domain: getCurrentDomain(),
    })
    scheduleScan()
    scheduleDelayedLateCMPRescan()
  } catch (error) {
    logRuntimeError('observer_setup', error)
  }
}

function stopObserver() {
  clearTimeout(debounceTimer)
  clearTimeout(preferencesTimer)
  preferencesRetryTimers.forEach(clearTimeout)
  pendingAutomationTimers.forEach(clearTimeout)
  pendingAutomationTimers.clear()
  pendingIdleCallbacks.forEach((idleId) => {
    if (typeof cancelIdleCallback === 'function') {
      cancelIdleCallback(idleId)
    }
  })
  pendingIdleCallbacks.clear()

  if (readyStateStartupListener) {
    document.removeEventListener(
      'readystatechange',
      readyStateStartupListener
    )
    readyStateStartupListener = null
  }

  preferencesRetryTimers = []
  debounceTimer = null
  preferencesTimer = null
  startupScanScheduled = false
  loadingScanDeferred = false
  lateBannerRecoveryCheckScheduled = false
  lateHydrationRecheckScheduled = false
  lateHydrationRecheckActive = false
  scanBurstCount = 0
  lastObserverScanScheduledAt = 0

  cleanupCookieInteractionLeftovers(
    activeCookieContainer || document.body || document.documentElement,
    { force: true }
  )

  if (!observer) return

  observer.disconnect()
  observer = null
}

function applyRuntimeState() {
  if (shouldRunOnThisSite()) {
    scheduleInitialObserverStartup()
  } else {
    stopObserver()

    if (
      protectionEnabled &&
      isDomainExcluded(getCurrentDomain(), excludedDomains)
    ) {
      setLastAction('site_excluded')
      setLastError('')
    }
  }
}

safeStorageGet(
  {
    protectionEnabled: false,
    excludedDomains: [],
    protectionMode: 'normal',
  },
  (data) => {
    protectionEnabled = Boolean(data.protectionEnabled)
    excludedDomains = Array.isArray(data.excludedDomains)
      ? data.excludedDomains.map(normalizeDomain).filter(Boolean)
      : []
    protectionMode = data.protectionMode || 'normal'

    applyRuntimeState()
  }
)

if (hasExtensionContext()) {
  try {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      try {
        if (
          areaName !== 'local' ||
          !hasExtensionContext()
        ) {
          return
        }

        if (changes.protectionEnabled) {
          protectionEnabled = Boolean(changes.protectionEnabled.newValue)
        }

        if (changes.excludedDomains) {
          excludedDomains = Array.isArray(changes.excludedDomains.newValue)
            ? changes.excludedDomains.newValue.map(normalizeDomain).filter(Boolean)
            : []
        }

        if (changes.protectionMode) {
          protectionMode = changes.protectionMode.newValue || 'normal'
        }

        if (
          changes.protectionEnabled ||
          changes.excludedDomains ||
          changes.protectionMode
        ) {
          applyRuntimeState()
        }
      } catch {
        // Extension context invalidated.
      }
    })
  } catch {
    // Extension context invalidated.
  }
}

document.addEventListener('visibilitychange', () => {
  if (!isPageActiveForAutomation()) {
    stopObserver()
    return
  }

  applyRuntimeState()
})

function getClassNameText(element) {
  if (!element) return ''

  const className = element.className

  if (typeof className === 'string') {
    return className
  }

  if (
    className &&
    typeof className.baseVal === 'string'
  ) {
    return className.baseVal
  }

  if (element.classList) {
    return Array.from(element.classList).join(' ')
  }

  return ''
}

function getSafeElementMeta(element) {
  return {
    id: String(element?.id || '').slice(0, 80),
    name: String(
      element?.name ||
        element?.getAttribute?.('name') ||
        ''
    ).slice(0, 80),
    className: getClassNameText(element).slice(0, 160),
    tagName: String(element?.tagName || '').toLowerCase().slice(0, 32),
  }
}

// Cookie Intelligence Layer - First Phase
function calculateTextComplexity(text) {
  if (!text) return 0
  return Math.min(text.length / 100, 10)
}

function detectBannerPosition(container) {
  if (!container) return 'unknown'

  const rect = getSafeClientRect(container)
  if (!rect) return 'unknown'

  const viewportHeight = window.innerHeight

  const topRatio = rect.top / viewportHeight

  if (topRatio > 0.8) return 'bottom'
  if (topRatio < 0.2) return 'top'

  return 'center'
}

function detectConsentLanguageFromText(text) {
  if (!text || text.length < 3) return 'unknown'

  const spanishPatterns = [
    'rechazar', 'aceptar', 'cookies', 'privacidad',
    'preferencias', 'personalizar', 'opciones'
  ]

  const englishPatterns = [
    'reject', 'accept', 'cookies', 'privacy',
    'preferences', 'customize', 'options'
  ]

  const normalizedText = text.toLowerCase()

  const spanishScore = spanishPatterns.filter(pattern =>
    normalizedText.includes(pattern)
  ).length

  const englishScore = englishPatterns.filter(pattern =>
    normalizedText.includes(pattern)
  ).length

  if (spanishScore > englishScore) return 'spanish'
  if (englishScore > spanishScore) return 'english'

  return 'mixed'
}

function normalizeTechnicalUrl(value) {
  return normalizeMatchText(String(value || '').split('?')[0].split('#')[0])
}

function detectCMPFingerprint(container) {
  const cmpFingerprints = {
    onetrust: ['onetrust', 'ot-sdk', 'ot sdk', 'optanon', 'onetrustactivegroups'],
    didomi: ['didomi', 'didomi-host', 'didomi-popup', 'didomi-notice'],
    quantcast: ['quantcast', 'qc-cmp', 'quantcast choice', 'choice.cmp'],
    cookiebot: ['cookiebot', 'cybotcookiebot', 'cookiebot.com'],
    trustarc: ['trustarc', 'truste', 'trustarc.com'],
    usercentrics: ['usercentrics', 'uc-center', 'uc banner', 'usercentrics.eu'],
    sourcepoint: ['sourcepoint', 'sp message', 'sp_message', 'sourcepoint.mgr']
  }

  const result = {
    cmp: 'unknown',
    confidence: 0,
    signals: []
  }

  const addSignal = (signals, signal) => {
    if (!signals.includes(signal)) {
      signals.push(signal)
    }
  }

  const collectElementSignals = (element) => {
    if (!element) return []

    return [
      element.id ? `id:${normalizeMatchText(element.id).slice(0, 80)}` : '',
      getClassNameText(element) ? `class:${normalizeMatchText(getClassNameText(element)).slice(0, 120)}` : '',
      element.getAttribute?.('aria-label') ? `aria:${normalizeMatchText(element.getAttribute('aria-label')).slice(0, 80)}` : '',
      element.getAttribute?.('data-testid') ? `data-testid:${normalizeMatchText(element.getAttribute('data-testid')).slice(0, 80)}` : '',
      getDatasetText(element) ? `dataset:${normalizeMatchText(getDatasetText(element)).slice(0, 120)}` : ''
    ].filter(Boolean)
  }

  const technicalSignals = [
    ...collectElementSignals(container),
    ...Array.from(document.querySelectorAll('script[src]'))
      .slice(0, 20)
      .map((script) => `script:${normalizeTechnicalUrl(script.getAttribute('src')).slice(0, 160)}`),
    ...Array.from(document.querySelectorAll('iframe[src]'))
      .slice(0, 10)
      .map((iframe) => `iframe:${normalizeTechnicalUrl(iframe.getAttribute('src')).slice(0, 160)}`)
  ]

  const scores = Object.entries(cmpFingerprints).map(([cmp, keywords]) => {
    const signals = []

    technicalSignals.forEach((signal) => {
      if (textHasAny(signal, keywords)) {
        addSignal(signals, signal)
      }
    })

    return {
      cmp,
      signals,
      score: signals.length
    }
  })

  const best = scores.reduce((currentBest, current) =>
    current.score > currentBest.score ? current : currentBest
  , {
    cmp: 'unknown',
    signals: [],
    score: 0
  })

  if (best.score === 0) {
    return result
  }

  return {
    cmp: best.cmp,
    confidence: Math.min(100, 40 + (best.score * 20)),
    signals: best.signals.slice(0, 8)
  }
}

function getCMPStrategyProfile(cmpReport) {
  const cmp = cmpReport?.cmp || 'unknown'
  const confidence = Math.min(100, Math.max(0, cmpReport?.confidence || 0))

  const profiles = {
    onetrust: {
      profile: 'onetrust',
      expectedFlow: 'reject_or_preferences',
      riskLevel: 'medium',
      recommendedStrategy: 'candidate_review_preferences',
      supportsPreferenceCenter: true,
      supportsLegitimateInterestFlow: true,
      supportsVendorFlow: true
    },
    didomi: {
      profile: 'didomi',
      expectedFlow: 'preferences_first',
      riskLevel: 'medium',
      recommendedStrategy: 'candidate_review_preferences',
      supportsPreferenceCenter: true,
      supportsLegitimateInterestFlow: true,
      supportsVendorFlow: true
    },
    quantcast: {
      profile: 'quantcast',
      expectedFlow: 'legitimate_interest_heavy',
      riskLevel: 'high',
      recommendedStrategy: 'candidate_legitimate_interest_review',
      supportsPreferenceCenter: true,
      supportsLegitimateInterestFlow: true,
      supportsVendorFlow: true
    },
    cookiebot: {
      profile: 'cookiebot',
      expectedFlow: 'direct_reject_possible',
      riskLevel: 'low',
      recommendedStrategy: 'candidate_disable_optional',
      supportsPreferenceCenter: true,
      supportsLegitimateInterestFlow: false,
      supportsVendorFlow: false
    },
    trustarc: {
      profile: 'trustarc',
      expectedFlow: 'layered_preferences',
      riskLevel: 'medium',
      recommendedStrategy: 'candidate_review_preferences',
      supportsPreferenceCenter: true,
      supportsLegitimateInterestFlow: false,
      supportsVendorFlow: true
    },
    usercentrics: {
      profile: 'usercentrics',
      expectedFlow: 'preferences_first',
      riskLevel: 'medium',
      recommendedStrategy: 'candidate_review_preferences',
      supportsPreferenceCenter: true,
      supportsLegitimateInterestFlow: true,
      supportsVendorFlow: true
    },
    sourcepoint: {
      profile: 'sourcepoint',
      expectedFlow: 'vendor_or_purpose_review',
      riskLevel: 'medium',
      recommendedStrategy: 'candidate_vendor_review',
      supportsPreferenceCenter: true,
      supportsLegitimateInterestFlow: true,
      supportsVendorFlow: true
    },
    unknown: {
      profile: 'unknown',
      expectedFlow: 'unknown',
      riskLevel: 'unknown',
      recommendedStrategy: 'observe_only',
      supportsPreferenceCenter: false,
      supportsLegitimateInterestFlow: false,
      supportsVendorFlow: false
    }
  }

  const profile = profiles[cmp] || profiles.unknown

  return {
    cmp,
    ...profile,
    confidence
  }
}

function analyzeCookieContainer(container) {
  if (!container) return { error: 'no_container' }

  const text = getText(container)
  const actionText = getElementActionText(container)

  return {
    textSample: text.slice(0, 500),
    textLength: text.length,
    hasKeywords: textHasAny(text, bannerKeywords),
    hasKnownCmp: textHasAny(actionText, knownCmpKeywords),
    hasPreferences: textHasAny(text, preferenceSectionTexts),
    hasToggles: getToggleControls(container).length > 0,
    complexity: calculateTextComplexity(text),
    language: detectConsentLanguageFromText(text),
    position: detectBannerPosition(container)
  }
}

function detectPreferenceCategories(text) {
  const normalizedText = normalizeMatchText(text)
  const categories = []

  if (textHasAny(normalizedText, ['analytics', 'analitica', 'statistics', 'measurement', 'medicion'])) {
    categories.push('analytics')
  }

  if (textHasAny(normalizedText, ['marketing', 'advertising', 'ads', 'personalization', 'personalisation', 'profiling'])) {
    categories.push('marketing')
  }

  if (textHasAny(normalizedText, ['social media', 'social networks', 'redes sociales', 'sociales'])) {
    categories.push('social')
  }

  return categories
}

function detectVendorSection(text) {
  const vendorKeywords = [
    'vendors',
    'vendor',
    'providers',
    'provider',
    'partners',
    'partner',
    'third parties',
    'terceros',
    'socios',
    'proveedores'
  ]

  return textHasAny(text, vendorKeywords)
}

function detectLegitimateInterestSection(text) {
  const legitimateInterestKeywords = [
    'legitimate interest',
    'legitimate interests',
    'interes legitimo',
    'intereses legitimos',
    'legítimo interés',
    'intereses legítimos'
  ]

  return textHasAny(text, legitimateInterestKeywords)
}

function analyzePreferenceCenter(panel) {
  if (!panel) {
    return {
      hasPreferences: false,
      hasToggles: false,
      toggleCount: 0,
      categories: [],
      hasVendors: false,
      hasLegitimateInterests: false,
      complexity: 0
    }
  }

  const text = getText(panel)
  const actionText = getElementActionText(panel)
  const combinedText = [
    text,
    actionText
  ].join(' ')

  const toggles = getToggleControls(panel)
  const categories = detectPreferenceCategories(combinedText)
  const hasVendors = detectVendorSection(combinedText)
  const hasLegitimateInterests = detectLegitimateInterestSection(combinedText)

  if (hasVendors || hasLegitimateInterests || categories.length > 0) {
    cookieDebugLog('cookie.preference_sections.detected', {
      hasVendors,
      hasLegitimateInterests,
      categories,
      toggleCount: toggles.length,
      textLength: text.length,
    })
  }

  return {
    hasPreferences: textHasAny(combinedText, preferenceSectionTexts),
    hasToggles: toggles.length > 0,
    toggleCount: toggles.length,
    categories,
    hasVendors,
    hasLegitimateInterests,
    complexity: calculateTextComplexity(text)
  }
}

function getToggleState(control) {
  if (!control) return 'unknown'

  const state =
    getConsentToggleState(control)

  logConsentToggleState(control, state)

  return state
}

function classifyToggleContext(control) {
  if (!control) return 'unknown'

  const contextText = normalizeMatchText([
    getText(control),
    getElementActionText(control),
    getPreferenceDecisionText(control)
  ].join(' '))

  if (textHasAny(contextText, essentialPreferenceTexts)) {
    return 'required'
  }

  if (
    textHasAny(contextText, optionalPreferenceTexts) ||
    textHasAny(contextText, ['analytics', 'marketing', 'advertising', 'social media', 'tracking'])
  ) {
    return 'optional'
  }

  return 'unknown'
}

function analyzePreferenceToggles(panel) {
  if (!panel) {
    return {
      toggleCount: 0,
      enabledCount: 0,
      disabledCount: 0,
      unknownCount: 0,
      optionalCandidates: 0,
      requiredCandidates: 0
    }
  }

  const toggles = getToggleControls(panel)

  return toggles.reduce((summary, control) => {
    const state = getToggleState(control)
    const context = classifyToggleContext(control)

    summary.toggleCount += 1

    if (state === 'enabled') {
      summary.enabledCount += 1
    } else if (state === 'disabled') {
      summary.disabledCount += 1
    } else {
      summary.unknownCount += 1
    }

    if (context === 'optional') {
      summary.optionalCandidates += 1
    } else if (context === 'required') {
      summary.requiredCandidates += 1
    }

    return summary
  }, {
    toggleCount: 0,
    enabledCount: 0,
    disabledCount: 0,
    unknownCount: 0,
    optionalCandidates: 0,
    requiredCandidates: 0
  })
}

function identifySafeToggleCandidates(panel) {
  const result = {
    safeCandidates: [],
    riskyCandidates: [],
    unknownCandidates: []
  }

  if (!panel) return result

  getToggleControls(panel).forEach((control) => {
    const state = getToggleState(control)
    const context = classifyToggleContext(control)
    const nearbyText = normalizeMatchText([
      getText(control),
      getElementActionText(control),
      getPreferenceDecisionText(control)
    ].join(' '))

    const hasVendorText = detectVendorSection(nearbyText)
    const hasLegitimateInterestText = detectLegitimateInterestSection(nearbyText)

    let confidence = 0
    let reason = 'unknown_toggle_candidate'

    if (context === 'required') {
      confidence = 0
      reason = 'required_toggle_never_safe'
    } else if (context === 'optional' && state === 'enabled') {
      confidence = 75
      reason = 'enabled_optional_toggle'
    } else if (context === 'optional' && state === 'unknown') {
      confidence = 45
      reason = 'optional_toggle_unknown_state'
    } else if (context === 'optional') {
      confidence = 35
      reason = 'optional_toggle_not_enabled'
    } else if (state === 'unknown') {
      confidence = 20
      reason = 'unknown_context_unknown_state'
    } else {
      confidence = 25
      reason = 'unknown_context_toggle'
    }

    if (hasVendorText) {
      confidence -= 15
      reason = `${reason}_vendor_context`
    }

    if (hasLegitimateInterestText) {
      confidence -= 15
      reason = `${reason}_legitimate_interest_context`
    }

    confidence = Math.min(100, Math.max(0, confidence))

    const candidate = {
      state,
      context,
      reason,
      confidence
    }

    if (context === 'required') {
      result.riskyCandidates.push(candidate)
    } else if (context === 'optional' && state === 'enabled' && confidence >= 60) {
      result.safeCandidates.push(candidate)
    } else if (confidence <= 25) {
      result.riskyCandidates.push(candidate)
    } else {
      result.unknownCandidates.push(candidate)
    }
  })

  return result
}

function buildPreferenceIntelligenceReport(panel) {
  const center = analyzePreferenceCenter(panel)
  const toggles = analyzePreferenceToggles(panel)
  const toggleCandidates = identifySafeToggleCandidates(panel)
  const cmp = panel
    ? detectCMPFingerprint(panel)
    : {
        cmp: 'unknown',
        confidence: 0,
        signals: []
      }
  const cmpStrategy = getCMPStrategyProfile(cmp)

  const safeCandidateCount = toggleCandidates.safeCandidates.length
  const riskyCandidateCount = toggleCandidates.riskyCandidates.length
  const unknownCandidateCount = toggleCandidates.unknownCandidates.length

  let riskLevel = 'unknown'
  let recommendedPassiveStrategy = 'observe_only'
  let reason = 'preference_intelligence_observe_only'

  if (!panel) {
    reason = 'no_preference_panel'
  } else if (toggles.unknownCount >= 3 || unknownCandidateCount >= 3) {
    riskLevel = 'high'
    recommendedPassiveStrategy = 'observe_only'
    reason = 'many_unknown_toggles'
  } else if (toggles.requiredCandidates > 1) {
    riskLevel = 'high'
    recommendedPassiveStrategy = 'candidate_review_preferences'
    reason = 'multiple_required_toggle_candidates'
  } else if (toggles.requiredCandidates > 0) {
    riskLevel = 'medium'
    recommendedPassiveStrategy = 'candidate_review_preferences'
    reason = 'required_toggle_candidates_present'
  } else if (center.hasLegitimateInterests) {
    riskLevel = 'medium'
    recommendedPassiveStrategy = 'candidate_legitimate_interest_review'
    reason = 'legitimate_interest_section_present'
  } else if (center.hasVendors) {
    riskLevel = 'medium'
    recommendedPassiveStrategy = 'candidate_vendor_review'
    reason = 'vendor_section_present'
  } else if (safeCandidateCount > 0 && riskyCandidateCount === 0) {
    riskLevel = 'low'
    recommendedPassiveStrategy = 'candidate_disable_optional'
    reason = 'safe_optional_toggle_candidates_present'
  } else if (riskyCandidateCount > 0) {
    riskLevel = 'medium'
    recommendedPassiveStrategy = 'candidate_review_preferences'
    reason = 'risky_toggle_candidates_present'
  } else if (center.hasPreferences || toggles.toggleCount > 0) {
    riskLevel = 'medium'
    recommendedPassiveStrategy = 'candidate_review_preferences'
    reason = 'preference_controls_present'
  }

  return {
    center,
    toggles,
    toggleCandidates,
    cmp,
    cmpStrategy,
    riskLevel,
    recommendedPassiveStrategy,
    safeToAct: false,
    allowed: false,
    reason
  }
}

function evaluateCMPReliability(cmpStrategy, preferenceReport) {
  const riskModifiers = []
  const cmpRiskLevel = cmpStrategy?.riskLevel || 'unknown'
  const preferenceRiskLevel = preferenceReport?.riskLevel || 'unknown'
  const toggles = preferenceReport?.toggles || {}
  const toggleCandidates = preferenceReport?.toggleCandidates || {
    safeCandidates: [],
    riskyCandidates: [],
    unknownCandidates: []
  }

  const safeCandidateCount = toggleCandidates.safeCandidates?.length || 0
  const riskyCandidateCount = toggleCandidates.riskyCandidates?.length || 0
  const unknownCandidateCount = toggleCandidates.unknownCandidates?.length || 0
  const unknownToggleCount = toggles.unknownCount || 0

  let reliability = 'unknown'
  let automationReadiness = 'unknown'
  let requiresReview = true
  let confidenceAdjustment = 0
  let reason = 'cmp_reliability_unknown'

  if (cmpRiskLevel === 'high') {
    riskModifiers.push('cmp_high_risk')
    confidenceAdjustment -= 20
  }

  if (preferenceRiskLevel === 'high') {
    riskModifiers.push('preference_high_risk')
    confidenceAdjustment -= 20
  }

  if (unknownToggleCount >= 3 || unknownCandidateCount >= 3) {
    riskModifiers.push('many_unknown_toggles')
    confidenceAdjustment -= 25
  }

  if (toggles.requiredCandidates > 0) {
    riskModifiers.push('required_toggle_candidates')
    confidenceAdjustment -= 15
  }

  if (cmpStrategy?.supportsVendorFlow) {
    riskModifiers.push('vendor_flow_supported')
    confidenceAdjustment -= 5
  }

  if (cmpStrategy?.supportsLegitimateInterestFlow) {
    riskModifiers.push('legitimate_interest_flow_supported')
    confidenceAdjustment -= 10
  }

  if (safeCandidateCount > 0 && riskyCandidateCount === 0 && preferenceRiskLevel === 'low') {
    riskModifiers.push('safe_candidates_low_preference_risk')
    confidenceAdjustment += 15
  }

  if (unknownToggleCount >= 3 || unknownCandidateCount >= 3) {
    reliability = 'low'
    automationReadiness = 'blocked'
    requiresReview = true
    reason = 'blocked_by_unknown_toggles'
  } else if (cmpRiskLevel === 'high' || preferenceRiskLevel === 'high') {
    reliability = 'low'
    automationReadiness = 'blocked'
    requiresReview = true
    reason = 'blocked_by_high_risk'
  } else if (
    cmpStrategy?.supportsVendorFlow ||
    cmpStrategy?.supportsLegitimateInterestFlow ||
    preferenceRiskLevel === 'medium'
  ) {
    reliability = 'medium'
    automationReadiness = 'cautious'
    requiresReview = true
    reason = 'review_recommended_for_complex_flow'
  } else if (safeCandidateCount > 0 && riskyCandidateCount === 0 && preferenceRiskLevel === 'low') {
    reliability = 'high'
    automationReadiness = 'candidate_ready'
    requiresReview = false
    reason = 'safe_candidates_with_low_risk'
  }

  return {
    reliability,
    automationReadiness,
    requiresReview,
    riskModifiers,
    confidenceAdjustment: Math.min(25, Math.max(-50, confidenceAdjustment)),
    reason
  }
}

// Passive Cookie Intelligence - contract and shared constants
//
// This layer is observation-only. Helpers may read the current report and the
// bounded passive memory cache, but must not click, mutate the DOM, retry,
// trigger automation, update stats, or send background messages. New outputs
// are metadata-only and must preserve the passive guard values below.
const PASSIVE_SAFE_TO_ACT = false
const PASSIVE_ALLOWED = false
const PASSIVE_REQUIRES_REVIEW = true

const EXPECTED_PASSIVE_REPORT_FIELDS = [
  'decision',
  'historical',
  'patterns',
  'fingerprint',
  'trend',
  'anomalies',
  'confidenceAggregation',
  'reputation',
  'safety',
  'normalized',
  'debugAnalytics',
  'behaviorProfile',
  'trustScore',
  'stabilityIndex',
  'riskEvolution',
  'consistencyValidation',
  'fingerprintHistory',
  'lifecycle',
  'integrity',
  'compacted',
  'diagnostics',
  'comparative',
  'similarity',
  'clustering',
  'confidenceDrift',
  'uncertainty',
  'escalation',
  'weighting',
  'normalizedTrust',
  'persistence',
  'diagnosticsAggregate'
]

// Passive utilities
function clampPassiveDecisionScore(value) {
  return Math.min(100, Math.max(0, Math.round(value || 0)))
}

function classifyPassiveDecisionRisk(score, blockers, cmpRiskLevel, preferenceRiskLevel) {
  if (cmpRiskLevel === 'high' || preferenceRiskLevel === 'high') return 'high'
  if (blockers.length > 0 && score < 45) return 'high'
  if (score >= 70) return 'low'
  if (score >= 40) return 'medium'
  return 'unknown'
}

// Passive decision engine
function buildPassiveDecisionEngine(unifiedReport) {
  const banner = unifiedReport?.banner || null
  const preference = unifiedReport?.preference || null
  const cmp = unifiedReport?.cmp || {}
  const cmpStrategy = unifiedReport?.cmpStrategy || {}
  const reliability = unifiedReport?.reliability || {}
  const observation = unifiedReport?.observation || {}
  const toggles = preference?.toggles || {}
  const toggleCandidates = preference?.toggleCandidates || {
    safeCandidates: [],
    riskyCandidates: [],
    unknownCandidates: []
  }
  const observationStability =
    observation?.stability?.observationStability || 'unknown'
  const adaptiveConfidence = observation?.stability?.adaptiveConfidence || 0
  const cmpRiskLevel = cmpStrategy?.riskLevel || 'unknown'
  const preferenceRiskLevel = preference?.riskLevel || 'unknown'
  const reliabilityReadiness = reliability?.automationReadiness || 'unknown'
  const safeCandidateCount = toggleCandidates.safeCandidates?.length || 0
  const riskyCandidateCount = toggleCandidates.riskyCandidates?.length || 0
  const unknownCandidateCount = toggleCandidates.unknownCandidates?.length || 0
  const unknownToggleCount = toggles.unknownCount || 0
  const toggleCount = toggles.toggleCount || 0
  const unknownToggleDensity = toggleCount > 0
    ? unknownToggleCount / toggleCount
    : 0
  const hasVendorFlow = Boolean(
    cmpStrategy?.supportsVendorFlow ||
    preference?.center?.hasVendors
  )
  const hasLegitimateInterestFlow = Boolean(
    cmpStrategy?.supportsLegitimateInterestFlow ||
    preference?.center?.hasLegitimateInterests
  )
  const signals = []
  const blockers = []

  let score = 35
  let confidence = Math.max(
    banner?.confidence || 0,
    cmp?.confidence || 0,
    adaptiveConfidence
  )

  if (cmpRiskLevel === 'high') {
    score -= 35
    confidence -= 20
    blockers.push('cmp_high_risk')
    signals.push('cmp_high_risk')
  } else if (cmpRiskLevel === 'medium') {
    score -= 12
    signals.push('cmp_medium_risk')
  } else if (cmpRiskLevel === 'low') {
    score += 8
    signals.push('cmp_low_risk')
  }

  if (preferenceRiskLevel === 'high') {
    score -= 25
    confidence -= 15
    blockers.push('preference_high_risk')
    signals.push('preference_high_risk')
  } else if (preferenceRiskLevel === 'low') {
    score += 10
    signals.push('preference_low_risk')
  }

  if (reliabilityReadiness === 'candidate_ready') {
    score += 18
    signals.push('candidate_ready')
  } else if (reliabilityReadiness === 'blocked') {
    score -= 25
    blockers.push('reliability_blocked')
    signals.push('readiness_blocked')
  } else if (reliabilityReadiness === 'cautious') {
    score -= 6
    signals.push('readiness_cautious')
  }

  if (safeCandidateCount > 0) {
    score += Math.min(18, safeCandidateCount * 6)
    signals.push('safe_optional_candidates')
  }

  if (riskyCandidateCount > 0) {
    score -= Math.min(25, riskyCandidateCount * 8)
    blockers.push('risky_toggle_candidates')
    signals.push('risky_toggle_candidates')
  }

  if (
    unknownToggleCount >= 3 ||
    unknownCandidateCount >= 3 ||
    unknownToggleDensity >= 0.4
  ) {
    score -= 20
    confidence -= 10
    blockers.push('unknown_toggle_density')
    signals.push('unknown_toggle_density')
  }

  if (hasVendorFlow) {
    score -= 8
    signals.push('vendor_flow_present')
  }

  if (hasLegitimateInterestFlow) {
    score -= 12
    signals.push('legitimate_interest_flow_present')
  }

  if (observationStability === 'high') {
    confidence += 12
    score += 6
    signals.push('stable_observation')
  } else if (observationStability === 'medium') {
    confidence += 6
    signals.push('partially_stable_observation')
  } else if (observationStability === 'low') {
    confidence -= 12
    score -= 10
    blockers.push('unstable_observation')
    signals.push('unstable_observation')
  }

  score = clampPassiveDecisionScore(score)
  confidence = clampPassiveDecisionScore(confidence)

  let stability = observationStability
  if (
    stability !== 'low' &&
    (
      unknownToggleCount >= 3 ||
      unknownCandidateCount >= 3 ||
      unknownToggleDensity >= 0.4
    )
  ) {
    stability = 'low'
  }

  let readiness = reliabilityReadiness
  if (
    cmpRiskLevel === 'high' ||
    preferenceRiskLevel === 'high' ||
    blockers.includes('unknown_toggle_density')
  ) {
    readiness = 'blocked'
  } else if (
    readiness === 'candidate_ready' &&
    (hasVendorFlow || hasLegitimateInterestFlow)
  ) {
    readiness = 'cautious'
  }

  const risk = classifyPassiveDecisionRisk(
    score,
    blockers,
    cmpRiskLevel,
    preferenceRiskLevel
  )

  let recommendation = 'observe_only'
  let reason = 'passive_decision_observe_only'

  if (cmpRiskLevel === 'high') {
    recommendation = 'observe_cmp_behavior'
    reason = 'cmp_high_risk_observe_only'
  } else if (hasLegitimateInterestFlow) {
    recommendation = 'review_legitimate_interest_flow'
    reason = 'legitimate_interest_flow_requires_review'
  } else if (hasVendorFlow) {
    recommendation = 'review_vendor_flow'
    reason = 'vendor_flow_requires_review'
  } else if (preference) {
    recommendation = 'review_preference_center'
    reason = 'preference_center_requires_review'
  } else if (readiness === 'candidate_ready') {
    recommendation = 'candidate_optional_disable_flow'
    reason = 'optional_disable_candidate_passive_only'
  } else if (cmp?.cmp && cmp.cmp !== 'unknown') {
    recommendation = 'observe_cmp_behavior'
    reason = 'cmp_detected_passive_observation'
  }

  return {
    score,
    confidence,
    risk,
    stability,
    readiness,
    recommendation,
    requiresReview: PASSIVE_REQUIRES_REVIEW,
    blockers: uniquePassiveList(blockers),
    signals: uniquePassiveList(signals),
    safeToAct: PASSIVE_SAFE_TO_ACT,
    allowed: PASSIVE_ALLOWED,
    reason
  }
}

function buildPassiveDebugSummary(unifiedReport) {
  return {
    timestamp: Date.now(),
    hostname: getCurrentHostname(),
    decision: unifiedReport?.decision || null,
    historical: unifiedReport?.historical || null,
    patterns: unifiedReport?.patterns || null,
    analytics: unifiedReport?.debugAnalytics || null,
    diagnostics: unifiedReport?.diagnostics || null
  }
}

// Debug exposure
function exposeUnifiedCookieDebug(unifiedReport) {
  if (window.__ADDISLINE_DEBUG__ !== true) return

  window.__addislineDebug = {
    timestamp: Date.now(),
    unifiedReport,
    decision: unifiedReport?.decision || null,
    summary: buildPassiveDebugSummary(unifiedReport),
    analytics: unifiedReport?.debugAnalytics || null
  }

  console.groupCollapsed('[Addisline Debug]')
  console.log('Unified Report:', unifiedReport)
  console.log('Decision:', unifiedReport?.decision || null)
  console.groupEnd()
}

// Passive memory
function getCookieIntelligenceMemoryKey() {
  return 'addisline.cookieIntelligence.memory.v1'
}

function getCurrentHostname() {
  return window.location?.hostname || 'unknown'
}

function buildPassiveSiteMemoryObservation(unifiedReport) {
  return {
    timestamp: Date.now(),
    hostname: getCurrentHostname(),
    cmp: unifiedReport?.cmp?.cmp || 'unknown',
    cmpConfidence: unifiedReport?.cmp?.confidence || 0,
    risk: unifiedReport?.decision?.risk || 'unknown',
    readiness: unifiedReport?.decision?.readiness || 'unknown',
    recommendation: unifiedReport?.decision?.recommendation || 'observe_only',
    score: unifiedReport?.decision?.score || 0,
    confidence: unifiedReport?.decision?.confidence || 0,
    stability: unifiedReport?.decision?.stability || 'unknown',
    blockers: unifiedReport?.decision?.blockers || [],
    signals: unifiedReport?.decision?.signals || [],
    hasVendors: Boolean(
      unifiedReport?.preference?.center?.hasVendors ||
      unifiedReport?.cmpStrategy?.supportsVendorFlow
    ),
    hasLegitimateInterests: Boolean(
      unifiedReport?.preference?.center?.hasLegitimateInterests ||
      unifiedReport?.cmpStrategy?.supportsLegitimateInterestFlow
    )
  }
}

function readPassiveSiteMemory() {
  try {
    const raw = localStorage.getItem(getCookieIntelligenceMemoryKey())
    if (!raw) return {}

    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writePassiveSiteMemory(memory) {
  try {
    localStorage.setItem(
      getCookieIntelligenceMemoryKey(),
      JSON.stringify(memory)
    )
  } catch {
    // Ignore storage failures silently.
  }
}

function rememberPassiveCookieObservation(unifiedReport) {
  const hostname = getCurrentHostname()
  if (!hostname || hostname === 'unknown') return

  const observation = buildPassiveSiteMemoryObservation(unifiedReport)
  const memory = readPassiveSiteMemory()
  const existing = memory[hostname] || {
    hostname,
    visits: 0,
    observations: []
  }
  const observations = Array.isArray(existing.observations)
    ? existing.observations
    : []

  observations.push(observation)

  const boundedObservations = observations.slice(-5)

  memory[hostname] = {
    hostname,
    visits: (existing.visits || 0) + 1,
    lastSeenAt: observation.timestamp,
    lastDecision: {
      risk: observation.risk,
      readiness: observation.readiness,
      recommendation: observation.recommendation,
      score: observation.score,
      confidence: observation.confidence,
      stability: observation.stability
    },
    observations: boundedObservations
  }

  const hostnames = Object.keys(memory)
  if (hostnames.length > 50) {
    hostnames
      .sort((a, b) => (memory[a]?.lastSeenAt || 0) - (memory[b]?.lastSeenAt || 0))
      .slice(0, hostnames.length - 50)
      .forEach((oldHostname) => {
        delete memory[oldHostname]
      })
  }

  writePassiveSiteMemory(memory)
}

function uniquePassiveList(values) {
  if (!Array.isArray(values)) return []

  return [...new Set(
    values
      .filter((value) => typeof value === 'string')
      .map((value) => value.trim())
      .filter(Boolean)
  )]
}

// Historical intelligence
function calculateHistoricalConsistency(values) {
  if (!Array.isArray(values) || values.length <= 1) return 'unknown'

  const uniqueValues = [...new Set(values.filter(Boolean))]

  if (uniqueValues.length === 1) return 'high'
  if (uniqueValues.length <= 2) return 'medium'

  return 'low'
}

function calculateAverageScore(observations) {
  if (!Array.isArray(observations) || observations.length === 0) return 0

  const scores = observations.map((entry) => Number(entry?.score) || 0)

  return Math.round(
    scores.reduce((sum, value) => sum + value, 0) / scores.length
  )
}

function buildHistoricalSiteIntelligence(unifiedReport) {
  const hostname = getCurrentHostname()
  const memory = readPassiveSiteMemory()
  const siteMemory = memory[hostname]

  if (!siteMemory || !Array.isArray(siteMemory.observations)) {
    return {
      available: false,
      hostname,
      observations: 0
    }
  }

  const observations = siteMemory.observations.slice(-5)
  const risks = observations.map((entry) => entry?.risk)
  const readinessValues = observations.map((entry) => entry?.readiness)
  const cmpValues = observations.map((entry) => entry?.cmp)
  const stabilityValues = observations.map((entry) => entry?.stability)
  const repeatedBlockers = uniquePassiveList(
    observations.flatMap((entry) =>
      Array.isArray(entry?.blockers) ? entry.blockers : []
    )
  )
  const repeatedSignals = uniquePassiveList(
    observations.flatMap((entry) =>
      Array.isArray(entry?.signals) ? entry.signals : []
    )
  )
  const riskConsistency = calculateHistoricalConsistency(risks)
  const readinessConsistency = calculateHistoricalConsistency(readinessValues)
  const cmpConsistency = calculateHistoricalConsistency(cmpValues)
  const stabilityConsistency = calculateHistoricalConsistency(stabilityValues)
  const averageScore = calculateAverageScore(observations)
  const historicalRisk = risks[risks.length - 1] || 'unknown'
  const historicalReadiness =
    readinessValues[readinessValues.length - 1] || 'unknown'

  let historicalConfidence = 'low'

  if (
    riskConsistency === 'high' &&
    readinessConsistency === 'high' &&
    cmpConsistency === 'high'
  ) {
    historicalConfidence = 'high'
  } else if (
    riskConsistency === 'medium' ||
    readinessConsistency === 'medium'
  ) {
    historicalConfidence = 'medium'
  }

  return {
    available: true,
    hostname,
    observations: observations.length,
    averageScore,
    historicalRisk,
    historicalReadiness,
    historicalConfidence,
    consistencies: {
      riskConsistency,
      readinessConsistency,
      cmpConsistency,
      stabilityConsistency
    },
    repeatedBlockers,
    repeatedSignals,
    latestObservation: observations[observations.length - 1] || null
  }
}

// Pattern, fingerprint, and risk analysis
function buildPassivePatternClassification(unifiedReport) {
  const historical = unifiedReport?.historical || {}

  if (!historical.available) {
    return {
      available: false,
      pattern: 'unknown',
      confidence: 'low',
      reasons: ['no_historical_data']
    }
  }

  const reasons = []
  const riskConsistency =
    historical?.consistencies?.riskConsistency || 'unknown'
  const readinessConsistency =
    historical?.consistencies?.readinessConsistency || 'unknown'
  const cmpConsistency =
    historical?.consistencies?.cmpConsistency || 'unknown'
  const repeatedBlockers =
    uniquePassiveList(historical?.repeatedBlockers || [])
  const repeatedSignals =
    uniquePassiveList(historical?.repeatedSignals || [])
  const averageScore = historical?.averageScore || 0

  let pattern = 'unknown'
  let confidence = 'low'

  const hasVendorFlow = repeatedSignals.includes('vendor_flow_present')
  const hasLegitimateInterestFlow =
    repeatedSignals.includes('legitimate_interest_flow_present')
  const unstableBehavior = repeatedBlockers.includes('unstable_observation')
  const unknownDensity = repeatedBlockers.includes('unknown_toggle_density')

  if (
    riskConsistency === 'high' &&
    readinessConsistency === 'high' &&
    cmpConsistency === 'high'
  ) {
    confidence = 'high'
    reasons.push('high_historical_consistency')
  } else if (
    riskConsistency === 'medium' ||
    readinessConsistency === 'medium'
  ) {
    confidence = 'medium'
    reasons.push('medium_historical_consistency')
  }

  if (
    averageScore >= 70 &&
    !hasVendorFlow &&
    !hasLegitimateInterestFlow &&
    !unstableBehavior &&
    !unknownDensity
  ) {
    pattern = 'stable_low_risk'
    reasons.push('stable_low_risk_behavior')
  } else if (hasVendorFlow || hasLegitimateInterestFlow) {
    pattern = 'complex_cmp_flow'
    reasons.push('complex_cmp_behavior')
  } else if (unstableBehavior || unknownDensity) {
    pattern = 'unstable_behavior'
    reasons.push('unstable_or_unknown_behavior')
  } else if (averageScore <= 35) {
    pattern = 'high_risk_behavior'
    reasons.push('historically_low_scores')
  } else {
    pattern = 'moderate_behavior'
    reasons.push('moderate_historical_behavior')
  }

  return {
    available: true,
    pattern,
    confidence,
    reasons: uniquePassiveList(reasons),
    averageScore,
    historicalRisk: historical?.historicalRisk || 'unknown',
    historicalReadiness: historical?.historicalReadiness || 'unknown'
  }
}

function normalizeCMPFingerprint(cmpReport, cmpStrategy) {
  const cmpName = normalizeMatchText(cmpReport?.cmp || cmpStrategy?.cmp || 'unknown')
  const profileName = normalizeMatchText(cmpStrategy?.profile || cmpName || 'unknown')
  const confidence = Math.min(100, Math.max(0, Number(cmpReport?.confidence) || 0))
  const signals = uniquePassiveList(cmpReport?.signals || [])

  return {
    cmp: cmpName || 'unknown',
    profile: profileName || 'unknown',
    confidence,
    riskLevel: cmpStrategy?.riskLevel || 'unknown',
    expectedFlow: cmpStrategy?.expectedFlow || 'unknown',
    signalCount: signals.length,
    signals,
    supportsPreferenceCenter: Boolean(cmpStrategy?.supportsPreferenceCenter),
    supportsVendorFlow: Boolean(cmpStrategy?.supportsVendorFlow),
    supportsLegitimateInterestFlow: Boolean(
      cmpStrategy?.supportsLegitimateInterestFlow
    )
  }
}

function aggregatePassiveConfidence(unifiedReport) {
  const values = [
    unifiedReport?.banner?.confidence,
    unifiedReport?.cmp?.confidence,
    unifiedReport?.decision?.confidence,
    unifiedReport?.historical?.historicalConfidence === 'high' ? 85 : null,
    unifiedReport?.historical?.historicalConfidence === 'medium' ? 60 : null,
    unifiedReport?.patterns?.confidence === 'high' ? 85 : null,
    unifiedReport?.patterns?.confidence === 'medium' ? 60 : null
  ]
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0)

  const average = values.length
    ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
    : 0
  const stabilityBonus =
    unifiedReport?.historical?.consistencies?.riskConsistency === 'high' ? 8 : 0
  const anomalyPenalty =
    unifiedReport?.anomalies?.detected ? 12 : 0
  const aggregate = Math.min(100, Math.max(0, average + stabilityBonus - anomalyPenalty))

  return {
    aggregate,
    average,
    inputs: values.length,
    stabilityBonus,
    anomalyPenalty,
    level: aggregate >= 75 ? 'high' : aggregate >= 45 ? 'medium' : 'low'
  }
}

function calculatePassiveTrend(values) {
  if (!Array.isArray(values) || values.length < 2) {
    return {
      direction: 'unknown',
      delta: 0
    }
  }

  const first = Number(values[0]) || 0
  const last = Number(values[values.length - 1]) || 0
  const delta = last - first

  if (delta >= 10) {
    return {
      direction: 'improving',
      delta
    }
  }

  if (delta <= -10) {
    return {
      direction: 'declining',
      delta
    }
  }

  return {
    direction: 'stable',
    delta
  }
}

function buildHistoricalTrendAnalysis(unifiedReport) {
  const observations = unifiedReport?.historical?.latestObservation
    ? readPassiveSiteMemory()[getCurrentHostname()]?.observations || []
    : []
  const boundedObservations = Array.isArray(observations)
    ? observations.slice(-5)
    : []
  const scores = boundedObservations.map((entry) => Number(entry?.score) || 0)
  const confidences = boundedObservations.map((entry) => Number(entry?.confidence) || 0)
  const scoreTrend = calculatePassiveTrend(scores)
  const confidenceTrend = calculatePassiveTrend(confidences)

  return {
    available: boundedObservations.length > 1,
    observations: boundedObservations.length,
    scoreTrend,
    confidenceTrend,
    latestScore: scores[scores.length - 1] || 0,
    latestConfidence: confidences[confidences.length - 1] || 0
  }
}

function buildDomainReputationScore(unifiedReport) {
  const historical = unifiedReport?.historical || {}
  const patterns = unifiedReport?.patterns || {}
  const decision = unifiedReport?.decision || {}
  const fingerprint = unifiedReport?.fingerprint || {}
  const signals = []
  const penalties = []

  let score = 50

  if (historical.available) {
    score += Math.min(20, Math.max(-20, (historical.averageScore || 0) - 50))
    signals.push('historical_average_available')
  }

  if (patterns.pattern === 'stable_low_risk') {
    score += 20
    signals.push('stable_low_risk_pattern')
  } else if (patterns.pattern === 'complex_cmp_flow') {
    score -= 12
    penalties.push('complex_cmp_flow')
  } else if (patterns.pattern === 'unstable_behavior') {
    score -= 18
    penalties.push('unstable_behavior')
  } else if (patterns.pattern === 'high_risk_behavior') {
    score -= 24
    penalties.push('high_risk_behavior')
  }

  if (decision.risk === 'low') {
    score += 10
    signals.push('current_low_risk')
  } else if (decision.risk === 'high') {
    score -= 20
    penalties.push('current_high_risk')
  }

  if (fingerprint.riskLevel === 'high') {
    score -= 20
    penalties.push('high_risk_cmp_fingerprint')
  }

  score = Math.min(100, Math.max(0, Math.round(score)))

  return {
    score,
    level: score >= 75 ? 'trusted_passive' : score >= 45 ? 'neutral' : 'cautious',
    signals: uniquePassiveList(signals),
    penalties: uniquePassiveList(penalties)
  }
}

function buildPassiveSafetyScore(unifiedReport) {
  const decision = unifiedReport?.decision || {}
  const reputation = unifiedReport?.reputation || {}
  const anomalies = unifiedReport?.anomalies || {}
  const blockers = uniquePassiveList(decision.blockers || [])
  const reasons = []

  let score = Number(decision.score) || 0

  if (decision.risk === 'high') {
    score -= 20
    reasons.push('decision_high_risk')
  }

  if (reputation.level === 'cautious') {
    score -= 10
    reasons.push('cautious_domain_reputation')
  }

  if (anomalies.detected) {
    score -= 15
    reasons.push('historical_anomaly_detected')
  }

  if (blockers.length > 0) {
    score -= Math.min(20, blockers.length * 5)
    reasons.push('decision_blockers_present')
  }

  score = Math.min(100, Math.max(0, Math.round(score)))

  return {
    score,
    level: score >= 70 ? 'low_passive_risk' : score >= 40 ? 'review' : 'blocked',
    reasons: uniquePassiveList(reasons),
    safeToAct: PASSIVE_SAFE_TO_ACT,
    allowed: PASSIVE_ALLOWED,
    requiresReview: PASSIVE_REQUIRES_REVIEW
  }
}

function detectHistoricalAnomalies(unifiedReport) {
  const historical = unifiedReport?.historical || {}
  const decision = unifiedReport?.decision || {}
  const anomalies = []
  const latestScore = Number(decision.score) || 0
  const averageScore = Number(historical.averageScore) || 0

  if (!historical.available) {
    return {
      detected: false,
      anomalies: [],
      severity: 'none'
    }
  }

  if (Math.abs(latestScore - averageScore) >= 30) {
    anomalies.push('score_deviation_from_history')
  }

  if (
    historical.historicalRisk &&
    historical.historicalRisk !== 'unknown' &&
    decision.risk &&
    decision.risk !== historical.historicalRisk
  ) {
    anomalies.push('risk_changed_from_history')
  }

  if (
    historical.historicalReadiness &&
    historical.historicalReadiness !== 'unknown' &&
    decision.readiness &&
    decision.readiness !== historical.historicalReadiness
  ) {
    anomalies.push('readiness_changed_from_history')
  }

  const uniqueAnomalies = uniquePassiveList(anomalies)

  return {
    detected: uniqueAnomalies.length > 0,
    anomalies: uniqueAnomalies,
    severity: uniqueAnomalies.length >= 2 ? 'medium' : uniqueAnomalies.length === 1 ? 'low' : 'none'
  }
}

function buildDebugAnalyticsSummary(unifiedReport) {
  return {
    timestamp: Date.now(),
    hostname: getCurrentHostname(),
    confidence: unifiedReport?.confidenceAggregation || null,
    trend: unifiedReport?.trend || null,
    reputation: unifiedReport?.reputation || null,
    safety: unifiedReport?.safety || null,
    fingerprint: unifiedReport?.fingerprint || null,
    anomaly: unifiedReport?.anomalies || null,
    normalized: unifiedReport?.normalized || null
  }
}

function buildNormalizedUnifiedCookieReport(unifiedReport) {
  return {
    hostname: getCurrentHostname(),
    hasBanner: Boolean(unifiedReport?.banner),
    hasPreference: Boolean(unifiedReport?.preference),
    cmp: unifiedReport?.fingerprint?.cmp || unifiedReport?.cmp?.cmp || 'unknown',
    decisionRisk: unifiedReport?.decision?.risk || 'unknown',
    decisionReadiness: unifiedReport?.decision?.readiness || 'unknown',
    recommendation: unifiedReport?.decision?.recommendation || 'observe_only',
    historicalAvailable: Boolean(unifiedReport?.historical?.available),
    pattern: unifiedReport?.patterns?.pattern || 'unknown',
    confidenceLevel: unifiedReport?.confidenceAggregation?.level || 'low',
    reputationLevel: unifiedReport?.reputation?.level || 'neutral',
    safetyLevel: unifiedReport?.safety?.level || 'review',
    anomalyDetected: Boolean(unifiedReport?.anomalies?.detected),
    safeToAct: PASSIVE_SAFE_TO_ACT,
    allowed: PASSIVE_ALLOWED
  }
}

function getPassiveMemoryObservations(hostname = getCurrentHostname()) {
  const memory = readPassiveSiteMemory()
  const observations = memory?.[hostname]?.observations

  return Array.isArray(observations) ? observations.slice(-5) : []
}

function buildCMPBehaviorProfile(unifiedReport) {
  const fingerprint = unifiedReport?.fingerprint || {}
  const historical = unifiedReport?.historical || {}
  const patterns = unifiedReport?.patterns || {}
  const signals = uniquePassiveList([
    ...(fingerprint.signals || []),
    ...(historical.repeatedSignals || [])
  ])
  const hasVendorFlow = Boolean(
    fingerprint.supportsVendorFlow ||
    signals.includes('vendor_flow_present')
  )
  const hasLegitimateInterestFlow = Boolean(
    fingerprint.supportsLegitimateInterestFlow ||
    signals.includes('legitimate_interest_flow_present')
  )
  const hasPreferenceCenter = Boolean(
    fingerprint.supportsPreferenceCenter ||
    unifiedReport?.preference?.center?.hasPreferences
  )

  let complexity = 'unknown'
  if (hasVendorFlow || hasLegitimateInterestFlow) {
    complexity = 'high'
  } else if (hasPreferenceCenter || patterns.pattern === 'moderate_behavior') {
    complexity = 'medium'
  } else if (fingerprint.cmp && fingerprint.cmp !== 'unknown') {
    complexity = 'low'
  }

  return {
    available: fingerprint.cmp !== 'unknown' || historical.available === true,
    cmp: fingerprint.cmp || 'unknown',
    expectedFlow: fingerprint.expectedFlow || 'unknown',
    complexity,
    hasPreferenceCenter,
    hasVendorFlow,
    hasLegitimateInterestFlow,
    passiveOnly: true,
    signals
  }
}

function buildHistoricalTrustScore(unifiedReport) {
  const historical = unifiedReport?.historical || {}
  const reputation = unifiedReport?.reputation || {}
  const confidence = unifiedReport?.confidenceAggregation || {}
  const anomalies = unifiedReport?.anomalies || {}
  const reasons = []

  let score = 40

  if (historical.available) {
    score += Math.min(25, Math.max(-20, (historical.averageScore || 0) - 50))
    reasons.push('historical_average_considered')
  }

  if (historical.historicalConfidence === 'high') {
    score += 20
    reasons.push('high_historical_confidence')
  } else if (historical.historicalConfidence === 'medium') {
    score += 10
    reasons.push('medium_historical_confidence')
  }

  if (reputation.level === 'trusted_passive') {
    score += 15
    reasons.push('trusted_passive_reputation')
  } else if (reputation.level === 'cautious') {
    score -= 15
    reasons.push('cautious_reputation')
  }

  if (confidence.level === 'high') {
    score += 10
    reasons.push('high_aggregate_confidence')
  }

  if (anomalies.detected) {
    score -= anomalies.severity === 'medium' ? 20 : 10
    reasons.push('historical_anomaly_penalty')
  }

  score = Math.min(100, Math.max(0, Math.round(score)))

  return {
    score,
    level: score >= 75 ? 'high' : score >= 45 ? 'medium' : 'low',
    reasons: uniquePassiveList(reasons),
    safeToAct: PASSIVE_SAFE_TO_ACT,
    allowed: PASSIVE_ALLOWED,
    requiresReview: PASSIVE_REQUIRES_REVIEW
  }
}

function buildDomainStabilityIndex(unifiedReport) {
  const historical = unifiedReport?.historical || {}
  const trend = unifiedReport?.trend || {}
  const consistency = historical.consistencies || {}
  const reasons = []

  let score = 30

  if (consistency.riskConsistency === 'high') {
    score += 20
    reasons.push('risk_consistency_high')
  } else if (consistency.riskConsistency === 'medium') {
    score += 10
    reasons.push('risk_consistency_medium')
  }

  if (consistency.readinessConsistency === 'high') {
    score += 20
    reasons.push('readiness_consistency_high')
  } else if (consistency.readinessConsistency === 'medium') {
    score += 10
    reasons.push('readiness_consistency_medium')
  }

  if (consistency.cmpConsistency === 'high') {
    score += 15
    reasons.push('cmp_consistency_high')
  }

  if (trend.scoreTrend?.direction === 'stable') {
    score += 10
    reasons.push('score_trend_stable')
  } else if (trend.scoreTrend?.direction === 'declining') {
    score -= 15
    reasons.push('score_trend_declining')
  }

  if (unifiedReport?.anomalies?.detected) {
    score -= 15
    reasons.push('anomaly_reduces_stability')
  }

  score = Math.min(100, Math.max(0, Math.round(score)))

  return {
    score,
    level: score >= 75 ? 'high' : score >= 45 ? 'medium' : 'low',
    observations: historical.observations || 0,
    reasons: uniquePassiveList(reasons)
  }
}

function buildRiskEvolutionAnalysis(unifiedReport) {
  const observations = getPassiveMemoryObservations()
  const currentRisk = unifiedReport?.decision?.risk || 'unknown'
  const risks = observations.map((entry) => entry?.risk || 'unknown')
  const previousRisk = risks[risks.length - 1] || 'unknown'
  const riskOrder = {
    low: 1,
    medium: 2,
    high: 3,
    unknown: 0
  }
  const previousValue = riskOrder[previousRisk] || 0
  const currentValue = riskOrder[currentRisk] || 0

  let direction = 'unknown'
  if (previousValue && currentValue) {
    if (currentValue > previousValue) {
      direction = 'worsening'
    } else if (currentValue < previousValue) {
      direction = 'improving'
    } else {
      direction = 'stable'
    }
  }

  return {
    available: observations.length > 0,
    previousRisk,
    currentRisk,
    direction,
    riskHistory: uniquePassiveList([...risks, currentRisk])
  }
}

function validatePassiveConsistency(unifiedReport) {
  const findings = []
  const decision = unifiedReport?.decision || {}
  const safety = unifiedReport?.safety || {}
  const normalized = unifiedReport?.normalized || {}

  if (decision.safeToAct !== false || decision.allowed !== false) {
    findings.push('decision_not_passive_safe')
  }

  if (safety.safeToAct !== false || safety.allowed !== false) {
    findings.push('safety_not_passive_safe')
  }

  if (normalized.safeToAct !== false || normalized.allowed !== false) {
    findings.push('normalized_not_passive_safe')
  }

  if (decision.requiresReview !== true) {
    findings.push('decision_review_not_required')
  }

  if (!decision.risk || !decision.readiness || !decision.recommendation) {
    findings.push('decision_shape_incomplete')
  }

  return {
    valid: findings.length === 0,
    findings: uniquePassiveList(findings),
    safeToAct: PASSIVE_SAFE_TO_ACT,
    allowed: PASSIVE_ALLOWED,
    requiresReview: PASSIVE_REQUIRES_REVIEW
  }
}

function compareHistoricalFingerprint(unifiedReport) {
  const observations = getPassiveMemoryObservations()
  const currentFingerprint = unifiedReport?.fingerprint || {}
  const historicalCmps = observations.map((entry) => entry?.cmp || 'unknown')
  const uniqueCmps = uniquePassiveList(historicalCmps)
  const currentCmp = currentFingerprint.cmp || 'unknown'
  const previouslySeen = uniqueCmps.includes(currentCmp)
  const changed = uniqueCmps.length > 0 && !previouslySeen && currentCmp !== 'unknown'

  return {
    available: observations.length > 0,
    currentCmp,
    historicalCmps: uniqueCmps,
    previouslySeen,
    changed,
    signalCount: currentFingerprint.signalCount || 0,
    confidence: currentFingerprint.confidence || 0
  }
}

function buildPassiveLifecycleMetadata(unifiedReport) {
  const timestamp = Date.now()
  const hostname = getCurrentHostname()
  const memory = readPassiveSiteMemory()
  const siteMemory = memory?.[hostname] || {}

  return {
    version: 'cookie-intelligence.passive.v1',
    timestamp,
    hostname,
    stage: 'passive_report_enriched',
    visitsObserved: siteMemory.visits || 0,
    memoryObservations: Array.isArray(siteMemory.observations)
      ? siteMemory.observations.length
      : 0,
    reportFields: Object.keys(unifiedReport || {}).length,
    passiveOnly: true
  }
}

function validatePassiveMemoryIntegrity() {
  const hostname = getCurrentHostname()
  const memory = readPassiveSiteMemory()
  const hostnames = Object.keys(memory)
  const siteMemory = memory?.[hostname]
  const issues = []

  if (hostnames.length > 50) {
    issues.push('memory_hostname_limit_exceeded')
  }

  hostnames.forEach((entryHostname) => {
    const observations = memory?.[entryHostname]?.observations
    if (Array.isArray(observations) && observations.length > 5) {
      issues.push('memory_observation_limit_exceeded')
    }
  })

  if (siteMemory && siteMemory.hostname && siteMemory.hostname !== hostname) {
    issues.push('memory_hostname_mismatch')
  }

  return {
    valid: issues.length === 0,
    hostname,
    hostnames: hostnames.length,
    currentObservations: Array.isArray(siteMemory?.observations)
      ? siteMemory.observations.length
      : 0,
    issues: uniquePassiveList(issues)
  }
}

function compactPassiveArray(values, limit = 8) {
  return uniquePassiveList(values).slice(0, limit)
}

function compactPassiveReport(unifiedReport) {
  return {
    hostname: getCurrentHostname(),
    timestamp: Date.now(),
    cmp: unifiedReport?.fingerprint?.cmp || 'unknown',
    risk: unifiedReport?.decision?.risk || 'unknown',
    readiness: unifiedReport?.decision?.readiness || 'unknown',
    recommendation: unifiedReport?.decision?.recommendation || 'observe_only',
    score: unifiedReport?.decision?.score || 0,
    confidence: unifiedReport?.confidenceAggregation?.aggregate || 0,
    pattern: unifiedReport?.patterns?.pattern || 'unknown',
    trust: unifiedReport?.trustScore?.level || 'low',
    stability: unifiedReport?.stabilityIndex?.level || 'low',
    safety: unifiedReport?.safety?.level || 'review',
    anomalies: compactPassiveArray(unifiedReport?.anomalies?.anomalies || []),
    blockers: compactPassiveArray(unifiedReport?.decision?.blockers || []),
    signals: compactPassiveArray(unifiedReport?.decision?.signals || []),
    safeToAct: false,
    allowed: false
  }
}

function buildAdvancedDebugDiagnostics(unifiedReport) {
  return {
    timestamp: Date.now(),
    hostname: getCurrentHostname(),
    lifecycle: unifiedReport?.lifecycle || null,
    integrity: unifiedReport?.integrity || null,
    consistencyValidation: unifiedReport?.consistencyValidation || null,
    behaviorProfile: unifiedReport?.behaviorProfile || null,
    riskEvolution: unifiedReport?.riskEvolution || null,
    fingerprintHistory: unifiedReport?.fingerprintHistory || null,
    compacted: unifiedReport?.compacted || null,
    passiveGuards: {
      safeToAct: false,
      allowed: false,
      requiresReview: true
    }
  }
}

function buildCrossVisitComparativeIntelligence(unifiedReport) {
  const observations = getPassiveMemoryObservations()
  const currentDecision = unifiedReport?.decision || {}
  const previousObservation = observations[observations.length - 1] || null
  const currentScore = Number(currentDecision.score) || 0
  const previousScore = Number(previousObservation?.score) || 0
  const scoreDelta = previousObservation ? currentScore - previousScore : 0
  const changedFields = []

  if (previousObservation?.risk && previousObservation.risk !== currentDecision.risk) {
    changedFields.push('risk')
  }

  if (
    previousObservation?.readiness &&
    previousObservation.readiness !== currentDecision.readiness
  ) {
    changedFields.push('readiness')
  }

  if (
    previousObservation?.recommendation &&
    previousObservation.recommendation !== currentDecision.recommendation
  ) {
    changedFields.push('recommendation')
  }

  return {
    available: Boolean(previousObservation),
    observations: observations.length,
    previousScore,
    currentScore,
    scoreDelta,
    changedFields: uniquePassiveList(changedFields),
    direction: scoreDelta >= 10 ? 'improved' : scoreDelta <= -10 ? 'declined' : 'similar'
  }
}

function calculatePassiveJaccardSimilarity(leftValues, rightValues) {
  const left = uniquePassiveList(leftValues)
  const right = uniquePassiveList(rightValues)
  const union = uniquePassiveList([...left, ...right])

  if (union.length === 0) return 0

  const intersection = left.filter((value) => right.includes(value))
  return Math.round((intersection.length / union.length) * 100)
}

function buildCMPSimilarityAnalysis(unifiedReport) {
  const observations = getPassiveMemoryObservations()
  const currentFingerprint = unifiedReport?.fingerprint || {}
  const currentSignals = uniquePassiveList(currentFingerprint.signals || [])
  const historicalSignals = uniquePassiveList(
    observations.flatMap((entry) => Array.isArray(entry?.signals) ? entry.signals : [])
  )
  const signalSimilarity = calculatePassiveJaccardSimilarity(
    currentSignals,
    historicalSignals
  )
  const historicalCmps = uniquePassiveList(
    observations.map((entry) => entry?.cmp || 'unknown')
  )
  const currentCmp = currentFingerprint.cmp || 'unknown'
  const cmpMatch = currentCmp !== 'unknown' && historicalCmps.includes(currentCmp)

  return {
    available: observations.length > 0,
    currentCmp,
    historicalCmps,
    cmpMatch,
    signalSimilarity,
    level: signalSimilarity >= 75 || cmpMatch
      ? 'high'
      : signalSimilarity >= 40
        ? 'medium'
        : 'low'
  }
}

function buildPassiveBehavioralClustering(unifiedReport) {
  const behavior = unifiedReport?.behaviorProfile || {}
  const patterns = unifiedReport?.patterns || {}
  const safety = unifiedReport?.safety || {}
  const reputation = unifiedReport?.reputation || {}
  const reasons = []

  let cluster = 'unknown'

  if (behavior.hasVendorFlow || behavior.hasLegitimateInterestFlow) {
    cluster = 'complex_review_required'
    reasons.push('complex_cmp_flow')
  } else if (patterns.pattern === 'stable_low_risk' && safety.level === 'low_passive_risk') {
    cluster = 'stable_observe_candidate'
    reasons.push('stable_low_risk_pattern')
  } else if (reputation.level === 'cautious' || safety.level === 'blocked') {
    cluster = 'cautious_observe_only'
    reasons.push('cautious_reputation_or_safety')
  } else if (patterns.pattern === 'unstable_behavior') {
    cluster = 'unstable_observe_only'
    reasons.push('unstable_pattern')
  } else {
    cluster = 'moderate_review'
    reasons.push('moderate_passive_profile')
  }

  return {
    cluster,
    confidence: patterns.confidence || 'low',
    reasons: uniquePassiveList(reasons),
    safeToAct: PASSIVE_SAFE_TO_ACT,
    allowed: PASSIVE_ALLOWED,
    requiresReview: PASSIVE_REQUIRES_REVIEW
  }
}

function buildHistoricalConfidenceDriftAnalysis(unifiedReport) {
  const observations = getPassiveMemoryObservations()
  const confidenceValues = observations.map((entry) => Number(entry?.confidence) || 0)
  const currentConfidence = Number(unifiedReport?.decision?.confidence) || 0
  const values = [...confidenceValues, currentConfidence].filter((value) => value > 0)
  const trend = calculatePassiveTrend(values)
  const first = values[0] || 0
  const last = values[values.length - 1] || 0

  return {
    available: values.length > 1,
    observations: values.length,
    first,
    last,
    drift: last - first,
    direction: trend.direction
  }
}

function buildPassiveUncertaintyScore(unifiedReport) {
  const decision = unifiedReport?.decision || {}
  const anomalies = unifiedReport?.anomalies || {}
  const similarity = unifiedReport?.similarity || {}
  const consistency = unifiedReport?.consistencyValidation || {}
  const reasons = []

  let score = 20

  if (decision.risk === 'unknown' || decision.readiness === 'unknown') {
    score += 20
    reasons.push('unknown_decision_state')
  }

  if ((decision.blockers || []).length > 0) {
    score += Math.min(20, decision.blockers.length * 5)
    reasons.push('decision_blockers_present')
  }

  if (anomalies.detected) {
    score += anomalies.severity === 'medium' ? 20 : 10
    reasons.push('historical_anomaly_present')
  }

  if (similarity.available && similarity.level === 'low') {
    score += 15
    reasons.push('low_cmp_similarity')
  }

  if (consistency.valid === false) {
    score += 20
    reasons.push('passive_consistency_findings')
  }

  score = Math.min(100, Math.max(0, Math.round(score)))

  return {
    score,
    level: score >= 70 ? 'high' : score >= 40 ? 'medium' : 'low',
    reasons: uniquePassiveList(reasons),
    safeToAct: PASSIVE_SAFE_TO_ACT,
    allowed: PASSIVE_ALLOWED,
    requiresReview: PASSIVE_REQUIRES_REVIEW
  }
}

function buildStabilityAnomalyEscalation(unifiedReport) {
  const anomalies = unifiedReport?.anomalies || {}
  const stabilityIndex = unifiedReport?.stabilityIndex || {}
  const uncertainty = unifiedReport?.uncertainty || {}
  const reasons = []

  let level = 'none'

  if (anomalies.detected) {
    reasons.push('historical_anomaly_detected')
  }

  if (stabilityIndex.level === 'low') {
    reasons.push('low_stability_index')
  }

  if (uncertainty.level === 'high') {
    reasons.push('high_uncertainty')
  }

  if (reasons.length >= 2) {
    level = 'review'
  } else if (reasons.length === 1) {
    level = 'watch'
  }

  return {
    escalated: level !== 'none',
    level,
    reasons: uniquePassiveList(reasons),
    safeToAct: PASSIVE_SAFE_TO_ACT,
    allowed: PASSIVE_ALLOWED,
    requiresReview: PASSIVE_REQUIRES_REVIEW
  }
}

function buildPassiveObservationWeighting(unifiedReport) {
  const observations = getPassiveMemoryObservations()
  const weightedScores = observations.map((entry, index) => {
    const weight = index + 1
    return {
      weight,
      score: Number(entry?.score) || 0,
      confidence: Number(entry?.confidence) || 0
    }
  })
  const totalWeight = weightedScores.reduce((sum, entry) => sum + entry.weight, 0)
  const weightedScore = totalWeight
    ? Math.round(
        weightedScores.reduce((sum, entry) => sum + (entry.score * entry.weight), 0) /
        totalWeight
      )
    : 0
  const weightedConfidence = totalWeight
    ? Math.round(
        weightedScores.reduce(
          (sum, entry) => sum + (entry.confidence * entry.weight),
          0
        ) / totalWeight
      )
    : 0

  return {
    available: weightedScores.length > 0,
    observations: weightedScores.length,
    weightedScore,
    weightedConfidence,
    currentScore: unifiedReport?.decision?.score || 0,
    currentConfidence: unifiedReport?.decision?.confidence || 0
  }
}

function buildFingerprintTrustNormalization(unifiedReport) {
  const fingerprint = unifiedReport?.fingerprint || {}
  const similarity = unifiedReport?.similarity || {}
  const fingerprintHistory = unifiedReport?.fingerprintHistory || {}
  const reasons = []

  let score = Number(fingerprint.confidence) || 0

  if (similarity.cmpMatch || fingerprintHistory.previouslySeen) {
    score += 15
    reasons.push('fingerprint_seen_historically')
  }

  if (similarity.level === 'high') {
    score += 10
    reasons.push('high_signal_similarity')
  } else if (similarity.level === 'low' && similarity.available) {
    score -= 10
    reasons.push('low_signal_similarity')
  }

  if (fingerprintHistory.changed) {
    score -= 20
    reasons.push('fingerprint_changed_from_history')
  }

  score = Math.min(100, Math.max(0, Math.round(score)))

  return {
    score,
    level: score >= 75 ? 'high' : score >= 45 ? 'medium' : 'low',
    reasons: uniquePassiveList(reasons)
  }
}

function buildHistoricalPatternPersistence(unifiedReport) {
  const observations = getPassiveMemoryObservations()
  const currentPattern = unifiedReport?.patterns?.pattern || 'unknown'
  const currentSignals = uniquePassiveList(unifiedReport?.patterns?.reasons || [])
  const historicalPatterns = observations.map((entry) => {
    if (entry?.hasVendors || entry?.hasLegitimateInterests) return 'complex_cmp_flow'
    if (entry?.risk === 'high') return 'high_risk_behavior'
    if (entry?.stability === 'low') return 'unstable_behavior'
    if (entry?.score >= 70) return 'stable_low_risk'
    return 'moderate_behavior'
  })
  const patternConsistency = calculateHistoricalConsistency([
    ...historicalPatterns,
    currentPattern
  ])

  return {
    available: observations.length > 0,
    currentPattern,
    historicalPatterns: uniquePassiveList(historicalPatterns),
    patternConsistency,
    persisted: patternConsistency === 'high',
    reasons: currentSignals
  }
}

function buildDiagnosticsAggregate(unifiedReport) {
  const checks = [
    unifiedReport?.consistencyValidation?.valid !== false,
    unifiedReport?.integrity?.valid !== false,
    unifiedReport?.uncertainty?.level !== 'high',
    unifiedReport?.escalation?.level !== 'review'
  ]
  const passed = checks.filter(Boolean).length
  const total = checks.length

  return {
    timestamp: Date.now(),
    hostname: getCurrentHostname(),
    passed,
    total,
    level: passed === total ? 'clean' : passed >= 2 ? 'watch' : 'review',
    comparative: unifiedReport?.comparative || null,
    similarity: unifiedReport?.similarity || null,
    clustering: unifiedReport?.clustering || null,
    confidenceDrift: unifiedReport?.confidenceDrift || null,
    uncertainty: unifiedReport?.uncertainty || null,
    escalation: unifiedReport?.escalation || null,
    weighting: unifiedReport?.weighting || null,
    normalizedTrust: unifiedReport?.normalizedTrust || null,
    persistence: unifiedReport?.persistence || null,
    safeToAct: false,
    allowed: false,
    requiresReview: true
  }
}

// Diagnostics and validation
function buildPassiveFixtureGenerator(unifiedReport) {
  return {
    generatedAt: Date.now(),
    hostname: getCurrentHostname(),
    current: {
      cmp: unifiedReport?.fingerprint?.cmp || 'unknown',
      risk: unifiedReport?.decision?.risk || 'unknown',
      readiness: unifiedReport?.decision?.readiness || 'unknown',
      recommendation: unifiedReport?.decision?.recommendation || 'observe_only',
      score: unifiedReport?.decision?.score || 0,
      confidence: unifiedReport?.decision?.confidence || 0,
      pattern: unifiedReport?.patterns?.pattern || 'unknown'
    },
    minimal: {
      cmp: 'unknown',
      risk: 'unknown',
      readiness: 'unknown',
      recommendation: 'observe_only',
      safeToAct: false,
      allowed: false,
      requiresReview: true
    },
    historical: {
      available: Boolean(unifiedReport?.historical?.available),
      observations: unifiedReport?.historical?.observations || 0,
      averageScore: unifiedReport?.historical?.averageScore || 0
    }
  }
}

function validatePassiveReportShape(unifiedReport) {
  const findings = []
  const decision = unifiedReport?.decision || {}

  if (!unifiedReport || typeof unifiedReport !== 'object') {
    findings.push('report_not_object')
  }

  if (!decision || typeof decision !== 'object') {
    findings.push('decision_missing')
  }

  if (typeof decision.score !== 'number') {
    findings.push('decision_score_not_number')
  }

  if (typeof decision.confidence !== 'number') {
    findings.push('decision_confidence_not_number')
  }

  if (!Array.isArray(decision.blockers)) {
    findings.push('decision_blockers_not_array')
  }

  if (!Array.isArray(decision.signals)) {
    findings.push('decision_signals_not_array')
  }

  if (unifiedReport?.historical && typeof unifiedReport.historical !== 'object') {
    findings.push('historical_not_object')
  }

  if (unifiedReport?.fingerprint && typeof unifiedReport.fingerprint !== 'object') {
    findings.push('fingerprint_not_object')
  }

  return {
    valid: findings.length === 0,
    findings: uniquePassiveList(findings),
    safeToAct: false,
    allowed: false,
    requiresReview: true
  }
}

function validatePassiveEnrichmentDependencies(unifiedReport) {
  const dependencyMap = {
    historical: ['decision'],
    patterns: ['historical'],
    trend: ['historical'],
    anomalies: ['historical', 'decision'],
    confidenceAggregation: ['decision', 'historical', 'patterns'],
    reputation: ['decision', 'historical', 'patterns', 'fingerprint'],
    safety: ['decision', 'reputation', 'anomalies'],
    behaviorProfile: ['fingerprint', 'historical', 'patterns'],
    trustScore: ['historical', 'reputation', 'confidenceAggregation', 'anomalies'],
    stabilityIndex: ['historical', 'trend', 'anomalies'],
    riskEvolution: ['decision'],
    consistencyValidation: ['decision', 'safety', 'normalized'],
    fingerprintHistory: ['fingerprint'],
    compacted: ['decision', 'confidenceAggregation', 'patterns', 'safety'],
    diagnostics: ['lifecycle', 'integrity', 'consistencyValidation'],
    diagnosticsAggregate: ['consistencyValidation', 'integrity', 'uncertainty', 'escalation']
  }
  const missing = []

  Object.entries(dependencyMap).forEach(([field, dependencies]) => {
    if (!Object.prototype.hasOwnProperty.call(unifiedReport || {}, field)) return

    dependencies.forEach((dependency) => {
      if (!Object.prototype.hasOwnProperty.call(unifiedReport || {}, dependency)) {
        missing.push(`${field}_missing_${dependency}`)
      }
    })
  })

  return {
    valid: missing.length === 0,
    checked: Object.keys(dependencyMap).length,
    missing: uniquePassiveList(missing),
    safeToAct: false,
    allowed: false,
    requiresReview: true
  }
}

function buildPassivePipelineIntegrityChecks(unifiedReport) {
  const expectedFields = EXPECTED_PASSIVE_REPORT_FIELDS
  const present = expectedFields.filter((field) =>
    Object.prototype.hasOwnProperty.call(unifiedReport || {}, field)
  )
  const missing = expectedFields.filter((field) => !present.includes(field))

  return {
    valid: missing.length === 0,
    expected: expectedFields.length,
    present: present.length,
    missing,
    safeToAct: false,
    allowed: false,
    requiresReview: true
  }
}

function buildPassiveFieldConsistencyAssertions(unifiedReport) {
  const assertions = []
  const decision = unifiedReport?.decision || {}
  const normalized = unifiedReport?.normalized || {}
  const compacted = unifiedReport?.compacted || {}

  if (normalized.decisionRisk !== decision.risk) {
    assertions.push('normalized_risk_mismatch')
  }

  if (normalized.decisionReadiness !== decision.readiness) {
    assertions.push('normalized_readiness_mismatch')
  }

  if (compacted.risk !== decision.risk) {
    assertions.push('compacted_risk_mismatch')
  }

  if (compacted.readiness !== decision.readiness) {
    assertions.push('compacted_readiness_mismatch')
  }

  if (unifiedReport?.safety?.safeToAct !== PASSIVE_SAFE_TO_ACT) {
    assertions.push('safety_safe_to_act_not_false')
  }

  if (unifiedReport?.trustScore?.requiresReview !== PASSIVE_REQUIRES_REVIEW) {
    assertions.push('trust_review_not_required')
  }

  return {
    valid: assertions.length === 0,
    assertions: uniquePassiveList(assertions),
    safeToAct: false,
    allowed: false,
    requiresReview: true
  }
}

function buildMissingFieldDiagnostics(unifiedReport) {
  const requiredFields = [
    'banner',
    'preference',
    'cmp',
    'cmpStrategy',
    'reliability',
    'observation',
    'recommendation',
    'decision',
    'historical',
    'patterns',
    'fingerprint',
    'trend',
    'anomalies',
    'confidenceAggregation',
    'reputation',
    'safety',
    'normalized'
  ]
  const missing = requiredFields.filter((field) =>
    !Object.prototype.hasOwnProperty.call(unifiedReport || {}, field)
  )

  return {
    valid: missing.length === 0,
    required: requiredFields.length,
    missing: uniquePassiveList(missing),
    safeToAct: false,
    allowed: false,
    requiresReview: true
  }
}

function buildPassiveReportSchemaSnapshot(unifiedReport) {
  const fieldTypes = {}

  Object.keys(unifiedReport || {}).forEach((field) => {
    const value = unifiedReport[field]
    fieldTypes[field] = Array.isArray(value) ? 'array' : typeof value
  })

  return {
    generatedAt: Date.now(),
    hostname: getCurrentHostname(),
    fieldCount: Object.keys(fieldTypes).length,
    fieldTypes,
    passiveOnly: true
  }
}

function buildCompactValidationSummary(unifiedReport) {
  const validationObjects = [
    unifiedReport?.validation,
    unifiedReport?.dependencies,
    unifiedReport?.integrityChecks,
    unifiedReport?.assertions,
    unifiedReport?.missingFields
  ].filter(Boolean)
  const failed = validationObjects.filter((entry) => entry.valid === false)

  return {
    generatedAt: Date.now(),
    checks: validationObjects.length,
    failed: failed.length,
    level: failed.length === 0 ? 'pass' : failed.length <= 2 ? 'watch' : 'review',
    safeToAct: false,
    allowed: false,
    requiresReview: true
  }
}

function buildPassiveEnrichmentTimingMetadata(unifiedReport) {
  const now = Date.now()
  const lifecycleTimestamp = unifiedReport?.lifecycle?.timestamp || now

  return {
    generatedAt: now,
    lifecycleTimestamp,
    ageMs: Math.max(0, now - lifecycleTimestamp),
    reportFieldCount: Object.keys(unifiedReport || {}).length,
    passiveOnly: true
  }
}

function buildDebugValidationAggregation(unifiedReport) {
  return {
    generatedAt: Date.now(),
    hostname: getCurrentHostname(),
    validation: unifiedReport?.validation || null,
    dependencies: unifiedReport?.dependencies || null,
    integrityChecks: unifiedReport?.integrityChecks || null,
    assertions: unifiedReport?.assertions || null,
    missingFields: unifiedReport?.missingFields || null,
    schemaSnapshot: unifiedReport?.schemaSnapshot || null,
    validationSummary: unifiedReport?.validationSummary || null,
    timing: unifiedReport?.timing || null,
    safeToAct: false,
    allowed: false,
    requiresReview: true
  }
}

function buildPassiveStageRegistrySnapshot(unifiedReport, registry) {
  const stages = Array.isArray(registry) ? registry : []

  return {
    generatedAt: Date.now(),
    hostname: getCurrentHostname(),
    count: stages.length,
    keys: stages.map((stage) => stage.key),
    stages: stages.map((stage) => ({
      key: stage.key,
      index: stage.index,
      group: stage.group || getPassiveStageGroup(stage.key),
      category: stage.category || getPassiveStageCategory(stage.key),
      dependencies: uniquePassiveList(
        stage.dependencies || getPassiveStageDependencies(stage.key)
      ),
      builder: stage.builder?.name || 'anonymous_builder'
    })),
    passiveOnly: true
  }
}

function buildPassiveStageExecutionMetadata(unifiedReport, executionRecords) {
  const records = Array.isArray(executionRecords) ? executionRecords : []
  const completed = records.filter((record) => record.success === true)
  const totalDurationMs = records.reduce(
    (sum, record) => sum + (Number(record.durationMs) || 0),
    0
  )

  return {
    generatedAt: Date.now(),
    hostname: getCurrentHostname(),
    totalStages: records.length,
    completedStages: completed.length,
    totalDurationMs,
    records: records.slice(-60).map((record) => ({
      key: record.key,
      index: record.index,
      durationMs: record.durationMs,
      success: record.success === true
    })),
    passiveOnly: true
  }
}

function buildPassivePipelineObservability(unifiedReport) {
  const execution = unifiedReport?.stageExecution || {}
  const registry = unifiedReport?.stageRegistry || {}
  const validationSummary = unifiedReport?.validationSummary || {}

  return {
    generatedAt: Date.now(),
    hostname: getCurrentHostname(),
    stageCount: registry.count || 0,
    completedStages: execution.completedStages || 0,
    totalDurationMs: execution.totalDurationMs || 0,
    validationLevel: validationSummary.level || 'unknown',
    diagnosticsLevel: unifiedReport?.diagnosticsAggregate?.level || 'unknown',
    passiveOnly: true,
    safeToAct: false,
    allowed: false,
    requiresReview: true
  }
}

function buildPassiveExecutionProfiling(unifiedReport) {
  const records = unifiedReport?.stageExecution?.records || []
  const durations = records.map((record) => Number(record.durationMs) || 0)
  const total = durations.reduce((sum, value) => sum + value, 0)
  const max = durations.length ? Math.max(...durations) : 0
  const slowest = records.find((record) => (Number(record.durationMs) || 0) === max)

  return {
    generatedAt: Date.now(),
    stages: records.length,
    totalDurationMs: total,
    averageDurationMs: durations.length ? Math.round(total / durations.length) : 0,
    maxDurationMs: max,
    slowestStage: slowest?.key || 'unknown',
    passiveOnly: true
  }
}

function buildPassiveTimingProfile(unifiedReport) {
  const records = unifiedReport?.stageExecution?.records || []
  const timingBuckets = {
    instant: 0,
    light: 0,
    moderate: 0
  }

  records.forEach((record) => {
    const duration = Number(record.durationMs) || 0
    if (duration <= 1) {
      timingBuckets.instant += 1
    } else if (duration <= 5) {
      timingBuckets.light += 1
    } else {
      timingBuckets.moderate += 1
    }
  })

  return {
    generatedAt: Date.now(),
    buckets: timingBuckets,
    totalStages: records.length,
    totalDurationMs: unifiedReport?.stageExecution?.totalDurationMs || 0,
    passiveOnly: true
  }
}

function buildLazyPassiveDiagnostics(unifiedReport) {
  const shouldExpand = Boolean(
    unifiedReport?.validationSummary?.level === 'review' ||
    unifiedReport?.diagnosticsAggregate?.level === 'review' ||
    unifiedReport?.memoryPressure?.level === 'high'
  )

  return {
    generatedAt: Date.now(),
    expanded: shouldExpand,
    summary: {
      validation: unifiedReport?.validationSummary?.level || 'unknown',
      diagnostics: unifiedReport?.diagnosticsAggregate?.level || 'unknown',
      uncertainty: unifiedReport?.uncertainty?.level || 'unknown'
    },
    details: shouldExpand
      ? {
          missing: uniquePassiveList(unifiedReport?.missingFields?.missing || []),
          assertions: uniquePassiveList(unifiedReport?.assertions?.assertions || []),
          integrityIssues: uniquePassiveList(unifiedReport?.integrity?.issues || [])
        }
      : null,
    passiveOnly: true
  }
}

function buildBoundedCompactDiagnostics(unifiedReport) {
  return {
    generatedAt: Date.now(),
    hostname: getCurrentHostname(),
    validationLevel: unifiedReport?.validationSummary?.level || 'unknown',
    diagnosticsLevel: unifiedReport?.diagnosticsAggregate?.level || 'unknown',
    stageHealth: unifiedReport?.stageHealth?.level || 'unknown',
    memoryPressure: unifiedReport?.memoryPressure?.level || 'unknown',
    slowestStage: unifiedReport?.profiling?.slowestStage || 'unknown',
    findings: compactPassiveArray([
      ...(unifiedReport?.validation?.findings || []),
      ...(unifiedReport?.dependencies?.missing || []),
      ...(unifiedReport?.assertions?.assertions || []),
      ...(unifiedReport?.integrity?.issues || [])
    ], 10),
    passiveOnly: true,
    safeToAct: false,
    allowed: false,
    requiresReview: true
  }
}

function buildPassiveMemoryPressureIndicators() {
  const memory = readPassiveSiteMemory()
  const hostnames = Object.keys(memory)
  const currentHostname = getCurrentHostname()
  const currentObservations = Array.isArray(memory?.[currentHostname]?.observations)
    ? memory[currentHostname].observations.length
    : 0
  const totalObservations = hostnames.reduce((sum, hostname) => {
    const observations = memory?.[hostname]?.observations
    return sum + (Array.isArray(observations) ? observations.length : 0)
  }, 0)
  const hostRatio = hostnames.length / 50
  const observationRatio = currentObservations / 5
  const pressure = Math.max(hostRatio, observationRatio)

  return {
    generatedAt: Date.now(),
    hostname: currentHostname,
    hostnames: hostnames.length,
    currentObservations,
    totalObservations,
    hostRatio: Math.min(1, hostRatio),
    observationRatio: Math.min(1, observationRatio),
    level: pressure >= 0.9 ? 'high' : pressure >= 0.6 ? 'medium' : 'low',
    passiveOnly: true
  }
}

function buildPassiveStageHealthTracking(unifiedReport) {
  const records = unifiedReport?.stageExecution?.records || []
  const missing = unifiedReport?.integrityChecks?.missing || []
  const failedRecords = records.filter((record) => record.success !== true)
  const slowRecords = records.filter((record) => (Number(record.durationMs) || 0) > 10)
  const issues = [
    ...failedRecords.map((record) => `${record.key}_stage_failed`),
    ...slowRecords.map((record) => `${record.key}_stage_slow`),
    ...missing.map((field) => `${field}_missing`)
  ]

  return {
    generatedAt: Date.now(),
    checked: records.length,
    failed: failedRecords.length,
    slow: slowRecords.length,
    missing: missing.length,
    level: issues.length === 0 ? 'healthy' : issues.length <= 3 ? 'watch' : 'review',
    issues: uniquePassiveList(issues),
    safeToAct: false,
    allowed: false,
    requiresReview: true
  }
}

function buildPassivePipelineExecutionSummary(unifiedReport) {
  const execution = unifiedReport?.stageExecution || {}
  const profiling = unifiedReport?.profiling || {}
  const health = unifiedReport?.stageHealth || {}
  const memoryPressure = unifiedReport?.memoryPressure || {}

  return {
    generatedAt: Date.now(),
    hostname: getCurrentHostname(),
    stages: execution.totalStages || 0,
    completed: execution.completedStages || 0,
    durationMs: execution.totalDurationMs || 0,
    averageDurationMs: profiling.averageDurationMs || 0,
    slowestStage: profiling.slowestStage || 'unknown',
    health: health.level || 'unknown',
    memoryPressure: memoryPressure.level || 'unknown',
    safeToAct: false,
    allowed: false,
    requiresReview: true
  }
}

function getPassiveStageGroup(key) {
  const groupMap = {
    decision: 'core',
    historical: 'history',
    patterns: 'history',
    fingerprint: 'cmp',
    trend: 'history',
    anomalies: 'risk',
    confidenceAggregation: 'risk',
    reputation: 'risk',
    safety: 'risk',
    normalized: 'reporting',
    debugAnalytics: 'debug',
    behaviorProfile: 'cmp',
    trustScore: 'risk',
    stabilityIndex: 'history',
    riskEvolution: 'history',
    consistencyValidation: 'validation',
    fingerprintHistory: 'cmp',
    lifecycle: 'infrastructure',
    integrity: 'validation',
    compacted: 'reporting',
    diagnostics: 'debug',
    comparative: 'history',
    similarity: 'cmp',
    clustering: 'analysis',
    confidenceDrift: 'history',
    uncertainty: 'risk',
    escalation: 'risk',
    weighting: 'history',
    normalizedTrust: 'cmp',
    persistence: 'history',
    diagnosticsAggregate: 'debug',
    fixtures: 'validation',
    validation: 'validation',
    dependencies: 'validation',
    integrityChecks: 'validation',
    assertions: 'validation',
    missingFields: 'validation',
    schemaSnapshot: 'validation',
    validationSummary: 'validation',
    timing: 'infrastructure',
    validationAggregate: 'validation',
    stageRegistry: 'infrastructure',
    stageExecution: 'infrastructure',
    observability: 'infrastructure',
    profiling: 'infrastructure',
    timingProfile: 'infrastructure',
    lazyDiagnostics: 'debug',
    compactDiagnostics: 'debug',
    memoryPressure: 'infrastructure',
    stageHealth: 'infrastructure',
    executionSummary: 'infrastructure',
    stageGroups: 'infrastructure',
    stageCategories: 'infrastructure',
    stageOrderSnapshot: 'infrastructure',
    stageDependencySnapshot: 'infrastructure',
    finalExecution: 'infrastructure',
    finalObservability: 'infrastructure',
    finalProfiling: 'infrastructure',
    finalStageHealth: 'infrastructure',
    finalExecutionSummary: 'infrastructure',
    pipelineHealth: 'infrastructure'
  }

  return groupMap[key] || 'other'
}

function getPassiveStageCategory(key) {
  const categoryMap = {
    decision: 'scoring',
    historical: 'memory_read',
    patterns: 'classification',
    fingerprint: 'normalization',
    trend: 'trend',
    anomalies: 'risk_detection',
    confidenceAggregation: 'confidence',
    reputation: 'scoring',
    safety: 'guardrail',
    normalized: 'normalization',
    debugAnalytics: 'debug',
    behaviorProfile: 'classification',
    trustScore: 'scoring',
    stabilityIndex: 'scoring',
    riskEvolution: 'trend',
    consistencyValidation: 'validation',
    fingerprintHistory: 'comparison',
    lifecycle: 'metadata',
    integrity: 'validation',
    compacted: 'compaction',
    diagnostics: 'debug',
    comparative: 'comparison',
    similarity: 'comparison',
    clustering: 'classification',
    confidenceDrift: 'trend',
    uncertainty: 'scoring',
    escalation: 'guardrail',
    weighting: 'scoring',
    normalizedTrust: 'normalization',
    persistence: 'persistence',
    diagnosticsAggregate: 'debug',
    fixtures: 'fixture',
    validation: 'validation',
    dependencies: 'validation',
    integrityChecks: 'validation',
    assertions: 'validation',
    missingFields: 'validation',
    schemaSnapshot: 'schema',
    validationSummary: 'summary',
    timing: 'timing',
    validationAggregate: 'debug',
    stageRegistry: 'registry',
    stageExecution: 'execution',
    observability: 'observability',
    profiling: 'profiling',
    timingProfile: 'timing',
    lazyDiagnostics: 'debug',
    compactDiagnostics: 'compaction',
    memoryPressure: 'memory',
    stageHealth: 'health',
    executionSummary: 'summary',
    stageGroups: 'registry',
    stageCategories: 'registry',
    stageOrderSnapshot: 'registry',
    stageDependencySnapshot: 'registry',
    finalExecution: 'execution',
    finalObservability: 'observability',
    finalProfiling: 'profiling',
    finalStageHealth: 'health',
    finalExecutionSummary: 'summary',
    pipelineHealth: 'health'
  }

  return categoryMap[key] || 'metadata'
}

function getPassiveStageDependencies(key) {
  const dependencyMap = {
    historical: ['decision'],
    patterns: ['historical'],
    fingerprint: ['cmp', 'cmpStrategy'],
    trend: ['historical'],
    anomalies: ['historical', 'decision'],
    confidenceAggregation: ['decision', 'historical', 'patterns'],
    reputation: ['decision', 'historical', 'patterns', 'fingerprint'],
    safety: ['decision', 'reputation', 'anomalies'],
    normalized: ['decision', 'patterns', 'confidenceAggregation'],
    debugAnalytics: ['decision'],
    behaviorProfile: ['fingerprint', 'historical', 'patterns'],
    trustScore: ['historical', 'reputation', 'confidenceAggregation', 'anomalies'],
    stabilityIndex: ['historical', 'trend', 'anomalies'],
    riskEvolution: ['decision'],
    consistencyValidation: ['decision', 'safety', 'normalized'],
    fingerprintHistory: ['fingerprint'],
    compacted: ['decision', 'confidenceAggregation', 'patterns', 'safety'],
    diagnostics: ['lifecycle', 'integrity', 'consistencyValidation'],
    comparative: ['decision'],
    similarity: ['fingerprint'],
    clustering: ['behaviorProfile', 'patterns', 'safety', 'reputation'],
    confidenceDrift: ['decision'],
    uncertainty: ['decision', 'anomalies', 'similarity', 'consistencyValidation'],
    escalation: ['anomalies', 'stabilityIndex', 'uncertainty'],
    weighting: ['decision'],
    normalizedTrust: ['fingerprint', 'similarity', 'fingerprintHistory'],
    persistence: ['patterns'],
    diagnosticsAggregate: ['consistencyValidation', 'integrity', 'uncertainty', 'escalation'],
    validation: ['decision'],
    dependencies: ['decision'],
    integrityChecks: ['decision'],
    assertions: ['decision', 'normalized', 'compacted', 'safety', 'trustScore'],
    missingFields: ['decision'],
    schemaSnapshot: ['decision'],
    validationSummary: ['validation', 'dependencies', 'integrityChecks', 'assertions', 'missingFields'],
    timing: ['lifecycle'],
    validationAggregate: ['validation', 'dependencies', 'integrityChecks', 'assertions'],
    stageExecution: ['stageRegistry'],
    observability: ['stageExecution', 'stageRegistry', 'validationSummary'],
    profiling: ['stageExecution'],
    timingProfile: ['stageExecution'],
    lazyDiagnostics: ['validationSummary', 'diagnosticsAggregate', 'memoryPressure'],
    compactDiagnostics: ['validation', 'dependencies', 'assertions', 'integrity'],
    stageHealth: ['stageExecution', 'integrityChecks'],
    executionSummary: ['stageExecution', 'profiling', 'stageHealth', 'memoryPressure'],
    stageGroups: ['stageRegistry'],
    stageCategories: ['stageRegistry'],
    stageOrderSnapshot: ['stageRegistry'],
    stageDependencySnapshot: ['stageRegistry'],
    finalExecution: ['stageExecution'],
    finalObservability: ['finalExecution', 'stageRegistry', 'validationSummary'],
    finalProfiling: ['finalExecution'],
    finalStageHealth: ['finalExecution', 'integrityChecks'],
    finalExecutionSummary: ['finalExecution', 'finalProfiling', 'finalStageHealth', 'memoryPressure'],
    pipelineHealth: ['finalStageHealth', 'finalExecutionSummary', 'validationSummary']
  }

  return dependencyMap[key] || []
}

function buildPassiveStageGroups(unifiedReport) {
  const stages = unifiedReport?.stageRegistry?.stages || []
  const groups = stages.reduce((summary, stage) => {
    const group = stage.group || getPassiveStageGroup(stage.key)
    if (!summary[group]) {
      summary[group] = {
        count: 0,
        keys: []
      }
    }

    summary[group].count += 1
    summary[group].keys.push(stage.key)
    return summary
  }, {})

  return {
    generatedAt: Date.now(),
    hostname: getCurrentHostname(),
    groupCount: Object.keys(groups).length,
    groups,
    passiveOnly: true
  }
}

function buildPassiveStageCategories(unifiedReport) {
  const stages = unifiedReport?.stageRegistry?.stages || []
  const categories = stages.reduce((summary, stage) => {
    const category = stage.category || getPassiveStageCategory(stage.key)
    if (!summary[category]) {
      summary[category] = []
    }

    summary[category].push(stage.key)
    return summary
  }, {})

  return {
    generatedAt: Date.now(),
    hostname: getCurrentHostname(),
    categoryCount: Object.keys(categories).length,
    categories,
    passiveOnly: true
  }
}

function buildPassiveStageOrderSnapshot(unifiedReport) {
  const stages = unifiedReport?.stageRegistry?.stages || []
  const keys = stages
    .slice()
    .sort((left, right) => (left.index || 0) - (right.index || 0))
    .map((stage) => stage.key)

  return {
    generatedAt: Date.now(),
    hostname: getCurrentHostname(),
    count: keys.length,
    first: keys[0] || 'unknown',
    last: keys[keys.length - 1] || 'unknown',
    keys,
    passiveOnly: true
  }
}

function buildPassiveStageDependencySnapshot(unifiedReport) {
  const stages = unifiedReport?.stageRegistry?.stages || []
  const dependencies = stages.reduce((summary, stage) => {
    summary[stage.key] = uniquePassiveList(
      stage.dependencies || getPassiveStageDependencies(stage.key)
    )
    return summary
  }, {})

  return {
    generatedAt: Date.now(),
    hostname: getCurrentHostname(),
    count: Object.keys(dependencies).length,
    dependencies,
    passiveOnly: true
  }
}

function buildFinalPassiveStageExecutionMetadata(unifiedReport, executionRecords) {
  const metadata = buildPassiveStageExecutionMetadata(unifiedReport, executionRecords)

  return {
    ...metadata,
    refreshed: true,
    includesLateInfrastructure: true
  }
}

function buildFinalPassivePipelineObservability(unifiedReport) {
  const execution = unifiedReport?.finalExecution || unifiedReport?.stageExecution || {}
  const registry = unifiedReport?.stageRegistry || {}
  const validationSummary = unifiedReport?.validationSummary || {}

  return {
    generatedAt: Date.now(),
    hostname: getCurrentHostname(),
    stageCount: registry.count || 0,
    completedStages: execution.completedStages || 0,
    totalDurationMs: execution.totalDurationMs || 0,
    validationLevel: validationSummary.level || 'unknown',
    diagnosticsLevel: unifiedReport?.diagnosticsAggregate?.level || 'unknown',
    refreshed: true,
    passiveOnly: true,
    safeToAct: false,
    allowed: false,
    requiresReview: true
  }
}

function buildFinalPassiveExecutionProfiling(unifiedReport) {
  const nextReport = {
    ...unifiedReport,
    stageExecution: unifiedReport?.finalExecution || unifiedReport?.stageExecution
  }
  const profiling = buildPassiveExecutionProfiling(nextReport)

  return {
    ...profiling,
    refreshed: true
  }
}

function buildFinalPassiveStageHealthTracking(unifiedReport) {
  const nextReport = {
    ...unifiedReport,
    stageExecution: unifiedReport?.finalExecution || unifiedReport?.stageExecution
  }
  const health = buildPassiveStageHealthTracking(nextReport)

  return {
    ...health,
    refreshed: true
  }
}

function buildFinalPassivePipelineExecutionSummary(unifiedReport) {
  const nextReport = {
    ...unifiedReport,
    stageExecution: unifiedReport?.finalExecution || unifiedReport?.stageExecution,
    profiling: unifiedReport?.finalProfiling || unifiedReport?.profiling,
    stageHealth: unifiedReport?.finalStageHealth || unifiedReport?.stageHealth
  }
  const summary = buildPassivePipelineExecutionSummary(nextReport)

  return {
    ...summary,
    refreshed: true
  }
}

function buildPassivePipelineHealthSummary(unifiedReport) {
  const reasons = []
  const validationLevel = unifiedReport?.validationSummary?.level || 'unknown'
  const diagnosticsLevel = unifiedReport?.diagnosticsAggregate?.level || 'unknown'
  const stageHealth = unifiedReport?.finalStageHealth?.level ||
    unifiedReport?.stageHealth?.level ||
    'unknown'
  const memoryPressure = unifiedReport?.memoryPressure?.level || 'unknown'

  if (validationLevel !== 'pass') reasons.push(`validation_${validationLevel}`)
  if (diagnosticsLevel === 'review') reasons.push('diagnostics_review')
  if (stageHealth !== 'healthy') reasons.push(`stage_health_${stageHealth}`)
  if (memoryPressure === 'high') reasons.push('memory_pressure_high')

  let level = 'healthy'
  if (reasons.some((reason) => reason.includes('review') || reason.includes('high'))) {
    level = 'review'
  } else if (reasons.length > 0) {
    level = 'watch'
  }

  return {
    generatedAt: Date.now(),
    hostname: getCurrentHostname(),
    level,
    validationLevel,
    diagnosticsLevel,
    stageHealth,
    memoryPressure,
    reasons: uniquePassiveList(reasons),
    safeToAct: false,
    allowed: false,
    requiresReview: true
  }
}

function classifyCookieBannerFromAnalysis(analysis) {
  if (!analysis || typeof analysis !== 'object') return 'unknown'

  if (analysis.hasKnownCmp && textHasAny(analysis.textSample || '', ['onetrust', 'didomi'])) {
    return 'enterprise_cmp'
  }

  if (analysis.hasToggles && analysis.hasPreferences) {
    return 'preference_center'
  }

  const containerText = analysis.textSample || ''

  if (textHasAny(containerText, ['rechazar', 'reject', 'decline'])) {
    return 'direct_reject'
  }

  if (textHasAny(containerText, ['customize', 'personalizar', 'opciones'])) {
    return 'preference_only'
  }

  return 'generic_banner'
}

// Cookie Intelligence Layer - Observation Mode
function getCookieIntelligenceReport(container) {
  const fallbackCmp = {
    cmp: 'unknown',
    confidence: 0,
    signals: []
  }

  if (!container) {
    return {
      analysis: null,
      classification: 'unknown',
      confidence: 0,
      passiveRecommendation: 'observe_only',
      cmp: fallbackCmp,
      safeToAct: false,
      reason: 'no_container'
    }
  }

  const analysis = analyzeCookieContainer(container)
  const cmp = detectCMPFingerprint(container) || fallbackCmp
  const classification = classifyCookieBannerFromAnalysis(analysis)
  const confidence = calculateIntelligenceConfidence(analysis, classification)
  const passiveRecommendation = getPassiveRecommendation(analysis, classification, confidence)
  const safeToAct = false
  const reason = 'observation_mode_only'

  return {
    analysis,
    classification,
    confidence,
    passiveRecommendation,
    cmp,
    safeToAct,
    reason
  }
}

function calculateIntelligenceConfidence(analysis, classification) {
  if (!analysis || analysis.error) return 0

  let confidence = 0

  if (analysis.hasKeywords) confidence += 25
  if (analysis.hasKnownCmp) confidence += 30
  if (analysis.hasPreferences) confidence += 20
  if (analysis.hasToggles) confidence += 15

  if (analysis.textLength > 50 && analysis.textLength < 5000) {
    confidence += 10
  }

  if (analysis.complexity > 1 && analysis.complexity < 8) {
    confidence += 10
  }

  const classificationConfidence = {
    'enterprise_cmp': 90,
    'preference_center': 80,
    'direct_reject': 70,
    'preference_only': 60,
    'generic_banner': 40,
    'unknown': 0
  }

  const baseConfidence = classificationConfidence[classification] || 0
  return Math.min(100, Math.max(baseConfidence, confidence))
}

function getPassiveRecommendation(analysis, classification, confidence) {
  if (confidence < 30) return 'observe_only'
  if (confidence < 50) return 'observe_only'
  if (confidence < 70) return 'observe_only'

  switch (classification) {
    case 'enterprise_cmp':
      return 'candidate_enterprise_cmp'
    case 'preference_center':
      return 'candidate_preference_center'
    case 'direct_reject':
      return 'candidate_direct_reject'
    case 'preference_only':
      return 'candidate_preference_only'
    case 'generic_banner':
      return 'candidate_generic_banner'
    default:
      return 'observe_only'
  }
}

// Cookie Intelligence Layer - Decision Validation
function validateCookieDecision(report, actionCandidate) {
  if (!report || !actionCandidate) {
    return {
      safeToAct: false,
      allowed: false,
      confidence: 0,
      requiredConfidence: 0,
      reasons: ['invalid_input'],
      blockers: ['missing_report_or_candidate']
    }
  }

  const confidence = report.confidence || 0
  const classification = report.classification || 'unknown'
  const requiredConfidence = getMinimumConfidenceForClassification(classification)
  const unsafeSignals = detectUnsafeActionSignals(actionCandidate.text || '', actionCandidate.contextText || '')

  let reasons = []
  let blockers = []

  if (confidence < requiredConfidence) {
    reasons.push('insufficient_confidence')
    blockers.push('confidence_below_threshold')
  }

  if (report.safeToAct !== false) {
    reasons.push('unsafe_report_state')
    blockers.push('report_not_safe')
  }

  if (report.reason !== 'observation_mode_only') {
    reasons.push('invalid_report_reason')
    blockers.push('report_not_observation_mode')
  }

  if (classification === 'unknown') {
    reasons.push('unknown_classification')
    blockers.push('classification_unknown')
  }

  if (unsafeSignals.hasUnsafeAccept) {
    reasons.push('unsafe_accept_detected')
    blockers.push('accept_action_blocked')
  }

  if (unsafeSignals.hasSensitiveAction) {
    reasons.push('sensitive_action_detected')
    blockers.push('sensitive_action_blocked')
  }

  if (unsafeSignals.hasNonCookieContext) {
    reasons.push('non_cookie_context_detected')
    blockers.push('non_cookie_context_blocked')
  }

  const safeToAct = false
  const allowed = false

  return {
    safeToAct,
    allowed,
    confidence,
    requiredConfidence,
    reasons,
    blockers
  }
}

function getMinimumConfidenceForClassification(classification) {
  const confidenceRequirements = {
    'enterprise_cmp': 85,
    'preference_center': 75,
    'direct_reject': 70,
    'preference_only': 70,
    'generic_banner': 90,
    'unknown': 100
  }

  return confidenceRequirements[classification] || 0
}

function detectUnsafeActionSignals(actionText, contextText) {
  const normalizedAction = (actionText || '').toLowerCase()
  const normalizedContext = (contextText || '').toLowerCase()

  const unsafeAcceptPatterns = [
    'accept all', 'aceptar todo', 'i agree', 'estoy de acuerdo',
    'accept recommended', 'aceptar recomendado', 'allow all'
  ]

  const sensitiveActionPatterns = [
    'login', 'signin', 'register', 'create account', 'sign up',
    'submit', 'send', 'continue', 'next', 'proceed'
  ]

  const nonCookieContextPatterns = [
    'payment', 'billing', 'credit card', 'checkout', 'purchase',
    'buy now', 'order', 'invoice', 'cart', 'shopping',
    'password', 'email', 'phone', 'personal information',
    'newsletter', 'subscribe', 'follow', 'share'
  ]

  const hasUnsafeAccept = unsafeAcceptPatterns.some(pattern =>
    normalizedAction.includes(pattern) || normalizedContext.includes(pattern)
  )

  const hasSensitiveAction = sensitiveActionPatterns.some(pattern =>
    normalizedAction.includes(pattern) || normalizedContext.includes(pattern)
  )

  const hasNonCookieContext = nonCookieContextPatterns.some(pattern =>
    normalizedAction.includes(pattern) || normalizedContext.includes(pattern)
  )

  return {
    hasUnsafeAccept,
    hasSensitiveAction,
    hasNonCookieContext
  }
}

// Cookie Intelligence Layer - Controlled Decision Engine
function buildCookieDecisionPreview(container, actionCandidate) {
  if (!container || !actionCandidate) {
    return {
      report: null,
      validation: null,
      decisionType: 'blocked',
      candidateAction: null,
      safeToAct: false,
      allowed: false,
      reason: 'invalid_input'
    }
  }

  const report = getCookieIntelligenceReport(container)
  const validation = validateCookieDecision(report, actionCandidate)

  let decisionType = 'blocked'
  let reason = 'default_blocked'

  if (validation.blockers && validation.blockers.length === 0) {
    if (validation.confidence >= validation.requiredConfidence) {
      if (report.classification === 'direct_reject' ||
          report.passiveRecommendation === 'candidate_direct_reject') {
        decisionType = 'candidate_direct_reject'
        reason = 'candidate_reject_identified'
      } else if (report.classification === 'preference_center' ||
                 report.passiveRecommendation === 'candidate_preference_center') {
        decisionType = 'candidate_preferences'
        reason = 'candidate_preferences_identified'
      } else if (report.classification === 'preference_only' ||
                 report.passiveRecommendation === 'candidate_preference_only') {
        decisionType = 'candidate_preferences'
        reason = 'candidate_preferences_identified'
      } else if (report.classification === 'enterprise_cmp' ||
                 report.classification === 'generic_banner') {
        decisionType = 'candidate_observe_only'
        reason = 'classification_requires_more_analysis'
      } else {
        decisionType = 'candidate_observe_only'
        reason = 'observe_only_recommended'
      }
    } else {
      decisionType = 'candidate_observe_only'
      reason = 'insufficient_confidence'
    }
  } else {
    reason = validation.blockers && validation.blockers.length > 0
      ? validation.blockers[0]
      : 'validation_failed'
  }

  return {
    report,
    validation,
    decisionType,
    candidateAction: actionCandidate,
    safeToAct: false,
    allowed: false,
    reason
  }
}

// Cookie Intelligence Layer - Safe Candidate Extraction
function extractSafeActionCandidates(container) {
  if (!container) return []

  const candidates = []
  const allControls = getActionControls(container)

  for (const control of allControls) {
    if (!isVisible(control)) continue
    if (control.disabled) continue

    const tagName = control.tagName ? control.tagName.toLowerCase() : ''
    const role = control.getAttribute('role') || ''
    const type = control.getAttribute('type') || ''
    const text = getText(control)
    const contextText = getContextTextForCandidate(control)

    if (!text || text.length < 1) continue

    candidates.push({
      text,
      contextText,
      tagName,
      role,
      type,
      visible: isVisible(control),
      disabled: Boolean(control.disabled)
    })
  }

  return candidates
    .slice(0, MAX_COOKIE_CANDIDATES_PER_SCAN)
}

function getContextTextForCandidate(element) {
  try {
    const context = getNearbyActionContext(element)
    const contextText = context.text || ''
    return String(contextText).slice(0, 300)
  } catch (error) {
    return ''
  }
}

// Cookie Intelligence Layer - Passive Pipeline
function buildCookieIntelligencePipeline(container) {
  if (!container) {
    return {
      report: null,
      candidates: [],
      previews: [],
      bestPreview: null,
      preferenceReport: null,
      safeToAct: false,
      allowed: false,
      reason: 'no_container'
    }
  }

  const report = getCookieIntelligenceReport(container)
  const preferencePanel = findCookiePreferencesPanel()
  const preferenceReport = preferencePanel
    ? buildPreferenceIntelligenceReport(preferencePanel)
    : null
  const candidates = extractSafeActionCandidates(container).slice(0, 5)
  const previews = []

  for (const candidate of candidates) {
    const preview = buildCookieDecisionPreview(container, candidate)
    previews.push(preview)
  }

  const bestPreview = selectBestPreview(previews)

  return {
    report,
    candidates,
    previews,
    bestPreview,
    preferenceReport,
    safeToAct: false,
    allowed: false,
    reason: 'pipeline_complete'
  }
}

// Enrichment registry and pipeline
function applyPassiveEnrichmentStage(report, key, builder) {
  return {
    ...report,
    [key]: builder(report)
  }
}

function buildPassiveEnrichmentStageRegistry(context = {}) {
  return [
    {
      key: 'decision',
      builder: buildPassiveDecisionEngine
    },
    {
      key: 'historical',
      builder: buildHistoricalSiteIntelligence
    },
    {
      key: 'patterns',
      builder: buildPassivePatternClassification
    },
    {
      key: 'fingerprint',
      builder: (report) => normalizeCMPFingerprint(report.cmp, report.cmpStrategy)
    },
    {
      key: 'trend',
      builder: buildHistoricalTrendAnalysis
    },
    {
      key: 'anomalies',
      builder: detectHistoricalAnomalies
    },
    {
      key: 'confidenceAggregation',
      builder: aggregatePassiveConfidence
    },
    {
      key: 'reputation',
      builder: buildDomainReputationScore
    },
    {
      key: 'safety',
      builder: buildPassiveSafetyScore
    },
    {
      key: 'normalized',
      builder: buildNormalizedUnifiedCookieReport
    },
    {
      key: 'debugAnalytics',
      builder: buildDebugAnalyticsSummary
    },
    {
      key: 'behaviorProfile',
      builder: buildCMPBehaviorProfile
    },
    {
      key: 'trustScore',
      builder: buildHistoricalTrustScore
    },
    {
      key: 'stabilityIndex',
      builder: buildDomainStabilityIndex
    },
    {
      key: 'riskEvolution',
      builder: buildRiskEvolutionAnalysis
    },
    {
      key: 'consistencyValidation',
      builder: validatePassiveConsistency
    },
    {
      key: 'fingerprintHistory',
      builder: compareHistoricalFingerprint
    },
    {
      key: 'lifecycle',
      builder: buildPassiveLifecycleMetadata
    },
    {
      key: 'integrity',
      builder: validatePassiveMemoryIntegrity
    },
    {
      key: 'compacted',
      builder: compactPassiveReport
    },
    {
      key: 'diagnostics',
      builder: buildAdvancedDebugDiagnostics
    },
    {
      key: 'comparative',
      builder: buildCrossVisitComparativeIntelligence
    },
    {
      key: 'similarity',
      builder: buildCMPSimilarityAnalysis
    },
    {
      key: 'clustering',
      builder: buildPassiveBehavioralClustering
    },
    {
      key: 'confidenceDrift',
      builder: buildHistoricalConfidenceDriftAnalysis
    },
    {
      key: 'uncertainty',
      builder: buildPassiveUncertaintyScore
    },
    {
      key: 'escalation',
      builder: buildStabilityAnomalyEscalation
    },
    {
      key: 'weighting',
      builder: buildPassiveObservationWeighting
    },
    {
      key: 'normalizedTrust',
      builder: buildFingerprintTrustNormalization
    },
    {
      key: 'persistence',
      builder: buildHistoricalPatternPersistence
    },
    {
      key: 'diagnosticsAggregate',
      builder: buildDiagnosticsAggregate
    },
    {
      key: 'fixtures',
      builder: buildPassiveFixtureGenerator
    },
    {
      key: 'validation',
      builder: validatePassiveReportShape
    },
    {
      key: 'dependencies',
      builder: validatePassiveEnrichmentDependencies
    },
    {
      key: 'integrityChecks',
      builder: buildPassivePipelineIntegrityChecks
    },
    {
      key: 'assertions',
      builder: buildPassiveFieldConsistencyAssertions
    },
    {
      key: 'missingFields',
      builder: buildMissingFieldDiagnostics
    },
    {
      key: 'schemaSnapshot',
      builder: buildPassiveReportSchemaSnapshot
    },
    {
      key: 'validationSummary',
      builder: buildCompactValidationSummary
    },
    {
      key: 'timing',
      builder: buildPassiveEnrichmentTimingMetadata
    },
    {
      key: 'validationAggregate',
      builder: buildDebugValidationAggregation
    },
    {
      key: 'stageRegistry',
      builder: (report) => buildPassiveStageRegistrySnapshot(
        report,
        context.registry
      )
    },
    {
      key: 'stageExecution',
      builder: (report) => buildPassiveStageExecutionMetadata(
        report,
        context.executionRecords
      )
    },
    {
      key: 'observability',
      builder: buildPassivePipelineObservability
    },
    {
      key: 'profiling',
      builder: buildPassiveExecutionProfiling
    },
    {
      key: 'timingProfile',
      builder: buildPassiveTimingProfile
    },
    {
      key: 'lazyDiagnostics',
      builder: buildLazyPassiveDiagnostics
    },
    {
      key: 'compactDiagnostics',
      builder: buildBoundedCompactDiagnostics
    },
    {
      key: 'memoryPressure',
      builder: buildPassiveMemoryPressureIndicators
    },
    {
      key: 'stageHealth',
      builder: buildPassiveStageHealthTracking
    },
    {
      key: 'executionSummary',
      builder: buildPassivePipelineExecutionSummary
    },
    {
      key: 'stageGroups',
      builder: buildPassiveStageGroups
    },
    {
      key: 'stageCategories',
      builder: buildPassiveStageCategories
    },
    {
      key: 'stageOrderSnapshot',
      builder: buildPassiveStageOrderSnapshot
    },
    {
      key: 'stageDependencySnapshot',
      builder: buildPassiveStageDependencySnapshot
    },
    {
      key: 'finalExecution',
      builder: (report) => buildFinalPassiveStageExecutionMetadata(
        report,
        context.executionRecords
      )
    },
    {
      key: 'finalObservability',
      builder: buildFinalPassivePipelineObservability
    },
    {
      key: 'finalProfiling',
      builder: buildFinalPassiveExecutionProfiling
    },
    {
      key: 'finalStageHealth',
      builder: buildFinalPassiveStageHealthTracking
    },
    {
      key: 'finalExecutionSummary',
      builder: buildFinalPassivePipelineExecutionSummary
    },
    {
      key: 'pipelineHealth',
      builder: buildPassivePipelineHealthSummary
    },
    {
      key: 'debugAnalytics',
      builder: buildDebugAnalyticsSummary
    }
  ].map((stage, index) => ({
    ...stage,
    index,
    group: stage.group || getPassiveStageGroup(stage.key),
    category: stage.category || getPassiveStageCategory(stage.key),
    dependencies: uniquePassiveList(
      stage.dependencies || getPassiveStageDependencies(stage.key)
    )
  }))
}

function buildPassiveEnrichmentPipeline(baseReport) {
  const context = {
    registry: null,
    executionRecords: []
  }
  const registry = buildPassiveEnrichmentStageRegistry(context)
  context.registry = registry

  return registry.reduce((report, stage) => {
    const startedAt = Date.now()
    const nextReport = applyPassiveEnrichmentStage(
      report,
      stage.key,
      stage.builder
    )
    const endedAt = Date.now()

    context.executionRecords.push({
      key: stage.key,
      index: stage.index,
      startedAt,
      endedAt,
      durationMs: Math.max(0, endedAt - startedAt),
      success: true
    })

    return nextReport
  }, baseReport)
}

// Unified report builder
function buildUnifiedCookieIntelligence(pipeline) {
  const bannerReport = pipeline?.report || null
  const preferenceReport = pipeline?.preferenceReport || null
  const cmp = preferenceReport?.cmp || bannerReport?.cmp || {
    cmp: 'unknown',
    confidence: 0,
    signals: []
  }
  const cmpStrategy = preferenceReport?.cmpStrategy || getCMPStrategyProfile(cmp)
  const reliability = evaluateCMPReliability(cmpStrategy, preferenceReport)
  const domainObservation = getDomainObservation(window.location.hostname)
  const observation = {
    current: domainObservation,
    stability: evaluateObservationStability(domainObservation)
  }

  let recommendation = 'observe_only'
  let reason = 'unified_intelligence_observe_only'

  if (reliability.automationReadiness === 'candidate_ready') {
    recommendation = 'candidate_optional_disable_flow'
    reason = 'reliability_candidate_ready'
  } else if (preferenceReport?.recommendedPassiveStrategy === 'candidate_legitimate_interest_review') {
    recommendation = 'review_legitimate_interest_flow'
    reason = 'legitimate_interest_review_recommended'
  } else if (preferenceReport?.recommendedPassiveStrategy === 'candidate_vendor_review') {
    recommendation = 'review_vendor_flow'
    reason = 'vendor_review_recommended'
  } else if (preferenceReport) {
    recommendation = 'review_preference_center'
    reason = 'preference_report_available'
  } else if (cmp.cmp !== 'unknown') {
    recommendation = 'observe_cmp_behavior'
    reason = 'cmp_detected_without_preference_report'
  }

  const unifiedReport = {
    banner: bannerReport
      ? {
          classification: bannerReport.classification || 'unknown',
          confidence: bannerReport.confidence || 0,
          passiveRecommendation: bannerReport.passiveRecommendation || 'observe_only',
          cmp: bannerReport.cmp || cmp
        }
      : null,
    preference: preferenceReport,
    cmp,
    cmpStrategy,
    reliability,
    observation,
    recommendation,
    safeToAct: false,
    allowed: false,
    reason
  }

  const enrichedReport = buildPassiveEnrichmentPipeline(unifiedReport)

  exposeUnifiedCookieDebug(enrichedReport)
  rememberPassiveCookieObservation(enrichedReport)

  return enrichedReport
}

function selectBestPreview(previews) {
  if (!previews || previews.length === 0) return null

  const priorityOrder = {
    'candidate_direct_reject': 1,
    'candidate_preferences': 2,
    'candidate_observe_only': 3,
    'blocked': 4
  }

  return previews.reduce((best, current) => {
    if (!best) return current
    if (!current) return best

    const bestDecisionType = best.decisionType || 'blocked'
    const currentDecisionType = current.decisionType || 'blocked'
    const bestPriority = priorityOrder[bestDecisionType] || 999
    const currentPriority = priorityOrder[currentDecisionType] || 999

    if (currentPriority < bestPriority) {
      return current
    }

    if (currentPriority === bestPriority) {
      const bestConfidence = (best.validation && best.validation.confidence) || 0
      const currentConfidence = (current.validation && current.validation.confidence) || 0
      if (currentConfidence > bestConfidence) {
        return current
      }
    }

    return best
  })
}

// Cookie Intelligence Layer - Passive Runtime Hook
const COOKIE_INTELLIGENCE_CACHE = new Map()
const COOKIE_INTELLIGENCE_MAX_ENTRIES = 10
const COOKIE_INTELLIGENCE_TTL = 120000

function runPassiveCookieIntelligence(container) {
  if (!container) return null

  const key = getCookieIntelligenceContainerKey(container)

  const cached = COOKIE_INTELLIGENCE_CACHE.get(key)
  if (cached && Date.now() - cached.timestamp < COOKIE_INTELLIGENCE_TTL) {
    return cached.pipeline
  }

  clearExpiredCookieIntelligenceCache()

  try {
    const pipeline = buildCookieIntelligencePipeline(container)

    COOKIE_INTELLIGENCE_CACHE.set(key, {
      pipeline,
      timestamp: Date.now()
    })

    if (COOKIE_INTELLIGENCE_CACHE.size > COOKIE_INTELLIGENCE_MAX_ENTRIES) {
      const entries = Array.from(COOKIE_INTELLIGENCE_CACHE.entries())
      const oldestKey = entries.reduce((oldest, current) =>
        current[1].timestamp < oldest[1].timestamp ? current : oldest
      )[0]
      COOKIE_INTELLIGENCE_CACHE.delete(oldestKey)
    }

    return pipeline
  } catch (error) {
    return null
  }
}

function runPassiveCookieIntelligenceForCandidates(candidates) {
  try {
    const now = Date.now()

    if (
      now - lastPassiveIntelligenceAt <
      PASSIVE_INTELLIGENCE_SCAN_COOLDOWN_MS
    ) {
      log('passive intelligence skipped: cooldown')
      return
    }

    const visibleCandidates = candidates
      .filter(candidate => isVisible(candidate))
      .slice(0, 1)

    if (visibleCandidates.length === 0) {
      return
    }

    lastPassiveIntelligenceAt = now

    for (const container of visibleCandidates) {
      try {
        runPassiveCookieIntelligence(container)
      } catch (error) {}
    }
  } catch (error) {}
}

const COOKIE_OBSERVATION_MEMORY = new Map()
const COOKIE_OBSERVATION_MEMORY_MAX_ENTRIES = 20
const COOKIE_OBSERVATION_MEMORY_TTL = 300000

function getDomainObservation(domain) {
  if (!domain) return null
  return COOKIE_OBSERVATION_MEMORY.get(domain) || null
}

function buildTechnicalObservation(pipeline) {
  if (!pipeline) return null

  return {
    classification: pipeline.report?.classification || 'unknown',
    passiveRecommendation: pipeline.report?.passiveRecommendation || 'unknown',
    confidence: pipeline.report?.confidence || 0,
    bestDecisionType: pipeline.bestPreview?.decisionType || 'unknown',
    reason: pipeline.bestPreview?.reason || null,
    candidatesExisted: pipeline.candidates?.length > 0,
    preferencesDetected: pipeline.report?.analysis?.hasPreferences || false,
    togglesDetected: pipeline.report?.analysis?.hasToggles || false,
    observedAt: Date.now()
  }
}

function getConfidenceTrend(previousConfidence, nextConfidence) {
  if (typeof previousConfidence !== 'number' || typeof nextConfidence !== 'number') {
    return 'unknown'
  }

  if (nextConfidence > previousConfidence) return 'up'
  if (nextConfidence < previousConfidence) return 'down'
  return 'stable'
}

function mergeDomainObservation(previousObservation, nextObservation) {
  if (!nextObservation) return previousObservation || null

  if (!previousObservation) {
    return {
      ...nextObservation,
      seenCount: 1,
      stableCount: 0,
      changedCount: 0,
      lastClassification: nextObservation.classification,
      lastBestDecisionType: nextObservation.bestDecisionType,
      confidenceTrend: 'unknown'
    }
  }

  const previousClassification =
    previousObservation.lastClassification || previousObservation.classification || 'unknown'
  const previousBestDecisionType =
    previousObservation.lastBestDecisionType || previousObservation.bestDecisionType || 'unknown'
  const nextClassification = nextObservation.classification || 'unknown'
  const nextBestDecisionType = nextObservation.bestDecisionType || 'unknown'
  const isStable =
    previousClassification === nextClassification &&
    previousBestDecisionType === nextBestDecisionType

  return {
    ...nextObservation,
    seenCount: (previousObservation.seenCount || 1) + 1,
    stableCount: (previousObservation.stableCount || 0) + (isStable ? 1 : 0),
    changedCount: (previousObservation.changedCount || 0) + (isStable ? 0 : 1),
    lastClassification: nextClassification,
    lastBestDecisionType: nextBestDecisionType,
    confidenceTrend: getConfidenceTrend(previousObservation.confidence, nextObservation.confidence)
  }
}

function evaluateObservationStability(observation) {
  if (!observation) {
    return {
      observationConsistency: 0,
      observationStability: 'unknown',
      adaptiveConfidence: 0
    }
  }

  const seenCount = Math.max(0, observation.seenCount || 0)
  const stableCount = Math.max(0, observation.stableCount || 0)
  const changedCount = Math.max(0, observation.changedCount || 0)
  const confidence = Math.min(100, Math.max(0, observation.confidence || 0))

  const rawConsistency = seenCount > 0 ? stableCount / seenCount : 0
  const observationConsistency = Math.min(1, Math.max(0, rawConsistency))

  let observationStability = 'unknown'
  if (seenCount < 2) {
    observationStability = 'unknown'
  } else if (seenCount >= 3 && observationConsistency >= 0.75) {
    observationStability = 'high'
  } else if (seenCount >= 2 && observationConsistency >= 0.5) {
    observationStability = 'medium'
  } else {
    observationStability = 'low'
  }

  let adaptiveConfidence = confidence

  if (observationConsistency >= 0.75) {
    adaptiveConfidence += 10
  } else if (observationConsistency < 0.5) {
    adaptiveConfidence -= 10
  }

  if (observation.confidenceTrend === 'up') {
    adaptiveConfidence += 5
  } else if (observation.confidenceTrend === 'down') {
    adaptiveConfidence -= 5
  }

  if (changedCount >= 2) {
    adaptiveConfidence -= Math.min(20, changedCount * 5)
  }

  return {
    observationConsistency,
    observationStability,
    adaptiveConfidence: Math.min(100, Math.max(0, adaptiveConfidence))
  }
}


function trimObservationMemory() {
  try {
    const now = Date.now()
    const expiredKeys = []

    for (const [key, observation] of COOKIE_OBSERVATION_MEMORY.entries()) {
      if (now - observation.observedAt >= COOKIE_OBSERVATION_MEMORY_TTL) {
        expiredKeys.push(key)
      }
    }

    expiredKeys.forEach(key => COOKIE_OBSERVATION_MEMORY.delete(key))

    while (COOKIE_OBSERVATION_MEMORY.size > COOKIE_OBSERVATION_MEMORY_MAX_ENTRIES) {
      const entries = Array.from(COOKIE_OBSERVATION_MEMORY.entries())

      const oldestKey = entries.reduce((oldest, current) =>
        current[1].observedAt < oldest[1].observedAt ? current : oldest
      )[0]

      COOKIE_OBSERVATION_MEMORY.delete(oldestKey)
    }
  } catch (error) {}
}

function recordDomainObservation(domain, pipeline) {
  if (!domain) return
  try {
    const nextObservation = buildTechnicalObservation(pipeline)
    if (nextObservation) {
      const previousObservation = getDomainObservation(domain)
      const observation = mergeDomainObservation(previousObservation, nextObservation)
      COOKIE_OBSERVATION_MEMORY.set(domain, observation)
      trimObservationMemory()
    }
  } catch (error) {}
}

function getCookieIntelligenceContainerKey(container) {
  if (!container) return 'null'

  const tagName = container.tagName ? container.tagName.toLowerCase() : ''
  const rect = getSafeClientRect(container)
  if (!rect) return tagName || 'invalid'

  const role = container.getAttribute('role') || ''

  const roundedTop = Math.round(rect.top / 10) * 10
  const roundedLeft = Math.round(rect.left / 10) * 10
  const roundedWidth = Math.round(rect.width / 10) * 10
  const roundedHeight = Math.round(rect.height / 10) * 10

  const id = container.id || ''
  const rawClassName = typeof container.className === 'string' ? container.className : ''
  const classes = rawClassName.split(' ').slice(0, 2).join(' ')

  const keyParts = [
    tagName,
    `${roundedTop},${roundedLeft}`,
    `${roundedWidth}x${roundedHeight}`,
    role,
    id.slice(0, 20),
    classes.slice(0, 20)
  ].filter(Boolean)

  return keyParts.join('_').replace(/[^a-zA-Z0-9_,]/g, '_')
}

function clearExpiredCookieIntelligenceCache() {
  const now = Date.now()
  const expiredKeys = []

  for (const [key, data] of COOKIE_INTELLIGENCE_CACHE.entries()) {
    if (now - data.timestamp >= COOKIE_INTELLIGENCE_TTL) {
      expiredKeys.push(key)
    }
  }

  expiredKeys.forEach(key => COOKIE_INTELLIGENCE_CACHE.delete(key))
}

function sendProtectionEvent(payload) {
  if (!hasExtensionContext()) return

  try {
    chrome.runtime.sendMessage({
      type: 'protection_event',
      payload,
    }, (response) => {
      if (chrome.runtime.lastError) {
        log('Failed to send protection event:', chrome.runtime.lastError.message)
        return
      }

      if (response?.success) {
        log('Protection event sent successfully')
      } else {
        log('Protection event failed:', response?.reason)
      }
    })
  } catch (error) {
    log('Error sending protection event:', error)
  }
}

if (hasExtensionContext()) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.type !== 'ADDISLINE_REFRESH_FC_DIAGNOSTICS') {
      return false
    }

    try {
      sendResponse({
        success: refreshFundingChoicesDiagnosticsForVisiblePanel('popup_message'),
      })
    } catch (error) {
      sendResponse({
        success: false,
        reason: error?.message || 'refresh_failed',
      })
    }

    return false
  })
}

// Link extension from web
const ALLOWED_LINK_ORIGINS = [
  'https://addisline.com',
  'https://www.addisline.com',
  'http://localhost:5173',
  'http://localhost:3000',
]

window.addEventListener('message', (event) => {
  if (event.data?.type !== 'ADDISLINE_LINK_EXTENSION') {
    return
  }

  if (!ALLOWED_LINK_ORIGINS.includes(event.origin)) {
    log('Rejected link message from unauthorized origin:', event.origin)
    return
  }

  const linkCode = String(event.data.linkCode || '').trim()

  if (!linkCode || linkCode.length < 8 || linkCode.length > 32) {
    log('Invalid linkCode received')
    return
  }

  if (!hasExtensionContext()) {
    log('Extension context not available for linking')
    return
  }

  try {
    chrome.runtime.sendMessage({
      type: 'LINK_EXTENSION',
      linkCode,
    }, (response) => {
      if (chrome.runtime.lastError) {
        log('Failed to send link code:', chrome.runtime.lastError.message)
        return
      }

      if (response?.success) {
        log('Link code processed successfully')
      } else {
        log('Link code failed:', response?.reason)
      }
    })
  } catch (error) {
    log('Error sending link code:', error)
  }
})
