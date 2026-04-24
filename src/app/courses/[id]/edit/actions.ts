'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function updateCourse(formData: FormData) {
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

  const existingCourse = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!existingCourse) {
    throw new Error('Course not found.');
  }

  if (existingCourse.ownerId !== user.id) {
    throw new Error('You are not authorized to edit this course.');
  }

  const title = formData.get('title')?.toString().trim() ?? '';
  const code = formData.get('code')?.toString().trim() ?? '';
  const description = formData.get('description')?.toString().trim() ?? '';

  if (!title) {
    throw new Error('Course title is required.');
  }

  await prisma.course.update({
    where: { id: courseId },
    data: {
      title,
      code: code || null,
      description: description || null,
    },
  });

  redirect(`/courses/${courseId}`);
}