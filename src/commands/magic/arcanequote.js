module.exports = {
  name: 'arcanequote',
  async execute(message) {
    const quotes = [
      '✨ *“A magia está nas entrelinhas do silêncio.”*',
      '🔥 *“Todo feitiço nasce de um pensamento que ousou ir longe demais.”*',
      '🌙 *“A lua observa, mas nunca julga.”*',
      '🔮 *“O futuro muda toda vez que você respira.”*'
    ];

    const random = quotes[Math.floor(Math.random() * quotes.length)];
    message.reply(random);
  }
};
