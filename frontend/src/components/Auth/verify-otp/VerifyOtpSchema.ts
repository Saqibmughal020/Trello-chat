import * as yup from "yup";

export const OtpSchema = yup.object({
  otp: yup.number().required("OTP is Required"),
});

export const VerifyOTPInitialValue = {
  otp: "",
};
