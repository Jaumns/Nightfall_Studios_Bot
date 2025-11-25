// ---------------------- 🎵 Music Commands ----------------------
const play = require('./music_commands/play');
const skip = require('./music_commands/skip');
const stop = require('./music_commands/stop');
const queue = require('./music_commands/queue');

// ---------------------- 🛠 Admin ----------------------
const config = require('./admin/config');

// ---------------------- ✨ Magic Commands ----------------------
const arcanequote = require('./magic/arcanequote');
const castspell = require('./magic/castspell');

// ---------------------- 🛡 Moderation ----------------------
const kick = require('./moderation/kick');

// ---------------------- 🎮 Fun ----------------------
const poll = require('./fun/poll');

// ---------------------- 📊 Level System ----------------------
const rank = require('./rank/rank');

// ---------------------- 📜 Help ----------------------
const help = require('./help');

// ---------------------- HUNT SHOWDOWN ----------------------
const huntupdate = require('./hunt/huntupdate'); // <--- igual ao nome do arquivo

// ---------------------- CLEAR CHAT ---------------------
const clearchat = require('./clearchat/clearchat');
const clearmine = require('./clearmine/clearmine');

const commands = new Map();

const allCommands = [
  play,
  skip,
  stop,
  queue,
  config,
  huntupdate, // <--- nome corrigido aqui também
  arcanequote,
  castspell,
  kick,
  poll,
  clearchat,
  clearmine,
  rank,
  help
];

// Registra todos os comandos no Map
allCommands.forEach((cmd) => commands.set(cmd.name, cmd));

module.exports = commands;
