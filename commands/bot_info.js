import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';



export default {
    data: new SlashCommandBuilder()
        .setName('bot_info')
        .setDescription('Информация о боте.'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('💕BOT INFO💕')
            .setDescription('Бот сделан по заказу.')
            .setThumbnail('https://media.discordapp.net/attachments/573490270025416714/957660371857055754/778.jpg')
            .addFields(
                { name: 'Автор бота', value: `Fuuka#6189 😶‍🌫️`, inline: true },
                { name: 'Описание бота', value: `Данный бот следит за чатом на наличие забаненых слов. 🤬`, inline: true },
                { name: 'Добавить бота себе', value: `Для установки подобного бота себе или заказа персонального -> писать в лс 😘`, inline: true },
            )
            .setTimestamp();

        await interaction.reply({ content: 'Кусь!', ephemeral: true, embeds: [embed] });
    },
};