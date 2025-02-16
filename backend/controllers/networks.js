import { Op, Sequelize } from "sequelize";
import { getPagination } from "../lib/utils.js";
import Network from "../models/network.js";
import NetworkAdmin from "../models/networkAdmin.js";
import User from "../models/user.js";
import NetworkMember from "../models/networkMember.js";
import JoinNetworkRequest from "../models/joinNetworkRequest.js";

const includeMembers = {
  include: [
    {
      model: NetworkMember, // Assuming `NetworkMember` is the related model
      attributes: [], // No need to return full objects, just count them
    },
    {
      model: NetworkAdmin, // Assuming `NetworkMember` is the related model
      attributes: [], // No need to return full objects, just count them
    },
  ],
  attributes: {
    include: [
      [Sequelize.fn("COUNT", Sequelize.col("NetworkAdmins.id")), "adminCount"],
      [
        Sequelize.fn("COUNT", Sequelize.col("NetworkMembers.id")),
        "memberCount",
      ],
    ],
  },
  group: ["Network.id"], // Important: Groups results by Network to count correctly
  subQuery: false, // Ensures the count is applied to the main query, not a subquery
};

export const createNetwork = async (req, res) => {
  const { name, description } = req.body;
  let network;
  let networkAdmin;

  if (!name || !description) {
    // Avoid empty fields
    return res.status(400).send("Please fill all the fields.");
  }

  try {
    // Try to create a network
    network = await Network.create({
      name: name.trim(), // Avoid extra spaces
      description: description.trim(), // Avoid extra spaces
      userId: req.user?.userId,
      profilePic: req.files.profilePic?.[0]?.filename || "",
      wallpaper: req.files.wallpaper?.[0]?.filename || "",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send("An error has ocurred trying to create the network.");
  }

  try {
    // Create an admin for this user
    networkAdmin = await NetworkAdmin.create({
      userId: req.user?.userId,
      networkId: network.id,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send("An error has ocurred trying to create the admin.");
  }

  return res.status(201).json({ network, networkAdmin });
};

export const deleteNetwork = async (req, res) => {
  try {
    const { id } = req.params;

    // Find network
    const network = await Network.findByPk(id);
    if (!network) {
      return res.status(404).send("Network doesn't exist.");
    }

    // Check if user is admin
    const admin = await NetworkAdmin.findOne({
      where: {
        networkId: id,
        userId: req.user?.userId,
      },
    });
    if (!admin) {
      return res.status(400).send("User is not an admin.");
    }

    // Delete network
    await network.destroy();
    return res.send("Network deleted.");
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }
};

export const getNetwork = async (req, res) => {
  try {
    const { networkName } = req.params;

    const network = await Network.findOne({
      where: {
        name: networkName,
      },
      ...includeMembers,
    });

    if (!network) {
      // Avoid no networks
      return res.status(404);
    }

    // Find network admins
    const networkAdmins = await NetworkAdmin.findAll({
      where: {
        networkId: network.id,
      },
      include: [User],
    });

    return res.json({
      ...network.dataValues,
      admins: networkAdmins,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred");
  }
};

export const getNetworks = async (req, res) => {
  try {
    const { page, size, q } = req.query;
    const { limit, offset } = getPagination(page, size);

    const data = await Network.findAndCountAll({
      limit,
      offset,
      where: {
        name: {
          [Op.like]: `%${q || ""}%`,
        },
      },
      ...includeMembers,
    });

    return res.json({
      totalItems: data.totalItems,
      totalPages: Math.ceil(data.count / limit),
      currentPage: page ? +page : 1,
      data: data.rows,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }
};

export const updateNetwork = async (req, res) => {
  try {
    const { name, description, networkId } = req.body;

    // Prevent not admin users to update the network
    const admin = await NetworkAdmin.findOne({
      where: {
        networkId: networkId,
        userId: req.user?.userId,
      },
    });
    if (!admin) {
      return res.status(400).send("User is not an admin.");
    }

    // Get and check if network exists
    const network = await Network.findByPk(networkId);
    if (!network) {
      return res.status(404).send("Network doesn't exist.");
    }

    // New data
    const data = {
      name: name.trim(),
      description: description.trim(),
    };

    // Update profile pic and wallpaper only if new values
    // have been submitted
    const profilePic = req.files.profilePic?.[0]?.filename;
    const wallpaper = req.files.wallpaper?.[0]?.filename;

    if (profilePic) {
      data.profilePic = profilePic;
    }

    if (wallpaper) {
      data.wallpaper = wallpaper;
    }

    // Update network
    await network.update(data);

    return res.json(network);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }
};

export const createNetworkMember = async (req, res) => {
  try {
    const { networkId } = req.body;

    const networkMember = await NetworkMember({
      userId: req.user?.userId,
      networkId: networkId,
    });

    return res.json(networkMember);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }
};

export const createJoinNetworkRequest = async (req, res) => {
  try {
    const { networkId } = req.body;

    const joinNetworkRequest = await JoinNetworkRequest.create({
      userId: req.user?.userId,
      networkId: networkId,
    });

    return res.json(joinNetworkRequest);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }
};

export const getJoinNetworkRequests = async (req, res) => {
  try {
    const joinNetworkRequests = await JoinNetworkRequest.findAll({
      where: {
        userId: req.user?.userId,
      },
    });

    return res.json(joinNetworkRequests);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }
};

export const getReceivedJoinNetworkRequests = async (req, res) => {
  try {
    const { networkId } = req.params;

    const joinNetworkRequests = await JoinNetworkRequest.findAll({
      where: {
        networkId: networkId,
      },
      include: {
        model: User,
        attributes: ["username", "profilePic", "email"],
      },
    });

    return res.json(joinNetworkRequests);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }
};

export const acceptJoinNetworkRequest = async (req, res) => {
  try {
    const { joinRequestId } = req.body;

    // Get join request
    const joinRequest = await JoinNetworkRequest.findByPk(joinRequestId);

    // Check if user is not a member already
    const isMember = await NetworkMember.findOne({
      where: {
        userId: joinRequest.userId,
        networkId: joinRequest.networkId,
      },
    });

    if (isMember) {
      return res.status(400).send("Already a member");
    }

    // Create new member for the requesting user
    const member = await NetworkMember.create({
      userId: joinRequest.userId,
      networkId: joinRequest.networkId,
    });

    joinRequest.destroy(); // Destroy request

    return res.json(member);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }
};
