import { asset, Division } from '../site.config';
export default function Brand({ division, compact = false }: { division?: Division; compact?: boolean }) {
  return <img className={`brand-image ${compact ? 'compact' : ''}`} src={asset(division ? `marca-${division}.webp` : compact ? 'marca-lb-small.webp' : 'marca-lb.webp')} alt={`LB Conexão${division ? ` ${division === 'saude' ? 'Saúde' : division.toUpperCase()}` : ' — Tecnologia, Saúde e Ofertas'}`} width={division ? 700 : 960} height={division ? 700 : 524} loading={compact ? 'eager' : 'lazy'} />;
}
