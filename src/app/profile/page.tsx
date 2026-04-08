import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const ProfilePage = () => (
  <main style={{ paddingTop: '90px' }}>
    <Container className="py-4">

      {/* Profile Header */}
      <Row className="mb-4">
        <Col md={8}>
          <h1 className="fw-bold">Profile</h1>
          <p className="text-muted mb-0">
            Manage your courses and contributions to the SRCH platform.
          </p>
        </Col>
      </Row>

      {/* User Info */}
      <Card className="shadow-sm mb-4">
        <div className="p-3">
          <Row className="align-items-center">
            <Col md={8}>
              <h4 className="mb-1">Jaimes Mexia-Santiago</h4>
              <p className="text-muted mb-1">jms@hawaii.edu</p>
              <Badge bg="secondary">Instructor</Badge>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button variant="outline-primary" size="sm">
                Edit Profile
              </Button>
            </Col>
          </Row>
        </div>
      </Card>

      {/* Courses Created */}
      <Row className="mb-4">
        <Col>
          <h3>Your Courses</h3>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <div className="p-3">
              <h5>ICS 314: Software Engineering</h5>
              <p className="text-muted mb-2">ICS 314</p>
              <p>
                Focuses on software design, teamwork, and responsible computing practices.
              </p>
              <p className="mb-2"><strong>Objectives:</strong> 4</p>
              <div className="d-flex gap-2">
                <Button size="sm" variant="primary" href="/courses/1">
                  Open
                </Button>
                <Button size="sm" variant="outline-secondary">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <div className="p-3">
              <h5>Intro to Computing Ethics</h5>
              <p className="text-muted mb-2">ICS 190</p>
              <p>
                Covers privacy, accessibility, and ethical design in computing systems.
              </p>
              <p className="mb-2"><strong>Objectives:</strong> 3</p>
              <div className="d-flex gap-2">
                <Button size="sm" variant="primary">
                  Open
                </Button>
                <Button size="sm" variant="outline-secondary">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Contributed Content */}
      <Row className="mb-3">
        <Col>
          <h3>Your Contributions</h3>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <div className="p-3">
              <h5>Privacy in Mobile Applications</h5>
              <p className="text-muted mb-2">Topic: Privacy</p>
              <p>
                A discussion on how mobile apps collect and manage user data and how privacy can be preserved.
              </p>
              <div className="d-flex gap-2">
                <Button size="sm" variant="outline-primary">
                  View
                </Button>
                <Button size="sm" variant="outline-secondary">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <div className="p-3">
              <h5>Bias in Machine Learning Systems</h5>
              <p className="text-muted mb-2">Topic: Bias</p>
              <p>
                Explains how bias appears in datasets and how it impacts automated decision-making.
              </p>
              <div className="d-flex gap-2">
                <Button size="sm" variant="outline-primary">
                  View
                </Button>
                <Button size="sm" variant="outline-secondary">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

    </Container>
  </main>
);

export default ProfilePage;