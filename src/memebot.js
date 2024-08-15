

require("dotenv").config()

const { Client, IntentsBitField, Collection} = require('discord.js');

class memebot extends Client {

    constructor (props = {
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent,
        ]
    }) {
        
        super(props);
        
        this.prefix = "!";
        this.commands = new Collection();
        this.token = process.env.TOKEN;
        this.clientid = process.env.CLIENT_ID;
        
        this.redditclientid = process.env.REDDITCLIENTID;
        this.redditusername = process.env.REDDITUSERNAME;
        this.redditsecretkey = process.env.REDDITSECRETKEY;
        this.redditpass = process.env.REDDITPASSWORD
        this.redditagent = process.env.REDDITAGENT
    }
}

module.exports = memebot;
