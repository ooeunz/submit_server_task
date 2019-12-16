module.exports = (sequelize, Datatypes) => {
  return sequelize.define('user', {
    name: {
      type: Datatypes.STRING(20),
      allowNull: false,
      unique: true
    },
    age: {
      type: Datatypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    comment: {
      type: Datatypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: true,
  });
};