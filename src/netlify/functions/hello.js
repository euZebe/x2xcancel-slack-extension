/**
 * Handler Netlify Function pour le bot Slack x2xcancel
 *
 * À placer dans: netlify/functions/slack-events.js
 *
 * Configuration requise:
 * - Variables d'environnement dans Netlify: SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET
 * - Event Subscriptions URL: https://your-netlify-app.netlify.app/.netlify/functions/slack-events
 */


export const handler = async (event) => {
  console.log("event", event)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "hello world!" })
    };
};

