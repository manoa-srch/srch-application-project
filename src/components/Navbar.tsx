'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {
  BoxArrowRight,
  Lock,
  PersonFill,
  PersonPlusFill,
  Book,
  Collection,
  JournalText,
  ChatSquareText,
} from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session, status } = useSession();
  const pathName = usePathname();

  if (status === 'loading') return null;

  const currentUser = session?.user?.email;
  const role = session?.user?.role;

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" fixed="top">
      <Container>
        {/* BRAND */}
        <Navbar.Brand href="/">
          <Image src="/srchlogo.svg" alt="srchlogo" width={50} height={50}/> Curriculum Builder
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {/* LEFT SIDE NAV */}
          <Nav className="me-auto">

            {/* Always visible */}
            <Nav.Link href="/" active={pathName === '/'}>
              Home
            </Nav.Link>

            {currentUser && (
              <>
                <Nav.Link
                  id="courses-nav"
                  href="/courses"
                  active={pathName.startsWith('/courses')}
                >
                  <Book className="me-1" />
                  My Courses
                </Nav.Link>

                <Nav.Link
                  id="srch-nav"
                  href="/srch"
                  active={pathName.startsWith('/srch')}
                >
                  <Collection className="me-1" />
                  SRCH Browser
                </Nav.Link>

                {/* Optional for later */}
                <Nav.Link
                  id="curriculum-nav"
                  href="/curriculum"
                  active={pathName.startsWith('/curriculum')}
                >
                  <JournalText className="me-1" />
                  Curriculum
                </Nav.Link>
                <Nav.Link
                  id="forum-nav"
                  href="/forum"
                  active={pathName.startsWith('/forum')}
                >
                  <ChatSquareText className="me-1" />
                  Forum
              </Nav.Link>
              </>

            )}

            {/* ADMIN / EDITOR */}
            {currentUser && role === 'ADMIN' && (
              <Nav.Link
                id="admin-nav"
                href="/admin"
                active={pathName.startsWith('/admin')}
              >
                Admin
              </Nav.Link>
            )}
          </Nav>

          {/* RIGHT SIDE (AUTH) */}
          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item href="/profile">
                  Profile
                </NavDropdown.Item>

                <NavDropdown.Item href="/auth/change-password">
                  <Lock className="me-1" />
                  Change Password
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item href="/api/auth/signout">
                  <BoxArrowRight className="me-1" />
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Login">
                <NavDropdown.Item href="/auth/signin">
                  <PersonFill className="me-1" />
                  Sign in
                </NavDropdown.Item>

                <NavDropdown.Item href="/auth/signup">
                  <PersonPlusFill className="me-1" />
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