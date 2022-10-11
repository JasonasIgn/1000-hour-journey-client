import * as yup from "yup";

export const loginFormValidation = yup.object({
  password: yup.string().required("This field is required"),
});
