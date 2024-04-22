import { Bot, session, webhookCallback } from 'grammy';
import { BotContext, initSession } from './types';
import express from 'express';
import mongoose from 'mongoose';
import { MongoDBAdapter, ISession } from '@grammyjs/storage-mongodb';
import { QUOTES } from '../constants';
import { replyMessage } from './utils';
import { emptyMenu, mainMenu } from './menu';

const bot = new Bot<BotContext>(process.env.BOT_TOKEN!);
const collection = mongoose.connection.db.collection<ISession>('sessions');
bot.use(
  session({
    initial: initSession,
    storage: new MongoDBAdapter({ collection }),
  })
);

mainMenu.register(emptyMenu);
bot.use(mainMenu);

bot.command('start', async (ctx) => {
  await replyMessage(ctx, QUOTES.START);
});

bot.command('help', async (ctx) => {
  await replyMessage(ctx, QUOTES.HELP);
});

const onMessage = async (ctx: BotContext) => {
  const userId = ctx.from?.id;
  const message = ctx.message?.text;
  if (!userId || !message) return;
};
bot.on('message', onMessage);

export const start = async () => {
  await bot.api.setWebhook(process.env.BOT_WEBHOOK_URL!);
  await bot.api.setMyCommands([
    { command: 'start', description: 'Start the bot.' },
    { command: 'help', description: 'See available commands.' },
  ]);
  if (process.env.NODE_ENV == 'production') {
    const app = express();
    app.use(express.json());

    app.use(webhookCallback(bot, 'express'));
    app.listen(process.env.PORT || 4595);
  } else {
    bot.catch((err) => {
      const ctx = err.ctx;
      console.error(
        `Error while handling update ${ctx.update.update_id}:`,
        err
      );
    });
    await bot.start();
    console.log('bot started.');
  }
};
export default bot;
