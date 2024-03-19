const JWT = require("../helper/jwt.js");
const loginschema = require ( "../model/loginschema.js");
const bcrypt = require ("bcrypt");

module.exports= class logincontroller {
    static isPasswordValid(password) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
        return passwordRegex.test(password);
    }

    static async registerUser(req, res) {
        try {
            const { username, email, password, role } = req.body;

            const emailRegex = /\S+@\S+\.\S+/;

            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    status: "fail",
                    message: "Invalid email format",
                });
            }

            const userExist = await loginschema.findOne({ email: email });
            if (userExist) {
                return res.status(400).json({
                    status: "fail",
                    message: "Email is already taken"
                });
            }
              if (!logincontroller.isPasswordValid(password)) {
                return res.status(400).json({
                    status: "fail",
                    message: "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and have a length between 6 and 12 characters.",
                });
            }
            
            const hashpassword = bcrypt.hashSync(password, 12);

            const user = await loginschema.create({
                username,
                email,
                password: hashpassword,
                role
            });

            return res.status(200).json({
                status: "success",
                data: user,
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
            const allusers = await loginschema.find().select("-password");
            return res.status(200).json({
                status: "success",
                data: allusers,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            // Check if the user exists in the database
            const userFound = await loginschema.findOne({ email });

            if (!userFound) {
                return res.status(404).json({
                    status: "fail",
                    message: "Account does not exist",
                });
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                userFound.password
            );
            if (!isPasswordValid) {
                return res.status(400).json({
                    status: "fail",
                    message: "Incorrect credentials",
                });
            }

            console.log({userFound})
            const token = await JWT.generatejwt({
                data: {
                    userId: userFound._id,
                    role: userFound.role,
                    username: userFound.username
                }
            });
            
            return res.status(200).json({
                status: "success",
                message: "Logged in successfully",
                token: token,
                role: userFound.role

            });
            
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const user_d = await loginschema.findOne({ _id: id });

            if (!user_d) {
                return res.status(404).json({
                    status: 'not found',
                    message: 'User Not found. Check again.',
                });
            }

            const user_to_delete = await loginschema.deleteOne({ _id: id });

            return res.status(200).json({
                status: 'deleted',
                message: 'User successfully deleted',
                deleted: user_to_delete
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
            });
        }
    }
}
