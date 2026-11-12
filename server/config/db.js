import mongoose from 'mongoose';
import config from './index.js';

async function connectDB() {
    if (!config.mongodbUri) {
        console.warn('No MongoDB URI found in config/index.js');
        return;
    }
    try {

        await mongoose.connect(config.mongodbUri)
        console.log('MongoDB connected successfully');
    }
    catch (err) {
        console.error('MongoDB connection error', err);
    }
}

export default connectDB;