/* eslint-disable comma-dangle */
/* eslint-disable */
/* eslint-disable arrow-body-style */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

config();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const users = [];
const groups = [];
export default {
  decode: (socket) => {
    try {
      const token = socket.handshake.query.authorization;
      const accessToken = token.split(' ')[1];
      const users = jwt.verify(accessToken, process.env.JWT_SECRET);
      return users.user;
    } catch (error) {
      return error.message;
    }
  },

  alphaNumaric: (string) => {
    const regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(string);
  },

  userJoin: (userId) => {
    users.push(userId);
    return userId;
  },

  // Join user to chat
  groupJoin: (userId, groupId) => {
    const user = { userId, groupId };
    return user;
  },

  getCurrentUser: (id) => {
    return groups.find((user) => user.userId === id);
  },

  userLeave: (id) => {
    const index = groups.findIndex((user) => user.userId === id);

    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  },

  getRoomUsers: (room) => {
    return users.filter((user) => user.room === room);
  },

  uploadFile: (image, imageName) => {
    try {
      let imageUrl = process.env.VIEW_IMAGE_URL;
      const Path = path.join(__dirname, `../../downloads/${imageName}`);
      return new Promise((resolve, reject) => {
        fs.writeFile(Path, image, (err) => {
          if (err) {
            reject(err.message);
          }
          resolve(`${imageUrl}/${imageName}`);
        });
      });
    } catch (error) {
      throw error.message;
    }
  },
};
