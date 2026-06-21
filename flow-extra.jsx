/* global React, Ic, CHARS, BackBtn */
const XS = {weave:'assets/scenes/scene-weave.png',cook:'assets/scenes/scene-cook.png',music:'assets/scenes/scene-music.png',safari:'assets/scenes/scene-safari.png'};

/* ═══════════ PAYWALL ═══════════ */
function Paywall({ nav, onToast }){
  const [plan,setPlan]=React.useState('year');
  const feats=['All 28+ activities & new worlds monthly','Full English + Amharic content','Up to 3 child profiles','Offline play & progress tracking','No ads, ever'];
  return (
    <div className="screen" style={{background:'radial-gradient(120% 120% at 50% -10%, var(--brand-bright), var(--brand) 55%, var(--brand-deep))'}}>
      <div className="shellpattern"/><BackBtn onClick={()=>nav.go('home')}/>
      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',gap:30,padding:'0 50px 0 70px'}}>
        <div style={{flex:'0 0 250px',textAlign:'center',position:'relative'}}>
          <img src={CHARS.explorer} alt="" className="float" style={{height:300,filter:'drop-shadow(0 16px 18px rgba(0,0,0,.3))'}}/>
          <div style={{position:'absolute',top:6,right:0,background:'var(--sun)',color:'#5b3d00',fontFamily:'var(--fdisp)',fontWeight:900,fontSize:13,padding:'6px 14px',borderRadius:999,transform:'rotate(8deg)',boxShadow:'0 3px 0 var(--sun-d)'}}>7 days free!</div>
        </div>
        <div style={{flex:1,maxWidth:480}}>
          <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:34,color:'#fff',lineHeight:1}} className="title-shadow">Unlock all of Adey World</h1>
          <div style={{display:'flex',flexDirection:'column',gap:7,margin:'16px 0'}}>
            {feats.map(f=><div key={f} style={{display:'flex',alignItems:'center',gap:9,color:'#fff',fontWeight:700,fontSize:14.5}}>
              <span style={{width:22,height:22,borderRadius:'50%',background:'var(--play)',display:'grid',placeItems:'center',flex:'0 0 auto'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}><path d="M5 13l4 4L19 7"/></svg></span>{f}</div>)}
          </div>
          <div style={{display:'flex',gap:12}}>
            {[['year','Yearly','$39.99','/year','Save 33%'],['month','Monthly','$4.99','/month',null]].map(([k,t,p,per,tag])=>(
              <button key={k} className="tap no-select" onClick={()=>setPlan(k)} style={{flex:1,textAlign:'left',background:plan===k?'#fff':'rgba(255,255,255,.14)',borderRadius:'18px',padding:'14px 16px',
                border:plan===k?'3px solid var(--sun)':'3px solid transparent',position:'relative'}}>
                {tag&&<span style={{position:'absolute',top:-10,right:10,background:'var(--sun)',color:'#5b3d00',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:11,padding:'2px 9px',borderRadius:999}}>{tag}</span>}
                <div style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:14,color:plan===k?'var(--brand)':'#fff'}}>{t}</div>
                <div style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:24,color:plan===k?'var(--ink)':'#fff'}}>{p}<span style={{fontSize:12,fontWeight:700,opacity:.7}}>{per}</span></div>
              </button>
            ))}
          </div>
          <button className="candy" onClick={()=>onToast('Free trial started!')} style={{'--c':'var(--sun)','--cd':'var(--sun-d)',color:'#5b3d00',fontSize:18,padding:'14px 28px',marginTop:16,width:'100%'}}>Start 7-day free trial</button>
          <div style={{textAlign:'center',fontFamily:'var(--fdisp)',fontWeight:700,fontSize:12,color:'rgba(255,255,255,.7)',marginTop:8}}>Cancel anytime · billed after trial</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ PARENT AREA ═══════════ */
function ParentArea({ nav, onToast }){
  const kids=[['Sami',CHARS.explorer,'var(--play)',128,'4h 20m'],['Abeba',CHARS.chef,'var(--watch)',86,'2h 05m']];
  return (
    <div className="screen" style={{background:'radial-gradient(120% 120% at 50% 0%,#2A1840,#1a1020)'}}>
      <BackBtn onClick={()=>nav.go('home')}/>
      <div style={{position:'absolute',top:18,left:0,right:0,display:'flex',justifyContent:'center',zIndex:10}}>
        <div style={{display:'flex',alignItems:'center',gap:9,color:'#fff'}}><Ic.parent style={{width:22,height:22}}/><h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:24}}>Parents' Area</h1></div>
      </div>
      <div style={{position:'absolute',top:64,left:0,right:0,bottom:0,overflowY:'auto',padding:'8px 40px 24px 70px'}}>
        {/* children progress */}
        <div style={{display:'flex',gap:16,marginBottom:16}}>
          {kids.map(([n,img,c,stars,time])=>(
            <div key={n} style={{flex:1,background:'rgba(255,255,255,.07)',borderRadius:'20px',padding:'14px 16px',display:'flex',gap:12,alignItems:'center',border:'1px solid rgba(255,255,255,.1)'}}>
              <span style={{width:54,height:54,borderRadius:'50%',background:c,overflow:'hidden',position:'relative',flex:'0 0 auto',border:'3px solid #fff'}}><img src={img} alt="" style={{position:'absolute',left:'50%',top:4,transform:'translateX(-50%)',height:64}}/></span>
              <div style={{flex:1}}>
                <div style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:18,color:'#fff'}}>{n}</div>
                <div style={{display:'flex',gap:14,marginTop:4}}>
                  <span style={{display:'inline-flex',alignItems:'center',gap:4,fontSize:12.5,color:'rgba(255,255,255,.7)',fontWeight:700}}><Ic.star style={{width:13,height:13}}/> {stars} stars</span>
                  <span style={{display:'inline-flex',alignItems:'center',gap:4,fontSize:12.5,color:'rgba(255,255,255,.7)',fontWeight:700}}><Ic.clock style={{width:13,height:13}}/> {time} this week</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* controls */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
          <div style={{background:'rgba(255,255,255,.07)',borderRadius:'18px',padding:'16px',border:'1px solid rgba(255,255,255,.1)'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
              <div style={{display:'inline-flex',alignItems:'center',gap:7,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:15,color:'#fff'}}><Ic.clock style={{width:17,height:17}}/> Daily play limit</div>
              {window.AWP&&AWP.limit().minutes>0 && <span style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:11.5,color:'var(--brand-ink)'}}>{AWP.limit().usedMin}/{AWP.limit().minutes}m used today</span>}
            </div>
            <div style={{display:'flex',gap:8}}>{[['20m',20],['30m',30],['45m',45],['60m',60],['Off',0]].map(([t,v])=>{const on=window.AWP&&AWP.limit().minutes===v; return <button key={t} className="tap" onClick={()=>{ if(window.AWP)AWP.setLimit(v); onToast(v?`Limit set to ${t} a day`:'Limit turned off'); }} style={{flex:1,padding:'9px 0',borderRadius:12,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,
              background:on?'var(--brand)':'rgba(255,255,255,.1)',color:'#fff',boxShadow:on?'inset 0 -2px 0 rgba(0,0,0,.25)':'none'}}>{t}</button>;})}</div>
            {window.AWP&&AWP.limit().minutes>0 && <button className="tap" onClick={()=>{AWP.resetLimit(); onToast("Today's timer reset");}} style={{marginTop:10,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:12,color:'rgba(255,255,255,.6)'}}>Reset today's timer</button>}
          </div>
          <div style={{background:'rgba(255,255,255,.07)',borderRadius:'18px',padding:'16px',border:'1px solid rgba(255,255,255,.1)'}}>
            <div style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:15,color:'#fff',marginBottom:10}}>Subscription</div>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <span className="statchip" style={{background:'var(--sun)',color:'#5b3d00',display:'inline-flex',alignItems:'center',gap:5}}><Ic.star style={{width:13,height:13}}/> Premium · Yearly</span>
              <button className="tap" onClick={()=>nav.go('paywall')} style={{marginLeft:'auto',display:'inline-flex',alignItems:'center',gap:5,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'var(--brand-ink)'}}>Manage <Ic.arrow style={{width:15,height:15}}/></button>
            </div>
          </div>
          {[['Manage profiles','profileedit','parent'],['App settings','settings','gear']].map(([t,r,ic])=>(
            <button key={t} className="tap no-select" onClick={()=>nav.go(r)} style={{background:'rgba(255,255,255,.07)',borderRadius:'18px',padding:'16px',textAlign:'left',
              fontFamily:'var(--fdisp)',fontWeight:800,fontSize:15,color:'#fff',border:'1px solid rgba(255,255,255,.1)',display:'flex',alignItems:'center',gap:10}}>{React.createElement(Ic[ic],{style:{width:20,height:20}})}{t}<Ic.chev style={{width:18,height:18,marginLeft:'auto',opacity:.6}}/></button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════ SETTINGS ═══════════ */
function Settings({ nav, onToast }){
  const [lang,setLang]=React.useState('Both'); const [sound,setSound]=React.useState(window.AW?AW.isOn():true); const [music,setMusic]=React.useState(window.AW?AW.isMusicOn():true);
  const Row=({label,icon,children})=> <div style={{display:'flex',alignItems:'center',padding:'14px 0',borderTop:'1px solid rgba(255,255,255,.1)'}}>
    <span style={{display:'inline-flex',alignItems:'center',gap:9,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:16,color:'#fff'}}>{icon&&React.createElement(Ic[icon],{style:{width:19,height:19}})}{label}</span><div style={{marginLeft:'auto'}}>{children}</div></div>;
  const Sw=({on,set})=> <button className="tap" onClick={()=>set(!on)} style={{width:54,height:30,borderRadius:999,background:on?'var(--play)':'rgba(255,255,255,.2)',padding:3,display:'flex',justifyContent:on?'flex-end':'flex-start'}}>
    <span style={{width:24,height:24,borderRadius:'50%',background:'#fff'}}/></button>;
  return (
    <div className="screen" style={{background:'radial-gradient(120% 120% at 50% 0%,#2A1840,#1a1020)'}}>
      <BackBtn onClick={()=>nav.go('parent')}/>
      <div style={{position:'absolute',top:18,left:0,right:0,textAlign:'center',zIndex:10}}><h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:24,color:'#fff'}}>Settings</h1></div>
      <div style={{position:'absolute',top:64,left:'50%',transform:'translateX(-50%)',width:'min(560px,80%)'}}>
        <Row label="Content language" icon="lang"><div style={{display:'flex',gap:6}}>{['English','አማርኛ','Both'].map(l=><button key={l} className="tap" onClick={()=>setLang(l)} style={{padding:'7px 14px',borderRadius:999,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,background:lang===l?'var(--brand)':'rgba(255,255,255,.12)',color:'#fff'}}>{l}</button>)}</div></Row>
        <Row label="Narration & sounds" icon="sound"><Sw on={sound} set={(v)=>{setSound(v); if(window.AW)AW.setOn(v);}}/></Row>
        <Row label="Background music" icon="note"><Sw on={music} set={(v)=>{setMusic(v); if(window.AW)AW.setMusic(v);}}/></Row>
        <Row label="Account" icon="parent"><button className="tap" onClick={()=>onToast('Signed out')} style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:14,color:'var(--coral)'}}>Sign out</button></Row>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:5,marginTop:20,color:'rgba(255,255,255,.4)',fontWeight:700,fontSize:12}}>Adey World v1.0.3 · Made with <Ic.heart style={{width:12,height:12}}/> in Addis Ababa</div>
      </div>
    </div>
  );
}

/* ═══════════ SEARCH ═══════════ */
function SearchScreen({ nav, onToast }){
  const all=CATALOG;
  const [q,setQ]=React.useState('');
  const chips=['Animals','Letters','Counting','Music','Food'];
  const res=q?all.filter(a=>a.title.toLowerCase().includes(q.toLowerCase())||a.sub.toLowerCase().includes(q.toLowerCase())):all.slice(0,8);
  return (
    <div className="screen">
      <div className="shellpattern"/><BackBtn onClick={()=>nav.go('home')}/>
      <div style={{position:'absolute',top:16,left:70,right:22,zIndex:10}}>
        <div style={{display:'flex',alignItems:'center',gap:10,background:'#fff',borderRadius:999,padding:'10px 18px',boxShadow:'0 6px 0 rgba(0,0,0,.14)'}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.6" strokeLinecap="round" style={{width:20,height:20}}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2"/></svg>
          <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search games, videos, songs…" style={{flex:1,border:'none',outline:'none',fontFamily:'var(--fbody)',fontWeight:700,fontSize:16,color:'var(--ink)'}}/>
        </div>
        <div style={{display:'flex',gap:8,marginTop:12,flexWrap:'wrap'}}>{chips.map(c=><button key={c} className="tap" onClick={()=>setQ('')} onMouseDown={()=>nav.go('topic',{topic:c})} style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,padding:'7px 15px',borderRadius:999,background:'rgba(255,255,255,.18)',color:'#fff'}}>{c}</button>)}</div>
      </div>
      <div style={{position:'absolute',top:118,left:0,right:0,bottom:0,overflowY:'auto',padding:'6px 22px 22px 70px'}}>
        <div style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:14,color:'rgba(255,255,255,.8)',marginBottom:10}}>{q?`${res.length} results`:'Popular activities'}</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:14}}>
          {res.map((a)=>(
            <button key={a.id} className="tap no-select" onClick={()=>launchAct(nav,a)} style={{flex:'0 0 190px',position:'relative',height:110,borderRadius:'18px',overflow:'hidden',textAlign:'left',border:'4px solid #fff',boxShadow:'0 5px 0 rgba(0,0,0,.16)'}}>
              <img src={a.img} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(0,0,0,.6),transparent 60%)'}}/>
              <span style={{position:'absolute',top:8,left:8,background:CC[a.cat].c,color:'#fff',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:11,padding:'2px 9px',borderRadius:999}}>{CC[a.cat].label}</span>
              {!isUnlocked(a) && <span style={{position:'absolute',top:8,right:8,width:22,height:22,borderRadius:'50%',background:'var(--sun)',display:'grid',placeItems:'center'}}><Ic.lock style={{width:12,height:12,color:'#fff'}}/></span>}
              <span style={{position:'absolute',left:10,bottom:8,fontFamily:'var(--fdisp)',fontWeight:900,fontSize:15,color:'#fff'}} className="title-shadow">{a.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════ ACTIVITY INTRO ═══════════ */
function ActivityIntro({ nav, params, onToast }){
  const title=params&&params.title||'Trace the Fidel'; const go=params&&params.go||'game';
  React.useEffect(()=>{ const t=setTimeout(()=>nav.go(go),2200); return ()=>clearTimeout(t); },[]);
  return (
    <div className="screen" style={{cursor:'pointer'}} onClick={()=>nav.go(go)}>
      <div className="shellpattern"/>
      <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4}}>
        <img src={CHARS.explorer} alt="" className="float" style={{height:240,filter:'drop-shadow(0 16px 18px rgba(0,0,0,.3))'}}/>
        <div className="card" style={{background:'#fff',borderRadius:'24px',padding:'14px 28px',boxShadow:'0 8px 0 rgba(0,0,0,.16)',marginTop:6}}>
          <div style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:26,color:'var(--brand)'}}>Let's play {title}!</div>
        </div>
        <div style={{display:'flex',gap:6,marginTop:14}}>{[0,1,2].map(i=><span key={i} style={{width:12,height:12,borderRadius:'50%',background:'#fff',animation:`pulse 1s ${i*0.2}s infinite`}}/>)}</div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:.4;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}`}</style>
    </div>
  );
}

/* ═══════════ SURPRISE BOX ═══════════ */
function SurpriseBox({ nav, onToast }){
  const [open,setOpen]=React.useState(false);
  return (
    <div className="screen" style={{background:'radial-gradient(120% 120% at 50% 0%,#46C46E,#1E8F49 70%,#136B36)'}}>
      <div className="shellpattern"/><BackBtn onClick={()=>nav.go('home')}/>
      {open && Array.from({length:14}).map((_,i)=><span key={i} style={{position:'absolute',top:-10,left:`${(i*7+5)%100}%`,width:10,height:14,borderRadius:3,background:['#FFC52E','#FF4FA0','#2C8BE0','#fff','#FF8A3D'][i%5],animation:`fall ${1.8+(i%5)*0.3}s ${i*0.08}s ease-in infinite`}}/>)}
      <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        {!open ? <React.Fragment>
          <button className="tap no-select" onClick={()=>{setOpen(true); if(window.AW){AW.play('celebrate');AW.speak('You won fifty stars!');}}} style={{width:170,height:170,borderRadius:'30px',background:'linear-gradient(160deg,var(--sun),var(--watch))',border:'5px solid #fff',display:'grid',placeItems:'center',boxShadow:'0 10px 0 var(--watch-d),0 16px 24px rgba(0,0,0,.3)'}}>
            <Ic.gift style={{width:90,height:90,color:'#fff'}}/></button>
          <div style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:26,color:'#fff',marginTop:22}} className="title-shadow">Tap to open your daily surprise!</div>
        </React.Fragment> : <div className="card" style={{background:'#fff',borderRadius:'30px',padding:'28px 44px',textAlign:'center',boxShadow:'0 16px 36px rgba(0,0,0,.3)'}}>
          <div style={{display:'grid',placeItems:'center',animation:'pop .5s'}}><Ic.gift style={{width:72,height:72,color:'var(--coral)'}}/></div>
          <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:32,color:'var(--play-d)',marginTop:6}}>You won 50 stars!</h1>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'var(--sun)',color:'#5b3d00',fontFamily:'var(--fdisp)',fontWeight:900,fontSize:20,padding:'8px 20px',borderRadius:999,marginTop:12,boxShadow:'0 4px 0 var(--sun-d)'}}><Ic.star style={{width:20,height:20}}/> +50</div>
          <div><button className="candy" onClick={()=>nav.go('home')} style={{'--c':'var(--play)','--cd':'var(--play-d)',fontSize:16,padding:'12px 26px',marginTop:18}}>Yay! →</button></div>
        </div>}
      </div>
      <style>{`@keyframes fall{to{transform:translateY(460px) rotate(380deg)}}@keyframes pop{0%{transform:scale(0)}70%{transform:scale(1.15)}100%{transform:scale(1)}}`}</style>
    </div>
  );
}

Object.assign(window,{Paywall,ParentArea,Settings,SearchScreen,ActivityIntro,SurpriseBox});
