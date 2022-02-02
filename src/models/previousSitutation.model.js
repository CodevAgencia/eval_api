import Sequelize from "sequelize";

import { sequelize } from "../database/database";


module.exports = (sequelize) => {
  return sequelize.define('previous_situtations', {
    sourceOfFunds: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    marketReady: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: true,
  });
}
