import mongoose from 'mongoose';

const heroContentSchema = new mongoose.Schema(
  {
    welcome_title: { type: String, default: 'Welcome to' },
    company_name: { type: String, default: 'Saffpoll' },
    subtitle: { type: String, default: 'EXPERT BUILDING CONTRACTOR SERVICES' },
    slides: { type: Array, default: [] },
    pills: { type: Array, default: [] }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

heroContentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
  }
});

export default mongoose.model('HeroContent', heroContentSchema);
