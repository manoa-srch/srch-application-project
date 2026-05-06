'use client';

import Button from 'react-bootstrap/Button';
import UserAvatar from './UserAvatar';

export type ProfileFormData = {
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
  bio?: string | null;
  profileImage?: string | null;
};

type ProfileFormProps = {
  action: (formData: FormData) => void;
  initialData?: ProfileFormData;
  canManageProfileImage?: boolean;
  submitText: string;
  cancelHref: string;
};

const ProfileForm = ({
  action,
  initialData,
  canManageProfileImage = false,
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

    {canManageProfileImage ? (
      <div className="mb-4">
        <label htmlFor="profileImageFile" className="form-label">
          Profile Picture
        </label>
        {initialData?.profileImage ? (
          <div className="mb-3">
            <UserAvatar
              imageUrl={initialData.profileImage}
              name={(initialData.name ?? `${initialData.firstName ?? ''} ${initialData.lastName ?? ''}`.trim()) || 'User'}
              size="sm"
            />
          </div>
        ) : null}
        <input
          id="profileImageFile"
          name="profileImageFile"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="form-control"
        />
        <div className="form-text">
          Upload a PNG, JPEG, WebP, or GIF image up to 2 MB.
        </div>
        {initialData?.profileImage ? (
          <div className="form-check mt-2">
            <input
              id="removeProfileImage"
              name="removeProfileImage"
              type="checkbox"
              value="true"
              className="form-check-input"
            />
            <label htmlFor="removeProfileImage" className="form-check-label">
              Remove current profile picture
            </label>
          </div>
        ) : null}
      </div>
    ) : null}

    <div className="mb-4">
      <label htmlFor="bio" className="form-label">
        Bio
      </label>
      <textarea
        id="bio"
        name="bio"
        className="form-control"
        defaultValue={initialData?.bio ?? ''}
        placeholder="Tell other users a bit about yourself."
        rows={5}
        maxLength={500}
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
