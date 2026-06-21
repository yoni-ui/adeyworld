/* global React, NavRail, CATS, CC, byCat, CHARS, Ic */
function DirC({ onToast }){
  const [active,setActive]=React.useState('home');
  const [sound,setSound]=React.useState(true);
  const [hover,setHover]=React.useState(null);
  const counts=Object.fromEntries(CATS.map(c=>[c.key,byCat(c.key).length]));
  const nodes={
    play:  {x:17, y:28, img:'assets/scenes/scene-safari.png', name:'Savanna'},
    learn: {x:83, y:24, img:'assets/scenes/scene-weave.png',  name:'School Hut'},
    watch: {x:84, y:74, img:'assets/scenes/scene-music.png',  name:'Story Fire'},
    create:{x:19, y:76, img:'assets/scenes/scene-cook.png',   name:'Maker Hut'},
  };
  return (
    <div className="screen" style={{background:'linear-gradient(180deg,#FFD27A 0%,#FFB35C 26%,#9BC76A 60%,#7BB259 100%)'}}>
      {/* sun */}
      <div style={{position:'absolute',top:-60,left:'56%',transform:'translateX(-50%)',width:240,height:240,borderRadius:'50%',background:'radial-gradient(circle,#FFF3C4,rgba(255,243,196,0))'}}/>
      <div style={{position:'absolute',top:30,left:'56%',transform:'translateX(-50%)',width:84,height:84,borderRadius:'50%',background:'radial-gradient(circle,#FFE27A,#FFC93C)',boxShadow:'0 0 50px #FFD75E'}}/>
      {/* hills */}
      <svg viewBox="0 0 932 430" style={{position:'absolute',inset:0,width:'100%',height:'100%'}} preserveAspectRatio="none">
        <path d="M0,250 Q240,205 470,245 T932,238 L932,430 L0,430Z" fill="#8FBE5C" opacity=".55"/>
        <path d="M0,300 Q280,262 560,300 T932,300 L932,430 L0,430Z" fill="#6FA84A" opacity=".7"/>
      </svg>

      <NavRail active={active} soundOn={sound} onSound={()=>setSound(s=>!s)}
        onParent={()=>onToast('Parent gate')}
        onPick={(k)=>{setActive(k); if(k!=='home') onToast(`${CC[k]?CC[k].label:'Home'} world`);}}/>

      {/* banner */}
      <div style={{position:'absolute',top:18,left:'52%',transform:'translateX(-50%)',zIndex:10}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:7,background:'rgba(255,255,255,.94)',padding:'7px 16px',borderRadius:'var(--r-pill)',
          fontFamily:'var(--fdisp)',fontWeight:800,fontSize:14,color:'var(--watch-d)',boxShadow:'0 4px 0 rgba(0,0,0,.12)',whiteSpace:'nowrap'}}>
          <Ic.home style={{width:16,height:16}}/> Adey's Compound</div>
      </div>

      {/* map area */}
      <div style={{position:'absolute',left:100,right:16,top:14,bottom:14,zIndex:8}}>
        {/* dotted paths */}
        <svg viewBox="0 0 816 402" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}} preserveAspectRatio="none">
          <path d="M150,150 C320,250 430,150 660,120 M660,300 C470,250 330,250 165,300"
            fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 18"/>
        </svg>

        {CATS.map(c=>{
          const n=nodes[c.key]; const on=hover===c.key;
          return (
            <button key={c.key} className="no-select" onMouseEnter={()=>setHover(c.key)} onMouseLeave={()=>setHover(null)}
              onClick={()=>onToast(`${c.label} — ${n.name} · ${counts[c.key]} games`)}
              style={{position:'absolute',left:`${n.x}%`,top:`${n.y}%`,transform:`translate(-50%,-50%) ${on?'scale(1.06)':'scale(1)'}`,
                transition:'transform .16s cubic-bezier(.34,1.56,.64,1)',textAlign:'center',cursor:'pointer'}}>
              <div style={{width:104,height:104,borderRadius:'26px',overflow:'hidden',border:'5px solid #fff',
                boxShadow:`0 9px 0 ${c.d},0 14px 20px rgba(0,0,0,.25)`,position:'relative'}}>
                <img src={n.img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                <div style={{position:'absolute',inset:0,background:c.c,opacity:.3,mixBlendMode:'multiply'}}/>
                <span style={{position:'absolute',top:6,left:6,width:30,height:30,borderRadius:9,background:'#fff',color:c.c,
                  display:'grid',placeItems:'center',boxShadow:'0 2px 0 rgba(0,0,0,.15)'}}>
                  {React.createElement(Ic[c.icon],{style:{width:18,height:18}})}</span>
                <span style={{position:'absolute',bottom:6,right:6,background:'var(--sun)',color:'#fff',fontFamily:'var(--fdisp)',
                  fontWeight:800,fontSize:11,padding:'1px 8px',borderRadius:'var(--r-pill)',boxShadow:'0 2px 0 var(--sun-d)'}}>{counts[c.key]}</span>
              </div>
              <div style={{marginTop:7,display:'inline-block',background:c.c,color:'#fff',fontFamily:'var(--fdisp)',fontWeight:800,
                fontSize:14,padding:'4px 13px',borderRadius:'var(--r-pill)',boxShadow:`0 3px 0 ${c.d}`}}>{c.label}</div>
            </button>
          );
        })}

        {/* Adey centre */}
        <div style={{position:'absolute',left:'50%',top:'54%',transform:'translate(-50%,-50%)',textAlign:'center',pointerEvents:'none'}}>
          <div style={{background:'#fff',borderRadius:'18px',padding:'7px 14px',boxShadow:'0 5px 0 rgba(0,0,0,.14)',marginBottom:6,position:'relative',display:'inline-block'}}>
            <span style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:16,color:'var(--brand)'}}>Pick a place to play!</span>
            <div style={{position:'absolute',left:'50%',bottom:-10,transform:'translateX(-50%)',width:0,height:0,borderLeft:'11px solid transparent',borderRight:'11px solid transparent',borderTop:'11px solid #fff'}}/>
          </div>
          <img src={CHARS.explorer} alt="Adey" style={{height:172,filter:'drop-shadow(0 12px 14px rgba(0,0,0,.32))'}}/>
          <div style={{width:118,height:20,background:'rgba(0,0,0,.2)',borderRadius:'50%',filter:'blur(5px)',margin:'-12px auto 0'}}/>
        </div>
      </div>
    </div>
  );
}
window.DirC = DirC;
