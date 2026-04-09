import { Card, Col, Container, Row } from 'react-bootstrap';

const ChangePassword = () => (
  <main>
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card body>
            <h1 className="h3">Password Change Unavailable</h1>
            <p className="mb-0">
              This project&apos;s current Prisma schema does not support the old password-based auth flow.
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  </main>
);

export default ChangePassword;
