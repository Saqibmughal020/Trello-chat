/** @format */

import { config } from 'dotenv';
import AdminService from './services.js';

config();

export default {
  createRoom: async (req, res) => {
    try {
      const { body } = req;

      const response = await AdminService.createRoom(body);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  getRoom: async (req, res) => {
    try {
      const { user } = req.user;

      const response = await AdminService.getRoom(user);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  addGroupToRoom: async (req, res) => {
    try {
      const { body } = req;
      const { user } = req.user;

      const response = await AdminService.addGroupToRoom(user, body);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  addMembersToGroup: async (req, res) => {
    try {
      const { body } = req;
      const { user } = req.user;

      const response = await AdminService.addMembersToGroup(user, body);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },

  getGroup: async (req, res) => {
    try {
      const { id } = req.params;

      const response = await AdminService.getGroup(id);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },

  getAllGroups: async (req, res) => {
    try {
      const { user } = req.user;

      const response = await AdminService.getAllGroups(user);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json({ response });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
};
