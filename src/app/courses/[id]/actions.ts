'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function deleteCourse(formData: FormData) {
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
  const courseId = parseInt(idValue, 10);

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
    throw new Error('You are not authorized to delete this course.');
  }

  await prisma.course.delete({
    where: { id: courseId },
  });

  redirect('/courses');
}