

const Memebot = require("./memebot");
const client = new Memebot();

client.once('ready', require("./register-commands"));

client.on('messageCreate', (message) => {

    if (message.content === 'hello') {
        message.reply('hello');
    }
})

client.on('interactionCreate', async interaction => {
    
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    
    if(!command) return;

    try {    
        await command.execute({client, interaction});
    }
    catch(error) {
        console.error(error);
        await interaction.reply({content: "Error executing this command"});
    }
})

client.login(client.token);

const getClient = () => client;

module.exports = {getClient};
