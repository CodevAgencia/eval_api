import Sequelize from 'sequelize';

module.exports = (sequelize) => sequelize.define('user', {
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  role: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER,
    default: 0,
  },
}, {
  timestamps: true,
});
