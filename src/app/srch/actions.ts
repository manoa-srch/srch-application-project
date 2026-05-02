'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function mapContentToObjective(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect('/auth/signin');
  }

  const courseIdValue = formData.get('courseId')?.toString() ?? '';
  const objectiveIdValue = formData.get('objectiveId')?.toString() ?? '';
  const contentIdValue = formData.get('contentId')?.toString() ?? '';

  const courseId = parseInt(courseIdValue, 10);
  const objectiveId = parseInt(objectiveIdValue, 10);
  const contentId = parseInt(contentIdValue, 10);

  if (
    Number.isNaN(courseId) ||
    Number.isNaN(objectiveId) ||
    Number.isNaN(contentId)
  ) {
    throw new Error('Invalid mapping request.');
  }

  const objective = await prisma.learningObjective.findUnique({
    where: { id: objectiveId },
    include: {
      course: true,
    },
  });

  if (!objective) {
    throw new Error('Objective not found.');
  }

  if (objective.courseId !== courseId) {
    throw new Error('Objective does not belong to this course.');
  }

  if (objective.course.ownerId !== user.id) {
    throw new Error('You are not authorized to map content to this objective.');
  }

  const content = await prisma.sRCHContent.findUnique({
    where: { id: contentId },
  });

  if (!content) {
    throw new Error('SRCH content not found.');
  }

  await prisma.objectiveContentMap.upsert({
    where: {
      learningObjectiveId_srchContentId: {
        learningObjectiveId: objectiveId,
        srchContentId: contentId,
      },
    },
    update: {
      isSelected: true,
    },
    create: {
      learningObjectiveId: objectiveId,
      srchContentId: contentId,
      isSelected: true,
    },
  });

  redirect(`/srch?courseId=${courseId}&objectiveId=${objectiveId}`);
}