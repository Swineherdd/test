import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../api/post/auth';
import LoginModal from '../../shared/modal/LoginModal';
import style from './Header.module.scss';

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.location.reload();
  };

  return (
    <header className={style.myHeader}>
      <div className={style.headerWrapp}>
        <Link to='/' className={style.logo}>logo</Link>
        <div className={style.btnWrapp}>
          <Link to="/contacts" className={style.contactsLink}>Контакты</Link>
          {currentUser ? (
            <div className={style.userMenu}>
              
              <button 
                onClick={handleLogout}
                className={style.logoutButton}
              >
                Выйти
              </button>
            </div>
          ) : (
            <button onClick={() => setShowLoginModal(true)}>Войти</button>
          )}
        </div>
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </header>
  );
};

export default Header;