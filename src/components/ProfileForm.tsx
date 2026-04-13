'use client';

import Button from 'react-bootstrap/Button';

export type ProfileFormData = {
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
};

type ProfileFormProps = {
  action: (formData: FormData) => void;
  initialData?: ProfileFormData;
  submitText: string;
  cancelHref: string;
};

const ProfileForm = ({
  action,
  initialData,
  submitText,
  cancelHref,
}: ProfileFormProps) => (
  <form action={action}>
    <div className="mb-3">
      <label htmlFor="firstName" className="form-label">
        First Name
      </label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        className="form-control"
        defaultValue={initialData?.firstName ?? ''}
        required
      />
    </div>

    <div className="mb-3">
      <label htmlFor="lastName" className="form-label">
        Last Name
      </label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        className="form-control"
        defaultValue={initialData?.lastName ?? ''}
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="name" className="form-label">
        Display Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        className="form-control"
        defaultValue={initialData?.name ?? ''}
        placeholder="Optional display name"
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

export default ProfileForm;