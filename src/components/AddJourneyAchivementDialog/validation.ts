import * as yup from "yup";

export const addJourneyFormValidation = yup.object({
  description: yup.string().required("This field is required"),
  loggedAtHour: yup
    .number()
    .typeError("Must be a number")
    .required("This field is required"),
});
