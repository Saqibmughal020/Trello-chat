/** @format */

import { config } from 'dotenv';

import UserService from './services.js';

config();

export default {
  signInUser: async (req, res) => {
    try {
      const { body } = req;

      const response = await UserService.signInUser(body);
      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  verifyOtp: async (req, res) => {
    try {
      const { body } = req;

      const response = await UserService.verifyOtp(body);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },

  resendOtp: async (req, res) => {
    try {
      const { body } = req;

      const response = await UserService.resendOtp(body);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
};
