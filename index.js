const dotenv = require("dotenv")
dotenv.config()

const randName = require("./name");

const Discord = require('discord.js');
const client = new Discord.Client();

let lyrics = [
    "We're breaking free and singing!",
    "The bad things in our life can't stop these joyful overtones",
    "I'm too afraid to be alone",
    "And though it's hard to cope, With such a narrow road, I'll pay my dues with hope, For the unknown",
    "You always get in my mind, It hasn't stopped being the same since you told me your name",
    "No rhyme or reason, just a smile, That's only growing wider",
    "Keep my head turned towards the skies, I don't want this demise, If I need beauty, Will you be here",
    "You're worth the fight, You are strong and you can overcome it",
    "One look around, Shows me a lot of promise, The peaceful sound, The potential inside us, Our time is now",
    "This crowd is finally free, We've finally escaped the Masquerade",
    "Oh, if you hear me call will you show me the way to go"
]
client.once('ready', async () => {
    console.log('Ready!');
    console.log(client.user.setActivity("Go! Child - The Masquerade | "+lyrics[Math.floor(Math.random()*lyrics.length)],{type: "LISTENING"}))
    client.setInterval(()=>{
        console.log(client.user.setActivity("Go! Child - The Masquerade | "+lyrics[Math.floor(Math.random()*lyrics.length)],{type: "LISTENING"}))
    },10*60*1000)
});

client.on("message",async (message)=>{
    if(!message.guild) return
    if(message.content != "?mask") return

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

process.on('SIGTERM', () => {
    client.destroy(() => {
      console.log('Process terminated')
    })
  })
