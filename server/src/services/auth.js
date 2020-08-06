const jwt = require("jsonwebtoken");
const userRepo = require("../repos/userRepo");
const { secretKey } = require("../config/security.config");

const login = (user) => {
  return {
    jwt: jwt.sign({ id: user.id }, secretKey),
    user,
  };
};

const register = async (userData) => userRepo.create(userData);

module.exports = {
  login,
  register,
};
