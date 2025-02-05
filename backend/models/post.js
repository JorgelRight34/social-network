import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js";

const Post = sequelize.define('Post', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        validate: {
            len: [1, 255]
        }
    },
    body: {
        type: DataTypes.TEXT,
        required: false,
        allowNull: true,
    },
    media: {
        type: DataTypes.JSON,
        required: false
    }
}, { timestamps: true });

export default Post