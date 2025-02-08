import { Router } from "express"
import { authenticate } from "../controllers/users.js";
import { createNetwork, getNetwork, getNetworks } from "../controllers/networks.js";
import upload from "../middlewares/uploads.js";

const networkRouter = Router();

// Routes
networkRouter.get('/:networkName', getNetwork);
networkRouter.get('/', getNetworks);
networkRouter.post('/', authenticate, upload.fields([
    { name: 'profilePic', maxCount: 1},
    { name: 'wallpaper', maxCount: 1}
]), createNetwork);

export default networkRouter