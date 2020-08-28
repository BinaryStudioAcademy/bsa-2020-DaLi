import UserRepository from '../repositories/userRepository';
import * as AuthService from '../services/authService';

export const permissionsMiddleware = async (req, res) => {
  // Need update token logic, after fix passport
  const token = req.headers.authorization;
  const { response } = await AuthService.getUserByToken(token);

  let dataId = [];
  if (req.path.includes('tables')) {
    dataId = await UserRepository.getAllowedTables(response.user.id);
  } else {
    dataId = await UserRepository.getAllowedDatabases(response.user.id);
  }

  const data = res.data.filter((item) => dataId.includes(item.id));

  console.log(data);
  return res.send(data);
};
