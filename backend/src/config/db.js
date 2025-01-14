import mongoose from 'mongoose';

export const connectDB = async (URL) => {
    try {
        await mongoose.connect(URL);
        console.log(`Conexion exitosa a la base de datos`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};