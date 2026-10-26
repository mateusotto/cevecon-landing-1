import type { Metadata } from 'next';
import { Bodoni_Moda, DM_Sans } from 'next/font/google';
import './globals.css';

const sans = DM_Sans({ variable: '--font-sans-brand', subsets: ['latin'] });
const editorial = Bodoni_Moda({ variable: '--font-editorial', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://cevecon-landing-1.vercel.app'),
  title: 'Pré-lançamento CEVECON | Uma nova experiência em Canasvieiras',
  description: 'Conheça o pré-lançamento CEVECON em Canasvieiras, Florianópolis. Entre para a lista de interesse e receba novidades em primeira mão.',
  applicationName: 'CEVECON Empreendimentos',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'CEVECON Empreendimentos',
    title: 'Pré-lançamento CEVECON | Uma nova experiência em Canasvieiras',
    description: 'Conheça o pré-lançamento CEVECON em Canasvieiras, Florianópolis. Entre para a lista de interesse e receba novidades em primeira mão.',
    images: [{
      url: '/social-preview.jpg',
      width: 1200,
      height: 630,
      alt: 'Vista aérea de Canasvieiras com chamada para o pré-lançamento CEVECON',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pré-lançamento CEVECON | Uma nova experiência em Canasvieiras',
    description: 'Conheça o pré-lançamento CEVECON em Canasvieiras, Florianópolis.',
    images: ['/social-preview.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${sans.variable} ${editorial.variable}`}>{children}</body></html>;
}
