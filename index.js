const dotenv = require("dotenv")
dotenv.config()

const randName = require("./name");

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on("message",async (message)=>{
    if(!message.guild) return
    if(message.content != "!mask") return

    if(!message.guild.me.permissions.has("MANAGE_NICKNAMES")) return message.channel.send("Missing Permissions to change nickname! You cannot don the mask of **"+toTitleCase(randName(message.author.id+message.guild.id))+"**")

    if(message.guild.me.roles.highest.position <= message.member.roles.highest.position) return message.channel.send("My role is too low to change your nickname! You cannot don the mask of **"+toTitleCase(randName(message.author.id+message.guild.id))+"**")
    
    try{
        await message.member.setNickname(toTitleCase(randName(message.author.id+message.guild.id)))
    } catch(e){
        switch(e.message){
            case "Missing Permissions":
                return message.channel.send("Missing Permissions to change your nickname! You cannot don the mask of **"+toTitleCase(randName(message.author.id+message.guild.id))+"**")
                break;
            default:
                console.error(e);
                console.error(toTitleCase(randName(message.author.id+message.guild.id)))
                return message.channel.send("Something went wrong...");
        }
    }
    message.channel.send("*You don the mask of **"+toTitleCase(randName(message.author.id+message.guild.id))+"***")
})

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

client.login(process.env.TOKEN);
