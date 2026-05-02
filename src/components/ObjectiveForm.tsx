'use client';

import Button from 'react-bootstrap/Button';

const bloomLevels = [
  'REMEMBER',
  'UNDERSTAND',
  'APPLY',
  'ANALYZE',
  'EVALUATE',
  'CREATE',
] as const;

export type ObjectiveFormData = {
  id?: number;
  courseId?: number;
  description?: string | null;
  bloomLevel?: string | null;
  position?: number | null;
  templateObjectiveId?: number | null;
};

type ObjectiveFormProps = {
  action: (formData: FormData) => void;
  submitText: string;
  cancelHref: string;
  initialData?: ObjectiveFormData;
};

const ObjectiveForm = ({
  action,
  submitText,
  cancelHref,
  initialData,
}: ObjectiveFormProps) => (
  <form action={action}>
    {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

    {initialData?.courseId && (
      <input type="hidden" name="courseId" value={initialData.courseId} />
    )}

    {initialData?.templateObjectiveId && (
      <input
        type="hidden"
        name="templateObjectiveId"
        value={initialData.templateObjectiveId}
      />
    )}

    <div className="mb-3">
      <label htmlFor="description" className="form-label">
        Objective Description
      </label>
      <textarea
        id="description"
        name="description"
        className="form-control"
        rows={4}
        defaultValue={initialData?.description ?? ''}
        placeholder="Describe what students should be able to know or do."
        required
      />
    </div>

    <div className="mb-3">
      <label htmlFor="bloomLevel" className="form-label">
        Bloom&apos;s Taxonomy Level
      </label>
      <select
        id="bloomLevel"
        name="bloomLevel"
        className="form-select"
        defaultValue={initialData?.bloomLevel ?? ''}
        required
      >
        <option value="">Select a Bloom level</option>
        {bloomLevels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
    </div>

    <div className="mb-4">
      <label htmlFor="position" className="form-label">
        Position
      </label>
      <input
        id="position"
        name="position"
        type="number"
        min="1"
        className="form-control"
        defaultValue={initialData?.position ?? ''}
        placeholder="Optional ordering number"
      />
    </div>

    <div className="d-flex gap-2 flex-wrap">
      <Button type="submit" name="intent" value="save" variant="primary">
        {submitText}
      </Button>

      <Button type="submit" name="intent" value="saveAndMap" variant="outline-primary">
        Save & Map SRCH Content
      </Button>

      <Button href={cancelHref} variant="outline-secondary">
        Cancel
      </Button>
    </div>
  </form>
);

export default ObjectiveForm;