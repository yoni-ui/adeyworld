/* global React */
const { useState, useEffect, useRef, useCallback } = React;

/* ───────────────── Icons (stroke, rounded) ───────────────── */
const Ic = {
  play:    (p)=> <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M7 5.5v13l11-6.5L7 5.5z" fill="currentColor"/></svg>,
  book:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 6c-2-1.4-5-1.4-7 0v12c2-1.4 5-1.4 7 0 2-1.4 5-1.4 7 0V6c-2-1.4-5-1.4-7 0z"/><path d="M12 6v12"/></svg>,
  tv:      (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M8 21h8M10.5 11l3.5 1.8-3.5 1.8z" fill="currentColor"/></svg>,
  brush:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 4l6 6-8.5 8.5a3 3 0 0 1-3 .8L4 21l1.7-4.5a3 3 0 0 1 .8-1.5L14 4z"/><path d="M11 7l6 6"/></svg>,
  star:    (p)=> <svg viewBox="0 0 24 24" {...p}><path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.9l-5.8 3.05 1.1-6.45-4.7-4.6 6.5-.95L12 2.6z" fill="currentColor"/></svg>,
  flame:   (p)=> <svg viewBox="0 0 24 24" {...p}><path d="M12 2c1 3-1.5 4.5-1.5 7A2.5 2.5 0 0 0 13 11c0-1 .6-2 .6-2 1.4 1.2 3.4 3 3.4 6a5 5 0 1 1-10 0c0-3.5 3-5.5 3-8 0-2 2-3.5 2-5z" fill="currentColor"/></svg>,
  lock:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4.5" y="10" width="15" height="10" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>,
  sound:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 9v6h4l5 4V5L9 9H5z" fill="currentColor"/><path d="M17 9.5a4 4 0 0 1 0 5"/></svg>,
  parent:  (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><circle cx="17.5" cy="9.5" r="2.4"/><path d="M16 20a4.5 4.5 0 0 1 5.5-4.4"/></svg>,
  home:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 11l8-6.5 8 6.5"/><path d="M6 10v9h12v-9"/></svg>,
  gift:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M3 10h18M12 10v10M12 10s-1-4-3.5-4S7 10 7 10M12 10s1-4 3.5-4S17 10 17 10"/></svg>,
  bolt:    (p)=> <svg viewBox="0 0 24 24" {...p}><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="currentColor"/></svg>,
  chev:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 6l6 6-6 6"/></svg>,
  lang:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>,
  /* ── extended (iconsax-style) for labels & topics ── */
  games:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2.5" y="6" width="19" height="12" rx="4"/><path d="M7 10.5v3M5.5 12h3"/><circle cx="16" cy="11" r="1.1" fill="currentColor" stroke="none"/><circle cx="18.5" cy="13.5" r="1.1" fill="currentColor" stroke="none"/></svg>,
  puzzle:  (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M10 4a2 2 0 1 1 4 0v1.5h2.5a1 1 0 0 1 1 1V9a2 2 0 1 1 0 4v2.5a1 1 0 0 1-1 1H14V18a2 2 0 1 1-4 0v-1.5H7.5a1 1 0 0 1-1-1V13a2 2 0 1 1 0-4V6.5a1 1 0 0 1 1-1H10V4z"/></svg>,
  quiz:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.2-2.5 3.9"/><circle cx="12" cy="17" r="1.1" fill="currentColor" stroke="none"/></svg>,
  pencil:  (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 4.5l5 5L9 20l-5.5 1.5L5 16 14.5 4.5z"/><path d="M13 6l5 5"/></svg>,
  brain:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 4.5A2.5 2.5 0 0 0 6.5 7 2.5 2.5 0 0 0 5 11.5a2.5 2.5 0 0 0 1 4.8V18a2 2 0 0 0 3 1.7M9 4.5A2 2 0 0 1 12 6v13M15 4.5A2.5 2.5 0 0 1 17.5 7 2.5 2.5 0 0 1 19 11.5a2.5 2.5 0 0 1-1 4.8V18a2 2 0 0 1-3 1.7"/></svg>,
  note:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 18V6l10-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></svg>,
  film:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4.5" width="18" height="15" rx="3"/><path d="M3 9.5h18M3 14.5h18M8 4.5v15M16 4.5v15"/></svg>,
  palette: (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-2 0-1.4 1-2 2-2h1a3 3 0 0 0 3-3c0-5-3.6-9-8-9z"/><circle cx="7.5" cy="11" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="16" cy="11" r="1.1" fill="currentColor" stroke="none"/></svg>,
  trophy:  (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 19h6M10 15.5V19M14 15.5V19"/></svg>,
  paw:     (p)=> <svg viewBox="0 0 24 24" fill="currentColor" {...p}><ellipse cx="7" cy="9" rx="1.6" ry="2.2"/><ellipse cx="12" cy="7.5" rx="1.7" ry="2.4"/><ellipse cx="17" cy="9" rx="1.6" ry="2.2"/><path d="M12 12c-2.6 0-4.6 1.9-4.6 3.9 0 1.5 1.2 2.3 2.6 2.3.8 0 1.4-.3 2-.3s1.2.3 2 .3c1.4 0 2.6-.8 2.6-2.3 0-2-2-3.9-4.6-3.9z"/></svg>,
  hash:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 4L7 20M17 4l-2 16M4 9h16M3 15h16"/></svg>,
  shapes:  (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="7" cy="7" r="4"/><rect x="13" y="13" width="8" height="8" rx="1.5"/><path d="M16.5 3l4 7h-8z"/></svg>,
  bowl:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 7.5c0-1 1-1.5 1-2.5M12 7c0-1 1-1.5 1-2.5M16 7.5c0-1 1-1.5 1-2.5"/></svg>,
  family:  (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="7" cy="7" r="2.6"/><circle cx="17" cy="7" r="2.6"/><path d="M3 19a4 4 0 0 1 8 0M13 19a4 4 0 0 1 8 0M11 20a2 2 0 0 1 2 0"/></svg>,
  check:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 13l4 4L19 7"/></svg>,
  arrow:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  drop:    (p)=> <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 3c3.5 4.5 6 7.5 6 10.5a6 6 0 0 1-12 0C6 10.5 8.5 7.5 12 3z"/></svg>,
  grain:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v18M12 7c-2-2-5-2-5-2s0 3 2 4 3 0 3 0M12 7c2-2 5-2 5-2s0 3-2 4-3 0-3 0M12 13c-2-2-5-2-5-2s0 3 2 4 3 0 3 0M12 13c2-2 5-2 5-2s0 3-2 4-3 0-3 0"/></svg>,
  gear:    (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7L5.6 5.6"/></svg>,
  heart:   (p)=> <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 20s-7-4.5-9.5-9C1 8 2.5 4.5 6 4.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 15.5 12 20 12 20z"/></svg>,
  clock:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>,
  sticker: (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 3.5H6a2.5 2.5 0 0 0-2.5 2.5v12A2.5 2.5 0 0 0 6 20.5h6l8.5-8.5V6a2.5 2.5 0 0 0-2.5-2.5z"/><path d="M12.5 20.2V14a2 2 0 0 1 2-2h5.7"/></svg>,
};

/* ───────────────── Categories ───────────────── */
const CATS = [
  { key:'play',  label:'Play',           am:'ጨዋታ',  icon:'play',  c:'var(--play)',   d:'var(--play-d)' },
  { key:'learn', label:'Learn',          am:'ተማር',  icon:'book',  c:'var(--learn)',  d:'var(--learn-d)' },
  { key:'watch', label:'Watch & Listen', am:'ተመልከት', icon:'tv',    c:'var(--watch)',  d:'var(--watch-d)' },
  { key:'create',label:'Create',         am:'ፍጠር',   icon:'brush', c:'var(--create)', d:'var(--create-d)' },
];
const CC = Object.fromEntries(CATS.map(c=>[c.key,c]));

/* ───────────────── Activities (from PRD engines) ───────────────── */
const ACTS = [
  { id:'abc',    cat:'learn',  title:'Trace the Fidel',   sub:'Amharic letters',   img:'assets/scenes/scene-weave.png',  engine:'Tracing',   free:true,  prog:0.6 },
  { id:'shapes', cat:'play',   title:'Shapes & Patterns', sub:'Match the mosaic',  img:'assets/scenes/scene-safari.png', engine:'Matching',  free:true,  prog:0.3 },
  { id:'safari', cat:'play',   title:'Savanna Find',      sub:'Find & seek',       img:'assets/scenes/scene-safari.png', engine:'Find',      free:true },
  { id:'cook',   cat:'play',   title:"Adey's Kitchen",    sub:'Make injera',       img:'assets/scenes/scene-cook.png',   engine:'Drag&Drop', free:false },
  { id:'weave',  cat:'create', title:'Weaving Studio',    sub:'Pattern weaver',    img:'assets/scenes/scene-weave.png',  engine:'Create',    free:true },
  { id:'paint',  cat:'create', title:'Color the Habesha', sub:'Free coloring',     img:'assets/scenes/scene-music.png',  engine:'Coloring',  free:false },
  { id:'story',  cat:'watch',  title:"Adey & the Lion",   sub:'Story adventure',   img:'assets/scenes/scene-safari.png', engine:'Story',     free:true },
  { id:'music',  cat:'watch',  title:'Krar Songs',        sub:'Sing along',        img:'assets/scenes/scene-music.png',  engine:'Watch',     free:false },
  { id:'count',  cat:'learn',  title:'Count with Teff',   sub:'Numbers 1–10',      img:'assets/scenes/scene-cook.png',   engine:'Quiz',      free:true },
];
const byCat = (k)=>ACTS.filter(a=>a.cat===k);

/* ───────────────── Characters ───────────────── */
const CHARS = {
  explorer:'assets/characters/char-explorer.png',
  chef:'assets/characters/char-chef.png',
  musician:'assets/characters/char-musician.png',
  inventor:'assets/characters/char-inventor.png',
};

/* ───────────────── Logo wordmark ───────────────── */
function Wordmark({size=30}){
  return (
    <div className="no-select" style={{display:'flex',alignItems:'center',gap:10}}>
      <div style={{width:size*1.5,height:size*1.5,borderRadius:'30% 70% 70% 30%/30% 30% 70% 70%',
        background:'linear-gradient(135deg,var(--sun),var(--watch))',display:'grid',placeItems:'center',
        boxShadow:'0 4px 0 var(--watch-d)',transform:'rotate(-6deg)'}}>
        <Ic.star style={{width:size*.85,height:size*.85,color:'#fff'}}/>
      </div>
      <div style={{fontFamily:'var(--fdisp)',fontWeight:900,lineHeight:.86,color:'#fff'}} className="title-shadow">
        <div style={{fontSize:size,letterSpacing:.5}}>ADEY</div>
        <div style={{fontSize:size*.62,color:'var(--sun)'}}>WORLD</div>
      </div>
    </div>
  );
}

/* ───────────────── Top strip (landscape greeting + stats) ───────────────── */
function TopStrip({streak=4, stars=128, child='Sami', onSound, soundOn=true, onParent, compact=false}){
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
      <div style={{display:'flex',alignItems:'center',gap:10,minWidth:0}}>
        <button className="tap no-select" aria-label="Profile" style={{width:46,height:46,borderRadius:'50%',flex:'0 0 auto',
          border:'3px solid #fff',background:'linear-gradient(160deg,var(--sun),var(--create))',
          display:'grid',placeItems:'center',fontFamily:'var(--fdisp)',fontWeight:900,color:'#fff',fontSize:20,
          boxShadow:'0 3px 0 rgba(0,0,0,.18)'}}>{child[0]}</button>
        {!compact && <div style={{lineHeight:1,minWidth:0}}>
          <div style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:24,color:'#fff'}} className="title-shadow">Selam, {child}! 👋</div>
          <div style={{fontWeight:800,fontSize:13,color:'rgba(255,255,255,.85)',marginTop:2}}>Ready to explore today?</div>
        </div>}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8,flex:'0 0 auto'}}>
        <div className="statchip" style={{color:'var(--watch-d)'}}><Ic.flame style={{width:16,height:16,color:'var(--coral)'}}/>{streak}</div>
        <div className="statchip" style={{color:'var(--sun-d)'}}><Ic.star style={{width:16,height:16,color:'var(--sun)'}}/>{stars}</div>
      </div>
    </div>
  );
}

/* ───────────────── Left nav rail (landscape) ───────────────── */
function NavRail({active='home', onPick, onSound, soundOn=true, onParent}){
  const items=[{k:'home',ic:'home',l:'Home',c:'var(--brand)'},
    {k:'play',ic:'play',l:'Play',c:'var(--play)'},{k:'learn',ic:'book',l:'Learn',c:'var(--learn)'},
    {k:'watch',ic:'tv',l:'Watch',c:'var(--watch)'},{k:'create',ic:'brush',l:'Create',c:'var(--create)'}];
  return (
    <nav className="navrail">
      <div style={{transform:'scale(.9)'}}><WordmarkMark/></div>
      <div className="sep"/>
      {items.map(it=>{const on=active===it.k;return(
        <button key={it.k} className="nb" onClick={()=>onPick&&onPick(it.k)} aria-label={it.l}
          style={on?{background:it.c,color:'#fff'}:{}}>
          {React.createElement(Ic[it.ic],{})}{it.l}
        </button>);})}
      <div style={{flex:1}}/>
      <div className="sep"/>
      <button className="nb" onClick={onSound} aria-label="Sound" style={{color:'var(--brand)'}}>
        {soundOn?<Ic.sound/>:<Ic.sound style={{opacity:.35}}/>}</button>
      <button className="nb" onClick={onParent} aria-label="Parents" style={{color:'var(--learn)'}}><Ic.parent/></button>
    </nav>
  );
}

/* small logo mark for the rail */
function WordmarkMark(){
  return (
    <div style={{width:46,height:46,borderRadius:'30% 70% 70% 30%/30% 30% 70% 70%',
      background:'linear-gradient(135deg,var(--sun),var(--watch))',display:'grid',placeItems:'center',
      boxShadow:'0 3px 0 var(--watch-d)',transform:'rotate(-6deg)'}}>
      <Ic.star style={{width:26,height:26,color:'#fff'}}/>
    </div>
  );
}

/* ───────────────── Activity card (scene thumbnail) ───────────────── */
function ActCard({a, w=170, onTap}){
  const cat=CC[a.cat];
  return (
    <button className="tap no-select" onClick={()=>onTap&&onTap(a)} style={{width:w,flex:`0 0 ${w}px`,
      borderRadius:'var(--r-tile)',background:'#fff',padding:6,textAlign:'left',
      boxShadow:'0 6px 0 rgba(0,0,0,.12),0 10px 16px rgba(0,0,0,.14)'}}>
      <div style={{position:'relative',borderRadius:'16px',overflow:'hidden',aspectRatio:'5/4',
        background:'var(--cream)'}}>
        <img src={a.img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        <span style={{position:'absolute',top:6,left:6,background:cat.c,color:'#fff',
          fontFamily:'var(--fdisp)',fontWeight:800,fontSize:10.5,padding:'3px 8px',borderRadius:'var(--r-pill)',
          display:'inline-flex',alignItems:'center',gap:4,boxShadow:'0 2px 0 rgba(0,0,0,.18)'}}>
          {React.createElement(Ic[cat.icon],{style:{width:11,height:11}})}{cat.label}</span>
        {!isUnlocked(a) && <span style={{position:'absolute',top:6,right:6,width:24,height:24,borderRadius:'50%',
          background:'var(--sun)',display:'grid',placeItems:'center',boxShadow:'0 2px 0 var(--sun-d)'}}>
          <Ic.lock style={{width:13,height:13,color:'#fff'}}/></span>}
        {a.prog!=null && <div style={{position:'absolute',left:0,right:0,bottom:0,height:6,background:'rgba(0,0,0,.18)'}}>
          <div style={{width:`${a.prog*100}%`,height:'100%',background:'var(--sun)'}}/></div>}
      </div>
      <div style={{padding:'8px 6px 4px'}}>
        <div style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:15,lineHeight:1.05,color:'var(--ink)'}}>{a.title}</div>
        <div style={{fontWeight:700,fontSize:11.5,color:'#9A7FA8',marginTop:1}}>{a.sub}</div>
      </div>
    </button>
  );
}

/* ───────────────── Horizontal rail ───────────────── */
function Rail({cat, acts, onTap, cardW=170}){
  return (
    <section style={{marginBottom:4}}>
      <div style={{display:'flex',alignItems:'center',gap:8,padding:'0 4px 8px'}}>
        <span style={{width:28,height:28,borderRadius:9,background:cat.c,display:'grid',placeItems:'center',
          boxShadow:`0 2px 0 ${cat.d}`}}>{React.createElement(Ic[cat.icon],{style:{width:16,height:16,color:'#fff'}})}</span>
        <h2 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:19,color:'#fff'}} className="title-shadow">{cat.label}</h2>
        <span style={{fontFamily:'var(--fdisp)',fontWeight:700,fontSize:13,color:'rgba(255,255,255,.7)'}}>{cat.am}</span>
        <button className="tap" style={{marginLeft:'auto',color:'#fff',fontFamily:'var(--fdisp)',fontWeight:800,
          fontSize:12,display:'flex',alignItems:'center',gap:2,opacity:.92}}>See all <Ic.chev style={{width:14,height:14}}/></button>
      </div>
      <div style={{display:'flex',gap:12,overflowX:'auto',padding:'0 4px 10px',scrollSnapType:'x mandatory'}}>
        {acts.map(a=><div key={a.id} style={{scrollSnapAlign:'start'}}><ActCard a={a} w={cardW} onTap={onTap}/></div>)}
      </div>
    </section>
  );
}

/* expose */
Object.assign(window,{Ic,CATS,CC,ACTS,byCat,CHARS,Wordmark,TopStrip,NavRail,WordmarkMark,ActCard,Rail});
