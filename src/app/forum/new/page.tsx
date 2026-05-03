import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { createForumPost } from '@/actions/forum.action';

const NewForumPostPage = async () => {
  const session = await auth();
  if (!session?.user?.email) redirect('/auth/signin');

  return (
    <main>
      <Container className="py-3">
        <Row>
          <Col md={8}>
            <h1>Submit New Objective</h1>
            <p className="text-muted">
              Submit a learning objective that hasn&apos;t been mapped yet.
              Other users can vote and comment on it, and an admin will review it.
            </p>
            <form action={createForumPost}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label fw-bold">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="e.g. Students should be able to explain recursion"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-bold">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  placeholder="Describe the learning objective in detail..."
                  className="form-control"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="bloomLevel" className="form-label fw-bold">
                  Bloom&apos;s Taxonomy Level{' '}
                  <span className="text-muted fw-normal">(optional)</span>
                </label>
                <select id="bloomLevel" name="bloomLevel" className="form-select">
                  <option value="">Select a level</option>
                  <option value="REMEMBER">Remember</option>
                  <option value="UNDERSTAND">Understand</option>
                  <option value="APPLY">Apply</option>
                  <option value="ANALYZE">Analyze</option>
                  <option value="EVALUATE">Evaluate</option>
                  <option value="CREATE">Create</option>
                </select>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  Submit Objective
                </button>
                <Link href="/forum" className="btn btn-outline-secondary">
                  Cancel
                </Link>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default NewForumPostPage;
