import type { Metadata } from 'next';
import { Bodoni_Moda, DM_Sans } from 'next/font/google';
import './globals.css';

const sans = DM_Sans({ variable: '--font-sans-brand', subsets: ['latin'] });
const editorial = Bodoni_Moda({ variable: '--font-editorial', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Um novo lançamento | CEVECON Empreendimentos',
  description: 'Entre para a lista de interesse e acompanhe em primeira mão o próximo lançamento da CEVECON Empreendimentos.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${sans.variable} ${editorial.variable}`}>{children}</body></html>;
}
