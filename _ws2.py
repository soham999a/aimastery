path = 'ar-ai-mastery/app/workshop/page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find where to append - after the bonuses section closes
# The file ends with the bonuses section, we need to add the rest

rest = '''
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
'''

with open(path, 'a', encoding='utf-8') as f:
    f.write(rest)

import os
print('done, size:', os.path.getsize(path))
