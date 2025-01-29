import appAssert from '../utils/appAssert.js';
import {
  createComment,
  deleteCommentById,
  getCommentById,
  getCommentsByAdvertId,
  getCommentsByUserId,
  updateCommentById,
} from '../models/comment.js';
import { getAdvertById } from '../models/advert.js';
import { FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/http.js';

export const uploadComment = async (advertId, userId, content) => {
  const advert = await getAdvertById(advertId);
  appAssert(advert, NOT_FOUND, 'Advertisement not found');

  const comment = await createComment(advertId, userId, content);

  delete comment.createdAt;
  delete comment.updatedAt;

  return { comment };
};

export const modifyComment = async (commentId, userId, content) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const { userId: ownerId } = comment;
  appAssert(userId.toString() === ownerId.toString(), FORBIDDEN, 'User is not the owner of the advertisement');

  const { updated } = await updateCommentById(commentId, content);
  appAssert(updated, INTERNAL_SERVER_ERROR, 'Failed to modify comment');
};

export const removeComment = async (commentId, userId) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const { userId: ownerId } = comment;
  appAssert(userId.toString() === ownerId.toString(), FORBIDDEN, 'User is not the owner of the advertisement');

  const { deleted } = await deleteCommentById(commentId);
  appAssert(deleted, INTERNAL_SERVER_ERROR, 'Failed to delete comment');
};

export const showComment = async (commentId) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  delete comment.createdAt;
  delete comment.updatedAt;

  return { comment };
};

export const showAdvertComments = async (advertId) => {
  const comments = await getCommentsByAdvertId(advertId);

  comments.forEach((comment) => {
    delete comment.createdAt;
    delete comment.updatedAt;
  });

  return { comments };
};

export const showUserComments = async (userId) => {
  const comments = await getCommentsByUserId(userId);

  comments.forEach((comment) => {
    delete comment.createdAt;
    delete comment.updatedAt;
  });

  return { comments };
};
