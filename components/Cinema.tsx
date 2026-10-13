import { useEffect, useRef, useState } from 'react';
import { asset } from '../site.config';

export default function Cinema({ alternate = false }: { alternate?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const pause = () => video.pause();
    const play = () => {
      if (!video.getAttribute('src')) video.src = asset(alternate ? 'institucional-2.mp4' : 'institucional.mp4');
      video.play().catch(() => setPlaying(false));
    };
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduced.matches && !connection?.saveData && !document.hidden) play();
      else if (!entry.isIntersecting || document.hidden) pause();
    }, { threshold: .15 }) : null;
    observer?.observe(video);
    const preferenceChanged = () => { if (reduced.matches) pause(); };
    const visibilityChanged = () => { if (document.hidden) pause(); };
    reduced.addEventListener('change', preferenceChanged);
    document.addEventListener('visibilitychange', visibilityChanged);
    return () => { observer?.disconnect(); pause(); reduced.removeEventListener('change', preferenceChanged); document.removeEventListener('visibilitychange', visibilityChanged); };
  }, [alternate]);
  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (playing) video.pause();
    else { if (!video.getAttribute('src')) video.src = asset(alternate ? 'institucional-2.mp4' : 'institucional.mp4'); video.play().catch(() => setFailed(true)); }
  }
  return <div className="cinema">{failed ? <img className="video-fallback" src={asset(alternate ? 'poster-2.webp' : 'poster.webp')} alt="Identidade oficial LB Conexão" /> : <video ref={ref} muted playsInline preload="none" poster={asset(alternate ? 'poster-2.webp' : 'poster.webp')} aria-label="Animação da identidade oficial LB Conexão" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} />}<div className="cinema-shade" /><div className="film-caption"><span className="tiny-dot" /> IDENTIDADE EM MOVIMENTO</div>{!failed && <button className="video-toggle" onClick={toggle} aria-label={playing ? 'Pausar vídeo institucional' : 'Reproduzir vídeo institucional'}>{playing ? 'Ⅱ' : '▷'}<span>{playing ? 'Pausar' : 'Reproduzir'}</span></button>}</div>;
}
