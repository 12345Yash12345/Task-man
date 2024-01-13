const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Use CORS middleware
app.use(cors());
app.use(express.json()); // Enable JSON request body parsing

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'taskmanager',
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from('your_mysql_password'),
  },
});

// Check MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Routes
app.get('/tasks', (req, res) => {
  // Fetch tasks from the database
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error('Error fetching tasks from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  // Add a new task to the database
  db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], (err, results) => {
    if (err) {
      console.error('Error adding task to MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const newTaskId = results.insertId;
      res.json({ id: newTaskId, title, description });
    }
  });
});

app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;

  // Update an existing task in the database
  db.query('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [title, description, taskId], (err, results) => {
    if (err) {
      console.error('Error updating task in MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ id: taskId, title, description });
    }
  });
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  // Delete an existing task from the database
  db.query('DELETE FROM tasks WHERE id = ?', [taskId], (err) => {
    if (err) {
      console.error('Error deleting task from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ id: taskId });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
