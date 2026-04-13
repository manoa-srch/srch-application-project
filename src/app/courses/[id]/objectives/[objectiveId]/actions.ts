'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function deleteObjective(formData: FormData) {
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

  const objectiveIdValue = formData.get('id')?.toString() ?? '';
  const courseIdValue = formData.get('courseId')?.toString() ?? '';

  const objectiveId = parseInt(objectiveIdValue, 10);
  const courseId = parseInt(courseIdValue, 10);

  if (Number.isNaN(objectiveId) || Number.isNaN(courseId)) {
    throw new Error('Invalid objective or course id.');
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
    throw new Error('You are not authorized to delete this objective.');
  }

  await prisma.learningObjective.delete({
    where: { id: objectiveId },
  });

  redirect(`/courses/${courseId}`);
}