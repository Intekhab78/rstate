import mongoose from 'mongoose';

const contactCTASchema = new mongoose.Schema(
  {
    enabled: { type: Boolean, default: true },
    tag: { type: String, default: "Let's Build Together" },
    title: { type: String, default: 'Plan your next project with Saffpoll' },
    description: { type: String, default: "Have a residential, commercial, renovation, or construction requirement? Talk directly with our team and let's discuss how we can bring your vision to life." },
    bg_image: { type: String, default: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80' },
    buttons: { type: Array, default: [] },
    contact_details: { type: Array, default: [] }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

contactCTASchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
  }
});

export default mongoose.model('ContactCTA', contactCTASchema);
