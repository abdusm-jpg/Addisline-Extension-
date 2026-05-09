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

const accountStatus =
  document.getElementById(
    'accountStatus'
  )

const accountEmail =
  document.getElementById(
    'accountEmail'
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

const reportsToggleButton =
  document.getElementById(
    'reportsToggleButton'
  )

const reportsDropdown =
  document.getElementById(
    'reportsDropdown'
  )

const DEFAULT_STATE = {
  protectionEnabled: false,
  protectionMode: 'normal',
  cloudSyncEnabled: false,
  excludedDomains: [],
  issueReports: [],
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
  authStatus: 'disconnected',
  linkedAt: '',
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
  email,
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
      protectedDomains?.length ||
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

  const connected = authStatus === 'connected'

  accountStatus.innerText =
    connected
      ? 'Conectado'
      : 'No conectado'

  accountEmail.innerText =
    email || 'No hay cuenta vinculada'

  loginButton.hidden = connected
  logoutButton.hidden = !connected
  accountForm.hidden = connected

  authMessage.innerText = ''
  authMessage.className = 'accountMessage'

  if (connected) {
    emailInput.value = ''
    passwordInput.value = ''
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
      authStatus: 'connected',
      linkedAt: new Date().toISOString(),
    })

    setAuthMessage('Sesión iniciada correctamente.', 'success')
  }
)

logoutButton.addEventListener(
  'click',
  async () => {
    await chrome.storage.local.set({
      userId: '',
      email: '',
      authStatus: 'disconnected',
      linkedAt: '',
    })

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
      Array.isArray(issueReports)
        ? issueReports
        : []

    const report = {
      domain:
        currentDomainScope ||
        currentDomain,
      origin:
        currentOrigin ||
        getSafeOriginFromDomain(
          currentDomainScope ||
            currentDomain
        ),
      problemType:
        issueType.value,
      date:
        new Date().toISOString(),
      protectionMode:
        storedMode || 'normal',
    }

    await chrome.storage.local.set({
      issueReports: [
        ...reports,
        report,
      ],
    })

    reportStatus.innerText =
      'Reporte guardado localmente.'

    if (cloudSyncEnabled) {
      sendIssueReportToBackground(report)
    }
  }
)

issueReportsList.addEventListener(
  'click',
  async (event) => {
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

    updateReportsDisclosure()
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
      changes.issueReports ||
      changes.authStatus ||
      changes.email ||
      changes.userId ||
      changes.linkedAt
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

function renderIssueReports(issueReports) {
  const reports =
    Array.isArray(issueReports)
      ? issueReports
      : []

  const latestReports =
    reports
      .slice(-5)
      .reverse()

  reportsToggleButton.textContent =
    `REPORTADOS (${reports.length})`

  clearReportsButton.disabled =
    latestReports.length === 0

  updateReportsDisclosure()

  if (latestReports.length === 0) {
    issueReportsList.innerHTML =
      '<p class="emptyState">No hay reportes locales.</p>'
    return
  }

  issueReportsList.innerHTML =
    latestReports
      .map((report) => `
        <article class="reportItem">
          <button
            class="reportDomain"
            type="button"
            data-report-origin="${escapeHtml(report.origin || '')}"
            data-report-domain="${escapeHtml(report.domain || '')}"
          >
            ${escapeHtml(report.domain || 'Dominio no disponible')}
          </button>
          <span>${getIssueTypeLabel(report.problemType)}</span>
          <small>${formatReportDate(report.date)} · ${escapeHtml(report.protectionMode || 'normal')}</small>
        </article>
      `)
      .join('')
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
