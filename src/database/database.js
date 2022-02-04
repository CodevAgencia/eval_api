import { Sequelize } from 'sequelize';

import { configDb } from '../config/environment';

const sequelize = new Sequelize(
  configDb.database,
  configDb.username,
  configDb.password,
  {
    host: configDb.host,
    dialect: configDb.type,
    pool: {
      max: 5,
      min: 0,
    },
    sync: {
      force: false,
    },
  },
);

export const User = sequelize.import(`${__dirname}/../models/user.model`);
export const Group = sequelize.import(`${__dirname}/../models/group.model`);
export const Partner = sequelize.import(`${__dirname}/../models/partner.model`);
export const Thematic = sequelize.import(`${__dirname}/../models/thematic.model`);
export const Question = sequelize.import(`${__dirname}/../models/question.model`);
export const Response = sequelize.import(`${__dirname}/../models/response.model`);

Group.hasMany(Thematic);
Thematic.belongsTo(Group);

Thematic.hasMany(Question);
Question.belongsTo(Thematic);

User.hasMany(Response);
Response.belongsTo(User);

Question.hasMany(Response);
Response.belongsTo(Question);

User.hasMany(Partner);
Partner.belongsTo(User);

sequelize.sync();
