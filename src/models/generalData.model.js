import Sequelize from "sequelize";

import { INDUSTRY_OPTIONS, SECTOR_OPTIONS, STATE_DEVELOPMENT_OPTIONS } from "../constants/generalData";

module.exports = (sequelize) => {
  return sequelize.define('general_datas', {
    nameOfCompany: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    dateOfCreation: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    stateDevelopment: {
      type: Sequelize.ENUM(STATE_DEVELOPMENT_OPTIONS),
      allowNull: false,
    },
    sector: {
      type: Sequelize.ENUM(SECTOR_OPTIONS),
      allowNull: false,
    },
    industry: {
      type: Sequelize.ENUM,
      values: INDUSTRY_OPTIONS,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
}
