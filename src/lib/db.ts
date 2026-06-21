import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaLibSql({ url: 'file:./dev.db' });

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ['query'],
  });

console.log("✅ SONIA DB CONNECTED WITH LIBSQL ADAPTER ✅");

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
