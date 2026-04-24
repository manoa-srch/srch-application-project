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

export async function updateMappingNote(formData: FormData) {
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

  const mappingIdValue = formData.get('mappingId')?.toString() ?? '';
  const courseIdValue = formData.get('courseId')?.toString() ?? '';
  const alignmentNote = formData.get('alignmentNote')?.toString().trim() ?? '';

  const mappingId = parseInt(mappingIdValue, 10);
  const courseId = parseInt(courseIdValue, 10);

  if (Number.isNaN(mappingId) || Number.isNaN(courseId)) {
    throw new Error('Invalid mapping or course id.');
  }

  const mapping = await prisma.objectiveContentMap.findUnique({
    where: { id: mappingId },
    include: {
      learningObjective: {
        include: {
          course: true,
        },
      },
    },
  });

  if (!mapping) {
    throw new Error('Mapping not found.');
  }

  if (mapping.learningObjective.courseId !== courseId) {
    throw new Error('Mapping does not belong to this course.');
  }

  if (mapping.learningObjective.course.ownerId !== user.id) {
    throw new Error('You are not authorized to edit this mapping.');
  }

  await prisma.objectiveContentMap.update({
    where: { id: mappingId },
    data: {
      alignmentNote: alignmentNote || null,
    },
  });

  redirect(`/courses/${courseId}`);
}