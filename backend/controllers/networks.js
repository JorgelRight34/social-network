import { Op } from "sequelize";
import { getPagination } from "../lib/utils.js";
import Network from "../models/network.js";
import NetworkAdmin from "../models/networkAdmin.js";
import User from "../models/user.js";

export const createNetwork = async (req, res) => {
    const { name, description } = req.body;
    console.log("name and description", name, description)
    let network; 
    let networkAdmin;

    if (!name || !description) {
        return res.status(400).send('Please fill all the fields.');
    }

    try {
        network = await Network.create({
            name: name.trim(),
            description: description.trim(),
            userId: req.user?.userId,
            profilePic: req.files.profilePic?.[0]?.filename || '',
            wallpaper: req.files.wallpaper?.[0]?.filename || '',
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('An error has ocurred trying to create the network.');
    }

    try {
        networkAdmin = await NetworkAdmin.create({
            userId: req.user?.userId,
            networkId: network.id
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('An error has ocurred trying to create the admin.');
    }

    return res.status(201).json({network, networkAdmin});
}

export const deleteNetwork = async (req, res) => {
    try {
        const { id } = req.params;

        // Find network 
        const network = await Network.findByPk(id);
        if (!network) {
            return res.status(404).send('Network doesn\'t exist.');
        }

        // Check if user is admin
        const admin = await NetworkAdmin.findOne({
            where: {
                networkId: id,
                userId: req.user?.userId
            }
        })
        if (!admin) {
            return res.status(400).send('User is not an admin.');
        }

        // Delete network
        await network.destroy();
        return res.send('Network deleted.');
    } catch (err) {
        console.error(err);
        return res.status(500).send('An error has ocurred.');
    }
}

export const getNetwork = async (req, res) => {
    try {
        const { networkName } = req.params;

        const network = await Network.findOne({
            where: {
                name: networkName
            }
        });

        if (!network) {
            console.log("there's not such a network");
            return res.status(404);
        }

        const networkAdmins = await NetworkAdmin.findAll({
            where: {
                networkId: network.id
            },
            include: [User]
        });

        return res.json({
            ...network.dataValues,
            admins: networkAdmins
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('An error has ocurred');
    }
}


export const getNetworks = async (req, res) => {
    try {
        const { page, size, q } = req.query;
        const { limit, offset } = getPagination(page, size);

        const data = await Network.findAndCountAll({
            limit,
            offset,
            where: {
                name: {
                    [Op.like]: `%${q || ''}%`
                }
            }
        });

        return res.json({
            totalItems: data.totalItems,
            totalPages: Math.ceil(data.count / limit),
            currentPage: page ? +page : 1,
            data: data.rows
        })

    } catch (err) {
        console.error(err);
        return res.status(500).send('An error has ocurred.')
    }
}

export const updateNetwork = async (req, res) => {
    try {
        const { name, description, networkId } = req.body;

        // Prevent not admin users to update the network
        const admin = await NetworkAdmin.findOne({
            where: {
                networkId: networkId,
                userId: req.user?.userId
            }
        })
        if (!admin) {
            return res.status(400).send('User is not an admin.');
        }

        // Get and check if network exists
        const network = await Network.findByPk(networkId)
        if (!network) {
            return res.status(404).send('Network doesn\'t exist.')
        }

        // New data
        const data = {
            name: name.trim(),
            description: description.trim()
        }

        // Update profile pic and wallpaper only if new values
        // have been submitted
        const profilePic = req.files.profilePic?.[0]?.filename;
        const wallpaper = req.files.wallpaper?.[0]?.filename ;

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
        return res.status(500).send('An error has ocurred.')
    }
}