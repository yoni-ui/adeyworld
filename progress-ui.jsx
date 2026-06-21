/* global React, Ic, CHARS, CC, AWP, BackBtn */
/* ════════ AdeyWorld — progression UI (status bar · stickers · difficulty · limit) ════════ */

/* live hook — re-renders any component when the progress store changes */
function useProgress(){
  const [,bump]=React.useState(0);
  React.useEffect(()=>{ if(!window.AWP) return; const f=()=>bump(n=>n+1); AWP.onChange(f); return; },[]);
  return window.AWP;
}

/* ---- sticker album (what stars buy) ---- */
const STICKERS=[
  {id:'adey-1',  name:'Explorer Adey', cost:0,   char:'adey',  rare:'start'},
  {id:'liya-1',  name:'Liya & Krar',   cost:0,   char:'liya',  rare:'start'},
  {id:'selam-1', name:'Chef Selam',    cost:40,  char:'selam', rare:'common'},
  {id:'teddy-1', name:'Inventor Teddy',cost:40,  char:'teddy', rare:'common'},
  {id:'lion-1',  name:'Savanna Lion',  cost:60,  img:'assets/scenes/scene-safari.png', rare:'common'},
  {id:'jebena-1',name:'Coffee Jebena', cost:60,  img:'assets/scenes/scene-cook.png',   rare:'common'},
  {id:'krar-1',  name:'Golden Krar',   cost:90,  img:'assets/scenes/scene-music.png',  rare:'rare'},
  {id:'weave-1', name:'Habesha Weave', cost:90,  img:'assets/scenes/scene-weave.png',  rare:'rare'},
  {id:'star-1',  name:'Super Star',    cost:120, icon:'star',  rare:'rare'},
  {id:'crown-1', name:'Flower Crown',  cost:150, icon:'trophy',rare:'epic'},
  {id:'adey-gold',name:'Golden Adey',  cost:200, char:'adey',  rare:'epic', gold:true},
  {id:'rocket-1',name:'Star Rocket',   cost:250, icon:'bolt',  rare:'epic'},
];
const RARE_C={start:'#9A7FA8',common:'#34B764',rare:'#2C8BE0',epic:'#FF5CA8'};

/* small circular progress ring */
function Ring({pct,size=40,stroke=5,color='var(--sun)',track='rgba(255,255,255,.25)',children}){
  const r=(size-stroke)/2, c=2*Math.PI*r, off=c*(1-Math.max(0,Math.min(1,pct)));
  return (
    <span style={{position:'relative',width:size,height:size,display:'inline-grid',placeItems:'center'}}>
      <svg width={size} height={size} style={{position:'absolute',transform:'rotate(-90deg)'}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} style={{transition:'stroke-dashoffset .5s cubic-bezier(.2,.7,.3,1)'}}/>
      </svg>
      {children}
    </span>
  );
}

/* ---- HOME STATUS BAR — stars · streak · daily-goal ring ---- */
function HomeStatusBar({ nav }){
  const P=useProgress(); if(!P) return null;
  const avail=P.available(), streak=P.streak(), d=P.daily();
  return (
    <div style={{display:'flex',alignItems:'center',gap:9,padding:'0 28px 10px'}}>
      {/* stars (tap → sticker shop) */}
      <button className="tap no-select" onClick={()=>nav.go('stickers')} style={{display:'inline-flex',alignItems:'center',gap:7,background:'#fff',borderRadius:999,padding:'7px 14px',boxShadow:'0 3px 0 rgba(0,0,0,.14)'}}>
        <Ic.star style={{width:18,height:18,color:'var(--sun)'}}/>
        <b style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:16,color:'var(--ink)'}}>{avail}</b>
        <span style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:11,color:'#9A7FA8'}}>stars</span>
      </button>
      {/* streak */}
      <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(255,255,255,.16)',borderRadius:999,padding:'7px 13px'}}>
        <Ic.flame style={{width:17,height:17,color:'#FFB13B'}}/>
        <b style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:15,color:'#fff'}}>{streak}</b>
        <span style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:11,color:'rgba(255,255,255,.8)'}}>day{streak===1?'':'s'}</span>
      </div>
      {/* daily goal ring */}
      <div style={{marginLeft:'auto',display:'inline-flex',alignItems:'center',gap:10,background:'rgba(255,255,255,.16)',borderRadius:18,padding:'5px 14px 5px 8px'}}>
        <Ring pct={d.count/d.goal} size={38} stroke={5} color={d.done?'#5BE584':'var(--sun)'}>
          {d.done ? <Ic.check style={{width:18,height:18,color:'#5BE584'}}/>
                  : <b style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:13,color:'#fff'}}>{d.count}/{d.goal}</b>}
        </Ring>
        <div style={{lineHeight:1}}>
          <div style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:13,color:'#fff'}}>{d.done?'Goal done!':'Daily goal'}</div>
          <div style={{fontFamily:'var(--fdisp)',fontWeight:700,fontSize:11,color:'rgba(255,255,255,.8)'}}>{d.done?'Come back tomorrow':`Play ${d.goal-d.count} more`}</div>
        </div>
      </div>
    </div>
  );
}

/* ---- DIFFICULTY PICKER — shown on the launcher (Easy free / Medium / Hard) ---- */
function DifficultyPicker({ act, onPick }){
  const P=window.AWP; const best=P?P.best(act.id):{easy:0,medium:0,hard:0};
  const LV=[
    {k:'easy',  label:'Easy',   sub:'Just right to start', c:'var(--play)',  cd:'var(--play-d)'},
    {k:'medium',label:'Medium', sub:'A little tricky',      c:'var(--learn)', cd:'var(--learn-d)'},
    {k:'hard',  label:'Hard',   sub:'For big kids',          c:'var(--create)',cd:'var(--create-d)'},
  ];
  return (
    <div style={{display:'flex',gap:12,marginTop:18}}>
      {LV.map(lv=>{
        const playable=!P||P.diffPlayable(act,lv.k);
        const stars=best[lv.k]||0;
        return (
          <button key={lv.k} className="tap no-select" onClick={()=>onPick(lv.k,playable)}
            style={{flex:1,textAlign:'left',background:'#fff',borderRadius:'18px',padding:'12px 14px',position:'relative',boxShadow:`0 5px 0 ${lv.cd}`,opacity:playable?1:.92}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:17,color:lv.cd}}>{lv.label}</span>
              {lv.k==='easy'
                ? <span style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:10,color:'var(--play-d)',background:'#E5F7EC',padding:'2px 8px',borderRadius:999}}>FREE</span>
                : !playable && <span style={{width:22,height:22,borderRadius:'50%',background:'var(--sun)',display:'grid',placeItems:'center',boxShadow:'0 2px 0 var(--sun-d)'}}><Ic.lock style={{width:12,height:12,color:'#fff'}}/></span>}
            </div>
            <div style={{fontFamily:'var(--fdisp)',fontWeight:700,fontSize:11.5,color:'#9A7FA8',marginTop:2}}>{lv.sub}</div>
            <div style={{display:'flex',gap:2,marginTop:8}}>
              {[0,1,2].map(i=><Ic.star key={i} style={{width:13,height:13,color:i<stars?'var(--sun)':'#E3D9EC'}}/>)}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ---- STICKER BOOK — spend stars ---- */
function StickerBook({ nav, onToast }){
  const P=useProgress(); if(!P) return null;
  const avail=P.available();
  const owned=P.stickers();
  const buy=(s)=>{
    if(P.hasSticker(s.id)) return;
    if(P.buySticker(s.id, s.cost)){ if(window.AW)AW.play('star'); onToast&&onToast(`You got ${s.name}!`); }
    else { if(window.AW)AW.play('wrong'); onToast&&onToast(`Need ${s.cost-avail} more stars`); }
  };
  const Art=(s)=>{
    if(s.char) return <img src={CHARS[s.char]} alt="" style={{height:74,filter:s.gold?'drop-shadow(0 0 6px var(--sun)) saturate(1.3)':'drop-shadow(0 4px 5px rgba(0,0,0,.25))'}}/>;
    if(s.img)  return <img src={s.img} alt="" style={{width:74,height:74,objectFit:'cover',borderRadius:14}}/>;
    return React.createElement(Ic[s.icon||'star'],{style:{width:56,height:56,color:'#fff'}});
  };
  return (
    <div className="screen" style={{background:'radial-gradient(125% 110% at 50% 12%, var(--brand-bright), var(--brand) 52%, var(--brand-deep))'}}>
      <div className="shellpattern"/>
      <BackBtn onClick={()=>nav.go('home')}/>
      <div style={{position:'absolute',top:18,left:0,right:0,display:'flex',alignItems:'center',gap:12,padding:'0 24px 0 74px'}}>
        <Ic.sticker style={{width:30,height:30,color:'#fff'}}/>
        <div>
          <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:26,color:'#fff',lineHeight:1}} className="title-shadow">Sticker Book</h1>
          <span style={{fontFamily:'var(--fdisp)',fontWeight:700,fontSize:13,color:'rgba(255,255,255,.85)'}}>{owned.length} of {STICKERS.length} collected</span>
        </div>
        <div style={{marginLeft:'auto',display:'inline-flex',alignItems:'center',gap:7,background:'#fff',borderRadius:999,padding:'8px 16px',boxShadow:'0 3px 0 rgba(0,0,0,.16)'}}>
          <Ic.star style={{width:18,height:18,color:'var(--sun)'}}/><b style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:17,color:'var(--ink)'}}>{avail}</b></div>
      </div>
      <div style={{position:'absolute',top:78,left:0,right:0,bottom:0,overflowY:'auto',padding:'4px 24px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
          {STICKERS.map(s=>{
            const have=owned.indexOf(s.id)>-1, can=avail>=s.cost;
            return (
              <button key={s.id} className="tap no-select" onClick={()=>buy(s)} disabled={have}
                style={{position:'relative',background:have?'#fff':'rgba(255,255,255,.12)',border:have?`3px solid ${RARE_C[s.rare]}`:'3px dashed rgba(255,255,255,.3)',
                  borderRadius:'20px',padding:'14px 8px 10px',display:'flex',flexDirection:'column',alignItems:'center',gap:6,minHeight:130,justifyContent:'center',
                  boxShadow:have?`0 5px 0 ${RARE_C[s.rare]}55`:'none'}}>
                <span style={{display:'grid',placeItems:'center',height:74,filter:have?'none':'grayscale(1) opacity(.55)'}}>{Art(s)}</span>
                <div style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:12,color:have?'var(--ink)':'#fff',textAlign:'center',lineHeight:1.05}}>{have?s.name:'???'}</div>
                {!have && (s.cost>0
                  ? <span style={{display:'inline-flex',alignItems:'center',gap:4,background:can?'var(--sun)':'rgba(255,255,255,.2)',color:can?'#5b3d00':'#fff',fontFamily:'var(--fdisp)',fontWeight:900,fontSize:12,padding:'3px 10px',borderRadius:999}}><Ic.star style={{width:12,height:12}}/>{s.cost}</span>
                  : <span style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:11,color:'#fff'}}>Free</span>)}
                {have && <span style={{position:'absolute',top:8,right:8,width:22,height:22,borderRadius:'50%',background:RARE_C[s.rare],display:'grid',placeItems:'center'}}><Ic.check style={{width:13,height:13,color:'#fff'}}/></span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---- TIME'S UP — daily play limit reached (a soft blocker) ---- */
function TimesUp({ nav }){
  const P=window.AWP; const lim=P?P.limit():{minutes:0};
  React.useEffect(()=>{ if(window.AW) AW.speak("Great playing today! Time for a break. Ask a grown-up if you need more time."); },[]);
  return (
    <div className="screen" style={{background:'radial-gradient(120% 120% at 50% 8%, #4B2A86, var(--brand-deep) 70%, #2C1247)',display:'grid',placeItems:'center'}}>
      <div className="shellpattern"/>
      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',gap:30,padding:'0 56px 0 60px'}}>
        {/* character + clock lock */}
        <div style={{flex:'0 0 230px',textAlign:'center',position:'relative'}}>
          <img src={CHARS.adey} alt="" className="float" style={{height:236,filter:'drop-shadow(0 12px 14px rgba(0,0,0,.35))'}}/>
          <span style={{position:'absolute',right:14,top:6,width:58,height:58,borderRadius:'50%',background:'var(--sun)',display:'grid',placeItems:'center',boxShadow:'0 4px 0 var(--sun-d)'}}><Ic.clock style={{width:30,height:30,color:'#fff'}}/></span>
        </div>
        {/* message + blocker actions */}
        <div style={{flex:1,maxWidth:440}}>
          <span style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(255,255,255,.16)',color:'#fff',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:12,padding:'5px 13px',borderRadius:999}}><Ic.clock style={{width:13,height:13}}/> Played {lim.minutes} min today</span>
          <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:36,color:'#fff',lineHeight:1.02,marginTop:12}} className="title-shadow">Time for a break!</h1>
          <p style={{fontFamily:'var(--fdisp)',fontWeight:700,fontSize:16,color:'rgba(255,255,255,.9)',marginTop:8}}>You finished your play time for today. Want to keep playing?</p>
          {/* primary blocker CTA */}
          <button className="candy" onClick={()=>nav.go('parentgate',{then:'grant'})} style={{'--c':'var(--sun)','--cd':'var(--sun-d)',color:'#5b3d00',fontSize:18,padding:'15px 28px',marginTop:18,width:'100%','--depth':'6px'}}>
            <Ic.parent style={{width:20,height:20}}/> Ask a grown-up for more time</button>
          <div style={{display:'flex',gap:12,marginTop:12}}>
            <button className="tap no-select" onClick={()=>nav.go('trophies')} style={{flex:1,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:7,background:'rgba(255,255,255,.14)',color:'#fff',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:14,padding:'11px 0',borderRadius:999}}><Ic.trophy style={{width:16,height:16}}/> My trophies</button>
            <button className="tap no-select" onClick={()=>nav.go('stickers')} style={{flex:1,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:7,background:'rgba(255,255,255,.14)',color:'#fff',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:14,padding:'11px 0',borderRadius:999}}><Ic.sticker style={{width:16,height:16}}/> Stickers</button>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:6,marginTop:14,fontFamily:'var(--fdisp)',fontWeight:700,fontSize:12.5,color:'rgba(255,255,255,.6)'}}><Ic.lock style={{width:14,height:14}}/> Games are locked until tomorrow</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window,{useProgress,STICKERS,Ring,HomeStatusBar,DifficultyPicker,StickerBook,TimesUp});
