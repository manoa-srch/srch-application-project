import { notFound, redirect } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ObjectiveForm from '@/components/ObjectiveForm';
import { createObjective } from './actions';

type NewObjectivePageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    templateObjectiveId?: string;
  }>;
};

const NewObjectivePage = async ({ params, searchParams }: NewObjectivePageProps) => {
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
  });

  if (!course) {
    notFound();
  }

  if (course.ownerId !== user.id) {
    redirect('/profile');
  }

  const queryParams = searchParams ? await searchParams : {};
  const templateObjectiveIdValue = queryParams?.templateObjectiveId?.trim() ?? '';
  const templateObjectiveId = templateObjectiveIdValue
    ? parseInt(templateObjectiveIdValue, 10)
    : null;

  const templateObjective =
    templateObjectiveId && !Number.isNaN(templateObjectiveId)
      ? await prisma.learningObjective.findUnique({
          where: { id: templateObjectiveId },
          include: {
            mappings: {
              where: {
                isSelected: true,
              },
            },
          },
        })
      : null;

  return (
    <main>
      <Container className="py-4">
        <Row className="mb-4">
          <Col lg={8}>
            <h1 className="fw-bold">
              {templateObjective ? 'Use Learning Objective' : 'Add Learning Objective'}
            </h1>
            <p className="text-muted mb-0">
              {templateObjective ? (
                <>
                  Review and customize this objective before adding it to{' '}
                  <strong>{course.title}</strong>.
                </>
              ) : (
                <>
                  Add a new learning objective for <strong>{course.title}</strong>.
                </>
              )}
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={8}>
            <Card className="shadow-sm">
              <div className="p-4">
                <ObjectiveForm
                  action={createObjective}
                  submitText={templateObjective ? 'Create From Template' : 'Create Objective'}
                  cancelHref={`/courses/${course.id}`}
                  initialData={{
                    courseId: course.id,
                    description: templateObjective?.description ?? '',
                    bloomLevel: templateObjective?.bloomLevel ?? '',
                    position: templateObjective?.position ?? null,
                    templateObjectiveId: templateObjective?.id ?? null,
                  }}
                />
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
              <div className="p-4">
                <h5 className="mb-3">
                  {templateObjective ? 'Template Info' : 'Objective Tips'}
                </h5>

                {templateObjective ? (
                  <>
                    <p className="text-muted">
                      This objective is being used as a starting point. You can edit the
                      description, Bloom level, and position before saving.
                    </p>
                    <p className="mb-0">
                      <strong>Mapped SRCH content copied:</strong>{' '}
                      {templateObjective.mappings.length}
                    </p>
                  </>
                ) : (
                  <ol className="mb-0">
                    <li className="mb-2">Write measurable learning outcomes</li>
                    <li className="mb-2">Choose the Bloom level that best matches the goal</li>
                    <li className="mb-2">Use position to control ordering</li>
                    <li>Map SRCH content after creating the objective</li>
                  </ol>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default NewObjectivePage;