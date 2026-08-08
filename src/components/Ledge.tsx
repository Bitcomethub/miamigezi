/**
 * Deco "kaş silmesi" (eyebrow ledge) — bu sistemde kartın yerine geçen ayırıcı.
 * Üç azalan hairline, Miami Beach cephelerindeki yatay silmelerin tipografik
 * karşılığı. Tamamen dekoratif olduğu için ekran okuyucudan gizlenir.
 */
export function Ledge({
  tone = 'ink',
  className = '',
}: {
  tone?: 'ink' | 'flamingo' | 'lagoon';
  className?: string;
}) {
  const toneClass =
    tone === 'flamingo' ? 'ledge-flamingo' : tone === 'lagoon' ? 'ledge-lagoon' : '';
  return <span aria-hidden="true" className={`ledge ${toneClass} ${className}`} />;
}

/** Deco güneş amblemi — logoda ve bölüm işaretlerinde kullanılan tek motif. */
export function Sunburst({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 14"
      aria-hidden="true"
      focusable="false"
      className={className}
      // preserveAspectRatio varsayılanı korunur: oranı bozan esnetme,
      // içindeki çizgi kalınlıklarını da eşitsiz hâle getirir.
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 13a11 11 0 0 1 22 0" opacity="0.35" />
        <path d="M5 13a7 7 0 0 1 14 0" opacity="0.6" />
        <path d="M9 13a3 3 0 0 1 6 0" />
      </g>
    </svg>
  );
}
