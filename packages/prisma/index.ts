// import { PrismaClient } from './generated/client';
import { PrismaClient } from '@prisma/client'

// const prisma: PrismaClient = new PrismaClient({
//   log: ['query', 'error', 'warn'],
// });

// export { prisma };

const prisma: PrismaClient = new PrismaClient();
export default prisma;