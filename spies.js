const dotenv = require("dotenv")
dotenv.config()

const Discord = require('discord.js');
const client = new Discord.Client();
// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

const invites = {}
let oldInvite;

client.on('ready', async () => {
  // Load all invites for all guilds and save them to the cache.
//   oldInvite = await client.fetchInvite("x9Q5mkgb9q");
//   console.log(oldInvite)
// console.log("reday!")
  client.guilds.fetch("772657313348714527").then(g=>{
        g.fetchInvites().then(guildInvites => {
          for (const invite of guildInvites) {
              if(invite[0] == "PMcdGEfqhP") oldInvite = invite[1]
          }
        }).then(()=>{console.log("ready!");}).catch(()=>{console.log("error no perms"); process.exit(1)});});
  
});

let newInvite;
client.on('guildMemberAdd', async (member) => {
    // let newInvite = await client.fetchInvite("x9Q5mkgb9q");
    await client.guilds.fetch("772657313348714527").then(async g=>{
        await g.fetchInvites().then(guildInvites => {
          for (const invite of guildInvites) {
              if(invite[0] == "PMcdGEfqhP") newInvite = invite[1]
          }
        })})
    if(!newInvite) return;
    if(newInvite.uses > oldInvite.uses){
        console.log("spy join!");
        member.roles.add("776653094180225056")
    } else {
        console.log("mild low join!");
    }
    oldInvite = newInvite;

    // if(member.guild.id != "772657313348714527") return

    // To compare, we need to load the current invite list.
    // member.guild.fetchInvites().then(guildInvites => {
    //   // This is the *existing* invites for the guild.
    //   const ei = invites[member.guild.id];
    //   // Update the cached invites for the guild.
    //   invites[member.guild.id] = guildInvites;
    //   // Look through the invites, find the one for which the uses went up.
    //   const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    //   // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    //   const inviter = client.users.get(invite.inviter.id);
    //   // Get the log channel (change to your liking)
    //   const logChannel = member.guild.channels.cache.find(channel => channel.name === "join-logs");
    //   // A real basic message with the information we need. 
    //   logChannel.send(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);

    //   if(invite.code = "PMcdGEfqhP"){
    //       console.log("ITS A SPY!")
    //   }
    // });
  });

  client.login(process.env.TOKEN);
