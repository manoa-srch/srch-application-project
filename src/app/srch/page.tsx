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

  const mappingQuery =
    courseId && objectiveId ? `?courseId=${courseId}&objectiveId=${objectiveId}` : '';

  return (
    <main style={{ paddingTop: '90px' }}>
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
            <div className="p-4">
              <h5 className="mb-2">Mapping Mode</h5>
              <p className="text-muted mb-0">
                Choose a SRCH topic, then select content to map to your current learning objective.
              </p>
            </div>
          </Card>
        )}

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
                      <Button
                        variant="primary"
                        href={`/srch/${encodeURIComponent(topicCard.topic)}${mappingQuery}`}
                      >
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
      </Container>
    </main>
  );
};

export default SRCHPage;