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

const currentSiteDiagnosticClassification =
  document.getElementById(
    'currentSiteDiagnosticClassification'
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

const currentSiteDiagnosticVerification =
  document.getElementById(
    'currentSiteDiagnosticVerification'
  )

const currentSiteDiagnosticFundingChoices =
  document.getElementById(
    'currentSiteDiagnosticFundingChoices'
  )

const currentSiteDiagnosticRejectCandidates =
  document.getElementById(
    'currentSiteDiagnosticRejectCandidates'
  )

const currentSiteDiagnosticDirectControls =
  document.getElementById(
    'currentSiteDiagnosticDirectControls'
  )

const currentSiteDiagnosticCookieTextMatches =
  document.getElementById(
    'currentSiteDiagnosticCookieTextMatches'
  )

const currentSiteDiagnosticDomScope =
  document.getElementById(
    'currentSiteDiagnosticDomScope'
  )

const currentSiteDiagnosticBottomBanner =
  document.getElementById(
    'currentSiteDiagnosticBottomBanner'
  )

const currentSiteDiagnosticExperimentalBottomProbe =
  document.getElementById(
    'currentSiteDiagnosticExperimentalBottomProbe'
  )

const currentSiteDiagnosticIframeAccess =
  document.getElementById(
    'currentSiteDiagnosticIframeAccess'
  )

const currentSiteDiagnosticLateSnapshot =
  document.getElementById(
    'currentSiteDiagnosticLateSnapshot'
  )

const currentSiteDiagnosticTrace =
  document.getElementById(
    'currentSiteDiagnosticTrace'
  )

const copyDiagnosticButton =
  document.getElementById(
    'copyDiagnosticButton'
  )

const copyDiagnosticStatus =
  document.getElementById(
    'copyDiagnosticStatus'
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

let latestCurrentSiteDiagnostic =
  null

const REPORTS_PAGE_SIZE =
  5

const CURRENT_SITE_DIAGNOSTIC_TTL_MS =
  10 * 60 * 1000

const DIAGNOSTIC_COPY_SECTION_LIMIT =
  1800

const DIAGNOSTIC_COPY_TOTAL_LIMIT =
  120000

let accountPanelExpanded =
  false

let copyDiagnosticStatusTimer =
  null

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

async function loadState({
  refreshFundingChoices = false,
} = {}) {
  currentDomain =
    await getCurrentDomain()

  currentDomainScope =
    getDomainScope(currentDomain)

  if (refreshFundingChoices) {
    await requestFundingChoicesDiagnosticRefresh()
  }

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

function getBoundedElementText(element, fallback = 'Sin datos') {
  const text =
    String(element?.innerText || '').trim() ||
    fallback

  if (text.length <= DIAGNOSTIC_COPY_SECTION_LIMIT) {
    return text
  }

  return `${text.slice(0, DIAGNOSTIC_COPY_SECTION_LIMIT)}...`
}

function buildDiagnosticCopyReport() {
  const sections = [
    [
      'Updated',
      getBoundedElementText(
        currentSiteDiagnosticStatus,
        'No current diagnostic yet'
      ),
    ],
    [
      'Status',
      getBoundedElementText(currentSiteDiagnosticState),
    ],
    [
      'Classification',
      getBoundedElementText(
        currentSiteDiagnosticClassification
      ),
    ],
    [
      'Reason',
      getBoundedElementText(currentSiteDiagnosticReason),
    ],
    [
      'Matched reject',
      getBoundedElementText(currentSiteDiagnosticReject),
    ],
    [
      'Blocked reason',
      getBoundedElementText(currentSiteDiagnosticBlocked),
    ],
    [
      'Verification diagnostics',
      getBoundedElementText(
        currentSiteDiagnosticVerification
      ),
    ],
    [
      'Provider state ownership probe',
      formatProviderStateOwnershipCopySection(
        latestCurrentSiteDiagnostic
      ),
    ],
    [
      'Funding Choices global state',
      formatFundingChoicesGlobalStateCopySection(
        latestCurrentSiteDiagnostic
      ),
    ],
    [
      'Funding Choices controls',
      getBoundedElementText(
        currentSiteDiagnosticFundingChoices
      ),
    ],
    [
      'Detected controls summary',
      getBoundedElementText(currentSiteDiagnosticControls),
    ],
    [
      'Reject candidates',
      getBoundedElementText(
        currentSiteDiagnosticRejectCandidates
      ),
    ],
    [
      'Direct controls summary',
      getBoundedElementText(
        currentSiteDiagnosticDirectControls
      ),
    ],
    [
      'Cookie text matches summary',
      getBoundedElementText(
        currentSiteDiagnosticCookieTextMatches
      ),
    ],
    [
      'DOM scope',
      getBoundedElementText(currentSiteDiagnosticDomScope),
    ],
    [
      'Bottom banner',
      getBoundedElementText(
        currentSiteDiagnosticBottomBanner
      ),
    ],
    [
      'Experimental bottom probe',
      getBoundedElementText(
        currentSiteDiagnosticExperimentalBottomProbe
      ),
    ],
    [
      'Iframe access',
      getBoundedElementText(
        currentSiteDiagnosticIframeAccess
      ),
    ],
    [
      'Late snapshot',
      getBoundedElementText(
        currentSiteDiagnosticLateSnapshot
      ),
    ],
    [
      'Decision trace',
      getBoundedElementText(currentSiteDiagnosticTrace),
    ],
  ]

  const report = sections
    .map(([label, value]) => `${label}:\n${value}`)
    .join('\n\n')

  if (report.length <= DIAGNOSTIC_COPY_TOTAL_LIMIT) {
    return report
  }

  return `${report.slice(0, DIAGNOSTIC_COPY_TOTAL_LIMIT)}...`
}

async function requestFundingChoicesDiagnosticRefresh() {
  if (!currentTabId) {
    return false
  }

  try {
    const response =
      await chrome.tabs.sendMessage(currentTabId, {
        type: 'ADDISLINE_REFRESH_FC_DIAGNOSTICS',
      })

    return Boolean(response?.success)
  } catch {
    return false
  }
}

function waitForDiagnosticCopyDelay(delayMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, delayMs)
  })
}

async function waitForProviderStateOwnershipProbeForCopy(timeoutMs = 2600) {
  const startedAt =
    Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    const stored =
      await chrome.storage.local.get({
        currentSiteDiagnostic: null,
      })
    const probe =
      stored.currentSiteDiagnostic
        ?.fundingChoicesControlDiagnostics
        ?.providerStateOwnership
    const storageProbe =
      stored.currentSiteDiagnostic
        ?.fundingChoicesControlDiagnostics
        ?.providerStorageWrites

    if (
      (
        !probe ||
        typeof probe !== 'object' ||
        !probe.running ||
        probe.ariaProbeCompleted ||
        probe.completed
      ) &&
      (
        !storageProbe ||
        typeof storageProbe !== 'object' ||
        !storageProbe.running ||
        storageProbe.completed
      )
    ) {
      return
    }

    await waitForDiagnosticCopyDelay(120)
  }
}

async function copyTextToClipboard(text) {
  if (
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'
  ) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textArea =
    document.createElement('textarea')
  textArea.value = text
  textArea.setAttribute('readonly', '')
  textArea.style.position = 'fixed'
  textArea.style.left = '-9999px'
  textArea.style.top = '0'
  document.body.appendChild(textArea)
  textArea.select()

  try {
    const copied =
      document.execCommand('copy')

    if (!copied) {
      throw new Error('copy command failed')
    }
  } finally {
    document.body.removeChild(textArea)
  }
}

function setCopyDiagnosticStatus(text, type = 'info') {
  if (copyDiagnosticStatusTimer) {
    clearTimeout(copyDiagnosticStatusTimer)
  }

  copyDiagnosticStatus.innerText = text
  copyDiagnosticStatus.classList.toggle(
    'diagnosticCopyStatus--error',
    type === 'error'
  )

  copyDiagnosticStatusTimer =
    setTimeout(() => {
      copyDiagnosticStatus.innerText = ''
      copyDiagnosticStatus.classList.remove(
        'diagnosticCopyStatus--error'
      )
    }, 1800)
}

accountToggleButton.addEventListener(
  'click',
  () => {
    setAccountPanelExpanded(
      !accountPanelExpanded
    )
  }
)

copyDiagnosticButton.addEventListener(
  'click',
  async () => {
    try {
      await requestFundingChoicesDiagnosticRefresh()
      await waitForProviderStateOwnershipProbeForCopy()
      await loadState()
      await copyTextToClipboard(
        buildDiagnosticCopyReport()
      )
      setCopyDiagnosticStatus('Copied')
    } catch (error) {
      setCopyDiagnosticStatus(
        'Copy failed',
        'error'
      )
    }
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

function formatCurrentSiteDecisionTrace(decisionTrace) {
  if (!decisionTrace || typeof decisionTrace !== 'object') {
    return 'Sin datos'
  }

  const steps =
    Array.isArray(decisionTrace.steps)
      ? decisionTrace.steps
          .filter((step) => step && typeof step === 'object')
          .slice(0, 14)
      : []
  const summary = [
    `source: ${String(decisionTrace.source || 'unknown').slice(0, 40)}`,
    `scanCount: ${Math.max(0, Number(decisionTrace.scanCount) || 0)}`,
    `mutationScanCount: ${Math.max(0, Number(decisionTrace.mutationScanCount) || 0)}`,
    `elapsedMs: ${Math.max(0, Number(decisionTrace.elapsedMs) || 0)}`,
  ]

  if (steps.length === 0) {
    return summary.join(', ')
  }

  const stepLines =
    steps.map((step, index) => {
      const parts = [
        `${index + 1}. ${String(step.strategy || 'unknown').slice(0, 60)}`,
        String(step.status || 'ran').slice(0, 24),
        `found:${Math.max(0, Number(step.found) || 0)}`,
        `scanned:${Math.max(0, Number(step.scanned) || 0)}`,
        `elapsed:${Math.max(0, Number(step.elapsedMs) || 0)}ms`,
      ]
      const reason =
        String(step.reason || '').slice(0, 80)

      if (reason) {
        parts.push(`reason:${reason}`)
      }

      return parts.join(' | ')
    })

  return [
    summary.join(', '),
    ...stepLines,
  ].join('\n')
}

function formatScanLifecycleTimeoutTrace(trace) {
  if (!trace || typeof trace !== 'object') {
    return ''
  }

  return [
    'scanLifecycleTimeoutTrace:',
    `url: ${String(trace.url || 'none').slice(0, 180)}`,
    `readyState: ${String(trace.readyState || 'none').slice(0, 40)}`,
    `elapsedSinceContentScriptStartMs: ${Math.max(0, Number(trace.elapsedSinceContentScriptStartMs) || 0)}`,
    `fcRootSelectorExists: ${Boolean(trace.fcRootSelectorExists)}`,
    `fcConsentRootExists: ${Boolean(trace.fcConsentRootExists)}`,
    `fundingChoicesTextHintExists: ${Boolean(trace.fundingChoicesTextHintExists)}`,
    `mutationScanCount: ${Math.max(0, Number(trace.mutationScanCount) || 0)}`,
    `lastScanState: ${String(trace.lastScanState || 'none').slice(0, 80)}`,
    `lastScanReason: ${String(trace.lastScanReason || 'none').slice(0, 120)}`,
  ].join('\n')
}

function formatCurrentSiteRejectCandidates(candidates) {
  const safeCandidates =
    Array.isArray(candidates)
      ? candidates
          .filter((candidate) =>
            candidate && typeof candidate === 'object'
          )
          .slice(0, 5)
      : []

  if (safeCandidates.length === 0) {
    return 'Sin datos'
  }

  return safeCandidates
    .map((candidate, index) => {
      const matchedBy =
        Array.isArray(candidate.matchedBy)
          ? candidate.matchedBy
              .filter(Boolean)
              .slice(0, 5)
              .join('|')
          : ''
      const rejectedBy =
        Array.isArray(candidate.rejectedBy)
          ? candidate.rejectedBy
              .filter(Boolean)
              .slice(0, 8)
              .join('|')
          : ''
      const parts = [
        `${index + 1}. ${String(candidate.source || 'unknown').slice(0, 40)}`,
        String(candidate.text || 'no text').slice(0, 80),
        `visible:${Boolean(candidate.visible)}`,
        `disabled:${String(candidate.disabledState || 'unknown').slice(0, 20)}`,
        `container:${Boolean(candidate.containerFound)}`,
        `containerPotential:${Boolean(candidate.containerPotential)}`,
        `matched:${matchedBy || 'none'}`,
        `rejected:${rejectedBy || 'none'}`,
        `scores:${Math.max(0, Number(candidate.rejectAllScore) || 0)}/${Math.max(0, Number(candidate.essentialOnlyScore) || 0)}/${Math.max(0, Number(candidate.legacyRejectScore) || 0)}`,
      ]
      const blockReason =
        String(candidate.blockReason || '').slice(0, 80)

      if (blockReason) {
        parts.push(`block:${blockReason}`)
      }

      return parts.join(' | ')
    })
    .join('\n')
}

function formatDirectControlLine(control, index) {
  const role =
    String(control.role || '').slice(0, 32)
  const type =
    String(control.type || '').slice(0, 32)
  const kind =
    [
      String(control.tagName || 'unknown').slice(0, 20),
      role ? `role:${role}` : '',
      type ? `type:${type}` : '',
    ]
      .filter(Boolean)
      .join(' ')
  const parts = [
    `${index + 1}. #${Math.max(0, Number(control.index) || 0)} ${kind}`,
    String(control.text || 'no text').slice(0, 80),
    `visible:${Boolean(control.visible)}`,
    `disabled:${Boolean(control.disabled)}`,
    `cookie:${Boolean(control.cookieIntent)}`,
    `reject:${Boolean(control.rejectIntent)}`,
    `settings:${Boolean(control.settingsIntent)}`,
    `accept:${Boolean(control.acceptIntent)}`,
  ]
  const blockReason =
    String(control.blockReason || '').slice(0, 80)
  const visibility =
    control.visibilityDiagnostics &&
    typeof control.visibilityDiagnostics === 'object'
      ? control.visibilityDiagnostics
      : null

  if (blockReason) {
    parts.push(`block:${blockReason}`)
  }
  if (visibility) {
    parts.push(
      `rect:${Math.round(Number(visibility.x) || 0)},${Math.round(Number(visibility.y) || 0)},${Math.round(Number(visibility.width) || 0)}x${Math.round(Number(visibility.height) || 0)}`
    )
    parts.push(
      `style:${String(visibility.display || '').slice(0, 16)}/${String(visibility.visibility || '').slice(0, 16)}/${String(visibility.opacity || '').slice(0, 8)}`
    )
    parts.push(`intersect:${Boolean(visibility.viewportIntersecting)}`)
    parts.push(`ariaHidden:${String(visibility.ariaHidden || 'none').slice(0, 12)}`)
    parts.push(`offsetParent:${Boolean(visibility.offsetParentExists)}`)
    parts.push(`visibilityReason:${String(visibility.finalReason || 'unknown').slice(0, 40)}`)
  }

  return parts.join(' | ')
}

function getDirectControlGroupLines(label, controls) {
  const safeControls =
    Array.isArray(controls)
      ? controls
          .filter((control) =>
            control && typeof control === 'object'
          )
          .slice(0, 5)
      : []

  if (safeControls.length === 0) {
    return [`${label}: none`]
  }

  return [
    `${label}:`,
    ...safeControls.map(formatDirectControlLine),
  ]
}

function formatCurrentSiteDirectControls(summary) {
  if (!summary || typeof summary !== 'object') {
    return 'Sin datos'
  }

  const lines = [
    [
      `totalScanned: ${Math.max(0, Number(summary.totalScanned) || 0)}`,
      `cookieLikeCount: ${Math.max(0, Number(summary.cookieLikeCount) || 0)}`,
      `rejectIntentCount: ${Math.max(0, Number(summary.rejectIntentCount) || 0)}`,
      `settingsIntentCount: ${Math.max(0, Number(summary.settingsIntentCount) || 0)}`,
      `acceptIntentCount: ${Math.max(0, Number(summary.acceptIntentCount) || 0)}`,
      `visibleCount: ${Math.max(0, Number(summary.visibleCount) || 0)}`,
      `invisibleCount: ${Math.max(0, Number(summary.invisibleCount) || 0)}`,
    ].join(', '),
    ...getDirectControlGroupLines(
      'intentControls',
      summary.intentControls
    ),
    ...getDirectControlGroupLines(
      'visibleControls',
      summary.visibleControls
    ),
    ...getDirectControlGroupLines(
      'invisibleControls',
      summary.invisibleControls
    ),
  ]

  return lines.join('\n')
}

function formatCurrentSiteCookieTextMatches(summary) {
  if (!summary || typeof summary !== 'object') {
    return 'Sin datos'
  }

  const matches =
    Array.isArray(summary.matches)
      ? summary.matches
          .filter((match) =>
            match && typeof match === 'object'
          )
          .slice(0, 10)
      : []
  const domains =
    Array.isArray(summary.inaccessibleIframeDomains)
      ? summary.inaccessibleIframeDomains
          .filter(Boolean)
          .slice(0, 2)
          .join('|')
      : ''
  const lines = [
    [
      `totalMatches: ${Math.max(0, Number(summary.totalMatches) || 0)}`,
      `nodesVisited: ${Math.max(0, Number(summary.nodesVisited) || 0)}`,
      `main:${Boolean(summary.mainDocumentMatched)}`,
      `shadowRoots:${Math.max(0, Number(summary.shadowRootCount) || 0)}`,
      `shadow:${Boolean(summary.shadowMatched)}`,
      `iframes:${Math.max(0, Number(summary.accessibleIframeCount) || 0)}`,
      `iframe:${Boolean(summary.iframeMatched)}`,
      `inaccessibleIframes:${Math.max(0, Number(summary.inaccessibleIframeCount) || 0)}`,
      `domains:${domains || 'none'}`,
    ].join(', '),
  ]

  if (matches.length === 0) {
    lines.push('matches: none')
    return lines.join('\n')
  }

  lines.push('matches:')
  matches.forEach((match, index) => {
    lines.push([
      `${index + 1}. ${String(match.scope || 'unknown').slice(0, 24)}`,
      String(match.tagName || 'unknown').slice(0, 20),
      String(match.text || 'no text').slice(0, 100),
      `visible:${Boolean(match.visible)}`,
      `clickable:${String(match.nearestClickableAncestorTag || 'none').slice(0, 20)}`,
    ].join(' | '))
  })

  return lines.join('\n')
}

function formatCurrentSiteDomScope(summary) {
  if (!summary || typeof summary !== 'object') {
    return 'Sin datos'
  }

  const fixedSamples =
    Array.isArray(summary.topVisibleFixedStickyElements)
      ? summary.topVisibleFixedStickyElements
          .filter((sample) =>
            sample && typeof sample === 'object'
          )
          .slice(0, 5)
      : []
  const domains =
    Array.isArray(summary.iframeDomains)
      ? summary.iframeDomains
          .filter(Boolean)
          .slice(0, 2)
          .join('|')
      : ''
  const lines = [
    [
      `bodyTextLength: ${Math.max(0, Number(summary.bodyTextLength) || 0)}`,
      `elementsScanned: ${Math.max(0, Number(summary.elementsScanned) || 0)}`,
      `fixedStickyScanned: ${Math.max(0, Number(summary.fixedStickyScannedCount) || 0)}`,
      `visibleFixedSticky: ${Math.max(0, Number(summary.visibleFixedStickyCount) || 0)}`,
      `openShadowRoots: ${Math.max(0, Number(summary.openShadowRootCount) || 0)}`,
      `iframeCount: ${Math.max(0, Number(summary.iframeCount) || 0)}`,
      `iframeDomains: ${domains || 'none'}`,
    ].join(', '),
  ]

  if (fixedSamples.length === 0) {
    lines.push('topVisibleFixedSticky: none')
    return lines.join('\n')
  }

  lines.push('topVisibleFixedSticky:')
  fixedSamples.forEach((sample, index) => {
    lines.push([
      `${index + 1}. ${String(sample.tagName || 'unknown').slice(0, 20)}`,
      `z:${Math.round(Number(sample.zIndex) || 0)}`,
      `pos:${String(sample.position || 'unknown').slice(0, 20)}`,
      `rect:${Math.round(Number(sample.x) || 0)},${Math.round(Number(sample.y) || 0)},${Math.round(Number(sample.width) || 0)}x${Math.round(Number(sample.height) || 0)}`,
      `cookieText:${Boolean(sample.cookieText)}`,
      String(sample.text || 'no text').slice(0, 80),
    ].join(' | '))
  })

  return lines.join('\n')
}

function formatCurrentSiteBottomBanner(summary) {
  if (!summary || typeof summary !== 'object') {
    return 'Sin datos'
  }

  const candidates =
    Array.isArray(summary.candidates)
      ? summary.candidates
          .filter((candidate) =>
            candidate && typeof candidate === 'object'
          )
          .slice(0, 5)
      : []
  const lines = [
    `candidateCount: ${Math.max(0, Number(summary.candidateCount) || 0)}`,
  ]

  if (candidates.length === 0) {
    lines.push('candidates: none')
    return lines.join('\n')
  }

  lines.push('candidates:')
  candidates.forEach((candidate, index) => {
    const controls =
      Array.isArray(candidate.controlTexts)
        ? candidate.controlTexts
            .filter(Boolean)
            .slice(0, 5)
            .join('|')
        : ''

    lines.push([
      `${index + 1}. ${String(candidate.tagName || 'unknown').slice(0, 20)}`,
      `pos:${String(candidate.position || 'unknown').slice(0, 20)}`,
      `z:${Math.round(Number(candidate.zIndex) || 0)}`,
      `rect:${Math.round(Number(candidate.x) || 0)},${Math.round(Number(candidate.y) || 0)},${Math.round(Number(candidate.width) || 0)}x${Math.round(Number(candidate.height) || 0)}`,
      `bottom:${Math.round(Number(candidate.viewportBottomDistance) || 0)}`,
      `cookie:${Boolean(candidate.cookieTextSignal)}`,
      `reject:${Boolean(candidate.rejectTextSignal)}`,
      `settings:${Boolean(candidate.settingsTextSignal)}`,
      `accept:${Boolean(candidate.acceptTextSignal)}`,
      `controls:${controls || 'none'}`,
      String(candidate.text || 'no text').slice(0, 100),
    ].join(' | '))
  })

  return lines.join('\n')
}

function formatExperimentalBottomProbe(summary) {
  if (!summary || typeof summary !== 'object') {
    return 'Sin datos'
  }

  const candidates =
    Array.isArray(summary.candidates)
      ? summary.candidates
          .filter((candidate) =>
            candidate && typeof candidate === 'object'
          )
          .slice(0, 5)
      : []
  const lines = [
    [
      `ran: ${Boolean(summary.ran)}`,
      `candidateCount: ${Math.max(0, Number(summary.candidateCount) || 0)}`,
    ].join(', '),
  ]

  if (candidates.length === 0) {
    lines.push('candidates: none')
    return lines.join('\n')
  }

  lines.push('candidates:')
  candidates.forEach((candidate, index) => {
    const controls =
      Array.isArray(candidate.controls)
        ? candidate.controls
            .filter((control) =>
              control && typeof control === 'object'
            )
            .slice(0, 5)
            .map((control) =>
              [
                String(control.tagName || 'unknown').slice(0, 12),
                String(control.text || 'no text').slice(0, 40),
                `r:${Boolean(control.reject)}`,
                `a:${Boolean(control.accept)}`,
                `s:${Boolean(control.settings)}`,
                `c:${Boolean(control.cookie)}`,
              ].join('/')
            )
            .join('|')
        : ''

    lines.push([
      `${index + 1}. ${String(candidate.tagName || 'unknown').slice(0, 20)}`,
      `pos:${String(candidate.position || 'unknown').slice(0, 20)}`,
      `z:${Math.round(Number(candidate.zIndex) || 0)}`,
      `rect:${Math.round(Number(candidate.x) || 0)},${Math.round(Number(candidate.y) || 0)},${Math.round(Number(candidate.width) || 0)}x${Math.round(Number(candidate.height) || 0)}`,
      `bottom:${Math.round(Number(candidate.bottomDistance) || 0)}`,
      `cookie:${Boolean(candidate.cookie)}`,
      `reject:${Boolean(candidate.reject)}`,
      `accept:${Boolean(candidate.accept)}`,
      `settings:${Boolean(candidate.settings)}`,
      `controls:${controls || 'none'}`,
      String(candidate.text || 'no text').slice(0, 100),
    ].join(' | '))
  })

  return lines.join('\n')
}

function formatCurrentSiteIframeAccess(summary) {
  if (!summary || typeof summary !== 'object') {
    return 'Sin datos'
  }

  const iframes =
    Array.isArray(summary.iframes)
      ? summary.iframes
          .filter((iframe) =>
            iframe && typeof iframe === 'object'
          )
          .slice(0, 5)
      : []
  const lines = [
    `iframeCount: ${Math.max(0, Number(summary.iframeCount) || 0)}`,
  ]

  if (iframes.length === 0) {
    lines.push('iframes: none')
    return lines.join('\n')
  }

  lines.push('iframes:')
  iframes.forEach((iframe, index) => {
    lines.push([
      `${index + 1}. #${Math.max(0, Number(iframe.index) || 0)}`,
      `domain:${String(iframe.domain || 'none').slice(0, 80)}`,
      `accessible:${Boolean(iframe.accessible)}`,
      `failure:${String(iframe.accessFailureType || 'none').slice(0, 80)}`,
      `visible:${Boolean(iframe.visible)}`,
      `meaningful:${Boolean(iframe.meaningfulVisible)}`,
      `rect:${Math.max(0, Number(iframe.width) || 0)}x${Math.max(0, Number(iframe.height) || 0)}`,
      `bodyText:${Boolean(iframe.bodyTextExists)}`,
      `cookieText:${Boolean(iframe.cookieTextExists)}`,
      `src:${String(iframe.src || 'none').slice(0, 100)}`,
    ].join(' | '))
  })

  return lines.join('\n')
}

function formatCurrentSiteLateSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') {
    return 'Sin datos'
  }

  const samples =
    Array.isArray(snapshot.samples)
      ? snapshot.samples
          .filter((sample) =>
            sample && typeof sample === 'object'
          )
          .slice(0, 5)
      : []
  const domains =
    Array.isArray(snapshot.inaccessibleIframeDomains)
      ? snapshot.inaccessibleIframeDomains
          .filter(Boolean)
          .slice(0, 2)
          .join('|')
      : ''
  const lines = [
    [
      `reason: ${String(snapshot.reason || 'unknown').slice(0, 80)}`,
      `scheduled: ${Boolean(snapshot.scheduled)}`,
      `ran: ${Boolean(snapshot.ran)}`,
      `delayedMs: ${Math.max(0, Number(snapshot.delayedMs) || 0)}`,
      `capturedAt: ${String(snapshot.capturedAt || 'unknown').slice(0, 40)}`,
      `cookieTextAppeared: ${Boolean(snapshot.cookieTextAppeared)}`,
      `textMatchCount: ${Math.max(0, Number(snapshot.textMatchCount) || 0)}`,
      `visibleClickableControlsCount: ${Math.max(0, Number(snapshot.visibleClickableControlsCount) || 0)}`,
      `cookieLikeDirectControlsCount: ${Math.max(0, Number(snapshot.cookieLikeDirectControlsCount) || 0)}`,
      `rejectLikeDirectControlsCount: ${Math.max(0, Number(snapshot.rejectLikeDirectControlsCount) || 0)}`,
      `accessibleIframeCount: ${Math.max(0, Number(snapshot.accessibleIframeCount) || 0)}`,
      `inaccessibleIframeCount: ${Math.max(0, Number(snapshot.inaccessibleIframeCount) || 0)}`,
      `domains: ${domains || 'none'}`,
    ].join(', '),
  ]

  if (samples.length === 0) {
    const error =
      String(snapshot.error || '').slice(0, 120)
    if (error) {
      lines.push(`error: ${error}`)
    }
    lines.push('samples: none')
    return lines.join('\n')
  }

  lines.push('samples:')
  samples.forEach((sample, index) => {
    if (sample.type === 'control') {
      lines.push([
        `${index + 1}. control`,
        String(sample.tagName || 'unknown').slice(0, 24),
        String(sample.text || 'no text').slice(0, 100),
        `visible:${Boolean(sample.visible)}`,
        `cookie:${Boolean(sample.cookieIntent)}`,
        `reject:${Boolean(sample.rejectIntent)}`,
        `settings:${Boolean(sample.settingsIntent)}`,
        `accept:${Boolean(sample.acceptIntent)}`,
      ].join(' | '))
      return
    }

    lines.push([
      `${index + 1}. text`,
      String(sample.scope || 'unknown').slice(0, 24),
      String(sample.tagName || 'unknown').slice(0, 24),
      String(sample.text || 'no text').slice(0, 100),
      `visible:${Boolean(sample.visible)}`,
      `clickable:${String(sample.nearestClickableAncestorTag || 'none').slice(0, 24)}`,
    ].join(' | '))
  })

  return lines.join('\n')
}

function formatDiagnosticRect(rect) {
  if (!rect || typeof rect !== 'object') {
    return 'none'
  }

  return [
    Math.round(Number(rect.x) || 0),
    Math.round(Number(rect.y) || 0),
    `${Math.round(Number(rect.width) || 0)}x${Math.round(Number(rect.height) || 0)}`,
  ].join(',')
}

function formatDiagnosticStyle(style) {
  if (!style || typeof style !== 'object') {
    return 'none'
  }

  return [
    String(style.display || '').slice(0, 16) || 'none',
    String(style.visibility || '').slice(0, 16) || 'none',
    String(style.opacity || '').slice(0, 8) || 'none',
    String(style.pointerEvents || '').slice(0, 16) || 'none',
    String(style.position || '').slice(0, 16) || 'none',
    `z:${String(style.zIndex || '').slice(0, 12) || 'none'}`,
  ].join('/')
}

function formatDiagnosticVisibility(visibility) {
  if (!visibility || typeof visibility !== 'object') {
    return 'none'
  }

  return [
    `visible:${Boolean(visibility.finalVisible)}`,
    `reason:${String(visibility.finalReason || 'unknown').slice(0, 40)}`,
    `rect:${formatDiagnosticRect(visibility)}`,
    `style:${String(visibility.display || '').slice(0, 12)}/${String(visibility.visibility || '').slice(0, 12)}/${String(visibility.opacity || '').slice(0, 8)}`,
    `intersect:${Boolean(visibility.viewportIntersecting)}`,
    `offsetParent:${Boolean(visibility.offsetParentExists)}`,
  ].join(', ')
}

function formatDiagnosticDataAttributes(dataAttributes) {
  if (!dataAttributes || typeof dataAttributes !== 'object') {
    return 'none'
  }

  const entries =
    Object.entries(dataAttributes)
      .filter(([key]) =>
        String(key || '').startsWith('data-')
      )
      .slice(0, 8)

  if (entries.length === 0) {
    return 'none'
  }

  return entries
    .map(([key, value]) =>
      `${String(key || '').slice(0, 50)}:${String(value || '').slice(0, 80)}`
    )
    .join('|')
}

function formatDiagnosticPrefixedAttributes(attributes, prefix) {
  if (!attributes || typeof attributes !== 'object') {
    return 'none'
  }

  const normalizedPrefix =
    String(prefix || '').toLowerCase()
  const entries =
    Object.entries(attributes)
      .filter(([key]) =>
        String(key || '').toLowerCase().startsWith(normalizedPrefix)
      )
      .slice(0, 8)

  if (entries.length === 0) {
    return 'none'
  }

  return entries
    .map(([key, value]) =>
      `${String(key || '').slice(0, 50)}:${String(value || '').slice(0, 80)}`
    )
    .join('|')
}

function formatProviderDiagnosticAllAttributes(label, attrs) {
  if (!attrs || typeof attrs !== 'object') {
    return `${label}: none`
  }

  return [
    `${label}:`,
    `tag:${String(attrs.tagName || 'none').slice(0, 30)}`,
    `id:${String(attrs.id || 'none').slice(0, 80)}`,
    `name:${String(attrs.name || 'none').slice(0, 80)}`,
    `value:${String(attrs.value || 'none').slice(0, 80)}`,
    `role:${String(attrs.role || 'none').slice(0, 40)}`,
    `class:${String(attrs.class || 'none').slice(0, 100)}`,
    `data:${formatDiagnosticPrefixedAttributes(attrs.dataAttributes, 'data-')}`,
    `aria:${formatDiagnosticPrefixedAttributes(attrs.ariaAttributes, 'aria-')}`,
  ].join(', ')
}

function formatProviderStateSnapshot(label, snapshot) {
  if (!snapshot || typeof snapshot !== 'object') {
    return `${label}: none`
  }

  return [
    `${label}:`,
    `checked:${Boolean(snapshot.checked)}`,
    `ariaPressed:${String(snapshot.ariaPressed || 'none').slice(0, 30)}`,
    `ariaChecked:${String(snapshot.ariaChecked || 'none').slice(0, 30)}`,
    `activeState:${String(snapshot.activeState || 'none').slice(0, 30)}`,
    `activeDetected:${Boolean(snapshot.activeDetected)}`,
    `visualChanged:${Boolean(snapshot.visualChangedFromOriginal)}`,
    `activeChanged:${Boolean(snapshot.activeDetectionChangedFromOriginal)}`,
  ].join(', ')
}

function formatProviderAttributeMutationProbe(label, probe) {
  if (!probe || typeof probe !== 'object') {
    return `${label}: none`
  }

  return [
    [
      `${label}:`,
      `mutation:${String(probe.mutation || 'none').slice(0, 100)}`,
      `restoredAfter500ms:${Boolean(probe.restoredAfter500ms)}`,
      `visualChangedAfter500ms:${Boolean(probe.visualChangedAfter500ms)}`,
      `activeDetectionChangedAfter500ms:${Boolean(probe.activeDetectionChangedAfter500ms)}`,
      `error:${String(probe.error || 'none').slice(0, 120)}`,
      `restoreError:${String(probe.restoreError || 'none').slice(0, 120)}`,
    ].join(', '),
    formatProviderStateSnapshot(`${label}.original`, probe.original),
    formatProviderStateSnapshot(`${label}.immediate`, probe.immediate),
    formatProviderStateSnapshot(`${label}.requestAnimationFrame`, probe.raf),
    formatProviderStateSnapshot(`${label}.after100ms`, probe.after100ms),
    formatProviderStateSnapshot(`${label}.after500ms`, probe.after500ms),
    formatProviderStateSnapshot(
      `${label}.restoredOriginalAfterProbe`,
      probe.restoredOriginalAfterProbe
    ),
  ].join('\n')
}

function formatProviderManualToggleSnapshot(label, snapshot) {
  if (!snapshot || typeof snapshot !== 'object') {
    return `${label}: none`
  }

  const classList =
    Array.isArray(snapshot.classList) && snapshot.classList.length > 0
      ? snapshot.classList.join('|')
      : 'none'
  const parentRowClassList =
    Array.isArray(snapshot.parentRowClassList) &&
    snapshot.parentRowClassList.length > 0
      ? snapshot.parentRowClassList.join('|')
      : 'none'

  return [
    `${label}:`,
    `checked:${Boolean(snapshot.checked)}`,
    `ariaPressed:${String(snapshot.ariaPressed || 'none').slice(0, 30)}`,
    `ariaChecked:${String(snapshot.ariaChecked || 'none').slice(0, 30)}`,
    `activeDetected:${Boolean(snapshot.activeDetected)}`,
    `classList:${String(classList).slice(0, 220)}`,
    `parentRowClassList:${String(parentRowClassList).slice(0, 220)}`,
  ].join(', ')
}

function formatProviderManualMutationNode(node) {
  if (!node || typeof node !== 'object') {
    return 'none'
  }

  return [
    String(node.tagName || `node${Number(node.nodeType) || 0}`).slice(0, 24),
    `id:${String(node.id || 'none').slice(0, 40)}`,
    `class:${String(node.class || 'none').slice(0, 80)}`,
    `ariaPressed:${String(node.ariaPressed || 'none').slice(0, 20)}`,
    `ariaChecked:${String(node.ariaChecked || 'none').slice(0, 20)}`,
    `text:${String(node.text || 'none').slice(0, 50)}`,
  ].join(' ')
}

function formatProviderManualMutation(mutation, index) {
  if (!mutation || typeof mutation !== 'object') {
    return `manualMutation${index + 1}: none`
  }

  const added =
    Array.isArray(mutation.addedNodes) && mutation.addedNodes.length > 0
      ? mutation.addedNodes.map(formatProviderManualMutationNode).join(' || ')
      : 'none'
  const removed =
    Array.isArray(mutation.removedNodes) && mutation.removedNodes.length > 0
      ? mutation.removedNodes.map(formatProviderManualMutationNode).join(' || ')
      : 'none'

  return [
    `manualMutation${index + 1}:`,
    `type:${String(mutation.type || 'none').slice(0, 30)}`,
    `target:${formatProviderManualMutationNode(mutation.target)}`,
    `attribute:${String(mutation.attributeName || 'none').slice(0, 50)}`,
    `old:${String(mutation.oldValue || 'none').slice(0, 80)}`,
    `new:${String(mutation.newValue || 'none').slice(0, 80)}`,
    `added:${String(added).slice(0, 180)}`,
    `removed:${String(removed).slice(0, 180)}`,
  ].join(', ')
}

function formatProviderManualToggleInspection(inspection) {
  if (!inspection || typeof inspection !== 'object') {
    return 'providerManualToggleInspection: none'
  }

  const mutations =
    Array.isArray(inspection.mutations)
      ? inspection.mutations
      : []

  return [
    [
      'providerManualToggleInspection:',
      `signature:${String(inspection.signature || 'none').slice(0, 120)}`,
      `mode:${String(inspection.mode || 'none').slice(0, 60)}`,
      `running:${Boolean(inspection.running)}`,
      `completed:${Boolean(inspection.completed)}`,
      `mutationCount:${Math.max(0, Number(inspection.mutationCount) || 0)}`,
      `attributeChanges:${Math.max(0, Number(inspection.attributeChangeCount) || 0)}`,
      `childNodeChanges:${Math.max(0, Number(inspection.childListChangeCount) || 0)}`,
      `rowConnectedBefore:${Boolean(inspection.rowConnectedBefore)}`,
      `inputConnectedBefore:${Boolean(inspection.inputConnectedBefore)}`,
      `rowConnectedAfter:${Boolean(inspection.rowConnectedAfter)}`,
      `inputConnectedAfter:${Boolean(inspection.inputConnectedAfter)}`,
      `capturedAt:${String(inspection.capturedAt || 'none').slice(0, 40)}`,
      `error:${String(inspection.error || 'none').slice(0, 120)}`,
    ].join(', '),
    formatProviderManualToggleSnapshot('manualBefore', inspection.before),
    formatProviderManualToggleSnapshot('manualAfter', inspection.after),
    ...(mutations.length > 0
      ? mutations.map(formatProviderManualMutation)
      : ['manualMutations: none']),
  ].join('\n')
}

function formatProviderDatasetValues(datasetValues) {
  if (!datasetValues || typeof datasetValues !== 'object') {
    return 'none'
  }

  const entries =
    Object.entries(datasetValues)
      .slice(0, 8)

  if (entries.length === 0) {
    return 'none'
  }

  return entries
    .map(([key, value]) =>
      `${String(key || '').slice(0, 50)}:${String(value || '').slice(0, 80)}`
    )
    .join('|')
}

function formatProviderKeyList(values) {
  const keys =
    Array.isArray(values)
      ? values
          .filter(Boolean)
          .slice(0, 8)
      : []

  return keys.length > 0
    ? keys.map((value) => String(value || '').slice(0, 80)).join('|')
    : 'none'
}

function formatProviderOwnerElement(label, owner) {
  if (!owner || typeof owner !== 'object') {
    return `${label}: none`
  }

  return [
    `${label}:`,
    `tag:${String(owner.tagName || 'none').slice(0, 30)}`,
    `id:${String(owner.id || 'none').slice(0, 70)}`,
    `role:${String(owner.role || 'none').slice(0, 30)}`,
    `class:${String(owner.class || 'none').slice(0, 80)}`,
    `reactFiber:${formatProviderKeyList(owner.reactFiberKeys)}`,
    `reactProps:${formatProviderKeyList(owner.reactPropsKeys)}`,
    `angular:${formatProviderKeyList(owner.angularKeys)}`,
    `ownProps:${formatProviderKeyList(owner.ownPropertyNames)}`,
    `dataset:${formatProviderDatasetValues(owner.datasetValues)}`,
  ].join(', ')
}

function formatProviderOwnerDiagnostics(ownerDiagnostics) {
  if (!ownerDiagnostics || typeof ownerDiagnostics !== 'object') {
    return 'providerOwnerDiagnostics: none'
  }

  return [
    'providerOwnerDiagnostics:',
    formatProviderOwnerElement('owner.input', ownerDiagnostics.input),
    formatProviderOwnerElement('owner.label', ownerDiagnostics.label),
    formatProviderOwnerElement('owner.slider', ownerDiagnostics.slider),
    formatProviderOwnerElement('owner.row', ownerDiagnostics.row),
    formatProviderOwnerElement(
      'owner.componentRoot',
      ownerDiagnostics.componentRoot
    ),
  ].join('\n')
}

function formatProviderStorageSnapshot(label, snapshot) {
  if (!snapshot || typeof snapshot !== 'object') {
    return `${label}: none`
  }

  return [
    `${label}:`,
    `available:${Boolean(snapshot.available)}`,
    `count:${Math.max(0, Number(snapshot.count) || 0)}`,
    `truncated:${Boolean(snapshot.truncated)}`,
    `error:${String(snapshot.error || 'none').slice(0, 80)}`,
  ].join(', ')
}

function formatProviderStorageWrites(label, writes) {
  const entries =
    Array.isArray(writes)
      ? writes
          .filter((entry) => entry && typeof entry === 'object')
          .slice(0, 8)
      : []

  if (entries.length === 0) {
    return `${label}: none`
  }

  return [
    `${label}:`,
    ...entries.map((entry, index) =>
      [
        `${index + 1}. ${String(entry.type || 'changed').slice(0, 20)}`,
        `key:${String(entry.key || 'none').slice(0, 90)}`,
        `before:${String(entry.before || '').slice(0, 60)}`,
        `after:${String(entry.after || '').slice(0, 60)}`,
      ].join(' | ')
    ),
  ].join('\n')
}

function formatProviderStorageDiagnostics(storageDiagnostic) {
  if (!storageDiagnostic || typeof storageDiagnostic !== 'object') {
    return 'providerStorageWrites: none'
  }

  return [
    [
      'providerStorageWrites:',
      `method:${String(storageDiagnostic.method || 'none').slice(0, 60)}`,
      `running:${Boolean(storageDiagnostic.running)}`,
      `completed:${Boolean(storageDiagnostic.completed)}`,
      `error:${String(storageDiagnostic.error || 'none').slice(0, 80)}`,
    ].join(', '),
    formatProviderStorageSnapshot(
      'localStorageBefore',
      storageDiagnostic.localStorageBefore
    ),
    formatProviderStorageSnapshot(
      'localStorageAfter',
      storageDiagnostic.localStorageAfter
    ),
    formatProviderStorageWrites(
      'localStorageWrites',
      storageDiagnostic.localStorageWrites
    ),
    formatProviderStorageSnapshot(
      'sessionStorageBefore',
      storageDiagnostic.sessionStorageBefore
    ),
    formatProviderStorageSnapshot(
      'sessionStorageAfter',
      storageDiagnostic.sessionStorageAfter
    ),
    formatProviderStorageWrites(
      'sessionStorageWrites',
      storageDiagnostic.sessionStorageWrites
    ),
  ].join('\n')
}

function formatFundingChoicesGlobalObject(globalObject) {
  if (!globalObject || typeof globalObject !== 'object') {
    return 'globalObject: none'
  }

  return [
    `${String(globalObject.scope || 'window').slice(0, 30)}.${String(globalObject.name || 'unknown').slice(0, 80)}:`,
    `exists:${Boolean(globalObject.exists)}`,
    `type:${String(globalObject.type || 'undefined').slice(0, 30)}`,
    `keys:${formatProviderKeyList(globalObject.enumerableKeys)}`,
    `value:${String(globalObject.valuePreview || 'none').slice(0, 80)}`,
    `error:${String(globalObject.error || globalObject.keyReadError || 'none').slice(0, 80)}`,
  ].join(', ')
}

function formatFundingChoicesMessageHints(hints) {
  const entries =
    Array.isArray(hints)
      ? hints
          .filter((hint) => hint && typeof hint === 'object')
          .slice(0, 8)
      : []

  if (entries.length === 0) {
    return 'messageListenerHints: none'
  }

  return [
    'messageListenerHints:',
    ...entries.map((hint, index) =>
      [
        `${index + 1}. type:${String(hint.type || 'unknown').slice(0, 30)}`,
        `consent:${Boolean(hint.consentRelated)}`,
        `detail:${String(hint.detail || 'none').slice(0, 140)}`,
      ].join(' | ')
    ),
  ].join('\n')
}

function formatFundingChoicesVisibleIframes(iframes) {
  const entries =
    Array.isArray(iframes)
      ? iframes
          .filter((iframe) => iframe && typeof iframe === 'object')
          .slice(0, 12)
      : []

  if (entries.length === 0) {
    return 'visibleIframes: none'
  }

  return [
    'visibleIframes:',
    ...entries.map((iframe, index) =>
      [
        `${index + 1}. origin:${String(iframe.origin || 'none').slice(0, 90)}`,
        `title:${String(iframe.title || 'none').slice(0, 80)}`,
        `sandbox:${String(iframe.sandbox || 'none').slice(0, 100)}`,
        `rect:${Math.max(0, Number(iframe.rectWidth) || 0)}x${Math.max(0, Number(iframe.rectHeight) || 0)}`,
        `src:${String(iframe.src || 'none').slice(0, 140)}`,
      ].join(' | ')
    ),
  ].join('\n')
}

function formatFundingChoicesNestedMessageSchema(nestedSchema) {
  const entries =
    Array.isArray(nestedSchema)
      ? nestedSchema
          .filter((entry) => entry && typeof entry === 'object')
          .slice(0, 6)
      : []

  if (entries.length === 0) {
    return 'nested:none'
  }

  return entries
    .map((entry) =>
      `${String(entry.key || 'unknown').slice(0, 50)}(${String(entry.type || 'unknown').slice(0, 20)}):${formatProviderKeyList(entry.keys)}`
    )
    .join(';')
}

function formatFundingChoicesMessageTraffic(messages) {
  const entries =
    Array.isArray(messages)
      ? messages
          .filter((message) => message && typeof message === 'object')
          .slice(0, 12)
      : []

  if (entries.length === 0) {
    return 'messageTraffic: none'
  }

  return [
    'messageTraffic:',
    ...entries.map((message, index) =>
      [
        `${index + 1}. origin:${String(message.origin || 'none').slice(0, 90)}`,
        `dataType:${String(message.dataType || 'unknown').slice(0, 30)}`,
        `typeKeys:${formatProviderKeyList(message.typeKeys)}`,
        `schema:${formatProviderKeyList(message.schemaKeys)}`,
        formatFundingChoicesNestedMessageSchema(message.nestedSchema),
      ].join(' | ')
    ),
  ].join('\n')
}

function formatFundingChoicesVendor11Mapping(mapping) {
  if (!mapping || typeof mapping !== 'object') {
    return 'providerVendor11Mapping: none'
  }

  const tcData =
    mapping.globalTcData && typeof mapping.globalTcData === 'object'
      ? mapping.globalTcData
      : null

  return [
    [
      'providerVendor11Mapping:',
      `found:${Boolean(mapping.found)}`,
      `aria:${String(mapping.ariaLabel || 'none').slice(0, 100)}`,
      `row:${String(mapping.rowText || 'none').slice(0, 140)}`,
    ].join(', '),
    formatProviderDiagnosticAllAttributes('vendor11InputAttrs', mapping.inputAttrs),
    formatProviderDiagnosticAllAttributes('vendor11RowAttrs', mapping.rowAttrs),
    tcData
      ? [
          'vendor11TcData:',
          `vendorConsents:${String(tcData.vendorConsents || 'none').slice(0, 40)}`,
          `vendorLI:${String(tcData.vendorLegitimateInterests || 'none').slice(0, 40)}`,
          `purposeConsentKeys:${formatProviderKeyList(tcData.purposeConsentKeys)}`,
          `purposeLIKeys:${formatProviderKeyList(tcData.purposeLegitimateInterestKeys)}`,
          `error:${String(tcData.error || 'none').slice(0, 80)}`,
        ].join(', ')
      : 'vendor11TcData: none',
  ].join('\n')
}

function formatFundingChoicesNetworkEntry(entry, index) {
  return [
    `${index + 1}. phase:${String(entry.phase || 'unknown').slice(0, 60)}`,
    `channel:${String(entry.channel || 'unknown').slice(0, 40)}`,
    `method:${String(entry.method || 'none').slice(0, 20)}`,
    `status:${Math.max(0, Number(entry.status) || 0)}`,
    `durationMs:${Math.max(0, Number(entry.durationMs) || 0)}`,
    `startTime:${Math.max(0, Number(entry.startTime) || 0)}`,
    entry.errorName
      ? `error:${String(entry.errorName || '').slice(0, 80)}`
      : 'error:none',
    `url:${String(entry.url || 'none').slice(0, 300)}`,
  ].join(' | ')
}

function formatFundingChoicesNetworkActivity(networkActivity) {
  if (!networkActivity || typeof networkActivity !== 'object') {
    return 'networkActivity: none'
  }

  const entries =
    Array.isArray(networkActivity.entries)
      ? networkActivity.entries
          .filter((entry) => entry && typeof entry === 'object')
          .slice(0, 24)
      : []

  return [
    [
      'networkActivity:',
      `installed:${Boolean(networkActivity.installed)}`,
      `phase:${String(networkActivity.phase || 'none').slice(0, 60)}`,
      `filters:${formatProviderKeyList(networkActivity.filterTokens)}`,
      `count:${entries.length}`,
    ].join(', '),
    entries.length > 0
      ? [
          'networkActivityEntries:',
          ...entries.map(formatFundingChoicesNetworkEntry),
        ].join('\n')
      : 'networkActivityEntries: none',
  ].join('\n')
}

function formatFundingChoicesGlobalStateCopySection(diagnostic) {
  const summary =
    diagnostic?.fundingChoicesControlDiagnostics
  const globalState =
    summary?.fundingChoicesGlobalState &&
    typeof summary.fundingChoicesGlobalState === 'object'
      ? summary.fundingChoicesGlobalState
      : null

  if (!globalState) {
    return 'fundingChoicesGlobalState: none'
  }

  const globalObjects =
    Array.isArray(globalState.globalObjects)
      ? globalState.globalObjects
          .filter((entry) => entry && typeof entry === 'object')
          .slice(0, 12)
      : []

  return [
    [
      'fundingChoicesGlobalState:',
      `__tcfapi:${Boolean(globalState.tcfapiExists)}`,
      `__cmp:${Boolean(globalState.cmpExists)}`,
      `googlefc:${Boolean(globalState.googlefcExists)}`,
      `messageConsentHints:${Boolean(globalState.messageListenerConsentRelated)}`,
      `messageListenerInstalled:${Boolean(globalState.messageTrafficListenerInstalled)}`,
      `addEventListener:${String(globalState.addEventListenerType || 'none').slice(0, 30)}`,
      `onmessage:${String(globalState.onmessageType || 'none').slice(0, 30)}`,
      `names:${formatProviderKeyList(globalState.globalObjectNames)}`,
    ].join(', '),
    globalObjects.length > 0
      ? [
          'globalObjects:',
          ...globalObjects.map(formatFundingChoicesGlobalObject),
        ].join('\n')
      : 'globalObjects: none',
    formatFundingChoicesMessageHints(
      globalState.messageListenerConsentHints
    ),
    formatFundingChoicesVisibleIframes(
      globalState.visibleIframes
    ),
    formatFundingChoicesMessageTraffic(
      globalState.messageTraffic
    ),
    formatFundingChoicesNetworkActivity(
      globalState.networkActivity
    ),
    formatFundingChoicesVendor11Mapping(
      globalState.providerVendor11Mapping
    ),
  ].join('\n')
}

function getProviderDiagnosticsExported(summary) {
  return Boolean(
    summary &&
    typeof summary === 'object' &&
    'providerPhaseBlockedReason' in summary &&
    'providerPhaseGuardState' in summary &&
    'providerLabelCoordinateInvocationState' in summary
  )
}

function formatProviderDiagnosticsExportSummary(summary) {
  const guardState =
    summary?.providerPhaseGuardState &&
    typeof summary.providerPhaseGuardState === 'object'
      ? summary.providerPhaseGuardState
      : null

  return [
    `providerDiagnosticsExported:${getProviderDiagnosticsExported(summary)}`,
    `providerPhaseBlockedReason:${String(summary?.providerPhaseBlockedReason || 'none').slice(0, 80)}`,
    `providerLabelCoordinateInvocationState:${String(summary?.providerLabelCoordinateInvocationState || 'none').slice(0, 40)}`,
    `providerAutomationGuardReason:${String(summary?.providerAutomationGuardReason || 'none').slice(0, 120)}`,
    `providerPhaseGuardState:attempted:${Boolean(guardState?.attempted)} running:${Boolean(guardState?.running)} preferencesOpen:${Boolean(guardState?.preferencesOpen)} activeProviderCount:${Math.max(0, Number(guardState?.activeProviderCount) || 0)} panelVerified:${Boolean(guardState?.panelVerified)} providerAutomationEnabled:${Boolean(guardState?.providerAutomationEnabled)}`,
  ].join(', ')
}

function formatProviderPressedDiagnostic(label, summary) {
  const diagnostic =
    summary && typeof summary === 'object'
      ? summary
      : null

  return [
    `${label}:`,
    `found:${Boolean(diagnostic?.found)}`,
    `pressed:${Boolean(diagnostic?.pressed)}`,
    `data-id:${String(diagnostic?.dataId || 'none').slice(0, 80)}`,
    `aria-label:${String(diagnostic?.ariaLabel || 'none').slice(0, 120)}`,
    `aria-pressed:${String(diagnostic?.ariaPressed || 'none').slice(0, 40)}`,
    `class:${String(diagnostic?.class || 'none').slice(0, 120)}`,
  ].join(' ')
}

function formatProviderCountBreakdown(summary) {
  const breakdown =
    summary && typeof summary === 'object'
      ? summary
      : null

  return [
    'providerCountBreakdown:',
    `activeLegitimateInterestCount:${Math.max(0, Number(breakdown?.activeLegitimateInterestCount) || 0)}`,
    `activeConsentCount:${Math.max(0, Number(breakdown?.activeConsentCount) || 0)}`,
    `activeOtherProviderCount:${Math.max(0, Number(breakdown?.activeOtherProviderCount) || 0)}`,
    `totalActiveProviderInputCount:${Math.max(0, Number(breakdown?.totalActiveProviderInputCount) || 0)}`,
    `providerActiveFoundCount:${Math.max(0, Number(breakdown?.providerActiveFoundCount) || 0)}`,
    `activeProviderToggleCount:${Math.max(0, Number(breakdown?.activeProviderToggleCount) || 0)}`,
    `providerActiveFoundCountSource:${String(breakdown?.providerActiveFoundCountSource || 'none').slice(0, 60)}`,
    `activeProviderToggleCountSource:${String(breakdown?.activeProviderToggleCountSource || 'none').slice(0, 60)}`,
    `providerActiveFoundCountMatchesTotal:${Boolean(breakdown?.providerActiveFoundCountMatchesTotal)}`,
    `activeProviderToggleCountMatchesTotal:${Boolean(breakdown?.activeProviderToggleCountMatchesTotal)}`,
    `firstActiveProviderDataId:${String(breakdown?.firstActiveProviderDataId || 'none').slice(0, 80)}`,
  ].join(' ')
}

function formatProviderCountSource(label, source) {
  const summary =
    source && typeof source === 'object'
      ? source
      : null

  return [
    `${label}:`,
    `selector:${String(summary?.selectorUsed || 'none').slice(0, 220)}`,
    `selectedSource:${String(summary?.selectedSource || 'none').slice(0, 80)}`,
    `activeCondition:${String(summary?.activeConditionUsed || 'none').slice(0, 140)}`,
    `selectedInputCount:${Math.max(0, Number(summary?.selectedInputCount) || 0)}`,
    `activeCountResult:${Math.max(0, Number(summary?.activeCountResult) || 0)}`,
    `storedResult:${Math.max(0, Number(summary?.storedResult) || 0)}`,
    `countResult:${Math.max(0, Number(summary?.countResult) || 0)}`,
    `metricPath:${String(summary?.metricPath || 'none').slice(0, 140)}`,
  ].join(' ')
}

function formatProviderCountSources(summary) {
  const sources =
    summary && typeof summary === 'object'
      ? summary
      : null

  return [
    'providerCountSources:',
    formatProviderCountSource(
      'activeProviderCount',
      sources?.activeProviderCount
    ),
    formatProviderCountSource(
      'providerActiveFoundCount',
      sources?.providerActiveFoundCount
    ),
    formatProviderCountSource(
      'activeProviderToggleCount',
      sources?.activeProviderToggleCount
    ),
  ].join('\n')
}

function formatProviderActiveEvaluation(evaluation, index) {
  const summary =
    evaluation && typeof evaluation === 'object'
      ? evaluation
      : null

  return [
    `${index + 1}. ${String(summary?.key || 'provider').slice(0, 80)}`,
    `data-id:${String(summary?.dataId || 'none').slice(0, 80)}`,
    `selectorMatched:${Boolean(summary?.selectorMatched)}`,
    `inSelectedCountSet:${Boolean(summary?.inSelectedCountSet)}`,
    `checked:${Boolean(summary?.checked)}`,
    `ariaPressed:${String(summary?.ariaPressed || 'none').slice(0, 40)}`,
    `countedAsActive:${Boolean(summary?.countedAsActive)}`,
    `reason:${String(summary?.reason || 'none').slice(0, 100)}`,
    `class:${String(summary?.class || 'none').slice(0, 100)}`,
  ].join(' ')
}

function formatProviderFirstThreeActiveEvaluations(evaluations) {
  const entries =
    Array.isArray(evaluations)
      ? evaluations
          .filter((entry) =>
            entry && typeof entry === 'object'
          )
          .slice(0, 3)
      : []

  if (entries.length === 0) {
    return 'providerFirstThreeActiveEvaluations: none'
  }

  return [
    'providerFirstThreeActiveEvaluations:',
    ...entries.map(formatProviderActiveEvaluation),
  ].join('\n')
}

function formatProviderStateOwnershipCopySection(diagnostic) {
  const summary =
    diagnostic?.fundingChoicesControlDiagnostics

  if (!summary || typeof summary !== 'object') {
    return 'Sin datos'
  }

  const stateOwnership =
    summary.providerStateOwnership &&
    typeof summary.providerStateOwnership === 'object'
      ? summary.providerStateOwnership
      : null

  if (!stateOwnership) {
    return [
      'providerStateOwnership: none',
      formatProviderDiagnosticsExportSummary(summary),
    ].join('\n')
  }

  return [
    formatProviderDiagnosticsExportSummary(summary),
    [
      'providerStateOwnership:',
      `signature:${String(stateOwnership.signature || 'none').slice(0, 120)}`,
      `mutation:${String(stateOwnership.mutation || 'none').slice(0, 80)}`,
      `running:${Boolean(stateOwnership.running)}`,
      `completed:${Boolean(stateOwnership.completed)}`,
      `ariaProbeCompleted:${Boolean(stateOwnership.ariaProbeCompleted)}`,
      `originalCheckedAttribute:${String(stateOwnership.originalCheckedAttribute || 'none').slice(0, 40)}`,
      `checkedRestoredAfter500ms:${Boolean(stateOwnership.checkedRestoredAfter500ms)}`,
      `ariaPressedRestoredAfter500ms:${Boolean(stateOwnership.ariaPressedRestoredAfter500ms)}`,
      `ariaCheckedRestoredAfter500ms:${Boolean(stateOwnership.ariaCheckedRestoredAfter500ms)}`,
      `error:${String(stateOwnership.error || 'none').slice(0, 120)}`,
    ].join(', '),
    formatProviderOwnerDiagnostics(
      stateOwnership.ownerDiagnostics ||
        summary.providerFirstActiveOwnerDiagnostics
    ),
    formatProviderStateSnapshot('original', stateOwnership.original),
    formatProviderStateSnapshot('immediate', stateOwnership.immediate),
    formatProviderStateSnapshot('requestAnimationFrame', stateOwnership.raf),
    formatProviderStateSnapshot('after100ms', stateOwnership.after100ms),
    formatProviderStateSnapshot('after500ms', stateOwnership.after500ms),
    formatProviderStateSnapshot(
      'restoredOriginalAfterProbe',
      stateOwnership.restoredOriginalAfterProbe
    ),
    formatProviderStateSnapshot(
      'restoredOriginalAfterAriaProbe',
      stateOwnership.restoredOriginalAfterAriaProbe
    ),
    formatProviderAttributeMutationProbe(
      'ariaPressedSetFalse',
      stateOwnership.ariaPressedSetFalse
    ),
    formatProviderAttributeMutationProbe(
      'ariaPressedRemove',
      stateOwnership.ariaPressedRemove
    ),
    formatProviderAttributeMutationProbe(
      'ariaCheckedSetFalse',
      stateOwnership.ariaCheckedSetFalse
    ),
    formatProviderManualToggleInspection(
      summary.providerManualToggleInspection
    ),
    formatProviderStorageDiagnostics(summary.providerStorageWrites),
    'outerHTML: omitted',
  ].join('\n')
}

function formatCurrentSiteVerificationDiagnostics(summary) {
  if (!summary || typeof summary !== 'object') {
    return 'Sin datos'
  }

  const replacement =
    summary.replacement &&
    typeof summary.replacement === 'object'
      ? summary.replacement
      : null
  const replacementSamples =
    replacement &&
    Array.isArray(replacement.samples)
      ? replacement.samples
          .filter((sample) =>
            sample && typeof sample === 'object'
          )
          .slice(0, 1)
      : []
  const lines = [
    [
      `outcome: ${String(summary.outcome || 'unknown').slice(0, 80)}`,
      `delayMs: ${Math.max(0, Number(summary.verificationDelayMs) || 0)}`,
      `active: ${Boolean(summary.active)}`,
      `bannerVisible: ${Boolean(summary.bannerVisible)}`,
      `modalPresent: ${Boolean(summary.modalPresent)}`,
      `overlayPresent: ${Boolean(summary.overlayPresent)}`,
      `scrollRestored: ${Boolean(summary.scrollRestored)}`,
      `pageInteractionAvailable: ${Boolean(summary.pageInteractionAvailable)}`,
    ].join(', '),
    [
      `clicked: ${String(summary.clickedControlText || 'no text').slice(0, 100)}`,
      `connected: ${Boolean(summary.clickedControlConnected)}`,
      `visible: ${Boolean(summary.clickedControlVisible)}`,
    ].join(', '),
    `clickedVisibility: ${formatDiagnosticVisibility(summary.clickedControlVisibility)}`,
    [
      `rootConnected: ${Boolean(summary.rootConnected)}`,
      `rootStillSame: ${Boolean(summary.rootStillSame)}`,
      `rootVisible: ${Boolean(summary.rootVisible)}`,
      `stateRootConnected: ${Boolean(summary.stateRootConnected)}`,
      `stateRootVisible: ${Boolean(summary.stateRootVisible)}`,
      `ariaHidden: ${Boolean(summary.ariaHidden)}`,
      `cssHidden: ${Boolean(summary.cssHidden)}`,
    ].join(', '),
    `rootGeometry: ${formatDiagnosticRect(summary.rootGeometry)}`,
    `stateRootGeometry: ${formatDiagnosticRect(summary.stateRootGeometry)}`,
    `rootStyle: ${formatDiagnosticStyle(summary.rootStyle)}`,
    `rootVisibility: ${formatDiagnosticVisibility(summary.rootVisibility)}`,
    [
      `replacementDetected: ${Boolean(replacement?.detected)}`,
      `replacementCount: ${Math.max(0, Number(replacement?.count) || 0)}`,
    ].join(', '),
  ]

  if (replacementSamples.length === 0) {
    lines.push('replacementSamples: none')
    return lines.join('\n')
  }

  replacementSamples.forEach((sample, index) => {
    lines.push([
      `replacement${index + 1}: ${String(sample.tagName || 'unknown').slice(0, 20)}`,
      `rect:${formatDiagnosticRect(sample.rect)}`,
      String(sample.text || 'no text').slice(0, 100),
    ].join(' | '))
  })

  return lines.join('\n')
}

function formatFundingChoicesControls(summary) {
  if (!summary || typeof summary !== 'object') {
    return 'Sin datos'
  }

  const controls =
    Array.isArray(summary.controls)
      ? summary.controls
          .filter((control) =>
            control && typeof control === 'object'
          )
          .slice(0, 8)
      : []
  const providerPhaseGuardState =
    summary.providerPhaseGuardState &&
    typeof summary.providerPhaseGuardState === 'object'
      ? summary.providerPhaseGuardState
      : null
  const providerPhaseLastError =
    summary.providerPhaseLastError &&
    typeof summary.providerPhaseLastError === 'object'
      ? summary.providerPhaseLastError
      : null
  const providerReopenCandidates =
    Array.isArray(summary.providerReopenCandidates)
      ? summary.providerReopenCandidates
          .filter((candidate) =>
            candidate && typeof candidate === 'object'
          )
          .slice(0, 5)
      : []
  const providerReopenCandidateCount =
    Math.max(0, Number(summary.providerReopenCandidateCount) || 0)
  const providerReopenCandidateVisibleCount =
    Math.max(
      0,
      Number(summary.providerReopenCandidateVisibleCount) ||
        providerReopenCandidateCount
    )
  const providerReopenCandidateTotalCount =
    Math.max(0, Number(summary.providerReopenCandidateTotalCount) || 0)
  const finalizationControls =
    Array.isArray(summary.fundingChoicesFinalizationControls)
      ? summary.fundingChoicesFinalizationControls
          .filter((control) =>
            control && typeof control === 'object'
          )
          .slice(0, 10)
      : []
  const lines = [
    formatFundingChoicesGlobalStateCopySection({
      fundingChoicesControlDiagnostics: summary,
    }),
    'providerReopenCandidateDiagnostics:',
    [
      `providerReopenCandidateCount: ${providerReopenCandidateCount}`,
      `providerReopenCandidateVisibleCount: ${providerReopenCandidateVisibleCount}`,
      `providerReopenCandidateTotalCount: ${providerReopenCandidateTotalCount}`,
      `providerPersistenceReopenClicked: ${Boolean(summary.providerPersistenceReopenClicked)}`,
      `providerPersistenceReopenSuccess: ${Boolean(summary.providerPersistenceReopenSuccess)}`,
      `providerToggleCountAfterReopen: ${Math.max(0, Number(summary.providerToggleCountAfterReopen) || 0)}`,
      `activeProviderToggleCountAfterReopen: ${Math.max(0, Number(summary.activeProviderToggleCountAfterReopen) || 0)}`,
      `providerPersistenceVerified: ${Boolean(summary.providerPersistenceVerified)}`,
      `providerReloadVerificationStarted: ${Boolean(summary.providerReloadVerificationStarted)}`,
      `providerReloadCloseClicked: ${Boolean(summary.providerReloadCloseClicked)}`,
      `providerToggleCountAfterReload: ${Math.max(0, Number(summary.providerToggleCountAfterReload) || 0)}`,
      `activeProviderToggleCountAfterReload: ${Math.max(0, Number(summary.activeProviderToggleCountAfterReload) || 0)}`,
      `providerPersistenceAcrossReload: ${Boolean(summary.providerPersistenceAcrossReload)}`,
      `reloadVerificationReason: ${String(summary.reloadVerificationReason || 'none').slice(0, 80)}`,
      `originalManageVendorsConnectedAfterBack: ${Boolean(summary.providerReopenOriginalManageVendorsConnectedAfterBack)}`,
      `originalManageVendorsExistsAfterBack: ${Boolean(summary.providerReopenOriginalManageVendorsExistsAfterBack)}`,
    ].join(', '),
  ]

  if (providerReopenCandidates.length > 0) {
    lines.push('providerReopenCandidateDetails:')
    providerReopenCandidates.forEach((candidate, index) => {
      lines.push([
        `${index + 1}. tag:${String(candidate.tag || 'unknown').slice(0, 24)}`,
        `class:${String(candidate.className || 'none').slice(0, 80)}`,
        `text:${String(candidate.text || 'none').slice(0, 70)}`,
        `aria-label:${String(candidate.ariaLabel || 'none').slice(0, 70)}`,
        `connected:${Boolean(candidate.connected)}`,
        `disabled:${Boolean(candidate.disabled)}`,
        `visible:${Boolean(candidate.visible)}`,
        `display:${String(candidate.display || 'none').slice(0, 18)}`,
        `visibility:${String(candidate.visibility || 'none').slice(0, 18)}`,
        `pointerEvents:${String(candidate.pointerEvents || 'none').slice(0, 18)}`,
        `rect:${Math.max(0, Number(candidate.rectWidth) || 0)}x${Math.max(0, Number(candidate.rectHeight) || 0)}`,
      ].join(' | '))
    })
  } else {
    lines.push('providerReopenCandidateDetails: none')
  }

  lines.push('fundingChoicesFinalizationPath:')
  lines.push([
    `backFound:${Boolean(summary.fundingChoicesFinalizationBackFound)}`,
    `backClicked:${Boolean(summary.fundingChoicesFinalizationBackClicked)}`,
    `controlCount:${Math.max(0, Number(summary.fundingChoicesFinalizationControlCount) || 0)}`,
    `safeCandidates:${Math.max(0, Number(summary.fundingChoicesFinalizationSafeCandidateCount) || 0)}`,
    `positiveBlocked:${Math.max(0, Number(summary.fundingChoicesFinalizationPositiveBlockedCount) || 0)}`,
  ].join(', '))

  if (finalizationControls.length > 0) {
    lines.push('fundingChoicesFinalizationControls:')
    finalizationControls.forEach((control, index) => {
      lines.push([
        `${index + 1}. stage:${String(control.stage || 'unknown').slice(0, 32)}`,
        `type:${String(control.type || 'other').slice(0, 32)}`,
        `tag:${String(control.tag || 'unknown').slice(0, 16)}`,
        `class:${String(control.className || 'none').slice(0, 70)}`,
        `text:${String(control.text || 'none').slice(0, 90)}`,
        `aria:${String(control.ariaLabel || 'none').slice(0, 70)}`,
        `disabled:${Boolean(control.disabled)}`,
        `visible:${Boolean(control.visible)}`,
        `display:${String(control.display || 'none').slice(0, 16)}`,
        `visibility:${String(control.visibility || 'none').slice(0, 16)}`,
        `pointer:${String(control.pointerEvents || 'none').slice(0, 16)}`,
        `rect:${Math.max(0, Number(control.rectWidth) || 0)}x${Math.max(0, Number(control.rectHeight) || 0)}`,
        `footer:${Boolean(control.footer)}`,
        `sticky:${Boolean(control.stickyFooter)}`,
        `outsideDialog:${Boolean(control.outsideVisibleDialog)}`,
        `fcRoot:${Boolean(control.fcRootContains)}`,
        `positiveBlocked:${Boolean(control.blockedPositiveConsent)}`,
      ].join(' | '))
    })
  } else {
    lines.push('fundingChoicesFinalizationControls: none')
  }

  lines.push(
    [
      `controlCount: ${Math.max(0, Number(summary.controlCount) || 0)}`,
      `sliderCount: ${Math.max(0, Number(summary.sliderCount) || 0)}`,
      `activeSliderCount: ${Math.max(0, Number(summary.activeSliderCount) || 0)}`,
      `preferenceToggleCount: ${Math.max(0, Number(summary.preferenceToggleCount) || 0)}`,
      `activePreferenceToggleCount: ${Math.max(0, Number(summary.activePreferenceToggleCount) || 0)}`,
      `mainRequiredActiveBefore: ${Math.max(0, Number(summary.mainRequiredActiveBefore) || 0)}`,
      `mainRequiredActiveAfter: ${Math.max(0, Number(summary.mainRequiredActiveAfter) || 0)}`,
      `mainClickedCount: ${Math.max(0, Number(summary.mainClickedCount) || 0)}`,
      `mainToggleMethod: ${String(summary.mainToggleMethod || 'none').slice(0, 40)}`,
      `providerPreferenceOpened: ${Boolean(summary.providerPreferenceOpened)}`,
      `providerToggleCount: ${Math.max(0, Number(summary.providerToggleCount) || 0)}`,
      `activeProviderToggleCount: ${Math.max(0, Number(summary.activeProviderToggleCount) || 0)}`,
      `providerInspectedCount: ${Math.max(0, Number(summary.providerInspectedCount) || 0)}`,
      `providerActiveFoundCount: ${Math.max(0, Number(summary.providerActiveFoundCount) || 0)}`,
      `providerClickedCount: ${Math.max(0, Number(summary.providerClickedCount) || 0)}`,
      `providerTimeBudgetExceeded: ${Boolean(summary.providerTimeBudgetExceeded)}`,
      `providerToggleMethod: ${String(summary.providerToggleMethod || 'none').slice(0, 40)}`,
      `providerLabelCoordinateTargetFound: ${Boolean(summary.providerLabelCoordinateTargetFound)}`,
      `providerLabelCoordinateReason: ${String(summary.providerLabelCoordinateReason || 'none').slice(0, 80)}`,
      `providerLabelCoordinateBeforeActiveCount: ${Math.max(0, Number(summary.providerLabelCoordinateBeforeActiveCount) || 0)}`,
      `providerLabelCoordinateAfterActiveCount: ${Math.max(0, Number(summary.providerLabelCoordinateAfterActiveCount) || 0)}`,
      `providerLabelCoordinateInvocationState: ${String(summary.providerLabelCoordinateInvocationState || 'none').slice(0, 40)}`,
      `providerPhaseBlockedReason: ${String(summary.providerPhaseBlockedReason || 'none').slice(0, 80)}`,
      `providerPhaseGuardState: attempted:${Boolean(providerPhaseGuardState?.attempted)} running:${Boolean(providerPhaseGuardState?.running)} preferencesOpen:${Boolean(providerPhaseGuardState?.preferencesOpen)} activeProviderCount:${Math.max(0, Number(providerPhaseGuardState?.activeProviderCount) || 0)} panelVerified:${Boolean(providerPhaseGuardState?.panelVerified)} providerAutomationEnabled:${Boolean(providerPhaseGuardState?.providerAutomationEnabled)}`,
      `providerPhaseLastError: phase:${String(providerPhaseLastError?.phase || 'none').slice(0, 60)} message:${String(providerPhaseLastError?.message || 'none').slice(0, 120)}`,
      `providerAutomationGuardReason: ${String(summary.providerAutomationGuardReason || 'none').slice(0, 120)}`,
      `providerDiagnosticsExported: ${getProviderDiagnosticsExported(summary)}`,
      formatProviderPressedDiagnostic(
        'legitimateInterestPressed',
        summary.legitimateInterestPressed
      ),
      formatProviderPressedDiagnostic(
        'consentPressed',
        summary.consentPressed
      ),
      formatProviderCountBreakdown(summary.providerCountBreakdown),
      formatProviderCountSources(summary.providerCountSources),
      formatProviderFirstThreeActiveEvaluations(
        summary.providerFirstThreeActiveEvaluations
      ),
      `providerPreferenceTextMatch: ${String(summary.providerPreferenceTextMatch || 'none').slice(0, 60)}`,
      `providerPreferenceClickableTargetTag: ${String(summary.providerPreferenceClickableTargetTag || 'none').slice(0, 30)}`,
      `providerPreferenceClickMethod: ${String(summary.providerPreferenceClickMethod || 'none').slice(0, 30)}`,
      `providerPreferenceClickSuccess: ${Boolean(summary.providerPreferenceClickSuccess)}`,
      `providerPreferenceScrollAttempts: ${Math.max(0, Number(summary.providerPreferenceScrollAttempts) || 0)}`,
      `providerPreferenceScrollTop: ${Math.max(0, Number(summary.providerPreferenceScrollTop) || 0)}`,
      `providerManageVendorsSelectorExecuted: ${Boolean(summary.providerManageVendorsSelectorExecuted)}`,
      `providerManageVendorsFoundImmediate: ${Boolean(summary.providerManageVendorsFoundImmediate)}`,
      `providerManageVendorsFound300ms: ${Boolean(summary.providerManageVendorsFound300ms)}`,
      `providerManageVendorsFound800ms: ${Boolean(summary.providerManageVendorsFound800ms)}`,
      `providerManageVendorsFound1500ms: ${Boolean(summary.providerManageVendorsFound1500ms)}`,
      `providerManageVendorsCountImmediate: ${Math.max(0, Number(summary.providerManageVendorsCountImmediate) || 0)}`,
      `providerManageVendorsCount300ms: ${Math.max(0, Number(summary.providerManageVendorsCount300ms) || 0)}`,
      `providerManageVendorsCount800ms: ${Math.max(0, Number(summary.providerManageVendorsCount800ms) || 0)}`,
      `providerManageVendorsCount1500ms: ${Math.max(0, Number(summary.providerManageVendorsCount1500ms) || 0)}`,
      `providerManageVendorsFoundDelayed: ${Boolean(summary.providerManageVendorsFoundDelayed)}`,
      `manageVendorsRejectedReason: ${String(summary.manageVendorsRejectedReason || 'none').slice(0, 80)}`,
      `manageVendorsSensitiveBypass: ${Boolean(summary.manageVendorsSensitiveBypass)}`,
      `manageVendorsMode: ${String(summary.manageVendorsMode || 'none').slice(0, 20)}`,
      `manageVendorsAllowClick: ${Boolean(summary.manageVendorsAllowClick)}`,
      `providerManageVendorsFound: ${Boolean(summary.providerManageVendorsFound)}`,
      `providerManageVendorsClicked: ${Boolean(summary.providerManageVendorsClicked)}`,
      `providerSaveBackFound: ${Boolean(summary.providerSaveBackFound)}`,
      `providerSaveBackClicked: ${Boolean(summary.providerSaveBackClicked)}`,
      `providerSaveBackReason: ${String(summary.providerSaveBackReason || 'none').slice(0, 60)}`,
      `providerSaveBackText: ${String(summary.providerSaveBackText || 'none').slice(0, 60)}`,
      `providerSaveAfterBackControlCount: ${Math.max(0, Number(summary.providerSaveAfterBackControlCount) || 0)}`,
      `providerSaveAfterBackStrictCount: ${Math.max(0, Number(summary.providerSaveAfterBackStrictCount) || 0)}`,
      `providerSaveAfterBackPositiveBlockedCount: ${Math.max(0, Number(summary.providerSaveAfterBackPositiveBlockedCount) || 0)}`,
      `providerPersistenceVerified: ${Boolean(summary.providerPersistenceVerified)}`,
      `providerPersistenceReopenClicked: ${Boolean(summary.providerPersistenceReopenClicked)}`,
      `providerPersistenceReopenSuccess: ${Boolean(summary.providerPersistenceReopenSuccess)}`,
      `providerPersistenceReason: ${String(summary.providerPersistenceReason || 'none').slice(0, 60)}`,
      `providerToggleCountAfterReopen: ${Math.max(0, Number(summary.providerToggleCountAfterReopen) || 0)}`,
      `activeProviderToggleCountAfterReopen: ${Math.max(0, Number(summary.activeProviderToggleCountAfterReopen) || 0)}`,
      `providerReloadVerificationStarted: ${Boolean(summary.providerReloadVerificationStarted)}`,
      `providerReloadCloseFound: ${Boolean(summary.providerReloadCloseFound)}`,
      `providerReloadCloseClicked: ${Boolean(summary.providerReloadCloseClicked)}`,
      `providerToggleCountAfterReload: ${Math.max(0, Number(summary.providerToggleCountAfterReload) || 0)}`,
      `activeProviderToggleCountAfterReload: ${Math.max(0, Number(summary.activeProviderToggleCountAfterReload) || 0)}`,
      `providerPersistenceAcrossReload: ${Boolean(summary.providerPersistenceAcrossReload)}`,
      `reloadVerificationReason: ${String(summary.reloadVerificationReason || 'none').slice(0, 80)}`,
      `clickableOwnerCount: ${Math.max(0, Number(summary.clickableOwnerCount) || 0)}`,
      `collectedAt: ${String(summary.collectedAt || 'unknown').slice(0, 40)}`,
    ].join(', ')
  )

  if (
    summary.providerManageVendorsElement &&
    typeof summary.providerManageVendorsElement === 'object'
  ) {
    const element =
      summary.providerManageVendorsElement
    lines.push([
      'manageVendorsElement:',
      `tag:${String(element.tagName || 'unknown').slice(0, 24)}`,
      `class:${String(element.className || 'none').slice(0, 80)}`,
      `connected:${Boolean(element.connected)}`,
      `offsetParent:${Boolean(element.offsetParent)}`,
      `display:${String(element.display || 'none').slice(0, 24)}`,
      `visibility:${String(element.visibility || 'none').slice(0, 24)}`,
      `opacity:${String(element.opacity || 'none').slice(0, 16)}`,
      `pointerEvents:${String(element.pointerEvents || 'none').slice(0, 24)}`,
      `disabled:${Boolean(element.disabled)}`,
      `ariaHidden:${String(element.ariaHidden || 'none').slice(0, 16)}`,
      `rect:${Math.max(0, Number(element.rectWidth) || 0)}x${Math.max(0, Number(element.rectHeight) || 0)}`,
      `text:${String(element.text || 'none').slice(0, 80)}`,
    ].join(', '))
  }

  const fundingChoicesGlobalSaveControls =
    Array.isArray(summary.fundingChoicesGlobalSaveControls)
      ? summary.fundingChoicesGlobalSaveControls
          .filter((candidate) =>
            candidate && typeof candidate === 'object'
          )
          .slice(0, 5)
      : Array.isArray(summary.providerSaveCandidates)
        ? summary.providerSaveCandidates
          .filter((candidate) =>
            candidate && typeof candidate === 'object'
          )
          .slice(0, 5)
        : []

  lines.push([
    'fundingChoicesGlobalSaveControls:',
    `count:${Math.max(0, Number(summary.fundingChoicesGlobalSaveControlCount) || Number(summary.providerSaveCandidateCount) || 0)}`,
    `strict:${Math.max(0, Number(summary.fundingChoicesGlobalStrictSaveControlCount) || Number(summary.providerStrictSaveCandidateCount) || 0)}`,
    `positiveBlocked:${Math.max(0, Number(summary.fundingChoicesGlobalPositiveConsentBlockedCount) || Number(summary.providerPositiveConsentBlockedCount) || 0)}`,
  ].join(', '))

  if (fundingChoicesGlobalSaveControls.length === 0) {
    lines.push('fundingChoicesGlobalSaveControlDetails: summary_only')
  } else {
    fundingChoicesGlobalSaveControls.forEach((candidate, index) => {
      const visibility =
        candidate.visibility &&
        typeof candidate.visibility === 'object'
          ? candidate.visibility
          : {}

      lines.push([
        `fcSave${index + 1}. ${String(candidate.tag || 'unknown').slice(0, 16)}`,
        `type:${String(candidate.candidateType || 'other').slice(0, 24)}`,
        `class:${String(candidate.className || 'none').slice(0, 70)}`,
        `text:${String(candidate.text || 'none').slice(0, 90)}`,
        `aria:${String(candidate.ariaLabel || 'none').slice(0, 70)}`,
        `disabled:${Boolean(candidate.disabled)}`,
        `visible:${Boolean(visibility.visible)}`,
        `display:${String(visibility.display || 'none').slice(0, 16)}`,
        `visibility:${String(visibility.visibility || 'none').slice(0, 16)}`,
        `pointer:${String(visibility.pointerEvents || 'none').slice(0, 16)}`,
        `rect:${Math.max(0, Number(visibility.rectWidth) || 0)}x${Math.max(0, Number(visibility.rectHeight) || 0)}`,
        `saveText:${Boolean(candidate.saveTextMatch)}`,
        `saveCandidate:${Boolean(candidate.saveCandidate)}`,
        `positiveBlocked:${Boolean(candidate.blockedPositiveConsent)}`,
        `blocked:${String(candidate.blockedReason || 'none').slice(0, 60)}`,
        `panel:${Boolean(candidate.panelContains)}`,
        `fcRoot:${Boolean(candidate.fcRootContains)}`,
        `document:${Boolean(candidate.documentLevel)}`,
      ].join(' | '))
    })
  }

  if (
    summary.providerFirstActiveInputHTML ||
    summary.providerFirstActiveLabelHTML ||
    summary.providerFirstActiveSliderHTML ||
    summary.providerFirstActiveRowHTML ||
    summary.providerFirstActiveFullRowHTML ||
    summary.providerStateOwnership
  ) {
    const inputAttrs =
      summary.providerFirstActiveInputAttrs &&
      typeof summary.providerFirstActiveInputAttrs === 'object'
        ? summary.providerFirstActiveInputAttrs
        : null
    const rowAttrs =
      summary.providerFirstActiveRowAttrs &&
      typeof summary.providerFirstActiveRowAttrs === 'object'
        ? summary.providerFirstActiveRowAttrs
        : null
    const stateOwnership =
      summary.providerStateOwnership &&
      typeof summary.providerStateOwnership === 'object'
        ? summary.providerStateOwnership
        : null

    lines.push('providerFirstActiveToggle:')

    if (inputAttrs) {
      lines.push([
        'inputAttrs:',
        `id:${String(inputAttrs.id || 'none').slice(0, 80)}`,
        `name:${String(inputAttrs.name || 'none').slice(0, 80)}`,
        `class:${String(inputAttrs.class || 'none').slice(0, 100)}`,
        `role:${String(inputAttrs.role || 'none').slice(0, 40)}`,
        `type:${String(inputAttrs.type || 'none').slice(0, 30)}`,
        `checked:${Boolean(inputAttrs.checked)}`,
        `ariaPressed:${String(inputAttrs.ariaPressed || 'none').slice(0, 30)}`,
        `ariaChecked:${String(inputAttrs.ariaChecked || 'none').slice(0, 30)}`,
        `disabled:${Boolean(inputAttrs.disabled)}`,
        `tabIndex:${Number(inputAttrs.tabIndex) || 0}`,
        `data:${formatDiagnosticDataAttributes(inputAttrs.dataAttributes)}`,
      ].join(', '))
    }

    if (rowAttrs) {
      lines.push([
        'rowAttrs:',
        `class:${String(rowAttrs.class || 'none').slice(0, 100)}`,
        `role:${String(rowAttrs.role || 'none').slice(0, 40)}`,
        `data:${formatDiagnosticDataAttributes(rowAttrs.dataAttributes)}`,
      ].join(', '))
    }

    lines.push(
      formatProviderDiagnosticAllAttributes(
        'inputAllAttrs',
        summary.providerFirstActiveInputAllAttrs
      )
    )
    lines.push(
      formatProviderDiagnosticAllAttributes(
        'rowAllAttrs',
        summary.providerFirstActiveRowAllAttrs
      )
    )
    lines.push(
      formatProviderDiagnosticAllAttributes(
        'preferenceContainerAttrs',
        summary.providerFirstActivePreferenceContainerAttrs
      )
    )
    lines.push(
      formatProviderDiagnosticAllAttributes(
        'sliderContainerAttrs',
        summary.providerFirstActiveSliderContainerAttrs
      )
    )
    lines.push(
      formatProviderDiagnosticAllAttributes(
        'sliderAttrs',
        summary.providerFirstActiveSliderAttrs
      )
    )
    lines.push(
      formatProviderDiagnosticAllAttributes(
        'componentRootAttrs',
        summary.providerFirstActiveComponentRootAttrs
      )
    )
    lines.push(
      formatProviderOwnerDiagnostics(
        summary.providerFirstActiveOwnerDiagnostics ||
          stateOwnership?.ownerDiagnostics
      )
    )
    lines.push(
      formatProviderStorageDiagnostics(summary.providerStorageWrites)
    )

    if (stateOwnership) {
      lines.push([
        'providerStateOwnership:',
        `signature:${String(stateOwnership.signature || 'none').slice(0, 80)}`,
        `mutation:${String(stateOwnership.mutation || 'none').slice(0, 40)}`,
        `running:${Boolean(stateOwnership.running)}`,
        `completed:${Boolean(stateOwnership.completed)}`,
        `checkedRestored500:${Boolean(stateOwnership.checkedRestoredAfter500ms)}`,
        `ariaPressedRestored500:${Boolean(stateOwnership.ariaPressedRestoredAfter500ms)}`,
        `ariaCheckedRestored500:${Boolean(stateOwnership.ariaCheckedRestoredAfter500ms)}`,
        `error:${String(stateOwnership.error || 'none').slice(0, 80)}`,
      ].join(', '))
      lines.push(formatProviderStateSnapshot('original', stateOwnership.original))
      lines.push(formatProviderStateSnapshot('immediate', stateOwnership.immediate))
      lines.push(formatProviderStateSnapshot('raf', stateOwnership.raf))
      lines.push(formatProviderStateSnapshot('after100ms', stateOwnership.after100ms))
      lines.push(formatProviderStateSnapshot('after500ms', stateOwnership.after500ms))
      lines.push(
        formatProviderStateSnapshot(
          'restoredOriginalAfterProbe',
          stateOwnership.restoredOriginalAfterProbe
        )
      )
    }

    lines.push(
      formatProviderManualToggleInspection(
        summary.providerManualToggleInspection
      )
    )
    lines.push('providerFirstActiveHTML: omitted')
  }

  if (controls.length === 0) {
    lines.push('controls: none')
  } else {
    lines.push('controls:')
    controls.forEach((control, index) => {
      lines.push([
        `${index + 1}. ${String(control.tagName || 'unknown').slice(0, 16)}`,
        `role:${String(control.role || 'none').slice(0, 20)}`,
        String(control.text || 'no text').slice(0, 90),
        `visible:${Boolean(control.visible)}`,
        `toggle:${Boolean(control.toggleLike)}`,
        `checked:${String(control.checked || 'none').slice(0, 16)}`,
        `state:${String(control.sliderState || 'none').slice(0, 16)}`,
        `active:${Boolean(control.active)}`,
        `clicked:${Boolean(control.clicked)}`,
        `wrapper:${Boolean(control.sliderWrapperFound)}`,
        `input:${Boolean(control.sliderInputFound)}`,
        `ariaPressed:${String(control.ariaPressed || 'none').slice(0, 16)}`,
        `owner:${Boolean(control.clickableOwnerFound)}`,
        `reject:${Boolean(control.rejectIntent)}`,
        `save:${Boolean(control.saveIntent)}`,
        `accept:${Boolean(control.acceptIntent)}`,
        `blocked:${String(control.blockedReason || 'none').slice(0, 60)}`,
        `ariaLabel:${String(control.ariaLabel || 'none').slice(0, 60)}`,
        `ownerText:${String(control.ownerText || 'none').slice(0, 60)}`,
      ].join(' | '))
    })
  }

  const preferenceActions =
    Array.isArray(summary.preferenceToggleActions)
      ? summary.preferenceToggleActions
          .filter((action) =>
            action && typeof action === 'object'
          )
          .slice(0, 8)
      : []

  if (preferenceActions.length > 0) {
    lines.push('matched required toggles:')
    preferenceActions.forEach((action, index) => {
      lines.push([
        `${index + 1}. ${String(action.ariaLabel || 'no label').slice(0, 80)}`,
        `scope:${String(action.scope || 'main').slice(0, 20)}`,
        `id:${String(action.inputId || 'none').slice(0, 30)}`,
        `name:${String(action.inputName || 'none').slice(0, 30)}`,
        `class:${String(action.inputClass || 'none').slice(0, 50)}`,
        `sliderClass:${String(action.sliderClass || 'none').slice(0, 50)}`,
        `before:${String(action.ariaPressedBefore || 'none').slice(0, 12)}`,
        `checkedBefore:${Boolean(action.checkedBefore)}`,
        `activeBefore:${Boolean(action.activeBefore)}`,
        `visibleInput:${Boolean(action.visibleInput)}`,
        `labelClass:${String(action.labelClass || 'none').slice(0, 50)}`,
        `wrapperClass:${String(action.wrapperClass || 'none').slice(0, 50)}`,
        `target:${String(action.clickTarget || 'none').slice(0, 30)}`,
        `clicked:${Boolean(action.clicked)}`,
        `dispatched:${Boolean(action.clickDispatched)}`,
        `after:${String(action.ariaPressedAfter || 'none').slice(0, 12)}`,
        `checkedAfter:${Boolean(action.checkedAfter)}`,
        `activeAfter:${Boolean(action.activeAfter)}`,
        `stillActive:${Boolean(action.stillActive)}`,
        `skipped:${String(action.skippedReason || 'none').slice(0, 60)}`,
      ].join(' | '))
    })
  }

  return lines.join('\n')
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
    latestCurrentSiteDiagnostic =
      null

    currentSiteDiagnosticStatus.innerText =
      'No current diagnostic yet'
    currentSiteDiagnosticState.innerText =
      'Sin datos'
    currentSiteDiagnosticClassification.innerText =
      'Sin datos'
    currentSiteDiagnosticReason.innerText =
      'Sin datos'
    currentSiteDiagnosticControls.innerText =
      'Sin datos'
    currentSiteDiagnosticReject.innerText =
      'Sin datos'
    currentSiteDiagnosticBlocked.innerText =
      'Sin datos'
    currentSiteDiagnosticVerification.innerText =
      'Sin datos'
    currentSiteDiagnosticFundingChoices.innerText =
      'Sin datos'
    currentSiteDiagnosticRejectCandidates.innerText =
      'Sin datos'
    currentSiteDiagnosticDirectControls.innerText =
      'Sin datos'
    currentSiteDiagnosticCookieTextMatches.innerText =
      'Sin datos'
    currentSiteDiagnosticDomScope.innerText =
      'Sin datos'
    currentSiteDiagnosticBottomBanner.innerText =
      'Sin datos'
    currentSiteDiagnosticExperimentalBottomProbe.innerText =
      'Sin datos'
    currentSiteDiagnosticIframeAccess.innerText =
      'Sin datos'
    currentSiteDiagnosticLateSnapshot.innerText =
      'Sin datos'
    currentSiteDiagnosticTrace.innerText =
      'Sin datos'
    return
  }

  latestCurrentSiteDiagnostic =
    diagnostic

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
    `settingsSaveDetected: ${Boolean(diagnostic.settingsSaveDetected)}`,
    `settingsSaveClicked: ${Boolean(diagnostic.settingsSaveClicked)}`,
    `settingsSaveVerification: ${String(diagnostic.settingsSaveVerification || 'none').slice(0, 80)}`,
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
  currentSiteDiagnosticClassification.innerText =
    String(diagnostic.diagnosticClassification || 'Sin datos')
  currentSiteDiagnosticReason.innerText =
    String(diagnostic.reason || 'Sin datos')
  currentSiteDiagnosticControls.innerText =
    [...controls, ...prioritizedSummary].join(', ')
  currentSiteDiagnosticReject.innerText =
    String(diagnostic.matchedRejectText || 'Sin datos')
  currentSiteDiagnosticBlocked.innerText =
    String(diagnostic.blockedReason || 'Sin datos')
  currentSiteDiagnosticVerification.innerText =
    formatCurrentSiteVerificationDiagnostics(
      diagnostic.rejectVerificationDiagnostics
    )
  currentSiteDiagnosticFundingChoices.innerText =
    formatFundingChoicesControls(
      diagnostic.fundingChoicesControlDiagnostics
    )
  currentSiteDiagnosticRejectCandidates.innerText =
    formatCurrentSiteRejectCandidates(
      diagnostic.rejectCandidateDiagnostics
    )
  currentSiteDiagnosticDirectControls.innerText =
    formatCurrentSiteDirectControls(
      diagnostic.directClickableDiagnostics
    )
  currentSiteDiagnosticCookieTextMatches.innerText =
    formatCurrentSiteCookieTextMatches(
      diagnostic.cookieTextScopeDiagnostics
    )
  currentSiteDiagnosticDomScope.innerText =
    formatCurrentSiteDomScope(
      diagnostic.domScopeDiagnostics
    )
  currentSiteDiagnosticBottomBanner.innerText =
    formatCurrentSiteBottomBanner(
      diagnostic.bottomBannerDiagnostics
    )
  currentSiteDiagnosticExperimentalBottomProbe.innerText =
    formatExperimentalBottomProbe(
      diagnostic.experimentalBottomBannerProbe
    )
  currentSiteDiagnosticIframeAccess.innerText =
    formatCurrentSiteIframeAccess(
      diagnostic.iframeAccessibilityDiagnostics
    )
  currentSiteDiagnosticLateSnapshot.innerText =
    formatCurrentSiteLateSnapshot(
      diagnostic.lateDiagnosticSnapshot
    )
  currentSiteDiagnosticTrace.innerText =
    [
      formatCurrentSiteDecisionTrace(diagnostic.decisionTrace),
      formatScanLifecycleTimeoutTrace(diagnostic.scanLifecycleTimeoutTrace),
    ]
      .filter(Boolean)
      .join('\n')
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

loadState({
  refreshFundingChoices: true,
})
