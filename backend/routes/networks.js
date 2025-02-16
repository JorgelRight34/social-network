import { Router } from "express";
import { authenticate } from "../controllers/users.js";
import {
  acceptJoinNetworkRequest,
  createJoinNetworkRequest,
  createNetwork,
  createNetworkMember,
  deleteNetwork,
  getJoinNetworkRequests,
  getNetwork,
  getNetworks,
  getReceivedJoinNetworkRequests,
  updateNetwork,
} from "../controllers/networks.js";
import upload from "../middlewares/uploads.js";

const networkRouter = Router();

// Routes
networkRouter.get(
  "/:networkId/join-request",
  authenticate,
  getReceivedJoinNetworkRequests
);
networkRouter.get("/join-request", authenticate, getJoinNetworkRequests);
networkRouter.get("/:networkName", getNetwork);
networkRouter.get("/", getNetworks);
networkRouter.put(
  "/",
  authenticate,
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "wallpaper", maxCount: 1 },
  ]),
  updateNetwork
);
networkRouter.post(
  "/",
  authenticate,
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "wallpaper", maxCount: 1 },
  ]),
  createNetwork
);
networkRouter.delete("/:id", authenticate, deleteNetwork);
networkRouter.post("/member", authenticate, createNetworkMember);
networkRouter.post("/join-request", authenticate, createJoinNetworkRequest);
networkRouter.post(
  "/accept-join-network-request",
  authenticate,
  acceptJoinNetworkRequest
);

export default networkRouter;
