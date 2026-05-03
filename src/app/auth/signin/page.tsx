'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password.');
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <main className="section-shell">
      <Container className="auth-shell py-4 py-lg-5">
        <Card className="auth-card border-0 w-100">
          <Row className="g-0">
            <Col lg={5}>
              <div className="auth-aside d-flex flex-column justify-content-between">
                <div>
                  <span className="eyebrow mb-3">Welcome back</span>
                  <h1 className="text-white mb-3">Continue building your curriculum workspace.</h1>
                  <p className="mb-0">
                    Sign in to manage courses, connect learning objectives to SRCH content, and
                    keep planning notes in one place.
                  </p>
                </div>
                <div className="auth-bullets">
                  <div className="auth-bullet">Open existing courses and continue editing</div>
                  <div className="auth-bullet">Map SRCH resources directly to objectives</div>
                  <div className="auth-bullet">Review curriculum notes and planning progress</div>
                </div>
              </div>
            </Col>
            <Col lg={7}>
              <div className="auth-main">
                <div className="mb-4">
                  <h2 className="mb-2">Sign In</h2>
                  <p className="text-muted mb-0">
                    Access your courses, learning objectives, and SRCH planning tools.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="signinEmail" className="form-label">Email Address</label>
                    <input
                      id="signinEmail"
                      type="email"
                      className="form-control"
                      placeholder="name@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="signinPassword" className="form-label">Password</label>
                    <input
                      id="signinPassword"
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger py-2" role="alert">
                      {error}
                    </div>
                  )}

                  <div className="d-flex flex-wrap gap-3 align-items-center mt-4">
                    <Button size="lg" type="submit">Sign In</Button>
                    <span className="text-muted">
                      Need an account? <a href="/auth/signup">Create one here</a>.
                    </span>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </main>
  );
};

export default SignInPage;
