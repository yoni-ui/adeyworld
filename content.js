/* ════════════════════════════════════════════════════════════
   Adey World — CANONICAL CONTENT (single source of truth)
   Loaded by BOTH the app (root) and the CMS (studio/).
   Edits made in Adey Studio persist to localStorage; the app
   reads the same store on load, so both always match.
   ════════════════════════════════════════════════════════════ */
(function(){
  const KEY = 'aw_content_v1';

  /* path base: app is at root (''), studio is one level deep ('../') */
  const BASE = (location.pathname.indexOf('/studio/')>-1 || /studio/i.test(location.pathname.split('/').slice(-2,-1)[0]||'')) ? '../' : '';
  const A = (p)=> p ? (/^https?:|^data:|^\.\.\//.test(p) ? p : BASE+p) : p;

  /* ---- Characters ---- */
  const CHARACTERS = [
    {key:'adey',  name:'Adey',  role:'The brave explorer',  color:'#34C06B', am:'አዴይ',  sprite:'assets/characters/char-explorer.png', intro:'adey-hello.mp3'},
    {key:'selam', name:'Selam', role:'The little chef',      color:'#FF9B47', am:'ሰላም', sprite:'assets/characters/char-chef.png',     intro:'selam-hello.mp3'},
    {key:'liya',  name:'Liya',  role:'The krar musician',    color:'#3E97F0', am:'ሊያ',   sprite:'assets/characters/char-musician.png', intro:'liya-hello.mp3'},
    {key:'teddy', name:'Teddy', role:'The clever inventor',  color:'#FF5CA8', am:'ቴዲ',  sprite:'assets/characters/char-inventor.png', intro:'teddy-hello.mp3'},
  ];

  /* ---- Worlds (categories) ---- */
  const WORLDS = [
    {key:'play',  label:'Play',           am:'ጨዋታ',  icon:'play',   color:'#34B764', order:1, hero:'assets/scenes/scene-safari.png', desc:'Games & puzzles in the savanna'},
    {key:'learn', label:'Learn',          am:'ተማር',  icon:'layers', color:'#2C8BE0', order:2, hero:'assets/scenes/scene-weave.png',  desc:'Letters, numbers & first words'},
    {key:'watch', label:'Watch & Listen', am:'ተመልከት', icon:'film',   color:'#FF8A3D', order:3, hero:'assets/scenes/scene-music.png',  desc:'Stories & sing-along songs'},
    {key:'create',label:'Create',         am:'ፍጠር',   icon:'palette',color:'#FF5CA8', order:4, hero:'assets/scenes/scene-cook.png',   desc:'Color, weave & cook'},
  ];

  const SC = {weave:'assets/scenes/scene-weave.png',cook:'assets/scenes/scene-cook.png',music:'assets/scenes/scene-music.png',safari:'assets/scenes/scene-safari.png'};

  /* ---- The 28 launch ACTIVITIES (canonical; both sides read these) ---- */
  const ACTIVITIES = [
    /* LEARN */
    {id:'fidel',   cat:'learn', engine:'tracing',  char:'adey',  img:SC.weave,  title:'Trace the Fidel',     sub:'Amharic letters · ሀ ለ ሐ', free:true,  prog:0.6, age:'4–7', lang:'both', status:'live', plays:2840, by:'Marta'},
    {id:'abc',     cat:'learn', engine:'tracing',  char:'teddy', img:SC.weave,  title:'Trace ABC',           sub:'English letters',         free:false, age:'3–6', lang:'en',   status:'live', plays:1210, by:'Marta'},
    {id:'nums',    cat:'learn', engine:'tracing',  char:'selam', img:SC.cook,   title:'Trace Numbers',       sub:'Write 1 to 9',            free:false, age:'4–7', lang:'both', status:'live', plays:980,  by:'Sami'},
    {id:'count',   cat:'learn', engine:'quiz',     char:'selam', img:SC.cook,   title:'Count with Teff',     sub:'Numbers 1–10',            free:true,  age:'5–8', lang:'both', status:'live', plays:1340, by:'Marta'},
    {id:'shapesq', cat:'learn', engine:'quiz',     char:'teddy', img:SC.weave,  title:'Name the Shapes',     sub:'Circle, square, triangle',free:false, age:'3–6', lang:'en',   status:'live', plays:870,  by:'Sami'},
    {id:'colorsq', cat:'learn', engine:'quiz',     char:'liya',  img:SC.music,  title:'Learn Colors',        sub:'Colors all around',       free:false, age:'3–6', lang:'both', status:'live', plays:760,  by:'Liya A.'},
    {id:'animalq', cat:'learn', engine:'quiz',     char:'adey',  img:SC.safari, title:'Animal Quiz',         sub:'Who lives in the savanna?',free:true, age:'4–8', lang:'both', status:'live', plays:1610, by:'Marta'},
    /* PLAY */
    {id:'matchan', cat:'play',  engine:'matching', char:'adey',  img:SC.safari, title:'Match the Animals',   sub:'Find the pairs',          free:true,  prog:0.3, age:'2–5', lang:'both', status:'live', plays:1920, by:'Marta'},
    {id:'pattern', cat:'play',  engine:'matching', char:'teddy', img:SC.weave,  title:'Shapes & Patterns',   sub:'Match the mosaic',        free:false, age:'3–6', lang:'en',   status:'live', plays:1480, by:'Sami'},
    {id:'memory',  cat:'play',  engine:'matching', char:'liya',  img:SC.weave,  title:'Habesha Memory',      sub:'Remember the patterns',   free:false, age:'4–7', lang:'both', status:'live', plays:1120, by:'Liya A.'},
    {id:'kitchen', cat:'play',  engine:'dragdrop', char:'selam', img:SC.cook,   title:"Adey's Kitchen",      sub:'Make injera',             free:false, age:'5–9', lang:'en',   status:'live', plays:760,  by:'Sami'},
    {id:'market',  cat:'play',  engine:'dragdrop', char:'selam', img:SC.cook,   title:'Market Sort',         sub:'Sort the basket',         free:false, age:'4–8', lang:'both', status:'live', plays:540,  by:'Marta'},
    {id:'gojo',    cat:'play',  engine:'dragdrop', char:'teddy', img:SC.safari, title:'Build a Gojo',        sub:'Build the little hut',    free:false, age:'5–9', lang:'en',   status:'live', plays:430,  by:'Sami'},
    {id:'sounds',  cat:'play',  engine:'quiz',     char:'adey',  img:SC.safari, title:'Animal Sounds',       sub:'Who said that?',          free:false, age:'3–6', lang:'both', status:'live', plays:690,  by:'Marta'},
    {id:'savmatch',cat:'play',  engine:'matching', char:'adey',  img:SC.safari, title:'Savanna Match',       sub:'Match the wildlife',      free:true,  age:'4–8', lang:'both', status:'live', plays:1260, by:'Sami'},
    /* WATCH & LISTEN */
    {id:'lion',    cat:'watch', engine:'story',    char:'adey',  img:SC.safari, title:'Adey & the Lion',     sub:'A savanna adventure',     free:true,  age:'4–9', lang:'both', status:'live', plays:3120, by:'Sami'},
    {id:'tortoise',cat:'watch', engine:'story',    char:'teddy', img:SC.weave,  title:'The Clever Tortoise', sub:'An Ethiopian folktale',   free:false, age:'4–9', lang:'both', status:'live', plays:1450, by:'Marta'},
    {id:'lalibela',cat:'watch', engine:'story',    char:'liya',  img:SC.music,  title:'Bedtime in Lalibela', sub:'A gentle goodnight',      free:false, age:'3–8', lang:'both', status:'live', plays:1180, by:'Sami'},
    {id:'krar',    cat:'watch', engine:'song',     char:'liya',  img:SC.music,  title:'Krar Songs',          sub:'Sing along',              free:true,  age:'2–7', lang:'both', status:'live', plays:2480, by:'Liya A.'},
    {id:'countsong',cat:'watch',engine:'song',     char:'selam', img:SC.cook,   title:'Count to Ten Song',   sub:'A counting tune',         free:false, age:'3–6', lang:'both', status:'live', plays:1540, by:'Marta'},
    {id:'greeting',cat:'watch', engine:'song',     char:'liya',  img:SC.music,  title:'Hello Selam Song',    sub:'Greetings song',          free:false, age:'2–6', lang:'both', status:'live', plays:1320, by:'Liya A.'},
    {id:'marketday',cat:'watch',engine:'story',    char:'selam', img:SC.cook,   title:'Market Day',          sub:'A day at the market',     free:false, age:'4–8', lang:'en',   status:'live', plays:1760, by:'Sami'},
    /* CREATE */
    {id:'colorlion',cat:'create',engine:'coloring',char:'adey',  img:SC.safari, title:'Color the Lion',      sub:'Free coloring',           free:true,  age:'3–7', lang:'en',   status:'live', plays:1640, by:'Liya A.'},
    {id:'colordress',cat:'create',engine:'coloring',char:'liya', img:SC.weave,  title:'Color the Dress',     sub:'Habesha kemis',           free:false, age:'3–7', lang:'en',   status:'live', plays:980,  by:'Liya A.'},
    {id:'weave',   cat:'create', engine:'coloring',char:'liya',  img:SC.weave,  title:'Weaving Studio',      sub:'Make a pattern',          free:false, age:'5–10',lang:'en',   status:'live', plays:720,  by:'Liya A.'},
    {id:'jebena',  cat:'create', engine:'coloring',char:'selam', img:SC.cook,   title:'Decorate the Jebena', sub:'The coffee pot',          free:false, age:'4–8', lang:'both', status:'live', plays:610,  by:'Sami'},
    {id:'drum',    cat:'create', engine:'coloring',char:'liya',  img:SC.music,  title:'Design a Drum',       sub:'The kebero',              free:false, age:'4–8', lang:'both', status:'live', plays:540,  by:'Marta'},
    {id:'crown',   cat:'create', engine:'coloring',char:'adey',  img:SC.weave,  title:'Flower Crown',        sub:'Make it sparkle',         free:false, age:'3–7', lang:'en',   status:'live', plays:480,  by:'Liya A.'},
  ];

  const DEFAULT = { version:1, activities:ACTIVITIES, worlds:WORLDS, characters:CHARACTERS };

  /* deep-clone helper */
  const clone = (o)=>JSON.parse(JSON.stringify(o));

  /* read persisted store (CMS edits) merged over defaults */
  function read(){
    try{
      const raw = localStorage.getItem(KEY);
      if(raw){ const s=JSON.parse(raw); if(s&&s.activities) return s; }
    }catch(e){}
    return clone(DEFAULT);
  }
  function write(content){
    try{ localStorage.setItem(KEY, JSON.stringify(content)); }catch(e){}
    try{ window.dispatchEvent(new CustomEvent('aw-content-changed',{detail:content})); }catch(e){}
  }

  /* public API */
  const AWContent = {
    BASE,
    asset: A,                                   // resolve a root-relative path for this page
    raw(){ return read(); },                    // unresolved store
    reset(){ localStorage.removeItem(KEY); },
    save(content){ write(content); },

    /* resolved getters — asset paths fixed for the current page */
    activities(){ return read().activities.map(a=>({ ...a, img:A(a.img) })); },
    worlds(){ return read().worlds.map(w=>({ ...w, hero:A(w.hero) })); },
    characters(){ return read().characters.map(c=>({ ...c, sprite:A(c.sprite) })); },
    charMap(){ const m={}; read().characters.forEach(c=>m[c.key]=A(c.sprite)); return m; },

    /* mutations used by the CMS — persist + notify */
    upsertActivity(act){
      const s=read(); const i=s.activities.findIndex(a=>a.id===act.id);
      if(i>=0) s.activities[i]={...s.activities[i],...act}; else s.activities.push(act);
      write(s); return s;
    },
    setStatus(id,status){ const s=read(); const a=s.activities.find(x=>x.id===id); if(a){a.status=status; write(s);} return s; },
    removeActivity(id){ const s=read(); s.activities=s.activities.filter(a=>a.id!==id); write(s); return s; },
    saveWorlds(worlds){ const s=read(); s.worlds=worlds.map(w=>({...w,hero:String(w.hero).replace(/^\.\.\//,'')})); write(s); return s; },
    onChange(fn){ window.addEventListener('aw-content-changed',e=>fn(e.detail)); window.addEventListener('storage',e=>{ if(e.key===KEY) fn(read()); }); },
  };

  window.AWContent = AWContent;
})();
