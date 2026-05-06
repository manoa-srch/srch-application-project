import { redirect } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ProfileForm from '@/components/ProfileForm';
import { updateProfile } from './actions';

const EditProfilePage = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <main style={{ paddingTop: '90px' }}>
      <Container className="py-4">
        <Row className="mb-4">
          <Col lg={8}>
            <h1 className="fw-bold">Edit Profile</h1>
            <p className="text-muted mb-0">
              Update your personal information for the SRCH platform.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={8}>
            <Card className="shadow-sm">
              <div className="p-4">
                <ProfileForm
                  action={updateProfile}
                  canManageProfileImage={user.role === 'INSTRUCTOR'}
                  submitText="Save Changes"
                  cancelHref="/profile"
                  initialData={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    name: user.name,
                    bio: user.bio,
                    profileImage: user.profileImage,
                  }}
                />
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
              <div className="p-4">
                <h5 className="mb-3">Profile Info</h5>
                <p className="mb-2">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="mb-0">
                  <strong>Role:</strong> {user.role}
                </p>
                {user.role !== 'INSTRUCTOR' ? (
                  <p className="text-muted mb-0 mt-3">
                    Profile photo uploads are only available for instructors.
                  </p>
                ) : null}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default EditProfilePage;
