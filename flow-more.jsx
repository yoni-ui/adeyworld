/* global React, Ic, CHARS, CC, byCat, ACTS, ActCard, BackBtn */
const MM = {weave:'assets/scenes/scene-weave.png',cook:'assets/scenes/scene-cook.png',music:'assets/scenes/scene-music.png',safari:'assets/scenes/scene-safari.png'};

/* ═══════════ TROPHIES / ACHIEVEMENTS ═══════════ */
function Trophies({ nav, onToast }){
  const badges=[
    {e:'star',  c:'#F2A23B', t:'First Star',     d:'Finish any activity',     got:true},
    {e:'flame', c:'#E23B5B', t:'3-Day Streak',   d:'Play 3 days in a row',    got:true},
    {e:'pencil',c:'#2C8BE0', t:'Fidel Friend',   d:'Trace 5 letters',          got:true},
    {e:'paw',   c:'#E2683B', t:'Animal Expert',  d:'Win the animal quiz',      got:true},
    {e:'palette',c:'#FF5CA8',t:'Little Artist',  d:'Color a picture',          got:true},
    {e:'bowl',  c:'#34B764', t:'Master Chef',    d:"Cook in Adey's Kitchen",   got:false},
    {e:'book',  c:'#8E3BE2', t:'Story Lover',    d:'Watch 5 stories',          got:false},
    {e:'trophy',c:'#F2A23B', t:'World Champion',  d:'Finish every world',       got:false},
  ];
  const earned=badges.filter(b=>b.got).length;
  return (
    <div className="screen" style={{background:'radial-gradient(120% 120% at 50% -10%, var(--sun), var(--watch) 55%, var(--brand) 100%)'}}>
      <div className="shellpattern"/>
      <BackBtn onClick={()=>nav.go('home')}/>
      <div style={{display:'flex',alignItems:'center',gap:12,padding:'18px 28px 6px',paddingLeft:74}}>
        <span style={{color:'#fff'}}><Ic.trophy style={{width:30,height:30}}/></span>
        <div>
          <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:26,color:'#fff',lineHeight:1}} className="title-shadow">My Trophies</h1>
          <span style={{display:'inline-flex',alignItems:'center',gap:4,fontWeight:800,fontSize:13.5,color:'rgba(255,255,255,.92)'}}>{earned} of {badges.length} earned · 128 <Ic.star style={{width:14,height:14}}/> total</span>
        </div>
        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:170,height:12,borderRadius:9,background:'rgba(0,0,0,.18)',overflow:'hidden'}}>
            <div style={{width:`${earned/badges.length*100}%`,height:'100%',background:'#fff',borderRadius:9}}/></div>
        </div>
      </div>
      <div style={{position:'absolute',top:84,left:0,right:0,bottom:14,overflowY:'auto',padding:'6px 28px 10px 74px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
          {badges.map(b=>(
            <button key={b.t} className="tap no-select" onClick={()=>onToast(b.got?`Earned: ${b.t}`:`Locked — ${b.d}`)}
              style={{background:b.got?'#fff':'rgba(255,255,255,.16)',borderRadius:'20px',padding:'16px 10px',textAlign:'center',
                boxShadow:b.got?'0 6px 0 rgba(0,0,0,.14)':'none',border:b.got?'none':'2px dashed rgba(255,255,255,.5)'}}>
              <div style={{height:52,display:'grid',placeItems:'center'}}>{b.got?React.createElement(Ic[b.e],{style:{width:46,height:46,color:b.c}}):<Ic.lock style={{width:38,height:38,color:'rgba(255,255,255,.6)'}}/>}</div>
              <div style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:15,color:b.got?'var(--ink)':'#fff',marginTop:6}}>{b.t}</div>
              <div style={{fontWeight:700,fontSize:11.5,color:b.got?'#9A7FA8':'rgba(255,255,255,.85)',marginTop:2,lineHeight:1.2}}>{b.d}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════ SEE ALL (listing) ═══════════ */
function SeeAll({ nav, params, onToast }){
  const cat = CC[params&&params.world] || CC.play;
  const title = (params&&params.title) || `All ${cat.label}`;
  const list = catActs(cat.key);
  return (
    <div className="screen" style={{background:`radial-gradient(120% 120% at 50% -10%, ${cat.c}, var(--brand) 62%, var(--brand-deep))`}}>
      <div className="shellpattern"/>
      <BackBtn onClick={()=>nav.go(params&&params.from||'home')}/>
      <div style={{display:'flex',alignItems:'center',gap:10,padding:'20px 28px 8px',paddingLeft:74}}>
        <span style={{width:38,height:38,borderRadius:12,background:'#fff',color:cat.c,display:'grid',placeItems:'center',boxShadow:'0 3px 0 rgba(0,0,0,.15)'}}>{React.createElement(Ic[cat.icon],{style:{width:22,height:22}})}</span>
        <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:25,color:'#fff'}} className="title-shadow">{title}</h1>
        <span style={{marginLeft:'auto',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'rgba(255,255,255,.85)'}}>{list.length} activities</span>
      </div>
      <div style={{position:'absolute',top:74,left:0,right:0,bottom:0,overflowY:'auto',overflowX:'hidden',padding:'6px 28px 22px 74px'}}>
        <div style={{display:'flex',flexWrap:'wrap',gap:16}}>
          {list.map((a)=><ActCard key={a.id} a={a} w={196} onTap={()=>launchAct(nav,a)}/>)}
        </div>
      </div>
    </div>
  );
}

/* ═══════════ PROFILE EDIT ═══════════ */
function ProfileEdit({ nav, onToast }){
  const [name,setName]=React.useState('Sami');
  const [age,setAge]=React.useState(5);
  const [avatar,setAvatar]=React.useState('explorer');
  const avatars=[['explorer',CHARS.explorer,'var(--play)'],['chef',CHARS.chef,'var(--watch)'],['musician',CHARS.musician,'var(--learn)'],['inventor',CHARS.inventor,'var(--create)']];
  return (
    <div className="screen" style={{background:'radial-gradient(120% 120% at 50% 0%,#2A1840,#1a1020)'}}>
      <BackBtn onClick={()=>nav.go('parent')}/>
      <div style={{position:'absolute',top:18,left:0,right:0,textAlign:'center',zIndex:10}}>
        <h1 style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:24,color:'#fff'}}>Edit Profile</h1></div>
      <div style={{position:'absolute',inset:0,top:48,display:'flex',alignItems:'center',gap:30,padding:'0 50px 0 74px'}}>
        <div style={{flex:'0 0 230px',textAlign:'center'}}>
          <div style={{width:150,height:150,borderRadius:'50%',background:avatars.find(a=>a[0]===avatar)[2],margin:'0 auto',position:'relative',overflow:'hidden',border:'5px solid #fff',boxShadow:'0 8px 0 rgba(0,0,0,.25)'}}>
            <img src={avatars.find(a=>a[0]===avatar)[1]} alt="" style={{position:'absolute',left:'50%',top:10,transform:'translateX(-50%)',height:175}}/>
          </div>
          <div style={{fontFamily:'var(--fdisp)',fontWeight:900,fontSize:22,color:'#fff',marginTop:12}}>{name||'—'}</div>
          <div style={{fontWeight:700,fontSize:13,color:'rgba(255,255,255,.6)'}}>Age {age}</div>
        </div>
        <div style={{flex:1,maxWidth:440,background:'rgba(255,255,255,.06)',borderRadius:'22px',padding:'20px 24px',border:'1px solid rgba(255,255,255,.1)'}}>
          <label style={{display:'block',marginBottom:14}}>
            <span style={{display:'block',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'rgba(255,255,255,.8)',marginBottom:5}}>Name</span>
            <input value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',padding:'11px 15px',borderRadius:'14px',border:'2px solid rgba(255,255,255,.15)',background:'rgba(255,255,255,.08)',color:'#fff',fontFamily:'var(--fbody)',fontWeight:700,fontSize:15,outline:'none'}}/>
          </label>
          <span style={{display:'block',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'rgba(255,255,255,.8)',marginBottom:6}}>Age</span>
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:16}}>
            {[2,3,4,5,6,7,8,9,10].map(a=><button key={a} className="tap" onClick={()=>setAge(a)} style={{width:34,height:34,borderRadius:'11px',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:15,
              background:age===a?'var(--brand)':'rgba(255,255,255,.1)',color:'#fff',boxShadow:age===a?'0 3px 0 var(--brand-deep)':'none'}}>{a}</button>)}
          </div>
          <span style={{display:'block',fontFamily:'var(--fdisp)',fontWeight:800,fontSize:13,color:'rgba(255,255,255,.8)',marginBottom:6}}>Buddy</span>
          <div style={{display:'flex',gap:10}}>
            {avatars.map(([k,img,c])=><button key={k} className="tap" onClick={()=>setAvatar(k)} style={{width:52,height:52,borderRadius:'50%',background:c,overflow:'hidden',position:'relative',
              border:avatar===k?'3px solid var(--sun)':'3px solid rgba(255,255,255,.2)'}}><img src={img} alt="" style={{position:'absolute',left:'50%',top:4,transform:'translateX(-50%)',height:64}}/></button>)}
          </div>
          <button className="candy" onClick={()=>nav.go('parent',{toast:'Profile saved!'})} style={{fontSize:16,padding:'12px 26px',marginTop:20}}>Save changes</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window,{Trophies,SeeAll,ProfileEdit});
