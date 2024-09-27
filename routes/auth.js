const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({username, password: hashPassword});

    try{
        await user.save();
        res.status(201).send('User registered successfully')
    } catch (error) {
        res.status(400).send(err.message);
    }
});

router.post('/login', async (req, res) => {

    const {username, password} = req.body;
    const user = await User.findOne({username})

    if(user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    } else {
        res.status(401).send('Invalid credentials');
    }
    
})

module.exports = router;