const DEBUG = false

let protectionEnabled = false
let protectionMode = 'normal'
let excludedDomains = []
let observer = null
let debounceTimer = null
let preferencesTimer = null
let protectedDomainRecorded = false
let lastDiagnosticAction = ''
let lastDiagnosticError = ''
let providerInfoModalCloseAttempts = 0
let statsUpdateQueue = Promise.resolve()
const providerInfoModalSignatures = new Map()

const STATS_KEY = 'stats'
const PROTECTED_DOMAINS_KEY = 'protectedDomains'

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
]

const optionalPreferenceTexts = [
  'analytics',
  'marketing',
  'advertising',
  'personalization',
  'statistics',
  'vendors',
  'partners',
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
]

const vendorCounterTexts = [
  'proveedores',
  'proveedores externos',
  'vendors',
  'vendor',
  'partners',
  'advertising partners',
  'external providers',
  'providers',
]

const trackerCounterTexts = [
  'advertising',
  'advertising partners',
  'analytics',
  'marketing',
  'statistics',
  'personalization',
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

  return [
    element.innerText,
    element.textContent,
    element.getAttribute?.('aria-label'),
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
    .toLowerCase()
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_/|>#:]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
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
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function textHasAny(text, values) {
  const normalizedText =
    normalizeMatchText(text)

  return values.some((value) =>
    normalizedText.includes(normalizeMatchText(value))
  )
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

  return hasCookieBannerSignal(element)
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
    document.querySelectorAll(
      [
        '[id*="cookie" i]',
        '[class*="cookie" i]',
        '[id*="consent" i]',
        '[class*="consent" i]',
        '[id*="privacy" i]',
        '[class*="privacy" i]',
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
      ]
    )
  ) {
    return []
  }

  return Array.from(
    container.querySelectorAll(
      [
        'button',
        'a',
        'span',
        'strong',
        'div',
        '[role="button"]',
        '[data-action]',
        '[onclick]',
        '[tabindex]',
        'input[type="button"]',
        'input[type="submit"]',
      ].join(',')
    )
  )
}

function hasUnsafeAcceptText(element) {
  const text = getActionText(element)

  return unsafeAcceptTexts.some((unsafeText) =>
    text.includes(unsafeText)
  )
}

function getCompactActionText(element) {
  return getActionText(element)
    .replace(/\s+/g, '')
}

function hasDirectSafeRejectSignal(element) {
  if (!element || hasUnsafeAcceptText(element)) {
    return false
  }

  const text =
    getActionText(element)

  const compactText =
    getCompactActionText(element)

  return (
    directSafeRejectTexts.some((safeText) =>
      text.includes(safeText)
    ) ||
    directSafeRejectClassSignals.some((safeClass) =>
      compactText.includes(safeClass)
    )
  )
}

function hasDirectSettingsSignal(element) {
  if (!element || hasUnsafeAcceptText(element)) {
    return false
  }

  const text =
    getActionText(element)

  return directSettingsTexts.some((settingsText) =>
    text.includes(settingsText)
  )
}

function findActionByTexts(container, texts) {
  return getActionControls(container)
    .find((control) => {
      if (!isVisible(control)) return false
      if (hasUnsafeAcceptText(control)) return false

      const text = getActionText(control)

      return texts.some((candidateText) =>
        text.includes(candidateText)
      )
    })
}

function getDirectClickableControls(container = document) {
  return Array.from(
    container.querySelectorAll(
      [
        'button',
        'a',
        'span',
        'strong',
        'div',
        '[role="button"]',
        '[data-action]',
        '[onclick]',
        '[tabindex]',
        'input[type="button"]',
        'input[type="submit"]',
      ].join(',')
    )
  )
}

function findDirectSafeRejectControl() {
  if (!shouldRunOnThisSite()) return null

  return getDirectClickableControls(document)
    .find((control) => {
      if (!isVisible(control)) return false
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
      return hasDirectSettingsSignal(control)
    })
}

function clickElementSafely(element) {
  if (
    !shouldRunOnThisSite() ||
    !element ||
    !isVisible(element) ||
    hasUnsafeAcceptText(element)
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

  const totalReject = findActionByTexts(container, totalRejectTexts)

  if (totalReject) {
    return {
      type: 'reject',
      element: totalReject,
    }
  }

  const necessaryOnly = findActionByTexts(container, necessaryOnlyTexts)

  if (necessaryOnly) {
    return {
      type: 'reject',
      element: necessaryOnly,
    }
  }

  const reject = findActionByTexts(container, rejectTexts)

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

  const settings = findActionByTexts(container, settingsTexts)

  if (settings) {
    return {
      type: 'settings',
      element: settings,
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

  if (hasUnsafeAcceptText(action.element)) {
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
    container.querySelectorAll(
      [
        'input[type="checkbox"]',
        '[role="checkbox"]',
        '[role="switch"]',
        '[aria-checked="true"]',
        '[aria-pressed="true"]',
        'button',
        '[aria-checked]',
        '[aria-pressed]',
        '[data-action*="toggle" i]',
        '[data-action*="switch" i]',
        '[data-action*="vendor" i]',
        '[data-action*="partner" i]',
        '[data-action*="legitimate" i]',
        '[data-action*="interest" i]',
        '[class*="toggle" i]',
        '[class*="switch" i]',
      ].join(',')
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
    control.previousElementSibling ? getText(control.previousElementSibling) : '',
    control.nextElementSibling ? getText(control.nextElementSibling) : '',
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
    textHasAny(text, optionalPreferenceTexts) &&
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
        '[aria-checked]',
        '[aria-pressed]',
        '[class*="toggle" i]',
        '[class*="switch" i]',
        '[data-action*="toggle" i]',
        '[data-action*="switch" i]',
      ].join(',')
    ) ||
    textHasAny(classText, ['toggle', 'switch']) ||
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

  if (textHasAny(text, vendorCounterTexts)) {
    stats.push('vendorsDenied')
    stats.push('trackersReduced')
  }

  if (textHasAny(text, legitimateInterestCounterTexts)) {
    stats.push('legitimateInterestsDisabled')
    stats.push('trackersReduced')
  }

  if (textHasAny(text, trackerCounterTexts)) {
    stats.push('trackersReduced')
  }

  if (
    stats.length === 0 &&
    textHasAny(text, optionalPreferenceTexts)
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

  if (!textHasAny(text, preferenceSectionTexts)) {
    return false
  }

  if (control.getAttribute?.('aria-expanded') === 'true') {
    return false
  }

  if (
    control.matches?.(
      'input[type="checkbox"], [role="switch"], [aria-checked], [class*="toggle" i], [class*="switch" i]'
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
        'button, a, [role="button"], [data-action], [onclick], [tabindex]'
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

      if (clickElementSafely(control)) {
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

  const ariaChecked = control.getAttribute?.('aria-checked')
  const ariaPressed = control.getAttribute?.('aria-pressed')
  const classText = getClassNameText(control).toLowerCase()

  return (
    ariaChecked === 'true' ||
    ariaPressed === 'true' ||
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
    container.querySelectorAll(
      [
        'input[type="checkbox"]',
        '[role="checkbox"]',
        '[role="switch"]',
        '[aria-checked]',
        '[class*="toggle" i]',
        '[class*="switch" i]',
        '[data-action*="toggle" i]',
        '[data-action*="switch" i]',
        '[data-action*="vendor" i]',
        '[data-action*="partner" i]',
        '[data-action*="legitimate" i]',
        '[data-action*="interest" i]',
      ].join(',')
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
  ]

  const candidates = Array.from(
    document.querySelectorAll(
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
        '[role="dialog"]',
        '[role="tabpanel"]',
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
    }))
    .filter((candidate) =>
      (
        candidate.toggleCount > 0 ||
        candidate.settingsControl ||
        candidate.saveControl
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
      second.toggleCount - first.toggleCount
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
  const saveControl = findActionByTexts(panel, savePreferenceTexts)

  if (
    saveControl &&
    !hasUnsafeAcceptText(saveControl) &&
    shouldRunOnThisSite()
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

  if (!panel) {
    log('Panel de preferencias no encontrado')
    return false
  }

  const rejectAction = decideCookieAction(panel)

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

      if (delayedDisabledCount > 0) {
        saveCookiePreferences(updatedPanel)
      }
    }, 350)
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

    if (clickElementSafely(directRejectControl)) {
      incrementStat('autoRejects')
      setLastAction('auto_reject')
      setLastError('')
      log('Rechazo directo prioritario ejecutado')
      return
    }

    const directSettingsControl = findDirectSettingsControl()

    if (clickElementSafely(directSettingsControl)) {
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

function scheduleScan() {
  if (!shouldRunOnThisSite()) {
    stopObserver()
    return
  }

  clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    scanPage()
  }, 400)
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
