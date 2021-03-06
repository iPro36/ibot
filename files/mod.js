exports.run = (bot, msg, args, command, Discord, ms, moment, prefix) =>
{
  const fs = require("fs");

  //Checks for bot-log
  if (!msg.guild.channels.find(ch => ch.name === 'ilog'))
  {
    msg.guild.createChannel("ilog","text",[{
      id: msg.guild.id,
      deny: ['READ_MESSAGES'],
    }])
    return msg.channel.send("It seems like there was no where for me to log, so I made a new log channel.\n"+
    "`Its only availabel to admins. Make sure you change perms according to your needs.`");
  }

  let logChannel = msg.guild.channels.find(ch => ch.name === 'ilog');

  //Gives the list of mod commands
  if (command == 'modhelp')
  {
    if (!msg.member.roles.find("name", "Moderator") && !msg.member.permissions.has('KICK_MEMBERS' || 'BAN_MEMBERS' || 'ADMINISTRATOR' || 'MANAGE_ROLES' || 'MANAGE_MESSAGES'))
    {
      msg.delete(1);
      return msg.author.send(`It looks like you don't have enough permissions to use that command.`)
    }

      const modhelp = new Discord.RichEmbed()
      .setColor('#54eb68')
      .setAuthor('iCommands', bot.user.avatarURL)
      .addField(`• **Mod Commands: **`,
      `> • \`${prefix}kick [username] [reason]:\` Kicks Someone  from the server\n`+
      `> **Perm Req:** *Kick*\n`+
      `> • \`${prefix}ban [username] [reason]:\` Bans Someone from the Server\n`+
      `> **Perm Req:** *Ban*\n`+
      `> • \`${prefix}mute [username] [time] [reasons]:\` Mutes the said person\n`+
      `> **Perm Req:** *Admin*/*Kick*/*Ban*/*Manage Roles*\n`+
      `> • \`${prefix}unmute [username]:\` UnMutes the said person\n`+
      `> **Perm Req:** *Admin*/*Kick*/*Ban*/*Manage Roles*\n`+
      `> • \`${prefix}warn [username] [reason]:\` Warns the said person\n`+
      `> **Perm Req:** *Admin*/*Kick*/*Ban*/*Manage Roles*/*Manage Messages*\n`+
      `> • \`${prefix}clear [number of messages]:\` Clears messages, No more than 100\n`+
      `> **Perm Req:** *Admin*/*Kick*/*Ban*/*Manage Roles*/*Manage Messages*\n\n`, true)
  
      .addField(`• **Other Commands: **`,
      `> \`${prefix}modhelp:\` This list`, true)
  
      .setTimestamp()
      .setFooter(`Staff: ${msg.author.username}`, msg.author.avatarURL);
      return msg.channel.send(modhelp);
  }

  //Kick
  let kick = require(`../mod commands/kick.js`);
  kick.run(bot, msg, args, command, Discord, ms, moment, logChannel, prefix);

  //Ban
  let ban = require(`../mod commands/ban.js`);
  ban.run(bot, msg, args, command, Discord, ms, moment, logChannel, prefix);

  //Mute
  let mute = require(`../mod commands/mute.js`);
  mute.run(bot, msg, args, command, Discord, ms, moment, logChannel, prefix);

  //Warn
  let warn = require(`../mod commands/warn.js`);
  warn.run(bot, msg, args, command, Discord, ms, moment, logChannel, fs, prefix);

  //Clear
  let clear = require(`../mod commands/clear.js`);
  clear.run(bot, msg, args, command, Discord, ms, moment, logChannel, prefix);
}