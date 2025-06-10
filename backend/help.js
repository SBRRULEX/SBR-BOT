const helpList = [
  { command: "+help", description: "Har command ka istemal kaise kare - step by step." },
  { command: "+help2", description: "Saari commands ek saath list mein." },
  { command: "+hornymode", description: "Keywords daalo (e.g., bro sis) aur short adult clips paao." },
  { command: "+blackedraw", description: "Random BlackedRaw se 20s+ short videos ya GIFs laata hai." },
  { command: "+blackedraw jack slayher", description: "Specific BlackedRaw performer ka content laata hai." },
  { command: "!song", description: "Song name daalo, mp3 download link milega." },
  { command: "!video", description: "YouTube video ka link do, downloadable video milega." },
  { command: "!pic", description: "Image generate ya download karega by query." },
  { command: "!anime", description: "Anime movie ya episode fetch karta hai (multi-source)." },
  { command: "+stop", description: "Bot ko rukwaane ke liye random 6-digit stop code ka use." }
];

function getPaginatedHelp(page = 1, perPage = 10) {
  const start = (page - 1) * perPage;
  return helpList.slice(start, start + perPage);
}

function handleHelpCommand(inputText) {
  const command = inputText.trim().toLowerCase();
  if (command === "+help") {
    const page1 = getPaginatedHelp(1);
    let response = "🧠 **Command Help (Page 1)**\n\n";
    page1.forEach(cmd => {
      response += `🔹 ${cmd.command} → ${cmd.description}\n`;
    });
    response += `\n➡️ Type **+help2** to view all commands.`;
    return response;
  } else if (command === "+help2") {
    let response = "📜 **All Available Commands**\n\n";
    helpList.forEach(cmd => {
      response += `🔸 ${cmd.command} → ${cmd.description}\n`;
    });
    return response;
  } else {
    return "❓ Invalid help command. Try `+help` or `+help2`.";
  }
}

module.exports = handleHelpCommand;
