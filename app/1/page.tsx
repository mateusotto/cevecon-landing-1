'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, MapPin, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const benefits = [
  'Novidades antes da divulgação pública',
  'Acesso antecipado às primeiras informações',
  'Atendimento próximo da equipe CEVECON',
];

export default function Home() {
  const [message, setMessage] = useState('');

  return (
    <main className="site-shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="atmosphere" aria-hidden="true">
          <span className="orb orb-one" /><span className="orb orb-two" />
          <span className="architectural-line line-one" /><span className="architectural-line line-two" />
          <span className="brand-echo echo-one" /><span className="brand-echo echo-two" /><span className="grain" />
        </div>

        <header className="site-header reveal reveal-1">
          <a href="#inicio" className="brand-link" aria-label="CEVECON — início">
            <img src="/cevecon-horizontal.png" alt="CEVECON Empreendimentos" className="brand-logo" />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#interesse">Lista de interesse</a>
          </nav>
          <button className="menu-button" type="button" aria-label="Abrir menu"><Menu aria-hidden="true" /></button>
        </header>

        <div id="inicio" className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow reveal reveal-2"><span />Em breve, um novo lançamento</div>
            <h1 id="hero-title" className="reveal reveal-3">Cannan <em>Residence</em></h1>
            <p className="hero-lead reveal reveal-4">
              Um empreendimento em fase de concepção, pensado para transformar o cotidiano em uma experiência de permanência, beleza e valor.
            </p>
            <div className="location reveal reveal-4">
              <MapPin aria-hidden="true" />
              <span>Canasvieiras, Florianópolis, Santa Catarina</span>
            </div>
            <div className="benefit-list reveal reveal-5" aria-label="Benefícios da lista">
              {benefits.map((benefit) => (
                <div className="benefit" key={benefit}><span className="benefit-icon"><Check aria-hidden="true" /></span><span>{benefit}</span></div>
              ))}
            </div>
            <a className="mobile-jump reveal reveal-5" href="#interesse">Quero conhecer primeiro <ArrowUpRight aria-hidden="true" /></a>
          </div>

          <div id="interesse" className="form-wrap reveal reveal-4">
            <span className="form-border-beam" aria-hidden="true" />
            <div className="form-card">
              <div className="form-kicker"><span />Lista de interesse</div>
              <h2>Descubra antes de todos.</h2>
              <p className="form-intro">Cadastre-se para acompanhar os primeiros movimentos deste novo projeto CEVECON.</p>
              <form className="interest-form" onSubmit={(event) => { event.preventDefault(); setMessage('Prévia visual — o envio será conectado na próxima etapa.'); }}>
                <div className="field"><label htmlFor="name">Nome completo</label><Input id="name" name="name" type="text" placeholder="Como você se chama?" /></div>
                <div className="field-row">
                  <div className="field"><label htmlFor="phone">WhatsApp</label><Input id="phone" name="phone" type="tel" placeholder="(00) 00000-0000" /></div>
                  <div className="field"><label htmlFor="email">E-mail</label><Input id="email" name="email" type="email" placeholder="seu@email.com" /></div>
                </div>
                <div className="field">
                  <label id="interest-label">Seu interesse</label>
                  <Select>
                    <SelectTrigger className="premium-select" aria-labelledby="interest-label"><SelectValue placeholder="Como você imagina este novo lugar?" /></SelectTrigger>
                    <SelectContent className="premium-select-content"><SelectItem value="morar">Para morar</SelectItem><SelectItem value="investir">Para investir</SelectItem><SelectItem value="conhecer">Quero conhecer o projeto</SelectItem></SelectContent>
                  </Select>
                </div>
                <Button className="submit-button" type="submit">Quero receber em primeira mão <ArrowUpRight aria-hidden="true" /></Button>
                <p className="privacy-copy">Seus dados serão utilizados apenas para comunicações sobre este lançamento e novidades da CEVECON.</p>
                <p className="demo-message" aria-live="polite">{message}</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
