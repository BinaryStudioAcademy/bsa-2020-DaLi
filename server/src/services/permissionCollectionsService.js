import UserGroupsRepository from '../repositories/userGroupsRepository';
import CollectionRepository from '../repositories/collectionRepository';
import PermissionCollectionsRepository from '../repositories/permissionCollectionsRepository';
import { ACCESS_GRANTED, ACCESS_DENIED, DEFAULT_COLLECTIONS } from '../config/types';

export const setInitialCollectionsPermissions = async (collectionId, usersGroupsId) => {
  const groups = await UserGroupsRepository.getAll();
  groups.forEach(async (group) => {
    const permission = usersGroupsId.includes(group.id) ? ACCESS_GRANTED : ACCESS_DENIED;
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
    const permission = collection.name === DEFAULT_COLLECTIONS ? ACCESS_GRANTED : ACCESS_DENIED;
    await PermissionCollectionsRepository.create({
      userGroups_id: groupId,
      permissionGranted: permission,
      collections_id: collection.id,
    });
  });
};

export const getPermissions = async () => {
  const result = await CollectionRepository.getAllWithGroupsPermission();
  return result;
};

export const getCollectionPermissions = async (collectionsId) => {
  const result = await CollectionRepository.getCollectionWithGroupsPermission(collectionsId);
  return result;
};

export const updateCollectionPermissions = async ({ permissions }) => {
  const result = await permissions.map(async (permission) => {
    const { collectionId, groups } = permission;
    groups.map(async (group) => {
      const { groupId, access } = group;
      await PermissionCollectionsRepository.updatePermissionByGroupIdAndCollectionId(collectionId, groupId, {
        permissionGranted: access,
      });
    });
  });

  return result;
};
