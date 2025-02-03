import User from "../models/user.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import bycript from "bcryptjs";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;


export const authenticate = async (req, res, next) => {
    // Get token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(400).send('Access denied.');
    }

    // Validate token
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(400).send('Invalid token.');
    }

    next();
}


export const register = async (req, res) => {
    // Get form values
    const { username, email, password } = req.body;

    // Avoid empty required values
    if (!username || !email || !password) {
        console.log("No username")
        res.status(400).send({
            error: true,
            message: 'Please fill all the fields'
        });
        return
    }

    // Hash password
    const hashedPassword = await bycript.hash(password, 10);

    // Create & save user
    const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
        profilePic: req.file?.filename || null
    })

    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }
    console.log("Returning")
    return res.status(200);
}


export const refreshToken = async (req, res) => {
    const refresh = req.body.refreshToken;   // Get refresh token

    // Verify token (it will check if it has expired and is valid)
    const verified = await jwt.verify(refresh, SECRET_KEY);
    if (!verified) {
        return res.send(400);
    } 

    // Generate and send access token
    const accessToken = await jwt.sign(
        { username: verified.username }, 
        SECRET_KEY, 
        { expiresIn: '1d' }
    );
    return res.json({ accessToken: accessToken});
}


export const userInfo = async (req, res) => {
    const user = await User.findOne({ username: req.user.username })
    if (user) {
        return res.json(user);
    }

    return res.status(400).send('User doesn\'t exists.')
}


export const login = async (req, res) => {
    // Get credentials
    const { username, password } = req.body;
    console.log(req.body);

    // Validate credentials are not empty
    if (!username || !password) {
        res.status(400).json({
            error: true,
            message: 'Please fill all the fields'
        });
        return
    }

    // Look for user in the database
    const user = await User.findOne({ username: username });
    if (!user) {   
        res.status(400).json({
            error: true,
            message: 'Invalid credentials (user doesnt exist)'
        });
        return
    }

    // Check if password matches
    const match = await bycript.compare(password, user.password);
    if (!match) {
        res.status(400).json({
            error: true,
            message: 'Invalid credentials'
        });
        return
    }

    // Generate and send JWT token
    const accessToken = jwt.sign({ username, userId: user.id}, process.env.SECRET_KEY, {expiresIn: '1d' });
    const refreshToken = jwt.sign({ username, userId: user.id }, process.env.SECRET_KEY, { expiresIn: '7d' })
    res.send({
        accessToken: accessToken,
        refreshToken: refreshToken
    });
}
