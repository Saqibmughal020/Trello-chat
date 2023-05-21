/** @format */

import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

// import io from '../../middleware/socketConfig.js';
import constants from '../../utils/constants.js';
import userRepository from '../../repo/user.js';
import roomRepository from '../../repo/room.js';
import mongoose from 'mongoose';

// import sendMail from '../../helper/sendMail';

config();

export default {
  signInUser: async (body) => {
    const { name, email, roomId } = body;
    // const otp = Math.floor(100000 + Math.random() * 900000);
    const otp = 123456;
    let room;
    let role;
    let _id;

    try {
      const user = await userRepository.getUserData({ email });

      if (user) {
        if (roomId && user.room) {
          return {
            success: false,
            message: constants.ALREADY_IN_A_ROOM,
          };
        }
        const checkRecord = await userRepository.updateUser({ email }, { otp });

        if (!checkRecord) {
          return {
            success: false,
            message: constants.OTP_ERROR,
          };
        }

        return {
          success: true,
          message: constants.OTP_SENDED,
        };
      }

      if (roomId) {
        _id = new mongoose.Types.ObjectId(roomId);
      }
      if (_id) {
        const user = await userRepository.getUserData({ room: _id });
        if (user) {
          return {
            success: false,
            message: constants.ONLY_ONE_ADMIN,
          };
        }

        const checkRoom = await roomRepository.getRoom({ _id });

        if (!checkRoom) {
          return {
            success: false,
            message: constants.INVALID_ROOM_ID,
          };
        }
        room = new mongoose.Types.ObjectId(roomId);
        role = 'Admin';
      }

      const userData = {
        name,
        email,
        otp,
        room,
        role,
      };

      let userd = await userRepository.createUser(userData);
      if (roomId) {
        await roomRepository.updateRoom(
          { _id },
          { $set: { members: userd._id } }
        );
      }
      delete userd.otp;

      return {
        success: true,
        message: constants.EMAIL_VERIFICATION,
        user: userd,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  verifyOtp: async (body) => {
    try {
      const { email, otp } = body;

      const getUser = await userRepository.getUserData({ email });

      if (!getUser) {
        return {
          success: false,
          message: constants.WRONG_EMAIL,
        };
      }

      if (getUser.otp !== otp) {
        return {
          success: false,
          message: constants.WRONG_OTP,
        };
      }
      body.isActive = true;
      const user = await userRepository.updateUser({ _id: getUser._id }, body);

      if (!user) {
        return {
          success: false,
          message: constants.NOT_VERIFIED,
        };
      }

      var token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRY_TIME,
      });

      token = `JWT ${token}`;

      const users = new Map(); // Map of user IDs to socket IDs

      // io.on('connection', (socket) => {
      //   socket.userId = user._id;

      //   // Add the socket ID to the map of user IDs
      //   users.set(user._id, socket.id);

      //   console.log(`User ${user._id} connected`);

      //   // Listen for disconnection events and remove the user from the map
      //   socket.on('disconnect', () => {
      //     users.delete(socket.userId);
      //     console.log(`User ${socket.userId} disconnected`);
      //   });
      // });

      return {
        success: true,
        message: constants.VERIFIED,
        role: user.role,
        token,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  resendOtp: async (body) => {
    try {
      const { email } = body;

      const user = await userRepository.getUserData({ email });

      if (!user) {
        return {
          success: false,
          message: constants.WRONG_EMAIL,
        };
      }
      const otp = Math.floor(100000 + Math.random() * 900000);

      const checkRecord = await userRepository.updateUser(
        { _id: user._id },
        { otp }
      );

      if (!checkRecord) {
        return {
          success: false,
          message: constants.OTP_NOT_SENDED,
        };
      }

      return {
        success: true,
        message: constants.OTP_SENDED,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};
