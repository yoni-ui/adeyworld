/* global React, Ic, BackBtn */
const GS = {weave:'assets/scenes/scene-weave.png',cook:'assets/scenes/scene-cook.png',music:'assets/scenes/scene-music.png',safari:'assets/scenes/scene-safari.png'};

/* shared game header: back + title + progress pips */
function GameHead({title, kicker, color, onBack, steps, at, onSound}){
  return (
    <div style={{position:'absolute',top:0,left:0,right:0,padding:'14px 20px 0 70px',zIndex:20}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div>
          <div style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:12,color:'rgba(255,255,255,.75)',textTransform:'uppercase',letterSpacing:1.4}}>{kicker}</div>
          <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:24,color:'#fff',lineHeight:1}} className="title-shadow">{title}</h1>
        </div>
        {steps!=null && <div style={{display:'flex',gap:6,marginLeft:'auto',marginRight:8}}>
          {Array.from({length:steps}).map((_,i)=><span key={i} style={{width:i===at?22:10,height:10,borderRadius:9,background:i<at?'var(--sun)':i===at?'#fff':'rgba(255,255,255,.3)',transition:'all .2s'}}/>)}
        </div>}
        {onSound && <button className="tap" onClick={onSound} style={{width:42,height:42,borderRadius:'50%',background:'rgba(255,255,255,.18)',display:'grid',placeItems:'center',color:'#fff'}}><Ic.sound style={{width:20,height:20}}/></button>}
      </div>
    </div>
  );
}
const gameBg=(c)=>({background:`radial-gradient(120% 120% at 50% -10%, ${c}, var(--brand) 62%, var(--brand-deep))`});

/* ═══════════ MATCHING ═══════════ */
function MatchingGame({ nav, onToast }){
  const base=[{e:'paw',c:'#E2683B'},{e:'star',c:'#F2A23B'},{e:'note',c:'#3B8FE2'},{e:'flame',c:'#E23B5B'}];
  const [cards,setCards]=React.useState(()=>{
    const d=[...base,...base].map((c,i)=>({...c,k:c.e,id:i,flipped:false,matched:false}));
    for(let i=d.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[d[i],d[j]]=[d[j],d[i]];}
    return d;
  });
  const [pick,setPick]=React.useState([]);
  const [lock,setLock]=React.useState(false);
  const matched=cards.filter(c=>c.matched).length;

  const tap=(idx)=>{
    if(lock||cards[idx].flipped||cards[idx].matched) return;
    const nc=cards.map((c,i)=>i===idx?{...c,flipped:true}:c); setCards(nc);
    const np=[...pick,idx]; setPick(np);
    if(np.length===2){
      setLock(true);
      const [a,b]=np;
      if(nc[a].k===nc[b].k){
        if(window.AW)AW.play('pop');
        setTimeout(()=>{ setCards(cs=>cs.map((c,i)=>i===a||i===b?{...c,matched:true}:c)); setPick([]); setLock(false);
          if(matched+2>=cards.length) setTimeout(()=>nav.go('reward',{stars:3,title:'Match the Animals',replay:'match'}),600); },500);
      } else {
        setTimeout(()=>{ setCards(cs=>cs.map((c,i)=>i===a||i===b?{...c,flipped:false}:c)); setPick([]); setLock(false); },800);
      }
    }
  };
  return (
    <div className="screen" style={gameBg('var(--play)')}>
      <div className="shellpattern"/><BackBtn onClick={()=>nav.go('home')}/>
      <GameHead kicker="Matching · Play" title="Match the Animals" onBack={()=>nav.go('home')} onSound={()=>onToast('Find the pairs!')}/>
      <div style={{position:'absolute',top:74,left:0,right:0,bottom:14,display:'grid',placeItems:'center'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
          {cards.map((c,i)=>(
            <button key={c.id} className="tap" onClick={()=>tap(i)} style={{width:112,height:112,borderRadius:'20px',border:'4px solid #fff',
              background:c.matched?'rgba(255,255,255,.35)':c.flipped?'#fff':'rgba(255,255,255,.16)',display:'grid',placeItems:'center',
              boxShadow:'0 6px 0 rgba(0,0,0,.18)',transition:'background .2s',opacity:c.matched?.7:1}}>
              {c.flipped||c.matched?React.createElement(Ic[c.e],{style:{width:54,height:54,color:c.c}}):<Ic.puzzle style={{width:38,height:38,color:'rgba(255,255,255,.6)'}}/>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════ QUIZ ═══════════ */
function QuizGame({ nav, onToast }){
  const QS=[
    {q:'Which animal says “moo”?',ch:['Cow','Dog','Cat','Lion'],a:0},
    {q:'What color is teff injera?',ch:['Blue','Brown','Green','Red'],a:1},
    {q:'How many legs does a goat have?',ch:['2','4','6','8'],a:1},
  ];
  const [i,setI]=React.useState(0); const [sel,setSel]=React.useState(null);
  const q=QS[i];
  const choose=(c)=>{
    if(sel!=null) return; setSel(c);
    if(c===q.a){ if(window.AW)AW.play('correct'); onToast('Correct!'); setTimeout(()=>{ if(i<QS.length-1){setI(i+1);setSel(null);} else nav.go('reward',{stars:3,title:'the Animal Quiz',replay:'quiz'}); },900); }
    else { if(window.AW)AW.play('wrong'); onToast('Try again!'); setTimeout(()=>setSel(null),700); }
  };
  return (
    <div className="screen" style={gameBg('var(--learn)')}>
      <div className="shellpattern"/><BackBtn onClick={()=>nav.go('home')}/>
      <GameHead kicker="Quiz · Learn" title="Animal Quiz" steps={QS.length} at={i} onSound={()=>onToast(q.q)}/>
      <div style={{position:'absolute',top:84,left:0,right:0,bottom:14,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'0 40px'}}>
        <div className="card" style={{background:'#fff',borderRadius:'24px',padding:'18px 30px',boxShadow:'0 8px 0 rgba(0,0,0,.16)',marginBottom:22}}>
          <h2 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:26,color:'var(--ink)',textAlign:'center'}}>{q.q}</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,width:'100%',maxWidth:560}}>
          {q.ch.map((c,ci)=>{
            const right=sel!=null&&ci===q.a, wrong=sel===ci&&ci!==q.a;
            return <button key={ci} className="tap no-select" onClick={()=>choose(ci)} style={{padding:'16px',borderRadius:'18px',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:20,
              background:right?'var(--play)':wrong?'var(--coral)':'#fff',color:right||wrong?'#fff':'var(--ink)',border:'4px solid #fff',boxShadow:'0 5px 0 rgba(0,0,0,.18)'}}>{c}</button>;
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════ DRAG & DROP (tap object then pot) ═══════════ */
function DragDropGame({ nav, onToast }){
  const items=[{e:'grain',k:'Teff'},{e:'drop',k:'Water'},{e:'flame',k:'Heat'},{e:'bowl',k:'Injera'}];
  const [placed,setPlaced]=React.useState([]);
  const [sel,setSel]=React.useState(null);
  const left=items.filter(it=>!placed.includes(it.k));
  const drop=()=>{ if(sel==null) return; const it=left[sel]; if(!it) return;
    const np=[...placed,it.k]; setPlaced(np); setSel(null); onToast(`Added ${it.k}!`);
    if(np.length>=items.length) setTimeout(()=>nav.go('reward',{stars:3,title:"Adey's Kitchen"}),700); };
  return (
    <div className="screen" style={gameBg('var(--watch)')}>
      <div className="shellpattern"/><BackBtn onClick={()=>nav.go('home')}/>
      <GameHead kicker="Drag & Drop · Create" title="Adey's Kitchen" steps={items.length} at={placed.length} onSound={()=>onToast('Drag each thing into the pot!')}/>
      <div style={{position:'absolute',top:84,left:0,right:0,bottom:14,display:'flex',alignItems:'center',justifyContent:'center',gap:50,padding:'0 40px'}}>
        {/* tray */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
          {items.map((it)=>{ const done=placed.includes(it.k); const idx=left.indexOf(it);
            return <button key={it.k} disabled={done} className="tap" onClick={()=>setSel(idx)} style={{width:104,height:104,borderRadius:'20px',border:sel===idx&&!done?'4px solid var(--sun)':'4px solid #fff',
              background:done?'rgba(255,255,255,.12)':'#fff',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2,
              boxShadow:'0 5px 0 rgba(0,0,0,.16)',opacity:done?.4:1}}>
              <span style={{display:'grid',placeItems:'center',height:44}}>{done?<Ic.check style={{width:38,height:38,color:'var(--play)'}}/>:React.createElement(Ic[it.e],{style:{width:40,height:40,color:'var(--brand)'}})}</span>
              <span style={{fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'var(--ink)'}}>{it.k}</span></button>;
          })}
        </div>
        {/* pot / drop zone */}
        <button className="tap no-select" onClick={drop} style={{width:200,height:200,borderRadius:'30px',border:`5px dashed ${sel!=null?'var(--sun)':'rgba(255,255,255,.7)'}`,
          background:'rgba(255,255,255,.14)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'#fff'}}>
          <span style={{display:'grid',placeItems:'center'}}><Ic.bowl style={{width:74,height:74,color:'#fff'}}/></span>
          <span style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:16}}>{placed.length?`${placed.length}/${items.length} added`:'Tap an item, then the pot'}</span>
        </button>
      </div>
    </div>
  );
}

/* ═══════════ STORY ADVENTURE ═══════════ */
function StoryGame({ nav, onToast }){
  const scenes=[
    {bg:GS.safari, txt:'One sunny morning, Adey set off across the savanna to find her friend the lion.'},
    {bg:GS.weave,  txt:'She followed a winding path lined with golden grass and tall acacia trees.'},
    {bg:GS.cook,   txt:'Soon she reached a fork in the road. Which way should Adey go?', choice:true},
    {bg:GS.music,  txt:'Adey found the lion resting under a baobab tree. They watched the sunset together. The End!'},
  ];
  const [i,setI]=React.useState(0); const s=scenes[i];
  const adv=()=>{ if(s.choice) return; if(i<scenes.length-1) setI(i+1); else nav.go('reward',{stars:3,title:'Adey & the Lion'}); };
  const pick=(p)=>{ onToast(p==='mountain'?'Up the hill!':'Along the river!'); setI(i+1); };
  return (
    <div className="screen" style={{background:'#1a1020',cursor:s.choice?'default':'pointer'}} onClick={adv}>
      <BackBtn onClick={(e)=>{nav.go('home');}}/>
      <img src={s.bg} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(0,0,0,.78),transparent 50%)'}}/>
      {/* progress */}
      <div style={{position:'absolute',top:16,left:'50%',transform:'translateX(-50%)',display:'flex',gap:6,zIndex:10}}>
        {scenes.map((_,k)=><span key={k} style={{width:i===k?22:9,height:9,borderRadius:9,background:i<k?'rgba(255,255,255,.3)':'var(--sun)'}}/>)}
      </div>
      <div style={{position:'absolute',left:0,right:0,bottom:0,padding:'0 44px 28px'}}>
        <div style={{maxWidth:620,fontFamily:'var(--fdisp)',fontWeight:800,fontSize:23,color:'#fff',lineHeight:1.25,textShadow:'0 2px 6px rgba(0,0,0,.5)'}}>{s.txt}</div>
        {s.choice ? (
          <div style={{display:'flex',gap:14,marginTop:18}}>
            <button className="tap no-select" onClick={(e)=>{e.stopPropagation();pick('mountain');}} style={{background:'#fff',color:'var(--brand)',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:17,padding:'13px 24px',borderRadius:999,boxShadow:'0 5px 0 rgba(0,0,0,.2)'}}>🏔️ Mountain path</button>
            <button className="tap no-select" onClick={(e)=>{e.stopPropagation();pick('river');}} style={{background:'#fff',color:'var(--brand)',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:17,padding:'13px 24px',borderRadius:999,boxShadow:'0 5px 0 rgba(0,0,0,.2)'}}>🏞️ River path</button>
          </div>
        ) : <div style={{marginTop:12,display:'inline-flex',alignItems:'center',gap:6,fontFamily:'var(--fdisp)',fontWeight:700,fontSize:14,color:'rgba(255,255,255,.7)'}}>Tap to continue <Ic.arrow style={{width:16,height:16}}/></div>}
      </div>
    </div>
  );
}

/* ═══════════ COLORING ENGINE (tap region) ═══════════ */
function ColoringGame({ nav, onToast }){
  const palette=['#E23B3B','#F2A23B','#FFD23B','#34C06B','#3B8FE2','#8E3BE2','#FF6BA8','#6B4226'];
  const [color,setColor]=React.useState(palette[2]);
  const [fills,setFills]=React.useState({sky:'#BFE3FF'});
  const paint=(r)=>{ setFills(f=>({...f,[r]:color})); onToast('Beautiful!'); };
  const filled=Object.keys(fills).length;
  return (
    <div className="screen" style={gameBg('var(--create)')}>
      <div className="shellpattern"/><BackBtn onClick={()=>nav.go('home')}/>
      <GameHead kicker="Coloring · Create" title="Color the Lion" onSound={()=>onToast('Tap to color the lion!')}/>
      <button className="tap no-select" onClick={()=>nav.go('reward',{stars:3,title:'Color the Lion'})} style={{position:'absolute',top:18,right:18,zIndex:20,display:'inline-flex',alignItems:'center',gap:6,background:'#fff',color:'var(--create-d)',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:14,padding:'9px 18px',borderRadius:999,boxShadow:'0 4px 0 rgba(0,0,0,.18)'}}><Ic.check style={{width:16,height:16}}/> Done</button>
      <div style={{position:'absolute',top:84,left:0,right:0,bottom:14,display:'flex',alignItems:'center',gap:30,padding:'0 40px 0 70px'}}>
        <div style={{flex:1,display:'grid',placeItems:'center'}}>
          <svg viewBox="0 0 220 200" style={{height:280,filter:'drop-shadow(0 10px 14px rgba(0,0,0,.3))'}}>
            <rect x="0" y="0" width="220" height="200" rx="18" fill={fills.sky||'#fff'} onClick={()=>paint('sky')} style={{cursor:'pointer'}}/>
            {/* mane */}
            <circle cx="110" cy="100" r="78" fill={fills.mane||'#fff'} stroke="#9a7" strokeWidth="2" onClick={()=>paint('mane')} style={{cursor:'pointer'}}/>
            {/* face */}
            <circle cx="110" cy="100" r="52" fill={fills.face||'#fff'} stroke="#9a7" strokeWidth="2" onClick={()=>paint('face')} style={{cursor:'pointer'}}/>
            {/* ears */}
            <circle cx="74" cy="58" r="16" fill={fills.ear||'#fff'} stroke="#9a7" strokeWidth="2" onClick={()=>paint('ear')} style={{cursor:'pointer'}}/>
            <circle cx="146" cy="58" r="16" fill={fills.ear||'#fff'} stroke="#9a7" strokeWidth="2" onClick={()=>paint('ear')} style={{cursor:'pointer'}}/>
            {/* eyes + nose */}
            <circle cx="92" cy="92" r="7" fill="#3a2a1a"/><circle cx="128" cy="92" r="7" fill="#3a2a1a"/>
            <path d="M103 112 L117 112 L110 122 Z" fill="#3a2a1a"/>
          </svg>
        </div>
        <div style={{flex:'0 0 auto',background:'rgba(255,255,255,.16)',borderRadius:24,padding:14,display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          {palette.map(c=><button key={c} className="tap" onClick={()=>setColor(c)} style={{width:42,height:42,borderRadius:'50%',background:c,
            border:color===c?'4px solid #fff':'4px solid rgba(255,255,255,.4)',boxShadow:color===c?'0 0 0 3px rgba(255,255,255,.5)':'0 3px 0 rgba(0,0,0,.2)'}}/>)}
        </div>
      </div>
    </div>
  );
}

Object.assign(window,{MatchingGame,QuizGame,DragDropGame,StoryGame,ColoringGame});
