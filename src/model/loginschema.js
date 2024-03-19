const mongoose = require ("mongoose");

const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email:{
        type:String,
        unique:true,
        require:true
,    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports=new mongoose.model('user', loginSchema)