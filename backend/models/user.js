import moongose from "mongoose";

const usersSchema = new moongose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
    }
})

const User = moongose.model('User', usersSchema);

export default User

