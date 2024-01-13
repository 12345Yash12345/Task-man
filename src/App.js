import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    axios.get('http://localhost:3001/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
 const addTask = async () => {
  try {
    // Check if both title and description are not empty
    if (newTask.title.trim() !== '' && newTask.description.trim() !== '') {
      if (editIndex !== null) {
        // If editing an existing task
        const taskIdToUpdate = tasks[editIndex].id;
        if (taskIdToUpdate) {
          await axios.put(`http://localhost:3001/tasks/${taskIdToUpdate}`, newTask);
        } else {
          console.error('Invalid taskId:', taskIdToUpdate);
        }
      } else {
        // If adding a new task
        await axios.post('http://localhost:3001/tasks', newTask);
      }

      // Reset state after adding/editing task
      setEditIndex(null);
      setNewTask({ title: '', description: '' });

      // Fetch updated tasks
      fetchTasks();
    }
  } catch (error) {
    console.error('Error adding/editing task:', error);
  }
};

  
  
  

  const editTask = (index) => {
    setEditIndex(index);
    const taskToEdit = tasks[index];
    setNewTask({ title: taskToEdit.title, description: taskToEdit.description });
  };
  



  const deleteTask = async (taskId) => {
    try {
      if (taskId !== undefined && tasks[taskId] !== undefined) {
        const taskIdToDelete = tasks[taskId].id;
        await axios.delete(`http://localhost:3001/tasks/${taskIdToDelete}`);
        // Fetch updated tasks after successful deletion
        fetchTasks();
      } else {
        console.error('Invalid taskId:', taskId);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  

  return (
    <div className="App">
      <h1>Task Management System</h1>

      <div>
        <form>
          <label>
            Title:
              <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
          </label>
          <label>
            Description:
              <input
              type="text"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
          </label>
          <button type="button" onClick={addTask}>
            {editIndex !== null ? 'Edit Task' : 'Add Task'}
          </button>
        </form>
      </div>

      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
          <div>
             <p>not tasks</p>

          </div>
        )}


    </div>
  );
}

export default App;
