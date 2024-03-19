const { Router } = require ("express");
const LoginController = require ("../controller/logincontroller.js");
const AuthMiddleware = require ("../middleware/authmiddleware.js");

const router = Router();




/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server error
 */
router.post("/register", LoginController.registerUser);

/**
 * @swagger
 * /api/v1/users/users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Retrieved all users successfully
 *       '401':
 *         description: Unauthorized request
 *       '500':
 *         description: Server error
 */
router.get("/users",  LoginController.getAllUsers);
// AuthMiddleware.isAuthenticated, AuthMiddleware.checkRole,

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *       required:
 *         - email
 *         - password
 */

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Log in user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Incorrect credentials
 *       '404':
 *         description: Account does not exist
 *       '500':
 *         description: Server error
 */
router.post("/login", LoginController.loginUser);

/**
 * @swagger
 * /api/v1/users/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '401':
 *         description: Unauthorized request
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */
router.delete("/:id", AuthMiddleware.isAuthenticated, AuthMiddleware.checkRole, LoginController.deleteUser);





module.exports= router;
