import MapExplorer from './MapExplorer';
import Link from 'next/link';
import styles from '@/app/maps/page.module.css';
import mapStyles from './MapExplorer.module.css';

export default function LocationSection() {
  return (
      <section id="localizacao" className={styles.container} aria-label="Localização do empreendimento">
        <section className={styles.cover} aria-labelledby="canasvieiras-title">
          <img className={styles.coverImage} src="/canasvieiras.jpg" alt="Vista aérea da praia e da orla de Canasvieiras, em Florianópolis" width={3840} height={2156} loading="lazy" />
          <div className={styles.coverText}>
            <span className={styles.coverLocation}>Florianópolis · Santa Catarina</span>
            <h2 id="canasvieiras-title">Conheça Canasvieiras</h2>
            <p>Canasvieiras é um dos bairros mais completos e desejados do norte da ilha, reunindo praia, comércio, serviços e uma rotina prática para quem busca qualidade de vida sem abrir mão da conveniência.<br /><br />Com uma atmosfera que combina movimento e bem-estar, o bairro oferece uma relação próxima com o mar e, ao mesmo tempo, acesso a tudo o que faz parte do dia a dia.<br /><br />É esse equilíbrio entre viver bem, estar perto de tudo e aproveitar o melhor da região que torna Canasvieiras um cenário tão especial para novos projetos.</p>
          </div>
        </section>
        <MapExplorer />
        <section className={styles.panoramaSection} aria-labelledby="panorama-title" hidden>
          <span className={mapStyles.sectionTitle}>Uma nova perspectiva</span>
          <h2 id="panorama-title">Explore a vista do Cannan Residence.</h2>
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
        </section>
        <footer className={styles.siteFooter}>
          <span>CEVECON Empreendimentos · CNPJ 12.345.678/0001-90</span>
          <span>Todos os direitos reservados.</span>
          <Link href="/lgpd">LGPD</Link>
        </footer>
      </section>
  );
}
