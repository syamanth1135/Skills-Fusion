import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientChatList = () => {
  const [freelancers, setFreelancers] = useState([]);
  const clientEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  useEffect(() => {
    if (!clientEmail) return;

    fetch(`http://localhost:8081/api/applications/client/${clientEmail}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch freelancers');
        return res.json();
      })
      .then((data) => setFreelancers(data))
      .catch((err) => console.error('Error fetching freelancers:', err));
  }, [clientEmail]);

  const handleChat = (freelancerEmail) => {
    navigate(`/chat?to=${freelancerEmail}`);
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
        Your Freelancers
      </h2>

      {freelancers.length === 0 ? (
        <p style={{ fontSize: '1.1rem', color: '#777' }}>
          No freelancers have applied to your projects yet.
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
          {freelancers.map((f, idx) => (
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
                <strong>Name:</strong> {f.fullName}
              </p>
              <p style={{ margin: '0 0 1rem 0', color: '#555' }}>
                <strong>Email:</strong> {f.email}
              </p>
              <button
                onClick={() => handleChat(f.email)}
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

export default ClientChatList;
