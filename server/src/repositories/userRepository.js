import models from '../models/index';
import BaseRepository from './baseRepository';

class UserRepository extends BaseRepository {
  getByEmail(email) {
    return this.model.findOne({ where: { email } });
  }
}

export default new UserRepository(models.user);