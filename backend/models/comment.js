import moongose from "mongoose";

const CommentSchema = new moongose.Schema({
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    content: {
        type: String
    }
})
const Comment = moongose.model('Comment', CommentSchema);

export default Comment