import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const NetworkAdmin = sequelize.define('NetworkAdmin', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        allowNull: false,
        required: true,
        onDelete: 'CASCADE'
    },
    networkId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Networks',
            key: 'id'
        },
        allowNull: false,
        required: true,
        onDelete: 'CASCADE'
    }
}, { timestamps: true })

export default NetworkAdmin