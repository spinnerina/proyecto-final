import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
}, { versionKey: false });

const Product = mongoose.model('Product', productSchema);

export { Product };