import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const SignInPage = () => (
  <main style={{ paddingTop: '90px' }}>
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={5}>
          <Card className="shadow-sm">
            <div className="p-4">
              <div className="text-center mb-4">
                <h1 className="h3 fw-bold text-dark">Sign In</h1>
                <p className="text-muted mb-0">
                  Access your courses, learning objectives, and SRCH curriculum tools.
                </p>
              </div>

              <form>
                <div className="mb-3">
                  <label htmlFor="signinEmail" className="form-label">
                    Email Address
                  </label>
                  <input
                    id="signinEmail"
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="signinPassword" className="form-label">
                    Password
                  </label>
                  <input
                    id="signinPassword"
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="d-grid mb-3">
                  <Button variant="primary" size="lg" type="submit">
                    Sign In
                  </Button>
                </div>

                <div className="text-center">
                  <p className="mb-1">
                    Don&apos;t have an account? <a href="/auth/signup">Register here</a>
                  </p>
                </div>
              </form>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  </main>
);

export default SignInPage;