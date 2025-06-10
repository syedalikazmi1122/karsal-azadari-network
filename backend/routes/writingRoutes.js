const express = require('express');
const router = express.Router();
const writingController = require('../controllers/writingcontroller');
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.post('/', authenticate, writingController.createWriting);
router.get('/', writingController.getWritings);
router.get('/:id', writingController.getWritingById);

module.exports = router;