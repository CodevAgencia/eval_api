import { Sequelize } from "sequelize";
import * as bcrypt from "bcryptjs";

import {configDb} from '../config/environment';

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
    }
  }
);

export const User = sequelize.import(`${__dirname}/../models/user.model`);
export const GeneralData = sequelize.import(`${__dirname}/../models/generalData.model`);
export const PreviousSitutation = sequelize.import(`${__dirname}/../models/previousSitutation.model`);

User.hasOne(GeneralData);
GeneralData.belongsTo(User);

User.hasOne(PreviousSitutation);
PreviousSitutation.belongsTo(User);

sequelize.sync();



