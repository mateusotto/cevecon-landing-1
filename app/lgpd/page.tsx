import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Stack_Sans_Text } from 'next/font/google';
import ConceptHeader from '@/components/ConceptHeader';
import conceptStyles from '@/app/2/page.module.css';
import styles from './page.module.css';

const text = Stack_Sans_Text({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-v2-text',
});

export const metadata: Metadata = {
  title: 'Privacidade e LGPD | CEVECON',
  description: 'Informações sobre privacidade e proteção de dados pessoais da CEVECON.',
};

export default function LgpdPage() {
  return (
    <main className={`${conceptStyles.page} ${text.variable}`}>
      <ConceptHeader />
      <article className={styles.content}>
        <header className={styles.hero}>
          <div className={styles.eyebrow}><ShieldCheck aria-hidden="true" /> Privacidade e proteção de dados</div>
          <h1>LGPD</h1>
          <p>Esta página explica, de forma clara, como a CEVECON trata dados pessoais quando você demonstra interesse em nossos empreendimentos.</p>
          <small>Última atualização: 22 de outubro de 2026</small>
        </header>

        <div className={styles.sections}>
          <section><h2>1. Quem é o responsável</h2><p>A CEVECON Empreendimentos, CNPJ 12.345.678/0001-90, atua como controladora dos dados pessoais tratados neste canal, dentro das finalidades descritas nesta política.</p></section>
          <section><h2>2. Quais dados podemos receber</h2><p>Quando você preenche o formulário, podemos receber seu nome, número de WhatsApp, endereço de e-mail, interesse no projeto e a sua escolha sobre receber novidades e comunicações de marketing.</p><p>Também podemos receber dados técnicos necessários para segurança e funcionamento do site, como endereço IP, data e hora de acesso e informações básicas do dispositivo.</p></section>
          <section><h2>3. Para que usamos os dados</h2><p>Usamos os dados para responder ao seu contato, apresentar informações do projeto, organizar atendimentos, enviar novidades quando houver autorização e manter registros de solicitações e preferências.</p><p>Não usamos os dados para finalidades incompatíveis com aquelas informadas no momento da coleta.</p></section>
          <section><h2>4. Bases legais</h2><p>O tratamento pode se apoiar no consentimento, no cumprimento de obrigações legais ou regulatórias, na execução de medidas relacionadas à solicitação feita por você e no legítimo interesse, sempre respeitando os direitos e as expectativas do titular.</p><p>Quando o tratamento depender de consentimento, você poderá revogá-lo a qualquer momento.</p></section>
          <section><h2>5. Compartilhamento</h2><p>Podemos compartilhar dados com fornecedores que apoiam hospedagem, atendimento, comunicação e segurança da operação, sempre dentro da finalidade necessária. Esses fornecedores devem adotar medidas de proteção compatíveis com a atividade contratada.</p><p>Não vendemos dados pessoais.</p></section>
          <section><h2>6. Retenção e segurança</h2><p>Guardamos os dados pelo período necessário para cumprir as finalidades informadas, atender obrigações legais e proteger direitos em processos administrativos ou judiciais. Depois disso, os dados são eliminados ou anonimizados quando possível.</p><p>Aplicamos medidas técnicas e administrativas para reduzir riscos de acesso indevido, perda, alteração ou divulgação não autorizada. Nenhum sistema é completamente livre de riscos, por isso também mantemos procedimentos de resposta a incidentes.</p></section>
          <section><h2>7. Seus direitos</h2><p>Nos termos da LGPD, você pode solicitar confirmação da existência de tratamento, acesso, correção, anonimização, bloqueio ou eliminação de dados desnecessários, informação sobre compartilhamentos, portabilidade quando regulamentada, revogação do consentimento e revisão de decisões automatizadas, quando aplicável.</p><p>Para exercer um direito, envie uma solicitação pelo canal de contato informado abaixo. Podemos pedir informações para confirmar a identidade e proteger os dados contra solicitações indevidas.</p></section>
          <section><h2>8. Cookies e tecnologias semelhantes</h2><p>Podemos usar tecnologias necessárias para manter o site funcionando, lembrar preferências e compreender o uso da página. Quando forem utilizados cookies não essenciais, apresentaremos as informações e escolhas correspondentes no momento adequado.</p></section>
          <section><h2>9. Como falar conosco</h2><p>Para dúvidas, solicitações ou exercício de direitos relacionados aos seus dados pessoais, entre em contato com a CEVECON pelo canal oficial informado no atendimento do empreendimento. A solicitação será analisada conforme a LGPD e os prazos aplicáveis.</p></section>
          <section><h2>10. Atualizações</h2><p>Esta política pode ser atualizada para refletir mudanças no site, nos serviços ou na legislação. A versão vigente será sempre publicada nesta página com a data da última atualização.</p></section>
        </div>

        <footer className={styles.footer}>
          <Link href="/"><ArrowLeft aria-hidden="true" /> Voltar para a página inicial</Link>
          <a href="https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares" target="_blank" rel="noreferrer">Consultar direitos do titular na ANPD</a>
        </footer>
      </article>
    </main>
  );
}
