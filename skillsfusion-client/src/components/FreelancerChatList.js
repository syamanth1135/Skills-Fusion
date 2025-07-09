import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FreelancerChatList = () => {
  const [clients, setClients] = useState([]);
  const freelancerEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  useEffect(() => {
    if (!freelancerEmail) return;

    fetch(`http://localhost:8081/api/applications/freelancer/${freelancerEmail}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch clients');
        return res.json();
      })
      .then((data) => setClients(data))
      .catch((err) => console.error('Error fetching clients:', err));
  }, [freelancerEmail]);

  const handleChat = (clientEmail) => {
    navigate(`/chat?to=${clientEmail}`);
  };

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
        Your Clients
      </h2>

      {clients.length === 0 ? (
        <p style={{ fontSize: '1.1rem', color: '#777' }}>
          You haven't applied to any projects yet.
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
          {clients.map((c, idx) => (
            <li
              key={idx}
              style={{
                backgroundColor: 'white',
                marginBottom: '1.5rem',
                border: '1px solid #ddd',
                padding: '1.5rem',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
            >
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                <strong>Client Name:</strong> {c.project.clientName}
              </p>
              <p style={{ margin: '0 0 0.5rem 0', color: '#555' }}>
                <strong>Email:</strong> {c.project.clientEmail}
              </p>
              <p style={{ margin: '0 0 1rem 0', color: '#555' }}>
                <strong>Project:</strong> {c.project.title}
              </p>
              <button
                onClick={() => handleChat(c.project.clientEmail)}
                style={{
                  padding: '0.6rem 1.2rem',
                  backgroundColor: '#00c6ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = '#009edc')
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = '#00c6ff')
                }
              >
                Chat
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FreelancerChatList;
