import axios from 'axios';
import dotenv from 'dotenv';
import {JSDOM} from jsdom;
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

const calcCurrPrice = async () => {
    const response = await axios.get('https://finance.yahoo.com/quote/RUB=X?p=RUB=X&.tsrc=fin-srch');

    return response;
}


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    if (userId === 285511498) {
        const price = await calcCurrPrice();
        await bot.sendMessage(chatId, price);
    }
});

