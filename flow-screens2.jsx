/* global React, Ic, CC, CHARS, byCat, ACTS, ActCard, BackBtn */
const S2 = {weave:'assets/scenes/scene-weave.png',cook:'assets/scenes/scene-cook.png',music:'assets/scenes/scene-music.png',safari:'assets/scenes/scene-safari.png'};

/* shared section header on dark world bg */
function SecHead({children, right, onRight}){
  return <div style={{display:'flex',alignItems:'center',padding:'2px 28px 10px'}}>
    <h2 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:19,color:'#fff'}} className="title-shadow">{children}</h2>
    {right && <button className="tap" onClick={onRight} style={{marginLeft:'auto',background:'none',border:'none',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'rgba(255,255,255,.85)',cursor:'pointer'}}>{right}</button>}
  </div>;
}
const rail2={display:'flex',gap:16,overflowX:'auto',padding:'0 28px 18px'};

/* thumb card (game or video) */
function Thumb({title, img, badge, badgeC, w=200, onTap, locked}){
  return (
    <button className="tap no-select" onClick={onTap} style={{flex:`0 0 ${w}px`,position:'relative',height:128,borderRadius:'22px',overflow:'hidden',
      textAlign:'left',border:'4px solid #fff',boxShadow:'0 6px 0 rgba(0,0,0,.16),0 10px 16px rgba(0,0,0,.2)'}}>
      <img src={img} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(0,0,0,.6),transparent 60%)'}}/>
      {badge && <span style={{position:'absolute',top:8,left:8,background:badgeC,color:'#fff',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:11,padding:'3px 10px',borderRadius:999,boxShadow:'0 2px 0 rgba(0,0,0,.2)'}}>{badge}</span>}
      {locked && <span style={{position:'absolute',top:8,right:8,width:28,height:28,borderRadius:'50%',background:'var(--sun)',display:'grid',placeItems:'center',boxShadow:'0 2px 0 var(--sun-d)'}}><Ic.lock style={{width:15,height:15,color:'#fff'}}/></span>}
      {badge==='VIDEO'||badgeC==='var(--watch)' ? <span style={{position:'absolute',top:'40%',left:'50%',transform:'translate(-50%,-50%)',width:40,height:40,borderRadius:'50%',background:'rgba(255,255,255,.92)',display:'grid',placeItems:'center',boxShadow:'0 3px 8px rgba(0,0,0,.3)'}}><Ic.play style={{width:20,height:20,color:'var(--watch-d)'}}/></span>:null}
      <span style={{position:'absolute',left:12,bottom:9,maxWidth:'85%',fontFamily:'var(--fdisp)',fontWeight:900,fontSize:16,color:'#fff',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}} className="title-shadow">{title}</span>
    </button>
  );
}

/* ═══════════ WORLD (sectioned: Games · Videos · Create) ═══════════ */
function WorldScreen({ nav, params, onToast }){
  const cat=CC[params.world]||CC.play;
  const all=catActs(cat.key);
  const heroChar={play:CHARS.explorer,create:CHARS.musician,watch:CHARS.musician,learn:CHARS.inventor}[cat.key]||CHARS.explorer;
  // Play world = games-only grid; other worlds keep grouped rails
  const isPlay = cat.key==='play';
  const acts = isPlay ? all.filter(a=>['matching','quiz','dragdrop'].includes(a.engine)) : all;
  const groups = cat.key==='watch'
    ? [['Stories','book', all.filter(a=>a.engine==='story')],['Songs','note', all.filter(a=>a.engine==='song')]]
    : cat.key==='learn'
    ? [['Tracing','pencil', all.filter(a=>a.engine==='tracing')],['Quizzes','brain', all.filter(a=>a.engine==='quiz')]]
    : cat.key==='create'
    ? [['Make & color','palette', all]]
    : [['Games','games', acts]];
  return (
    <div className="screen" style={{background:`radial-gradient(120% 120% at 50% -10%, ${cat.c}, var(--brand) 62%, var(--brand-deep))`}}>
      <div className="shellpattern"/>
      <BackBtn onClick={()=>nav.go('home')}/>
      {/* header */}
      <div style={{display:'flex',alignItems:'center',gap:12,padding:'20px 28px 12px',paddingLeft:74}}>
        <span style={{width:40,height:40,borderRadius:13,background:'#fff',color:cat.c,display:'grid',placeItems:'center',boxShadow:'0 3px 0 rgba(0,0,0,.15)'}}>{React.createElement(Ic[cat.icon],{style:{width:24,height:24}})}</span>
        <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:28,color:'#fff'}} className="title-shadow">{cat.label}</h1>
        <span style={{fontFamily:'var(--fdisp)',fontWeight:700,fontSize:17,color:'rgba(255,255,255,.75)'}}>{cat.am}</span>
        <span style={{marginLeft:'auto',background:'rgba(255,255,255,.18)',color:'#fff',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,padding:'6px 14px',borderRadius:999}}>{(isPlay?acts:all).length} {isPlay?'games':'activities'}</span>
        <img src={heroChar} alt="" style={{height:92,filter:'drop-shadow(0 6px 8px rgba(0,0,0,.3))'}}/>
      </div>
      <div style={{position:'absolute',top:120,left:0,right:0,bottom:0,overflowY:'auto',overflowX:'hidden',paddingBottom:20}}>
        {isPlay ? (
          /* games-only grid */
          <div style={{display:'flex',flexWrap:'wrap',gap:16,padding:'2px 28px 8px 28px'}}>
            {acts.map(a=><Thumb key={a.id} title={a.title} img={a.img} badge={ENGINE[a.engine].label} badgeC={cat.c} w={200} locked={!isUnlocked(a)} onTap={()=>launchAct(nav,a)}/>)}
          </div>
        ) : (
          groups.map(([label,icon,list])=> list.length>0 && (
            <React.Fragment key={label}>
              <SecHead><span style={{display:'inline-flex',alignItems:'center',gap:9}}>{React.createElement(Ic[icon],{style:{width:22,height:22}})}{label}</span></SecHead>
              <div style={rail2}>{list.map(a=><Thumb key={a.id} title={a.title} img={a.img} badge={ENGINE[a.engine].label} badgeC={cat.c} locked={!isUnlocked(a)} onTap={()=>launchAct(nav,a)}/>)}</div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}

/* ═══════════ VIDEO PLAYER (reusable Theater view) ═══════════ */
function VideoPlayer({ nav, params, onToast }){
  const title=params&&params.title||'Adey & the Lion';
  const img=params&&params.img||S2.safari;
  const [playing,setPlaying]=React.useState(true);
  const [t,setT]=React.useState(0.32);
  const up=[{t:'Market Day',img:S2.cook},{t:'Krar Songs',img:S2.music},{t:'The Weaver',img:S2.weave}];
  return (
    <div className="screen" style={{background:'#1a1020'}}>
      <BackBtn onClick={()=>nav.go('home')}/>
      <div style={{position:'absolute',inset:0,display:'flex'}}>
        {/* stage */}
        <div style={{flex:1,position:'relative',display:'flex',flexDirection:'column'}}>
          <div style={{flex:1,position:'relative',overflow:'hidden'}}>
            <img src={img} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',filter:playing?'none':'brightness(.7)'}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(0,0,0,.55),transparent 45%)'}}/>
            {/* center play/pause */}
            <button className="tap" onClick={()=>setPlaying(p=>!p)} style={{position:'absolute',top:'46%',left:'50%',transform:'translate(-50%,-50%)',width:74,height:74,borderRadius:'50%',background:'rgba(255,255,255,.92)',display:'grid',placeItems:'center',boxShadow:'0 6px 16px rgba(0,0,0,.4)'}}>
              {playing?<svg viewBox="0 0 24 24" fill="var(--watch-d)" style={{width:30,height:30}}><rect x="6" y="5" width="4" height="14" rx="1.5"/><rect x="14" y="5" width="4" height="14" rx="1.5"/></svg>:<Ic.play style={{width:32,height:32,color:'var(--watch-d)'}}/>}
            </button>
            {/* title + controls */}
            <div style={{position:'absolute',left:0,right:0,bottom:0,padding:'0 20px 14px'}}>
              <div style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:24,color:'#fff'}} className="title-shadow">{title}</div>
              <div style={{display:'flex',alignItems:'center',gap:10,marginTop:8}}>
                <span style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:12,color:'#fff'}}>2:04</span>
                <div onClick={e=>{const r=e.currentTarget.getBoundingClientRect();setT((e.clientX-r.left)/r.width);}} style={{flex:1,height:8,borderRadius:9,background:'rgba(255,255,255,.3)',cursor:'pointer',position:'relative'}}>
                  <div style={{width:`${t*100}%`,height:'100%',background:'var(--watch)',borderRadius:9}}/>
                  <span style={{position:'absolute',left:`${t*100}%`,top:'50%',transform:'translate(-50%,-50%)',width:16,height:16,borderRadius:'50%',background:'#fff',boxShadow:'0 2px 4px rgba(0,0,0,.4)'}}/>
                </div>
                <span style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:12,color:'#fff'}}>6:20</span>
                <button className="tap" onClick={()=>onToast('Sound on')} style={{color:'#fff'}}><Ic.sound style={{width:22,height:22}}/></button>
              </div>
            </div>
          </div>
        </div>
        {/* up next rail */}
        <div style={{flex:'0 0 226px',background:'rgba(0,0,0,.28)',padding:'18px 16px',overflowY:'auto'}}>
          <div style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:15,color:'#fff',marginBottom:12}}>Up next</div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {up.map(u=>(
              <button key={u.t} className="tap no-select" onClick={()=>nav.go('video',{title:u.t,img:u.img})} style={{textAlign:'left',display:'flex',gap:10,alignItems:'center'}}>
                <div style={{position:'relative',width:86,height:54,borderRadius:12,overflow:'hidden',flex:'0 0 auto',border:'2px solid rgba(255,255,255,.3)'}}>
                  <img src={u.img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  <span style={{position:'absolute',inset:0,display:'grid',placeItems:'center'}}><Ic.play style={{width:18,height:18,color:'#fff'}}/></span>
                </div>
                <span style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'#fff',lineHeight:1.1}}>{u.t}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ TOPIC (filtered across all content) ═══════════ */
function TopicScreen({ nav, params, onToast }){
  const topic=params&&params.topic||'Animals';
  const TMAP={
    Animals:{e:'paw',ids:['matchan','animalq','lion','savmatch','sounds','colorlion']},
    Counting:{e:'hash',ids:['count','nums','countsong']},
    Colors:{e:'palette',ids:['colorsq','colorlion','colordress']},
    Shapes:{e:'shapes',ids:['shapesq','pattern','memory']},
    Letters:{e:'pencil',ids:['fidel','abc']},
    Food:{e:'bowl',ids:['kitchen','market','marketday','count']},
    Family:{e:'family',ids:['greeting','lalibela','marketday']},
    Music:{e:'note',ids:['krar','drum','greeting','colordress']},
  };
  const conf=TMAP[topic]||TMAP.Animals;
  const acts=conf.ids.map(id=>CAT_OF[id]).filter(Boolean);
  const filters=['All','Play','Learn','Watch','Create'];
  const [f,setF]=React.useState('All');
  const fkey={Play:'play',Learn:'learn',Watch:'watch',Create:'create'};
  const shown=acts.filter(a=>f==='All'||a.cat===fkey[f]);
  return (
    <div className="screen">
      <div className="shellpattern"/>
      <BackBtn onClick={()=>nav.go('home')}/>
      <div style={{display:'flex',alignItems:'center',gap:12,padding:'20px 28px 8px',paddingLeft:74}}>
        <span style={{width:44,height:44,borderRadius:14,background:'var(--sun)',color:'#5b3d00',display:'grid',placeItems:'center',boxShadow:'0 3px 0 var(--sun-d)'}}>{React.createElement(Ic[conf.e],{style:{width:26,height:26}})}</span>
        <div>
          <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:26,color:'#fff',lineHeight:1}} className="title-shadow">{topic}</h1>
          <span style={{fontWeight:700,fontSize:13,color:'rgba(255,255,255,.8)'}}>Everything about {topic.toLowerCase()}, across all worlds</span>
        </div>
      </div>
      {/* filter chips */}
      <div style={{display:'flex',gap:8,padding:'4px 28px 12px',flexWrap:'wrap'}}>
        {filters.map(x=>(
          <button key={x} className="tap" onClick={()=>setF(x)} style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,padding:'7px 16px',borderRadius:999,
            background:f===x?'#fff':'rgba(255,255,255,.16)',color:f===x?'var(--brand)':'#fff'}}>{x}</button>
        ))}
      </div>
      <div style={{position:'absolute',top:150,left:0,right:0,bottom:0,overflowY:'auto',overflowX:'hidden',padding:'4px 28px 22px'}}>
        <div style={{display:'flex',flexWrap:'wrap',gap:16}}>
          {shown.map((a)=>(
            <Thumb key={a.id} title={a.title} img={a.img} badge={CC[a.cat].label} badgeC={CC[a.cat].c} w={196} locked={!isUnlocked(a)} onTap={()=>launchAct(nav,a)}/>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════ CREATE DETAIL (coloring tool open) ═══════════ */
function CreateDetail({ nav, params, onToast }){
  const tool=params&&params.tool||'Color the Habesha';
  const palette=['#E23B3B','#F2A23B','#FFD23B','#34C06B','#3B8FE2','#8E3BE2','#FF6BA8','#6B4226'];
  const [color,setColor]=React.useState(palette[0]);
  const regions=['dress','sash','sleeve','hem','bg'];
  const [fills,setFills]=React.useState({bg:'#FFF3DA'});
  const palShades={dress:'#fff',sash:'#fff',sleeve:'#fff',hem:'#fff'};
  const paint=(r)=>{ setFills(f=>({...f,[r]:color})); onToast('Nice color!'); };
  return (
    <div className="screen" style={{background:'radial-gradient(120% 120% at 50% -10%, var(--create), var(--brand) 65%, var(--brand-deep))'}}>
      <div className="shellpattern"/>
      <BackBtn onClick={()=>nav.go('home')}/>
      <div style={{display:'flex',alignItems:'center',gap:10,padding:'20px 28px 10px',paddingLeft:74}}>
        <span style={{color:'#fff'}}><Ic.palette style={{width:26,height:26}}/></span>
        <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:24,color:'#fff'}} className="title-shadow">{tool}</h1>
        <button className="tap no-select" onClick={()=>nav.go('reward',{stars:3,title:tool})} style={{marginLeft:'auto',display:'inline-flex',alignItems:'center',gap:6,background:'#fff',color:'var(--create-d)',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:14,padding:'9px 18px',borderRadius:999,boxShadow:'0 4px 0 rgba(0,0,0,.18)'}}><Ic.check style={{width:16,height:16}}/> Done</button>
      </div>
      <div style={{position:'absolute',top:78,left:0,right:0,bottom:0,display:'flex',alignItems:'center',gap:24,padding:'0 40px 0 74px'}}>
        {/* canvas: a simple habesha dress made of tappable regions */}
        <div style={{flex:1,display:'grid',placeItems:'center'}}>
          <svg viewBox="0 0 200 240" style={{height:300,filter:'drop-shadow(0 10px 14px rgba(0,0,0,.3))'}}>
            <rect x="0" y="0" width="200" height="240" rx="20" fill={fills.bg} onClick={()=>paint('bg')} style={{cursor:'pointer'}}/>
            {/* dress body */}
            <path d="M70 60 L130 60 L150 220 L50 220 Z" fill={fills.dress||'#fff'} stroke="#C9AABB" strokeWidth="2" onClick={()=>paint('dress')} style={{cursor:'pointer'}}/>
            {/* sash */}
            <rect x="50" y="150" width="100" height="20" fill={fills.sash||'#eee'} onClick={()=>paint('sash')} style={{cursor:'pointer'}}/>
            {/* sleeves */}
            <path d="M70 60 L50 110 L62 116 L80 75 Z" fill={fills.sleeve||'#fff'} onClick={()=>paint('sleeve')} style={{cursor:'pointer'}}/>
            <path d="M130 60 L150 110 L138 116 L120 75 Z" fill={fills.sleeve||'#fff'} onClick={()=>paint('sleeve')} style={{cursor:'pointer'}}/>
            {/* hem */}
            <rect x="50" y="210" width="100" height="12" fill={fills.hem||'#eee'} onClick={()=>paint('hem')} style={{cursor:'pointer'}}/>
            {/* head */}
            <circle cx="100" cy="44" r="20" fill="#7A4A2B"/>
          </svg>
        </div>
        {/* palette */}
        <div style={{flex:'0 0 auto',background:'rgba(255,255,255,.16)',borderRadius:24,padding:16,display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {palette.map(c=>(
            <button key={c} className="tap" onClick={()=>setColor(c)} style={{width:46,height:46,borderRadius:'50%',background:c,
              border:color===c?'4px solid #fff':'4px solid rgba(255,255,255,.4)',boxShadow:color===c?'0 0 0 3px rgba(255,255,255,.5)':'0 3px 0 rgba(0,0,0,.2)'}}/>
          ))}
        </div>
      </div>
      <div style={{position:'absolute',left:74,bottom:14,fontFamily:'var(--fdisp)',fontWeight:700,fontSize:13,color:'rgba(255,255,255,.85)'}}>Pick a color, then tap the dress to paint</div>
    </div>
  );
}

/* override category route → sectioned world; expose new screens */
window.CategoryScreen = WorldScreen;
Object.assign(window,{WorldScreen,VideoPlayer,TopicScreen,CreateDetail});
