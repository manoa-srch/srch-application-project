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
};

const NewObjectivePage = async ({ params }: NewObjectivePageProps) => {
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

  return (
    <main>
      <Container className="py-4">
        <Row className="mb-4">
          <Col lg={8}>
            <h1 className="fw-bold">Add Learning Objective</h1>
            <p className="text-muted mb-0">
              Add a new learning objective for <strong>{course.title}</strong>.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={8}>
            <Card className="shadow-sm">
              <div className="p-4">
                <ObjectiveForm
                  action={createObjective}
                  submitText="Create Objective"
                  cancelHref={`/courses/${course.id}`}
                  initialData={{ courseId: course.id }}
                />
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
              <div className="p-4">
                <h5 className="mb-3">Objective Tips</h5>
                <ol className="mb-0">
                  <li className="mb-2">Write measurable learning outcomes</li>
                  <li className="mb-2">Choose the Bloom level that best matches the goal</li>
                  <li className="mb-2">Use position to control ordering</li>
                  <li>Map SRCH content after creating the objective</li>
                </ol>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default NewObjectivePage;