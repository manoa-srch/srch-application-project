'use client';
import { Role } from '@prisma/client';
import { useState } from 'react';
import { Col, Row, Table, Button } from 'react-bootstrap';

type User = {
  id: number;
  email: string;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  role: Role;
};

type Props = {
  users: User[];
  adminUpdateUser: (formData: FormData) => Promise<void>;
  adminCreateUser: (formData: FormData) => Promise<void>;
  adminDeleteUser: (formData: FormData) => Promise<void>;
};

const AdminClient = ({ users, adminUpdateUser, adminCreateUser, adminDeleteUser }: Props) => {
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  return (
    <>
      {/* ── Existing Users Table ── */}
      <Row className="mb-5">
        <Col>
          <h1>User Admin</h1>
          <Table striped bordered hover>
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

                  {/* Update form per row */}
                  <td>
                    {editingUserId === user.id ? (
                      <form action={adminUpdateUser}>
                        <input type="hidden" name="userID" value={user.id} />
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          defaultValue={user.firstName ?? ''}
                          className="form-control form-control-sm mb-1"
                        />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last name"
                          defaultValue={user.lastName ?? ''}
                          className="form-control form-control-sm mb-1"
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          defaultValue={user.email ?? ''}
                          className="form-control form-control-sm mb-1"
                        />
                        <select
                          name="role"
                          defaultValue={user.role}
                          className="form-control form-control-sm mb-1"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                        <div className="d-flex gap-1">
                          <Button type="submit" size="sm" variant="primary">
                            Save
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => setEditingUserId(null)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <Button size="sm" variant="outline-primary" onClick={() => setEditingUserId(user.id)}>
                        Edit
                      </Button>
                    )}
                  </td>

                  {/* Delete form per row */}
                  <td>
                    <form action={adminDeleteUser}>
                      <input type="hidden" name="userID" value={user.id} />
                      <Button type="submit" size="sm" variant="danger">
                        Delete User
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* ── Add New User Form ── */}
      <Row>
        <Col md={6}>
          <h2>Add New User</h2>
          <form action={adminCreateUser}>
            <div className="mb-2">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                required
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                required
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="form-control"
              />
            </div>
            <Button type="submit" variant="success">
              Create
            </Button>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default AdminClient;