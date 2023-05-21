/** @format */

import { config } from 'dotenv';
import groupService from './services.js';

config();

export default {
  viewGroupMessages: async (req, res) => {
    try {
      const response = await groupService.viewGroupMessages(req);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  viewMember: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await groupService.viewMember(id);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
  viewMembers: async (req, res) => {
    try {
      const { groupId } = req.params;
      const response = await groupService.viewMembers(groupId);

      return !response.success
        ? res.status(400).json({ err: response })
        : res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }
  },
};
