require("dotenv").config();
const { REST, Routes, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

const commands = [
  new SlashCommandBuilder()
    .setName("joboffers")
    .setDescription("Get your Chalkboard Conference job offers")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  new SlashCommandBuilder()
    .setName("resetteam")
    .setDescription("Reset a user's team")
    .addStringOption(option =>
      option
        .setName("userid")
        .setDescription("The Discord user ID of the coach to reset")
        .setRequired(true)
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  new SlashCommandBuilder()
    .setName("listteams")
    .setDescription("Post a list of taken and available teams")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  new SlashCommandBuilder()
    .setName("game-result")
    .setDescription("Submit a game result")
    .addStringOption(option => option.setName("opponent").setDescription("Opponent team").setRequired(true).setAutocomplete(true))
    .addIntegerOption(option => option.setName("your_score").setDescription("Your team score").setRequired(true))
    .addIntegerOption(option => option.setName("opponent_score").setDescription("Opponent score").setRequired(true))
    .addStringOption(option => option.setName("summary").setDescription("Game summary").setRequired(true))
    .setDMPermission(false),

  new SlashCommandBuilder()
    .setName("press-release")
    .setDescription("Post a press release")
    .addStringOption(option => option.setName("text").setDescription("Text to post").setRequired(true))
    .setDMPermission(false),

  new SlashCommandBuilder()
    .setName("advance")
    .setDescription("Advance to next week (commissioner only)")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  new SlashCommandBuilder()
    .setName("season-advance")
    .setDescription("Advance to next season (commissioner only)")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  new SlashCommandBuilder()
    .setName("ranking")
    .setDescription("Show current season rankings (commissioner only)")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addBooleanOption(opt => opt
      .setName("public")
      .setDescription("Post to #general (default: private)")
      .setRequired(false)),

  new SlashCommandBuilder()
    .setName("ranking-all-time")
    .setDescription("Show all-time rankings across seasons (commissioner only)")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addBooleanOption(opt => opt
      .setName("public")
      .setDescription("Post to #general (default: private)")
      .setRequired(false)),

  new SlashCommandBuilder()
    .setName("move-coach")
    .setDescription("Move a coach to a new team (commissioner only)")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(opt => opt
      .setName("coach")
      .setDescription("Select the coach to move")
      .setRequired(true)
      .setAutocomplete(true))
    .addStringOption(opt => opt
      .setName("new_team")
      .setDescription("Select the new team")
      .setRequired(true)
      .setAutocomplete(true))
    .addStringOption(opt => opt
      .setName("role")
      .setDescription("Select the role (HC, OC, or DC)")
      .setRequired(false)
      .addChoices(
        { name: "Head Coach", value: "HC" },
        { name: "Offensive Coordinator", value: "OC" },
        { name: "Defensive Coordinator", value: "DC" }
      )),

  new SlashCommandBuilder()
    .setName("any-game-result")
    .setDescription("Enter a game result for any team (commissioner only)")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => option.setName("home_team").setDescription("Home team").setRequired(true).setAutocomplete(true))
    .addStringOption(option => option.setName("away_team").setDescription("Away team").setRequired(true).setAutocomplete(true))
    .addIntegerOption(option => option.setName("home_score").setDescription("Home team score").setRequired(true))
    .addIntegerOption(option => option.setName("away_score").setDescription("Away team score").setRequired(true))
    .addIntegerOption(option => option.setName("week").setDescription("Week number").setRequired(true))
    .addStringOption(option => option.setName("summary").setDescription("Game summary").setRequired(true))
].map(c => c.toJSON());

(async () => {
  try {
    console.log("Uploading commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Commands uploaded.");
  } catch (err) {
    console.error(err);
  }
})();
