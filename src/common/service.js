export class Service {
  constructor(Entity) {
    this.entity = Entity;

    this.getById = this.getById.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getAllWithFilter = this.getAllWithFilter.bind(this);
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  getById(id) {
    return this.entity.findByPk(id);
  }

  getOne(filters) {
    return this.entity.findOne({
      where: filters,
    });
  }

  getAll() {
    console.log(this.entity);
    return this.entity.findAll();
  }

  getAllWithFilter(filters) {
    return this.entity.findAll({
      where: filters,
    });
  }

  create(data) {
    return this.entity.create(data);
  }
}
