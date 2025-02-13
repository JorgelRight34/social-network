import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.js";
import sequelize from "./config/db.js";
import { Server } from "socket.io";
import { createServer } from "http";
import Message from "./models/message.js";
import Chat from "./models/chat.js";
import ChatMember from "./models/ChatMember.js";
import User from "./models/user.js";

// REST API
const app = express();
const PORT = 3000;

// Socket server
const server = createServer(app);
const io = new Server(server);

// Middlewares
app.use(morgan('dev')); // Logs
app.use(cors());    // CORS policies
app.use('/static', express.static(`./${process.env.STATIC_URL}`))
app.use(express.json());    // Parse body requests to JSON

// Routes
app.use('/', router);

// Run migrations
sequelize.sync({ alter: true, logging: false })
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Error syncing database', err));

const users = {}
const usernames = {}
// Start socket server
io.on('connection', (socket) => {
    socket.on("register", (userId) => {
        console.log("new user registered", userId)
        users[userId] = socket.id;
        usernames[socket.id] = userId;
    });

    socket.on('send-chat-message', async (msg) => {
        let chat;
        let chatId = msg.chatId;
        let senderId = msg.senderUserId;
        console.log(msg);
    
        if (!chatId) {
            // If new chat then there's not chatId, let's 
            // create a chat and also the members of it
            chat = await Chat.create({});   // New chat

            // Sender is now a member of chat
            const sender = await ChatMember.create({
                userId: msg.senderUserId,
                chatId: chat.id
            });
            senderId = sender.id;

            // Receiver is now a member of chat
            const receiver = await ChatMember.create({
                userId: msg.receiverUserId,
                chatId: chat.id
            });
        }
        
        // Get user
        const user = await User.findByPk(msg.senderUserId);

        // Create new message
        const newMessage = {
            chatId: msg.chatId || chat.id,
            senderId: msg.senderId || senderId,
            content: msg.content,
        }

        console.log("new message", newMessage);

        const message = await Message.create(newMessage);
        console.log("A message has been created");

        // Emit message to the members
        console.log("to", users[msg.receiverUserId]);
        io.to([users[msg.receiverUserId], users[msg.senderUserId]]).emit('chat-message', {...message.dataValues, user});
    })

    socket.on("disconnect", () => {
        if (users[usernames?.[socket?.id]]) {
            delete users[usernames[socket.id]];
            delete usernames[socket.id];
        }
    })
})

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
})
