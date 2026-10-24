'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import MapExplorer from './MapExplorer';
import Link from 'next/link';
import styles from '@/app/maps/page.module.css';
import mapStyles from './MapExplorer.module.css';

const coverSlides = [
  {
    id: 'canasvieiras',
    image: '/canasvieiras.webp',
    alt: 'Vista aérea da praia e da orla de Canasvieiras, em Florianópolis',
    location: 'Florianópolis · Santa Catarina',
    title: 'Conheça Canasvieiras',
    text: <>Canasvieiras é um dos bairros mais completos e desejados do norte da ilha, reunindo praia, comércio, serviços e uma rotina prática para quem busca qualidade de vida sem abrir mão da conveniência.<br /><br />Com uma atmosfera que combina movimento e bem-estar, o bairro oferece uma relação próxima com o mar e, ao mesmo tempo, acesso a tudo o que faz parte do dia a dia.<br /><br />É esse equilíbrio entre viver bem, estar perto de tudo e aproveitar o melhor da região que torna Canasvieiras um cenário tão especial para novos projetos.</>,
  },
  {
    id: 'conexao',
    image: '/canasvieiras-slider-2.webp',
    alt: 'Imagem aérea do acesso a Canasvieiras',
    location: 'Canasvieiras · Florianópolis',
    title: 'Morar bem também é estar bem conectado.',
    text: <>Canasvieiras oferece acesso facilitado a diferentes pontos da cidade, além de uma rotina mais prática para quem valoriza mobilidade, conveniência e proximidade com tudo o que importa no dia a dia.</>,
  },
  {
    id: 'futuro',
    image: '/canasvieiras-slider-3.webp',
    alt: 'Vista aérea de Canasvieiras e sua estrutura urbana',
    location: 'Canasvieiras · Florianópolis',
    title: 'Tudo o que você precisa, mais perto de casa.',
    text: <>Canasvieiras reúne uma estrutura completa para o dia a dia, com comércio, mercados, farmácias, escolas, serviços e diferentes opções de lazer. Uma rotina mais prática, com conveniência ao redor e tudo o que contribui para viver bem sem precisar ir longe.</>,
  },
];

export default function LocationSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slide = coverSlides[activeSlide];

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % coverSlides.length);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [activeSlide, isPaused]);

  const moveSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + coverSlides.length) % coverSlides.length);
  };

  return (
      <section id="localizacao" className={styles.container} aria-label="Localização do empreendimento">
        <section className={styles.cover} aria-labelledby="canasvieiras-title">
          <div className={styles.coverImages} aria-hidden="true">
            {coverSlides.map((item, index) => (
              <img
                key={item.id}
                className={`${styles.coverImage} ${index === activeSlide ? styles.coverImageActive : ''}`}
                src={item.image}
                alt=""
                width={3840}
                height={2156}
                loading="eager"
              />
            ))}
          </div>
          <div key={`${slide.id}-text`} className={`${styles.coverText} ${styles.coverSlideEnter}`} aria-live="polite">
            <span className={styles.coverLocation}>{slide.location}</span>
            <h2 id="canasvieiras-title">{slide.title}</h2>
            <p>{slide.text}</p>
            {slide.id === 'futuro' && (
              <Link className={styles.coverExplore} href="#mapa-arredores">
                Explore os arredores <ArrowDown aria-hidden="true" />
              </Link>
            )}
          </div>
          <div className={styles.coverControls} aria-label="Navegação das informações de localização">
            <span className={styles.coverProgress} aria-hidden="true"><span key={activeSlide} style={{ animationPlayState: isPaused ? 'paused' : 'running' }} /></span>
            <span className={styles.coverCounter}>{String(activeSlide + 1).padStart(2, '0')} / {String(coverSlides.length).padStart(2, '0')}</span>
            <button type="button" className={styles.coverArrow} onClick={() => moveSlide(-1)} aria-label="Ver informação anterior"><ArrowLeft aria-hidden="true" /></button>
            <button type="button" className={styles.coverArrow} onClick={() => moveSlide(1)} aria-label="Ver próxima informação"><ArrowRight aria-hidden="true" /></button>
            <button type="button" className={styles.coverArrow} onClick={() => setIsPaused((paused) => !paused)} aria-label={isPaused ? 'Retomar troca automática' : 'Pausar troca automática'}>
              {isPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
            </button>
          </div>
        </section>
        <MapExplorer />
        <section className={styles.panoramaSection} aria-labelledby="panorama-title">
          <span className={mapStyles.sectionTitle}>Uma nova perspectiva</span>
          <h2 id="panorama-title">Explore a vista do projeto.</h2>
          <p className={styles.panoramaHint}>Explore em 360°: arraste a imagem para olhar ao redor e use os controles para aproximar ou abrir em tela cheia.</p>
          <iframe
            className={styles.panoramaFrame}
            src="/panorama/index.html"
            title="Vista panorâmica interativa em 360 graus"
            loading="lazy"
            allowFullScreen
            aria-describedby="panorama-note"
          />
          <p id="panorama-note" className={styles.panoramaNote}>Imagem ilustrativa para demonstração da experiência 360°. Não representa a vista real do empreendimento.</p>
          <Link className={styles.siteCta} href="#lista-v2">
            Quero receber em primeira mão <ArrowUpRight aria-hidden="true" />
          </Link>
        </section>
        <footer className={styles.siteFooter}>
          <span>CEVECON Empreendimentos · CNPJ 12.345.678/0001-90</span>
          <span>Todos os direitos reservados.</span>
          <Link href="/lgpd">LGPD</Link>
        </footer>
      </section>
  );
}
