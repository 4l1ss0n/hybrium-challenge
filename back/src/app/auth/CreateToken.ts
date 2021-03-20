import jwt from 'jsonwebtoken';
import secret from '../../../secret';

export default (payload: {}): string => {
  return jwt.sign(payload, secret, {
    expiresIn: '24h'
  });
};