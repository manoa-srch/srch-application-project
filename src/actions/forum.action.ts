'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { BloomLevel, ForumStatus } from '@prisma/client';

// Helper to require a logged-in user
async function requireUser() {
  const session = await auth();
  if (!session?.user?.email) redirect('/auth/signin');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) redirect('/auth/signin');
  return user;
}

// Helper to require admin
async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== 'ADMIN') throw new Error('Unauthorized: Admin access required.');
  return user;
}

// Create a new forum post
export async function createForumPost(formData: FormData) {
  const user = await requireUser();

  const title = formData.get('title')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const bloomLevel = formData.get('bloomLevel')?.toString().trim();

  if (!title || !description) throw new Error('Title and description are required.');

  await prisma.forumPost.create({
    data: {
      title,
      description,
      bloomLevel: bloomLevel ? (bloomLevel as BloomLevel) : null,
      authorId: user.id,
    },
  });

  redirect('/forum');
}

// Create a comment on a forum post
export async function createForumComment(formData: FormData) {
  const user = await requireUser();

  const postId = formData.get('postId')?.toString().trim();
  const body = formData.get('body')?.toString().trim();

  if (!postId || isNaN(Number(postId))) throw new Error('Invalid post ID.');
  if (!body) throw new Error('Comment cannot be empty.');

  await prisma.forumComment.create({
    data: {
      body,
      postId: Number(postId),
      authorId: user.id,
    },
  });

  redirect(`/forum/${postId}`);
}

// Toggle vote on a forum post
export async function toggleForumVote(formData: FormData) {
  const user = await requireUser();

  const postId = formData.get('postId')?.toString().trim();
  if (!postId || isNaN(Number(postId))) throw new Error('Invalid post ID.');

  const existing = await prisma.forumVote.findUnique({
    where: {
      authorId_postId: {
        authorId: user.id,
        postId: Number(postId),
      },
    },
  });

  if (existing) {
    await prisma.forumVote.delete({
      where: {
        authorId_postId: {
          authorId: user.id,
          postId: Number(postId),
        },
      },
    });
  } else {
    await prisma.forumVote.create({
      data: {
        authorId: user.id,
        postId: Number(postId),
      },
    });
  }

  redirect(`/forum/${postId}`);
}

// Admin: map a forum post to a learning objective
// Admin: create a new objective from a forum post and map it
export async function mapForumPost(formData: FormData) {
  await requireAdmin();

  const postId = formData.get('postId')?.toString().trim();
  const courseId = formData.get('courseId')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const bloomLevel = formData.get('bloomLevel')?.toString().trim();

  if (!postId || isNaN(Number(postId))) throw new Error('Invalid post ID.');
  if (!courseId || isNaN(Number(courseId))) throw new Error('Please select a course.');
  if (!description) throw new Error('Description is required.');
  if (!bloomLevel) throw new Error('Please select a Bloom\'s level.');

  // Create the new learning objective
  const newObjective = await prisma.learningObjective.create({
    data: {
      description,
      bloomLevel: bloomLevel as BloomLevel,
      courseId: Number(courseId),
    },
  });

  // Map the forum post to the new objective
  await prisma.forumPost.update({
    where: { id: Number(postId) },
    data: {
      status: ForumStatus.MAPPED,
      mappedObjectiveId: newObjective.id,
    },
  });

  redirect('/forum');
}

// Admin: reject a forum post
export async function rejectForumPost(formData: FormData) {
  await requireAdmin();

  const postId = formData.get('postId')?.toString().trim();
  if (!postId || isNaN(Number(postId))) throw new Error('Invalid post ID.');

  await prisma.forumPost.update({
    where: { id: Number(postId) },
    data: { status: ForumStatus.REJECTED },
  });

  redirect('/forum');
}