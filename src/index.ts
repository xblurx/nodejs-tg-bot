import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import yahooStockPrices from 'yahoo-stock-prices';

dotenv.config();

const token = process.env.TOKEN as string;
const bot = new TelegramBot(token, { polling: true });

const calcPriceWithFee = (price: number) => {
    const FEE = 0.6;
    return price + (price * FEE) / 100;
};

const getCurrentPrice = async () => {
    const price: number = await yahooStockPrices.getCurrentPrice('RUB=X');
    return calcPriceWithFee(price);
};

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from?.id;
    if (userId === 285511498) {
        const price = await getCurrentPrice();
        await bot.sendMessage(chatId, price.toString());
    }
});
