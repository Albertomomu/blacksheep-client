// src/pages/AboutUs/AboutUs.tsx
import React from 'react';
import './AboutUs.css';
import { DiscountBanner, Layout } from '../../components';
import ContentContainer from '@/components/ContentContainer';
import aboutBg from '../../assets/images/aboutUsBg.jpg';


const teamMembers = [
  {
    name: 'Alejandro Campos',
    role: 'Diseñador & Tatuador',
    photo: '#',
    desc: 'Fusiona su arte del tattoo con el diseño de cada prenda.',
    responsibilities: [
      'Creación de bocetos',
      'Dirección de arte',
      'Supervisión de estampación'
    ],
    socials: [
      { platform: 'Instagram', url: 'https://instagram.com/alejandrocampos' },
      { platform: 'Behance',   url: 'https://behance.net/alejandrocampos' }
    ]
  },
  {
    name: 'Alberto Moreno',
    role: 'Desarrollador & Diseñador',
    photo: '#',
    desc: 'Estratega de crecimiento y operaciones.',
    responsibilities: [
      'Gestión de pedidos',
      'Relación con proveedores',
      'Marketing digital'
    ],
    socials: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/albertomoreno' },
      { platform: 'Twitter',  url: 'https://twitter.com/albertomoreno' }
    ]
  }
];

const AboutUs: React.FC = () => (
  <Layout>
    {/* Hero */}
    <section className="about-hero">
      <ContentContainer>
        <h1 className="about-title">Nuestra Historia</h1>
        <p className="about-intro">
        Desde 2022, Alejandro y Alberto trabajan en un estudio de Valencia dedicados a ofrecer camisetas de alta calidad con diseños propios.
        Cada colección nace de un proceso creativo riguroso y de pruebas continuas hasta lograr el acabado deseado.
        </p>
      </ContentContainer>
      <div className="hero-image">
        <img
          src={aboutBg}
          alt="Arte urbano y moda"
        />
      </div>
    </section>

    {/* Divider */}
    <div className="divider" />

    {/* Historia detallada */}
    <section className="about-story">
      <ContentContainer>
        <p>
        Nuestra primera experiencia fue con tiradas muy pequeñas en un estudio de Valencia.
        Alejandro se encargaba de los diseños y pruebas de color, mientras Alberto coordinaba la logística y el contacto directo con los primeros clientes.
        Ese enfoque de “menos es más” nos permitió detectar mejoras rápidas en estampados y tallas.
        </p>
      </ContentContainer>
    </section>

    {/* Equipo */}
    <section className="team-section">
      <ContentContainer>
        <h2 className="team-title">Conócenos</h2>
        <div className="team-grid">
          {teamMembers.map((m) => (
            <div key={m.name} className="team-card">
              {m.photo != '#' && (
              <div className="team-photo-wrapper">
                <img className="team-photo" src={m.photo} alt={`${m.name} – ${m.role}`} />
              </div>
              )}
              <h3 className="team-name">{m.name}</h3>
              <p className="team-role">{m.role}</p>
              <ul className="team-responsibilities">
                {m.responsibilities?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <div className="team-socials">
                {m.socials?.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link social-link--${s.platform.toLowerCase()}`}
                    aria-label={s.platform}
                  >
                    {/* Aquí podrías usar iconos SVG */}
                    <span className="sr-only">{s.platform}</span>
                    {s.platform[0]}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ContentContainer>
    </section>
    <DiscountBanner />
  </Layout>
);

export default AboutUs;
