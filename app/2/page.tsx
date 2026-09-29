'use client';

import { useState } from 'react';
import { ArrowUpRight, Building2, MapPin, ShieldCheck, SunMedium, Waves } from 'lucide-react';
import { Stack_Sans_Text } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import styles from './page.module.css';
import PropertyImage from './PropertyImage';
import ConceptHeader from '@/components/ConceptHeader';
import LocationSection from '@/components/map/LocationSection';

const text = Stack_Sans_Text({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-v2-text',
});

const highlights = [
  { icon: Waves, title: 'A poucos passos do mar', detail: '3 quadras da praia' },
  { icon: SunMedium, title: 'Lazer para aproveitar', detail: 'Área de lazer completa' },
  { icon: Building2, title: 'Seu novo espaço', detail: '1 e 2 dormitórios' },
];

export default function CeveconConcept() {
  const [message, setMessage] = useState('');

  return (
    <main className={`${styles.page} ${text.variable}`}>
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.sun} />
      </div>

      <ConceptHeader />

      <section id="inicio-v2" className={styles.hero} aria-labelledby="title-v2">
        <div className={styles.intro}>
          <PropertyImage />
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            CEVECON apresenta
          </div>

          <h1 id="title-v2" className={styles.title}>
            <span>Cannan</span>
            <span>Residence</span>
          </h1>

          <p className={styles.lead}>
            Um novo endereço em Canasvieiras, pensado para aproximar arquitetura, paisagem e uma vida mais leve em Florianópolis.
          </p>

          <div className={styles.location}>
            <span><MapPin aria-hidden="true" /></span>
            <div><small>Localização</small>Canasvieiras, Florianópolis, Santa Catarina<span>Rua dos Eucaliptos, n°43</span></div>
            <a
              className={styles.locationLink}
              href="#localizacao"
              aria-label="Conferir localização no mapa"
            >
              Conferir localização <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <div className={styles.highlights} aria-label="Diferenciais do empreendimento">
            {highlights.map(({ icon: Icon, title, detail }) => (
              <div className={styles.highlight} key={title}>
                <span className={styles.highlightIcon}><Icon aria-hidden="true" /></span>
                <div><strong>{title}</strong><small>{detail}</small></div>
              </div>
            ))}
          </div>
        </div>

        <aside id="lista-v2" className={styles.formPanel} aria-labelledby="form-title-v2">
          <div className={styles.formTopline}>
            <span>Lista prioritária</span>
            <ShieldCheck aria-hidden="true" />
          </div>
          <h2 id="form-title-v2">Conheça o Cannan antes do lançamento.</h2>
          <p className={styles.formIntro}>Cadastre-se para receber novidades, condições e os primeiros detalhes do projeto.</p>

          <form className={styles.form} onSubmit={(event) => { event.preventDefault(); setMessage('Prévia visual — seu cadastro será conectado na próxima etapa.'); }}>
            <div className={styles.field}>
              <label htmlFor="name-v2">Nome completo</label>
              <Input id="name-v2" name="name" type="text" placeholder="Como você se chama?" className={styles.input} />
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="phone-v2">WhatsApp</label>
                <Input id="phone-v2" name="phone" type="tel" placeholder="(00) 00000-0000" className={styles.input} />
              </div>
              <div className={styles.field}>
                <label htmlFor="email-v2">E-mail</label>
                <Input id="email-v2" name="email" type="email" placeholder="seu@email.com" className={styles.input} />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="interest-v2">Seu interesse</label>
              <Select>
                <SelectTrigger id="interest-v2" className={styles.selectTrigger}>
                  <SelectValue placeholder="Como você imagina este novo lugar?" />
                </SelectTrigger>
                <SelectContent className={`${styles.selectContent} ${text.variable}`} alignItemWithTrigger={false} align="start" sideOffset={8}>
                  <SelectItem value="morar">Para morar</SelectItem>
                  <SelectItem value="investir">Para investir</SelectItem>
                  <SelectItem value="conhecer">Quero conhecer o projeto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <label className={styles.marketingConsent}>
              <input type="checkbox" name="marketingConsent" value="yes" />
              <span>Quero receber novidades e comunicações de marketing da CEVECON.</span>
            </label>

            <Button type="submit" className={styles.submit}>
              Quero receber em primeira mão
              <span><ArrowUpRight aria-hidden="true" /></span>
            </Button>

            <p className={styles.privacy}>Seus dados serão usados apenas para comunicações sobre este lançamento e novidades da CEVECON.</p>
            <p className={styles.message} aria-live="polite">{message}</p>
          </form>
        </aside>
      </section>
      <button type="button" className={styles.whatsappButton} aria-label="WhatsApp" title="WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 3.2A12.8 12.8 0 0 0 5 22.55L3.2 28.8l6.4-1.78A12.8 12.8 0 1 0 16 3.2Zm0 23.3a10.45 10.45 0 0 1-5.33-1.46l-.38-.23-3.8 1.06 1.02-3.7-.25-.4A10.45 10.45 0 1 1 16 26.5Zm5.74-7.83c-.31-.16-1.83-.9-2.11-1s-.49-.16-.7.16-.8 1-.98 1.2-.36.24-.67.08a8.55 8.55 0 0 1-2.48-1.53 9.3 9.3 0 0 1-1.72-2.13c-.18-.31 0-.48.14-.64.14-.14.31-.36.47-.54.16-.18.2-.31.31-.52s.05-.39-.03-.55c-.08-.16-.7-1.69-.96-2.31-.25-.61-.51-.53-.7-.54l-.6-.01a1.16 1.16 0 0 0-.85.4 3.56 3.56 0 0 0-1.1 2.65 6.18 6.18 0 0 0 1.3 3.3 14.22 14.22 0 0 0 5.45 4.8c.76.33 1.35.53 1.81.68a4.35 4.35 0 0 0 2 .13 3.27 3.27 0 0 0 2.14-1.51 2.65 2.65 0 0 0 .18-1.51c-.08-.14-.28-.22-.59-.37Z" />
        </svg>
      </button>
      <LocationSection />
    </main>
  );
}
