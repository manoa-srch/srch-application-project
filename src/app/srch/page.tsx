import { redirect } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

type SRCHPageProps = {
  searchParams?: Promise<{
    courseId?: string;
    objectiveId?: string;
    q?: string;
  }>;
};

const SRCHPage = async ({ searchParams }: SRCHPageProps) => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  const params = searchParams ? await searchParams : {};
  const courseId = params?.courseId?.trim() ?? '';
  const objectiveId = params?.objectiveId?.trim() ?? '';
  const q = params?.q?.trim() ?? '';

  const mappingQuery =
    courseId && objectiveId ? `courseId=${courseId}&objectiveId=${objectiveId}` : '';

  const contentHref = (contentId: number) => {
    const queryParts = [];

    if (courseId && objectiveId) {
      queryParts.push(`courseId=${courseId}`);
      queryParts.push(`objectiveId=${objectiveId}`);
    }

    const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';

    return `/srch/content/${contentId}${queryString}`;
  };

  const topicHref = (topic: string) => {
    const queryString = mappingQuery ? `?${mappingQuery}` : '';
    return `/srch/${encodeURIComponent(topic)}${queryString}`;
  };

  const searchResults = q
    ? await prisma.sRCHContent.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { summary: { contains: q } },
            { body: { contains: q } },
            { topic: { contains: q } },
          ],
        },
        orderBy: {
          title: 'asc',
        },
      })
    : [];

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

  const topicCards = await Promise.all(
    topics.map(async (topic) => {
      const count = await prisma.sRCHContent.count({
        where: { topic },
      });

      const sample = await prisma.sRCHContent.findFirst({
        where: { topic },
        orderBy: { updatedAt: 'desc' },
      });

      return {
        topic,
        count,
        sampleSummary: sample?.summary,
      };
    }),
  );

  return (
    <main>
      <Container className="py-4">
        <Row className="align-items-center mb-4">
          <Col lg={8}>
            <h1 className="fw-bold">SRCH Library</h1>
            <p className="text-muted mb-0">
              Browse SRCH topics as a library of teaching resources. Select a topic to view
              content that can be mapped to your course objectives.
            </p>
          </Col>
        </Row>

        {courseId && objectiveId && (
          <Card className="shadow-sm mb-4 border-primary">
            <div className="p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <h5 className="mb-2">Mapping Mode</h5>
                <p className="text-muted mb-0">
                  Search or browse SRCH content to map to your current learning objective.
                </p>
              </div>

              <Button
                variant="outline-secondary"
                href={`/courses/${courseId}`}
              >
                Done Mapping
              </Button>
            </div>
          </Card>
        )}

        <form method="GET" action="/srch" className="mb-4">
          {courseId && <input type="hidden" name="courseId" value={courseId} />}
          {objectiveId && <input type="hidden" name="objectiveId" value={objectiveId} />}

          <div className="d-flex gap-2">
            <input
              type="text"
              name="q"
              className="form-control"
              placeholder="Search SRCH content by title, topic, or keyword..."
              defaultValue={q}
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
            {q && (
              <Button
                variant="outline-secondary"
                href={mappingQuery ? `/srch?${mappingQuery}` : '/srch'}
              >
                Clear
              </Button>
            )}
          </div>
        </form>

        {q ? (
          <>
            <h4 className="mb-3">Search Results for “{q}”</h4>

            <Row className="g-4">
              {searchResults.length > 0 ? (
                searchResults.map((content) => (
                  <Col key={content.id} md={6} lg={4}>
                    <Card className="h-100 shadow-sm">
                      <div className="p-4 d-flex flex-column h-100">
                        <p className="text-muted small mb-2">
                          {content.topic ?? 'Uncategorized'}
                        </p>

                        <h5 className="fw-bold">{content.title}</h5>

                        <p>
                          {content.summary ??
                            `${content.body.slice(0, 140)}${
                              content.body.length > 140 ? '...' : ''
                            }`}
                        </p>

                        <div className="mt-auto">
                          <Button
                            size="sm"
                            variant="primary"
                            href={contentHref(content.id)}
                          >
                            View Content
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <Card className="shadow-sm">
                    <div className="p-4 text-center">
                      <h5 className="mb-2">No results found</h5>
                      <p className="text-muted mb-0">
                        Try a different search term or browse by topic.
                      </p>
                    </div>
                  </Card>
                </Col>
              )}
            </Row>
          </>
        ) : (
          <Row className="g-4">
            {topicCards.length > 0 ? (
              topicCards.map((topicCard) => (
                <Col key={topicCard.topic} md={6} lg={4}>
                  <Card className="h-100 shadow-sm">
                    <div className="p-4 d-flex flex-column h-100">
                      <h4 className="fw-bold mb-2">{topicCard.topic}</h4>

                      <p className="text-muted mb-3">
                        {topicCard.count} {topicCard.count === 1 ? 'resource' : 'resources'}
                      </p>

                      <p>
                        {topicCard.sampleSummary ??
                          'Explore SRCH resources connected to this topic.'}
                      </p>

                      <div className="mt-auto">
                        <Button variant="primary" href={topicHref(topicCard.topic)}>
                          Open Topic
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <Card className="shadow-sm">
                  <div className="p-4 text-center">
                    <h4 className="mb-3">No SRCH topics available yet</h4>
                    <p className="text-muted mb-0">
                      Add SRCH content to the database to start building the library.
                    </p>
                  </div>
                </Card>
              </Col>
            )}
          </Row>
        )}
      </Container>
    </main>
  );
};

export default SRCHPage;