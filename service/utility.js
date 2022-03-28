import Discord from 'discord.js';
import * as fs from 'fs';
import moment from 'moment';
const path = './db/words.json';
const userDataPath = './db/users/';
let fileName;


export function checkMemberRoles(member) {
    const roles = member.roles.cache.map(role => role.name);
    return roles;
}

/**
 *
 * @param {Discord.GuildMember} member
 * @param {Discord.Role} roles
 */
export function checkPermissions(member, roles) {
    const memberRoles = checkMemberRoles(member);
    for (let i = 0; i < memberRoles.length; i++) {
        for (let j = 0; j < roles.length; j++) {
            if (memberRoles[i] == roles[j]) {
                return true;
            }
        }
    }
    return false;
}


export function checkMessageMemberRole(message) {
    const messageAuthor = message.member.roles;
    if (messageAuthor.cache.find(r => r.name == 'Admin')) {
        return true;
    }
}

/**
 * 
 * @param {Discord.Message} message 
 */
export function checkMessage(message) {
    fileName = `${message.member.id}.json`;
    warnTime(fileName);
    let msg = message.content.toLowerCase();
    let words = fs.readFileSync(path).toString();
    let arr = JSON.parse(words);
    let bannedWord;
    let isBannedWord = arr.some(word => {
        if (msg.split(' ').includes(word)) {
            bannedWord = word
            return true;
        }

    });
    if (isBannedWord) {
        if (existsMemberData(message.member)) {
            let memberInfo = JSON.parse(fs.readFileSync(userDataPath + fileName));
            if (checkWarnCount(message.member) < 2) {
                memberInfo.warn = memberInfo.warn + 1;
                memberInfo.date = moment.now();
                fs.writeFileSync(userDataPath + fileName, JSON.stringify(memberInfo));
            } else {
                fs.unlinkSync(userDataPath + fileName);
                if (message.member.moderatable) {
                    message.member.timeout(86400, "Лимит предупреждений");
                } else { console.log(`nope`) }
            }
        } else {
            createMemberData(message.member);
        }
        wordslogsChannel(message, `---->\n<@${message.author.id}> написал слово: **${bannedWord}**\n\nПолное сообщение: ${message.content}\n`);
        message.delete({ timeout: 0 });
        message.channel.send(`${message.author} Нельзя ругаться!\n\nВы получили предупреждение! на третье предупреждение будет тайм-аут!`)
            .then(msg => {
                setTimeout(() => msg.delete(), 5000)
            });
        return;
    }
}


export function wordslogsChannel(message, logText) {
    const findedChannel = message.guild.channels.cache.find(c => c.name == "wordslogs");
    if (findedChannel) {
        findedChannel.send(logText);
    } else { return; };
}


function existsMemberData() {
    if (fs.existsSync(userDataPath + fileName)) {
        return true;
    } else { return false; };
}


function createMemberData() {
    let data = {
        "warn": 1,
        "date": moment.now()
    };
    fs.writeFileSync(userDataPath + fileName, JSON.stringify(data));
    return;
}


function checkWarnCount() {
    let memberInfo = JSON.parse(fs.readFileSync(userDataPath + fileName));
    return memberInfo.warn;
}

export function warnTime(fileName) {
    if (fs.existsSync(userDataPath + fileName)) {
        let memberInfo = JSON.parse(fs.readFileSync(userDataPath + fileName));
        let time = moment.now() - memberInfo.date;
        if (time > 86400) {
            fs.unlinkSync(userDataPath + fileName);
        }   
    }
    return;
}