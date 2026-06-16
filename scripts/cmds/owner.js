const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "1.3.0",
    author: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",\\created by NABIN 
    role: 0,
    shortDescription: "Owner information with image",
    category: "Information",
    guide: {
      en: "owner"
    }
  },

  onStart: async function ({ api, event }) {
    const ownerText = 
`╭─ 👑 Oᴡɴᴇʀ Iɴғᴏ 👑 ─╮
│ 👤 Nᴀᴍᴇ       : Chucky Ain't No Memer 
│ 🧸 Nɪᴄᴋ       : Chucky 
│ 🎂 Aɢᴇ        : 18
│ 💘 Rᴇʟᴀᴛɪᴏɴ : Sɪɴɢʟᴇ
│ 🎓 Pʀᴏғᴇssɪᴏɴ : Sᴛᴜᴅᴇɴᴛ
│ 📚 Eᴅᴜᴄᴀᴛɪᴏɴ : 12
│ 🏡 Lᴏᴄᴀᴛɪᴏɴ : South Africa 
├─ 🔗 Cᴏɴᴛᴀᴄᴛ ─╮
│ 📘 Facebook  : https://www.facebook.com/profile.php?id=100063239341269
│ 📞 WhatsApp  : +27 76 912 4957
╰────────────────╯`;

    const cacheDir = path.join(__dirname, "cache");
    const mp4Path = path.join(cacheDir, "owner.mp4");

    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const mp4Link = "https://i.imgur.com/AjinDNq.mp4";

    const send = () => {
      api.sendMessage(
        {
          body: ownerText,
          attachment: fs.createReadStream(mp4Path)
        },
        event.threadID,
        () => fs.unlinkSync(mp4Path),
        event.messageID
      );
    };

    request(encodeURI(mp4Link))
      .pipe(fs.createWriteStream(mp4Path))
      .on("close", send);
  }
};
