/* ════════════════════════════════════════════════════════════════
   AdeyWorld — PROGRESSION STORE  (window.AWP)
   The kid-economy single source of truth. Rules, by design:
     • Progress NEVER goes backward — best score per game is kept,
       stars only ever go UP, earned badges are never lost.
     • EASY is always free (the free sampler that sells Premium).
       Medium / Hard need the game unlocked (watch-to-unlock / Premium).
     • Daily goal + streak drive return visits.
     • Optional parent-set daily play LIMIT with a gentle stop.
   localStorage-backed; emits 'aw-progress' on every change.
   ════════════════════════════════════════════════════════════════ */
(function(){
  const KEY='aw_progress_v1';
  const today=()=> new Date().toISOString().slice(0,10);
  const yday =()=>{ const d=new Date(); d.setDate(d.getDate()-1); return d.toISOString().slice(0,10); };

  const DEFAULT={
    earned:120,          // lifetime stars earned (display + currency source)
    spent:0,             // stars spent in the sticker shop
    streak:{count:1,last:today()},
    daily:{day:today(), played:[], goal:3},
    best:{},             // { [activityId]: { easy:0-3, medium:0-3, hard:0-3 } }
    stickers:['adey-1','liya-1'],   // owned sticker ids (start with a couple)
    limit:{minutes:0, usedSec:0, day:today()},  // minutes 0 = no limit
  };

  function read(){
    let s; try{ s=JSON.parse(localStorage.getItem(KEY)); }catch(e){}
    if(!s||typeof s!=='object') s=JSON.parse(JSON.stringify(DEFAULT));
    // fill any missing keys (forward-compatible)
    for(const k in DEFAULT){ if(s[k]==null) s[k]=JSON.parse(JSON.stringify(DEFAULT[k])); }
    return rollDay(s);
  }
  function write(s){
    try{ localStorage.setItem(KEY,JSON.stringify(s)); }catch(e){}
    try{ window.dispatchEvent(new CustomEvent('aw-progress',{detail:s})); }catch(e){}
    return s;
  }
  /* reset per-day counters when the date changes */
  function rollDay(s){
    const t=today();
    if(s.daily.day!==t){ s.daily={day:t, played:[], goal:s.daily.goal||3}; }
    if(s.limit.day!==t){ s.limit={minutes:s.limit.minutes||0, usedSec:0, day:t}; }
    return s;
  }

  const AWP={
    /* ---- reads ---- */
    all(){ return read(); },
    available(){ const s=read(); return Math.max(0, s.earned - s.spent); },
    earned(){ return read().earned; },
    streak(){ return read().streak.count; },
    daily(){ const s=read(); return {count:s.daily.played.length, goal:s.daily.goal, done:s.daily.played.length>=s.daily.goal}; },
    best(id){ return read().best[id]||{easy:0,medium:0,hard:0}; },
    bestStars(id){ const b=this.best(id); return Math.max(b.easy||0,b.medium||0,b.hard||0); },
    stickers(){ return read().stickers.slice(); },
    hasSticker(id){ return read().stickers.indexOf(id)>-1; },

    /* difficulty: easy always playable; medium/hard need the game unlocked */
    diffPlayable(act, diff){
      if(diff==='easy') return true;
      try{ return typeof isUnlocked==='function' ? isUnlocked(act) : (act&&act.free!==false); }
      catch(e){ return act&&act.free!==false; }
    },

    /* ---- writes (all forward-only where it matters) ---- */
    /* record a finished game: bumps best (max), grows star currency, logs daily, streak */
    record(id, diff, stars){
      const s=read();
      diff=diff||'easy'; stars=Math.max(0,Math.min(3,stars||0));
      const mult={easy:1,medium:2,hard:3}[diff]||1;
      // best per difficulty — never decreases
      const b=s.best[id]||{easy:0,medium:0,hard:0};
      const prevBest=Math.max(b.easy||0,b.medium||0,b.hard||0);
      b[diff]=Math.max(b[diff]||0, stars);
      s.best[id]=b;
      // star currency: award full on first clear of this difficulty, else only improvement
      const award=stars*10*mult;
      s.earned += award;
      // daily goal — count distinct activities played today
      if(s.daily.played.indexOf(id)<0) s.daily.played.push(id);
      // streak — first play of the day advances it
      if(s.streak.last!==today()){
        s.streak.count = (s.streak.last===yday()) ? (s.streak.count+1) : 1;
        s.streak.last = today();
      }
      write(s);
      return {award, newBest: stars>prevBest, goal:{count:s.daily.played.length,goal:s.daily.goal,done:s.daily.played.length>=s.daily.goal}, streak:s.streak.count};
    },
    /* spend stars on a sticker; returns true if bought */
    buySticker(id, cost){
      const s=read();
      if(s.stickers.indexOf(id)>-1) return true;             // already owned
      if((s.earned - s.spent) < cost) return false;          // not enough
      s.spent += cost; s.stickers.push(id);
      write(s); return true;
    },
    setGoal(n){ const s=read(); s.daily.goal=Math.max(1,Math.min(10,n)); write(s); },

    /* ---- daily play limit (parent) ---- */
    limit(){ const s=read(); const used=Math.floor(s.limit.usedSec/60); const rem=s.limit.minutes? Math.max(0,s.limit.minutes-used):null;
      return {minutes:s.limit.minutes, usedMin:used, usedSec:s.limit.usedSec, remaining:rem, reached:s.limit.minutes>0 && s.limit.usedSec>=s.limit.minutes*60}; },
    setLimit(minutes){ const s=read(); s.limit.minutes=Math.max(0,minutes|0); write(s); },
    tick(sec){ const s=read(); if(s.limit.minutes>0){ s.limit.usedSec+=(sec||1); write(s); } return this.limit(); },
    resetLimit(){ const s=read(); s.limit.usedSec=0; write(s); },
    /* grown-up grants extra play time today (adds minutes back to today's allowance) */
    grantMore(min){ const s=read(); s.limit.usedSec=Math.max(0, s.limit.usedSec-(min||15)*60); write(s); return this.limit(); },

    /* dev / parent reset */
    reset(){ try{ localStorage.removeItem(KEY); }catch(e){} write(read()); },
    onChange(fn){ window.addEventListener('aw-progress',e=>fn(e.detail)); window.addEventListener('storage',e=>{ if(e.key===KEY) fn(read()); }); },
  };
  window.AWP=AWP;
})();
