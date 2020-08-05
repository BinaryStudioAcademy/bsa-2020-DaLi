require("dotenv").config();

const secretKey = process.env.SECRET_KEY;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

module.exports = {
  secretKey,
  jwtExpiresIn,
};
