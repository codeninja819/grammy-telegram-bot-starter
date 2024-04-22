import {
  ForceReply,
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
} from 'grammy/types';
import { BotContext } from './types';
import { DEFAULT_REPLY_OPTION } from '../constants';

export const replyMessage = async (
  ctx: BotContext,
  text: string,
  reply_markup?:
    | InlineKeyboardMarkup
    | ReplyKeyboardMarkup
    | ReplyKeyboardRemove
    | ForceReply
    | undefined
) => {
  return await ctx.reply(text, {
    reply_markup,
    ...DEFAULT_REPLY_OPTION,
  });
};

export const sendMessage = async (
  ctx: BotContext,
  text: string,
  reply_markup?:
    | InlineKeyboardMarkup
    | ReplyKeyboardMarkup
    | ReplyKeyboardRemove
    | ForceReply
    | undefined
) => {
  const chatId = ctx.chat?.id;
  if (!chatId) return null;
  return await ctx.api.sendMessage(ctx.chat.id, text, {
    reply_markup,
    ...DEFAULT_REPLY_OPTION,
  });
};

export const editMessage = async (
  ctx: BotContext,
  text: string,
  reply_markup: InlineKeyboardMarkup
) => {
  if (ctx.message?.text == text) {
    if (ctx.message.reply_markup != reply_markup)
      return await ctx.editMessageReplyMarkup({
        reply_markup,
        ...DEFAULT_REPLY_OPTION,
      });
  } else {
    ctx.editMessageText(text, {
      reply_markup,
      ...DEFAULT_REPLY_OPTION,
    });
  }
};
