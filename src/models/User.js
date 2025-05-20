const { db, DataTypes, Model } = require("../../db/connection");

class User extends Model {}

User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    sequelize: db,
    modelName: "user"
});

module.exports = User;