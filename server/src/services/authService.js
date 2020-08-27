import UserRepository from '../repositories/userRepository';
import UserGroupsRepository from '../repositories/userGroupsRepository';
import UsersUserGroupsRepository from '../repositories/usersUserGroupsRepository';
import { createToken } from '../helpers/tokenHelper';
import { encrypt } from '../helpers/cryptoHelper';

export const login = async (data) => {
  const currentUser = await UserRepository.getUserById(data.id);
  const { id, email, firstName, lastName } = currentUser;
  return {
    token: createToken({ id }),
    user: { id, email, firstName, lastName },
  };
};

export const register = async (user) => {
  const candidate = await UserRepository.getByEmail(user.email);
  if (!candidate) {
    const allGroups = await UserGroupsRepository.getAll();
    const allUsersGroupID = allGroups.filter((group) => group.name === 'All Users')[0].id;
    const hashPassword = await encrypt(user.password);
    const newUser = await UserRepository.create({ ...user, password: hashPassword });
    await UsersUserGroupsRepository.create({ users_id: newUser.id, userGroups_id: allUsersGroupID });
    return {
      user: newUser,
    };
  }
};

export const autoLogin = async (id, token) => {
  const candidate = await UserRepository.getById({ id });
  const { firstName, lastName, email } = candidate;
  return {
    token: token.split(' ')[1],
    user: { id, email, firstName, lastName },
  };
};
