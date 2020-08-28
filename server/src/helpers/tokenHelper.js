import jwt from 'jsonwebtoken';
import { secretKey, expiresIn } from '../config/jwt.config';

export const createToken = (data) => jwt.sign(data, secretKey, { expiresIn: 5 });
