/** @format */

import { config } from 'dotenv';

import constants from '../../utils/constants.js';
import roomRepository from '../../repo/room.js';
import groupRepository from '../../repo/group.js';
import conversationGroupRepository from '../../repo/conversation.js';
import sprintGroupRepository from '../../repo/sprintGroup.js';
import userRepository from '../../repo/user.js';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import utils from '../../utils/utils.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

config();

export default {
  createRoom: async (body) => {
    try {
      let { roomName, description } = body;

      roomName = roomName.replace(/\s+/g, ' ').trim();
      if (description) {
        description = description.replace(/\s+/g, ' ').trim();
      }
      const validName = utils.alphaNumaric(roomName);

      if (!validName) {
        return {
          success: false,
          message: constants.INVALID_ROOM_NAME,
        };
      }

      const checkRoomName = await roomRepository.getRoom({
        roomName,
      });

      if (checkRoomName) {
        return {
          success: false,
          message: constants.ROOM_NAME_ALREADY_EXISTS,
        };
      }

      const room = await roomRepository.createRoom({ roomName, description });
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

  getRoom: async (user) => {
    try {
      if (user.role !== 'Admin') {
        return {
          success: false,
          message: constants.NOT_AUTHORIZED,
        };
      }
      const roomId = new mongoose.Types.ObjectId(user.room);

      const checkRoom = await roomRepository.getRoom({
        _id: roomId,
      });
      if (!checkRoom) {
        return {
          success: false,
          message: constants.INVALID_ROOM_ID,
        };
      }

      const room = await roomRepository.getRoomDataWithAggregation([
        {
          $match: {
            _id: roomId,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'members',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $lookup: {
            from: 'groups',
            localField: 'groups',
            foreignField: '_id',
            as: 'group',
          },
        },
        {
          $project: {
            roomName: 1,
            description: 1,
            user: 1,
            group: 1,
          },
        },
      ]);
      console.log(room);
      return {
        success: true,
        message: constants.ROOM,
        room,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  addGroupToRoom: async (user, body) => {
    try {
      let groups = [];
      let { groupName, groupDiscription } = body;

      if (user.role !== 'Admin') {
        return {
          success: false,
          message: constants.NOT_AUTHORIZED,
        };
      }

      const groupData = {
        groupName,
        groupDiscription,
        room: user.room,
        createdBy: user._id,
      };

      const checkRoom = await roomRepository.getRoom({
        _id: user.room,
      });

      if (!checkRoom) {
        return {
          success: false,
          message: constants.INVALID_ROOM_ID,
        };
      }
      const checkGroupNameAlreadyExists = await groupRepository.getGroup({
        groupName,
        room: user.room,
      });

      if (checkGroupNameAlreadyExists) {
        return {
          success: false,
          message: constants.GROUP_NAME_ALREADY_EXISTS,
        };
      }

      const group = await groupRepository.createGroup(groupData);

      const conversationGroupData = {
        name: `${group.groupName}conversation`,
        groupId: group._id,
      };

      const conversationGroup =
        await conversationGroupRepository.createConversationGroup(
          conversationGroupData
        );

      groups.push(conversationGroup._id.toString());
      const sprintGroupData = {
        name: `${group.groupName}sprint`,
        groupId: group._id,
      };
      const sprintGroup = await sprintGroupRepository.createSprintGroup(
        sprintGroupData
      );

      groups.push(sprintGroup._id.toString());

      await groupRepository.updateGroup(
        {
          _id: group._id,
        },
        {
          $push: { users: user._id },
          conversation: conversationGroup._id,
          sprint: sprintGroup._id,
        }
      );

      await userRepository.updateUser(
        {
          _id: user._id,
        },
        {
          $push: { groups: group._id },
        }
      );

      await roomRepository.updateRoom(
        { _id: checkRoom._id },
        { $push: { groups: group._id } }
      );

      return {
        success: true,
        message: constants.GROUP_CREATED,
        groups,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  addMembersToGroup: async (users, body) => {
    try {
      let { groupId, member } = body;
      if (users.role !== 'Admin') {
        return {
          success: false,
          message: constants.NOT_AUTHORIZED,
        };
      }

      groupId = new mongoose.Types.ObjectId(groupId);
      const checkGroup = await groupRepository.getGroup({ _id: groupId });

      if (!checkGroup) {
        return {
          success: false,
          message: constants.INVALID_GROUP_ID,
        };
      }

      const roomId = new mongoose.Types.ObjectId(users.room);
      const checkRoomBelongsToAdmin = roomId.equals(checkGroup.room);

      if (!checkRoomBelongsToAdmin) {
        return {
          success: false,
          message: constants.NOT_YOUR_GROUP,
        };
      }

      const user = await userRepository.getUserData({
        email: member,
      });
      if (!user) {
        return {
          success: false,
          message: constants.NO_MEMBER_EXIST,
        };
      }

      if (user.groups.length > 0) {
        const userd = await userRepository.getDataWithAggregation([
          { $match: { email: member } },
          {
            $lookup: {
              from: 'groups',
              localField: 'groups',
              foreignField: '_id',
              as: 'groups_data',
            },
          },
          { $project: { groups_data: 1 } },
        ]);

        const checkIfRoomIsDifferent = userd[0].groups_data.find((element) => {
          return element.room.equals(checkGroup.room);
        });

        if (!checkIfRoomIsDifferent) {
          return {
            success: false,
            message: constants.ALREADY_IN_A_ROOM,
          };
        }
        const found = user.groups.includes(groupId);

        if (found) {
          return {
            success: false,
            message: constants.ALREADY_IN_THIS_GROUP,
          };
        }
      }

      checkGroup.users.push(user._id);

      await checkGroup.save();

      user.groups.push(groupId);
      await user.save();
      let data = {
        user: user._id.toString(),
      };
      let groups = [];

      groups.push(checkGroup.conversation.toString());
      groups.push(checkGroup.sprint.toString());
      data.groups = groups;
      await roomRepository.updateRoom(
        { _id: roomId },
        { $push: { members: user._id } }
      );
      return {
        success: true,
        message: constants.ADDED_IN_THE_GROUP,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  getGroup: async (id) => {
    try {
      const groupId = new mongoose.Types.ObjectId(id);
      const checkGroup = await groupRepository.getGroup({ _id: groupId });

      if (!checkGroup) {
        return {
          success: false,
          message: constants.INVALID_ROOM_ID,
        };
      }
      return {
        success: true,
        message: constants.GROUP_FETCHED,
        checkGroup,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  getAllGroups: async (users) => {
    try {
      const user = await userRepository.getUserData({
        _id: users._id,
      });
      if (!user) {
        return {
          success: false,
          message: constants.NO_USER,
        };
      }

      if (user.groups.length == 0) {
        return {
          success: false,
          message: constants.NOT_GROUP,
        };
      }
      const groupsDetail = await userRepository.getDataWithAggregation([
        { $match: { _id: user._id } },
        {
          $lookup: {
            from: 'groups',
            localField: 'groups',
            foreignField: '_id',
            as: 'groupsData',
          },
        },
        { $project: { groupsData: 1 } },
      ]);

      return {
        success: true,
        message: constants.GROUP_FETCHED,
        groupsDetail,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};
