import { Op } from 'sequelize';
import models from '../models/index';
import BaseRepository from './baseRepository';
import UserGroupsRepository from './userGroupsRepository';
import UsersUserGroupsRepository from './usersUserGroupsRepository';
import { ALL_USERS_GROUP, ADMIN_GROUP } from '../config/types';

class UserRepository extends BaseRepository {
  addUser(user) {
    return this.create(user);
  }

  getByEmail(email) {
    return this.model.findOne({ where: { email } });
  }

  getUserById(id) {
    return this.model.findOne({ where: { id } });
  }

  getAllowedCollection(id) {
    return this.model
      .findAll({
        where: { id },
        attributes: [],
        raw: true,
        nest: true,
        include: [
          {
            model: models.UserGroups,
            attributes: [],
            through: { attributes: [] },
            raw: true,
            nest: true,
            include: [
              {
                model: models.PermissionCollections,
                attributes: [],
                where: {
                  [Op.or]: [{ permissionGranted: 'granted' }, { permissionGranted: 'limited' }],
                },
                include: [
                  {
                    model: models.Collection,
                    as: 'collections',
                    attributes: ['id'],
                  },
                ],
              },
            ],
          },
        ],
      })
      .then((result) => result.map((el) => el.UserGroups.PermissionCollections.collections.id))
      .then((result) => [...new Set(result)]);
  }

  async createUsersWithDefaultGroups(user) {
    const allGroups = await UserGroupsRepository.getAll();
    const allUsersGroupID = allGroups.filter((group) => group.name === ALL_USERS_GROUP)[0].id;
    const allUserGroup = await UserGroupsRepository.getWithUsers(allUsersGroupID);
    const userCount = allUserGroup[0].Users.length;
    const result = await this.model.create(user);
    await UsersUserGroupsRepository.create({ users_id: result.id, userGroups_id: allUsersGroupID });
    if (!userCount) {
      const AdminGroupID = allGroups.filter((group) => group.name === ADMIN_GROUP)[0].id;
      await UsersUserGroupsRepository.create({ users_id: result.id, userGroups_id: AdminGroupID });
    }
    return result;
  }
}

export default new UserRepository(models.User);
