import {useEffect,useState,useCallback,useRef} from 'react';
import {LangCtx,useL,UI} from './i18n.js';
import {Routes,Route,NavLink,useNavigate} from 'react-router-dom';
import {LESSONS,PAIRS,TOUR} from './data.js';
import * as api from './api.js';

const ls=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const DEF={font:100,contrast:'normal',bright:100,spacing:false,motion:true,hints:true};

function Splash({done}){const {t,lang,tip}=useL();useEffect(()=>{const t=setTimeout(done,2600);return()=>clearTimeout(t)},[done]);
 return <div className="splash" role="status" aria-label="Loading Punjabi Reconnect">
  <img src="/logo.png" alt="Punjabi Reconnect logo" className="splash-logo"/>
  <p className="splash-tag">{t('splashTag')}</p>
  <div className="bar"><span/></div></div>}

function Tour({onClose}){const {t,lang}=useL();const nav=useNavigate();const [i,setI]=useState(0);const [r,setR]=useState(null);const ref=useRef();
 const s=TOUR[i];const last=i===TOUR.length-1;
 const find=()=>s.target?document.querySelector(`[data-tour="${s.target}"]`):null;
 const measure=useCallback(()=>{const el=find();setR(el?el.getBoundingClientRect():null)},[i]);
 useEffect(()=>{nav('/')},[]);
 useEffect(()=>{find()?.scrollIntoView?.({block:'center',behavior:'smooth'});measure();const id=setTimeout(measure,450);
  window.addEventListener('resize',measure);window.addEventListener('scroll',measure,true);ref.current?.focus();
  return()=>{clearTimeout(id);window.removeEventListener('resize',measure);window.removeEventListener('scroll',measure,true)}},[i,measure]);
 const kd=e=>{if(e.key==='Escape')return onClose();if(e.key!=='Tab')return;
  const f=[...e.currentTarget.querySelectorAll('.pop button')];const x=f.indexOf(document.activeElement);
  if(e.shiftKey&&x<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&x===f.length-1){e.preventDefault();f[0].focus()}};
 const go=to=>{onClose();if(to)nav(to)};
 const low=r&&r.top+r.height/2>innerHeight/2;
 return <div className="tour-root" onKeyDown={kd}><div className="blocker"/>
  <div className="spot" style={r?{top:r.top-8,left:r.left-8,width:r.width+16,height:r.height+16}:{top:'50%',left:'50%',width:0,height:0}}/>
  <div className={'pop'+(r?'':' mid')} style={r?(low?{top:12}:{bottom:12}):undefined} role="dialog" aria-modal="true" aria-labelledby="tt">
   <button className="x" onClick={onClose} aria-label={t('stopTour')}>✕</button>
   <div className="tour-emoji" aria-hidden>{s.e}</div><h2 id="tt">{s.t[lang]}</h2><p aria-live="polite">{s.d[lang]}</p>
   <div className="dots" aria-hidden>{TOUR.map((_,j)=><i key={j} className={j===i?'on':''}/>)}</div>
   {last?<div className="stack"><button className="btn" ref={ref} onClick={()=>go('/login')}>{t('login')}</button><button className="btn ghost" onClick={()=>go('/register')}>{t('create')}</button><button className="link" onClick={()=>go()}>{t('tryGuest')}</button><button className="link" onClick={()=>setI(i-1)}>{t('back')}</button></div>
   :<><div className="row">{i>0&&<button className="btn ghost" onClick={()=>setI(i-1)}>{t('back')}</button>}<button className="btn" ref={ref} onClick={()=>setI(i+1)}>{t('next')}</button></div><button className="link" onClick={onClose}>{t('skipTour')}</button></>}
   <p className="step">{t('step',i+1,TOUR.length)}</p></div></div>}

function A11y({s,set,open,setOpen,replay}){const {t,lang,tip}=useL();
 return <>
 <button className="a11y-fab tip-end" data-tour="a11y" {...tip('tipA11y')} aria-expanded={open} aria-controls="a11y" onClick={()=>setOpen(!open)}>♿<span className="sr"> {t('a11yOpen')}</span></button>
 <aside id="a11y" className={'a11y'+(open?' open':'')} aria-label={t('a11yOpen')} hidden={!open}>
  <h2>{t('a11yTitle')}</h2>
  <label {...tip('tipText')}>{t('textSize')}: {s.font}%<input type="range" min="80" max="150" step="10" value={s.font} onChange={e=>set({...s,font:+e.target.value})}/></label>
  <label {...tip('tipBright')}>{t('bright')}: {s.bright}%<input type="range" min="60" max="130" step="10" value={s.bright} onChange={e=>set({...s,bright:+e.target.value})}/></label>
  <fieldset><legend>{t('contrast')}</legend>
   {[['normal',t('normal')],['high',t('high')],['dark',t('dark')]].map(([v,l])=><label key={v} className="chk" {...tip('tipContrast')}><input type="radio" name="c" checked={s.contrast===v} onChange={()=>set({...s,contrast:v})}/>{l}</label>)}</fieldset>
  <label className="chk" {...tip('tipSpacing')}><input type="checkbox" checked={s.spacing} onChange={e=>set({...s,spacing:e.target.checked})}/>{t('spacing')}</label>
  <label className="chk" {...tip('tipAnim')}><input type="checkbox" checked={s.motion} onChange={e=>set({...s,motion:e.target.checked})}/>{t('anim')}</label>
  <label className="chk" {...tip('tipHints')}><input type="checkbox" checked={s.hints!==false} onChange={e=>set({...s,hints:e.target.checked})}/>{t('hints')}</label><button className="btn ghost" {...tip('tipReset')} onClick={()=>set(DEF)}>{t('reset')}</button>
  <button className="btn ghost" onClick={replay}>{t('replay')}</button><button className="btn" {...tip('tipClose')} onClick={()=>setOpen(false)}>{t('close')}</button></aside></>}

function Home({p}){const {t,lang,tip}=useL();const nav=useNavigate();
 return <section><h1>{t('hello')}</h1><p className="lead">{t('pick')}</p>
 <div className="stats" data-tour="stats"><div className="pill" tabIndex="0" {...tip('tipStreak')}>🔥 {p.streak} {t('streak')}</div><div className="pill" tabIndex="0" {...tip('tipXp')}>⭐ {p.xp} XP</div><div className="pill" tabIndex="0" {...tip('tipLevel')}>🏅 {t('level')} {Math.floor(p.xp/50)+1}</div></div>
 <button className="node cta" {...tip('tipFarm')} onClick={()=>nav('/farm')}><span className="em" aria-hidden>🌾</span><span><b>{t('farmTitle')}</b><small>{t('farmCta')}</small></span></button>
 <div className="path" data-tour="path">{LESSONS.map((l,i)=><button key={l.id} {...tip('tipLesson')} className={'node '+(p.done.includes(l.id)?'done':'')} style={{marginInlineStart:i%2?'auto':0}} onClick={()=>nav('/lesson/'+l.id)}>
  <span className="em" aria-hidden>{l.emoji}</span><span><b>{l.title[lang]}</b><small>{p.done.includes(l.id)?t('done'):t('begin')}</small></span></button>)}</div></section>}

function Lesson({addXp}){const {t,lang,tip}=useL();const id=location.pathname.split('/').pop();const L=LESSONS.find(x=>x.id===id)||LESSONS[0];
 const nav=useNavigate();const [i,setI]=useState(0);const [res,setRes]=useState(null);const [txt,setTxt]=useState('');const [ok,setOk]=useState(0);
 const q=L.questions[i];const fin=i>=L.questions.length;
 useEffect(()=>{if(fin)addXp(ok*10,L.id)},[fin]);
 const norm=v=>v.toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
 const answer=(good,pick)=>{setRes({good,pick});if(good)setOk(n=>n+1)};
 const play=()=>{const au=new Audio(q.audio);au.play().catch(()=>{ // fallback until your recordings exist (browser voice, may not pronounce Punjabi well)
  const u=new SpeechSynthesisUtterance(q.say);u.lang='ur-PK';speechSynthesis.speak(u)})};
 if(fin)return <section className="center"><div className="big">🎉</div><h1>{t('complete')}</h1><p>{t('result',ok,L.questions.length,ok*10)}</p><button className="btn" {...tip('tipBack')} onClick={()=>nav('/')}>{t('cont')}</button></section>;
 const isL=q.type==='listen';
 return <section><div className="progress" role="progressbar" aria-valuemin="0" aria-valuemax={L.questions.length} aria-valuenow={i}><span style={{width:(i/L.questions.length*100)+'%'}}/></div>
 <h1 className="qh">{isL?t('listenQ'):q.q[lang]}</h1>
 {isL?<div className="listen"><button className="btn" {...tip('tipPlay')} onClick={play}>{t('play')}</button>
  <input aria-label={t('typeHere')} placeholder={t('typeHere')} value={txt} disabled={!!res} onChange={e=>setTxt(e.target.value)} onKeyDown={e=>e.key==='Enter'&&!res&&txt&&answer([q.answer,...(q.accept||[])].some(x=>norm(x)===norm(txt)))}/>
  {!res&&<button className="btn" {...tip('tipCheck')} disabled={!txt} onClick={()=>answer([q.answer,...(q.accept||[])].some(x=>norm(x)===norm(txt)))}>{t('check')}</button>}</div>
 :<div className="opts" role="group">{q.opts.map((o,k)=><button key={k} {...tip('tipOpt')} disabled={!!res} className={'opt'+(res?(k===q.a?' right':k===res.pick?' wrong':''):'')} onClick={()=>answer(k===q.a,k)}>{o[lang]}</button>)}</div>}
 <div aria-live="polite" className={'fb '+(!res?'':res.good?'good':'bad')}>{res&&<span>{res.good?t('right'):t('wrong')+(isL?q.answer:q.opts[q.a][lang])}{isL&&<><br/>{t('meaning')}{q.hint[lang]}</>}</span>}
 {res&&<button className="btn" autoFocus {...tip('tipNextQ')} onClick={()=>{setI(i+1);setRes(null);setTxt('')}}>{t('cont')}</button>}</div></section>}

function Game({addXp}){const {t,lang,tip}=useL();const tx=v=>typeof v==='string'?v:v[lang];const mk=()=>PAIRS.flatMap(([a,b],i)=>[{k:a+i,t:a,m:i},{k:b+i,t:b,m:i}]).sort(()=>Math.random()-.5);
 const [c,setC]=useState(mk);const [f,setF]=useState([]);const [m,setM]=useState([]);const [mv,setMv]=useState(0);
 const flip=k=>{if(f.length===2||f.includes(k)||m.includes(c.find(x=>x.k===k).m))return;const n=[...f,k];setF(n);
  if(n.length===2){setMv(mv+1);const [x,y]=n.map(z=>c.find(w=>w.k===z));
   setTimeout(()=>{if(x.m===y.m){const nm=[...m,x.m];setM(nm);if(nm.length===PAIRS.length)addXp(30,'game')}setF([])},700)}};
 const won=m.length===PAIRS.length;
 return <section><h1>{t('gameTitle')}</h1><p className="lead">{t('gameLead')}{mv}</p>
 <div className="grid">{c.map(x=>{const open=f.includes(x.k)||m.includes(x.m);return <button key={x.k} {...tip('tipCard')} className={'card'+(open?' open':'')+(m.includes(x.m)?' matched':'')} aria-label={open?tx(x.t):t('hidden')} onClick={()=>flip(x.k)}>{open?tx(x.t):'?'}</button>})}</div>
 {won&&<div className="fb good" aria-live="polite">{t('won',mv)} <button className="btn" {...tip('tipAgain')} onClick={()=>{setC(mk());setM([]);setF([]);setMv(0)}}>{t('again')}</button></div>}</section>}

function Auth({mode,onAuth}){const {t,lang,tip}=useL();const nav=useNavigate();const [f,setF]=useState({name:'',email:'',password:''});const [err,setErr]=useState('');const [busy,setBusy]=useState(false);
 const sub=async e=>{e.preventDefault();setErr('');setBusy(true);
  try{const r=await (mode==='login'?api.login:api.register)(f);localStorage.setItem('pr_token',r.token);onAuth(r.user);nav('/')}
  catch(x){setErr(x.message==='Failed to fetch'?t('offline'):x.message)}setBusy(false)};
 const u=k=>e=>setF({...f,[k]:e.target.value});
 return <section className="auth"><h1>{mode==='login'?t('welcome'):t('create')}</h1>
 <form onSubmit={sub} noValidate>
 {mode==='register'&&<label {...tip('tipName')}>{t('name')}<input required autoComplete="name" value={f.name} onChange={u('name')}/></label>}
 <label {...tip('tipEmail')}>{t('email')}<input type="email" required autoComplete="email" value={f.email} onChange={u('email')}/></label>
 <label {...tip('tipPass')}>{t('password')}<input type="password" required minLength="6" autoComplete={mode==='login'?'current-password':'new-password'} value={f.password} onChange={u('password')}/></label>
 <p role="alert" className="err">{err}</p><button className="btn" {...tip('tipSubmit')} disabled={busy}>{busy?t('wait'):mode==='login'?t('login'):t('signup')}</button></form>
 <button className="link" {...tip('tipSwitch')} onClick={()=>nav(mode==='login'?'/register':'/login')}>{mode==='login'?t('newHere'):t('have')}</button>
 <button className="link" {...tip('tipGuest')} onClick={()=>nav('/')}>{t('guest')}</button></section>}

function Farm({user,addXp}){const {t,lang,tip}=useL();const nav=useNavigate();
 const mk=()=>LESSONS.flatMap(l=>l.questions.filter(q=>!q.type)).sort(()=>Math.random()-.5).slice(0,8);
 const [qs,setQs]=useState(mk);const [i,setI]=useState(0);const [w,setW]=useState(0);const [m,setM]=useState(0);const [hp,setHp]=useState(3);const [res,setRes]=useState(null);
 const [name,setName]=useState(user?.name||ls('pr_nick',''));const [saved,setSaved]=useState(false);const [busy,setBusy]=useState(false);
 const over=!res&&(i>=qs.length||hp<=0);const kg=w*6+m*10+hp*8;const q=qs[i];
 useEffect(()=>{if(over)addXp(w*5,'farm')},[over]);
 const pick=k=>{const good=k===q.a;setRes({good,pick:k});if(good){setW(w+1);setM(m+1)}else setHp(hp-1)};
 const reset=()=>{setQs(mk());setI(0);setW(0);setM(0);setHp(3);setRes(null);setSaved(false)};
 const save=async()=>{const nm=name.trim();setBusy(true);localStorage.setItem('pr_nick',nm);
  const all=[...ls('pr_scores',[]).filter(x=>x.name!==nm||x.yield>kg),{name:nm,yield:kg}].sort((a,b)=>b.yield-a.yield).slice(0,10);localStorage.setItem('pr_scores',JSON.stringify(all));
  try{await api.submitScore({name:nm,yield:kg,correct:w})}catch{}setBusy(false);setSaved(true)};
 const stage=w===0?'🌰':w<3?'🌱':w<7?'🌿':'🌾';const dmg=3-hp;
 return <section><h1>{t('farmTitle')}</h1><p className="lead">{t('farmLead')}</p>
 <div className="meters"><div className="pill" tabIndex="0" {...tip('tipWater')}>💧 {w}</div><div className="pill" tabIndex="0" {...tip('tipMed')}>🧪 {m}</div>
  <div className="pill" tabIndex="0" role="img" aria-label={t('health')+' '+hp+'/3'} {...tip('tipHealth')}>{'❤️'.repeat(hp)}{'🖤'.repeat(dmg)}</div><div className="pill">{Math.min(i+(res?1:0),qs.length)}/{qs.length}</div></div>
 <div className="field" aria-hidden><span className="sun">☀️</span>
  <div className="plant" style={{fontSize:(2+Math.min(w,8)*.5)+'rem',filter:`saturate(${1-dmg*.3}) sepia(${dmg*.25})`,transform:`rotate(${dmg*8}deg)`}}>{stage}</div>
  {res?.good&&<div className="drops" key={i}>{['💧','💧','💧','🧪'].map((d,k)=><span key={k} style={{animationDelay:k*.12+'s'}}>{d}</span>)}</div>}
  {res&&!res.good&&<div className="bugs" key={i}><span style={{left:'30%'}}>🐛</span><span style={{left:'58%',animationDelay:'.2s'}}>🐛</span></div>}
  <div className="soil"/></div>
 {over?<div className="center" style={{paddingTop:0}}><h2>{t('harvestTitle')}</h2><p className="yield">{t('yieldIs',kg)}</p><p><b>{kg>=110?t('q3'):kg>=60?t('q2'):t('q1')}</b></p>
  {!saved?<><label {...tip('tipName')}>{t('nick')}<input maxLength="20" value={name} onChange={e=>setName(e.target.value)}/></label><br/><button className="btn" disabled={!name.trim()||busy} {...tip('tipSubmitScore')} onClick={save}>{busy?t('wait'):t('submitScore')}</button></>
  :<><p role="status">{t('saved')}</p><button className="btn" onClick={()=>nav('/board')}>{t('viewBoard')}</button></>}
  <button className="link" onClick={reset}>{t('again')}</button></div>
 :<><h2 className="qh">{q.q[lang]}</h2>
  <div className="opts" role="group">{q.opts.map((o,k)=><button key={k} {...tip('tipFarmOpt')} disabled={!!res} className={'opt'+(res?(k===q.a?' right':k===res.pick?' wrong':''):'')} onClick={()=>pick(k)}>{o[lang]}</button>)}</div>
  <div aria-live="polite" className={'fb '+(!res?'':res.good?'good':'bad')}>{res&&<span>{res.good?t('farmGood'):t('farmBad')+q.opts[q.a][lang]}</span>}{res&&<button className="btn" autoFocus onClick={()=>{setI(i+1);setRes(null)}}>{t('cont')}</button>}</div></>}</section>}

function Board(){const {t}=useL();const [rows,setRows]=useState(null);const [off,setOff]=useState(false);const me=ls('pr_nick','');
 useEffect(()=>{api.getBoard().then(r=>setRows(r.scores)).catch(()=>{setOff(true);setRows(ls('pr_scores',[]))})},[]);
 return <section><h1>{t('boardTitle')}</h1><p className="lead">{t('boardLead')}</p>{off&&<p className="err" role="status">{t('offlineBoard')}</p>}
 {rows&&!rows.length&&<p>{t('empty')}</p>}
 <ol className="board">{(rows||[]).map((r,k)=><li key={k} className={r.name===me?'me':''}><span className="rk">{['🥇','🥈','🥉'][k]||k+1}</span><span className="nm">{r.name}{r.name===me&&' ('+t('you')+')'}</span><span className="kg">{r.yield} {t('kg')}</span></li>)}</ol></section>}

export default function App(){const [lang,setLang]=useState(ls('pr_lang','en'));const t=(k,...a)=>{const v=UI[lang][k]??UI.en[k];return typeof v==='function'?v(...a):v};const tip=k=>({'data-tip':t(k),'aria-description':t(k)});
 useEffect(()=>{const h=document.documentElement;h.lang=lang==='ur'?'ur':'en';h.dir=lang==='ur'?'rtl':'ltr';localStorage.setItem('pr_lang',JSON.stringify(lang))},[lang]);
 const [splash,setSplash]=useState(true);const [tour,setTour]=useState(!ls('pr_tour',false));
 const [s,set]=useState(()=>ls('pr_a11y',DEF));const [open,setOpen]=useState(false);
 const [p,setP]=useState(()=>ls('pr_prog',{xp:0,streak:1,done:[],last:new Date().toDateString()}));const [user,setUser]=useState(ls('pr_user',null));
 useEffect(()=>{const h=document.documentElement;h.style.fontSize=s.font+'%';h.dataset.contrast=s.contrast;h.dataset.spacing=s.spacing;h.dataset.motion=s.motion;h.dataset.hints=s.hints!==false;
  document.body.style.filter=`brightness(${s.bright}%)`;localStorage.setItem('pr_a11y',JSON.stringify(s))},[s]);
 useEffect(()=>localStorage.setItem('pr_prog',JSON.stringify(p)),[p]);
 const addXp=useCallback((x,id)=>{setP(o=>{const t=new Date().toDateString();const streak=o.last===t?o.streak:o.streak+1;
  const n={...o,xp:o.xp+x,streak,last:t,done:id&&id!=='game'&&id!=='farm'&&!o.done.includes(id)?[...o.done,id]:o.done};
  if(localStorage.getItem('pr_token'))api.saveProgress(n).catch(()=>{});return n})},[]);
 const closeTour=()=>{localStorage.setItem('pr_tour','true');setTour(false)};
 const onAuth=u=>{setUser(u);localStorage.setItem('pr_user',JSON.stringify(u));if(u.progress)setP(u.progress)};
 const out=()=>{localStorage.removeItem('pr_token');localStorage.removeItem('pr_user');setUser(null)};
 if(splash)return <LangCtx.Provider value={{lang,t,tip}}><Splash done={()=>setSplash(false)}/></LangCtx.Provider>;
 return <LangCtx.Provider value={{lang,t,tip}}><div className="app"><button className="lang-btn tip-below tip-end" data-tour="lang" data-tip={t('langTip')} aria-label={t('langTip')} onClick={()=>setLang(lang==='en'?'ur':'en')}>{t('langBtn')}</button><a href="#main" className="skip">{t('skip')}</a>
 <nav className="nav" aria-label="Main"><img src="/logo.png" alt="Punjabi Reconnect" className="nav-logo"/>
  <NavLink to="/" end {...tip('tipLearn')}><span aria-hidden>🏠</span>{t('learn')}</NavLink><NavLink to="/farm" data-tour="farm" {...tip('tipFarm')}><span aria-hidden>🌾</span>{t('nFarm')}</NavLink><NavLink to="/game" data-tour="game" {...tip('tipGame')}><span aria-hidden>🎮</span>{t('game')}</NavLink><NavLink to="/board" {...tip('tipBoard')}><span aria-hidden>🏆</span>{t('nBoard')}</NavLink>
  {user?<button {...tip('tipLogout')} onClick={out}><span aria-hidden>👤</span>{t('logout')}</button>:<NavLink to="/login" {...tip('tipLogin')}><span aria-hidden>👤</span>{t('login')}</NavLink>}</nav>
 <main id="main" tabIndex="-1"><Routes><Route path="/" element={<Home p={p}/>}/><Route path="/lesson/:id" element={<Lesson addXp={addXp}/>}/>
  <Route path="/farm" element={<Farm user={user} addXp={addXp}/>}/><Route path="/board" element={<Board/>}/><Route path="/game" element={<Game addXp={addXp}/>}/><Route path="/login" element={<Auth mode="login" onAuth={onAuth}/>}/><Route path="/register" element={<Auth mode="register" onAuth={onAuth}/>}/></Routes></main>
 <A11y s={s} set={set} open={open} setOpen={setOpen} replay={()=>{setOpen(false);setTour(true)}}/>{tour&&<Tour onClose={closeTour}/>}</div></LangCtx.Provider>}
