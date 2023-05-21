// /** @format */

// import { config } from 'dotenv';

// import constants from '../../utils/constants.js';
// import commentRepository from '../../repo/comment.js';
// import replyRepository from '../../repo/reply-comment.js';

// config();

// export default {
//   addComment: async (user, blogId, body) => {
//     try {
//       const { text } = body;
//       const commentData = {
//         text,
//         userName: user.name,
//         place: blogId,
//         date: Date.now(),
//       };
//       await commentRepository.createComment(commentData);

//       return {
//         success: true,
//         message: constants.CREATED,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//       };
//     }
//   },
//   replyComment: async (user, body, commentId) => {
//     try {
//       const { text } = body;
//       const commentData = {
//         text,
//         userName: user.name,
//         comment: commentId,
//         date: Date.now(),
//       };

//       await replyRepository.createComment(commentData);

//       return {
//         success: true,
//         message: constants.CREATED,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//       };
//     }
//   },
// };
