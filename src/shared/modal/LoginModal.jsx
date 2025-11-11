import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/post/auth';
import style from './LoginModal.module.scss';

const LoginModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.login.trim()) {
      newErrors.login = 'Логин обязателен';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await loginUser(formData.login, formData.password);
      
      if (result.success) {
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        onClose();
        navigate('/admin');
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error) {
      setErrors({ submit: 'Произошла ошибка при авторизации' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeButton} onClick={onClose}>×</button>
        
        <h2 className={style.title}>Вход в систему</h2>
        
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.formGroup}>
            <label htmlFor="login" className={style.label}>
              Логин
            </label>
            <input
              type="text"
              id="login"
              name="login"
              value={formData.login}
              onChange={handleChange}
              className={`${style.input} ${errors.login ? style.inputError : ''}`}
              placeholder="Введите ваш логин"
            />
            {errors.login && <span className={style.error}>{errors.login}</span>}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="password" className={style.label}>
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`${style.input} ${errors.password ? style.inputError : ''}`}
              placeholder="Введите ваш пароль"
            />
            {errors.password && <span className={style.error}>{errors.password}</span>}
          </div>

          {errors.submit && (
            <div className={style.submitError}>{errors.submit}</div>
          )}

          <button 
            type="submit" 
            className={style.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;