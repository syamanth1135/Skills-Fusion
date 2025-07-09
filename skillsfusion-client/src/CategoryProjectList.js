import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './components/CategoryProjectList.css';

const CategoryProjectList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!category) return;

    fetch(`http://localhost:8081/api/projects/category/${encodeURIComponent(category)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching:", err));
  }, [category]);

  const handleApply = (projectId) => {
    navigate(`/apply/${projectId}`);
  };

  const handleChat = (clientEmail) => {
    const freelancerEmail = localStorage.getItem("userEmail");
    if (!freelancerEmail) {
      alert("Please login as a freelancer to start chat");
      return;
    }
    navigate(`/chat?to=${clientEmail}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="category-page" style={{ padding: '2rem' }}>
      <button
        onClick={handleBack}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: '1.5rem',
        }}
      >
        ← Back
      </button>

      <h2>Projects in Category: {category || 'N/A'}</h2>

      {projects.length === 0 ? (
        <p>No projects found in this category.</p>
      ) : (
        <ul className="project-list">
          {projects.map((p, index) => (
            <li key={index} className="project-card">
              <h3>{p.title}</h3>
              <p><strong>Description:</strong> {p.description}</p>
              <p><strong>Budget:</strong> ₹{p.budget}</p>
              <p><strong>Deadline:</strong> {p.deadline}</p>
              <p><strong>Client Name:</strong> {p.clientName}</p>
              <p><strong>Client Email:</strong> {p.clientEmail}</p>
              <p><strong>Contact Number:</strong> {p.contactNumber}</p>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  onClick={() => handleApply(p.id)}
                  className="action-btn"
                >
                  Apply
                </button>
                <button
                  onClick={() => handleChat(p.clientEmail)}
                  className="action-btn"
                >
                  Chat
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryProjectList;
