import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileAppDevelopmentPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '40px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        <ArrowLeft size={20} /> Back
      </button>
      <h1>Mobile App Development</h1>
      <p>
        We develop robust, user-friendly mobile apps for iOS and Android using:
      </p>
      <ul>
        <li>React Native</li>
        <li>Flutter</li>
        <li>Swift</li>
        <li>Kotlin</li>
      </ul>
    </div>
  );
};

export default MobileAppDevelopmentPage;
