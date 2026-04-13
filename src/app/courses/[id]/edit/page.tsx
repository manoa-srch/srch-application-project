import { notFound, redirect } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import CourseForm from '@/components/CourseForm';
import { updateCourse } from './actions';

type EditCoursePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const EditCoursePage = async ({ params }: EditCoursePageProps) => {
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
    <main style={{ paddingTop: '90px' }}>
      <Container className="py-4">
        <Row className="mb-4">
          <Col lg={8}>
            <h1 className="fw-bold">Edit Course</h1>
            <p className="text-muted mb-0">
              Update your course information and SRCH alignment details.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={8}>
            <Card className="shadow-sm">
              <div className="p-4">
                <CourseForm
                  action={updateCourse}
                  submitText="Save Changes"
                  cancelHref={`/courses/${course.id}`}
                  initialData={course}
                />
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
              <div className="p-4">
                <h5 className="mb-3">Editing Tips</h5>
                <ol className="mb-0">
                  <li className="mb-2">Update the course title and code if needed</li>
                  <li className="mb-2">Refine the course description</li>
                  <li className="mb-2">Adjust SRCH topic alignment</li>
                  <li>Save to return to the course page</li>
                </ol>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default EditCoursePage;