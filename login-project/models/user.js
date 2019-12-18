module.exports = (sequelize, Datatypes) => {
  return sequelize.define('user', {
    email: {
      type: Datatypes.STRING(20),
      allowNull: false,
      unique: true
    },
    username: {
      type: Datatypes.STRING(20),
      allowNull: false,
      unique: true
    },
    password: {
      type: Datatypes.STRING(20),
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: true,
  });
};