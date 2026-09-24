import mongoose from 'mongoose';

const coreValuesSchema = new mongoose.Schema(
  {
    label: { type: String, default: 'What Drives Us' },
    title: { type: String, default: 'OUR CORE VALUES' },
    description: { type: String, default: 'We build every project on clear principles that guide how we plan, communicate, and deliver.' },
    bg_image: { type: String, default: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=85' },
    btn_text: { type: String, default: 'Learn more about our approach' },
    btn_link: { type: String, default: '#about' },
    items: { type: Array, default: [] }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

coreValuesSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
  }
});

export default mongoose.model('CoreValues', coreValuesSchema);
