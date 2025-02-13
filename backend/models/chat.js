import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Chat = sequelize.define('Chat', {
    
}, { timestamps: true });

export default Chat