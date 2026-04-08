import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const SRCHPage = () => (
  <main style={{ paddingTop: '90px' }}>
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">SRCH Browser</h1>
          <p className="text-muted mb-0">
            Explore socially responsible computing topics and map them to your course learning objectives.
          </p>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search SRCH topics, discussions, or keywords..."
          />
        </Col>
        <Col md={3}>
          <Form.Select>
            <option>All Topics</option>
            <option>AI Ethics</option>
            <option>Privacy</option>
            <option>Accessibility</option>
            <option>Bias and Fairness</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select>
            <option>All Bloom Levels</option>
            <option>Remember</option>
            <option>Understand</option>
            <option>Apply</option>
            <option>Analyze</option>
            <option>Evaluate</option>
            <option>Create</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <CardBody>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="mb-0">Algorithmic Bias in Hiring Systems</h5>
                <Badge bg="secondary">Bias</Badge>
              </div>
              <p>
                Explore how automated hiring tools can reflect and amplify
                historical bias in datasets and decision-making.
              </p>
              <div className="mb-3">
                <Badge bg="light" text="dark" className="me-2">Analyze</Badge>
                <Badge bg="light" text="dark">Ethics</Badge>
              </div>
              <div className="d-flex gap-2">
                <Button variant="outline-primary" size="sm">View</Button>
                <Button variant="primary" size="sm">Map to Objective</Button>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <CardBody>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="mb-0">Privacy in Mobile App Design</h5>
                <Badge bg="secondary">Privacy</Badge>
              </div>
              <p>
                A discussion of how mobile apps collect, use, and share user
                data, and how privacy can be addressed in design.
              </p>
              <div className="mb-3">
                <Badge bg="light" text="dark" className="me-2">Apply</Badge>
                <Badge bg="light" text="dark">Design</Badge>
              </div>
              <div className="d-flex gap-2">
                <Button variant="outline-primary" size="sm">View</Button>
                <Button variant="primary" size="sm">Map to Objective</Button>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <CardBody>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="mb-0">Accessible Web Interfaces</h5>
                <Badge bg="secondary">Accessibility</Badge>
              </div>
              <p>
                Learn how inclusive design practices improve usability and ensure
                that computing systems are accessible to all users.
              </p>
              <div className="mb-3">
                <Badge bg="light" text="dark" className="me-2">Create</Badge>
                <Badge bg="light" text="dark">UI/UX</Badge>
              </div>
              <div className="d-flex gap-2">
                <Button variant="outline-primary" size="sm">View</Button>
                <Button variant="primary" size="sm">Map to Objective</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </main>
);

export default SRCHPage;