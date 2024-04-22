import { Context, SessionFlavor } from 'grammy';
import { zeroAddress } from 'viem';

export enum STEPS {
  INIT,
}
export enum MENUS {
  MAIN_MENU = 'MAIN_MENU',
  EMPTY_MENU = 'EMPTY_MENU',
}

export interface SessionData {
  step: STEPS;
}
export type BotContext = Context & SessionFlavor<SessionData>;

export function initSession(): SessionData {
  return {
    step: STEPS.INIT,
  };
}
