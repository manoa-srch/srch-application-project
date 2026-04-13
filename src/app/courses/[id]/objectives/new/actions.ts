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

export async function createObjective(formData: FormData) {
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
  const courseId = parseInt(courseIdValue, 10);

  if (Number.isNaN(courseId)) {
    throw new Error('Invalid course id.');
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    throw new Error('Course not found.');
  }

  if (course.ownerId !== user.id) {
    throw new Error('You are not authorized to add objectives to this course.');
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

  await prisma.learningObjective.create({
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
      courseId,
    },
  });

  redirect(`/courses/${courseId}`);
}