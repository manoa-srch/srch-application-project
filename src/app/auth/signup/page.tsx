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
    <main className="section-shell">
      <Container className="auth-shell py-4 py-lg-5">
        <Card className="auth-card border-0 w-100">
          <Row className="g-0">
            <Col lg={5}>
              <div className="auth-aside d-flex flex-column justify-content-between">
                <div>
                  <span className="eyebrow mb-3">New account</span>
                  <h1 className="text-white mb-3">Start a cleaner course design workflow.</h1>
                  <p className="mb-0">
                    Register to create courses, define learning objectives, browse SRCH topics,
                    and organize teaching materials into a usable sequence.
                  </p>
                </div>
                <div className="auth-bullets">
                  <div className="auth-bullet">Create your course library and planning notes</div>
                  <div className="auth-bullet">Track objective-to-resource alignment</div>
                  <div className="auth-bullet">Build a more intentional curriculum path</div>
                </div>
              </div>
            </Col>
            <Col lg={7}>
              <div className="auth-main">
                <div className="mb-4">
                  <h2 className="mb-2">Create an Account</h2>
                  <p className="text-muted mb-0">
                    Register to access your courses and SRCH curriculum tools.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <label htmlFor="signupName" className="form-label">First Name</label>
                      <input
                        id="signupName"
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="signupLastName" className="form-label">Last Name</label>
                      <input
                        id="signupLastName"
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </Col>
                    <Col xs={12}>
                      <label htmlFor="signupEmail" className="form-label">Email Address</label>
                      <input
                        id="signupEmail"
                        type="email"
                        className="form-control"
                        placeholder="name@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="signupPassword" className="form-label">Password</label>
                      <input
                        id="signupPassword"
                        type="password"
                        className="form-control"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <label htmlFor="signupConfirm" className="form-label">Confirm Password</label>
                      <input
                        id="signupConfirm"
                        type="password"
                        className="form-control"
                        placeholder="Re-enter password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                      />
                    </Col>
                  </Row>

                  {error && (
                    <div className="alert alert-danger py-2 mt-3" role="alert">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="alert alert-success py-2 mt-3" role="alert">
                      {success}
                    </div>
                  )}

                  <div className="d-flex flex-wrap gap-3 align-items-center mt-4">
                    <Button size="lg" type="submit">Create Account</Button>
                    <span className="text-muted">
                      Already registered? <a href="/auth/signin">Sign in here</a>.
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

export default SignUpPage;
