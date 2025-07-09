import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const categories = [
  'Development & IT',
  'Design & Creative',
  'AI Services',
  'Sales & Marketing',
  'Engineering & Architecture'
];

const CategoryMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialCategory = params.get('category') || '';
    setQuery(initialCategory);
    filterCategories(initialCategory);
  }, [location.search]);

  const filterCategories = (keyword) => {
    const lower = keyword.toLowerCase();
    const filtered = categories.filter((cat) =>
      cat.toLowerCase().includes(lower)
    );
    setFilteredCategories(filtered);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    filterCategories(value);
  };

  const handleCategoryClick = (category) => {
    navigate(`/categorydetails?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="container py-4">
      <h2>Explore Categories</h2>
      <input
        type="text"
        className="form-control my-3"
        placeholder="Search categories..."
        value={query}
        onChange={handleInputChange}
      />
      <ul className="list-group">
        {filteredCategories.map((cat, idx) => (
          <li
            key={idx}
            className="list-group-item list-group-item-action"
            onClick={() => handleCategoryClick(cat)}
            style={{ cursor: 'pointer' }}
          >
            {cat}
          </li>
        ))}
        {filteredCategories.length === 0 && <li className="list-group-item text-muted">No categories found.</li>}
      </ul>
    </div>
  );
};

export default CategoryMenu;
