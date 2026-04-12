'use client';

import { useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';

const srchTopics: Record<string, string[]> = {
  Privacy: [
    'What is Privacy?',
    'Value of Privacy',
    'Not listed',
  ],
  Accessibility: [
    'What is Accessibility?',
    'Intersections with Other Core Values',
    'Design Processes',
    'Accessibility Biases',
    'Not listed',
  ],
  'Automated Decision Making': [
    'Algorithmic Fairness',
    'Concepts of Justice in AI',
    'Sources of Bias',
    'Not listed',
  ],
  'Generative AI': [
    'Introduction to Copyright and Generative AI',
    'Not listed',
  ],
  'Not listed': [],
};

export type CourseFormData = {
  id?: number;
  title?: string | null;
  code?: string | null;
  description?: string | null;
  topic?: string | null;
  subtopic?: string | null;
  propTopic?: string | null;
  propSubtopic?: string | null;
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
}: CourseFormProps) => {
  const [selectedTopic, setSelectedTopic] = useState(initialData?.topic ?? '');
  const [selectedSubtopic, setSelectedSubtopic] = useState(initialData?.subtopic ?? '');

  const subtopicOptions = useMemo(() => {
    return selectedTopic ? srchTopics[selectedTopic] ?? [] : [];
  }, [selectedTopic]);

  const showCustomFields =
    selectedTopic === 'Not listed' || selectedSubtopic === 'Not listed';

  return (
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

      <div className="mb-3">
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

      <div className="mb-3">
        <label htmlFor="topic" className="form-label">
          SRCH Topic
        </label>
        <select
          id="topic"
          name="topic"
          className="form-select"
          value={selectedTopic}
          onChange={(e) => {
            setSelectedTopic(e.target.value);
            setSelectedSubtopic('');
          }}
          required
        >
          <option value="">Select a topic</option>
          {Object.keys(srchTopics).map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="subtopic" className="form-label">
          SRCH Subtopic
        </label>
        <select
          id="subtopic"
          name="subtopic"
          className="form-select"
          value={selectedSubtopic}
          onChange={(e) => setSelectedSubtopic(e.target.value)}
          disabled={!selectedTopic || selectedTopic === 'Not listed'}
          required={selectedTopic !== '' && selectedTopic !== 'Not listed'}
        >
          <option value="">Select a subtopic</option>
          {subtopicOptions.map((subtopic) => (
            <option key={subtopic} value={subtopic}>
              {subtopic}
            </option>
          ))}
        </select>
      </div>

      {showCustomFields && (
        <div className="border rounded p-3 mb-4 bg-light">
          <h5 className="mb-3">Suggest a New SRCH Area</h5>

          <div className="mb-3">
            <label htmlFor="propTopic" className="form-label">
              Proposed Topic
            </label>
            <input
              id="propTopic"
              name="propTopic"
              type="text"
              className="form-control"
              defaultValue={initialData?.propTopic ?? ''}
              placeholder="Enter a proposed topic"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="propSubtopic" className="form-label">
              Proposed Subtopic
            </label>
            <input
              id="propSubtopic"
              name="propSubtopic"
              type="text"
              className="form-control"
              defaultValue={initialData?.propSubtopic ?? ''}
              placeholder="Enter a proposed subtopic"
            />
          </div>
        </div>
      )}

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
};

export default CourseForm;