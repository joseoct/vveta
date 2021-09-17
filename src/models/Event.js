function Event (name, guildId) {
  this.name = name;

  this.participants = [];

  this.guildId = guildId;

  this.getParticipants = () => {
    return this.participants;
  }

  this.getName = () => {
    return this.name;
  }

  this.getGuildId = () => {
    return this.guildId;
  }
}

module.exports = Event;