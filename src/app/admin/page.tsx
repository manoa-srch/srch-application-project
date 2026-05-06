import { Container } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import {
  adminUpdateUser,
  adminCreateUser,
  adminDeleteUser,
  adminCreateCourse,
  adminUpdateCourse,
  adminDeleteCourse,
  adminCreateObjective,
  adminUpdateObjective,
  adminDeleteObjective,
  adminCreateContent,
  adminUpdateContent,
  adminDeleteContent,
} from '@/app/admin/actions';
import AdminClient from './Admin';

const AdminPage = async () => {
  const session = await auth();
  adminProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const [users, courses, objectives, content] = await Promise.all([
    prisma.user.findMany({
      orderBy: { email: 'asc' },
    }),
    prisma.course.findMany({
      include: { owner: true },
      orderBy: { title: 'asc' },
    }),
    prisma.learningObjective.findMany({
      orderBy: { id: 'asc' },
      include: { course: true },
    }),
    prisma.sRCHContent.findMany({
      orderBy: { title: 'asc' },
      include: { author: true },
    }),
  ]);

  return (
    <main>
      <Container id="admin" fluid className="py-3">
        <AdminClient
          users={users}
          courses={courses}
          objectives={objectives}
          content={content}
          adminUpdateUser={adminUpdateUser}
          adminCreateUser={adminCreateUser}
          adminDeleteUser={adminDeleteUser}
          adminCreateCourse={adminCreateCourse}
          adminUpdateCourse={adminUpdateCourse}
          adminDeleteCourse={adminDeleteCourse}
          adminCreateObjective={adminCreateObjective}
          adminUpdateObjective={adminUpdateObjective}
          adminDeleteObjective={adminDeleteObjective}
          adminCreateContent={adminCreateContent}
          adminUpdateContent={adminUpdateContent}
          adminDeleteContent={adminDeleteContent}
        />
      </Container>
    </main>
  );
};

export default AdminPage;