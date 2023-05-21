import { Server } from 'socket.io';

import utils from '../utils/utils.js';
import AdminService from '../modules/admin/services.js';
import groupEvents from './socketgroupevents.js';

import { config } from 'dotenv';

config();

let socketSetup = async (server) => {
  const io = new Server(server);

  io.use(async (socket, next) => {
    let token = socket.handshake.query.authorization;

    if (token) {
      const user = utils.decode(socket);
      socket.id = user._id;
      next();
    }
  });

  io.on('connection', (socket) => {
    utils.userJoin(socket.id);

    socket.on('createGroup', async (data) => {
      let _id;
      try {
        const response = await groupEvents.createGroup(io, socket, data);

        _id = response.user;
        if (!response.success) {
          throw new Error(response.message);
        }
        io.to(_id.toString()).emit('success', {
          success: response.message,
        });
      } catch (error) {
        io.to(_id.toString()).emit('error', {
          error: error.message,
        });
      }
    });

    socket.on('addMembersToGroup', async (data) => {
      let _id;
      try {
        const response = await groupEvents.addMembersToGroup(io, socket, data);

        if (!response.success) {
          _id = response.user;
          throw new Error(response.message);
        }
        io.to(response.user).emit('success', {
          success: response.message,
        });
      } catch (error) {
        io.to(_id).emit('error', {
          error: error.message,
        });
      }
    });

    socket.on('messageToGroup', async (data) => {
      let _id;
      try {
        const messageToGroup = await groupEvents.messsageToGroup(
          io,
          socket,
          data
        );
        _id = messageToGroup.user;
        if (!messageToGroup.success) {
          throw new Error(response.message);
        }
      } catch (error) {
        io.to(_id).emit('error', {
          error: error.message,
        });
      }
      // socket.broadcast.emit('message', { message, sender: socket.id });
    });

    // When a client sends a "join group" event
    socket.on('joinGroup', (groupId) => {
      const userId = socket.id;
      socket.join(groupId);
      // Add the user to the group members list in the groups map
      const group = utils.groupJoin(userId, groupId);
      group.members.push(socket.request.session.passport.user);

      // Emit a "group-joined" event to all sockets in the group
      io.to(groupId).emit('groupJoined', {
        groupId: groupId,
        member: userId, // for example, send the username of the user who joined
      });
    });

    // When a client sends a "leave group" event
    socket.on('leave-group', (groupId) => {
      // Remove the socket from the group
      socket.leave(groupId);

      // Remove the user from the group members list in the groups map
      const group = groups.get(groupId);
      const userIndex = group.members.indexOf(
        socket.request.session.passport.user
      );
      if (userIndex > -1) {
        group.members.splice(userIndex, 1);
      }

      // Emit a "group-left" event to all sockets in the group
      io.to(groupId).emit('group-left', {
        groupId: groupId,
        member: socket.request.user.username, // for example, send the username of the user who left
      });

      // If the group is empty, remove it from the groups map
      if (group.members.length === 0) {
        groups.delete(groupId);
      }
    });

    // When a client sends a "get groups" event
    socket.on('get-groups', () => {
      // Send a list of all the groups to the client
      const groupList = Array.from(groups.values());
      socket.emit('groups-list', groupList);
    });

    socket.on('error', (data) => {
      groupEvents.joinGroup('u', 'm', 'e');
    });

    // socket.on('joinRoom', ({ username, room }) => {
    //   const user = userJoin(socket.id, username, room);

    //   const roomName = room;

    //   socket.join(user.room);

    //   // Welcome current user
    //   socket.emit(
    //     'message',
    //     formatMessage(botName, `Welcome to ${roomName} Room`)
    //   );

    //   // Broadcast when a user connects
    //   socket.broadcast
    //     .to(user.room)
    //     .emit(
    //       'message',
    //       formatMessage(botName, `${user.username} has joined the chat`)
    //     );

    //   // Send users and room info
    //   io.to(user.room).emit('roomUsers', {
    //     room: user.room,
    //     users: getRoomUsers(user.room),
    //   });
    // });

    // // Listen for chatMessage
    // socket.on('chatMessage', (msg) => {
    //   const user = getCurrentUser(socket.id);

    //   io.to(user.room).emit('message', formatMessage(user.username, msg));
    // });

    // Runs when client disconnects
    socket.on('disconnect', () => {
      // const user = userLeave(socket.id);
      // if (user) {
      //   io.to(user.room).emit(
      //     'message',
      //     formatMessage(botName, `${user.username} has left the chat`)
      //   );
      //   // Send users and room info
      //   io.to(user.room).emit('roomUsers', {
      //     room: user.room,
      //     users: getRoomUsers(user.room),
      //   });
      // }
    });
  });
  return io;
};
export default socketSetup;
