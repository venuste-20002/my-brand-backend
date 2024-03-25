const mongoose = require ("mongoose");
const blogschema = require("./blogschema");

const commentPostSchema = new mongoose.Schema({
    blogId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'blog'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require:true
},
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

commentPostSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports= new mongoose.model('Comment', commentPostSchema);
