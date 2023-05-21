import * as yup from "yup";

export const logInAccountSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export const LoginAccountInitialValues = {
  name: "",
  email: "",
};
