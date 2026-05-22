import React from 'react';
import { useLanguage } from './context/LanguageContext';
import './styles.css';

const Servicos = () => {
  const { t } = useLanguage();

  return (
    <div className="servicos-page">
      <section className="hero">
        <div className="container animate-slide">
          <h1>{t('serv_hero_title')}</h1>
          <p>{t('serv_hero_desc')}</p>
        </div>
      </section>

      <section className="section container">
        <div className="grid-3">
          <div className="card animate-slide">
            <img 
              src="https://images.unsplash.com/photo-1701367976949-269effa0c323?auto=format&fit=crop&w=400&h=280" 
              alt="Eletrônica" 
              className="img-rounded"
              style={{ marginBottom: '20px' }}
            />
            <h3>{t('serv_card_el')}</h3>
            <p>{t('serv_card_el_desc')}</p>
          </div>
          <div className="card animate-slide">
            <img 
              src="https://images.unsplash.com/photo-1671726805768-93b4c260766b?auto=format&fit=crop&w=400&h=280" 
              alt="Software" 
              className="img-rounded"
              style={{ marginBottom: '20px' }}
            />
            <h3>{t('serv_card_sw')}</h3>
            <p>{t('serv_card_sw_desc')}</p>
          </div>
          <div className="card animate-slide">
            <img 
              src="https://images.unsplash.com/photo-1531837404483-bdbd0d209ec1?auto=format&fit=crop&w=400&h=280" 
              alt="Parcerias" 
              className="img-rounded"
              style={{ marginBottom: '20px' }}
            />
            <h3>{t('serv_card_parc')}</h3>
            <p>{t('serv_card_parc_desc')}</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <h2 className="section-title">{t('serv_faq_title')}</h2>
          <div className="faq-section">
            <div className="faq-item animate-slide">
              <h6>{t('serv_faq_q1')}</h6>
              <p>{t('serv_faq_a1')}</p>
            </div>
            <div className="faq-item animate-slide">
              <h6>{t('serv_faq_q2')}</h6>
              <p>{t('serv_faq_a2')}</p>
            </div>
            <div className="faq-item animate-slide">
              <h6>{t('serv_faq_q3')}</h6>
              <p>{t('serv_faq_a3')}</p>
            </div>
            <div className="faq-item animate-slide">
              <h6>{t('serv_faq_q4')}</h6>
              <p>{t('serv_faq_a4')}</p>
            </div>
            <div className="faq-item animate-slide">
              <h6>{t('serv_faq_q5')}</h6>
              <p>{t('serv_faq_a5')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicos;
