import { Router } from "express"
import { authenticate } from "../controllers/users.js";
import { createNetwork, deleteNetwork, getNetwork, getNetworks, updateNetwork } from "../controllers/networks.js";
import upload from "../middlewares/uploads.js";

const networkRouter = Router();

// Routes
networkRouter.get('/:networkName', getNetwork);
networkRouter.get('/', getNetworks);
networkRouter.put('/', authenticate, upload.fields([
    { name: 'profilePic', maxCount: 1},
    { name: 'wallpaper', maxCount: 1}
]), updateNetwork);
networkRouter.post('/', authenticate, upload.fields([
    { name: 'profilePic', maxCount: 1},
    { name: 'wallpaper', maxCount: 1}
]), createNetwork);
networkRouter.delete('/:id', authenticate, deleteNetwork);

export default networkRouter