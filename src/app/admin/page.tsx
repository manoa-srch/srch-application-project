import { Container } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import { adminUpdateUser, adminCreateUser, adminDeleteUser } from '@/app/admin/actions';
import AdminClient from './Admin';

const AdminPage = async () => {
  const session = await auth();
  adminProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const users = await prisma.user.findMany({
    orderBy: { email: 'asc' },
  });

  return (
    <main>
      <Container id="admin" fluid className="py-3">
        <AdminClient
          users={users}
          adminUpdateUser={adminUpdateUser}
          adminCreateUser={adminCreateUser}
          adminDeleteUser={adminDeleteUser}
        />
      </Container>
    </main>
  );
};

export default AdminPage;