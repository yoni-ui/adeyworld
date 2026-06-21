/* global React, CHARS, Ic */
const { useState:useS, useEffect:useE, useRef:useR } = React;

/* small UI helpers */
function Field({label, type='text', value, onChange, placeholder}){
  return (
    <label style={{display:'block',marginBottom:14}}>
      <span style={{display:'block',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'var(--brand)',marginBottom:5}}>{label}</span>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{width:'100%',padding:'12px 16px',borderRadius:'16px',border:'2.5px solid #EBDFF4',background:'#FBF6FF',
          fontFamily:'var(--fbody)',fontWeight:700,fontSize:15,color:'var(--ink)',outline:'none'}}/>
    </label>
  );
}
function BackBtn({onClick}){
  return <button className="tap" aria-label="Back" onClick={onClick} style={{position:'absolute',top:16,left:18,zIndex:30,
    width:44,height:44,borderRadius:'50%',background:'rgba(255,255,255,.9)',display:'grid',placeItems:'center',color:'var(--brand)',boxShadow:'0 3px 0 rgba(0,0,0,.12)'}}>
    <Ic.chev style={{width:24,height:24,transform:'rotate(180deg)'}}/></button>;
}

/* ─────────────── SPLASH ─────────────── */
function Splash({ nav }){
  useE(()=>{ const t=setTimeout(()=>nav.go('onboard'),2800); return ()=>clearTimeout(t); },[]);
  const dotC=['var(--sun)','var(--coral)','var(--play)'];
  const Cloud=({s})=> (
    <svg viewBox="0 0 120 54" style={s} aria-hidden="true"><g fill="#FBF4E9">
      <ellipse cx="38" cy="34" rx="34" ry="18"/><ellipse cx="70" cy="30" rx="30" ry="22"/>
      <ellipse cx="95" cy="36" rx="22" ry="15"/><rect x="20" y="34" width="82" height="18" rx="9"/></g></svg>
  );
  return (
    <div className="screen splash" style={{cursor:'pointer',overflow:'hidden',
      background:'radial-gradient(125% 100% at 50% 26%, #A833DC 0%, #8E1CC4 46%, #6E1098 100%)'}}
      onClick={()=>nav.go('onboard')}>

      {/* flanking clouds at wordmark height */}
      <Cloud s={{position:'absolute',top:36,left:18,width:96,opacity:.95,animation:'spfloat 5s ease-in-out infinite'}}/>
      <Cloud s={{position:'absolute',top:24,right:20,width:120,opacity:.95,animation:'spfloat 6s .5s ease-in-out infinite'}}/>

      {/* decorative stars + notes around the wordmark */}
      {[[20,52,'star',16],[80,30,'star',14],[30,70,'note',15],[86,60,'note',14],[16,72,'bolt',13],[88,44,'bolt',12]].map(([x,y,e,s],i)=>(
        <span key={i} style={{position:'absolute',left:`${x}%`,top:`${y}%`,color:'rgba(255,255,255,.9)',opacity:.9,
          animation:`twk ${1.8+(i%3)*0.5}s ${i*0.2}s ease-in-out infinite`,pointerEvents:'none'}}>{React.createElement(Ic[e],{style:{width:s+6,height:s+6}})}</span>
      ))}

      {/* wordmark — top */}
      <img src="assets/brand/wordmark.png" alt="Adeyworld" className="no-select"
        style={{position:'absolute',top:24,left:'50%',transform:'translateX(-50%)',width:404,zIndex:4,
          filter:'drop-shadow(0 6px 10px rgba(40,8,60,.28))',animation:'spPop .6s cubic-bezier(.34,1.56,.64,1) both'}}/>

      {/* kids stage illustration — anchored bottom (includes stage, toys, notes) */}
      <img src="assets/brand/kids-group.png" alt="Adey and friends" className="no-select"
        style={{position:'absolute',bottom:0,left:'50%',transform:'translateX(-50%)',width:792,zIndex:3,
          animation:'spRise .7s .12s cubic-bezier(.2,.8,.3,1) both'}}/>

      {/* loading dots — very bottom */}
      <div style={{position:'absolute',left:'50%',bottom:9,transform:'translateX(-50%)',display:'flex',gap:9,zIndex:6}}>
        {dotC.map((c,i)=><span key={i} style={{width:11,height:11,borderRadius:'50%',background:c,boxShadow:'0 2px 0 rgba(0,0,0,.2)',animation:`bnc 1s ${i*0.15}s ease-in-out infinite`}}/>)}
      </div>

      <style>{`
        @keyframes bnc{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes twk{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.18)}}
        @keyframes spfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes spPop{0%{opacity:0;transform:translateX(-50%) scale(.7)}100%{opacity:1;transform:translateX(-50%) scale(1)}}
        @keyframes spRise{0%{opacity:0;transform:translateX(-50%) translateY(40px)}100%{opacity:1;transform:translateX(-50%) translateY(0)}}
      `}</style>
    </div>
  );
}

/* ─────────────── ONBOARDING ─────────────── */
function Onboarding({ nav }){
  const [step,setStep]=useS(0);
  const [email,setEmail]=useS('');
  const [name,setName]=useS('');
  const [age,setAge]=useS(4);
  const [avatar,setAvatar]=useS('explorer');
  const avatars=[['explorer',CHARS.explorer,'var(--play)'],['chef',CHARS.chef,'var(--watch)'],['musician',CHARS.musician,'var(--learn)'],['inventor',CHARS.inventor,'var(--create)']];

  return (
    <div className="screen">
      <div className="shellpattern"/>
      {step>0 && <BackBtn onClick={()=>setStep(step-1)}/>}
      {/* progress dots */}
      <div style={{position:'absolute',top:22,left:'50%',transform:'translateX(-50%)',display:'flex',gap:8,zIndex:20}}>
        {[0,1,2].map(i=><span key={i} style={{width:i===step?26:10,height:10,borderRadius:9,background:i===step?'var(--sun)':'rgba(255,255,255,.4)',transition:'all .2s'}}/>)}
      </div>

      <div style={{position:'absolute',inset:0,top:48,display:'flex',alignItems:'center',gap:24,padding:'0 40px'}}>
        {/* art panel */}
        <div style={{flex:'0 0 280px',position:'relative',height:'100%',display:'flex',alignItems:'flex-end',justifyContent:'center'}}>
          <img src={avatars.find(a=>a[0]===avatar)[1]} alt="" className="float" style={{height:300,filter:'drop-shadow(0 16px 18px rgba(0,0,0,.3))'}}/>
        </div>
        {/* form card */}
        <div className="card" style={{flex:1,maxWidth:520,background:'#fff',borderRadius:'26px',padding:'24px 28px',boxShadow:'0 14px 34px rgba(0,0,0,.2)'}}>
          {step===0 && <React.Fragment>
            <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:34,color:'var(--brand)',lineHeight:1}}>Selam! Welcome to Adey World</h1>
            <p style={{fontWeight:700,fontSize:16,color:'#7B5E89',marginTop:12}}>A bilingual world of games, stories and songs — in English and አማርኛ. Let's set up a grown-up account first.</p>
            <div style={{display:'flex',gap:12,marginTop:22,alignItems:'center'}}>
              <button className="candy" onClick={()=>setStep(1)} style={{fontSize:17,padding:'13px 26px'}}>Get started</button>
              <button className="tap" onClick={()=>nav.go('profiles')} style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:14,color:'var(--brand)'}}>I have an account</button>
            </div>
          </React.Fragment>}

          {step===1 && <React.Fragment>
            <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:28,color:'var(--brand)'}}>Grown-up sign-up</h1>
            <p style={{fontWeight:700,fontSize:14,color:'#7B5E89',margin:'6px 0 16px'}}>We'll keep your child's data private and ad-free.</p>
            <Field label="Parent email" type="email" value={email} onChange={setEmail} placeholder="you@example.com"/>
            <div style={{display:'flex',gap:10,alignItems:'center',marginTop:4}}>
              <button className="candy" onClick={()=>setStep(2)} style={{fontSize:16,padding:'12px 24px'}}>Continue</button>
              <button className="tap no-select" onClick={()=>setStep(2)} style={{display:'flex',alignItems:'center',gap:8,background:'#fff',border:'2.5px solid #EBDFF4',borderRadius:'var(--r-pill)',padding:'11px 18px',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:14,color:'var(--ink)'}}>
                <span style={{width:18,height:18,borderRadius:'50%',background:'conic-gradient(#EA4335,#FBBC05,#34A853,#4285F4)'}}/> Continue with Google</button>
            </div>
          </React.Fragment>}

          {step===2 && <React.Fragment>
            <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:26,color:'var(--brand)'}}>Create your child's profile</h1>
            <div style={{display:'flex',gap:20,marginTop:14}}>
              <div style={{flex:1}}>
                <Field label="Child's name" value={name} onChange={setName} placeholder="e.g. Sami"/>
                <span style={{display:'block',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'var(--brand)',marginBottom:6}}>Age</span>
                <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                  {[2,3,4,5,6,7,8,9,10].map(a=>(
                    <button key={a} className="tap" onClick={()=>setAge(a)} style={{width:34,height:34,borderRadius:'12px',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:15,
                      background:age===a?'var(--brand)':'#F3E9FF',color:age===a?'#fff':'var(--brand)',boxShadow:age===a?'0 3px 0 var(--brand-deep)':'none'}}>{a}</button>
                  ))}
                </div>
              </div>
              <div style={{flex:'0 0 auto'}}>
                <span style={{display:'block',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'var(--brand)',marginBottom:6}}>Pick a buddy</span>
                <div style={{display:'flex',gap:8}}>
                  {avatars.map(([k,img,c])=>(
                    <button key={k} className="tap" onClick={()=>setAvatar(k)} style={{width:54,height:54,borderRadius:'50%',background:c,overflow:'hidden',position:'relative',
                      border:avatar===k?'4px solid var(--sun)':'4px solid #fff',boxShadow:'0 3px 0 rgba(0,0,0,.15)'}}>
                      <img src={img} alt="" style={{position:'absolute',left:'50%',top:5,transform:'translateX(-50%)',height:66}}/></button>
                  ))}
                </div>
              </div>
            </div>
            <button className="candy" onClick={()=>nav.go('profiles')} style={{fontSize:17,padding:'13px 28px',marginTop:18}}>Start playing →</button>
          </React.Fragment>}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── PROFILE SELECT ─────────────── */
function ProfileSelect({ nav }){
  const kids=[['Sami',CHARS.explorer,'var(--play)','var(--play-d)'],['Abeba',CHARS.chef,'var(--watch)','var(--watch-d)']];
  return (
    <div className="screen">
      <div className="shellpattern"/>
      <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'10px 0'}}>
        <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:34,color:'#fff',marginBottom:26,textAlign:'center'}} className="title-shadow">Who's playing today?</h1>
        <div style={{display:'flex',gap:26,marginTop:4,alignItems:'flex-start'}}>
          {kids.map(([n,img,c,cd])=>(
            <button key={n} className="tap no-select" onClick={()=>nav.go('home')} style={{textAlign:'center'}}>
              <div style={{width:128,height:128,borderRadius:'50%',background:c,border:'5px solid #fff',position:'relative',overflow:'hidden',boxShadow:`0 8px 0 ${cd},0 14px 22px rgba(0,0,0,.25)`}}>
                <img src={img} alt={n} style={{position:'absolute',left:'50%',top:10,transform:'translateX(-50%)',height:150,filter:'drop-shadow(0 4px 4px rgba(0,0,0,.2))'}}/>
              </div>
              <div style={{marginTop:12,fontFamily:'var(--fdisp)',fontWeight:900,fontSize:20,color:'#fff'}} className="title-shadow">{n}</div>
            </button>
          ))}
          <button className="tap no-select" onClick={()=>nav.go('onboard')} style={{textAlign:'center'}}>
            <div style={{width:128,height:128,borderRadius:'50%',border:'5px dashed rgba(255,255,255,.7)',display:'grid',placeItems:'center',color:'#fff'}}>
              <span style={{fontSize:54,fontFamily:'var(--fdisp)',fontWeight:700,lineHeight:1}}>+</span></div>
            <div style={{marginTop:12,fontFamily:'var(--fdisp)',fontWeight:900,fontSize:20,color:'rgba(255,255,255,.85)'}}>Add kid</div>
          </button>
        </div>
        <button className="tap no-select" onClick={()=>nav.go('parentgate')} style={{marginTop:34,display:'flex',alignItems:'center',gap:9,background:'rgba(255,255,255,.16)',
          borderRadius:'var(--r-pill)',padding:'11px 22px',color:'#fff',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:15}}>
          <Ic.parent style={{width:20,height:20}}/> Parents' area</button>
      </div>
    </div>
  );
}

/* ─────────────── PARENT GATE ─────────────── */
function ParentGate({ nav, params, onToast }){
  const then=(params&&params.then)||'parent';
  const [a]=useS(()=>3+Math.floor(Math.random()*5));
  const [b]=useS(()=>2+Math.floor(Math.random()*5));
  const sum=a+b;
  const opts=React.useMemo(()=>{ const s=new Set([sum]); while(s.size<3){ s.add(sum+(Math.floor(Math.random()*7)-3)||sum+1);} return [...s].sort(()=>Math.random()-0.5); },[sum]);
  const [wrong,setWrong]=useS(false);
  const [grant,setGrant]=useS(false);   // show the time-grant chooser after solving
  const solved=()=>{ if(then==='grant'){ setGrant(true); } else { nav.go(then); } };
  const give=(min)=>{ if(window.AWP) AWP.grantMore(min); if(window.AW)AW.play('correct'); nav.go('home',{toast:`${min} more minutes added`}); };

  if(grant){
    return (
      <div className="screen" style={{background:'radial-gradient(120% 120% at 50% 0%,#3A2150,#241433)'}}>
        <BackBtn onClick={()=>nav.go('home')}/>
        <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'0 40px'}}>
          <span style={{width:60,height:60,borderRadius:18,background:'var(--play)',display:'grid',placeItems:'center',boxShadow:'0 5px 0 var(--play-d)'}}><Ic.clock style={{width:32,height:32,color:'#fff'}}/></span>
          <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:28,color:'#fff',marginTop:14}}>Add more play time?</h1>
          <p style={{fontWeight:700,fontSize:14,color:'rgba(255,255,255,.7)',marginTop:6,textAlign:'center'}}>Give a little more time for today only.</p>
          <div style={{display:'flex',gap:12,marginTop:20}}>
            {[10,20,30].map(m=>(
              <button key={m} className="candy" onClick={()=>give(m)} style={{'--c':'var(--sun)','--cd':'var(--sun-d)',color:'#5b3d00',fontSize:17,padding:'14px 22px'}}>+{m} min</button>
            ))}
          </div>
          <button className="tap no-select" onClick={()=>nav.go('home')} style={{marginTop:18,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:14,color:'rgba(255,255,255,.65)'}}>No, that's enough for today</button>
        </div>
      </div>
    );
  }
  return (
    <div className="screen" style={{background:'radial-gradient(120% 120% at 50% 0%,#3A2150,#241433)'}}>
      <BackBtn onClick={()=>nav.go('home')}/>
      <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <span style={{width:64,height:64,borderRadius:20,background:'var(--learn)',display:'grid',placeItems:'center',boxShadow:'0 5px 0 var(--learn-d)'}}><Ic.lock style={{width:34,height:34,color:'#fff'}}/></span>
        <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:30,color:'#fff',marginTop:16}}>Grown-ups only</h1>
        <p style={{fontWeight:700,fontSize:15,color:'rgba(255,255,255,.7)',marginTop:6}}>{then==='grant'?'A grown-up can add more time. ':''}Solve to continue: <b style={{color:'#fff',fontSize:18}}>{a} + {b} = ?</b></p>
        <div style={{display:'flex',gap:14,marginTop:22}}>
          {opts.map(o=>(
            <button key={o} className="tap no-select" onClick={()=>{ if(o===sum){solved();} else {setWrong(true);setTimeout(()=>setWrong(false),500);} }}
              style={{width:72,height:72,borderRadius:'22px',background:'#fff',fontFamily:'var(--fdisp)',fontWeight:900,fontSize:30,color:'var(--brand)',boxShadow:'0 5px 0 rgba(0,0,0,.25)'}}>{o}</button>
          ))}
        </div>
        {wrong && <div style={{marginTop:16,fontFamily:'var(--fdisp)',fontWeight:800,color:'var(--coral)'}}>Try again!</div>}
      </div>
    </div>
  );
}

Object.assign(window,{Splash,Onboarding,ProfileSelect,ParentGate,BackBtn});
