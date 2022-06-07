import Sequelize from 'sequelize';

module.exports = (sequelize) => sequelize.define('questions', {
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
    type: Sequelize.ENUM([
      'TEXT', 'DATE', 'LIST', 'BOOLEAN', 'NUMBER', 'DOUBLE', 'TABLE_TEAM_TEXT', 'TABLE_TEAM_BOOLEAN', 'TABLE_TEAM_NUMBER', 'TABLE_TEAM_DATE', 'TABLE_TEAM_LIST',
    ]),
    allowNull: false,
  },
  values: {
    type: Sequelize.JSON,
    allowNull: true, // Modifier DataBase
  },
  observation: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  adequatePerformance: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  order: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  subtema: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  percentage: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

// {
// "thematicId": 1,
// "question": "¿Cuál es el nombre de su emprendimiento/Compañía?",
// "code": "DG_1",
// "criterion": "Nombre de la Compañía",
// "type": "TEXT",
// "values",
// "observation",
// "adequatePerformance"
// }
