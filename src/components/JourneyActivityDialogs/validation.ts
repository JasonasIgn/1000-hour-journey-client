import * as yup from "yup";

export const journeyActivityFormValidation = yup.object({
  name: yup.string().required("This field is required"),
});
