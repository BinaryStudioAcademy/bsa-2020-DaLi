import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import bcrypt from 'bcrypt';
import jwtConfig from '../config/jwt.config';
import UserRepository from '../repositories/userRepository';
import UserGroupsRepository from '../repositories/userGroupsRepository';
import UsersUserGroupsRepository from '../repositories/usersUserGroupsRepository';

export const login = async (user) => {
  const candidate = await UserRepository.getByEmail(user.email);
  if (candidate) {
    // hashed password
    // if (bcrypt.compareSync(user.password, candidate.password)) {
    // not hashed password
    if (candidate.password === user.password) {
      const { id, email, firstName, lastName } = candidate;
      await UserRepository.updateById({ id }, { lastLogin: new Date(Date.now()) });
      const token = jwt.sign(
        {
          id,
        },
        jwtConfig.secretKey,
        { expiresIn: jwtConfig.expiresIn }
      );
      return {
        status: 200,
        response: {
          success: true,
          token,
          user: { id, email, firstName, lastName },
        },
      };
    }
    return {
      status: 401,
      response: {
        success: false,
        message: 'Wrong password entered',
      },
    };
  }
  return {
    status: 404,
    response: {
      success: false,
      message: 'User with such email was not found',
    },
  };
};

export const register = async (user) => {
  const candidate = await UserRepository.getByEmail(user.email);
  if (!candidate) {
    const salt = bcrypt.genSaltSync(10);
    const allGroups = await UserGroupsRepository.getAll();
    const allUsersGroupID = allGroups.filter(group => group.name==='All Users')[0].id;
    const newUser = await UserRepository.create(Object.assign({}, user, { password:  bcrypt.hashSync(user.password, salt)}));
    await UsersUserGroupsRepository.create({users_id: newUser.id, userGroups_id: allUsersGroupID});
    return {
      status: 201,
      response: {
        success: true,
        user: newUser,
      },
    };
  }
  return {
    status: 409,
    response: {
      success: false,
      message: 'User with such email already exists',
    },
  };
};

export const getUserByToken = async (token) => {
  const { id } = jwtDecode(token);
  const candidate = await UserRepository.getById({ id });
  if (!candidate) {
    return {
      status: 404,
      response: {
        success: false,
        message: 'User not found',
      },
    };
  }

  const { firstName, lastName, email } = candidate;
  return {
    status: 200,
    response: {
      success: true,
      token: token.replace('Bearer ', ''),
      user: { id, email, firstName, lastName },
    },
  };
};
