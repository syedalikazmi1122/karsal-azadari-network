const mongoose = require('mongoose');

const writingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['noha', 'kaseeda', 'bain', 'band'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Writing', writingSchema);