const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load env variables

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const TaskSchema = new mongoose.Schema({
  text: String,
});

const Task = mongoose.model('Task', TaskSchema);

// Get all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add a task
app.post('/tasks', async (req, res) => {
  const { text } = req.body;
  const newTask = new Task({ text });
  await newTask.save();
  res.json(newTask);
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));