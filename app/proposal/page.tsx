'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Download, MapPin } from 'lucide-react';
import styles from './page.module.css';

const sections = [
  { id: 'capa', label: 'Capa' },
  { id: 'grupo', label: 'O grupo' },
  { id: 'metodologia', label: 'Metodologia' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'projeto', label: 'O projeto' },
  { id: 'investimento', label: 'Investimento' },
  { id: 'encerramento', label: 'Próximos passos' },
];

const proposal = {
  client: 'Cliente ilustrativo',
  project: 'Projeto em Canasvieiras',
  location: 'Canasvieiras · Florianópolis, SC',
  description: 'Uma proposta de experiência, estratégia e presença para transformar uma nova fase em um projeto memorável.',
  cashPrice: 'R$ 00.000,00',
  installments: '12x de R$ 0.000,00',
};

export default function ProposalPage() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = sections.findIndex(({ id }) => id === visible.target.id);
      if (index >= 0) setActiveSection(index);
    }, { threshold: [0.35, 0.65] });

    sectionRefs.current.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const direction = event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ' ? 1
        : event.key === 'ArrowUp' || event.key === 'PageUp' ? -1
          : event.key === 'Home' ? -sections.length
            : event.key === 'End' ? sections.length
              : 0;
      if (!direction) return;
      event.preventDefault();
      const nextIndex = Math.max(0, Math.min(sections.length - 1, activeSection + direction));
      sectionRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  const goTo = (index: number) => sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.logoLink} aria-label="Voltar para a CEVECON">
          <img src="/cevecon-horizontal.png" alt="CEVECON Empreendimentos" />
        </a>
        <div className={styles.headerMeta}>
          <span>Proposta comercial</span>
          <button type="button" className={styles.printButton} onClick={() => window.print()}>
            <Download aria-hidden="true" /> Exportar PDF
          </button>
        </div>
      </header>

      <nav className={styles.sideNav} aria-label="Navegação da proposta">
        {sections.map((section, index) => (
          <button key={section.id} type="button" className={index === activeSection ? styles.navDotActive : styles.navDot} onClick={() => goTo(index)} aria-label={`Ir para ${section.label}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </nav>

      <div className={styles.keyboardHint}><ArrowUp aria-hidden="true" /><ArrowDown aria-hidden="true" /><span>use as setas para navegar</span></div>

      <section id="capa" ref={(element) => { sectionRefs.current[0] = element; }} className={`${styles.section} ${styles.cover}`}>
        <div className={styles.coverBackdrop} aria-hidden="true" />
        <div className={styles.sectionInner}>
          <span className={styles.eyebrow}>CEVECON · Proposta comercial</span>
          <p className={styles.coverKicker}>Uma nova experiência começa com uma boa proposta.</p>
          <h1>{proposal.project}</h1>
          <p className={styles.coverDescription}>{proposal.description}</p>
          <div className={styles.coverDetails}><span>{proposal.client}</span><span><MapPin aria-hidden="true" /> {proposal.location}</span></div>
          <button type="button" className={styles.nextButton} onClick={() => goTo(1)}>Começar a proposta <ArrowDown aria-hidden="true" /></button>
        </div>
      </section>

      <section id="grupo" ref={(element) => { sectionRefs.current[1] = element; }} className={`${styles.section} ${styles.lightSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionNumber}>01 <span>/ O grupo</span></div>
          <div className={styles.twoColumns}>
            <h2>Ideias que ganham forma e valor.</h2>
            <div className={styles.bodyCopy}><p>A CEVECON constrói experiências imobiliárias com olhar atento para o território, para as pessoas e para a forma como cada projeto participa da vida da cidade.</p><p>Nosso trabalho aproxima estratégia, comunicação e design para que cada lançamento tenha clareza, presença e uma história capaz de permanecer.</p></div>
          </div>
          <div className={styles.statRow}><div><strong>01</strong><span>visão integrada</span></div><div><strong>03</strong><span>frentes de atuação</span></div><div><strong>∞</strong><span>possibilidades</span></div></div>
        </div>
      </section>

      <section id="metodologia" ref={(element) => { sectionRefs.current[2] = element; }} className={`${styles.section} ${styles.darkSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionNumber}>02 <span>/ Metodologia</span></div>
          <h2>Estratégia antes da forma.</h2>
          <p className={styles.sectionLead}>Cada projeto começa entendendo o contexto, encontra uma direção e transforma essa direção em uma experiência consistente.</p>
          <div className={styles.methodGrid}><div><span>01</span><h3>Imersão</h3><p>Leitura do negócio, do público e do lugar.</p></div><div><span>02</span><h3>Direção</h3><p>Definição de posicionamento, narrativa e prioridades.</p></div><div><span>03</span><h3>Expressão</h3><p>Desdobramento visual, verbal e digital da proposta.</p></div></div>
        </div>
      </section>

      <section id="experiencia" ref={(element) => { sectionRefs.current[3] = element; }} className={`${styles.section} ${styles.experienceSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionNumber}>03 <span>/ Experiência</span></div>
          <div className={styles.experienceLayout}><div><h2>Presença que se sente em cada ponto de contato.</h2><p className={styles.sectionLead}>Da primeira impressão à entrega final, a experiência precisa ter ritmo, coerência e intenção.</p></div><div className={styles.experienceMark}>CEVECON<span>experiência em movimento</span></div></div>
          <div className={styles.experienceLine}><span>descobrir</span><i /><span>entender</span><i /><span>escolher</span><i /><span>viver</span></div>
        </div>
      </section>

      <section id="projeto" ref={(element) => { sectionRefs.current[4] = element; }} className={`${styles.section} ${styles.lightSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionNumber}>04 <span>/ O projeto</span></div>
          <div className={styles.twoColumns}><h2>{proposal.project}</h2><div className={styles.bodyCopy}><p>Uma nova presença em Canasvieiras, pensada para aproximar arquitetura, paisagem e uma vida mais leve em Florianópolis.</p><p>O projeto combina posicionamento, identidade e uma jornada digital capaz de apresentar o empreendimento com clareza e desejo.</p></div></div>
          <div className={styles.projectQuote}>“Um novo endereço para uma nova fase.”</div>
        </div>
      </section>

      <section id="investimento" ref={(element) => { sectionRefs.current[5] = element; }} className={`${styles.section} ${styles.pricingSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionNumber}>05 <span>/ Investimento</span></div>
          <h2>Um investimento claro para uma entrega consistente.</h2>
          <p className={styles.sectionLead}>Valores ilustrativos para estruturar a proposta. O escopo final pode ser ajustado conforme as necessidades do projeto.</p>
          <div className={styles.priceGrid}><div className={styles.priceCard}><span>À vista</span><strong>{proposal.cashPrice}</strong><small>condição ilustrativa</small></div><div className={`${styles.priceCard} ${styles.priceCardFeatured}`}><span>Parcelado</span><strong>{proposal.installments}</strong><small>12 parcelas · condição ilustrativa</small></div></div>
        </div>
      </section>

      <section id="encerramento" ref={(element) => { sectionRefs.current[6] = element; }} className={`${styles.section} ${styles.closingSection}`}>
        <div className={styles.sectionInner}><span className={styles.eyebrow}>Próximos passos</span><h2>Vamos dar forma ao próximo capítulo?</h2><p className={styles.coverDescription}>Esta estrutura é um ponto de partida. Nome, narrativa, escopo e investimento podem ser atualizados para cada nova proposta.</p><div className={styles.closingActions}><button type="button" className={styles.nextButton} onClick={() => window.print()}><Download aria-hidden="true" /> Exportar proposta em PDF</button><button type="button" className={styles.textButton} onClick={() => goTo(0)}><ArrowLeft aria-hidden="true" /> Voltar para a capa</button></div><footer className={styles.footer}>CEVECON Empreendimentos · Proposta ilustrativa · 2026</footer></div>
      </section>
    </main>
  );
}
