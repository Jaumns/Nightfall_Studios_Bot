module.exports = {
  name: 'help',
  async execute(message) {
    const commands = require('./index');

    let txt = '📜 **Lista de Comandos Disponíveis**\n\n';

    for (const [name] of commands.entries()) {
      txt += `🔹 **!${name}**\n`;
    }

    message.reply(txt);
  }
};
