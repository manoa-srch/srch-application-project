'use client';
import { Role } from '@prisma/client';
import { useState } from 'react';
import { Col, Row, Table, Button, Nav } from 'react-bootstrap';

type User = {
  id: number;
  email: string;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  role: Role;
};

type Course = {
  id: number;
  title: string;
  code?: string | null;
  description?: string | null;
  owner: { email: string; name?: string | null; firstName?: string | null; lastName?: string | null };
};

type Objective = {
  id: number;
  description: string;
  bloomLevel: string;
  course: { title: string; code?: string | null };
};

type Content = {
  id: number;
  title: string;
  body: string;
  summary?: string | null;
  topic?: string | null;
  author?: { email: string } | null;
};

type Props = {
  users: User[];
  courses: Course[];
  objectives: Objective[];
  content: Content[];
  adminUpdateUser: (formData: FormData) => Promise<void>;
  adminCreateUser: (formData: FormData) => Promise<void>;
  adminDeleteUser: (formData: FormData) => Promise<void>;
  adminCreateCourse: (formData: FormData) => Promise<void>;
  adminUpdateCourse: (formData: FormData) => Promise<void>;
  adminDeleteCourse: (formData: FormData) => Promise<void>;
  adminCreateObjective: (formData: FormData) => Promise<void>;
  adminUpdateObjective: (formData: FormData) => Promise<void>;
  adminDeleteObjective: (formData: FormData) => Promise<void>;
  adminCreateContent: (formData: FormData) => Promise<void>;
  adminUpdateContent: (formData: FormData) => Promise<void>;
  adminDeleteContent: (formData: FormData) => Promise<void>;
};

const AdminClient = ({
  users,
  courses,
  objectives,
  content,
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
}: Props) => {
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [editingObjectiveId, setEditingObjectiveId] = useState<number | null>(null);
  const [editingContentId, setEditingContentId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'courses' | 'objectives' | 'content'>('users');

  const bloomLevels = ['REMEMBER', 'UNDERSTAND', 'APPLY', 'ANALYZE', 'EVALUATE', 'CREATE'];

  return (
    <>
      {/* ── Tabs ── */}
      <Nav variant="tabs" className="mb-4">
        {(['users', 'courses', 'objectives', 'content'] as const).map((tab) => (
          <Nav.Item key={tab}>
            <Nav.Link
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              style={{ cursor: 'pointer', textTransform: 'capitalize' }}
            >
              {tab}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* ── Users Tab ── */}
      {activeTab === 'users' && (
        <>
          <Row className="mb-5">
            <Col>
              <h2>Users</h2>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>{user.name ?? `${user.firstName} ${user.lastName}`}</td>
                      <td>{user.role}</td>
                      <td>
                        {editingUserId === user.id ? (
                          <form action={adminUpdateUser}>
                            <input type="hidden" name="userID" value={user.id} />
                            <input type="text" name="firstName" placeholder="First name" defaultValue={user.firstName ?? ''} className="form-control form-control-sm mb-1" />
                            <input type="text" name="lastName" placeholder="Last name" defaultValue={user.lastName ?? ''} className="form-control form-control-sm mb-1" />
                            <input type="email" name="email" placeholder="Email" defaultValue={user.email ?? ''} className="form-control form-control-sm mb-1" />
                            <select name="role" defaultValue={user.role} className="form-select form-select-sm mb-1">
                              {Object.values(Role).map((r) => (
                                <option key={r} value={r}>{r}</option>
                              ))}
                            </select>
                            <div className="d-flex gap-1">
                              <Button type="submit" size="sm" variant="primary">Save</Button>
                              <Button size="sm" variant="secondary" onClick={() => setEditingUserId(null)}>Cancel</Button>
                            </div>
                          </form>
                        ) : (
                          <Button size="sm" variant="outline-primary" onClick={() => setEditingUserId(user.id)}>Edit</Button>
                        )}
                      </td>
                      <td>
                        <form action={adminDeleteUser}>
                          <input type="hidden" name="userID" value={user.id} />
                          <Button type="submit" size="sm" variant="danger">Delete</Button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h3>Add New User</h3>
              <form action={adminCreateUser}>
                <div className="mb-2">
                  <input type="text" name="firstName" placeholder="First name" required className="form-control" />
                </div>
                <div className="mb-2">
                  <input type="text" name="lastName" placeholder="Last name" required className="form-control" />
                </div>
                <div className="mb-2">
                  <input type="email" name="email" placeholder="Email" required className="form-control" />
                </div>
                <div className="mb-2">
                  <input type="password" name="password" placeholder="Password" required className="form-control" />
                </div>
                <div className="mb-3">
                  <select name="role" required className="form-select">
                    {Object.values(Role).map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <Button type="submit" variant="success">Create User</Button>
              </form>
            </Col>
          </Row>
        </>
      )}

      {/* ── Courses Tab ── */}
      {activeTab === 'courses' && (
        <>
          <Row className="mb-5">
            <Col>
              <h2>Courses</h2>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Code</th>
                    <th>Description</th>
                    <th>Owner</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td>{course.title}</td>
                      <td>{course.code ?? '—'}</td>
                      <td>{course.description ?? '—'}</td>
                      <td>{course.owner.email}</td>
                      <td>
                        {editingCourseId === course.id ? (
                          <form action={adminUpdateCourse}>
                            <input type="hidden" name="courseId" value={course.id} />
                            <input type="text" name="title" placeholder="Title" defaultValue={course.title} className="form-control form-control-sm mb-1" />
                            <input type="text" name="code" placeholder="Code" defaultValue={course.code ?? ''} className="form-control form-control-sm mb-1" />
                            <input type="text" name="description" placeholder="Description" defaultValue={course.description ?? ''} className="form-control form-control-sm mb-1" />
                            <div className="d-flex gap-1">
                              <Button type="submit" size="sm" variant="primary">Save</Button>
                              <Button size="sm" variant="secondary" onClick={() => setEditingCourseId(null)}>Cancel</Button>
                            </div>
                          </form>
                        ) : (
                          <Button size="sm" variant="outline-primary" onClick={() => setEditingCourseId(course.id)}>Edit</Button>
                        )}
                      </td>
                      <td>
                        <form action={adminDeleteCourse}>
                          <input type="hidden" name="courseId" value={course.id} />
                          <Button type="submit" size="sm" variant="danger">Delete</Button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h3>Add New Course</h3>
              <form action={adminCreateCourse}>
                <div className="mb-2">
                  <input type="text" name="title" placeholder="Course title" required className="form-control" />
                </div>
                <div className="mb-2">
                  <input type="text" name="code" placeholder="Course code (e.g. ICS 314)" className="form-control" />
                </div>
                <div className="mb-2">
                  <textarea name="description" placeholder="Description (optional)" className="form-control" rows={3} />
                </div>
                <div className="mb-3">
                  <input type="email" name="ownerEmail" placeholder="Owner email" required className="form-control" />
                </div>
                <Button type="submit" variant="success">Create Course</Button>
              </form>
            </Col>
          </Row>
        </>
      )}

      {/* ── Objectives Tab ── */}
      {activeTab === 'objectives' && (
        <>
          <Row className="mb-5">
            <Col>
              <h2>Learning Objectives</h2>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Bloom Level</th>
                    <th>Course</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {objectives.map((obj) => (
                    <tr key={obj.id}>
                      <td>{obj.description}</td>
                      <td>{obj.bloomLevel}</td>
                      <td>{obj.course.code ? `[${obj.course.code}] ` : ''}{obj.course.title}</td>
                      <td>
                        {editingObjectiveId === obj.id ? (
                          <form action={adminUpdateObjective}>
                            <input type="hidden" name="objectiveId" value={obj.id} />
                            <input type="text" name="description" placeholder="Description" defaultValue={obj.description} className="form-control form-control-sm mb-1" />
                            <select name="bloomLevel" defaultValue={obj.bloomLevel} className="form-select form-select-sm mb-1">
                              {bloomLevels.map((level) => (
                                <option key={level} value={level}>{level}</option>
                              ))}
                            </select>
                            <div className="d-flex gap-1">
                              <Button type="submit" size="sm" variant="primary">Save</Button>
                              <Button size="sm" variant="secondary" onClick={() => setEditingObjectiveId(null)}>Cancel</Button>
                            </div>
                          </form>
                        ) : (
                          <Button size="sm" variant="outline-primary" onClick={() => setEditingObjectiveId(obj.id)}>Edit</Button>
                        )}
                      </td>
                      <td>
                        <form action={adminDeleteObjective}>
                          <input type="hidden" name="objectiveId" value={obj.id} />
                          <Button type="submit" size="sm" variant="danger">Delete</Button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h3>Add New Objective</h3>
              <form action={adminCreateObjective}>
                <div className="mb-2">
                  <select name="courseId" required className="form-select">
                    <option value="">— Select a course —</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.code ? `[${course.code}] ` : ''}{course.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <input type="text" name="description" placeholder="Objective description" required className="form-control" />
                </div>
                <div className="mb-3">
                  <select name="bloomLevel" required className="form-select">
                    <option value="">— Select Bloom level —</option>
                    {bloomLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <Button type="submit" variant="success">Create Objective</Button>
              </form>
            </Col>
          </Row>
        </>
      )}

      {/* ── Content Tab ── */}
      {activeTab === 'content' && (
        <>
          <Row className="mb-5">
            <Col>
              <h2>SRCH Content</h2>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Topic</th>
                    <th>Summary</th>
                    <th>Author</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {content.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.topic ?? '—'}</td>
                      <td>{item.summary ? item.summary.slice(0, 60) + '...' : '—'}</td>
                      <td>{item.author?.email ?? '—'}</td>
                      <td>
                        {editingContentId === item.id ? (
                          <form action={adminUpdateContent}>
                            <input type="hidden" name="contentId" value={item.id} />
                            <input type="text" name="title" placeholder="Title" defaultValue={item.title} className="form-control form-control-sm mb-1" />
                            <input type="text" name="topic" placeholder="Topic" defaultValue={item.topic ?? ''} className="form-control form-control-sm mb-1" />
                            <input type="text" name="summary" placeholder="Summary" defaultValue={item.summary ?? ''} className="form-control form-control-sm mb-1" />
                            <textarea name="body" placeholder="Body" defaultValue={item.body} rows={3} className="form-control form-control-sm mb-1" />
                            <div className="d-flex gap-1">
                              <Button type="submit" size="sm" variant="primary">Save</Button>
                              <Button size="sm" variant="secondary" onClick={() => setEditingContentId(null)}>Cancel</Button>
                            </div>
                          </form>
                        ) : (
                          <Button size="sm" variant="outline-primary" onClick={() => setEditingContentId(item.id)}>Edit</Button>
                        )}
                      </td>
                      <td>
                        <form action={adminDeleteContent}>
                          <input type="hidden" name="contentId" value={item.id} />
                          <Button type="submit" size="sm" variant="danger">Delete</Button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h3>Add New Content</h3>
              <form action={adminCreateContent}>
                <div className="mb-2">
                  <input type="text" name="title" placeholder="Title" required className="form-control" />
                </div>
                <div className="mb-2">
                  <input type="text" name="topic" placeholder="Topic (optional)" className="form-control" />
                </div>
                <div className="mb-2">
                  <input type="text" name="summary" placeholder="Summary (optional)" className="form-control" />
                </div>
                <div className="mb-3">
                  <textarea name="body" placeholder="Body" required rows={5} className="form-control" />
                </div>
                <Button type="submit" variant="success">Create Content</Button>
              </form>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default AdminClient;