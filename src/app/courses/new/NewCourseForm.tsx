'use client';

import CourseForm from '@/components/CourseForm';

type NewCourseFormProps = {
  action: (formData: FormData) => void;
};

const NewCourseForm = ({ action }: NewCourseFormProps) => (
  <CourseForm
    action={action}
    submitText="Create Course"
    cancelHref="/profile"
  />
);

export default NewCourseForm;