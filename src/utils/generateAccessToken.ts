import jwt from 'jsonwebtoken';

const generateAccessToken = (user: any) => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret) return;

  return jwt.sign(user, accessTokenSecret, { expiresIn: '15s' });
};

export default generateAccessToken;
