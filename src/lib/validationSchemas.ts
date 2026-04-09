import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
});
