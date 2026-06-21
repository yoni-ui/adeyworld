/* global React, Ic, CC, CHARS, byCat, ActCard, PlayScreen, TheaterScreen, LessonsScreen, CreateScreen, BackBtn */
const SCNp = {weave:'assets/scenes/scene-weave.png',cook:'assets/scenes/scene-cook.png',music:'assets/scenes/scene-music.png',safari:'assets/scenes/scene-safari.png'};

/* ─────────────── HOME (tabbed) ─────────────── */
function HomeRoute({ nav, onToast }){
  const [screen,setScreen]=React.useState('play');
  const tabs=[{k:'play',ic:'play',l:'Play',c:'var(--play)'},{k:'theater',ic:'tv',l:'Theater',c:'var(--watch)'},
    {k:'lessons',ic:'book',l:'Lessons',c:'var(--learn)'},{k:'create',ic:'brush',l:'Create',c:'var(--create)'}];
  const Screens={play:PlayScreen,theater:TheaterScreen,lessons:LessonsScreen,create:CreateScreen};
  const Active=Screens[screen];
  const worldCat={Adey:'play',Selam:'watch',Liya:'learn',Teddy:'create'};
  // intercept screen taps → route
  const handle=(msg)=>{
    const m=String(msg);
    if(/Tracing/.test(m)) return nav.go('game');
    const w=m.match(/^(\w+)'s world/); if(w&&worldCat[w[1]]) return nav.go('category',{world:worldCat[w[1]]});
    if(/ topic$/.test(m)) return nav.go('topic',{topic:m.replace(/ topic$/,'')});
    const v=m.match(/Playing "([^"]+)"/); if(v) return nav.go('video',{title:v[1]});
    const o=m.match(/^Opening (.+)$/); if(o && /Color|Weav|Kitchen|Draw|Music|Sticker/.test(o[1])) return nav.go('createdetail',{tool:o[1]});
    onToast(m);
  };
  return (
    <div className="screen">
      <div className="shellpattern"/>
      {/* top bar */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:58,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 22px',zIndex:30}}>
        <button className="tap no-select" aria-label="Profile" onClick={()=>nav.go('profiles')}
          style={{width:44,height:44,borderRadius:'50%',border:'3px solid #fff',background:'linear-gradient(160deg,var(--sun),var(--create))',display:'grid',placeItems:'center',fontFamily:'var(--fdisp)',fontWeight:900,color:'#fff',fontSize:19,boxShadow:'0 3px 0 rgba(0,0,0,.18)'}}>S</button>
        <div className="no-select" style={{background:'#fff',borderRadius:'var(--r-pill)',padding:'6px 14px',boxShadow:'0 3px 0 rgba(0,0,0,.12)'}}>
          <img src="assets/adeyworld-logo.png" alt="Adeyworld" style={{height:26,display:'block'}}/>
        </div>
        <button className="tap" aria-label="Search" onClick={()=>nav.go('search')} style={{width:44,height:44,borderRadius:'50%',border:'2.5px solid rgba(255,255,255,.6)',display:'grid',placeItems:'center',color:'#fff'}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" style={{width:21,height:21}}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2"/></svg></button>
      </div>
      <div key={screen} style={{position:'absolute',top:58,left:0,right:0,bottom:0,overflowY:'auto',overflowX:'hidden',padding:'6px 0 94px'}}>
        <Active nav={nav} onToast={handle}/>
      </div>
      <nav style={{position:'absolute',left:'50%',bottom:14,transform:'translateX(-50%)',zIndex:40,display:'flex',gap:4,background:'#fff',borderRadius:'26px',padding:'8px 12px',boxShadow:'0 10px 26px rgba(0,0,0,.28)'}}>
        {tabs.map(it=>{const on=screen===it.k;return(
          <button key={it.k} className="tap" onClick={()=>setScreen(it.k)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,padding:'6px 16px',borderRadius:'18px',
            background:on?it.c:'transparent',color:on?'#fff':'var(--ink)',minWidth:60,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:12,boxShadow:on?'inset 0 -3px 0 rgba(0,0,0,.16)':'none'}}>
            {React.createElement(Ic[it.ic],{style:{width:24,height:24}})}{it.l}</button>);})}
      </nav>
      <div style={{position:'absolute',right:18,bottom:14,zIndex:40,display:'flex',alignItems:'center',gap:8}}>
        <button className="statchip tap" onClick={()=>nav.go('stickers')} style={{color:'var(--sun-d)',padding:'7px 12px',border:'none'}}><Ic.star style={{width:16,height:16,color:'var(--sun)'}}/>{window.AWP?AWP.available():0}</button>
        <button className="tap" aria-label="Rewards" onClick={()=>nav.go('surprise')} style={{width:56,height:56,borderRadius:'50%',background:'linear-gradient(160deg,var(--watch),var(--coral))',border:'4px solid #fff',display:'grid',placeItems:'center',boxShadow:'0 6px 0 rgba(0,0,0,.2)'}}><Ic.gift style={{width:27,height:27,color:'#fff'}}/></button>
      </div>
    </div>
  );
}

/* ─────────────── CATEGORY ─────────────── */
function CategoryScreen({ nav, params, onToast }){
  const cat=CC[params.world]||CC.play;
  const acts=byCat(cat.key);
  return (
    <div className="screen" style={{background:`radial-gradient(120% 120% at 50% -10%, ${cat.c}, var(--brand) 60%, var(--brand-deep))`}}>
      <div className="shellpattern"/>
      <BackBtn onClick={()=>nav.go('home')}/>
      <div style={{position:'absolute',top:18,left:0,right:0,display:'flex',flexDirection:'column',alignItems:'center',zIndex:10}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{width:40,height:40,borderRadius:13,background:'#fff',color:cat.c,display:'grid',placeItems:'center',boxShadow:'0 3px 0 rgba(0,0,0,.15)'}}>{React.createElement(Ic[cat.icon],{style:{width:24,height:24}})}</span>
          <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:30,color:'#fff'}} className="title-shadow">{cat.label}</h1>
          <span style={{fontFamily:'var(--fdisp)',fontWeight:700,fontSize:18,color:'rgba(255,255,255,.75)'}}>{cat.am}</span>
        </div>
      </div>
      <div style={{position:'absolute',top:78,left:0,right:0,bottom:0,overflowY:'auto',overflowX:'hidden',padding:'4px 28px 22px'}}>
        <div style={{display:'flex',flexWrap:'wrap',gap:18,justifyContent:'center'}}>
          {acts.concat(acts.slice(0,Math.max(0,4-acts.length))).map((a,i)=>(
            <div key={a.id+i} style={{position:'relative'}}>
              <ActCard a={a} w={200} onTap={(x)=>x.free!==false&&x.id?nav.go('game'):nav.go('game')}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── TRACING GAME ─────────────── */
function TracingGame({ nav, onToast }){
  const letters=[{g:'ሀ',r:'ha'},{g:'ለ',r:'le'},{g:'ሐ',r:'ḥa'}];
  const [idx,setIdx]=React.useState(0);
  const [prog,setProg]=React.useState(0);
  const [done,setDone]=React.useState(false);
  const cv=React.useRef(null), drawing=React.useRef(false), last=React.useRef(null), count=React.useRef(0);
  const TARGET=46;

  React.useEffect(()=>{ // reset canvas on letter change
    const c=cv.current; if(c){ const ctx=c.getContext('2d'); ctx.clearRect(0,0,c.width,c.height); }
    count.current=0; setProg(0); setDone(false);
  },[idx]);

  const pos=(e)=>{ const c=cv.current; const r=c.getBoundingClientRect(); const t=e.touches?e.touches[0]:e;
    return {x:(t.clientX-r.left)*(c.width/r.width), y:(t.clientY-r.top)*(c.height/r.height)}; };
  const start=(e)=>{ if(done) return; drawing.current=true; last.current=pos(e); };
  const move=(e)=>{ if(!drawing.current||done) return; e.preventDefault(); const p=pos(e); const c=cv.current; const ctx=c.getContext('2d');
    ctx.strokeStyle='#FFC52E'; ctx.lineWidth=26; ctx.lineCap='round'; ctx.lineJoin='round';
    ctx.beginPath(); ctx.moveTo(last.current.x,last.current.y); ctx.lineTo(p.x,p.y); ctx.stroke(); last.current=p;
    count.current++; const pr=Math.min(count.current/TARGET,1); setProg(pr);
    if(pr>=1){ setDone(true); setTimeout(()=>{ if(idx<letters.length-1) setIdx(idx+1); else nav.go('reward',{stars:3,title:'Trace the Fidel'}); }, 750); } };
  const end=()=>{ drawing.current=false; };

  return (
    <div className="screen">
      <div className="shellpattern"/>
      <BackBtn onClick={()=>nav.go('home')}/>
      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',gap:30,padding:'0 44px 0 80px'}}>
        {/* trace pad */}
        <div style={{position:'relative',width:300,height:300,borderRadius:'32px',background:'#fff',boxShadow:'0 12px 0 rgba(0,0,0,.16)',overflow:'hidden',touchAction:'none'}}>
          <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',fontFamily:'var(--fdisp)',fontWeight:400,fontSize:240,color:'#EEE3F4',lineHeight:1,userSelect:'none'}}>{letters[idx].g}</div>
          <canvas ref={cv} width={300} height={300} style={{position:'absolute',inset:0,cursor:'crosshair'}}
            onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
            onTouchStart={start} onTouchMove={move} onTouchEnd={end}/>
          {done && <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',background:'rgba(52,183,95,.16)'}}>
            <span style={{width:74,height:74,borderRadius:'50%',background:'var(--play)',display:'grid',placeItems:'center',boxShadow:'0 5px 0 var(--play-d)',animation:'pop .4s'}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" style={{width:40,height:40}}><path d="M5 13l4 4L19 7"/></svg></span></div>}
        </div>
        {/* side panel */}
        <div style={{flex:1,maxWidth:380}}>
          <div style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'rgba(255,255,255,.7)',textTransform:'uppercase',letterSpacing:1.5}}>Tracing · Learn</div>
          <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:34,color:'#fff',lineHeight:1}} className="title-shadow">Trace the Fidel</h1>
          <div style={{display:'flex',alignItems:'center',gap:14,marginTop:18}}>
            <div style={{width:84,height:84,borderRadius:'24px',background:'rgba(255,255,255,.16)',display:'grid',placeItems:'center',fontFamily:'var(--fdisp)',fontWeight:700,fontSize:56,color:'#fff'}}>{letters[idx].g}</div>
            <div>
              <div style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:28,color:'#fff'}}>"{letters[idx].r}"</div>
              <button className="tap no-select" onClick={()=>onToast(letters[idx].r)} style={{display:'flex',alignItems:'center',gap:7,marginTop:6,background:'#fff',borderRadius:'var(--r-pill)',padding:'8px 16px',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:14,color:'var(--brand)',boxShadow:'0 3px 0 rgba(0,0,0,.15)'}}>
                <Ic.sound style={{width:18,height:18}}/> Hear it</button>
            </div>
          </div>
          {/* progress */}
          <div style={{display:'flex',gap:8,marginTop:22}}>
            {letters.map((l,i)=><span key={i} style={{flex:1,height:10,borderRadius:9,background:i<idx?'var(--sun)':i===idx?'rgba(255,255,255,.85)':'rgba(255,255,255,.25)',position:'relative',overflow:'hidden'}}>
              {i===idx && <span style={{position:'absolute',left:0,top:0,bottom:0,width:`${prog*100}%`,background:'var(--sun)'}}/>}</span>)}
          </div>
          <div style={{fontWeight:700,fontSize:14,color:'rgba(255,255,255,.85)',marginTop:12}}>Drag along the letter to trace it</div>
          <button className="tap no-select" onClick={()=>{ if(idx<letters.length-1) setIdx(idx+1); else nav.go('reward',{stars:3,title:'Trace the Fidel'}); }}
            style={{marginTop:14,display:'inline-flex',alignItems:'center',gap:5,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'rgba(255,255,255,.8)'}}>Skip <Ic.arrow style={{width:15,height:15}}/></button>
        </div>
      </div>
      <style>{`@keyframes pop{0%{transform:scale(0)}70%{transform:scale(1.15)}100%{transform:scale(1)}}`}</style>
    </div>
  );
}

/* ─────────────── REWARD ─────────────── */
function Reward({ nav, params }){
  const stars=params&&params.stars||3;
  const title=params&&params.title||'the activity';
  const replayTo=params&&params.replay||'home';
  const diff=(params&&params.diff)||(window.__awPlay&&window.__awPlay.diff)||'easy';
  const msg = stars>=3?'Perfect!':stars===2?'Great job!':'Well done!';
  const starWord = stars>=3?'Amazing! Three stars!':stars===2?'Great job! Two stars!':'Well done!';
  const recRef=React.useRef(null);
  if(recRef.current===null){
    // record ONCE during render so the displayed numbers are post-update
    const pid=(window.__awPlay&&window.__awPlay.id);
    recRef.current = (window.AWP&&pid) ? AWP.record(pid, diff, stars) : {award:stars*10};
    window.__awPlay=null;
  }
  const rec=recRef.current;
  const diffMult={easy:1,medium:2,hard:3}[diff]||1;
  React.useEffect(()=>{ if(window.AW){ AW.play('celebrate'); [0,1,2].slice(0,stars).forEach((_,i)=>setTimeout(()=>AW.play('star'),500+i*220)); setTimeout(()=>AW.speak(starWord),900);} },[]);
  return (
    <div className="screen" style={{background:'radial-gradient(120% 120% at 50% 0%,#46C46E,#1E8F49 70%,#136B36)'}}>
      <div className="shellpattern"/>
      {/* confetti */}
      {Array.from({length:14}).map((_,i)=><span key={i} style={{position:'absolute',top:-10,left:`${(i*7+5)%100}%`,width:10,height:14,borderRadius:3,
        background:['#FFC52E','#FF4FA0','#2C8BE0','#fff','#FF8A3D'][i%5],animation:`fall ${1.8+(i%5)*0.3}s ${i*0.1}s ease-in infinite`}}/>)}
      <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <div className="card" style={{background:'#fff',borderRadius:'32px',padding:'26px 44px 30px',textAlign:'center',boxShadow:'0 18px 40px rgba(0,0,0,.3)',position:'relative'}}>
          <div style={{display:'flex',gap:10,justifyContent:'center',marginTop:-2}}>
            {[0,1,2].map(i=><span key={i} style={{animation:`pop .5s ${0.15*i+0.1}s both`}}>
              <Ic.star style={{width:i===1?72:56,height:i===1?72:56,color:i<stars?'var(--sun)':'#E3D9EC',filter:i<stars?'drop-shadow(0 4px 0 var(--sun-d))':'none',marginTop:i===1?-12:6}}/></span>)}
          </div>
          <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:40,color:'var(--play-d)',marginTop:8}}>{msg}</h1>
          <p style={{fontWeight:800,fontSize:16,color:'#7B5E89',marginTop:4}}>You finished {title}{diff!=='easy'&&<span style={{marginLeft:6,fontFamily:'var(--fdisp)',fontWeight:900,fontSize:12,color:'#fff',background:diff==='hard'?'var(--create)':'var(--learn)',padding:'2px 9px',borderRadius:999,verticalAlign:'middle'}}>{diff.toUpperCase()}</span>}</p>
          {rec&&rec.newBest && <div style={{display:'inline-flex',alignItems:'center',gap:5,marginTop:6,fontFamily:'var(--fdisp)',fontWeight:900,fontSize:12,color:'var(--play-d)',background:'#E5F7EC',padding:'3px 11px',borderRadius:999}}><Ic.bolt style={{width:13,height:13}}/> New best score!</div>}
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'var(--sun)',color:'#5b3d00',fontFamily:'var(--fdisp)',fontWeight:900,fontSize:20,padding:'8px 20px',borderRadius:'var(--r-pill)',marginTop:14,boxShadow:'0 4px 0 var(--sun-d)'}}>
            <Ic.star style={{width:20,height:20}}/> +{(rec&&rec.award)||stars*10} stars{diffMult>1&&<span style={{fontSize:13,opacity:.8}}>(×{diffMult})</span>}</div>
          <div style={{display:'flex',gap:12,justifyContent:'center',marginTop:20}}>
            <button className="candy" onClick={()=>nav.go(replayTo)} style={{'--c':'#fff','--cd':'#D9D2C4',color:'var(--play-d)',fontSize:16,padding:'12px 22px'}}>Play again</button>
            <button className="candy" onClick={()=>nav.go('trophies')} style={{'--c':'var(--sun)','--cd':'var(--sun-d)',color:'#5b3d00',fontSize:16,padding:'12px 20px',display:'inline-flex',alignItems:'center',gap:7}}><Ic.trophy style={{width:18,height:18}}/> Trophies</button>
            <button className="candy" onClick={()=>nav.go('home')} style={{'--c':'var(--play)','--cd':'var(--play-d)',color:'#fff',fontSize:16,padding:'12px 26px',display:'inline-flex',alignItems:'center',gap:7}}>Continue <Ic.arrow style={{width:17,height:17}}/></button>
          </div>
        </div>
      </div>
      <style>{`@keyframes fall{to{transform:translateY(460px) rotate(380deg)}}`}</style>
    </div>
  );
}

Object.assign(window,{HomeRoute,CategoryScreen,TracingGame,Reward});
