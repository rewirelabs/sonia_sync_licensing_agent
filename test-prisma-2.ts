process.env.DATABASE_URL = 'file:./dev.db';

import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

async function main() {
  const libsql = createClient({ url: 'file:./dev.db' });
  const prisma = new PrismaClient({});

  console.log("Connecting...");
  try {
    const brief = await prisma.brief.findFirst();
    console.log("Success:", !!brief);
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
