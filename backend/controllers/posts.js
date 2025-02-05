import { Post } from "../models/index.js";
import { User } from "../models/index.js";


export const createPost = async (req, res) => {
    const { title, body } = req.body;  // Get post data

    // Avoid empty fields
    if (!title || !body) {
        return res.status(400).send("Please fill all the fields");
    }

    const post = await Post.create({
        userId: req.user.userId,
        title: title,
        body: body,
        media: req.files.map(file => file.filename)
    });

    return res.status(201).json(post);
}


export const deletePost = async (req, res) => {
    const { postId } = req.params;

    if (!postId) {
        return res.status(400).send('No post id provided');
    }

    const post = await Post.findByPk(postId);

    if (!post) {
        return res.status(400).send('Post doesn\'t exist');
    }

    if (post.userId.toString() !== req.user.userId.toString()) {
        return res.status(400).send('Forbidden');
    }

    await post.destroy();
    return res.send('Post deleted');
}


export const getPosts = async (req , res) => {
    let posts = await Post.findAll({
        include: {
            model: User
        }
    });
    return res.json(posts);
}