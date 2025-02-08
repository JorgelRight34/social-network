import Comment from "./comment.js";
import Network from "./network.js";
import NetworkAdmin from "./networkAdmin.js";
import Post from "./post.js";
import User from "./user.js";

// Post relationships
Post.belongsTo(User, { foreignKey: 'userId' });
Post.belongsTo(Network, { foreignKey: 'networkId'});
Post.hasMany(Comment, { foreignKey: 'postId '});

// User relationships
User.hasMany(Post, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });

// Comment relationships
Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

// Network relationships
NetworkAdmin.belongsTo(Network, { foreignKey: 'networkId' });
NetworkAdmin.belongsTo(User, { foreignKey: 'userId' });

export { Comment, User, Post }