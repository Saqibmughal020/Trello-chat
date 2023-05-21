import * as yup from "yup";

export const RegisterProductSchema = yup.object({
  productName: yup.string().required("Product Name is Required"),
  category: yup.string().required("Catagory is Required"),
  price: yup.string().required("Price is Required"),
});

export const RegisterProductInitialValues = {
  productName: "",
  category: "",
  price: "",
};
