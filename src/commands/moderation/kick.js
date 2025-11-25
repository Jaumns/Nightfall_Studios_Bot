module.exports = {
  name: 'kick',
  async execute(message, args) {
    if (!message.member.permissions.has('KickMembers')) {
      return message.reply('❌ Você não tem permissão pra isso.');
    }

    const user = message.mentions.members.first();
    if (!user) return message.reply('Use: `!kick @usuário`');

    try {
      await user.kick('Kick via comando');
      message.channel.send(`👢 Usuário **${user.user.username}** foi chutado.`);
    } catch (err) {
      console.error(err);
      message.reply('❌ Não consegui expulsar esse usuário.');
    }
  }
};
