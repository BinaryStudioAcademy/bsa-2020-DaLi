import BaseRepository from "./baseRepo";
import models from "../models/index";

class UserRepository extends BaseRepository {
  getByEmail(email) {
    return this.model.findOne({ where: { email } });
  }
}

module.exports = new UserRepository(models.user);
