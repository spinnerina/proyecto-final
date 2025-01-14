import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        min: 0
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

const User = mongoose.model('User', userSchema);

export { User };