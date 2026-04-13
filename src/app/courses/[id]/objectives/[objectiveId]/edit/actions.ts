'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const validBloomLevels = new Set([
  'REMEMBER',
  'UNDERSTAND',
  'APPLY',
  'ANALYZE',
  'EVALUATE',
  'CREATE',
]);

export async function updateObjective(formData: FormData) {
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

  const idValue = formData.get('id')?.toString() ?? '';
  const courseIdValue = formData.get('courseId')?.toString() ?? '';

  const objectiveId = parseInt(idValue, 10);
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
    throw new Error('You are not authorized to edit this objective.');
  }

  const description = formData.get('description')?.toString().trim() ?? '';
  const bloomLevel = formData.get('bloomLevel')?.toString().trim() ?? '';
  const positionValue = formData.get('position')?.toString().trim() ?? '';

  if (!description) {
    throw new Error('Objective description is required.');
  }

  if (!validBloomLevels.has(bloomLevel)) {
    throw new Error('A valid Bloom level is required.');
  }

  const position = positionValue ? parseInt(positionValue, 10) : null;

  if (positionValue && Number.isNaN(position)) {
    throw new Error('Position must be a valid number.');
  }

  await prisma.learningObjective.update({
    where: { id: objectiveId },
    data: {
      description,
      bloomLevel: bloomLevel as
        | 'REMEMBER'
        | 'UNDERSTAND'
        | 'APPLY'
        | 'ANALYZE'
        | 'EVALUATE'
        | 'CREATE',
      position,
    },
  });

  redirect(`/courses/${courseId}`);
}