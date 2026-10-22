'use client';

import { useEffect, useRef } from 'react';
import styles from './page.module.css';

export default function PropertyImage() {
  const imageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const motion = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;

    const reset = () => {
      cancelAnimationFrame(frame);
      imageRef.current?.style.setProperty('transform', 'translate3d(0, 0, 0)');
    };
    const move = (event: PointerEvent) => {
      if (!motion.matches || event.pointerType !== 'mouse') return;
      const x = (event.clientX / window.innerWidth - 0.5) * -20;
      const y = (event.clientY / window.innerHeight - 0.5) * -16;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        imageRef.current?.style.setProperty('transform', `translate3d(${x}px, ${y}px, 0)`);
      });
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', reset);
    document.documentElement.addEventListener('pointerleave', reset);
    motion.addEventListener('change', reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', reset);
      document.documentElement.removeEventListener('pointerleave', reset);
      motion.removeEventListener('change', reset);
    };
  }, []);

  return (
    <figure ref={imageRef} className={styles.propertyImage}>
      <img
        src="/cannan-residence.png"
        alt="Vista aérea do Cannan Residence em Canasvieiras"
        width={1080}
        height={1350}
        decoding="async"
        className={styles.propertyImagePhoto}
      />
    </figure>
  );
}
