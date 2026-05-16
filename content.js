const DEBUG = false
const COOKIE_DEBUG = true

let protectionEnabled = false
let protectionMode = 'normal'
let excludedDomains = []
let observer = null
let debounceTimer = null
let preferencesTimer = null
let preferencesRetryTimers = []
let lastScanAt = 0
let lastPassiveIntelligenceAt = 0
let scanBurstCount = 0
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
const cookieDebugLogCooldowns = new Map()
const providerInfoModalSignatures = new Map()
const processedActionElements = new WeakSet()
const bannerActionCooldowns = new Map()
const hiddenBannerCooldowns = new Map()
const dismissedBannerSuppressions = new Map()
const preferenceExpansionSignatures = new Map()
const preferenceTraversalCooldowns = new Map()
const unstablePreferenceToggleSignatures = new Map()
const observedShadowRoots = new WeakSet()

const STATS_KEY = 'stats'
const PROTECTED_DOMAINS_KEY = 'protectedDomains'
const BANNER_ACTION_COOLDOWN_MS = 10000
const BANNER_HIDE_COOLDOWN_MS = 60000
const BANNER_SUPPRESSION_TTL_MS = 45000
const MAX_SUPPRESSION_HIDES = 3
const MAX_BANNER_HIDE_ATTEMPTS = 1
const SCAN_DEBOUNCE_MS = 800
const MIN_SCAN_INTERVAL_MS = 2000
const MAX_SCAN_BURST = 5
const SCAN_BURST_RESET_MS = 15000
const OBSERVER_COOLDOWN_MS = 1200
const SHADOW_OBSERVE_COOLDOWN_MS = 5000
const COOKIE_DEBUG_LOG_COOLDOWN_MS = 5000
const PAGE_LOADING_SCAN_DELAY_MS = 1500
const MAX_PAGE_ACTIONS = 16
const MAX_PAGE_TRAVERSALS = 500
const TOGGLE_PERSISTENCE_VERIFY_MS = 650
const PREFERENCE_EXPANSION_TTL_MS = 60000
const MAX_PREFERENCE_TRAVERSAL_DEPTH = 3
const PREFERENCE_TRAVERSAL_COOLDOWN_MS = 15000
const PREFERENCE_TRAVERSAL_BUDGET_MS = 2500
const MAX_PREFERENCE_TRAVERSAL_CLICKS = 4
const PASSIVE_INTELLIGENCE_SCAN_COOLDOWN_MS = 30000
const MUTATION_SCAN_HINT_TEXTS = [
  'cookie',
  'cookies',
  'consent',
  'privacy',
  'gdpr',
  'cmp',
  'banner',
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
  'reject',
  'reject all',
  'decline',
  'decline all',
  'solo necesarias',
  'only necessary',
  'necessary only',
  'essential only',
]

const totalRejectTexts = [
  'reject all',
  'reject all btn',
  'rejectall',
  'rechazar todo',
  'rechazar cookies',
  'decline all',
  'decline all btn',
  'declineall',
  'deny all',
  'deny all btn',
  'denyall',
  'denegar todo',
  'ch2 deny all btn',
  'ch2denyallbtn',
]

const rejectTexts = [
  'reject',
  'rechazar',
  'decline',
]

const necessaryOnlyTexts = [
  'only necessary',
  'solo necesarias',
  'solo esenciales',
  'cookies necesarias',
  'necessary only',
  'essential only',
]

const settingsTexts = [
  'manage cookies',
  'manage settings',
  'cookie settings',
  'privacy settings',
  'show purposes',
  'manage purposes',
  'purpose settings',
  'view purposes',
  'configurar cookies',
  'gestionar opciones',
  'gestionar preferencias',
  'gestion de opciones',
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
    tag: element.tagName?.toLowerCase?.() || '',
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
    element.getBoundingClientRect?.()

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
      } catch {
        // Extension context may be invalidated while the callback runs.
      }
    })
  } catch {
    // Extension context invalidated.
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

function recordProtectedSite() {
  if (
    protectedDomainRecorded ||
    !shouldRunOnThisSite()
  ) {
    return
  }

  const currentDomain = getCurrentDomain()

  if (!currentDomain) return

  protectedDomainRecorded = true

  safeStorageGet(
    {
      [PROTECTED_DOMAINS_KEY]: [],
    },
    (stored) => {
      const protectedDomains = Array.isArray(stored[PROTECTED_DOMAINS_KEY])
        ? stored[PROTECTED_DOMAINS_KEY].map(normalizeDomain).filter(Boolean)
        : []

      if (protectedDomains.includes(currentDomain)) {
        return
      }

      const nextProtectedDomains = [
        ...new Set([...protectedDomains, currentDomain]),
      ]

      safeStorageSet({
        [PROTECTED_DOMAINS_KEY]: nextProtectedDomains,
      })

      setStatValue('protectedSites', nextProtectedDomains.length)
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
  if (!element) return false

  const rect = element.getBoundingClientRect()
  const style = window.getComputedStyle(element)

  return (
    (element.offsetWidth > 0 ||
      element.offsetHeight > 0 ||
      rect.width > 0 ||
      rect.height > 0) &&
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    Number(style.opacity) !== 0
  )
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

    try {
      results.push(
        ...Array.from(currentRoot.querySelectorAll(selector))
      )
    } catch {
      return
    }

    try {
      currentRoot.querySelectorAll('*').forEach((element) => {
        if (element.shadowRoot) {
          collect(element.shadowRoot)
        }
      })
    } catch {
      // Some detached roots can throw while a CMP re-renders.
    }
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
  if (!element) return false

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
    element?.closest?.(
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
  return Boolean(
    element?.matches?.(
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

function isPotentialCookieContainer(element) {
  if (
    !element ||
    !isVisible(element) ||
    isTextFragmentOrControl(element) ||
    element === document.body ||
    element === document.documentElement ||
    isLikelyNonCookieModal(element) ||
    element.matches?.('form, nav, header, main, article')
  ) {
    return false
  }

  const textLength = getText(element).length

  if (textLength < 20 || textLength > 3500) {
    return false
  }

  return (
    hasCookieBannerSignal(element) ||
    hasKnownCmpSignal(element)
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

function findCookieBannerCandidates() {
  if (
    activeCookieContainer &&
    isVisible(activeCookieContainer) &&
    isPotentialCookieContainer(activeCookieContainer)
  ) {
    if (isAddislineTestMode()) {
      updateAddislineTestReport({
        event: 'findCookieBannerCandidates:active',
        bannerCandidateCount: 1,
        chosenCandidateSummary: getElementTestSummary(activeCookieContainer),
      })
    }
    return [activeCookieContainer]
  }

  const rawCandidates = Array.from(
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
  )

  const containers = rawCandidates
    .map(getCookieContainer)
    .filter(Boolean)

  const candidates = Array.from(new Set(containers))
    .filter((candidate) =>
      !containers.some((otherCandidate) =>
        otherCandidate !== candidate &&
        otherCandidate.contains(candidate) &&
        isPotentialCookieContainer(otherCandidate)
      )
    )

  activeCookieContainer =
    candidates[0] || null

  if (isAddislineTestMode()) {
    updateAddislineTestReport({
      event: 'findCookieBannerCandidates',
      bannerCandidateCount: candidates.length,
      chosenCandidateSummary: getElementTestSummary(activeCookieContainer),
    })
  }

  return candidates
}

function hasSensitiveInput(element) {
  return Boolean(
    element.querySelector?.(
      [
        'input[type="password"]',
        'input[type="email"]',
        'input[name*="card" i]',
        'input[id*="card" i]',
        'input[autocomplete*="cc-" i]',
        'textarea',
      ].join(',')
    )
  )
}

function hasSensitiveContext(element) {
  const context = element.closest?.(
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
  const rect = element.getBoundingClientRect()
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
    element.matches?.('form, nav, header, main, article') ||
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
    if (!element) return false

    const style = window.getComputedStyle(element)

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

function restorePageInteractionForCookieBanner(element) {
  if (
    !shouldRunOnThisSite() ||
    !element ||
    !isPotentialCookieContainer(element) ||
    !hasCookieBannerSignal(element) ||
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

function cleanupCookieInteractionLeftovers(element) {
  if (!shouldRunOnThisSite()) return false

  restorePageInteractionForCookieBanner(element)

  if (hasActiveCookieOverlay()) {
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

  return Array.from(
    querySelectorAllDeep(
      [
        'button',
        'a',
        'span',
        'strong',
        'div',
        '[role="button"]',
        '[aria-controls]',
        '[aria-expanded]',
        '[data-action]',
        '[onclick]',
        '[tabindex]',
        'input',
        'input[type="button"]',
        'input[type="submit"]',
      ].join(',')
      ,
      container
    )
  )
}

function getNearbyActionContext(element, container) {
  const parent =
    element?.parentElement

  const closestControlGroup =
    element?.closest?.(
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
    element?.closest?.(
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

  if (
    intent !== 'acceptAll' &&
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

function findBestActionByKeywords(container, keywords, minimumScore = 8) {
  return getActionControls(container)
    .filter((control) =>
      isVisible(control) &&
      !hasUnsafeAcceptText(control) &&
      !isSensitiveActionControl(control, container)
    )
    .map((control) => ({
      control,
      score:
        scoreTextAgainstKeywords(getActionText(control), keywords, 8) +
        scoreTextAgainstKeywords(
          getNearbyActionContext(control, container).nearby,
          keywords,
          3
        ),
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

  return getCookieIntentScore(element, null, 'rejectAll') >= 8
}

function hasDirectSettingsSignal(element) {
  if (!element || hasUnsafeAcceptText(element)) {
    return false
  }

  if (textMatchesDictionaryCookieIntent(getActionText(element), 'openSettings')) {
    return true
  }

  return getCookieIntentScore(element, null, 'managePreferences') >= 8
}

function findActionByTexts(container, texts) {
  return findBestActionByKeywords(container, texts)
}

function getDirectClickableControls(container = document) {
  return Array.from(
    querySelectorAllDeep(
      [
        'button',
        'a',
        'span',
        'strong',
        'div',
        '[role="button"]',
        '[aria-controls]',
        '[aria-expanded]',
        '[data-action]',
        '[onclick]',
        '[tabindex]',
        'input',
        'input[type="button"]',
        'input[type="submit"]',
      ].join(',')
      ,
      container
    )
  )
}

function findDirectSafeRejectControl() {
  if (!shouldRunOnThisSite()) return null

  return getDirectClickableControls(document)
    .find((control) => {
      if (!isVisible(control)) return false
      if (isInsideNonCookieModal(control)) return false
      if (hasUnsafeAcceptText(control)) return false
      if (isSensitiveActionControl(control, document)) return false

      const actionText = getActionText(control)

      if (
        textMatchesDictionaryCookieIntent(actionText, 'rejectAll') ||
        textHasAny(actionText, rejectTexts) ||
        textHasAny(actionText, totalRejectTexts)
      ) {
        return true
      }

      return hasDirectSafeRejectSignal(control)
    })
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
      return hasDirectSettingsSignal(control)
    })
}

function getBannerActionSignature(element) {
  const container =
    getCookieContainer(element) ||
    element?.closest?.(
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

function clickElementSafely(element) {
  if (
    !shouldRunOnThisSite() ||
    !element ||
    !isVisible(element) ||
    hasUnsafeAcceptText(element) ||
    processedActionElements.has(element)
  ) {
    return false
  }

  if (!canUsePageActionBudget('clickElementSafely')) {
    return false
  }

  processedActionElements.add(element)
  try {
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

function decideCookieAction(container) {
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
    return finish({
      type: 'none',
      element: null,
    })
  }

  if (!modeConfig.allowAutoReject) {
    return finish({
      type: 'none',
      element: null,
    })
  }

  const totalReject = findBestActionByIntent(container, 'rejectAll')

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

  const necessaryOnly = findBestActionByIntent(container, 'essentialOnly')

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

  const rejectCategory =
    [
      'analyticsReject',
      'marketingReject',
      'personalizationReject',
      'trackingReject',
    ]
      .map((intent) => findBestActionByIntent(container, intent, 10))
      .find(Boolean)

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

  const reject = findBestActionByKeywords(container, rejectTexts)

  if (reject) {
    const rejectIntent =
      getBestCookieIntent(reject, container).intent

    cookieDebugLog('cookie.reject.detected', {
      source: 'legacy_keywords',
      intent: rejectIntent,
      control: getCookieDebugElementSummary(reject),
    })

    return finish({
      type: 'reject',
      element: reject,
      intent: rejectIntent,
      container,
    })
  }

  if (!modeConfig.allowSettingsOpen) {
    return finish({
      type: 'none',
      element: null,
    })
  }

  const settings = findBestActionByIntent(container, 'managePreferences')

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

  const save = findBestActionByIntent(container, 'savePreferences')

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

  const accept = findBestActionByIntent(container, 'acceptAll')

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

  if (!clickElementSafely(action.element)) {
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
    currentContainer ? window.getComputedStyle(currentContainer) : null

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
      currentContainer?.matches?.(
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

function schedulePostActionVerification(context = {}) {
  setTimeout(() => {
    if (!shouldRunOnThisSite()) return

    const state =
      getBannerVerificationState(context.container)

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

    if (!state.active) {
      cleanupCookieInteractionLeftovers(state.container || context.container)

      if (state.container || context.container) {
        markBannerSuppressed(
          state.container || context.container,
          context.type || 'verified'
        )
      }
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

function getToggleControls(container) {
  return Array.from(
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

  const label = control.closest?.('label')
  const context = control.closest?.(
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
    control.closest?.('label')

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
    control.closest?.(
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
    control.closest?.('[role="tabpanel"], [id]')

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
    control.closest?.('[role="dialog"], [aria-modal="true"], [class*="preference" i], [class*="consent" i]')
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
    control.matches?.(
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
    control.matches?.(
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
      control.matches?.(
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
    control.matches?.(
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
        control.matches?.(
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

function isToggleEnabled(control) {
  if (!isVisible(control)) return false

  if (
    control.disabled ||
    control.getAttribute?.('aria-disabled') === 'true'
  ) {
    return false
  }

  if (control.matches?.('input[type="checkbox"]')) {
    return control.checked
  }

  if (control.matches?.('input[type="radio"]')) {
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
      const firstArea =
        first.getBoundingClientRect().width *
        first.getBoundingClientRect().height

      const secondArea =
        second.getBoundingClientRect().width *
        second.getBoundingClientRect().height

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

  return candidates[0]?.element || null
}

function scheduleTogglePersistenceVerification(panel, controls) {
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

  const openedSections =
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

function scanPage() {
  try {
    const modeConfig =
      getProtectionModeConfig()

    if (!shouldRunOnThisSite()) {
      updateAddislineTestReport({
        event: 'scanPage:stop',
        lastSkipReason: 'site_not_enabled',
      })
      stopObserver()
      return
    }

    cleanupBannerSuppressions()

    if (shouldDeferScanForLoading()) {
      updateAddislineTestReport({
        event: 'scanPage:deferred',
        lastSkipReason: 'page_loading',
        budgetOrCooldownBlockedWork: true,
      })
      return
    }

    const candidates = findCookieBannerCandidates()
      .filter((candidate) =>
        !modeConfig.allowSuppression ||
        !suppressReRenderedBanner(candidate)
      )
    cookieDebugLog('cookie.scan.candidates', {
      count: candidates.length,
      first: getCookieDebugElementSummary(candidates[0]),
    })
    if (isAddislineTestMode()) {
      updateAddislineTestReport({
        event: 'scanPage:candidates',
        bannerCandidateCount: candidates.length,
        chosenCandidateSummary: getElementTestSummary(candidates[0]),
      })
    }
    runPassiveCookieIntelligenceForCandidates(candidates)

    if (modeConfig.allowAutoReject) {
      for (const candidate of candidates) {
        if (!isPotentialCookieContainer(candidate)) continue

        const action = decideCookieAction(candidate)

        if (executeCookieAction(action)) {
          updateAddislineTestReport({
            event: 'scanPage:action-executed',
            chosenActionType: action.type,
            chosenActionIntent: action.intent || 'none',
            lastActionResult: 'action_executed',
          })
          return
        }
      }
    }

    const directRejectControl =
      modeConfig.allowAutoReject
        ? findDirectSafeRejectControl()
        : null

    if (directRejectControl) {
      cookieDebugLog('cookie.reject.detected', {
        source: 'direct_scan',
        control: getCookieDebugElementSummary(directRejectControl),
      })
    }

    if (
      directRejectControl &&
      canProcessBannerAction(directRejectControl) &&
      clickElementSafely(directRejectControl)
    ) {
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

    const directSettingsControl =
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
      updateAddislineTestReport({
        event: 'scanPage:no-safe-action',
        lastActionResult: 'no_safe_action',
        lastSkipReason: 'no_safe_action',
      })
    } else {
      updateAddislineTestReport({
        event: 'scanPage:complete',
        lastActionResult: hiddenCandidate
          ? 'candidate_hidden'
          : 'no_candidates',
      })
    }
  } catch (error) {
    setLastError(error?.message || 'Error en content script')
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

function shouldScanForMutations(mutations) {
  if (!Array.isArray(mutations)) {
    return true
  }

  if (mutations.length === 0) {
    return false
  }

  return mutations.some(mutationLooksCookieRelated)
}

function scheduleScan(mutations = null) {
  if (!shouldRunOnThisSite()) {
    stopObserver()
    return
  }

  if (!shouldScanForMutations(mutations)) {
    return
  }

  const now = Date.now()

  if (
    mutations &&
    now - lastObserverScanScheduledAt < OBSERVER_COOLDOWN_MS
  ) {
    return
  }

  lastObserverScanScheduledAt = now

  if (now - lastScanAt > SCAN_BURST_RESET_MS) {
    scanBurstCount = 0
  }

  scanBurstCount += 1

  if (scanBurstCount > MAX_SCAN_BURST) {
    clearTimeout(debounceTimer)

    debounceTimer = setTimeout(() => {
      scanBurstCount = 0
      observeOpenShadowRoots()
      scanPage()
    }, SCAN_BURST_RESET_MS)

    return
  }

  const delay =
    Math.max(
      SCAN_DEBOUNCE_MS,
      MIN_SCAN_INTERVAL_MS - (now - lastScanAt)
    )

  clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    lastScanAt = Date.now()
    observeOpenShadowRoots()
    scanPage()
  }, delay)
}

function observeOpenShadowRoots() {
  if (!observer) return

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

function startObserver() {
  if (!shouldRunOnThisSite()) {
    stopObserver()
    return
  }

  if (observer) return

  recordProtectedSite()

  observer = new MutationObserver(scheduleScan)

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  })

  observeOpenShadowRoots()
  scheduleScan()
}

function stopObserver() {
  clearTimeout(debounceTimer)
  clearTimeout(preferencesTimer)
  preferencesRetryTimers.forEach(clearTimeout)
  preferencesRetryTimers = []
  debounceTimer = null
  preferencesTimer = null

  if (!observer) return

  observer.disconnect()
  observer = null
}

function applyRuntimeState() {
  if (shouldRunOnThisSite()) {
    startObserver()
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

// Cookie Intelligence Layer - First Phase
function calculateTextComplexity(text) {
  if (!text) return 0
  return Math.min(text.length / 100, 10)
}

function detectBannerPosition(container) {
  if (!container) return 'unknown'

  const rect = container.getBoundingClientRect()
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

  if (
    control.disabled ||
    (
      typeof control.getAttribute === 'function' &&
      control.getAttribute('disabled') !== null
    ) ||
    control.getAttribute?.('aria-disabled') === 'true'
  ) {
    return 'disabled'
  }

  if (
    control.matches?.('input[type="checkbox"]') ||
    control.matches?.('input[type="radio"]')
  ) {
    return control.checked ? 'enabled' : 'disabled'
  }

  const ariaChecked = normalizeMatchText(control.getAttribute?.('aria-checked'))
  const ariaPressed = normalizeMatchText(control.getAttribute?.('aria-pressed'))

  if (ariaChecked === 'true' || ariaPressed === 'true') return 'enabled'
  if (ariaChecked === 'false' || ariaPressed === 'false') return 'disabled'

  return 'unknown'
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
  const rect = container.getBoundingClientRect()
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
