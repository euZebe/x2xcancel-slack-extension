import bolt from "@slack/bolt";
import dotenv from "dotenv";
import { processSlackMessage } from "./business-logic.js";

dotenv.config();

const app = new bolt.App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.event("message", async ({ event, client }) => {
  try {
    const result = processSlackMessage(event);

    if (result) {
      console.log(
        "result.message:",
        result.message,
        "with input event",
        event.text,
      );
      // Répond avec le message généré
      await client.chat.postMessage({
        channel: result.channel,
        // thread_ts: result.threadTs, // pour poster le message en thread
        text: result.message,
      });

      console.log(`Corrigé un message dans #${result.channel}`);
    }
  } catch (error) {
    console.error("Erreur dans le traitement du message :", error);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Slack xcancel bot en marche sur le port", process.env.PORT);
})();
