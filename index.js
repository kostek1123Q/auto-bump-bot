const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const CHANNEL_ID = process.env.CHANNEL_ID;

client.once('ready', () => {
  console.log(`Zalogowano jako ${client.user.tag}`);
  startAutoBump();
});

function startAutoBump() {
  const bumpInterval = 1000 * 60 * 60 * 2; // 2 godziny

  setInterval(async () => {
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (channel) {
      try {
        await channel.send('/bump');
        console.log('Wysłano /bump');
      } catch (err) {
        console.error('Błąd przy bumpowaniu:', err);
      }
    } else {
      console.error('Nie znaleziono kanału');
    }
  }, bumpInterval);
}

client.login(process.env.DISCORD_TOKEN);
