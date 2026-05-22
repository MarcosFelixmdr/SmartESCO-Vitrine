import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Cpu, Network } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import './styles.css';

const Home = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-slide');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="new-hero">
        <div className="new-hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580978556751-1b8c6e67a865')" }}></div>
        <div className="new-hero-overlay"></div>
        <div className="new-hero-gradient"></div>
        
        <div className="new-hero-content container animate-slide">
          <div className="new-hero-badge">
            <span className="ping-dot">
              <span className="ping-anim"></span>
              <span className="ping-core"></span>
            </span>
            <span className="badge-text">{t('home_badge')}</span>
          </div>
          
          <h1 className="new-hero-title">
            {t('home_hero_title')}
          </h1>
          <p className="new-hero-subtitle">
            {t('home_hero_subtitle')}
          </p>
          
          <Link to="/projetos">
            <button className="new-hero-btn group">
              {t('home_hero_btn')}
              <ArrowRight className="btn-icon" size={20} />
            </button>
          </Link>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            
            {/* Left Side: Text and List */}
            <div className="features-text animate-slide">
              <h2 className="features-title">{t('home_feat_title')}</h2>
              <p className="features-desc">{t('home_feat_desc')}</p>
              
              <ul className="features-list">
                <li>
                  <div className="icon-wrapper"><Zap size={14} /></div>
                  {t('home_feat_item1')}
                </li>
                <li>
                  <div className="icon-wrapper"><Zap size={14} /></div>
                  {t('home_feat_item2')}
                </li>
                <li>
                  <div className="icon-wrapper"><Zap size={14} /></div>
                  {t('home_feat_item3')}
                </li>
              </ul>
              
              <Link to="/projetos" className="features-link group">
                {t('home_feat_link')} <ArrowRight size={16} className="btn-icon" />
              </Link>
            </div>

            {/* Right Side: Cards Grid */}
            <div className="cards-grid animate-slide">
              <div className="cards-col mt-offset">
                <div className="feature-card dark-card">
                  <Cpu size={40} className="card-icon" />
                  <h3>{t('home_card_hw')}</h3>
                  <p>{t('home_card_hw_desc')}</p>
                </div>
                <div className="feature-card primary-card">
                  <Network size={40} className="card-icon-light" />
                  <h3>{t('home_card_iot')}</h3>
                  <p>{t('home_card_iot_desc')}</p>
                </div>
              </div>
              <div className="cards-col">
                <div className="feature-card secondary-card">
                  <Zap size={40} className="card-icon" />
                  <h3>{t('home_card_sg')}</h3>
                  <p>{t('home_card_sg_desc')}</p>
                </div>
                <div className="feature-card stat-card">
                  <h3>10+</h3>
                  <p>{t('home_card_stat')}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

