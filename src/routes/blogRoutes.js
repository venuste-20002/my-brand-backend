const { Router } = require ("express");
const BlogController = require("../controller/blogcontroller.js");
const AuthMiddleware = require( "../middleware/authmiddleware.js");

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *            type: string
 *         content:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *       required:
 *         - title
 *         - description
 *         - content
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       name: Authorization
 *       in: header
 */

/**
 * @swagger
 * /api/v1/blogs/create:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogInput'
 *     responses:
 *       '200':
 *         description: Blog post created successfully
 *       '401':
 *         description: Unauthorized request
 *       '500':
 *         description: Server error
 */
router.post("/create", AuthMiddleware.isAuthenticated, BlogController.createBlog);

/** 
 * @swagger
 * /api/v1/blogs/all:
 *   get:
 *     summary: Retrieve all blog posts
 *     tags: [Blogs]
 *     responses:
 *       '200':
 *         description: Retrieved all blog posts successfully
 *       '500':
 *         description: Server error
 */
router.get("/all", BlogController.getAllBlogs);

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog post
 *     responses:
 *       '200':
 *         description: Retrieved blog post by ID successfully
 *       '404':
 *         description: Blog post not found
 *       '500':
 *         description: Server error
 */
router.get("/:id", BlogController.getBlogById);

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   put:
 *     summary: Update a blog post by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogInput'
 *     responses:
 *       '200':
 *         description: Blog post updated successfully
 *       '401':
 *         description: Unauthorized request
 *       '404':
 *         description: Blog post not found
 *       '500':
 *         description: Server error
 */
router.put("/:id", AuthMiddleware.isAuthenticated, BlogController.updateBlog);

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog post
 *     responses:
 *       '200':
 *         description: Blog post deleted successfully
 *       '401':
 *         description: Unauthorized request
 *       '404':
 *         description: Blog post not found
 *       '500':
 *         description: Server error
 */
router.delete("/:id", AuthMiddleware.isAuthenticated, AuthMiddleware.checkRole, BlogController.deleteBlog);

/**
 * @swagger
 * /api/v1/blogs/{id}/comments:
 *   post:
 *     summary: Add a comment to a blog post
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Comment added successfully
 *       '401':
 *         description: Unauthorized request
 *       '404':
 *         description: Blog post not found
 *       '500':
 *         description: Server error
 */
router.post("/:id/comments", AuthMiddleware.isAuthenticated, BlogController.addComment);

/**
 * @swagger
 * /api/v1/blogs/{id}/like:
 *   post:
 *     summary: Like a blog post
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog post
 *     responses:
 *       '200':
 *         description: Blog post liked successfully
 *       '401':
 *         description: Unauthorized request
 *       '404':
 *         description: Blog post not found
 *       '500':
 *         description: Server error
 */
router.post("/:id/like", AuthMiddleware.isAuthenticated, BlogController.likeBlog);


module.exports= router;
