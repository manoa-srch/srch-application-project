// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import CardText from 'react-bootstrap/CardText';
import CardTitle from 'react-bootstrap/CardTitle';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

/** The Home page. */
const Home = () => (
  <main>
    <Container fluid className="py-5 bg-light" id="landing-page">
      <Container>
        <Row className="align-items-center py-5">
          <Col md={7}>
            <h1 className="display-4 fw-bold">SRCH Curriculum Builder</h1>
            <p className="lead">
              A platform that helps instructors align course learning objectives
              with socially responsible computing content.
            </p>
            <p>
              Define learning objectives, browse SRCH topics, and organize
              curated content into a course-ready curriculum path.
            </p>
            {/* <div className="d-flex gap-3 mt-4">
              <p className="lead">
                Sign In or Create an Account to:
              </p>
              <Button variant="primary" size="lg">
                Create a Course
              </Button>
              <Button variant="outline-primary" size="lg">
                Browse SRCH Content
              </Button>
              </div> */}
          </Col>
          <Col md={5} className="mt-4 mt-md-0">
            <Card className="shadow-sm border-0">
              <CardBody>
                <h4 className="mb-3">How it works</h4>
                <ol className="mb-0">
                  <li className="mb-2">Create a course and define learning objectives</li>
                  <li className="mb-2">Match objectives to SRCH content</li>
                  <li>Organize selected topics into a curriculum path</li>
                </ol>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="py-5">
        <Row className="text-center mb-4">
          <Col>
            <h2>Core Features</h2>
            <p className="text-muted">
              Built to support instructors designing socially responsible computing courses.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <CardBody>
                <CardTitle>Define Objectives</CardTitle>
                <CardText>
                  Create course learning objectives and classify them using
                  Bloom’s Taxonomy.
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <CardBody>
                <CardTitle>Browse SRCH Content</CardTitle>
                <CardText>
                  Explore reusable content, topics, and materials that align
                  with your course goals.
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <CardBody>
                <CardTitle>Map and Organize</CardTitle>
                <CardText>
                  Connect learning objectives to SRCH content and organize them
                  into a structured curriculum path.
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  </main>
);

export default Home;