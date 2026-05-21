/*
 * Local-only CMP fingerprint detection for Addisline.
 *
 * This module only reads already-loaded page signals: script URLs, iframe URLs,
 * DOM ids/classes/attributes, and globals visible to the content-script world.
 * It must not collect user identifiers, call remote services, or infer anything
 * unrelated to cookie consent management platforms.
 */

const CMP_FINGERPRINTS = Object.freeze({
  OneTrust: Object.freeze([
    'onetrust',
    'ot-sdk',
    'ot sdk',
    'optanon',
    'onetrustactivegroups',
    'cdn.cookielaw.org',
    'otbanner',
  ]),
  Didomi: Object.freeze([
    'didomi',
    'didomi-host',
    'didomi-popup',
    'didomi-notice',
    'sdk.privacy-center.org',
  ]),
  Sourcepoint: Object.freeze([
    'sourcepoint',
    'sp_message',
    'sp-message',
    'sp message',
    'sourcepoint.mgr',
    'privacy-manager',
  ]),
  Cookiebot: Object.freeze([
    'cookiebot',
    'cybotcookiebot',
    'cookiebot.com',
    'consent.cookiebot.com',
  ]),
  Usercentrics: Object.freeze([
    'usercentrics',
    'uc-center',
    'uc banner',
    'usercentrics.eu',
    'usercentrics-cmp',
  ]),
  TrustArc: Object.freeze([
    'trustarc',
    'truste',
    'trustarc.com',
    'choices.trustarc.com',
    'consent.trustarc.com',
  ]),
})

const CMP_GLOBALS = Object.freeze({
  OneTrust: Object.freeze([
    'OneTrust',
    'Optanon',
    'OnetrustActiveGroups',
  ]),
  Didomi: Object.freeze([
    'Didomi',
    'DidomiEventListeners',
  ]),
  Sourcepoint: Object.freeze([
    '_sp_',
    'Sourcepoint',
  ]),
  Cookiebot: Object.freeze([
    'Cookiebot',
    'CookieConsent',
  ]),
  Usercentrics: Object.freeze([
    'UC_UI',
    'UC_UI_SUPPRESS_CMP_DISPLAY',
    'usercentrics',
  ]),
  TrustArc: Object.freeze([
    'truste',
    'TrustArc',
  ]),
})

function normalizeCMPText(value) {
  return String(value || '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s./:_-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeCMPUrl(value) {
  return normalizeCMPText(String(value || '').split('#')[0].split('?')[0])
}

function addUniqueSignal(signals, signal) {
  if (signal && !signals.includes(signal)) {
    signals.push(signal)
  }
}

function safeQueryAll(root, selector) {
  try {
    return Array.from((root || document).querySelectorAll(selector))
  } catch {
    return []
  }
}

function getElementCMPText(element) {
  if (!element) return ''

  return [
    element.id,
    typeof element.className === 'string' ? element.className : '',
    element.getAttribute?.('aria-label'),
    element.getAttribute?.('data-testid'),
    element.getAttribute?.('data-cmp'),
    element.getAttribute?.('data-consent'),
    element.getAttribute?.('data-cookieconsent'),
    element.getAttribute?.('data-cookiebanner'),
    element.getAttribute?.('data-uc'),
    element.getAttribute?.('data-ot'),
    element.getAttribute?.('data-didomi'),
  ].filter(Boolean).join(' ')
}

function collectCMPSignals(root = document) {
  const signals = []

  safeQueryAll(document, 'script[src]')
    .slice(0, 80)
    .forEach((script) => {
      addUniqueSignal(
        signals,
        `script:${normalizeCMPUrl(script.getAttribute('src')).slice(0, 180)}`
      )
    })

  safeQueryAll(document, 'iframe[src]')
    .slice(0, 40)
    .forEach((iframe) => {
      addUniqueSignal(
        signals,
        `iframe:${normalizeCMPUrl(iframe.getAttribute('src')).slice(0, 180)}`
      )
    })

  safeQueryAll(
    root,
    [
      '[id*="onetrust" i]',
      '[class*="onetrust" i]',
      '[id*="didomi" i]',
      '[class*="didomi" i]',
      '[id*="cookiebot" i]',
      '[class*="cookiebot" i]',
      '[id*="cybot" i]',
      '[class*="cybot" i]',
      '[id*="usercentrics" i]',
      '[class*="usercentrics" i]',
      '[id*="trustarc" i]',
      '[class*="trustarc" i]',
      '[id*="truste" i]',
      '[class*="truste" i]',
      '[data-cmp]',
      '[data-consent]',
      '[data-cookieconsent]',
      '[data-cookiebanner]',
      '[data-uc]',
      '[data-ot]',
      '[data-didomi]',
    ].join(',')
  )
    .slice(0, 80)
    .forEach((element) => {
      addUniqueSignal(
        signals,
        `dom:${normalizeCMPText(getElementCMPText(element)).slice(0, 180)}`
      )
    })

  Object.entries(CMP_GLOBALS).forEach(([cmpName, names]) => {
    names.forEach((name) => {
      try {
        if (globalThis[name] !== undefined) {
          addUniqueSignal(signals, `global:${cmpName}:${name}`)
        }
      } catch {
        // Cross-world or page protections can make globals unreadable.
      }
    })
  })

  return signals
}

function scoreCMPFromSignals(cmpName, signals) {
  const keywords =
    CMP_FINGERPRINTS[cmpName] || []
  const normalizedKeywords =
    keywords.map(normalizeCMPText)

  const matchedSignals = []

  signals.forEach((signal) => {
    const normalizedSignal =
      normalizeCMPText(signal)

    if (
      normalizedKeywords.some((keyword) =>
        keyword && normalizedSignal.includes(keyword)
      ) ||
      normalizedSignal.includes(`global ${normalizeCMPText(cmpName)}`)
    ) {
      addUniqueSignal(matchedSignals, signal)
    }
  })

  const confidence =
    Math.min(100, matchedSignals.length * 25)

  return {
    cmpName,
    confidence,
    signals: matchedSignals.slice(0, 10),
  }
}

function detectCMPFingerprint(root = document) {
  const signals =
    collectCMPSignals(root)

  const best =
    Object.keys(CMP_FINGERPRINTS)
      .map((cmpName) => scoreCMPFromSignals(cmpName, signals))
      .sort((first, second) =>
        second.confidence - first.confidence ||
        second.signals.length - first.signals.length
      )[0] || {
        cmpName: 'unknown',
        confidence: 0,
        signals: [],
      }

  if (!best || best.confidence <= 0) {
    return {
      cmpName: 'unknown',
      confidence: 0,
      signals: [],
    }
  }

  return best
}

if (typeof window !== 'undefined') {
  window.AddislineCMPFingerprint = {
    detectCMPFingerprint,
    normalizeCMPText,
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    CMP_FINGERPRINTS,
    detectCMPFingerprint,
    normalizeCMPText,
  }
}
