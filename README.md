# Slack xcancel bot

Un bot Slack qui détecte automatiquement les liens `https://x.com/...` dans les messages et propose une version corrigée vers `https://xcancel.com/...` dans un fil de discussion.

---

## 🚀 Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/toncompte/slack-xcancel-bot.git
   cd slack-xcancel-bot
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d’environnement**
   Crée un fichier `.env` :
   ```
   SLACK_BOT_TOKEN=xoxb-...
   SLACK_SIGNING_SECRET=...
   PORT=3000
   ```

4. **Créer une App Slack**
   - Va sur [https://api.slack.com/apps](https://api.slack.com/apps)
   - Crée une nouvelle application → "From scratch"
   - Active **Event Subscriptions**
     - URL de requête : `https://tonserveur.com/slack/events`
     - Événements : `message.channels`
   - Ajoute les **OAuth Scopes** :
     - `chat:write`
     - `channels:history`
   - Installe l’app dans ton workspace.

5. **Lancer le bot**
   ```bash
   npm start
   ```

6. **Tester**
   Poste un message contenant `https://x.com/...` dans un canal public → le bot répondra avec la version `https://xcancel.com/...` sous forme de fil.

---

## 🛠️ Hébergement

Tu peux déployer ce bot sur :
- [Render.com](https://render.com)
- [Fly.io](https://fly.io)
- [Vercel (avec serverless functions)](https://vercel.com)
- Ou ton propre serveur Node.js

---

## 📜 Licence

MIT
