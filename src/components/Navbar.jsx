import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="header" style={{ padding: '0 40px' }}>
      <div className="logo">
        <Link to="/">
          <img
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop,q=95/5r95KcsqHcQGnCYw/logo-tecnoclade-nmHuqKicKFXRFEFL.png"
            alt="SmartESCO Logo"
            style={{ height: '60px' }}
          />
        </Link>
      </div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <ul className="nav-list">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {t('nav_inicio')}
            </NavLink>
          </li>
          {/* OCULTO TEMPORARIAMENTE - Serviços
          <li>
            <NavLink
              to="/servicos"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {t('nav_servicos')}
            </NavLink>
          </li>
          */}
          <li>
            <NavLink
              to="/projetos"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {t('nav_projetos')}
            </NavLink>
          </li>
          {/* OCULTO TEMPORARIAMENTE - Painel de Análise
          <li>
            <NavLink
              to="/analise"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {t('nav_analise')}
            </NavLink>
          </li>
          */}
          <li>
            <NavLink
              to="/contato"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {t('nav_contato')}
            </NavLink>
          </li>
        </ul>
        <button 
          className="lang-toggle-btn" 
          onClick={toggleLanguage}
          aria-label="Alterar idioma / Switch language"
        >
          {language === 'PT' ? 'PTBR' : 'EN'}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
