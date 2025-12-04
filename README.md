# XCancel Slack bot

## 🧐 purpose
When visiting an X link, you cannot see the replies to the post unless you have an X account. Alternatively, there is XCancel: replace `x.com` with `xcancel.com` and you will see the original post and all its replies anonymously.

From now on, when you post an X link, `@X to xcancel` will also post the XCancel link to offer you a privacy-friendly alternative.


## Why not a public bot ?

The bot is not public, so that I am not responsible for high usage and its costs in many instances.

Then here is the way to install it manually, on each Slack instance you want.

# 📖 How to install it

## 1. 🪄 Create a Slack app (the bot)

### 1.1 declare the bot
- Go to : https://api.slack.com/apps
- Click `Create an app`
- Choose `From scratch`
- Give your app a name (for instance `x to xcancel`)
- add an app icon (for instance the one from `assets/x2xcancel.png`)
- Choose the Slack workspace in which you want to install the bot
- Validate


### 1.2 add permissions (Scopes)
Menu → OAuth & Permissions

In Bot Token Scopes section, add :
- `channels:history`
- `chat:write` 
- `groups:history` - not sure about this one as it doesn't allow to respond in an thread...
- `links:read`

### 1.3 Install the app in the workspace

Still in OAuth & Permissions :
- Click on  Install to Workspace
- Accept permissions
- keep the Bot User OAuth Token for later (format : `xoxb-.............-..............-........................`).


---


## 2. 🤖 deploy the bot logic as a serverless function in Netlify
- connect to https://www.netlify.com/
- Add new project / import an existing project
- from github (not sure we are able to import from someone else's repository)
- set a project name, the branch from which to auto-deploy...
- add the following env variables
```
SLACK_BOT_TOKEN=xoxb-... # bot user OAuth token
SLACK_SIGNING_SECRET=... # in basic information from the slack bot
```
- save and trigger deploy
- check the hello function responds: https://<your-project-name>.netlify.app/.netlify/functions/hello
- get the deployment URL: `https://<your-project-name>.netlify.app/.netlify/functions/slack-events`


---


### 3. ⚙️ configure Event Subscriptions

- Back to https://api.slack.com/apps, click on your app.
- Event Subscriptions
- toggle switch to ON
- in Request URL, put the deployment URL you got from netlify. It should mark it as `Verified ✓`
- in "Subscribe to bot events" section, add `message.channels` and `message.groups`
- Save changes

### 🚀 Run it 

- In any Slack channel, run : `/invite @<BotName>` 
- Send messages containing X (formerly twitter) URLs, for instance `https://x.com/FFLose`

If everythink works, your bot should post a message with the anonymous URL. 🎉 