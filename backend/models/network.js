import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Network = sequelize.define('Network', {
    name: {
        type: DataTypes.STRING,
        validate: {
            len: [0, 255]
        },
        unique: true,
    },
    description: {
        type: DataTypes.STRING
    },
    profilePic: {
        type: DataTypes.STRING
    },
    wallpaper: {
        type: DataTypes.STRING
    }
}, { timestamps: true })

export default Network