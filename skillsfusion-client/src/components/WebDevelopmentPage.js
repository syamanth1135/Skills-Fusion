import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WebDevelopmentPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '40px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        <ArrowLeft size={20} /> Back
      </button>
      <h1>Web Development</h1>
      <p>
        We build responsive and scalable web applications tailored to your needs using:
      </p>
      <ul>
        <li>React</li>
        <li>Node.js</li>
        <li>MongoDB</li>
        <li>Express</li>
      </ul>
    </div>
  );
};

export default WebDevelopmentPage;
