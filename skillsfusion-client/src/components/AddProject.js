import React, { useState } from 'react';
import axios from 'axios';

const AddProject = () => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    budget: '',
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientEmail = localStorage.getItem('userEmail');
      const response = await axios.post('http://localhost:8080/api/projects', {
        ...project,
        clientEmail,
      });
      alert('Project added successfully!');
      setProject({ title: '', description: '', budget: '' });
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add project.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Budget</label>
          <input
            type="number"
            name="budget"
            value={project.budget}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', background: '#00c6ff', color: '#fff', border: 'none' }}>
          Post Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
