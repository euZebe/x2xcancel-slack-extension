/**
 * Handler Netlify Function pour le bot Slack x2xcancel
 *
 * À placer dans: netlify/functions/slack-events.js
 *
 * Configuration requise:
 * - Variables d'environnement dans Netlify: SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET
 * - Event Subscriptions URL: https://your-netlify-app.netlify.app/.netlify/functions/slack-events
 */

import { App } from "@slack/bolt";
import { processSlackMessage } from "../../business-logic.js";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true,
});

app.event("message", async ({ event, client }) => {
  try {
    const result = processSlackMessage(event);
    console.log(
      "EVENT REÇU:",
      event,
      "\n ===> message transformé",
      result.message,
    );

    if (result) {
      await client.chat.postMessage({
        channel: result.channel,
        text: result.message,
      });

      console.log(`Corrigé un message dans #${result.channel}`);
    }
  } catch (error) {
    console.error("Erreur dans le traitement du message :", error);
  }
});

export const handler = async (event) => {
  // Parse le body si c'est une string
  const body =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;

  // Gère le challenge Slack lors de la configuration
  if (body && body.type === "url_verification") {
    return {
      statusCode: 200,
      body: JSON.stringify({ challenge: body.challenge }),
    };
  }

  // Traite l'événement Slack
  try {
    await app.processEvent({
      body: body,
      headers: event.headers || {},
      ack: async (response) => {
        return response;
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    console.error("Erreur lors du traitement:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
