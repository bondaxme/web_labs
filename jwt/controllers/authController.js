const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hashPassword = require('../utils/hashPassword');
const config = require('../config/config');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered');
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('User not found');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    const token = jwt.sign({ _id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '1h' });
  
    res.header('Authorization', token).send('Login successful');
};
