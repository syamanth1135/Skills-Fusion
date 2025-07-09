import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackendDevelopmentPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '40px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        <ArrowLeft size={20} /> Back
      </button>
      <h1>Backend Development</h1>
      <p>
        We specialize in building scalable, secure server-side solutions using:
      </p>
      <ul>
        <li>Python</li>
        <li>Java</li>
        <li>PostgreSQL</li>
        <li>Redis</li>
      </ul>
    </div>
  );
};

export default BackendDevelopmentPage;
