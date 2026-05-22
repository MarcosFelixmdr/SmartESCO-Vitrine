import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer" id="contato">
      <div className="container footer-grid">
        <div>
          <h3>SmartESCO</h3>
          <p style={{ marginTop: '20px', color: '#ccc' }}>
            {t('footer_desc')}
          </p>
        </div>
        <div>
          <h4>{t('footer_contato')}</h4>
          <p style={{ marginTop: '10px' }}>Email: contato@SmartESCO.com.br</p>
          <p>{t('footer_contato') === 'Contato' ? 'Telefone' : 'Phone'}: +55 21 99551-9674</p>
        </div>
        <div>
          <h4>{t('footer_redes')}</h4>
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #333', textAlign: 'center', fontSize: '14px', color: '#888' }}>
        <p>© 2025 SmartESCO. {t('footer_direitos')}</p>
      </div>
    </footer>
  );
};

export default Footer;
