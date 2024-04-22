import 'dotenv/config';
import { connect } from './db';
import bot, { start } from './bot';

async function main() {
  await connect();
  await start();
}

main();
