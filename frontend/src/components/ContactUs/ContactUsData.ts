import * as yup from "yup";

export const ContactUsSchema = yup.object({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  message: yup
    .string()
    .required("please write some messgae")
    .min(2, "Product must be at least 2 characters.")
    .max(200, "Product has a maximum limit of 100 characters."),
});

export const ContactUsInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};
