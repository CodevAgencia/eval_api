import Sequelize from 'sequelize';

module.exports = (sequelize) => sequelize.define('partners', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});
