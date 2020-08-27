import models from '../models/index';
import BaseRepository from './baseRepository';

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
}

export default new UserRepository(models.User);
