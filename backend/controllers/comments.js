import Comment from "../models/comment.js";
import Post from "../models/post.js";

export const createComment = async (req, res) => {
    const { content, postId } = req.body;
    console.log(req.body);

    if (!content || !postId) {
        return res.status(400).send('Please fill all the fields.')
    }

    const comment = new Comment({
        user: req.user.userId,
        post: postId,
        content: content
    })

    await comment.save();

    return res.json(comment)
}

export const getPostComments = async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId }).populate("user");
    return res.json(comments);
}