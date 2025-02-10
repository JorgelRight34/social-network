import { getPagination } from "../lib/utils.js";
import { Post } from "../models/index.js";
import { User } from "../models/index.js";
import Network from "../models/network.js";


export const createPost = async (req, res) => {
    const { title, body, networkId } = req.body;  // Get post data

    // Avoid empty fields
    if (!title || !body || !networkId) {
        return res.status(400).send("Please fill all the fields");
    }

    let post = await Post.create({
        userId: req.user.userId,
        networkId: networkId,
        title: title,
        body: body,
        media: req.files.map(file => file.filename)
    });

    post = await Post.findOne({
        where: {
            id: post.id
        },
        include: [User]
    })

    return res.status(201).json(post);
}


export const deletePost = async (req, res) => {
    const { postId } = req.params;
    let post;

    if (!postId) {
        return res.status(400).send('No post id provided');
    }
    
    try {
        post = await Post.findByPk(postId);
    } catch (err) {
        console.error(err);
        return res.status(500).send('An error has ocurred.')
    }
   
    if (!post) {
        return res.status(400).send('Post doesn\'t exist.');
    }

    if (post.userId.toString() !== req.user.userId.toString()) {
        return res.status(400).send('Forbidden.');
    }

    try {
        await post.destroy();
    } catch (err) {
        console.error(err);
        return res.status(500).send('An error has ocurred.')
    }

    return res.send('Post deleted.');
}


export const getPosts = async (req , res) => {
    try {
        const posts = await Post.findAll({
            include: [User, Network]
        });
        return res.json(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).send('An error has ocurred.');
    }
}


export const getNetworkPosts = async (req, res) => {
    try {
        const { networkName } = req.params;
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
       
        const network = await Network.findOne({
            where: {
                name: networkName
            },
        })

        if (!network) {
            return res.status(404).send('Network doesn\'t exist.')
        }

        const posts = await Post.findAll({
            limit,
            offset,
            where: {
                networkId: network.id
            },
            include: [User, Network]
        })

        return res.json(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).send('An error has ocurred.');
    }
}