import { Container } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

export default async function EditStuffPage() {
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
        <p>The old inventory edit page is not used by the current SRCH data model.</p>
      </Container>
    </main>
  );
}
