
(()=>{
/* v102 · Marketplace = vitrine de Siam's Boutique (MA BOUTIQUE V46).
   Le code de la vitrine client (accueil, catégories, fiche article, panier, paiement, suivi de commande)
   est copié tel quel dans <script id="mkBoutiqueSrc"> et s'exécute dans la marketplace, branché sur les
   mêmes boutiques (Supabase) que l'ancienne boutique. */
const UJ=window.UJ_DB||{};const OWN=!!(UJ.url&&UJ.key);
const SB=OWN?UJ.url:'',KEY=OWN?UJ.key:'';
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fold=s=>String(s==null?'':s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const WMH='<span class="mk-wm"><span class="mk-wn">UJL<i>o</i>G</span><span class="mk-ws">Marketplace</span></span>';
const CHV='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
const SRCH='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>';
const TICK='<svg class="mk-tick" viewBox="0 0 24 24" aria-label="Boutique vérifiée" role="img"><circle cx="12" cy="12" r="11" fill="#1D9BF0"/><path d="m7.4 12.4 3 3 6.2-6.6" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const PAL=['#E11D48','#2563EB','#0891B2','#F97316','#475569','#0F766E','#7C3AED','#15803D'];
const TYPES={'vente-ligne':'Boutique en ligne','restauration':'Restauration'};
const ini=n=>String(n||'').split(/\s+/).filter(w=>/^[A-Za-zÀ-ÿ0-9]/.test(w)).slice(0,2).map(w=>w[0]).join('').toUpperCase()||'B';
const hue=n=>{let h=0;for(const c of String(n||''))h=(h*31+c.charCodeAt(0))>>>0;return PAL[h%PAL.length]};
const logo=(s,z)=>s.photo_url?'<img class="mk-sl" style="width:'+z+'px;height:'+z+'px;object-fit:cover" src="'+esc(s.photo_url)+'" alt="" loading="lazy">':'<span class="mk-sl" style="--c:'+hue(s.name)+';width:'+z+'px;height:'+z+'px;font-size:'+Math.round(z*.38)+'px" aria-hidden="true">'+esc(ini(s.name))+'</span>';
const toast=t=>{document.getElementById('ujToast')?.remove();const d=document.createElement('div');d.id='ujToast';d.textContent=t;d.style.cssText='position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:100003;max-width:84vw;padding:12px 18px;border-radius:14px;background:#0B1630;color:#fff;font:600 13.5px/1.4 system-ui;text-align:center';document.body.appendChild(d);setTimeout(()=>d.remove(),2400)};

const SRC={};
const ujLoadSrc=n=>{try{const x=new XMLHttpRequest();x.open('GET',n.getAttribute('data-src'),false);x.send();return x.status===200?x.responseText:''}catch(e){return ''}};
const getSrc=(id)=>{id=id||'mkBoutiqueSrc';if(SRC[id]==null){const n=document.getElementById(id);SRC[id]=(n?(n.textContent||ujLoadSrc(n)):'').replace(/<@@S@@\/script/g,'<'+'/script').replace(/<@@C@@!--/g,'<'+'!--');if(id==='mkBoutiqueSrc'){SRC[id]=SRC[id].replace('</head>','<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;800&family=Figtree:wght@400;500;600;700;800&display=swap"><style id="ujGreen">:root{--ink:#0B1630;--indigo:#15803D;--indigo-dark:#0F6B31;--indigo-tint:#E4F5EA;--cyan:#3DBE6A;--mango:#15803D;--mango-dark:#0F6B31;--mango-tint:#E4F5EA;--siams-orange:#15803D;--siams-orange-dark:#0F6B31;--text:#0B1630;--action:#15803D;--action-dark:#0F6B31;--action-tint:#E4F5EA;--action-shadow:rgba(21,128,61,.38);--accent-1:#0F6B31;--accent-2:#15803D}#bottom-nav{display:none!important}html body,html body *:not(svg):not(path):not([class*=mono]){font-family:"Figtree",system-ui,sans-serif!important}html body h1,html body h2,html body h3,html body .t,html body .jm-hd,html body .page-title,html body .home-section-row h3{font-family:"Bricolage Grotesque","Figtree",system-ui,sans-serif!important;letter-spacing:-.01em}html[data-theme=dark]{filter:invert(1) hue-rotate(180deg)}html[data-theme=dark] body{background:var(--paper,#fff)}html[data-theme=dark] img,html[data-theme=dark] video,html[data-theme=dark] canvas,html[data-theme=dark] .leaflet-container,html[data-theme=dark] [style*=background-image],html[data-theme=dark] .jm-hd.fl,html[data-theme=dark] .jm-ban,html[data-theme=dark] .jm-av{filter:invert(1) hue-rotate(180deg)}</style></head>').replace('content="#0B0E17"','content="#0B1630"')}}return SRC[id]};
const st={root:null};
window.addEventListener('message',e=>{
 const d=e.data;if(!d||!d.ujmk||!st.root)return;
 if(![].some.call(st.root.querySelectorAll('iframe'),f=>f.contentWindow===e.source))return;
 if(d.ujmk==='store')return openStore(String(d.slug||''),String(d.name||''),d.id?String(d.id):null);
 if(d.ujmk==='checkout'){const l=(Array.isArray(d.queue)?d.queue:[]).filter(x=>x&&x.slug).map(x=>({slug:String(x.slug),name:String(x.name||'Boutique')}));if(!l.length)return;st.q={list:l,i:0};return qOpen(0)}
 if(d.ujmk==='next'){if(st.q&&st.q.i+1<st.q.list.length)qOpen(st.q.i+1);return}
 if(d.ujmk==='qdone')return back();
 if(d.ujmk==='simexit')return back();
 if(d.ujmk==='plans'){back();return partSheet(true)}
 
});
/* Profil étudiant UJLoG transmis à la marketplace : plus de compte à créer pour commander */
const me=()=>{try{const U=window.UJX||{};const nom=String(U.nom||'').trim(),pre=String(U.pre||'').trim(),name=(pre+' '+nom).trim();let id='';try{id=String((window.UJID?window.UJID():U.id)||'')}catch(e){}
 return (name||U.tel||id)?{id:id,nom:nom,pre:pre,name:name,tel:String(U.tel||''),em:String(U.em||''),ufr:String(U.ufr||''),nv:String(U.nv||'')}:null}catch(e){return null}};
const UJNAV='<style id="ujNavApp">html body #client-nav.client-nav{position:fixed!important;left:14px!important;right:14px!important;bottom:calc(14px + env(safe-area-inset-bottom,0px))!important;transform:none!important;width:auto!important;max-width:452px!important;margin:0 auto!important;height:58px!important;padding:4px!important;gap:0!important;border-radius:29px!important;border:1px solid rgba(255,255,255,.6)!important;background:rgba(255,255,255,.9)!important;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:0 8px 26px rgba(11,22,48,.22)!important;align-items:stretch!important;z-index:50}:root[data-theme=dark] body #client-nav.client-nav{background:rgba(15,24,48,.9)!important;border-color:rgba(255,255,255,.12)!important}html body #client-nav .nav-item,html body #client-nav .nav-item.active{flex:1!important;min-height:0!important;height:auto!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:1px!important;padding:0!important;border-radius:23px!important;background:transparent!important;box-shadow:none!important;color:var(--text-soft,#5A6580)!important}html body #client-nav .nav-item.active{color:var(--text,#0B1630)!important}html body #client-nav .nav-indicator{display:none!important}html body #client-nav .nav-item svg{width:22px!important;height:22px!important;transform:none!important}html body #client-nav .nav-item .nav-label{font-size:10px!important;font-weight:600!important}html body #client-nav .nav-item.active .nav-label{font-weight:800!important}html body #client-nav .cn-badge{top:5px!important;right:calc(50% - 20px)!important}</style>';
const MKFIX='<style>html[data-mkh="1"] #home-empty,html[data-mkh="1"] #shop-empty,html[data-mkh="1"] [id^="shop-empty__"],html[data-mkh="1"] [id^="home-empty__"]{display:none!important}html[data-mkm="1"] #sheet,html[data-mkm="1"] #overlay,html[data-mkm="1"] .sheet,html[data-mkm="1"] .menu-item{display:none!important}</style>';
function frame(box,o){
 const f=document.createElement('iframe');f.className='mk-if';f.title=o.title||'Boutique';
 if(o.slug)f.dataset.slug=o.slug;if(o.market)f.dataset.market='1';if(o.sell)f.dataset.sell='1';if(o.product)f.dataset.product=o.product;
 f.setAttribute('allow','geolocation; camera; clipboard-write; fullscreen');
 box.querySelector('.mk-load')?.remove();const ld=document.createElement('div');ld.className='mk-load';ld.setAttribute('role','status');ld.innerHTML='<span class="mk-spin"></span>';box.appendChild(ld);f.style.visibility='hidden';let tk=0;const fin=()=>{clearInterval(iv);f.style.visibility='';ld.remove()};const iv=setInterval(()=>{tk++;try{const r=f.contentDocument&&f.contentDocument.getElementById('page-root');if((r&&r.children.length)||tk>75)fin()}catch(e){if(tk>75)fin()}},120);
 const cfg={market:!!o.market,slug:o.slug||null,product:o.product||null,q:o.q||null,u:me(),dark:dk(),sim:!!o.sell};
 const html=getSrc(o.sell?'mkConsoleSrc':null).replace('</head>',UJNAV+MKFIX+'</head>').replace('<head>','<head><script>window.__UJCFG='+JSON.stringify(cfg).replace(/</g,'\\u003c')+';document.documentElement.setAttribute("data-theme",window.__UJCFG.dark?"dark":"light");document.documentElement.setAttribute("data-mkh",(window.__UJCFG.sim||(window.__UJCFG.market&&!window.__UJCFG.slug))?"1":"");document.documentElement.setAttribute("data-mkm",window.__UJCFG.sim?"":"1");</'+'script>');
 f.srcdoc=html;box.appendChild(f);return f;
}
function qOpen(i){const q=st.q;if(!q||!q.list[i])return;q.i=i;const s=q.list[i],nx=q.list[i+1];openStore(s.slug,s.name,null,false,{pos:i+1,total:q.list.length,next:nx?nx.name:''})}
function openStore(slug,name,product,sell,q){
 const r=st.root;if(!r||(!slug&&!sell))return;
 const ov=r.querySelector('.mk-ov');
 ov.innerHTML='';
 frame(ov,{slug:slug,product:product,sell:sell,title:name,q:q||null});
 r.classList.add('inshop');if(sell)r.classList.add('insell-auth');r.querySelector('.mk-ttl').textContent=(name||'Boutique')+(q?' · commande '+q.pos+'/'+q.total:'');
}
function back(){
 const r=st.root;if(!r)return;
 if(r.classList.contains('inshop')){r.querySelector('.mk-ov').innerHTML='';r.classList.remove('inshop');r.classList.remove('insell-auth');st.q=null;try{const mf=r.querySelector('.mk-fr>iframe');mf&&mf.contentWindow.postMessage({ujmk:'refresh',u:me()},(location.origin==String(null)?String.fromCharCode(42):location.origin))}catch(e){}r.querySelector('.mk-ttl').innerHTML=WMH;return}
 close();
}
function close(){st.root&&st.root.remove();st.root=null}
window.addEventListener('message',function(e){try{var d=e.data;if(d&&d.ujmk==='route'&&st.root&&st.root.classList.contains('inshop')){var AUTH=/^(register|login|activation-code|verify-otp|account-contract|account-contract-read|account-contract-notice|account-id|business-type)$/.test(d.name);st.root.classList.toggle('insell-auth',AUTH&&!!st.root.querySelector('.mk-ov iframe[data-sell]'))}}catch(x){}});

const dk=()=>{const t=document.documentElement.dataset.theme;return t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches)};
function pushTheme(){const r=st.root;if(!r)return;const d=dk();r.classList.toggle('dk',d);r.querySelectorAll('iframe').forEach(f=>{try{f.contentWindow.postMessage({ujmk:'theme',dark:d},(location.origin==String(null)?String.fromCharCode(42):location.origin))}catch(e){}})}
try{new MutationObserver(pushTheme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});matchMedia('(prefers-color-scheme: dark)').addEventListener('change',pushTheme)}catch(e){}
function act(t){
 const a=t.dataset.a;
 if(a=='close')return back();
 if(a=='sell')return partSheet();
}
function open(){
 document.getElementById('mkOv')?.remove();st.root&&st.root.remove();
 const r=document.createElement('div');r.id='mkV';r.setAttribute('role','dialog');r.setAttribute('aria-label','Marketplace');st.root=r;
 const lg0='<span class="mk-lg"><img alt="" src="data:image/webp;base64,UklGRgQDAABXRUJQVlA4WAoAAAAQAAAAXwAAXwAAQUxQSGgAAAABcOS2jSTp/5/2qbuSlHr2JSImgNpsytRsPSCCPZFsiGZZRGsiWxDdpQgvRPlSIn0i2gcRv4io3wWRvwPy9//nR+y4A3DjLsCMi8CLYyvOOnEpGLHqw7oNpSZUe1BvQasB/XsxdRdqAVZQOCB2AgAA8A8AnQEqYABgAD5tMpNHJCMhoS1TOGCADYliANG5yD6f85xw/ZPwEHXoy8RDpHeYDdAOlE/mfqAdJd+5uEIfzNDKvGC3w3AYcIeb5mTkWbUURwk+ze2xhW+CV96/mPhnGK8SOiV7RX0JZ5TTulHPHvFRW8xg1KkA/THtTLtgJNrp8fbbgyWdsAD+vyiY/8XDGMv/ZR2vmSxDJ1qLV+3vx0ZAB+hJsi38kZIOD/3SXdFbmRtj5I3FFP98X+yRlVXAWkJTqZ7jsRXwseOQ6iObf2rr7lVQ8gWgAA73vNUlnRE71G1cr3V5Y9Jb8Pe/1OADmrmwoKO0t65qKgHsOa4B3BzAEu55EmFi3fNeBc1exlrcIMERZBTdoFdZJJIZ/ZSfNvBFscHh1knZ/MsdRyEEqvmcRhx3p7HOi1yFWvKcaRsIlJPcm15pg3mm+fPREDH+8bfvk/SX3jwRYz0YZdBi5sfecd3pekQ1XeBhO2aMuN5leDHfHm7bnVW+ThXJ8DegXYOzi3ljfoPQJpHB91zsduEFufBYJV7+4YbJSt3VOHxppynsGaCOvgLKTZ486gMmVQPP7A5b4MY6b/qp8s2FLHx79wLTj3t5ssbN/wUv9VmYJyKvSKtafYOF6PXm/xeyFGuxA8cbMRWIoXorUco3lnmCzru6PQtSJYbA6HqJ6KzuyiEyIi1eCScXBmTnhkAsXr3iicHkcWFJ0AFzsh10duwEPKf7/4uiRkQNwRCxBwxmgABWDhS39j0jJoU5XR4JZHQLHhh6Qbh7dVy/vxe9CRDpgqYLpuAowACD9rRaaAVWuR/Yvew4bDwfZQk5z4StRQ6x2AAA" style="width:30px;height:30px;border-radius:9px;display:block"></span>';const WM=WMH;const bag=document.querySelector('.hd4 .ib.mkbtn .mkbag');const lg=bag?'<span class="mk-lg">'+bag.outerHTML+'</span>':lg0;
 r.innerHTML='<div class="mk-bar"><button class="mk-ib" data-a="close" aria-label="Retour">'+CHV+'</button>'+lg+'<b class="mk-ttl">'+WM+'</b><button class="mk-sell" data-a="sell">Partenaire</button></div>'
  +'<div class="mk-fr"><div class="mk-ov"></div></div>';
 r.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(t&&r.contains(t))act(t)});
 r.addEventListener('keydown',e=>{if(e.key=='Escape')back()});
 document.body.appendChild(r);r.classList.toggle('dk',dk());
 frame(r.querySelector('.mk-fr'),{market:true,title:'Marketplace'});
}
/* v113 · Vendre un article (annonce d'étudiant) */
const KEY_A='ujmk_annonces',CATS=['Livres et cours','Téléphones et accessoires','Vêtements','Informatique','Logement et meubles','Nourriture','Services','Autre'];
const sty=document.createElement('style');sty.textContent='#mkSell{position:absolute;inset:0;z-index:5;overflow:auto;background:#fff;color:#111;padding:16px 16px 40px;font:15px/1.4 system-ui,sans-serif}#mkV.dk #mkSell{background:#12161c;color:#eef1f5}#mkSell h2{font-size:20px;margin:0 0 4px}#mkSell p{margin:0 0 14px;color:#667}#mkSell label{display:block;font-weight:700;font-size:13px;margin:12px 0 5px}#mkSell input,#mkSell select,#mkSell textarea{width:100%;box-sizing:border-box;border:1.5px solid #d9dde3;border-radius:12px;padding:11px 12px;font:inherit;background:transparent;color:inherit}#mkSell textarea{min-height:84px}#mkSell .r2{display:grid;grid-template-columns:1fr 1fr;gap:10px}#mkSell .ph{display:flex;gap:8px;flex-wrap:wrap}#mkSell .ph img{width:72px;height:72px;object-fit:cover;border-radius:10px}#mkSell .ad{width:72px;height:72px;border:1.5px dashed #9aa3b0;border-radius:10px;display:grid;place-items:center;font-size:26px;color:#667}#mkSell .go{width:100%;margin-top:18px;border:0;border-radius:12px;padding:14px;background:#15803D;color:#fff;font:700 16px inherit}#mkSell .cl{float:right;border:0;background:none;font-size:26px;color:inherit}#mkSell .it{display:flex;gap:10px;align-items:center;padding:10px 0;border-top:1px solid #e3e6eb}#mkSell .it img{width:48px;height:48px;border-radius:8px;object-fit:cover;background:#e5e7eb}#mkSell .it div{flex:1;min-width:0}#mkSell .it small{display:block;color:#667}#mkSell .it button{border:0;background:none;color:#c0392b;font-weight:700}#mkSell .sh{margin-top:16px;background:none;border:0;color:#15803D;font-weight:700;padding:0}';document.head.appendChild(sty);
const rd=()=>{try{return JSON.parse(localStorage.getItem(KEY_A)||'[]')}catch(e){return[]}},wr=l=>{try{localStorage.setItem(KEY_A,JSON.stringify(l))}catch(e){toast('Mémoire pleine : retirez une annonce')}};
const shrink=f=>new Promise(ok=>{const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const k=Math.min(1,640/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);ok(c.toDataURL('image/jpeg',.75))};i.onerror=()=>ok('');i.src=r.result};r.onerror=()=>ok('');r.readAsDataURL(f)});
function sellSheet(){const r=st.root;if(!r)return;r.querySelector('#mkSell')?.remove();const u=me()||{};let ph=[];const d=document.createElement('div');d.id='mkSell';
 const draw=()=>{const L=rd();d.innerHTML='<button class="cl" data-s="x" aria-label="Fermer">×</button><h2>Vendre un article</h2><p>Votre annonce est publiée après validation par un responsable.</p><label>Photos (3 maximum)</label><div class="ph">'+ph.map(x=>'<img alt="" src="'+x+'">').join('')+(ph.length<3?'<label class="ad" style="margin:0">+<input type="file" accept="image/*" hidden data-s="f"></label>':'')+'</div><label>Titre</label><input id="sT" maxlength="70" placeholder="Ex. Calculatrice Casio fx-92"><div class="r2"><div><label>Prix (FCFA)</label><input id="sP" inputmode="numeric" placeholder="5000"></div><div><label>État</label><select id="sE"><option>Neuf</option><option selected>Bon état</option><option>Usé</option></select></div></div><label>Catégorie</label><select id="sC">'+CATS.map(c=>'<option>'+esc(c)+'</option>').join('')+'</select><label>Description</label><textarea id="sD" maxlength="400" placeholder="Détails utiles pour l’acheteur"></textarea><label>Téléphone</label><input id="sH" inputmode="tel" value="'+esc(u.tel||'')+'" placeholder="07 00 00 00 00"><button class="go" data-s="ok">Envoyer pour validation</button>'+(L.length?'<h2 style="margin-top:26px;font-size:17px">Mes annonces</h2>'+L.map((a,i)=>'<div class="it"><img alt="" src="'+(a.ph&&a.ph[0]||'')+'"><div><b>'+esc(a.t)+'</b><small>'+esc(a.p)+' F · En attente de validation</small></div><button data-s="del" data-i="'+i+'">Retirer</button></div>').join(''):'')+(OWN?'<button class="sh" data-s="shop">Ouvrir une boutique complète</button>':'')};
 draw();r.appendChild(d);
 d.addEventListener('change',async e=>{if(e.target.dataset.s!=='f'||!e.target.files[0])return;const v=await shrink(e.target.files[0]);if(v){const k={t:d.querySelector('#sT').value,p:d.querySelector('#sP').value,h:d.querySelector('#sH').value,c:d.querySelector('#sC').value,d:d.querySelector('#sD').value};ph.push(v);draw();d.querySelector('#sT').value=k.t;d.querySelector('#sP').value=k.p;d.querySelector('#sH').value=k.h;d.querySelector('#sC').value=k.c;d.querySelector('#sD').value=k.d}});
 d.addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(!b)return;const a=b.dataset.s;if(a==='x')return d.remove();if(a==='shop'){d.remove();return partSheet()}
  if(a==='del'){const L=rd();L.splice(+b.dataset.i,1);wr(L);const k=d.scrollTop;draw();d.scrollTop=k;return}
  if(a==='ok'){const t=d.querySelector('#sT').value.trim(),p=d.querySelector('#sP').value.replace(/\D/g,''),h=d.querySelector('#sH').value.trim();if(!t||!p||Number(p)<=0||h.length<8){toast('Renseignez le titre, un prix et un téléphone valide');return}
   const L=rd();L.unshift({t:t,p:p,h:h,c:d.querySelector('#sC').value,e:d.querySelector('#sE').value,d:d.querySelector('#sD').value.trim(),ph:ph,u:u.id||'',at:Date.now()});wr(L);ph=[];toast('Annonce envoyée · un responsable va la valider');draw();d.scrollTop=0}})}

/* v116 · Console partenaire : abonnement Standard / Pro (stockage local, sans l'ancienne base) */
const PK='ujmk_partner_v1',DAY=86400000,OPS=['Orange Money','Wave'];
const PLANS={
 standard:{n:'Standard',tag:'Lancez votre boutique',hl:['15 articles publiés','2 photos par article','Photo de profil et couverture'],price:1000,max:15,photos:2,f:['Jusqu’à 15 articles publiés','2 photos par article','Badge « Boutique vérifiée »','Photo de profil et couverture de la boutique','Page boutique dans la Marketplace']},
 pro:{n:'Pro',tag:'Développez votre activité',hl:['Articles illimités','5 photos par article','Prix barré et promotions','Mise en vedette des articles'],price:2000,max:Infinity,photos:5,f:['Articles illimités','Jusqu’à 5 photos par article','Badge « Boutique certifiée »','Prix barré et promotions','Mise en vedette des articles']}
};
const ROS=(()=>{let d='';for(let i=0;i<=160;i++){const t=i/160*Math.PI*2,r=10.5+1*Math.cos(10*t);d+=(i?'L':'M')+(12+r*Math.cos(t)).toFixed(2)+' '+(12+r*Math.sin(t)).toFixed(2)}return d+'Z'})();
const SEAL=(id,c1,c2,lab,ring)=>`<svg class="pt-seal" viewBox="0 0 24 24" role="img" aria-label="${lab}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><path d="${ROS}" fill="url(#${id})"/>${ring?'<circle cx="12" cy="12" r="7.9" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width=".6"/>':''}<path d="m7.7 12.3 3 3 5.7-6.1" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const VER=SEAL('pgV','#5CBBFF','#1877F2','Boutique vérifiée',false),CERT=SEAL('pgC','#FFD24D','#D98E04','Boutique certifiée',true);
const CK='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
const pget=()=>{let s=null;try{s=JSON.parse(localStorage.getItem(PK)||'null')}catch(e){}s=s||{};s.shop=s.shop||{};s.items=Array.isArray(s.items)?s.items:[];s.sub=s.sub||null;if(s.sub&&!(s.sub.ref&&!/^(DEMO|TEST|SIM)/i.test(String(s.sub.ref))))s.sub=null;return s};
const pset=s=>{try{localStorage.setItem(PK,JSON.stringify(s));return true}catch(e){toast('Mémoire pleine : retirez une photo');return false}};
const subOk=s=>!!(s.sub&&s.sub.exp>Date.now());
const planOf=s=>subOk(s)?PLANS[s.sub.plan]:null;
const fmt=n=>String(Math.round(Number(n)||0)).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' FCFA';
const dt=t=>new Date(t).toLocaleDateString('fr-FR');
const shrink2=(f,max,q)=>new Promise(ok=>{const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const k=Math.min(1,max/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=Math.round(i.width*k);c.height=Math.round(i.height*k);c.getContext('2d').drawImage(i,0,0,c.width,c.height);ok(c.toDataURL('image/jpeg',q))};i.onerror=()=>ok('');i.src=r.result};r.onerror=()=>ok('');r.readAsDataURL(f)});
/* ───────── PAIEMENT · point de branchement de l'agrégateur ─────────
   Contrat attendu (à fournir via window.UJPAY avant ce script, ou en remplaçant PAY ci-dessous) :
     create(order) -> Promise<{ref}>            lance la demande de paiement
     check(ref)    -> Promise<{status:'pending'|'success'|'failed', reason?}>
   order = {orderId, amount, currency:'XOF', plan, operator:'orange|wave', phone:'+2250700000000', description}
   IMPORTANT : le simulateur de paiement est neutralisé dans cette version. Le raccordement
   doit passer par Supabase Edge Functions. La clé secrète GeniusPay ne doit JAMAIS figurer
   dans ce fichier et l'abonnement ne doit être confirmé que par le serveur après webhook signé. */
const digits=x=>String(x||'').replace(/\D/g,'');
const PERR=(code,msg)=>Object.assign(new Error(msg||''),{code});
const PAYURL=OWN?(String(UJ.url).replace(/\/+$/,'')+'/functions/v1'):'',PAYKEY=OWN?UJ.key:'';
const gpCall=async(fn,body)=>{if(!PAYURL||!PAYKEY)throw PERR('unavailable','Le paiement sera activé après la configuration de la base UJLoG.');let r,j={};
 try{r=await fetch(PAYURL+'/'+fn,{method:'POST',headers:{'Content-Type':'application/json',apikey:PAYKEY,Authorization:'Bearer '+PAYKEY},body:JSON.stringify(body)})}catch(e){throw PERR('network')}
 try{j=await r.json()}catch(e){}
 if(r.status===404||r.status===503)throw PERR('unavailable');
 if(!r.ok)throw PERR(j.code||'failed',j.message);
 return j};
const DEMO_PAY={demo:false,create:o=>gpCall('geniuspay-create',o),check:ref=>gpCall('geniuspay-status',{ref})};
const PAY=Object.assign({country:{code:'+225',len:10},operators:[
 {id:'orange',name:'Orange Money',img:'data:image/webp;base64,UklGRmoFAABXRUJQVlA4IF4FAABwIQCdASqQAJAAPm02l0ikIyIhIhmZ4IANiWdu4XSZeBwx27TYZAFiA/gHMUdQDzAfrN+nPCAfuB1nPoAeWN+2PwR/t/+0HsoZgB2Yf1zlH/a3OL/Yb7Z+YHIDvEf5D/ad8W49/PP813OXoR9Xf8l+FfwU/nP9v/M7mBqAH5n/539m91P+d/ZHzv/S/+x9wT+Yf0n/Ydij0bBkXwCz+mEL4BZ/TCF8AJyiy3Mn14Zfzn9B5UzSCZdANI9xWgy1F/27oGcbi2MPu4Wv6arpyyhMdOBj3znjL1OJy+tK4KK4IsiUPhLhzkOVQsARbz0n4fEpM0lQRK56N+c1JuYmI1P3nbN43EusiqjgFn9MIXwCz+mD8AAA/v+s8ACVY67MXXQ7OrslYwpltxJn9C2hUqBbDqeIpReegRBogSx3X5sGCHzfwCQoV10j+QtWFAe0+tMkcAFXeZegOdJfUol4fr/rcdXBw1aWSkoXW9bDamYkeQ0pYcj+oTp+bDFf+1gE0pfdYvZEt+mDmbgk640/hcaUtVubH7/8PG1y0ou7Q6m9PsKaeifqwHqgzvqVESV9XI9CcJIl7V/X08Trtfr+//iXdoDFa2331zj/aFbOpA/j+dCqlhHSY72cm5uwCPoLhwHwuMZaupZxnAYePZp0qPz/+ZVi/ug8UOt6jGXOszKEHj6lvFEj7n9I3y7T3y4frysyVdMHvT5Rr9Zv5GWd2VZgW1omtovQoHfoMPP2EM9jhmfcqIPPYol/ybkF/ENd36aOeTvpldTcgpsAy3Kvj8BGygUfCtv8k3J8PmhoTGE/hIf+Sa69bZp9Sn+g6M/pNswYpA5Q/kYYuXoaksxtTR0H/2J4BN3QIgWEDHd1+3W5NyugxE2DlCfOQEj347u6Wh/k99dbEj0Zb+CDXIT/5/Sl3tQuQnyy3t5wNFOW6ISuwNf+L/DczR85dcmF5/7rapzBGPFeWyLReh4iv0wRzzQQHLo3QHJIJS1Bz7nx4vZK/KoLl1k/SnGq4n/Fl1v/ucdMW24K3uf/7xFNxWfB4AbttV9ODvTVS0ILssHK6z++uOV8dIj+2Od62ZYCBa+YxTiscARs/5Af/6n06H6UvlJGd3OMYPZi71L+tUfHUYgH4zxPtjA+dKKmSldxj0kqievdMizG9GDrj+RKepVSFzh37VL08tnvcq4q087w/n9IZcTyMw86/gYCY170OuefcHH8BdqHDV18sX7cNeII6mg++DlEhc5Bc++daTnkAbo0EOJt2C2Dv8S1wx56uWSGciUtZwjRnmUJHgZjV/yhR+TPE2U2otWZqh/x4eMqH/YSuw1tpLHoCh83RRLm6yw9NNQQTHKo5PC6q1m/fkF2QPJLhhmVfzf5oTmcBEjR9SJ6BgF/YRsH8yygc1XR+ClyDfaZ7/mH29TGQVEXSlVzzvzMuVvjLv+pheOPqyCtleMVS64zwrE20CP4D/pCwX+8/evWKfw+zPXqFUc5lYbVE+LoeDGDJPjJhkAS9/CLJa/Rn34mp/MiI0ERvDG5r9OFVcajueo17VI9UxFamouyN56/mZveS38Rv1cu8mR3gAoHWPqg8bYK5p0hROnEWE3v4G9nLvGscp1IKcBpcttkz/X1wQYdtg5h1tyOaa0XIabN/nNULGyzrUSAYPojC72Zy2tinHYUJ3cvxD+q357aoCdIYwYHa0vayxR3Z1+Va2AtX1JVgXl/UV/TTlyoRP6lKzEWUyWZlrQ349Mt1pdJ5eXY/o+SfJcl9w8Q+YaQ28f2fquOqeKKvEZ9o94LzJgL2LNJH2KlWj7vRYUuNmW0L7r//KfpGHWATGvz3iAAAAA=',c:'#000',t:'#fff'},
 {id:'wave',name:'Wave',img:'data:image/webp;base64,UklGRloGAABXRUJQVlA4IE4GAAAQJACdASqQAJAAPm00l0ekIyIhKRZJGIANiU3bq/isr/AfjN39EQ+j/jR+V3Q17l+COQWPx03f0vMf/IPYz9qvuAfqv+rPWA8wH6yf8D+9e8B/gP1J9xPoAf1j+9dYh+2/sAfxP+9+mh+2vwk/tx+43tOZpP/eO1f/T12G/PvDtudgV9edbtjo9EvQc9Newf+sfWd9E0qeJiK6dqMHo85mtwg+NOo/0CHero0mEYP/UkYvL8g4zfbKeTluQmAD3L/cU+4a57+YkuD/qfkaTfSWZl5zxJih1VnCsyaVQkjdTp7+V+2GkBvEVQDWD/HSDSe+35IkiFsPRL3vk4ALy6zq24TSTWFBYKEBYW0++9vQwsluYH8qJyykDHsNIv+eipazGAdwXgVJBoAA/uqhOvEJNKM6w5uRdfmWoAARxjW/Hd7WbMmyPAHiZcQu96Zk7wHXOPF0t8RQI9OdA6eSuzTFSj26fhbi1LxTTO0lH5PK5x5fQFdYX6Ip9OGBXZzNIrk9vdzV7ZRV4ImKUblikEN9TdsY7P6M6XGKNTPZQ2jOHamEObYtxcjTgSVGtPbAZehpj+j6TuIIg+2kdgUetC3LRdk1kjyp9pUATqmf4TW1AZWxRZcd+f/gLL/ARs2IcOeeZOtJNV9mUfrOJLcMyf5EWZH35geo4w0flCoNKqIxsBgNtaSIl/VGUF19uzuKmotg+58rzXY2yWK3MhQ93fHpeEFuVSjVBvlDBR0Cn2Aukp6/KcxFmhOtAh/CN5NMmXfrGdGBD4WT96xo78oAKYokfFuKXX4M/5qduUj3cj41mHsA8/+0jRpT3pMqRRDwIuHvluPt5HlWujLBUjtqPFbrgPWU6ciw2mxUSubESXc960DnUeaaP+nACMEn6xCE3jY9aIx6fh09gxqNiM1BCdesCYnzSAkQM7tNOiQh/p3FCF6uVDyfGK3CJVwLmIO8TqtUcYisgkXGJN7MXtUyb6k3ghWjBS0QrgRef2tSVcxiSxeL1QrNo7D0uf28j+//ShfNcKTRKOqmiV4jhSZ+E7oAuELToa4vg7/FXvJh+Sv/ZElQcZZ4mfPanVLsVhJUWOoYXmpWzwvJvdrrRm30WHfAZA1n2873Q1g5bfC9Cg1ao3pWq7wXGcpLDkIF2xjBiKdVSQWQgZADEU+9iE/k9qnOAhHphAwlh7xm8nkeEECVYusCbiQQQXh7uD2eTsG4MjYFTs1T5Gv6FSrCesx8qt1PXotlfd6LTELKxWX0i30XnIXU0trlL+VsCXoNYnRfR3X8B65VVliZ1yk6doT1GJvbW/8A73ZSfMQP7P7b5SjpbS2lCLTxyp8X0Os0FfdT+lAqg/YVAxmTNciPQjH+3swMdaF3MKJAjP8gGXYJmUO0ptNqlnhKsXjQ3dmEiRmkMG6K6q96bRK9kDr2l7oeJ5lhqzHBHBlh3N4kL8oj8F0dCP0YzS6rNKo7UeJCan2YkKBkF7TOiXgsSN355xQs9lxHZKptSr3iH0+0g9uMCYrvaOVcUse8SIAqnbxohfHRzvyz1+f++fki4n2mS2+W2LJDswM62MnlQBa40jkGFoJcIskZcbRKKLWe21unsHk1445Xh1d5nf8s4AWRzPKiVASYmiHfXDbnpgHFuXcwlC5P5WZz4GlMcZfqJNx/Pm5v76KQGPDBafjWRFSojmmlaCrNdITZhQXw8kFLDWeIYWQ6A3/ZIyl/o2Hn3Cnkj9lOsktV51viYddDu8ZIf2hpRrrQkzlsWmlf5j41a8O5McuxIZMS7ZLNs4uxw1XOSQIInQNRh/nWV2YySPqb4QIRf/gjTLKpuqs15RV2UNWoImT344+b4bHBBGE8o4+adBlKOaFVWefXhJ1oGCyhAvGqnaOQOxckpbZ66bm4WBnoqHOfGYGJcMZ+BzawTIqzdn+dHEu3Pi90GlCb/AYRzWB8DbvdCtanhG9GTo6Nbj/pAYU8uoOlKRfiB8N8O7TO0Y7x3Kc94Zn99bbiJWi7VYANlb9YbBNM+PqO2EfOI3rWun+iwfHZxMRv2cvk2m+WIsonp9KVBpxg8iqc3DAONlzfNHU3Oj2pYNcKrQxWLQUHAIZT1SIEi0xQxhOoSQg1v6uihHgQk202piteVnjdCL2tKRvep7drkcNywRYAAAAAAAA=',c:'#1DC8F2',t:'#06323d'}]},DEMO_PAY,window.UJPAY||{});
const fmtTel=x=>digits(x).slice(0,PAY.country.len).replace(/(\d{2})(?=\d)/g,'$1 ');
const psty=document.createElement('style');psty.textContent=`
#mkPart{--pb:#F4F6FA;--pc:#fff;--pi:#0B1630;--pm:#5A6580;--pl:#E3E8F1;--pg:#15803D;position:absolute;inset:0;z-index:5;overflow:auto;background:var(--pb);color:var(--pi);font:15px/1.4 var(--b,system-ui),system-ui,sans-serif}
#mkV.dk #mkPart{--pb:#0E1116;--pc:#181C23;--pi:#F1F4F9;--pm:#9AA4B5;--pl:#262C37;--pg:#3DBE6A}
#mkPart *{box-sizing:border-box}
#mkPart button{font-family:inherit;cursor:pointer;border:0;-webkit-tap-highlight-color:transparent}
.pt-bar{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:calc(10px + env(safe-area-inset-top,0px)) 14px 10px;background:var(--pc);border-bottom:1px solid var(--pl)}
.pt-bar b{font:800 18px var(--h,system-ui)}
.pt-ib{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:var(--pb);color:var(--pi)}
.pt-sc{padding:16px 16px calc(40px + env(safe-area-inset-bottom,0px))}
.pt-sc h2{margin:0 0 6px;font:800 22px/1.2 var(--h,system-ui);letter-spacing:-.01em}
.pt-sc h3{margin:24px 0 8px;font:800 17px var(--h,system-ui)}
.pt-mu{margin:0 0 14px;color:var(--pm);font-size:14px}
.pt-note{margin:12px 0;padding:11px 12px;border-radius:12px;background:color-mix(in srgb,#F59E0B 14%,var(--pc));border:1px solid color-mix(in srgb,#F59E0B 40%,transparent);font-size:13px;line-height:1.45}
.pt-note .pt-lk{display:inline;margin:0;padding:0}
.pt-plan{position:relative;margin-top:14px;padding:16px;border-radius:20px;background:var(--pc);border:1.5px solid var(--pl)}
.pt-plan.pro{border-color:#15803D;box-shadow:0 12px 26px -16px rgba(21,128,61,.6)}
.pt-rb{position:absolute;top:-10px;right:14px;padding:3px 10px;border-radius:999px;background:#15803D;color:#fff;font:800 11px var(--b,system-ui);font-style:normal}
.pt-ph{display:flex;align-items:baseline;justify-content:space-between;gap:8px}
.pt-ph b{font:800 19px var(--h,system-ui)}.pt-ph strong{font:800 21px var(--h,system-ui);color:var(--pg);white-space:nowrap}.pt-ph span{font-size:13px;color:var(--pm)}
.pt-plan ul{list-style:none;margin:12px 0 14px;padding:0;display:flex;flex-direction:column;gap:8px}
.pt-plan li{display:flex;gap:8px;align-items:flex-start;font-size:14px}.pt-plan li svg{flex:none;margin-top:2px;color:var(--pg)}
.pt-go{width:100%;height:48px;border-radius:999px;background:#15803D;color:#fff;font:800 15px var(--b,system-ui)}
.pt-go.alt{background:var(--pc);color:var(--pg);border:1.5px solid var(--pg)!important}
.pt-lk{display:block;margin:16px auto 0;padding:6px;background:none;color:var(--pg);font:700 13.5px var(--b,system-ui);text-align:center}
.pt-sum{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:14px;border-radius:16px;background:var(--pc);border:1.5px solid var(--pl)}.pt-sum b{font:800 18px var(--h,system-ui);color:var(--pg);white-space:nowrap}
.pt-l{display:block;margin:16px 0 6px;font-weight:700;font-size:13px}
#mkPart input:not([type=file]):not([type=checkbox]),#mkPart select,#mkPart textarea{width:100%;border:1.5px solid var(--pl);border-radius:12px;padding:11px 12px;font:inherit;background:var(--pc);color:inherit}
#mkPart textarea{min-height:90px;resize:vertical}
.pt-ops{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.pt-op{padding:12px 8px;border-radius:12px;background:var(--pc);border:1.5px solid var(--pl)!important;color:var(--pi);font:700 13.5px var(--b,system-ui)}
.pt-op.on{border-color:#15803D!important;background:color-mix(in srgb,#15803D 12%,var(--pc));color:var(--pg)}
.pt-cv{height:130px;margin:0 -16px;background-size:cover;background-position:center}
.pt-id{display:flex;align-items:center;gap:12px;margin-top:-30px;position:relative}
.pt-id .mk-sl{border:3px solid var(--pb)}
.pt-id div{min-width:0;padding-top:26px}.pt-id b{display:flex;align-items:center;gap:5px;font:800 18px var(--h,system-ui)}.pt-id div span{font-size:12.5px;color:var(--pm)}
.pt-use{margin-top:16px;padding:12px 14px;border-radius:14px;background:var(--pc);border:1.5px solid var(--pl);font-size:14px}
.pt-use i{display:block;height:7px;margin-top:9px;border-radius:99px;background:var(--pl);overflow:hidden}.pt-use u{display:block;height:100%;background:#15803D;border-radius:99px}
.pt-act{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
.pt-up{display:flex;flex-direction:column;gap:6px;margin-top:14px;padding:14px;border-radius:16px;background:color-mix(in srgb,#15803D 10%,var(--pc));border:1.5px solid #15803D}.pt-up span{font-size:13px;color:var(--pm);margin-bottom:6px}
.pt-it{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--pl)}
.pt-it img,.pt-im{width:52px;height:52px;border-radius:10px;object-fit:cover;background:var(--pl);flex:none}
.pt-it div{flex:1;min-width:0}.pt-it b{display:block;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pt-it small{color:var(--pm);font-size:12.5px}.pt-it s{opacity:.7}
.pt-it button{background:none;color:var(--pg);font-weight:700;font-size:13px;padding:6px 4px}.pt-it button.dl{color:#C0392B}
.pt-empty{padding:22px 12px;text-align:center;border-radius:14px;border:1.5px dashed var(--pl);color:var(--pm);font-size:13.5px}
.pt-cvup{position:relative;display:grid;place-items:center;height:130px;margin:0 -16px;background-size:cover;background-position:center;background-color:var(--pl);cursor:pointer}
.pt-cvup span{padding:8px 14px;border-radius:999px;background:rgba(0,0,0,.55);color:#fff;font:700 13px var(--b,system-ui)}
.pt-avw{display:flex;align-items:center;gap:12px;margin-top:-34px;position:relative}.pt-avw small{margin-top:30px;color:var(--pm);font-weight:600}
.pt-avup{position:relative;display:block;cursor:pointer}.pt-avup .mk-sl{border:3px solid var(--pb)}
.pt-avup em{position:absolute;right:-2px;bottom:-2px;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:#15803D;color:#fff;font:800 16px/1 system-ui;font-style:normal;border:2px solid var(--pb)}
.pt-ph3{display:flex;gap:8px;flex-wrap:wrap}.pt-ph3 img{width:76px;height:76px;object-fit:cover;border-radius:12px}
.pt-add{width:76px;height:76px;border:1.5px dashed var(--pm);border-radius:12px;display:grid;place-items:center;font-size:26px;color:var(--pm);cursor:pointer}
.pt-r2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.pt-lock{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;padding:12px;border-radius:12px;background:var(--pc);border:1.5px dashed var(--pl)!important;color:var(--pm);font:600 13.5px var(--b,system-ui);text-align:left}
.pt-tag{padding:2px 8px;border-radius:999px;background:#15803D;color:#fff;font:800 10.5px var(--b,system-ui);letter-spacing:.05em}
.pt-chk{display:flex;align-items:center;gap:10px;padding:12px;border-radius:12px;background:var(--pc);border:1.5px solid var(--pl);font-weight:600;font-size:14px}.pt-chk input{width:20px;height:20px;accent-color:#15803D}
.pt-bar b{font:700 17px var(--h,system-ui)}
.pt-sc h2{font:700 25px/1.15 var(--h,system-ui);letter-spacing:-.02em}
.pt-go{height:50px;border-radius:12px;font:700 15px var(--b,system-ui)}
.pt-pl .pt-mu{margin:0 0 18px;font-size:14px;line-height:1.5}
.pt-pc{position:relative;display:block;width:100%;margin-top:10px;padding:16px;border-radius:14px;background:var(--pc);border:1.5px solid var(--pl);text-align:left;color:inherit;cursor:pointer;transition:border-color .15s;-webkit-tap-highlight-color:transparent}
.pt-pc.on{border-color:var(--pi)}
.pt-pt{display:flex;align-items:flex-start;gap:12px}
.pt-rd{flex:none;width:20px;height:20px;margin-top:2px;border-radius:50%;border:1.5px solid var(--pm);display:grid;place-items:center}
.pt-pc.on .pt-rd{border-color:var(--pi);background:var(--pi)}.pt-pc.on .pt-rd:after{content:"";width:7px;height:7px;border-radius:50%;background:var(--pc)}
.pt-pn{flex:1;min-width:0}.pt-pn b{display:block;font:700 17px var(--h,system-ui)}.pt-pn small{display:block;margin-top:2px;color:var(--pm);font-size:13px}
.pt-pr{text-align:right;white-space:nowrap}.pt-pr strong{display:block;font:700 24px/1.1 var(--h,system-ui);letter-spacing:-.02em;color:var(--pi)}.pt-pr small{color:var(--pm);font-size:12px}
.pt-bdg{display:flex;align-items:center;gap:8px;margin:14px 0 0;padding:12px 0 0;border-top:1px solid var(--pl);background:none;border-radius:0;font:500 13px var(--b,system-ui);color:var(--pm)}.pt-bdg svg{width:18px;height:18px;flex:none}
.pt-sc .pt-h3{margin:28px 0 10px;font:700 15px var(--h,system-ui)}
.pt-cmp{border-radius:14px;overflow:hidden;background:var(--pc);border:1.5px solid var(--pl)}
.pt-cr{display:grid;grid-template-columns:1.5fr 1fr 1fr;align-items:stretch;padding:0;border-top:1px solid var(--pl);font-size:13.5px}
.pt-cr:first-child{border-top:0}
.pt-cr>span{display:flex;align-items:center;padding:12px 10px}
.pt-cr>span:first-child{padding-left:14px;color:var(--pm)}
.pt-cr>span:not(:first-child){justify-content:center;text-align:center;font-weight:600}
.pt-cr>span.on{background:color-mix(in srgb,var(--pi) 5%,transparent)}
.pt-cr.h>span{font-size:12px;font-weight:700;color:var(--pm);letter-spacing:.02em}.pt-cr.h>span.on{color:var(--pi)}
.pt-no{font-style:normal;color:var(--pm);opacity:.6}.pt-yes{display:inline-flex;color:var(--pg)}
.pt-lk{font-weight:600;color:var(--pm);text-decoration:underline;text-underline-offset:3px}
.pt-cta{position:sticky;bottom:0;z-index:3;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px));background:var(--pc);border-top:1px solid var(--pl)}
.pt-cta small{display:block;margin-top:8px;text-align:center;color:var(--pm);font-size:12px}
#mkPart .pt-sc h2{margin:0 0 8px}
#mkPart .pt-sc h3{margin:24px 0 8px}
#mkPart .pt-sc .pt-h3{margin:28px 0 10px}
#mkPart p.pt-mu{margin:0 0 18px}
.pt2-top{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:calc(12px + env(safe-area-inset-top,0px)) 16px 4px}
.pt2-xb{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:color-mix(in srgb,var(--pi) 8%,transparent);color:var(--pi)}
.pt2-pill{height:40px;padding:0 16px;border-radius:999px;background:color-mix(in srgb,var(--pi) 10%,var(--pc));color:var(--pi);font:700 13.5px var(--b,system-ui);border:1px solid color-mix(in srgb,var(--pi) 12%,transparent)!important}
.pt2-dh{background:linear-gradient(180deg,color-mix(in srgb,var(--g1) 42%,var(--pb)),var(--pb) 190px);margin-bottom:-6px}
.pt2-dh .pt2-top{position:static}
.pt2{padding-top:10px}
#mkPart .pt2 h1{margin:14px 0 8px;font:700 30px/1.12 var(--h,system-ui);letter-spacing:-.02em}
#mkPart .pt2 .pt2-sub{margin:0 0 6px;color:var(--pi);font-size:15.5px;line-height:1.4;font-weight:500}
#mkPart .pt2 .pt2-h{margin:30px 0 12px;font:600 17px var(--h,system-ui)}
#mkPart .pt2 .pt2-ch{margin:20px 0 14px;color:var(--pm);font-weight:600;font-size:15px}
#mkPart .pt2 .pt2-pr{margin:0;color:var(--pm);font-size:14px}
.pt2-li{display:flex;align-items:center;gap:14px;padding:16px 14px;margin-bottom:10px;border-radius:20px;border:1.5px solid var(--pl);background:var(--pb);cursor:pointer}
.pt2-li:active{background:color-mix(in srgb,var(--pi) 5%,var(--pb))}
.pt2-lt{flex:1;min-width:0}.pt2-lt b{display:block;font:600 16px var(--h,system-ui)}.pt2-lt small{display:block;margin-top:2px;color:var(--pm);font-size:14px;line-height:1.35}
.pt2-li>svg:last-child{color:var(--pm);flex:none}
.pt2-ic{display:grid;place-items:center;flex:none;width:40px;height:40px;border-radius:50%;background:color-mix(in srgb,#15803D 14%,var(--pc));color:var(--pg)}
.pt2-pc{margin-bottom:14px;padding:22px 20px 20px;border-radius:26px;background:color-mix(in srgb,#1D9BF0 9%,var(--pc))}
.pt2-pc:nth-of-type(2){background:color-mix(in srgb,#1D9BF0 9%,var(--pc))}
.pt2-pn{display:block;font:700 18px var(--h,system-ui)}.pt2-pt{margin-top:12px;font:600 16px var(--b,system-ui)}.pt2-pp{margin-top:6px;color:var(--pm);font-size:14.5px}
.pt2-fl{display:grid;gap:14px;margin:22px 0}.pt2-fr{display:flex;align-items:center;gap:12px;font:600 15px/1.3 var(--b,system-ui)}.pt2-fr svg{flex:none;width:22px;height:22px}
.pt2-btn{display:block;width:100%;height:50px;border-radius:999px;background:color-mix(in srgb,var(--pi) 8%,transparent);color:#1D9BF0;font:700 16px var(--b,system-ui)}
#mkV.dk .pt2-btn{color:#5AB4F8}
.pt2-g{margin-bottom:14px;border-radius:20px;border:1.5px solid var(--pl);background:var(--pb);overflow:hidden}
.pt2-gh{display:flex;align-items:center;gap:12px;padding:15px 14px;font:600 16px var(--h,system-ui)}
.pt2-gr{display:flex;align-items:center;gap:12px;padding:15px 14px;border-top:1.5px solid var(--pl);font:500 15.5px/1.3 var(--b,system-ui)}.pt2-gr svg{flex:none;width:22px;height:22px}
.pt2-up{margin-top:6px;padding:20px;border-radius:22px;background:color-mix(in srgb,var(--pi) 5%,var(--pb));text-align:center}.pt2-up b{display:block;font:600 18px var(--h,system-ui)}.pt2-up span{display:block;margin:8px 0 16px;color:var(--pm);font-size:14px;line-height:1.45}
.pt-cta{padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px))}
#mkPart .pt-cta .pt2-lg{margin:0 0 12px;color:var(--pm);font-size:12.5px;line-height:1.45;text-align:center}
.pt-cta .pt-go{border-radius:999px}
.pt2 .pt-lk{margin-top:26px}
.pt-seal{width:20px;height:20px;flex:none;vertical-align:middle;overflow:visible}
.pt-id b .pt-seal{width:18px;height:18px}
.pt2-gr svg.pt-seal,.pt2-fr svg.pt-seal,.pt2-gh svg.pt-seal{width:22px;height:22px}
.pt2-top .pt2-xb,.pt2-top .pt2-pill{background:color-mix(in srgb,var(--pc) 62%,transparent);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border:1px solid color-mix(in srgb,var(--pi) 10%,transparent)!important}
.pt2-dh{margin:calc(-56px - env(safe-area-inset-top,0px)) 0 0;padding:calc(66px + env(safe-area-inset-top,0px)) 16px 14px;text-align:center;background:radial-gradient(130% 100% at 50% 0%,color-mix(in srgb,var(--g1) 36%,transparent),transparent 74%)}
.pt2-seal{display:flex;justify-content:center;margin-bottom:6px}.pt2-seal svg{width:78px;height:78px;filter:drop-shadow(0 10px 22px color-mix(in srgb,var(--g1) 55%,transparent))}
#mkPart .pt2-dh h1{margin:10px 0 8px}
.pt-sm{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.pt-sm div{padding:12px 14px;border-radius:14px;background:var(--pc);border:1.5px solid var(--pl)}
.pt-sm b{display:block;font:700 18px var(--h,system-ui)}.pt-sm span{font-size:12px;color:var(--pm)}
.pt-it{flex-wrap:wrap}
.pt-it .pt-ia{flex:0 0 100%;display:flex;gap:6px;flex-wrap:wrap;padding-left:0}
.pt-it .pt-ia button{padding:6px 12px;border-radius:999px;background:var(--pb);color:var(--pi);font-weight:600;font-size:12.5px}
.pt-it .pt-ia button.dl{color:#C0392B}
.pt-cta .pt-go.plan{background:linear-gradient(135deg,var(--c1),var(--c2));color:var(--ct);height:52px;font-size:16px;box-shadow:0 12px 24px -12px var(--c2)}
.pt-cta{border-top-color:color-mix(in srgb,var(--c2,var(--pl)) 35%,var(--pl))}
.pt-cta{position:static;z-index:auto;padding:6px 16px calc(36px + env(safe-area-inset-bottom,0px));background:none;border-top:0!important;box-shadow:none}
#mkPart .pt-cta .pt2-lg{margin:0 0 14px}
.pt2-sl{flex:none;display:grid;place-items:center;width:40px;height:40px}.pt2-sl svg{width:40px;height:40px}
.pt2-pr2{display:block;margin-top:8px;font:700 14px var(--b,system-ui);font-style:normal;color:var(--pi)}
.pt2-why{display:grid;gap:6px}.pt2-wy{display:flex;align-items:center;gap:14px;padding:6px 2px}
.pt2-wy b{display:block;font:600 15px var(--b,system-ui)}.pt2-wy small{display:block;margin-top:1px;color:var(--pm);font-size:13.5px;line-height:1.35}
.pt3{padding-top:14px}
#mkPart .pt3 h3.pt3-h{margin:26px 0 10px;font:600 15px var(--h,system-ui)}
.pt3-demo{margin-left:auto;padding:3px 10px;border-radius:999px;background:color-mix(in srgb,#F59E0B 18%,var(--pc));color:#C27C0E;font:700 11px var(--b,system-ui);border:1px solid color-mix(in srgb,#F59E0B 40%,transparent)}
.pt3-rc{border-radius:18px;border:1.5px solid var(--pl);background:var(--pc);overflow:hidden}
.pt3-rh{display:flex;align-items:center;gap:12px;padding:16px 16px 14px}.pt3-rh b{display:block;font:600 16px var(--h,system-ui)}.pt3-rh small{color:var(--pm);font-size:13px}
.pt3-rw{display:flex;justify-content:space-between;gap:12px;padding:12px 16px;border-top:1px solid var(--pl);font-size:14px}.pt3-rw span{color:var(--pm)}.pt3-rw b{font-weight:600;text-align:right;overflow-wrap:anywhere}
.pt3-tt{display:flex;justify-content:space-between;align-items:baseline;padding:16px;border-top:1.5px solid var(--pl);background:color-mix(in srgb,var(--pi) 4%,var(--pc))}.pt3-tt span{font-weight:600}.pt3-tt strong{font:700 22px var(--h,system-ui);letter-spacing:-.01em}
.pt3-ops{display:grid;gap:10px}
.pt3-op{display:flex;align-items:center;gap:14px;padding:13px 14px;border-radius:16px;border:1.5px solid var(--pl);background:var(--pc);cursor:pointer;-webkit-tap-highlight-color:transparent}
.pt3-op.on{border-color:var(--pi)}
.pt3-op div{flex:1;min-width:0}.pt3-op b{display:block;font:600 15px var(--b,system-ui)}.pt3-op small{color:var(--pm);font-size:12.5px}
.pt3-lg{display:grid;place-items:center;flex:none;width:44px;height:44px;border-radius:12px;font:800 12px var(--b,system-ui);letter-spacing:-.01em}
.pt3-rd{flex:none;width:20px;height:20px;border-radius:50%;border:1.5px solid var(--pm);display:grid;place-items:center}
.pt3-op.on .pt3-rd{border-color:var(--pi);background:var(--pi)}.pt3-op.on .pt3-rd:after{content:"";width:7px;height:7px;border-radius:50%;background:var(--pc)}
.pt3-ph{display:flex;align-items:center;border:1.5px solid var(--pl);border-radius:14px;background:var(--pc);overflow:hidden}
.pt3-ph:focus-within{border-color:var(--pi)}
.pt3-ph span{padding:0 12px 0 14px;font-weight:600;color:var(--pm);border-right:1.5px solid var(--pl);align-self:stretch;display:flex;align-items:center}
#mkPart .pt3-ph input.pt3-in{border:0!important;border-radius:0;background:none;padding:14px;font:600 17px var(--b,system-ui);letter-spacing:.04em;outline:0}
.pt3-hp{display:block;margin-top:8px;color:var(--pm);font-size:13px}.pt3-hp.err{color:#E5484D}
.pt3-act{margin-top:26px}
.pt3-act .pt-go.plan{background:linear-gradient(135deg,var(--c1),var(--c2));color:var(--ct);height:52px;font-size:16px;box-shadow:0 12px 24px -12px var(--c2)}
.pt3-act .pt-go[disabled]{opacity:.4;box-shadow:none;cursor:not-allowed}
#mkPart .pt3-sec{display:flex;align-items:flex-start;justify-content:center;gap:8px;margin:14px 0 0;color:var(--pm);font-size:12.5px;line-height:1.45;text-align:center}.pt3-sec svg{width:16px;height:16px;flex:none;margin-top:1px}
.pt3c{text-align:center;padding-top:44px}
#mkPart .pt3c h2{margin:22px 0 10px}#mkPart .pt3c p{margin:0 0 22px;color:var(--pm);font-size:15px;line-height:1.5}#mkPart .pt3c p b{color:var(--pi)}
#mkPart .pt3c .pt3-note{margin:16px 0 0;font-size:12.5px}
.pt3-spin{width:64px;height:64px;margin:0 auto;border-radius:50%;border:4px solid var(--pl);border-top-color:#15803D;animation:pt3s 1s linear infinite}
@keyframes pt3s{to{transform:rotate(360deg)}}
.pt3-st{list-style:none;margin:0 0 24px;padding:0;text-align:left;display:grid;gap:12px}
.pt3-st li{display:flex;align-items:center;gap:12px;font-size:14.5px;color:var(--pm)}
.pt3-st li i{display:grid;place-items:center;flex:none;width:22px;height:22px;border-radius:50%;border:1.5px solid var(--pl);color:#fff}
.pt3-st li.dn{color:var(--pi)}.pt3-st li.dn i{background:#15803D;border-color:#15803D}.pt3-st li.dn i svg{width:14px;height:14px}
.pt3-st li.cr{color:var(--pi);font-weight:600}.pt3-st li.cr i{border-color:#15803D;border-top-color:transparent;animation:pt3s 1s linear infinite}
.pt3-ko{display:grid;place-items:center;width:72px;height:72px;margin:0 auto;border-radius:50%;background:color-mix(in srgb,#E5484D 16%,var(--pc));color:#E5484D}.pt3-ko svg{width:32px;height:32px}
.pt3-lg{width:52px;height:52px;border-radius:14px;object-fit:cover;display:block}
.pt3-op{padding:12px 14px}
.pt3-ko{animation:pt3sh .45s ease .1s both}@keyframes pt3sh{0%,100%{transform:translateX(0)}20%{transform:translateX(-7px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(3px)}}@media (prefers-reduced-motion:reduce){.pt3-ko{animation:none}}
.pk{padding-top:36px}
.pk-ico{position:relative;width:112px;height:112px;margin:0 auto;color:var(--k);display:grid;place-items:center}
.pk-ico svg{position:relative;z-index:2;width:112px;height:112px;overflow:visible;animation:pkSh .5s cubic-bezier(.36,.07,.19,.97) 1.05s both,pkFl 3.6s ease-in-out 1.8s infinite}
.pk-bg{fill:color-mix(in srgb,var(--k) 14%,var(--pc));stroke:none;transform-origin:60px 60px;animation:pkPop .5s cubic-bezier(.2,1.4,.4,1) both}
.pk-c{fill:none;stroke:var(--k);stroke-width:3.5;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;transform:rotate(-90deg);transform-origin:60px 60px;animation:pkDr .7s cubic-bezier(.65,0,.35,1) .1s forwards}
.pk-g{fill:none;stroke:var(--k);stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
.pk-g path{stroke-dasharray:1;stroke-dashoffset:1;animation:pkDr .38s ease-out .7s forwards}
.pk-g path+path{animation-delay:.9s}.pk-g path+path+path{animation-delay:1s}
.pk-g circle{opacity:0;animation:pkIn .2s ease 1s forwards}
.pk-r{position:absolute;inset:6px;border-radius:50%;border:2px solid var(--k);opacity:0;animation:pkRg 2.6s ease-out 1s infinite}.pk-r.r2{animation-delay:1.9s}
.pk-ico:before{content:"";position:absolute;inset:-18px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--k) 30%,transparent),transparent 68%);opacity:0;animation:pkGl .8s ease .6s forwards}
.pk-chip{display:inline-flex;align-items:center;gap:7px;margin-top:20px;padding:5px 12px;border-radius:99px;font:700 12px var(--h,system-ui);letter-spacing:.04em;text-transform:uppercase;color:var(--k);background:color-mix(in srgb,var(--k) 13%,transparent);border:1px solid color-mix(in srgb,var(--k) 30%,transparent);animation:pkUp .45s ease .5s both}
.pk-chip i{width:7px;height:7px;border-radius:50%;background:var(--k);animation:pkBl 1.6s ease-in-out infinite}
.pk h2,.pk>p,.pk-det,.pk-rc,.pk-ok,.pk-tips,.pk .pt3-act,.pk .pt2-btn,.pk-sec{animation:pkUp .5s ease both}
.pk h2{animation-delay:.6s}.pk>p{animation-delay:.68s}.pk-rc{animation-delay:.78s}.pk-ok{animation-delay:.86s}.pk-tips{animation-delay:.94s}.pk .pt3-act{animation-delay:1.02s}.pk .pt2-btn{animation-delay:1.1s}.pk-sec{animation-delay:1.18s}
.pk-det{margin:-8px 0 16px;padding:9px 12px;border-radius:12px;font-size:12.5px;line-height:1.4;color:var(--pm);background:color-mix(in srgb,var(--k) 8%,transparent);border:1px dashed color-mix(in srgb,var(--k) 35%,transparent)}
.pk-rc{margin:0 0 14px;text-align:left}.pk-rc .pt3-rw:first-child{border-top:0}.pk-am{font-weight:800;color:var(--pi)}
.pk-ok{display:flex;align-items:center;justify-content:center;gap:8px;margin:0 0 14px;font-size:13px;font-weight:600;color:var(--pi)}
.pk-ok:before{content:"";width:8px;height:8px;border-radius:50%;background:#15803D;box-shadow:0 0 0 4px color-mix(in srgb,#15803D 22%,transparent)}
.pk-tips{margin:0 0 6px;padding:14px 16px;border-radius:16px;text-align:left;background:var(--pc);border:1.5px solid var(--pl)}
.pk-tips b{display:block;margin-bottom:8px;font:700 14px var(--h,system-ui);color:var(--pi)}
.pk-tips ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.pk-tips li{position:relative;padding-left:22px;font-size:13.5px;line-height:1.4;color:var(--pm)}
.pk-tips li:before{content:"";position:absolute;left:2px;top:6px;width:9px;height:9px;border-radius:50%;border:2px solid var(--k)}
.pk-sec{margin:18px 0 0;font-size:12px;color:var(--pm)}
@keyframes pkDr{to{stroke-dashoffset:0}}@keyframes pkIn{to{opacity:1}}
@keyframes pkPop{0%{transform:scale(.4);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes pkSh{10%,90%{transform:translateX(-2px)}20%,80%{transform:translateX(4px)}30%,50%,70%{transform:translateX(-7px)}40%,60%{transform:translateX(7px)}100%{transform:translateX(0)}}
@keyframes pkFl{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}
@keyframes pkRg{0%{transform:scale(.9);opacity:.55}100%{transform:scale(1.55);opacity:0}}
@keyframes pkGl{to{opacity:1}}@keyframes pkBl{50%{opacity:.35}}
@keyframes pkUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.pk *,.pk{animation:none!important}.pk-c,.pk-g path{stroke-dashoffset:0}.pk-g circle,.pk-ico:before{opacity:1}.pk-r{display:none}}
.pk-win{margin-bottom:4px}
.pk-win svg{animation:pkBo .6s cubic-bezier(.2,1.5,.4,1) .85s both}
.pk-win .pk-g{stroke-width:6}.pk-win .pk-g path{animation-delay:.55s}
.pk-win .pk-r{animation-delay:.9s}.pk-win .pk-r.r2{animation-delay:1.8s}
.pk-p{position:absolute;z-index:1;left:50%;top:50%;width:7px;height:7px;margin:-3.5px;border-radius:50%;background:#22C55E;opacity:0;animation:pkPt .95s cubic-bezier(.1,.7,.3,1) .8s forwards}
.pk-p:nth-child(3n+4){background:#4DB2FF;width:5px;height:5px}.pk-p:nth-child(3n+5){background:#F5A524;border-radius:2px}
.pk-sl{animation:pkUp .5s ease 1.1s both}.pk-win~h1,.pk-win~.pt2-sub{animation:pkUp .5s ease 1.2s both}
@keyframes pkBo{0%{transform:scale(1)}45%{transform:scale(1.14)}100%{transform:scale(1)}}
@keyframes pkPt{0%{opacity:1;transform:rotate(var(--a)) translateY(-44px) scale(.5)}100%{opacity:0;transform:rotate(var(--a)) translateY(-92px) scale(1)}}
@media (prefers-reduced-motion:reduce){.pk-win *,.pk-sl{animation:none!important}.pk-p{display:none}}
.pk-br{--pc:#fff;--pl:color-mix(in srgb,var(--bg,#000) 14%,#fff);--pm:#5f5f5f;--pi:#0b0b0b;--bd:var(--bg,#000);min-height:calc(100vh - 54px);color:#0b0b0b;background:radial-gradient(120% 45% at 50% 0%,color-mix(in srgb,var(--k) 14%,transparent),transparent 72%),#fff}
.pk-brb{background:#fff!important;color:#0b0b0b;border-bottom:2px solid var(--bg,#000)!important}
.pk-br h2{color:#0b0b0b}
.pk-br .pk-rc{background:#fff;border:2px solid var(--bd);box-shadow:5px 5px 0 var(--k)}
.pk-br .pk-rc .pt3-rw{border-top:1px solid color-mix(in srgb,var(--bd) 16%,#fff)}
.pk-br .pk-am{color:var(--bd)}
.pk-br .pk-chip{color:var(--bd);background:color-mix(in srgb,var(--k) 20%,#fff);border-color:var(--k)}
.pk-br .pk-chip i{background:var(--k)}
.pk-br .pk-det{color:#444;background:#fff;border-color:var(--k)}
.pk-br .pt2-btn{color:var(--bd);background:#fff;border:2px solid var(--bd)}
.pk-br .pt3-act .pt-go.plan{border:2px solid var(--bd);box-shadow:4px 4px 0 var(--bd)}
.pk-br .pk-sec{color:#6b6b6b}
`;document.head.appendChild(psty);
function ujCelebrate(name,photo,uid){
 try{
  if(document.getElementById('uj138-cel'))return;
  var st=document.createElement('style');st.id='uj138-cel-st';
  st.textContent='@keyframes ujcPop{0%{transform:scale(.3);opacity:0}60%{transform:scale(1.08);opacity:1}100%{transform:scale(1)}}@keyframes ujcRing{0%{transform:scale(.6);opacity:.7}100%{transform:scale(2.3);opacity:0}}@keyframes ujcDraw{to{stroke-dashoffset:0}}@keyframes ujcUp{from{transform:translateY(14px);opacity:0}to{transform:none;opacity:1}}@keyframes ujcFall{0%{transform:translate(0,-20px) rotate(0);opacity:0}15%{opacity:1}100%{transform:translate(var(--dx),110vh) rotate(var(--r));opacity:.9}}#uj138-cel{position:fixed;inset:0;z-index:100010;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px;text-align:center;color:#fff;background:radial-gradient(circle at 50% 38%,#1E9A55 0,#0B4F28 62%,#06361C 100%);font-family:inherit;overflow:hidden}#uj138-cel .bd{position:relative;width:112px;height:112px;display:grid;place-items:center}#uj138-cel .bd i.rg{position:absolute;inset:0;border-radius:50%;border:2px solid rgba(255,255,255,.55);animation:ujcRing 2.2s ease-out infinite}#uj138-cel .bd i.rg:nth-child(2){animation-delay:.7s}#uj138-cel .bd i.rg:nth-child(3){animation-delay:1.4s}#uj138-cel .lg{position:relative;width:104px;height:104px;border-radius:30px;background:#fff;color:#15803D;display:grid;place-items:center;font:800 38px system-ui;overflow:hidden;box-shadow:0 22px 44px -14px rgba(0,0,0,.5);animation:ujcPop .7s cubic-bezier(.2,.9,.3,1.2) both}#uj138-cel .lg img{width:100%;height:100%;object-fit:cover}#uj138-cel .ck{position:absolute;right:-6px;bottom:-6px;width:38px;height:38px;border-radius:50%;background:#F59E0B;display:grid;place-items:center;border:3px solid #0B4F28;animation:ujcPop .5s .55s cubic-bezier(.2,.9,.3,1.3) both}#uj138-cel .ck path{stroke-dasharray:22;stroke-dashoffset:22;animation:ujcDraw .4s .95s ease forwards}#uj138-cel h2{margin:6px 0 0;font-size:24px;animation:ujcUp .5s .6s both}#uj138-cel p{margin:0;font-size:14px;opacity:.92;animation:ujcUp .5s .75s both}#uj138-cel .id{display:inline-flex;align-items:center;gap:8px;padding:9px 14px;border-radius:999px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);font:700 14px monospace;letter-spacing:.06em;animation:ujcUp .5s .9s both}#uj138-cel button{margin-top:10px;border:0;border-radius:16px;padding:14px 26px;background:#fff;color:#0B4F28;font:800 15px system-ui;cursor:pointer;animation:ujcUp .5s 1.05s both}#uj138-cel .cf{position:absolute;top:0;width:9px;height:14px;border-radius:2px;animation:ujcFall var(--t) linear var(--d) infinite}@media(prefers-reduced-motion:reduce){#uj138-cel *{animation-duration:.01s!important;animation-delay:0s!important;animation-iteration-count:1!important}}';
  var o=document.createElement('div');o.id='uj138-cel';o.setAttribute('role','dialog');o.setAttribute('aria-label','Boutique créée');
  var cols=['#FBBF24','#fff','#34C77B','#60A5FA','#F472B6'],cf='';
  for(var i=0;i<26;i++){cf+='<i class="cf" style="left:'+(Math.random()*100).toFixed(1)+'%;background:'+cols[i%5]+';--dx:'+Math.round(Math.random()*120-60)+'px;--r:'+Math.round(Math.random()*720-360)+'deg;--t:'+(2.6+Math.random()*2.2).toFixed(1)+'s;--d:'+(Math.random()*1.6).toFixed(1)+'s"></i>'}
  var ini=String(name||'B').trim().split(/\s+/).slice(0,2).map(function(w){return w[0]}).join('').toUpperCase()||'B';
  var e=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  o.innerHTML=cf+'<div class="bd"><i class="rg"></i><i class="rg"></i><i class="rg"></i><div class="lg">'+(photo?'<img alt="" src="'+e(photo)+'">':e(ini))+'</div><span class="ck"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span></div><h2>Boutique créée</h2><p>'+e(name)+' est prête à vendre sur la Marketplace UJLoG.</p>'+(uid?'<div class="id">ID '+e(uid)+'</div>':'')+'<button type="button">Accéder à ma boutique</button>';
  document.head.appendChild(st);document.body.appendChild(o);
  o.querySelector('button').onclick=function(){o.style.transition='opacity .3s';o.style.opacity='0';setTimeout(function(){o.remove();st.remove()},320)};
 }catch(x){}
}
function genUJM(){var c='23456789ABCDEFGHJKLMNPQRSTUVWXYZ',r='';for(var i=0;i<6;i++)r+=c[Math.floor(Math.random()*c.length)];return 'UJM-'+r}

function partSheet(force){
 const r=st.root;if(!r)return;r.querySelector('#mkPart')?.remove();
 try{const raw=JSON.parse(localStorage.getItem(PK)||'null');if(raw&&raw.sub&&!(raw.sub.ref&&!/^(DEMO|TEST|SIM)/i.test(String(raw.sub.ref)))){raw.sub=null;localStorage.setItem(PK,JSON.stringify(raw))}}catch(e){}
 if(!force&&subOk(pget()))return openStore(null,'Ma boutique',null,true);
 const d=document.createElement('div');d.id='mkPart';let v=force?'plans':(()=>{try{const s0=pget();return subOk(s0)&&!s0.shop.name?'shop':(subOk(s0)?'home':'plans')}catch(e){return 'plans'}})(),tmp={},timer=null;const stop=()=>{if(timer){clearInterval(timer);timer=null}};
 const S=()=>pget(),g=q=>d.querySelector(q);
 const PRE=(()=>{const X=window.UJX||{};let addr='';if(X.lg==='Quartier')addr=X.qt||'';else if(X.lg==='Cité universitaire')addr='Cité universitaire'+(X.bt?', bât. '+X.bt:'');return{tel:String(X.tel||''),addr:String(addr).slice(0,60)}})();
 const bar=(t,to)=>`<div class="pt-bar"><button class="pt-ib" data-p="${to}" aria-label="Retour">${CHV}</button><b>${t}</b></div>`;
 const cvStyle=sh=>sh.cover?`background-image:url(${esc(sh.cover)})`:`background-image:linear-gradient(135deg,${hue(sh.name||'x')},#0B1630)`;
 const IC=x=>`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${x}</svg>`;
 const IX=x=>`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${x}</svg>`;
 const I={store:IX('<path d="M4 9l1-5h14l1 5M5 9v10h14V9M9 19v-5h6v5"/>'),img:IX('<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="m4 18 5-5 4 4 3-3 4 4"/>'),usr:IX('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'),grid:IX('<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>'),tag:IX('<path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="7.5" cy="8.5" r="1.3"/>'),star:IX('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'),chv:IX('<path d="m9 5 7 7-7 7"/>'),x:IX('<path d="M6 6l12 12M18 6 6 18"/>'),tools:IX('<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>'),share:IX('<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6"/>'),copy:IX('<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8"/>'),chart:IX('<path d="M5 20v-7M12 20V5M19 20v-10"/>'),clock:IX('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),box:IX('<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/>')};
 const GEM=c=>`<svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true"><path d="M7 3h10l5 6-10 13L2 9z" fill="${c}"/><path d="m12 8.2 1.1 2.3 2.5.3-1.8 1.7.5 2.5L12 13.8l-2.3 1.2.5-2.5-1.8-1.7 2.5-.3z" fill="#fff"/></svg>`;
 const GC={standard:'#1D9BF0',pro:'#E8A700'},CB={standard:['#4DB2FF','#1877F2','#fff'],pro:['#FFD24D','#E39A00','#2A1B00']},dtl=t=>new Date(t).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'}),num=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
 const BDG=k=>k==='pro'?CERT:VER;
 const subs=s=>{const p=planOf(s),sb=s.sub,PH=IX('<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>');
  const offer=(k,t)=>`<div class="pt2-li" role="button" tabindex="0" data-p="det" data-k="${k}"><span class="pt2-sl">${k==='pro'?CERT:VER}</span><div class="pt2-lt"><b>Partenaire ${PLANS[k].n}</b><small>${t}</small><em class="pt2-pr2">${num(PLANS[k].price)} FCFA / mois</em></div>${I.chv}</div>`;
  const why=(ic,t,d)=>`<div class="pt2-wy"><span class="pt2-ic">${ic}</span><div><b>${t}</b><small>${d}</small></div></div>`;
  const card=sb?`<div class="pt2-li" role="button" tabindex="0" data-p="det" data-k="${sb.plan}"><span class="pt2-sl">${sb.plan==='pro'?CERT:VER}</span><div class="pt2-lt"><b>Partenaire ${PLANS[sb.plan].n}</b><small>${p?'Actif jusqu’au '+dtl(sb.exp):'A expiré le '+dtl(sb.exp)}</small></div>${I.chv}</div>`:'';
  const PT='Articles illimités, badge Certifié et outils de vente avancés.';let disc='';
  if(!p)disc=offer('pro',PT)+offer('standard','15 articles, 2 photos par article et badge Vérifié.')+`<button class="pt2-btn" data-p="plans" style="color:var(--pg);margin-top:4px">Comparer les forfaits</button>`;
  else if(sb.plan==='standard')disc=offer('pro',PT);
  return `<div class="pt2-top"><button class="pt2-xb" data-p="${p?'home':'x'}" aria-label="Fermer">${I.x}</button></div><div class="pt-sc pt2"><h1>Abonnements</h1><p class="pt2-sub">Retrouvez et gérez votre abonnement partenaire au même endroit.</p>`
  +(sb?`<h3 class="pt2-h">${p?'Mon abonnement':'Renouveler'}</h3>${card}`:'')
  +(disc?`<h3 class="pt2-h">Découvrir</h3>${disc}`:'')
  +(!p?`<h3 class="pt2-h">Pourquoi devenir partenaire</h3><div class="pt2-why">${why(I.store,'Votre vitrine sur le campus','Vos articles visibles par les étudiants.')}${why(PH,'Paiement Mobile Money','Orange Money ou Wave.')}${why(I.clock,'30 jours, sans engagement','Pas de renouvellement automatique.')}</div>`:'')
  +`</div>`};
 const plans=s=>{const row=(ic,t)=>`<div class="pt2-fr">${ic}<span>${t}</span></div>`;
  const F={standard:[row(I.grid,'15 articles publiés'),row(I.img,'2 photos par article'),row(VER,'Badge Boutique vérifiée'),row(I.tools,'Outils de gestion de base')],pro:[row(I.grid,'Articles illimités'),row(I.img,'5 photos par article'),row(CERT,'Badge Boutique certifiée'),row(I.tag,'Outils de vente et de gestion avancés')]};
  return `<div class="pt2-top"><button class="pt2-xb" data-p="subs" aria-label="Retour">${I.x}</button></div><div class="pt-sc pt2" style="text-align:center"><h1>Boutique Partenaire</h1><p class="pt2-sub">Vendez sur la Marketplace UJLoG et touchez tous les étudiants du campus.</p><p class="pt2-ch">Choisissez votre forfait</p>`
  +Object.keys(PLANS).map(k=>{const o=PLANS[k];return `<div class="pt2-pc" style="text-align:left;background:color-mix(in srgb,${GC[k]} 9%,var(--pc))"><b class="pt2-pn">${o.n}</b><div class="pt2-pt">${o.tag}</div><div class="pt2-pp">${num(o.price)} FCFA / mois</div><div class="pt2-fl">${F[k].join('')}</div><button class="pt2-btn" data-p="det" data-k="${k}" style="color:${GC[k]}">Voir tous les avantages</button></div>`}).join('')+`</div>`};
 const sumHtml=s=>{const it=s.items,promo=it.filter(x=>x.o>0).length,vd=it.filter(x=>x.f).length,stock=it.filter(x=>!x.s).reduce((a,x)=>a+Number(x.p||0),0);return `<div class="pt-sm"><div><b>${it.length}</b><span>Articles</span></div><div><b>${promo}</b><span>En promotion</span></div><div><b>${vd}</b><span>En vedette</span></div><div><b>${fmt(stock)}</b><span>Valeur du stock</span></div></div>`};
 const detail=s=>{const sel=tmp.sel||'pro',o=PLANS[sel],pro=sel==='pro',ren=s.sub&&s.sub.plan===sel;
  const grp=(t,ic,rows)=>`<div class="pt2-g"><div class="pt2-gh">${ic}<b>${t}</b></div>${rows.map(r=>`<div class="pt2-gr">${r[0]}<span>${r[1]}</span></div>`).join('')}</div>`;
  const tools=pro?grp('Outils de vente',I.tag,[[I.tag,'Prix barré et promotions'],[I.star,'Mise en vedette des articles'],[I.share,'Partage d’un article sur WhatsApp']])+grp('Outils de gestion',I.tools,[[I.box,'Articles épuisés ou disponibles'],[I.copy,'Duplication d’un article en un geste'],[I.chart,'Résumé de la boutique : articles, promotions, stock']]):grp('Outils de gestion',I.tools,[[I.box,'Articles épuisés ou disponibles'],[I.clock,'Horaires d’ouverture de la boutique']])+`<div class="pt2-up"><b>Développez votre boutique</b><span>Passez à Pro : articles illimités, badge Certifié, promotions, mise en vedette, partage WhatsApp et résumé de la boutique.</span><button class="pt2-btn" data-p="sel" data-k="pro" style="background:linear-gradient(135deg,#FFD24D,#E39A00);color:#2A1B00">Passer à Pro</button></div>`;
  return `<div class="pt2-top"><button class="pt2-xb" data-p="subs" aria-label="Fermer">${I.x}</button><button class="pt2-pill" data-p="plans">Voir tous les forfaits</button></div><div class="pt2-dh pt2" style="--g1:${GC[sel]}"><div class="pt2-seal">${pro?CERT:VER}</div><h1>Partenaire <span style="color:${GC[sel]}">${o.n}</span></h1><p class="pt2-sub" style="margin-bottom:6px">${o.tag}.</p><p class="pt2-pr">${num(o.price)} FCFA / mois</p></div><div class="pt-sc pt2" style="padding-top:14px;padding-bottom:6px"><div style="text-align:left">`
  +grp('Votre boutique',I.store,[[I.usr,'Photo de profil et couverture'],[I.store,'Page boutique dans la Marketplace'],[pro?CERT:VER,'Badge « Boutique '+(pro?'certifiée':'vérifiée')+' »']])
  +grp('Vos articles',I.grid,[[I.grid,pro?'Articles illimités':o.max+' articles publiés'],[I.img,pro?'Jusqu’à 5 photos par article':o.photos+' photos par article']])
  +tools+`</div></div><div class="pt-cta" style="--c1:${CB[sel][0]};--c2:${CB[sel][1]};--ct:${CB[sel][2]}"><p class="pt2-lg">L’abonnement dure 30 jours et ne se renouvelle pas automatiquement. Paiement par Mobile Money.</p><button class="pt-go plan" data-p="buy" data-k="${sel}">${ren?'Renouveler':'Continuer'}</button><small>Renouvelez quand vous le souhaitez.</small></div>`};
 const LOCK=IX('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>');
 const opLogo=o=>o.img?`<img class="pt3-lg" alt="${esc(o.name)}" src="${o.img}">`:`<span class="pt3-lg" style="background:${o.c};color:${o.t}">${esc(o.short||o.name)}</span>`;
 const opOf=id=>PAY.operators.find(o=>o.id===id)||{name:''};
 const payv=s=>{const k=tmp.k,q=PLANS[k],cur=planOf(s),base=cur&&s.sub.plan===k?s.sub.exp:Date.now(),until=base+30*DAY,cb=CB[k],ready=!!tmp.op&&digits(tmp.tel).length===PAY.country.len;tmp.until=until;
  const ops=PAY.operators.map(o=>`<div class="pt3-op${tmp.op===o.id?' on':''}" role="radio" aria-checked="${tmp.op===o.id}" tabindex="0" data-p="op" data-o="${o.id}">${opLogo(o)}<div><b>${o.name}</b><small>Paiement par ${o.name}</small></div><span class="pt3-rd"></span></div>`).join('');
  return `<div class="pt-bar"><button class="pt-ib" data-p="detail" aria-label="Retour">${CHV}</button><b>Paiement</b>${PAY.demo?'<span class="pt3-demo">Mode test</span>':''}</div><div class="pt-sc pt3">`
  +`<div class="pt3-rc"><div class="pt3-rh"><span class="pt2-sl">${k==='pro'?CERT:VER}</span><div><b>Partenaire ${q.n}</b><small>Abonnement mensuel · Marketplace UJLoG</small></div></div><div class="pt3-rw"><span>Durée</span><b>30 jours</b></div><div class="pt3-rw"><span>Valable jusqu’au</span><b>${dtl(until)}</b></div><div class="pt3-rw"><span>Renouvellement</span><b>Manuel</b></div><div class="pt3-tt"><span>Total à payer</span><strong>${num(q.price)} FCFA</strong></div></div>`
  +`<h3 class="pt3-h">Moyen de paiement</h3><div class="pt3-ops" role="radiogroup">${ops}</div>`
  +`<h3 class="pt3-h">Numéro Mobile Money</h3><div class="pt3-ph"><span>${PAY.country.code}</span><input class="pt3-in" id="pTel" inputmode="numeric" autocomplete="tel-national" placeholder="07 00 00 00 00" value="${fmtTel(tmp.tel)}"></div><small class="pt3-hp" id="pHint">Vous recevrez une demande de confirmation sur ce numéro.</small>`
  +`<div class="pt3-act" style="--c1:${cb[0]};--c2:${cb[1]};--ct:${cb[2]}"><button class="pt-go plan" id="pGo" data-p="pay"${ready?'':' disabled'}>Payer ${num(q.price)} FCFA</button><p class="pt3-sec">${LOCK}<span>Aucun numéro ni code secret n’est enregistré dans l’application.</span></p><p class="pt3-sec" style="margin-top:2px"><span>L’abonnement dure 30 jours et ne se renouvelle pas automatiquement.</span></p></div></div>`};
 const procv=s=>{const q=PLANS[tmp.k],o=opOf(tmp.op),st=(a,b,c)=>`<li class="${c}"><i>${c==='dn'?CK:''}</i><span>${a}</span></li>`;
  return `<div class="pt-bar"><b>Paiement en cours</b>${PAY.demo?'<span class="pt3-demo">Mode test</span>':''}</div><div class="pt-sc pt3 pt3c"><div class="pt3-spin"></div><h2>Confirmez sur votre téléphone</h2><p>Une demande de <b>${num(q.price)} FCFA</b> a été envoyée au <b>${PAY.country.code} ${fmtTel(tmp.tel)}</b> via <b>${o.name}</b>. Validez-la avec votre code secret.</p><ul class="pt3-st">${st('Demande envoyée','',tmp.ref?'dn':'cr')}${st('En attente de votre validation','',tmp.ref?'cr':'')}${st('Abonnement activé','','')}</ul>${tmp.url?'<button class="pt2-btn" data-p="openpay">Ouvrir la page de paiement</button>':''}<button class="pt2-btn" data-p="cancel" style="color:var(--pm)">Annuler</button><p class="pt3-note">Ne fermez pas cette page tant que le paiement n’est pas confirmé.</p></div>`};
 const okv=s=>{const r=tmp.receipt||{},k=r.plan||'pro',q=PLANS[k],cb=(()=>{const b=BR(r.op);return b?[b[0],b[1],b[3]]:CB[k]})(),row=(a,b)=>`<div class="pt3-rw"><span>${a}</span><b>${b}</b></div>`;
  return `<div class="pt2-dh pt2" style="--g1:${(BR(r.op)||[GC[k]])[0]};margin-top:0;padding-top:calc(40px + env(safe-area-inset-top,0px))"><div class="pk-ico pk-win" style="--k:#22C55E" role="img" aria-label="Paiement confirmé"><i class="pk-r"></i><i class="pk-r r2"></i>${[0,1,2,3,4,5,6,7,8,9].map(n=>'<i class="pk-p" style="--a:'+n*36+'deg"></i>').join('')}<svg viewBox="0 0 120 120" aria-hidden="true"><circle class="pk-bg" cx="60" cy="60" r="44"/><circle class="pk-c" pathLength="1" cx="60" cy="60" r="44"/><g class="pk-g"><path pathLength="1" d="M42 62l13 13 24-28"/></g></svg></div><div class="pt2-seal pk-sl">${k==='pro'?CERT:VER}</div><h1 style="font-size:26px">Paiement confirmé</h1><p class="pt2-sub">Votre abonnement Partenaire ${q.n} est actif.</p></div><div class="pt-sc pt3" style="padding-top:8px"><div class="pt3-rc">${row('Référence',esc(r.ref||''))}${row('Montant',num(q.price)+' FCFA')}${row('Moyen de paiement',esc(r.op||''))}${row('Date',esc(r.date||''))}${row('Valable jusqu’au',dtl(r.until))}</div><div class="pt3-act" style="--c1:${cb[0]};--c2:${cb[1]};--ct:${cb[2]}"><button class="pt-go plan" data-p="fin">${(()=>{try{return((JSON.parse(localStorage.getItem('ujsim_db_v1')||'{}').t||{}).stores||[]).length?'Accéder à ma boutique':'Créer ma boutique'}catch(e){return 'Créer ma boutique'}})()}</button></div></div>`};
 const SUPPORT_WA='';/* numéro WhatsApp du support, format international sans + (ex. 2250700000000) */
 const KO={unavailable:['Paiement momentanément indisponible','Le service de paiement n’est pas encore ouvert. Réessayez un peu plus tard.',0],network:['Connexion impossible','Vérifiez votre connexion internet, puis réessayez.',1],timeout:['Demande non validée','La demande n’a pas été validée à temps. Si vous avez été débité, ne payez pas une seconde fois : contactez le support avec la référence ci-dessous.',1],refused:['Paiement refusé','L’opérateur a refusé la transaction : solde insuffisant, code secret erroné ou plafond atteint.',1],failed:['Paiement non abouti','Le paiement n’a pas pu être confirmé.',1]};
 const BR=n=>{n=String(n||'').toLowerCase();return n.includes('orange')?['#FF7900','#FFA04D','#000','#fff']:n.includes('mtn')?['#FFCC00','#FFE066','#000','#000']:n.includes('moov')?['#0093D0','#F7941D','#001B33','#fff']:n.includes('wave')?['#1DC8FF','#6FE0FF','#001826','#000']:null};
 const KOI={bar:'<path pathLength="1" d="M45 60h30"/>',x:'<path pathLength="1" d="M47 47 73 73"/><path pathLength="1" d="M73 47 47 73"/>',wifi:'<path pathLength="1" d="M36 53a34 34 0 0 1 48 0"/><path pathLength="1" d="M45 63a21 21 0 0 1 30 0"/><path pathLength="1" d="M38 38 82 82"/><circle cx="60" cy="73" r="2.6" fill="currentColor" stroke="none"/>',clock:'<path pathLength="1" d="M60 44v17l11 7"/>',pause:'<path pathLength="1" d="M52 46v28"/><path pathLength="1" d="M68 46v28"/>'};
 const KOM={refused:['bar','#E5484D','Refusé',['Vérifiez que votre solde est suffisant','Saisissez correctement votre code secret','Contrôlez votre plafond de transaction'],'Aucun montant n’a été débité.'],failed:['x','#E5484D','Non abouti',['Vérifiez votre solde avant de réessayer','Réessayez dans quelques instants','Changez de moyen de paiement si besoin'],'Aucun abonnement n’a été activé.'],network:['wifi','#E5484D','Hors connexion',['Activez le Wi‑Fi ou vos données mobiles','Rapprochez-vous d’une zone avec un meilleur réseau','Vérifiez votre solde si une demande est arrivée'],'Aucun abonnement n’a été activé.'],timeout:['clock','#F5A524','Expiré',['Ne payez pas une seconde fois','Consultez vos SMS et votre solde','Contactez le support avec la référence'],'Aucun abonnement n’a été activé.'],unavailable:['pause','#F5A524','Indisponible',['Le service ouvrira prochainement','Revenez un peu plus tard','Aucun montant n’a été débité'],'Aucun abonnement n’a été activé.']};
 const kov=s=>{const cd=KO[tmp.code]?tmp.code:'failed',k=KO[cd],m=KOM[cd],q=PLANS[tmp.k]||{},o=opOf(tmp.op),det=tmp.err&&cd!=='unavailable'&&cd!=='network'?`<div class="pk-det">${esc(tmp.err)}</div>`:'',
  at=tmp.koAt||(tmp.koAt=new Date()),dt=at.toLocaleDateString('fr-FR',{day:'2-digit',month:'short',year:'numeric'})+' à '+at.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}),
  dg=String(tmp.tel||'').replace(/\D/g,''),tel=dg.length>=4?(PAY.country.code+' '+dg.slice(0,2)+' •• •• '+dg.slice(-2)):'',
  bc=BR(o.name),rw=(a,b)=>`<div class="pt3-rw"><span>${a}</span><b>${b}</b></div>`,
  ref=tmp.ref?rw('Référence',esc(tmp.ref)):'',
  sup=SUPPORT_WA?`<button class="pt2-btn" data-p="sup" style="margin-top:6px">Contacter le support</button>`:'';
  return `<div class="pt-bar${bc?' pk-brb':''}"><b>Paiement</b></div><div class="pt-sc pt3 pt3c pk${bc?' pk-br':''}" style="--k:${bc?bc[0]:m[1]};${bc?'--bg:'+bc[2]:''}"><div class="pk-ico" role="img" aria-label="${k[0]}"><i class="pk-r"></i><i class="pk-r r2"></i><svg viewBox="0 0 120 120" aria-hidden="true"><circle class="pk-bg" cx="60" cy="60" r="44"/><circle class="pk-c" pathLength="1" cx="60" cy="60" r="44"/><g class="pk-g">${KOI[m[0]]}</g></svg></div><span class="pk-chip"><i></i>${m[2]}</span><h2>${k[0]}</h2><p>${k[1]}</p>${det}<div class="pt3-rc pk-rc">${rw('Montant','<span class="pk-am">'+num(q.price||0)+' FCFA</span>')}${q.n?rw('Offre','Partenaire '+q.n+' · 30 jours'):''}${o.name?rw('Moyen de paiement',o.name):''}${tel?rw('Numéro',tel):''}${rw('Date',dt)}${ref}</div>${k[2]?`<div class="pt3-act" style="--c1:${bc?bc[0]:'#4DB2FF'};--c2:${bc?bc[1]:'#1877F2'};--ct:${bc?bc[3]:'#fff'}"><button class="pt-go plan" data-p="retry">Réessayer</button></div><button class="pt2-btn" data-p="chg" style="margin-top:10px">Changer de moyen de paiement</button>`:`<div class="pt3-act" style="--c1:${bc?bc[0]:'#4DB2FF'};--c2:${bc?bc[1]:'#1877F2'};--ct:${bc?bc[3]:'#fff'}"><button class="pt-go plan" data-p="detail">Retour à l’offre</button></div>`}${sup}<p class="pk-sec">Paiement sécurisé · aucun code secret n’est conservé</p></div>`};
 const dash=(s,p)=>{if(s.shop.name&&!s.shop.uid){s.shop.uid=genUJM();pset(s)}const sh=s.shop,k=s.sub.plan,n=s.items.length,left=Math.max(0,Math.ceil((s.sub.exp-Date.now())/DAY)),fin=p.max===Infinity;
  return bar('Ma boutique','x')+`<div class="pt-sc" style="padding-top:0"><div class="pt-cv" style="${cvStyle(sh)}"></div><div class="pt-id">${logo({photo_url:sh.photo,name:sh.name||'B'},72)}<div><b>${esc(sh.name||'Ma boutique')}${k==='pro'?CERT:VER}</b><span>${sh.uid?esc(sh.uid)+' · ':''}Offre ${p.n} · ${left} jour${left>1?'s':''} restant${left>1?'s':''}</span></div></div>`
  +(!sh.name?'<div class="pt-note">Commencez par renseigner le nom, la photo de profil et la couverture de votre boutique.</div>':'')
  +`<div class="pt-use"><b>${n}${fin?'':' / '+p.max}</b> article${n>1?'s':''} publié${n>1?'s':''}${fin?' · illimité':''}${fin?'':`<i><u style="width:${Math.min(100,n/p.max*100)}%"></u></i>`}</div>`
  +(k==='pro'?sumHtml(s):'')+(left<=5?`<div class="pt-note">Votre abonnement se termine dans ${left} jour${left>1?'s':''}. <button class="pt-lk" data-p="buy" data-k="${k}">Renouveler</button></div>`:'')
  +`<div class="pt-act"><button class="pt-go alt" data-p="shop">${sh.name?'Modifier':'Créer'} la boutique</button><button class="pt-go" data-p="new">+ Article</button></div>`
  +(k==='standard'?`<div class="pt-up"><b>Passez en Pro · ${fmt(PLANS.pro.price)} / mois</b><span>Articles illimités, 5 photos par article, badge Certifié, promotions et mise en vedette.</span><button class="pt-go" data-p="det" data-k="pro">Passer en Pro</button></div>`:'')
  +`<h3>Mes articles</h3>`+(n?s.items.map((x,i)=>`<div class="pt-it">${x.ph&&x.ph[0]?`<img alt="" src="${esc(x.ph[0])}">`:'<span class="pt-im"></span>'}<div><b>${esc(x.t)}</b><small>${fmt(x.p)}${x.o?` <s>${fmt(x.o)}</s>`:''}${x.f?' · Vedette':''}${x.s?' · Épuisé':''}</small></div><div class="pt-ia"><button data-p="ed" data-i="${i}">Modifier</button>${k==='pro'?`<button data-p="dup" data-i="${i}">Dupliquer</button><button data-p="shr" data-i="${i}">Partager</button>`:''}<button class="dl" data-p="del" data-i="${i}">Retirer</button></div></div>`).join(''):'<div class="pt-empty">Aucun article pour l’instant.</div>')
  +`<button class="pt-lk" data-p="subs">Gérer mon abonnement</button></div>`};
 const shopv=s=>{const sh=s.shop;return bar(sh.name?'Modifier la boutique':'Créer ma boutique','home')+`<div class="pt-sc" style="padding-top:0"><label class="pt-cvup" style="${cvStyle(sh)}"><span>${sh.cover?'Changer la couverture':'+ Ajouter une couverture'}</span><input type="file" accept="image/*" hidden data-p="fc"></label><div class="pt-avw"><label class="pt-avup">${logo({photo_url:sh.photo,name:sh.name||'B'},84)}<em>+</em><input type="file" accept="image/*" hidden data-p="fa"></label><small>Photo de profil</small></div>`
  +`<label class="pt-l">Nom de la boutique</label><input id="pN" maxlength="40" placeholder="Ex. Chez Awa" value="${esc(sh.name||'')}"><label class="pt-l">Catégorie</label><select id="pC">${CATS.map(c=>`<option${sh.cat===c?' selected':''}>${esc(c)}</option>`).join('')}</select><label class="pt-l">Description</label><textarea id="pD" maxlength="300" placeholder="Que vendez-vous ? Horaires, conditions…">${esc(sh.desc||'')}</textarea><label class="pt-l">Horaires d’ouverture</label><input id="pH" maxlength="60" placeholder="Ex. Lun–Ven, 16 h – 19 h" value="${esc(sh.hours||'')}"><div class="pt-r2"><div><label class="pt-l">Téléphone / WhatsApp</label><input id="pL" inputmode="tel" placeholder="07 00 00 00 00" value="${esc(sh.tel||PRE.tel)}"></div><div><label class="pt-l">Lieu sur le campus</label><input id="pA" maxlength="60" placeholder="Ex. Cité B" value="${esc(sh.addr||PRE.addr)}"></div></div><button class="pt-go" data-p="ssave" style="margin-top:20px">Enregistrer</button></div>`};
 const itemv=(s,p)=>{const x=tmp.item,pro=s.sub.plan==='pro';
  return bar(tmp.idx==null?'Nouvel article':'Modifier l’article','home')+`<div class="pt-sc"><label class="pt-l" style="margin-top:0">Photos (${p.photos} maximum${pro?'':' · 5 en Pro'})</label><div class="pt-ph3">${x.ph.map(i=>`<img alt="" src="${esc(i)}">`).join('')}${x.ph.length<p.photos?`<label class="pt-add">+<input type="file" accept="image/*" hidden data-p="ip"></label>`:''}</div>`
  +`<label class="pt-l">Titre</label><input id="iT" maxlength="70" placeholder="Ex. Calculatrice Casio fx-92" value="${esc(x.t)}"><div class="pt-r2"><div><label class="pt-l">Prix (FCFA)</label><input id="iP" inputmode="numeric" value="${esc(x.p)}"></div><div><label class="pt-l">Catégorie</label><select id="iC">${CATS.map(c=>`<option${x.c===c?' selected':''}>${esc(c)}</option>`).join('')}</select></div></div>`
  +`<label class="pt-l">Prix barré (promotion)</label>`+(pro?`<input id="iO" inputmode="numeric" placeholder="Ancien prix, facultatif" value="${esc(x.o)}">`:`<button class="pt-lock" data-p="upg">Réservé à l’offre Pro<span class="pt-tag">PRO</span></button>`)
  +`<label class="pt-l">Description</label><textarea id="iD" maxlength="400" placeholder="État, taille, conditions…">${esc(x.d)}</textarea>`
  +`<label class="pt-l">Mise en vedette</label>`+(pro?`<label class="pt-chk"><input type="checkbox" id="iF"${x.f?' checked':''}>Afficher cet article en vedette</label>`:`<button class="pt-lock" data-p="upg">Réservé à l’offre Pro<span class="pt-tag">PRO</span></button>`)
  +`<label class="pt-l">Disponibilité</label><label class="pt-chk"><input type="checkbox" id="iS"${x.s?' checked':''}>Marquer comme épuisé</label>`+`<button class="pt-go" data-p="isave" style="margin-top:20px">Publier l’article</button></div>`};
 const draw=()=>{const k=d.scrollTop,s=S(),p=planOf(s);let h;
  if(!p&&!['subs','plans','detail','pay','proc','ok','ko'].includes(v))v='subs';
  h=v==='subs'?subs(s):v==='plans'?plans(s):v==='detail'?detail(s):v==='pay'?payv(s):v==='proc'?procv(s):v==='ok'?okv(s):v==='ko'?kov(s):v==='shop'?shopv(s):v==='item'?itemv(s,p):dash(s,p);
  d.innerHTML=h;d.scrollTop=k};
 const keepShop=()=>{const s=S();if(!g('#pN'))return s;Object.assign(s.shop,{name:g('#pN').value.trim(),cat:g('#pC').value,desc:g('#pD').value.trim(),tel:g('#pL').value.trim(),addr:g('#pA').value.trim(),hours:g('#pH').value.trim()});return s};
 const keepItem=()=>{if(!g('#iT'))return;const x=tmp.item;x.t=g('#iT').value;x.p=g('#iP').value.replace(/\D/g,'');x.c=g('#iC').value;x.d=g('#iD').value;if(g('#iO'))x.o=g('#iO').value.replace(/\D/g,'');if(g('#iF'))x.f=g('#iF').checked;if(g('#iS'))x.s=g('#iS').checked};
 const blank=()=>({t:'',p:'',o:'',c:CATS[0],d:'',f:false,s:false,ph:[]});
 draw();r.appendChild(d);
 d.addEventListener('input',e=>{if(e.target.id!=='pTel')return;e.target.value=fmtTel(e.target.value);tmp.tel=e.target.value;const go=g('#pGo');if(go)go.disabled=!(tmp.op&&digits(tmp.tel).length===PAY.country.len)});
 d.addEventListener('change',async e=>{const t=e.target,a=t.dataset.p;if(!a||!t.files||!t.files[0])return;
  if(a==='fc'||a==='fa'){const s=keepShop(),img=await shrink2(t.files[0],a==='fc'?900:300,.72);if(!img){toast('Image illisible');return}if(a==='fc')s.shop.cover=img;else s.shop.photo=img;pset(s);draw();return}
  if(a==='ip'){keepItem();const img=await shrink2(t.files[0],640,.75);if(img){tmp.item.ph.push(img);draw()}}});
 d.addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(!b||b.tagName==='INPUT')return;const a=b.dataset.p,s=S(),p=planOf(s);if(p&&(a==='buy'||a==='upg'||a==='pay')){toast('Votre pass '+p.n+' est en cours jusqu’au '+dt(s.sub.exp)+'. Un nouveau paiement sera possible après cette date.');return}
  if(a==='x'){stop();return d.remove()}
  if(a==='openpay'){if(tmp.url)window.open(tmp.url,'_blank','noopener');return}
  if(a==='stud'){d.remove();return sellSheet()}
  if(a==='home'){v='home';tmp={};return draw()}
  if(a==='plans'){v='plans';d.scrollTop=0;return draw()}
  if(a==='subs'){v='subs';tmp={};d.scrollTop=0;return draw()}
  if(a==='det'){tmp.sel=b.dataset.k;v='detail';d.scrollTop=0;return draw()}
  if(a==='sel'){tmp.sel=b.dataset.k;d.scrollTop=0;return draw()}
  if(a==='buy'){const k=b.dataset.k,q=PLANS[k];if(s.items.length>q.max){toast('Vous avez '+s.items.length+' articles : l’offre '+q.n+' en accepte '+q.max);return}tmp={k:k,sel:k,op:'',tel:''};v='pay';d.scrollTop=0;return draw()}
  if(a==='upg'){if(!p)return;tmp={sel:'pro'};v='detail';d.scrollTop=0;return draw()}
  if(a==='op'){tmp.tel=g('#pTel').value;tmp.op=b.dataset.o;return draw()}
  if(a==='detail'){v='detail';d.scrollTop=0;return draw()}
  if(a==='cancel'){stop();v='pay';return draw()}
  if(a==='retry'){v='pay';return draw()}
  if(a==='sup'){const q=PLANS[tmp.k]||{};window.open('https://wa.me/'+SUPPORT_WA+'?text='+encodeURIComponent('Bonjour, problème de paiement UJLoG MarketPlace. Offre '+(q.n||'')+', moyen '+opOf(tmp.op).name+(tmp.ref?', référence '+tmp.ref:'')+'.'),'_blank');return}
  if(a==='chg'){tmp.op='';v='pay';return draw()}
  if(a==='fin'){stop();d.remove();return openStore(null,'Ma boutique',null,true)}
  if(a==='pay'){const dg=digits(g('#pTel').value);if(!tmp.op||dg.length!==PAY.country.len)return;tmp.tel=dg;const q=PLANS[tmp.k],o=opOf(tmp.op),
   order={orderId:'UJ'+Date.now().toString(36).toUpperCase(),amount:q.price,currency:'XOF',plan:tmp.k,operator:tmp.op,phone:PAY.country.code+dg,description:'Abonnement Partenaire '+q.n+' · 30 jours'};
   tmp.ref=null;tmp.url='';v='proc';d.scrollTop=0;draw();const t0=Date.now(),alive=()=>d.isConnected&&v==='proc';
   const fail=(m,c)=>{stop();if(!alive())return;tmp.err=m;tmp.code=c||'failed';v='ko';draw()};
   PAY.create(order).then(r=>{if(!alive())return;tmp.ref=r.ref;tmp.url=(r.url&&/^https:\/\//.test(r.url))?r.url:'';if(tmp.url){try{window.open(tmp.url,'_blank','noopener')}catch(e){}}draw();
    timer=setInterval(async()=>{if(!alive())return stop();if(Date.now()-t0>120000)return fail('','timeout');
     try{const c=await PAY.check(r.ref);if(!alive())return;
      if(c.status==='failed')return fail(c.reason||'','refused');
      if(c.status==='success'){stop();const s2=S(),now=Date.now(),cur=planOf(s2),base=cur&&s2.sub.plan===tmp.k?s2.sub.exp:now;
       s2.sub={plan:tmp.k,at:now,exp:base+30*DAY,op:o.name,ref:r.ref};pset(s2);
       tmp.receipt={ref:r.ref,plan:tmp.k,op:o.name,date:new Date().toLocaleString('fr-FR',{dateStyle:'long',timeStyle:'short'}),until:s2.sub.exp};v='ok';d.scrollTop=0;draw()}
     }catch(e){}},2500)}).catch(e=>fail((e&&e.message)||'',(e&&e.code)||'unavailable'));return}
  if(a==='shop'){v='shop';return draw()}
  if(a==='ssave'){const first=!(S().shop&&S().shop.name),prevUid=(S().shop||{}).uid;const s2=keepShop();s2.shop.uid=prevUid||genUJM();if(!s2.shop.name||s2.shop.tel.replace(/\D/g,'').length<8){toast('Renseignez le nom et un téléphone valide');return}if(pset(s2)){v='home';draw();d.scrollTop=0;if(first)ujCelebrate(s2.shop.name,s2.shop.photo,s2.shop.uid);else toast('Boutique enregistrée')}return}
  if(a==='new'){if(s.items.length>=p.max){toast('Limite de '+p.max+' articles atteinte avec l’offre '+p.n);tmp={sel:'pro'};v='detail';d.scrollTop=0;return draw()}tmp={idx:null,item:blank()};v='item';d.scrollTop=0;return draw()}
  if(a==='ed'){const i=+b.dataset.i;tmp={idx:i,item:Object.assign(blank(),s.items[i])};v='item';d.scrollTop=0;return draw()}
  if(a==='dup'&&p&&s.sub.plan==='pro'){const x=s.items[+b.dataset.i];s.items.unshift(Object.assign({},x,{t:x.t+' (copie)',f:false,at:Date.now()}));if(pset(s))toast('Article dupliqué');return draw()}
  if(a==='shr'&&p&&s.sub.plan==='pro'){const x=s.items[+b.dataset.i],sh=s.shop,msg=x.t+' — '+fmt(x.p)+(x.o?' (au lieu de '+fmt(x.o)+')':'')+(x.d?'\n'+x.d:'')+'\n'+(sh.name?'Boutique '+sh.name:'')+(sh.tel?' · '+sh.tel:'')+'\nSur la Marketplace UJLoG';if(navigator.share){navigator.share({text:msg}).catch(()=>{})}else window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank');return}
  if(a==='del'){if(!confirm('Retirer cet article de votre boutique ?'))return;s.items.splice(+b.dataset.i,1);pset(s);return draw()}
  if(a==='isave'){keepItem();const x=tmp.item,pr=Number(x.p),o=Number(x.o||0);
   if(!x.t.trim()||!(pr>0)){toast('Renseignez le titre et un prix');return}
   if(o&&o<=pr){toast('Le prix barré doit être supérieur au prix');return}
   if(tmp.idx==null&&s.items.length>=p.max){toast('Limite de '+p.max+' articles atteinte');tmp={sel:'pro'};v='detail';d.scrollTop=0;return draw()}
   const it={t:x.t.trim(),p:pr,o:o||0,c:x.c,d:x.d.trim(),f:s.sub.plan==='pro'&&!!x.f,s:!!x.s,ph:x.ph.slice(0,p.photos),at:Date.now()};
   if(tmp.idx==null)s.items.unshift(it);else s.items[tmp.idx]=Object.assign(s.items[tmp.idx],it);
   if(pset(s)){toast('Article publié');v='home';tmp={};d.scrollTop=0;draw()}}
 })}

window.UJMK={open,close,show:(sl,n)=>openStore(sl,n),store:openStore,partner:partSheet};
})();
