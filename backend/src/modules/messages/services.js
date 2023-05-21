/** @format */

import { config } from 'dotenv';
import mongoose from 'mongoose';
import constants from '../../utils/constants.js';
import userRepository from '../../repo/user.js';
import groupRepository from '../../repo/group.js';
import messageRepository from '../../repo/message.js';
import groupMessageRepository from '../../repo/groupmessage.js';

config();

export default {
  createMessage: async (user, body) => {
    try {
      const { messsage, receiverId } = body;
      const _id = user._id;
      const checkRoomName = await roomRepository.getRoom({
        roomName,
      });

      if (checkRoomName) {
        return {
          success: false,
          message: constants.ROOM_NAME_ALREADY_EXISTS,
        };
      }

      const room = await roomRepository.createRoom({ roomName });
      return {
        success: true,
        message: constants.ROOM_CREATED,
        room,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  createGroupMessage: async (user, body) => {
    try {
      let sender = new mongoose.Types.ObjectId(user._id);

      let createMessageData = {
        sender,
      };
      let returnObject = {};

      let { message, groupId, chatType } = body;
      groupId = new mongoose.Types.ObjectId(groupId);
      const checkGroup = await groupRepository.getGroup({
        _id: groupId,
      });

      if (!checkGroup) {
        return {
          success: false,
          message: constants.INVALID_GROUP_ID,
        };
      }

      if (chatType === 'conversation') {
        returnObject.type = 'conversation';
        returnObject.groupId = checkGroup.conversation;
      } else {
        returnObject.type = 'sprint';
        returnObject.groupId = checkGroup.sprint;
      }
      createMessageData.groupId = groupId;
      createMessageData.chatType = `${checkGroup.groupName}${chatType}`;
      createMessageData.message = message;
      returnObject.message = message;
      await groupMessageRepository.createGroupMessage({
        ...createMessageData,
      });
      return {
        success: true,
        message: constants.ROOM_CREATED,
        returnObject,
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
            localField: 'members',
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
