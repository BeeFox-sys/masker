const dotenv = require("dotenv")
dotenv.config()

const randName = require("./name");

const Discord = require('discord.js');
const client = new Discord.Client();

let lyrics = [
    "Willkommen, bienvenue, welcome!",
    "Fremde, étranger, stranger",
    "Glücklich zu sehen, je suis enchanté, happy to see you",
    "Bleibe, reste, stay"
]
client.once('ready', async () => {
    console.log('Ready!');
    console.log(client.user.setActivity("Go! Child - The Masquerade | "+lyrics[Math.floor(Math.random()*lyrics.length)],{type: "LISTENING"}))
    client.setInterval(()=>{
        client.user.setActivity("Go! Child - The Masquerade | "+lyrics[Math.floor(Math.random()*lyrics.length)],{type: "LISTENING"})
    },10*60*1000)
});

client.on("message",async (message)=>{
    if(!message.guild) return
    if(message.content != "?ticket") return

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
    message.channel.send("*Your ticket reads **"+toTitleCase(randName(message.author.id+message.guild.id))+"***")
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

process.on('SIGTERM', () => {
    client.destroy(() => {
      console.log('Process terminated')
    })
  })
