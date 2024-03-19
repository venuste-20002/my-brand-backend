const { JWT } = require ("../helper/jwt.js");
const messageschema = require ("../model/messageschema.js");
const loginschema = require ("../model/loginschema.js"); // Import your user schema
const bcrypt = require ("bcrypt");
const mongoose = require ("mongoose"); 

module.exports= class MessageController {
    static async sendMessage(req, res) {

        try {

            const { sendmessage, email, content } = req.body;

            const emailRegex = /\S+@\S+\.\S+/;

            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    status: "fail",
                    message: "Invalid email format",
                });
            }
            
            // const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // const user = await messageschema.create({
            //     username,
            //     email,
            //     password: hashedPassword,
            //     role
            // });

           const createdMessage = await messageschema.create({
                sendmessage, email, content
            })
            return res.status(200).json({
                status: "success",
                data: createdMessage,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    static async getAllUsers(req, res) {
        try {
            const allUsers = await loginschema.find().select("-password");
            return res.status(200).json({
                status: "success",
                data: allUsers,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    static async getAllMessages(req, res) {
        try {
            const allMessages = await messageschema.find().populate("sendmessage");
            return res.status(200).json({
                status: "success",
                data: allMessages,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
    
    static async getMessageById(req, res) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    status: "fail",
                    message: "Invalid message ID",
                });
            }
    
            const message = await messageschema.findById(id).populate("sendmessage");
    
            if (!message) {
                return res.status(404).json({
                    status: "fail",
                    message: "Message not found",
                });
            }
    
            return res.status(200).json({
                status: "success",
                data: message,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
    
    static async deleteMessage(req, res) {
        try {
            const { id } = req.params;

            const messageToDelete = await messageschema.findOne({ _id: id });

            if (!messageToDelete) {
                return res.status(404).json({
                    status: 'not found',
                    message: 'Message not found. Check again.',
                });
            }

            const deletedMessage = await messageschema.deleteOne({ _id: id });

            return res.status(200).json({
                status: 'deleted',
                message: 'Message successfully deleted',
                deleted: deletedMessage
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
            });
        }
    }
}
