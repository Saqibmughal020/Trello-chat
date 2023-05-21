/** @format */

import otpValidation from './otp-validation.js';
import signInValidation from './sign-in-validation.js';
import resendOtpValidation from './resend-otp.js';
import roomNameValidation from './room-validation.js';
import groupValidation from './group-validation.js';

export default {
  signIn: signInValidation,
  otp: otpValidation,
  resendOtp: resendOtpValidation,
  roomName: roomNameValidation,
  group: groupValidation,
};
