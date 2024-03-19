const { Router } = require ("express");
const MessageController = require ("../controller/messagecontroller.js");
const  AuthMiddleware = require ("../middleware/authmiddleware.js");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management endpoints
 */


/**
 * @swagger
 * /api/v1/messages/create:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageInput'
 *     responses:
 *       '200':
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       '400':
 *         description: Invalid email format
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MessageInput:
 *       type: object
 *       properties:
 *         sendmessage:
 *           type: string
 *           description: Sender's message
 *         email:
 *           type: string
 *           format: email
 *           description: Receiver's email address
 *         content:
 *           type: string
 *           description: Content of the message
 *       required:
 *         - sendmessage
 *         - email
 *         - content
 *     Message:
 *       type: object
 *       properties:
 *         sendmessage:
 *           type: string
 *           description: Sender's message
 *         email:
 *           type: string
 *           format: email
 *           description: Receiver's email address
 *         content:
 *           type: string
 *           description: Content of the message
 *         _id:
 *           type: string
 *           description: The message ID
 *       required:
 *         - sendmessage
 *         - email
 *         - content
 *         - _id
 */




router.post("/create",  MessageController.sendMessage);

/**
 * @swagger
 * /api/v1/messages/all:
 *   get:
 *     summary: Retrieve all messages
 *     tags: [Messages]
 *     responses:
 *       '200':
 *         description: Retrieved all messages successfully
 *       '500':
 *         description: Server error
 */
router.get("/all", MessageController.getAllMessages);

/**
 * @swagger
 * /api/v1/messages/{id}:
 *   get:
 *     summary: Get a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the message
 *     responses:
 *       '200':
 *         description: Retrieved message by ID successfully
 *       '404':
 *         description: Message not found
 *       '500':
 *         description: Server error
 */
router.get("/:id", MessageController.getMessageById);

/**
 * @swagger
 * /api/v1/messages/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the message
 *     responses:
 *       '200':
 *         description: Message deleted successfully
 *       '401':
 *         description: Unauthorized request
 *       '404':
 *         description: Message not found
 *       '500':
 *         description: Server error
 */
router.delete("/:id", AuthMiddleware.isAuthenticated, MessageController.deleteMessage);

module.exports= router;

