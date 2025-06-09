import appAssert from '../utils/appAssert.js';
import { createInteraction, getInteractionsByActions } from '../models/interaction.js';
import { getAdvertById } from '../models/advert.js';
import { getCommentById } from '../models/comment.js';
import { getUserById } from '../models/user.js';
import { ADVERT_REPORT, COMMENT_REPORT } from '../constants/interaction.js';
import { FORBIDDEN, NOT_FOUND } from '../constants/http.js';
import { REPORT_REVIEWER } from '../constants/permission.js';

export const reportAdvert = async (advertId, userId, content) => {
  const advert = await getAdvertById(advertId);
  appAssert(advert, NOT_FOUND, 'Advertisement not found');

  const interaction = await createInteraction(userId, advertId, ADVERT_REPORT, content);

  return { report: interaction };
};

export const reportComment = async (commentId, userId, content) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const interaction = await createInteraction(userId, commentId, COMMENT_REPORT, content);

  return { report: interaction };
};

export const listReports = async (userId, page) => {
  const user = await getUserById(userId);
  appAssert(user, NOT_FOUND, 'User not found');

  const { permissions } = user;
  appAssert(permissions.includes(REPORT_REVIEWER), FORBIDDEN, 'User is not allowed to view the reports');

  const reports = await getInteractionsByActions(page, [ADVERT_REPORT, COMMENT_REPORT]);

  return { reports };
};
