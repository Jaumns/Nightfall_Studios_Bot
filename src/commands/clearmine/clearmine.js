module.exports = {
  name: 'clearmine',
  description: 'Limpa todas as mensagens do bot em todos os canais da guild.',

  async execute(message) {
    if (!message.member.permissions.has('Administrator'))
      return message.reply('Você precisa ser administrador para usar este comando.');

    const guild = message.guild;
    let total = 0;

    for (const [channelId, channel] of guild.channels.cache) {
      if (!channel.isTextBased()) continue;

      const msgs = await channel.messages.fetch({ limit: 100 }).catch(() => null);
      if (!msgs) continue;

      const botMsgs = msgs.filter(m => m.author.id === message.client.user.id);
      if (botMsgs.size === 0) continue;

      await channel.bulkDelete(botMsgs, true);
      total += botMsgs.size;
    }

    message.reply(`🧹 Limpei **${total}** mensagens minhas em todos os canais.`).then(msg => {
      setTimeout(() => msg.delete().catch(() => {}), 5000);
    });
  }
};
