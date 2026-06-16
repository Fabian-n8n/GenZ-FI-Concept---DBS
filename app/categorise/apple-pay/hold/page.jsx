'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { DBSCard } from '../page';

// iOS-style card stack peeking from the bottom — mimics Wallet app behavior
function CardStack() {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 72,
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      {/* Third card (back) — just a sliver */}
      <div style={{
        position: 'absolute', bottom: 0, left: 14, right: 14, height: 56,
        borderRadius: '14px 14px 0 0',
        background: 'linear-gradient(135deg, #1b2a3a 0%, #243b55 100%)',
        display: 'flex', alignItems: 'flex-start',
        padding: '11px 16px',
      }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.03em' }}>HSBC</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>TravelOne</span>
      </div>
      {/* Second card (front of stack) — slightly more visible */}
      <div style={{
        position: 'absolute', bottom: 18, left: 14, right: 14, height: 56,
        borderRadius: '14px 14px 0 0',
        background: 'linear-gradient(135deg, #1a3060 0%, #0e1f4a 100%)',
        display: 'flex', alignItems: 'flex-start',
        padding: '11px 16px',
      }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.03em' }}>DBS</span>
        <span style={{ marginLeft: 6, fontSize: 10, color: 'rgba(255,255,255,0.38)' }}>Debit</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.32)' }}>VISA</span>
      </div>
    </div>
  );
}

// iOS Apple Pay NFC icon — blue circle outline with phone + contactless waves inside
function NFCIcon() {
  return (
    <div style={{
      width: 80, height: 80,
      borderRadius: '50%',
      border: '2.5px solid #007AFF',
      display: 'grid', placeItems: 'center',
      flexShrink: 0,
    }}>
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none"
        stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Phone body */}
        <rect x="12" y="6" width="20" height="32" rx="4" />
        {/* Screen line */}
        <path d="M17 12h10" />
        <circle cx="22" cy="34" r="1.2" fill="#007AFF" stroke="none" />
        {/* Contactless wave right */}
        <path d="M34 16a10 10 0 010 12" opacity="0.9" />
        <path d="M38 13a15 15 0 010 18" opacity="0.55" />
      </svg>
    </div>
  );
}

function HoldContent() {
  const router = useRouter();
  const params = useSearchParams();
  const merchant = params.get('merchant') || 'Hai Di Lao';

  useEffect(() => {
    const t = setTimeout(() => router.push('/categorise/apple-pay/done?merchant=' + encodeURIComponent(merchant)), 1600);
    return () => clearTimeout(t);
  }, [merchant, router]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100dvh',
      background: '#000',         // pure black — matches real iOS Apple Pay
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* DBS card — padded, large, upper portion */}
      <div style={{ padding: 'calc(env(safe-area-inset-top) + 16px) 16px 0', flexShrink: 0 }}>
        <DBSCard compact />
      </div>

      {/* NFC icon + text — centered in remaining space above card stack */}
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 18,
        paddingBottom: 80,          // clear the card stack
        zIndex: 1,
      }}>
        <NFCIcon />
        <div style={{
          fontSize: 18, fontWeight: 600,
          color: 'rgba(255,255,255,0.75)',
          letterSpacing: '-0.2px',
        }}>
          Hold Near Reader
        </div>
      </div>

      {/* Card stack peeks from bottom */}
      <CardStack />
    </div>
  );
}

export default function ApplePayHoldPage() {
  return (
    <Suspense fallback={<div style={{ width: '100%', height: '100dvh', background: '#000' }} />}>
      <HoldContent />
    </Suspense>
  );
}
