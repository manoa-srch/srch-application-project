import { PrismaClient, BloomLevel, ForumStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Finding unmapped learning objectives...');

  // Find all objectives with no mappings and no existing forum post
  const unmappedObjectives = await prisma.learningObjective.findMany({
    where: {
      mappings: { none: {} },
      forumPosts: { none: {} },
    },
    include: {
      course: true,
    },
  });

  console.log(`Found ${unmappedObjectives.length} unmapped objectives.`);

  if (unmappedObjectives.length === 0) {
    console.log('Nothing to migrate!');
    return;
  }

  // Find a system/admin user to attribute the posts to
  const adminUser = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
  });

  if (!adminUser) {
    throw new Error('No admin user found. Please seed the database first.');
  }

  console.log(`Attributing posts to admin: ${adminUser.email}`);

  let created = 0;
  for (const objective of unmappedObjectives) {
    const title = objective.description.length > 80
      ? objective.description.slice(0, 80) + '...'
      : objective.description;

    await prisma.forumPost.create({
      data: {
        title,
        description: objective.description,
        bloomLevel: objective.bloomLevel as BloomLevel,
        status: ForumStatus.PENDING,
        authorId: adminUser.id,
        mappedObjectiveId: objective.id,
      },
    });

    console.log(`  ✓ Created forum post for: "${title}"`);
    created++;
  }

  console.log(`\nMigration complete! Created ${created} forum posts.`);
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