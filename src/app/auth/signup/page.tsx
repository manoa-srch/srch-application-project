'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const SignUpPage = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setSuccess('Account created successfully. Redirecting to sign in...');
      setTimeout(() => router.push('/auth/signin'), 1500);
    } catch {
      setError('Something went wrong.');
    }
  };

  return (
    <main style={{ paddingTop: '90px' }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={5}>
            <Card className="shadow-sm">
              <div className="p-4">
                <div className="text-center mb-4">
                  <h1 className="h3 fw-bold text-dark">Create an Account</h1>
                  <p className="text-muted mb-0">
                    Register to access your courses and SRCH curriculum tools.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="signupName" className="form-label">
                      First Name
                    </label>
                    <input
                      id="signupName"
                      type="text"
                      className="form-control"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupLastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      id="signupLastName"
                      type="text"
                      className="form-control"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupEmail" className="form-label">
                      Email Address
                    </label>
                    <input
                      id="signupEmail"
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="signupPassword" className="form-label">
                      Password
                    </label>
                    <input
                      id="signupPassword"
                      type="password"
                      className="form-control"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="signupConfirm" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      id="signupConfirm"
                      type="password"
                      className="form-control"
                      placeholder="Re-enter your password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger py-2" role="alert">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="alert alert-success py-2" role="alert">
                      {success}
                    </div>
                  )}

                  <div className="d-grid mb-3">
                    <Button variant="primary" size="lg" type="submit">
                      Sign Up
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="mb-1">
                      Already have an account? <a href="/auth/signin">Sign in here</a>
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

export default SignUpPage;
