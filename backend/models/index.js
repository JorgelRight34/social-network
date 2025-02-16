import Chat from "./chat.js";
import ChatMember from "./ChatMember.js";
import Comment from "./comment.js";
import JoinNetworkRequest from "./joinNetworkRequest.js";
import Like from "./like.js";
import Message from "./message.js";
import Network from "./network.js";
import NetworkAdmin from "./networkAdmin.js";
import NetworkMember from "./networkMember.js";
import Post from "./post.js";
import User from "./user.js";

// Post relationships
Post.belongsTo(User, { foreignKey: "userId" });
Post.belongsTo(Network, { foreignKey: "networkId" });
Post.hasMany(Comment, { foreignKey: "postId " });
Post.hasMany(Like, { foreignKey: "postId" });

// User relationships
User.hasMany(Post, { foreignKey: "userId" });
User.hasMany(Comment, { foreignKey: "userId" });

// Comment relationships
Comment.belongsTo(User, { foreignKey: "userId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

// Network relationships
NetworkAdmin.belongsTo(Network, { foreignKey: "networkId" });
NetworkAdmin.belongsTo(User, { foreignKey: "userId" });
NetworkMember.belongsTo(Network, { foreignKey: "networkId" });
NetworkMember.belongsTo(User, { foreignKey: "userId" });
Network.hasMany(NetworkMember, { foreignKey: "networkId" });
Network.hasMany(NetworkAdmin, { foreignKey: "networkId" });
Network.hasMany(JoinNetworkRequest, { foreignKey: "networkId" });

// Message relationships
Message.belongsTo(Chat, { foreignKey: "chatId" });
Message.belongsTo(ChatMember, { foreignKey: "senderId" });

// ChatMember relationships
ChatMember.belongsTo(Chat, { foreignKey: "chatId" });
ChatMember.belongsTo(User, { foreignKey: "userId" });

// Like relationships
Like.belongsTo(User, { foreignKey: "userId" });

// Join network requests
JoinNetworkRequest.belongsTo(User, { foreignKey: "userId" });

export { Comment, User, Post };
