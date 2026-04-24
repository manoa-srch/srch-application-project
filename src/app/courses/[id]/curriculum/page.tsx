import { notFound, redirect } from 'next/navigation';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

type CurriculumCoursePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const CurriculumCoursePage = async ({ params }: CurriculumCoursePageProps) => {
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

  const { id } = await params;
  const courseId = parseInt(id, 10);

  if (Number.isNaN(courseId)) {
    notFound();
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      objectives: {
        orderBy: {
          position: 'asc',
        },
        include: {
          mappings: {
            where: {
              isSelected: true,
            },
            include: {
              srchContent: true,
            },
          },
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  if (course.ownerId !== user.id) {
    redirect('/curriculum');
  }

  const mappedContentCount = course.objectives.reduce(
    (total, objective) => total + objective.mappings.length,
    0,
  );

  return (
    <main>
      <Container className="py-4">
        <Row className="align-items-start mb-4">
          <Col lg={8}>
            <Button variant="outline-secondary" size="sm" href="/curriculum" className="mb-3">
              ← Back to Curriculum
            </Button>

            <h1 className="fw-bold mb-1">{course.title} Curriculum</h1>
            <p className="text-muted mb-2">{course.code ?? 'No course code'}</p>
            <p className="mb-0">
              {course.description ?? 'No course description has been added yet.'}
            </p>
          </Col>

          <Col lg={4} className="text-lg-end mt-3 mt-lg-0">
            <Button variant="primary" href={`/courses/${course.id}`}>
              Manage Course
            </Button>
          </Col>
        </Row>

        <Row className="g-4 mb-4">
          <Col md={4}>
            <Card className="shadow-sm h-100">
              <CardBody>
                <h5 className="mb-1">{course.objectives.length}</h5>
                <p className="text-muted mb-0">Learning Objectives</p>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm h-100">
              <CardBody>
                <h5 className="mb-1">{mappedContentCount}</h5>
                <p className="text-muted mb-0">Mapped SRCH Resources</p>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm h-100">
              <CardBody>
                <h5 className="mb-1">
                  {course.objectives.length > 0
                    ? Math.round((course.objectives.filter((objective) => objective.mappings.length > 0).length /
                        course.objectives.length) *
                        100)
                    : 0}
                  %
                </h5>
                <p className="text-muted mb-0">Objectives With Mappings</p>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="shadow-sm">
              <CardBody className="p-4">
                <h3 className="h5 mb-3">Objective-to-SRCH Curriculum Map</h3>

                {course.objectives.length > 0 ? (
                  <div className="d-flex flex-column gap-4">
                    {course.objectives.map((objective, index) => (
                      <div key={objective.id} className="border rounded p-3">
                        <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-2">
                          <div>
                            <h4 className="h6 mb-1">
                              {objective.position ?? index + 1}. {objective.description}
                            </h4>
                            <Badge bg="secondary">{objective.bloomLevel}</Badge>
                          </div>

                          <Button
                            size="sm"
                            variant="outline-primary"
                            href={`/srch?courseId=${course.id}&objectiveId=${objective.id}`}
                          >
                            Map More Content
                          </Button>
                        </div>

                        {objective.mappings.length > 0 ? (
                          <div className="d-flex flex-column gap-3 mt-3">
                            {objective.mappings.map((mapping) => (
                              <div key={mapping.id} className="border rounded p-3 bg-light">
                                <div className="d-flex justify-content-between align-items-start gap-2 flex-wrap">
                                  <div>
                                    <Badge bg="light" text="dark" className="mb-2">
                                      {mapping.srchContent.topic ?? 'Uncategorized'}
                                    </Badge>
                                    <h5 className="h6 mb-1">{mapping.srchContent.title}</h5>
                                  </div>

                                  <Button
                                    size="sm"
                                    variant="outline-secondary"
                                    href={`/srch/content/${mapping.srchContent.id}`}
                                  >
                                    View Content
                                  </Button>
                                </div>

                                <p className="text-muted small mb-2">
                                  {mapping.srchContent.summary ??
                                    'No summary has been added for this SRCH content.'}
                                </p>

                                <div className="border-top pt-2 mt-2">
                                  <div className="small text-muted mb-1">Instructor Notes</div>
                                  {mapping.alignmentNote ? (
                                    <p className="small mb-0">{mapping.alignmentNote}</p>
                                  ) : (
                                    <p className="small text-muted fst-italic mb-0">
                                      No instructor notes added yet.
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-muted fst-italic mt-3">
                            No SRCH content mapped to this objective yet.
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-3">
                    <h5 className="mb-2">No learning objectives yet</h5>
                    <p className="text-muted mb-3">
                      Add objectives before building a curriculum view.
                    </p>
                    <Button variant="primary" href={`/courses/${course.id}/objectives/new`}>
                      Add Objective
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default CurriculumCoursePage;