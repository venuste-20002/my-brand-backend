const jwt = require( "jsonwebtoken");
const dotenv = require ("dotenv");
const { Types } = require ("mongoose");

dotenv.config();

module.exports = class AuthMiddleware{
    

    static async isAuthenticated(req,res,next){
        
        try {
            const {authorization} = req.headers;
            
            if (!authorization){
                return res.status(401).json({
                    status:"fail",
                    message:"the is no authorization token"
                });
            }
                
                const  token = authorization .split(" ")[1];

                if (!token){
                    return res.status(401).json({
                        status:"fail",
                        message:"unathorized work"
                    });
                }
               const user = jwt.verify(token,process.env.JWT_SECRET);
                req.user = user;

                console.log(user);
                next()
            
        } catch (error) {
            return res.status(500).json({
                status:"error",
                message:error.message
            }); 
        }
    }
    static async checkRole (req,res,next){
        try {
            const user =req.user;
            if (user.data.role == "admin"){
                return next()
            }

            console.log(user.data);
            return res.status(403).json({
                status:"fail",
                message:"you are not the one to work on this role",
            
            })
        } catch (error) {
            return res.status(500).json({
                status:"error",
                message: error.message,
            }) 
        }
    }
}