import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Stack_Sans_Text } from 'next/font/google';
import LocationSection from '@/components/map/LocationSection';
import styles from './page.module.css';
import conceptStyles from '@/app/2/page.module.css';
import ConceptHeader from '@/components/ConceptHeader';

const text = Stack_Sans_Text({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-v2-text',
});

export const metadata: Metadata = {
  title: 'Mapa interativo | CEVECON',
  description: 'Localização do empreendimento e pontos próximos em Florianópolis.',
  robots: { index: false, follow: false },
};

export default function MapsPage() {
  return (
    <main className={`${conceptStyles.page} ${text.variable}`}>
      <ConceptHeader onMap />
      <LocationSection />
      <div className={styles.footerAction}>
        <Link href="/" className={styles.backLink}><ArrowLeft size={16} aria-hidden="true" />quero conhecer mais</Link>
      </div>
    </main>
  );
}
