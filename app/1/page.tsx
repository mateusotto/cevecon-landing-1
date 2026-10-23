'use client';

import { type FormEvent, useState } from 'react';
import { ArrowUpRight, Check, MapPin, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LEADS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzHNv9FDRDAaSPgEdujZF6UeeTv3tMWnLzKfybBLNYeyLMho2OfXa4ib4hswObEWbC6/exec';

const formatWhatsapp = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const benefits = [
  'Novidades antes da divulgação pública',
  'Acesso antecipado às primeiras informações',
  'Atendimento próximo da equipe CEVECON',
];

export default function Home() {
  const [message, setMessage] = useState('');
  const [interest, setInterest] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nome = String(formData.get('name') || '').trim();
    const whatsapp = String(formData.get('phone') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const normalizedPhone = whatsapp.replace(/\D/g, '');

    if (!nome || !whatsapp || !email || !interest) {
      setMessage('Preencha nome, WhatsApp, e-mail e interesse para continuar.');
      return;
    }
    if (!/^\d{2}9\d{8}$/.test(normalizedPhone)) {
      setMessage('Digite um WhatsApp válido com DDD, 9 e mais 8 dígitos.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Digite um e-mail válido com @ e domínio.');
      return;
    }

    setIsSubmitting(true);
    setMessage('Enviando seus dados...');
    try {
      await fetch(LEADS_ENDPOINT, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ nome, whatsapp, email, interesse: interest, receberNovidades: false, origem: 'Landing page CEVECON' }) });
      form.reset();
      setInterest('');
      setPhone('');
      setMessage('Cadastro enviado com sucesso.');
    } catch {
      setMessage('Não foi possível enviar agora. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 id="hero-title" className="reveal reveal-3">Pré-lançamento</h1>
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
              <form className="interest-form" onSubmit={handleLeadSubmit}>
                <div className="field"><label htmlFor="name">Nome completo</label><Input id="name" name="name" type="text" placeholder="Como você se chama?" /></div>
                <div className="field-row">
                  <div className="field"><label htmlFor="phone">WhatsApp</label><Input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel" maxLength={15} placeholder="(00) 00000-0000" value={phone} onChange={(event) => setPhone(formatWhatsapp(event.target.value))} /></div>
                  <div className="field"><label htmlFor="email">E-mail</label><Input id="email" name="email" type="email" placeholder="seu@email.com" /></div>
                </div>
                <div className="field">
                  <label id="interest-label">Seu interesse</label>
                  <Select value={interest} onValueChange={setInterest}>
                    <SelectTrigger className="premium-select" aria-labelledby="interest-label"><SelectValue placeholder="Como você imagina este novo lugar?" /></SelectTrigger>
                    <SelectContent className="premium-select-content"><SelectItem value="morar">Para morar</SelectItem><SelectItem value="investir">Para investir</SelectItem><SelectItem value="conhecer">Quero conhecer o projeto</SelectItem><SelectItem value="corretor">Sou corretor(a) de imóveis</SelectItem></SelectContent>
                  </Select>
                </div>
                <Button className="submit-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Enviando...' : 'Quero receber em primeira mão'} <ArrowUpRight aria-hidden="true" /></Button>
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
