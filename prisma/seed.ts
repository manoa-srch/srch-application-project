import { Prisma, Role } from '@prisma/client';
import * as config from '../config/settings.development.json';
import { prisma } from '../src/lib/prisma';

const srchContent: Prisma.SRCHContentCreateInput[] = [
  {
    title: 'What is Privacy?',
    summary: 'Introduces privacy as control over personal information, context, and boundaries.',
    body: 'Privacy involves how people control access to information about themselves, how that information is collected, and how it is used in different social and technical contexts.',
    topic: 'Privacy',
  },
  {
    title: 'Why Privacy Matters',
    summary: 'Explains why privacy is important for autonomy, safety, trust, and participation.',
    body: 'Privacy supports individual autonomy, personal safety, trust in systems, and the ability to participate freely in social, educational, and professional environments.',
    topic: 'Privacy',
  },
  {
    title: 'Privacy Threats',
    summary: 'Covers common threats such as surveillance, data collection, inference, and misuse.',
    body: 'Privacy threats can include excessive data collection, unexpected sharing, surveillance, re-identification, profiling, and secondary uses of data that users did not expect.',
    topic: 'Privacy',
  },
  {
    title: 'Designing for Privacy',
    summary: 'Introduces privacy-aware design choices in software systems.',
    body: 'Designing for privacy involves minimizing data collection, giving users meaningful choices, explaining data practices clearly, and protecting sensitive information throughout the system.',
    topic: 'Privacy',
  },
];

async function main() {
  console.log('Seeding the database');

  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;
    const emailPrefix = account.email.split('@')[0] || 'user';
    const firstName = emailPrefix;
    const lastName = 'User';

    const userData: Prisma.UserCreateInput = {
      email: account.email,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      role,
      password: 'changeme123',
    };

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
      create: userData,
    });
  }

  for (const content of srchContent) {
    const existing = await prisma.sRCHContent.findFirst({
      where: {
        title: content.title,
        topic: content.topic,
      },
    });

    if (!existing) {
      console.log(`  Creating SRCH content: ${content.title}`);

      await prisma.sRCHContent.create({
        data: content,
      });
    } else {
      console.log(`  Skipping existing SRCH content: ${content.title}`);
    }
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