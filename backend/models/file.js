const { Sequelize, Model, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_CONNECTION_STRING || "fallback-connection-string"
);

class File extends Model {}
File.init(
  {
    description: DataTypes.STRING,
    filePath: DataTypes.STRING,
  },
  { sequelize, modelName: "file" }
);

sequelize.sync();

module.exports = File;
