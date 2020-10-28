const seedrandom = require('seedrandom');
const fs = require('fs')
const adjectives = fs.readFileSync("adjectives.txt", "utf-8").split("\r\n")
const nouns = fs.readFileSync("nouns.txt", "utf-8").split("\r\n")
const emojis = fs.readFileSync("emoji.txt", "utf-8").split("\r\n")

function randomName(id){
    let rng = seedrandom(id);
    
    let adj = adjectives[Math.floor(rng()*adjectives.length)];
    let noun = nouns[Math.floor(rng()*nouns.length)];
    let emoji = emojis[Math.floor(rng()*emojis.length)];


    return (emoji+" "+adj+" "+noun+" "+emoji).toLowerCase()
}

module.exports = randomName