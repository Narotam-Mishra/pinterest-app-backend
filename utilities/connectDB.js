
import mongoose from 'mongoose';

const mongoUrl = process.env.mongoURL;
console.log("MongoDB URL:", mongoUrl);

const setUpDBConnection = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("Connected to MongoDB!!");
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);
    }
}

export default setUpDBConnection;