import { Validator } from 'node-input-validator';

const roomNameValidation = async (req, res, next) => {
  const validate = new Validator(req.body, {
    roomName: 'required|string',
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

export default roomNameValidation;
