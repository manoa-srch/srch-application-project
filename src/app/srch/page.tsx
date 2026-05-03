import { redirect } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';

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
    <main className="section-shell">
      <Container className="py-4 py-lg-5">
        <section className="hero-panel mb-4">
          <Row className="align-items-center g-4">
            <Col lg={7} className="hero-copy">
              <span className="eyebrow mb-3">SRCH resource library</span>
              <h1 className="mb-3">Browse teaching resources by topic, summary, and fit.</h1>
              <p className="mb-0">
                Search for SRCH content directly or move through topic collections when you are
                looking for materials to align with a specific learning objective.
              </p>
            </Col>
            <Col lg={5}>
              <PhotoPlaceholder
                src="/images/search%20the%20library.png"
                alt="Academic research materials and digital library browsing."
              />
            </Col>
          </Row>
        </section>

        {courseId && objectiveId && (
          <section className="section-card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <span className="eyebrow mb-3">Mapping mode</span>
                <h3 className="mb-2">Select SRCH content for your current objective</h3>
                <p className="text-muted mb-0">
                  Search or browse resources, then open one to map it back to the course.
                </p>
              </div>
              <Button variant="outline-secondary" href={`/courses/${courseId}`}>Done Mapping</Button>
            </div>
          </section>
        )}

        <form method="GET" action="/srch" className="search-panel mb-4">
          {courseId && <input type="hidden" name="courseId" value={courseId} />}
          {objectiveId && <input type="hidden" name="objectiveId" value={objectiveId} />}
          <Row className="g-3 align-items-center">
            <Col lg={8}>
              <input
                type="text"
                name="q"
                className="form-control"
                placeholder="Search SRCH content by title, topic, or keyword..."
                defaultValue={q}
              />
            </Col>
            <Col lg="auto">
              <Button type="submit">Search</Button>
            </Col>
            {q && (
              <Col lg="auto">
                <Button variant="outline-secondary" href={mappingQuery ? `/srch?${mappingQuery}` : '/srch'}>
                  Clear
                </Button>
              </Col>
            )}
          </Row>
        </form>

        {q ? (
          <>
            <div className="mb-3">
              <h2 className="mb-1">Search results for &quot;{q}&quot;</h2>
              <div className="results-count">{searchResults.length} matches found</div>
            </div>

            <Row className="g-4">
              {searchResults.length > 0 ? (
                searchResults.map((content) => (
                  <Col key={content.id} md={6} xl={4}>
                    <Card className="surface-card border-0">
                      <div className="surface-body d-flex flex-column h-100">
                        <span className="eyebrow mb-3">{content.topic ?? 'Uncategorized'}</span>
                        <h4 className="mb-2">{content.title}</h4>
                        <p className="text-muted mb-4">
                          {content.summary ??
                            `${content.body.slice(0, 160)}${content.body.length > 160 ? '...' : ''}`}
                        </p>
                        <div className="mt-auto">
                          <Button size="sm" href={contentHref(content.id)}>View Content</Button>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <Card className="surface-card border-0">
                    <div className="empty-state">
                      <h4 className="mb-2">No results found</h4>
                      <p className="text-muted mb-0">Try a different search term or browse by topic below.</p>
                    </div>
                  </Card>
                </Col>
              )}
            </Row>
          </>
        ) : (
          <>
            <div className="mb-3">
              <h2 className="mb-1">Browse by topic</h2>
              <div className="results-count">{topicCards.length} topic collections available</div>
            </div>

            <Row className="g-4">
              {topicCards.length > 0 ? (
                topicCards.map((topicCard) => (
                  <Col key={topicCard.topic} md={6} xl={4}>
                    <Card className="surface-card border-0">
                      <div className="surface-body d-flex flex-column h-100">
                        <h4 className="mb-2">{topicCard.topic}</h4>
                        <p className="text-muted mb-3">
                          {topicCard.count} {topicCard.count === 1 ? 'resource' : 'resources'}
                        </p>
                        <p className="text-muted mb-4">
                          {topicCard.sampleSummary ?? 'Explore SRCH resources connected to this topic.'}
                        </p>
                        <div className="mt-auto">
                          <Button href={topicHref(topicCard.topic)}>Open Topic</Button>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <Card className="surface-card border-0">
                    <div className="empty-state">
                      <h4 className="mb-3">No SRCH topics available yet</h4>
                      <p className="text-muted mb-0">
                        Add SRCH content to the database to start building the library.
                      </p>
                    </div>
                  </Card>
                </Col>
              )}
            </Row>
          </>
        )}
      </Container>
    </main>
  );
};

export default SRCHPage;
