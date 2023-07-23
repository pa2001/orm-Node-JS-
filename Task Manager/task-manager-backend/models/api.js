// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors'); 
// Import the User model
const User = require('./User_info');
// Import the task model
const Task = require('./Task_info');
router.use(cors()); // Add this line
router.use(bodyParser.json());

// Signup endpoint
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body)
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User email already exists' });
    }

    // Create a new user
    const newUser = await User.create({ name, email, password });
    return res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Perform password validation
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Successful login
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Forgot password endpoint
router.post('/forgotpassword', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's password
    user.password = password;
    await user.save();

    // Password updated successfully
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//create task
router.post('/CreateTask', async (req, res) => {
  try {
    const { title,description,due_date,priority,status,created_by } = req.body;
    console.log(req.body)
    // Create a new task
    const newTask = await Task.create({ title,description,due_date,priority,status,created_by });
    return res.status(200).json(newTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Userinfo endpoint
router.post('/userinfo', async (req, res) => {
  const email = req.query.email;
  try {
    // Fetch user info from the database based on the email
    const user = await User.findOne({ where: { email } });
    if (user) {
      // Return the user information as a response
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//list all tasks
router.get('/listtasks', async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log(userId)
    const tasks = await Task.findAll({ where: { created_by: userId } });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//update user name
router.post('/updateusername', async (req,res)=>{
  try {
    const { userId, newName } = req.body;

    // Find the user by id
    const user = await User.findOne({ where: { id:userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's name
    user.name = newName;
    await user.save();

    // name updated successfully
    return res.status(200).json({ message: 'User Name updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
//update task title
router.post('/updatetasktitle', async (req,res)=>{
  try {
    const { taskId, title } = req.body;
    console.log(req.body);
    // Find the user by id
    const task = await Task.findOne({ where: { id: taskId } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the user's name
    task.title=title;
    await task.save()

    // name updated successfully
    return res.status(200).json({ message: 'Task Title updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
//update task status
router.post('/updatetaskstatus', async (req,res)=>{
  try {
    const { taskId, status } = req.body;
    console.log(req.body);
    // Find the user by id
    const task = await Task.findOne({ where: { id: taskId } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the user's name
    task.status=status;
    await task.save()
    // name updated successfully
    return res.status(200).json({ message: 'Task Status updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
//update task priority
router.post('/updatetaskpriority', async (req,res)=>{
  try {
    const { taskId, priority } = req.body;
    console.log(req.body);
    // Find the user by id
    const task = await Task.findOne({ where: { id: taskId } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the user's name
    task.priority=priority;
    await task.save()

    // name updated successfully
    return res.status(200).json({ message: 'Task Priority updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
//update task duedate
router.post('/updatetaskduedate', async (req,res)=>{
  try {
    const { taskId, due_date } = req.body;
    console.log(req.body);
    // Find the user by id
    const task = await Task.findOne({ where: { id: taskId } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the user's name
    task.due_date=due_date;
    await task.save()
    // name updated successfully
    return res.status(200).json({ message: 'Task Due Date updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
//update task description
router.post('/updatetaskdescription', async (req, res) => {
  try {
    const { taskId, description } = req.body;
    console.log(req.body);
    // Find the task by created_by
    const task = await Task.findOne({ where: { id: taskId } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    // // Update the task's description
    task.description=description;
    await task.save();
    // Task description updated successfully
    return res.status(200).json({ message: 'Task description updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
