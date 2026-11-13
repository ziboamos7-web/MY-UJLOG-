(()=>{
const ic=(n,s=18)=>`<svg class="i" aria-hidden="true" style="width:${s}px;height:${s}px"><use href="#${n}"/></svg>`;
const DJ=['Lun','Mar','Mer','Jeu','Ven','Sam'],DF=['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const CTY={CM:'#15803D',TD:'#C26A00',TP:'#0E7C8C'},CTL={CM:'Cours magistral',TD:'Travaux dirigés',TP:'Travaux pratiques'};
/* Créneaux par défaut (relevés sur l'emploi du temps officiel) : chaque UFR peut définir les siens */
const CRN=[['08:00','10:00'],['10:00','12:00'],['14:00','16:00'],['16:00','18:00']];
const MEM='Membrane plasmique, hyaloplasme et cytosquelette',BONY='Pr BONY Kotchi Yves',BROU='Dr BROU Akahoua';
/* Modèle de données (à fournir par le backend) : UFR > niveau > semaine > cours [jour 0-5, créneau, type, intitulé, salle, enseignant] */
const EDU=[
{id:'agro',n:'Agroforesterie',f:'UFR Agroforesterie',crn:CRN,niv:{L1:{f:'Licence 1 Agroforesterie / Environnement',sem:'2026-11-09',doc:1,c:[[0,1,'CM',MEM,'Amphi B',BONY],[0,3,'CM',MEM,'Amphi B',BONY],[2,1,'CM','Analyse','Amphi C',BROU],[2,3,'CM',MEM,'Amphi B',BONY],[3,3,'CM','Analyse','Amphi C',BROU],[4,1,'CM',MEM,'Amphi B',BONY],[4,3,'CM','Analyse','Amphi C',BROU]]}}},
{id:'env',n:'Environnement',f:'UFR Environnement',crn:CRN,niv:{}},
{id:'seg',n:'Éco. et gestion',f:'UFR Sciences économiques et de gestion',crn:CRN,niv:{}},
{id:'jur',n:'Juridiques',f:'UFR Sciences juridiques',crn:CRN,niv:{}},
{id:'ssh',n:'Sociales et humaines',f:'UFR Sciences sociales et humaines',crn:CRN,niv:{}}];
const MCOL=['#1B4D96','#C2410C','#0E7490','#7C3AED','#B45309','#BE185D','#15803D','#4F46E5'],SUBJ=[];
EDU.forEach(u=>Object.keys(u.niv).forEach(k=>u.niv[k].c.forEach(x=>{if(SUBJ.indexOf(x[3])<0)SUBJ.push(x[3])})));
const kc=x=>{let i=SUBJ.indexOf(x[3]);if(i<0)i=SUBJ.push(x[3])-1;return MCOL[i%MCOL.length]};
const tn=x=>x[5].split(' ').slice(0,2).join(' ');
const legend=n=>`<section class="card pad edlg">${[...new Set(n.c.map(x=>x[3]))].map(t=>{const m=n.c.filter(y=>y[3]==t),x=m[0],p=[...new Set(m.map(y=>y[5]))].join(', '),k=m.length;return `<div class="edlr"><i style="background:${kc(x)}"></i><div><b>${t}</b><small>${p}</small></div><span style="color:${kc(x)}">${k} séance${k>1?'s':''}</span></div>`}).join('')}<p class="mu edlt">${[...new Set(n.c.map(x=>x[2]))].map(k=>`<b>${k}</b> ${CTL[k]}`).join(' · ')}</p></section>`;
const NIV=[['L1','Licence 1'],['L2','Licence 2'],['L3','Licence 3'],['M1','Master 1'],['M2','Master 2']];
const LEAD=[[15,'15 min'],[30,'30 min'],[60,'1 h'],[-1,'Veille 20h']];
const K='ujlog-edt-v3';
let st={u:'agro',n:'L1',v:'j',d:null,sel:null,al:{on:true,lead:30,mute:{}}};
try{const s=JSON.parse(localStorage.getItem(K)||'null');if(s){st.u=s.u||st.u;st.n=s.n||st.n;st.v=s.v||st.v;if(s.al)st.al=Object.assign(st.al,s.al)}}catch(e){}
/* UFR et niveau sont renseignés une seule fois, à l'inscription : ils ne se choisissent plus ici (à remplacer par les données du compte) */
const PROFIL=(()=>{const P=window.UJP||{},m={'Agroforesterie':'agro','Environnement':'env','Sciences juridiques':'jur','Sciences sociales et humaines':'ssh','Sciences économiques et de gestion':'seg'},v={'Licence 1':'L1','Licence 2':'L2','Licence 3':'L3','Master 1':'M1','Master 2':'M2','Doctorat':'M2'};return{u:m[P.ufr]||'agro',n:v[P.nv]||'L1'}})();st.u=PROFIL.u;st.n=PROFIL.n;
const save=()=>{try{localStorage.setItem(K,JSON.stringify({u:st.u,n:st.n,v:st.v,al:st.al}))}catch(e){}};
const hh=t=>t.replace(':00','h').replace(':','h');
const cur=()=>{const u=EDU.find(x=>x.id==st.u),n=u&&u.niv[st.n];return {u,n}};
const wk=n=>{const [y,m,d]=n.sem.split('-').map(Number);return new Date(y,m-1,d)};
const dayDate=(n,j)=>{const w=wk(n);return new Date(w.getFullYear(),w.getMonth(),w.getDate()+j)};
const MOIS=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
const label=n=>{const a=dayDate(n,0),b=dayDate(n,5);return `Semaine du ${a.getDate()} ${a.getMonth()==b.getMonth()?'':MOIS[a.getMonth()]+' '}au ${b.getDate()} ${MOIS[b.getMonth()]} ${b.getFullYear()}`};
const today0=n=>{const t=new Date(),d=new Date(t.getFullYear(),t.getMonth(),t.getDate()),k=Math.round((d-wk(n))/864e5);return k>=0&&k<=5?k:0};
const key=(j,x)=>`${st.u}|${st.n}|${j}|${x[1]}`;
const start=(u,n,j,c)=>{const d=dayDate(n,j),[h,m]=u.crn[c][0].split(':').map(Number);return new Date(d.getFullYear(),d.getMonth(),d.getDate(),h,m)};
const all=(u,n)=>n.c.map(x=>({x,j:x[0],t:start(u,n,x[0],x[1])})).sort((a,b)=>a.t-b.t);
const nextC=(u,n)=>all(u,n).find(o=>o.t>new Date());
const leadTxt=()=>st.al.lead==-1?'la veille à 20h':`${LEAD.find(l=>l[0]==st.al.lead)[1]} avant`;
const alertAt=o=>st.al.lead==-1?new Date(o.t.getFullYear(),o.t.getMonth(),o.t.getDate()-1,20,0):new Date(o.t.getTime()-st.al.lead*60000);
const msg=(u,o)=>{const x=o.x,r=u.crn[x[1]];return [st.al.lead==-1?'Cours demain':`Cours dans ${LEAD.find(l=>l[0]==st.al.lead)[1]}`,`${hh(r[0])} – ${hh(r[1])} · ${x[3]} · ${x[4]}`]};

const slot=(u,n,j,x)=>{const r=u.crn[x[1]],k=key(j,x),on=st.al.on&&!st.al.mute[k];
 return `<div class="li edsl"><div class="edh">${hh(r[0])}<br><span>${hh(r[1])}</span></div><i class="edbar" style="background:${kc(x)}"></i><div class="fl"><span class="tag" style="background:${kc(x)}1F;color:${kc(x)}">${x[2]}</span><b>${x[3]}</b><span class="mu edm">${ic('pin',14)}${x[4]} · ${x[5]}</span></div><button class="edb" data-edb="${k}" aria-pressed="${on}" aria-label="Alerte pour ce cours" ${st.al.on?'':'disabled'}>${ic('bell',18)}</button></div>`};
const dayHtml=(u,n)=>{const d=st.d==null?today0(n):st.d;st.d=d;
 const l=n.c.filter(x=>x[0]==d).sort((a,b)=>a[1]-b[1]);
 return `<div class="chips" role="group" aria-label="Choisir le jour">${DJ.map((s,j)=>`<button class="chip" data-edd="${j}" aria-pressed="${j==d}">${s} ${dayDate(n,j).getDate()}</button>`).join('')}</div>
<div class="card">${l.length?l.map(x=>slot(u,n,d,x)).join(''):`<div class="pad mu" style="text-align:center">Pas de cours ce ${DF[d].toLowerCase()}.</div>`}</div>`};
const short=x=>x[3].split(',')[0];
const selOf=(u,n)=>{let s=st.sel&&n.c.find(y=>y[0]==st.sel[0]&&y[1]==st.sel[1]);if(!s){const o=nextC(u,n);s=o?o.x:n.c[0]}return s};
const weekHtml=(u,n)=>{const t=today0(n),sx=selOf(u,n);
 return `<div class="edw"><table><thead><tr><th></th>${DJ.map((s,j)=>`<th${j==t?' class="now"':''}>${s}<small>${dayDate(n,j).getDate()}</small></th>`).join('')}</tr></thead><tbody>${u.crn.map((r,c)=>`<tr><th>${hh(r[0])}<br>${hh(r[1])}</th>${DJ.map((s,j)=>{const x=n.c.find(y=>y[0]==j&&y[1]==c);return `<td${j==t?' class="now"':''}>${x?`<button class="edc${x==sx?' sel':''}" data-edcell="${j},${c}" style="--k:${kc(x)}"><b>${x[2]}</b><span>${short(x)}</span><small>${x[4]}</small></button>`:''}</td>`}).join('')}</tr>`).join('')}</tbody></table></div>`};
const detail=(u,n)=>{const x=selOf(u,n);if(!x)return '';const r=u.crn[x[1]],j=x[0],dt=dayDate(n,j),k=key(j,x),on=st.al.on&&!st.al.mute[k];
 return `<div class="card edd" style="--k:${kc(x)}"><div class="li" style="width:100%;align-items:stretch;gap:12px"><i class="edbar" style="background:${kc(x)}"></i><div class="fl"><span class="tag" style="background:${kc(x)}1F;color:${kc(x)}">${x[2]} · ${CTL[x[2]]}</span><b style="display:block;margin-top:6px;font-size:15.5px;line-height:1.25">${x[3]}</b><span class="mu edm">${ic('clk',14)}${DF[j]} ${dt.getDate()} ${MOIS[dt.getMonth()]} · ${hh(r[0])} – ${hh(r[1])}</span><span class="mu edm">${ic('pin',14)}${x[4]}</span><span class="mu edm">${ic('usr',14)}${x[5]}</span></div></div>
<button class="edab" data-edb="${k}" aria-pressed="${on}" ${on?`style="background:${kc(x)}"`:''} ${st.al.on?'':'disabled'}>${ic('bell',18)}<span>${on?`Alerte ${leadTxt()}`:'Me prévenir pour ce cours'}</span></button></div>`};
const hero=(u,n)=>{const o=nextC(u,n),I2=ic('clk',22);
 if(!o)return `<section class="cxr edhero"><div class="rt"><span class="ri">${I2}</span><div><h2>Plus de cours cette semaine</h2><p>Le prochain emploi du temps sera publié par la scolarité.</p></div></div></section>`;
 const x=o.x,r=u.crn[x[1]],j=o.j,dt=dayDate(n,j),cc=kc(x);
 return `<section class="cxr edhero" style="background:linear-gradient(135deg,${cc},color-mix(in srgb,${cc} 76%,#053B2B))!important;box-shadow:0 6px 16px ${cc}55!important"><div class="rt"><span class="ri" style="color:${cc}">${I2}</span><div><h2>Prochain cours</h2><p>${DF[j]} ${dt.getDate()} ${MOIS[dt.getMonth()]} · ${hh(r[0])} – ${hh(r[1])}</p></div></div><div class="rs" style="grid-template-columns:2fr 1fr"><div><b style="font-size:14px;line-height:1.25">${x[3]}</b><span>${x[5]}</span></div><div><b style="font-size:15px">${x[4]}</b><span>${x[2]}</span></div></div><p class="edal">${ic('bell',15)}${st.al.on&&!st.al.mute[key(j,x)]?`Alerte ${leadTxt()}`:'Alerte désactivée pour ce cours'}</p></section>`};
const empty=(u)=>`<div class="card pad" style="text-align:center"><b style="font:700 16px var(--h)">Emploi du temps non publié</b><p class="mu" style="font-size:13px;margin:6px 0 0">${u.f} · ${NIV.find(z=>z[0]==st.n)[1]}<br>La scolarité de l’UFR le publiera ici chaque semaine, avec une alerte avant chaque cours.</p></div>`;

const weekLand=(u,n)=>{const bs=[0,1,2,3].map(c=>n.c.some(x=>x[1]==c)),R=c=>bs[c]?'1.7fr':'.5fr',bz=bs.filter(Boolean).length;const t0=new Date(),k=Math.round((new Date(t0.getFullYear(),t0.getMonth(),t0.getDate())-wk(n))/864e5),t=k>=0&&k<=5?k:-1,sx=selOf(u,n);
 const row=c=>{const r=u.crn[c];return `<div class="ew-t ${c<2?'am':'pm'}">${hh(r[0])}<br>${hh(r[1])}</div>`+DJ.map((s,j)=>{const x=n.c.find(y=>y[0]==j&&y[1]==c);
  return x?`<div class="ew-c${j==t?' now':''}" style="--k:${kc(x)}" data-edcs="${j},${c}" role="button" tabindex="0" aria-label="${DF[j]} ${hh(r[0])} – ${hh(r[1])} : ${x[3]}, ${x[4]}"><b>${x[4]}</b><span>${short(x).split(' ')[0]}</span><small>${x[2]}</small><small class="tn">${tn(x)}</small></div>`:`<div class="ew-e ${c<2?'am':'pm'}${j==t?' now':''}"></div>`}).join('')};
 return `<section class="ew" aria-label="Emploi du temps de la semaine"><div class="ew-h"><b>${label(n)}</b><span>${st.n} · ${u.n}</span></div><div class="ew-g${bz<=2?' tall':''}" style="grid-template-rows:auto ${R(0)} ${R(1)} 12px ${R(2)} ${R(3)}"><div></div>${DJ.map((s,j)=>`<div class="ew-d${j==t?' now':''}${n.c.some(x=>x[0]==j)?'':' off'}">${s}<small>${dayDate(n,j).getDate()}</small><i class="dts">${n.c.filter(x=>x[0]==j).map(x=>`<u style="background:${kc(x)}"></u>`).join('')}</i></div>`).join('')}${row(0)}${row(1)}<div class="ew-p" aria-hidden="true">Pause</div>${row(2)}${row(3)}</div></section>`};
const homeHtml=()=>{const {u,n}=cur();
 if(!n)return empty(u);
 return weekLand(u,n)};

const alertsHtml=(u,n)=>{const o=n&&nextC(u,n),m=o&&msg(u,o);
 return `<div class="cxsec"><h3>Me prévenir avant mes cours</h3></div>
<section class="card pad"><div class="row" style="gap:12px"><div class="fl"><b>Alertes de cours</b><span class="mu" style="display:block;font-size:13px">Une notification avant chaque cours coché</span></div><button class="edsw" role="switch" data-edsw aria-checked="${st.al.on}" aria-label="Activer les alertes"><i></i></button></div>
<div style="${st.al.on?'':'opacity:.45;pointer-events:none'}"><p class="mu" style="font-size:12.5px;margin:14px 0 6px">Prévenir</p><div class="chips" role="group" aria-label="Délai de l’alerte">${LEAD.map(([v,l])=>`<button class="chip" data-edl="${v}" aria-pressed="${st.al.lead==v}">${l}</button>`).join('')}</div>
${m?`<div class="ednt"><span class="ednt-i">${ic('bell',18)}</span><div><small>My UJLoG · maintenant</small><b>${m[0]}</b><span>${m[1]}</span></div></div>`:''}
<div class="row" style="gap:8px;margin-top:12px"><button class="btn s" style="flex:1" data-edtest>Tester l’alerte</button>${'Notification' in window&&Notification.permission=='default'?`<button class="btn s" style="flex:1" data-edperm>Autoriser les notifications</button>`:''}</div>
<p class="mu" style="font-size:12px;margin:10px 0 0">Touchez la cloche d’un cours pour couper son alerte. Dans l’application, la notification arrive même quand elle est fermée.</p></div></section>`};

/* v60 : écran Emploi du temps reconstruit — sélecteur compact, frise des jours, journée en timeline, semaine en agenda */
const tIdx=n=>{const t=new Date(),k=Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate())-wk(n))/864e5);return k>=0&&k<=5?k:-1};
const selector=u=>`<details class="ed2-sel card"><summary><span class="ed2-si">${ic('cap',20)}</span><span class="fl"><b>${u.n}</b><small>${NIV.find(z=>z[0]==st.n)[1]} · ${u.f}</small></span>${ic('chv',18)}</summary>
<div class="ed2-sb"><p>Mon UFR</p><div class="chips" role="group" aria-label="Choisir l’UFR">${EDU.map(x=>`<button class="chip" data-edu="${x.id}" aria-pressed="${x.id==st.u}">${x.n}</button>`).join('')}</div>
<p>Mon niveau</p><div class="chips" role="group" aria-label="Choisir le niveau">${NIV.map(([v,l])=>`<button class="chip" data-edn="${v}" aria-pressed="${v==st.n}">${l}</button>`).join('')}</div></div></details>`;
const slotN=(u,n,j,x)=>{const r=u.crn[x[1]],k=key(j,x),on=st.al.on&&!st.al.mute[k];
 return `<article class="ed4-c" style="--k:${kc(x)}"><div class="ed4-t"><b>${hh(r[0])}</b><span>${hh(r[1])}</span></div><div class="ed4-b"><div class="ed4-top"><span class="ed4-tag" data-t="${x[2]}">${x[2]} · ${CTL[x[2]]}</span><button class="edb" data-edb="${k}" aria-pressed="${on}" aria-label="Alerte pour ce cours" ${st.al.on?'':'disabled'}>${ic('bell',18)}</button></div><h4>${x[3]}</h4><div class="ed4-m"><span>${ic('pin',14)}${x[4]}</span><span>${ic('usr',14)}${x[5]}</span></div></div></article>`};
const strip=(u,n,d)=>{const t=tIdx(n);return `<div class="ed2-st" role="group" aria-label="Choisir le jour">${DJ.map((s,j)=>`<button data-edd="${j}" aria-pressed="${j==d}"${j==t?' data-today="1"':''}><span>${s}</span><b>${dayDate(n,j).getDate()}</b><i>${n.c.filter(x=>x[0]==j).map(x=>`<u style="background:${kc(x)}"></u>`).join('')}</i></button>`).join('')}</div>`};
const dayN=(u,n)=>{const d=st.d==null?today0(n):st.d;st.d=d;const l=n.c.filter(x=>x[0]==d).sort((a,b)=>a[1]-b[1]),dt=dayDate(n,d);
 let body='';if(!l.length){const nx=nextC(u,n);body=`<div class="card pad ed2-free"><span class="ed2-fi">${ic('cal',26)}</span><b>Journée libre</b><p class="mu">Pas de cours ce ${DF[d].toLowerCase()}.${nx?` Prochain cours : ${DF[nx.j].toLowerCase()} à ${hh(u.crn[nx.x[1]][0])}.`:''}</p></div>`}
 else{l.forEach((x,i)=>{if(i&&l[i-1][1]<2&&x[1]>=2)body+=`<div class="ed2-p">Pause · ${hh(u.crn[1][1])} – ${hh(u.crn[2][0])}</div>`;body+=slotN(u,n,d,x)})}
 return `${strip(u,n,d)}<div class="ed2-dh" data-d="${d}"><b>${DF[d]} ${dt.getDate()} ${MOIS[dt.getMonth()]}</b><span>${l.length?l.length+' cours':'Libre'}</span></div><div class="ed2-tl">${body}</div>`};
const agenda=(u,n)=>{const t=tIdx(n);return `<div class="ed2-ag">${DJ.map((s,j)=>{const l=n.c.filter(x=>x[0]==j).sort((a,b)=>a[1]-b[1]),dt=dayDate(n,j);
 return `<section class="ed2-ad"><div class="ed2-ah${j==t?' now':''}"><b>${DF[j]}</b><span>${dt.getDate()} ${MOIS[dt.getMonth()]}</span><em>${l.length?l.length+' cours':'Libre'}</em></div>${l.length?`<div class="card">${l.map(x=>{const r=u.crn[x[1]],k=key(j,x),on=st.al.on&&!st.al.mute[k],cc=kc(x);return `<div class="li ed2-r" style="--k:${cc}"><div class="ed2-rt">${hh(r[0])}<span>${hh(r[1])}</span></div><i class="edbar" style="background:${cc}"></i><div class="fl"><b>${short(x)}</b><span class="mu">${x[2]} · ${x[4]} · ${tn(x)}</span></div><button class="edb" data-edb="${k}" aria-pressed="${on}" aria-label="Alerte pour ce cours" ${st.al.on?'':'disabled'}>${ic('bell',18)}</button></div>`}).join('')}</div>`:`<p class="ed2-lib">Pas de cours</p>`}</section>`}).join('')}</div>`};
const lbl=n=>{const a=dayDate(n,0),b=dayDate(n,5);return a.getMonth()==b.getMonth()?`${a.getDate()} – ${b.getDate()} ${MOIS[b.getMonth()]}`:`${a.getDate()} ${MOIS[a.getMonth()]} – ${b.getDate()} ${MOIS[b.getMonth()]}`};
const bar=u=>`<div class="ed3-bar" role="note"><span class="ed3-bi">${ic('cap',18)}</span><div class="ed3-bt"><b>${u.f}</b><small>${NIV.find(z=>z[0]==st.n)[1]}</small></div><button class="ed3-al" data-edopen aria-pressed="${st.al.on}" aria-label="Régler les alertes de cours">${ic('bell',16)}<span>${st.al.on?(st.al.lead==-1?'Veille 20h':LEAD.find(l=>l[0]==st.al.lead)[1]):'Alertes off'}</span></button></div>`;
const next3=(u,n)=>{const o=nextC(u,n);
 if(!o)return `<section class="ed3-nx ed3-none"><span class="ed3-ni">${ic('clk',22)}</span><div><b>Plus de cours cette semaine</b><span>Le prochain emploi du temps sera publié par la scolarité.</span></div></section>`;
 const x=o.x,r=u.crn[x[1]],dt=dayDate(n,o.j);
 return `<section class="ed3-nx" style="--k:${kc(x)}"><div class="ed3-nt"><small>${DJ[o.j]} ${dt.getDate()}</small><b>${hh(r[0])}</b><span>${hh(r[1])}</span></div><div class="ed3-nb"><small>Prochain cours</small><b>${x[3]}</b><span>${ic('pin',14)}${x[4]} · ${x[2]}</span></div></section>`};
const mats=n=>{const k=new Set(n.c.map(x=>x[3])).size;return `<details class="ed3-mat card"><summary><b>Matières et types de cours</b><em>${k} matière${k>1?'s':''}</em>${ic('chv',18)}</summary>${legend(n)}</details>`};
const nxAl=(u,n)=>{if(!n||!st.al.on)return '';const z=all(u,n).filter(o=>!st.al.mute[key(o.j,o.x)]).map(o=>alertAt(o)).filter(a=>a>new Date())[0];if(!z)return '';const m=z.getMinutes();return `<p class="ed3-nxa">${ic('clk',16)}Prochaine alerte : ${z.getDate()} ${MOIS[z.getMonth()]} à ${z.getHours()}h${m?String(m).padStart(2,'0'):''}</p>`};
const alertsBody=(u,n)=>`<div class="ed3-swr"><div class="fl"><b>Me prévenir avant mes cours</b><span>Une notification avant chaque cours coché</span></div><button class="edsw" role="switch" data-edsw aria-checked="${st.al.on}" aria-label="Activer les alertes"><i></i></button></div>
<div style="${st.al.on?'':'opacity:.45;pointer-events:none'}"><div class="ed3-lead" role="group" aria-label="Délai de l’alerte">${LEAD.map(([v,l])=>`<button class="chip" data-edl="${v}" aria-pressed="${st.al.lead==v}">${l}</button>`).join('')}</div></div>
${nxAl(u,n)}
<div class="row" style="gap:8px"><button class="btn s" style="flex:1" data-edtest>Tester l’alerte</button>${'Notification' in window&&Notification.permission=='default'?`<button class="btn s" style="flex:1" data-edperm>Autoriser</button>`:''}</div>
<p class="mu" style="font-size:12px;margin:0">Touchez la cloche d’un cours pour couper son alerte.</p>`;
const sheetEl=()=>{let e=document.getElementById('ed3sh');if(!e){e=document.createElement('div');e.id='ed3sh';e.className='ed3-sh';e.setAttribute('role','dialog');e.setAttribute('aria-modal','true');e.setAttribute('aria-label','Alertes de cours');document.body.appendChild(e)}return e};
const sheetRender=()=>{const {u,n}=cur();if(st.cs&&n){sheetEl().innerHTML=csBody(u,n);return}sheetEl().innerHTML=`<div class="ed3-b" data-edx></div><div class="ed3-p"><div class="shx-h"><b>Alertes de cours</b><button class="ib" data-edx aria-label="Fermer">×</button></div>${alertsBody(u,n)}</div>`};
const openSh=()=>{const e=sheetEl();sheetRender();void e.offsetWidth;e.classList.add('on')};
const closeSh=()=>{st.cs=null;const e=document.getElementById('ed3sh');if(e)e.classList.remove('on')};
document.addEventListener('keydown',e=>{if(e.key=='Escape')closeSh()});
const hero5=(u,n)=>{const o=nextC(u,n),niv=NIV.find(z=>z[0]==st.n)[1];
  const top=`<div class="ed5-top"><div class="ed5-id"><small>${niv}</small><b>${u.f}</b></div><button class="ed5-al" data-edopen aria-pressed="${st.al.on}" aria-label="Régler les alertes de cours">${ic('bell',16)}<span>${st.al.on?(st.al.lead==-1?'Veille 20h':LEAD.find(l=>l[0]==st.al.lead)[1]):'Alertes off'}</span></button></div>`;
  const ctl=`<div class="ed3-ctl"><h2>${lbl(n)}</h2><div class="seg" role="group" aria-label="Affichage"><button data-edv="j" aria-pressed="${st.v!='s'}">Jour</button><button data-edv="s" aria-pressed="${st.v=='s'}">Semaine</button></div></div>`;
  let mid;if(!o)mid=`<div class="ed5-none"><b>Plus de cours cette semaine</b><span>Le prochain emploi du temps sera publié par la scolarité.</span></div>`;
  else{const x=o.x,r=u.crn[x[1]],dt=dayDate(n,o.j);mid=`<div class="ed5-nx"><small>Prochain cours · ${DF[o.j]} ${dt.getDate()} ${MOIS[dt.getMonth()]}</small><b>${x[3]}</b><div class="ed5-meta"><span class="ed5-time">${hh(r[0])} – ${hh(r[1])}</span><span>${ic('pin',14)}${x[4]}</span><span>${ic('usr',14)}${tn(x)}</span></div></div>`}
  return `<section class="ed5-hero${st.v=='s'?'':' day'}">${top}${mid}${ctl}</section>`};
 const mn=t=>{const a=t.split(':');return +a[0]*60+ +a[1]};
 const rng=u=>{const a=u.crn.map(r=>mn(r[0])),b=u.crn.map(r=>mn(r[1]));return [Math.floor(Math.min(...a)/60),Math.ceil(Math.max(...b)/60)]};
 const gut=(h0,h1,px)=>{let s='';for(let h=h0;h<h1;h++)s+=`<span style="top:${(h-h0)*px}px">${h}h</span>`;return s};
 const head6=(u,n)=>`<div class="h6"><span class="h6-i">${typeof UJLOG2!=='undefined'?`<img src="${UJLOG2}" alt="UJLoG">`:ic('cap',18)}</span><div class="h6-t"><b>${u.f}</b><small>${NIV.find(z=>z[0]==st.n)[1]}</small></div><button class="h6-al" data-edopen aria-pressed="${st.al.on}" aria-label="Régler les alertes de cours">${ic('bell',16)}<span>${st.al.on?(st.al.lead==-1?'Veille 20h':LEAD.find(l=>l[0]==st.al.lead)[1]):'Off'}</span></button></div>`;
 const si=x=>{const t=(x[3]||'').toLowerCase();return /agro|forêt|forest|sol\b|plante|cultur|environn|écolog|biodiv|climat/.test(t)?'leaf':/info|program|algor|réseau|donn|numér/.test(t)?'pc':/éco|gestion|compta|financ|market|budget/.test(t)?'coin':/droit|jurid|pénal|civil|constit|fiscal/.test(t)?'arch':/socio|histoire|géograph|philo|anthrop|psych|langue|anglais|français|commun/.test(t)?'globe':/chim|phys|biolog|labo|génétiq|micro|cyto|membran|cellul|plasm|molécul|enzym|biochim/.test(t)?'flask':/math|analyse|algèbre|statist|calcul|probab/.test(t)?'compass':/mém|stage|projet|tutorat|recherche|méthod/.test(t)?'bkm':x[2]=='TP'?'flask':x[2]=='TD'?'pen':'cap'};
 const when=(n,j)=>{const w=new Date(),k=Math.round((dayDate(n,j)-new Date(w.getFullYear(),w.getMonth(),w.getDate()))/864e5);return k<=0?'Aujourd’hui':k==1?'Demain':'Dans '+k+' j'};
 const nxt=(u,n)=>{const o=nextC(u,n);if(!o)return `<div class="n6 n6-none">${ic('clk',18)}<span>Plus de cours cette semaine</span></div>`;const x=o.x,r=u.crn[x[1]],dt=dayDate(n,o.j);return `<button class="n6" data-edcs="${o.j},${x[1]}" style="--k:${kc(x)}">${lg(si(x))}<div><small>Prochain cours · ${DF[o.j]} ${dt.getDate()} ${MOIS[dt.getMonth()]}</small><b>${x[3]}</b><span>${hh(r[0])} – ${hh(r[1])} · ${x[4]} · ${tn(x)}</span></div><em class="n6-w">${when(n,o.j)}</em></button>`};
 const dayGrid=(u,n,d)=>{const [h0,h1]=rng(u),px=66,H=(h1-h0)*px,top=m=>(m-h0*60)*px/60,l=n.c.filter(x=>x[0]==d).sort((a,b)=>a[1]-b[1]);
  const p1=mn(u.crn[1][1]),p2=mn(u.crn[2][0]),pause=p2>p1?`<div class="g6-p" style="top:${top(p1)}px;height:${top(p2)-top(p1)}px"><span>Pause</span></div>`:'';
  const bl=l.map(x=>{const r=u.crn[x[1]],k=key(d,x),on=st.al.on&&!st.al.mute[k],a=top(mn(r[0])),h=top(mn(r[1]))-a,ik=si(x);return `<article class="g6-c${h<100?' s':''}" style="--k:${kc(x)};top:${a+2}px;height:${h-4}px"><span class="g6-wm">${ic(ik,86)}</span><div class="g6-hd"><span class="g6-ic">${ic(ik,22)}</span><div class="g6-tt"><small>${x[2]} · ${hh(r[0])} – ${hh(r[1])}</small><h4>${x[3]}</h4></div><button class="edb" data-edb="${k}" aria-pressed="${on}" aria-label="Alerte pour ce cours" ${st.al.on?'':'disabled'}>${ic('bell',16)}</button></div><div class="g6-m"><span>${ic('pin',13)}${x[4]}</span><span>${ic('usr',13)}${x[5]}</span></div></article>`}).join('');
  const w=new Date(),nm=w.getHours()*60+w.getMinutes(),nl=tIdx(n)==d&&nm>=h0*60&&nm<=h1*60?`<div class="g6-now" style="top:${top(nm)}px"></div>`:'';
  const fr=l.length?'':`<div class="g6-free"><span class="g6-fi">${ic('cal',26)}</span><b>Journée libre</b><span>Pas de cours ce ${DF[d].toLowerCase()}.</span></div>`;
  return `<div class="g6o"><div class="g6" style="height:${H}px">${gut(h0,h1,px)}<div class="g6-bd">${pause}${bl}${nl}${fr}</div></div></div>`};
 const weekGrid=(u,n)=>{const [h0,h1]=rng(u),px=46,H=(h1-h0)*px,t=tIdx(n),top=m=>(m-h0*60)*px/60;
  const hd=DJ.map((s,j)=>`<button class="w6-h${j==t?' now':''}" data-edgo="${j}"><span>${s}</span><b>${dayDate(n,j).getDate()}</b></button>`).join('');
  const cols=DJ.map((s,j)=>`<div class="w6-col${j==t?' now':''}">${n.c.filter(x=>x[0]==j).map(x=>{const r=u.crn[x[1]],a=top(mn(r[0])),h=top(mn(r[1]))-a;return `<button class="w6-c" data-edgo="${j}" style="--k:${kc(x)};top:${a+1}px;height:${h-2}px" aria-label="${DF[j]} ${hh(r[0])} : ${x[3]}, ${x[4]}">${ic(si(x),h>60?20:16)}<b>${x[2]}</b><span>${x[4]}</span></button>`}).join('')}</div>`).join('');
  return `<div class="w6"><div class="w6-hd"><i></i>${hd}</div><div class="w6-bd" style="height:${H}px"><div class="w6-gu">${gut(h0,h1,px)}</div>${cols}</div></div>`};
 document.addEventListener('click',e=>{const b=e.target.closest('[data-edgo]');if(b){st.d=+b.dataset.edgo;st.v='j';save();render()}});
 const dayCards=(u,n,d)=>{const l=n.c.filter(x=>x[0]==d).sort((a,b)=>a[1]-b[1]);
  if(!l.length)return `<div class="g6-free card pad" style="position:static;padding:26px 16px"><span class="g6-fi">${ic('cal',26)}</span><b>Journée libre</b><span>Pas de cours ce ${DF[d].toLowerCase()}.</span></div>`;
  let s='';l.forEach((x,i)=>{if(i&&l[i-1][1]<2&&x[1]>=2)s+=`<div class="ed2-p">Pause · ${hh(u.crn[1][1])} – ${hh(u.crn[2][0])}</div>`;
   const r=u.crn[x[1]],k=key(d,x),on=st.al.on&&!st.al.mute[k];
   s+=`<button class="d7" style="--k:${kc(x)}" data-edcs="${d},${x[1]}" aria-label="${x[3]}, ${hh(r[0])} – ${hh(r[1])}, ${x[4]}"><span class="d7-im">${lg(si(x))}<b>${hh(r[0])}</b><small>${hh(r[1])}</small></span><span class="d7-mm"><span class="d7-tg">${x[2]} · ${CTL[x[2]]}</span><b>${x[3]}</b><small>${x[4]} · ${tn(x)}</small></span><span class="d7-r">${on?ic('bell',16):''}${ic('chv',18)}</span></button>`});
  return `<div class="d7l">${s}</div>`};
 const LG={
 leaf:'<path d="M6 25C5 12 13 5 27 4c1 13-5 20-17 21z" fill="#fff"/><path d="M7 26c5-6 9-10 15-16" stroke="var(--k)" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M12 20.5h5.5M15.5 16.5h5" stroke="var(--k)" stroke-width="1.4" stroke-linecap="round"/><circle cx="25" cy="25" r="3.2" fill="#FCD34D"/>',
 flask:'<path d="M12 3.5h8v1.8h-1.6v6.4l6.5 11.4a2.7 2.7 0 0 1-2.3 4H9.4a2.7 2.7 0 0 1-2.3-4l6.5-11.4V5.3H12z" fill="#fff"/><path d="M10.4 19.5h11.2l3.2 5.6a1.3 1.3 0 0 1-1.1 2H8.3a1.3 1.3 0 0 1-1.1-2z" fill="var(--k)" fill-opacity=".6"/><circle cx="14" cy="23" r="1.4" fill="#fff"/><circle cx="19" cy="21.5" r="1" fill="#fff"/><circle cx="23" cy="6" r="2" fill="#FCD34D"/>',
 compass:'<rect x="4" y="5" width="24" height="22" rx="5" fill="#fff"/><path d="M9 8v16M9 24h16" stroke="var(--k)" stroke-opacity=".35" stroke-width="1.3" stroke-linecap="round"/><path d="M9 22c3.5 0 4.5-11 8-11s4.5 11 8 11" stroke="var(--k)" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="17" cy="11" r="2" fill="#F59E0B"/>',
 pc:'<rect x="3.5" y="6" width="25" height="17" rx="3.5" fill="#fff"/><path d="M9 11.5l3.5 3.2L9 17.9M15.5 18h6" stroke="var(--k)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 27h10M16 23v4" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>',
 coin:'<rect x="5" y="16" width="6" height="11" rx="1.8" fill="#fff"/><rect x="13" y="10" width="6" height="17" rx="1.8" fill="#fff"/><rect x="21" y="4.5" width="6" height="22.5" rx="1.8" fill="#FCD34D"/><path d="M4 28.5h24" stroke="#fff" stroke-opacity=".7" stroke-width="1.6" stroke-linecap="round"/>',
 arch:'<path d="M16 6v19M9.5 27h13" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><path d="M5 10.5h22" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="M5 11l-3.2 8h6.4zM27 11l-3.2 8h6.4z" fill="#fff"/><path d="M1.8 19a3.2 3.2 0 0 0 6.4 0zM23.8 19a3.2 3.2 0 0 0 6.4 0z" fill="#FCD34D"/><circle cx="16" cy="6" r="2.2" fill="#FCD34D"/>',
 globe:'<circle cx="16" cy="16" r="11.5" fill="#fff"/><path d="M4.5 16h23M16 4.5c-5.5 5.5-5.5 17.500 0 23M16 4.5c5.5 5.5 5.5 17.500 0 23M7 9.5h18M7 22.5h18" stroke="var(--k)" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="24" cy="8" r="3" fill="#FCD34D"/>',
 bkm:'<path d="M16 9c-3-2-7-2.6-11-2v17c4-.6 8 0 11 2z" fill="#fff"/><path d="M16 9c3-2 7-2.6 11-2v17c-4-.6-8 0-11 2z" fill="#fff" fill-opacity=".9"/><path d="M16 9v17" stroke="var(--k)" stroke-width="1.3"/><path d="M8 12.3c2-.2 4 0 6 .8M8 16.3c2-.2 4 0 6 .8M18 13.1c2-.8 4-1 6-.8M18 17.1c2-.8 4-1 6-.8" stroke="var(--k)" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M22 3.5v7l2.2-1.6 2.2 1.6v-7z" fill="#F59E0B"/>',
 pen:'<rect x="5" y="4" width="17" height="23" rx="3" fill="#fff"/><path d="M9 10h9M9 14.5h9M9 19h5" stroke="var(--k)" stroke-width="1.5" stroke-linecap="round"/><g transform="rotate(38 23 20)"><rect x="20.6" y="8" width="5" height="15" rx="1" fill="#FCD34D"/><rect x="20.6" y="8" width="5" height="3.6" rx="1" fill="#F87171"/><path d="M20.6 23h5l-2.5 5z" fill="#FDE6C4"/><path d="M22 26.2h2L23 28z" fill="#374151"/></g>',
 cap:'<path d="M16 5L2.5 11.5 16 18l13.5-6.5z" fill="#fff"/><path d="M8 15.5v5.5c0 2.300 3.600 4.500 8 4.500s8-2.200 8-4.500v-5.500L16 19.500z" fill="#fff" fill-opacity=".88"/><path d="M28 12.500v8" stroke="#FCD34D" stroke-width="2.200" stroke-linecap="round"/><circle cx="28" cy="22" r="1.800" fill="#FCD34D"/>'};
 const lg=n=>`<span class="lg7"><svg viewBox="0 0 32 32" aria-hidden="true">${LG[n]||LG.cap}</svg></span>`;
 window.UJLG={LG:LG,lg:lg,si:si,kc:kc};
 const strip7=(u,n,d)=>{const t=tIdx(n);return `<div class="s7" role="group" aria-label="Choisir le jour">${DJ.map((s,j)=>{const l=n.c.filter(x=>x[0]==j),dt=dayDate(n,j);return `<button data-edd="${j}" aria-pressed="${j==d}"${j==t?' data-today="1"':''} aria-label="${DF[j]} ${dt.getDate()} ${MOIS[dt.getMonth()]}, ${l.length?l.length+' cours':'libre'}"><span>${s}</span><b>${dt.getDate()}</b><i>${l.length?l.map(x=>`<u style="background:${kc(x)}"></u>`).join(''):'<em></em>'}</i></button>`}).join('')}</div>`};
 const csBody=(u,n)=>{const x=st.cs&&n.c.find(y=>y[0]==st.cs[0]&&y[1]==st.cs[1]);
  if(!x)return `<div class="ed3-b" data-edx></div><div class="ed3-p"><div class="shx-h"><b>Cours</b><button class="ib" data-edx aria-label="Fermer">×</button></div></div>`;
  const j=x[0],r=u.crn[x[1]],dt=dayDate(n,j),k=key(j,x),on=st.al.on&&!st.al.mute[k];
  const row=(i,l,v)=>`<div class="cs8-r"><span class="cs8-ri">${ic(i,18)}</span><div><small>${l}</small><b>${v}</b></div></div>`;
  return `<div class="ed3-b" data-edx></div><div class="ed3-p cs8" style="--k:${kc(x)}"><div class="cs8-top"><i class="cs8-gr"></i><button class="cs8-x" data-edx aria-label="Retour">${ic('chv',18)}<span>Retour</span></button><div class="cs8-hd">${lg(si(x))}<div><span class="cs8-tg">${x[2]} · ${CTL[x[2]]}</span><h3>${x[3]}</h3></div></div></div>
 <div class="cs8-bd"><div class="cs8-l">${row('cal','Jour',DF[j]+' '+dt.getDate()+' '+MOIS[dt.getMonth()])}${row('clk','Horaire',hh(r[0])+' – '+hh(r[1]))}${row('pin','Salle',x[4])}${row('usr','Enseignant',x[5])}</div>
 <p class="cs8-n">${u.f} · ${NIV.find(z=>z[0]==st.n)[1]}</p>
 <button class="cs8-al" data-edb="${k}" aria-pressed="${on}" ${st.al.on?'':'disabled'}>${ic('bell',18)}<span>${on?'Alerte '+leadTxt():(st.al.on?'Me prévenir pour ce cours':'Alertes désactivées')}</span></button>
 <button class="cs8-lk" data-go="sup1" data-edx>${ic('book',18)}Voir les supports de cours</button></div></div>`};
 document.addEventListener('click',e=>{const c=e.target.closest('[data-edcs]');if(c){st.cs=c.dataset.edcs.split(',').map(Number);openSh()}});
 const fullHtml=()=>{const {u,n}=cur();if(!n)return `${bar(u)}${empty(u)}`;const d=st.d==null?today0(n):st.d;st.d=d;const c=n.c.filter(x=>x[0]==d).length,dt=dayDate(n,d);
  return `${head6(u,n)}${nxt(u,n)}<div class="ed3-ctl"><h2>${lbl(n)}</h2><div class="seg" role="group" aria-label="Affichage"><button data-edv="j" aria-pressed="${st.v!='s'}">Jour</button><button data-edv="s" aria-pressed="${st.v=='s'}">Semaine</button></div></div>${st.v=='s'?weekLand(u,n):`${strip7(u,n,d)}<div class="ed2-dh" data-d="${d}"><b>${DF[d]} ${dt.getDate()} ${MOIS[dt.getMonth()]}</b><span>${c?c+' cours':'Libre'}</span></div>${dayCards(u,n,d)}`}${mats(n)}`};

const render=()=>{const {u,n}=cur();if(n&&st.d==null)st.d=today0(n);
 const h=document.getElementById('edh'),f=document.getElementById('edm');
 if(h)h.innerHTML=homeHtml();if(f)f.innerHTML=fullHtml();if(document.getElementById('ed3sh'))sheetRender();sched()};

/* Alerte : bannière dans l'application (+ notification du téléphone si autorisée) */
const toast=(t,b)=>{window.UJEV&&UJEV.edt(t,b);let e=document.getElementById('edt');if(!e){e=document.createElement('div');e.id='edt';e.setAttribute('role','status');document.body.appendChild(e)}
 e.innerHTML=`<span class="ednt-i">${ic('bell',18)}</span><div><small>My UJLoG · maintenant</small><b>${t}</b><span>${b}</span></div>`;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),5000);
 try{if('Notification' in window&&Notification.permission=='granted')new Notification('My UJLoG · '+t,{body:b})}catch(x){}};
let tm=null;
const sched=()=>{clearTimeout(tm);const {u,n}=cur();if(!n||!st.al.on)return;const now=new Date();
 const nx=all(u,n).filter(o=>!st.al.mute[key(o.j,o.x)]).map(o=>({o,a:alertAt(o)})).filter(z=>z.a>now).sort((a,b)=>a.a-b.a)[0];
 if(nx&&nx.a-now<2147e6)tm=setTimeout(()=>{const m=msg(u,nx.o);toast(m[0],m[1]);sched()},nx.a-now)};

document.addEventListener('click',e=>{const t=s=>e.target.closest(s);let b;
 if(t('[data-edopen]')){st.cs=null;openSh();return}
 if(t('[data-edx]')){closeSh();return}
 if(b=t('[data-edu]')){st.u=b.dataset.edu;st.d=null;st.sel=null;save();render();return}
 if(b=t('[data-edn]')){st.n=b.dataset.edn;st.d=null;st.sel=null;save();render();return}
 if(b=t('[data-edv]')){st.v=b.dataset.edv;save();render();return}
 if(b=t('[data-edd]')){st.d=+b.dataset.edd;render();return}
 if(b=t('[data-edcell]')){st.sel=b.dataset.edcell.split(',').map(Number);render();return}
 if(b=t('[data-edb]')){const k=b.dataset.edb;if(st.al.mute[k])delete st.al.mute[k];else st.al.mute[k]=1;save();render();return}
 if(t('[data-edsw]')){st.al.on=!st.al.on;save();render();return}
 if(b=t('[data-edl]')){st.al.lead=+b.dataset.edl;save();render();return}
 if(t('[data-edtest]')){const {u,n}=cur(),o=n&&nextC(u,n);if(o){const m=msg(u,o);toast(m[0],m[1])}else toast('Alerte de test','Aucun cours à venir cette semaine');return}
 if(t('[data-edperm]')){try{Notification.requestPermission().then(render)}catch(x){}}});
render();
})();
