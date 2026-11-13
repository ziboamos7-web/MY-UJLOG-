
(()=>{
const app=document.getElementById('app');if(!app)return;
const C='#5B3FB3';
const ic=(n,s)=>`<svg class="i" aria-hidden="true" style="width:${s}px;height:${s}px"><use href="#${n}"/></svg>`;
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const say=m=>{if(typeof toast=='function')toast(m)};
const KEY='ujlog_lf_v1';
const CAT=[['Papiers & cartes','card'],['Électronique','phone'],['Clés','key'],['Sacs','backpack'],['Vêtements','shirt'],['Autre','box']];
const G={
 card:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="11" r="2"/><path d="M6.2 16c.5-1.6 1.6-2.3 2.8-2.3s2.3.7 2.8 2.3M14 10h4M14 13.5h3"/>',
 wallet:'<path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3"/><rect x="3.5" y="8" width="17" height="12" rx="2.5"/><circle cx="16.5" cy="14" r="1.2"/>',
 usb:'<rect x="9" y="2.5" width="6" height="6" rx="1"/><path d="M10.8 5h.01M13.2 5h.01"/><rect x="7" y="8.5" width="10" height="13" rx="2.5"/><circle cx="12" cy="16" r="1.4"/>',
 phone:'<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
 calc:'<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><rect x="8" y="5.5" width="8" height="3.5" rx=".8"/><path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01" stroke-width="2.4"/>',
 laptop:'<rect x="4.5" y="5" width="15" height="10.5" rx="1.8"/><path d="M2.5 19h19"/>',
 key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16.5 6.5l2.5 2.5M14 9l2 2"/>',
 backpack:'<path d="M9 5a3 3 0 0 1 6 0"/><path d="M6.5 8.5A2.5 2.5 0 0 1 9 6h6a2.5 2.5 0 0 1 2.5 2.5V19a2.5 2.5 0 0 1-2.5 2.5H9A2.5 2.5 0 0 1 6.5 19z"/><path d="M9.5 14h5v3.5h-5zM6.5 11h11"/>',
 shirt:'<path d="M8.5 3.5L3 7l2.5 3.5L8 9v11.5h8V9l2.5 1.5L21 7l-5.5-3.5a3.5 3.5 0 0 1-7 0z"/>',
 glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 14h4M3 14L4.5 7M21 14l-1.5-7"/>',
 book:'<path d="M4.5 4.5A2 2 0 0 1 6.5 3H19v15.5H6.5a2 2 0 0 0-2 2z"/><path d="M4.5 20.5A2 2 0 0 0 6.5 22H19v-3.5M9 7.5h6"/>',
 bottle:'<path d="M10 2.5h4M10.5 2.5v3L9 8.5v11A2 2 0 0 0 11 21.5h2a2 2 0 0 0 2-2v-11l-1.5-3v-3M9 13h6"/>',
 box:'<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>',
 plus:'<path d="M12 5v14M5 12h14"/>'};
const gl=(k,s)=>`<svg class="lf-gl" viewBox="0 0 24 24" aria-hidden="true" style="width:${s}px;height:${s}px" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${G[k]||G.box}</svg>`;
const COL={'Papiers & cartes':'#2563EB','Électronique':'#0E7490','Clés':'#D97706','Sacs':'#16A34A','Vêtements':'#DB2777','Autre':'#64748B'};
const catIc=n=>(CAT.find(c=>c[0]==n)||CAT[5])[1];
const nz=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const KW=[[/usb|flash/,'usb','Électronique'],[/telephone|portable|iphone|samsung|tecno|infinix|smartphone|phone/,'phone','Électronique'],[/calculatrice|casio/,'calc','Électronique'],[/ordinateur|laptop|\bpc\b|macbook|tablette/,'laptop','Électronique'],[/portefeuille|porte-monnaie|porte monnaie/,'wallet','Papiers & cartes'],[/carte|\bcni\b|passeport|permis|document|papier|attestation/,'card','Papiers & cartes'],[/trousseau|\bcles?\b|porte-cles?/,'key','Clés'],[/\bsac|cartable|sacoche/,'backpack','Sacs'],[/veste|pull|t-shirt|tee-shirt|chemise|robe|pantalon|casquette|\bjean|manteau|pagne/,'shirt','Vêtements'],[/lunette/,'glasses','Autre'],[/livre|cahier|classeur|bouquin|agenda/,'book','Autre'],[/bouteille|gourde|thermos/,'bottle','Autre']];
const guess=t=>{const s=nz(t);for(const [r,g,c] of KW)if(r.test(s))return {g,c};return null};
const gk=o=>(guess(o.n)||{}).g||catIc(o.c);
const kc=o=>COL[o.c]||COL['Autre'];
/* Pièces d'identité : on n'affiche que nom, prénoms, niveau, UFR et photo d'identité */
const IDU=['Agroforesterie','Environnement','Sciences économiques et de gestion','Sciences juridiques','Sciences sociales et humaines'];
const IDN=['Licence 1','Licence 2','Licence 3','Master 1','Master 2','Doctorat'];
const nm=o=>o.idc&&o.idc.nom?(o.idc.nom.toUpperCase()+' '+(o.idc.pre||'')).trim():o.n;
const idl=o=>o.idc?[o.idc.niv,o.idc.ufr].filter(Boolean).join(' · '):'';
const pic=o=>(o.idc&&(o.idc.card||o.idc.pic))||o.ph||'';
const pim=o=>`<img src="${pic(o)}" alt=""${o.idc&&o.idc.card?' class="lf-ci"':''}>`;
const th=o=>`<span class="lf-th" style="--k:${kc(o)}">${pic(o)?pim(o):gl(gk(o),34)}</span>`;
const idCard=o=>o.idc.card?`<div class="lf-idw"><img class="lf-cardimg" src="${o.idc.card}" alt="Carte avec informations masquées"></div>`:`<div class="lf-idw"><div class="lf-idc"><span class="lf-idp">${pic(o)?`<img src="${pic(o)}" alt="Photo d’identité">`:gl('card',40)}</span><div class="lf-idi"><small>NOM ET PRÉNOMS</small><b>${esc(nm(o))}</b>${o.idc.niv?`<small>NIVEAU</small><b>${esc(o.idc.niv)}</b>`:''}${o.idc.ufr?`<small>UFR</small><b>${esc(o.idc.ufr)}</b>`:''}</div></div></div>`;
const shareTx=o=>{const T=o.t=='T';if(o.idc)return (T?'📢 PIÈCE TROUVÉE':'📢 AVIS DE PERTE')+'\n'+o.n+' · '+nm(o)+(idl(o)?'\n'+idl(o):'')+'\n'+(T?'Trouvée':'Perdue')+' : '+o.l+' ('+dl(o.d)+')\n'+(T&&o.w?'Où la récupérer : '+o.w+'\n':'')+'Via My UJLoG';return (T?'Objet trouvé : ':'Objet perdu : ')+o.n+' · '+o.l+' ('+dl(o.d)+') — via My UJLoG'};
const LIEUX=['Amphi A','Amphi B','Amphi C','Bibliothèque','Restaurant U','Cité universitaire','Scolarité','Cour centrale'];
const DEP=['Je le garde sur moi','Déposé à la scolarité','Déposé au poste de sécurité'];
const MOIS=['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'];
const pad=n=>String(n).padStart(2,'0');
const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const ago=k=>{const d=new Date();d.setDate(d.getDate()-k);return iso(d)};
const today=iso(new Date());
const dd=s=>Math.round((new Date(today+'T00:00:00')-new Date(s+'T00:00:00'))/864e5);
const dl=s=>{const a=new Date(s+'T00:00:00'),b=new Date(today+'T00:00:00'),k=Math.round((b-a)/864e5);return k<=0?'Aujourd’hui':k==1?'Hier':k<7?'Il y a '+k+' j':a.getDate()+' '+MOIS[a.getMonth()]};
/* Données d'exemple : à brancher plus tard sur la base (Supabase) */
const seed=()=>[];
let items;
try{items=JSON.parse(localStorage.getItem(KEY)||'null')}catch(_){items=null}
if(!Array.isArray(items))items=seed();
items=items.filter(o=>!(o&&o.idc&&o.idc.nom=='Gosse'));
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(items))}catch(_){}};
const st={f:'all',q:'',c:''};
const byId=id=>items.find(o=>o.id==id);
const stTxt=o=>o.s=='claim'?(o.t=='T'?'Demande envoyée':'Propriétaire prévenu'):o.s=='done'?(o.t=='T'?'Restitué':'Retrouvé'):'';
const pill=o=>o.s=='claim'?`<span class="lf-st">${stTxt(o)}</span>`:o.s=='done'?`<span class="lf-st ok">${stTxt(o)}</span>`:o.my=='report'?'<span class="lf-st me">Mon signalement</span>':'';
const nav=document.querySelector('#a2 nav.nav'),bg=document.querySelector('#a2 .bgc');
const sec=document.createElement('section');sec.className='bd';sec.id='lf1';
sec.innerHTML=`<h2>Perdu / trouvé</h2><div class="ph"><div class="sc">${bg?bg.outerHTML:''}
<div class="row"><button class="ib" data-go="a2" aria-label="Retour à Mon campus" style="transform:scaleX(-1)">${ic('chv',22)}</button><h1 class="t fl" style="font-size:24px">Perdu / trouvé</h1></div>
<section class="lf-h"><div class="lf-tkw" data-lftk></div><div class="lf-sts"><div><b data-lfn="T">0</b><span>à récupérer</span></div><div><b data-lfn="P">0</b><span>recherchés</span></div><button data-lff="arch" aria-label="Voir les archives : objets restitués"><b data-lfn="D">0</b><span>restitués · archives</span></button></div></section>
<div class="lf-bar"><label class="lf-s">${ic('se',18)}<input type="search" data-lfq placeholder="Rechercher…" aria-label="Rechercher un objet" autocomplete="off"></label><button class="lf-cta2" data-lfnew>${ic('plus',16)}Signaler</button></div>
<div class="seg" role="group" aria-label="Filtrer"><button data-lff="all" aria-pressed="true">Tous</button><button data-lff="T" aria-pressed="false">Trouvés</button><button data-lff="P" aria-pressed="false">Perdus</button><button data-lff="me" aria-pressed="false">Mes objets</button></div>
<div class="lf-list" data-lflist aria-live="polite"></div>

</div>${nav?nav.outerHTML:''}</div>`;
app.appendChild(sec);
const L=sec.querySelector('[data-lflist]');
const rows=()=>{const q=st.q.trim().toLowerCase();return items.filter(o=>(st.f=='arch'?o.s=='done':st.f=='me'?!!o.my:o.s!='done'&&(st.f=='all'||o.t==st.f))&&(!st.c||o.c==st.c)&&(!q||[o.n,o.l,o.c,o.x,nm(o),idl(o)].join(' ').toLowerCase().includes(q))).sort((a,b)=>(a.d<b.d?1:a.d>b.d?-1:0))};
/* Bandeau « Perdu » : point rouge + objet recherché, change toutes les 10 s */
const tkEl=sec.querySelector('[data-lftk]');let tkI=0,tkSig='',tkT=null;
const tkList=()=>items.filter(o=>o.t=='P'&&o.s=='open').sort((a,b)=>(a.d<b.d?1:a.d>b.d?-1:0));
const tkDraw=(anim)=>{if(!tkEl)return;const l=tkList();
 if(!l.length){tkEl.innerHTML='<div class="lf-tk off"><span class="lf-dot off"></span><span class="lf-tkt"><small>Aucune recherche en cours</small><b>Tout a été retrouvé</b></span></div>';return}
 const o=l[tkI%l.length];
 tkEl.innerHTML=`<button class="lf-tk${anim?' in':''}" data-lfo="${o.id}" aria-label="Objet perdu : ${esc(o.n)}, ${esc(o.l)}"><span class="lf-dot" aria-hidden="true"></span>${th(o)}<span class="lf-tkt"><small>PERDU · ${esc(dl(o.d))}</small><b>${esc(nm(o))}</b><small>${esc(o.idc?o.n+' · '+o.l:o.l)}</small></span>${l.length>1?`<span class="lf-tkn" aria-hidden="true">${(tkI%l.length)+1}/${l.length}</span>`:''}</button>`};
const tkSet=()=>{const l=tkList(),sig=l.map(o=>o.id).join(',');if(sig!=tkSig){tkSig=sig;tkI=0}tkDraw(false)};
if(!tkT)tkT=setInterval(()=>{if(!sec.offsetParent||document.hidden)return;const l=tkList();if(l.length<2)return;tkI=(tkI+1)%l.length;tkDraw(true)},10000);
const render=()=>{
 const r=rows();
 const card=o=>`<button class="lf-card" data-lfo="${o.id}" aria-label="${o.t=='T'?'Trouvé':'Perdu'} : ${esc(o.n)}, ${esc(o.l)}">${th(o)}<span class="lf-mm"><span class="lf-tgs"><span class="lf-tg${o.t=='P'?' pe':''}">${o.t=='T'?'Trouvé':'Perdu'}</span>${pill(o)}</span><b>${esc(nm(o))}</b><small>${ic('pin',13)}${esc(o.l)} · ${dl(o.d)}</small></span>${ic('chv',18)}</button>`;
 L.innerHTML=(st.f=='arch'?'<p class="lf-arch">Archives · objets rendus à leur propriétaire</p>':'')+(r.length?r.map(card).join(''):`<div class="lf-empty">${ic('se',28)}<b>${st.f=='arch'?'Aucun objet archivé':'Aucun objet ne correspond'}</b><span>${st.f=='arch'?'Les objets rendus à leur propriétaire arrivent ici.':'Essayez un autre mot, ou signalez l’objet vous-même.'}</span>${st.q.trim()?`<button class="lf-pri" style="--k:#5B3FB3;margin-top:6px" data-lfnew data-lfpre="${esc(st.q.trim())}">Signaler « ${esc(st.q.trim())} » comme perdu</button>`:''}</div>`);
 ['T','P'].forEach(k=>{const e=sec.querySelector('[data-lfn="'+k+'"]');if(e)e.textContent=items.filter(o=>o.t==k&&o.s=='open').length});
 const dn=sec.querySelector('[data-lfn="D"]');if(dn)dn.textContent=items.filter(o=>o.s=='done').length;
 sec.querySelectorAll('[data-lff]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lff==st.f));
 sec.querySelectorAll('[data-lfc2]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lfc2==st.c));
 tkSet();mcDraw();window.UJEV&&UJEV.syncLF(items,{nm,dl,pic})};
render();
/* ---------- feuille ---------- */
let sh=null,V={v:null,id:null,t:'T',cat:'Autre',ph:'',dep:DEP[1],man:false};
const shEl=()=>{if(sh)return sh;sh=document.createElement('div');sh.id='lfsh';sh.className='ed3-sh lf-sh';sh.setAttribute('role','dialog');sh.setAttribute('aria-modal','true');sh.setAttribute('aria-label','Objet perdu ou trouvé');document.body.appendChild(sh);return sh};
const head=(tg,titre,icon,col)=>`<div class="ed3-b" data-lfc></div><div class="ed3-p cs8 lf-p" style="--k:${C}"><div class="cs8-top"><i class="cs8-gr"></i><button class="cs8-x" data-lfx aria-label="Retour">${ic('chv',18)}<span>Retour</span></button><div class="cs8-hd"><span class="lf-ico" data-lfhi style="--ik:${col||C}">${icon}</span><div><span class="cs8-tg">${tg}</span><h3>${titre}</h3></div></div></div>`;
const row=(i,l,v)=>`<div class="cs8-r"><span class="cs8-ri">${ic(i,18)}</span><div><small>${l}</small><b>${v}</b></div></div>`;
const STOP=['des','les','une','avec','pour','dans','sur','aux','par'];
const tok=s=>nz(s).split(/[^a-z0-9]+/).filter(w=>w.length>2&&!STOP.includes(w));
const matches=o=>{const a=new Set(tok(o.n+' '+(o.x||'')+' '+nm(o)));return items.filter(x=>x!=o&&x.t!=o.t&&x.s=='open').map(x=>({x,s:(x.c==o.c?2:0)+tok(x.n+' '+(x.x||'')+' '+nm(x)).filter(w=>a.has(w)).length*3+(x.l==o.l?1:0)})).filter(m=>m.s>=3&&(!(o.idc&&m.x.idc)||nz(o.idc.nom)==nz(m.x.idc.nom))).sort((p,q)=>q.s-p.s).slice(0,3).map(m=>m.x)};
const matchBlock=o=>{if(o.s!='open')return '';const m=matches(o);return m.length?`<div class="lf-mt"><span class="lf-lb">${o.t=='T'?'Quelqu’un le cherche peut-être':'Objets trouvés qui pourraient correspondre'}</span>${m.map(x=>`<button class="lf-mc" data-lfo="${x.id}">${th(x)}<span class="fl"><b>${esc(nm(x))}</b><small>${esc(x.l)} · ${dl(x.d)}</small></span>${ic('chv',16)}</button>`).join('')}</div>`:''};
const objView=o=>{
 const T=o.t=='T',mine=o.my=='report';
 const pr=o.s=='open'&&!o.my?`<button class="lf-pri" data-lfclaim>${ic(T?'chk':'hrt',18)}${T?'C’est à moi':'Je l’ai trouvé'}</button>`
  :o.s=='claim'&&o.my=='claim'?`<button class="lf-pri" disabled>${ic('chk',18)}${stTxt(o)}</button><button class="lf-sec" data-lfcancel>Annuler ma demande</button>`
  :mine&&o.s!='done'?`<button class="lf-pri" data-lfdone>${ic('chk',18)}Marquer comme ${T?'restitué':'retrouvé'}</button>`:'';
 const note=o.s=='done'?`Cet objet est marqué comme ${T?'restitué':'retrouvé'}.`:o.s=='claim'&&o.my=='claim'?(T?'Vous serez contacté pour récupérer l’objet.':'Le propriétaire a reçu votre message.'):T?(o.idc?'Pour la récupérer, présentez une autre pièce d’identité à l’endroit indiqué.':'Pour récupérer l’objet, présentez-vous avec votre carte d’étudiant.'):'Le propriétaire est prévenu dans l’application. Votre numéro ne lui est transmis que si vous le renseignez.';
 return head(`${T?'Trouvé':'Perdu'} · ${esc(o.c)}`,esc(nm(o)),pic(o)?pim(o):gl(gk(o),32),kc(o))+
 `<div class="cs8-bd">${o.idc?idCard(o):o.ph?`<img class="lf-big" src="${o.ph}" alt="Photo de l’objet">`:''}<div class="cs8-l">${o.s!='open'?row('shd','Statut',`<span class="lf-pill${o.s=='claim'?' w':o.s=='done'?' ok':''}">${stTxt(o)}</span>`):''}${row('pin',T?'Trouvé':'Perdu',esc(o.l)+' · '+dl(o.d))}${o.x?row('doc','Description',esc(o.x)):''}${T&&o.w?row('bld','Où le récupérer',esc(o.w)):''}</div>
 ${matchBlock(o)}<p class="cs8-n">${note}</p><div class="lf-acts">${pr}<button class="lf-sec wa" data-lfwa>${ic('cht',18)}Partager sur WhatsApp</button>${mine&&o.s!='done'?`<button class="lf-sec" data-lfedit>${ic('pen',18)}Modifier mon signalement</button>`:''}${mine?`<button class="lf-sec dg" data-lfdel>Supprimer mon signalement</button>`:''}</div></div></div>`};
const claimView=o=>{
 const T=o.t=='T';
 return head(T?'Demande de restitution':'Vous avez trouvé cet objet',esc(o.n),gl(gk(o),32),kc(o))+
 `<div class="cs8-bd"><div class="lf-fm">${T?`<div><label class="lf-lb" for="lf-m">Un détail que seul le propriétaire connaît</label><textarea class="lf-in" id="lf-m" data-f="m" placeholder="Contenu, marque, rayure, fond d’écran…"></textarea><p class="lf-hint">Cela permet de vérifier que l’objet est bien à vous.</p></div>`
 :`<div><label class="lf-lb" for="lf-m">Où et quand l’avez-vous trouvé ?</label><textarea class="lf-in" id="lf-m" data-f="m" placeholder="Ex. : hier à 15 h, près de l’entrée du Restaurant U"></textarea></div>
 <div><span class="lf-lb">Où est l’objet ?</span><div class="lf-cc" data-lfdep>${DEP.map((d,i)=>`<button data-lfd="${i}" aria-pressed="${i==1}">${d}</button>`).join('')}</div></div>`}
 <div><label class="lf-lb" for="lf-p">Téléphone${T?'':' (facultatif)'}</label><input class="lf-in" id="lf-p" data-f="p" type="tel" inputmode="tel" autocomplete="tel" placeholder="+225 00 00 00 00 00"><p class="lf-hint">${T?'Utilisé uniquement pour vous joindre au sujet de cet objet.':'Transmis uniquement au propriétaire de l’objet.'}</p></div>
 <button class="lf-pri" data-lfsend>${ic('chk',18)}${T?'Envoyer ma demande':'Prévenir le propriétaire'}</button></div></div></div>`};
const newView=e=>head(e?'Modification':'Nouveau signalement',e?'Modifier mon signalement':'Signaler un objet',e?gl(gk(e),30):gl('plus',30),e?kc(e):0)+
 `<div class="cs8-bd"><div class="lf-fm">
 <div class="lf-tt" role="group" aria-label="Type de signalement"><button data-lft="T" aria-pressed="${!e||e.t=='T'}">J’ai trouvé un objet<small>Aider son propriétaire</small></button><button data-lft="P" aria-pressed="${!!e&&e.t=='P'}">J’ai perdu un objet<small>Le faire retrouver</small></button></div>
 <div><label class="lf-lb" for="lf-n">Objet</label><input class="lf-in" id="lf-n" data-f="n" maxlength="60" placeholder="Ex. : Clé USB noire" autocomplete="off" value="${esc(e&&e.n)}"></div>
 <div><span class="lf-lb">Catégorie</span><div class="lf-cc" data-lfcat>${CAT.map(([n,i])=>`<button data-lfk="${esc(n)}" aria-pressed="${n==(e?e.c:'Autre')}"><span class="lf-cg" style="--ck:${COL[n]}">${gl(i,14)}</span>${esc(n)}</button>`).join('')}</div></div>
 <div class="lf-idb" data-lfidb ${(e?e.c:'Autre')=='Papiers & cartes'?'':'hidden'}>
 <button class="lf-idt" data-lfidt aria-pressed="${V.idon!==false}">${ic('shd',20)}<span class="fl"><b>Protéger l’identité</b><small>On cache les informations personnelles de la carte</small></span></button>
 <div class="lf-idf" data-lfidf ${V.idon===false?'hidden':''}>
  <div class="lf-row2"><div><label class="lf-lb" for="lf-in">Nom</label><input class="lf-in" id="lf-in" data-f="inom" maxlength="40" autocomplete="off" placeholder="Ex. : Kouassi" value="${esc(IV().nom)}"></div><div><label class="lf-lb" for="lf-ip">Prénoms</label><input class="lf-in" id="lf-ip" data-f="ipre" maxlength="60" autocomplete="off" placeholder="Ex. : Awa Marie" value="${esc(IV().pre)}"></div></div>
  <div><span class="lf-lb">UFR (facultatif)</span><div class="lf-cc" data-lfiu>${IDU.map(u=>`<button data-lfu="${esc(u)}" aria-pressed="${IV().ufr==u}">${esc(u)}</button>`).join('')}</div></div>
  <div><span class="lf-lb">Niveau (facultatif)</span><div class="lf-cc" data-lfiv>${IDN.map(u=>`<button data-lfv="${esc(u)}" aria-pressed="${IV().niv==u}">${esc(u)}</button>`).join('')}</div></div>
  <div><span class="lf-lb">Photo de la carte (facultatif)</span><div data-lfip></div></div>
 </div>
</div>
 <div><label class="lf-lb" for="lf-l">Lieu</label><input class="lf-in" id="lf-l" data-f="l" list="lf-lieux" maxlength="60" placeholder="Où ? Ex. : Amphi B" autocomplete="off" value="${esc(e&&e.l)}"><datalist id="lf-lieux">${LIEUX.map(x=>`<option value="${x}">`).join('')}</datalist><div class="lf-cc lf-lc">${LIEUX.map(x=>`<button data-lfl="${x}" aria-pressed="false">${x}</button>`).join('')}</div></div>
 <div><label class="lf-lb" for="lf-d">Date</label><input class="lf-in" id="lf-d" data-f="d" type="date" value="${e?e.d:today}" max="${today}"></div>
 <div><label class="lf-lb" for="lf-x">Description (facultatif)</label><textarea class="lf-in" id="lf-x" data-f="x" maxlength="240" placeholder="Couleur, marque, signe particulier…">${esc(e&&e.x)}</textarea><p class="lf-hint" data-lfbt${e&&e.t=='P'?' hidden':''}>Gardez un détail pour vous : il servira à vérifier le propriétaire.</p></div>
 <div data-lfbt${e&&e.t=='P'?' hidden':''}><span class="lf-lb">Où est l’objet ?</span><div class="lf-cc" data-lfdep>${DEP.map((d,i)=>`<button data-lfd="${i}" aria-pressed="${d==((e&&e.w)||DEP[1])}">${d}</button>`).join('')}</div></div>
 <div data-lfbp${e&&e.t=='P'?'':' hidden'}><label class="lf-lb" for="lf-p">Téléphone</label><input class="lf-in" id="lf-p" data-f="p" type="tel" inputmode="tel" autocomplete="tel" placeholder="+225 00 00 00 00 00" value="${esc(e&&e.p)}"><p class="lf-hint">Jamais affiché : transmis seulement à la personne qui retrouve l’objet.</p></div>
 <div data-lfgp><span class="lf-lb">Photo (facultatif)</span><div data-lfpv></div></div>
 <p class="cs8-n">Votre signalement est visible par les étudiants de l’UJLoG. Si c’est une pièce d’identité, cachez les informations personnelles.</p>
 <button class="lf-pri" data-lfpub>${ic('chk',18)}${e?'Enregistrer les modifications':'Publier le signalement'}</button></div></div></div>`;
const phUI=()=>{const b=sh&&sh.querySelector('[data-lfpv]');if(!b)return;b.innerHTML=V.ph?`<div class="lf-pv"><img src="${V.ph}" alt="Aperçu de la photo"><button data-lfphx>Retirer</button></div>`:`<label class="lf-ph"><input type="file" accept="image/*" data-lffile hidden>${ic('cam',24)}<span><b>Ajouter une photo</b><small>Aide à reconnaître l’objet</small></span></label>`};
const draw=()=>{const e=shEl();const o=V.id&&byId(V.id);e.innerHTML=V.v=='new'?newView(V.edit&&byId(V.edit)):V.v=='claim'&&o?claimView(o):o?objView(o):newView();if(V.v=='new'||!o){phUI();idUI();idSync()}};
const openSh=(v,id)=>{V={v,id:id||null,t:'T',cat:'Autre',ph:'',dep:DEP[1],man:false,idon:true,idv:{}};CR.img=null;const e=shEl();draw();void e.offsetWidth;e.classList.add('on')};
const closeSh=()=>{if(sh)sh.classList.remove('on')};
const shrink=(f,cb)=>{const r=new FileReader();r.onerror=()=>cb('');r.onload=()=>{const im=new Image();im.onerror=()=>cb('');im.onload=()=>{try{const k=Math.min(1,640/Math.max(im.width,im.height)),cv=document.createElement('canvas');cv.width=Math.round(im.width*k);cv.height=Math.round(im.height*k);cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);cb(cv.toDataURL('image/jpeg',.72))}catch(_){cb(r.result)}};im.src=r.result};r.readAsDataURL(f)};
const val=k=>{const e=sh.querySelector('[data-f="'+k+'"]');return e?e.value.trim():''};
const upIco=()=>{idSync();const hi=sh&&sh.querySelector('[data-lfhi]');if(!hi||V.v!='new')return;const g=guess(val('n'));hi.innerHTML=gl(g&&g.c==V.cat?g.g:catIc(V.cat),30);hi.style.setProperty('--ik',COL[V.cat])};
const bad=(k)=>{const e=sh.querySelector('[data-f="'+k+'"]');if(e){e.classList.add('bad');e.focus()}};
/* ---------- identité : la carte telle quelle, zones sensibles floutées en mosaïque ---------- */
const CR={img:null,rects:[],cur:null};
const IV=()=>V.idv||{};
const idOn=()=>V.cat=='Papiers & cartes'&&V.idon!==false;
const idApply=o=>{if(idOn()){o.idc={nom:val('inom'),pre:val('ipre'),ufr:IV().ufr||'',niv:IV().niv||'',card:IV().card||''};delete o.ph}else delete o.idc};
const idSync=()=>{if(!sh)return;const b=sh.querySelector('[data-lfidb]');if(!b)return;const g=sh.querySelector('[data-lfgp]'),f=sh.querySelector('[data-lfidf]'),t=sh.querySelector('[data-lfidt]');b.hidden=V.cat!='Papiers & cartes';if(f)f.hidden=V.idon===false;if(t)t.setAttribute('aria-pressed',V.idon!==false);if(g)g.hidden=idOn()};
const nrm=r=>({x:Math.min(r.x,r.x+r.w),y:Math.min(r.y,r.y+r.h),w:Math.abs(r.w),h:Math.abs(r.h)});
const mePaint=(cv,guide)=>{const c=cv.getContext('2d'),w=cv.width,h=cv.height,bk=Math.max(10,Math.round(w/42));c.imageSmoothingEnabled=true;c.drawImage(CR.img,0,0);
 const all=guide&&CR.cur?CR.rects.concat([CR.cur]):CR.rects;
 all.forEach(q=>{const r=nrm(q),x=Math.max(0,Math.round(r.x)),y=Math.max(0,Math.round(r.y)),rw=Math.min(w-x,Math.round(r.w)),rh=Math.min(h-y,Math.round(r.h));if(rw<2||rh<2)return;
  const tw=Math.max(1,Math.round(rw/bk)),thh=Math.max(1,Math.round(rh/bk)),t=document.createElement('canvas');t.width=tw;t.height=thh;t.getContext('2d').drawImage(CR.img,x,y,rw,rh,0,0,tw,thh);
  c.imageSmoothingEnabled=false;c.drawImage(t,0,0,tw,thh,x,y,rw,rh);c.imageSmoothingEnabled=true;
  if(guide){c.save();c.strokeStyle='#5B3FB3';c.lineWidth=Math.max(2,w/300);c.strokeRect(x,y,rw,rh);c.restore()}})};
const meCount=()=>{const e=sh&&sh.querySelector('[data-lfmn]');if(e){const n=CR.rects.length;e.textContent=n?n+(n>1?' zones cachées':' zone cachée'):'Aucune zone cachée pour l’instant'}};
/* Recadrage automatique : on repère la pièce (différente du fond) et on garde seulement elle */
const autoCrop=src=>{try{
 const W=src.width,H=src.height,g=160,gh=Math.max(8,Math.round(g*H/W)),t=document.createElement('canvas');t.width=g;t.height=gh;
 const c=t.getContext('2d',{willReadFrequently:true});c.drawImage(src,0,0,g,gh);const d=c.getImageData(0,0,g,gh).data;
 const px=(x,y)=>{const i=(y*g+x)*4;return [d[i],d[i+1],d[i+2]]};
 const rw=Math.max(2,Math.round(g*.04)),rh=Math.max(2,Math.round(gh*.04)),ring=[];
 for(let y=0;y<gh;y++)for(let x=0;x<g;x++)if(x<rw||x>=g-rw||y<rh||y>=gh-rh)ring.push(px(x,y));
 const med=k=>{const a=ring.map(q=>q[k]).sort((u,v)=>u-v);return a[a.length>>1]};
 const bg=[med(0),med(1),med(2)],dist=q=>Math.hypot(q[0]-bg[0],q[1]-bg[1],q[2]-bg[2]);
 const rd=ring.map(dist).sort((u,v)=>u-v),thr=Math.min(110,Math.max(45,rd[Math.floor(rd.length*.7)]*2+25));
 const m=new Uint8Array(g*gh);for(let y=0;y<gh;y++)for(let x=0;x<g;x++)m[y*g+x]=dist(px(x,y))>thr?1:0;
 const er=new Uint8Array(g*gh);for(let y=1;y<gh-1;y++)for(let x=1;x<g-1;x++){let k=1;for(let j=-1;j<=1&&k;j++)for(let i=-1;i<=1;i++)if(!m[(y+j)*g+x+i]){k=0;break}er[y*g+x]=k}
 const cc=new Array(g).fill(0),rc=new Array(gh).fill(0);for(let y=0;y<gh;y++)for(let x=0;x<g;x++)if(er[y*g+x]){cc[x]++;rc[y]++}
 const cm=Math.max(...cc),rm=Math.max(...rc);if(cm<gh*.2||rm<g*.2)return null;
 const x0=cc.findIndex(v=>v>=cm*.4),x1=g-1-[...cc].reverse().findIndex(v=>v>=cm*.4),y0=rc.findIndex(v=>v>=rm*.4),y1=gh-1-[...rc].reverse().findIndex(v=>v>=rm*.4);
 const bw=(x1-x0+1)/g,bh=(y1-y0+1)/gh;if(bw*bh>.97||bw*bh<.12||bw<.3||bh<.3)return null;
 const mg=.02,sx=W/g,sy=H/gh,X=Math.max(0,Math.floor((x0-g*mg)*sx)),Y=Math.max(0,Math.floor((y0-gh*mg)*sy)),X2=Math.min(W,Math.ceil((x1+1+g*mg)*sx)),Y2=Math.min(H,Math.ceil((y1+1+gh*mg)*sy));
 const o=document.createElement('canvas');o.width=X2-X;o.height=Y2-Y;o.getContext('2d').drawImage(src,X,Y,o.width,o.height,0,0,o.width,o.height);return o}catch(_){return null}};
const idUI=()=>{const b=sh&&sh.querySelector('[data-lfip]');if(!b)return;const I=IV();
 if(CR.img){b.innerHTML=`<div class="lf-cr"><p class="lf-hint" style="margin:0">Passez le doigt pour entourer ce qu’il faut cacher : la date et le lieu de naissance, le numéro.</p><canvas data-lfcv aria-label="Carte : dessinez les zones à masquer"></canvas><span class="lf-mzr" data-lfmn></span>${CR.ac?`<button class="lf-sec" data-lfcrre>${CR.auto?'Annuler le recadrage automatique':'Recadrer automatiquement'}</button>`:''}<div class="lf-row2"><button class="lf-sec" data-lfmundo>Annuler la dernière zone</button><button class="lf-sec dg" data-lfcrx>Abandonner</button></div><button class="lf-pri" data-lfcrok>${ic('chk',18)}Valider la carte</button></div>`;
  const cv=b.querySelector('[data-lfcv]');cv.width=CR.img.width;cv.height=CR.img.height;mePaint(cv,true);meCount();return}
 b.innerHTML=I.card?`<div class="lf-idv2"><img class="lf-cardimg" src="${I.card}" alt="Carte avec informations masquées"><div class="lf-row2"><button class="lf-sec" data-lfidchg>Changer</button><button class="lf-sec dg" data-lfidpx>Retirer</button></div></div>`:`<label class="lf-ph"><input type="file" accept="image/*" data-lfidfile hidden>${ic('cam',24)}<span><b>Ajouter la photo de la carte</b><small>Vous cacherez ensuite les infos personnelles</small></span></label>`};
document.addEventListener('click',e=>{
 if(!sh||!sh.contains(e.target))return;const t=s=>e.target.closest(s);let b;V.idv=V.idv||{};
 if(t('[data-lfidt]')){V.idon=V.idon===false;idSync();return}
 if(b=t('[data-lfu]')){const v=b.dataset.lfu;V.idv.ufr=V.idv.ufr==v?'':v;b.parentNode.querySelectorAll('[data-lfu]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.lfu==V.idv.ufr));return}
 if(b=t('[data-lfv]')){const v=b.dataset.lfv;V.idv.niv=V.idv.niv==v?'':v;b.parentNode.querySelectorAll('[data-lfv]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.lfv==V.idv.niv));return}
 if(t('[data-lfidpx]')||t('[data-lfidchg]')){V.idv.card='';idUI();return}
 if(t('[data-lfcrx]')){CR.img=null;CR.rects=[];idUI();return}
 if(t('[data-lfcrre]')){CR.auto=!CR.auto;CR.img=CR.auto?CR.ac:CR.orig;CR.rects=[];idUI();return}
 if(t('[data-lfmundo]')){CR.rects.pop();const cv=sh.querySelector('[data-lfcv]');if(cv){mePaint(cv,true);meCount()}return}
 if(t('[data-lfcrok]')){if(!CR.rects.length){say('Cachez au moins la date de naissance et le numéro');return}const cv=document.createElement('canvas');cv.width=CR.img.width;cv.height=CR.img.height;mePaint(cv,false);V.idv.card=cv.toDataURL('image/jpeg',.85);CR.img=null;CR.rects=[];idUI();return}
});
document.addEventListener('change',e=>{const f=e.target.closest&&e.target.closest('[data-lfidfile]');if(!f||!f.files||!f.files[0])return;const r=new FileReader();r.onerror=()=>say('Photo illisible, essayez-en une autre');r.onload=()=>{const im=new Image();im.onerror=()=>say('Photo illisible, essayez-en une autre');im.onload=()=>{const k=Math.min(1,1000/Math.max(im.width,im.height)),cv=document.createElement('canvas');cv.width=Math.round(im.width*k);cv.height=Math.round(im.height*k);cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);const ac=autoCrop(cv);CR.orig=cv;CR.ac=ac;CR.auto=!!ac;CR.img=ac||cv;CR.rects=[];CR.cur=null;idUI();if(ac)say('Carte recadrée automatiquement')};im.src=r.result};r.readAsDataURL(f.files[0])});
const mePt=(e,cv)=>{const r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)*cv.width/r.width,y:(e.clientY-r.top)*cv.height/r.height}};
document.addEventListener('pointerdown',e=>{const cv=e.target.closest&&e.target.closest('[data-lfcv]');if(!cv||!CR.img)return;const p=mePt(e,cv);CR.cur={x:p.x,y:p.y,w:0,h:0};try{cv.setPointerCapture(e.pointerId)}catch(_){}e.preventDefault()});
document.addEventListener('pointermove',e=>{if(!CR.cur||!CR.img)return;const cv=sh&&sh.querySelector('[data-lfcv]');if(!cv)return;const p=mePt(e,cv);CR.cur.w=p.x-CR.cur.x;CR.cur.h=p.y-CR.cur.y;mePaint(cv,true)});
const meEnd=()=>{if(!CR.cur)return;const r=nrm(CR.cur);CR.cur=null;if(r.w>12&&r.h>8)CR.rects.push(r);const cv=sh&&sh.querySelector('[data-lfcv]');if(cv){mePaint(cv,true);meCount()}};
['pointerup','pointercancel'].forEach(n=>document.addEventListener(n,meEnd));
document.addEventListener('click',e=>{
 const t=s=>e.target.closest(s);let b;
 if(b=t('[data-lfnew]')){openSh('new');if(b.dataset.lfpre){const pb=sh.querySelector('[data-lft="P"]');if(pb)pb.click();const n=sh.querySelector('[data-f="n"]');if(n){n.value=b.dataset.lfpre;n.dispatchEvent(new Event('input',{bubbles:true}))}}return}
 if(b=t('[data-lfo]')){openSh('obj',b.dataset.lfo);return}
 if(b=t('[data-lff]')){st.f=b.dataset.lff;render();return}
 if(b=t('[data-lfc2]')){st.c=b.dataset.lfc2;render();return}
 if(!sh||!sh.contains(e.target))return;
 if(t('[data-lfc]')){closeSh();return}
 if(t('[data-lfx]')){if(V.v=='claim'){V.v='obj';draw()}else closeSh();return}
 if(b=t('[data-lft]')){V.t=b.dataset.lft;sh.querySelectorAll('[data-lft]').forEach(x=>x.setAttribute('aria-pressed',x==b));sh.querySelectorAll('[data-lfbt]').forEach(x=>x.hidden=V.t!='T');sh.querySelectorAll('[data-lfbp]').forEach(x=>x.hidden=V.t!='P');return}
 if(b=t('[data-lfk]')){V.cat=b.dataset.lfk;V.man=true;upIco();sh.querySelectorAll('[data-lfk]').forEach(x=>x.setAttribute('aria-pressed',x==b));return}
 if(b=t('[data-lfd]')){V.dep=DEP[+b.dataset.lfd];b.parentNode.querySelectorAll('[data-lfd]').forEach(x=>x.setAttribute('aria-pressed',x==b));return}
 if(t('[data-lfphx]')){V.ph='';phUI();return}
 if(b=t('[data-lfl]')){const i=sh.querySelector('[data-f="l"]');if(i){i.value=b.dataset.lfl;i.classList.remove('bad')}return}
 if(t('[data-lfwa]')){const o=byId(V.id);if(!o)return;const tx=shareTx(o);window.open('https://wa.me/?text='+encodeURIComponent(tx),'_blank');return}
 if(t('[data-lfrep]')){say('Merci, l’annonce sera vérifiée par un responsable');return}
 if(t('[data-lfedit]')){const o=byId(V.id);if(!o)return;V={v:'new',id:o.id,edit:o.id,t:o.t,cat:o.c,ph:o.ph||'',dep:o.w||DEP[1],man:true,idon:!!o.idc,idv:Object.assign({},o.idc||{})};CR.img=null;draw();return}
 if(t('[data-lfclaim]')){V.v='claim';draw();return}
 if(t('[data-lfshare]')){const o=byId(V.id);if(!o)return;const tx=shareTx(o);if(navigator.share){navigator.share({title:'Perdu / trouvé · My UJLoG',text:tx}).catch(()=>{})}else{try{navigator.clipboard.writeText(tx)}catch(_){}say('Texte copié')}return}
 if(t('[data-lfcancel]')){const o=byId(V.id);if(o){o.s='open';delete o.my;delete o.claim;save();render();draw();say('Demande annulée')}return}
 if(t('[data-lfdone]')){const o=byId(V.id);if(o){o.s='done';save();render();draw();say(o.t=='T'?'Objet marqué comme restitué':'Objet marqué comme retrouvé')}return}
 if(t('[data-lfdel]')){const o=byId(V.id);if(o){items=items.filter(x=>x!=o);save();render();closeSh();say('Signalement supprimé')}return}
 if(t('[data-lfsend]')){const o=byId(V.id);if(!o)return;
  if(!val('m')){bad('m');say(o.t=='T'?'Indiquez un détail qui prouve que l’objet est à vous':'Dites où et quand vous l’avez trouvé');return}
  if(o.t=='T'&&val('p').replace(/\D/g,'').length<8){bad('p');say('Renseignez un numéro de téléphone valide');return}
  o.s='claim';o.my='claim';o.claim={m:val('m'),p:val('p'),w:V.dep};save();render();V.v='obj';draw();
  say(o.t=='T'?'Demande envoyée. Vous serez contacté pour récupérer l’objet.':'Merci ! Le propriétaire est prévenu.');return}
 if(t('[data-lfpub]')){
  if(!val('n')){bad('n');say('Indiquez le nom de l’objet');return}
  if(!val('l')){bad('l');say('Indiquez le lieu');return}
  if(idOn()){if(!val('inom')){bad('inom');say('Indiquez le nom inscrit sur la pièce');return}if(!val('ipre')){bad('ipre');say('Indiquez les prénoms');return}}
  if(V.t=='P'&&val('p').replace(/\D/g,'').length<8){bad('p');say('Renseignez un téléphone pour vous joindre');return}
  if(V.edit){const o=byId(V.edit);if(!o)return;o.t=V.t;o.n=val('n');o.c=V.cat;o.l=val('l');o.d=val('d')||today;o.x=val('x');if(V.ph)o.ph=V.ph;else delete o.ph;idApply(o);if(V.t=='T'){o.w=V.dep;delete o.p}else{o.p=val('p');delete o.w}
   save();render();V={v:'obj',id:o.id};draw();say('Modifications enregistrées');return}
  const o={id:'u'+Date.now(),t:V.t,n:val('n'),c:V.cat,l:val('l'),d:val('d')||today,x:val('x'),s:'open',my:'report'};
  if(V.ph)o.ph=V.ph;idApply(o);if(V.t=='T')o.w=V.dep;else o.p=val('p');
  items.unshift(o);save();st.f='all';st.q='';st.c='';const q=sec.querySelector('[data-lfq]');if(q)q.value='';render();
  const sc=sec.querySelector('.sc');if(sc)sc.scrollTo({top:0,behavior:'smooth'});
  const mt=matches(o).length;
  if(mt){V={v:'obj',id:o.id};draw();say(o.t=='P'?'Publié. Des objets trouvés pourraient correspondre !':'Publié. Quelqu’un cherche peut-être cet objet !')}
  else{closeSh();say(V.t=='T'?'Merci ! Votre signalement est publié.':'Signalement publié. Vous serez prévenu si on le retrouve.')}}
});
document.addEventListener('input',e=>{if(sh&&e.target.matches&&e.target.matches('[data-f="n"]')&&sh.contains(e.target)){const g=guess(e.target.value);if(g&&!V.man){V.cat=g.c;sh.querySelectorAll('[data-lfk]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.lfk==g.c))}upIco()}if(e.target.matches('[data-lfq]')){st.q=e.target.value;render()}if(e.target.classList&&e.target.classList.contains('bad'))e.target.classList.remove('bad')});
document.addEventListener('change',e=>{const f=e.target.closest&&e.target.closest('[data-lffile]');if(!f||!f.files||!f.files[0])return;shrink(f.files[0],d=>{if(!d){say('Photo illisible, essayez-en une autre');return}V.ph=d;phUI()})});
function mcDraw(){const tr=document.querySelector('#a2 .m28-qb[data-go="lf1"] .mc-tr');if(!tr)return;
 const by=(a,b)=>a.d<b.d?1:a.d>b.d?-1:0,op=items.filter(o=>o.s=='open');
 const P=op.filter(o=>o.t=='P').sort(by),T=op.filter(o=>o.t=='T').sort(by);
 let l=[...P.slice(0,2),...T.slice(0,1)];if(l.length<3)l=[...l,...[...P.slice(2),...T.slice(1)].sort(by)].slice(0,3);
 if(!l.length){tr.innerHTML='<span class="mc-s mc-o"><span class="mm"><b>Aucun objet signalé</b><small>Tout a été retrouvé</small></span></span>';return}
 tr.innerHTML=l.concat([l[0]]).map(o=>{const P=o.t=='P';return `<span class="mc-s mc-o"><span class="im" style="--k:${kc(o)}">${pic(o)?pim(o):gl(gk(o),40)}</span><span class="mm"><span class="tg${P?' pe':''}">${P?'Perdu':'Trouvé'}</span><b>${esc(nm(o))}</b><small>${esc(o.l)} · ${dl(o.d)}</small></span></span>`}).join('')}
mcDraw();
})();

