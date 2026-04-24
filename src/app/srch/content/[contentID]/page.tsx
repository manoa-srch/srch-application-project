import { notFound, redirect } from 'next/navigation';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { mapContentToObjective } from '../../actions';

type SRCHContentPageProps = {
  params: Promise<{
    contentId: string;
  }>;
  searchParams?: Promise<{
    courseId?: string;
    objectiveId?: string;
  }>;
};

const SRCHContentPage = async ({ params, searchParams }: SRCHContentPageProps) => {
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

  const { contentId } = await params;
  const parsedContentId = parseInt(contentId, 10);

  if (Number.isNaN(parsedContentId)) {
    notFound();
  }

  const queryParams = searchParams ? await searchParams : {};
  const courseId = queryParams?.courseId?.trim() ?? '';
  const objectiveId = queryParams?.objectiveId?.trim() ?? '';

  const parsedCourseId = courseId ? parseInt(courseId, 10) : null;
  const parsedObjectiveId = objectiveId ? parseInt(objectiveId, 10) : null;

  let selectedObjective: {
    id: number;
    description: string;
    courseId: number;
    course: { id: number; title: string; ownerId: number };
  } | null = null;

  if (parsedCourseId && parsedObjectiveId) {
    const objective = await prisma.learningObjective.findUnique({
      where: { id: parsedObjectiveId },
      include: {
        course: true,
      },
    });

    if (
      objective &&
      objective.courseId === parsedCourseId &&
      objective.course.ownerId === user.id
    ) {
      selectedObjective = objective;
    }
  }

  const content = await prisma.sRCHContent.findUnique({
    where: {
      id: parsedContentId,
    },
    include: {
      mappings: {
        where: {
          isSelected: true,
        },
        include: {
          learningObjective: {
            include: {
              course: {
                include: {
                  owner: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!content) {
    notFound();
  }

  const topicHref = content.topic
    ? `/srch/${encodeURIComponent(content.topic)}${
        courseId && objectiveId ? `?courseId=${courseId}&objectiveId=${objectiveId}` : ''
      }`
    : '/srch';

  return (
    <main style={{ paddingTop: '90px' }}>
      <Container className="py-4">
        <Row className="align-items-start mb-4">
          <Col lg={8}>
            <Button
              variant="outline-secondary"
              size="sm"
              href={topicHref}
              className="mb-3"
            >
              ← Back to Topic
            </Button>

            <div className="mb-2">
              <Badge bg="secondary">{content.topic ?? 'Uncategorized'}</Badge>
            </div>

            <h1 className="fw-bold mb-2">{content.title}</h1>

            <p className="text-muted mb-0">
              Updated {new Date(content.updatedAt).toLocaleDateString('en-US')}
            </p>
          </Col>

          <Col lg={4} className="text-lg-end mt-3 mt-lg-0">
            {selectedObjective ? (
              <form action={mapContentToObjective}>
                <input type="hidden" name="courseId" value={selectedObjective.courseId} />
                <input type="hidden" name="objectiveId" value={selectedObjective.id} />
                <input type="hidden" name="contentId" value={content.id} />

                <Button type="submit" variant="primary">
                  Map to This Objective
                </Button>
              </form>
            ) : (
              <Button variant="outline-primary" href="/courses">
                Select an Objective First
              </Button>
            )}
          </Col>
        </Row>

        {selectedObjective && (
          <Card className="shadow-sm mb-4 border-primary">
            <div className="p-4">
              <h5 className="mb-2">Mapping for Objective</h5>
              <p className="mb-1">
                <strong>Course:</strong> {selectedObjective.course.title}
              </p>
              <p className="mb-0">
                <strong>Objective:</strong> {selectedObjective.description}
              </p>
            </div>
          </Card>
        )}

        <Row className="g-4">
          <Col lg={8}>
            <Card className="shadow-sm">
              <div className="p-4">
                <h4 className="mb-3">Content Summary</h4>
                <p>{content.summary ?? 'No summary has been added yet.'}</p>

                <hr />

                <h4 className="mb-3">Full Content</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{content.body}</p>
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
              <div className="p-4">
                <h5 className="mb-3">Used in Courses</h5>

                {content.mappings.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {content.mappings.map((mapping) => (
                      <div key={mapping.id} className="border rounded p-3 bg-light">
                        <div className="fw-semibold mb-1">
                          {mapping.learningObjective.description}
                        </div>

                        <div className="small text-muted">
                          Course: {mapping.learningObjective.course.title}
                        </div>

                        <div className="small text-muted mb-2">
                          Author:{' '}
                          {mapping.learningObjective.course.owner.name ??
                            mapping.learningObjective.course.owner.email}
                        </div>

                        {mapping.alignmentNote && (
                          <div className="small mb-2">
                            <strong>Instructor Notes:</strong> {mapping.alignmentNote}
                          </div>
                        )}

                        <Button
                          size="sm"
                          variant="outline-secondary"
                          href={`/courses/${mapping.learningObjective.course.id}`}
                        >
                          View Course
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted mb-0">
                    This SRCH content has not been mapped to any course objectives yet.
                  </p>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SRCHContentPage;