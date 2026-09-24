import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password_hash: { type: String, required: true },
    name: { type: String, default: 'SaffPol Admin' },
    role: { type: String, default: 'admin' }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// Map _id to id when serializing to JSON
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
  }
});

export default mongoose.model('User', userSchema);
