/* global React, CHARS, Ic, CC, ENGINE, launchAct, isUnlocked, unlockAct, BackBtn */
/* ══════════════════════════════════════════════════════════════
   UNLOCK FLOW (no payment): locked game →
   1) GrownupGate  — "Ask a grown-up to help you" + adult math gate
   2) AdUnlock     — watch a short rewarded video → unlocks for free
   ══════════════════════════════════════════════════════════════ */

/* ── 1) ASK A GROWN-UP ───────────────────────────────────────── */
function GrownupGate({ nav, params, onToast }){
  const act = params && params.act;
  const cat = (act && CC[act.cat]) || CC.play;
  const buddy = (act && CHARS[act.char]) || CHARS.explorer;
  const [a]=React.useState(()=>3+Math.floor(Math.random()*5));
  const [b]=React.useState(()=>2+Math.floor(Math.random()*6));
  const sum=a+b;
  const opts=React.useMemo(()=>{ const s=new Set([sum]); while(s.size<3){ s.add(Math.max(2,sum+(Math.floor(Math.random()*7)-3)) || sum+1);} return [...s].sort(()=>Math.random()-0.5); },[sum]);
  const [wrong,setWrong]=React.useState(false);
  const solve=(o)=>{ if(o===sum){ if(window.AW)AW.play('pop'); nav.go('adunlock',{act}); } else { if(window.AW)AW.play('wrong'); setWrong(true); setTimeout(()=>setWrong(false),550); } };

  return (
    <div className="screen" style={{background:'radial-gradient(125% 110% at 50% 16%, var(--brand-bright), var(--brand) 52%, var(--brand-deep))'}}>
      <div className="shellpattern"/>
      <BackBtn onClick={()=>nav.go('home')}/>
      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',gap:30,padding:'0 56px 0 74px'}}>
        {/* buddy + lock */}
        <div style={{flex:'0 0 232px',textAlign:'center',position:'relative'}}>
          <img src={buddy} alt="" className="float" style={{height:262,filter:'drop-shadow(0 14px 16px rgba(0,0,0,.3))'}}/>
          <span style={{position:'absolute',top:8,right:18,width:56,height:56,borderRadius:'50%',background:'var(--sun)',display:'grid',placeItems:'center',boxShadow:'0 4px 0 var(--sun-d)',transform:'rotate(8deg)'}}><Ic.lock style={{width:28,height:28,color:'#fff'}}/></span>
        </div>
        {/* message + gate */}
        <div style={{flex:1,maxWidth:430}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:7,background:'rgba(255,255,255,.9)',color:cat.d,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:12.5,padding:'6px 14px',borderRadius:999,boxShadow:'0 3px 0 rgba(0,0,0,.14)'}}>
            {React.createElement(Ic[cat.icon],{style:{width:14,height:14}})} {act?act.title:'This game'}</div>
          <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:34,color:'#fff',lineHeight:1.02,marginTop:12}} className="title-shadow">Ask a grown-up<br/>to help you!</h1>
          <p style={{fontFamily:'var(--fdisp)',fontWeight:700,fontSize:15,color:'rgba(255,255,255,.92)',marginTop:8}}>A grown-up can unlock this game <b>for free</b> by watching a short video.</p>

          {/* adult gate */}
          <div style={{background:'rgba(255,255,255,.12)',border:'1px solid rgba(255,255,255,.18)',borderRadius:'20px',padding:'14px 16px',marginTop:16}}>
            <div style={{display:'flex',alignItems:'center',gap:8,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:12.5,color:'rgba(255,255,255,.85)',textTransform:'uppercase',letterSpacing:1}}>
              <Ic.parent style={{width:16,height:16}}/> Grown-ups · solve to continue</div>
            <div style={{display:'flex',alignItems:'center',gap:12,marginTop:10}}>
              <span style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:24,color:'#fff'}}>{a} + {b} =</span>
              <div style={{display:'flex',gap:10}}>
                {opts.map(o=>(
                  <button key={o} className="tap no-select" onClick={()=>solve(o)} style={{width:56,height:56,borderRadius:'16px',background:'#fff',fontFamily:'var(--fdisp)',fontWeight:900,fontSize:24,color:'var(--brand)',boxShadow:'0 4px 0 rgba(0,0,0,.22)'}}>{o}</button>
                ))}
              </div>
            </div>
            {wrong && <div style={{marginTop:10,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'var(--sun)'}}>Not quite — try again!</div>}
          </div>

          <button className="tap no-select" onClick={()=>nav.go('home')} style={{marginTop:14,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:14,color:'rgba(255,255,255,.8)'}}>Maybe later</button>
        </div>
      </div>
    </div>
  );
}

/* ── 2) WATCH-TO-UNLOCK (rewarded ad) ────────────────────────── */
function AdUnlock({ nav, params, onToast }){
  const act = params && params.act;
  const DUR = 5; // seconds
  const [left,setLeft]=React.useState(DUR);
  const [done,setDone]=React.useState(false);
  const adImg = (act && act.img) || 'assets/scenes/scene-safari.png';

  React.useEffect(()=>{
    if(window.AW) AW.speak('Watch a short video to unlock the game.');
    const iv=setInterval(()=>{
      setLeft(s=>{ if(s<=1){ clearInterval(iv); setDone(true); if(window.AW)AW.play('correct'); return 0; } return s-1; });
    },1000);
    return ()=>clearInterval(iv);
  },[]);

  const claim=()=>{ if(act) unlockAct(act.id); nav.go('launch',{act}); };
  const pct=((DUR-left)/DUR)*100;

  return (
    <div className="screen" style={{background:'#0E0814',display:'grid',placeItems:'center'}}>
      <BackBtn onClick={()=>nav.go('home')}/>
      {!done ? (
        <div style={{width:'min(620px,82%)'}}>
          {/* ad label */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
            <span style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:11,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:2,border:'1px solid rgba(255,255,255,.25)',padding:'3px 9px',borderRadius:6}}>Advertisement</span>
            <span style={{display:'inline-flex',alignItems:'center',gap:6,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'rgba(255,255,255,.7)'}}>
              <span style={{width:22,height:22,borderRadius:'50%',border:'2px solid rgba(255,255,255,.3)',display:'grid',placeItems:'center',fontSize:11,color:'#fff'}}>{left}</span>
              Reward in {left}s</span>
          </div>
          {/* mock video */}
          <div style={{position:'relative',height:268,borderRadius:'20px',overflow:'hidden',border:'3px solid rgba(255,255,255,.12)'}}>
            <img src={adImg} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',filter:'saturate(1.1)'}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(0,0,0,.55),rgba(0,0,0,.1))'}}/>
            <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',width:72,height:72,borderRadius:'50%',background:'rgba(255,255,255,.92)',display:'grid',placeItems:'center',boxShadow:'0 6px 16px rgba(0,0,0,.5)'}}>
              <Ic.play style={{width:30,height:30,color:'var(--brand)'}}/></div>
            <div style={{position:'absolute',left:14,bottom:12,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'#fff'}}>Watch to unlock <b>{act?act.title:'this game'}</b></div>
            {/* progress */}
            <div style={{position:'absolute',left:0,right:0,bottom:0,height:6,background:'rgba(255,255,255,.2)'}}><div style={{height:'100%',width:`${pct}%`,background:'var(--sun)',transition:'width .9s linear'}}/></div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8,marginTop:14,justifyContent:'center',fontFamily:'var(--fdisp)',fontWeight:700,fontSize:13,color:'rgba(255,255,255,.55)'}}>
            <Ic.lock style={{width:14,height:14}}/> Please wait — you can't skip the video</div>
          <div style={{textAlign:'center',marginTop:10}}>
            <button className="tap no-select" onClick={()=>nav.go('paywall')} style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:12.5,color:'rgba(255,255,255,.45)',textDecoration:'underline'}}>Remove ads — go Premium instead</button>
          </div>
        </div>
      ) : (
        <div style={{textAlign:'center',animation:'pop .4s'}}>
          <div style={{display:'grid',placeItems:'center'}}>
            <span style={{width:104,height:104,borderRadius:'50%',background:'var(--sun)',display:'grid',placeItems:'center',boxShadow:'0 8px 0 var(--sun-d),0 0 0 14px rgba(255,197,46,.18)'}}><Ic.gift style={{width:54,height:54,color:'#fff'}}/></span>
          </div>
          <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:36,color:'#fff',marginTop:18}} className="title-shadow">Game unlocked!</h1>
          <p style={{fontFamily:'var(--fdisp)',fontWeight:700,fontSize:16,color:'rgba(255,255,255,.8)',marginTop:6}}>Thanks for watching. <b style={{color:'#fff'}}>{act?act.title:'Your game'}</b> is ready.</p>
          <button className="candy" onClick={claim} style={{'--c':'var(--play)','--cd':'var(--play-d)',color:'#fff',fontSize:18,padding:'14px 30px',marginTop:20}}><Ic.play style={{width:18,height:18}}/> Play now</button>
        </div>
      )}
    </div>
  );
}

Object.assign(window,{GrownupGate,AdUnlock});
