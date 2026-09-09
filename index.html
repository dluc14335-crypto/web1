require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    SlashCommandBuilder,
    REST,
    Routes,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    MessageFlags
} = require("discord.js");

const express = require("express");
const cors = require("cors");

const app = express();

/* =========================
   API CONFIG
========================= */

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

/* =========================
   KEY SYSTEM
========================= */

const validKeys = new Map();

/* =========================
   USER POINTS
========================= */

const userPoints = new Map();

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
    res.json({
        status: "online",
        service: "GRX Key System",
        api: true
    });
});

/* =========================
   GET KEY
========================= */

app.get("/api/get-key", (req, res) => {
    try {
        const randomNumbers = Math.floor(
            10000000 + Math.random() * 90000000
        );

        const newKey = `GRX=${randomNumbers}`;

        validKeys.set(newKey, Date.now());

        console.log(`🔑 API cấp Key: ${newKey}`);

        res.status(200).json({
            key: newKey
        });

    } catch (error) {
        console.error("❌ Lỗi tạo Key:", error);

        res.status(500).json({
            error: "Không thể tạo Key"
        });
    }
});

/* =========================
   CHECK KEY
========================= */

app.get("/api/check-key", (req, res) => {
    const key = req.query.key;

    if (!key) {
        return res.status(400).json({
            valid: false,
            message: "Thiếu Key"
        });
    }

    if (!validKeys.has(key)) {
        return res.json({
            valid: false,
            message: "Key không tồn tại hoặc đã được sử dụng"
        });
    }

    const createdAt = validKeys.get(key);
    const expiresIn = 10 * 60 * 1000;

    if (Date.now() - createdAt > expiresIn) {
        validKeys.delete(key);

        return res.json({
            valid: false,
            message: "Key đã hết hạn"
        });
    }

    res.json({
        valid: true,
        message: "Key hợp lệ"
    });
});

/* =========================
   API ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
    console.error("❌ API ERROR:", err);

    res.status(500).json({
        error: "Internal Server Error"
    });
});

/* =========================
   START SERVER
========================= */

app.listen(PORT, HOST, () => {
    console.log(
        `🌐 API đang chạy tại http://${HOST}:${PORT}`
    );

    console.log(
        `🔑 GET KEY: http://localhost:${PORT}/api/get-key`
    );
});

/* =========================
   DISCORD BOT
========================= */

if (!process.env.TOKEN) {
    console.log("❌ Không tìm thấy TOKEN trong .env");
    process.exit(1);
}

if (!process.env.CLIENT_ID) {
    console.log("❌ Không tìm thấy CLIENT_ID trong .env");
    process.exit(1);
}

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.on("error", error => {
    console.error("⚠️ Discord Client Error:", error);
});

client.on("warn", message => {
    console.log(`⚠️ Discord Warning: ${message}`);
});

process.on("unhandledRejection", reason => {
    console.error("⚠️ Unhandled Promise Rejection:", reason);
});

process.on("uncaughtException", error => {
    console.error("⚠️ Uncaught Exception:", error);
});

/* =========================
   COMMANDS
========================= */

const commands = [
    new SlashCommandBuilder()
        .setName("link")
        .setDescription("Lấy danh sách link Client và Script Roblox"),

    new SlashCommandBuilder()
        .setName("key")
        .setDescription("Lấy key hệ thống"),

    new SlashCommandBuilder()
        .setName("nhandiem")
        .setDescription("Nhập Key để nhận điểm")
        .addStringOption(option =>
            option
                .setName("ma_key")
                .setDescription("Nhập mã GRX=...")
                .setRequired(true)
        )
].map(command => command.toJSON());

/* =========================
   REGISTER COMMANDS
========================= */

async function registerCommands() {

    const rest = new REST({
        version: "10",
        timeout: 30000
    }).setToken(process.env.TOKEN);

    try {

        console.log("⏳ Đang đăng ký Slash Commands...");

        if (process.env.GUILD_ID) {

            await rest.put(
                Routes.applicationGuildCommands(
                    process.env.CLIENT_ID,
                    process.env.GUILD_ID
                ),
                {
                    body: commands
                }
            );

            console.log("✅ Đã đăng ký Guild Commands!");

        } else {

            await rest.put(
                Routes.applicationCommands(
                    process.env.CLIENT_ID
                ),
                {
                    body: commands
                }
            );

            console.log("✅ Đã đăng ký Global Commands!");
        }

    } catch (error) {

        console.error(
            "❌ Lỗi đăng ký Slash Commands:",
            error
        );
    }
}

/* =========================
   BOT READY
========================= */

client.once("clientReady", async () => {

    console.log(
        `✅ Bot Discord đã online: ${client.user.tag}`
    );

    await registerCommands();
});

/* =========================
   SLEEP
========================= */

const sleep = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

/* =========================
   CLIENT DOWNLOAD
========================= */

async function processClientDownloadLink(
    interaction,
    clientName,
    downloadUrl
) {

    const initialEmbed = new EmbedBuilder()
        .setTitle(
            `⚡ ĐANG KHỞI TẠO TẢI: ${clientName.toUpperCase()}`
        )
        .setDescription(
            "⏳ Đang xử lý yêu cầu của bạn..."
        )
        .setColor(0xFEE75C);

    await interaction.reply({
        embeds: [initialEmbed],
        flags: MessageFlags.Ephemeral
    });

    await sleep(3000);

    const stage2Embed = new EmbedBuilder()
        .setTitle(
            `🔐 ĐANG XỬ LÝ: ${clientName.toUpperCase()}`
        )
        .setDescription(
            "Đang chuẩn bị liên kết tải..."
        )
        .setColor(0x3498DB);

    await interaction.editReply({
        embeds: [stage2Embed]
    });

    await sleep(3000);

    const successEmbed = new EmbedBuilder()
        .setTitle(
            `✅ HOÀN TẤT: ${clientName.toUpperCase()}`
        )
        .setDescription(
            `Đã tạo liên kết cho **${clientName}**.\n\n` +
            "👉 Bấm nút bên dưới để tiếp tục."
        )
        .setColor(0x57F287);

    const downloadRow =
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel(`Mở ${clientName}`)
                .setStyle(ButtonStyle.Link)
                .setURL(downloadUrl)
        );

    await interaction.editReply({
        embeds: [successEmbed],
        components: [downloadRow]
    });
}

/* =========================
   INTERACTIONS
========================= */

client.on(
    "interactionCreate",
    async interaction => {

        try {

            /* =====================
               SLASH COMMANDS
            ===================== */

            if (interaction.isChatInputCommand()) {

                /* /LINK */

                if (interaction.commandName === "link") {

                    const currentPoints =
                        userPoints.get(
                            interaction.user.id
                        ) || 0;

                    const embed =
                        new EmbedBuilder()
                            .setTitle(
                                "🤖 GRX CLIENT SYSTEM"
                            )
                            .setDescription(
                                `Xin chào **${interaction.user.username}**!\n\n` +
                                `💰 Điểm hiện tại: **${currentPoints}**\n` +
                                `💳 Cần **30 điểm** để sử dụng.\n\n` +
                                "Chọn Client:"
                            )
                            .setColor(0x5865F2);

                    const row =
                        new ActionRowBuilder()
                            .addComponents(

                                new ButtonBuilder()
                                    .setCustomId(
                                        "get_xeno"
                                    )
                                    .setLabel("Xeno")
                                    .setStyle(
                                        ButtonStyle.Primary
                                    ),

                                new ButtonBuilder()
                                    .setCustomId(
                                        "get_velocity"
                                    )
                                    .setLabel("Velocity")
                                    .setStyle(
                                        ButtonStyle.Success
                                    ),

                                new ButtonBuilder()
                                    .setCustomId(
                                        "get_vortex"
                                    )
                                    .setLabel("Vortex")
                                    .setStyle(
                                        ButtonStyle.Danger
                                    )
                            );

                    return interaction.reply({
                        embeds: [embed],
                        components: [row]
                    });
                }

                /* /KEY */

                if (interaction.commandName === "key") {

                    const embed =
                        new EmbedBuilder()
                            .setTitle(
                                "🔑 GRX KEY SYSTEM"
                            )
                            .setDescription(
                                "Chọn hệ thống Key:"
                            )
                            .setColor(0xFEE75C);

                    const row =
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(
                                        "key_velocity_btn"
                                    )
                                    .setLabel(
                                        "Lấy Key"
                                    )
                                    .setStyle(
                                        ButtonStyle.Secondary
                                    )
                            );

                    return interaction.reply({
                        embeds: [embed],
                        components: [row]
                    });
                }

                /* /NHANDIEM */

                if (
                    interaction.commandName ===
                    "nhandiem"
                ) {

                    const inputKey =
                        interaction.options.getString(
                            "ma_key"
                        );

                    if (!validKeys.has(inputKey)) {

                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle(
                                        "❌ KEY KHÔNG HỢP LỆ"
                                    )
                                    .setDescription(
                                        "Key không tồn tại hoặc đã được sử dụng."
                                    )
                                    .setColor(
                                        0xED4245
                                    )
                            ],
                            flags:
                                MessageFlags.Ephemeral
                        });
                    }

                    const createdAt =
                        validKeys.get(inputKey);

                    const tenMinutes =
                        10 * 60 * 1000;

                    if (
                        Date.now() -
                        createdAt >
                        tenMinutes
                    ) {

                        validKeys.delete(inputKey);

                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle(
                                        "⏳ KEY ĐÃ HẾT HẠN"
                                    )
                                    .setDescription(
                                        "Key đã quá 10 phút."
                                    )
                                    .setColor(
                                        0xED4245
                                    )
                            ],
                            flags:
                                MessageFlags.Ephemeral
                        });
                    }

                    /* KEY CHỈ DÙNG 1 LẦN */

                    validKeys.delete(inputKey);

                    const currentPoints =
                        userPoints.get(
                            interaction.user.id
                        ) || 0;

                    const newPoints =
                        currentPoints + 100;

                    userPoints.set(
                        interaction.user.id,
                        newPoints
                    );

                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(
                                    "✅ NHẬN ĐIỂM THÀNH CÔNG"
                                )
                                .setDescription(
                                    `Bạn đã nhận **100 điểm**!\n\n` +
                                    `💰 Điểm hiện tại: **${newPoints}**`
                                )
                                .setColor(
                                    0x57F287
                                )
                        ]
                    });
                }
            }

            /* =====================
               BUTTONS
            ===================== */

            if (interaction.isButton()) {

                const {
                    customId
                } = interaction;

                /* KEY */

                if (
                    customId ===
                    "key_velocity_btn"
                ) {

                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(
                                    "🛠️ HỆ THỐNG"
                                )
                                .setDescription(
                                    "Hệ thống Key đang được bảo trì."
                                )
                                .setColor(
                                    0xED4245
                                )
                        ],
                        flags:
                            MessageFlags.Ephemeral
                    });
                }

                /* CLIENT */

                if (
                    [
                        "get_xeno",
                        "get_velocity",
                        "get_vortex"
                    ].includes(customId)
                ) {

                    const currentPoints =
                        userPoints.get(
                            interaction.user.id
                        ) || 0;

                    if (currentPoints < 30) {

                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle(
                                        "💳 KHÔNG ĐỦ ĐIỂM"
                                    )
                                    .setDescription(
                                        `Bạn đang có **${currentPoints} điểm**.\n` +
                                        "Cần **30 điểm**."
                                    )
                                    .setColor(
                                        0xED4245
                                    )
                            ],
                            flags:
                                MessageFlags.Ephemeral
                        });
                    }

                    userPoints.set(
                        interaction.user.id,
                        currentPoints - 30
                    );

                    if (
                        customId ===
                        "get_xeno"
                    ) {

                        return processClientDownloadLink(
                            interaction,
                            "Xeno",
                            "https://xeno.now/99aca0c5/3734fe27c699/73662e3d135f"
                        );
                    }

                    if (
                        customId ===
                        "get_velocity"
                    ) {

                        return processClientDownloadLink(
                            interaction,
                            "Velocity",
                            "https://zufile.com/download/YqCwfcj5Xc"
                        );
                    }

                    if (
                        customId ===
                        "get_vortex"
                    ) {

                        return processClientDownloadLink(
                            interaction,
                            "Vortex",
                            "https://zufile.com/download/U8WJgbbWRF"
                        );
                    }
                }
            }

        } catch (error) {

            console.error(
                "❌ Interaction Error:",
                error
            );

            if (!interaction.replied) {

                await interaction.reply({
                    content:
                        "❌ Đã xảy ra lỗi.",
                    flags:
                        MessageFlags.Ephemeral
                });
            }
        }
    }
);

/* =========================
   LOGIN
========================= */

client.login(process.env.TOKEN);
