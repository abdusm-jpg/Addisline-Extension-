/*
 * Cookie consent intent vocabulary for Addisline.
 *
 * This file is intentionally isolated from content.js for now. The current
 * Manifest V3 content script only injects content.js, so wiring this module in
 * would require a manifest/load-order change or a safe bundling step. Until
 * then, content.js behavior remains unchanged and can adopt these helpers when
 * the Cookie Intelligence Layer is integrated.
 *
 * Legal boundary: this dictionary is only for recognizing legitimate cookie
 * consent choices. It must not be used to bypass paywalls, login walls,
 * registration gates, access controls, or site security flows.
 */

const COOKIE_INTENT_DICTIONARY = Object.freeze({
  openSettings: Object.freeze([
    'manage cookies',
    'manage settings',
    'cookie settings',
    'privacy settings',
    'show purposes',
    'manage purposes',
    'purpose settings',
    'view purposes',
    'customize',
    'customise',
    'set choices',
    'my choices',
    'privacy options',
    'advanced settings',
    'configurar cookies',
    'gestionar opciones',
    'gestionar preferencias',
    'gestion de opciones',
    'configurar opciones',
    'administrar opciones',
    'administrar preferencias',
    'opciones de privacidad',
    'personalizar',
    'personalizar cookies',
    'mis opciones',
    'parametres des cookies',
    'gerer les cookies',
    'personnaliser',
    'cookie einstellungen',
    'datenschutz einstellungen',
    'personalisieren',
    'impostazioni cookie',
    'gestisci preferenze',
    'personalizza',
    'definicoes de cookies',
    'gerir preferencias',
    'personalizar cookies',
  ]),

  rejectAll: Object.freeze([
    'reject',
    'reject all',
    'reject optional',
    'reject non essential',
    'reject non-essential',
    'decline',
    'decline all',
    'deny all',
    'deny optional',
    'deny consent',
    'only necessary',
    'necessary only',
    'essential only',
    'use necessary cookies only',
    'rechazar',
    'rechazar todo',
    'rechazar cookies',
    'rechazar opcionales',
    'rechazar no esenciales',
    'denegar todo',
    'denegar consentimiento',
    'solo necesarias',
    'solo esenciales',
    'solo cookies necesarias',
    'solo tecnicas',
    'solo obligatorias',
    'refuser',
    'tout refuser',
    'refuser les cookies',
    'necessaires uniquement',
    'ablehnen',
    'alle ablehnen',
    'nur notwendige',
    'rifiuta',
    'rifiuta tutto',
    'solo necessari',
    'rejeitar',
    'rejeitar tudo',
    'apenas necessarios',
  ]),

  savePreferences: Object.freeze([
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
    'save selection',
    'save choices',
    'apply selection',
    'apply selected',
    'confirm selection',
    'submit choices',
    'submit consent',
    'agree to current selection',
    'confirmar opciones',
    'guardar preferencias',
    'confirmar preferencias',
    'aplicar preferencias',
    'guardar configuracion',
    'enviar preferencias',
    'continuar con seleccion',
    'guardar y salir',
    'guardar seleccion',
    'enregistrer les preferences',
    'confirmer mes choix',
    'appliquer mes choix',
    'auswahl speichern',
    'einstellungen speichern',
    'scelte confermate',
    'salva preferenze',
    'guardar preferencias',
    'confirmar escolhas',
    'aplicar escolhas',
  ]),

  vendors: Object.freeze([
    'vendors',
    'vendor',
    'providers',
    'provider',
    'external providers',
    'third party',
    'third parties',
    'vendor information',
    'vendor preferences',
    'show vendors',
    'manage vendors',
    'vendor list',
    'proveedores',
    'proveedor',
    'proveedores externos',
    'terceros',
    'preferencias de proveedores',
    'preferencias sobre proveedores',
    'fournisseurs',
    'prestataires',
    'anbieter',
    'drittanbieter',
    'fornitori',
    'terze parti',
    'fornecedores',
    'terceiros',
  ]),

  partners: Object.freeze([
    'partners',
    'partner',
    'advertising partners',
    'partner preferences',
    'show partners',
    'manage partners',
    'socios',
    'socios publicitarios',
    'partners publicitaires',
    'partenaires',
    'partner anzeigen',
    'werbepartner',
    'partner pubblicitari',
    'parceiros',
    'parceiros publicitarios',
  ]),

  legitimateInterest: Object.freeze([
    'legitimate interest',
    'legitimate interests',
    'legitimate purposes',
    'vendor legitimate interest',
    'legitimate basis',
    'legitimate interest basis',
    'legitimate interest purposes',
    'legitimate interest processing',
    'legitimate interest consent',
    'legitimate interest management',
    'li purpose',
    'li purposes',
    'object',
    'object to',
    'objection',
    'oppose',
    'opposition',
    'interes legitimo',
    'intereses legitimos',
    'base legitima',
    'finalidad legitima',
    'finalidades legitimas',
    'tratamiento legitimo',
    'oponerse',
    'oposicion',
    'interet legitime',
    'interets legitimes',
    's opposer',
    'berechtigtes interesse',
    'berechtigte interessen',
    'widerspruch',
    'interesse legittimo',
    'interessi legittimi',
    'opporsi',
    'interesse legitimo',
    'interesses legitimos',
    'oposicao',
  ]),

  purposes: Object.freeze([
    'purposes',
    'purpose',
    'categories',
    'category',
    'features',
    'special features',
    'show purposes',
    'manage purposes',
    'view purposes',
    'purpose settings',
    'finalidades',
    'finalidad',
    'categorias',
    'categoria',
    'fines',
    'finalites',
    'objectifs',
    'zwecke',
    'kategorien',
    'finalita',
    'categorie',
    'finalidades',
    'categorias',
  ]),

  analyticsReject: Object.freeze([
    'analytics',
    'statistics',
    'measurement',
    'performance',
    'analitica',
    'estadisticas',
    'medicion',
    'rendimiento',
    'mesure',
    'statistiques',
    'analyse',
    'statistiken',
    'messung',
    'analisi',
    'statistiche',
    'medicao',
    'estatisticas',
  ]),

  marketingReject: Object.freeze([
    'marketing',
    'advertising',
    'ads',
    'advertising partners',
    'publicidad',
    'anuncios',
    'socios publicitarios',
    'publicite',
    'annonces',
    'werbung',
    'anzeigen',
    'pubblicita',
    'annunci',
    'publicidade',
    'anuncios',
  ]),

  personalizationReject: Object.freeze([
    'personalization',
    'personalisation',
    'personalized content',
    'personalized ads',
    'personalizacion',
    'contenido personalizado',
    'anuncios personalizados',
    'personnalisation',
    'contenu personnalise',
    'personalisierung',
    'personalisierte inhalte',
    'personalizzazione',
    'contenuti personalizzati',
    'personalizacao',
    'conteudo personalizado',
  ]),

  trackingReject: Object.freeze([
    'tracking',
    'trackers',
    'profiling',
    'social media',
    'social networks',
    'sell my data',
    'share my data',
    'rastreo',
    'rastreadores',
    'perfilado',
    'redes sociales',
    'venta de datos',
    'compartir datos',
    'suivi',
    'traceurs',
    'profilage',
    'tracking',
    'tracker',
    'profilbildung',
    'tracciamento',
    'profilazione',
    'rastreamento',
    'rastreadores',
    'perfilamento',
  ]),

  closeBanner: Object.freeze([
    'close',
    'dismiss',
    'hide',
    'not now',
    'cerrar',
    'descartar',
    'ocultar',
    'ahora no',
    'fermer',
    'plus tard',
    'schliessen',
    'nicht jetzt',
    'chiudi',
    'non ora',
    'fechar',
    'agora nao',
  ]),

  avoidAcceptAll: Object.freeze([
    'accept all',
    'accept cookies',
    'accept optional',
    'accept recommended',
    'allow all',
    'allow optional',
    'i agree',
    'agree',
    'consent',
    'aceptar todo',
    'aceptar cookies',
    'aceptar opcionales',
    'aceptar recomendado',
    'permitir todo',
    'estoy de acuerdo',
    'consentir',
    'tout accepter',
    'accepter les cookies',
    'alle akzeptieren',
    'cookies akzeptieren',
    'accetta tutto',
    'accetta cookie',
    'aceitar tudo',
    'aceitar cookies',
  ]),
})

function normalizeCookieIntentText(text) {
  return String(text || '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function escapeCookieIntentRegExp(value) {
  return String(value)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function cookieIntentPhraseMatches(normalizedText, phrase) {
  const normalizedPhrase =
    normalizeCookieIntentText(phrase)

  if (!normalizedText || !normalizedPhrase) {
    return false
  }

  return new RegExp(
    `(^|\\s)${escapeCookieIntentRegExp(normalizedPhrase)}(?=\\s|$)`
  ).test(normalizedText)
}

function textMatchesCookieIntent(text, intentName) {
  const terms =
    COOKIE_INTENT_DICTIONARY[intentName]

  if (!Array.isArray(terms)) {
    return false
  }

  const normalizedText =
    normalizeCookieIntentText(text)

  return terms.some((term) =>
    cookieIntentPhraseMatches(normalizedText, term)
  )
}

function getCookieIntentMatches(text) {
  const normalizedText =
    normalizeCookieIntentText(text)

  return Object.entries(COOKIE_INTENT_DICTIONARY)
    .map(([intent, terms]) => ({
      intent,
      terms: Array.from(
        new Set(
          terms.filter((term) =>
            cookieIntentPhraseMatches(normalizedText, term)
          )
        )
      ),
    }))
    .filter((match) => match.terms.length > 0)
}

if (typeof window !== 'undefined') {
  window.AddislineCookieIntentDictionary = {
    COOKIE_INTENT_DICTIONARY,
    normalizeCookieIntentText,
    textMatchesCookieIntent,
    getCookieIntentMatches,
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    COOKIE_INTENT_DICTIONARY,
    normalizeCookieIntentText,
    textMatchesCookieIntent,
    getCookieIntentMatches,
  }
}
