import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_ALGORITHM } from '../constants/jwt.constants';

function checkHeader(req: Request): { error: string; token?: string } | { error?: string; token: string } {
  const authorizationHeader: string | undefined = req.headers.authorization;
  if (!authorizationHeader) {
    return { error: 'The Authorization header was missing' };
  }
  const authHeaderParts: string[] = authorizationHeader.split(' ');
  if (authHeaderParts.length < 2) {
    return { error: 'Invalid Authorization header format' };
  }
  const token: string = authHeaderParts[1];
  return { token };
}

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const { error, token } = checkHeader(req);
  if (error) {
    res.status(412).send({ message: error });
    return;
  }

  if (!token) {
    res.status(401).send({ message: 'Not authenticated' });
    return;
  }

  // verify both signature and the optional expiration date
  if (!process.env.JWT_TOKEN_SECRET) {
    res.status(500).send({ message: 'Server error, missing mandatory configuration'});
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, { algorithms: [JWT_ALGORITHM] });
    next();
  } catch (error: any) {
    res.status(401).send({ message: error.message ?? 'Authentication failed' })
  }
}

export default isAuthenticated;