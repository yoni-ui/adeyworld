/* global React, Ic, PlayScreen, TheaterScreen, LessonsScreen, CreateScreen */
function DirA({ onToast }) {
  const [screen, setScreen] = React.useState('play');
  const nav = [{ k: 'play', ic: 'play', l: 'Play', c: 'var(--play)' }, { k: 'theater', ic: 'tv', l: 'Theater', c: 'var(--watch)' },
  { k: 'lessons', ic: 'book', l: 'Lessons', c: 'var(--learn)' }, { k: 'create', ic: 'brush', l: 'Create', c: 'var(--create)' }];
  const Screens = { play: PlayScreen, theater: TheaterScreen, lessons: LessonsScreen, create: CreateScreen };
  const Active = Screens[screen];

  return (
    <div className="screen">
      <div className="shellpattern" />

      {/* top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 58, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 22px', zIndex: 30 }}>
        <button className="tap no-select" aria-label="Profile" onClick={() => onToast('Switch profile')}
        style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid #fff', background: 'linear-gradient(160deg,var(--sun),var(--create))',
          display: 'grid', placeItems: 'center', fontFamily: 'var(--fdisp)', fontWeight: 900, color: '#fff', fontSize: 19, boxShadow: '0 3px 0 rgba(0,0,0,.18)' }}>S</button>
        <div className="no-select" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ width: 30, height: 30, borderRadius: '30% 70% 70% 30%/30% 30% 70% 70%', background: 'linear-gradient(135deg,var(--sun),var(--watch))',
            display: 'grid', placeItems: 'center', boxShadow: '0 3px 0 var(--watch-d)', transform: 'rotate(-6deg)' }}>
            <Ic.star style={{ width: 18, height: 18, color: '#fff' }} /></span>
          <span style={{ fontFamily: 'var(--fdisp)', fontWeight: 900, fontSize: 25, color: '#fff', letterSpacing: .5, whiteSpace: 'nowrap' }} className="title-shadow">Adey World</span>
        </div>
        <button className="tap" aria-label="Search" onClick={() => onToast('Search activities')}
        style={{ width: 44, height: 44, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,.6)', display: 'grid', placeItems: 'center', color: '#fff' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" style={{ width: 21, height: 21 }}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.2-3.2" /></svg>
        </button>
      </div>

      {/* scrollable screen content */}
      <div key={screen} style={{ position: 'absolute', top: 58, left: 0, right: 0, bottom: 0, overflowY: 'auto', overflowX: 'hidden', padding: "6px 12px 94px 0px", margin: "1px 0px 0px 16px" }}>
        <Active onToast={onToast} />
      </div>

      {/* floating center nav */}
      <nav style={{ position: 'absolute', left: '50%', bottom: 14, transform: 'translateX(-50%)', zIndex: 40, display: 'flex', gap: 4,
        background: '#fff', borderRadius: '26px', padding: '8px 12px', boxShadow: '0 10px 26px rgba(0,0,0,.28)' }}>
        {nav.map((it) => {const on = screen === it.k;return (
            <button key={it.k} className="tap" onClick={() => setScreen(it.k)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '6px 16px', borderRadius: '18px',
              background: on ? it.c : 'transparent', color: on ? '#fff' : 'var(--ink)', minWidth: 60, fontFamily: 'var(--fdisp)', fontWeight: 800, fontSize: 12,
              boxShadow: on ? 'inset 0 -3px 0 rgba(0,0,0,.16)' : 'none' }}>
            {React.createElement(Ic[it.ic], { style: { width: 24, height: 24 } })}{it.l}</button>);})}
      </nav>

      {/* rewards cluster bottom-right */}
      <div style={{ position: 'absolute', right: 18, bottom: 14, zIndex: 40, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div className="statchip" style={{ color: 'var(--sun-d)', padding: '7px 12px' }}><Ic.star style={{ width: 16, height: 16, color: 'var(--sun)' }} />128</div>
        <button className="tap" aria-label="Rewards" onClick={() => onToast('Reward chest')}
        style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(160deg,var(--watch),var(--coral))', border: '4px solid #fff',
          display: 'grid', placeItems: 'center', boxShadow: '0 6px 0 rgba(0,0,0,.2)' }}><Ic.gift style={{ width: 27, height: 27, color: '#fff' }} /></button>
      </div>
    </div>);

}
window.DirA = DirA;