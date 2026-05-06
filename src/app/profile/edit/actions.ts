'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const MAX_PROFILE_IMAGE_BYTES = 2 * 1024 * 1024;
const ALLOWED_PROFILE_IMAGE_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
]);

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
  const bio = formData.get('bio')?.toString().trim() ?? '';
  const profileImageFile = formData.get('profileImageFile');
  const canManageProfileImage = user.role === 'INSTRUCTOR';

  if (!firstName || !lastName) {
    throw new Error('First name and last name are required.');
  }

  let nextProfileImage = user.profileImage;

  if (canManageProfileImage && profileImageFile instanceof File && profileImageFile.size > 0) {
    if (!ALLOWED_PROFILE_IMAGE_TYPES.has(profileImageFile.type)) {
      throw new Error('Profile image must be a PNG, JPEG, WebP, or GIF file.');
    }

    if (profileImageFile.size > MAX_PROFILE_IMAGE_BYTES) {
      throw new Error('Profile image must be 2 MB or smaller.');
    }

    const bytes = await profileImageFile.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    nextProfileImage = `data:${profileImageFile.type};base64,${base64}`;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      firstName,
      lastName,
      name: name || null,
      bio: bio || null,
      profileImage: nextProfileImage,
    },
  });

  redirect('/profile');
}
