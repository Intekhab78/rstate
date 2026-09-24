import mongoose from 'mongoose';

const contactPageSchema = new mongoose.Schema(
  {
    hero: { type: Object, default: {} },
    contact_cards: { type: Array, default: [] },
    form_settings: { type: Object, default: {} },
    office_info: { type: Object, default: {} },
    quick_actions: { type: Array, default: [] },
    map: { type: Object, default: {} },
    faqs: { type: Array, default: [] },
    final_cta: { type: Object, default: {} }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

contactPageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
  }
});

export default mongoose.model('ContactPage', contactPageSchema);
