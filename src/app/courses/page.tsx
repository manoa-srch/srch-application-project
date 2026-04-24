import { redirect } from 'next/navigation';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const CoursesPage = async () => {
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

  const courses = await prisma.course.findMany({
    where: {
      ownerId: user.id,
    },
    include: {
      objectives: {
        include: {
          mappings: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return (
    <main>
      <Container className="py-4">
        <Row className="align-items-center mb-4">
          <Col>
            <h1 className="fw-bold">My Courses</h1>
            <p className="text-muted mb-0">
              Create courses, define learning objectives, and build curriculum paths using SRCH content.
            </p>
          </Col>
          <Col xs="auto">
            <Button variant="primary" href="/courses/new">
              + New Course
            </Button>
          </Col>
        </Row>

        {courses.length === 0 ? (
          <Row>
            <Col lg={8}>
              <Card className="shadow-sm">
                <div className="p-4 text-center">
                  <h4 className="mb-3">No courses yet</h4>
                  <p className="text-muted mb-4">
                    Start by creating your first course. Then you can add learning objectives
                    and align them with SRCH topics and content.
                  </p>
                  <Button variant="primary" href="/courses/new">
                    Create Your First Course
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row className="g-4">
            {courses.map((course) => {
              const mappedContentCount = course.objectives.reduce(
                (total, objective) => total + objective.mappings.length,
                0,
              );

              const isDraft = course.objectives.length === 0;

              return (
                <Col key={course.id} md={6} lg={4}>
                  <Card className="h-100 shadow-sm">
                    <div className="p-3 d-flex flex-column h-100">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="mb-0">{course.title}</h5>
                        <Badge bg={isDraft ? 'secondary' : 'success'}>
                          {isDraft ? 'Draft' : 'Active'}
                        </Badge>
                      </div>

                      <p className="text-muted mb-2">{course.code ?? 'No course code'}</p>

                      <p>
                        {course.description ?? 'No course description has been added yet.'}
                      </p>

                      <p className="mb-2">
                        <strong>Objectives:</strong> {course.objectives.length}
                      </p>

                      <p className="mb-2">
                        <strong>Mapped SRCH Content:</strong> {mappedContentCount}
                      </p>

                      <p className="mb-3">
                        <strong>Last Updated:</strong>{' '}
                        {new Date(course.updatedAt).toLocaleDateString('en-US')}
                      </p>

                      <div className="d-flex gap-2 flex-wrap mt-auto">
                        <Button size="sm" variant="primary" href={`/courses/${course.id}`}>
                          Open Course
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          href={`/courses/${course.id}/edit`}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          href={`/courses/${course.id}`}
                        >
                          View Curriculum
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}

            <Col md={6} lg={4}>
              <Card className="h-100 shadow-sm border border-2">
                <div className="p-3 d-flex flex-column justify-content-center h-100">
                  <h5>Create a New Course</h5>
                  <p className="text-muted">
                    Start a new course and define its learning objectives before mapping SRCH content.
                  </p>
                  <Button variant="outline-primary" href="/courses/new">
                    + Add Course
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </main>
  );
};

export default CoursesPage;