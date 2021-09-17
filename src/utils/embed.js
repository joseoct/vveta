const { MessageEmbed } = require('discord.js')

function handleEmbedMessages (channel, title, participants) {
  // const embed = new MessageEmbed()
  //   .setColor('YELLOW')
  //   .setTitle(title);

  // participants.forEach(element => {
  //   embed.addFields({
  //     name: element.name,
  //     value: element.status ? 'Comparecerá' : 'Não comparecerá'
  //   })
  // });

  // channel
  //   .send({ embeds: [embed] })
  //   .then((embedMessage) => {
  //     embedMessage.react('👍');
  //     embedMessage.react('👎');
  //   })
  const reactionFilter = (reaction, user) => reaction.emoji.name === '✅';

  const embed = new MessageEmbed()
    .setColor('YELLOW')
    .setTitle(title);

  channel
    .send(embed)
    .then((msg) => msg.react('✅'))
    .then((mReaction) => mReaction.message.react('❎'))
    .then((mReaction) => {
      // createReactionCollector - responds on each react, AND again at the end.
      const collector = mReaction.message.createReactionCollector(
        reactionFilter,
        {
          time: 15000,
        },
      );

      // set collector events
      collector.on('collect', (r) => {
        // immutably copy embed's Like field to new obj
        let embedLikeField = Object.assign({}, embed.fields[0]);

        // update 'field' with new value
        embedLikeField.value = '<3 <3 <3';

        // create new embed with old title & description, new field
        const newEmbed = new MessageEmbed().setColor('BLUE').setTitle(title);

        // edit message with new embed
        // NOTE: can only edit messages you author
        r.message
          .edit(newEmbed)
          .then((newMsg) => console.log(`new embed added`))
          .catch(console.log);
      });
      collector.on('end', (collected) =>
        console.log(`Collected ${collected.size} reactions`),
      );
    })
    .catch(console.log);
}

module.exports = { handleEmbedMessages };
