import Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { deleteWord } from './banned_word.js';


export default {
    data: new SlashCommandBuilder()
        .setName('delete_word')
        .setDescription('Удаляет слово из черного списка')
        .addStringOption(option =>
            option.setName('слово').setDescription('слово которое нужно удалить.').setRequired(true)),
    /**
     * 
     * @param {Discord.Interaction} interaction 
     * @returns 
     */
    async execute(interaction) {
            const getWords = interaction.options.getString('слово');
            const words = getWords.toLowerCase();
            await deleteWord(interaction, words)
    },
};
