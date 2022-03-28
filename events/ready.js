import Discord from 'discord.js';
import { sortCommand } from '../service/permissions.js';

export let client;

export default {
	name: 'ready',
	once: true,
	/**
	 * 
	 * @param {Discord.Client} client 
	 */
	execute(client) {
		client = client;
		console.log('Bot is started now!');
		sortCommand();
	},
};

