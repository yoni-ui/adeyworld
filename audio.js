/* Adey World — audio engine (no files: Web Audio SFX + speech narration) */
(function(){
  let ctx=null, master=null;
  let on = (localStorage.getItem('aw_sound')??'1')==='1';
  let musicOn = (localStorage.getItem('aw_music')??'1')==='1';
  let musicNodes=null;

  function ac(){
    if(!ctx){
      ctx = new (window.AudioContext||window.webkitAudioContext)();
      master = ctx.createGain(); master.gain.value=0.5; master.connect(ctx.destination);
    }
    if(ctx.state==='suspended') ctx.resume();
    return ctx;
  }

  // one note
  function note(freq, t0, dur, type='sine', vol=0.3, glideTo=null){
    const c=ac();
    const o=c.createOscillator(), g=c.createGain();
    o.type=type; o.frequency.setValueAtTime(freq, t0);
    if(glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t0+dur);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0+0.012);
    g.gain.exponentialRampToValueAtTime(0.0008, t0+dur);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0+dur+0.02);
  }

  const SFX = {
    tap(){ const c=ac(),t=c.currentTime; note(520,t,0.09,'triangle',0.18,720); },
    nav(){ const c=ac(),t=c.currentTime; note(440,t,0.10,'triangle',0.16,660); },
    pop(){ const c=ac(),t=c.currentTime; note(360,t,0.12,'sine',0.22,880); },
    correct(){ const c=ac(),t=c.currentTime; [523,659,784].forEach((f,i)=>note(f,t+i*0.08,0.18,'triangle',0.22)); },
    wrong(){ const c=ac(),t=c.currentTime; note(300,t,0.18,'sawtooth',0.14,170); },
    star(){ const c=ac(),t=c.currentTime; [784,1047,1319].forEach((f,i)=>note(f,t+i*0.06,0.16,'sine',0.2)); },
    celebrate(){ const c=ac(),t=c.currentTime; [523,659,784,1047,1319].forEach((f,i)=>note(f,t+i*0.10,0.3,'triangle',0.22)); },
    swoosh(){ const c=ac(),t=c.currentTime; note(900,t,0.22,'sine',0.10,200); },
  };

  function play(name){ if(!on) return; try{ (SFX[name]||SFX.tap)(); }catch(e){} }

  // ---- narration via SpeechSynthesis ----
  let voice=null;
  function pickVoice(){
    const vs=speechSynthesis.getVoices();
    voice = vs.find(v=>/en-GB/.test(v.lang)&&/female|zira|libby|sonia/i.test(v.name))
         || vs.find(v=>/en/i.test(v.lang)) || vs[0] || null;
  }
  if('speechSynthesis' in window){ pickVoice(); speechSynthesis.onvoiceschanged=pickVoice; }
  function speak(text){
    if(!on || !('speechSynthesis' in window) || !text) return;
    try{
      speechSynthesis.cancel();
      const u=new SpeechSynthesisUtterance(text);
      if(voice) u.voice=voice;
      u.rate=0.92; u.pitch=1.18; u.volume=0.9;
      speechSynthesis.speak(u);
    }catch(e){}
  }
  function stopSpeak(){ try{ speechSynthesis.cancel(); }catch(e){} }

  // ---- ambient music (soft looping arpeggio pad) ----
  function startMusic(){
    if(!musicOn||!on||musicNodes) return;
    const c=ac();
    const g=c.createGain(); g.gain.value=0.06; g.connect(master);
    const seq=[392,440,523,587]; let i=0;
    const tick=()=>{
      if(!musicNodes) return;
      const t=c.currentTime;
      const o=c.createOscillator(), og=c.createGain();
      o.type='sine'; o.frequency.value=seq[i%seq.length];
      og.gain.setValueAtTime(0,t); og.gain.linearRampToValueAtTime(0.5,t+0.3);
      og.gain.exponentialRampToValueAtTime(0.001,t+1.4);
      o.connect(og); og.connect(g); o.start(t); o.stop(t+1.5);
      i++;
    };
    const id=setInterval(tick,1400); tick();
    musicNodes={g,id};
  }
  function stopMusic(){ if(musicNodes){ clearInterval(musicNodes.id); try{musicNodes.g.disconnect();}catch(e){} musicNodes=null; } }

  window.AW = {
    play, speak, stopSpeak,
    isOn:()=>on, isMusicOn:()=>musicOn,
    setOn(v){ on=!!v; localStorage.setItem('aw_sound',v?'1':'0'); if(!v){stopSpeak();stopMusic();} else startMusic(); },
    setMusic(v){ musicOn=!!v; localStorage.setItem('aw_music',v?'1':'0'); if(v)startMusic(); else stopMusic(); },
    startMusic, stopMusic,
    unlock(){ ac(); }, // call on first user gesture
  };
})();
