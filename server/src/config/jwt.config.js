import dotenv from "dotenv"

dotenv.config()

const secretKey = process.env.SECRET_KEY;
const expiresIn = process.env.JWT_EXPIRES_IN;

export default {
  secretKey,
  expiresIn,
};
