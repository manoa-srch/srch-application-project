import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { createForumComment, rejectForumPost, toggleForumVote } from '@/actions/forum.action';

const ForumPostPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session?.user?.email) redirect('/auth/signin');
  const { id } = await params;
  const postId = Number(id);
  if (isNaN(postId)) notFound();

  const [post, currentUser] = await Promise.all([
    prisma.forumPost.findUnique({
      where: { id: postId },
      include: {
        author: true,
        comments: {
          orderBy: { createdAt: 'asc' },
          include: { author: true },
        },
        votes: true,
        mappedObjective: true,
      },
    }),
    prisma.user.findUnique({
      where: { email: session.user.email },
    }),
  ]);

  if (!post) notFound();
  if (!currentUser) redirect('/auth/signin');

  const hasVoted = post.votes.some((v) => v.authorId === currentUser.id);
  const isAdmin = currentUser.role === 'ADMIN';

  return (
    <main>
      <Container className="py-5 mt-5 pt-4">

        {/* ── Back link ── */}
        <Row className="mb-3">
          <Col>
            <a href="/forum" className="btn btn-outline-secondary btn-sm">
              ← Back to Forum
            </a>
          </Col>
        </Row>

        {/* ── Post Header ── */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex align-items-center gap-2 mb-1">
              <h1 className="mb-0">{post.title}</h1>
              <Badge bg={
                post.status === 'PENDING' ? 'warning' :
                post.status === 'MAPPED' ? 'success' : 'danger'
              } text={post.status === 'PENDING' ? 'dark' : undefined}>
                {post.status}
              </Badge>
              {post.bloomLevel && (
                <Badge bg="secondary">{post.bloomLevel}</Badge>
              )}
            </div>
            <p className="text-muted small">
              Submitted by {post.author.name ?? `${post.author.firstName} ${post.author.lastName}`}
              {' '}on {post.createdAt.toLocaleDateString()}
            </p>
            <p>{post.description}</p>

            {/* Mapped objective info */}
            {post.status === 'MAPPED' && post.mappedObjective && (
              <div className="alert alert-success">
                <strong>Mapped to:</strong> {post.mappedObjective.description}
              </div>
            )}
          </Col>
        </Row>

        {/* ── Vote ── */}
        <Row className="mb-4">
          <Col>
            <form action={toggleForumVote}>
              <input type="hidden" name="postId" value={post.id} />
              <button
                type="submit"
                className={`btn ${hasVoted ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                ▲ {hasVoted ? 'Voted' : 'Upvote'} ({post.votes.length})
              </button>
            </form>
          </Col>

          {/* Admin actions */}
          {isAdmin && post.status === 'PENDING' && (
            <Col xs="auto" className="d-flex gap-2 align-items-center">
              <Link
                href={`/forum/${post.id}/map`}
                className="btn btn-outline-success btn-sm"
              >
                Map to Objective
              </Link>
              <form action={rejectForumPost}>
                <input type="hidden" name="postId" value={post.id} />
                <Button type="submit" className="btn btn-outline-danger btn-sm">
                  Reject
                </Button>
              </form>
            </Col>
          )}
        </Row>

        {/* ── Comments ── */}
        <Row className="mb-4">
          <Col>
            <h4>Comments ({post.comments.length})</h4>
            {post.comments.length === 0 ? (
              <p className="text-muted">No comments yet. Be the first!</p>
            ) : (
              post.comments.map((comment) => (
                <div key={comment.id} className="border rounded p-3 mb-2">
                  <p className="mb-1">{comment.body}</p>
                  <p className="text-muted small mb-0">
                    {comment.author.name ?? `${comment.author.firstName} ${comment.author.lastName}`}
                    {' '}· {comment.createdAt.toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </Col>
        </Row>

        {/* ── Add Comment ── */}
        <Row>
          <Col md={8}>
            <h5>Leave a Comment</h5>
            <form action={createForumComment}>
              <input type="hidden" name="postId" value={post.id} />
              <div className="mb-2">
                <textarea
                  name="body"
                  required
                  rows={3}
                  placeholder="Write your comment..."
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Post Comment
              </button>
            </form>
          </Col>
        </Row>

      </Container>
    </main>
  );
};

export default ForumPostPage;