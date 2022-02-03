export class Service {
  constructor(Entity) {
    this.entity = new Entity();
  }

  static getById(id) {
    return this.entity.findByPk(id);
  }

  static getOne(filters) {
    return this.entity.findOne({
      where: filters,
    });
  }

  static getAll() {
    return this.entity.findAll();
  }

  static getAllWithFilter(filters) {
    return this.entity.findAll({
      where: filters,
    });
  }

  static create(data) {
    return this.entity.create(data);
  }
}
