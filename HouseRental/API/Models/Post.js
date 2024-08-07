import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // title: {
  //   type: String,
  //   required: true
  // },
  images: {
    type: [String], 
    required: true
  },
  roomnos: {
    type: String, 
    required: true
  },
  place: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  landmark: {
    type: String,
    required: true
  },
  carpetArea: {
    type: String, 
    required: true
  },
  rent: {
    type: String, 
    required: true
  },
  deposit: {
    type: String, 
    required: true
  },
  featuamini: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Post = mongoose.model('Post', postSchema);
