/**
 * Handler Vercel Serverless Function pour le bot Slack x2xcancel
 * 
 * À placer dans: api/slack/events.js
 * 
 * Configuration requise:
 * - Variables d'environnement dans Vercel: SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET
 * - Event Subscriptions URL: https://your-vercel-app.vercel.app/api/slack/events
 */

import { App } from '@slack/bolt';
import { processSlackMessage } from '../src/business-logic.js';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true
});

app.event('message', async ({ event, client }) => {
  console.log("EVENT REÇU:", event);
  try {
    const result = processSlackMessage(event);
    
    if (result) {
      await client.chat.postMessage({
        channel: result.channel,
        text: result.message
      });

      console.log(`Corrigé un message dans #${result.channel}`);
    }
  } catch (error) {
    console.error('Erreur dans le traitement du message :', error);
  }
});

export default async function handler(req, res) {
  // Gère le challenge Slack lors de la configuration
  if (req.body && req.body.type === 'url_verification') {
    return res.status(200).json({ challenge: req.body.challenge });
  }

  // Traite l'événement Slack
  try {
    await app.processEvent({
      body: req.body,
      headers: req.headers,
      ack: async (response) => {
        return response;
      }
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Erreur lors du traitement:', error);
    res.status(500).json({ error: error.message });
  }
}

