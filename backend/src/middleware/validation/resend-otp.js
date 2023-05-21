import { Validator } from 'node-input-validator';

const resendOtpValidation = async (req, res, next) => {
  const validate = new Validator(req.body, {
    email: 'required|email',
  });

  validate.check().then((matched) => {
    if (!matched) {
      return res.status(400).json({
        err: {
          success: false,
          message: Object.values(validate.errors)[0].message,
        },
      });
    }
    next();
  });
};

export default resendOtpValidation;
