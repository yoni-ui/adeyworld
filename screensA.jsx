/* global React, CHARS, Ic, CC, CATALOG, catActs, freeActs, ENGINE, launchAct */
/* Home tab bodies — catalog-driven, every game routes through the launcher */
const SCN = { weave: 'assets/scenes/scene-weave.png', cook: 'assets/scenes/scene-cook.png', music: 'assets/scenes/scene-music.png', safari: 'assets/scenes/scene-safari.png' };

function SecTitle({ children, style }) {
  return <h2 style={{ fontFamily: 'var(--fdisp)', fontWeight: 900, fontSize: 19, color: '#fff', padding: '0 32px 12px', ...style }} className="title-shadow">{children}</h2>;
}
const railStyle = { display: 'flex', gap: 16, overflowX: 'auto', padding: '0 28px 20px', scrollSnapType: 'x mandatory' };

/* reusable activity thumb (used across tabs) */
function GameTile({ a, w = 196, h = 120, nav, onToast }) {
  const cat = CC[a.cat];const eng = ENGINE[a.engine];
  return (
    <button className="tap no-select" onClick={() => launchAct(nav, a)} style={{ flex: `0 0 ${w}px`, scrollSnapAlign: 'start', position: 'relative', height: h, borderRadius: '20px', overflow: 'hidden',
      textAlign: 'left', border: '4px solid #fff', boxShadow: `0 6px 0 ${cat.d},0 10px 16px rgba(0,0,0,.2)` }}>
      <img src={a.img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(0,0,0,.62),transparent 58%)' }} />
      <span style={{ position: 'absolute', top: 8, left: 8, display: 'inline-flex', alignItems: 'center', gap: 4, background: cat.c, color: '#fff', fontFamily: 'var(--fdisp)', fontWeight: 800, fontSize: 10.5, padding: '3px 9px', borderRadius: 999, boxShadow: '0 2px 0 rgba(0,0,0,.2)' }}>
        {React.createElement(Ic[cat.icon], { style: { width: 11, height: 11 } })}{eng.label}</span>
      {!isUnlocked(a) && <span style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: '50%', background: 'var(--sun)', display: 'grid', placeItems: 'center', boxShadow: '0 2px 0 var(--sun-d)' }}><Ic.lock style={{ width: 13, height: 13, color: '#fff' }} /></span>}
      <div style={{ position: 'absolute', left: 12, right: 12, bottom: 9 }}>
        <div style={{ fontFamily: 'var(--fdisp)', fontWeight: 900, fontSize: 16, color: '#fff', lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className="title-shadow">{a.title}</div>
        <div style={{ fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,.85)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.sub}</div>
      </div>
      {a.prog != null && <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 5, background: 'rgba(0,0,0,.25)' }}><div style={{ width: `${a.prog * 100}%`, height: '100%', background: 'var(--sun)' }} /></div>}
    </button>);

}

/* ─────────────── PLAY / HOME dashboard ─────────────── */
function PlayScreen({ nav, onToast }) {
  const picks = [CATALOG.find((a) => a.id === 'fidel'), CATALOG.find((a) => a.id === 'matchan'), CATALOG.find((a) => a.id === 'count'), CATALOG.find((a) => a.id === 'colorlion'), CATALOG.find((a) => a.id === 'animalq')];
  const worlds = [{ n: 'Adey', k: 'play', img: CHARS.explorer, c: 'var(--play)', cd: 'var(--play-d)' },
  { n: 'Selam', k: 'create', img: CHARS.chef, c: 'var(--watch)', cd: 'var(--watch-d)' },
  { n: 'Liya', k: 'watch', img: CHARS.musician, c: 'var(--learn)', cd: 'var(--learn-d)' },
  { n: 'Teddy', k: 'learn', img: CHARS.inventor, c: 'var(--create)', cd: 'var(--create-d)' }];
  const topics = [{ t: 'Animals', img: 'assets/topics/g15.svg' }, { t: 'Counting', img: 'assets/topics/g16.svg' }, { t: 'Colors', img: 'assets/topics/g17.svg' },
  { t: 'Shapes', img: 'assets/topics/g18.svg' }, { t: 'Letters', img: 'assets/topics/g19.svg' }, { t: 'Food', img: 'assets/topics/g20.svg' },
  { t: 'Family', img: 'assets/topics/g21.svg' }, { t: 'Music', img: 'assets/topics/g22.svg' }];
  const cont = CATALOG.find((a) => a.id === 'fidel');
  return (
    <React.Fragment>
      <HomeStatusBar nav={nav} />
      <SecTitle style={{ paddingTop: 6 }}>Your daily picks</SecTitle>
      <div style={{ ...railStyle, margin: "24px", padding: "0px 0px 20px" }}>{picks.map((a) => <GameTile key={a.id} a={a} nav={nav} onToast={onToast} />)}</div>

      <SecTitle>Worlds to explore</SecTitle>
      <div style={{ display: 'flex', overflowX: 'auto', padding: '0 28px 14px', alignItems: 'flex-start', gap: 28 }}>
        {worlds.map((w) =>
        <button key={w.n} className="tap no-select" onClick={() => nav.go('category', { world: w.k })} style={{ flex: '0 0 auto' }}>
            <div style={{ width: 88, height: 88, borderRadius: '50%', background: w.c, border: '4px solid #fff', position: 'relative', overflow: 'hidden', boxShadow: `0 6px 0 ${w.cd},0 10px 16px rgba(0,0,0,.22)` }}>
              <img src={w.img} alt={w.n} style={{ position: 'absolute', left: '50%', top: 7, transform: 'translateX(-50%)', height: 108, filter: 'drop-shadow(0 3px 3px rgba(0,0,0,.2))' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 34, background: 'linear-gradient(0deg,rgba(0,0,0,.5),transparent)' }} />
              <span style={{ position: 'absolute', left: 0, right: 0, bottom: 7, textAlign: 'center', fontFamily: 'var(--fdisp)', fontWeight: 900, fontSize: 14, color: '#fff' }} className="title-shadow">{w.n}</span>
            </div>
          </button>
        )}
        <button className="tap no-select" onClick={() => nav.go('surprise')} style={{ flex: '0 0 auto' }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--sun)', border: '4px dashed #fff', position: 'relative', display: 'grid', placeItems: 'center', boxShadow: '0 6px 0 var(--sun-d),0 10px 16px rgba(0,0,0,.22)' }}>
            <Ic.gift style={{ width: 36, height: 36, color: '#fff' }} />
            <span style={{ position: 'absolute', left: 0, right: 0, bottom: 7, textAlign: 'center', fontFamily: 'var(--fdisp)', fontWeight: 900, fontSize: 12, color: '#fff' }} className="title-shadow">Surprise</span>
          </div>
        </button>
      </div>

      <SecTitle>Topics</SecTitle>
      <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 28px 16px' }}>
        {topics.map((tp) =>
        <button key={tp.t} className="tap no-select" onClick={() => nav.go('topic', { topic: tp.t })} style={{ flex: '0 0 auto', textAlign: 'center', width: 86 }}>
            <img src={tp.img} alt={tp.t} style={{ width: 86, height: 86, display: 'block', filter: 'drop-shadow(0 5px 6px rgba(0,0,0,.2))' }} />
          </button>
        )}
      </div>
    </React.Fragment>);
}

/* ─────────────── THEATER (watch) ─────────────── */
function TheaterScreen({ nav, onToast }) {
  const watch = catActs('watch');
  const stories = watch.filter((a) => a.engine === 'story');
  const songs = watch.filter((a) => a.engine === 'song');
  const feat = stories[0];
  return (
    <React.Fragment>
      <div style={{ padding: '2px 28px 16px' }}>
        <button className="tap no-select" onClick={() => launchAct(nav, feat)} style={{ position: 'relative', width: '100%', height: 148, borderRadius: '24px', overflow: 'hidden', textAlign: 'left', border: '4px solid #fff', boxShadow: '0 8px 0 rgba(0,0,0,.16),0 14px 22px rgba(0,0,0,.2)' }}>
          <img src={feat.img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(0,0,0,.6),transparent 70%)' }} />
          <div style={{ position: 'relative', padding: '18px 20px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--watch)', color: '#fff', fontFamily: 'var(--fdisp)', fontWeight: 800, fontSize: 11.5, padding: '4px 11px', borderRadius: 999, boxShadow: '0 2px 0 var(--watch-d)' }}>FEATURED STORY</span>
            <h1 style={{ fontFamily: 'var(--fdisp)', fontWeight: 900, fontSize: 30, color: '#fff', marginTop: 10, maxWidth: 320, lineHeight: 1 }} className="title-shadow">{feat.title}</h1>
            <span className="candy" style={{ '--c': '#fff', '--cd': '#D9D2C4', color: 'var(--brand)', fontSize: 15, padding: '9px 18px', marginTop: 12, '--depth': '5px' }}><Ic.play style={{ width: 16, height: 16 }} /> Watch now</span>
          </div>
        </button>
      </div>
      <SecTitle>Story adventures</SecTitle>
      <div style={railStyle}>{stories.map((a) => <GameTile key={a.id} a={a} nav={nav} onToast={onToast} />)}</div>
      <SecTitle>Sing-along songs</SecTitle>
      <div style={railStyle}>{songs.map((a) => <GameTile key={a.id} a={a} nav={nav} onToast={onToast} />)}</div>
    </React.Fragment>);
}

/* ─────────────── LESSONS (learn) ─────────────── */
function LessonsScreen({ nav, onToast }) {
  const learn = catActs('learn');
  const cont = learn[0];
  return (
    <React.Fragment>
      <div style={{ padding: '2px 28px 16px' }}>
        <button className="tap no-select" onClick={() => launchAct(nav, cont)} style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', textAlign: 'left', background: '#fff', borderRadius: '22px', padding: '14px 18px', boxShadow: '0 7px 0 rgba(0,0,0,.12)' }}>
          <span style={{ width: 54, height: 54, borderRadius: 16, background: 'var(--learn)', display: 'grid', placeItems: 'center', boxShadow: '0 3px 0 var(--learn-d)', flex: '0 0 auto' }}><Ic.book style={{ width: 28, height: 28, color: '#fff' }} /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 12, color: '#9A7FA8', textTransform: 'uppercase', letterSpacing: 1 }}>Continue learning</div>
            <div style={{ fontFamily: 'var(--fdisp)', fontWeight: 900, fontSize: 22, color: 'var(--ink)', lineHeight: 1.05 }}>{cont.title} · {cont.sub}</div>
            <div style={{ height: 8, borderRadius: 9, background: '#EEE3F4', marginTop: 8, overflow: 'hidden' }}><div style={{ width: '60%', height: '100%', background: 'var(--sun)' }} /></div>
          </div>
          <span className="candy" style={{ '--c': 'var(--learn)', '--cd': 'var(--learn-d)', fontSize: 15, padding: '11px 20px', '--depth': '5px', flex: '0 0 auto' }}><Ic.play style={{ width: 16, height: 16 }} /> Go</span>
        </button>
      </div>
      <SecTitle>Your learning path</SecTitle>
      <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 28px 16px', alignItems: 'flex-start' }}>
        {learn.map((u, i) => {const cat = CC[u.cat];const locked = !isUnlocked(u);
          return (
            <button key={u.id} className="tap no-select" onClick={() => launchAct(nav, u)} style={{ flex: '0 0 168px', background: '#fff', borderRadius: '22px', padding: 16, textAlign: 'left', position: 'relative', boxShadow: '0 6px 0 rgba(0,0,0,.12)', opacity: locked ? .82 : 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ width: 46, height: 46, borderRadius: 14, background: 'var(--learn)', display: 'grid', placeItems: 'center', boxShadow: '0 3px 0 var(--learn-d)' }}>{React.createElement(Ic[ENGINE[u.engine].route === 'game' ? 'book' : 'star'], { style: { width: 24, height: 24, color: '#fff' } })}</span>
              <span style={{ fontFamily: 'var(--fdisp)', fontWeight: 900, fontSize: 13, color: '#fff', background: locked ? 'var(--sun)' : 'var(--play)', width: 26, height: 26, borderRadius: '50%', display: 'grid', placeItems: 'center', boxShadow: locked ? '0 2px 0 var(--sun-d)' : '0 2px 0 var(--play-d)' }}>{locked ? <Ic.lock style={{ width: 14, height: 14 }} /> : i + 1}</span>
            </div>
            <div style={{ fontFamily: 'var(--fdisp)', fontWeight: 900, fontSize: 17, color: 'var(--ink)', marginTop: 12, lineHeight: 1.05 }}>{u.title}</div>
            <div style={{ fontWeight: 700, fontSize: 12.5, color: '#9A7FA8' }}>{u.sub}</div>
            <div style={{ display: 'inline-block', marginTop: 8, fontFamily: 'var(--fdisp)', fontWeight: 800, fontSize: 11, color: 'var(--learn-d)', background: '#EAF2FC', padding: '3px 9px', borderRadius: 999 }}>{ENGINE[u.engine].label}</div>
          </button>);
        })}
      </div>
    </React.Fragment>);
}

/* ─────────────── CREATE ─────────────── */
function CreateScreen({ nav, onToast }) {
  const create = catActs('create');
  return (
    <React.Fragment>
      <SecTitle style={{ paddingTop: 6 }}>Make something amazing</SecTitle>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: '0 28px 16px' }}>
        {create.map((t) => {const cat = CC[t.cat];
          return (
            <button key={t.id} className="tap no-select" onClick={() => launchAct(nav, t)} style={{ flex: '0 0 200px', background: '#fff', borderRadius: '20px', padding: 8, textAlign: 'left', boxShadow: `0 6px 0 ${cat.d},0 10px 16px rgba(0,0,0,.16)` }}>
            <div style={{ position: 'relative', height: 100, borderRadius: '14px', overflow: 'hidden' }}>
              <img src={t.img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: cat.c, opacity: .4, mixBlendMode: 'multiply' }} />
              <span style={{ position: 'absolute', top: 8, left: 8, width: 36, height: 36, borderRadius: 11, background: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 2px 0 rgba(0,0,0,.15)' }}><Ic.brush style={{ width: 20, height: 20, color: cat.c }} /></span>
              {!isUnlocked(t) && <span style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: '50%', background: 'var(--sun)', display: 'grid', placeItems: 'center', boxShadow: '0 2px 0 var(--sun-d)' }}><Ic.lock style={{ width: 13, height: 13, color: '#fff' }} /></span>}
            </div>
            <div style={{ padding: '9px 8px 5px' }}>
              <div style={{ fontFamily: 'var(--fdisp)', fontWeight: 900, fontSize: 16, color: 'var(--ink)', lineHeight: 1 }}>{t.title}</div>
              <div style={{ fontWeight: 700, fontSize: 12, color: '#9A7FA8', marginTop: 2 }}>{t.sub}</div>
            </div>
          </button>);
        })}
      </div>
    </React.Fragment>);
}

Object.assign(window, { PlayScreen, TheaterScreen, LessonsScreen, CreateScreen, GameTile });