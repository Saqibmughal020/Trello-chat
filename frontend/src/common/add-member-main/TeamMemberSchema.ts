import * as yup from "yup";

export const TeamMemberSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export const TeamMemberInitialValues = {
  email: "",
};
