import { COMMENT_NEGATIVE, COMMENT_POSITIVE } from '../constants/status.js';

const INITIAL_SCORE = 10;
const BASE_RATIO = 0.1;
const UPPER_LIMIT = 50;
const LOWER_LIMIT = -50;

export const calculateInitialScore = (previous) => {
  if (previous.length === 0) {
    return INITIAL_SCORE;
  }

  return previous.reduce((sum, advert) => sum + (advert.score || 0), 0) / previous.length;
};

export const calculateScore = (initialScore, comments) => {
  if (comments.length === 0) {
    return initialScore;
  }

  const score = comments.reduce((sum, comment) => {
    const interactions = comment.likes + comment.dislikes;
    const difference = comment.likes - comment.dislikes;
    const ratio = difference / interactions || BASE_RATIO;
    const value = ratio * Math.log1p(interactions + 1);

    if (comment.status === COMMENT_POSITIVE) {
      return sum + value;
    }

    if (comment.status === COMMENT_NEGATIVE) {
      return sum - value;
    }

    return sum;
  }, 0);

  return Math.max(Math.min(initialScore + score / comments.length, UPPER_LIMIT), LOWER_LIMIT);
};
