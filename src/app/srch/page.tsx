import { redirect } from 'next/navigation';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { mapContentToObjective } from './actions';

type SRCHPageProps = {
  searchParams?: Promise<{
    topic?: string;
    q?: string;
    courseId?: string;
    objectiveId?: string;
  }>;
};

const SRCHPage = async ({ searchParams }: SRCHPageProps) => {
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

  const params = searchParams ? await searchParams : {};
  const selectedTopic = params?.topic?.trim() ?? '';
  const query = params?.q?.trim() ?? '';
  const courseId = params?.courseId?.trim() ?? '';
  const objectiveId = params?.objectiveId?.trim() ?? '';

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
      AND: [
        selectedTopic ? { topic: selectedTopic } : {},
        query
          ? {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { summary: { contains: query, mode: 'insensitive' } },
                { body: { contains: query, mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const topicsResult = await prisma.sRCHContent.findMany({
    select: {
      topic: true,
    },
    distinct: ['topic'],
    orderBy: {
      topic: 'asc',
    },
  });

  const topics = topicsResult
    .map((item) => item.topic)
    .filter((topic): topic is string => Boolean(topic));

  return (
    <main style={{ paddingTop: '90px' }}>
      <Container className="py-4">
        <Row className="align-items-center mb-4">
          <Col lg={8}>
            <h1 className="fw-bold">SRCH Browser</h1>
            <p className="text-muted mb-0">
              Browse SRCH content by topic and explore resources to map to your course objectives.
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

        <Card className="shadow-sm mb-4">
          <div className="p-4">
            <form method="GET">
              {courseId && <input type="hidden" name="courseId" value={courseId} />}
              {objectiveId && <input type="hidden" name="objectiveId" value={objectiveId} />}

              <Row className="g-3 align-items-end">
                <Col md={5}>
                  <div>
                    <label htmlFor="q" className="form-label">
                      Search
                    </label>
                    <input
                      id="q"
                      type="text"
                      name="q"
                      className="form-control"
                      placeholder="Search titles, summaries, or content"
                      defaultValue={query}
                    />
                  </div>
                </Col>

                <Col md={4}>
                  <div>
                    <label htmlFor="topic" className="form-label">
                      Topic
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      className="form-select"
                      defaultValue={selectedTopic}
                    >
                      <option value="">All topics</option>
                      {topics.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="d-flex gap-2">
                    <Button type="submit" variant="primary">
                      Apply
                    </Button>
                    <Button
                      href={
                        selectedObjective
                          ? `/srch?courseId=${courseId}&objectiveId=${objectiveId}`
                          : '/srch'
                      }
                      variant="outline-secondary"
                    >
                      Reset
                    </Button>
                  </div>
                </Col>
              </Row>
            </form>
          </div>
        </Card>

        <Row className="mb-3">
          <Col>
            <p className="text-muted mb-0">
              Showing {contents.length} {contents.length === 1 ? 'resource' : 'resources'}
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {contents.length > 0 ? (
            contents.map((content) => (
              <Col key={content.id} md={6} lg={4}>
                <Card className="h-100 shadow-sm">
                  <div className="p-3 d-flex flex-column h-100">
                    <div className="mb-2">
                      <Badge bg="secondary">
                        {content.topic ?? 'Uncategorized'}
                      </Badge>
                    </div>

                    <h5>{content.title}</h5>

                    <p className="text-muted mb-2">
                      Updated {new Date(content.updatedAt).toLocaleDateString('en-US')}
                    </p>

                    <p>
                      {content.summary ??
                        `${content.body.slice(0, 140)}${content.body.length > 140 ? '...' : ''}`}
                    </p>

                    <div className="d-flex gap-2 mt-auto flex-wrap">
                      <Button size="sm" variant="primary">
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
                          <input
                            type="hidden"
                            name="contentId"
                            value={content.id}
                          />
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
            ))
          ) : (
            <Col>
              <Card className="shadow-sm">
                <div className="p-4 text-center">
                  <h4 className="mb-3">No SRCH content found</h4>
                  <p className="text-muted mb-0">
                    Try adjusting your search or topic filter to find matching content.
                  </p>
                </div>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </main>
  );
};

export default SRCHPage;