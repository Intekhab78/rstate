import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    slug: { type: String, unique: true },
    category: { type: String, default: '' },
    location: { type: String, default: '' },
    description: { type: String, default: '' },
    image_url: { type: String, default: '' },
    status: { type: String, default: 'Completed' },
    details_json: { type: String, default: '{}' }
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
