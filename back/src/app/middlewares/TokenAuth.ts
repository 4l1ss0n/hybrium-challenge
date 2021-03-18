import {Request as Req, Response as Res, NextFunction as Next} from 'express';
import jwt from 'jsonwebtoken';
import secret from '../../../secret';


export default (req: Req, res: Res, next: Next) => {
  const auth = req.headers.authorization;
  
  if (!auth) return res.status(404).json({err: 'Token not found'});

  const splitedAuth = auth.split(' ');

  if (splitedAuth.length !== 2) return res.status(401).json({err: 'Malformed token'})

  const [baerer, token] = splitedAuth;

  jwt.verify(token, secret, (err, decoded: any) => {
    if (err) return res.status(401).json({err: 'Invalid token'});
    req.headers.authorization = decoded.id;
    next();    
  })
}