const Canvas = require('canvas');
const { AttachmentBuilder } = require('discord.js');

module.exports = {
  name: 'rank',
  description: 'Mostra seu perfil estilizado.',

  async execute(message) {
    const user = message.author;

    // Tamanho da imagem
    const canvas = Canvas.createCanvas(900, 300);
    const ctx = canvas.getContext('2d');

    // Fundo
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, 900, 300);

    // Avatar
    const avatar = await Canvas.loadImage(user.displayAvatarURL({ extension: 'png' }));
    ctx.save();
    ctx.beginPath();
    ctx.arc(150, 150, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 50, 50, 200, 200);
    ctx.restore();

    // Nome
    ctx.fillStyle = '#ffffff';
    ctx.font = '40px sans-serif';
    ctx.fillText(`${user.username}`, 300, 120);

    // XP (fake por enquanto)
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#bbbbbb';
    ctx.fillText(`Level: 5`, 300, 180);
    ctx.fillText(`XP: 1200 / 2000`, 300, 220);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'rank.png' });
    message.reply({ files: [attachment] });
  }
};
