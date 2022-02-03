import Sequelize from 'sequelize';

module.exports = (sequelize) => sequelize.define('responses', {
  value: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});
