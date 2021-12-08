const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('../config/default');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = new Router();

// /api/auth/register
router.post(
'/register',
[
  check('email', 'Incorrect e-mail').isEmail(),
  check('password', 'Min password length is 6 symbols').isLength({min: 6})
],
async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect registration data'
      })
    }

    const {email, password} = req.body;

    const candidate = await User.findOne({email: email});

    if (candidate) {
      return res.status(400).json({message: 'User already exist'})
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({email: email, password: hashedPassword});

    await user.save();

    res.status(201).json({message: 'New user created'});

  } catch (error) {
    res.status(500).json({ message: 'Something going wrong, please try again...' });
  }
});

// /api/auth/login
router.post(
'/login',
[
  check('email', 'Input correct e-mail').isEmail(),
  check('password', 'Input password').exists()
],
async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect login data'
      })
    }

    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if (!user) {
      return res.status(400).json({message: 'User not found'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({message: 'Incorrect login or password'});
    }
    
    const token = jwt.sign(
      {userId: user.id},
      config.jwtSecret,
      {expiresIn: '8h'}
    )

    
    res.json({token: token, userId: user.id});

  } catch (error) {
    res.status(500).json({ message: 'Something going wrong, please try again...' });
  }
});

module.exports = router;