const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        'GuildMembers',
        'DirectMessages',
        'Guilds',
        'GuildMessages',
        'MessageContent'
    ]
});
const CONFIG = require('../json/config.json');
let date = new Date();
client.on('ready', () => {
    console.log(`Conectado como ${client.user.tag}`);
});

client.on('messageCreate', message => {

    if (message.content.startsWith('/dados ') && message.channel.id === CONFIG.idCanal) {
        // Obtener el número de dados a tirar
        const numDados = parseInt(message.content.slice('/dados '.length));
        
        // Verificar si el número de dados es válido
        if (isNaN(numDados) || numDados < 1) {
          message.reply('Por favor, introduce un número válido de dados a tirar.');
          return;
        }
        
        // Generar un resultado para cada dado
        const resultadosDados = [];
        for (let i = 0; i < numDados; i++) {
          resultadosDados.push(Math.floor(Math.random() * 100) + 1);
        }
        
        // Responder con los resultados de los dados
        message.reply(`${message.author} tiró ${numDados} dados. Los resultados son: ${resultadosDados.join(', ')}`);
      }
});

client.login(CONFIG.token);