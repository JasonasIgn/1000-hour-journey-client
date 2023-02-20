import * as yup from "yup";

export const journeyLogFormValidation = yup.object({
  description: yup
    .string()
    .required("This field is required")
    .max(255, "Max 255 characters"),
  hoursSpent: yup
    .number()
    .typeError("Must be a number")
    .required("This field is required")
    .min(0.1, "At least 6 minutes (0.1 hours) has to be spent doing session"),
});
