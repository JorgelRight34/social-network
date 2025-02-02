import moongose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await moongose.connect(process.env.DB_URI);
        console.log(`Connected to MongoDB successfully ${conn.connection.host}`);
    } catch (err) {
        console.log('An error ocurred trying to connect to MongoDD:', err.message);
        process.exit(1);
    }
}