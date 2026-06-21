/* global React, TopStrip, NavRail, CATS, CC, byCat, CHARS, Ic */
function DirB({ onToast }){
  const [active,setActive]=React.useState('home');
  const [sound,setSound]=React.useState(true);
  const [hover,setHover]=React.useState(null);
  const portalImg={play:'assets/scenes/scene-safari.png',learn:'assets/scenes/scene-weave.png',
    watch:'assets/scenes/scene-music.png',create:'assets/scenes/scene-cook.png'};
  const counts=Object.fromEntries(CATS.map(c=>[c.key,byCat(c.key).length]));
  return (
    <div className="screen" style={{background:'radial-gradient(130% 130% at 12% -15%, var(--brand-bright) 0%, var(--brand) 48%, var(--brand-deep) 100%)'}}>
      <div className="shellpattern"/>
      <NavRail active={active} soundOn={sound} onSound={()=>setSound(s=>!s)}
        onParent={()=>onToast('Parent gate')}
        onPick={(k)=>{setActive(k); if(k!=='home') onToast(`${CC[k]?CC[k].label:'Home'} world`);}}/>

      <div style={{position:'absolute',left:100,right:16,top:14,bottom:14,display:'flex',gap:16}}>
        {/* Adey greeter */}
        <div style={{flex:'0 0 240px',position:'relative'}}>
          <div style={{background:'#fff',borderRadius:'22px',padding:'13px 16px',boxShadow:'0 6px 0 rgba(0,0,0,.12)',position:'relative'}}>
            <div style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:23,color:'var(--brand)',lineHeight:1}}>Selam, Sami!</div>
            <div style={{fontWeight:800,fontSize:13,color:'#7B5E89',marginTop:5}}>Tap a world to start our adventure! 🌍</div>
            <div style={{position:'absolute',left:46,bottom:-12,width:0,height:0,borderLeft:'13px solid transparent',borderRight:'13px solid transparent',borderTop:'13px solid #fff'}}/>
          </div>
          <img src={CHARS.explorer} alt="Adey" style={{position:'absolute',left:'50%',bottom:-14,transform:'translateX(-50%)',height:312,filter:'drop-shadow(0 14px 16px rgba(0,0,0,.3))'}}/>
          <div style={{position:'absolute',left:'50%',bottom:4,transform:'translateX(-50%)',width:170,height:22,background:'rgba(0,0,0,.22)',borderRadius:'50%',filter:'blur(5px)'}}/>
        </div>

        {/* 2×2 portals */}
        <div style={{flex:1,display:'grid',gridTemplateColumns:'1fr 1fr',gridTemplateRows:'1fr 1fr',gap:14}}>
          {CATS.map(c=>(
            <button key={c.key} className="no-select" onMouseEnter={()=>setHover(c.key)} onMouseLeave={()=>setHover(null)}
              onClick={()=>onToast(`${c.label} — ${counts[c.key]} activities`)}
              style={{position:'relative',borderRadius:'24px',overflow:'hidden',textAlign:'left',cursor:'pointer',
                border:'4px solid #fff',boxShadow:`0 9px 0 ${c.d}, 0 14px 22px rgba(0,0,0,.2)`,
                transform:hover===c.key?'translateY(-3px) scale(1.012)':'none',transition:'transform .14s cubic-bezier(.34,1.56,.64,1)'}}>
              <img src={portalImg[c.key]} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
              <div style={{position:'absolute',inset:0,background:c.c,opacity:.82,mixBlendMode:'multiply'}}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(0deg, rgba(0,0,0,.5), transparent 58%)'}}/>
              <div style={{position:'relative',height:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'12px 14px',minHeight:120}}>
                <span style={{position:'absolute',top:10,left:10,width:40,height:40,borderRadius:12,background:'#fff',
                  display:'grid',placeItems:'center',boxShadow:'0 3px 0 rgba(0,0,0,.15)',color:c.c}}>
                  {React.createElement(Ic[c.icon],{style:{width:22,height:22}})}</span>
                <span style={{position:'absolute',top:14,right:12,background:'rgba(255,255,255,.9)',color:c.d,
                  fontFamily:'var(--fdisp)',fontWeight:800,fontSize:11,padding:'3px 10px',borderRadius:'var(--r-pill)'}}>{counts[c.key]} games</span>
                <div style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:24,color:'#fff',lineHeight:1}} className="title-shadow">{c.label}</div>
                <div style={{fontFamily:'var(--fdisp)',fontWeight:700,fontSize:14,color:'rgba(255,255,255,.9)'}}>{c.am}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
window.DirB = DirB;
