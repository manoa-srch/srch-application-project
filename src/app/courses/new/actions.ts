'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createCourse(formData: FormData) {
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

  const title = formData.get('title')?.toString().trim() ?? '';
  const code = formData.get('code')?.toString().trim() ?? '';
  const description = formData.get('description')?.toString().trim() ?? '';

  if (!title) {
    throw new Error('Course title is required.');
  }

  const course = await prisma.course.create({
    data: {
      title,
      code: code || null,
      description: description || null,
      ownerId: user.id,
    },
  });

  redirect(`/courses/${course.id}`);
}