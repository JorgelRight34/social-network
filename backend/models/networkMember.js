import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const NetworkMember = sequelize.define("NetworkMember", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true,
    references: {
      model: "Users",
    },
    onDelete: "CASCADE",
  },
  networkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true,
    references: {
      model: "Networks",
    },
    onDelete: "CASCADE",
  },
});

export default NetworkMember;
