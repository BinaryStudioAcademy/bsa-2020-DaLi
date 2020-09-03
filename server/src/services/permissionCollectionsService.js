import UserGroupsRepository from '../repositories/userGroupsRepository';
import CollectionRepository from '../repositories/collectionRepository';
import PermissionCollectionsRepository from '../repositories/permissionCollectionsRepository';
import { ACCESS_GRANTED, ACCESS_DENIED, ADMIN_GROUP } from '../config/types';

export const setInitialCollectionsPermissions = async (collectionId) => {
  const groups = await UserGroupsRepository.getAll();
  groups.forEach(async (group) => {
    const permission = group.name === ADMIN_GROUP ? ACCESS_GRANTED : ACCESS_DENIED;
    await PermissionCollectionsRepository.create({
      userGroups_id: group.id,
      permissionGranted: permission,
      collections_id: collectionId,
    });
  });
};

export const setInitialCollectionPermissionsOnGroupAdd = async (groupId) => {
  const collections = await CollectionRepository.getAllCollections();
  collections.forEach(async (collection) => {
    const permission = ACCESS_DENIED;
    await PermissionCollectionsRepository.create({
      userGroups_id: groupId,
      permissionGranted: permission,
      collections_id: collection.id,
    });
  });
};

const formatResult = (data) => {
  return data
    .map((el) => {
      return {
        id: el.collections.id,
        name: el.collections.name,
        description: el.collections.description,
        groups: [{ id: el.userGroups.id, name: el.userGroups.name, access: el.permissionGranted }],
      };
    })
    .reduce((acc, item) => {
      const id = item.id;
      const index = acc.findIndex((el) => el.id === id);

      if (index !== -1) {
        acc[index].groups.push(item.groups[0]);
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
};

export const getPermissions = async () => {
  const result = await PermissionCollectionsRepository.getAllWithGroupsAndCollections();
  return formatResult(result);
};

export const getCollectionPermissions = async (collectionsId) => {
  const result = await PermissionCollectionsRepository.getAllWithGroupsAndCollections();
  return formatResult(result).filter((collection) => collection.id === collectionsId)[0];
};

export const updateCollectionPermissions = async (permissions) => {
  const result = await Promise.all(
    permissions.map(async (permission) => {
      const result = await PermissionCollectionsRepository.updateById({ id: permission.id }, permission);
      return result;
    })
  );
  return result;
};
