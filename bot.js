// bot.js
const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages] });

client.on(Events.MessageCreate, message => {
	console.log(message)
	if (message.content === '!bot') {
		return message.reply({content:`Hello word`})
	}
});

client.on(Events.ClientReady, () => {
	console.log("Guilds: "+client.guilds.cache.size)
});


client.login(process.env.TOKEN);