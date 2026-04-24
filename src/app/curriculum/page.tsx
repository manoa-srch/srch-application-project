import { redirect } from 'next/navigation';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const CurriculumPage = async () => {
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
    include: {
      owner: true,
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

  const activeCurriculums = courses.filter((course) => {
    const mappedContentCount = course.objectives.reduce(
      (total, objective) => total + objective.mappings.length,
      0,
    );

    return course.objectives.length > 0 && mappedContentCount > 0;
  });

  return (
    <main>
      <Container className="py-4">
        <Row className="align-items-center mb-4">
          <Col>
            <h1 className="fw-bold">Curriculum Gallery</h1>
            <p className="text-muted mb-0">
              Browse active curriculum plans created by instructors and see how they map learning
              objectives to SRCH content.
            </p>
          </Col>
        </Row>

        {activeCurriculums.length === 0 ? (
          <Row>
            <Col lg={8}>
              <Card className="shadow-sm">
                <CardBody className="p-4 text-center">
                  <h4 className="mb-3">No active curriculum paths yet</h4>
                  <p className="text-muted mb-4">
                    Create a course, add objectives, and map SRCH content to publish an active
                    curriculum view.
                  </p>
                  <Button variant="primary" href="/courses/new">
                    Create Your First Course
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row className="g-4">
            {activeCurriculums.map((course) => {
              const mappedContentCount = course.objectives.reduce(
                (total, objective) => total + objective.mappings.length,
                0,
              );

              const isOwner = course.ownerId === user.id;

              return (
                <Col key={course.id} md={6} lg={4}>
                  <Card className="h-100 shadow-sm">
                    <CardBody className="p-4 d-flex flex-column h-100">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="mb-0">{course.title}</h5>
                        <Badge bg={isOwner ? 'primary' : 'success'}>
                          {isOwner ? 'Mine' : 'Shared'}
                        </Badge>
                      </div>

                      <p className="text-muted mb-1">{course.code ?? 'No course code'}</p>

                      <p className="small text-muted mb-2">
                        By {course.owner.name ?? course.owner.email}
                      </p>

                      <p
                        className="text-muted"
                        style={{
                          whiteSpace: 'pre-line',
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {course.description ?? 'No course description has been added yet.'}
                      </p>

                      <p className="mb-2">
                        <strong>Objectives:</strong> {course.objectives.length}
                      </p>

                      <p className="mb-3">
                        <strong>Mapped SRCH Content:</strong> {mappedContentCount}
                      </p>

                      <div className="d-flex gap-2 flex-wrap mt-auto">
                        <Button
                          size="sm"
                          variant="primary"
                          href={`/courses/${course.id}/curriculum`}
                        >
                          View Curriculum
                        </Button>

                        {isOwner && (
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            href={`/courses/${course.id}`}
                          >
                            Manage Course
                          </Button>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </main>
  );
};

export default CurriculumPage;