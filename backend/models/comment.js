import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js";
import Post from "./post.js";

const Comment = sequelize.define('Comment', {
    userId: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE'
    },
    postId: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
        references: {
            model: Post,
            key: 'id',
        },
        onDelete: 'CASCADE'
    },
    content: {
        type: DataTypes.TEXT,
        required: true,
        allowNull: false
    }
}, { timestamps: true })

export default Comment