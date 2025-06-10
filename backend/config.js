module.exports = {
  prefix: '+',
  ownerUID: '100012345678901', // Replace with your FB UID (Rocky SBR)
  admins: ['100012345678901'], // Additional admin UIDs if needed

  commands: {
    blackedraw: {
      description: "Fetch random or performer-specific short adult clips.",
      usage: "+blackedraw [performer name]",
      handler: require('./commands/blackedraw')
    },
    hornymode: {
      description: "Send NSFW content based on a keyword (e.g., bro sis).",
      usage: "+hornymode [keyword]",
      handler: require('./commands/hornymode')
    },
    help: {
      description: "List all commands and usage.",
      usage: "+help",
      handler: require('./commands/help')
    }
  }
};
