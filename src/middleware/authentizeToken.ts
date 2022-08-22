import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authentizeToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    const accessToken = process.env.ACCESS_TOKEN_SECRET;

    if (!accessToken) return res.sendStatus(401);

    jwt.verify(token, accessToken, (e: any, user) => {
      if (e) return res.sendStatus(403);

      req.user = user;
      next();
    });
  } catch (e: any) {
    return res.status(400).send(e.errors);
  }
};

export default authentizeToken;
