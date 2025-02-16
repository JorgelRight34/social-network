import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Like = sequelize.define(
  "Like",
  {
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Posts",
      },
      allowNull: false,
      required: true,
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
      },
      allowNull: false,
      required: true,
      onDelete: "CASCADE",
    },
  },
  { timestamps: true }
);

export default Like;
