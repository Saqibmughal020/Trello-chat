import { Validator } from 'node-input-validator';

const groupValidation = async (req, res, next) => {
  const validate = new Validator(req.body, {
    groupName: 'required|string',
    groupDescription: 'required|string',
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

export default groupValidation;
