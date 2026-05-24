const toggleButton =
  document.getElementById(
    'toggleButton'
  )

const status =
  document.getElementById(
    'status'
  )

const siteStatus =
  document.getElementById(
    'siteStatus'
  )

const dnrNotice =
  document.getElementById(
    'dnrNotice'
  )

const bannersHidden =
  document.getElementById(
    'bannersHidden'
  )

const trackersReduced =
  document.getElementById(
    'trackersReduced'
  )

const autoRejects =
  document.getElementById(
    'autoRejects'
  )

const vendorsDenied =
  document.getElementById(
    'vendorsDenied'
  )

const legitimateInterestsDisabled =
  document.getElementById(
    'legitimateInterestsDisabled'
  )

const protectedSites =
  document.getElementById(
    'protectedSites'
  )

const excludedDomainsCount =
  document.getElementById(
    'excludedDomainsCount'
  )

const cookieAuditStatus =
  document.getElementById(
    'cookieAuditStatus'
  )

const cookieAuditList =
  document.getElementById(
    'cookieAuditList'
  )

const protectionMode =
  document.getElementById(
    'protectionMode'
  )

const modeStatus =
  document.getElementById(
    'modeStatus'
  )

const resetStatsButton =
  document.getElementById(
    'resetStatsButton'
  )

const siteToggleButton =
  document.getElementById(
    'siteToggleButton'
  )

const issueType =
  document.getElementById(
    'issueType'
  )

const reportIssueButton =
  document.getElementById(
    'reportIssueButton'
  )

const reportStatus =
  document.getElementById(
    'reportStatus'
  )

const diagnosticGlobal =
  document.getElementById(
    'diagnosticGlobal'
  )

const diagnosticDomain =
  document.getElementById(
    'diagnosticDomain'
  )

const diagnosticSiteState =
  document.getElementById(
    'diagnosticSiteState'
  )

const diagnosticMode =
  document.getElementById(
    'diagnosticMode'
  )

const diagnosticLastAction =
  document.getElementById(
    'diagnosticLastAction'
  )

const diagnosticLastError =
  document.getElementById(
    'diagnosticLastError'
  )

const currentSiteDiagnosticStatus =
  document.getElementById(
    'currentSiteDiagnosticStatus'
  )

const currentSiteDiagnosticState =
  document.getElementById(
    'currentSiteDiagnosticState'
  )

const currentSiteDiagnosticReason =
  document.getElementById(
    'currentSiteDiagnosticReason'
  )

const currentSiteDiagnosticControls =
  document.getElementById(
    'currentSiteDiagnosticControls'
  )

const currentSiteDiagnosticReject =
  document.getElementById(
    'currentSiteDiagnosticReject'
  )

const currentSiteDiagnosticBlocked =
  document.getElementById(
    'currentSiteDiagnosticBlocked'
  )

const accountStatus =
  document.getElementById(
    'accountStatus'
  )

const accountToggleButton =
  document.getElementById(
    'accountToggleButton'
  )

const accountPanel =
  document.getElementById(
    'accountPanel'
  )

const accountForm =
  document.getElementById(
    'accountForm'
  )

const emailInput =
  document.getElementById(
    'emailInput'
  )

const passwordInput =
  document.getElementById(
    'passwordInput'
  )

const authMessage =
  document.getElementById(
    'authMessage'
  )

const loginButton =
  document.getElementById(
    'loginButton'
  )

const openWebButton =
  document.getElementById(
    'openWebButton'
  )

const logoutButton =
  document.getElementById(
    'logoutButton'
  )

const issueReportsList =
  document.getElementById(
    'issueReportsList'
  )

const clearReportsButton =
  document.getElementById(
    'clearReportsButton'
  )

const loadMoreReportsButton =
  document.getElementById(
    'loadMoreReportsButton'
  )

const reportsToggleButton =
  document.getElementById(
    'reportsToggleButton'
  )

const reportsDropdown =
  document.getElementById(
    'reportsDropdown'
  )

const authProtectedSections =
  document.querySelectorAll(
    '.statusPanel, .sitePanel, .diagnosticPanel, .currentSiteDiagnosticPanel, .stats, .cookieAuditPanel, .actions'
  )

const DEV_SHOW_FULL_POPUP_WITHOUT_AUTH =
  true

const DEFAULT_STATE = {
  protectionEnabled: false,
  protectionMode: 'normal',
  cloudSyncEnabled: false,
  excludedDomains: [],
  issueReports: [],
  lastCookieAudit: null,
  currentSiteDiagnostic: null,
  lastAction: '',
  lastError: '',
  stats: {
    bannersHidden: 0,
    trackersReduced: 0,
    autoRejects: 0,
    vendorsDenied: 0,
    legitimateInterestsDisabled: 0,
    protectedSites: 0,
  },
  userId: '',
  email: '',
  displayName: '',
  authStatus: 'disconnected',
  linkedAt: '',
  linkSource: '',
  protectedDomains: [],
}

const EMPTY_STATS = {
  bannersHidden: 0,
  trackersReduced: 0,
  autoRejects: 0,
  vendorsDenied: 0,
  legitimateInterestsDisabled: 0,
  protectedSites: 0,
}

const COOKIE_AUDIT_CATEGORIES = [
  {
    key: 'essentialSessionSecurity',
    label: 'essentialSessionSecurity',
  },
  {
    key: 'consentPreference',
    label: 'consentPreference',
  },
  {
    key: 'analytics',
    label: 'analytics',
  },
  {
    key: 'advertisingMarketing',
    label: 'advertisingMarketing',
  },
  {
    key: 'trackingSocial',
    label: 'trackingSocial',
  },
  {
    key: 'unknown',
    label: 'unknown',
  },
]

let currentDomain =
  ''

let currentDomainScope =
  ''

let currentOrigin =
  ''

let currentTabId =
  null

let reportsExpanded =
  false

let visibleReportCount =
  5

let latestIssueReports =
  []

const REPORTS_PAGE_SIZE =
  5

const CURRENT_SITE_DIAGNOSTIC_TTL_MS =
  10 * 60 * 1000

let accountPanelExpanded =
  false

const ADDISLINE_WEB_URL =
  'https://addisline-sm.web.app'

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

function isIpAddress(domain) {
  return (
    /^\d{1,3}(\.\d{1,3}){3}$/.test(domain) ||
    domain.includes(':')
  )
}

function getDomainScope(domain) {
  const normalizedDomain =
    normalizeDomain(domain)

  if (
    !normalizedDomain ||
    isIpAddress(normalizedDomain)
  ) {
    return normalizedDomain
  }

  const labels =
    normalizedDomain.split('.')

  if (labels.length <= 2) {
    return normalizedDomain
  }

  const secondLevelDomains = [
    'co',
    'com',
    'org',
    'net',
    'gov',
    'edu',
    'ac',
  ]

  const lastLabel =
    labels[labels.length - 1]

  const secondLastLabel =
    labels[labels.length - 2]

  const scopeSize =
    lastLabel.length === 2 &&
    secondLevelDomains.includes(secondLastLabel)
      ? 3
      : 2

  return labels
    .slice(-scopeSize)
    .join('.')
}

function isDomainExcluded(domain, excludedDomains) {
  const normalizedDomain =
    normalizeDomain(domain)

  const domainScope =
    getDomainScope(normalizedDomain)

  return excludedDomains
    .map(normalizeDomain)
    .filter(Boolean)
    .some((excludedDomain) =>
      excludedDomain === normalizedDomain ||
      excludedDomain === domainScope ||
      normalizedDomain.endsWith(
        `.${excludedDomain}`
      )
    )
}

function getStoredDomainValue(entry) {
  return normalizeDomain(
    typeof entry === 'string'
      ? entry
      : entry?.domain
  )
}

function getUniqueDomainCount(entries) {
  return new Set(
    (Array.isArray(entries) ? entries : [])
      .map(getStoredDomainValue)
      .filter(Boolean)
  ).size
}

function getSafeOriginFromUrl(value) {
  if (!value) return ''

  try {
    const parsedUrl =
      new URL(value)

    if (
      parsedUrl.protocol !== 'http:' &&
      parsedUrl.protocol !== 'https:'
    ) {
      return ''
    }

    return `https://${normalizeDomain(parsedUrl.hostname)}`
  } catch {
    return ''
  }
}

function getSafeOriginFromDomain(domain) {
  const normalizedDomain =
    normalizeDomain(domain)

  if (!normalizedDomain) return ''

  return `https://${normalizedDomain}`
}

function normalizeIssueReport(report) {
  if (!report || typeof report !== 'object') {
    return null
  }

  const domain =
    normalizeDomain(report.domain)

  if (!domain) return null

  const date =
    String(
      report.date ||
        report.lastActionAt ||
        report.lastReportedAt ||
        ''
    )

  return {
    ...report,
    domain,
    origin:
      getSafeOriginFromUrl(report.origin) ||
      getSafeOriginFromDomain(domain),
    problemType:
      String(report.problemType || 'other'),
    date,
    lastActionAt:
      String(report.lastActionAt || date || ''),
    actionCount:
      Math.max(1, Number(report.actionCount) || 1),
  }
}

function getReportActivityTime(report) {
  const date =
    new Date(
      report?.lastActionAt ||
        report?.lastRejectAt ||
        report?.date ||
        0
    )

  return Number.isNaN(date.getTime())
    ? 0
    : date.getTime()
}

function getUniqueRecentIssueReports(issueReports) {
  const recordsByDomain =
    new Map()

  ;(Array.isArray(issueReports) ? issueReports : [])
    .map(normalizeIssueReport)
    .filter(Boolean)
    .forEach((report) => {
      const existing =
        recordsByDomain.get(report.domain)
      const actionCount =
        (Number(existing?.actionCount) || 0) +
        (Number(report.actionCount) || 1)

      const latestReport =
        !existing ||
        getReportActivityTime(report) >=
          getReportActivityTime(existing)
          ? {
              ...(existing || {}),
              ...report,
            }
          : {
              ...report,
              ...existing,
            }

      recordsByDomain.set(report.domain, {
        ...latestReport,
        actionCount,
      })
    })

  return Array.from(recordsByDomain.values())
    .sort((first, second) =>
      getReportActivityTime(second) -
      getReportActivityTime(first)
    )
}

async function getCurrentDomain() {
  const tabs =
    await chrome.tabs.query({
      active: true,
      currentWindow: true,
    })

  const url =
    tabs[0]?.url

  currentTabId =
    tabs[0]?.id || null

  if (!url) {
    currentOrigin =
      ''

    return ''
  }

  try {
    const parsedUrl =
      new URL(url)

    if (
      parsedUrl.protocol !== 'http:' &&
      parsedUrl.protocol !== 'https:'
    ) {
      currentOrigin =
        ''

      return ''
    }

    currentOrigin =
      getSafeOriginFromUrl(url)

    return normalizeDomain(
      parsedUrl.hostname
    )
  } catch {
    currentOrigin =
      ''

    return ''
  }
}

function renderState({
  protectionEnabled,
  protectionMode: storedMode,
  excludedDomains,
  protectedDomains,
  stats,
  lastAction,
  lastError,
  issueReports,
  lastCookieAudit,
  currentSiteDiagnostic,
  displayName,
  authStatus,
}) {
  const storedExcludedDomains =
    Array.isArray(excludedDomains)
      ? excludedDomains
      : []

  const normalizedExcludedDomains =
    storedExcludedDomains
      .map(normalizeDomain)
      .filter(Boolean)

  const currentMode =
    storedMode || 'normal'

  const isSiteExcluded =
    Boolean(
      currentDomain &&
        isDomainExcluded(
          currentDomain,
          normalizedExcludedDomains
        )
    )

  status.innerText =
    protectionEnabled && !isSiteExcluded
      ? 'Proteccion activada'
      : 'Proteccion desactivada'

  toggleButton.innerText =
    protectionEnabled
      ? 'Desactivar proteccion'
      : 'Activar proteccion'

  toggleButton.style.background =
    protectionEnabled
      ? '#ef4444'
      : '#22c55e'

  if (currentDomain) {
    siteStatus.innerText =
      isSiteExcluded
        ? `Este sitio está excluido (${currentDomainScope || currentDomain})`
        : protectionEnabled
          ? `Protección activa en este sitio (${currentDomain})`
          : `Protección global desactivada (${currentDomain})`

    siteToggleButton.innerText =
      isSiteExcluded
        ? 'Activar en este sitio'
        : 'Desactivar en este sitio'

    siteToggleButton.disabled =
      false

    reportIssueButton.disabled =
      false

    dnrNotice.innerText =
      isSiteExcluded
        ? 'Nota: el bloqueo de red de anuncios con declarativeNetRequest puede seguir activo en sitios excluidos.'
        : ''
  } else {
    siteStatus.innerText =
      'Sitio actual no disponible'

    siteToggleButton.innerText =
      'Sitio no compatible'

    siteToggleButton.disabled =
      true

    reportIssueButton.disabled =
      true

    dnrNotice.innerText =
      ''
  }

  bannersHidden.innerText =
    String(stats?.bannersHidden || 0)

  trackersReduced.textContent =
    String(stats?.trackersReduced || 0)

  autoRejects.innerText =
    String(stats?.autoRejects || 0)

  vendorsDenied.textContent =
    String(stats?.vendorsDenied || 0)

  legitimateInterestsDisabled.textContent =
    String(stats?.legitimateInterestsDisabled || 0)

  protectedSites.innerText =
    String(
      getUniqueDomainCount(protectedDomains) ||
        stats?.protectedSites ||
        0
    )

  excludedDomainsCount.innerText =
    String(normalizedExcludedDomains.length)

  protectionMode.value =
    currentMode

  modeStatus.innerText =
    `Modo ${getModeLabel(currentMode)}`

  diagnosticGlobal.innerText =
    protectionEnabled
      ? 'Activada'
      : 'Desactivada'

  diagnosticDomain.innerText =
    currentDomain || 'No disponible'

  diagnosticSiteState.innerText =
    currentDomain
      ? isSiteExcluded
        ? 'Excluido'
        : protectionEnabled
          ? 'Protegido'
          : 'Sin proteccion global'
      : 'No disponible'

  diagnosticMode.innerText =
    currentMode

  diagnosticLastAction.innerText =
    getActionLabel(lastAction)

  diagnosticLastError.innerText =
    lastError || 'Sin errores'

  renderCookieAudit(lastCookieAudit)
  renderCurrentSiteDiagnostic(currentSiteDiagnostic)

  const connected = authStatus === 'connected'
  const safeDisplayName =
    String(displayName || '').trim() ||
    'Usuario'

  setAuthProtectedSectionsVisible(connected)

  accountStatus.innerText =
    connected
      ? `Conectado como ${safeDisplayName}`
      : 'No conectado'

  loginButton.hidden = connected
  openWebButton.hidden = false
  logoutButton.hidden = !connected
  accountForm.hidden = connected
  accountToggleButton.classList.toggle(
    'isConnected',
    connected
  )

  authMessage.innerText = ''
  authMessage.className = 'accountMessage'

  if (connected) {
    emailInput.value = ''
    passwordInput.value = ''
  }

  if (
    DEV_SHOW_FULL_POPUP_WITHOUT_AUTH &&
    !connected &&
    !accountPanelExpanded
  ) {
    setAccountPanelExpanded(true)
  }

  renderIssueReports(issueReports)
}

async function loadState() {
  currentDomain =
    await getCurrentDomain()

  currentDomainScope =
    getDomainScope(currentDomain)

  const stored =
    await chrome.storage.local.get(
      DEFAULT_STATE
    )

  const syncedStats =
    await chrome.storage.sync.get({
      stats: EMPTY_STATS,
    })

  renderState({
    ...stored,
    stats: syncedStats.stats || {},
  })
}

function setAccountPanelExpanded(expanded) {
  accountPanelExpanded =
    Boolean(expanded)

  accountPanel.hidden =
    !accountPanelExpanded

  accountToggleButton.setAttribute(
    'aria-expanded',
    accountPanelExpanded
      ? 'true'
      : 'false'
  )

  accountToggleButton.classList.toggle(
    'isOpen',
    accountPanelExpanded
  )
}

function setAuthProtectedSectionsVisible(isConnected) {
  const shouldShowProtectedSections =
    isConnected ||
    DEV_SHOW_FULL_POPUP_WITHOUT_AUTH

  authProtectedSections.forEach((section) => {
    section.hidden =
      !shouldShowProtectedSections
  })
}

accountToggleButton.addEventListener(
  'click',
  () => {
    setAccountPanelExpanded(
      !accountPanelExpanded
    )
  }
)

toggleButton.addEventListener(
  'click',
  async () => {
    const {
      protectionEnabled,
    } =
      await chrome.storage.local.get({
        protectionEnabled: false,
      })

    await chrome.storage.local.set({
      protectionEnabled:
        !protectionEnabled,
    })
  }
)

siteToggleButton.addEventListener(
  'click',
  async () => {
    if (!currentDomain) {
      return
    }

    const {
      excludedDomains,
    } =
      await chrome.storage.local.get({
        excludedDomains: [],
      })

    const storedExcludedDomains =
      Array.isArray(excludedDomains)
        ? excludedDomains
        : []

    const normalizedDomains =
      [
        ...new Set(
          storedExcludedDomains
            .map(normalizeDomain)
            .filter(Boolean)
        ),
      ]

    const isExcluded =
      isDomainExcluded(
        currentDomain,
        normalizedDomains
      )

    const nextDomains =
      isExcluded
        ? normalizedDomains.filter(
            (domain) =>
              !isDomainExcluded(
                currentDomain,
                [domain]
              )
          )
        : [
            ...new Set([
              ...normalizedDomains,
              currentDomainScope ||
                currentDomain,
            ]),
          ]

    await chrome.storage.local.set({
      excludedDomains: nextDomains,
    })

    if (currentTabId) {
      await chrome.tabs
        .sendMessage(currentTabId, {
          type: 'ADDISLINE_EXCLUSION_CHANGED',
          excludedDomains: nextDomains,
        })
        .catch(() => {
          dnrNotice.innerText =
            'Cambio guardado. Recarga la pagina si el sitio ya estaba abierto.'
        })
    }
  }
)

protectionMode.addEventListener(
  'change',
  async () => {
    await chrome.storage.local.set({
      protectionMode:
        protectionMode.value,
    })
  }
)

function isValidEmail(value) {
  return typeof value === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function setAuthMessage(text, type = 'info') {
  authMessage.innerText = text
  authMessage.className = `accountMessage accountMessage--${type}`
}

function getDisplayNameFromEmail(email) {
  const localPart =
    String(email || '')
      .split('@')[0]
      .trim()

  return localPart || 'Usuario'
}

loginButton.addEventListener(
  'click',
  async () => {
    const email = String(emailInput.value || '').trim()
    const password = String(passwordInput.value || '')

    if (!isValidEmail(email)) {
      setAuthMessage('Introduce un email válido.', 'error')
      return
    }

    if (!password) {
      setAuthMessage('La contraseña no puede estar vacía.', 'error')
      return
    }

    await chrome.storage.local.set({
      userId: 'local-test-user',
      email,
      displayName:
        getDisplayNameFromEmail(email),
      authStatus: 'connected',
      linkedAt: new Date().toISOString(),
      linkSource: 'popup',
    })

    passwordInput.value = ''
    setAuthMessage('Sesión iniciada correctamente.', 'success')
  }
)

openWebButton.addEventListener(
  'click',
  async () => {
    await chrome.tabs.create({
      url: ADDISLINE_WEB_URL,
    })
  }
)

logoutButton.addEventListener(
  'click',
  async () => {
    await chrome.storage.local.set({
      userId: '',
      email: '',
      displayName: '',
      authStatus: 'disconnected',
      linkedAt: '',
      linkSource: '',
    })

    emailInput.value = ''
    passwordInput.value = ''
    setAuthMessage('Sesión cerrada.', 'info')
  }
)

resetStatsButton.addEventListener(
  'click',
  async () => {
    await chrome.storage.sync.set({
      stats: EMPTY_STATS,
    })

    await chrome.storage.local.set({
      protectedDomains: [],
    })
  }
)

reportIssueButton.addEventListener(
  'click',
  async () => {
    if (!currentDomain) {
      reportStatus.innerText =
        'No se puede reportar este sitio.'
      return
    }

    const {
      issueReports,
      protectionMode: storedMode,
      cloudSyncEnabled,
    } =
      await chrome.storage.local.get({
        issueReports: [],
        protectionMode: 'normal',
        cloudSyncEnabled: false,
      })

    const reports =
      getUniqueRecentIssueReports(issueReports)
    const domain =
      currentDomainScope ||
      currentDomain
    const now =
      new Date().toISOString()
    const existingReport =
      reports.find((storedReport) =>
        storedReport.domain === domain
      )

    const report = {
      ...(existingReport || {}),
      domain,
      origin:
        currentOrigin ||
        getSafeOriginFromDomain(
          domain
        ),
      problemType:
        issueType.value,
      date:
        now,
      lastActionAt:
        now,
      actionCount:
        (existingReport?.actionCount || 0) + 1,
      protectionMode:
        storedMode || 'normal',
    }

    await chrome.storage.local.set({
      issueReports: [
        report,
        ...reports.filter((storedReport) =>
          storedReport.domain !== domain
        ),
      ].slice(0, 100),
    })

    reportStatus.innerText =
      existingReport
        ? 'Reporte actualizado.'
        : 'Reporte guardado localmente.'

    if (cloudSyncEnabled) {
      sendIssueReportToBackground(report)
    }
  }
)

issueReportsList.addEventListener(
  'click',
  async (event) => {
    const deleteButton =
      event.target.closest?.(
        '[data-report-delete-index]'
      )

    if (deleteButton) {
      const reportDomain =
        normalizeDomain(
          deleteButton.dataset.reportDeleteDomain
        )
      const reportIndex =
        Number.parseInt(
          deleteButton.dataset.reportDeleteIndex,
          10
        )

      if (reportDomain) {
        await removeIssueReportByDomain(reportDomain)
      } else if (Number.isInteger(reportIndex)) {
        await removeIssueReportAtIndex(reportIndex)
      }

      return
    }

    const reportLink =
      event.target.closest?.(
        '[data-report-origin]'
      )

    if (!reportLink) return

    const origin =
      getSafeOriginFromUrl(
        reportLink.dataset.reportOrigin
      ) ||
      getSafeOriginFromDomain(
        reportLink.dataset.reportDomain
      )

    if (!origin) return

    await chrome.tabs.create({
      url: origin,
    })
  }
)

async function removeIssueReportByDomain(reportDomain) {
  const {
    issueReports,
  } =
    await chrome.storage.local.get({
      issueReports: [],
    })

  const reports =
    Array.isArray(issueReports)
      ? issueReports
      : []

  const nextReports =
    reports.filter((report) =>
      normalizeDomain(report?.domain) !== reportDomain
    )

  await chrome.storage.local.set({
    issueReports: nextReports,
  })

  reportStatus.innerText =
    'Reporte eliminado.'

  renderIssueReports(nextReports)
}

async function removeIssueReportAtIndex(reportIndex) {
  const {
    issueReports,
  } =
    await chrome.storage.local.get({
      issueReports: [],
    })

  const reports =
    Array.isArray(issueReports)
      ? issueReports
      : []

  if (
    reportIndex < 0 ||
    reportIndex >= reports.length
  ) {
    return
  }

  const nextReports =
    reports.filter((_, index) =>
      index !== reportIndex
    )

  await chrome.storage.local.set({
    issueReports: nextReports,
  })

  reportStatus.innerText =
    'Reporte eliminado.'

  renderIssueReports(nextReports)
}

clearReportsButton.addEventListener(
  'click',
  async () => {
    await chrome.storage.local.set({
      issueReports: [],
    })

    reportStatus.innerText =
      'Reportes borrados.'
  }
)

reportsToggleButton.addEventListener(
  'click',
  () => {
    reportsExpanded =
      !reportsExpanded

    if (reportsExpanded) {
      visibleReportCount =
        REPORTS_PAGE_SIZE
    }

    updateReportsDisclosure()
    renderIssueReports(latestIssueReports)
  }
)

loadMoreReportsButton.addEventListener(
  'click',
  () => {
    visibleReportCount +=
      REPORTS_PAGE_SIZE

    renderIssueReports(latestIssueReports)
  }
)

chrome.storage.onChanged.addListener(
  (changes, areaName) => {
    if (
      areaName === 'sync' &&
      changes.stats
    ) {
      loadState()
      return
    }

    if (areaName !== 'local') {
      return
    }

    if (
      changes.protectionEnabled ||
      changes.protectionMode ||
      changes.excludedDomains ||
      changes.protectedDomains ||
      changes.lastAction ||
      changes.lastError ||
      changes.lastCookieAudit ||
      changes.currentSiteDiagnostic ||
      changes.issueReports ||
      changes.authStatus ||
      changes.email ||
      changes.displayName ||
      changes.userId ||
      changes.linkedAt ||
      changes.linkSource
    ) {
      loadState()
    }
  }
)

function getModeLabel(mode) {
  if (mode === 'soft') {
    return 'Suave'
  }

  if (mode === 'strict') {
    return 'Estricto'
  }

  return 'Normal'
}

function getActionLabel(action) {
  if (action === 'auto_reject') {
    return 'Rechazo automatico'
  }

  if (action === 'settings_opened') {
    return 'Configuracion abierta'
  }

  if (action === 'banner_hidden') {
    return 'Banner ocultado'
  }

  if (action === 'no_safe_action') {
    return 'Sin accion segura'
  }

  if (action === 'site_excluded') {
    return 'Sitio excluido'
  }

  if (action === 'vendor_denied') {
    return 'Proveedor denegado'
  }

  if (action === 'tracker_reduced') {
    return 'Rastreador reducido'
  }

  if (action === 'legitimate_interest_disabled') {
    return 'Interes legitimo desactivado'
  }

  return 'Sin datos'
}

function renderCookieAudit(audit) {
  const hasAudit =
    audit &&
    typeof audit === 'object' &&
    audit.categories &&
    typeof audit.categories === 'object'

  if (!hasAudit) {
    cookieAuditStatus.innerText =
      'No audit available yet'
    cookieAuditList.innerHTML = ''
    return
  }

  const domain =
    normalizeDomain(audit.domain || '')
  const readableCount =
    Number.isFinite(audit.readableCookieCount)
      ? audit.readableCookieCount
      : 0
  const auditedAt =
    formatReportDate(audit.auditedAt)

  cookieAuditStatus.innerText =
    `${readableCount} readable cookies after last action${domain ? ` on ${domain}` : ''} · ${auditedAt}`

  cookieAuditList.innerHTML =
    COOKIE_AUDIT_CATEGORIES
      .map(({ key, label }) => {
        const count =
          Number.isFinite(audit.categories[key])
            ? audit.categories[key]
            : 0

        return `
          <div>
            <dt>${escapeHtml(label)}</dt>
            <dd>${count}</dd>
          </div>
        `
      })
      .join('')
}

function renderCurrentSiteDiagnostic(diagnostic) {
  const updatedAt =
    new Date(diagnostic?.lastUpdatedAt || 0)
  const diagnosticUrl =
    getSafeOriginFromUrl(diagnostic?.url || '')
  const diagnosticDomain =
    normalizeDomain(diagnostic?.domain)
  const diagnosticMatchesDomain =
    Boolean(
      currentDomain &&
        diagnosticDomain &&
        diagnosticDomain === currentDomain
    )
  const diagnosticMatchesUrl =
    !diagnosticUrl ||
    diagnosticUrl === currentOrigin
  const diagnosticMatchesTab =
    !Number.isInteger(diagnostic?.tabId) ||
    diagnostic.tabId === currentTabId
  const diagnosticIsFresh =
    !Number.isNaN(updatedAt.getTime()) &&
    Date.now() - updatedAt.getTime() <=
      CURRENT_SITE_DIAGNOSTIC_TTL_MS
  const hasDiagnostic =
    diagnostic &&
    typeof diagnostic === 'object' &&
    diagnostic.source === 'content-script' &&
    diagnosticMatchesDomain &&
    diagnosticMatchesUrl &&
    diagnosticMatchesTab &&
    diagnosticIsFresh

  if (!hasDiagnostic) {
    currentSiteDiagnosticStatus.innerText =
      'No current diagnostic yet'
    currentSiteDiagnosticState.innerText =
      'Sin datos'
    currentSiteDiagnosticReason.innerText =
      'Sin datos'
    currentSiteDiagnosticControls.innerText =
      'Sin datos'
    currentSiteDiagnosticReject.innerText =
      'Sin datos'
    currentSiteDiagnosticBlocked.innerText =
      'Sin datos'
    return
  }

  const controls =
    Array.isArray(diagnostic.detectedControls)
      ? diagnostic.detectedControls
          .filter(Boolean)
          .slice(0, 5)
      : []
  const prioritizedRootTexts =
    Array.isArray(diagnostic.prioritizedRootTexts)
      ? diagnostic.prioritizedRootTexts
          .filter(Boolean)
          .slice(0, 3)
      : []
  const iframeInspectionSummaries =
    Array.isArray(diagnostic.iframeInspectionSummaries)
      ? diagnostic.iframeInspectionSummaries
          .slice(0, 2)
      : []
  const iframeInspectionLines =
    iframeInspectionSummaries.flatMap((summary, index) => {
      const controlTexts =
        Array.isArray(summary.iframeControlTexts)
          ? summary.iframeControlTexts
              .filter(Boolean)
              .slice(0, 10)
              .join(' | ')
          : ''

      return [
        `iframe${index + 1}Url: ${String(summary.iframeUrl || 'none').slice(0, 120)}`,
        `iframe${index + 1}Origin: ${String(summary.iframeOrigin || 'none').slice(0, 80)}`,
        `iframe${index + 1}ReadyState: ${String(summary.iframeReadyState || 'none')}`,
        `iframe${index + 1}BodyExists: ${Boolean(summary.iframeBodyExists)}`,
        `iframe${index + 1}ControlCount: ${Math.max(0, Number(summary.iframeControlCount) || 0)}`,
        `iframe${index + 1}Text: ${String(summary.iframeBodyTextPreview || 'none').slice(0, 160)}`,
        `iframe${index + 1}Controls: ${controlTexts || 'none'}`,
      ]
    })
  const prioritizedSummary = [
    `rootTag: ${String(diagnostic.rootTag || 'none')}`,
    `rootReason: ${String(diagnostic.rootReason || 'none')}`,
    `rootClass: ${String(diagnostic.rootClass || 'none').slice(0, 80)}`,
    `excludedAsMarketingPopup: ${Boolean(diagnostic.excludedAsMarketingPopup)}`,
    `prioritizedCmpRootsFound: ${Math.max(0, Number(diagnostic.prioritizedCmpRootsFound) || 0)}`,
    `prioritizedRootControlCount: ${Math.max(0, Number(diagnostic.prioritizedRootControlCount) || 0)}`,
    `cmpModalSignalsDetected: ${Boolean(diagnostic.cmpModalSignalsDetected)}`,
    `modalGeometryMatched: ${Boolean(diagnostic.modalGeometryMatched)}`,
    `explicitRejectControlDetected: ${Boolean(diagnostic.explicitRejectControlDetected)}`,
    `newsletterSignalsDetected: ${Boolean(diagnostic.newsletterSignalsDetected)}`,
    `derivedCmpRootFromControl: ${Boolean(diagnostic.derivedCmpRootFromControl)}`,
    `derivedControlText: ${String(diagnostic.derivedControlText || 'none').slice(0, 80)}`,
    `mainDocumentControlProbeCount: ${Math.max(0, Number(diagnostic.mainDocumentControlProbeCount) || 0)}`,
    `shadowControlProbeCount: ${Math.max(0, Number(diagnostic.shadowControlProbeCount) || 0)}`,
    `accessibleIframeCount: ${Math.max(0, Number(diagnostic.accessibleIframeCount) || 0)}`,
    `inaccessibleIframeCount: ${Math.max(0, Number(diagnostic.inaccessibleIframeCount) || 0)}`,
    `iframeCmpDetected: ${Boolean(diagnostic.iframeCmpDetected)}`,
    `iframeRejectDetected: ${Boolean(diagnostic.iframeRejectDetected)}`,
    `iframeDomain: ${String(diagnostic.iframeDomain || 'none').slice(0, 80)}`,
    `lateHydrationRecheckScheduled: ${Boolean(diagnostic.lateHydrationRecheckScheduled)}`,
    `lateHydrationRecheckRan: ${Boolean(diagnostic.lateHydrationRecheckRan)}`,
    ...(Array.isArray(diagnostic.iframeProbeMatchedControls)
      ? diagnostic.iframeProbeMatchedControls
          .filter(Boolean)
          .slice(0, 3)
          .map((text) => `iframeMatch: ${text}`)
      : []),
    ...iframeInspectionLines,
    ...prioritizedRootTexts.map((text) =>
      `root: ${text}`
    ),
  ]

  currentSiteDiagnosticStatus.innerText =
    diagnostic.lastUpdatedAt
      ? `Actualizado ${formatReportDate(diagnostic.lastUpdatedAt)} · ${diagnostic.lastUpdatedAt}`
      : 'Diagnostico disponible'
  currentSiteDiagnosticState.innerText =
    String(diagnostic.status || 'skipped')
  currentSiteDiagnosticReason.innerText =
    String(diagnostic.reason || 'Sin datos')
  currentSiteDiagnosticControls.innerText =
    [...controls, ...prioritizedSummary].join(', ')
  currentSiteDiagnosticReject.innerText =
    String(diagnostic.matchedRejectText || 'Sin datos')
  currentSiteDiagnosticBlocked.innerText =
    String(diagnostic.blockedReason || 'Sin datos')
}

function renderIssueReports(issueReports) {
  const reports =
    getUniqueRecentIssueReports(issueReports)

  latestIssueReports =
    reports

  const sortedReports =
    reports
      .map((report, index) => ({
        report,
        index,
      }))

  const visibleReports =
    sortedReports.slice(
      0,
      Math.max(
        REPORTS_PAGE_SIZE,
        visibleReportCount
      )
    )

  reportsToggleButton.textContent =
    `REPORTADOS (${reports.length})`

  clearReportsButton.disabled =
    reports.length === 0

  updateReportsDisclosure()

  if (visibleReports.length === 0) {
    issueReportsList.innerHTML =
      '<p class="emptyState">No hay reportes locales.</p>'
    loadMoreReportsButton.hidden =
      true
    return
  }

  issueReportsList.innerHTML =
    visibleReports
      .map(({ report, index }) => `
        <article class="reportItem">
          <div class="reportItemHeader">
            <button
              class="reportDomain"
              type="button"
              data-report-origin="${escapeHtml(report.origin || '')}"
              data-report-domain="${escapeHtml(report.domain || '')}"
            >
              ${escapeHtml(report.domain || 'Dominio no disponible')}
            </button>
            <button
              class="reportDeleteButton"
              type="button"
              data-report-delete-index="${index}"
              data-report-delete-domain="${escapeHtml(report.domain || '')}"
              title="Remove this report"
              aria-label="Remove this report"
            >
              Remove
            </button>
          </div>
          <span>${getIssueTypeLabel(report.problemType)}</span>
          <small>${formatReportDate(report.lastActionAt || report.date)} · ${escapeHtml(report.protectionMode || 'normal')} · ${Math.max(1, Number(report.actionCount) || 1)} actividad(es)</small>
        </article>
      `)
      .join('')

  const remainingReports =
    sortedReports.length - visibleReports.length

  loadMoreReportsButton.hidden =
    remainingReports <= 0

  loadMoreReportsButton.textContent =
    remainingReports > 0
      ? `Mostrar más (${remainingReports})`
      : 'Mostrar más'
}

async function sendIssueReportToBackground(report) {
  try {
    await chrome.runtime.sendMessage({
      type: 'SYNC_ISSUE_REPORT',
      report: {
        domain:
          report.domain,
        issueType:
          report.problemType,
        createdAt:
          report.date,
        protectionMode:
          report.protectionMode,
        extensionVersion:
          chrome.runtime.getManifest().version,
      },
    })
  } catch {
    // Cloud sync is optional; local reporting must keep working.
  }
}

function updateReportsDisclosure() {
  reportsDropdown.hidden =
    !reportsExpanded

  reportsDropdown.classList.toggle(
    'isOpen',
    reportsExpanded
  )

  reportsToggleButton.setAttribute(
    'aria-expanded',
    reportsExpanded ? 'true' : 'false'
  )
}

function getIssueTypeLabel(problemType) {
  if (problemType === 'cookies_not_rejected') {
    return 'No rechaza cookies'
  }

  if (problemType === 'page_blocked_dark') {
    return 'Web queda bloqueada/oscura'
  }

  if (problemType === 'site_disable_failed') {
    return 'Desactivar en este sitio no funciona'
  }

  if (problemType === 'ads_still_visible') {
    return 'Anuncios siguen apareciendo'
  }

  return 'Otro problema'
}

function formatReportDate(value) {
  if (!value) return 'Fecha no disponible'

  const date =
    new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Fecha no disponible'
  }

  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

loadState()
