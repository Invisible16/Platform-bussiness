const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const model = sequelizeClient.define(
    'user',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      permissions: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      timestamps: true,
      freezeTableName: false
    }
  );

  // eslint-disable-next-line no-unused-vars
  model.associate = function(models) {
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return model;
};
