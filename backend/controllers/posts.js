import Post from "../models/post.js";
import path from "path";
import fs from "fs";


export const createPost = async (req, res) => {
    const { title, body } = req.body;  // Get post data

    // Avoid empty fields
    if (!title || !body) {
        return res.status(400).send("Please fill all the fields");
    }

    // Check if media has been uploades
    /*
    let filenames;
    const media = req.files
    if (media) {
        // Get filenames and upload files to "/static"
        filenames = media.map((filename) => {
            const buffer = Buffer.from(filename, "base64"); // Conver base64 string to binary
            const name =  `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`    // Unique name
            const filepath = path.join(`./`, "static", name);
            fs.writeFile(filepath, buffer, (err) => console.log(err));
            return name;
        });
    }
    */
    const post = new Post({
        user: req.user.userId,
        title: title,
        body: body,
        media: req.files.map(file => file.filename)
    });

    await post.save();
    return res.json(post);
}


export const deletePost = async (req, res) => {
    const { postId } = req.params;

    if (!postId) {
        return res.status(400).send('No post id provided');
    }

    const post = await Post.findOne({ _id: postId });

    if (!post) {
        return res.status(400).send('Post doesn\'t exist');
    }

    if (post.user.toString() !== req.user.userId.toString()) {
        console.log(`${post.user} !== ${req.user.userId}`)
        return res.status(400).send('Forbidden');
    }

    await Post.findByIdAndDelete(postId);
    return res.send('Post deleted');
}


export const getPosts = async (req , res) => {
    let posts = await Post.find().populate('user');
    return res.json(posts);
}