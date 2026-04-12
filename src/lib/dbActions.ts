'use server';

import { prisma } from './prisma';

export async function addStuff() {
  throw new Error('The legacy inventory feature is not available in this SRCH schema.');
}

export async function editStuff() {
  throw new Error('The legacy inventory feature is not available in this SRCH schema.');
}

export async function deleteStuff() {
  throw new Error('The legacy inventory feature is not available in this SRCH schema.');
}

export async function createUser(credentials: { email: string; password: string }) {
  const emailPrefix = credentials.email.split('@')[0] || 'user';
  const firstName = emailPrefix;
  const lastName = 'User';

  await prisma.user.upsert({
    where: { email: credentials.email },
    update: {},
    create: {
      email: credentials.email,
      password: credentials.password,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
    },
  });
}

export async function changePassword() {
  return;
}
