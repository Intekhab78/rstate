import mongoose from 'mongoose';

const aboutPageSchema = new mongoose.Schema(
  {
    hero: { type: Object, default: {} },
    story: { type: Object, default: {} },
    mission: { type: Object, default: {} },
    people: { type: Object, default: {} }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

aboutPageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
  }
});

export default mongoose.model('AboutPage', aboutPageSchema);
