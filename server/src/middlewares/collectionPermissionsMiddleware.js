import UserRepository from '../repositories/userRepository';

export const collectionPermissionsMiddleware = async (req, res) => {
  const collectionsId = await UserRepository.getAllowedCollection(req.user.id);

  if (req.params.id) {
    return collectionsId.includes(res.data.id) ? res.send(res.data) : res.send({});
  }

  const { collections, ...rest } = res.data;
  const data = collections.filter((item) => collectionsId.includes(item.id) || req.user.id === item.users_id);
  return res.send({ collections: data, ...rest });
};
