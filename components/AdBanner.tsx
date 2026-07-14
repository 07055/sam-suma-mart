'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({
  slot,
  format = 'auto',
  responsive = true,
  className,
  style,
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet or blocked
    }
  }, []);

  return (
    <div
      className={className}
      style={{ textAlign: 'center', margin: '2rem 0', ...style }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...(responsive ? {} : { width: '728px', height: '90px' }) }}
        data-ad-client="ca-pub-9132897909170105"
        data-ad-slot={slot}
        data-ad-format={responsive ? format : undefined}
        data-full-width-responsive={responsive ? 'true' : undefined}
      />
    </div>
  );
}
