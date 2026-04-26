
'use server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { User } from '@prisma/client';

// Allow Admin to change, update, add, and delete user information

// Allow admin to update user information based on user ID
export async function adminUpdateUser(userId: number, data: Partial<User>) {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
}

// Allow admin to create/add user information 
export async function adminCreateUser( credentials: { email: string; password: string }) {
  const emailPrefix = credentials.email.split('@')[0] || 'user';
  const firstName = emailPrefix;
  const lastName = 'User';
  const userData: Prisma.UserCreateInput = {
    email: credentials.email,
    password: credentials.password,
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
  };

  await prisma.user.upsert({
    where: { email: credentials.email },
    update: {},
    create: userData,
  });
}

// Allow admin to remove user information based on user ID
export async function adminDeleteUser(userId: number) {
  return prisma.user.delete({
    where: { id: userId },
  });
}
