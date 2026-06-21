/* global React, CHARS, CC, Ic, AWContent */
/* ===== Adey World — catalog now reads from the CANONICAL content store ===== */
/* (content.js → window.AWContent; CMS edits in localStorage reflect here) */

/* engine → route + label + verb shown on the launcher */
const ENGINE = {
  tracing:  {route:'game',     label:'Tracing',       verb:'Get your finger ready to trace!'},
  matching: {route:'match',    label:'Matching',      verb:'Find the matching pairs!'},
  quiz:     {route:'quiz',     label:'Quiz',          verb:'Answer the questions!'},
  dragdrop: {route:'dragdrop', label:'Drag & Drop',   verb:'Drag everything into place!'},
  story:    {route:'story',    label:'Story',         verb:'Sit back and enjoy the story!'},
  coloring: {route:'coloring', label:'Coloring',      verb:'Pick your colors and paint!'},
  song:     {route:'video',    label:'Song',          verb:'Sing along together!'},
};

/* pull live content from the shared store; hide drafts/archived (CMS-controlled) */
const _all = (window.AWContent ? AWContent.activities() : []);
const CATALOG = _all.filter(a=> a.status!=='draft' && a.status!=='archived');

/* character sprites from the SAME store — expose with canonical + legacy keys
   so every screen (which may use explorer/chef/musician/inventor) keeps working */
(function(){
  if(!window.AWContent) return;
  const cm = AWContent.charMap();                  // {adey,selam,liya,teddy} → sprite
  const alias = {explorer:'adey',chef:'selam',musician:'liya',inventor:'teddy'};
  const merged = Object.assign({}, window.CHARS||{}, cm);
  Object.keys(alias).forEach(k=>{ if(cm[alias[k]]) merged[k]=cm[alias[k]]; });
  window.CHARS = merged;
})();

const CAT_OF = Object.fromEntries(CATALOG.map(a=>[a.id,a]));
const catActs = (k)=>CATALOG.filter(a=>a.cat===k);
const freeActs = ()=>CATALOG.filter(a=>a.free);

/* central launch helper — EVERY activity goes through the game launcher */
/* unlock store: games unlocked by watching a rewarded video (no payment) */
function awUnlocked(){ try{ return JSON.parse(localStorage.getItem('aw_unlocked')||'[]'); }catch(e){ return []; } }
function isUnlocked(act){ return !act || act.free!==false || awUnlocked().indexOf(act.id)>-1; }
function unlockAct(id){ try{ var u=awUnlocked(); if(u.indexOf(id)<0){ u.push(id); localStorage.setItem('aw_unlocked',JSON.stringify(u)); } }catch(e){} }
function launchAct(nav, act){
  if(!act) return;
  if(!isUnlocked(act)){ nav.go('grownup',{act}); return; }  // locked → ask a grown-up → watch-to-unlock
  nav.go('launch',{act});
}

/* ═══════════ GAME LAUNCHER (starter splash before every game) ═══════════ */
function GameLauncher({ nav, params, onToast }){
  const act = (params&&params.act) || CATALOG[0];
  const cat = CC[act.cat] || CC.play;
  const eng = ENGINE[act.engine] || ENGINE.matching;
  const [prog,setProg]=React.useState(0);
  const startedRef=React.useRef(false);

  const go=React.useCallback((diff,playable)=>{
    if(startedRef.current) return;
    if(playable===false){ nav.go('grownup',{act}); return; }   // locked level → ask a grown-up
    startedRef.current=true;
    window.__awPlay={id:act.id, diff:diff||'easy'};             // context for the Reward screen
    nav.go(eng.route,{title:act.title, character:act.char, replay:eng.route, fromLaunch:act.id, diff:diff||'easy'});
  },[]);

  React.useEffect(()=>{
    if(window.AW) AW.speak(`${act.title}. Choose how to play!`);
  },[]);

  return (
    <div className="screen" style={{overflow:'hidden',
      background:`radial-gradient(125% 110% at 50% 18%, var(--brand-bright), var(--brand) 52%, var(--brand-deep) 100%)`}}>
      <div className="shellpattern"/>
      <BackBtn onClick={()=>nav.go('home')}/>
      {/* floating scene chip */}
      <img src={act.img} alt="" style={{position:'absolute',top:-30,right:-30,width:200,height:200,objectFit:'cover',borderRadius:'50%',opacity:.22,filter:'blur(1px)'}}/>
      {/* engine pill */}
      <div style={{position:'absolute',top:24,left:'50%',transform:'translateX(-50%)',display:'inline-flex',alignItems:'center',gap:8,
        background:'rgba(255,255,255,.9)',color:cat.d,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,padding:'7px 16px',borderRadius:999,boxShadow:'0 4px 0 rgba(0,0,0,.14)'}}>
        {React.createElement(Ic[cat.icon],{style:{width:15,height:15}})} {cat.label} · {eng.label}</div>

      <div style={{position:'absolute',inset:0,top:30,display:'flex',alignItems:'center',justifyContent:'center',gap:30,padding:'0 56px'}}>
        {/* character */}
        <div style={{position:'relative',flex:'0 0 auto'}}>
          <div style={{position:'absolute',left:'50%',bottom:2,transform:'translateX(-50%)',width:160,height:22,background:'rgba(0,0,0,.22)',borderRadius:'50%',filter:'blur(7px)'}}/>
          <img src={CHARS[act.char]} alt="" className="float" style={{position:'relative',height:232,filter:'drop-shadow(0 14px 16px rgba(0,0,0,.3))'}}/>
        </div>
        {/* text + difficulty */}
        <div style={{maxWidth:430,flex:1}}>
          <div style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:14,color:'rgba(255,255,255,.85)',textTransform:'uppercase',letterSpacing:1.4}}>Get ready for…</div>
          <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:36,color:'#fff',lineHeight:.98,marginTop:4}} className="title-shadow">{act.title}</h1>
          <p style={{fontFamily:'var(--fdisp)',fontWeight:700,fontSize:16,color:'rgba(255,255,255,.92)',marginTop:6}}>Pick how to play — you keep your best stars!</p>
          <DifficultyPicker act={act} onPick={go}/>
        </div>
      </div>
    </div>
  );
}

Object.assign(window,{CATALOG,CAT_OF,catActs,freeActs,ENGINE,launchAct,GameLauncher,isUnlocked,unlockAct,awUnlocked});
