// src/index.js
const { Client, GatewayIntentBits } = require('discord.js');
const { PREFIX, DISCORD_TOKEN } = require('./config');
const commands = require('./commands');
const { REFRESH_MS } = require('./constants');
const { getGuildConfig } = require('./config-store');

// Cria o client antes de qualquer evento
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // necessário para boas-vindas/despedida
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// ---------------------- BOAS VINDAS - NIGHTFALL STUDIOS ----------------------
client.on('guildMemberAdd', async (member) => {
    try {
        const welcomeChannelId = "1439781209583517746";
        const channel = member.guild.channels.cache.get(welcomeChannelId);
        if (!channel) return console.log("Canal de boas-vindas não encontrado.");

        const embed = {
            color: 0x8B0000,
            title: "🎬 Bem-vindo ao Nightfall Studios!",
            description: `Olá **${member.user.tag}**, seja bem-vindo(a) ao universo Nightfall Studios! 🌙`,
            thumbnail: { url: member.user.displayAvatarURL({ dynamic: true, size: 1024 }) },
            footer: { text: "Prepare-se para grandes aventuras conosco!" },
            timestamp: new Date()
        };

        await channel.send({ content: `👋 Olá ${member}, boas-vindas ao Nightfall Studios!`, embeds: [embed] });

    } catch (err) {
        console.error("Erro ao enviar mensagem de boas-vindas:", err);
    }
});

// ---------------------- DESPEDIDA - NIGHTFALL STUDIOS ----------------------
client.on('guildMemberRemove', async (member) => {
    try {
        const goodbyeChannelId = "1442988909339344907";
        const channel = member.guild.channels.cache.get(goodbyeChannelId);
        if (!channel) return console.log("Canal de despedida não encontrado.");

        const embed = {
            color: 0x8B0000,
            title: "🌙 Goodbye",
            description: `SOO LONG, WAYFARING STRANGER`,
            thumbnail: { url: member.user.displayAvatarURL({ dynamic: true, size: 1024 }) },
            timestamp: new Date()
        };

        await channel.send({ embeds: [embed] });

    } catch (err) {
        console.error("Erro ao enviar mensagem de despedida:", err);
    }
});

// ---------------------- COMANDOS ----------------------
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const guildId = message.guild.id;
  const guildConfig = getGuildConfig(guildId);
  const allowedChannelId = guildConfig.allowedChannelId || null;

  if (allowedChannelId && message.channel.id !== allowedChannelId) return;

  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  const command = commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (err) {
    console.error(`Erro ao executar comando ${commandName}:`, err);
    message.reply('❌ Ocorreu um erro ao executar esse comando.');
  }
});

client.once('ready', () => {
  async function clearAllowedChannel() {
    for (const [guildId, guild] of client.guilds.cache) {
      try {
        const cfg = getGuildConfig(guildId);
        const channelId = cfg.allowedChannelId;
        if (!channelId) continue;

        const channel = await client.channels.fetch(channelId).catch(() => null);
        if (!channel) continue;

        const messages = await channel.messages.fetch({ limit: 100 });
        if (messages.size > 0) {
          await channel.bulkDelete(messages, true);
          console.log(`[ClearChat] Limpou ${messages.size} mensagens no canal ${channelId} da guild ${guildId}`);
        }
      } catch (err) {
        console.error('[ClearChat] Erro ao limpar canal:', err);
      }
    }
  }

  setInterval(clearAllowedChannel, REFRESH_MS);
  console.log(`Logado como ${client.user.tag}`);
});

client.login(DISCORD_TOKEN);


const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

//A FAZER AINDA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Depois do seu embed de boas-vindas, adicione o role select
const roleRow = new ActionRowBuilder().addComponents(
  new StringSelectMenuBuilder()
    .setCustomId('role_select_welcome') // ID único do menu
    .setPlaceholder('Escolha suas roles no Nightfall Studios...')
    .addOptions([
      {
        label: 'Novato',
        description: 'Role para iniciantes',
        value: 'role_id_novato', // substitua pelo ID real da role
      },
      {
        label: 'Veterano',
        description: 'Role para players experientes',
        value: 'role_id_veterano', // substitua pelo ID real da role
      },
      {
        label: 'Streamer',
        description: 'Role para quem transmite',
        value: 'role_id_streamer', // substitua pelo ID real da role
      },
    ])
);

// Envia o select menu junto com o embed
await channel.send({ content: `${member}`, embeds: [embed], components: [roleRow] });



client.on('interactionCreate', async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId !== 'role_select_welcome') return;

  const selectedRoles = interaction.values; // array de role IDs selecionadas
  try {
    await interaction.member.roles.add(selectedRoles);
    await interaction.reply({ content: '✅ Suas roles foram aplicadas com sucesso!', ephemeral: true });
  } catch (err) {
    console.error('Erro ao adicionar role:', err);
    await interaction.reply({ content: '❌ Não consegui aplicar suas roles.', ephemeral: true });
  }
});



