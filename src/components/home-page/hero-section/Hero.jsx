import React, { useState } from 'react';
import style from './Hero.module.scss';
import { HEALTH_BLOCKS } from '../../../data/healthBlocks/data';
import { Link } from 'react-router-dom';
import LoginModal from '../../../shared/modal/LoginModal';

const Hero = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <section className={style.myHero}>
      <div className={style.heroWrapp}>
        <div className={style.titleBlock}>
          <h1>Место для получения медицинской помощи</h1>
        </div>
        
        <div className={style.btnBlock}>
          <button 
            className={style.login} 
            onClick={() => setShowLoginModal(true)}
          >
            Войти
          </button>
          <Link to='/contacts' className={style.contacts}>Контакты</Link>
        </div>
      </div>
      
      <div className={style.healthBlocks}>
        {HEALTH_BLOCKS.map((block) => (
          <div key={block.id} className={style.healthBlock}>
            <div className={style.healthIcon}>
              <img src={block.img} alt={block.title} />
            </div>
            <h5 className={style.healthTitle}>{block.title}</h5>
            <hr />
            <p className={style.healthText}>{block.fish}</p>
          </div>
        ))}
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </section>
  );
};

export default Hero;