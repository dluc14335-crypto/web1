require("dotenv").config();

const {
    Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes,
    ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags
} = require("discord.js");

const express = require("express");
const cors = require("cors");
const app = express();

// Bộ nhớ lưu trữ Key kèm thời gian khởi tạo (Hỗ trợ check hạn 10 phút)
const validKeys = new Map();

// Hệ thống lưu trữ điểm cộng dồn của người dùng
const userPoints = new Map();

app.use(cors());

// Endpoint API: Cấp phát Key mới cho trang web
app.get("/api/get-key", (req, res) => {
    const randomNumbers = Math.floor(10000000 + Math.random() * 90000000);
    const newKey = `GRX=${randomNumbers}`;
    
    // Lưu Key mới kèm timestamp
    validKeys.set(newKey, Date.now()); 
    console.log(`🔑 API vừa cấp phát 1 Key mới: ${newKey}`);
    res.json({ key: newKey });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🌐 Máy chủ API lấy Key đang chạy tại http://localhost:${PORT}`);
});

if (!process.env.TOKEN) { console.log("❌ Không tìm thấy TOKEN trong .env"); process.exit(1); }
if (!process.env.CLIENT_ID) { console.log("❌ Không tìm thấy CLIENT_ID trong .env"); process.exit(1); }

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.on("error", error => { console.error("⚠️ Discord Client Error:", error); });
client.on("warn", message => { console.log(`⚠️ Discord Warning: ${message}`); });
process.on("unhandledRejection", reason => { console.error("⚠️ Unhandled Promise Rejection:", reason); });
process.on("uncaughtException", error => { console.error("⚠️ Uncaught Exception:", error); });

const commands = [
    new SlashCommandBuilder()
        .setName("link")
        .setDescription("Lấy danh sách link Client và Script Roblox với hiệu ứng tải an toàn"),
    
    new SlashCommandBuilder()
        .setName("key")
        .setDescription("Lấy key hệ thống (Sẽ mở ra menu chọn Key)"),
        
    new SlashCommandBuilder()
        .setName("nhandiem")
        .setDescription("Nhập mã key từ website để lấy điểm thưởng")
        .addStringOption(option => 
            option.setName("ma_key")
                .setDescription("Nhập mã key có định dạng GRX=...")
                .setRequired(true))
].map(command => command.toJSON());

async function registerCommands() {
    const rest = new REST({ version: "10", timeout: 30000 }).setToken(process.env.TOKEN);
    try {
        console.log("⏳ Đang đăng ký các lệnh Slash Command...");
        if (process.env.GUILD_ID) {
            await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
            console.log("✅ Đã đăng ký lệnh cho Server (Guild)!");
        } else {
            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
            console.log("✅ Đã đăng ký lệnh Global thành công!");
        }
    } catch (error) {
        console.error("❌ Lỗi đăng ký lệnh:", error);
    }
}

client.once("clientReady", async () => {
    console.log(`✅ Bot Discord đã online: ${client.user.tag}`);
    await registerCommands();
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function processClientDownloadLink(interaction, clientName, downloadUrl) {
    const initialEmbed = new EmbedBuilder()
        .setTitle(`⚡ ĐANG KHỞI TẠO TẢI: ${clientName.toUpperCase()}`)
        .setDescription(`\`\`\`ansi\n\u001b[1;33m[1/4] ⏳ Đang kết nối máy chủ bảo mật Roblox...\u001b[0m\n\`\`\`\n**Tiến trình:** \`[███░░░░░░░░░░░░░░░░░] 15%\`\n*Vui lòng giữ nguyên màn hình...*`)
        .setColor(0xFEE75C).setTimestamp();
    await interaction.reply({ embeds: [initialEmbed], flags: MessageFlags.Ephemeral });

    await sleep(3500);
    const stage2Embed = new EmbedBuilder()
        .setTitle(`🛡️ ĐANG BẢO MẬT: ${clientName.toUpperCase()}`)
        .setDescription(`\`\`\`ansi\n\u001b[1;36m[2/4] 🔐 Đang giải mã Bypass Anti-Cheat...\u001b[0m\n\`\`\`\n**Tiến trình:** \`[██████████░░░░░░░░░░] 48%\``)
        .setColor(0x3498DB).setTimestamp();
    await interaction.editReply({ embeds: [stage2Embed] });

    await sleep(3500);
    const stage3Embed = new EmbedBuilder()
        .setTitle(`🚀 ĐANG ĐÓNG GÓI LINK TẢI: ${clientName.toUpperCase()}`)
        .setDescription(`\`\`\`ansi\n\u001b[1;35m[3/4] ⚡ Đang cấp quyền Token Tải VIP...\u001b[0m\n\`\`\`\n**Tiến trình:** \`[████████████████░░░░] 82%\``)
        .setColor(0x9B59B6).setTimestamp();
    await interaction.editReply({ embeds: [stage3Embed] });

    await sleep(6000); 
    const successEffectEmbed = new EmbedBuilder()
        .setTitle(`🎉 TẠO LINK THÀNH CÔNG! (ĐANG KÍCH HOẠT HIỆU ỨNG)`)
        .setDescription(`\`\`\`ansi\n\u001b[1;32m[4/4] ✅ ĐÃ HOÀN TẤT KIỂM TRA BẢO MẬT 100%!\u001b[0m\n\`\`\`\n✨ **Trạng thái:** \`[████████████████████] 100%\`\n🌟 **Đang tải liên kết...**`)
        .setColor(0x57F287).setFooter({ text: "Vui lòng chờ 6 giây hiệu ứng" });
    await interaction.editReply({ embeds: [successEffectEmbed] });

    await sleep(6000);
    const finalEmbed = new EmbedBuilder()
        .setTitle(`📥 TẢI XONG CLIENT: ${clientName.toUpperCase()}`)
        .setDescription(`✅ **Hoàn tất tạo link VIP!**\n📌 **Tên Client:** \`${clientName}\`\n🛡️ **Bảo vệ:** \`Anti-Cheat Safe 100%\`\n👉 *Bấm nút bên dưới để tải:*`)
        .setColor(0x00FFB3).setFooter({ text: "Link 24/7" }).setTimestamp();
    const downloadRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setLabel(`🚀 Tải Client ${clientName} Ngay`).setStyle(ButtonStyle.Link).setURL(downloadUrl)
    );
    await interaction.editReply({ embeds: [finalEmbed], components: [downloadRow] });
}

client.on("interactionCreate", async interaction => {
    if (interaction.isChatInputCommand()) {
        
        // --- LỆNH /LINK ---
        if (interaction.commandName === "link") {
            const currentPoints = userPoints.get(interaction.user.id) || 0;
            const mainEmbed = new EmbedBuilder()
                .setTitle("🤖 HỆ THỐNG TẢI CLIENT ROBLOX VIP")
                .setDescription(`Chào bạn **${interaction.user.username}**! Chọn Client muốn lấy link.\n💰 **Điểm của bạn:** ${currentPoints} (Cần 30 điểm để tải)\n\n1️⃣ **Xeno**\n2️⃣ **Velocity**\n3️⃣ **Vortex**`)
                .setColor(0x5865F2);
            const clientSelectRow = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("get_xeno").setLabel("Tải Xeno").setStyle(ButtonStyle.Primary).setEmoji("🚀"),
                new ButtonBuilder().setCustomId("get_velocity").setLabel("Tải Velocity").setStyle(ButtonStyle.Success).setEmoji("⚡"),
                new ButtonBuilder().setCustomId("get_vortex").setLabel("Tải Vortex").setStyle(ButtonStyle.Danger).setEmoji("🌀")
            );
            return await interaction.reply({ embeds: [mainEmbed], components: [clientSelectRow] });
        }

        // --- LỆNH /KEY ---
        if (interaction.commandName === "key") {
            const keyEmbed = new EmbedBuilder()
                .setTitle("🔑 HỆ THỐNG GET KEY")
                .setDescription("Vui lòng chọn loại Key bạn muốn lấy từ hệ thống của chúng tôi.")
                .setColor(0xFEE75C);
            const keyRow = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("key_velocity_btn").setLabel("Lấy Key Velocity").setStyle(ButtonStyle.Secondary).setEmoji("🗝️")
            );
            return await interaction.reply({ embeds: [keyEmbed], components: [keyRow] });
        }

        // --- LỆNH /NHANDIEM ---
        if (interaction.commandName === "nhandiem") {
            const inputKey = interaction.options.getString("ma_key");

            // KIỂM TRA KEY TỪ BỘ NHỚ BOT
            if (validKeys.has(inputKey)) {
                const timeCreated = validKeys.get(inputKey);
                const tenMinutes = 10 * 60 * 1000;

                // 1. Kiểm tra thời hạn 10 phút
                if (Date.now() - timeCreated > tenMinutes) {
                    validKeys.delete(inputKey);
                    const expireEmbed = new EmbedBuilder()
                        .setTitle("⏳ KEY ĐÃ HẾT HẠN!")
                        .setDescription(`Mã \`${inputKey}\` đã quá hạn 10 phút kể từ lúc tạo.\nVui lòng vào lại trang web để lấy Key mới!`)
                        .setColor(0xED4245);
                    return await interaction.reply({ embeds: [expireEmbed], flags: MessageFlags.Ephemeral });
                }

                // 2. Xóa Key đã dùng
                validKeys.delete(inputKey);

                // 3. Cộng dồn 100 điểm cho người dùng (Điểm cũ + 100)
                const currentPoints = userPoints.get(interaction.user.id) || 0;
                const newPoints = currentPoints + 100;
                userPoints.set(interaction.user.id, newPoints);

                // 4. Thông báo nhận điểm thành công
                const successEmbed = new EmbedBuilder()
                    .setTitle("✅ XÁC NHẬN KEY THÀNH CÔNG")
                    .setDescription(`Chúc mừng **${interaction.user.username}**, mã Key hợp lệ!\n\n🎉 **Bạn đã nhận được 100 điểm nhé!**\n💰 Số điểm hiện tại của bạn: **${newPoints} điểm**\n\n👉 *Bây giờ bạn có thể dùng lệnh \`/link\` để tải Client.*`)
                    .setColor(0x57F287)
                    .setFooter({ text: "Cảm ơn bạn đã sử dụng hệ thống!" });
                
                return await interaction.reply({ embeds: [successEmbed] });
            } else {
                const failEmbed = new EmbedBuilder()
                    .setTitle("❌ KEY KHÔNG HỢP LỆ HOẶC ĐÃ SỬ DỤNG!")
                    .setDescription(`Mã \`${inputKey}\` không tồn tại trong hệ thống hoặc đã được người khác sử dụng.\n\nVui lòng lên website chính thức để lấy Key mới!`)
                    .setColor(0xED4245);
                
                return await interaction.reply({ embeds: [failEmbed], flags: MessageFlags.Ephemeral });
            }
        }
    }

    if (interaction.isButton()) {
        const { customId } = interaction;
        
        if (customId === "key_velocity_btn") {
            const maintenanceEmbed = new EmbedBuilder()
                .setTitle("🛠️ HỆ THỐNG ĐANG BẢO TRÌ")
                .setDescription("Chức năng Get Key Velocity hiện đang được nâng cấp và bảo trì. Vui lòng quay lại sau!")
                .setColor(0xED4245);
            return await interaction.reply({ embeds: [maintenanceEmbed], flags: MessageFlags.Ephemeral });
        }

        if (["get_xeno", "get_velocity", "get_vortex"].includes(customId)) {
            const currentPoints = userPoints.get(interaction.user.id) || 0;
            
            if (currentPoints < 30) {
                const noPointsEmbed = new EmbedBuilder()
                    .setTitle("💳 KHÔNG ĐỦ ĐIỂM!")
                    .setDescription(`Bạn cần **30 điểm** để tải Client này.\nHiện tại bạn chỉ có: **${currentPoints} điểm**.\n\n👉 *Hãy dùng lệnh \`/nhandiem\` kèm mã Key từ web để nhận 100 điểm.*`)
                    .setColor(0xED4245);
                return await interaction.reply({ embeds: [noPointsEmbed], flags: MessageFlags.Ephemeral });
            }

            // Trừ 30 điểm
            userPoints.set(interaction.user.id, currentPoints - 30);
            
            if (customId === "get_xeno") return await processClientDownloadLink(interaction, "Xeno", "https://xeno.now/99aca0c5/3734fe27c699/73662e3d135f");
            if (customId === "get_velocity") return await processClientDownloadLink(interaction, "Velocity", "https://zufile.com/download/YqCwfcj5Xc");
            if (customId === "get_vortex") return await processClientDownloadLink(interaction, "Vortex", "https://zufile.com/download/U8WJgbbWRF");
        }
    }
});

client.login(process.env.TOKEN);