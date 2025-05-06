import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  isAdmin: { type: Boolean, default: false },
  avatar: { type: String },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
