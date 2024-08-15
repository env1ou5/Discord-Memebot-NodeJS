

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const snoowrap = require('snoowrap');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("meme")
		.setDescription("generates a random meme"),

	execute: async ({ client, interaction }) => {
       
        const r = new snoowrap({
            userAgent: client.redditagent,
            clientId: client.redditclientid,
            clientSecret: client.redditsecretkey,
            username: client.redditusername,
            password: client.redditpass,
        })

        await ((await r.getSubreddit("memes").getRandomSubmission()).fetch().then( async meme => {
            let title = meme.title;
            let image = meme.url;
            let author = meme.author; 
            
            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`${title}`)
            .setImage(`${image}`)
            .setURL(`${image}`)
            .setFooter({ text : author.name })

            await interaction.reply({ embeds : [embed]} );
        }))
        
	},
}