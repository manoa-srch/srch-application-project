import { redirect } from 'next/navigation';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      courses: true,
      contents: true,
    },
  });

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <main>
      <Container className="py-4">
        <Row className="mb-4">
          <Col md={8}>
            <h1 className="fw-bold">Profile</h1>
            <p className="text-muted mb-0">
              Manage your courses and contributions to the SRCH platform.
            </p>
          </Col>
        </Row>

        <Card className="shadow-sm mb-4">
          <div className="p-3">
            <Row className="align-items-center">
              <Col md={8}>
                <h4 className="mb-1">{user.name ?? `${user.firstName} ${user.lastName}`}</h4>
                <p className="text-muted mb-1">{user.email}</p>
                <Badge bg="secondary">{user.role}</Badge>
              </Col>
              <Col md={4} className="text-md-end mt-3 mt-md-0">
                <Button variant="outline-primary" size="sm" href="/profile/edit">
                  Edit Profile
                </Button>
              </Col>
            </Row>
          </div>
        </Card>

        <Row className="mb-4">
          <Col>
            <h3>Your Courses</h3>
            <Button href="/courses/new">+ New Course</Button>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          {user.courses.length > 0 ? (
            user.courses.map((course) => (
              <Col key={course.id} md={6} lg={4}>
                <Card className="h-100 shadow-sm">
                  <div className="p-3">
                    <h5>{course.title}</h5>
                    <p className="text-muted mb-2">{course.code ?? 'No course code'}</p>
                    <p>{course.description ?? 'No description available.'}</p>
                    <div className="d-flex gap-2">
                      <Button size="sm" variant="primary" href={`/courses/${course.id}`}>
                        Open
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        href={`/courses/${course.id}/edit`}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-muted">You have not created any courses yet.</p>
            </Col>
          )}
        </Row>

        <Row className="mb-3">
          <Col>
            <h3>Your Contributions</h3>
          </Col>
        </Row>

        <Row className="g-4">
          {user.contents.length > 0 ? (
            user.contents.map((content) => (
              <Col key={content.id} md={6}>
                <Card className="shadow-sm">
                  <div className="p-3">
                    <h5>{content.title}</h5>
                    <p className="text-muted mb-2">Topic: {content.topic ?? 'Uncategorized'}</p>
                    <p>{content.summary ?? 'No summary available.'}</p>
                    <div className="d-flex gap-2">
                      <Button size="sm" variant="outline-primary">
                        View
                      </Button>
                      <Button size="sm" variant="outline-secondary">
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-muted">You have not contributed any SRCH content yet.</p>
            </Col>
          )}
        </Row>
      </Container>
    </main>
  );
};

export default ProfilePage;