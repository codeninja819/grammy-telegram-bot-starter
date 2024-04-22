import { ParseMode } from "grammy/types";

export const QUOTES = {
  START: `Welcome! Send /help to see available commands.`,
  HELP: `Here are available commands.`,
};

export const DEFAULT_REPLY_OPTION = {
  link_preview_options: { is_disabled: true },
  parse_mode: 'HTML' as ParseMode,
};
