import mongoose from 'mongoose';

const insightSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    date: { type: String },
    category: { type: String },
    summary: { type: String },
    content: { type: String },
    image_url: { type: String }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

insightSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
  }
});

export default mongoose.model('Insight', insightSchema);
