import { prisma } from './lib/prisma';
import { Role } from '@prisma/client';
import * as config from '../config/settings.development.json';

async function main() {
  console.log('Seeding the database');
  config.defaultAccounts.forEach(async (account) => {
    const role = account.role as Role || Role.USER;
    const emailPrefix = account.email.split('@')[0] || 'user';
    const firstName = emailPrefix;
    const lastName = 'User';
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        role,
      },
    });
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
