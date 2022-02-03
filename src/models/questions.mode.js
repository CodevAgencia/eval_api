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
    criterion: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    question: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    values: {

    }
  }, {
    timestamps: true,
  });
}
