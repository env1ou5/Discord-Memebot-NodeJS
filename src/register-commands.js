


const {REST, Routes} = require('discord.js');

const path = require('path');
const fs = require('fs');

module.exports = async(client) => {

    const commands = [];
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for(const file of commandFiles) {
        const command = require(`../commands/${file}`);
            
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    }

    const guild_ids = client.guilds.cache.map(guild => guild.id);

    const rest = new REST({version: '10'}).setToken(client.token);

    for (const guildId of guild_ids) {
        rest.put(Routes.applicationGuildCommands(client.clientid, guildId), {body: commands})
        .then(() => console.log('Successfully updated commands for guild ' + guildId))
        .catch(console.error);
    }

    console.log(`${client.user.tag} is online!`);
}
