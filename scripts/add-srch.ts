import { prisma } from '../src/lib/prisma';

async function main() {
  const content = await prisma.sRCHContent.create({
    data: {
      title: 'What is Privacy?',
      summary: 'Introduction to the concept of privacy in computing.',
      body: `
Privacy refers to the ability of individuals to control information about themselves.

In computing, privacy concerns how data is collected, stored, shared, and protected.
      `,
      topic: 'Privacy',
    },
  });

  console.log('Created SRCH content:', content);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });