import Sequelize from "sequelize";

module.exports = (sequelize) => {
  return sequelize.define('thematics', {
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
}
