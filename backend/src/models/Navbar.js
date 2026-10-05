import mongoose from 'mongoose';

const dropdownItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  href: { type: String, required: true }
});

const navbarItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  href: { type: String },
  type: { type: String, enum: ['link', 'dropdown', 'dynamic_projects'], default: 'link' },
  dropdown: [dropdownItemSchema]
});

const navbarSchema = new mongoose.Schema(
  {
    items: {
      type: [navbarItemSchema],
      default: [
        { name: "Home", href: "/", type: "link" },
        { name: "About", href: "/about", type: "link" },
        { name: "Projects", href: "/project", type: "dynamic_projects" },
        { name: "Services", href: "/services", type: "link" },
        { name: "Contact", href: "/contactUs", type: "link" }
      ]
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

navbarSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
  }
});

export default mongoose.model('Navbar', navbarSchema);
