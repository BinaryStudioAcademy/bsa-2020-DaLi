import dotenv from 'dotenv';

dotenv.config();

export const secretKey = process.env.SECRET_KEY;
export const expiresIn = process.env.JWT_EXPIRES_IN;
