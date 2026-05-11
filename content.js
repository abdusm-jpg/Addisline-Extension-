const DEBUG = false

let protectionEnabled = false
let protectionMode = 'normal'
let excludedDomains = []
let observer = null
let debounceTimer = null
let preferencesTimer = null
let lastScanAt = 0
let scanBurstCount = 0
let protectedDomainRecorded = false
let lastDiagnosticAction = ''
let lastDiagnosticError = ''
let providerInfoModalCloseAttempts = 0
let statsUpdateQueue = Promise.resolve()
const providerInfoModalSignatures = new Map()
const processedActionElements = new WeakSet()
const bannerActionCooldowns = new Map()
const observedShadowRoots = new WeakSet()

const STATS_KEY = 'stats'
const PROTECTED_DOMAINS_KEY = 'protectedDomains'
const BANNER_ACTION_COOLDOWN_MS = 10000
const SCAN_DEBOUNCE_MS = 400
const MIN_SCAN_INTERVAL_MS = 1000
const MAX_SCAN_BURST = 8
const SCAN_BURST_RESET_MS = 15000
const MUTATION_SCAN_HINT_TEXTS = [
  'cookie',
  'cookies',
  'consent',
  'privacy',
  'gdpr',
  'cmp',
  'banner',
  'modal',
  'overlay',
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
  'partner preferences',
  'proveedores',
  'proveedores externos',
  'preferencias de proveedores',
  'preferencias sobre proveedores',
  'interes legitimo',
  'intereses legitimos',
  'legitimate interest',
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
  'confirmar opciones',
  'guardar preferencias',
  'confirmar preferencias',
  'aplicar preferencias',
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
  return (element.innerText || element.textContent || '').toLowerCase().trim()
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

function querySelectorAllDeep(selector, root = document) {
  const results = []
  const visitedRoots = new WeakSet()

  function collect(currentRoot) {
    if (!currentRoot || visitedRoots.has(currentRoot)) {
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
        '[id*="didomi" i]',
        '[class*="didomi" i]',
        '[id*="cookiebot" i]',
        '[class*="cookiebot" i]',
        '[id*="trustarc" i]',
        '[class*="trustarc" i]',
        '[id*="usercentrics" i]',
        '[class*="usercentrics" i]',
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

  return Array.from(new Set(containers))
    .filter((candidate) =>
      !containers.some((otherCandidate) =>
        otherCandidate !== candidate &&
        otherCandidate.contains(candidate) &&
        isPotentialCookieContainer(otherCandidate)
      )
    )
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

function scanCookieOverlays() {
  if (
    !shouldRunOnThisSite() ||
    getNormalizedProtectionMode() !== 'strict'
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
      if (hasUnsafeAcceptText(control)) return false
      if (isSensitiveActionControl(control, document)) return false

      const actionText = getActionText(control)

      if (
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
    getNormalizedProtectionMode() === 'soft'
  ) {
    return null
  }

  return getDirectClickableControls(document)
    .find((control) => {
      if (!isVisible(control)) return false
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
  if (!shouldRunOnThisSite()) {
    return {
      type: 'none',
      element: null,
    }
  }

  const totalReject = findBestActionByIntent(container, 'rejectAll')

  if (totalReject) {
    return {
      type: 'reject',
      element: totalReject,
    }
  }

  const necessaryOnly = findBestActionByIntent(container, 'essentialOnly')

  if (necessaryOnly) {
    return {
      type: 'reject',
      element: necessaryOnly,
    }
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
    return {
      type: 'reject',
      element: rejectCategory,
    }
  }

  const reject = findBestActionByKeywords(container, rejectTexts)

  if (reject) {
    return {
      type: 'reject',
      element: reject,
    }
  }

  if (getNormalizedProtectionMode() === 'soft') {
    return {
      type: 'none',
      element: null,
    }
  }

  const settings = findBestActionByIntent(container, 'managePreferences')

  if (settings) {
    return {
      type: 'settings',
      element: settings,
    }
  }

  const save = findBestActionByIntent(container, 'savePreferences')

  if (save) {
    return {
      type: 'save',
      element: save,
    }
  }

  const accept = findBestActionByIntent(container, 'acceptAll')

  if (accept) {
    return {
      type: 'none',
      element: null,
      reason: 'accept_all_is_last_resort',
    }
  }

  return {
    type: 'none',
    element: null,
  }
}

function executeCookieAction(action) {
  if (
    !shouldRunOnThisSite() ||
    !action ||
    !action.element
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
    return false
  }

  if (action.type === 'reject') {
    incrementStat('autoRejects')
    setLastAction('auto_reject')
    setLastError('')
    log('Consentimiento rechazado de forma segura')
  }

  if (action.type === 'settings') {
    schedulePreferencesFlow()
    setLastAction('settings_opened')
    setLastError('')
    log('Configuracion de cookies abierta')
  }

  if (action.type === 'save') {
    setLastAction('preferences_saved')
    setLastError('')
    log('Preferencias de cookies guardadas')
  }

  return true
}

function schedulePreferencesFlow() {
  clearTimeout(preferencesTimer)

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
    setTimeout(() => {
      if (
        completed ||
        !shouldRunOnThisSite() ||
        getNormalizedProtectionMode() === 'soft'
      ) {
        return
      }

      if (handleCookiePreferences()) {
        completed = true
      }
    }, delay)
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

function getPreferenceDecisionText(control) {
  return [
    getNearbyPreferenceText(control),
    getElementReferenceText(control, 'aria-labelledby'),
    getElementReferenceText(control, 'aria-describedby'),
    getAssociatedLabelText(control),
    getHeadingContextText(control),
    getAncestorContextText(control),
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
    isOptionalPreferenceControl(control)
  ) {
    stats.push('vendorsDenied')
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

function openPreferenceSections(panel) {
  if (
    !shouldRunOnThisSite() ||
    getNormalizedProtectionMode() === 'soft' ||
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
    getNormalizedProtectionMode() === 'soft'
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

  const modalAttempts =
    providerInfoModalSignatures.get(signature) || 0

  if (
    providerInfoModalCloseAttempts >= PROVIDER_INFO_MODAL_MAX_CLOSE_ATTEMPTS ||
    modalAttempts >= PROVIDER_INFO_MODAL_MAX_CLOSE_ATTEMPTS
  ) {
    setLastAction('provider_modal_loop_detected')
    log('Bucle de modal de proveedores detectado')

    return {
      closed: false,
      loop: true,
    }
  }

  const closeControl =
    findProviderInfoModalCloseControl(modal)

  if (!closeControl) {
    return {
      closed: false,
      loop: false,
    }
  }

  if (!clickElementForProviderModalClose(closeControl)) {
    return {
      closed: false,
      loop: false,
    }
  }

  providerInfoModalCloseAttempts += 1
  providerInfoModalSignatures.set(signature, modalAttempts + 1)

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
        '[id*="didomi" i]',
        '[class*="didomi" i]',
        '[id*="cookiebot" i]',
        '[class*="cookiebot" i]',
        '[id*="trustarc" i]',
        '[class*="trustarc" i]',
        '[id*="usercentrics" i]',
        '[class*="usercentrics" i]',
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

function disableOptionalPreferenceControls(panel) {
  if (
    !shouldRunOnThisSite() ||
    getNormalizedProtectionMode() === 'soft' ||
    !panel
  ) {
    return 0
  }

  let disabledCount = 0

  getToggleControls(panel).forEach((control) => {
    if (!shouldRunOnThisSite()) return

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
        statsToIncrement.forEach((statName) => {
          incrementStat(statName)
        })

        if (
          statsToIncrement.includes('legitimateInterestsDisabled')
        ) {
          control.dataset.addislineLegitimateCounted = 'true'
        }

        if (statsToIncrement.includes('vendorsDenied')) {
          control.dataset.addislineVendorCounted = 'true'
        }

        if (statsToIncrement.includes('trackersReduced')) {
          control.dataset.addislineTrackerCounted = 'true'
        }

        setLastAction(deniedPreference.action)
        setLastError('')
        disabledCount += 1
      }
    }
  })

  return disabledCount
}

function saveCookiePreferences(panel) {
  const saveControl =
    findBestActionByIntent(panel, 'savePreferences') ||
    findActionByTexts(panel, savePreferenceTexts)

  if (
    saveControl &&
    !hasUnsafeAcceptText(saveControl) &&
    shouldRunOnThisSite() &&
    !isSensitiveActionControl(saveControl, panel) &&
    canProcessBannerAction(saveControl)
  ) {
    if (!clickElementSafely(saveControl)) {
      return false
    }

    log('Preferencias de cookies guardadas')
    return true
  }

  return false
}

function handleCookiePreferences() {
  log('handleCookiePreferences:start', {
    shouldRun: shouldRunOnThisSite(),
    mode: getNormalizedProtectionMode(),
  })
  if (
    !shouldRunOnThisSite() ||
    getNormalizedProtectionMode() === 'soft'
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
log('handleCookiePreferences:panel', {
  found: Boolean(panel),
  text: getText(panel).slice(0, 300),
})
  if (!panel) {
    log('Panel de preferencias no encontrado')
    return false
  }

  const rejectAction = decideCookieAction(panel)
log('handleCookiePreferences:action', {
  type: rejectAction.type,
  text: getActionText(rejectAction.element).slice(0, 120),
  id: rejectAction.element?.id,
  className: getClassNameText(rejectAction.element).slice(0, 120),
})

  if (
    rejectAction.type === 'reject' &&
    executeCookieAction(rejectAction)
  ) {
    return true
  }

  const openedSections = openPreferenceSections(panel)

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
    return saveCookiePreferences(panel) || true
  }

  if (openedSections > 0) {
    return false
  }

  return saveCookiePreferences(panel)
}

function hideElement(element) {
  if (!shouldRunOnThisSite()) return false
  if (getNormalizedProtectionMode() === 'soft') return false
  if (!isSafeToHide(element)) return false

  element.dataset.addislineHidden = 'true'
  element.style.setProperty('display', 'none', 'important')

  incrementStat('bannersHidden')
  setLastAction('banner_hidden')
  setLastError('')
  restorePageInteractionForCookieBanner(element)

  log('Banner ocultado')
  return true
}

function scanPage() {
  try {
    if (!shouldRunOnThisSite()) {
      stopObserver()
      return
    }

    const candidates = findCookieBannerCandidates()

    for (const candidate of candidates) {
      if (!isPotentialCookieContainer(candidate)) continue

      const action = decideCookieAction(candidate)

      if (executeCookieAction(action)) {
        return
      }
    }

    const directRejectControl = findDirectSafeRejectControl()

    if (
      directRejectControl &&
      canProcessBannerAction(directRejectControl) &&
      clickElementSafely(directRejectControl)
    ) {
      incrementStat('autoRejects')
      setLastAction('auto_reject')
      setLastError('')
      log('Rechazo directo prioritario ejecutado')
      return
    }

    const directSettingsControl = findDirectSettingsControl()

    if (
      directSettingsControl &&
      canProcessBannerAction(directSettingsControl) &&
      clickElementSafely(directSettingsControl)
    ) {
      schedulePreferencesFlow()
      setLastAction('settings_opened')
      setLastError('')
      log('Configuracion de cookies abierta')
      return
    }

    let hiddenCandidate = false

    for (const candidate of candidates) {
      if (hideElement(candidate)) {
        hiddenCandidate = true
      }
    }

    scanCookieOverlays()

    if (
      candidates.length > 0 &&
      !hiddenCandidate
    ) {
      setLastAction('no_safe_action')
      setLastError('')
    }
  } catch (error) {
    setLastError(error?.message || 'Error en content script')
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
