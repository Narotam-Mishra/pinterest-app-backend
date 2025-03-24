
import mongoose from 'mongoose';

const mongoUrl = process.env.mongoURL;

const setUpDBConnection = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("Connected to MongoDB!!");
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);
    }
}

export default setUpDBConnection;