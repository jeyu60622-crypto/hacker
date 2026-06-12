const os = require("os");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "uptime",
    aliases: ["up", "upt"],
    version: "14.0",
    author: "lonely",
    countDown: 5,
    role: 0,
    shortDescription: "Show bot uptime",
    longDescription: "Advanced uptime system info",
    category: "system",
    guide: "{pn}"
  },

  onStart: async function ({ message, api }) {
    try {
      const start = Date.now();

      const uptime = process.uptime();

      const days = Math.floor(uptime / (60 * 60 * 24));
      const hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((uptime % (60 * 60)) / 60);
      const seconds = Math.floor(uptime % 60);

      const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
      const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
      const usedMem = (totalMem - freeMem).toFixed(2);

      const cpu = os.cpus()[0].model;
      const platform = os.platform();
      const hostname = os.hostname();

      const time = moment.tz("Africa/Johannesburg").format("HH:mm:ss");
      const date = moment.tz("Africa/Johannesburg").format("DD/MM/YYYY");

      const loading = await message.reply(`
╭━━━━━━━━━━━━━━━━╮
      𝗨𝗣𝗧𝗜𝗠𝗘 𝗩𝟭𝟰
╰━━━━━━━━━━━━━━━━╯

⏳ Loading system info...
▰▰▱▱▱▱▱▱ 20%
      `);

      setTimeout(async () => {
        await api.editMessage(`
╭━━━━━━━━━━━━━━━━╮
      𝗨𝗣𝗧𝗜𝗠𝗘 𝗩𝟭𝟰
╰━━━━━━━━━━━━━━━━╯

⚡ Scanning server...
▰▰▰▰▱▱▱▱ 59%
        `, loading.messageID);

        setTimeout(async () => {
          await api.editMessage(`
╭━━━━━━━━━━━━━━━━╮
      𝗨𝗣𝗧𝗜𝗠𝗘 𝗩𝟭𝟰
╰━━━━━━━━━━━━━━━━╯

🚀 Finalizing data...
▰▰▰▰▰▰▰▱ 99%
          `, loading.messageID);

          setTimeout(async () => {
            const ping = Date.now() - start;

            await api.editMessage(`
╭━━━━━━━━━━━━━━━━━━╮
       𝗨𝗣𝗧𝗜𝗠𝗘 𝗩𝟭𝟰
╰━━━━━━━━━━━━━━━━━━╯

⏰ Uptime
${days}d ${hours}h ${minutes}m ${seconds}s

📶 Ping
${ping}ms

💾 RAM Usage
${usedMem}GB / ${totalMem}GB

🖥️ Platform
${platform}

⚙️ CPU
${cpu}

🌐 Host
${hostname}

🕒 Time
${time} (SAST)

📅 Date
${date}

👑 Bot Admin
• ᏞᏫᏁᎬᏞᎽ

━━━━━━━━━━━━━━━━━━
ᏞᏫᏁᎬᏞᎽ 💙
            `, loading.messageID);

            api.sendMessage({
              body: "👑 Bot Admin",
              mentions: [
                {
                  tag: "ᏞᏫᏁᎬᏞᎽ",
                  id: "61584608305717"
                }
              ]
            }, message.threadID);

          }, 1500);
        }, 1500);
      }, 1500);

    } catch (e) {
      console.log(e);
      return message.reply("❌ Failed to fetch uptime info.");
    }
  }
};