import { getPagination } from "../lib/utils.js";
import Network from "../models/network.js";
import NetworkAdmin from "../models/networkAdmin.js";

export const createNetwork = async (req, res) => {
    const { name, description } = req.body;
    let network; 
    let networkAdmin;

    if (!name || !description) {
        return res.status(400).send('Please fill all the fields.');
    }

    try {
        network = await Network.create({
            name,
            description,
            userId: req.user?.userId,
            profilePic: req.files.profilePic[0].filename,
            wallpaper: req.files.wallpaper[0].filename,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('An error has ocurred trying to create the network.');
    }

    try {
        networkAdmin = await NetworkAdmin.create({
            userId: req.user?.userIdm,
            networkId: network.id
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('An error has ocurred trying to create the admin.');
    }


    return res.status(201).json({network, networkAdmin});
}


export const getNetwork = async (req, res) => {
    try {
        const { networkName } = req.params;

        console.log("name", networkName);

        const network = await Network.findOne({
            where: {
                name: networkName
            }
        });

        if (!network) {
            console.log("there's not such a network");
            return res.status(404);
        }

        return res.json(network);
    } catch (err) {
        console.err(err);
        return res.status(500).send('An error has ocurred');
    }
}


export const getNetworks = async (req, res) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);

        const data = await Network.findAndCountAll({
            limit,
            offset
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

