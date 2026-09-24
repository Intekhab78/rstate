import mongoose from 'mongoose';

const whyChooseSchema = new mongoose.Schema(
  {
    tag: { type: String, default: 'Why Saffpoll' },
    title: { type: String, default: 'Why Choose Saffpoll' },
    description: { type: String, default: 'Experience, quality, transparency and a commitment to delivering construction projects that create lasting value.' },
    cards: { type: Array, default: [] },
    stats: { type: Array, default: [] },
    bottom_values: { type: Array, default: [] }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

whyChooseSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
  }
});

export default mongoose.model('WhyChoose', whyChooseSchema);
