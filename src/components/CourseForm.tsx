'use client';

import Button from 'react-bootstrap/Button';

export type CourseFormData = {
  id?: number;
  title?: string | null;
  code?: string | null;
  description?: string | null;
};

type CourseFormProps = {
  action: (formData: FormData) => void;
  submitText: string;
  cancelHref: string;
  initialData?: CourseFormData;
};

const CourseForm = ({
  action,
  submitText,
  cancelHref,
  initialData,
}: CourseFormProps) => (
  <form action={action}>
    {initialData?.id && (
      <input type="hidden" name="id" value={initialData.id} />
    )}

    <div className="mb-3">
      <label htmlFor="title" className="form-label">
        Course Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        className="form-control"
        defaultValue={initialData?.title ?? ''}
        placeholder="e.g. Software Engineering"
        required
      />
    </div>

    <div className="mb-3">
      <label htmlFor="code" className="form-label">
        Course Code
      </label>
      <input
        id="code"
        name="code"
        type="text"
        className="form-control"
        defaultValue={initialData?.code ?? ''}
        placeholder="e.g. ICS 314"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="description" className="form-label">
        Course Description
      </label>
      <textarea
        id="description"
        name="description"
        className="form-control"
        rows={4}
        defaultValue={initialData?.description ?? ''}
        placeholder="Describe the course, its audience, and its goals."
      />
    </div>

    <div className="d-flex gap-2">
      <Button type="submit" variant="primary">
        {submitText}
      </Button>
      <Button href={cancelHref} variant="outline-secondary">
        Cancel
      </Button>
    </div>
  </form>
);

export default CourseForm;