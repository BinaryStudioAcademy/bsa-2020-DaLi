export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    const result = await this.model.findAll();
    return result;
  }

  async getById({ id }) {
    const result = await this.model.findByPk(id);
    return result;
  }

  async create(data) {
    const result = await this.model.create(data);
    return result;
  }

  async updateById({ id }, data) {
    console.log('update');
    console.log(id);
    console.log(data);
    const result = await this.model.update(data, {
      where: { id },
      returning: true,
      plain: true,
    });

    return result[1];
  }

  async deleteById({ id }) {
    const result = await this.model.destroy({
      where: { id },
    });
    return result;
  }
}
