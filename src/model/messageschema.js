const mongoose = require ("mongoose");

const messageSchema = new mongoose.Schema({
    sendmessage: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

messageSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports= mongoose.model('Message', messageSchema);
