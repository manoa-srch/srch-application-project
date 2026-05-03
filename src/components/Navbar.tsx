'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {
  Book,
  BoxArrowRight,
  ChatSquareText,
  Collection,
  JournalText,
  Lock,
  PersonFill,
  PersonPlusFill,
  PersonWorkspace,
  ShieldLock,
} from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session, status } = useSession();
  const pathName = usePathname();

  if (status === 'loading') return null;

  const currentUser = session?.user?.email;
  const role = session?.user?.role;

  return (
    <Navbar expand="lg" fixed="top" className="topbar" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <Image src="/srchlogo.svg" alt="SRCH logo" width={34} height={34} />
          <span className="brand-copy">
            <span className="brand-kicker">Socially Responsible Computing</span>
            <span className="brand-title">Curriculum Builder</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="primary-nav" />

        <Navbar.Collapse id="primary-nav">
          <Nav className="me-auto nav-cluster">
            <Nav.Link href="/" active={pathName === '/'} className="nav-link-pill">
              <PersonWorkspace size={16} />
              Home
            </Nav.Link>

            {currentUser && (
              <>
                <Nav.Link
                  id="courses-nav"
                  href="/courses"
                  active={pathName.startsWith('/courses')}
                  className="nav-link-pill"
                >
                  <Book size={16} />
                  My Courses
                </Nav.Link>

                <Nav.Link
                  id="srch-nav"
                  href="/srch"
                  active={pathName.startsWith('/srch')}
                  className="nav-link-pill"
                >
                  <Collection size={16} />
                  SRCH Library
                </Nav.Link>

                <Nav.Link
                  id="curriculum-nav"
                  href="/curriculum"
                  active={pathName.startsWith('/curriculum')}
                  className="nav-link-pill"
                >
                  <JournalText size={16} />
                  Curriculum
                </Nav.Link>

                <Nav.Link
                  id="forum-nav"
                  href="/forum"
                  active={pathName.startsWith('/forum')}
                  className="nav-link-pill"
                >
                  <ChatSquareText size={16} />
                  Forum
                </Nav.Link>
              </>
            )}

            {currentUser && role === 'ADMIN' && (
              <Nav.Link
                id="admin-nav"
                href="/admin"
                active={pathName.startsWith('/admin')}
                className="nav-link-pill"
              >
                <ShieldLock size={16} />
                Admin
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            {session ? (
              <NavDropdown
                id="login-dropdown"
                title={currentUser}
                align="end"
                className="user-chip"
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/auth/change-password">
                  <Lock className="me-2" />
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/api/auth/signout">
                  <BoxArrowRight className="me-2" />
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Account" align="end" className="guest-chip">
                <NavDropdown.Item href="/auth/signin">
                  <PersonFill className="me-2" />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item href="/auth/signup">
                  <PersonPlusFill className="me-2" />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
