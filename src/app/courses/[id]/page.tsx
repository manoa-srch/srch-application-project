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

  const mappedCount = course.objectives.reduce((sum, objective) => sum + objective.mappings.length, 0);

  return (
    <main className="section-shell">
      <Container className="py-4 py-lg-5">
        <section className="hero-panel mb-4">
          <Row className="align-items-start g-4">
            <Col lg={8} className="hero-copy">
              <span className="eyebrow mb-3">Course detail</span>
              <h1 className="mb-2">{course.title}</h1>
              <p className="mb-3">{course.code ?? 'No course code'}</p>
              <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>
                {course.description ?? 'No course description has been added yet.'}
              </p>
            </Col>
            <Col lg={4}>
              <div className="dashboard-grid dashboard-grid-course-detail">
                <div className="dashboard-stat">
                  <strong>{course.objectives.length}</strong>
                  <span>Objectives</span>
                </div>
                <div className="dashboard-stat">
                  <strong>{mappedCount}</strong>
                  <span>Mapped resources</span>
                </div>
                <div className="dashboard-stat dashboard-stat-course-date">
                  <strong>{new Date(course.updatedAt).toLocaleDateString('en-US')}</strong>
                  <span>Last updated</span>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        <section className="section-card p-4 mb-4">
          <Row className="g-3 align-items-center">
            <Col lg={8}>
              <h3 className="mb-2">Course overview</h3>
              <p className="text-muted mb-3">
                Define learning objectives for this course and map them to SRCH content.
              </p>
              <div className="metric-strip">
                <span className="metric-chip">Created {new Date(course.createdAt).toLocaleDateString('en-US')}</span>
                <span className="metric-chip">Updated {new Date(course.updatedAt).toLocaleDateString('en-US')}</span>
                <span className="metric-chip">{mappedCount} mapped resources</span>
              </div>
            </Col>
            <Col lg={4}>
              <div className="d-flex gap-2 justify-content-lg-end flex-wrap">
                <Button variant="outline-secondary" href="/profile">Back to Profile</Button>
                <Button href={`/courses/${course.id}/edit`}>Edit Course</Button>
                <form action={deleteCourse}>
                  <input type="hidden" name="id" value={course.id} />
                  <Button type="submit" variant="outline-danger">Delete Course</Button>
                </form>
              </div>
            </Col>
          </Row>
        </section>

        <section className="section-card p-4 mb-4">
          <Row className="g-4">
            <Col lg={8}>
              <h3 className="mb-2">Learning Objectives</h3>
              <p className="text-muted mb-0">
                Add objectives, connect them to SRCH content, and keep instructor notes alongside each mapping.
              </p>
            </Col>
            <Col lg={4}>
              <div className="d-flex justify-content-lg-end gap-2 flex-wrap">
                <Button size="sm" href={`/courses/${course.id}/objectives/new`}>+ Add Objective</Button>
                <Button size="sm" variant="outline-primary" href="/srch">Browse SRCH</Button>
              </div>
            </Col>
          </Row>
        </section>

        <Card className="surface-card border-0">
          <div className="surface-body">
            {course.objectives.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {course.objectives.map((objective) => (
                  <details key={objective.id} className="course-objective p-3 p-lg-4">
                    <summary className="objective-summary">
                      <div className="objective-title">
                        <Badge bg="secondary">{objective.bloomLevel}</Badge>
                        <span>{objective.description}</span>
                      </div>
                      <span className="text-muted small">{objective.mappings.length} mapped</span>
                    </summary>

                    <div className="mt-4">
                      <div className="d-flex gap-2 flex-wrap mb-4">
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

                      <h5 className="mb-3">Mapped SRCH Content</h5>

                      {objective.mappings.length > 0 ? (
                        <div className="d-flex flex-column gap-3">
                          {objective.mappings.map((mapping) => (
                            <div key={mapping.id} className="list-card p-3 p-lg-4">
                              <Row className="g-4">
                                <Col lg={7}>
                                  <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                                    <div>
                                      <h5 className="mb-1">{mapping.srchContent.title}</h5>
                                      <p className="text-muted mb-0">
                                        Topic: {mapping.srchContent.topic ?? 'Uncategorized'}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="border-top pt-3">
                                    <div className="small text-muted mb-2">Instructor Notes</div>
                                    <form action={updateMappingNote}>
                                      <input type="hidden" name="mappingId" value={mapping.id} />
                                      <input type="hidden" name="courseId" value={course.id} />
                                      <textarea
                                        name="alignmentNote"
                                        defaultValue={mapping.alignmentNote ?? ''}
                                        className="form-control form-control-sm mb-3"
                                        rows={6}
                                        placeholder="Describe how you are using this SRCH content in your course..."
                                      />
                                      <div className="d-flex justify-content-end">
                                        <Button type="submit" size="sm" variant="outline-primary">
                                          Save Notes
                                        </Button>
                                      </div>
                                    </form>
                                  </div>
                                </Col>

                                <Col lg={5}>
                                  <Card className="surface-card border-0 h-100">
                                    <div className="surface-body">
                                      <span className="eyebrow mb-3">SRCH preview</span>
                                      <p className="text-muted mb-3">
                                        {mapping.srchContent.summary ?? 'No summary available.'}
                                      </p>
                                      <div className="small border-top pt-3 preview-scroll">
                                        <ReactMarkdown>{mapping.srchContent.body}</ReactMarkdown>
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
              <div className="empty-state">
                <h4 className="mb-2">No learning objectives yet</h4>
                <p className="text-muted mb-3">
                  Start by adding learning objectives for this course. You&apos;ll use them to map
                  SRCH content and build your curriculum path.
                </p>
                <Button href={`/courses/${course.id}/objectives/new`}>Add Your First Objective</Button>
              </div>
            )}
          </div>
        </Card>
      </Container>
    </main>
  );
};

export default CoursePage;
