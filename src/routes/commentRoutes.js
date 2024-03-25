const { Router } = require("express");
const CommentController = require("../controller/commentcontroller.js");
const AuthMiddleware = require("../middleware/authmiddleware.js");

const router = Router();

/**
 * @swagger
 * /api/v1/comments/create:
 *   post:
 *     summary: Add a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       '200':
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommentInput:
 *       type: object
 *       properties:
 *         blogId:
 *           type: string
 *           description: ID of the blog the comment belongs to
 *         name:
 *           type: string
 *           description: Name of the commenter
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the commenter
 *         comment:
 *           type: string
 *           description: Comment content
 *       required:
 *         - blogId
 *         - name
 *         - email
 *         - comment
 *     Comment:
 *       type: object
 *       properties:
 *         blogId:
 *           type: string
 *           description: ID of the blog the comment belongs to
 *         name:
 *           type: string
 *           description: Name of the commenter
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the commenter
 *         comment:
 *           type: string
 *           description: Comment content
 *         _id:
 *           type: string
 *           description: Unique identifier for the comment
 *       required:
 *         - name
 *         - email
 *         - comment
 *         - blogId
 */
router.post("/create", CommentController.addComment);

/**
 * @swagger
 * /api/v1/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       '200':
 *         description: Retrieved all comments successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       '500':
 *         description: Server error
 */
router.get("/", CommentController.getAllComments);



/**
 * @swagger
 * /api/v1/comments/create:
 *   post:
 *     summary: Add a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       '200':
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       '500':
 *         description: Server error
 */

router.get("/:id", CommentController.getCommentById);


/**
 * @swagger
 * /api/v1/comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment
 *     responses:
 *       '200':
 *         description: Retrieved comment by ID successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       '400':
 *         description: Invalid comment ID
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment
 *     responses:
 *       '200':
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       '401':
 *         description: Unauthorized request
 *       '400':
 *         description: Invalid comment ID
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Server error
 */


router.delete("/:id", AuthMiddleware.isAuthenticated, CommentController.deleteComment);


module.exports = router;

