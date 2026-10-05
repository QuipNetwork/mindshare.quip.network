import { useState, useEffect } from 'react';
import { getNextMondayWave } from '../lib/date';

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeRemaining(target: Date): CountdownValues {
  const diff = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function useCountdown(getTarget: () => Date): CountdownValues | null {
  const [remaining, setRemaining] = useState<CountdownValues | null>(null);

  useEffect(() => {
    let target = getTarget();
    const tick = () => {
      const now = Date.now();
      if (now >= target.getTime()) {
        target = getTarget();
      }
      setRemaining(computeRemaining(target));
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [getTarget]);

  return remaining;
}

export function Countdown() {
  const remaining = useCountdown(getNextMondayWave);

  return (
    <div className="flex flex-col gap-2.5 border-t border-zinc-200 pt-5">
      <div className="flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.4px] text-zinc-600">
        <span className="inline-block h-2 w-2 animate-pulse-soft rounded-full bg-zinc-950" />
        Next point wave in
      </div>
      <div className="min-h-[1.1em] font-mono text-[clamp(26px,calc(2.5vw+14px),40px)] font-medium leading-[1.1] tracking-[-0.01em] tabular-nums text-zinc-950">
        {remaining ? (
          <>
            <CdNum value={remaining.days} unit="d" />
            <Sep />
            <CdNum value={remaining.hours} unit="h" />
            <Sep />
            <CdNum value={remaining.minutes} unit="m" />
            <Sep />
            <CdNum value={remaining.seconds} unit="s" />
          </>
        ) : (
          <span className="text-base">Monday at 1pm UTC</span>
        )}
      </div>
    </div>
  );
}

function CdNum({ value, unit }: { value: number; unit: string }) {
  return (
    <>
      <span>{String(value).padStart(2, '0')}</span>
      <span className="ml-0.5 text-[0.55em] text-zinc-500">{unit}</span>
    </>
  );
}

function Sep() {
  return <span className="mx-1 text-zinc-300">:</span>;
}
