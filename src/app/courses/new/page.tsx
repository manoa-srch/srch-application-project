import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import NewCourseForm from './NewCourseForm';
import { createCourse } from './actions';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const NewCoursePage = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  return (
    <main>
      <Container className="py-4">
        <Row className="mb-4">
          <Col lg={8}>
            <h1 className="fw-bold">Create a New Course</h1>
            <p className="text-muted mb-0">
              Start by defining your course. After creating it, you’ll be able to add
              learning objectives and map SRCH content to them.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={8}>
            <Card className="shadow-sm">
              <div className="p-4">
                <NewCourseForm action={createCourse} />
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
              <div className="p-4">
                <h5 className="mb-3">What happens next?</h5>
                <ol className="mb-0">
                  <li className="mb-2">Create your course</li>
                  <li className="mb-2">Add learning objectives using Bloom’s Taxonomy</li>
                  <li className="mb-2">Browse SRCH topics</li>
                  <li>Map relevant content to your objectives</li>
                </ol>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default NewCoursePage;