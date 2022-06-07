export class Service {
  constructor(Entity) {
    this.entity = Entity;

    this.getById = this.getById.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getAllWithFilter = this.getAllWithFilter.bind(this);
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.bulkCreate = this.bulkCreate.bind(this);
    this.update = this.update.bind(this);
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
    return this.entity.findAll();
  }

  getAllWithFilter(filters) {
    try {
      return this.entity.findAll({
        where: filters,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  create(data) {
    return this.entity.create(data);
  }

  bulkCreate(data) {
    return this.entity.bulkCreate(data);
  }

  update(data, conditions) {
    return this.entity.update({
      ...data,
      updatedAt: new Date(),
    }, {
      where: conditions,
    });
  }
}
