import Sequelize from 'sequelize';

module.exports = (sequelize) => sequelize.define('questions', {
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
    type: Sequelize.ENUM([
      'TEXT', 'DATE', 'LIST', 'BOOLEAN', 'NUMBER', 'TABLE_TEAM_TEXT', 'TABLE_TEAM_BOOLEAN', 'TABLE_TEAM_NUMBER', 'TABLE_TEAM_DATE', 'TABLE_TEAM_DATE',
    ]),
    allowNull: false,
  },
  values: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  observation: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  adequatePerformance: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});
