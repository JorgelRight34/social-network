import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Message = sequelize.define('Message', {
    chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: 'Chats'
        },
        onDelete: 'CASCADE'
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: 'ChatMembers',
        },
        onDelete: 'CASCADE'
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    }
})

export default Message