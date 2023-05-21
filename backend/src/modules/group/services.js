/** @format */

import { config } from 'dotenv';
import mongoose from 'mongoose';
import constants from '../../utils/constants.js';
import userRepository from '../../repo/user.js';
import groupRepository from '../../repo/group.js';
import groupmessageRepository from '../../repo/groupmessage.js';

config();

export default {
  viewGroupMessages: async (req) => {
    try {
      let { groupId, chatType } = req.params;
      const limit = parseInt(req.query.limit, 10) || 10;
      const _id = new mongoose.Types.ObjectId(groupId);

      const group = await groupRepository.getGroup({
        _id,
      });

      if (!group) {
        return {
          success: false,
          message: constants.INVALID_GROUP_ID,
        };
      }
      chatType = `${group.groupName}${chatType}`;

      const message =
        await groupmessageRepository.getMessageDataWithAggregation([
          {
            $match: {
              chatType: chatType,
              groupId: _id,
            },
          },

          {
            $lookup: {
              from: 'users',
              localField: 'sender',
              foreignField: '_id',
              as: 'sender',
            },
          },
          {
            $project: {
              _id: 0,
              message: 1,
              sender: {
                $arrayElemAt: ['$sender', 0],
              },
              createdAt: 1,
            },
          },
          {
            $sort: {
              createdAt: 1,
            },
          },
          {
            $limit: limit,
          },
        ]);

      if (!message.length) {
        return {
          success: false,
          message: constants.NO_MESSAGE_EXIST,
        };
      }
      return {
        success: true,
        message: constants.MESSAGE,
        message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  viewMember: async (id) => {
    try {
      const _id = new mongoose.Types.ObjectId(id);
      const user = await userRepository.getUserData({
        _id,
      });

      if (!user) {
        return {
          success: false,
          message: constants.NOT_USER,
        };
      }
      return {
        success: true,
        user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  viewMembers: async (groupId) => {
    try {
      const _id = new mongoose.Types.ObjectId(groupId);

      const userd = await groupRepository.getUserDataWithAggregation([
        { $match: { _id } },
        {
          $lookup: {
            from: 'users',
            localField: 'users',
            foreignField: '_id',
            as: 'membersData',
          },
        },
        { $project: { membersData: 1 } },
      ]);

      if (!userd[0].membersData.length) {
        return {
          success: false,
          message: constants.NO_USER,
        };
      }
      return {
        success: true,
        userd,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};
