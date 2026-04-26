'use server';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { Role } from '@prisma/client';
// Helper to verify admin access
async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email) redirect('/auth/signin');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) redirect('/auth/signin');
  if (user.role !== Role.ADMIN) throw new Error('Unauthorized: Admin access required.');

  return user;
}

// Update user information based on user ID
export async function adminUpdateUser(formData: FormData) {
  await requireAdmin();

  const userID = formData.get('userID')?.toString().trim();
  if (!userID || isNaN(Number(userID))) throw new Error('Invalid or missing user ID.');

  const firstName = formData.get('firstName')?.toString().trim();
  const lastName = formData.get('lastName')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const name = formData.get('name')?.toString().trim();

  // Only include fields that were actually provided
  const data = Object.fromEntries(
    Object.entries({ firstName, lastName, email, name })
          .filter(([, v]) => v !== undefined && v !== '')
  );

  if (Object.keys(data).length === 0) throw new Error('No fields provided to update.');

  await prisma.user.update({
    where: { id: Number(userID) },
    data,
  });

  redirect('/admin/users');
}

// Create a new user
export async function adminCreateUser(formData: FormData) {
  await requireAdmin();

  const email = formData.get('email')?.toString().trim();
  const password = formData.get('password')?.toString();
  const firstName = formData.get('firstName')?.toString().trim() ?? '';
  const lastName = formData.get('lastName')?.toString().trim() ?? '';

  if (!email || !password) throw new Error('Email and password are required.');
  if (!firstName || !lastName) throw new Error('First name and last name are required.');

  // Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('A user with this email already exists.');

  const hashedPassword = await hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
    },
  });

  redirect('/admin/users');
}

// Delete a user by ID
export async function adminDeleteUser(formData: FormData) {
  await requireAdmin();

  const userID = formData.get('userID')?.toString().trim();
  if (!userID || isNaN(Number(userID))) throw new Error('Invalid or missing user ID.');

  await prisma.user.delete({
    where: { id: Number(userID) },
  });

  redirect('/admin/users');
}