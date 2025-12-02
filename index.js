import bolt from '@slack/bolt';
import dotenv from 'dotenv';
dotenv.config();

const app = new bolt.App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.event('message', async ({ event, client }) => {
  try {
    // Ignore les messages du bot lui-même ou sans texte
    if (event.subtype === 'bot_message' || !event.text) return;

    // Cherche les liens x.com
    const regex = /https:\/\/x\.com\/[^\s]+/g;
    const matches = event.text.match(regex);

    if (matches) {
      // Crée les liens corrigés
      const fixedLinks = matches.map(link =>
        link.replace('https://x.com/', 'https://xcancel.com/')
      );

      const message = `🔗 Voici le lien corrigé :\n${fixedLinks.join('\n')}`;

      // Répond en thread sous le message original
      await client.chat.postMessage({
        channel: event.channel,
        thread_ts: event.ts,
        text: message
      });

      console.log(`Corrigé un message dans #${event.channel}`);
    }
  } catch (error) {
    console.error('Erreur dans le traitement du message :', error);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Slack xcancel bot en marche sur le port', process.env.PORT);
})();
