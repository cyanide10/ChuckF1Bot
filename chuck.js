require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');

// Add GuildMessages intent
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
if (!fs.existsSync(foldersPath)) {
    console.error('Commands folder not found');
    process.exit(1);
}

const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

client.on(Events.ClientReady, () => {
    console.log('Logged in as ' + client.user.tag);
});

client.on('messageCreate', async (message) => {
    console.log(`Message received: ${message.content}`); // Debugging log

    
    if (message.author.bot) return; // Ignore bot messages

    if (message.content.toLowerCase() === 'hello') {
        console.log('Replying to hello'); // Debugging log
        await message.reply('Hi there!');
    }
    if(message.content.toLowerCase() === 'chuck') {
        await message.reply('That is I!');
    }
});

client.on('error', (error) => {
    console.error('An error occurred:', error);
});

client.login(process.env.CLIENT_TOKEN);


