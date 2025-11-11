import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../../../api/post/auth';
import style from './AdminBlock.module.scss';

const AdminBlock = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  if (!user) {
    return (
      <div className={style.profile}>
        <div className={style.notAuth}>
          <h2>Доступ запрещен</h2>
          <p>Пожалуйста, войдите в систему</p>
          <button onClick={() => navigate('/')}>На главную</button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.profile}>
      <div className={style.profileWrapp}>
        <div className={style.contentBlock}>
          <h1 className={style.title}>Привет, {user.name}</h1>
          
          <div className={style.btnBlock}>
            <button 
              onClick={handleLogout}
              className={style.logout}
            >
              Выйти из аккаунта
            </button>
            <Link to='/contacts' className={style.contacts}>
              Перейти в контакты
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlock;