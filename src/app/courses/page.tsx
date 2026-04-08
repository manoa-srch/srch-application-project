import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const CoursesPage = () => (
  <main style={{ paddingTop: '90px' }}>
    <Container className="py-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h1 className="fw-bold">My Courses</h1>
          <p className="text-muted mb-0">
            Create courses, define learning objectives, and build curriculum paths using SRCH content.
          </p>
        </Col>
        <Col xs="auto">
          <Button variant="primary">+ New Course</Button>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="mb-0">ICS 314: Software Engineering</h5>
                <Badge bg="secondary">Active</Badge>
              </div>
              <p className="text-muted mb-2">ICS 314</p>
              <p>
                Introduces students to software engineering principles, teamwork,
                and socially responsible design practices.
              </p>
              <p className="mb-2"><strong>Objectives:</strong> 4</p>
              <p className="mb-3"><strong>Mapped SRCH Topics:</strong> 6</p>
              <div className="d-flex gap-2 flex-wrap">
                <Button size="sm" variant="primary" href="/courses/1">
                  Open Course
                </Button>
                <Button size="sm" variant="outline-secondary">
                  Edit
                </Button>
                <Button size="sm" variant="outline-primary" href="/curriculum">
                  View Curriculum
                </Button>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="mb-0">Intro to Computing Ethics</h5>
                <Badge bg="secondary">Draft</Badge>
              </div>
              <p className="text-muted mb-2">ICS 190</p>
              <p>
                A course focused on ethics, privacy, accessibility, and fairness
                in modern computing systems.
              </p>
              <p className="mb-2"><strong>Objectives:</strong> 3</p>
              <p className="mb-3"><strong>Mapped SRCH Topics:</strong> 4</p>
              <div className="d-flex gap-2 flex-wrap">
                <Button size="sm" variant="primary">
                  Open Course
                </Button>
                <Button size="sm" variant="outline-secondary">
                  Edit
                </Button>
                <Button size="sm" variant="outline-primary">
                  View Curriculum
                </Button>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm border border-2">
            <div className="p-3 d-flex flex-column justify-content-center h-100">
              <h5>Create a New Course</h5>
              <p className="text-muted">
                Start a new course and define its learning objectives before mapping SRCH content.
              </p>
              <Button variant="outline-primary">+ Add Course</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  </main>
);

export default CoursesPage;