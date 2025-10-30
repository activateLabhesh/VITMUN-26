import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const mongoUri = process.env.mongodb_uri || "mongodb+srv://vitmun-26:123456789@cluster0.xymzgpl.mongodb.net/?appName=Cluster0";
        if (!mongoUri) {
            throw new Error('MONGODB_URI is not defined in .env file');
        }
        
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        // Exit process with failure
        process.exit(1);
    }
};
