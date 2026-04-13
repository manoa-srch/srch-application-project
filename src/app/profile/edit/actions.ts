'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function updateProfile(formData: FormData) {
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

  const firstName = formData.get('firstName')?.toString().trim() ?? '';
  const lastName = formData.get('lastName')?.toString().trim() ?? '';
  const name = formData.get('name')?.toString().trim() ?? '';

  if (!firstName || !lastName) {
    throw new Error('First name and last name are required.');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      firstName,
      lastName,
      name: name || null,
    },
  });

  redirect('/profile');
}