import Discord from 'discord.js';
import { checkMessage } from '../service/utility.js';



export default {
	name: 'messageCreate',
	on: true,
	/**
	 * 
	 * @param {Discord.Message} message 
	 */
	execute(message) {
		if (message.author.bot || message.member.roles.cache.find(r => r.name == "Admin")) {
			return;
		}
		checkMessage(message);
	},
};
