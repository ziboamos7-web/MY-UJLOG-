
(function(){
if(window.__ujm)return;window.__ujm=1;
var K='uj_msg_v2',doc=document;
var MEM=[];
var COL=['#0EA5E9','#F59E0B','#F43F5E','#8B5CF6','#14B8A6','#EC4899'];
function E(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function T(){var d=new Date();return('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)}
function ini(n){return n.split(' ').map(function(w){return w[0]}).join('').slice(0,2).toUpperCase()}
function col(n){var h=0;for(var i=0;i<n.length;i++)h+=n.charCodeAt(i);return COL[h%COL.length]}
function seed(){return{id:10,v:"list",tab:"c",seg:"dm",cur:null,info:0,disc:[],c:[]}}
var S;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}if(!S||!S.c)S=seed();
function save(){try{localStorage.setItem(K,JSON.stringify(S,function(k,v){if(['rec','pk','mm','hm','ty','pl','sq','sel','mv','mk'].indexOf(k)>-1)return undefined;if(typeof v=='string'&&v.indexOf('blob:')==0)return'';return v}))}catch(e){}}
function C(id){return S.c.filter(function(c){return c.id==id})[0]}
function reqs(){var r=[];S.c.forEach(function(c){if(c.st=='in')r.push({k:'in',c:c});if(c.t=='g'&&c.adm)(c.jr||[]).forEach(function(n){r.push({k:'jr',c:c,n:n})})});return r}
function av(n,s){return'<span class="ua" style="background:'+col(n)+';'+(s?'width:'+s+'px;height:'+s+'px;font-size:'+s*.38+'px':'')+'">'+E(ini(n))+'</span>'}
var root=doc.createElement('div');root.id='ujm';root.hidden=true;doc.body.appendChild(root);
function sub(c){return c.st=='out'?'En attente d’acceptation':c.st=='req'?'Demande envoyée à l’administrateur':c.st=='no'?'Refusée':c.st=='in'?(c.t=='g'?'Invitation de '+E(c.by||''):'Demande de discussion'):(c.msgs.length?E((c.msgs[c.msgs.length-1].x||c.msgs[c.msgs.length-1].sys||'')):'')}
function unr(c){if(c.rs>Date.now())return 0;var rd=c.rd,l=c.msgs[c.msgs.length-1];if(rd==null)return l&&!l.me&&!l.sys&&c.st=='ok'?1:0;var n=0;for(var i=rd;i<c.msgs.length;i++)if(!c.msgs[i].me&&!c.msgs[i].sys)n++;return n}
function last(c){var l=c.msgs[c.msgs.length-1];if(c.st!='ok')return sub(c);if(c.t=='p'&&!c.msgs.some(function(m){return!m.sys}))return'Écris à la page '+E(c.n);if(!l)return'Dis bonjour à '+E(c.n);if(l.sys)return E(l.sys);return(l.me?'Vous : ':'')+(l.del?'🚫 Message supprimé':l.stk?'🎨 Sticker':l.vn?'🎤 Message vocal':l.img!=null?'📷 Photo':l.f?'📄 '+E(l.f):E(l.x||''))}
function list(){
 var R=reqs(),r=S.tab=='r',h=HL(r,r?'':'<button class="ib" data-a="new" aria-label="Nouvelle discussion">'+ic('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5M18 8v6M15 11h6"/>')+'</button>')+'<div class="ub ulb">';
 if(!r){
  if(1)h+='<input id="uls" class="uin" placeholder="Rechercher une discussion" value="'+E(S.ls||'')+'">';
  if(!S.ls)h+='<button class="ur ur2" data-a="tab:r"><span class="uaw"><span class="ua usq" style="width:56px;height:56px;background:linear-gradient(145deg,#3BDA82,#15803D)">'+ic('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5M15 17.500l2.300 2.300 4-4.600"/>')+'</span></span><span class="fl"><b class="ubo">Demandes de discussion</b><small>'+(R.length?R.length+' en attente de ta réponse':'Aucune demande')+'</small></span>'+(R.length?'<b class="ubd">'+R.length+'</b>':'')+'</button>';
  var L=S.c.filter(function(c){return c.st!='in'&&(!S.ls||c.n.toLowerCase().indexOf(S.ls.toLowerCase())>-1)});
  if(!L.length)h+='<p class="ue">'+(S.ls?'Aucun résultat.':'Aucune discussion. Touche l’icône en haut à gauche pour en démarrer une.')+'</p>';
  L.forEach(function(c){var u=unr(c),l=c.msgs[c.msgs.length-1],on=0;
   h+='<button class="ur ur2" data-a="open:'+c.id+'"><span class="uaw">'+(c.t=='g'?gav(c,56):av(c.n,56))+(on?'<i class="uon2"></i>':'')+'</span><span class="fl"><b class="'+(u?'ubo':'')+'">'+(c.t=='g'?'👥 ':c.t=='p'?'📄 ':'')+E(c.n)+'</b><small class="'+(u?'ubo':'')+'">'+last(c)+'</small></span>'+(u?'<b class="ubd">'+u+'</b>':(!l&&c.st=='ok'?'<span class="ucm">'+ic('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>')+'</span>':'<span class="ut">'+(l&&l.ts||'')+'</span>'))+'</button>'})}
 else{if(!R.length)h+='<p class="ue">Aucune demande en attente.</p>';
  R.forEach(function(q){var c=q.c;
   if(q.k=='in')h+='<div class="ur ur2">'+av(c.n,56)+'<span class="fl"><b class="ubo">'+E(c.n)+'</b><small>'+(c.t=='g'?'Invitation de '+E(c.by||'')+' à rejoindre le groupe':E(c.msgs[0]?c.msgs[0].x:'veut discuter avec toi'))+'</small><span class="uab"><button class="btn" data-a="acc:'+c.id+'">Accepter</button><button class="btn s" data-a="ref:'+c.id+'">Refuser</button></span></span></div>';
   else h+='<div class="ur ur2">'+av(q.n,56)+'<span class="fl"><b class="ubo">'+E(q.n)+'</b><small>veut rejoindre « '+E(c.n)+' »</small><span class="uab"><button class="btn" data-a="ja:'+c.id+':'+E(q.n)+'">Approuver</button><button class="btn s" data-a="jx:'+c.id+':'+E(q.n)+'">Refuser</button></span></span></div>'})}
 return h+'</div>'}
function nw(){
 var h=HD('Nouveau','back','')+'<div class="useg"><button data-a="seg:dm" aria-pressed="'+(S.seg=='dm')+'">Discussion</button><button data-a="seg:g" aria-pressed="'+(S.seg=='g')+'">Groupe</button></div><div class="ub">';
 if(S.seg=='dm'){h+='<p class="us">Le membre devra accepter avant que vous puissiez échanger.</p>';if(!MEM.length)h+='<p class="us">Aucun membre disponible pour le moment.</p>';
  MEM.forEach(function(n){if(S.c.some(function(c){return c.t=='dm'&&c.n==n}))return;h+='<button class="ur ur2" data-a="dm:'+E(n)+'">'+av(n,56)+'<span class="fl"><b>'+E(n)+'</b><small>Envoyer une demande</small></span></button>'})}
 else{h+='<input id="ugn" class="uin" placeholder="Nom du groupe" maxlength="40"><p class="us">Choisis les membres : chacun doit accepter l’invitation.</p>';
  MEM.forEach(function(n){h+='<label class="ur ur2">'+av(n,56)+'<span class="fl"><b>'+E(n)+'</b></span><input type="checkbox" class="ugm" value="'+E(n)+'"></label>'});
  h+='<button class="btn ujw" data-a="mk">Créer le groupe</button><p class="us">Groupes à rejoindre (l’administrateur doit approuver)</p>';
  S.disc.forEach(function(d){var sent=S.c.some(function(c){return c.did==d.id});h+='<div class="ur ur2">'+av(d.n,56)+'<span class="fl"><b>'+E(d.n)+'</b><small>'+E(d.d)+'</small></span>'+(sent?'<span class="ut">Envoyée</span>':'<button class="btn s ujb" data-a="join:'+d.id+'">Demander</button>')+'</div>'})}
 return h+'</div>'}
function ic(p){return'<svg class="i" viewBox="0 0 24 24">'+p+'</svg>'}
var BK=ic('<path d="M15 5l-7 7 7 7"/>'),DOT=ic('<circle cx="12" cy="5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="19" r="1.2"/>'),MIC=ic('<path d="M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4" stroke-width="2.4"/>'),SND=ic('<path d="M12 19V6M6 11.500l6-6 6 6" stroke-width="2.8"/>');
function gav(c,s){var L='';try{L=typeof LOGO!='undefined'?LOGO:''}catch(e){}return'<span class="ua ug2" style="width:'+s+'px;height:'+s+'px;'+(L?'background:#fff url('+L+') center/78% no-repeat':'background:'+col(c.n))+'">'+(L?'':E(ini(c.n)))+'</span>'}
var EMO=["😀", "😂", "🥹", "😍", "😘", "😎", "🤔", "😅", "😭", "😡", "👍", "👎", "🙏", "👏", "🔥", "❤️", "💯", "🎉", "✅", "❌", "😮", "🤝", "💪", "📚", "🎓", "☕", "😴", "🙌", "👌", "🤣", "😉", "🥳", "😢", "😊", "🤗", "🙄"];
var RX=['👍','❤️','😂','😮','🙏'],REP=['Ok, merci 👍','D’accord !','Je regarde ça et je te réponds.','😂😂','Parfait, à demain !'];
function fmt(n){return Math.floor(n/60)+':'+('0'+n%60).slice(-2)}
function bub(c,m,i,g){if(m.sys)return'<p class="us usy">'+E(m.sys)+'</p>';
 if(m.stk&&!m.del)return'<div class="ubb ust1'+(m.me?' me':'')+SC(i)+'" data-a="'+(S.sel?'sl':'mm')+':'+i+'">'+SK(m.stk)+'<i>'+m.ts+(m.me?TK(m):'')+'</i></div>';var b='';if(m.del)b='<span class="udl">🚫 Message supprimé</span>';
 else{if(m.img!=null)b+=m.img?'<img class="uim" src="'+E(m.img)+'" alt="Photo">':'<span class="udl">📷 Photo</span>';
  if(m.f)b+='<div class="udc"><span>📄</span><b>'+E(m.f)+'</b><small>'+E(m.sz||'')+'</small></div>';
  if(m.vn)b+='<div class="uvn"><button data-a="pl:'+i+'" aria-label="Lire">'+(S.pl===i?ic('<path d="M8 5v14M16 5v14"/>'):ic('<path d="M7 4l13 8-13 8z"/>'))+'</button><span class="uwf'+(S.pl===i?' on':'')+'">'+'<u></u><u></u><u></u><u></u><u></u><u></u><u></u><u></u><u></u><u></u><u></u><u></u>'+'</span><b>'+fmt(m.vn)+'</b></div>';
  if(m.x)b+='<span>'+E(m.x)+'</span>'}
 return'<div class="ubb'+(m.me?' me':'')+SC(i)+'" data-a="'+(S.sel?'sl':'mm')+':'+i+'">'+(g&&!m.me?'<b class="uwn" style="color:'+col(m.w)+'">~ '+E(m.w)+'</b>':'')+(m.q&&!m.del?'<div class="uq"><b style="color:'+col(m.q.w)+'">'+E(m.q.w)+'</b>'+E(m.q.x)+'</div>':'')+b+'<i>'+m.ts+(m.me?TK(m):'')+'</i>'+(m.rx?'<em class="urx">'+m.rx+'</em>':'')+'</div>'}
function chat(){var c=C(S.cur),g=c.t=='g',ok=c.st=='ok',q=(S.q||'').toLowerCase();
 var names=S.ty==c.id?'en train d’écrire…':g?(c.m.filter(function(m){return m.st=='ok'}).map(function(m){return m.n}).join(', ')||'Toi uniquement'):(c.blk?'Bloqué(e)':c.rs>Date.now()?'🔕 Restreint(e)':ok?(c.t=='p'?'Message à la page uniquement':'Discussion autorisée'):sub(c));
 var h='<header class="uh uhc uhd">'+MOT+'<button class="ib" data-a="back" aria-label="Retour">'+BK+'</button><button class="uw" data-a="'+(g?'info':c.t=='p'?'nop':'prof')+'">'+(g?gav(c,40):av(c.n,40))+'<span class="fl"><b>'+E(c.n)+'</b><small>'+E(names)+'</small></span></button>'+(ok?'<button class="ib" data-a="sq" aria-label="Rechercher">'+ic('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.5-4.5"/>')+'</button>':'')+'<button class="ib" data-a="hm" aria-label="Plus">'+DOT+'</button></header>';
 if(S.sq)h+='<div class="usb"><input id="usi" class="uin" placeholder="Rechercher dans la discussion" value="'+E(S.q||'')+'"></div>';
 h+='<div class="ub uwp" id="umm">';
 if(ok){var n=0;if(c.msgs.some(function(m){return!m.sys}))h+='<p class="us usy">Aujourd’hui</p>';
  c.msgs.forEach(function(m,i){if(q&&!(m.x||'').toLowerCase().includes(q))return;n++;h+=bub(c,m,i,g)});
  if(q&&!n)h+='<p class="us usy">Aucun résultat</p>';
  if(S.ty==c.id)h+='<div class="ubb ut2"><u></u><u></u><u></u></div>'}
 h+='</div>';
 if(S.hm)h+=MENU(c,g,ok);
 if(S.mm!=null&&c.msgs[S.mm]){var m=c.msgs[S.mm];h+='<div class="uov uob" data-a="mx"><div class="uas"><div class="urr">'+RX.map(function(e){return'<button data-a="rx:'+e+'">'+e+'</button>'}).join('')+'</div><button data-a="rp:'+S.mm+'">'+ic('<path d="M9 14L4 9l5-5M4 9h11a5 5 0 0 1 5 5v3"/>')+'Répondre</button>'+(m.x?'<button data-a="cp">'+ic('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>')+'Copier</button>':'')+(m.me&&!m.del?'<button data-a="del" style="color:var(--red)">'+ic('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>')+'Supprimer</button>':'')+'</div></div>'}
 if(ok){var rq=S.rp!=null&&c.msgs[S.rp];
  if(S.pk=='emo')h+='<div class="uem">'+EMO.map(function(e){return'<button data-a="ei:'+e+'">'+e+'</button>'}).join('')+'</div>';
  if(S.pk=='stk')h+=STP();
  h+=(rq?'<div class="urp"><span><b>'+E(rq.me?'Vous':rq.w)+'</b>'+E(rq.x||'Média')+'</span><button data-a="rpx" aria-label="Annuler">×</button></div>':'');
  if(S.sel)h+=SELB();else if(c.blk)h+='<div class="uc ubn"><span>Tu as bloqué '+E(c.n)+'. Vous ne pouvez plus échanger.</span><button class="ujb" data-a="blk">Débloquer</button></div>';else if(S.rec)h+='<div class="uc"><div class="ucp urec"><i class="urd"></i><b id="urt">0:00</b><span class="fl">Enregistrement…</span><button data-a="rc" style="color:var(--red);font-weight:700">Annuler</button></div><button class="ib ug" data-a="rs" aria-label="Envoyer le message vocal">'+SND+'</button></div>';
  else h+='<div class="uc"><div class="ucp"><button data-a="emo" aria-label="Emojis" class="'+(S.pk=='emo'?'on':'')+'">'+ic('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>')+'</button><textarea id="uti" rows="1" placeholder="'+(c.t=='p'?'Écrire à la page':'Message')+'" maxlength="1000">'+E(S.dr||'')+'</textarea><button data-a="stk" aria-label="Stickers" class="'+(S.pk=='stk'?'on':'')+'">'+STI+'</button></div><button class="ib ug" id="ubt" data-a="send"'+(S.dr&&S.dr.trim()?'':' hidden')+' aria-label="Envoyer">'+SND+'</button></div>'}
 else h+='<div class="uc ubn"><span>'+(c.st=='out'?'En attente : '+E(c.n)+' doit accepter la discussion avant que tu puisses écrire.':c.st=='req'?'L’administrateur doit approuver ta demande.':'Discussion non autorisée.')+'</span>'+'</div>';
 return h}
function ginfo(){var c=C(S.cur),n=c.m.length+1,gt=S.gt||'m';
 var h='<header class="uh"><button class="ib" data-a="back" aria-label="Retour">'+BK+'</button><span class="fl"></span><span class="ib">'+ic('<rect x="3.500" y="3.500" width="7" height="7" rx="1.500"/><rect x="13.500" y="3.500" width="7" height="7" rx="1.500"/><rect x="3.500" y="13.500" width="7" height="7" rx="1.500"/><path d="M14 14h3v3h-3zM19 19h1.500"/>')+'</span><span class="ib">'+DOT+'</span></header><div class="ub"><div class="ugh">'+gav(c,120)+'<h3>'+E(c.n)+'</h3><small>Groupe • '+n+' membres</small></div>';
 h+='<div class="uac"><button data-a="back"><span>'+ic('<path d="M4 5h16v11H9l-5 4z"/>')+'</span>Discussion</button><button data-a="share"><span>'+ic('<circle cx="6" cy="12" r="2.500"/><circle cx="17" cy="6" r="2.500"/><circle cx="17" cy="18" r="2.500"/><path d="M8.300 11l6.500-3.800M8.300 13l6.500 3.800"/>')+'</span>Partager</button><button data-a="gt:s"><span>'+ic('<circle cx="11" cy="11" r="6.500"/><path d="M20 20l-4.500-4.500"/>')+'</span>Rechercher</button></div>';
 h+='<div class="utb">'+[['m','Membres'],['p','Paramètres']].map(function(t){return'<button data-a="gt:'+t[0]+'" aria-pressed="'+(gt==t[0])+'">'+t[1]+'</button>'}).join('')+'</div>';
 if(gt=='d')h+='<p class="ue">Aucun média partagé pour le moment.</p>';
 else if(gt=='p')h+='<div class="ur"><span class="fl"><b>Approbation des nouveaux membres</b><small>Les invités doivent accepter et l’administrateur doit approuver les demandes d’adhésion.</small></span></div>'+'<button class="ur" data-a="leave:'+c.id+'" style="color:var(--red)"><span class="fl"><b>Quitter le groupe</b></span></button>';
 else{h+='<p class="us"><b>'+n+' membres</b></p>';
  (c.jr||[]).forEach(function(r){h+=c.adm?'<div class="um">'+av(r,48)+'<span class="fl"><b>'+E(r)+'</b><small>demande à rejoindre</small></span><button class="ujb" data-a="ja:'+c.id+':'+E(r)+'">Approuver</button><button class="ujb" data-a="jx:'+c.id+':'+E(r)+'">Refuser</button></div>':''});
  if(c.adm){h+='<button class="um uadd" data-a="addm"><span class="uplus">'+ic('<circle cx="10" cy="8" r="3.500"/><path d="M3 20c0-3.500 3-5.500 7-5.500M18 8v6M15 11h6"/>')+'</span><b>Ajouter des membres</b></button>';
   if(S.am){var o=MEM.filter(function(x){return!c.m.some(function(m){return m.n==x})});h+=o.length?'<div class="um"><select id="uis" class="uin">'+o.map(function(x){return'<option>'+E(x)+'</option>'}).join('')+'</select><button class="btn" data-a="inv:'+c.id+'" style="width:auto">Inviter</button></div>':'<p class="us">Tous les membres sont déjà dans le groupe.</p>'}}
  h+='<div class="um">'+av('Vous',48)+'<span class="fl"><b>Vous</b><small>Mon Reuf</small></span>'+(c.adm?'<em class="uad">Admin du groupe</em>':'')+'</div>';
  c.m.forEach(function(m,i){h+='<div class="um">'+av(m.n,48)+'<span class="fl"><b>'+E(m.n)+'</b><small>'+E(m.r||'Étudiant')+'</small></span>'+(m.st=='wait'?'<em class="uad">Invitation envoyée</em>':(m.a||i==0?'<em class="uad">Admin du groupe</em>':''))+'</div>'})}
 return h+'</div>'}
function render(){root.dataset.v=S.v;if(S.v=='chat'){var c0=C(S.cur);if(c0)c0.rd=c0.msgs.length}root.innerHTML=S.v=='new'?nw():S.v=='prof'?prof():S.v=='chat'?chat():S.v=='ginfo'?ginfo():list();var m=doc.getElementById('umm');if(m)m.scrollTop=m.scrollHeight;grow();badge()}
function badge(){var n=reqs().length;[].forEach.call(doc.querySelectorAll('.ujmb'),function(b){b.textContent=n||'';b.hidden=!n})}
function push(c,m){if(m.me){m.s=1;setTimeout(function(){if(m.s==1){m.s=2;save();if(S.v=='chat'&&C(S.cur)==c)render()}},900)}c.msgs.push(m)}
var A={
 close:function(){root.hidden=true},new:function(){S.v='new'},back:function(){S.v=(S.v=='ginfo'||S.v=='prof')?'chat':'list';S.rp=null},gt:function(a){S.gt=a[0]},addm:function(){S.am=!S.am},rp:function(a){S.rp=+a[0]},rpx:function(){S.rp=null},share:function(){try{navigator.share&&navigator.share({title:C(S.cur).n})}catch(e){}},leave:function(a){S.c=S.c.filter(function(x){return x.id!=a[0]});S.v='list'},
 tab:function(a){S.tab=a[0];S.ls=''},lq:function(){S.lq=!S.lq;S.ls=''},seg:function(a){S.seg=a[0]},open:function(a){S.cur=a[0];S.v='chat';S.info=0},
 dm:function(a){var c={id:'c'+(S.id++),t:'dm',n:a[0],st:'out',msgs:[]};S.c.unshift(c);S.cur=c.id;S.v='chat'},
 mk:function(){var n=(doc.getElementById('ugn').value||'').trim(),s=[].map.call(doc.querySelectorAll('.ugm:checked'),function(x){return x.value});if(!n||!s.length){doc.getElementById('ugn').focus();return}
  var c={id:'g'+(S.id++),t:'g',n:n,st:'ok',adm:1,m:s.map(function(x){return{n:x,st:'wait'}}),jr:[],msgs:[{sys:'Groupe créé. Chaque membre doit accepter son invitation.'}]};S.c.unshift(c);S.cur=c.id;S.v='chat'},
 join:function(a){var d=S.disc.filter(function(x){return x.id==a[0]})[0];S.c.unshift({id:'g'+(S.id++),t:'g',n:d.n,did:d.id,st:'req',m:[],msgs:[]});S.v='list';S.tab='c'},
 acc:function(a){var c=C(a[0]);c.st='ok';if(c.t=='g'){c.m=[{n:c.by||'Admin',st:'ok'}];push(c,{sys:'Tu as rejoint le groupe.'})}S.tab='c';S.cur=c.id;S.v='chat'},
 ref:function(a){var c=C(a[0]);S.c=S.c.filter(function(x){return x!=c})},
 ja:function(a){var c=C(a[0]);c.jr=c.jr.filter(function(n){return n!=a[1]});c.m.push({n:a[1],st:'ok'});push(c,{sys:a[1]+' a été approuvé(e).'})},
 jx:function(a){var c=C(a[0]);c.jr=c.jr.filter(function(n){return n!=a[1]})},
 info:function(){S.v='ginfo';S.gt='m'},
 sm:function(a){var c=C(a[0]);c.m.forEach(function(m){if(m.n==a[1])m.st='ok'})},
 inv:function(a){var c=C(a[0]),n=doc.getElementById('uis').value;c.m.push({n:n,st:'wait'})},
 sim:function(){},
 send:function(){var i=doc.getElementById('uti'),v=i.value.trim();if(!v)return;var cc=C(S.cur),qq=S.rp!=null&&cc.msgs[S.rp];push(cc,{me:1,x:v,ts:T(),q:qq?{w:qq.me?'Vous':qq.w,x:qq.x}:null});S.rp=null}};
var tmr=null;
function stopRec(){clearInterval(tmr);tmr=null;S.rec=0}
function addf(file,cam){var c=C(S.cur);if(!c||!file)return;var m={me:1,ts:T(),x:''};if(/^image\//.test(file.type)){m.img=URL.createObjectURL(file)}else{m.f=file.name;m.sz=file.size>1048576?(file.size/1048576).toFixed(1)+' Mo':Math.max(1,Math.round(file.size/1024))+' Ko'}push(c,m);S.pk=null;save();render()}
['ufi','ufc'].forEach(function(id){var i=doc.createElement('input');i.type='file';i.id=id;i.hidden=true;if(id=='ufc'){i.accept='image/*';i.setAttribute('capture','environment')}doc.body.appendChild(i);i.addEventListener('change',function(){[].forEach.call(i.files,function(f){addf(f)});i.value=''})});
function reply(c){}
var A2={
 mm:function(a){S.mm=+a[0]},mx:function(){S.mm=null},hm:function(){S.hm=!S.hm},hx:function(){S.hm=0},
 sq:function(){S.sq=!S.sq;S.q='';S.hm=0},clr:function(){C(S.cur).msgs=[];S.hm=0},
 emo:function(){S.pk=S.pk=='emo'?null:'emo'},att:function(){S.pk=S.pk=='att'?null:'att'},ei:function(a){S.dr=(S.dr||'')+a[0]},
 doc:function(){var i=doc.getElementById('ufi');i.accept='*/*';i.click()},gal:function(){var i=doc.getElementById('ufi');i.accept='image/*,video/*';i.click()},cam:function(){doc.getElementById('ufc').click()},
 mic:function(){S.rec=Date.now();S.pk=null;clearInterval(tmr);tmr=setInterval(function(){var e=doc.getElementById('urt');if(e)e.textContent=fmt(Math.round((Date.now()-S.rec)/1000))},500)},
 rc:function(){stopRec()},rs:function(){var s=Math.max(1,Math.round((Date.now()-S.rec)/1000)),c=C(S.cur);stopRec();push(c,{me:1,vn:s,ts:T()});reply(c)},
 pl:function(a){var i=+a[0],m=C(S.cur).msgs[i];S.pl=S.pl===i?null:i;if(S.pl===i)setTimeout(function(){if(S.pl===i){S.pl=null;if(S.v=='chat')render()}},(m.vn||3)*1000)},
 rx:function(a){var m=C(S.cur).msgs[S.mm];m.rx=m.rx==a[0]?'':a[0];S.mm=null},
 cp:function(){var m=C(S.cur).msgs[S.mm];try{navigator.clipboard.writeText(m.x)}catch(e){}S.mm=null},
 del:function(){var m=C(S.cur).msgs[S.mm];m.del=1;m.x='';m.img=null;delete m.vn;delete m.f;S.mm=null}};
Object.keys(A2).forEach(function(k){A[k]=A2[k]});
A.rp=function(a){S.rp=+a[0];S.mm=null};
A.send=function(){var i=doc.getElementById('uti'),v=(i?i.value:S.dr||'').trim();if(!v)return;var cc=C(S.cur),qq=S.rp!=null&&cc.msgs[S.rp];push(cc,{me:1,x:v,ts:T(),q:qq?{w:qq.me?'Vous':qq.w,x:qq.x||'Média'}:null});S.rp=null;S.dr='';S.pk=null;reply(cc)};

var MOT='<svg class="uhm" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g transform="rotate(-18 250 40)">'+[0,1,2,3,4,5,6,7].map(function(i){return'<ellipse cx="250" cy="40" rx="'+(28+i*24)+'" ry="'+(18+i*17)+'"/>'}).join('')+'</g></svg>';
function HL(r,b){return'<header class="uh uhl"><button class="ib" data-a="'+(r?'tab:c':'close')+'" aria-label="Retour">'+BK+'</button>'+(r?'<h2>Demandes</h2>':b)+'</header>'} function HD(t,bk,r){return'<header class="uh uhd ulh">'+MOT+'<button class="ib" data-a="'+bk+'" aria-label="Retour">'+BK+'</button><h2>'+t+(t=='Messages'?'<i class="uon"></i>':'')+'</h2><span class="uhr">'+(r||'')+'</span></header>'}
var STI=ic('<rect x="4" y="4" width="16" height="16" rx="5"/><path d="M8.500 13.500a4 4 0 0 0 7 0M9 9.500h.01M15 9.500h.01"/>');
function TK(m){return'<b class="utk s'+(m.s==null?3:m.s)+'"></b>'}
function SC(i){return S.sel&&S.sel.indexOf(i)>-1?' usel':''}
function grow(){var t=doc.getElementById('uti');if(t){t.style.height='auto';t.style.height=Math.min(t.scrollHeight,140)+'px'}}
var STK=[['Bravo','#F59E0B','🎉'],['Merci','#10B981','🙏'],['Salut','#0EA5E9','👋'],['Présent','#6366F1','✋'],['Examen','#F43F5E','📚'],['Café ?','#92400E','☕'],['OK','#15803D','👌'],['SOS','#DC2626','🆘'],['Courage','#8B5CF6','💪'],['Mdr','#EC4899','😂']],SCOL=['#15803D','#0EA5E9','#F59E0B','#F43F5E','#8B5CF6','#14B8A6','#EC4899','#0B1630'],SEMO=['😀','😎','🥳','🤓','😴','🔥','❤️','⭐','🎓','📚','☕','🌴'];
function SK(s){return'<svg class="usk" viewBox="0 0 120 120"><rect x="6" y="6" width="108" height="108" rx="36" fill="'+s.c+'" stroke="#fff" stroke-width="5"/><text x="60" y="66" font-size="44" text-anchor="middle">'+s.e+'</text><text x="60" y="98" font-size="15" font-weight="800" fill="#fff" text-anchor="middle">'+E(s.t||'')+'</text></svg>'}
function STP(){var h='<div class="ukp"><div class="ukg">';STK.forEach(function(s,i){h+='<button data-a="sk:'+i+'">'+SK({t:s[0],c:s[1],e:s[2]})+'</button>'});(S.mys||[]).forEach(function(s,i){h+='<button data-a="ms:'+i+'">'+SK(s)+'</button>'});h+='<button class="ukn" data-a="mks">+<small>Créer</small></button></div>';
if(S.mk){var d=S.sd;h+='<div class="ukm"><div id="upv">'+SK(d)+'</div><input id="ust" class="uin" maxlength="14" placeholder="Texte du sticker" value="'+E(d.t)+'"><div class="ukc">'+SCOL.map(function(c){return'<button data-a="sc:'+c+'" style="background:'+c+'" class="'+(d.c==c?'on':'')+'"></button>'}).join('')+'</div><div class="ukc">'+SEMO.map(function(e){return'<button data-a="se:'+e+'" class="'+(d.e==e?'on':'')+'">'+e+'</button>'}).join('')+'</div><button class="btn" data-a="ssv">Enregistrer et envoyer</button></div>'}
return h+'</div>'}
function SELB(){return'<div class="uc ubn usl"><button class="btn s" data-a="sx">Annuler</button><b>'+S.sel.length+' sélectionné(s)</b><button class="btn" data-a="sdel" style="background:var(--red)"'+(S.sel.length?'':' disabled')+'>Supprimer</button></div>'}
function MENU(c,g,ok){var b=function(a,t,x){return'<button data-a="'+a+'"'+(x?' style="color:var(--red)"':'')+'>'+t+'</button>'},h='<div class="uov" data-a="hx"><div class="upm">';
if(S.mv=='rs')h+='<p class="us" data-a="nop"><b>Restreindre pendant…</b></p>'+b('rs:1','1 jour')+b('rs:3','3 jours')+b('rs:7','7 jours');
else if(S.mv=='cf')h+='<p class="us" data-a="nop"><b>'+(g?'Quitter le groupe ?':'Supprimer la discussion ?')+'</b><br>Cette action est définitive.</p>'+b('leave:'+c.id,g?'Quitter':'Supprimer',1)+b('hx','Annuler');
else{h+=g?b('info','Infos du groupe'):c.t=='p'?'':b('prof','Voir le profil · s’abonner');if(ok)h+=b('sq','Rechercher')+b('selm','Supprimer des messages');
if(!g&&c.t!='p')h+=(c.rs>Date.now()?b('rsx','Lever la restriction'):b('rsm','Restreindre'))+b('blk',c.blk?'Débloquer':'Bloquer',!c.blk);
h+=b('clr','Vider la discussion')+b('cdel',g?'Quitter le groupe':'Supprimer la discussion',1)}
return h+'</div></div>'}
function prof(){var c=C(S.cur),sb=(S.sub||{})[c.n];return HD('Profil','back','')+'<div class="ub"><div class="ugh">'+av(c.n,110)+'<h3>'+E(c.n)+'</h3><small>Étudiant(e) · UJLoG</small></div><div class="uac"><button data-a="back"><span>'+ic('<path d="M4 5h16v11H9l-5 4z"/>')+'</span>Message</button><button data-a="subs"><span>'+ic(sb?'<path d="M5 12.500l4.500 4.500L19 7.500"/>':'<path d="M12 5v14M5 12h14"/>')+'</span>'+(sb?'Abonné(e)':'S’abonner')+'</button></div><p class="us">Sa page</p><div class="ur"><span class="fl"><b>'+(sb?'Tu suis sa page':'Tu ne suis pas sa page')+'</b><small>'+(sb?'Ses publications apparaissent dans ton fil.':'Abonne-toi pour voir ses publications dans ton fil.')+'</small></span></div></div>'}
function sendS(s){var c=C(S.cur);push(c,{me:1,stk:s,ts:T()});S.pk=null;S.mk=0;reply(c)}
Object.assign(A,{nop:function(){},hm:function(){S.hm=!S.hm;S.mv='m'},hx:function(){S.hm=0;S.mv='m'},prof:function(){S.v='prof';S.hm=0},
subs:function(){S.sub=S.sub||{};var n=C(S.cur).n;S.sub[n]=!S.sub[n]},rsm:function(){S.mv='rs'},cdel:function(){S.mv='cf'},
rs:function(a){var c=C(S.cur);c.rs=Date.now()+a[0]*864e5;S.hm=0;S.mv='m';push(c,{sys:'Tu as restreint '+c.n+' pendant '+a[0]+' jour(s).'})},
rsx:function(){C(S.cur).rs=0;S.hm=0},blk:function(){var c=C(S.cur);c.blk=!c.blk;S.hm=0;push(c,{sys:c.blk?'Tu as bloqué '+c.n+'.':'Tu as débloqué '+c.n+'.'})},
selm:function(){S.sel=[];S.hm=0},sx:function(){S.sel=null},sl:function(a){var i=+a[0],k=S.sel.indexOf(i);if(k>-1)S.sel.splice(k,1);else S.sel.push(i)},
sdel:function(){var c=C(S.cur);S.sel.sort(function(x,y){return y-x}).forEach(function(i){var m=c.msgs[i];if(m.me){m.del=1;m.x='';delete m.stk;delete m.vn}else c.msgs.splice(i,1)});S.sel=null},
stk:function(){S.pk=S.pk=='stk'?null:'stk';S.mk=0},mks:function(){S.mk=!S.mk;S.sd=S.sd||{t:'',c:'#15803D',e:'😀'}},sc:function(a){S.sd.c=a[0]},se:function(a){S.sd.e=a[0]},
sk:function(a){var s=STK[+a[0]];sendS({t:s[0],c:s[1],e:s[2]})},ms:function(a){sendS(S.mys[+a[0]])},
ssv:function(){var d=S.sd;(S.mys=S.mys||[]).push({t:d.t.trim()||'Moi',c:d.c,e:d.e});sendS(S.mys[S.mys.length-1])}});
root.addEventListener('click',function(e){var b=e.target.closest('[data-a]');if(!b)return;var p=b.dataset.a.split(':'),f=A[p.shift()],pv=S.v,t0=doc.getElementById('uti');if(t0)S.dr=t0.value;if(f){f(p);if(S.v=='chat'&&pv!='chat'){S.dr='';S.pk=null;S.sq=0;S.q='';S.hm=0;S.mm=null;S.rp=null;if(S.rec)stopRec()}if(S.v!='chat'&&S.rec)stopRec();save();render();if(S.v=='chat'){var i=doc.getElementById('uti');if(i&&p.length==0&&b.dataset.a=='send')i.focus()}}});
root.addEventListener('input',function(e){var id=e.target.id;if(id=='uti'){S.dr=e.target.value;grow();var b=doc.getElementById('ubt'),v=!!S.dr.trim();b.hidden=!v}else if(id=='ust'){S.sd.t=e.target.value;var pv=doc.getElementById('upv');if(pv)pv.innerHTML=SK(S.sd)}else if(id=='usi'||id=='uls'){var v2=e.target.value;if(id=='usi')S.q=v2;else S.ls=v2;render();var n=doc.getElementById(id);n.focus();n.setSelectionRange(v2.length,v2.length)}});
root.addEventListener('keydown',function(e){if(e.key=='Enter'&&e.target.id=='uti'&&!e.shiftKey&&!('ontouchstart' in window)){e.preventDefault();A.send();save();render();var i=doc.getElementById('uti');if(i)i.focus()}});
function open(){S.v='list';root.hidden=false;render()}
function openToPage(n){n=String(n||'').trim();if(!n)return open();var c=S.c.filter(function(x){return x.t=='p'&&x.n==n})[0];if(!c){c={id:'p'+(S.id++),t:'p',n:n,st:'ok',msgs:[{sys:'Ce message est envoyé uniquement à la page « '+n+' ». Pour discuter avec une personne, utilise ta messagerie (Nouvelle discussion).'}]};S.c.unshift(c)}S.cur=c.id;S.v='chat';S.dr='';S.pk=null;S.sq=0;S.q='';S.hm=0;S.mm=null;S.rp=null;root.hidden=false;save();render()}
function openTo(n){n=String(n||'').trim();if(!n)return open();var c=S.c.filter(function(x){return x.t=='dm'&&x.n==n})[0];if(!c){c={id:'c'+(S.id++),t:'dm',n:n,st:'out',msgs:[]};S.c.unshift(c)}S.cur=c.id;S.v='chat';S.dr='';S.pk=null;S.sq=0;S.q='';S.hm=0;S.mm=null;S.rp=null;root.hidden=false;save();render()}
doc.addEventListener('click',function(e){var t=e.target.closest('[data-msgpage],[data-msgto],[data-msg],[data-soon="Messages directs"]');if(!t)return;e.preventDefault();e.stopPropagation();t.hasAttribute('data-msgpage')?openToPage(t.getAttribute('data-msgpage')):t.hasAttribute('data-msgto')?openTo(t.getAttribute('data-msgto')):open()},true);
try{localStorage.removeItem('uj_msg_v1')}catch(e){}window.UJMSG={members:function(a){MEM=(a||[]).map(String);if(!root.hidden)render()},groups:function(a){S.disc=a||[];if(!root.hidden)render()},openWith:openTo,openPage:openToPage};setInterval(badge,1500);badge();
})();
