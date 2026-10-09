import Navbar from '../models/Navbar.js';

export const getNavbar = async (req, res) => {
  try {
    let navbar = await Navbar.findOne();
    if (!navbar) {
      navbar = await Navbar.create({});
    }
    res.json(navbar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateNavbar = async (req, res) => {
  try {
    let navbar = await Navbar.findOne();
    if (!navbar) {
      navbar = new Navbar(req.body);
    } else {
      navbar.items = req.body.items;
    }
    const updatedNavbar = await navbar.save();
    res.json(updatedNavbar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
