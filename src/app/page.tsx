import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import CardText from 'react-bootstrap/CardText';
import CardTitle from 'react-bootstrap/CardTitle';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';

const Home = () => (
  <main className="section-shell">
    <Container className="py-4 py-lg-5">
      <section className="hero-panel mb-5">
        <Row className="align-items-center g-4">
          <Col lg={7} className="hero-copy">
            <span className="eyebrow mb-3">Curriculum design platform</span>
            <h1 className="mb-3 text-balance">Build computing courses with socially responsible content.</h1>
            <p className="mb-4">
              SRCH Curriculum Builder helps instructors create learning objectives,
              browse SRCH resources, and organize them into a course plan.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Button href="/auth/signin" size="lg">Sign In</Button>
              <Button href="/auth/signup" size="lg" variant="outline-primary">Create Account</Button>
            </div>
            <div className="hero-stat-grid">
              <div className="hero-stat">
                <strong>3-step</strong>
                <span>planning flow from objectives to mapped content</span>
              </div>
              <div className="hero-stat">
                <strong>SRCH</strong>
                <span>resource library organized by topic</span>
              </div>
              <div className="hero-stat">
                <strong>Instructor</strong>
                <span>notes and mapping tools in one place</span>
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <PhotoPlaceholder
              src="/images/hero%20image.jpg"
              alt="Instructors collaborating around course planning materials."
              className="mb-4"
            />
            <Card className="surface-card border-0">
              <CardBody className="surface-body">
                <h4 className="mb-3">How it works</h4>
                <ol className="mb-0 ps-3">
                  <li className="mb-2">Create a course and define learning objectives</li>
                  <li className="mb-2">Match objectives to SRCH content</li>
                  <li>Organize selected topics into a curriculum path</li>
                </ol>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="mb-5">
        <Row className="align-items-end mb-4 g-3">
          <Col lg={7}>
            <span className="eyebrow mb-3">Key Features</span>
            <h2 className="mb-2">Key Features</h2>
            <p className="text-muted mb-0">
              The platform is built around course objectives, SRCH browsing, and curriculum mapping.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={4}>
            <Card className="feature-card">
              <PhotoPlaceholder
                src="/images/design%20objectives.jpeg"
                alt="Instructor developing course objectives and workshop notes."
              />
              <CardBody>
                <CardTitle>Design Objectives</CardTitle>
                <CardText>
                  Create course objectives and assign Bloom&apos;s levels before mapping content.
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card">
              <PhotoPlaceholder
                src="/images/search%20the%20library.png"
                alt="Research library materials and digital browsing workspace."
              />
              <CardBody>
                <CardTitle>Search the Library</CardTitle>
                <CardText>
                  Browse SRCH topics, summaries, and resource previews.
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card">
              <PhotoPlaceholder
                src="/images/map%20with%20intent.png"
                alt="Curriculum mapping view connecting objectives, topics, and modules."
              />
              <CardBody>
                <CardTitle>Map with Intent</CardTitle>
                <CardText>
                  Connect objectives to SRCH content and organize it into a curriculum path.
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </section>

    </Container>
  </main>
);

export default Home;
