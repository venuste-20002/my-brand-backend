const jwt = require ("jsonwebtoken");


module.exports = class JWT{
    static generatejwt(data, exp='1d'){
        return jwt.sign(data,process.env.JWT_SECRET,{expiresIn: exp})
    }
}


