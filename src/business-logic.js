/**
 * Logique métier pour le bot Slack x2xcancel
 * Fonctions réutilisables pour détecter et convertir les liens x.com
 */

/**
 * Détecte les liens x.com dans un texte
 * @param {string} text - Le texte à analyser
 * @returns {string[]} - Tableau des liens x.com trouvés
 */
export function detectXLinks(text) {
  if (!text) return [];

  const regex = /https:\/\/x\.com\/[^\s]+/gi;
  return text.match(regex) || [];
}

/**
 * Convertit un lien x.com en lien xcancel.com
 * @param {string} xLink - Le lien x.com à convertir
 * @returns {string} - Le lien xcancel.com
 */
export function convertToXCancelLink(xLink) {
  return xLink.replace("https://x.com/", "https://xcancel.com/");
}

/**
 * Convertit plusieurs liens x.com en liens xcancel.com
 * @param {string[]} xLinks - Tableau de liens x.com
 * @returns {string[]} - Tableau de liens xcancel.com
 */
export function convertLinksToXCancel(xLinks) {
  return xLinks.map(convertToXCancelLink);
}

/**
 * Génère le message de réponse avec les liens corrigés
 * @param {string[]} fixedLinks - Tableau de liens xcancel.com
 * @returns {string} - Le message formaté
 */
export function generateResponseMessage(fixedLinks) {
  if (fixedLinks.length === 0) return null;

  if (fixedLinks.length === 1) {
    return `🔗 Voici le lien corrigé :\n${fixedLinks[0]}`;
  }

  return `🔗 Voici les liens corrigés :\n${fixedLinks.join("\n")}`;
}

/**
 * Traite un message Slack et retourne les informations nécessaires pour répondre
 * @param {Object} event - L'événement Slack (message)
 * @returns {Object|null} - Objet avec { message, fixedLinks } ou null si aucun lien à traiter
 */
export function processSlackMessage(event) {
  // Ignore les messages du bot lui-même ou sans texte
  if (event.subtype === "bot_message" || !event.text) {
    return null;
  }

  // Détecte les liens x.com
  const xLinks = detectXLinks(event.text.replace("<", "").replace(">", ""));

  if (xLinks.length === 0) {
    return null;
  }

  // Convertit les liens
  const fixedLinks = convertLinksToXCancel(xLinks);

  console.log(
    "message reçu:",
    event,
    "\n ===> message transformé:",
    fixedLinks,
  );

  // Génère le message de réponse
  const message = generateResponseMessage(fixedLinks);

  return {
    message,
    fixedLinks,
    channel: event.channel,
    threadTs: event.ts, // Pour poster en thread si nécessaire
  };
}
