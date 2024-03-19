const mongoose = require( "mongoose");
const dotenv = require ("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully!");
    } catch (err) {
        console.error(`Error happened: ${err}`);
    }
};

module.exports = connectDB;
