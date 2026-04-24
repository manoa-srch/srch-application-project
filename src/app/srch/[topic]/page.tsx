import { notFound, redirect } from 'next/navigation';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { mapContentToObjective } from '../actions';

type SRCHTopicPageProps = {
  params: Promise<{
    topic: string;
  }>;
  searchParams?: Promise<{
    courseId?: string;
    objectiveId?: string;
  }>;
};

const SRCHTopicPage = async ({ params, searchParams }: SRCHTopicPageProps) => {
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

  const { topic } = await params;
  const decodedTopic = decodeURIComponent(topic).trim();

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

  const contents = await prisma.sRCHContent.findMany({
    where: {
      topic: decodedTopic,
    },
    orderBy: {
      title: 'asc',
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

  if (contents.length === 0) {
    notFound();
  }

  const mappingQuery =
    courseId && objectiveId ? `?courseId=${courseId}&objectiveId=${objectiveId}` : '';

  return (
    <main>
      <Container className="py-4">
        <Row className="align-items-start mb-4">
          <Col lg={8}>
            <Button
              variant="outline-secondary"
              size="sm"
              href={`/srch${mappingQuery}`}
              className="mb-3"
            >
              ← Back to SRCH Library
            </Button>

            <h1 className="fw-bold mb-2">{decodedTopic}</h1>
            <p className="text-muted mb-0">
              Browse SRCH resources in this topic and map relevant content to your course objectives.
            </p>
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

        <Row className="mb-3">
          <Col>
            <p className="text-muted mb-0">
              Showing {contents.length} {contents.length === 1 ? 'resource' : 'resources'}
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {contents.map((content) => (
            <Col key={content.id} md={6} lg={4}>
              <Card className="h-100 shadow-sm">
                <div className="p-3 d-flex flex-column h-100">
                  <div className="mb-2">
                    <Badge bg="secondary">{content.topic ?? 'Uncategorized'}</Badge>
                  </div>

                  <h5>{content.title}</h5>

                  <p className="text-muted mb-2">
                    Updated {new Date(content.updatedAt).toLocaleDateString('en-US')}
                  </p>

                  <p>
                    {content.summary ??
                      `${content.body.slice(0, 140)}${content.body.length > 140 ? '...' : ''}`}
                  </p>

                  <div className="mt-3">
                    <Badge bg="light" text="dark">
                      {content.mappings.length} mapped
                    </Badge>
                  </div>

                  <div className="d-flex gap-2 mt-3 flex-wrap">
                    <Button
                      size="sm"
                      variant="primary"
                      href={`/srch/content/${content.id}${
                        courseId && objectiveId ? `?courseId=${courseId}&objectiveId=${objectiveId}` : ''
                      }`}
                    >
                      View Content
                    </Button>

                    {selectedObjective ? (
                      <form action={mapContentToObjective}>
                        <input
                          type="hidden"
                          name="courseId"
                          value={selectedObjective.courseId}
                        />
                        <input
                          type="hidden"
                          name="objectiveId"
                          value={selectedObjective.id}
                        />
                        <input type="hidden" name="contentId" value={content.id} />

                        <Button type="submit" size="sm" variant="outline-primary">
                          Map to This Objective
                        </Button>
                      </form>
                    ) : (
                      <Button size="sm" variant="outline-primary" disabled>
                        Select an Objective First
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default SRCHTopicPage;