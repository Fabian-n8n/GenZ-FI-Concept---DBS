'use client';
// Faithful Shopee checkout, reused by Flow 2C (categorise) and Flow 1B (payday).
// Same Buldak item + sections; the parent supplies onPlaceOrder + onBack.
import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Truck, HelpCircle, Ticket } from 'lucide-react';

const ORANGE = '#ee4d2d';
const GREEN = '#26aa99';

function Row({ children, onClick, style }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', cursor: onClick ? 'pointer' : 'default', ...style }}>
      {children}
    </div>
  );
}

function ApplePayMark() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, border: '1px solid #ddd', borderRadius: 5, padding: '3px 6px', background: '#fff' }}>
      <svg width="13" height="15" viewBox="0 0 14 17" fill="#000"><path d="M11.2 9c0-1.4.9-2.1 1-2.2-.5-.8-1.4-.9-1.7-.9-.7-.1-1.4.4-1.8.4s-1-.4-1.6-.4c-.8 0-1.6.5-2 1.2-.9 1.5-.2 3.8.6 5 .4.6.9 1.3 1.5 1.3.6 0 .8-.4 1.6-.4s.9.4 1.6.4c.6 0 1-.6 1.4-1.2.4-.6.6-1.2.6-1.2s-1.2-.5-1.2-1.8zM9.9 4.8c.3-.4.6-1 .5-1.6-.5 0-1.1.4-1.5.8-.3.3-.6 1-.5 1.5.6.1 1.1-.3 1.5-.7z"/></svg>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: '#000' }}>Pay</span>
    </span>
  );
}

function SLogo({ size = 22 }) {
  return (
    <span style={{ width: size, height: size, borderRadius: 5, background: ORANGE, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: size * 0.6, flexShrink: 0, fontFamily: 'var(--font-sans)' }}>S</span>
  );
}

function Radio({ on }) {
  return (
    <span style={{ width: 21, height: 21, borderRadius: '50%', border: `2px solid ${on ? ORANGE : '#ccc'}`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
      {on && <span style={{ width: 11, height: 11, borderRadius: '50%', background: ORANGE }} />}
    </span>
  );
}

function GreenToggle({ on, onClick }) {
  return (
    <button onClick={onClick} style={{ width: 42, height: 24, borderRadius: 999, border: 'none', padding: 0, cursor: 'pointer', background: on ? GREEN : '#ccc', position: 'relative', flexShrink: 0, transition: 'background 150ms' }}>
      <span style={{ position: 'absolute', top: 2, left: on ? 20 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.3)', transition: 'left 150ms' }} />
    </button>
  );
}

export default function ShopeeCheckout({ onPlaceOrder, onBack }) {
  const [doorstep, setDoorstep] = useState(true);
  const [pay, setPay] = useState('applepay');

  return (
    <div className="screen" style={{ background: '#f4f4f4', position: 'relative' }}>
      {/* Header */}
      <div style={{ background: '#fff', flexShrink: 0, paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="shopee-bar">
          <ChevronLeft size={24} color={ORANGE} style={{ cursor: 'pointer' }} onClick={onBack} />
          <span style={{ flex: 1, textAlign: 'center', color: '#222', fontWeight: 600, fontSize: 18, marginRight: 24 }}>Checkout</span>
        </div>
      </div>

      <div className="scroll" style={{ paddingBottom: 8 }}>
        {/* Address */}
        <Row style={{ background: '#fff', alignItems: 'flex-start' }}>
          <MapPin size={20} color={ORANGE} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14.5, color: '#222' }}><strong>Fabian Wong</strong> <span style={{ color: '#999' }}>(+65) 9815 1350</span></div>
            <div style={{ fontSize: 13.5, color: '#555', marginTop: 3, lineHeight: 1.45 }}>11 Serangoon North Road, #09-23<br />Singapore 793400</div>
          </div>
          <ChevronRight size={18} color="#ccc" style={{ flexShrink: 0 }} />
        </Row>

        {/* Store + product */}
        <div style={{ background: '#fff', marginTop: 8, padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span style={{ background: ORANGE, color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 5px', borderRadius: 3 }}>Mall</span>
            <span style={{ fontSize: 14.5, fontWeight: 700, color: '#222' }}>Samyang Singapore Official Store</span>
            <ChevronRight size={15} color="#bbb" />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <img src="/assets/images/buldak.jpg" alt="Buldak Carbonara" style={{ width: 78, height: 78, borderRadius: 6, objectFit: 'cover', flexShrink: 0, border: '1px solid #f0f0f0' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, color: '#222', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                SAMYANG Hot Chicken Cream Carbonara Buldak Ramen 130g x 5 Packs
              </div>
              <div style={{ display: 'inline-block', marginTop: 5, background: '#f5f5f5', color: '#888', fontSize: 11.5, padding: '2px 7px', borderRadius: 3 }}>Bundle of 5 ▾</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 7 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ color: ORANGE, fontWeight: 700, fontSize: 15.5 }}>$7.69</span>
                  <span style={{ color: '#bbb', fontSize: 12.5, textDecoration: 'line-through' }}>$9.05</span>
                </div>
                <span style={{ color: '#999', fontSize: 13 }}>x2</span>
              </div>
            </div>
          </div>

          {/* Shop voucher + message */}
          <div style={{ borderTop: '1px solid #f2f2f2', marginTop: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '13px 0 11px', borderBottom: '1px solid #f2f2f2' }}>
              <span style={{ flex: 1, fontSize: 14, color: '#222' }}>Shop Voucher</span>
              <span style={{ fontSize: 13.5, color: '#999' }}>Select or enter code</span>
              <ChevronRight size={16} color="#ccc" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '13px 0 2px' }}>
              <span style={{ flex: 1, fontSize: 14, color: '#222' }}>Message for Seller</span>
              <span style={{ fontSize: 13.5, color: '#999' }}>Please leave a message</span>
              <ChevronRight size={16} color="#ccc" />
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div style={{ background: '#fff', marginTop: 8, padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#222' }}>Shipping Option</span>
            <span style={{ fontSize: 13.5, color: '#999', display: 'inline-flex', alignItems: 'center' }}>View All <ChevronRight size={16} color="#ccc" /></span>
          </div>
          <div style={{ position: 'relative', border: `1px solid ${GREEN}`, background: '#f1fbf8', borderRadius: 8, padding: 13, overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0, borderTop: `22px solid ${GREEN}`, borderRight: '22px solid transparent' }} />
            <svg width="10" height="10" viewBox="0 0 12 12" style={{ position: 'absolute', top: 2, left: 2 }} stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"><path d="M2 6l3 3 5-6" /></svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <Truck size={19} color={GREEN} />
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: '#222' }}>Get by tomorrow</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>Doorstep Delivery</div>
                </div>
              </div>
              <div style={{ fontSize: 13 }}><span style={{ color: '#bbb', textDecoration: 'line-through' }}>$1.99</span> <strong style={{ color: GREEN }}>Free</strong></div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #eee', borderRadius: 8, padding: '11px 13px', marginTop: 10 }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#222' }}>Collection Points</div>
              <div style={{ fontSize: 12.5, color: ORANGE, marginTop: 3, display: 'inline-flex', alignItems: 'center' }}>Select Collection Point <ChevronRight size={14} color={ORANGE} /></div>
            </div>
            <span style={{ fontSize: 13, color: '#888' }}>Free</span>
          </div>

          <div style={{ fontSize: 12, color: '#999', marginTop: 10 }}>Get up to $2.00 if order arrives late</div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTop: '1px solid #f2f2f2' }}>
            <span style={{ flex: 1, fontSize: 14, color: '#222', display: 'inline-flex', alignItems: 'center', gap: 4 }}>Allow to leave at doorstep <HelpCircle size={14} color="#ccc" /></span>
            <GreenToggle on={doorstep} onClick={() => setDoorstep(v => !v)} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 13, borderTop: '1px solid #f2f2f2' }}>
            <span style={{ fontSize: 14, color: '#222' }}>Total 2 Item(s)</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#222' }}>$18.10</span>
          </div>
        </div>

        {/* Platform vouchers + VIP + coins */}
        <div style={{ background: '#fff', marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px' }}>
            <Ticket size={19} color={ORANGE} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 14, color: '#222' }}>Platform Vouchers</span>
            <span style={{ border: `1px solid ${ORANGE}`, color: ORANGE, fontSize: 11.5, fontWeight: 600, padding: '2px 6px', borderRadius: 3 }}>-$2.72</span>
            <span style={{ border: `1px solid ${GREEN}`, color: GREEN, fontSize: 11.5, fontWeight: 600, padding: '2px 6px', borderRadius: 3 }}>Free Shipping</span>
            <ChevronRight size={16} color="#ccc" style={{ flexShrink: 0 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 16px 12px', background: '#fff6f3', borderRadius: 8, padding: '11px 12px' }}>
            <span style={{ fontWeight: 800, fontSize: 13, color: ORANGE }}>Shopee<span style={{ background: ORANGE, color: '#fff', borderRadius: 3, padding: '0 4px', marginLeft: 2 }}>VIP</span></span>
            <span style={{ flex: 1, fontSize: 11.5, color: '#555', lineHeight: 1.35 }}>Get <strong>EXTRA 3% CASHBACK</strong> — start your 1-month free trial</span>
            <button style={{ background: ORANGE, color: '#fff', border: 'none', borderRadius: 5, padding: '7px 14px', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', flexShrink: 0 }}>Try Free</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px 14px' }}>
            <span style={{ width: 19, height: 19, borderRadius: '50%', border: `1.5px solid #f5a623`, color: '#f5a623', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 11 }}>S</span>
            <span style={{ flex: 1, fontSize: 14, color: '#888' }}>Coins cannot be redeemed</span>
            <HelpCircle size={15} color="#ccc" />
          </div>
        </div>

        {/* Payment methods */}
        <div style={{ background: '#fff', marginTop: 8, padding: '4px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px 6px' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#222' }}>Payment Methods</span>
            <span style={{ fontSize: 13.5, color: '#999', display: 'inline-flex', alignItems: 'center' }}>View All <ChevronRight size={16} color="#ccc" /></span>
          </div>

          <Row onClick={() => setPay('applepay')}>
            <ApplePayMark />
            <span style={{ flex: 1, fontSize: 14.5, color: '#222' }}>Apple Pay</span>
            <Radio on={pay === 'applepay'} />
          </Row>

          <div style={{ borderTop: '1px solid #f2f2f2' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '12px 16px 4px' }}>
            <SLogo size={20} />
            <span style={{ fontSize: 14.5, fontWeight: 700, color: ORANGE }}>ShopeePay</span>
          </div>

          <div style={{ padding: '8px 16px 4px 40px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ flex: 1, fontSize: 14, color: '#222', fontWeight: 600 }}>SPayLater</span>
              <span style={{ border: `1px solid ${ORANGE}`, color: ORANGE, fontSize: 12.5, fontWeight: 600, padding: '5px 14px', borderRadius: 4 }}>Activate</span>
            </div>
            <div style={{ fontSize: 12, color: '#999', marginTop: 3 }}>Activate to get limit up to $5,000</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 9 }}>
              <div style={{ flex: 1, background: '#fafafa', borderRadius: 6, padding: '8px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: 12 }}><span>$6.03</span><span>x 3 mth</span></div>
                <span style={{ display: 'inline-block', marginTop: 5, border: `1px solid ${ORANGE}`, color: ORANGE, fontSize: 10.5, padding: '1px 5px', borderRadius: 3 }}>0% interest</span>
              </div>
              <div style={{ flex: 1, background: '#fafafa', borderRadius: 6, padding: '8px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: 12 }}><span>$1.69</span><span>x 12 mth</span></div>
                <div style={{ fontSize: 10.5, color: '#bbb', marginTop: 5 }}>Incl. $0.18 interest/mth</div>
              </div>
            </div>
          </div>

          <Row style={{ paddingLeft: 40 }}>
            <SLogo size={20} />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 14, color: '#222' }}>ShopeePay Balance ($0.18)</span>
              <span style={{ display: 'inline-block', marginTop: 4, border: `1px solid ${ORANGE}`, color: ORANGE, fontSize: 10.5, padding: '1px 5px', borderRadius: 3 }}>0.3% OFF</span>
            </div>
            <span style={{ border: `1px solid ${ORANGE}`, color: ORANGE, fontSize: 12.5, fontWeight: 600, padding: '5px 14px', borderRadius: 4 }}>Top Up</span>
          </Row>
        </div>

        {/* Payment details */}
        <div style={{ background: '#fff', marginTop: 8, padding: '14px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#222', marginBottom: 10 }}>Payment Details</div>
          {[
            ['Merchandise Subtotal', '$18.10', '#222'],
            ['Shipping Subtotal', '$1.99', '#222'],
            ['Shipping Discount Subtotal', '-$1.99', ORANGE],
            ['Voucher Discount', '-$2.72', ORANGE],
          ].map(([l, v, c]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13.5 }}>
              <span style={{ color: '#555' }}>{l}</span>
              <span style={{ color: c, fontVariantNumeric: 'tabular-nums' }}>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0 2px', marginTop: 6, borderTop: '1px solid #f2f2f2', fontSize: 14 }}>
            <span style={{ color: '#222', fontWeight: 600 }}>Total Payment</span>
            <span style={{ color: '#222', fontWeight: 800, fontSize: 16, fontVariantNumeric: 'tabular-nums' }}>$15.38</span>
          </div>
          <div style={{ textAlign: 'right', fontSize: 11.5, color: '#aaa', marginTop: 3 }}>GST included, where applicable</div>
        </div>
        <div style={{ height: 8 }} />
      </div>

      {/* Bottom bar */}
      <div style={{ flexShrink: 0, background: '#fff', borderTop: '1px solid #eee', padding: '10px 16px calc(10px + env(safe-area-inset-bottom))', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 14 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 14, color: '#333' }}>Total <span style={{ color: ORANGE, fontWeight: 800, fontSize: 19 }}>$15.38</span></div>
          <div style={{ fontSize: 11.5, color: '#888' }}>Saved <span style={{ color: ORANGE }}>$4.71</span></div>
        </div>
        <button
          onClick={onPlaceOrder}
          style={{ background: ORANGE, color: '#fff', border: 'none', borderRadius: 4, padding: '13px 26px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap' }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
