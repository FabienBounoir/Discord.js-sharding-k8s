// bot.js
const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.MessageCreate, message => {
	if (message.content === '!bot') {
		return message.reply({content:`Hello word`})
	}
});

client.login(process.env.TOKEN);