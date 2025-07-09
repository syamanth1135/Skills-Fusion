import React, { useEffect, useState } from 'react';

const ClientProjectList = () => {
  const [projects, setProjects] = useState([]);
  const clientEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!clientEmail) return;

    fetch(`http://localhost:8081/api/projects/client/${clientEmail}`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Error fetching client projects:", err));
  }, [clientEmail]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        padding: '3rem 2rem',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#333' }}>
        My Posted Projects
      </h2>

      {projects.length === 0 ? (
        <p style={{ fontSize: '1.1rem', color: '#777' }}>
          You haven’t posted any projects yet.
        </p>
      ) : (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            width: '100%',
            maxWidth: '700px',
          }}
        >
          {projects.map((project, index) => (
            <li
              key={index}
              style={{
                backgroundColor: 'white',
                marginBottom: '1.5rem',
                border: '1px solid #ddd',
                padding: '1.5rem',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
            >
              <h3 style={{ margin: '0 0 1rem 0', color: '#222' }}>
                {project.title}
              </h3>
              <p style={{ margin: '0 0 0.5rem 0', color: '#555' }}>
                <strong>Category:</strong> {project.category}
              </p>
              <p style={{ margin: '0 0 0.5rem 0', color: '#555' }}>
                <strong>Description:</strong> {project.description}
              </p>
              <p style={{ margin: 0, color: '#555' }}>
                <strong>Deadline Date:</strong>{' '}
                {new Date(project.deadline).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientProjectList;
