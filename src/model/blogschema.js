const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
      data:Buffer,
      contentType:String
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tags: {
        type: [String],
        required: true
    },    
    likes: [
        {
            type: String,
            ref: 'user'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

blogPostSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
 