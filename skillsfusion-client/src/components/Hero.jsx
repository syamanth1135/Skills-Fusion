import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Needed for Carousel
import { Carousel } from 'bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import './Hero.css';

const categories = [
  'Development & IT',
  'Design & Creative',
  'AI Services',
  'Sales & Marketing',
  'Engineering & Architecture'
];

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [shouldShowSearch, setShouldShowSearch] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Check auth and user role on load and when state changes
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('userRole')?.toUpperCase() || null;

    setIsAuthenticated(authStatus);
    setUserRole(role);
    setShouldShowSearch(authStatus && role === 'FREELANCER');

    const handleAuthChange = () => {
      const newStatus = localStorage.getItem('isAuthenticated') === 'true';
      const newRole = localStorage.getItem('userRole')?.toUpperCase() || null;

      setIsAuthenticated(newStatus);
      setUserRole(newRole);
      setShouldShowSearch(newStatus && newRole === 'FREELANCER');
    };

    window.addEventListener('authStateChanged', handleAuthChange);
    return () => window.removeEventListener('authStateChanged', handleAuthChange);
  }, []);

  // Bootstrap carousel setup
  useEffect(() => {
    const carouselEl = document.querySelector('#videoCarousel');
    if (carouselEl) {
      new Carousel(carouselEl, {
        interval: 5000,
        ride: 'carousel',
        pause: false
      });
    }
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/categorydetails?category=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const filtered = categories.filter((cat) =>
      cat.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
    setShowDropdown(!!value.trim() && filtered.length > 0);
  };

  const handleCategorySelect = (category) => {
    setSearchQuery(category);
    setShowDropdown(false);
    navigate(`/categorydetails?category=${encodeURIComponent(category)}`);
  };

  const handleInputFocus = () => {
    if (searchQuery.trim() && filteredCategories.length > 0) {
      setShowDropdown(true);
    }
  };

  // Dynamic hero text
  const getHeroTitle = () => {
    if (!isAuthenticated) return 'Welcome to SkillsFusion';
    if (userRole === 'CLIENT') return 'Skilled freelancers are on their way!';
    if (userRole === 'FREELANCER') return 'Find the perfect project';
    return '';
  };

  const getHeroSubtitle = () => {
    if (!isAuthenticated) return 'Join us to connect clients with skilled freelancers worldwide.';
    if (userRole === 'CLIENT') return 'Post jobs and hire the best talent in seconds.';
    if (userRole === 'FREELANCER') return 'Explore projects that match your expertise.';
    return '';
  };

  return (
    <section className="hero-section">
      {/* Video Carousel */}
      <div
        id="videoCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="5000">
            <video className="d-block w-100" autoPlay muted>
              <source src="/Assets/hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <video className="d-block w-100" autoPlay muted>
              <source src="/Assets/hero2.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <video className="d-block w-100" autoPlay muted>
              <source src="/Assets/hero3.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1>{getHeroTitle()}</h1>
        <p>{getHeroSubtitle()}</p>

        {shouldShowSearch && (
          <div className="hero-search-container position-relative">
            <form onSubmit={handleSearch} className="hero-search-form">
              <div className="search-input-group">
                <input
                  ref={searchRef}
                  type="text"
                  className="form-control hero-search-input"
                  placeholder="Search for project categories or domains..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  autoComplete="off"
                />
                <button type="submit" className="btn btn-primary hero-search-btn">
                  <Search size={20} />
                  <span className="ms-2 d-none d-sm-inline">Search</span>
                </button>
              </div>
            </form>

            {showDropdown && (
              <div
                ref={dropdownRef}
                className="position-absolute bg-white border rounded shadow-sm"
                style={{
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1000,
                  maxHeight: '200px',
                  overflowY: 'auto',
                  width: '300px',
                  marginTop: '5px'
                }}
              >
                {filteredCategories.map((category, index) => (
                  <div
                    key={index}
                    tabIndex={0}
                    className="px-3 py-2 cursor-pointer border-bottom category-item"
                    onClick={() => handleCategorySelect(category)}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#f8f9fa')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = 'white')}
                  >
                    <small className="text-muted">Category</small>
                    <div className="fw-medium text-dark">{category}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
