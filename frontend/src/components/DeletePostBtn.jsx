import api from "../api";
import RoundedPill from "./RoundedPill"

const DeletePostBtn = ({ post }) => {
    const handleOnClick = async () => {
        let response;

        try {
            response = await api.delete(`posts/${post._id}`);
        } catch (err) {
            console.log(err);
        }

        console.log(response.data)
    }

    return (
        <RoundedPill className={"border"} onClick={handleOnClick}>
            <span>
                Delete
            </span>
        </RoundedPill>
    )
}

export default DeletePostBtn