import { Op } from "sequelize";
import { getPagination } from "../lib/utils.js";
import { Post } from "../models/index.js";
import { User } from "../models/index.js";
import Network from "../models/network.js";
import Like from "../models/like.js";

export const createPost = async (req, res) => {
  const { title, body, networkId } = req.body; // Get post data

  // Avoid empty fields
  if (!title || !body || !networkId) {
    return res.status(400).send("Please fill all the fields");
  }

  let post = await Post.create({
    userId: req.user.userId,
    networkId: networkId,
    title: title,
    body: body,
    media: req.files.map((file) => file.filename),
  });

  post = await Post.findOne({
    where: {
      id: post.id,
    },
    include: [User],
  });

  return res.status(201).json(post);
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;
  let post;

  if (!postId) {
    return res.status(400).send("No post id provided");
  }

  try {
    post = await Post.findByPk(postId);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }

  if (!post) {
    return res.status(400).send("Post doesn't exist.");
  }

  if (post.userId.toString() !== req.user.userId.toString()) {
    return res.status(400).send("Forbidden.");
  }

  try {
    await post.destroy();
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }

  return res.send("Post deleted.");
};

export const getPosts = async (req, res) => {
  try {
    const { page, size, q } = req.query;
    const username = req.query?.user;
    const { limit, offset } = getPagination(page, size);
    let user;

    console.log(req.user);
    if (username) {
      user = await User.findOne({ where: { username: username } });
      if (!user) {
        return res.status(404).send("User not found.");
      }
    }

    const whereClause = {
      ...(q && {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { body: { [Op.like]: `%${q}%` } },
        ],
      }),
      ...(user && { userId: user.id }), // Add userId condition if it's provided
    };

    let posts = await Post.findAll({
      limit,
      offset,
      include: [User, Network, Like],
      where: whereClause,
    });

    posts = await Promise.all(
      posts.map(async (post) => ({
        ...post.dataValues,
        User: {
          username: post.User.username,
          id: post.User.id,
          email: post.User.email,
          profilePic: post.User.profilePic,
        },
        ...(req?.user?.userId && {
          hasLiked: await Like.findOne({
            where: {
              postId: post.id,
              userId: req.user.userId,
            },
          }),
        }),
      }))
    );

    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }
};

export const getNetworkPosts = async (req, res) => {
  try {
    const { networkName } = req.params;
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const network = await Network.findOne({
      where: {
        name: networkName,
      },
    });

    if (!network) {
      return res.status(404).send("Network doesn't exist.");
    }

    let posts = await Post.findAll({
      limit,
      offset,
      where: {
        networkId: network.id,
      },
      include: [User, Network, Like],
    });

    posts = await Promise.all(
      posts.map(async (post) => ({
        ...post.dataValues,
        User: {
          username: post.User.username,
          id: post.User.id,
          email: post.User.email,
          profilePic: post.User.profilePic,
        },
        ...(req?.user?.userId && {
          hasLiked: await Like.findOne({
            where: {
              postId: post.id,
              userId: req.user.userId,
            },
          }),
        }),
      }))
    );

    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.body;

    const hasLiked = await Like.findOne({
      where: {
        userId: req.user?.userId,
        postId: postId,
      },
    });

    if (hasLiked) {
      return res.status(400).send("You have already liked this post.");
    }

    const like = await Like.create({
      userId: req.user?.userId,
      postId: postId,
    });

    return res.status(201).json(like);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { postId } = req.body;

    const hasLiked = await Like.findOne({
      where: {
        userId: req.user?.userId,
        postId: postId,
      },
    });

    if (!hasLiked) {
      return res.status(400).send("You have not liked this post.");
    }

    const like = await Like.findOne({
      where: {
        userId: req.user?.userId,
        postId: postId,
      },
    });

    await like.destroy();

    return res.status(200);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }
};
