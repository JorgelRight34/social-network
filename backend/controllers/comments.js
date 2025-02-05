import { Comment } from "../models/index.js";
import { User } from "../models/index.js";

export const createComment = async (req, res) => {
    const { content, postId } = req.body;

    if (!content || !postId) {
        return res.status(400).send('Please fill all the fields.')
    }

    let comment = await Comment.create({
        userId: req.user.userId,
        postId: postId,
        content: content
    }).catch(err => console.err(err))

    if (comment.errors?.length > 0) {
        return res.status(500);
    }

    comment = await Comment.findOne({
        where: {
            id: comment.id,
        }, 
        include: {
            model: User,
        }
    }).catch(err => console.log(err));

    if (comment.errors?.length > 0) {
        return res.status(500);
    }

    return res.status(201).json(comment)
}

export const getPostComments = async (req, res) => {
    const postId = req.params.postId;
    let comments;

    try {
        comments = await Comment.findAll({
            include: [
                {
                    model: User,
                }
            ],
            where: {
                postId
            }
        });
    } catch (error) {
        console.error(error)
        return res.status(500);
    }
    
    console.log("Returning")
    return res.status(200).json(comments);
}