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

// ── User Actions ──

export async function adminUpdateUser(formData: FormData) {
  await requireAdmin();

  const userID = formData.get('userID')?.toString().trim();
  if (!userID || isNaN(Number(userID))) throw new Error('Invalid or missing user ID.');

  const firstName = formData.get('firstName')?.toString().trim();
  const lastName = formData.get('lastName')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const name = formData.get('name')?.toString().trim();
  const role = formData.get('role')?.toString().trim();

  const data = Object.fromEntries(
    Object.entries({ firstName, lastName, email, name, role })
      .filter(([, v]) => v !== undefined && v !== '')
  );

  if (Object.keys(data).length === 0) throw new Error('No fields provided to update.');

  await prisma.user.update({
    where: { id: Number(userID) },
    data,
  });

  redirect('/admin');
}

export async function adminCreateUser(formData: FormData) {
  await requireAdmin();

  const email = formData.get('email')?.toString().trim();
  const password = formData.get('password')?.toString();
  const firstName = formData.get('firstName')?.toString().trim() ?? '';
  const lastName = formData.get('lastName')?.toString().trim() ?? '';
  const role = formData.get('role')?.toString().trim() ?? '';

  if (!email || !password) throw new Error('Email and password are required.');
  if (!firstName || !lastName) throw new Error('First name and last name are required.');
  if (!role) throw new Error('Role is required.');

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
      role: role as Role,
    },
  });

  redirect('/admin');
}

export async function adminDeleteUser(formData: FormData) {
  await requireAdmin();

  const userID = formData.get('userID')?.toString().trim();
  if (!userID || isNaN(Number(userID))) throw new Error('Invalid or missing user ID.');

  await prisma.user.delete({
    where: { id: Number(userID) },
  });

  redirect('/admin');
}

// ── Course Actions ──

export async function adminCreateCourse(formData: FormData) {
  await requireAdmin();

  const title = formData.get('title')?.toString().trim();
  const code = formData.get('code')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const ownerEmail = formData.get('ownerEmail')?.toString().trim();

  if (!title) throw new Error('Course title is required.');
  if (!ownerEmail) throw new Error('Owner email is required.');

  const owner = await prisma.user.findUnique({ where: { email: ownerEmail } });
  if (!owner) throw new Error('No user found with that email.');

  await prisma.course.create({
    data: {
      title,
      code: code || null,
      description: description || null,
      ownerId: owner.id,
    },
  });

  redirect('/admin');
}

export async function adminUpdateCourse(formData: FormData) {
  await requireAdmin();

  const courseId = formData.get('courseId')?.toString().trim();
  if (!courseId || isNaN(Number(courseId))) throw new Error('Invalid course ID.');

  const title = formData.get('title')?.toString().trim();
  const code = formData.get('code')?.toString().trim();
  const description = formData.get('description')?.toString().trim();

  const data = Object.fromEntries(
    Object.entries({ title, code, description })
      .filter(([, v]) => v !== undefined && v !== '')
  );

  if (Object.keys(data).length === 0) throw new Error('No fields provided to update.');

  await prisma.course.update({
    where: { id: Number(courseId) },
    data,
  });

  redirect('/admin');
}

export async function adminDeleteCourse(formData: FormData) {
  await requireAdmin();

  const courseId = formData.get('courseId')?.toString().trim();
  if (!courseId || isNaN(Number(courseId))) throw new Error('Invalid course ID.');

  await prisma.course.delete({
    where: { id: Number(courseId) },
  });

  redirect('/admin');
}

// ── Learning Objective Actions ──

export async function adminCreateObjective(formData: FormData) {
  await requireAdmin();

  const courseId = formData.get('courseId')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const bloomLevel = formData.get('bloomLevel')?.toString().trim();

  if (!courseId || isNaN(Number(courseId))) throw new Error('Invalid course ID.');
  if (!description) throw new Error('Description is required.');
  if (!bloomLevel) throw new Error('Bloom level is required.');

  await prisma.learningObjective.create({
    data: {
      description,
      bloomLevel: bloomLevel as 'REMEMBER' | 'UNDERSTAND' | 'APPLY' | 'ANALYZE' | 'EVALUATE' | 'CREATE',
      courseId: Number(courseId),
    },
  });

  redirect('/admin');
}

export async function adminUpdateObjective(formData: FormData) {
  await requireAdmin();

  const objectiveId = formData.get('objectiveId')?.toString().trim();
  if (!objectiveId || isNaN(Number(objectiveId))) throw new Error('Invalid objective ID.');

  const description = formData.get('description')?.toString().trim();
  const bloomLevel = formData.get('bloomLevel')?.toString().trim();

  const data = Object.fromEntries(
    Object.entries({ description, bloomLevel })
      .filter(([, v]) => v !== undefined && v !== '')
  );

  if (Object.keys(data).length === 0) throw new Error('No fields provided to update.');

  await prisma.learningObjective.update({
    where: { id: Number(objectiveId) },
    data,
  });

  redirect('/admin');
}

export async function adminDeleteObjective(formData: FormData) {
  await requireAdmin();

  const objectiveId = formData.get('objectiveId')?.toString().trim();
  if (!objectiveId || isNaN(Number(objectiveId))) throw new Error('Invalid objective ID.');

  await prisma.learningObjective.delete({
    where: { id: Number(objectiveId) },
  });

  redirect('/admin');
}

// ── SRCHContent Actions ──

export async function adminCreateContent(formData: FormData) {
  const admin = await requireAdmin();

  const title = formData.get('title')?.toString().trim();
  const body = formData.get('body')?.toString().trim();
  const summary = formData.get('summary')?.toString().trim();
  const topic = formData.get('topic')?.toString().trim();

  if (!title) throw new Error('Title is required.');
  if (!body) throw new Error('Body is required.');

  await prisma.sRCHContent.create({
    data: {
      title,
      body,
      summary: summary || null,
      topic: topic || null,
      authorId: admin.id,
    },
  });

  redirect('/admin');
}

export async function adminUpdateContent(formData: FormData) {
  await requireAdmin();

  const contentId = formData.get('contentId')?.toString().trim();
  if (!contentId || isNaN(Number(contentId))) throw new Error('Invalid content ID.');

  const title = formData.get('title')?.toString().trim();
  const body = formData.get('body')?.toString().trim();
  const summary = formData.get('summary')?.toString().trim();
  const topic = formData.get('topic')?.toString().trim();

  const data = Object.fromEntries(
    Object.entries({ title, body, summary, topic })
      .filter(([, v]) => v !== undefined && v !== '')
  );

  if (Object.keys(data).length === 0) throw new Error('No fields provided to update.');

  await prisma.sRCHContent.update({
    where: { id: Number(contentId) },
    data,
  });

  redirect('/admin');
}

export async function adminDeleteContent(formData: FormData) {
  await requireAdmin();

  const contentId = formData.get('contentId')?.toString().trim();
  if (!contentId || isNaN(Number(contentId))) throw new Error('Invalid content ID.');

  await prisma.sRCHContent.delete({
    where: { id: Number(contentId) },
  });

  redirect('/admin');
}