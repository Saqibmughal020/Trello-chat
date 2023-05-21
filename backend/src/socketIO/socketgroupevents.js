import AdminService from '../modules/admin/services.js';
import MessageService from '../modules/messages/services.js';
import constants from '../utils/constants.js';
import utils from '../utils/utils.js';

export default {
  createGroup: async (io, socket, data) => {
    let user;
    try {
      user = utils.decode(socket);
      data = JSON.parse(data);
      let groupResponse = await AdminService.addGroupToRoom(user, data);
      if (!groupResponse.success) {
        return {
          success: false,
          message: groupResponse.message,
          user: user._id,
        };
        // io.to(user._id).emit('error', groupResponse.message);
      }
      for (var i = 0; i < groupResponse.groups.length; i++) {
        let group = groupResponse.groups[i];
        socket.join(group);
        utils.groupJoin(socket.id, group);
      }
      return {
        success: true,
        message: constants.GROUP_CREATED,
        user: user._id,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        user: user._id,
      };
      // io.to(user._id).emit('error', error.message);
    }
  },

  addMembersToGroup: async (io, socket, data) => {
    let user;
    try {
      user = utils.decode(socket);
      data = JSON.parse(data);
      let addMember = await AdminService.addMembersToGroup(user, data);

      if (!addMember.success) {
        return {
          success: false,
          message: addMember.message,
          user: user._id,
        };
      }

      const groupType = ['conversationGroupMessage', 'sprintGroupMessage'];

      for (let index = 0; index < addMember.data.groups.length; index++) {
        const memberId = addMember.data.user;
        const groupId = addMember.data.groups[index];
        const group = io.sockets.adapter.rooms.has(groupId);

        if (group) {
          io.sockets.sockets.get(memberId).join(groupId);
          io.to(groupId).emit(
            groupType[index],
            `${user.name} just added in the group`
          );
        } else {
          return {
            success: false,
            message: addMember.message,
            user: user._id,
          };
        }
      }
      return {
        success: true,
        message: constants.MEMBERS_ADDED,
        user: user._id,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        user: user._id,
      };
    }
  },

  messsageToGroup: async (io, socket, data) => {
    let user;
    try {
      user = utils.decode(socket);
      data = JSON.parse(data);
      let createGroupMessage = await MessageService.createGroupMessage(
        user,
        data
      );

      if (!createGroupMessage.success) {
        return {
          success: false,
          message: createGroupMessage.message,
          user: user._id,
        };
      }

      let res = {
        senderName: user.name,
      };

      res.message = createGroupMessage.returnObject.message;

      const group = io.sockets.adapter.rooms.has(
        createGroupMessage.returnObject.groupId.toString()
      );

      if (!group) {
        return {
          success: false,
          message: createGroupMessage.message,
          user: user._id,
        };
      } else {
        if (createGroupMessage.returnObject.type === 'conversation') {
          io.to(createGroupMessage.returnObject.groupId.toString()).emit(
            'conversationGroupMessage',
            res
          );
        } else {
          io.to(createGroupMessage.returnObject.groupId.toString()).emit(
            'sprintGroupMessage',
            res
          );
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        user: user._id,
      };
    }
  },
};
