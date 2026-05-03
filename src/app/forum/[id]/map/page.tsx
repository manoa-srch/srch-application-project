import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { mapForumPost } from '@/actions/forum.action';

const MapForumPostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  if (!session?.user?.email) redirect('/auth/signin');

  const { id } = await params;
  const postId = Number(id);
  if (isNaN(postId)) notFound();

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!currentUser || currentUser.role !== 'ADMIN') redirect('/forum');

  const [post, courses] = await Promise.all([
    prisma.forumPost.findUnique({
      where: { id: postId },
      include: { author: true },
    }),
    prisma.course.findMany({
      orderBy: { title: 'asc' },
    }),
  ]);

  if (!post) notFound();
  if (post.status !== 'PENDING') redirect('/forum');

  return (
    <main>
      <Container className="py-3">
        <Row className="mb-3">
          <Col>
            <Link href={`/forum/${post.id}`} className="btn btn-outline-secondary btn-sm">
              Back to Post
            </Link>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <h1>Create &amp; Map New Objective</h1>
            <div className="border rounded p-3 bg-light">
              <h5>{post.title}</h5>
              <p className="mb-1">{post.description}</p>
              <p className="text-muted small mb-0">
                Submitted by {post.author.name ?? `${post.author.firstName} ${post.author.lastName}`}
                {' '}on {post.createdAt.toLocaleDateString()}
              </p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <h5>Create a new Learning Objective from this post:</h5>
            <form action={mapForumPost}>
              <input type="hidden" name="postId" value={post.id} />

              <div className="mb-3">
                <label htmlFor="courseId" className="form-label fw-bold">
                  Course
                </label>
                <select name="courseId" id="courseId" required className="form-select">
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.code ? `[${course.code}] ` : ''}{course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-bold">
                  Objective Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={3}
                  defaultValue={post.description}
                  className="form-control"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="bloomLevel" className="form-label fw-bold">
                  Bloom&apos;s Taxonomy Level
                </label>
                <select
                  id="bloomLevel"
                  name="bloomLevel"
                  required
                  className="form-select"
                  defaultValue={post.bloomLevel ?? ''}
                >
                  <option value="">Select a level</option>
                  <option value="REMEMBER">Remember</option>
                  <option value="UNDERSTAND">Understand</option>
                  <option value="APPLY">Apply</option>
                  <option value="ANALYZE">Analyze</option>
                  <option value="EVALUATE">Evaluate</option>
                  <option value="CREATE">Create</option>
                </select>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  Create & Map Objective
                </button>
                <Link href={`/forum/${post.id}`} className="btn btn-outline-secondary">
                  Cancel
                </Link>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default MapForumPostPage;
