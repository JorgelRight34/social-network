import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const ChatMember = sequelize.define('ChatMember', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: 'Users'
        },
        onDelete: 'CASCADE'
    },
    chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: 'Chats'
        },
        onDelete: 'CASCADE'
    }
}, { timestamps: true });

export default ChatMember