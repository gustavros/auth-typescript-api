import express from 'express';
import { config } from "dotenv"
import cors from 'cors';
import { prisma } from './database/prisma';
import { router } from './routes';


const main = async () => {
  config();

  const app = express();

  app.use(express.json());
  app.use(cors());

  await prisma.$connect();

  const port = process.env.PORT || 3000;

  app.use(router);

  app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })