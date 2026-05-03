import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => (
  <footer className="footer-shell">
    <Container>
      <div className="footer-panel p-4 p-lg-5">
        <Row className="g-4 align-items-start">
          <Col lg={8}>
            <h3 className="mb-2 text-white">SRCH Curriculum Builder</h3>
            <p className="mb-0 footer-meta">
              A planning workspace for designing courses around socially responsible
              computing topics, learning objectives, and mapped teaching resources.
            </p>
          </Col>
          <Col md={6} lg={4}>
            <div className="footer-meta">
              Department of Information and Computer Sciences
              <br />
              University of Hawaii
              <br />
              Honolulu, HI 96822
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  </footer>
);

export default Footer;
