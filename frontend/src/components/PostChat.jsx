import { useEffect, useState } from "react";
import api from "../api";
import useFormInput from "../hooks/useFormInput"

const PostChat = ({ post }) => {
    const [formData, setFormData] = useFormInput();
    const [comments, setComments] = useState([]);

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        let response;

        try {
            response = await api.post('comments/', {
                content: formData.content,
                postId: post._id
            })
        } catch (err) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getComments = async () => {
            let response;
            try {
                response = await api.get(`comments/${post._id}`);
            } catch (err) {
                console.log(err);
                return
            }
            console.log(response.data)
            setComments(response.data)
        }
        
        getComments();
    }, [])

    return (
        <>
            <form className="border" method="POST" onSubmit={(e) => handleOnSubmit(e)}>
                <div className="p-3">
                    User {post._id}
                </div>
                <div>
                    <textarea name="content" onBlur={setFormData()}></textarea>
                    <button type="submit" className="btn btn-accent">Submit</button>
                </div>
            </form>
            <ul>
                {comments.map((comment, key) => <li key={key}>{comment.content}</li>)}
            </ul>
        </>
    )
}

export default PostChat