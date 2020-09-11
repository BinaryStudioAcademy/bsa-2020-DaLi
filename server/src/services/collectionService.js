import createError from 'http-errors';
import CollectionRepository from '../repositories/collectionRepository';
import VisualizationRepository from '../repositories/visualizationRepository';
import DashboardRepository from '../repositories/dashboardRepository';
import { setInitialCollectionsPermissions } from './permissionCollectionsService';
import * as UserGroupsService from './userGroupsService';

export const getCollections = async (id) => {
  const collections = await CollectionRepository.getAllCollections(id);
  const defaultCollection = await CollectionRepository.getDefaultCollections();
  return { collections, defaultCollection };
};

export const createCollection = async (data, userId) => {
  const result = await CollectionRepository.create(data);
  const userGroups = await UserGroupsService.getGroupsByUser(userId);
  const userGroupsId = userGroups.map((group) => group.UserGroup.id);

  await setInitialCollectionsPermissions(result.id, userGroupsId);
  return result;
};

export const deleteCollection = async (id) => {
  const item = await CollectionRepository.getById({ id });
  if (!item) {
    throw createError(404, `Collection with id of ${id} not found`);
  }

  await CollectionRepository.deleteById({ id });
  const visualizations = await VisualizationRepository.getAllVisualizationsWithoutCollections();
  const dashboards = await DashboardRepository.getAllDashboardsWithoutCollections();
  const initialCollectionId = await CollectionRepository.getInitialCollectionId();

  visualizations.forEach(async ({ id, ...rest }) => {
    await VisualizationRepository.updateById(
      { id },
      {
        ...rest,
        collections_id: initialCollectionId,
      }
    );
  });

  dashboards.forEach(async ({ id, ...rest }) => {
    await DashboardRepository.updateById(
      { id },
      {
        ...rest,
        collections_id: initialCollectionId,
      }
    );
  });
  return { status: 'Collection deleted success' };
};

export const updateCollections = async (collectionId, dataToUpdate) => {
  const item = await CollectionRepository.getById({ id: collectionId });
  if (!item) {
    throw createError(404, `Visualization with id of ${collectionId} not found`);
  }

  const result = await CollectionRepository.updateById({ id: collectionId }, dataToUpdate);
  return result;
};

export const getCollection = async (id) => {
  const item = await CollectionRepository.getCollection(id.id);
  if (!item) {
    throw createError(404, `Collection with id of ${id.id} not found`);
  }
  return item;
};
