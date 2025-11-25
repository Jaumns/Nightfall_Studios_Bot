module.exports = {
  name: 'clearchat',
  description: 'Limpa todas as mensagens do canal atual.',

  async execute(message) {
    if (!message.member.permissions.has('Administrator'))
      return message.reply('Você precisa ser administrador para usar este comando.');

    const channel = message.channel;

    // Busca até 100 mensagens do canal
    const msgs = await channel.messages.fetch({ limit: 100 });

    if (msgs.size === 0) return message.reply('Não há mensagens para limpar.');

    // Apaga todas as mensagens
    await channel.bulkDelete(msgs, true);

    message.channel.send('🧹 Limpei todas as mensagens deste canal!').then(msg => {
      setTimeout(() => msg.delete().catch(() => {}), 5000);
    });
  }
};
