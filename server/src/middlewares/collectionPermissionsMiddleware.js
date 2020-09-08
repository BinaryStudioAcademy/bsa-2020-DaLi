import UserRepository from '../repositories/userRepository';
import { PRIVATE_COLLECTIONS } from '../config/types';

export const collectionPermissionsMiddleware = async (req, res) => {
  const collectionsId = await UserRepository.getAllowedCollection(req.user.id);

  if (res.data.name === PRIVATE_COLLECTIONS) {
    return res.data.users_id === req.user.id ? res.send(res.data) : res.send({});
  }

  if (req.params.id) {
    return collectionsId.includes(res.data.id) ? res.send(res.data) : res.send({});
  }

  const { collections, ...rest } = res.data;
  const data = collections.filter((item) => collectionsId.includes(item.id) || req.user.id === item.users_id);
  return res.send({ collections: data, ...rest });
};
