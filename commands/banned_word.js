import Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import fs from 'fs';
const path = './db/words.json';


export default {
    data: new SlashCommandBuilder()
        .setName('banned_word')
        .setDescription('Добавляет слово(а) в черный список')
        .addStringOption(option =>
            option.setName('слово').setDescription('писать по одному слову или слова через запятую и без пробелов.').setRequired(true)),
    /**
     * 
     * @param {Discord.Interaction} interaction 
     * @returns 
     */
    async execute(interaction) {
        const getWords = interaction.options.getString('слово');
        const words = getWords.toLowerCase();
        await addword(interaction, words);
    },
};

/**
 * 
 * @param {Discord.Interaction} interaction 
 * @param {String} words 
 */
async function addword(interaction, words) {
    const cache = fs.readFileSync(path).toString();
    let arrayWords = JSON.parse(cache);
    const wordsArgs = words.split(',');
    for (let i = 0; i < arrayWords.length; i++) {
        if (arrayWords.some(word => arrayWords.includes(wordsArgs[i]))) {
            return interaction.reply({ content: `Слово ${wordsArgs[i]} уже есть в списке`, ephemeral: true });
        }
    }
    const resultArray = merge(arrayWords, wordsArgs);
    fs.writeFileSync(path, JSON.stringify(resultArray));
    return interaction.reply({ content: `Готово`, ephemeral: true });
}

/**
 * 
 * @param {Discord.Interaction} interaction 
 * @param {String} word 
 */
export async function deleteWord(interaction, word) {
    const cache = fs.readFileSync(path).toString();
    let arrayWords = JSON.parse(cache);
    for (let i = 0; i < arrayWords.length; i++) {
        if (word === arrayWords[i]) {
            arrayWords.splice(i, 1);
            console.log(`${word} удален из списка слов`);
            fs.writeFileSync(path, JSON.stringify(arrayWords));
            return interaction.reply({ content: `Слово ${word} удалено из списка`, ephemeral: true });
        } 
    }
}

function merge(firstArray, secondArray) {
    var result = firstArray.concat(secondArray);

    for (var i = 0; i < result.length; ++i) {
        for (var j = i + 1; j < result.length; ++j) {
            if (result[i] === result[j])
                result.splice(j--, 1);
        }
    }

    return result;
}