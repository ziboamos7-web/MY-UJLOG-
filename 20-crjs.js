
(function(){
var fm=n=>n>=1000?(n/1000).toFixed(1).replace('.',',')+' k':String(n);
var BADGES=[['EC','Certifié','Vérification',0,0],['EA','Argent','500 F · 30 jours',500,30],['EO','Or','500 F · 40 jours',500,40],['EP','Premium','1 000 F · 50 jours',1000,50]],B={},DAY=864e5;
try{B=JSON.parse(localStorage.getItem('uj_badges')||'{}')}catch(e){}
function unl(c){return c=='EC'?K.id=='ok':!!B[c]}
function act(c){return c=='EC'?K.id=='ok':(B[c]===1||B[c]>Date.now())}
function left(c){return Math.max(1,Math.ceil((B[c]-Date.now())/DAY))}
function saveB(){try{localStorage.setItem('uj_badges',JSON.stringify(B))}catch(e){}}
function step(){for(var i=0;i<BADGES.length;i++){var c=BADGES[i][0];if(!unl(c)){if(!i)return{c:c,k:'verify'};var p=BADGES[i-1][0];return(p=='EC'||!act(p))?{c:c,k:'buy'}:{c:c,k:'wait',d:left(p)}}}return null}
var RULES=[['500 abonnés, gardés 30 jours de suite',s=>s.f>=500&&s.fd>=30,s=>s.f+' / 500 · '+s.fd+' / 30 j'],['5 000 interactions au total (vues uniques + J’aime + commentaires)',s=>s.it>=5000,s=>fm(s.it)+' / 5 000'],['3 publications par jour',s=>s.dp>=3,s=>s.dp+' / 3'],['Aucune sanction récente',s=>!s.sanc,s=>s.sanc?'Sanction':'Aucune']];
var K={};try{K=JSON.parse(localStorage.getItem('uj_cr_k')||'{}')}catch(e){}
function saveK(){try{localStorage.setItem('uj_cr_k',JSON.stringify(K))}catch(e){}}
var VER=[['id','Pièce d’identité vérifiée (passeport, CMU ou pièce d’identité)',k=>k.id=='ok',k=>k.id=='pending'?'En vérification':'À faire','Vérifier'],['age','Avoir 18 ans minimum',k=>k.id=='ok',k=>k.id=='ok'?'Confirmé par la pièce':'Selon la pièce',''],['ph','Numéro vérifié par SMS',k=>!!k.ph,k=>k.ph?'Vérifié':'À faire','Vérifier'],['mm','Compte Orange Money ou Wave lié',k=>!!k.mm,k=>k.mm||'À faire','Lier'],['orig','Charte : photos originales uniquement',k=>!!k.orig,k=>k.orig?'Acceptée':'À accepter','Accepter']];
var st={on:false,posts:[],aud:{f:0,fd:0,sanc:false}},V={},L={},C={};
try{st.on=localStorage.getItem('uj_creator')==='1';V=JSON.parse(localStorage.getItem('uj_cr_views')||'{}');L=JSON.parse(localStorage.getItem('uj_cr_likes')||'{}');C=JSON.parse(localStorage.getItem('uj_cr_coms')||'{}')}catch(e){}
var ic={plus:'<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',menu:'<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',chv:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--mu)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',ck:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>',usr:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>'};
function cnt(o){var t=0;for(var k in o)t+=o[k].length;return t}
function stats(){var v=cnt(V),l=cnt(L),c=cnt(C),td=new Date().toDateString();return{f:st.aud.f,fd:st.aud.fd,v:v,l:l,c:c,it:v+l+c,p:st.posts.length,dp:st.posts.filter(function(p){return new Date(p.t).toDateString()==td}).length,sanc:st.aud.sanc}}
function pit(id){return(V[id]||[]).length+(L[id]||[]).length+(C[id]||[]).length}
function esc(t){var d=document.createElement('div');d.textContent=t;return d.innerHTML}
function nm(){var e=document.querySelector('#mypr h1,#mypr h2');return(e&&e.textContent.trim())||'Mon profil'}
function setOn(v){st.on=v;try{localStorage.setItem('uj_creator',v?'1':'0')}catch(e){}}
function go(id){document.querySelectorAll('.bd').forEach(b=>b.classList.toggle('on',b.id==id));var s=document.querySelector('#'+id+' .sc');if(s)s.scrollTop=0}
function allOk(){var t=stats();return BADGES.every(b=>unl(b[0]))&&RULES.every(r=>r[1](t))&&VER.every(v=>v[2](K))}
function prog(){var t=stats();return BADGES.filter(b=>unl(b[0])).length+RULES.filter(r=>r[1](t)).length+VER.filter(v=>v[2](K)).length}
/* Vues : une seule vue comptée par spectateur et par publication */
function viewer(){try{var v=localStorage.getItem('uj_vid');if(!v){v='v'+Math.random().toString(36).slice(2,9);localStorage.setItem('uj_vid',v)}return v}catch(e){return'v0'}}
function regView(pid,vid){var a=V[pid]=V[pid]||[];if(a.indexOf(vid)>-1)return false;a.push(vid);try{localStorage.setItem('uj_cr_views',JSON.stringify(V))}catch(e){}render();return true}
function regSet(R,key,pid,vid,on){var a=R[pid]=R[pid]||[],i=a.indexOf(vid);if(on&&i<0)a.push(vid);else if(!on&&i>-1)a.splice(i,1);else return false;try{localStorage.setItem(key,JSON.stringify(R))}catch(e){}render();return true}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-crid] .lkb');if(!b)return;var pid=b.closest('[data-crid]').dataset.crid;setTimeout(function(){regSet(L,'uj_cr_likes',pid,viewer(),b.getAttribute('aria-pressed')=='true')},0)},true);
var MIN=2000,WD=[];try{WD=JSON.parse(localStorage.getItem('uj_cr_wd')||'[]')}catch(e){}
function saveWD(){try{localStorage.setItem('uj_cr_wd',JSON.stringify(WD.slice(0,50)))}catch(e){}}
function toastc(m){var d=document.createElement('div');d.className='crtt';d.setAttribute('role','status');d.textContent=m;document.body.appendChild(d);setTimeout(function(){d.remove()},5000)}
function note(m){W.tx.unshift({t:Date.now(),l:m,a:0});W.tx=W.tx.slice(0,50);saveW();toastc(m);render()}
function API(){return window.UJ_API||{}}
function held(src){return WD.filter(function(x){return x.src==src&&x.st!='rejected'}).reduce(function(t,x){return t+x.a},0)}
function wdFlow(o){
 var ops=['Orange Money','Wave','MTN Money','Moov Money'],op=ops[0];
 var d=document.createElement('div');d.className='cro crfx';
 d.innerHTML='<div class="crsh" role="dialog" aria-label="Retirer mes gains"><h2>Retirer mes gains</h2><small style="color:var(--mu)">Disponible : '+fm2(o.bal)+' · retrait minimum '+fm2(MIN)+'</small><input class="crph" type="tel" inputmode="numeric" placeholder="Montant (min. 2 000 F)" data-a><div class="crop" style="flex-wrap:wrap">'+ops.map(function(x,i){return'<button aria-pressed="'+(i==0)+'" style="min-width:45%">'+x+'</button>'}).join('')+'</div><input class="crph" type="tel" inputmode="numeric" maxlength="10" placeholder="Numéro de réception (10 chiffres)" data-p><small class="wde" role="alert" style="color:#C81E1E"></small><button class="crgo" disabled>Demander le retrait</button></div>';
 document.body.appendChild(d);
 var ia=d.querySelector('[data-a]'),ip=d.querySelector('[data-p]'),g=d.querySelector('.crgo'),er=d.querySelector('.wde'),ob=d.querySelectorAll('.crop button');
 function chk(){var a=+ia.value;er.textContent=a&&a<MIN?'Retrait minimum : '+fm2(MIN):(a>o.bal?'Solde insuffisant':'');g.disabled=!(a>=MIN&&a<=o.bal&&ip.value.length==10)}
 ob.forEach(function(x,i){x.onclick=function(){ob.forEach(function(y){y.setAttribute('aria-pressed',y===x)});op=ops[i]}});
 ia.oninput=function(){ia.value=ia.value.replace(/\D/g,'');chk()};ip.oninput=function(){ip.value=ip.value.replace(/\D/g,'');chk()};
 g.onclick=function(){var a=+ia.value,p=ip.value;g.disabled=true;g.textContent='Envoi…';
  var req={id:'wd'+Date.now(),a:a,op:op,ph:p,src:o.label||'Creator',st:'pending',t:Date.now(),sent:0},A=API();
  (A.withdraw?A.withdraw({id:req.id,amount:a,operator:op,phone:p}).then(function(){req.sent=1}):Promise.resolve()).then(function(){
   o.reserve(a);WD.unshift(req);saveWD();render();
   d.querySelector('.crsh').innerHTML='<h2>Retrait en cours</h2><p>Ta demande de <b>'+fm2(a)+'</b> vers '+esc(op)+' ···'+esc(p.slice(-2))+' est en cours de validation. Tu recevras un message dès qu’elle sera créditée.</p><button class="crgo">Fermer</button>';
   d.querySelector('.crgo').onclick=function(){d.remove()}
  }).catch(function(){g.disabled=false;g.textContent='Réessayer';er.textContent='Envoi impossible, réessaie.'})};
 d.onclick=function(e){if(e.target===d)d.remove()};
}
function syncAll(){var A=API();
 if(A.creatorState)A.creatorState().then(function(r){if(!r)return;if(typeof r.bal=='number'){W.bal=r.bal;saveW()}if(r.kyc){K.id=r.kyc;saveK()}if(r.audience)st.aud=r.audience;render()}).catch(function(){});
 if(!A.withdrawals)return;
 if(A.withdraw)WD.filter(function(x){return!x.sent}).forEach(function(x){A.withdraw({id:x.id,amount:x.a,operator:x.op,phone:x.ph}).then(function(){x.sent=1;saveWD()}).catch(function(){})});
 A.withdrawals().then(function(list){(list||[]).forEach(function(r){var x=WD.filter(function(y){return y.id==r.id})[0];if(!x||x.st!='pending'||r.status=='pending')return;
  if(r.status=='paid'){x.st='paid';saveWD();note('Ton retrait de '+fm2(x.a)+' a été crédité sur '+x.op+' ···'+x.ph.slice(-2)+'.')}
  else if(r.status=='rejected'){x.st='rejected';saveWD();if(x.src=='Creator'){W.bal+=x.a;saveW()}note('Ton retrait de '+fm2(x.a)+' n’a pas pu être validé. Le montant est de nouveau disponible.')}})}).catch(function(){})}
window.UJCREATOR={view:regView,like:function(p,v,on){return regSet(L,'uj_cr_likes',p,v,on!==false)},comment:function(p,v){return regSet(C,'uj_cr_coms',p,v,true)},audience:function(a){st.aud=a;render()},withdraw:wdFlow,held:held};
setInterval(syncAll,60000);document.addEventListener('visibilitychange',function(){if(!document.hidden)syncAll()});setTimeout(syncAll,1500);
var io=window.IntersectionObserver&&new IntersectionObserver(es=>es.forEach(en=>{var el=en.target;if(en.isIntersecting){el._ct=setTimeout(()=>regView(el.dataset.crid,viewer()),1000)}else clearTimeout(el._ct)}),{threshold:.6});
var W={bal:0,tx:[]};try{W=JSON.parse(localStorage.getItem('uj_cr_w')||'null')||W}catch(e){}
function saveW(){try{localStorage.setItem('uj_cr_w',JSON.stringify(W))}catch(e){}}
function credit(a,l){W.bal+=a;W.tx.unshift({t:Date.now(),l:l,a:a});W.tx=W.tx.slice(0,50);saveW();render()}
function walletHTML(){return'<div class="crsd"><small>Solde Creator</small><b>'+fm2(W.bal)+'</b><small>'+(K.mm?'Versé sur '+esc(K.mm):'Aucun compte Mobile Money lié')+'</small><div class="ro"><button data-cwd>Retirer</button><button class="g" data-chist>Historique</button></div></div>'}
function withdraw(){wdFlow({bal:W.bal,label:'Creator',reserve:function(a){W.bal-=a;saveW()}})}
function hist(){var dt=function(t){return new Date(t).toLocaleDateString('fr-FR')},pw=WD.filter(function(x){return x.st=='pending'}).map(function(x){return'<p><span>Retrait en cours de validation<br><small style="color:var(--mu)">'+dt(x.t)+' · '+esc(x.op)+' ···'+esc(x.ph.slice(-2))+'</small></span><span>'+fm2(x.a)+'</span></p>'}).join('');var m=ov('<h2>Historique des gains</h2><div class="ru crtx">'+pw+(W.tx.length?W.tx.map(function(x){return'<p><span>'+esc(x.l)+'<br><small style="color:var(--mu)">'+dt(x.t)+'</small></span>'+(x.a?'<span class="'+(x.a>0?'pos':'')+'">'+(x.a>0?'+':'−')+fm2(Math.abs(x.a))+'</span>':'')+'</p>'}).join(''):(pw?'':'<p>Aucun mouvement pour l’instant.</p>'))+'</div><button class="r" data-a="x">Retour</button>','crm');m.onclick=function(e){if(e.target.closest('[data-a]'))m.remove()}}
function analysis(){var t=stats(),pc=function(n){return t.it?Math.round(n*100/t.it)+' %':'0 %'};
 var rows=st.posts.map(function(p){var v=(V[p.id]||[]).length,l=(L[p.id]||[]).length,c=(C[p.id]||[]).length;return'<p><span>'+esc((p.c||'Publication').slice(0,40))+'<br><small style="color:var(--mu)">'+v+' vues + '+l+' J’aime + '+c+' commentaires</small></span><span class="pos">'+(v+l+c)+'</span></p>'}).join('');
 var m=ov('<h2>Analyse des interactions</h2><div class="ru crtx"><p><span>Vues uniques</span><span>'+t.v+' · '+pc(t.v)+'</span></p><p><span>J’aime</span><span>'+t.l+' · '+pc(t.l)+'</span></p><p><span>Commentaires</span><span>'+t.c+' · '+pc(t.c)+'</span></p><p><b>Total des interactions</b><b>'+t.it+' / 5 000</b></p></div><h2>Décryptage par publication</h2><div class="ru crtx">'+(rows||'<p>Aucune publication pour l’instant.</p>')+'</div><button class="r" data-a="x">Retour</button>','crm');m.onclick=function(e){if(e.target.closest('[data-a]'))m.remove()}}
function build(){
 if(document.getElementById('acr'))return;var ap=document.getElementById('app');if(!ap)return;
 var s=document.createElement('section');s.className='bd';s.id='acr';
 s.innerHTML='<h2>Creator</h2><div class="ph"><div class="sc"><header class="hx"><div class="row hd4"><button class="crt" data-cswitch aria-label="Changer de page"><span class="crw">Creator</span>'+ic.chv+'</button><div class="fl"></div><button class="ib" data-cplus aria-label="Publier">'+ic.plus+'</button><button class="ib" data-cmenu aria-label="Menu">'+ic.menu+'</button></div></header><div id="crbody"></div></div></div>';
 ap.appendChild(s);render();
}
function render(){
 var b=document.getElementById('crbody');if(!b)return;var t=stats(),n=nm();
 b.innerHTML='<div class="crp"><div class="crav">'+esc(n.charAt(0).toUpperCase())+'</div><h1>'+esc(n)+'</h1><small>Page Creator</small></div><div class="crst"><div><b>'+fm(t.f)+'</b><span>Abonnés</span></div><div><b>'+fm(t.it)+'</b><span>Interactions</span></div><div><b>'+t.p+'</b><span>Publications</span></div></div>'+walletHTML()+'<div style="padding:12px 14px 0"><button class="crpick" data-cana>Analyser mes interactions</button></div>'+(st.posts.length?'<div class="crgr">'+st.posts.map(p=>{var c=pit(p.id);return'<i style="background-image:url('+p.img+')"><em>'+c+(c>1?' interactions':' interaction')+(p.m?' · €':'')+'</em></i>'}).join('')+'</div>':'<div class="cre">Aucune publication pour l’instant.<br>Touche + pour publier : ta photo arrive directement dans le fil principal.</div>');
}
function ov(h,c,host){var p=document.querySelector((host||'#acr')+' .ph');var o=document.createElement('div');o.className=c;o.innerHTML=h;p.appendChild(o);return o}
function publish(files,cap,mo,thumb){
 var tx=document.getElementById('ptx'),pf=document.getElementById('pfile'),pb=document.getElementById('ppub');if(!tx||!pf||!pb)return;
 var dt=new DataTransfer();files.forEach(f=>dt.items.add(f));pf.files=dt.files;pf.dispatchEvent(new Event('change',{bubbles:true}));
 var n=0,iv=setInterval(()=>{
  if(document.querySelectorAll('#pth .th').length<files.length&&++n<60)return;clearInterval(iv);
  tx.value=cap;tx.dispatchEvent(new Event('input',{bubbles:true}));
  var id='cr'+Date.now(),orig=window.UJADDPOST;
  window.UJADDPOST=function(t,el){if(el&&el.dataset){el.dataset.crid=id;io&&io.observe(el)}return orig&&orig.apply(this,arguments)};
  pb.click();window.UJADDPOST=orig;
  st.posts.unshift({id:id,img:thumb,m:mo,c:cap,t:Date.now()});setTimeout(()=>{go('acr');render()},60);
 },100);
}
function sheet(){
 var files=[],mo=true;var o=ov('<div class="crsh"><h2>Publier en Creator</h2><input type="file" accept="image/*" multiple hidden><button class="crpick">Choisir des photos</button><div class="crth"></div><textarea placeholder="Écris une légende…" maxlength="300"></textarea><div class="crtg"><span>Contenu monétisé</span><button aria-pressed="true" aria-label="Contenu monétisé"></button></div><small style="color:var(--mu)">Ta publication apparaît dans le fil principal de l’appli.</small><button class="crgo" disabled>Publier</button></div>','cro');
 var f=o.querySelector('input'),th=o.querySelector('.crth'),g2=o.querySelector('.crgo'),tg=o.querySelector('.crtg button'),urls=[];
 o.querySelector('.crpick').onclick=()=>f.click();
 f.onchange=()=>{Array.prototype.forEach.call(f.files,x=>{files.push(x);urls.push(URL.createObjectURL(x))});th.innerHTML=urls.map(u=>'<i style="background-image:url('+u+')"></i>').join('');g2.disabled=!files.length};
 tg.onclick=()=>{mo=!mo;tg.setAttribute('aria-pressed',mo)};
 g2.onclick=()=>{publish(files.slice(0,20),o.querySelector('textarea').value,mo,urls[0]);o.remove()};
 o.onclick=e=>{if(e.target===o)o.remove()};
}
function bRow(i,on){var b=BADGES[i],c=b[0],s=step(),ok=unl(c),h,top=-1;BADGES.forEach((x,j)=>{if(unl(x[0]))top=j});
 if(ok){if(c=='EC')h='Vérifié';else if(act(c))h='Actif · '+left(c)+' j';else h=(top==i&&on)?'<button class="crbuy" data-buy="'+c+'">Renouveler · '+fm2(b[3])+'</button>':'Débloqué'}
 else if(s&&s.c==c){if(s.k=='verify')h=on?'<button class="crbuy" data-verify>Vérifier mon profil</button>':'À faire';else if(s.k=='buy')h=on?'<button class="crbuy" data-buy="'+c+'">Obtenir · '+fm2(b[3])+'</button>':fm2(b[3]);else h='Dans '+s.d+' j'}
 else h='Verrouillé';
 return'<p class="'+(ok?'ok':'')+'">'+(ok?'●':'○')+' Niveau '+(i+1)+' · '+b[1]+(b[4]?' ('+b[4]+' j)':'')+'<span>'+h+'</span></p>'}
function condHTML(on){var t=stats();return'<div class="ru crcd"><b>Étape 1 · Les 4 badges, un par un</b>'+BADGES.map((b,i)=>bRow(i,on)).join('')+'<b>Étape 2 · Audience et activité</b>'+RULES.map(r=>{var ok=r[1](t);return'<p class="'+(ok?'ok':'')+'">'+(ok?'●':'○')+' '+r[0]+'<span>'+r[2](t)+'</span></p>'}).join('')+'<b>Étape 3 · Vérifications du compte</b>'+VER.map(v=>vRow(v,on)).join('')+'</div>'}
function vRow(v,on){var ok=v[2](K),gt=!ok&&(v[0]=='id'||v[0]=='age'||v[0]=='ph')&&!unl('EP'),b=on&&!ok&&!gt&&v[4]&&!(v[0]=='id'&&K.id=='pending');return'<p class="'+(ok?'ok':'')+'">'+(ok?'●':'○')+' '+v[1]+'<span>'+(b?'<button class="crbuy" data-v="'+v[0]+'">'+v[4]+'</button>':(gt?'Dès le niveau 4':v[3](K)))+'</span></p>'}
function fm2(n){return String(n).replace(/\B(?=(\d{3})+$)/g,' ')+' F'}
var BADGE_PAY={create:function(o){var A=window.UJ_PAY;return A&&A.create?A.create(o):Promise.reject(new Error('indisponible'))}};
var curCond=null;
function buy(code){
 var b=BADGES.filter(x=>x[0]==code)[0],op='Orange Money';
 var o=ov('<div class="crsh"><h2>Badge '+b[1]+'</h2><small style="color:var(--mu)">'+b[4]+' jours · sans renouvellement automatique</small><div class="crop"><button aria-pressed="true">Orange Money</button><button aria-pressed="false">Wave</button></div><input class="crph" type="tel" inputmode="numeric" maxlength="10" placeholder="Numéro Mobile Money (10 chiffres)"><button class="crgo" disabled>Payer '+fm2(b[3])+'</button></div>','cro','#a4');
 var ph=o.querySelector('input'),go2=o.querySelector('.crgo'),ops=o.querySelectorAll('.crop button');
 ops.forEach(x=>x.onclick=()=>{ops.forEach(y=>y.setAttribute('aria-pressed',y===x));op=x.textContent});
 ph.oninput=()=>{ph.value=ph.value.replace(/\D/g,'');go2.disabled=ph.value.length!=10};
 go2.onclick=()=>{go2.disabled=true;go2.textContent='Paiement en cours…';BADGE_PAY.create({badge:code,amount:b[3],operator:op,phone:ph.value,days:b[4]}).then(r=>{if(r&&r.status=='paid'){B[code]=Date.now()+b[4]*DAY;saveB();o.remove();if(curCond){curCond.remove();conditions()}}else{go2.disabled=false;go2.textContent='Réessayer'}}).catch(()=>{go2.disabled=false;go2.textContent='Réessayer'})};
 o.onclick=e=>{if(e.target===o)o.remove()};
}
function switcher(){
 var host=document.getElementById('acr').classList.contains('on')?'#acr':'#a4',cr=host=='#acr';
 var o=ov('<div class="crsh"><h2>Changer de page</h2><button class="crsw" data-to="a4"><span class="av2">'+ic.usr+'</span><span>Profil étudiant<small>Ton profil et ton fil</small></span>'+(cr?'':'<span class="ck">'+ic.ck+'</span>')+'</button><button class="crsw" data-to="acr"><span class="av2 c">'+esc(nm().charAt(0).toUpperCase())+'</span><span>Page Creator<small>Publie et suis tes vues</small></span>'+(cr?'<span class="ck">'+ic.ck+'</span>':'')+'</button></div>','cro',host);
 o.onclick=e=>{var b=e.target.closest('[data-to]');if(b){var to=b.dataset.to;o.remove();var mm=document.getElementById('mymenu');if(mm)mm.hidden=true;build();render();go(to)}else if(e.target===o)o.remove()};
}
function menu(){
 var m=ov('<h2>Menu Creator</h2><button class="r" data-a="close">Mon profil Creator</button><button class="r" data-a="sw">Changer de page</button><button class="r" data-a="rules">Conditions de monétisation</button><button class="r" data-a="ana">Analyse des interactions</button><button class="r" data-a="off">Quitter le mode Creator</button><button class="r" data-a="x">Fermer</button>','crm');
 m.onclick=e=>{var a=e.target.closest('[data-a]');if(!a)return;a=a.dataset.a;
  if(a=='rules'){m.innerHTML='<h2>Conditions de monétisation</h2>'+condHTML(false)+'<button class="r" data-a="x">Retour</button>';return}
  m.remove();if(a=='ana')analysis();if(a=='sw')switcher();if(a=='off'){setOn(false);go('a4')}};
}
function conditions(){
 var ok=allOk();var o=curCond=ov('<div class="crsh"><h2>Débloquer le profil Creator</h2><small style="color:var(--mu)">Les badges se débloquent un par un, après la durée du badge précédent. Ensuite : audience et activité. La pièce d’identité et le téléphone se vérifient au dernier niveau.</small>'+condHTML(true)+'<button class="crgo" data-act'+(ok?'':' disabled')+'>Activer le profil Creator</button></div>','cro','#a4');
 o.onclick=e=>{if(e.target===o){o.remove();return}
  var bu=e.target.closest('[data-buy]');if(bu){buy(bu.dataset.buy);return}
  var vb=e.target.closest('[data-v]');if(vb){verifSheet(vb.dataset.v);return}
  if(e.target.closest('[data-verify]')){verifSheet('id');return}
  if(e.target.closest('[data-act]')){setOn(true);o.remove();refreshEntry()}};
}
function verifSheet(k){
 var T={id:'Vérifier une pièce',ph:'Vérifier mon numéro',mm:'Lier un compte Mobile Money',orig:'Charte des photos originales'}[k];
 var body={id:'<small style="color:var(--mu)">Choisis le type de pièce, puis envoie une photo lisible. Elle sert uniquement à la vérification.</small><div class="crop"><button aria-pressed="true">Passeport</button><button aria-pressed="false">CMU</button><button aria-pressed="false">Pièce d’identité</button></div><input type="file" accept="image/*" hidden><button class="crpick">Prendre ou choisir une photo</button>',ph:'<input class="crph" type="tel" inputmode="numeric" maxlength="10" placeholder="Numéro (10 chiffres)"><input class="crph" type="tel" inputmode="numeric" maxlength="6" placeholder="Code reçu par SMS (6 chiffres)" hidden>',mm:'<div class="crop"><button aria-pressed="true">Orange Money</button><button aria-pressed="false">Wave</button></div><input class="crph" type="tel" inputmode="numeric" maxlength="10" placeholder="Numéro Mobile Money (10 chiffres)">',orig:'<small style="color:var(--mu)">Je m’engage à ne publier que des photos prises par moi ou dont je détiens les droits.</small>'}[k];
 var lab={id:'Envoyer pour vérification',ph:'Envoyer le code',mm:'Lier ce compte',orig:'J’accepte'}[k];
 var o=ov('<div class="crsh"><h2>'+T+'</h2>'+body+'<button class="crgo"'+(k=='orig'?'':' disabled')+'>'+lab+'</button></div>','cro','#a4');
 var g=o.querySelector('.crgo'),ins=o.querySelectorAll('input.crph'),ch=o.querySelectorAll('.crop button'),sel=0,file=o.querySelector('input[type=file]'),stage=0,types=['Passeport','CMU','Pièce d’identité'],ops=['Orange Money','Wave'];
 function chk(){if(k=='ph')g.disabled=stage?ins[1].value.length!=6:ins[0].value.length!=10;if(k=='mm')g.disabled=ins[0].value.length!=10}
 ch.forEach((x,i)=>x.onclick=()=>{ch.forEach(y=>y.setAttribute('aria-pressed',y===x));sel=i});
 if(file){var pk=o.querySelector('.crpick');pk.onclick=()=>file.click();file.onchange=()=>{g.disabled=!file.files.length;pk.textContent=file.files.length?'Photo choisie ✓':'Prendre ou choisir une photo'}}
 ins.forEach(i=>i.oninput=()=>{i.value=i.value.replace(/\D/g,'');chk()});
 g.onclick=()=>{
  if(k=='ph'){var VF=window.UJ_VERIFY;if(!VF){g.textContent='Service SMS indisponible';return}g.disabled=true;if(!stage){VF.sendCode(ins[0].value).then(function(){stage=1;ins[1].hidden=false;g.textContent='Valider le code'}).catch(function(){g.textContent='Réessayer';g.disabled=false});return}VF.check(ins[0].value,ins[1].value).then(function(ok){if(ok){K.ph=1;saveK();o.remove();if(curCond){curCond.remove();conditions()}}else{g.textContent='Code incorrect';g.disabled=false}}).catch(function(){g.textContent='Réessayer';g.disabled=false});return}
  if(k=='id'){K.id='pending';K.idt=types[sel]}
  if(k=='mm')K.mm=ops[sel]+' ···'+ins[0].value.slice(-2);
  if(k=='orig')K.orig=1;
  saveK();o.remove();if(curCond){curCond.remove();conditions()}};
 o.onclick=e=>{if(e.target===o)o.remove()};
}
function entry(){
 var h=document.getElementById('mmhome');if(!h||h.querySelector('.crent'))return false;
 var t=stats(),n=prog(),d=document.createElement('div');d.className='crent';
 d.innerHTML=st.on?'<b>Profil Creator</b><span>Ta page Creator est active. Passe de page en page quand tu veux.</span><button data-center>Ouvrir ma page Creator</button><button class="crs2" data-cswitch>Changer de page</button>':'<b>Profil Creator</b><span>Se débloque avec la monétisation ('+n+'/'+(BADGES.length+RULES.length+VER.length)+' conditions remplies).</span><button data-ccond>Voir les conditions</button>';
 var top=h.querySelector('.mmtop');top?top.after(d):h.prepend(d);return true;
}
function refreshEntry(){var h=document.getElementById('mmhome'),e=h&&h.querySelector('.crent');if(e)e.remove();entry()}
document.addEventListener('click',e=>{
 if(e.target.closest('[data-cwd]')){withdraw();return}
 if(e.target.closest('[data-chist]')){hist();return}
 if(e.target.closest('[data-cana]')){analysis();return}
 if(e.target.closest('[data-cplus]')){sheet();return}
 if(e.target.closest('[data-cmenu]')){menu();return}
 if(e.target.closest('[data-cswitch]')){switcher();return}
 if(e.target.closest('[data-ccond]')){conditions();return}
 if(e.target.closest('[data-center]')){var mm=document.getElementById('mymenu');if(mm)mm.hidden=true;build();render();go('acr')}
},true);
build();var n=0,iv=setInterval(()=>{entry();if(++n>20)clearInterval(iv)},400);
})();
