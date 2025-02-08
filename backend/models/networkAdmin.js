import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const NetworkAdmin = sequelize.define('NetworkAdmin', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    networkId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Networks',
            key: 'id'
        }
    }
})

export default NetworkAdmin