import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from './Projetos';
import { useLanguage } from './context/LanguageContext';
import './styles.css';

const ProjetoDetalhes = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const project = projects.find((p) => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="projetos-page dark-theme" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2>{t('det_not_found')}</h2>
        <Link to="/projetos" className="btn btn-primary" style={{ marginTop: '20px' }}>{t('det_back')}</Link>
      </div>
    );
  }

  const projectTitle = language === 'PT' ? project.title : project.titleEn;
  const coordinator = language === 'PT' ? project.coordenador : project.coordenadorEn;
  const status = language === 'PT' ? project.status : project.statusEn;
  const financier = language === 'PT' ? project.financiador : project.financiadorEn;
  const resumo = language === 'PT' ? project.resumo : project.resumoEn;
  const resultados = language === 'PT' ? project.resultados : project.resultadosEn;
  const inicio = project.inicio || "2021";
  const termino = project.termino || "2024";

  // Filter 3 related projects in same category
  const relatedProjects = projects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="projeto-detalhes-wp">
      {/* Title Bar Section */}
      <div className="ts-titlebar-wrapper">
        <div className="container">
          <div className="ts-titlebar-inner">
            <h1 className="entry-title">{projectTitle}</h1>
            <div className="breadcrumb-wrapper">
              <span>
                <Link to="/" className="home">{t('nav_inicio')}</Link>
              </span>
              <span className="ts-bread-sep"> &nbsp; → &nbsp;</span>
              <span>
                <Link to="/projetos" className="taxonomy">{project.category}</Link>
              </span>
              <span className="ts-bread-sep"> &nbsp; → &nbsp;</span>
              <span className="current-item">{projectTitle}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="container project-details-body">
        <div className="project-grid-columns">
          {/* Left Column (Main description) */}
          <div className="project-main-column animate-slide is-visible">
            <div className="project-card-box">
              <h4 className="ts-custom-heading">{t('det_overview')}</h4>
              
              <div className="project-banner-wrapper">
                <img 
                  src={project.image} 
                  alt={projectTitle}
                  className="project-banner-img"
                />
              </div>

              <div className="project-full-desc">
                <h3 className="section-subtitle">{t('det_resumo')}</h3>
                <p>{resumo}</p>

                <h3 className="section-subtitle">{t('det_resultados')}</h3>
                <p>{resultados}</p>
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar details) */}
          <div className="project-sidebar-column">
            <div className="themestek-pf-detailbox">
              <h5>{t('det_titulo')}</h5>
              <div className="themestek-pf-detailbox-inner">
                <ul className="themestek-pf-detailbox-list">
                  <li>
                    <span className="ts-pf-details-heading">{t('det_lbl_titulo')}</span>
                    <span className="ts-pf-details-content">{projectTitle}</span>
                  </li>
                  <li>
                    <span className="ts-pf-details-heading">{t('det_lbl_lab')}</span>
                    <span className="ts-pf-details-content">{project.category}</span>
                  </li>
                  <li>
                    <span className="ts-pf-details-heading">{t('det_lbl_coord')}</span>
                    <span className="ts-pf-details-content">{coordinator}</span>
                  </li>
                  <li>
                    <span className="ts-pf-details-heading">{t('det_lbl_inicio')}</span>
                    <span className="ts-pf-details-content">{inicio}</span>
                  </li>
                  <li>
                    <span className="ts-pf-details-heading">{t('det_lbl_termino')}</span>
                    <span className="ts-pf-details-content">{termino}</span>
                  </li>
                  <li>
                    <span className="ts-pf-details-heading">{t('det_lbl_status')}</span>
                    <span className="ts-pf-details-content-badge">{status}</span>
                  </li>
                  <li>
                    <span className="ts-pf-details-heading">{t('det_lbl_financ')}</span>
                    <span className="ts-pf-details-content">{financier}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="action-box-sidebar">
              <h3>{t('det_cta_title')}</h3>
              <p>{t('det_cta_desc')}</p>
              <Link to="/contato" className="btn btn-primary btn-block-cta">{t('det_cta_btn')}</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <div className="container related-projects-section">
          <h3 className="related-section-title">{t('det_related')}</h3>
          <div className="related-projects-grid">
            {relatedProjects.map((rp) => {
              const rpTitle = language === 'PT' ? rp.title : rp.titleEn;
              return (
                <div key={rp.id} className="related-project-card">
                  <Link to={`/projetos/${rp.id}`} className="related-link">
                    <div className="related-thumbnail-wrapper">
                      <img src={rp.image} alt={rpTitle} className="related-img" />
                      <span className="related-category">{rp.category}</span>
                    </div>
                    <div className="related-content">
                      <h4>{rpTitle}</h4>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjetoDetalhes;
