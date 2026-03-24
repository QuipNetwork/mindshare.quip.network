import { useState, useEffect } from 'react';

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

function useCountdown(getTarget: () => Date): CountdownValues {
  const [target, setTarget] = useState(getTarget);
  const [remaining, setRemaining] = useState(() => computeRemaining(target));

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      if (now >= target.getTime()) {
        setTarget(getTarget());
      }
      setRemaining(computeRemaining(target));
    };

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target, getTarget]);

  return remaining;
}

function getNextWave(): Date {
  const now = new Date();
  const dayOfWeek = now.getUTCDay();
  const daysUntilMonday = (1 - dayOfWeek + 7) % 7;

  const candidate = new Date(now);
  candidate.setUTCDate(now.getUTCDate() + daysUntilMonday);
  candidate.setUTCHours(13, 0, 0, 0);

  if (candidate <= now) {
    candidate.setUTCDate(candidate.getUTCDate() + 7);
  }

  return candidate;
}

export function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(getNextWave);

  return (
    <>
      <div className="mb-1 text-[10px] font-medium uppercase tracking-[1.5px] text-text-muted">
        Next Point Wave
      </div>
      <div className="flex items-center gap-1">
        <CdGroup value={days} unit="days" />
        <span className="self-start text-lg font-light leading-[1.3] text-text-muted">:</span>
        <CdGroup value={hours} unit="hrs" />
        <span className="self-start text-lg font-light leading-[1.3] text-text-muted">:</span>
        <CdGroup value={minutes} unit="min" />
        <span className="self-start text-lg font-light leading-[1.3] text-text-muted">:</span>
        <CdGroup value={seconds} unit="sec" />
      </div>
    </>
  );
}

function CdGroup({ value, unit }: { value: number; unit: string }) {
  return (
    <div className="flex min-w-8 flex-col items-center">
      <span className="font-mono text-xl font-medium leading-[1.2] tabular-nums text-white">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[1px] text-text-muted">
        {unit}
      </span>
    </div>
  );
}
