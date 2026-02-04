import symbol from '/assets/logos/leonard-logo-white.png';

export const Logo = ({ className }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <img src={symbol} alt="Leonard Intelligence" className="h-8 w-auto mb-1" />
    <div className="flex items-baseline gap-2 leading-none text-white">
      <span className="font-jacquard text-3xl font-normal">Leonard</span>
      <span className="font-junicode italic text-3xl">Intelligence</span>
    </div>
  </div>
);
