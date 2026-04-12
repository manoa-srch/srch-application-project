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

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="signinEmail" className="form-label">
                      Email Address
                    </label>
                    <input
                      id="signinEmail"
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
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
};

export default SignInPage;