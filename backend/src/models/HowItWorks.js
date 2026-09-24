import mongoose from 'mongoose';

const howItWorksSchema = new mongoose.Schema(
  {
    title: { type: String, default: 'How Saffpoll Works' },
    subtitle: { type: String, default: "From initial assessment to final handover, here's exactly how we plan, develop, and deliver every project." },
    bottom_text: { type: String, default: 'We understand land development, follow approvals, deliver quality roads & infrastructure, and remain reliable throughout the process.' },
    bottom_subtext: { type: String, default: "We're with you at every step, ensuring transparency and quality." },
    steps: { type: Array, default: [] }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

howItWorksSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
  }
});

export default mongoose.model('HowItWorks', howItWorksSchema);
