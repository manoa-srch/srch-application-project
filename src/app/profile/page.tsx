import { redirect } from 'next/navigation';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import UserAvatar from '@/components/UserAvatar';

export const dynamic = 'force-dynamic';

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      courses: true,
      contents: true,
    },
  });

  if (!user) {
    redirect('/auth/signin');
  }

  const displayName = user.name ?? `${user.firstName} ${user.lastName}`;
  const instructorPhoto = user.role === 'INSTRUCTOR' ? user.profileImage : null;

  return (
    <main className="section-shell">
      <Container className="py-4 py-lg-5">
        <section className="hero-panel mb-4">
          <Row className="align-items-center g-4">
            <Col lg={8} className="hero-copy">
              <span className="eyebrow mb-3">Profile</span>
              <h1 className="mb-3">{displayName}</h1>
              <p className="mb-3">
                {user.bio?.trim() || 'Manage your account, review your courses, and keep track of the SRCH content you have contributed to the platform.'}
              </p>
              <div className="metric-strip">
                <span className="metric-chip">{user.email}</span>
                <span className="metric-chip metric-chip-profile-role">Role: {user.role}</span>
              </div>
            </Col>
            <Col lg={4}>
              <div className="profile-spotlight">
                <UserAvatar imageUrl={instructorPhoto} name={displayName} />
              </div>
            </Col>
          </Row>
          <div className="profile-stat-strip">
            <div className="dashboard-stat profile-stat-chip">
              <strong>{user.courses.length}</strong>
              <span>Courses</span>
            </div>
            <div className="dashboard-stat profile-stat-chip">
              <strong>{user.contents.length}</strong>
              <span>Contributions</span>
            </div>
            <div className="dashboard-stat profile-stat-chip">
              <strong className="dashboard-stat-role-value">{user.role}</strong>
              <span>Account role</span>
            </div>
          </div>
        </section>

        <section className="section-card p-4 mb-4">
          <Row className="align-items-center g-3">
            <Col md={8}>
              <h3 className="mb-1">Account details</h3>
              <p className="text-muted mb-0">
                Keep your profile up to date while continuing to use the same course and SRCH tools.
              </p>
            </Col>
            <Col md={4} className="text-md-end">
              <Button variant="outline-primary" href="/profile/edit">Edit Profile</Button>
            </Col>
          </Row>
        </section>

        <section className="mb-5">
          <Row className="align-items-center mb-3 g-3">
            <Col>
              <h2 className="mb-1">Your Courses</h2>
              <p className="text-muted mb-0">Open a course to continue mapping and curriculum planning.</p>
            </Col>
            <Col xs="auto">
              <Button href="/courses/new">+ New Course</Button>
            </Col>
          </Row>

          <Row className="g-4">
            {user.courses.length > 0 ? (
              user.courses.map((course) => (
                <Col key={course.id} md={6} xl={4}>
                  <Card className="surface-card border-0">
                    <div className="surface-body d-flex flex-column h-100">
                      <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                        <h4 className="mb-0">{course.title}</h4>
                        <Badge bg="secondary">{course.code ?? 'Course'}</Badge>
                      </div>
                      <p
                        className="text-muted mb-4"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {course.description ?? 'No description available.'}
                      </p>
                      <div className="d-flex gap-2 flex-wrap mt-auto">
                        <Button size="sm" href={`/courses/${course.id}`}>Open</Button>
                        <Button size="sm" variant="outline-secondary" href={`/courses/${course.id}/edit`}>
                          Edit
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <Card className="surface-card border-0">
                  <div className="empty-state">
                    <h4 className="mb-2">You have not created any courses yet.</h4>
                    <p className="text-muted mb-0">Create one to start mapping SRCH content.</p>
                  </div>
                </Card>
              </Col>
            )}
          </Row>
        </section>

        <section>
          <Row className="align-items-center mb-3">
            <Col>
              <h2 className="mb-1">Your Contributions</h2>
              <p className="text-muted mb-0">Resources you have added to the SRCH platform.</p>
            </Col>
          </Row>

          <Row className="g-4">
            {user.contents.length > 0 ? (
              user.contents.map((content) => (
                <Col key={content.id} md={6}>
                  <Card className="surface-card border-0">
                    <div className="surface-body">
                      <span className="eyebrow mb-3">{content.topic ?? 'Uncategorized'}</span>
                      <h4 className="mb-2">{content.title}</h4>
                      <p className="text-muted mb-4">{content.summary ?? 'No summary available.'}</p>
                      <div className="d-flex gap-2">
                        <Button size="sm" variant="outline-primary">View</Button>
                        <Button size="sm" variant="outline-secondary">Edit</Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <Card className="surface-card border-0">
                  <div className="empty-state">
                    <h4 className="mb-2">You have not contributed any SRCH content yet.</h4>
                    <p className="text-muted mb-0">Your future contributions will appear here.</p>
                  </div>
                </Card>
              </Col>
            )}
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default ProfilePage;
