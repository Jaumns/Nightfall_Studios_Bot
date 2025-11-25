const { EmbedBuilder } = require('discord.js');
const spells = require('./spells');

module.exports = {
  name: 'castspell',
  description: 'Lança um spell aleatório!',

  async execute(message) {
    const randomSpell = spells[Math.floor(Math.random() * spells.length)];

    const embed = new EmbedBuilder()
      .setTitle('✨ Spell Lançado!')
      .setDescription(randomSpell)
      .setColor('#8A2BE2') // roxo místico
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  }
};
