# 🌙 Nightfall Bot (Discord)

**A mystical, interactive Discord bot designed to enchant your server with fun commands, moderation tools, magical features, and real-time game updates.**

---

## 📜 Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Configuration](#configuration)
* [Commands](#commands)
* [Contributing](#contributing)
* [License](#license)

---

## ✨ Overview

**Nightfall Bot (Discord)** brings a touch of magic to your community.
Built with **Node.js & Discord.js**, it provides interactive commands, fun utilities, automation tools, and real-time game updates for communities and gamers.

Whether you’re running a gaming server, a community hub, or a role-play server, Nightfall Bot adds **engagement, moderation, mystical charm, and live gaming news**.

---

## 🛠 Features

* **🔮 Magic-themed commands:** Unique, mystical interactions like `!arcanequote` and `!castspell`.
* **🛡 Moderation tools:** Kick users, manage roles, auto-moderate, and welcome new members.
* **🎮 Fun & interactive:** Polls, games, quotes, and role-play utilities.
* **🎵 Music commands:** Play, skip, queue, stop, and manage music in voice channels.
* **📊 Ranking system:** Track levels, XP, and user progression in the server.
* **🎯 Hunt Showdown Updates:** Real-time game news, patch notes, images, and active promo codes via `!huntupdates`.
* **🌙 Welcome & Goodbye Messages:** Personalized embeds for new members and departing users.
* **🎛 Role Select Menu:** Let users assign themselves roles via an interactive menu on entry.
* **⚙️ Customizable:** Set prefix, activity status, welcome channels, moderation roles, and more.
* **🧩 Extendable:** Easily add new commands or modules.

---

## 💻 Installation

1. Clone the repository:

```bash
git clone https://github.com/Jaumns/NIGHTFALL.git
```

2. Navigate into the project directory:

```bash
cd NIGHTFALL
```

3. Install dependencies:

```bash
npm install
```

4. Configure your environment variables in a `.env` file:

```env
DISCORD_TOKEN=your_bot_token_here
PREFIX=!
```

---

## 🚀 Usage

Start the bot:

```bash
npm start
```

Invite Nightfall Bot to your Discord server using an OAuth2 invite link with the proper permissions.

Use your configured prefix (e.g., `!`) to run commands in your server.

---

## ⚙️ Configuration

Configure the bot via a `.env` file or `config.json`:

```json
{
  "prefix": "!",
  "ownerID": "YOUR_DISCORD_ID",
  "activity": "Exploring the night skies",
  "welcomeChannel": "welcome",
  "goodbyeChannel": "goodbye",
  "moderationRoles": ["Mod", "Admin"]
}
```

* **prefix:** Command prefix for your server
* **ownerID:** Bot owner’s Discord ID (admin-only commands)
* **activity:** Status message displayed by the bot
* **welcomeChannel:** Channel for welcome messages
* **goodbyeChannel:** Channel for farewell messages
* **moderationRoles:** Roles allowed to moderate users

---

## 📝 Commands

Examples of Nightfall Bot commands:

* `!arcanequote` → Returns a magical quote ✨
* `!castspell @user` → Enchants a user with a themed message 🪄
* `!kick @user [reason]` → Moderation: kicks a user 🛡️
* `!poll "Which game tonight?" "Yes" "No"` → Creates a poll in your server 📊
* `!play [song]` → Plays music in a voice channel 🎵
* `!skip` → Skips current song ⏭️
* `!queue` → Shows song queue 📜
* `!stop` → Stops music playback ⏹️
* `!rank @user` → Shows user level and XP 🎯
* `!huntupdates` → Displays the latest Hunt Showdown updates, images, and active promo codes 🔥

*(Add all other commands here with usage descriptions.)*

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "Add feature X"`
4. Push to your branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
