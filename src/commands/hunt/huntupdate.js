// src/commands/hunt/huntupdate.js
const { EmbedBuilder } = require('discord.js');
const Parser = require('rss-parser');
const fetch = require('node-fetch');

const parser = new Parser({
  customFetch: async (url, options) => {
    return fetch(url, {
      ...options,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
  }
});

const STEAM_HUNT_RSS = 'https://store.steampowered.com/feeds/news/app/594650/';
const REDDIT_CODES_RSS = 'https://www.reddit.com/r/HuntShowdown/new/.rss'; // subreddit oficial ou confiável de códigos

// Busca a última atualização do Hunt
async function fetchHuntNews() {
  const feed = await parser.parseURL(STEAM_HUNT_RSS);
  const latest = feed.items[0]; // pega apenas o último update
  return {
    title: latest.title,
    link: latest.link,
    pubDate: latest.pubDate,
    content: latest.contentSnippet || '',
    image: latest.enclosure?.url || null
  };
}

// Busca códigos ativos confiáveis do subreddit oficial
async function fetchHuntCodes() {
  const codes = [];
  try {
    const feed = await parser.parseURL(REDDIT_CODES_RSS);
    feed.items.forEach(item => {
      const matches = item.title.match(/\b[A-Z0-9]{6,12}\b/g); // detecta possíveis códigos
      if (matches) codes.push(...matches);
    });
  } catch (err) {
    console.error('Erro ao buscar códigos ativos:', err);
  }
  return codes.slice(0, 10); // limita a 10 códigos
}

module.exports = {
  name: 'huntupdates',
  description: 'Mostra a última atualização do Hunt: Showdown com imagens e códigos integrados.',

  async execute(message) {
    try {
      const upd = await fetchHuntNews();
      const codes = await fetchHuntCodes();

      const embed = new EmbedBuilder()
        .setTitle(`🔥 ${upd.title}`)
        .setURL(upd.link)
        .setDescription(upd.content || 'Sem descrição disponível')
        .setColor('#8B0000')
        .setThumbnail('https://cdn.cloudflare.steamstatic.com/steam/apps/594650/header.jpg')
        .setTimestamp(new Date(upd.pubDate))
        .setFooter({ text: 'Fonte: Steam News & Reddit' });

      if (upd.image) embed.setImage(upd.image);

      if (codes.length > 0) {
        embed.addFields({
          name: '🎁 Códigos Ativos',
          value: codes.map(code => `\`${code}\``).join(' | '),
          inline: false
        });
      }

      await message.channel.send({ embeds: [embed] });

    } catch (err) {
      console.error('Erro ao buscar atualizações do Hunt:', err);
      message.channel.send('❌ Não consegui buscar a última atualização do Hunt no momento.');
    }
  }
};
