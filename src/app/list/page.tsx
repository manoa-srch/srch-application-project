import { Container } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

const ListPage = async () => {
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  return (
    <main>
      <Container className="py-4">
        <h1>Legacy Route Disabled</h1>
        <p>The old inventory listing page is not used by the current SRCH data model.</p>
      </Container>
    </main>
  );
};

export default ListPage;
