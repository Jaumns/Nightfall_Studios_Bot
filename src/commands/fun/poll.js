const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'poll',
  description: 'Cria uma votação minimalista.',

  async execute(message, args) {
    const full = args.join(" ").split(";");
    if (full.length < 2)
      return message.reply("Use: !poll pergunta; opção1; opção2; ...");

    const question = full[0].trim();
    const options = full.slice(1).map(o => o.trim());

    const numbers = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣"];

    const embed = new EmbedBuilder()
      .setTitle("📊 Votação")
      .setDescription(`**${question}**\n\n` +
        options.map((o,i) => `${numbers[i]} ${o}`).join("\n"))
      .setColor("#2f3136");

    const pollMsg = await message.channel.send({ embeds: [embed] });

    for (let i = 0; i < options.length; i++)
      await pollMsg.react(numbers[i]);
  }
};
