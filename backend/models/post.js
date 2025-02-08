import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


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
    networkId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        required: false,
        references: {
            model: 'Networks',
            key: 'id',
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