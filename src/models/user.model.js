import Sequelize from "sequelize";

module.exports = (sequelize) => {
  return sequelize.define('user', {
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    }
  }, {
    timestamps: true,
  });
};
