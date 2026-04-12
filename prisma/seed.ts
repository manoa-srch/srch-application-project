import { Role } from '@prisma/client';
import * as config from '../config/settings.development.json';
import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Seeding the database');

  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;
    const emailPrefix = account.email.split('@')[0] || 'user';
    const firstName = emailPrefix;
    const lastName = 'User';

    console.log(`  Creating user: ${account.email} with role: ${role}`);

    await prisma.user.upsert({
      where: { email: account.email },
      update: {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        role,
        password: 'changeme123',
      },
      create: {
        email: account.email,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        role,
        password: 'changeme123',
      },
    });
  }

  console.log('Seeding complete');
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