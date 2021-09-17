const { Client, Intents, MessageEmbed, RichEmbed } = require('discord.js');
const config = require('./config.json');
const EventController = require('./controllers/EventController.js');
const { handleEmbedMessages } = require('./utils/embed')

const intents = new Intents(32767);

const client = new Client({ intents })

const eventController = new EventController()

eventController.create('a', "708487845454544996")
eventController.create('b', "708487845454544996")

client.on('messageCreate', message => {
  if (message.content.startsWith(config.PREFIX)) {
    if (message.author.bot) return;
    
    const msg = message.content.substr(1);

    if (msg.startsWith('ie')) {
      
      if (msg.endsWith('iniciar-evento')) {
        handleEmbedMessages(message.channel, 'O evento precisa de um nome');
        
        return;
      } 

      const [,name] = msg.split('iniciar-evento ');

      if (eventController.getByGuildIdAndName(name, message.guildId)) {
        handleEmbedMessages(message.channel, `Este evento ja foi criado`)

        return;
      }

      const eventCreated = eventController.create(name, message.guildId)

      handleEmbedMessages(message.channel, `O evento ${eventCreated.name} foi criado`)
    };

    if (msg.startsWith('le')) {

      const filteredEventsByGuild = eventController.getByGuildId(message.guildId)

      filteredEventsByGuild.forEach(element => {
        handleEmbedMessages(message.channel, `${element.name}`, element.participants)
      })

    };

    if (msg.startsWith('ap')) {
      const [,participants] = msg.split('ap ');

      const mentions = message.mentions.users;

      const participantsSplitted = participants.split(' ');

      const eventName = participantsSplitted[0];

      const participantsMentions = [];

      mentions.map(element => participantsMentions.push(element.username));

      eventController.addParticipantsToEvent(message.guildId, eventName, participantsMentions)

      const event = eventController.getByGuildIdAndName(eventName, message.guildId)

      handleEmbedMessages(message.channel, `${event.name}`, event.participants)

      let embed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('sfgwea');

    }
  }
})

client.on('messageReactionAdd', async reaction => {



  // const filter = (reaction, user) => (reaction.emoji.id === '718418753137803367' || reaction.emoji.id === '718421670276235344') && user.id !== client.user.id;

  // const collector = reaction.message.createReactionCollector(filter, { time: 15000 });

  // collector.on('collect', (r, user) => {
  //     console.log(`Collected ${r.emoji.name}`);
  //     if (r.emoji.id === '718418753137803367') {
  //       reaction.message.edit(first)
  //     }
  //     else if (r.emoji.id === '718421670276235344') {
  //         // Do something with reaction 2
  //     }
  // });
})

client.login(config.BOT_TOKEN);