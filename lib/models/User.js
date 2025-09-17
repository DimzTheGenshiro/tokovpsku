// lib/models/User.js
import mongoose from 'mongoose';
import CryptoJS from 'crypto-js';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Enkripsi password sebelum disimpan
UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  this.password = CryptoJS.SHA256(this.password).toString();
  next();
});

// Metode untuk membandingkan password
UserSchema.methods.matchPassword = function(enteredPassword) {
  return this.password === CryptoJS.SHA256(enteredPassword).toString();
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;

