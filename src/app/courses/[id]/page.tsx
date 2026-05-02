import { notFound, redirect } from 'next/navigation';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ReactMarkdown from 'react-markdown';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { deleteCourse, updateMappingNote } from './actions';

type CoursePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const CoursePage = async ({ params }: CoursePageProps) => {
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
    redirect('/profile');
  }

  return (
    <main>
      <Container className="py-4">
        <Row className="align-items-start mb-4">
          <Col md={8}>
            <h1 className="fw-bold mb-1">{course.title}</h1>
            <p className="text-muted mb-2">{course.code ?? 'No course code'}</p>
            <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>
              {course.description ?? 'No course description has been added yet.'}
            </p>
          </Col>

          <Col md={4} className="text-md-end mt-3 mt-md-0">
            <div className="d-flex gap-2 justify-content-md-end flex-wrap">
              <Button variant="outline-secondary" href="/profile">
                Back to Profile
              </Button>

              <Button variant="primary" href={`/courses/${course.id}/edit`}>
                Edit Course
              </Button>

              <form action={deleteCourse}>
                <input type="hidden" name="id" value={course.id} />
                <Button type="submit" variant="outline-danger">
                  Delete Course
                </Button>
              </form>
            </div>
          </Col>
        </Row>

        <Row className="g-4 mb-4">
          <Col lg={12}>
            <Card className="shadow-sm h-100">
              <div className="p-4">
                <h5 className="mb-3">Course Overview</h5>

                <p className="text-muted mb-3">
                  Define learning objectives for this course and map them to SRCH content.
                </p>

                <p className="mb-2">
                  <strong>Objectives:</strong> {course.objectives.length}
                </p>

                <p className="mb-2">
                  <strong>Created:</strong>{' '}
                  {new Date(course.createdAt).toLocaleDateString('en-US')}
                </p>

                <p className="mb-4">
                  <strong>Last Updated:</strong>{' '}
                  {new Date(course.updatedAt).toLocaleDateString('en-US')}
                </p>

                <h6 className="mb-2">Next Steps</h6>
                <ol className="mb-0">
                  <li className="mb-2">Add learning objectives</li>
                  <li className="mb-2">Map SRCH content to those objectives</li>
                  <li>Build a curriculum path for the course</li>
                </ol>
              </div>
            </Card>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h3 className="mb-0">Learning Objectives</h3>

            <div className="d-flex gap-2">
              <Button variant="primary" size="sm" href={`/courses/${course.id}/objectives/new`}>
                + Add Objective
              </Button>

              <Button variant="outline-primary" size="sm" href="/srch">
                Browse SRCH
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="shadow-sm">
              <div className="p-4">
                {course.objectives.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {course.objectives.map((objective) => (
                      <details key={objective.id} className="border rounded p-3">
                        <summary className="d-flex justify-content-between align-items-center gap-3">
                          <div>
                            <Badge bg="secondary" className="me-2">
                              {objective.bloomLevel}
                            </Badge>
                            <span>{objective.description}</span>
                          </div>

                          <span className="text-muted small">
                            {objective.mappings.length} mapped
                          </span>
                        </summary>

                        <div className="mt-3">
                          <div className="d-flex gap-2 flex-wrap mb-3">
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              href={`/courses/${course.id}/objectives/${objective.id}/edit`}
                            >
                              Edit
                            </Button>

                            <Button
                              size="sm"
                              variant="outline-primary"
                              href={`/srch?courseId=${course.id}&objectiveId=${objective.id}`}
                            >
                              Map SRCH Content
                            </Button>
                          </div>

                          <h6 className="mb-2">Mapped SRCH Content</h6>

                          {objective.mappings.length > 0 ? (
                            <div className="d-flex flex-column gap-3">
                              {objective.mappings.map((mapping) => (
                                <div key={mapping.id} className="border rounded p-3 bg-light">
                                  <Row className="g-3">
                                    <Col lg={7}>
                                      <div className="fw-semibold">
                                        {mapping.srchContent.title}
                                      </div>

                                      <div className="text-muted small mb-2">
                                        Topic:{' '}
                                        {mapping.srchContent.topic ?? 'Uncategorized'}
                                      </div>

                                      <div className="border-top pt-2 mt-2">
                                        <div className="small text-muted mb-1">
                                          Instructor Notes
                                        </div>

                                        <form action={updateMappingNote}>
                                          <input
                                            type="hidden"
                                            name="mappingId"
                                            value={mapping.id}
                                          />
                                          <input
                                            type="hidden"
                                            name="courseId"
                                            value={course.id}
                                          />

                                          <textarea
                                            name="alignmentNote"
                                            defaultValue={mapping.alignmentNote ?? ''}
                                            className="form-control form-control-sm mb-2"
                                            rows={6}
                                            placeholder="Describe how you are using this SRCH content in your course..."
                                          />

                                          <div className="d-flex justify-content-end">
                                            <Button
                                              type="submit"
                                              size="sm"
                                              variant="outline-primary"
                                            >
                                              Save Notes
                                            </Button>
                                          </div>
                                        </form>
                                      </div>
                                    </Col>

                                    <Col lg={5}>
                                      <Card className="h-100 border-secondary">
                                        <div className="p-3">
                                          <h6 className="mb-2">SRCH Content Preview</h6>

                                          <p className="small text-muted mb-2">
                                            {mapping.srchContent.summary ??
                                              'No summary available.'}
                                          </p>

                                          <div
                                            className="small border-top pt-2"
                                            style={{
                                              maxHeight: '240px',
                                              overflowY: 'auto',
                                            }}
                                          >
                                            <ReactMarkdown>
                                              {mapping.srchContent.body}
                                            </ReactMarkdown>
                                          </div>

                                          <Button
                                            size="sm"
                                            variant="outline-secondary"
                                            className="mt-3"
                                            href={`/srch/content/${mapping.srchContent.id}?courseId=${course.id}&objectiveId=${objective.id}`}
                                          >
                                            Open Full Content
                                          </Button>
                                        </div>
                                      </Card>
                                    </Col>
                                  </Row>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted mb-0">No SRCH content mapped yet.</p>
                          )}
                        </div>
                      </details>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-3">
                    <h5 className="mb-2">No learning objectives yet</h5>
                    <p className="text-muted mb-3">
                      Start by adding learning objectives for this course. You’ll use them to map
                      SRCH content and build your curriculum path.
                    </p>

                    <Button variant="primary" href={`/courses/${course.id}/objectives/new`}>
                      Add Your First Objective
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default CoursePage;