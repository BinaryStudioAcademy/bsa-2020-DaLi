const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/security.config");

const login = (user) => {
  return {
    jwt: jwt.sign({ id: user.id }, secretKey),
    user,
  };
};

module.exports = {
  login,
};
