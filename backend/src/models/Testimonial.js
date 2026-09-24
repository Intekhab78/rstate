import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    client_name: { type: String, required: true },
    company: { type: String },
    feedback: { type: String, required: true },
    rating: { type: Number, default: 5 }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

testimonialSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
  }
});

export default mongoose.model('Testimonial', testimonialSchema);
