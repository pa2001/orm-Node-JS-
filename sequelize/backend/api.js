const express = require('express');
const User = require('./models/Users');

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name,email,password)
    const user=await User.findOne({where:{email}});
    if(user){
      res.status(409).json({ message: 'Email already exists' });
    }
    else{
      await User.create({
        name,
        email,
        password,
      });  
      res.status(201).json({ message: 'User registered successfully' });
    } 
    }
    catch (error) {
      res.status(500).json({ message: 'Error registering user' });
    }
    
});

// Forgot password
router.post('/forgotpassword', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      user.password = newPassword;
      await user.save();
      res.status(200).json({ message: 'Password updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating password' });
  }
});
//see details
router.post('/detailsofuser', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      console.log(user)
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error finding details of user' });
  }
});

// Delete user details
router.post('/deleteuser', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      const userdetails=user
      await user.destroy();
      res.status(200).json(userdetails);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
