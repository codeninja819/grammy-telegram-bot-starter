import { Menu, MenuRange } from '@grammyjs/menu';
import { BotContext, MENUS } from './types';

export const mainMenu = new Menu<BotContext>(MENUS.MAIN_MENU).text('MAIN');
export const emptyMenu = new Menu<BotContext>(MENUS.EMPTY_MENU);
