import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ClientViewApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const clientEmail = localStorage.getItem("userEmail");
    fetch(`http://localhost:8081/api/applications/client/${clientEmail}`)
      .then(res => res.json())
      .then(data => setApplicants(data))
      .catch(err => console.error("Failed to load applicants", err));
  }, []);

  const handleChat = (freelancerEmail) => {
    navigate(`/chat?to=${freelancerEmail}`);
  };

  return (
    <div className="applicants-container">
      <h2>Freelancer Applicants</h2>
      {applicants.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <ul>
          {applicants.map((a, index) => (
            <li key={index} className="applicant-card">
              <p><strong>Name:</strong> {a.freelancerName}</p>
              <p><strong>Email:</strong> {a.freelancerEmail}</p>
              <p><strong>Proposal:</strong> {a.proposal}</p>
              <button onClick={() => handleChat(a.freelancerEmail)}>Chat</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientViewApplicants;