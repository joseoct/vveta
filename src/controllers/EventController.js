const Event = require('../models/Event')

function EventController () {

  this.events = [];

  this.create = (name, guildId) => {
    const event = new Event(name, guildId);

    this.events.push(event);

    return event;
  }

  this.getByGuildIdAndName = (name, guildId) => {
    const eventFound = this.events.find(element => element.name === name && element.guildId === guildId)

    return eventFound;
  }

  this.getByGuildId = (guildId) => {
    return this.events.filter(element => element.guildId === guildId);
  }

  this.addParticipantsToEvent = (guildId, name, participants) => {
    const event = this.getByGuildIdAndName(name, guildId);

    participants.forEach(element => {
      const participant = {};

      participant.name = element;
      participant.status = false;

      event.participants.push(participant)
    });
  }
}

module.exports = EventController; 