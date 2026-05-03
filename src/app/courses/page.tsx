import { redirect } from 'next/navigation';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';

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

  const totalObjectives = courses.reduce((sum, course) => sum + course.objectives.length, 0);
  const totalMappedContent = courses.reduce(
    (sum, course) => sum + course.objectives.reduce((inner, objective) => inner + objective.mappings.length, 0),
    0,
  );

  return (
    <main className="section-shell">
      <Container className="py-4 py-lg-5">
        <section className="hero-panel mb-4">
          <Row className="align-items-center g-4">
            <Col lg={8} className="hero-copy">
              <span className="eyebrow mb-3">Course workspace</span>
              <h1 className="mb-3">Design, track, and refine your course portfolio.</h1>
              <p className="mb-4">
                Keep every course, learning objective, and SRCH mapping in one place. This page now
                works like a planning dashboard instead of a plain list.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button href="/courses/new" size="lg">Create New Course</Button>
                <Button href="/srch" size="lg" variant="outline-primary">Browse SRCH Library</Button>
              </div>
            </Col>
            <Col lg={4}>
              <div className="dashboard-grid">
                <div className="dashboard-stat">
                  <strong>{courses.length}</strong>
                  <span>Courses</span>
                </div>
                <div className="dashboard-stat">
                  <strong>{totalObjectives}</strong>
                  <span>Objectives</span>
                </div>
                <div className="dashboard-stat">
                  <strong>{totalMappedContent}</strong>
                  <span>Mapped resources</span>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        {courses.length === 0 ? (
          <section className="section-card p-4 p-lg-5">
            <Row className="align-items-center g-4">
              <Col lg={6}>
                <PhotoPlaceholder
                  src="/images/hero%20image.jpg"
                  alt="Course planning materials and collaborative workspace."
                />
              </Col>
              <Col lg={6}>
                <span className="eyebrow mb-3">Get started</span>
                <h2 className="mb-3">No courses yet</h2>
                <p className="text-muted mb-4">
                  Start by creating your first course. Then add learning objectives and align them
                  with SRCH topics and content to build a usable curriculum path.
                </p>
                <Button href="/courses/new" size="lg">Create Your First Course</Button>
              </Col>
            </Row>
          </section>
        ) : (
          <Row className="g-4">
            {courses.map((course) => {
              const mappedContentCount = course.objectives.reduce(
                (total, objective) => total + objective.mappings.length,
                0,
              );

              const isDraft = course.objectives.length === 0;

              return (
                <Col key={course.id} md={6} xl={4}>
                  <Card className="surface-card border-0">
                    <div className="surface-body d-flex flex-column h-100">
                      <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                        <div>
                          <h4 className="mb-1">{course.title}</h4>
                          <p className="text-muted mb-0">{course.code ?? 'No course code'}</p>
                        </div>
                        <Badge bg={isDraft ? 'secondary' : 'success'}>
                          {isDraft ? 'Draft' : 'Active'}
                        </Badge>
                      </div>

                      <p
                        className="text-muted mb-4"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {course.description ?? 'No course description has been added yet.'}
                      </p>

                      <div className="metric-strip mb-4">
                        <span className="metric-chip">{course.objectives.length} objectives</span>
                        <span className="metric-chip">{mappedContentCount} mapped resources</span>
                        <span className="metric-chip">
                          Updated {new Date(course.updatedAt).toLocaleDateString('en-US')}
                        </span>
                      </div>

                      <div className="d-flex gap-2 flex-wrap mt-auto">
                        <Button size="sm" href={`/courses/${course.id}`}>Open Course</Button>
                        <Button size="sm" variant="outline-secondary" href={`/courses/${course.id}/edit`}>
                          Edit
                        </Button>
                        <Button size="sm" variant="outline-primary" href={`/courses/${course.id}`}>
                          View Curriculum
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}

            <Col md={6} xl={4}>
              <Card className="surface-card border-0">
                <div className="surface-body d-flex flex-column justify-content-between h-100">
                  <div>
                    <span className="eyebrow mb-3">Next course</span>
                    <h3 className="mb-2">Start another build</h3>
                    <p className="text-muted">
                      Add a new course shell, then define objectives before you map SRCH content.
                    </p>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline-primary" href="/courses/new">+ Add Course</Button>
                  </div>
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
