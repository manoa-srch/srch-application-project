import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const CurriculumPage = () => (
  <main>
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Curriculum Path</h1>
          <p className="text-muted mb-0">
            Organize selected SRCH content into a course-ready sequence.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <CardBody>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h2 className="h4 mb-1">Module 1: What Is Privacy?</h2>
                  <p className="text-muted mb-0">
                    An introductory unit on privacy, personal information, and why context matters in computing.
                  </p>
                </div>
                <Badge bg="secondary">Privacy</Badge>
              </div>

              <p>
                This module introduces students to privacy as more than just secrecy. It encourages them to think
                about personal data, information sharing, and how privacy expectations can change depending on the
                social or technical context.
              </p>

              <div className="mb-3">
                <Badge bg="light" text="dark" className="me-2">Understand</Badge>
                <Badge bg="light" text="dark" className="me-2">Analyze</Badge>
                <Badge bg="light" text="dark">Ethics</Badge>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-sm">
            <CardBody>
              <h3 className="h5 mb-3">Curriculum Sequence</h3>

              <div className="border rounded p-3 mb-3">
                <h4 className="h6 mb-1">1. Introductory Reading</h4>
                <p className="mb-2 text-muted">
                  Students begin with a short reading introducing key ideas of privacy in computing.
                </p>
                <div className="d-flex gap-2">
                  <Button size="sm" variant="outline-primary">View Content</Button>
                  <Button size="sm" variant="primary">Edit Placement</Button>
                </div>
              </div>

              <div className="border rounded p-3 mb-3">
                <h4 className="h6 mb-1">2. Guided Discussion</h4>
                <p className="mb-2 text-muted">
                  Students discuss what kinds of information feel private and why those expectations vary by context.
                </p>
                <div className="d-flex gap-2">
                  <Button size="sm" variant="outline-primary">View Discussion</Button>
                  <Button size="sm" variant="primary">Edit Placement</Button>
                </div>
              </div>

              <div className="border rounded p-3 mb-3">
                <h4 className="h6 mb-1">3. Case Study</h4>
                <p className="mb-2 text-muted">
                  A simple real-world example helps students connect privacy concepts to computing systems.
                </p>
                <div className="d-flex gap-2">
                  <Button size="sm" variant="outline-primary">View Case Study</Button>
                  <Button size="sm" variant="primary">Edit Placement</Button>
                </div>
              </div>

              <div className="border rounded p-3">
                <h4 className="h6 mb-1">4. Reflection Activity</h4>
                <p className="mb-2 text-muted">
                  Students reflect on how privacy concerns should influence software design decisions.
                </p>
                <div className="d-flex gap-2">
                  <Button size="sm" variant="outline-primary">View Activity</Button>
                  <Button size="sm" variant="primary">Edit Placement</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <CardBody>
              <h3 className="h5 mb-3">Mapped Learning Objectives</h3>
              <ul className="mb-0">
                <li className="mb-2">
                  Explain what privacy means in a computing context.
                </li>
                <li className="mb-2">
                  Compare different expectations of privacy across situations.
                </li>
                <li>
                  Analyze how software systems can affect user privacy.
                </li>
              </ul>
            </CardBody>
          </Card>

          <Card className="shadow-sm">
            <CardBody>
              <h3 className="h5 mb-3">Instructor Notes</h3>
              <p className="text-muted mb-3">
                This module works well as an early unit in a socially responsible computing course.
              </p>
              <p className="mb-0">
                Suggested follow-up topics: data collection, consent, surveillance, and privacy in app design.
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </main>
);

export default CurriculumPage;