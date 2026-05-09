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
