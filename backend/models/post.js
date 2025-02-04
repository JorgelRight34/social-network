import moongose from "mongoose";

const postSchema = new moongose.Schema({
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    media: {
        type: Array,
        required: false
    }
}, { timestamps: true })

const Post = moongose.model('Post', postSchema);

export default Post