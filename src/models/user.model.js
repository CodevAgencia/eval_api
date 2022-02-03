import Sequelize from 'sequelize';

module.exports = (sequelize) => sequelize.define('user', {
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});
