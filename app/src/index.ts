import 'dotenv/config';
import ExpressServer from './server/expressServer';
import { PrismaClient } from '@prisma/client';
import {logger} from '@logger/logger';

const Rocket = String.fromCodePoint(0x1F680);

const prisma = new PrismaClient();

const serverClass = new ExpressServer();
const server = serverClass.getServer();

async function main() {
  server.listen(serverClass.getPort(), () =>
    logger.info( `${Rocket} Server started at ${serverClass.getPort()} port ...`));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });