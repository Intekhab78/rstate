import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String },
    location: { type: String },
    description: { type: String },
    image_url: { type: String },
    status: { type: String, default: 'Completed' },
    details_json: { type: String }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

projectSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
  }
});

export default mongoose.model('Project', projectSchema);
