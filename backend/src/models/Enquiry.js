import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String, default: '' },
    mobile: { type: String, default: '' },
    email: { type: String, required: true },
    location: { type: String, default: '' },
    project_type: { type: String, default: '' },
    estimated_budget: { type: String, default: '' },
    requirement: { type: String, default: '' },
    file_url: { type: String, default: null },
    status: { type: String, default: 'New' },
    notes: { type: String, default: '' }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

enquirySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
  }
});

export default mongoose.model('Enquiry', enquirySchema);
