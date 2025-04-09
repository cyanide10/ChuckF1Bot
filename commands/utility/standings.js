const {SlashCommandBuilder} = require('discord.js');
const { cooldown } = require('./ping');

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
    .setName('standings')
    .setDescription('Shows the current standings'),
    async execute(interaction) {
        await interaction.reply('In progress.');
    }
};