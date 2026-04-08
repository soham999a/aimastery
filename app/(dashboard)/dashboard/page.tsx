"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

interface UserData { name:string; email:string; enrolledCourses:string[]; subscriptionTier:string; createdAt:string; }
type Tab = "overview"|"courses"|"profile"|"settings";

const ENROLLED = [
  {id:"ar-fundamentals",title:"AR Fundamentals",instructor:"Dr. Sarah Chen",progress:65,total:28,done:18,gFrom:"#1e3a8a",gTo:"#0e7490",next:"Advanced AR Techniques Part 3"},
  {id:"ai-ml-bootcamp",title:"AI and ML Bootcamp",instructor:"Prof. Raj Patel",progress:30,total:48,done:14,gFrom:"#3b0764",gTo:"#831843",next:"Deep Learning Neural Networks Part 2"},
];
const RECOMMENDED = [
  {id:"generative-ai",title:"Generative AI Mastery",level:"Advanced",price:5999},
  {id:"computer-vision",title:"Computer Vision with OpenCV",level:"Intermediate",price:3999},
];

function getInitials(n:string){return n.split(" ").map((x:string)=>x[0]).join("").toUpperCase().slice(0,2);}

function ProgressBar({value,from,to}:{value:number;from?:string;to?:string}) {
  const bg = from && to ? 'linear-gradient(90deg,'+from+','+to+')' : 'var(--brand)';
  return (
    <div style={{height:6,borderRadius:99,background:'var(--border)',overflow:'hidden'}}>
      <div style={{height:'100%',width:value+'%',borderRadius:99,background:bg,transition:'width 0.5s ease'}} />
    </div>
  );
}

function Toggle({checked,onChange}:{checked:boolean;onChange:()=>void}) {
  return (
    <button onClick={onChange} style={{width:44,height:24,borderRadius:99,border:'none',cursor:'pointer',background:checked?'var(--brand)':'var(--border)',position:'relative',transition:'background 0.2s',flexShrink:0}}>
      <span style={{position:'absolute',top:3,left:checked?23:3,width:18,height:18,borderRadius:'50%',background:'#fff',transition:'left 0.2s',display:'block'}} />
    </button>
  );
}

const BookSvg = () => <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'/><path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'/></svg>;
const GridSvg = () => <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><rect x='3' y='3' width='7' height='7'/><rect x='14' y='3' width='7' height='7'/><rect x='14' y='14' width='7' height='7'/><rect x='3' y='14' width='7' height='7'/></svg>;
const UserSvg = () => <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/><circle cx='12' cy='7' r='4'/></svg>;
const GearSvg = () => <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><circle cx='12' cy='12' r='3'/><path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'/></svg>;
const OutSvg = () => <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'/><polyline points='16 17 21 12 16 7'/><line x1='21' y1='12' x2='9' y2='12'/></svg>;
const PlaySvg = () => <svg width='12' height='12' viewBox='0 0 24 24' fill='currentColor'><polygon points='5 3 19 12 5 21 5 3'/></svg>;
const CheckSvg = () => <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'><polyline points='20 6 9 17 4 12'/></svg>;
const EditSvg = () => <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/><path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/></svg>;
const BellSvg = () => <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'/><path d='M13.73 21a2 2 0 0 1-3.46 0'/></svg>;
const TrashSvg = () => <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='3 6 5 6 21 6'/><path d='M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6'/><path d='M10 11v6'/><path d='M14 11v6'/><path d='M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2'/></svg>;
const TargetSvg = () => <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><circle cx='12' cy='12' r='10'/><circle cx='12' cy='12' r='6'/><circle cx='12' cy='12' r='2'/></svg>;
const AwardSvg = () => <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><circle cx='12' cy='8' r='6'/><path d='M15.477 12.89L17 22l-5-3-5 3 1.523-9.11'/></svg>;
const ClockSvg = () => <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><circle cx='12' cy='12' r='10'/><polyline points='12 6 12 12 16 14'/></svg>;
const FlameSvg = () => <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'/></svg>;

function OverviewTab({firstName}:{firstName:string}) {
  const avg = Math.round(ENROLLED.reduce((s,c)=>s+c.progress,0)/ENROLLED.length);
  const stats = [
    {label:'Enrolled',value:ENROLLED.length,icon:<BookSvg/>,color:'#2563eb'},
    {label:'Hours Learned',value:'24h',icon:<ClockSvg/>,color:'#0891b2'},
    {label:'Certificates',value:0,icon:<AwardSvg/>,color:'#7c3aed'},
    {label:'Day Streak',value:'7',icon:<FlameSvg/>,color:'#ea580c'},
  ];
  return (
    <div style={{display:'flex',gap:24,alignItems:'flex-start'}}>
      <div style={{flex:1,minWidth:0,display:'flex',flexDirection:'column',gap:20}}>
        <div style={{borderRadius:20,background:'linear-gradient(135deg,#1e3a8a 0%,#312e81 50%,#1e1b4b 100%)',padding:'28px 32px',position:'relative',overflow:'hidden',border:'1px solid rgba(99,102,241,0.3)'}}>
          <div style={{position:'absolute',top:-40,right:-40,width:200,height:200,borderRadius:'50%',background:'rgba(99,102,241,0.12)',pointerEvents:'none'}} />
          <p style={{color:'rgba(199,210,254,0.8)',fontSize:13,marginBottom:6,fontWeight:500}}>Welcome back</p>
          <h1 style={{color:'#fff',fontSize:26,fontWeight:700,marginBottom:8}}>Good to see you, {firstName}</h1>
          <p style={{color:'rgba(199,210,254,0.7)',fontSize:14,marginBottom:18}}>You are {avg}% through your enrolled courses. Keep the momentum going.</p>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{flex:1,maxWidth:220}}><ProgressBar value={avg} from='#6366f1' to='#06b6d4'/></div>
            <span style={{color:'rgba(199,210,254,0.9)',fontSize:13,fontWeight:600}}>{avg}% avg</span>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
          {stats.map(s=>(
            <div key={s.label} style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:16,padding:'18px 16px',display:'flex',flexDirection:'column',gap:10}}>
              <div style={{width:38,height:38,borderRadius:10,background:s.color+'22',display:'flex',alignItems:'center',justifyContent:'center',color:s.color}}>{s.icon}</div>
              <div>
                <p style={{color:'var(--text-h)',fontSize:22,fontWeight:700,lineHeight:1}}>{s.value}</p>
                <p style={{color:'var(--text-muted)',fontSize:12,marginTop:4}}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:20,padding:24}}>
          <h2 style={{color:'var(--text-h)',fontSize:16,fontWeight:600,marginBottom:20}}>My Courses</h2>
          <div style={{display:'flex',flexDirection:'column',gap:20}}>
            {ENROLLED.map(c=>(
              <div key={c.id}>
                <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:10}}>
                  <div style={{width:44,height:44,borderRadius:12,background:'linear-gradient(135deg,'+c.gFrom+','+c.gTo+')',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.7)'}}><BookSvg/></div>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{color:'var(--text-h)',fontSize:14,fontWeight:600,marginBottom:2}}>{c.title}</p>
                    <p style={{color:'var(--text-muted)',fontSize:12}}>{c.instructor}</p>
                  </div>
                  <span style={{color:'var(--text-muted)',fontSize:12,whiteSpace:'nowrap'}}>{c.done}/{c.total}</span>
                </div>
                <ProgressBar value={c.progress} from={c.gFrom} to={c.gTo}/>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:6}}>
                  <p style={{color:'var(--text-faint)',fontSize:11}}>Next: {c.next}</p>
                  <span style={{color:'var(--brand)',fontSize:12,fontWeight:600}}>{c.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{width:260,flexShrink:0,display:'flex',flexDirection:'column',gap:16}}>
        <div style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:20,padding:20}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
            <span style={{color:'var(--brand)'}}><TargetSvg/></span>
            <h3 style={{color:'var(--text-h)',fontSize:14,fontWeight:600}}>Daily Goal</h3>
          </div>
          <p style={{color:'var(--text-muted)',fontSize:12,marginBottom:10}}>2 of 3 lessons completed today</p>
          <ProgressBar value={66} from='#2563eb' to='#06b6d4'/>
          <div style={{display:'flex',gap:8,marginTop:14}}>
            {[0,1,2].map(i=>(
              <div key={i} style={{flex:1,height:30,borderRadius:8,background:i<2?'rgba(37,99,235,0.15)':'var(--bg-surface)',border:'1px solid '+(i<2?'rgba(37,99,235,0.35)':'var(--border)'),display:'flex',alignItems:'center',justifyContent:'center',color:i<2?'var(--brand)':'var(--text-faint)'}}>
                <CheckSvg/>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:20,padding:20}}>
          <h3 style={{color:'var(--text-h)',fontSize:14,fontWeight:600,marginBottom:14}}>Recommended</h3>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {RECOMMENDED.map(r=>(
              <Link key={r.id} href={'/courses/'+r.id} style={{textDecoration:'none'}}>
                <div style={{padding:12,borderRadius:12,border:'1px solid var(--border)',background:'var(--bg-surface)',cursor:'pointer'}}>
                  <p style={{color:'var(--text-h)',fontSize:13,fontWeight:600,marginBottom:6,lineHeight:1.3}}>{r.title}</p>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span style={{fontSize:11,padding:'2px 8px',borderRadius:99,background:'rgba(37,99,235,0.1)',color:'#2563eb',border:'1px solid rgba(37,99,235,0.2)'}}>{r.level}</span>
                    <span style={{color:'var(--text-h)',fontSize:13,fontWeight:700}}>Rs.{r.price.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CoursesTab() {
  return (
    <div>
      <h2 style={{color:'var(--text-h)',fontSize:20,fontWeight:700,marginBottom:24}}>My Courses</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:20}}>
        {ENROLLED.map(c=>(
          <div key={c.id} style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:20,overflow:'hidden'}}>
            <div style={{height:90,background:'linear-gradient(135deg,'+c.gFrom+','+c.gTo+')',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
              <div style={{color:'rgba(255,255,255,0.25)',transform:'scale(2.5)'}}><BookSvg/></div>
              <div style={{position:'absolute',top:10,right:10,background:'rgba(0,0,0,0.35)',borderRadius:99,padding:'3px 10px',color:'#fff',fontSize:12,fontWeight:600}}>{c.progress}%</div>
            </div>
            <div style={{padding:20}}>
              <h3 style={{color:'var(--text-h)',fontSize:15,fontWeight:700,marginBottom:4}}>{c.title}</h3>
              <p style={{color:'var(--text-muted)',fontSize:13,marginBottom:14}}>{c.instructor}</p>
              <ProgressBar value={c.progress} from={c.gFrom} to={c.gTo}/>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:6,marginBottom:14}}>
                <span style={{color:'var(--text-muted)',fontSize:12}}>{c.done} of {c.total} lessons</span>
                <span style={{color:'var(--text-muted)',fontSize:12}}>{c.total-c.done} remaining</span>
              </div>
              <div style={{padding:'10px 12px',borderRadius:10,background:'var(--bg-surface)',border:'1px solid var(--border)',marginBottom:14}}>
                <p style={{color:'var(--text-faint)',fontSize:11,marginBottom:2}}>Up next</p>
                <p style={{color:'var(--text-body)',fontSize:12}}>{c.next}</p>
              </div>
              <Link href={'/courses/'+c.id} style={{textDecoration:'none'}}>
                <button style={{width:'100%',padding:'10px',borderRadius:10,background:'var(--brand)',color:'#fff',border:'none',cursor:'pointer',fontSize:13,fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                  <PlaySvg/> Resume Course
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileTab({userData,user}:{userData:UserData|null;user:any}) {
  const [editing,setEditing] = useState(false);
  const [name,setName] = useState(userData?.name||user?.displayName||'');
  const [saving,setSaving] = useState(false);
  const [saved,setSaved] = useState(false);
  const [err,setErr] = useState('');
  const initials = getInitials(name||'U');
  const tier = userData?.subscriptionTier||'free';
  const tierColor = tier==='pro'?'#60a5fa':tier==='enterprise'?'#a78bfa':'#94a3b8';

  async function save() {
    if(!name.trim()) return;
    setSaving(true); setErr('');
    try {
      if(auth.currentUser) {
        await updateProfile(auth.currentUser,{displayName:name.trim()});
        await updateDoc(doc(db,'users',user.uid),{name:name.trim()});
      }
      setSaved(true); setEditing(false);
      setTimeout(()=>setSaved(false),3000);
    } catch { setErr('Failed to update. Please try again.'); }
    finally { setSaving(false); }
  }

  return (
    <div style={{maxWidth:580}}>
      <h2 style={{color:'var(--text-h)',fontSize:20,fontWeight:700,marginBottom:24}}>Profile</h2>
      <div style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:20,padding:28,marginBottom:16}}>
        <div style={{display:'flex',alignItems:'center',gap:20,marginBottom:24}}>
          <div style={{width:72,height:72,borderRadius:'50%',background:'linear-gradient(135deg,#2563eb,#7c3aed)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:24,fontWeight:700,flexShrink:0}}>{initials}</div>
          <div>
            <h3 style={{color:'var(--text-h)',fontSize:20,fontWeight:700,marginBottom:4}}>{name||'User'}</h3>
            <p style={{color:'var(--text-muted)',fontSize:14,marginBottom:8}}>{userData?.email||user?.email}</p>
            <span style={{fontSize:12,padding:'3px 10px',borderRadius:99,background:tierColor+'22',border:'1px solid '+tierColor+'44',color:tierColor,fontWeight:600,textTransform:'capitalize'}}>{tier} plan</span>
          </div>
        </div>
        <div style={{height:1,background:'var(--border)',marginBottom:20}} />
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20}}>
          <div>
            <p style={{color:'var(--text-muted)',fontSize:12,marginBottom:4}}>Member since</p>
            <p style={{color:'var(--text-h)',fontSize:14,fontWeight:500}}>{userData?.createdAt?new Date(userData.createdAt).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}):'N/A'}</p>
          </div>
          <div>
            <p style={{color:'var(--text-muted)',fontSize:12,marginBottom:4}}>Courses enrolled</p>
            <p style={{color:'var(--text-h)',fontSize:14,fontWeight:500}}>{ENROLLED.length}</p>
          </div>
        </div>
        {saved&&<div style={{padding:'10px 14px',borderRadius:10,background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.25)',color:'#4ade80',fontSize:13,marginBottom:14,display:'flex',alignItems:'center',gap:8}}><CheckSvg/> Profile updated</div>}
        {err&&<div style={{padding:'10px 14px',borderRadius:10,background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.25)',color:'#f87171',fontSize:13,marginBottom:14}}>{err}</div>}
        {editing?(
          <div>
            <label style={{display:'block',color:'var(--text-muted)',fontSize:12,marginBottom:6}}>Display Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',padding:'10px 14px',borderRadius:10,border:'1px solid var(--border)',background:'var(--bg-input)',color:'var(--text-h)',fontSize:14,outline:'none',marginBottom:12,fontFamily:'inherit'}} />
            <div style={{display:'flex',gap:10}}>
              <button onClick={save} disabled={saving} style={{padding:'9px 20px',borderRadius:10,background:'var(--brand)',color:'#fff',border:'none',cursor:saving?'not-allowed':'pointer',fontSize:13,fontWeight:600,opacity:saving?0.7:1}}>{saving?'Saving...':'Save Changes'}</button>
              <button onClick={()=>{setEditing(false);setName(userData?.name||user?.displayName||'');}} style={{padding:'9px 20px',borderRadius:10,background:'transparent',color:'var(--text-muted)',border:'1px solid var(--border)',cursor:'pointer',fontSize:13}}>Cancel</button>
            </div>
          </div>
        ):(
          <button onClick={()=>setEditing(true)} style={{padding:'9px 18px',borderRadius:10,background:'transparent',color:'var(--text-body)',border:'1px solid var(--border)',cursor:'pointer',fontSize:13,fontWeight:500,display:'flex',alignItems:'center',gap:8}}><EditSvg/> Edit Profile</button>
        )}
      </div>
    </div>
  );
}

function SettingsTab() {
  const [n,setN] = useState({updates:true,digest:true,promos:false,achievements:true});
  const items = [
    {k:'updates' as const,label:'Course Updates',desc:'New lessons added to your courses'},
    {k:'digest' as const,label:'Weekly Digest',desc:'A weekly summary of your learning progress'},
    {k:'promos' as const,label:'Promotions',desc:'Discounts and special offers on new courses'},
    {k:'achievements' as const,label:'Achievements',desc:'Celebrate milestones and certificates'},
  ];
  return (
    <div style={{maxWidth:580}}>
      <h2 style={{color:'var(--text-h)',fontSize:20,fontWeight:700,marginBottom:24}}>Settings</h2>
      <div style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:20,padding:24,marginBottom:16}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:18}}>
          <span style={{color:'var(--brand)'}}><BellSvg/></span>
          <h3 style={{color:'var(--text-h)',fontSize:15,fontWeight:600}}>Notifications</h3>
        </div>
        {items.map((item,i)=>(
          <div key={item.k} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0',borderBottom:i<items.length-1?'1px solid var(--border)':'none',gap:16}}>
            <div>
              <p style={{color:'var(--text-h)',fontSize:14,fontWeight:500,marginBottom:2}}>{item.label}</p>
              <p style={{color:'var(--text-muted)',fontSize:12}}>{item.desc}</p>
            </div>
            <Toggle checked={n[item.k]} onChange={()=>setN(p=>({...p,[item.k]:!p[item.k]}))}/>
          </div>
        ))}
      </div>
      <div style={{background:'var(--bg-card)',border:'1px solid rgba(239,68,68,0.25)',borderRadius:20,padding:24}}>
        <h3 style={{color:'#f87171',fontSize:15,fontWeight:600,marginBottom:8}}>Danger Zone</h3>
        <p style={{color:'var(--text-muted)',fontSize:13,marginBottom:16}}>Permanently delete your account. This cannot be undone.</p>
        <button onClick={()=>alert('Contact support to delete your account.')} style={{padding:'9px 18px',borderRadius:10,background:'rgba(239,68,68,0.1)',color:'#f87171',border:'1px solid rgba(239,68,68,0.3)',cursor:'pointer',fontSize:13,fontWeight:600,display:'flex',alignItems:'center',gap:8}}><TrashSvg/> Delete Account</button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const {user,loading,logout} = useAuth();
  const router = useRouter();
  const [tab,setTab] = useState<Tab>('overview');
  const [userData,setUserData] = useState<UserData|null>(null);
  const [fetching,setFetching] = useState(true);

  useEffect(()=>{
    if(!loading&&!user) router.replace('/login');
  },[user,loading,router]);

  useEffect(()=>{
    if(!user) return;
    setFetching(true);
    getDoc(doc(db,'users',user.uid)).then(snap=>{
      if(snap.exists()) setUserData(snap.data() as UserData);
    }).finally(()=>setFetching(false));
  },[user]);

  if(loading||fetching) return (
    <div style={{minHeight:'100vh',background:'var(--bg-base)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{width:36,height:36,borderRadius:'50%',border:'3px solid var(--border)',borderTopColor:'var(--brand)',animation:'spin 0.8s linear infinite'}} />
    </div>
  );
  if(!user) return null;

  const displayName = userData?.name||user.displayName||'User';
  const firstName = displayName.split(' ')[0];
  const initials = getInitials(displayName);

  const navItems:{id:Tab;label:string;icon:React.ReactNode}[] = [
    {id:'overview',label:'Overview',icon:<GridSvg/>},
    {id:'courses',label:'My Courses',icon:<BookSvg/>},
    {id:'profile',label:'Profile',icon:<UserSvg/>},
    {id:'settings',label:'Settings',icon:<GearSvg/>},
  ];

  const tabTitles:{[k in Tab]:string} = {
    overview:'Your learning at a glance',
    courses:'Track and continue your enrolled courses',
    profile:'Manage your personal information',
    settings:'Customize your experience',
  };

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'var(--bg-base)'}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <aside style={{width:240,flexShrink:0,position:'fixed',top:0,left:0,height:'100vh',background:'var(--bg-surface)',borderRight:'1px solid var(--border)',display:'flex',flexDirection:'column',zIndex:50,overflowY:'auto'}}>
        <div style={{padding:'22px 20px 18px',borderBottom:'1px solid var(--border)'}}>
          <Link href='/' style={{textDecoration:'none',display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:30,height:30,borderRadius:8,background:'linear-gradient(135deg,#2563eb,#7c3aed)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='#fff' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>
            </div>
            <span style={{color:'var(--text-h)',fontSize:14,fontWeight:700,letterSpacing:'-0.3px'}}>AI Mastery</span>
          </Link>
        </div>
        <div style={{padding:'16px 20px',borderBottom:'1px solid var(--border)'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:38,height:38,borderRadius:'50%',background:'linear-gradient(135deg,#2563eb,#7c3aed)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:13,fontWeight:700,flexShrink:0}}>{initials}</div>
            <div style={{minWidth:0}}>
              <p style={{color:'var(--text-h)',fontSize:13,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{firstName}</p>
              <p style={{color:'var(--text-muted)',fontSize:11,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',textTransform:'capitalize'}}>{userData?.subscriptionTier||'free'} plan</p>
            </div>
          </div>
        </div>
        <nav style={{flex:1,padding:'10px 10px'}}>
          {navItems.map(item=>{
            const active = tab===item.id;
            return (
              <button key={item.id} onClick={()=>setTab(item.id)} style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:10,border:'none',cursor:'pointer',background:active?'rgba(37,99,235,0.12)':'transparent',color:active?'var(--brand)':'var(--text-muted)',fontSize:14,fontWeight:active?600:400,textAlign:'left',marginBottom:2,transition:'all 0.15s'}}>
                {item.icon}{item.label}
              </button>
            );
          })}
        </nav>
        <div style={{padding:'10px 10px',borderTop:'1px solid var(--border)'}}>
          <button onClick={async()=>{await logout();router.replace('/login');}} style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:10,border:'none',cursor:'pointer',background:'transparent',color:'var(--text-muted)',fontSize:14,textAlign:'left',transition:'all 0.15s'}}>
            <OutSvg/> Sign Out
          </button>
        </div>
      </aside>
      <main style={{marginLeft:240,flex:1,minHeight:'100vh',padding:'32px 32px 64px',overflowY:'auto'}}>
        <div style={{marginBottom:24}}>
          <h1 style={{color:'var(--text-h)',fontSize:22,fontWeight:700,marginBottom:2}}>{navItems.find(n=>n.id===tab)?.label}</h1>
          <p style={{color:'var(--text-muted)',fontSize:13}}>{tabTitles[tab]}</p>
        </div>
        {tab==='overview'&&<OverviewTab firstName={firstName}/>}
        {tab==='courses'&&<CoursesTab/>}
        {tab==='profile'&&<ProfileTab userData={userData} user={user}/>}
        {tab==='settings'&&<SettingsTab/>}
      </main>
    </div>
  );
}
