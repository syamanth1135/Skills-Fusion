import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './FreelanceAuthPages.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [displaymodal, setDisplaymodal] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9]+@gmail\.com$/;

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailPattern.test(formData.email)) newErrors.email = 'Use format like abc123@gmail.com';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Minimum 8 characters required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchUserProfile = async (email) => {
    try {
      const response = await fetch(`http://localhost:8081/api/auth/${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('firstName', userData.firstName || '');
        localStorage.setItem('lastName', userData.lastName || '');
        localStorage.setItem('userEmail', userData.email || email);
        localStorage.setItem('userType', (userData.userType || 'FREELANCER').toUpperCase());
        return true;
      } else {
        console.error('Failed to fetch user profile');
        return false;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userRole', data.role);

        const profileFetched = await fetchUserProfile(formData.email);

        window.dispatchEvent(new Event('authStateChanged'));

        if (profileFetched) {
          setDisplaymodal(true);
        } else {
          alert('Login successful, but failed to load profile data.');
          setDisplaymodal(true);
        }
      } else {
        alert(data.message || 'Something went wrong!');
      }
    } catch (err) {
      alert('Server not reachable.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setDisplaymodal(false);
    navigate('/');
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'rgb(255, 255, 255)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
    p: 4,
    textAlign: 'center',
    color: '#0d47a1',
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    background: '#00c6ff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    transition: 'background 0.3s ease',
  };

  return (
    <div className="container">
      <div className="grid">
        <div className="branding">
          <h1>SkillsFusion</h1>
          <p>Connect. Create. Collaborate.</p>
        </div>

        <div className="card">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
          <div className="input-field">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="abc123@gmail.com"
              className={errors.email ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}

            <label>Password</label>
            <div className="password-field">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter password"
                className={errors.password ? 'error' : ''}
                disabled={isLoading}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}

            <div
              className={`button ${isLoading ? 'loading' : ''}`}
              onClick={isLoading ? null : handleSubmit}
              style={{
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </div>

            <div className="toggle-mode">
              <p>
                Don't have an account?
                <button
                  onClick={() => navigate('/signup')}
                  disabled={isLoading}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#00c6ff',
                    fontWeight: 'bold',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    marginLeft: '5px',
                    opacity: isLoading ? 0.5 : 1,
                  }}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal open={displaymodal} onClose={handleModalClose}>
        <Box sx={style}>
          <h2 style={{ color: '#00c6ff', fontWeight: 'bold' }}>Login Success</h2>
          <p style={{ margin: '10px 0', color: '#333' }}>Welcome back! You've successfully logged in.</p>
          <button
            onClick={handleModalClose}
            style={buttonStyle}
            onMouseOver={e => (e.target.style.background = '#0095c5')}
            onMouseOut={e => (e.target.style.background = '#00c6ff')}
          >
            Continue
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginPage;
