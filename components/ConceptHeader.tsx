'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/2/page.module.css';

export default function ConceptHeader({ onMap = false }: { onMap?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 0);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('pageshow', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('pageshow', updateScroll);
    };
  }, []);

  return (
    <div className={`${styles.headerShell}${scrolled ? ` ${styles.headerScrolled}` : ''}`}>
      <header className={styles.header}>
        <a href={onMap ? "/#inicio-v2" : "#inicio-v2"} className={styles.logoLink} aria-label="CEVECON — início">
          <img src="/cevecon-horizontal.png" alt="CEVECON Empreendimentos" />
        </a>
        <div className={styles.headerMeta}>
          <span>Florianópolis — SC</span>
          <span>Pré-lançamento exclusivo</span>
        </div>
      </header>
    </div>
  );
}
