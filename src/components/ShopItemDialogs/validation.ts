import * as yup from "yup";

export const shopItemFormValidation = yup.object({
  title: yup.string().required("This field is required"),
  cost: yup.number().min(1, "Must be at least 1 cost"),
});
