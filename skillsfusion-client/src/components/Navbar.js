// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
// import { User, LogOut, ChevronDown, Plus } from 'lucide-react';

// const Navbar = () => {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userEmail, setUserEmail] = useState('');
//   const [userRole, setUserRole] = useState('');
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [showLangMenu, setShowLangMenu] = useState(false);

//   useEffect(() => {
//     const authStatus = localStorage.getItem('isAuthenticated');
//     const email = localStorage.getItem('userEmail');
//     const role = localStorage.getItem('userRole');
//     console.log(role);
//     if (authStatus === 'true') {
//       setIsAuthenticated(true);
//       setUserEmail(email || '');
//       setUserRole(role || '');
//     }
//   }, []);

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//     setShowLangMenu(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('userEmail');
//     localStorage.removeItem('userRole'); // <== clear userRole on logout
//     setIsAuthenticated(false);
//     setUserEmail('');
//     setUserRole('');
//     setShowUserMenu(false);
//     window.dispatchEvent(new Event('authStateChanged')); // 🔔 Notify Hero
//     navigate('/');
//   };

//   const handleProfileClick = () => {
//     navigate('/profile');
//     setShowUserMenu(false);
//   };

//   return (
//     <nav style={{
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '1rem 2rem',
//       background: '#fff',
//       borderBottom: '1px solid #e5e7eb',
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       width: '100%',
//       zIndex: 1000,
//       boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
//     }}>
//       <div className="navbar-left">
//         <h2
//           style={{
//             fontSize: '1.5rem',
//             fontWeight: 'bold',
//             color: '#00c6ff',
//             margin: 0,
//             cursor: 'pointer',
//             transition: 'color 0.3s ease',
//           }}
//           onClick={() => navigate('/')}
//           onMouseEnter={(e) => (e.target.style.color = '#0099cc')}
//           onMouseLeave={(e) => (e.target.style.color = '#00c6ff')}
//         >
//           SkillsFusion<span style={{ color: '#ff6b6b' }}>.</span>
//         </h2>
//       </div>

//       <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
//         <ul style={{
//           display: 'flex',
//           listStyle: 'none',
//           margin: 0,
//           padding: 0,
//           gap: '2rem',
//           alignItems: 'center',
//         }}>
//           <li>
//             <button
//               onClick={() => navigate('/premium')}
//               style={navLinkStyle}
//             >
//               {t('fusionPro')}
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => navigate('/explore')}
//               style={navLinkStyle}
//             >
//               {t('explore')}
//             </button>
//           </li>
//           <li
//             style={langDropdownStyle}
//             onMouseEnter={() => setShowLangMenu(true)}
//             onMouseLeave={() => setShowLangMenu(false)}
//           >
//             🌐 {i18n.language.toUpperCase()}
//             <ul style={langMenuStyle(showLangMenu)}>
//               {['en', 'fr', 'de', 'es', 'pt'].map((lang) => (
//                 <li
//                   key={lang}
//                   onClick={() => changeLanguage(lang)}
//                   style={langMenuItemStyle}
//                 >
//                   {lang === 'en' && 'English'}
//                   {lang === 'fr' && 'Français'}
//                   {lang === 'de' && 'Deutsch'}
//                   {lang === 'es' && 'Español'}
//                   {lang === 'pt' && 'Português'}
//                 </li>
//               ))}
//             </ul>
//           </li>
//         </ul>

//         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//           {isAuthenticated ? (
//             <div style={{ position: 'relative' }}>
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   padding: '8px 12px',
//                   background: '#f0f8ff',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                   border: '1px solid #00c6ff',
//                   color: '#00c6ff',
//                   fontWeight: '500',
//                 }}
//                 onClick={() => setShowUserMenu(!showUserMenu)}
//               >
//                 <User size={18} />
//                 <span>{userEmail.split('@')[0]}</span>
//                 <ChevronDown size={16} />
//               </div>

//               {showUserMenu && (
//                 <div style={{
//                   position: 'absolute',
//                   top: 'calc(100% + 8px)',
//                   right: 0,
//                   background: 'white',
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '12px',
//                   boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
//                   padding: '0.5rem 0',
//                   minWidth: '180px',
//                   zIndex: 1001,
//                 }}>
//                   <div onClick={handleProfileClick} style={dropdownItemStyle}>
//                     <User size={16} />
//                     <span>Profile</span>
//                   </div>

//                   {userRole === 'CLIENT' && (
//                     <div
//                       onClick={() => {
//                         navigate('/clientpro');
//                         setShowUserMenu(false);
//                       }}
//                       style={dropdownItemStyle}
//                     >
//                       <Plus size={16} />
//                       <span>Add Project</span>
//                     </div>
//                   )}

//                   <div onClick={handleLogout} style={{
//                     ...dropdownItemStyle,
//                     borderTop: '1px solid #e5e7eb',
//                     marginTop: '4px',
//                     color: '#ef4444',
//                   }}>
//                     <LogOut size={16} />
//                     <span>Logout</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <button onClick={() => navigate('/login')} style={loginBtnStyle}>
//                 {t('login')}
//               </button>
//               <button onClick={() => navigate('/signup')} style={joinBtnStyle}>
//                 {t('signup')}
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// const navLinkStyle = {
//   textDecoration: 'none',
//   color: '#374151',
//   fontWeight: '500',
//   padding: '0.5rem 1rem',
//   borderRadius: '6px',
//   transition: 'all 0.3s ease',
//   cursor: 'pointer',
//   background: 'none',
//   border: 'none',
//   font: 'inherit',
// };

// const langDropdownStyle = {
//   position: 'relative',
//   cursor: 'pointer',
//   padding: '0.5rem 1rem',
//   borderRadius: '6px',
//   transition: 'all 0.3s ease',
//   fontWeight: '500',
//   userSelect: 'none',
// };

// const langMenuStyle = (show) => ({
//   position: 'absolute',
//   top: '100%',
//   left: 0,
//   background: 'white',
//   border: '1px solid #e5e7eb',
//   borderRadius: '8px',
//   boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
//   padding: '0.5rem 0',
//   margin: 0,
//   listStyle: 'none',
//   minWidth: '140px',
//   zIndex: 1001,
//   opacity: show ? 1 : 0,
//   visibility: show ? 'visible' : 'hidden',
//   transform: show ? 'translateY(0)' : 'translateY(-10px)',
//   transition: 'all 0.3s ease',
// });

// const langMenuItemStyle = {
//   padding: '0.75rem 1rem',
//   cursor: 'pointer',
//   transition: 'background-color 0.2s ease',
//   color: '#374151',
//   fontWeight: '400',
// };

// const dropdownItemStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   gap: '12px',
//   padding: '12px 16px',
//   cursor: 'pointer',
//   transition: 'all 0.2s ease',
//   color: '#374151',
//   fontWeight: '500',
// };

// const loginBtnStyle = {
//   padding: '0.5rem 1.5rem',
//   borderRadius: '6px',
//   fontWeight: '500',
//   cursor: 'pointer',
//   color: '#374151',
//   background: 'transparent',
//   border: '1px solid #d1d5db',
// };

// const joinBtnStyle = {
//   padding: '0.5rem 1.5rem',
//   borderRadius: '6px',
//   fontWeight: '500',
//   cursor: 'pointer',
//   color: 'white',
//   background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
//   border: 'none',
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, ChevronDown, Plus, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const email = localStorage.getItem('userEmail');
    const role = localStorage.getItem('userRole');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setUserEmail(email || '');
      setUserRole(role || '');
    }
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangMenu(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserEmail('');
    setUserRole('');
    setShowUserMenu(false);
    window.dispatchEvent(new Event('authStateChanged'));
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowUserMenu(false);
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
    }}>
      <div className="navbar-left">
        <h2
          style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00c6ff', margin: 0, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          SkillsFusion<span style={{ color: '#ff6b6b' }}>.</span>
        </h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '2rem', alignItems: 'center' }}>
          <li><button onClick={() => navigate('/premium')} style={navLinkStyle}>{t('fusionPro')}</button></li>
          <li><button onClick={() => navigate('/explore')} style={navLinkStyle}>{t('explore')}</button></li>
          <li
            style={langDropdownStyle}
            onMouseEnter={() => setShowLangMenu(true)}
            onMouseLeave={() => setShowLangMenu(false)}
          >
            🌐 {i18n.language.toUpperCase()}
            <ul style={langMenuStyle(showLangMenu)}>
              {['en', 'fr', 'de', 'es', 'pt'].map((lang) => (
                <li key={lang} onClick={() => changeLanguage(lang)} style={langMenuItemStyle}>
                  {lang === 'en' && 'English'}
                  {lang === 'fr' && 'Français'}
                  {lang === 'de' && 'Deutsch'}
                  {lang === 'es' && 'Español'}
                  {lang === 'pt' && 'Português'}
                </li>
              ))}
            </ul>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#f0f8ff', borderRadius: '8px', cursor: 'pointer', border: '1px solid #00c6ff', color: '#00c6ff', fontWeight: '500' }}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <User size={18} />
                <span>{userEmail.split('@')[0]}</span>
                <ChevronDown size={16} />
              </div>

              {showUserMenu && (
                <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)', padding: '0.5rem 0', minWidth: '180px', zIndex: 1001 }}>
                  <div onClick={handleProfileClick} style={dropdownItemStyle}><User size={16} /><span>Profile</span></div>

                  {userRole === 'CLIENT' && (
                    <>
                      <div onClick={() => { navigate('/clientpro'); setShowUserMenu(false); }} style={dropdownItemStyle}>
                        <Plus size={16} /><span>Add Project</span>
                      </div>
                      <div onClick={() => { navigate('/myprojects'); setShowUserMenu(false); }} style={dropdownItemStyle}>
                          📄<span>My Projects</span>
                      </div>
                    </>
                  )}
                   <div onClick={() => { navigate('/chatlist'); setShowUserMenu(false); }} style={dropdownItemStyle}>
                        <MessageCircle size={16} /><span>Chat</span>
                      </div>

                  <div onClick={handleLogout} style={{ ...dropdownItemStyle, borderTop: '1px solid #e5e7eb', marginTop: '4px', color: '#ef4444' }}>
                    <LogOut size={16} /><span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => navigate('/login')} style={loginBtnStyle}>{t('login')}</button>
              <button onClick={() => navigate('/signup')} style={joinBtnStyle}>{t('signup')}</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const navLinkStyle = {
  textDecoration: 'none',
  color: '#374151',
  fontWeight: '500',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  font: 'inherit',
};

const langDropdownStyle = {
  position: 'relative',
  cursor: 'pointer',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  transition: 'all 0.3s ease',
  fontWeight: '500',
  userSelect: 'none',
};

const langMenuStyle = (show) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  background: 'white',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  padding: '0.5rem 0',
  margin: 0,
  listStyle: 'none',
  minWidth: '140px',
  zIndex: 1001,
  opacity: show ? 1 : 0,
  visibility: show ? 'visible' : 'hidden',
  transform: show ? 'translateY(0)' : 'translateY(-10px)',
  transition: 'all 0.3s ease',
});

const langMenuItemStyle = {
  padding: '0.75rem 1rem',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  color: '#374151',
  fontWeight: '400',
};

const dropdownItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  color: '#374151',
  fontWeight: '500',
};

const loginBtnStyle = {
  padding: '0.5rem 1.5rem',
  borderRadius: '6px',
  fontWeight: '500',
  cursor: 'pointer',
  color: '#374151',
  background: 'transparent',
  border: '1px solid #d1d5db',
};

const joinBtnStyle = {
  padding: '0.5rem 1.5rem',
  borderRadius: '6px',
  fontWeight: '500',
  cursor: 'pointer',
  color: 'white',
  background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
  border: 'none',
};

export default Navbar;