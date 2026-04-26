import { Col, Container, Row, Table, Badge } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const ForumPage = async () => {
  const session = await auth();
  if (!session?.user?.email) redirect('/auth/signin');

  const [pendingPosts, mappedPosts] = await Promise.all([
    prisma.forumPost.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
        comments: true,
        votes: true,
        mappedObjective: true,
      },
    }),
    prisma.forumPost.findMany({
      where: { status: 'MAPPED' },
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
        comments: true,
        votes: true,
        mappedObjective: true,
      },
    }),
  ]);

  const isAdmin = session.user.role === 'ADMIN';

  return (
    <main>
      <Container id="forum" fluid className="py-3 mt-5 pt-4">

        {/* ── Header ── */}
        <Row className="mb-3">
          <Col>
            <h1>Objectives Forum</h1>
            <p className="text-muted">
              Submit new learning objectives that haven&apos;t been mapped yet.
              Admins can review and map them to existing objectives.
            </p>
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            <a href="/forum/new" className="btn btn-success">
              + New Objective
            </a>
          </Col>
        </Row>

        {/* ── Pending Posts ── */}
        <Row className="mb-5">
          <Col>
            <h2>
              Pending <Badge bg="warning" text="dark">{pendingPosts.length}</Badge>
            </h2>
            {pendingPosts.length === 0 ? (
              <p className="text-muted">No pending objectives.</p>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Bloom Level</th>
                    <th>Submitted By</th>
                    <th>Date</th>
                    <th>Votes</th>
                    <th>Comments</th>
                    <th>View</th>
                    {isAdmin && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {pendingPosts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td>
                        {post.bloomLevel ? (
                          <Badge bg="secondary">{post.bloomLevel}</Badge>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td>{post.author.name ?? `${post.author.firstName} ${post.author.lastName}`}</td>
                      <td>{post.createdAt.toLocaleDateString()}</td>
                      <td>{post.votes.length}</td>
                      <td>{post.comments.length}</td>
                      <td>
                        <a href={`/forum/${post.id}`} className="btn btn-sm btn-outline-primary">
                          View
                        </a>
                      </td>
                      {isAdmin && (
                        <td>
                          <a href={`/forum/${post.id}/map`} className="btn btn-sm btn-outline-success">
                            Map
                          </a>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>

        {/* ── Mapped Posts ── */}
        <Row>
          <Col>
            <h2>
              Mapped <Badge bg="success">{mappedPosts.length}</Badge>
            </h2>
            {mappedPosts.length === 0 ? (
              <p className="text-muted">No mapped objectives yet.</p>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Bloom Level</th>
                    <th>Submitted By</th>
                    <th>Mapped To</th>
                    <th>Date</th>
                    <th>Votes</th>
                    <th>Comments</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {mappedPosts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td>
                        {post.bloomLevel ? (
                          <Badge bg="secondary">{post.bloomLevel}</Badge>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td>{post.author.name ?? `${post.author.firstName} ${post.author.lastName}`}</td>
                      <td>
                        {post.mappedObjective ? (
                          <span>{post.mappedObjective.description}</span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td>{post.createdAt.toLocaleDateString()}</td>
                      <td>{post.votes.length}</td>
                      <td>{post.comments.length}</td>
                      <td>
                        <a href={`/forum/${post.id}`} className="btn btn-sm btn-outline-primary">
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>

      </Container>
    </main>
  );
};

export default ForumPage;