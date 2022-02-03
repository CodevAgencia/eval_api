import Sequelize from 'sequelize';

module.exports = (sequelize) => sequelize.define('groups', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});
