'use client';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

type UserCourse = {
  id: number;
  title: string;
  code: string | null;
};

type UseObjectiveButtonProps = {
  sourceObjectiveId: number;
  userCourses: UserCourse[];
};

const UseObjectiveButton = ({ sourceObjectiveId, userCourses }: UseObjectiveButtonProps) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button size="sm" variant="outline-success" onClick={() => setShow(true)}>
        Use This Objective
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Choose Your Course</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="text-muted">
            Select one of your courses. This will open a new objective form preloaded with this
            objective and its mapped SRCH content.
          </p>

          {userCourses.length > 0 ? (
            <div className="d-flex flex-column gap-2">
              {userCourses.map((course) => (
                <Button
                  key={course.id}
                  variant="outline-primary"
                  href={`/courses/${course.id}/objectives/new?templateObjectiveId=${sourceObjectiveId}`}
                >
                  {course.code ? `${course.code} - ${course.title}` : course.title}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-muted mb-0">
              You need to create one of your own courses before using this objective.
            </p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UseObjectiveButton;