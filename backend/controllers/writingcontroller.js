const Writing = require('../models/Writing');

exports.createWriting = async (req, res) => {
  const { title, type, content } = req.body;

  try {
    const writing = new Writing({ title, type, content });
    await writing.save();
    res.status(201).json(writing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getWritings = async (req, res) => {
  const { type, search } = req.query;

  try {
    const query = {};
    if (type) query.type = type;
    if (search) query.title = { $regex: search, $options: 'i' };

    const writings = await Writing.find(query).sort({ createdAt: -1 });
    res.json(writings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getWritingById = async (req, res) => {
  try {
    const writing = await Writing.findById(req.params.id);
    if (!writing) return res.status(404).json({ message: 'Writing not found' });
    res.json(writing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};