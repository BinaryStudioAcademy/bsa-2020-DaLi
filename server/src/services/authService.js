import jwt from "jsonwebtoken"
import UserRepository from "../repositories/userRepository"
import jwtConfig from "../config/jwt.config"

export const login = (user) => {
  const candidate = UserRepository.getByEmail(user.email)

  if(candidate) {
    if(candidate.password === user.password) {
      const token = jwt.sign({
        email: candidate.email,
        id: candidate.id
      }, jwtConfig.secretKey, {expiresIn: jwtConfig.expiresIn})
      return {
        success: true,
        token: `Bearer ${token}`
      }
    } else {
      return {
        success: false,
        message: "User with such password was not found"
      }
    }
  } else {
    return {
      success: false,
      message: "User with such email was not found"
    }
  }
};
