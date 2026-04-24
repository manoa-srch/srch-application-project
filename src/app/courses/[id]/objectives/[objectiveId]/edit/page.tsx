import { notFound, redirect } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ObjectiveForm from '@/components/ObjectiveForm';
import { updateObjective } from './actions';
import { deleteObjective } from '../actions';

type EditObjectivePageProps = {
  params: Promise<{
    id: string;
    objectiveId: string;
  }>;
};

const EditObjectivePage = async ({ params }: EditObjectivePageProps) => {
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

  const { id, objectiveId } = await params;
  const courseId = parseInt(id, 10);
  const parsedObjectiveId = parseInt(objectiveId, 10);

  if (Number.isNaN(courseId) || Number.isNaN(parsedObjectiveId)) {
    notFound();
  }

  const objective = await prisma.learningObjective.findUnique({
    where: { id: parsedObjectiveId },
    include: {
      course: true,
    },
  });

  if (!objective) {
    notFound();
  }

  if (objective.courseId !== courseId) {
    notFound();
  }

  if (objective.course.ownerId !== user.id) {
    redirect('/profile');
  }

  return (
    <main>
      <Container className="py-4">
        <Row className="mb-4">
          <Col lg={8}>
            <h1 className="fw-bold">Edit Learning Objective</h1>
            <p className="text-muted mb-0">
              Update this learning objective for <strong>{objective.course.title}</strong>.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={8}>
            <Card className="shadow-sm">
              <div className="p-4">
                <ObjectiveForm
                  action={updateObjective}
                  submitText="Save Changes"
                  cancelHref={`/courses/${courseId}`}
                  initialData={{
                    id: objective.id,
                    courseId: objective.courseId,
                    description: objective.description,
                    bloomLevel: objective.bloomLevel,
                    position: objective.position,
                  }}
                />
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
                <div className="p-4">
                    <h5 className="mb-3">Editing Tips</h5>
                    <ol className="mb-4">
                    <li className="mb-2">Keep the outcome clear and measurable</li>
                    <li className="mb-2">Match the Bloom level to the action being assessed</li>
                    <li className="mb-2">Use position to keep objectives organized</li>
                    <li>Save changes to return to the course page</li>
                    </ol>

                    <hr />

                    <h6 className="mb-2 text-danger">Danger Zone</h6>
                    <p className="text-muted">
                    Delete this objective if it is no longer needed.
                    </p>

                    <form action={deleteObjective}>
                    <input type="hidden" name="id" value={objective.id} />
                    <input type="hidden" name="courseId" value={objective.courseId} />
                    <button type="submit" className="btn btn-outline-danger btn-sm">
                        Delete Objective
                    </button>
                    </form>
                </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default EditObjectivePage;