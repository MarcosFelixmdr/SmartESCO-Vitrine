import React from 'react';
import { useLanguage } from './context/LanguageContext';
import './styles.css';

const Contato = () => {
  const { t } = useLanguage();

  return (
    <div className="contato-page">
      <section className="hero">
        <div className="container animate-slide">
          <h1>{t('cont_hero_title')}</h1>
          <p>{t('cont_hero_desc')}</p>
        </div>
      </section>

      <section className="section container">
        <div className="contact-grid">

          <div className="animate-slide">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '40px' }}>
              {t('cont_section_title')}
            </h2>
            <p className="body-text" style={{ marginBottom: '40px' }}>
              {t('cont_body_text')}
            </p>

            <div className="contact-info-item">
              <h4>{t('cont_address')}</h4>
              <p>Rua Domingos Silvério, 135, Quitandinha, Petrópolis - RJ, CEP 25650-050</p>
            </div>

            <div className="contact-info-item">
              <h4>{t('cont_hours')}</h4>
              <p>{t('cont_hours_desc')}</p>
            </div>

            <div className="contact-info-item">
              <h4>{t('cont_email_tel')}</h4>
              <p>contato@SmartESCO.com.br</p>
              <p>+55 21 99551-9674</p>
            </div>
          </div>

          <div className="card animate-slide">
            <h3 style={{ marginBottom: '30px' }}>{t('cont_form_title')}</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">{t('cont_form_name')}</label>
                <input type="text" placeholder={t('cont_form_name_ph')} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">{t('cont_form_email')}</label>
                <input type="email" placeholder={t('cont_form_email_ph')} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">{t('cont_form_msg')}</label>
                <textarea 
                  placeholder={t('cont_form_msg_ph')} 
                  className="form-input" 
                  style={{ minHeight: '150px', resize: 'vertical' }}
                ></textarea>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                {t('cont_form_btn')}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: '100px' }}>
        <div className="container">
          <div className="map-container animate-slide">
            <iframe 
              src="https://www.google.com/maps?q=Rua+Domingos+Silv%C3%A9rio,+135,+Quitandinha,+Petr%C3%B3polis+-+RJ,+CEP+25650-050&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;
