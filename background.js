const ALLOWED_REPORT_KEYS = [
  'domain',
  'issueType',
  'createdAt',
  'protectionMode',
  'extensionVersion',
]

const BLOCKED_REPORT_KEYS = [
  'url',
  'fullUrl',
  'pageUrl',
  'pageContent',
  'content',
  'history',
  'personalData',
]

const CLOUD_FUNCTIONS_BASE_URL =
  'https://us-central1-addisline-sm.cloudfunctions.net'

const CONSUME_LINK_CODE_URL =
  `${CLOUD_FUNCTIONS_BASE_URL}/consumeExtensionLinkCode`

const SYNC_PROTECTION_EVENTS_URL =
  `${CLOUD_FUNCTIONS_BASE_URL}/syncProtectionEvents`

const PROTECTION_COUNTER_FIELDS = [
  'bannersHidden',
  'trackersReduced',
  'vendorsDenied',
  'legitimateInterestsDisabled',
]

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(
    {
      cloudSyncEnabled: false,
    },
    (stored) => {
      chrome.storage.local.set({
        cloudSyncEnabled: Boolean(stored.cloudSyncEnabled),
      })
    }
  )
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'SYNC_ISSUE_REPORT') {
    handleIssueReportSync(message.report)
      .then(sendResponse)
      .catch(() => {
        sendResponse({
          success: false,
          reason: 'sync_failed',
        })
      })
    return true
  }

  if (message?.type === 'protection_event') {
    handleProtectionEvent(message.payload)
      .then(sendResponse)
      .catch(() => {
        sendResponse({
          success: false,
          reason: 'event_failed',
        })
      })
    return true
  }

  if (message?.type === 'LINK_EXTENSION') {
    handleLinkExtension(message.linkCode)
      .then(sendResponse)
      .catch(() => {
        sendResponse({
          success: false,
          reason: 'link_failed',
        })
      })
    return true
  }

  return false
})

async function handleIssueReportSync(report) {
  const validation =
    validateIssueReport(report)

  if (!validation.valid) {
    return {
      success: false,
      reason: validation.reason,
    }
  }

  const {
    cloudSyncEnabled,
  } =
    await chrome.storage.local.get({
      cloudSyncEnabled: false,
    })

  if (!cloudSyncEnabled) {
    return {
      success: false,
      reason: 'cloud_sync_disabled',
    }
  }

  return syncIssueReport(validation.report)
}

async function syncIssueReport(report) {
  // Future Firebase integration point. Keep this stub local and non-throwing.
  return {
    success: false,
    reason: 'firebase_not_configured',
    report,
  }
}

function validateIssueReport(report) {
  if (
    !report ||
    typeof report !== 'object' ||
    Array.isArray(report)
  ) {
    return {
      valid: false,
      reason: 'invalid_report',
    }
  }

  const keys =
    Object.keys(report)

  if (
    keys.some((key) => BLOCKED_REPORT_KEYS.includes(key))
  ) {
    return {
      valid: false,
      reason: 'blocked_report_field',
    }
  }

  if (
    keys.some((key) => !ALLOWED_REPORT_KEYS.includes(key))
  ) {
    return {
      valid: false,
      reason: 'unexpected_report_field',
    }
  }

  const sanitizedReport = {
    domain: normalizeDomain(report.domain),
    issueType: sanitizeToken(report.issueType),
    createdAt: sanitizeDate(report.createdAt),
    protectionMode: sanitizeProtectionMode(report.protectionMode),
    extensionVersion: sanitizeVersion(report.extensionVersion),
  }

  if (
    !sanitizedReport.domain ||
    !sanitizedReport.issueType ||
    !sanitizedReport.createdAt ||
    !sanitizedReport.protectionMode ||
    !sanitizedReport.extensionVersion
  ) {
    return {
      valid: false,
      reason: 'missing_report_field',
    }
  }

  return {
    valid: true,
    report: sanitizedReport,
  }
}

function normalizeDomain(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')
    .split('/')[0]
    .split(':')[0]
    .replace(/\.$/, '')
    .replace(/^www\./, '')
}

function sanitizeToken(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]/g, '')
    .slice(0, 80)
}

function sanitizeDate(value) {
  const date =
    new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toISOString()
}

function sanitizeProtectionMode(value) {
  const mode =
    sanitizeToken(value)

  if (
    mode === 'soft' ||
    mode === 'normal' ||
    mode === 'strict'
  ) {
    return mode
  }

  return 'normal'
}

function sanitizeVersion(value) {
  return String(value || '')
    .trim()
    .replace(/[^0-9a-zA-Z._-]/g, '')
    .slice(0, 32)
}

async function handleProtectionEvent(payload) {
  const validation = validateProtectionEvent(payload)

  if (!validation.valid) {
    return {
      success: false,
      reason: validation.reason,
    }
  }

  await saveProtectionEvent(validation.event)
  await syncPendingProtectionEvents().catch(() => null)

  return {
    success: true,
  }
}

function validateProtectionEvent(payload) {
  if (
    !payload ||
    typeof payload !== 'object' ||
    Array.isArray(payload)
  ) {
    return {
      valid: false,
      reason: 'invalid_payload',
    }
  }

  const requiredFields = [
    'bannersHidden',
    'trackersReduced',
    'vendorsDenied',
    'legitimateInterestsDisabled',
    'source',
    'timestamp',
  ]

  for (const field of requiredFields) {
    if (!(field in payload)) {
      return {
        valid: false,
        reason: `missing_field_${field}`,
      }
    }
  }
  for (const field of PROTECTION_COUNTER_FIELDS) {
    const value = payload[field]

    if (
      typeof value !== 'number' ||
      !Number.isInteger(value) ||
      value < 0 ||
      value > 500
    ) {
      return {
        valid: false,
        reason: `invalid_counter_${field}`,
      }
    }
  }
  const sanitized = {
    bannersHidden: Math.max(0, Number(payload.bannersHidden) || 0),
    trackersReduced: Math.max(0, Number(payload.trackersReduced) || 0),
    vendorsDenied: Math.max(0, Number(payload.vendorsDenied) || 0),
    legitimateInterestsDisabled: Math.max(0, Number(payload.legitimateInterestsDisabled) || 0),
    source: String(payload.source || '').slice(0, 50),
    timestamp: sanitizeDate(payload.timestamp),
  }

  if (!sanitized.timestamp) {
    return {
      valid: false,
      reason: 'invalid_timestamp',
    }
  }

  return {
    valid: true,
    event: sanitized,
  }
}

async function saveProtectionEvent(event) {
  const stored = await chrome.storage.local.get({
    pendingProtectionEvents: [],
  })

  const events = Array.isArray(stored.pendingProtectionEvents)
    ? stored.pendingProtectionEvents
    : []

  // Limit to 100 events
  if (events.length >= 100) {
    events.shift() // Remove oldest
  }

  events.push(event)

  await chrome.storage.local.set({
    pendingProtectionEvents: events,
  })
}

function aggregateProtectionEvents(events) {
  return events.reduce((aggregate, event) => {
    PROTECTION_COUNTER_FIELDS.forEach((field) => {
      aggregate[field] += Math.max(0, Number(event[field]) || 0)
    })

    return aggregate
  }, {
    bannersHidden: 0,
    trackersReduced: 0,
    vendorsDenied: 0,
    legitimateInterestsDisabled: 0,
  })
}

function hasPositiveProtectionAggregate(aggregate) {
  return PROTECTION_COUNTER_FIELDS.some(
    (field) => aggregate[field] > 0
  )
}

async function postJson(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok || data.success !== true) {
    throw new Error(data.reason || 'request_failed')
  }

  return data
}

async function syncPendingProtectionEvents() {
  const stored = await chrome.storage.local.get({
    authStatus: 'disconnected',
    extensionSessionToken: '',
    pendingProtectionEvents: [],
  })

  if (
    stored.authStatus !== 'connected' ||
    !stored.extensionSessionToken
  ) {
    return {
      success: false,
      reason: 'extension_not_connected',
    }
  }

  const pendingEvents = Array.isArray(stored.pendingProtectionEvents)
    ? stored.pendingProtectionEvents
    : []

  if (pendingEvents.length === 0) {
    return {
      success: true,
      syncedEventCount: 0,
    }
  }

  const eventsToSync = pendingEvents.slice(0, 100)
  const aggregate = aggregateProtectionEvents(eventsToSync)

  if (!hasPositiveProtectionAggregate(aggregate)) {
    return {
      success: false,
      reason: 'empty_aggregate_preserved',
    }
  }

  const result = await postJson(SYNC_PROTECTION_EVENTS_URL, {
    extensionSessionToken: stored.extensionSessionToken,
    aggregate,
    eventCount: eventsToSync.length,
  })

  const latest = await chrome.storage.local.get({
    pendingProtectionEvents: [],
  })

  const latestEvents = Array.isArray(latest.pendingProtectionEvents)
    ? latest.pendingProtectionEvents
    : []

  await chrome.storage.local.set({
    pendingProtectionEvents: latestEvents.slice(eventsToSync.length),
    lastProtectionSyncAt: new Date().toISOString(),
    lastProtectionSyncError: '',
  })

  return result
}

async function handleLinkExtension(linkCode) {
  // Validate linkCode format
  if (
    !linkCode ||
    typeof linkCode !== 'string' ||
    linkCode.length < 16 ||
    linkCode.length > 24 ||
    !/^[a-zA-Z0-9_-]+$/.test(linkCode)
  ) {
    return {
      success: false,
      reason: 'invalid_link_code',
    }
  }

  const linkResult = await postJson(CONSUME_LINK_CODE_URL, {
    linkCode,
  })

  await chrome.storage.local.set({
    userId: linkResult.userId,
    email: '',
    displayName: linkResult.displayName || 'Usuario',
    authStatus: 'connected',
    linkedAt: new Date().toISOString(),
    linkSource: 'web-link-code',
    extensionSessionToken: linkResult.extensionSessionToken,
  })

  await syncPendingProtectionEvents().catch(async (error) => {
    await chrome.storage.local.set({
      lastProtectionSyncError: error.message || 'sync_failed',
    })
  })

  return {
    success: true,
  }
}
