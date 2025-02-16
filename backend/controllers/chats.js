import { Op } from "sequelize";
import ChatMember from "../models/ChatMember.js";
import Message from "../models/message.js";
import User from "../models/user.js";

export const getUserchat = async (req, res) => {
  try {
    const chatMessages = await Message.findAll({
      where: {
        chatId: chatId,
      },
      include: [ChatMember],
    });

    const messageSenders = await Promise.all(
      chatMessages.map(async (message) => {
        return await User.findByPk(message.ChatMember?.userId);
      })
    );

    const data = chatMessages.map((message, key) => {
      // Odmit sensitive data
      const { password, ...safeData } = messageSenders[key].dataValues;

      return {
        ...message.dataValues,
        user: safeData,
      };
    });

    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }
};

export const getChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chatMessages = await Message.findAll({
      where: {
        chatId: chatId,
      },
      include: [ChatMember],
    });

    const messageSenders = await Promise.all(
      chatMessages.map(async (message) => {
        console.log(message.ChatMember?.userId);
        return await User.findByPk(message.ChatMember?.userId);
      })
    );

    const data = chatMessages.map((message, key) => {
      // Odmit sensitive data
      const { password, ...safeData } = messageSenders[key].dataValues;

      return {
        ...message.dataValues,
        user: safeData,
      };
    });

    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }
};

export const getChats = async (req, res) => {
  try {
    const chats = await ChatMember.findAll({
      where: {
        userId: req.user?.userId,
      },
    });

    const chatMembers = await Promise.all(
      chats.map(async (chat) => {
        return await ChatMember.findAll({
          where: {
            chatId: chat.chatId,
            // Avoid fetching the requesting user
            userId: { [Op.not]: [req.user.userId] },
          },
          include: [User],
        });
      })
    );

    const data = await Promise.all(
      chats.map(async (chat, key) => {
        const lastMessage = await Message.findOne({
          where: { chatId: chat.chatId },
          order: [["createdAt", "DESC"]],
          attributes: ["content"], // Fetch only the "content" field
        });

        return {
          chatId: chat.chatId,
          senderId: chat.id,
          members: chatMembers[key].map((member) => ({
            ...member?.dataValues?.User.dataValues,
            memberId: member.id,
          })),
          lastMessage: lastMessage ? lastMessage.content : null, // Handle null case
        };
      })
    );

    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error has ocurred.");
  }
};
