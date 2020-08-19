import models from '../models/index';
import BaseRepository from './baseRepository';

class UsersUserGroupsRepository extends BaseRepository {}

export default new UsersUserGroupsRepository(models.UsersUserGroups);
