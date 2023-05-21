/** @format */

import express from 'express';
import { config } from 'dotenv';
import auth from './middleware/auth.js';

import authController from './modules/auth/controller.js';
import adminController from './modules/admin/controller.js';
import groupController from './modules/group/controller.js';
import messageController from './modules/messages/controller.js';
import validate from './middleware/validation/index.js';

config();
const router = express.Router();

router.post('/sign-in', validate.signIn, authController.signInUser);
router.post('/verify-otp', validate.otp, authController.verifyOtp);
router.post('/resend-otp', validate.resendOtp, authController.resendOtp);

router.post('/room', validate.roomName, adminController.createRoom);
router.get('/room', auth, adminController.getRoom);

router.get('/group/:id', auth, adminController.getGroup);
router.get('/groups', auth, adminController.getAllGroups);
router.get(
  '/groupmessages/:groupId/:chatType',
  groupController.viewGroupMessages
);

router.get('/member/:id', auth, groupController.viewMember);
router.get('/members/:groupId', auth, groupController.viewMembers);

router.use('*', (req, res) => {
  res.status(404).json({
    code: "404 : page not found'",
  });
});
export default router;
