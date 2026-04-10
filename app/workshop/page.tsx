"use client";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// ── SVG Icons ──
const CheckCircle = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const XCircle = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const Star = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ArrowRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const ChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
const ChevronUp = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>;

// ── Data ──
const LEARN_ITEMS = [
  'Use AI tools to 10x your productivity at work',
  'Automate repetitive tasks with ChatGPT and Gemini',
  'Build AI-powered workflows for research and analysis',
  'Create professional content in minutes, not hours',
  'Master prompt engineering for real business results',
  'Get certified and stand out in the job market',
];

const FOR_YOU = [
  'Working professionals who want to save 2+ hours daily',
  'Students preparing for AI-driven job market',
  'Entrepreneurs who want to build faster with AI',
  'Managers who want to lead AI-ready teams',
  'Anyone curious about AI but unsure where to start',
];

const NOT_FOR_YOU = [
  'People who already use AI tools daily at expert level',
  'Those looking for deep ML/coding courses',
  'People not willing to implement what they learn',
];

const BONUSES = [
  { title: 'AI Prompt Bible', desc: '500+ proven prompts for every use case', value: 4999 },
  { title: 'AI Tools Cheatsheet', desc: 'Top 50 AI tools with use cases and links', value: 2999 },
  { title: 'Career Acceleration Guide', desc: 'How to position yourself as an AI expert', value: 3999 },
  { title: 'Private Community Access', desc: 'Lifetime access to our AI professionals network', value: 3499 },
];

const MENTORS = [
  { name: 'Rahul Sharma', title: 'AI Research Lead, ex-Google', initials: 'RS', bio: 'IIT Delhi alumnus with 8+ years in AI/ML. Built AI systems used by 10M+ users at Google. Trained 20,000+ professionals across India.' },
  { name: 'Priya Nair', title: 'ML Engineer & Educator', initials: 'PN', bio: 'IISc Bangalore graduate. Former Amazon AI team. Has helped 500+ professionals transition into AI roles at top companies.' },
];

const TESTIMONIALS = [
  { name: 'Amit Verma', role: 'Marketing Manager, TCS', rating: 5, text: 'This workshop changed how I work. I now complete in 2 hours what used to take me a full day. The AI workflows are practical and immediately usable.' },
  { name: 'Sneha Patel', role: 'MBA Student, IIM Ahmedabad', rating: 5, text: 'As a student, I was skeptical. But the workshop gave me real skills I could put on my resume. Got 3 interview calls mentioning my AI skills.' },
  { name: 'Rajesh Kumar', role: 'Software Engineer, Infosys', rating: 5, text: 'The prompt engineering section alone was worth it. My code review time dropped by 60%. Highly recommend to every developer.' },
  { name: 'Divya Menon', role: 'Content Creator', rating: 5, text: 'I create 5x more content now with the same effort. The AI content workflows are gold. My YouTube channel grew 40% in 2 months after this.' },
  { name: 'Karan Singh', role: 'Startup Founder', rating: 5, text: 'Used the AI automation workflows to replace 3 freelancers. Saved Rs. 60,000/month. Best investment I made for my business.' },
  { name: 'Meera Iyer', role: 'HR Manager, Wipro', rating: 5, text: 'The workshop is incredibly well-structured. Went from zero AI knowledge to confidently using 10+ tools in just 3 hours.' },
];

const FAQS = [
  { q: 'Is this workshop really free?', a: 'Yes, 100% free. No hidden charges. We believe in giving value first. You only pay if you choose to enroll in our advanced courses after the workshop.' },
  { q: 'Do I need any technical background?', a: 'Absolutely not. This workshop is designed for non-technical professionals. If you can use a smartphone, you can follow along.' },
  { q: 'How long is the workshop?', a: 'The live workshop is 3 hours. We cover AI tools, practical workflows, and a live Q&A session. Recordings are available for 48 hours after.' },
  { q: 'What AI tools will be covered?', a: 'ChatGPT, Gemini, Claude, Midjourney, Perplexity, Notion AI, and 10+ more. All tools have free tiers so you can start immediately.' },
  { q: 'Will I get a certificate?', a: 'Yes! All attendees who complete the workshop receive a verified digital certificate they can share on LinkedIn.' },
  { q: 'What if I miss the live session?', a: 'Registered participants get access to the recording for 48 hours. However, live attendees get exclusive bonuses worth Rs. 15,000.' },
];

// ── Countdown Timer ──
function useCountdown() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      const diff = Math.max(0, midnight.getTime() - now.getTime());
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function pad(n: number) { return String(n).padStart(2, '0'); }

// ── Registration Form ──
function RegForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return setErr('Please fill all fields.');
    setLoading(true); setErr('');
    try {
      await addDoc(collection(db, 'workshop_leads'), {
        ...form,
        registeredAt: new Date().toISOString(),
        source: 'workshop_page',
      });
      setDone(true);
    } catch { setErr('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  }

  if (done) return (
    <div style={{ textAlign: 'center', padding: compact ? '24px' : '40px', borderRadius: 16, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.3rem', color: '#4ade80', marginBottom: 8 }}>You are registered!</h3>
      <p style={{ color: '#94a3b8', fontSize: 14 }}>Check your email for workshop details. See you there!</p>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {err && <p style={{ color: '#f87171', fontSize: 13, padding: '8px 12px', borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>{err}</p>}
      <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder='Your Full Name' style={{ padding: '13px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: '#f1f5f9', fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
      <input type='email' value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder='Your Email Address' style={{ padding: '13px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: '#f1f5f9', fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
      <input type='tel' value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder='Your Phone Number' style={{ padding: '13px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: '#f1f5f9', fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
      <button type='submit' disabled={loading} style={{ padding: '15px', borderRadius: 12, background: 'linear-gradient(135deg,#dc2626,#ef4444)', color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: compact ? 15 : 17, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.75 : 1, boxShadow: '0 8px 32px rgba(220,38,38,0.45)', letterSpacing: '0.02em' }}>
        {loading ? 'Registering...' : 'REGISTER FREE NOW →'}
      </button>
      <p style={{ textAlign: 'center', fontSize: 12, color: '#64748b' }}>No spam. No credit card. 100% Free.</p>
    </form>
  );
}

// ── Main Page ──
export default function WorkshopPage() {
  const time = useCountdown();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [seats] = useState(47);

  const timerBox = (val: string, label: string) => (
    <div style={{ textAlign: 'center', minWidth: 56 }}>
      <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#fff', lineHeight: 1 }}>{val}</div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{label}</div>
    </div>
  );

  const sep = <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.6rem', color: 'rgba(255,255,255,0.5)', alignSelf: 'flex-start', marginTop: 4 }}>:</div>;

  return (
    <div style={{ background: '#060912', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Sticky urgency bar ── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'linear-gradient(90deg,#dc2626,#b91c1c)', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>🔥 Only {seats} seats left!</span>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>|</span>
        <span style={{ fontSize: 13, color: '#fff' }}>Workshop ends in:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {timerBox(pad(time.h), 'hrs')}
          {sep}
          {timerBox(pad(time.m), 'min')}
          {sep}
          {timerBox(pad(time.s), 'sec')}
        </div>
      </div>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(37,99,235,0.06)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.4)', marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 8px #4ade80' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#fca5a5' }}>FREE 3-Hour Live AI Workshop</span>
          </div>

          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>
            AI Won&apos;t Replace You.<br />
            <span style={{ background: 'linear-gradient(135deg,#ef4444,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>A Person Using AI Will.</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: 620, margin: '0 auto 12px', lineHeight: 1.7 }}>
            Join 50,000+ professionals in a FREE 3-hour live workshop. Learn practical AI workflows that save you 2+ hours every single day — no coding required.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 32 }}>
            {[1,2,3,4,5].map(i => <Star key={i} />)}
            <span style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginLeft: 4 }}>4.8/5</span>
            <span style={{ fontSize: 14, color: '#64748b' }}>by 50,000+ professionals</span>
          </div>

          <div style={{ maxWidth: 440, margin: '0 auto 20px' }}>
            <RegForm />
          </div>

          <p style={{ fontSize: 13, color: '#ef4444', fontWeight: 600 }}>⚡ Only {seats} seats remaining. Register now before it fills up.</p>
        </div>
      </section>

      {/* ── Social proof bar ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 24px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: 8 }}>Trusted by professionals from</span>
          {['Google','Microsoft','Amazon','TCS','Infosys','Wipro','Flipkart','Zomato'].map(c => (
            <span key={c} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, color: '#334155', padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}>{c}</span>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20 }}>
          {[
            { value: '50,000+', label: 'Professionals Trained', color: '#2563eb' },
            { value: '4.8 / 5', label: 'Average Rating', color: '#f59e0b' },
            { value: '₹0', label: 'Registration Fee', color: '#4ade80' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '28px 20px', borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)', background: '#0f1629' }}>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '2.5rem', color: s.color, marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: 14, color: '#64748b' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Is this for you? ── */}
      <section style={{ padding: '64px 24px', background: '#0a0d1a' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2rem', textAlign: 'center', marginBottom: 40, color: '#f1f5f9' }}>
            Is This Workshop <span style={{ background: 'linear-gradient(135deg,#2563eb,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Right For You?</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
            <div style={{ padding: 28, borderRadius: 18, border: '1px solid rgba(74,222,128,0.25)', background: 'rgba(74,222,128,0.04)' }}>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#4ade80', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle /></span>
                This workshop IS for you if...
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {FOR_YOU.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#94a3b8' }}>
                    <span style={{ flexShrink: 0, marginTop: 1 }}><CheckCircle /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: 28, borderRadius: 18, border: '1px solid rgba(248,113,113,0.2)', background: 'rgba(248,113,113,0.03)' }}>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#f87171', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(248,113,113,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><XCircle /></span>
                This workshop is NOT for you if...
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {NOT_FOR_YOU.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#94a3b8' }}>
                    <span style={{ flexShrink: 0, marginTop: 1 }}><XCircle /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What you will learn ── */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#f1f5f9', marginBottom: 8 }}>
              What You Will <span style={{ background: 'linear-gradient(135deg,#2563eb,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Learn</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: 15 }}>Practical skills you can use from day one</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
            {LEARN_ITEMS.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '18px 20px', borderRadius: 14, border: '1px solid rgba(37,99,235,0.2)', background: 'rgba(37,99,235,0.04)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, color: '#60a5fa' }}>{String(i+1).padStart(2,'0')}</div>
                <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.5, marginTop: 4 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bonuses ── */}
      <section style={{ padding: '64px 24px', background: '#0a0d1a' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 999, background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.35)', color: '#fca5a5', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
              Limited Time Offer
            </div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#f1f5f9', marginBottom: 8 }}>
              Register Today &amp; Get Bonuses Worth
            </h2>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '2.5rem', color: '#4ade80', marginBottom: 8 }}>₹15,496 FREE</div>
            <p style={{ color: '#64748b', fontSize: 14 }}>These bonuses are only available for today&apos;s registrations</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginTop: 32 }}>
            {BONUSES.map((b, i) => (
              <div key={i} style={{ padding: 24, borderRadius: 16, border: '1px solid rgba(74,222,128,0.2)', background: 'rgba(74,222,128,0.03)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 700, color: '#4ade80' }}>FREE</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#f1f5f9', marginBottom: 6 }}>{b.title}</div>
                <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>{b.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, color: '#64748b', textDecoration: 'line-through' }}>₹{b.value.toLocaleString()}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#4ade80' }}>FREE</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section style={{padding:"64px 24px"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <h2 style={{fontFamily:"Poppins, sans-serif",fontWeight:800,fontSize:"2rem",textAlign:"center",color:"#f1f5f9",marginBottom:8}}>
            Learn From The Best
          </h2>
          <p style={{textAlign:"center",color:"#64748b",fontSize:14,marginBottom:36}}>IIT alumni with years of real-world AI experience</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>
            {MENTORS.map((m,i)=>(
              <div key={i} style={{padding:28,borderRadius:18,border:"1px solid rgba(255,255,255,0.08)",background:"#0f1629",display:"flex",flexDirection:"column",gap:16}}>
                <div style={{display:"flex",alignItems:"center",gap:16}}>
                  <div style={{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,#1e3a8a,#2563eb)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:22,fontWeight:700,flexShrink:0}}>{m.initials}</div>
                  <div>
                    <div style={{fontFamily:"Poppins, sans-serif",fontWeight:700,fontSize:"1.05rem",color:"#f1f5f9"}}>{m.name}</div>
                    <div style={{fontSize:13,color:"#2563eb",marginTop:2}}>{m.title}</div>
                  </div>
                </div>
                <p style={{fontSize:14,color:"#64748b",lineHeight:1.65}}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{padding:"64px 24px",background:"#0a0d1a"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h2 style={{fontFamily:"Poppins, sans-serif",fontWeight:800,fontSize:"2rem",textAlign:"center",color:"#f1f5f9",marginBottom:8}}>Real Results From Real People</h2>
          <p style={{textAlign:"center",color:"#64748b",fontSize:14,marginBottom:36}}>Join thousands of professionals who transformed their careers</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18}}>
            {TESTIMONIALS.map((t,i)=>(
              <div key={i} style={{padding:24,borderRadius:16,border:"1px solid rgba(255,255,255,0.07)",background:"#0f1629",display:"flex",flexDirection:"column",gap:12}}>
                <div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(s=><Star key={s}/>)}</div>
                <p style={{fontSize:14,color:"#94a3b8",lineHeight:1.65,flex:1}}>"{t.text}"</p>
                <div style={{paddingTop:12,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                  <div style={{fontWeight:600,fontSize:14,color:"#f1f5f9"}}>{t.name}</div>
                  <div style={{fontSize:12,color:"#475569"}}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:"64px 24px"}}>
        <div style={{maxWidth:720,margin:"0 auto"}}>
          <h2 style={{fontFamily:"Poppins, sans-serif",fontWeight:800,fontSize:"2rem",textAlign:"center",color:"#f1f5f9",marginBottom:8}}>Frequently Asked Questions</h2>
          <p style={{textAlign:"center",color:"#64748b",fontSize:14,marginBottom:36}}>Got questions? We have answers.</p>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {FAQS.map((faq,i)=>(
              <div key={i} style={{borderRadius:14,border:"1px solid rgba(255,255,255,0.08)",overflow:"hidden"}}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:openFaq===i?"rgba(37,99,235,0.08)":"#0f1629",border:"none",cursor:"pointer",textAlign:"left",gap:12}}>
                  <span style={{fontFamily:"Poppins, sans-serif",fontWeight:600,fontSize:15,color:"#f1f5f9"}}>{faq.q}</span>
                  <span style={{flexShrink:0,color:"#64748b"}}>{openFaq===i ? <ChevronUp/> : <ChevronDown/>}</span>
                </button>
                {openFaq===i&&(
                  <div style={{padding:"0 20px 18px",background:"rgba(37,99,235,0.04)",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                    <p style={{fontSize:14,color:"#94a3b8",lineHeight:1.7,paddingTop:14}}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{padding:"80px 24px",background:"linear-gradient(135deg,#0f1629 0%,#1e1b4b 50%,#0f1629 100%)",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)",pointerEvents:"none"}} />
        <div style={{position:"relative",zIndex:1,maxWidth:600,margin:"0 auto"}}>
          <h2 style={{fontFamily:"Poppins, sans-serif",fontWeight:900,fontSize:"clamp(1.6rem,4vw,2.5rem)",color:"#f1f5f9",marginBottom:12}}>
            Do Not Get Left Behind.
          </h2>
          <p style={{color:"#94a3b8",fontSize:16,marginBottom:32,lineHeight:1.6}}>
            The professionals who master AI today will lead their industries tomorrow. Register now — it is completely free.
          </p>
          <div style={{maxWidth:440,margin:"0 auto 16px"}}>
            <RegForm/>
          </div>
          <p style={{fontSize:13,color:"#ef4444",fontWeight:600}}>Only {seats} seats remaining</p>
        </div>
      </section>

      {/* Footer */}
      <div style={{padding:"20px 24px",borderTop:"1px solid rgba(255,255,255,0.06)",textAlign:"center",paddingBottom:80}}>
        <p style={{fontSize:12,color:"#334155"}}>2025 AI Mastery. All rights reserved. <a href="/" style={{color:"#2563eb",textDecoration:"none"}}>Back to Home</a></p>
      </div>

      {/* Sticky bottom bar */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:99,background:"linear-gradient(90deg,#dc2626,#b91c1c)",padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"center",gap:16,flexWrap:"wrap",boxShadow:"0 -4px 24px rgba(220,38,38,0.4)"}}>
        <span style={{fontSize:14,fontWeight:600,color:"#fff"}}>Only {seats} seats left!</span>
        <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{padding:"10px 24px",borderRadius:8,background:"#fff",color:"#dc2626",fontFamily:"Poppins, sans-serif",fontWeight:800,fontSize:14,border:"none",cursor:"pointer"}}>
          REGISTER FREE NOW
        </button>
      </div>

    </div>
  );
}
