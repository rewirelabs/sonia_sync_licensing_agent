import { config } from 'dotenv';
config();
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

async function main() {
  const adapter = new PrismaLibSql({ url: 'file:./dev.db' });
  process.env.DATABASE_URL = 'mysql://user:pass@localhost:3306/db';

  const prisma = new PrismaClient({ adapter });

  console.log("Connecting...");
  try {
    const brief = await prisma.brief.findFirst();
    console.log("Success:", brief);
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
