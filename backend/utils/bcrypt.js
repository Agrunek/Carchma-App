import bcrypt from 'bcrypt';

export const hashValue = async (value, rounds) => {
  return bcrypt.hash(value, rounds || 10);
};

export const compareValues = async (value, hashed) => {
  return bcrypt.compare(value, hashed).catch(() => false);
};
