import models from '../models/index';
import BaseRepository from './baseRepository';

class UserRepository extends BaseRepository {
  addUser(user) {
    return this.create(user);
  }

  getByEmail(email) {
    return this.model.findOne({ where: { email } });
  }
}

export default new UserRepository(models.User);
