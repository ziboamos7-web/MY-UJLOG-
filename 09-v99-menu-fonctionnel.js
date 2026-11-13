
(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const MM=()=>document.getElementById('mymenu');
const ic=(n,s=22)=>`<svg class="i" aria-hidden="true" style="width:${s}px;height:${s}px"><use href="#${n}"/></svg>`;
const say=m=>{const t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('on');clearTimeout(say._t);say._t=setTimeout(()=>t.classList.remove('on'),2600)};
const fmt=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'\u202f');
const S={resto:1600,amt:1,op:1,card:0,pc:0,td:0,lock:false,rev:false,g:{v:0,i:0,f:0},paid:false,amt2:1,op2:0,amt3:0,op3:0,tx:[],
 cm:[],
 posts:[],arch:[],
 off:[['Plan du campus','PDF · 2 Mo'],['Menu de la semaine · Restaurant','Texte · 0,1 Mo'],['Calendrier universitaire','PDF · 1 Mo']],
 sp:[48,120,12],camp:[],sched:[],remind:false,ver:0,hist:[],ret:null,syn:0};
let cur=null;
const sub=s=>`<span class="mu" style="font-size:13px;display:block">${s}</span>`;
const H={
 sec:t=>`<p class="mms">${t}</p>`,
 card:r=>`<div class="card">${r.join('')}</div>`,
 row:(i,t,s,r)=>`<div class="li">${i?ic(i):''}<div class="fl"><b>${t}</b>${s?sub(s):''}</div>${r?`<span class="mu mono" style="font-size:13px;text-align:right;font-weight:700">${r}</span>`:''}</div>`,
 rowa:(i,t,s,a,l)=>`<div class="li">${i?ic(i):''}<div class="fl"><b>${t}</b>${s?sub(s):''}</div><button data-ac="${a}" style="font-weight:700;font-size:13px;color:var(--g);padding:8px 4px">${l}</button></div>`,
 note:t=>`<p class="mu" style="font-size:13px;margin:2px 6px">${t}</p>`,
 sw:(k,t,s,d,rl,i)=>`<button class="li" role="switch" aria-checked="${!!(S[k]??d)}" data-k="${k}" data-rl="${rl||''}" style="width:100%;text-align:left">${i?ic(i):''}<div class="fl"><b>${t}</b>${s?sub(s):''}</div><span class="sw"></span></button>`,
 ch:(k,o,d,rl)=>H.card(o.map((x,n)=>`<button class="li" data-ch="${k}" data-v="${n}" data-rl="${rl||''}" style="width:100%;text-align:left"><div class="fl"><b>${x}</b></div><span style="color:var(--g);width:22px;height:22px">${(S[k]??d)==n?ic('chk',22):''}</span></button>`)),
 btn:(t,a,s)=>`<button class="btn${s?' s':''}" data-ac="${a}">${t}</button>`,
 empty:(i,t,s)=>`<div class="card pad" style="text-align:center;padding:26px 16px"><span class="ic" style="background:var(--mint);color:var(--g);margin:0 auto 10px;width:52px;height:52px;border-radius:50%">${ic(i,24)}</span><b style="font:800 17px var(--h);display:block">${t}</b><p class="mu" style="font-size:13px;margin-top:4px">${s}</p></div>`,
 stats:a=>`<div style="display:grid;grid-template-columns:repeat(${a.length},1fr);gap:10px">${a.map(([v,l])=>`<div class="card pad" style="text-align:center"><b class="mono" style="font:800 20px var(--h);display:block">${v}</b><span class="mu" style="font-size:12px">${l}</span></div>`).join('')}</div>`,
 bar:p=>`<div style="height:8px;border-radius:4px;background:var(--ln);overflow:hidden;margin-top:6px"><i style="display:block;height:100%;width:${p}%;background:var(--g)"></i></div>`,
 tip:(n,t,s)=>`<div class="li"><span class="ic" style="background:var(--mint);color:var(--g);border-radius:50%;font:800 15px var(--h)">${n}</span><div class="fl"><b>${t}</b>${sub(s)}</div></div>`,
 det:(t,s)=>`<details class="li" style="display:block;padding:12px 14px"><summary style="font-weight:700;cursor:pointer">${t}</summary><p class="mu" style="font-size:13px;margin-top:6px">${s}</p></details>`
};
const faq=()=>({t:'Centre d’aide',h:H.card([['Comment faire vérifier mon profil ?','Ouvre Paramètres du profil puis « Faire vérifier mon profil » : préinscription, scan de la carte étudiante et authentification par le visage.'],['Comment récupérer mon compte ?','Sur l’écran de connexion, utilise « Mot de passe oublié » : un lien est envoyé à ton adresse e-mail.'],['Comment signaler un contenu ?','Touche les trois points sur la publication, puis « Signaler » et choisis un motif.']].map(x=>H.det(...x)))+H.btn('Contacter l’assistance','say:Message envoyé à l’assistance : réponse sous 48 h')});
const priv=()=>({t:'Centre de confidentialité',h:H.card([H.sw('priv','Compte privé','Seuls tes abonnés voient tes publications',false,'','usr')])+H.sec('Qui peut interagir avec toi')+H.card([H.rowa('plus','Messages directs','Qui peut t’écrire','open:Messages directs','Modifier'),H.rowa('doc','Commentaires','Qui peut commenter tes publications','open:Commentaires','Modifier')])+H.sec('Données')+H.card([H.rowa('dl','Télécharger mes données','Archive de tes publications et informations','say:Demande enregistrée : lien envoyé par e-mail','Demander')])});
const share=()=>({t:'Partager le profil',h:`<div class="card pad" style="text-align:center"><b style="font:800 18px var(--h)">@vous</b><p class="mono mu" style="font-size:13px;margin:4px 0 12px">ujlog.app/@${MB[0].h}</p>${H.btn('Copier le lien','copy:https://ujlog.app/@'+MB[0].h)}<div style="height:8px"></div>${H.btn('Partager via…','share','s')}</div>`+H.card([H.rowa('grid','Mon code QR','Scanner pour ouvrir mon profil','qr','Voir')])});
const posts=()=>({t:'Gérer les publications',h:S.posts.length?H.card(S.posts.map((p,i)=>`<div class="li">${ic('doc')}<div class="fl"><b>${p[0]}</b>${sub(p[1])}</div><button data-ac="arch:${i}" style="font-weight:700;font-size:13px;color:var(--g);padding:8px 6px">Archiver</button><button data-ac="rm:posts:${i}" style="font-weight:700;font-size:13px;color:var(--red);padding:8px 4px">Supprimer</button></div>`))+H.note('Les publications archivées restent visibles uniquement par toi.'):H.empty('doc','Aucune publication','Tes publications apparaîtront ici.')});
const archive=()=>({t:'Archive',h:S.arch.length?H.card(S.arch.map((p,i)=>`<div class="li">${ic('arch')}<div class="fl"><b>${p[0]}</b>${sub('Archivée')}</div><button data-ac="unarch:${i}" style="font-weight:700;font-size:13px;color:var(--g);padding:8px 4px">Restaurer</button></div>`)):H.empty('arch','Archive vide','Archive une publication depuis « Gérer les publications » : elle ne sera visible que par toi.')});
const resto=()=>({t:'Recharger la Restocarte',h:`<div class="card pad" style="text-align:center"><span class="mu" style="font-size:13px">Solde actuel</span><b class="mono" style="display:block;font:800 30px var(--h)">${fmt(S.resto)} FCFA</b>${sub('soit '+Math.floor(S.resto/200)+' repas à 200 FCFA')}</div>`+H.sec('Montant')+H.ch('amt',['500 FCFA','1\u202f000 FCFA','2\u202f000 FCFA','5\u202f000 FCFA'],1)+H.sec('Moyen de paiement')+H.ch('op',['Carte UJLoG · '+fmt(S.card)+' FCFA','Orange Money','Wave'],1)+H.btn('Recharger','recharge')});
const AMT=[500,1000,2000,5000],OPN=['Carte UJLoG','Orange Money','Wave'],OPN2=['Orange Money','Wave'];
const CFG={
 'home|Contenus hors ligne':()=>({t:'Contenus hors ligne',h:H.sw('wifi','Télécharger en Wi-Fi uniquement','Économise tes données mobiles',true,'','pho')+(S.off.length?H.card(S.off.map((p,i)=>`<div class="li">${ic('cld')}<div class="fl"><b>${p[0]}</b>${sub(p[1])}</div><button data-ac="rm:off:${i}" style="font-weight:700;font-size:13px;color:var(--red);padding:8px 4px">Retirer</button></div>`)):H.empty('cld','Rien en local','Enregistre des contenus pour les lire sans connexion.'))+H.card([H.rowa('coin','Libérer de l’espace','Vider le cache et les brouillons','open:Libérer de l’espace','Ouvrir')])}),
 'act|Photos aimées':()=>{const h=window.UJPROFTAB?window.UJPROFTAB(1):'';return{t:'Photos aimées',h:h||H.empty('hrt','Aucune photo aimée','Appuie sur le cœur d’une publication : elle apparaîtra ici.')}},
 'act|Republications':()=>{const h=window.UJPROFTAB?window.UJPROFTAB(2):'';return{t:'Republications',h:h||H.empty('shr','Aucune republication','Les publications que tu republies apparaîtront ici.')}},
 'act|Commentaires':()=>({t:'Commentaires',h:S.cm.length?H.card(S.cm.map((c,i)=>`<div class="li">${ic('doc')}<div class="fl"><b>${c[0]}</b>${sub(c[1])}</div><button data-ac="rm:cm:${i}" style="font-weight:700;font-size:13px;color:var(--red);padding:8px 4px">Supprimer</button></div>`)):H.empty('doc','Aucun commentaire','Tes commentaires publiés apparaîtront ici.')}),
 'act|Archive':archive,
 'prof|Statut du profil':()=>({t:'Statut du profil',h:H.ch('stat',['Disponible','Occupé(e)','En cours','Invisible'],0)+H.note('Ton statut s’affiche sur ton profil à côté de ta photo.')}),
 'prof|Faire vérifier mon profil':()=>{const st=[['Préinscription','Formulaire rempli à 100 %'],['Carte étudiante','Scan recto-verso'],['Visage','Authentification par le visage'],['Empreinte digitale','Facultatif, si ton téléphone le permet']];return{t:'Vérification du profil',h:`<div class="card pad"><b style="font:800 16px var(--h)">${S.ver} / ${st.length} étapes</b>${H.bar(S.ver/st.length*100)}</div>`+H.card(st.map((x,i)=>`<div class="li"><span class="ic" style="background:${i<S.ver?'var(--g)':'var(--mint)'};color:${i<S.ver?'#fff':'var(--g)'};border-radius:50%">${ic(i<S.ver?'chk':'clk',20)}</span><div class="fl"><b>${x[0]}</b>${sub(x[1])}</div></div>`))+(S.ver<st.length?H.btn(S.ver?'Continuer la vérification':'Commencer la vérification','ver'):H.note('Profil vérifié : ton badge certifié est débloqué.'))}},
 'prof|Examiner les publications et les identifications':()=>({t:'Publications et identifications',h:H.sw('apv','Approuver les identifications manuellement','Tu valides avant qu’elles apparaissent sur ton profil',false,'','plus')+H.empty('news','Rien à examiner','Les identifications en attente apparaîtront ici.')}),
 'set|Centre de confidentialité':priv,
 'prof|Partager le profil':share,
 'prof|Inviter des personnes à entrer en contact':()=>({t:'Inviter des personnes',h:`<div class="card pad">${H.row('','Invite tes camarades','Ils te retrouveront directement sur My UJLoG.')}<p class="mono" style="font-size:13px;margin:6px 0 12px;font-weight:700">ujlog.app/inviter/vous</p>${H.btn('Copier le lien d’invitation','copy:https://ujlog.app/inviter/vous')}<div style="height:8px"></div>${H.btn('Envoyer via…','share','s')}</div>`}),
 'set|Gérer les publications':posts,
 'set|Préférences de contenu':()=>({t:'Préférences de contenu',h:H.card([H.sw('sens','Masquer les contenus sensibles','',true,'','shd'),H.sw('mydp','Mon UFR en premier','Voir d’abord les publications de ton UFR',true,'','grp'),H.sw('ads','Publicités personnalisées','',false,'','news')])}),
 'set|Temps d’écran et bien-être':()=>({t:'Temps d’écran',h:H.stats([['0 h 42','Aujourd’hui'],['1 h 05','Moyenne / jour']])+H.sec('Limite quotidienne')+H.ch('lim',['Désactivée','30 minutes','1 heure','2 heures'],0)+H.sw('brk','Rappel de pause','Après 45 minutes d’utilisation',false,'','clk')}),
 'set|Compte':()=>({t:'Compte',h:H.card([H.row('usr','Nom d’utilisateur','','@'+MB[0].h),H.row('doc','UJ-ID','','[UJ-ID]'),H.row('news','Adresse e-mail','','[adresse e-mail]'),H.row('pho','Téléphone','','[numéro]'),H.row('grp','UFR','','[UFR]')])+`<button class="btn" data-pedit="1">Modifier mes informations</button>`}),
 'set|Sécurité et autorisations':()=>({t:'Sécurité et autorisations',h:H.card([H.sw('bio','Verrouillage biométrique','Empreinte ou visage pour ouvrir l’app',false,'','shd'),H.sw('alg','Alertes de connexion','Notifie-moi d’une connexion inconnue',true,'','bell')])+H.sec('Appareils connectés')+H.card([H.row('pho','Cet appareil','Actif maintenant'),H.rowa('pho','[Autre appareil]','Dernière connexion hier','say:Appareil déconnecté','Déconnecter')])}),
 'set|Comptes bloqués':()=>({t:'Comptes bloqués',h:H.empty('shd','Aucun compte bloqué','Les comptes que tu bloques ne peuvent ni te suivre ni voir tes publications.')}),
 'set|Mentions':()=>({t:'Mentions',h:H.sec('Qui peut te mentionner')+H.ch('mn',['Tout le monde','Mes abonnés','Personne'],0)}),
 'set|Messages directs':()=>({t:'Messages directs',h:H.sec('Qui peut t’écrire')+H.ch('dm',['Tout le monde','Mes abonnés','Personne'],1)}),
 'set|Commentaires':()=>({t:'Commentaires',h:H.sec('Qui peut commenter')+H.ch('cmw',['Tout le monde','Mes abonnés','Personne'],0)}),
 'set|Réutilisation du contenu':()=>({t:'Réutilisation du contenu',h:H.card([H.sw('rep','Autoriser la republication','',true,'','shr'),H.sw('sto','Autoriser le partage en story','',true,'','stry')])}),
 'set|Téléchargements':()=>({t:'Téléchargements',h:H.sw('dlw','Autoriser le téléchargement de mes publications','',true,'Téléchargements','dl')}),
 'set|Liste de suivis':()=>({t:'Liste de suivis',h:H.sec('Qui peut voir tes suivis')+H.ch('fl',['Toi uniquement','Mes abonnés','Tout le monde'],0,'Liste de suivis')}),
 'set|Photos aimées':()=>({t:'Photos aimées',h:H.sec('Qui peut voir tes photos aimées')+H.ch('lk',['Toi uniquement','Mes abonnés','Tout le monde'],0,'Photos aimées')}),
 'set|Vues':()=>({t:'Vues',h:H.sw('vws','Voir qui a consulté mon profil','Les autres verront aussi que tu les as consultés',true,'Vues','cam')}),
 'set|Boîte de réception et messagerie':()=>({t:'Messagerie',h:H.card([H.sw('mnt','Notifications de messages','',true,'','bell'),H.sw('rcp','Accusés de lecture','',true,'','chk'),H.sw('req','Filtrer les demandes de message','',true,'','shd')])}),
 'set|Contrôle du public':()=>({t:'Contrôle du public',h:H.sec('Audience par défaut de mes publications')+H.ch('aud',['Public','Mes followers','Privé'],0)}),
 'set|Lecture':()=>({t:'Lecture',h:H.card([H.sw('apl','Lecture automatique des vidéos','',true,'','cam'),H.sw('sub','Sous-titres','',false,'','doc'),H.sw('snd','Son activé par défaut','',true,'','bell')])}),
 'set|Langue':()=>({t:'Langue',h:H.ch('lang',['Français','English'],0)+H.note('La langue de l’application s’applique à tous les écrans.')}),
 'set|Accessibilité':()=>({t:'Accessibilité',h:H.card([H.sw('big','Texte plus grand','',false,'','doc'),H.sw('ctr','Contraste élevé','',false,'','shd'),H.sw('mot','Réduire les animations','',false,'','cam')])}),
 'set|Contacts et localisation':()=>({t:'Contacts et localisation',h:H.card([H.sw('ctc','Synchroniser mes contacts','Pour retrouver des camarades',false,'','pho'),H.sw('loc','Utiliser ma position sur le campus','Pour les services autour de toi',false,'','pin'),H.sw('sgc','Suggestions de personnes','',true,'','grp')])}),
 'set|Libérer de l’espace':()=>{const L=[['Cache de l’application',0],['Photos téléchargées',1],['Brouillons',2]];return{t:'Libérer de l’espace',h:H.card(L.map(([n,i])=>`<div class="li">${ic('coin')}<div class="fl"><b>${n}</b>${sub(S.sp[i]+' Mo')}</div><button data-ac="clr:${i}" style="font-weight:700;font-size:13px;color:var(--g);padding:8px 4px">Vider</button></div>`))+H.note('Total : '+S.sp.reduce((a,b)=>a+b,0)+' Mo. Tes publications ne sont pas supprimées.')}},
 'set|Économiseur de données':()=>({t:'Économiseur de données',h:H.sw('eco','Économiseur de données','Réduit la qualité des vidéos et désactive la lecture automatique',false,'','coin')}),
 'set|Centre d’aide':faq,'pro|Accueil de l’assistance':faq,
 'set|Conditions et politiques':()=>({t:'Conditions et politiques',h:H.card([H.det('Conditions d’utilisation','En utilisant My UJLoG, tu t’engages à respecter les autres étudiants et le personnel, et à ne publier que des contenus dont tu es l’auteur ou dont tu as les droits.'),H.det('Politique de confidentialité','Tes données servent uniquement au fonctionnement de l’application. Tu peux demander leur export ou leur suppression depuis le Centre de confidentialité.'),H.det('Règles de la communauté','Pas de harcèlement, de discrimination ni de contenu violent. Les contenus signalés sont examinés par l’équipe de modération.')])}),
 'set|Changer de compte':()=>({t:'Changer de compte',h:H.card([`<div class="li"><span class="ic" style="background:var(--mint);color:var(--g);border-radius:50%">${ic('usr',20)}</span><div class="fl"><b>Vous</b>${sub('@vous · compte actuel')}</div><span style="color:var(--g)">${ic('chk',22)}</span></div>`])+H.btn('Ajouter un compte','say:Connexion à un autre compte : saisis ton UJ-ID','s')}),
 'set|Se déconnecter':()=>({t:'Se déconnecter',h:`<div class="lo-top"><span class="lo-logo"><img alt="" src="${(document.querySelector('img.lg[src^="data:"]')||{}).src||''}"></span><b class="lo-h">Enregistrer mes informations ?</b><p class="lo-p">Ton UJ-ID sera pré-rempli à ta prochaine connexion.</p></div><div class="lo-sheet" role="group" aria-label="Enregistrer mes informations"><button type="button" class="lo-yn y" data-ac="logout" data-rm="1"><span class="lo-yi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span>Oui</span></button><button type="button" class="lo-yn n" data-ac="logout" data-rm="0"><span class="lo-yi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></span><span>Non</span></button></div>`}),
 'pro|Comment gagner des followers ?':()=>({t:'Gagner des followers',h:H.card([H.tip(1,'Publie régulièrement','Deux à trois publications par semaine suffisent'),H.tip(2,'Identifie ton UFR','Les camarades de ton UFR te trouveront'),H.tip(3,'Réponds aux commentaires','Cela encourage les échanges'),H.tip(4,'Fais vérifier ton profil','Le badge certifié inspire confiance')])}),
 'pro|Quel est le meilleur moment pour publier ?':()=>({t:'Meilleur moment pour publier',h:H.card([['Matin · 7 h – 9 h',35],['Midi · 12 h – 14 h',70],['Soir · 18 h – 21 h',100],['Nuit · 22 h – 6 h',20]].map(x=>`<div class="li" style="display:block"><b>${x[0]}</b>${H.bar(x[1])}</div>`))+H.note('Estimation selon l’activité de tes abonnés.')}),
 'pro|Consulter le statut de mon compte':()=>({t:'Statut du compte',h:H.card([H.row('chk','Compte en règle','Aucune infraction détectée'),H.row('chk','Aucune restriction','Toutes les fonctions sont disponibles'),H.row('shd','Vérification',S.ver>=4?'Profil vérifié':'En attente')])+H.btn('Faire vérifier mon profil','open:Faire vérifier mon profil','s')}),
 'pro|Autres outils':()=>({t:'Autres outils',h:H.card([H.rowa('cal','Planifier une publication','Choisis la date et l’heure','open:Planifier','Ouvrir'),H.rowa('qr','Mon code QR','Scanner pour ouvrir mon profil','qr','Voir'),H.rowa('dl','Exporter mes données','Archive de tes publications','say:Demande enregistrée : lien envoyé par e-mail','Demander')])}),
 'pro|Planifier':()=>({t:'Planifier une publication',h:`<div class="field"><label>Date</label><input id="mxd" type="date" style="display:block;width:100%;border:0;background:none;font:inherit;color:inherit"></div><div class="field"><label>Heure</label><input id="mxh" type="time" value="18:00" style="display:block;width:100%;border:0;background:none;font:inherit;color:inherit"></div><div class="field"><label>Légende</label><textarea id="mxt" rows="2" style="display:block;width:100%;border:0;background:none;font:inherit;color:inherit;resize:none"></textarea></div>${H.btn('Planifier','sched')}`+(S.sched.length?H.sec('Planifiées')+H.card(S.sched.map(x=>H.row('cal',x[1]||'Sans légende',x[0]))):'')})
};
const DO={
 'qr|Partager le code QR':()=>doShare(),
 'prof|Copier le lien':()=>copy('https://ujlog.app/@'+MB[0].h),
 'pro|Analytics':el=>goSec(el,'Analytics'),'pro|Contenu':el=>goSec(el,'Contenu'),'pro|Communauté':el=>goSec(el,'Communauté')
};
const copy=u=>{try{navigator.clipboard.writeText(u).then(()=>say('Lien copié'),()=>say('Lien : '+u))}catch(_){say('Lien : '+u)}};
const doShare=()=>{const d={title:'My UJLoG',url:'https://ujlog.app/@'+MB[0].h};if(navigator.share){navigator.share(d).catch(()=>{})}else copy(d.url)};
const goSec=(el,n)=>{el.parentNode.querySelectorAll('.chip').forEach(b=>b.setAttribute('aria-pressed',b==el));const h=$$('#mmp-pro h3').find(x=>x.textContent.trim()==n);if(h)h.scrollIntoView({behavior:'smooth',block:'start'})};
const curPage=()=>{const m=MM(),p=$$('.mmpage,#mmhome',m).find(x=>!x.hidden);return!p||p.id=='mmhome'?'home':p.id.replace('mmp-','')};
const show=id=>{const m=MM();if(!m)return;if(id!='det')S.dret=null;if(id=='sol'){S._shown=0;S.flip=false;renderSol()}$$('.mmpage,#mmhome',m).forEach(p=>p.hidden=true);const t=id=='home'?$('#mmhome',m):$('#mmp-'+id,m);if(t)t.hidden=false;m.classList.toggle('full',id!='home');m.scrollTop=0};
const ensure=()=>{const m=MM();let p=$('#mmp-det',m);if(!p){p=document.createElement('div');p.className='mmpage';p.id='mmp-det';p.hidden=true;p.innerHTML=`<div class="mmh"><button class="ib" data-mxb="1" aria-label="Retour" style="transform:scaleX(-1)">${ic('chv',22)}</button><h2 id="mxt0"></h2></div><div id="mxb0" style="display:flex;flex-direction:column;gap:10px;margin-top:10px"></div>`;m.appendChild(p)}return p};
const loRm=()=>{if(S.lorem!=null)return+S.lorem?1:0;try{return localStorage.getItem('ujRemember')=='0'?0:1}catch(_){return 1}};
const render=()=>{const o=CFG[cur.key]();ensure();{const dp=$('#mmp-det');if(dp){dp.classList.toggle('blu',/^sol\|/.test(cur.key));dp.classList.toggle('lopg',/\|Se déconnecter$/.test(cur.key))}}$('#mxt0').textContent=o.t;const m=MM(),y=m.scrollTop;$('#mxb0').innerHTML=o.h;m.scrollTop=y};
const open=(key,origin)=>{if(!CFG[key])return false;cur={key,origin};ensure();render();show('det');MM().scrollTop=0;return true};
const setRow=(t,v)=>{$$('#mmp-set .li').forEach(r=>{const b=$('b',r);if(b&&b.textContent.trim()==t){const s=$('span.mu',r);if(s)s.textContent=v}})};
const UE=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
window.UJADDPOST=(t,el)=>{S.posts.unshift([UE(t),'À l’instant',el])};
window.UJRMPOST=el=>{['posts','arch'].forEach(k=>{const i=S[k].findIndex(p=>p[2]===el);if(i>-1)S[k].splice(i,1)})};
window.UJEDPOST=(el,t)=>{['posts','arch'].forEach(k=>S[k].forEach(p=>{if(p[2]===el)p[0]=UE(t)}))};
const ACT=(id,el)=>{const[a,...r]=id.split(':'),x=r.join(':');
 if(a=='say')say(x);else if(a=='copy')copy(x);else if(a=='share')doShare();else if(a=='url')window.open(x,'_blank','noopener');
 else if(a=='back')show(cur.origin);
 else if(a=='open')open((cur.origin)+'|'+x,cur.origin)||open('pro|'+x,cur.origin)||open('prof|'+x,cur.origin)||open('set|'+x,cur.origin);
 else if(a=='qr'){S.hist.push(cur.origin);S.syn=1;const b=document.createElement('button');b.dataset.mmp='qr';b.hidden=true;MM().appendChild(b);b.click();b.remove();S.syn=0}
 else if(a=='rm'){const[k,i]=x.split(':'),it=S[k][+i];if(it&&it[2]&&window.UJDELPOST)window.UJDELPOST(it[2]);S[k].splice(+i,1);say('Supprimé');render()}
 else if(a=='arch'){const it=S.posts.splice(+x,1)[0];if(it&&it[2])it[2].style.display='none';S.arch.push(it);say('Publication archivée');render()}
 else if(a=='unarch'){const it=S.arch.splice(+x,1)[0];if(it&&it[2])it[2].style.display='';S.posts.push(it);say('Publication restaurée');render()}
 else if(a=='clr'){S.sp[+x]=0;say('Espace libéré');render()}
 else if(a=='remind'){S.remind=!S.remind;say(S.remind?'Rappel activé pour le 8 novembre':'Rappel désactivé');render()}
 else if(a=='ver'){S.ver=Math.min(4,S.ver+1);say(S.ver>=4?'Profil vérifié !':'Étape validée');render()}
 else if(a=='camp'){S.camp.push('Campagne n°'+(S.camp.length+1));say('Brouillon de campagne créé');render()}
 else if(a=='sched'){const d=$('#mxd').value;if(!d){say('Choisis une date');return}S.sched.push([d.split('-').reverse().join('/')+' à '+$('#mxh').value,$('#mxt').value.trim()]);say('Publication planifiée');render()}
 else if(a=='daily'){if(S.daily){say('Déjà récupéré aujourd’hui');return}if(S.td>=CAP){say('Plafond du jour atteint : '+CAP+' MONLoG maximum par jour');return}S.daily=true;S.pc+=1;S.td+=1;S._burst=1;S.tx.unshift(['Connexion du jour','Bonus quotidien','+1 MONLoG','coin']);say('+1 MONLoG : à demain pour le prochain bonus');renderSol()}
 else if(a=='claim'){if(!S.pend.length){say('Rien à récupérer pour le moment');return}let got=0;const keep=[];S.pend.forEach(p=>{if(p[3]<=CAP-S.td){S.pc+=p[3];S.td+=p[3];got+=p[3];S.cl[p[0]]=true;if(p[0]=='login')S.daily=true;S.tx.unshift([p[1],p[2],'+'+p[3]+' MONLoG','coin'])}else keep.push(p)});S.pend=keep;if(!got){say('Plafond du jour atteint : '+CAP+' MONLoG maximum par jour');return}S._burst=1;say('+'+got+' MONLoG récupérés'+(keep.length?' · le reste dépasse le plafond du jour':''));renderSol()}
 else if(a=='earn'){const E=EARN[x];if(!E)return;if(S.cl[E[0]]){say('Déjà récupéré');return}if(S.pend.some(p=>p[0]==E[0])){say('Déjà dans la boîte cadeau');return}S.pend.push(E.slice());say('Nouvelle récompense dans la boîte cadeau');renderSol()}
 else if(a=='gopen'){const G=S.gf,n=gi();if(G.d[n]!=null){say('Cadeau déjà ouvert aujourd’hui');return}UJGAMES.play(n,GF[n-1],raw=>{const amt=Math.max(0,Math.min(raw,GCAP-G.m));G.d[n]=amt;G.m+=amt;S.pc+=amt;if(amt){S._burst=1;S.tx.unshift(['Bonus cadeau du jour','Jour '+n+' · '+GF[n-1][0],'+'+fmt(amt)+' MONLoG','coin'])}let ex='';if(Object.keys(G.d).length==30&&!G.b){const bn=Math.min(GBON,GCAP-G.m);if(bn>0){G.b=bn;G.m+=bn;S.pc+=bn;S.tx.unshift(['Bonus cadeau du jour','30 cadeaux ouverts','+'+fmt(bn)+' MONLoG','coin']);ex=' Bonus des 30 jours : +'+bn+' MONLoG !'}}renderSol();return{amt:amt,bal:S.pc,extra:ex}})}
 else if(a=='ghunt'){UJGAMES.hunt(p=>{S.pc+=p;S._burst=1;S.tx.unshift(['Chasse au trésor','QR code du campus','+'+fmt(p)+' MONLoG','coin']);renderSol();return{bal:S.pc}})}
 else if(a=='gnext'){S.gf.o=(S.gf.o||0)+1;renderSol()}  else if(a=='eye'){S.hide=!S.hide;renderSol()}
 else if(a=='go')open(x,'sol');
 else if(a=='dart'){const h=S.dh||['sol|Gains','sol'];S.dret={to:h[0],from:x,o:h[1]};open(x,h[1])}
 else if(a=='dlink'){S.dret={to:cur.key,from:x,o:cur.origin};open(x,cur.origin)}
 else if(a=='sim'&&false){const R=RULES.find(r=>r[0]==x),n=R[3],add={v:1000,i:100,f:50}[x],o=S.g[x];S.g[x]+=add;const t=Math.floor(S.g[x]/n)-Math.floor(o/n);if(t>0){const p=Math.min(t*R[4],CAP-S.td);if(p<=0){say('Plafond du jour atteint : '+CAP+' MONLoG maximum par jour')}else{S.pc+=p;S.td+=p;S._burst=1;S.tx.unshift(['Gain automatique',fmt(n)+' '+R[1].toLowerCase()+' · +'+p+' MONLoG','+'+fmt(p)+' MONLoG','coin']);say('+'+p+' MONLoG créditées')}}else say('Activité enregistrée');renderSol()}
  
  else if(a=='logout'){const rm=(el&&el.dataset&&el.dataset.rm!=null)?+el.dataset.rm:loRm();S.lorem=rm;if(el&&el.disabled)return;const lb=el&&el.querySelector('span:last-child'),old=lb&&lb.textContent;if(el){el.disabled=true;if(lb)lb.textContent='Déconnexion…'}try{navigator.vibrate&&navigator.vibrate(12)}catch(_){}try{localStorage.setItem('ujRemember',rm)}catch(_){}try{parent.postMessage({t:'ujlogout',remember:!!rm,handle:(rm&&MB[0].h)||null},(location.origin==String(null)?String.fromCharCode(42):location.origin))}catch(_){say('Déconnexion indisponible')}setTimeout(()=>{if(el&&el.isConnected){el.disabled=false;if(lb&&old)lb.textContent=old}},2500)}};
document.addEventListener('click',e=>{const m=MM();if(!m)return;
 const t=s=>e.target.closest&&e.target.closest(s),stop=()=>{e.stopImmediatePropagation();e.preventDefault()};
 if(t('[data-menu]')){S.hist=[];S.ret=null;setTimeout(renderSol,0)}
 if(S.ret&&t('#a8 .ib[data-go],#a10 .ib[data-go],#a12 .ib[data-go],#a16 .ib[data-go]')){stop();const r=S.ret;S.ret=null;const g=document.createElement('button');g.dataset.go='a4';g.hidden=true;document.getElementById('a4').appendChild(g);g.click();g.remove();m.hidden=false;S.hist=r.hist;show(r.page);return}
 if(S.ret&&!m.contains(e.target)&&t('[data-go]'))S.ret=null;
 if(m.hidden||!m.contains(e.target))return;
 if(t('[data-go]'))S.ret={page:curPage(),hist:S.hist.slice()};
 if(t('[data-mmx]'))S.hist=[];
 if(t('#mmp-sol [data-ac]')){stop();ACT(t('#mmp-sol [data-ac]').dataset.ac);return}
 if(t('[data-mmb]')){stop();show(S.hist.pop()||'home');return}
 if(t('[data-mmp]')&&!S.syn)S.hist.push(curPage());
 if(t('[data-mxb]')){stop();if(S.dret&&cur&&S.dret.from==cur.key){const r=S.dret;S.dret=null;if(S.dh&&r.to!=S.dh[0])S.dret={to:S.dh[0],from:r.to,o:S.dh[1]};open(r.to,r.o);return}show(cur?cur.origin:'home');return}
 if(t('#mmp-det')){
  const ch=t('[data-ch]');if(ch){stop();S[ch.dataset.ch]=+ch.dataset.v;if(ch.dataset.rl)setRow(ch.dataset.rl,$('b',ch).textContent);render();return}
  const sw=t('[role=switch]');if(sw){const k=sw.dataset.k;if(k){S[k]=sw.getAttribute('aria-checked')!='true';if(sw.dataset.rl)setRow(sw.dataset.rl,S[k]?'Activé':'Désactivé')}return}
  const ac=t('[data-ac]');if(ac){stop();ACT(ac.dataset.ac,ac);return}
  return}
 const el=t('button,[data-soon]');if(!el||!m.contains(el))return;
 if(el.matches('[data-mmp],[data-go],[data-hist],[data-pedit],[data-mmb],[data-mmx],[data-sx],[role=switch],.ib,.seg button,#dmode,#adm'))return;
 const pg=el.closest('.mmpage,#mmhome');if(!pg)return;
 const origin=pg.id=='mmhome'?'home':pg.id.replace('mmp-','');
 const lab=el.dataset.soon||($('b',el)&&$('b',el).textContent.trim());if(!lab)return;
 const key=origin+'|'+lab;
 if(DO[key]){stop();DO[key](el);return}
 if(CFG[key]){stop();open(key,origin)}
},true);
const CAP=20;
const RULES=[['i','Interactions','hrt',100,10,'Chaque tranche de 100 interactions'],['f','Nouveaux abonnés','grp',50,25,'Chaque tranche de 50 nouveaux abonnés actifs']];
const BON=[['clk','Connexion du jour','Une fois par jour',1,1],['cal','Série de 7 jours','7 jours de connexion d’affilée',10,0],['cam','Publier une photo','1 fois par jour maximum',2,0],['chk','Participer à une activité','Sondage, quiz, vote…',2,0],['plus','Inviter un ami','Quand il vérifie son profil',50,0],['shd','Faire vérifier mon profil','Une seule fois',50,0]];
const coin=n=>`<svg viewBox="0 0 32 32" width="${n}" height="${n}" aria-hidden="true" style="flex:none"><circle cx="16" cy="16" r="15" fill="#F5A623"/><circle cx="16" cy="16" r="11.5" fill="#FFC857" stroke="#C98312" stroke-width="1.4"/><text x="16" y="21" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="14" fill="#8A4B00">M</text></svg>`;
const RINGS=`<svg class="bgc" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g transform="rotate(-18 250 40)">${[0,1,2,3,4,5,6,7].map(i=>`<ellipse cx="250" cy="40" rx="${28+i*24}" ry="${18+i*17}"/>`).join('')}</g></svg>`;
const CHIP=`<svg width="40" height="30" viewBox="0 0 40 30" aria-hidden="true"><rect x="1" y="1" width="38" height="28" rx="6" fill="#E9C46A" stroke="#B8902F"/><path d="M1 10h38M1 20h38M14 1v28M26 1v28" stroke="#B8902F" stroke-width="1" fill="none"/></svg>`;
const NFC=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" aria-hidden="true" style="opacity:.9"><path d="M8 8c2.2 2.2 2.2 5.8 0 8M12 5.5c3.6 3.6 3.6 9.4 0 13M16 3c5 5 5 13 0 18"/></svg>`;
const holder=()=>{const b=$('#mmpf .fl b');return(b?b.textContent.trim():'Étudiant UJLoG').toUpperCase()};
const frc=n=>String(Math.round(n*10)/10).replace('.',',');
const bigCoin=k=>`<svg viewBox="0 0 120 120" width="112" height="112" aria-hidden="true"><defs><radialGradient id="gc${k}" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#FFF3C4"/><stop offset=".45" stop-color="#FFC83D"/><stop offset="1" stop-color="#C77D0A"/></radialGradient><linearGradient id="gr${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE48A"/><stop offset="1" stop-color="#B86E05"/></linearGradient></defs><circle cx="60" cy="60" r="58" fill="url(#gr${k})"/><circle cx="60" cy="60" r="55" fill="none" stroke="#8A4B00" stroke-opacity=".4" stroke-width="3" stroke-dasharray="2 3.4"/><circle cx="60" cy="60" r="45" fill="url(#gc${k})" stroke="#B8730A" stroke-width="2"/><text x="61.5" y="79.5" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="54" fill="#7A3F00" opacity=".55">M</text><text x="59.4" y="77.6" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="54" fill="#FFF6D2" opacity=".7">M</text><text x="60" y="78.5" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="54" fill="#A8600A">M</text></svg>`;
const renderSol0=()=>{const el=document.getElementById('solb');if(!el)return;
 const rem=S.pc%10000,len=fmt(S.pc).length;
 const sp=[[8,40,0],[122,64,.8],[22,170,1.5],[104,154,.4],[58,34,1.9]].map(([r,t,d])=>`<i class="pc-st" style="right:${r}px;top:${t}px;animation-delay:${d}s"></i>`).join('');
 const bu=S._burst?Array.from({length:12},(_,k)=>{const a=k/12*6.2832,d=85+(k%3)*28;return `<i class="pc-bu" style="--dx:${Math.round(Math.cos(a)*d)}px;--dy:${Math.round(Math.sin(a)*d)}px;animation-delay:${(k%4)*.04}s"></i>`}).join(''):'';
 const pop=S._burst?' pop':'';S._burst=0;
 const UP='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M5 20h14"/></svg>';
 const hint=S.td>=CAP?'Plafond du jour atteint · reviens demain':fmt(Math.max(0,CAP-S.td))+' MONLoG à gagner aujourd’hui';
 const MO='<div class="pc-mo" aria-hidden="true"><i></i><i></i><i></i></div>';
const ux=(n,s)=>`<svg class="ux" aria-hidden="true" style="width:${s||24}px;height:${s||24}px"><use href="#ux-${n}"/></svg>`;
 const rowx=(i,ti,d,r)=>`<div class="s3-ro"><span class="s3-ib">${ux(i,20)}</span><div class="fl"><b>${ti}</b><small>${d}</small></div>${r||''}</div>`;
 const ringF=p=>{const pc=Math.min(100,Math.round(p*100));return `<span class="s3-rg"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="18"/><circle class="v" cx="22" cy="22" r="18" stroke-dasharray="${(pc/100*113.1).toFixed(1)} 113.1"/></svg><span>${pc}%</span></span>`};
 if(!S.pend)S.pend=S.daily?[]:[['login','Connexion du jour','Bonus quotidien',1,'gift']];
 if(!S.cl)S.cl={};
 const BID=['login','streak','photo','act','inv','ver'],BIC=['gift','cal','cam','vote','users','shield'],RIC={i:'heart',f:'users'};
 const bonB=()=>{const rows=BON.map(([i,ti,d,n],k)=>{const id=BID[k],st=S.cl[id]?'ok':(S.pend.some(p=>p[0]==id)?'box':'todo');const tag=st=='ok'?'<span class="s3-st ok">Récupéré ✓</span>':st=='box'?'<span class="s3-st box">Dans la boîte</span>':`<span class="s3-st">+${n}</span>`;return rowx(BIC[k],ti,d,tag)}).join('');
  return `<div class="s3-sec" style="margin-top:6px">Bonus du jour<small class="s3-mu">${CAP} MONLoG max / jour</small></div><div>${rows}</div>`+H.note('Tout se récupère dans la boîte cadeau, en haut de l’écran Solde. Les vues et interactions artificielles sont écartées.')};
 const gainsB=()=>`<div class="s3-sec" style="margin-top:6px">Gains automatiques<small class="s3-mu">arrivent seuls dans ton solde</small></div>`+RULES.map(([k,l,i,n,r,d])=>{const rm=S.g[k]%n;return `<div class="s3-gc"><div class="s3-gh"><span class="s3-ib">${ux(RIC[k]||'bolt',20)}</span><div class="fl"><b>${l}</b><small>${d}</small></div><span class="s3-st">+${r} MONLoG</span></div><div class="s3-pb"><i style="width:${rm/n*100}%"></i></div><div class="s3-gf mono"><span>${rm} / ${n}</span><span>${fmt(S.g[k])} cette période</span></div></div>`}).join('');
 const txRows=a=>a.map(t=>{const ng=t[2][0]=='\u2212';return `<div class="li"><span class="wl-ic" style="--c:${ng?'#E02020':'#1D4ED8'}">${ic(ng?'wal':'coin',18)}</span><div class="fl"><b>${t[0]}</b>${sub(t[1])}</div><b class="mono" style="color:var(${ng?'--red':'--g'})">${t[2]}</b></div>`}).join('');
 window.UJSOL={gainsB,bonB,txRows,ux,rowx,ringF};
 const hide=!!S.hide,MASK='\u2022\u2022\u2022\u2022',fx=n=>{const p=n.toFixed(2).split('.');return fmt(p[0])+','+p[1]};
 const pct=Math.min(100,Math.round(S.td/CAP*100)),dash=(pct/100*113.1).toFixed(1);
 const ring=`<span class="s3-rg"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="18"/><circle class="v" cx="22" cy="22" r="18" stroke-dasharray="${dash} 113.1"/></svg><span>${pct}%</span></span>`;
 const kind=t=>t[2][0]=='\u2212'?'out':/connexion|bonus/i.test(t[0]+t[1])?'gift':/interaction|vues/i.test(t[1])?'heart':'bolt';
 const rows=S.tx.slice(0,3).map(t=>{const ng=t[2][0]=='\u2212';return `<div class="s3-tr"><span class="s3-ib">${ux(kind(t),20)}</span><div class="fl"><b>${t[0]}</b><small>${t[1]}</small></div><em${ng?' class="ng"':''}>${t[2].replace(' MONLoG','')}</em></div>`}).join('')||'<p class="s3-no">Aucune transaction pour le moment.</p>';
 const cdt=hint;
 {const hh=document.querySelector('#mmp-sol .mmh');if(hh){let g=hh.querySelector('.s3-gift');if(!g){g=document.createElement('button');g.type='button';g.className='s3-gift';g.dataset.ac='go:sol|Boîte cadeau';hh.appendChild(g)}const gu=!!(window.UJGIFT&&!UJGIFT.state().open),n=S.pend.length+(gu?1:0);g.dataset.ac=gu?'gopen':'go:sol|Boîte cadeau';g.classList.toggle('has',n>0);g.setAttribute('aria-label',n?'Boîte cadeau : '+n+(n>1?' récompenses':' récompense')+' à récupérer':'Boîte cadeau : rien à récupérer');g.innerHTML=`<svg aria-hidden="true"><use href="#ux-giftbox"/></svg>`+(n?`<b>${n}</b>`:'')}}
 
 el.innerHTML=`<div class="s3-top"><div class="s3-lab"><span>Mon solde</span><button type="button" class="s3-eye" data-ac="eye" aria-pressed="${hide}" aria-label="${hide?'Afficher':'Masquer'} le solde">${ux('eye',20)}</button></div><div class="s3-nn mono"><svg class="s3-cn s3-cnb" aria-hidden="true"><use href="#ux-coin"/></svg><span${hide?'':' data-coins'}>${hide?MASK:fmt(S._shown||0)}</span><small>MONLoG</small></div><span class="s3-dl">+${S.td} aujourd\u2019hui</span></div>`+
 `<div class="s3-qa"><button type="button" class="p" data-ac="go:sol|Gagner aujourd’hui"><i>${ux('bolt')}</i>Gagner</button><button type="button" data-ac="go:sol|Mes interactions"><i>${ux('heart')}</i>Interactions</button><button type="button" class="${(window.UJGIFT&&UJGIFT.state&&!UJGIFT.state().open)?'s3n':''}" data-ac="go:sol|Cadeaux"><i>${ux('gift')}</i>Cadeaux</button><button type="button" data-ac="go:sol|Historique"><i>${ux('receipt')}</i>Historique</button></div>`+
 `<div class="s3-sec">Aujourd\u2019hui</div><button type="button" class="s3-cd" data-ac="go:sol|Gagner aujourd\u2019hui">${ring}<div class="fl"><b>${S.td} sur ${CAP} MONLoG</b><small>${cdt}</small></div>${ux('chv',18)}</button>`+
 `<div class="s3-sec">Transactions<button type="button" data-ac="go:sol|Historique">Tout voir</button></div><div>${rows}</div>`+
 `<p class="s3-foot"><button type="button" data-ac="go:sol|Gains">${ux('shield',16)}Comment \u00e7a marche</button><small>S\u00e9curis\u00e9 par My UJLoG</small></p>`;
 const nE=el.querySelector('[data-coins]');if(nE){const to=S.pc,from=S._shown||0;S._shown=to;const my=S._tk=(S._tk||0)+1;if(from==to||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)){nE.textContent=fmt(to)}else{const t0=performance.now(),tick=t=>{if(my!==S._tk)return;const k=Math.min(1,(t-t0)/900),e=1-Math.pow(1-k,3);nE.textContent=fmt(Math.round(from+(to-from)*e));if(k<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)}}};
document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.pcw');if(!c)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.setProperty('--ry',(x*12)+'deg');c.style.setProperty('--rx',(-y*12)+'deg');c.style.setProperty('--gx',(x*100+50)+'%');c.style.setProperty('--gy',(y*100+50)+'%')});
document.addEventListener('click',e=>{const w=e.target.closest&&e.target.closest('.pcw');if(!w)return;S.flip=!S.flip;w.classList.toggle('flip',S.flip)});
['pointerup','pointerleave','pointercancel'].forEach(ev=>document.addEventListener(ev,()=>{document.querySelectorAll('.pcw').forEach(c=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')})},true));
const renderSol=()=>{renderSol0();if(cur&&/^sol\|/.test(cur.key)&&CFG[cur.key]&&document.getElementById('mxb0'))render()};
const EARN={photo:['photo','Publier une photo','1 fois par jour maximum',2,'cam'],act:['act','Participer à une activité','Sondage, quiz, vote…',2,'vote'],streak:['streak','Série de 7 jours','7 jours de connexion d’affilée',10,'cal']};
CFG['sol|Gagner aujourd’hui']=()=>{const U=UJSOL,n=S.pend.length;return{t:'Gagner aujourd’hui',h:`<div class="s3-cd" style="cursor:default">${U.ringF(S.td/CAP)}<div class="fl"><b>${S.td} sur ${CAP} MONLoG</b><small>Gagnés aujourd’hui · plafond du jour</small></div></div>`+(n?`<button type="button" class="s3-cd" data-ac="go:sol|Boîte cadeau" style="margin-top:10px"><svg class="s3-gmini" aria-hidden="true"><use href="#ux-giftbox"/></svg><div class="fl"><b>${n} ${n>1?'récompenses t’attendent':'récompense t’attend'}</b><small>À récupérer dans la boîte cadeau</small></div>${U.ux('chv',18)}</button>`:'')+U.bonB()}};
CFG['sol|Mes interactions']=()=>({t:'Mes interactions',h:`<div class="s3-two"><div><span class="s3-ib">${UJSOL.ux('heart',20)}</span><b class="mono">${fmt(S.g.i)}</b><small>Interactions</small></div><div><span class="s3-ib">${UJSOL.ux('users',20)}</span><b class="mono">${fmt(S.g.f)}</b><small>Nouveaux abonnés</small></div></div>`+UJSOL.gainsB()});
CFG['sol|Boîte cadeau']=()=>{const U=UJSOL,P=S.pend,tot=P.reduce((a,p)=>a+p[3],0);const head=`<div class="s3-gb"><svg class="s3-gbi" aria-hidden="true"><use href="#ux-giftbox"/></svg><b>${P.length?P.length+(P.length>1?' récompenses':' récompense')+' à récupérer':'Boîte vide pour le moment'}</b>${P.length?`<span>+${tot} MONLoG</span>`:`<small>Reviens demain pour le prochain bonus</small>`}</div>`;
 if(!P.length)return{t:'Boîte cadeau',h:head+`<p class="s3-no" style="text-align:center">Tes récompenses du jour arrivent ici. Tu n’as plus qu’à appuyer sur « Récupérer ».</p>`};
 return{t:'Boîte cadeau',h:head+`<div>${P.map(p=>U.rowx(p[4]||'gift',p[1],p[2],`<span class="s3-st">+${p[3]}</span>`)).join('')}</div>`+H.btn('Récupérer tout · +'+tot+' MONLoG','claim')}};

const GF=[['Cadeau de bienvenue','Ton premier cadeau pour bien démarrer.','G',20],['Quiz express','3 questions sur le campus.','G',10],['Roue de la chance','Tourne la roue et tente ta chance.','C',20],['Carte à gratter','Gratte la carte pour découvrir ton gain.','C',10],['Boîte mystère','Ouvre la boîte, le contenu est une surprise.','C',50],['Ta 1re publication','Publie ton premier message sur le campus.','G',20],['Pile ou face','Choisis ton côté et lance la pièce.','C',10],['Série de 7 jours','7 jours d’affilée : ta fidélité est récompensée.','G',30],['Jeu de mémoire','Retrouve toutes les paires.','G',20],['Trois coffres','Trois coffres, un seul est gagnant.','C',100],['Devine le chiffre','Trouve le chiffre grâce aux indices « plus » ou « moins ».','C',10],['Commente 3 publications','Commente 3 publications du campus.','G',20],['Dés magiques','Lance les dés : un double gagne.','C',10],['Roue de l’explorateur','Tourne la roue de l’explorateur.','C',50],['Méga roue de mi-mois','La grande roue, avec de plus gros lots.','C',200],['Question mystère','Réponds à la question cachée derrière le point d’interrogation.','C',10],['Invite un ami','Invite un ami à rejoindre UJLoG.','G',20],['Ballons à éclater','Éclate un maximum de ballons en 10 secondes.','G',10],['Vrai ou faux','Réponds juste 5 fois d’affilée.','C',30],['Duel de cartes','Bats la banque au tirage de cartes.','C',100],['Quiz du campus','Une question sur ta ville et ton pays.','C',10],['Défi photo','Prends en photo un lieu du campus.','G',20],['Cadeau surprise','Ouvre le cadeau surprise du jour.','G',10],['Quiz chrono','Réponds vite, chaque seconde compte.','C',50],['Machine à sous','Aligne trois symboles identiques.','C',20],['Tir au but','Choisis ton coin et tire.','C',10],['Série de 21 jours','21 jours d’affilée : bravo pour ta régularité.','G',30],['Tombola du campus','Ton ticket participe au tirage du campus.','C',100],['Super coffre','Un coffre très rare, avec un énorme lot.','C',500],['Méga boîte mystère','La boîte finale du mois. Le plus gros lot est caché dedans.','C',3000]];
const GCAP=5000,GBON=500;
if(!S.gf)S.gf={d:{},m:0,o:0,b:0,s:Date.now()};
const gi=()=>Math.max(1,Math.min(30,Math.floor((Date.now()-S.gf.s)/864e5)+1+(S.gf.o||0)));
const gdraw=n=>{const g=GF[n-1],mx=g[3];let v=0;if(n==30){const r=Math.random();v=r<.001?5000:(r<.5?Math.round(5+Math.random()**2*95):0)}else if(n==29){v=Math.random()<.1?Math.round(100+Math.random()*400):0}else if(g[2]=='G')v=Math.max(2,Math.round(mx*(.2+.8*Math.random()**2)));else v=Math.random()<.55?Math.max(2,Math.round(mx*(.1+.9*Math.random()**2.5))):0;return v};
window.__UJS=S;window.UJGIFT={bal:()=>S.pc,gbal:()=>S.gw||0,conv:(n,l)=>{n=Math.floor(+n);if(!(n>0))return false;S.pc+=n;S._burst=1;S.tx.unshift(['Conversion de cadeau',(l||'Cadeau')+' · commission 15 %','+'+fmt(n)+' MONLoG','coin']);try{renderSol()}catch(e){}return{main:S.pc}},gload:()=>{let v=window.UJGIFT.store;if(v==null)try{v=localStorage.getItem('ujGiftStore')}catch(e){}return v||null},gsave:v=>{window.UJGIFT.store=v;try{localStorage.setItem('ujGiftStore',v)}catch(e){}},gspend:(n,l)=>{if(!(n>0)||(S.gw||0)<n)return false;S.gw-=n;return true},gcredit:(n,l)=>{if(!(n>0))return false;S.gw=(S.gw||0)+n;return true},topup:n=>{n=Math.floor(+n);if(!(n>0)||S.pc<n)return false;S.pc-=n;S.gw=(S.gw||0)+n;S.tx.unshift(['Recharge UJCadeau','Vers ton solde cadeau','\u2212'+fmt(n)+' MONLoG','coin']);try{renderSol()}catch(e){}return{main:S.pc,gift:S.gw}},spend:(n,l)=>{if(!(n>0)||S.pc<n)return false;S.pc-=n;S.tx.unshift(['Achat de cadeau',l||'Cadeau','-'+n+' MONLoG','coin']);try{renderSol()}catch(e){}return true},state:()=>{const n=gi();return{n:n,name:GF[n-1][0],open:S.gf.d[n]!=null,won:S.gf.d[n]||0,bal:S.pc,m:S.gf.m,done:Object.keys(S.gf.d).length}}};
const GK=['box','quiz','luck','luck','box','cam','luck','day','quiz','box','luck','soc','luck','luck','luck','quiz','soc','quiz','quiz','luck','quiz','cam','box','quiz','luck','luck','day','luck','box','box'];
const GIC={box:'giftbox',luck:'coin',quiz:'bolt',soc:'users',cam:'cam',day:'cal'};
const GKL={box:'Surprise',luck:'Chance',quiz:'Défi',soc:'Communauté',cam:'Photo',day:'Fidélité'};
CFG['sol|Cadeaux']=()=>{const uxx=(a,b)=>window.UJSOL.ux(a,b);const G=S.gf,n=gi(),done=Object.keys(G.d).length,g=GF[n-1],open=G.d[n]!=null,won=G.d[n]||0;
 const pct=Math.round(done/30*100),mp=Math.min(100,Math.round(G.m/GCAP*100)),k=GK[n-1];
 const hero=`<div class="gf-h2"><div class="gf-ht"><span class="gf-day"><small>Jour</small><b>${n}</b><em>sur 30</em></span><div class="fl"><span class="gf-tag">${uxx(GIC[k],14)}${GKL[k]} · ${g[2]=='G'?'Gain garanti':'Jeu de chance'}</span><b class="gf-nm">${g[0]}</b><span class="gf-ds">${g[1]}</span></div><svg class="gf-hi" aria-hidden="true"><use href="#ux-giftbox"/></svg></div>`+
  (open?`<div class="gf-res ${won>0?'w':'l'}"><span>${won>0?'+'+won:'0'}</span><div><b>${won>0?'Bravo, cadeau ouvert !':'Pas de gain aujourd’hui'}</b><small>${won>0?'Ajouté à ton solde MONLoG. ':''}Reviens demain pour le jour ${Math.min(30,n+1)}.</small></div></div>`:
  `<div class="gf-up"><span>À gagner aujourd’hui</span><b>jusqu’à ${fmt(g[3])} MONLoG</b></div><button type="button" class="gf-cta" data-ac="gopen">${uxx('giftbox',24)}Ouvrir mon cadeau</button>`)+`</div>`;
 const stats=`<div class="gf-st"><div><b>${done}<i>/30</i></b><small>Cadeaux ouverts</small></div><div><b>${fmt(G.m)}</b><small>MONLoG gagnés</small></div><div><b>${fmt(S.pc)}</b><small>Mon solde</small></div></div>`+
  `<div class="gf-pg"><div class="gf-pgh"><span>Plafond du mois</span><b>${fmt(G.m)} / ${fmt(GCAP)}</b></div><div class="gf-bar"><i style="width:${mp}%"></i></div><div class="gf-pgh"><small>Série du mois : ${pct} %</small><small>Bonus ${GBON} MONLoG si tu ouvres les 30</small></div></div>`;
 const hunt=`<button type="button" class="gf-hunt" data-ac="ghunt"><span class="gf-hi2"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9V5a2 2 0 0 1 2-2h4M15 3h4a2 2 0 0 1 2 2v4M21 15v4a2 2 0 0 1-2 2h-4M9 21H5a2 2 0 0 1-2-2v-4"/><path d="M8 8h3v3H8zM13 8h3v3h-3zM8 13h3v3H8zM14 14h2v2h-2z"/></svg></span><div class="fl"><b>Chasse au trésor</b><small>Scanne un QR code caché sur le campus</small></div>${uxx('chv',18)}</button>`;
 const cell=j=>{const v=G.d[j],x=GF[j-1],cl=v!=null?(v>0?'w':'l'):j==n?'t':j<n?'x':'f',sp=(j==15||j==29||j==30)?' s':'';
  return `<span class="gf-c ${cl}${sp}" title="Jour ${j} · ${x[0]}"><i>${j}</i><span class="gf-ci">${uxx(GIC[GK[j-1]],17)}</span><em>${v!=null?(v>0?'+'+v:'0'):(j==n?'À ouvrir':'')}</em></span>`};
 const W=[[1,7],[8,14],[15,21],[22,28],[29,30]];
 const grid=W.map(([a,b],wi)=>{let c='';for(let j=a;j<=b;j++)c+=cell(j);const wd=Object.keys(G.d).filter(d=>d>=a&&d<=b).length;
  return `<div class="gf-wk"><div class="gf-wh"><b>Semaine ${wi+1}</b><small>${wd}/${b-a+1} ouverts</small></div><div class="gf-g2">${c}</div></div>`}).join('');
 const leg=`<div class="gf-lg"><span><i class="w"></i>Gagné</span><span><i class="l"></i>Sans gain</span><span><i class="t"></i>Aujourd’hui</span><span><i class="s"></i>Gros lot</span></div>`;
 const nx=[1,2,3].map(d=>n+d).filter(j=>j<=30).map(j=>{const x=GF[j-1];return `<div class="s3-ro"><span class="s3-ib">${uxx(GIC[GK[j-1]],20)}</span><div class="fl"><b>${x[0]}</b><small>Jour ${j} · ${x[2]=='G'?'Gain garanti':'Jeu de chance'}</small></div><span class="s3-st">${fmt(x[3])} max</span></div>`}).join('');
 return{t:'Cadeaux du mois',h:hero+stats+hunt+`<div class="s3-sec">Mon calendrier<small class="s3-mu">1 cadeau par jour</small></div>`+grid+leg+(nx?`<div class="s3-sec">Prochains cadeaux</div><div>${nx}</div>`:'')+H.note('Ces gains ne comptent pas dans le plafond de '+CAP+' MONLoG par jour.')}};
CFG['sol|Historique']=()=>({t:'Transactions',h:S.tx.length?H.card([UJSOL.txRows(S.tx)]):H.empty('wal','Aucune transaction','Tes gains appara\u00eetront ici.')});
/* Guides façon centre d’aide : aperçu, rubriques, articles rédigés */
const GD={
 h:t=>`<h3 style="font:800 17px var(--h);margin:20px 0 4px">${t}</h3>`,
 p:t=>`<p style="font-size:15px;line-height:1.55;margin:6px 0">${t}</p>`,
 n:t=>`<p class="mu" style="font-size:13px;line-height:1.5;margin:8px 0">${t}</p>`,
 ul:a=>`<ul style="margin:6px 0 6px 20px;padding:0;list-style:disc;font-size:15px;line-height:1.55">${a.map(x=>`<li style="margin:5px 0">${x}</li>`).join('')}</ul>`,
 ol:a=>`<ol style="margin:6px 0 6px 20px;padding:0;list-style:decimal;font-size:15px;line-height:1.55">${a.map(x=>`<li style="margin:5px 0">${x}</li>`).join('')}</ol>`,
 tb:r=>`<div style="margin:8px 0">${r.map(([a,b])=>`<div style="display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-top:1px solid var(--ln);font-size:15px"><span>${a}</span><b class="mono" style="text-align:right">${b}</b></div>`).join('')}</div>`,
 qa:r=>`<div style="margin:8px -14px 0">${H.card(r.map(x=>H.det(...x)))}</div>`,
 df:r=>`<div style="margin:8px 0">${r.map(([a,b])=>`<div style="padding:11px 0;border-top:1px solid var(--ln)"><b style="font-size:15px">${a}</b><p class="mu" style="font-size:14px;line-height:1.5;margin-top:3px">${b}</p></div>`).join('')}</div>`,
 ln:(t,k)=>`<button type="button" class="btn s" data-ac="${k.startsWith('say:')?k:'dlink:'+k}" style="margin-top:10px">${t}</button>`
};
const GART=b=>b.map(x=>x[0]=='ln'?GD.ln(x[1],x[2]):GD[x[0]](x[1])).join('');
const mkGuide=(pre,hub,lead,facts,list)=>{
 const row=(x,a)=>`<button type="button" class="li" data-ac="dart:${pre}|${x.t}" style="width:100%;text-align:left">${ic(x.i,22)}<div class="fl"><b>${a||x.t}</b>${sub(x.s)}</div>${ic('chv',18)}</button>`;
 list.forEach((x,i)=>{CFG[pre+'|'+x.t]=()=>{const nx=list[i+1];return{t:hub,h:
  `<div class="card pad"><b style="font:800 22px/1.2 var(--h);display:block">${x.t}</b>${GART(x.b)}</div>`+
  (nx?H.sec('À lire ensuite')+H.card([row(nx)]):'')+
  (x.nf?'':fbBox())}}});
 return()=>{S.dh=[cur.key,cur.origin];return{t:hub,h:
  H.sec('Aperçu')+`<div class="card pad"><b style="font:800 20px/1.2 var(--h);display:block">${lead[0]}</b>${GD.p(lead[1])}</div>`+
  (facts?H.stats(facts):'')+
  H.sec('Rubriques')+H.card(list.map(x=>row(x)))+
  H.note('Dernière mise à jour : 8 novembre 2026')}}};

/* ===== Écran Solde : uniquement le MONLoG ===== */
CFG['sol|Gains']=mkGuide('sol','Comment ça marche',
 ['Tout comprendre sur le MONLoG','Le MONLoG récompense ton activité sur My UJLoG. Tu en gagnes en publiant, en échangeant et en ouvrant ton cadeau du jour, puis tu l’utilises pour offrir des cadeaux à tes camarades.'],
 [[CAP,'MONLoG max par jour'],['1','cadeau par jour'],['30','jours de cadeaux']],
 [
 {t:'Qu’est-ce que le MONLoG ?',i:'coin',s:'La monnaie de la communauté My UJLoG',b:[
  ['p','Le MONLoG est la monnaie de la communauté My UJLoG. Il récompense les étudiants actifs : tu en gagnes quand tu publies, quand ton activité intéresse tes camarades et quand tu participes à la vie de l’application.'],
  ['h','Un solde qui reste dans l’application'],
  ['p','Tes MONLoG s’accumulent sur ton écran Solde. Tu les utilises pour offrir des cadeaux à tes camarades.'],
  ['h','Où voir ton solde ?'],
  ['p','Ouvre le menu, rubrique Ressources, puis touche Solde. Tu y retrouves ton total, ta progression du jour, ta boîte cadeau et tes dernières transactions.']]},
 {t:'Comment gagner des MONLoG',i:'hrt',s:'Gains automatiques et bonus du jour',b:[
  ['p','Il y a trois façons de gagner des MONLoG : automatiquement, grâce à ton activité, avec les bonus du jour et avec ton cadeau du jour.'],
  ['h','Les gains automatiques'],
  ['ul',['Chaque tranche de 100 interactions : +10 MONLoG.','Chaque tranche de 50 nouveaux abonnés actifs : +25 MONLoG.']],
  ['p','Ils arrivent seuls dès qu’un palier est atteint. Tu retrouves chaque gain dans tes transactions, et le détail de ton activité dans Mes interactions.'],
  ['h','Les bonus'],
  ['tb',[['Connexion du jour','+1 MONLoG'],['Série de 7 jours','+10 MONLoG'],['Publier une photo','+2 MONLoG'],['Participer à une activité','+2 MONLoG'],['Inviter un ami','+50 MONLoG'],['Faire vérifier ton profil','+50 MONLoG']]],
  ['ul',['La connexion du jour compte une fois par jour.','Le bonus photo compte pour une photo par jour au maximum.','Une activité, c’est un sondage, un quiz, un vote…','Inviter un ami rapporte quand il a fait vérifier son profil.','La vérification de ton profil rapporte une seule fois.']],
  ['h','Récupérer tes bonus'],
  ['p','Les bonus arrivent dans la boîte cadeau, en haut de l’écran Solde. Touche « Récupérer » pour les ajouter à ton solde.']]},
 {t:'Les cadeaux du jour',i:'star',s:'Un cadeau à ouvrir chaque jour',b:[
  ['p','Chaque jour, un nouveau cadeau t’attend. Ouvre-le depuis l’icône de boîte cadeau de l’écran Solde ou depuis la rubrique Cadeaux : une boîte à ouvrir, une roue, une carte à gratter, un quiz…'],
  ['h','Sur 30 jours'],
  ['ul',['Un cadeau par jour, du jour 1 au jour 30.','Certains cadeaux garantissent un gain, d’autres reposent sur la chance.','Un plafond de 5 000 MONLoG par mois s’applique aux cadeaux du jour.','Ouvre les 30 cadeaux pour tenter le bonus de 500 MONLoG, dans la limite du plafond du mois.']],
  ['h','La chasse au trésor'],
  ['p','Un QR code est caché sur le campus : le scanner rapporte 10 000 MONLoG. Il n’y en a que 2 par mois et chacun ne peut être scanné qu’une seule fois.'],
  ['n','Les gains des cadeaux ne comptent pas dans le plafond du jour.']]},
 {t:'Le plafond du jour',i:'clk',s:`${CAP} MONLoG maximum par jour`,b:[
  ['p',`Pour que les gains restent justes pour tous, tu peux en gagner au maximum ${CAP} par jour grâce à ton activité et aux bonus.`],
  ['h','Quand tu atteins le plafond'],
  ['p','Tu ne gagnes plus de MONLoG pour le reste de la journée. Les récompenses qui dépassent le plafond restent dans ta boîte cadeau.'],
  ['h','Suivre ta progression'],
  ['p','Le cercle de l’écran Solde montre la part du plafond que tu as déjà gagnée aujourd’hui. La page « Gagner aujourd’hui » détaille ce qu’il te reste à récupérer.'],
  ['n','Reviens le lendemain pour le prochain bonus.']]},
 {t:'Ta confidentialité sur le MONLoG',i:'shd',s:'Ce qui est utilisé, visible et sous ton contrôle',b:[
  ['p','Ton solde et tes transactions sont personnels. Cet article explique quelles informations le MONLoG utilise, à quoi elles servent et ce que tu peux contrôler.'],
  ['h','Ce qui est visible'],
  ['p','Ton solde et ton historique s’affichent uniquement dans ton écran Solde. Tu peux masquer ton solde à tout moment avec l’icône œil.'],
  ['h','Les informations utilisées'],
  ['ul',['Ton activité : les interactions et les nouveaux abonnés comptés pour les gains automatiques.','Tes connexions : pour le bonus du jour et la série de 7 jours.','Tes transactions : tes gains, pour afficher ton historique.']],
  ['h','À quoi elles servent'],
  ['p','Ces informations servent à calculer tes gains et à écarter l’activité artificielle. Comme le reste de tes données, elles servent uniquement au fonctionnement de l’application.'],
  ['h','Ce que tu contrôles'],
  ['ul',['Masquer ou afficher ton solde.','Demander l’export ou la suppression de tes données depuis le Centre de confidentialité du menu.']]]},
 {t:'Sécurité et gains authentiques',i:'shd',s:'Comment le MONLoG est protégé',b:[
  ['p','Les MONLoG sont protégés contre les abus pour que les gains restent justes pour tous.'],
  ['h','Des gains authentiques'],
  ['p','Les gains dépendent d’une activité authentique. Les vues et les interactions artificielles sont écartées.'],
  ['h','Des garde-fous'],
  ['ul',[`Un plafond de ${CAP} MONLoG par jour.`,'Des paliers exigeants pour les gains automatiques.','Un plafond mensuel sur les cadeaux du jour.']],
  ['h','Bonnes pratiques'],
  ['ul',['Ne partage jamais ton mot de passe ni tes codes de vérification.','Ne partage jamais tes identifiants avec quelqu’un qui te promet des MONLoG.','En cas de doute, écris à l’assistance depuis le Centre d’aide.']]]},
 {t:'Questions fréquentes',i:'pho',s:'Les réponses aux questions les plus posées',b:[
  ['qa',[
   ['Quand reçois-je mes MONLoG ?','Les gains automatiques arrivent seuls dès qu’un palier est atteint. Les bonus se récupèrent en un geste dans la boîte cadeau, en haut de l’écran Solde.'],
   ['Comment ouvrir mon cadeau du jour ?','Touche la boîte cadeau en haut de l’écran Solde, ou ouvre la rubrique Cadeaux. Un nouveau cadeau t’attend chaque jour.'],
   ['Que se passe-t-il au plafond du jour ?','Tu ne gagnes plus de MONLoG pour la journée. Les récompenses qui dépassent le plafond restent dans la boîte cadeau.'],
   ['Pourquoi si peu de MONLoG ?',`Les paliers sont exigeants et le plafond de ${CAP} MONLoG par jour protège contre les abus, pour que les gains restent justes.`],
   ['Les gains sont-ils garantis ?','Ils dépendent d’une activité authentique : les vues et interactions artificielles sont écartées.'],
   ['Où retrouver mes gains ?','Dans l’écran Solde, rubrique Transactions. Touche « Tout voir » pour l’historique complet.']]]]}
 ]);

/* ===== Menu : guide de l’application My UJLoG ===== */
const APPGUIDE=mkGuide('app','Comment ça marche',
 ['Bienvenue sur My UJLoG','My UJLoG est l’application de la communauté étudiante : tu y publies, tu suis tes camarades, tu retrouves ton emploi du temps, tes démarches et tous les services du campus. Ce guide explique comment fonctionnent ton compte, ta confidentialité et l’apparence de l’application.'],
 null,
 [
 {t:'Premiers pas avec My UJLoG',i:'home',s:'Les onglets et où trouver chaque réglage',b:[
  ['p','My UJLoG réunit la vie de ton campus au même endroit. Une barre en bas de l’écran te donne accès à quatre onglets.'],
  ['h','Les quatre onglets'],
  ['ul',['Accueil : les publications et les stories de ta communauté.','Mon campus : ton emploi du temps et tes outils d’étudiant.','Mon guide : tes espaces (logement, restauration, bourses…) et leurs échéances.','Profil : tes publications, ton menu et tes réglages.']],
  ['h','Le menu'],
  ['p','Le menu réunit tout ce qui t’appartient : ton code QR, la modification de ton profil, tes réglages de confidentialité et l’aide, au même endroit et à deux touches de ton écran d’accueil.'],
  ['h','Où trouver quoi'],
  ['ul',['Tes réglages de confidentialité : menu, Paramètres, Centre de confidentialité.','Le mode sombre : menu, Paramètres.','L’aide : menu, Paramètres, Centre d’aide.']]]},
 {t:'Compte et authentification',i:'usr',s:'Connexion, vérification du profil et sécurité',b:[
  ['p','Ton compte est lié à ton UJ-ID. Cet article explique comment te connecter, prouver que tu es étudiant et protéger ton accès.'],
  ['h','Te connecter'],
  ['ol',['Saisis ton UJ-ID (par exemple UJ-AGRO-26-ZDA : UFR, année, initiales).','Entre ton mot de passe.','Si tu l’as oublié, touche « Mot de passe oublié » : un lien est envoyé à ton adresse e-mail.']],
  ['h','Changer de compte ou te déconnecter'],
  ['p','Tu peux ajouter un autre compte depuis « Changer de compte » et passer de l’un à l’autre. Se déconnecter ferme ta session sur cet appareil ; tu pourras te reconnecter à tout moment avec ton UJ-ID.'],
  ['h','Faire vérifier ton profil'],
  ['p','La vérification confirme que tu es bien étudiant et débloque ton badge certifié. Elle se fait en quatre étapes :'],
  ['ol',['Préinscription : remplis le formulaire à 100 %.','Carte étudiante : scanne le recto et le verso.','Visage : authentification par le visage.','Empreinte digitale : facultatif, si ton téléphone le permet.']],
  ['ln','Faire vérifier mon profil','prof|Faire vérifier mon profil'],
  ['h','Protéger ton compte'],
  ['ul',['Verrouillage biométrique : ouvre l’application avec ton empreinte ou ton visage. Il est désactivé par défaut.','Alertes de connexion : tu es prévenu quand une connexion inconnue est détectée. Elles sont activées par défaut.','Appareils connectés : tu vois où ton compte est ouvert et tu peux déconnecter un appareil.']],
  ['ln','Ouvrir Sécurité et autorisations','set|Sécurité et autorisations']]},
 {t:'Confidentialité',i:'shd',s:'Qui voit tes publications et comment te contacter',b:[
  ['p','Tu décides qui voit ce que tu partages et qui peut entrer en contact avec toi. Les réglages se trouvent dans le Centre de confidentialité et dans Paramètres et confidentialité.'],
  ['h','Qui voit tes publications'],
  ['ul',['Compte privé : seuls tes abonnés voient tes publications. Il est désactivé par défaut.','Audience par défaut : Public, Mes followers ou Privé. Par défaut, tes publications sont publiques.','Liste de suivis et photos aimées : visibles par toi uniquement, par tes abonnés ou par tout le monde. Par défaut, toi uniquement.']],
  ['h','Qui peut te contacter'],
  ['ul',['Messages directs : tout le monde, tes abonnés ou personne. Par défaut, tes abonnés.','Commentaires : choisis qui peut commenter tes publications. Par défaut, tout le monde.','Mentions : choisis qui peut te mentionner. Par défaut, tout le monde.','Comptes bloqués : un compte bloqué ne peut ni te suivre ni voir tes publications.']],
  ['h','Vues et réutilisation'],
  ['ul',['Vues : tu peux voir qui a consulté ton profil, et les autres voient aussi quand tu les consultes.','Republication, partage en story et téléchargement : tu autorises ou non chacun d’eux pour tes publications.']],
  ['h','Tes données'],
  ['ul',['Contacts et localisation : désactivés par défaut. Tu choisis ce que tu partages.','Contenus sensibles : masqués par défaut.','Publicités personnalisées : désactivées par défaut.','Export : demande une archive de tes publications et informations, envoyée par e-mail.']],
  ['p','Tes données servent uniquement au fonctionnement de l’application. Tu peux demander leur export ou leur suppression depuis le Centre de confidentialité.'],
  ['ln','Ouvrir le Centre de confidentialité','set|Centre de confidentialité'],
  ['ln','Lire les conditions et politiques','set|Conditions et politiques']]},
 {t:'Thèmes et apparence',i:'gear',s:'Mode clair, mode sombre et confort de lecture',b:[
  ['p','My UJLoG propose un thème clair et un thème sombre.'],
  ['h','Choisir ton thème'],
  ['ol',['Ouvre le menu.','Dans Paramètres, active ou coupe Mode sombre.','Le changement s’applique tout de suite à tous les écrans.']],
  ['p','Au premier lancement, l’application suit le réglage de ton téléphone. Ensuite, ton choix est mémorisé sur cet appareil.'],
  ['h','Thème clair et thème sombre'],
  ['ul',['Le thème clair utilise des fonds clairs.','Le thème sombre utilise un fond noir, plus reposant le soir.']],
  ['p','Seules les couleurs de l’interface changent : tes publications restent identiques.'],
  ['h','Confort de lecture'],
  ['ul',['Texte plus grand, Contraste élevé et Réduire les animations : dans Accessibilité.','Langue : Français ou English.','Économiseur de données : réduit la qualité des vidéos et désactive la lecture automatique.','Lecture : lecture automatique des vidéos, sous-titres et son par défaut.']],
  ['ln','Ouvrir Accessibilité','set|Accessibilité']]},
 {t:'Questions fréquentes',i:'pho',s:'Les réponses aux questions les plus posées',b:[
  ['qa',[
   ['Comment récupérer mon compte ?','Sur l’écran de connexion, touche « Mot de passe oublié » : un lien est envoyé à ton adresse e-mail.'],
   ['Comment faire vérifier mon profil ?','Ouvre Paramètres du profil puis « Faire vérifier mon profil » : préinscription, scan de la carte étudiante et authentification par le visage.'],
   ['Que faire si je vois une connexion inconnue ?','Si les alertes de connexion sont activées, tu es prévenu. Déconnecte ensuite l’appareil concerné depuis Sécurité et autorisations.'],
   ['Qui voit mes publications ?','Par défaut, tout le monde. Avec un compte privé, seuls tes abonnés les voient. Tu peux aussi choisir une audience par défaut.'],
   ['Que fait le blocage d’un compte ?','Un compte bloqué ne peut ni te suivre ni voir tes publications. Tu retrouves la liste dans Comptes bloqués.'],
   ['Puis-je récupérer mes données ?','Oui. Depuis le Centre de confidentialité, demande un export : un lien est envoyé à ton adresse e-mail.'],
   ['Mon thème a changé tout seul, pourquoi ?','Tant que tu n’as pas choisi, l’application suit le réglage clair ou sombre de ton téléphone. Active ou coupe le Mode sombre pour fixer ton choix.'],
   ['Comment signaler un contenu ?','Touche les trois points sur la publication, puis « Signaler » et choisis un motif.']]],
  ['ln','Contacter l’assistance','set|Contacter l’assistance']]}
 ]);
CFG['home|Comment ça marche']=APPGUIDE;CFG['set|Comment ça marche']=APPGUIDE;
/* ===== Menu : Conditions et politiques (même présentation que les guides) ===== */
const LEGAL=mkGuide('jur','Conditions et politiques',
 ['Les règles de My UJLoG','Ces textes expliquent ce que tu peux faire sur My UJLoG, comment tes données sont traitées et comment la communauté reste respectueuse. Choisis une rubrique pour la lire en entier.'],
 null,
 [
 {t:'Conditions d’utilisation',i:'doc',s:'Ce que tu acceptes en utilisant l’application',b:[
  ['p','En utilisant My UJLoG, tu acceptes ces conditions. Elles s’appliquent à tous les étudiants et au personnel qui utilisent l’application.'],
  ['h','Qui peut utiliser My UJLoG'],
  ['p','My UJLoG est destinée à la communauté de l’université : étudiants et personnel. Ton compte est lié à ton UJ-ID et reste personnel.'],
  ['h','Ton compte'],
  ['ul',['Tu es responsable de ton compte et de ce qui s’y passe.','Ne partage pas ton mot de passe.','Un compte est personnel : une personne, un compte.','Si tu vois une connexion inconnue, déconnecte l’appareil concerné.']],
  ['h','Tes publications'],
  ['p','Tu ne publies que des contenus dont tu es l’auteur ou dont tu as les droits. Tu restes responsable de ce que tu publies, et tu choisis qui peut le voir grâce à l’audience de tes publications.'],
  ['h','Ce que tu t’engages à faire'],
  ['ul',['Respecter les autres étudiants et le personnel.','Ne pas usurper l’identité d’une autre personne.','Ne pas publier de contenu violent, discriminatoire ou de harcèlement.','Ne pas gonfler artificiellement tes vues, tes mentions J’aime ou tes abonnés.']],
  ['h','Une communauté authentique'],
  ['p','My UJLoG vit grâce à des échanges sincères entre étudiants. Publie ce que tu as vraiment envie de partager : les vues et les abonnés viendront naturellement.'],
  ['h','Si les conditions ne sont pas respectées'],
  ['p','L’équipe de modération peut retirer un contenu, limiter une fonction ou suspendre un compte.'],
  ['h','Modifications'],
  ['p','Ces conditions peuvent évoluer. La date de dernière mise à jour est indiquée sur la page des rubriques.']]},
 {t:'Politique de confidentialité',i:'shd',s:'Les données utilisées, pourquoi et comment les contrôler',b:[
  ['p','Cette politique explique quelles données My UJLoG utilise, pourquoi, et comment tu les contrôles.'],
  ['h','Les données utilisées'],
  ['ul',['Ton compte : nom d’utilisateur, UJ-ID, adresse e-mail, téléphone et UFR.','Ton contenu : publications, stories, commentaires et messages.','Ton activité : interactions, abonnements et connexions.','La vérification du profil : préinscription, carte étudiante et authentification par le visage.','Tes appareils connectés, pour sécuriser ton compte.','Tes contacts et ta position sur le campus, seulement si tu les actives.']],
  ['h','Pourquoi elles sont utilisées'],
  ['ul',['Faire fonctionner l’application.','Montrer tes publications à l’audience que tu as choisie.','Sécuriser ton compte et te prévenir d’une connexion inconnue.','Vérifier ton profil et délivrer le badge certifié.','Garder l’application rapide, fiable et agréable à utiliser.']],
  ['h','Ce que voient les autres'],
  ['p','Tes publications sont visibles selon l’audience que tu choisis. Tes données servent uniquement au fonctionnement de l’application.'],
  ['h','Tes choix'],
  ['ul',['Choisir qui voit tes publications, qui peut t’écrire, te commenter ou te mentionner.','Activer ou couper les contacts, la localisation et les publicités personnalisées.','Demander une archive de tes publications et informations.','Demander la suppression de tes données.']],
  ['h','Nos 30 règles strictes'],['p','Ces règles s’appliquent à tous les comptes, sans exception.'],['ol',['Un seul compte par étudiant : les comptes multiples ou partagés sont interdits.','Ton UJ-ID est personnel : le prêter, le vendre ou l’échanger est interdit.','Tes informations d’inscription doivent être exactes : toute fausse déclaration entraîne une restriction.','L’usurpation d’identité (nom, photo ou carte étudiante d’une autre personne) est interdite et sanctionnée immédiatement.','Ne partage jamais ton mot de passe ni tes codes de vérification, avec personne, y compris avec l’équipe.','Ta carte étudiante numérique sert uniquement à vérifier ton identité : la falsifier ou la détourner est interdit.','Le badge certifié ne s’achète pas, ne se prête pas et ne s’obtient jamais avec un document falsifié.','Seul ton propre visage est accepté pour l’authentification : photo, écran ou masque interdits.','Tes données ne sont jamais vendues à des tiers ni utilisées pour de la publicité sans ton accord clair.','Chaque donnée est utilisée uniquement pour le but annoncé, sans réutilisation cachée.','Les contacts et la position sur le campus ne sont lus que si tu les actives, et tu peux les couper à tout moment.','Ne publie pas les données personnelles d’une autre personne (numéro, adresse, documents, photos privées) sans son accord.','Photographier ou filmer quelqu’un pour le publier sans son accord est interdit.','Les captures de conversations privées ne se publient pas sans l’accord de tous les participants.','Le harcèlement, les insultes et les moqueries répétées sont interdits, en public comme en privé.','Les menaces et l’incitation à la violence entraînent une restriction immédiate.','Les propos discriminatoires (origine, ethnie, religion, genre, handicap, filière) sont interdits.','Les contenus sexuels explicites ou obscènes sont interdits.','Les publications respectent les droits d’auteur : aucun contenu copié sans autorisation.','Les fausses informations sur l’université, ses examens ou ses résultats sont interdites.','Les arnaques, la publicité non autorisée et les messages en masse sont interdits.','Les vues, mentions J’aime et abonnés artificiels sont interdits : ils sont retirés de ton compte.','L’achat, la vente ou l’échange de comptes, d’accès ou d’abonnés est interdit.','Les sujets d’examen volés et la fraude aux examens ne peuvent ni se partager ni se publier.','Contourner la sécurité, le contrôle ou une restriction (nouveau compte, faux appareil) est interdit.','Toute infraction détectée restreint automatiquement le compte pendant 72 heures, sans aucun accès à l’application.','Une infraction répétée peut conduire à une restriction plus longue ou à une suspension définitive après examen.','Tu peux contester une restriction auprès de l’assistance : l’examen ne suspend pas le délai de 72 heures.','Tu peux activer une auto-déconnexion de 3, 5, 7 ou 14 jours : elle ne peut pas être annulée avant son terme.','Tu peux demander l’archive ou la suppression de tes données à tout moment, et elles ne sont conservées que le temps nécessaire.']],
  ['ln','Ouvrir le Centre de confidentialité','set|Centre de confidentialité']]},
 {t:'Règles de la communauté',i:'grp',s:'Un espace de respect entre étudiants',b:[
  ['p','My UJLoG est un espace de respect entre étudiants et avec le personnel. Ces règles s’appliquent aux publications, aux stories, aux commentaires et aux messages.'],
  ['h','Ce qui n’est pas autorisé'],
  ['ul',['Le harcèlement, l’intimidation et les moqueries répétées.','La discrimination.','Le contenu violent.','L’usurpation d’identité.','Les contenus dont tu n’es pas l’auteur et dont tu n’as pas les droits.','Les vues, mentions J’aime et interactions artificielles.']],
  ['h','Signaler un contenu'],
  ['ol',['Touche les trois points sur la publication.','Touche « Signaler ».','Choisis un motif.']],
  ['h','Sanction automatique'],['p','Dès qu’une infraction est détectée, ton compte est placé sous contrôle et reste restreint pendant 72 heures : tu ne peux plus l’utiliser pendant ce délai.'],['h','Ce qui se passe ensuite'],
  ['p','Les contenus signalés sont examinés par l’équipe de modération. Selon la situation, un contenu peut être retiré, et un compte peut être limité ou suspendu.'],
  ['h','Te protéger'],
  ['ul',['Bloque un compte : il ne peut ni te suivre ni voir tes publications.','Passe en compte privé pour que seuls tes abonnés voient tes publications.','Choisis qui peut t’écrire, te commenter ou te mentionner.']]]},
 {t:'Politique d’utilisation des cookies',i:'cld',s:'Stockage local et préférences',b:[
  ['p','My UJLoG utilise de petits fichiers et le stockage local de ton appareil pour fonctionner.'],
  ['h','Ce que nous utilisons'],
  ['ul',['Session : te garder connecté.','Préférences : thème clair ou sombre, langue.','Brouillons : conserver un texte non envoyé.']],
  ['h','Ce que nous n’utilisons pas'],
  ['ul',['Aucun suivi publicitaire entre applications.','Aucune revente de tes données.']],
  ['ln','Gérer les cookies','set|Politique d’utilisation des cookies']]},
 {t:'Contenus et droits d’auteur',i:'doc',s:'Ce que tu peux publier et réutiliser',b:[
  ['p','Tu restes propriétaire de ce que tu crées. En publiant, tu autorises My UJLoG à l’afficher à l’audience que tu as choisie.'],
  ['h','Tu peux publier'],
  ['ul',['Tes propres photos, vidéos et textes.','Des contenus dont tu as l’autorisation.','Des extraits courts avec leur source.']],
  ['h','Tu ne peux pas publier'],
  ['ul',['Les œuvres d’autres personnes sans autorisation.','Les cours, sujets d’examen ou documents confidentiels de l’université.','Des images d’une personne sans son accord.']],
  ['h','Retrait d’un contenu'],
  ['p','Si un contenu porte atteinte à tes droits, signale-le : il est examiné puis retiré si la demande est fondée.']]},
 {t:'Modération et sanctions',i:'shd',s:'Comment les règles sont appliquées',b:[
  ['p','L’équipe de modération examine les contenus signalés et les comportements contraires aux standards de la communauté.'],
  ['h','Les étapes'],
  ['ol',['Avertissement et demande de modifier ou retirer le contenu.','Limitation d’une fonction pendant une durée donnée.','Suspension du compte en cas de récidive ou d’infraction grave.']],
  ['h','Tes droits'],
  ['ul',['Être informé de la décision et de son motif.','Contester via l’assistance sous 48 h.','Consulter ton Statut du compte à tout moment.']],
  ['ln','Voir le statut de mon compte','set|Statut du compte']]},
 {t:'Sécurité de ton compte',i:'shd',s:'Les bons réflexes',b:[
  ['p','Ton compte est lié à ton UJ-ID. Quelques gestes simples le protègent.'],
  ['ul',['Choisis un mot de passe unique.','Active le verrouillage biométrique et les alertes de connexion.','Ne communique jamais ton mot de passe ni ton numéro Mobile Money.','Déconnecte les appareils que tu ne reconnais pas.']],
  ['ln','Ouvrir Sécurité et autorisations','set|Sécurité et autorisations']]},
 {t:'Termes et définitions',i:'book',s:'Les mots utilisés dans l’application',b:[
  ['p','Voici le sens des termes que tu rencontres dans My UJLoG, classés par ordre alphabétique.'],
  ['df',[
   ['Abonné','Étudiant qui te suit sur My UJLoG.'],
   ['Abonné actif','Abonné qui reste actif dans l’application. Les nouveaux abonnés actifs comptent pour les gains automatiques.'],
   ['Audience','Les personnes qui peuvent voir une publication : Public, Mes followers ou Privé.'],
   ['Badge certifié','Marque affichée sur un profil dont la vérification est terminée.'],
   ['Boîte cadeau','L’endroit où arrivent tes récompenses du jour, avant que tu les récupères.'],
   ['Compte privé','Compte dont les publications ne sont visibles que par ses abonnés.'],
   ['FCFA','Franc CFA : la monnaie utilisée pour tes paiements dans l’application, comme la recharge de ta Restocarte.'],
   ['Interaction','Action d’un autre étudiant sur ton contenu, comptée dans Mes interactions.'],
   ['UJ-ID','Le numéro qui identifie ton compte étudiant.'],
   ['Mobile Money','Service de paiement sur mobile : Orange Money ou Wave.'],
   ['Verrouillage biométrique','Ouverture de l’application avec ton empreinte ou ton visage.'],
   ['Vérification du profil','Démarche qui confirme que tu es étudiant et débloque le badge certifié.']]]]},
 {t:'Dédicace',i:'hrt',s:'À celles et ceux qui font vivre My UJLoG',nf:1,b:[
  ['p','My UJLoG est dédiée à la communauté étudiante de l’Université Jean Lorougnon Guédé : à celles et ceux qui apprennent, enseignent, créent et font vivre le campus chaque jour.'],
  ['p','Elle est née d’une idée simple : rapprocher les étudiants, faciliter leurs démarches et récompenser leur engagement.'],
  ['h','Dédicaces'],
  ['p','À [Nom du dédicataire], [message de dédicace].'],
  ['p','À [Nom du dédicataire], [message de dédicace].'],
  ['h','Remerciements'],
  ['p','Merci à [Nom des personnes ou des équipes remerciées] pour leur confiance et leur soutien.'],
  ['n','L’équipe My UJLoG']]}
 ]);
CFG['set|Conditions et politiques']=LEGAL;
CFG['home|Centre de confidentialité']=priv;['Sécurité et autorisations','Messages directs','Gérer les publications'].forEach(l=>{if(CFG['set|'+l])CFG['home|'+l]=CFG['set|'+l]});['Photos aimées','Archive'].forEach(l=>{if(CFG['act|'+l])CFG['home|'+l]=CFG['act|'+l]});CFG['home|Centre d’aide']=faq;CFG['home|Se déconnecter']=CFG['set|Se déconnecter'];
/* ===== v21 : profil, à la une, aide, confidentialité, paramètres ===== */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),nz=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const K=k=>'dlink:set|'+k,L=(i,t,s,a,v)=>`<button type="button" class="li" data-ac="${a}" style="width:100%;text-align:left">${ic(i)}<div class="fl"><b>${t}</b>${s?sub(s):''}</div>${v?`<span class="mu" style="font-size:13px">${v}</span>`:''}${ic('chv',18)}</button>`;
const hd=(i,t,s,x)=>`<div class="card pad v21hero"><span class="v21ic${x||''}">${ic(i,i=='vbd'?34:28)}</span><b>${t}</b><p class="mu">${s}</p></div>`;
const FLD='display:block;width:100%;border:0;background:none;font:inherit;color:inherit;outline:0';
Object.assign(S,{fb:{},tk:[],hl:[],hf:{t:'',sel:[],c:0},cs:0,cm2:'',ps:0});

/* --- Vérification du profil --- */
const VST=[['Préinscription','Formulaire rempli à 100 %','usr'],['Carte étudiante','Scan recto-verso de ta carte','pc'],['Visage','Authentification par le visage','cam'],['Empreinte digitale','Facultatif, si ton téléphone le permet','shd']];
CFG['set|Faire vérifier mon profil']=()=>{const n=S.ver,ok=n>=4;return{t:'Vérification du profil',h:
hd('vbd',ok?'Ton profil est vérifié':'Fais vérifier ton profil',ok?'Le badge certifié s’affiche sur ton profil.':'Confirme que tu es étudiant et obtiens le badge certifié.',ok?' ok':'').replace('</p>','</p>'+H.bar(n/4*100).replace('margin-top:6px','margin-top:6px;width:100%')+`<small class="mu">${n} sur 4 étapes</small>`)+
`<div class="v85st">${VST.map((x,i)=>{const k=i<n?'d':i==n?'c':'l',LK='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';return `<div class="v85s ${k}"><span class="v85n">${k=='d'?ic('chk',18):k=='l'?LK:i+1}</span><div class="v85b"><em class="v85e">Étape ${i+1} sur 4${i==3?' · facultatif':''}</em><b>${x[0]}</b>${sub(k=='l'?'Disponible après « '+VST[i-1][0]+' »':x[1])}${k=='c'?`<button type="button" class="chip v85go" data-ac="ver" aria-pressed="true">${n?'Continuer':'Commencer'}</button>`:''}</div>${k=='d'?'<span class="v21st">Fait</span>':''}</div>`}).join('')}</div>`+
H.sec('Pourquoi faire vérifier ?')+H.card([H.tip(1,'Badge certifié','Visible sur ton profil et tes publications'),H.tip(2,'Plus de confiance','Les autres savent que tu es étudiant'),H.tip(3,'Compte mieux protégé','Récupération facilitée en cas de perte')])}};

/* --- À la une --- */
const HLC=['#15803D','#1D4ED8','#B0306A','#C26A00','#7C3AED','#0E7C8C'],HLP=['Campus','Cours','Restaurant','Résidence','Événement','Sport','Voyage','Clubs'];
const hlC=(c,t,n,x)=>`<span class="v21hl"><i style="background:${c}">${/url\(/.test(c)?'':ic('star',26)}</i><b>${esc(t)}</b>${n!=null?`<small>${n} élément${n>1?'s':''}</small>`:''}${x||''}</span>`;
const hlCover=()=>{const f=S.hf,P=(MB[0]&&MB[0].pub)||[];return f.sel.length&&P[f.sel[0]]?P[f.sel[0]].c:HLC[f.c]};
const hlForm=()=>{const f=S.hf,P=(MB[0]&&MB[0].pub)||[];return `<div id="hlpv" style="text-align:center">${hlC(hlCover(),f.t||'À la une',null)}</div>`+
`<p id="hlcnt" style="font:800 14px var(--h);margin:14px 2px 8px">Choisis dans tes stories · ${f.sel.length} choisie${f.sel.length>1?'s':''}</p>`+
(P.length?`<div class="v73sg">${P.map((p,i)=>{const k=f.sel.indexOf(i);return `<button type="button" data-v21="hs:${i}" aria-pressed="${k>=0}" aria-label="Story ${i+1}" style="background:${p.c}"><span class="v73sc">${String(p.cap||'').replace(/<br>/g,' ')}</span><em>${esc(p.t||'')}</em><i>${k>=0?k+1:''}</i></button>`}).join('')}</div>`:H.empty('star','Aucune story','Publie une story : elle apparaîtra ici pour être mise à la une.'))+
`<div class="field" style="margin-top:12px"><label for="hlt">Légende</label><input id="hlt" maxlength="15" placeholder="Ex. : Rentrée 2026" value="${esc(f.t)}" style="${FLD}"></div><p class="mu" style="font-size:12.5px;margin:6px 2px">La première story choisie sert de couverture. Les numéros donnent l’ordre de lecture.</p><button type="button" class="btn" data-v21="hsave">Enregistrer</button>`};
const hlUp=()=>{const f=S.hf;$$('[data-v21^="hs:"]').forEach(b=>{const k=f.sel.indexOf(+b.dataset.v21.slice(3));b.setAttribute('aria-pressed',k>=0);const n=b.querySelector('i');if(n)n.textContent=k>=0?k+1:''});const c=$('#hlcnt');if(c)c.textContent='Choisis dans tes stories · '+f.sel.length+' choisie'+(f.sel.length>1?'s':'');const v=$('#hlpv');if(v)v.innerHTML=hlC(hlCover(),f.t||'À la une',null)};
CFG['set|Ajouter des éléments à la une']=()=>({t:'À la une',h:
hd('star','Mets en avant tes meilleurs moments','Tes à la une restent sur ton profil, sous ta bio, même après la fin de tes stories.')+
(S.hl.length?`<div class="v21hls">${S.hl.map((h,i)=>hlC(h.c,h.t,h.n.length,`<button type="button" class="v21x" data-v21="hdel:${i}" aria-label="Supprimer ${esc(h.t)}">×</button>`)).join('')}</div>`:'')+
(S.hl.length<8?hlForm():'')+H.note(S.hl.length+' sur 8 à la une')});
CFG['set|Nouvelle à la une']=()=>({t:'Nouvelle à la une',h:hlForm()});
const injectHl=()=>{const sig=S.hl.map(h=>h.t+h.c).join('|');$$('.tkhl').forEach(w=>{const a=w.querySelector('button[data-hlnew]:not(.v21p)');if(!a||w.dataset.sig===sig)return;$$('.v21p',w).forEach(x=>x.remove());let r=a;S.hl.forEach((h,hi)=>{const b=document.createElement('button');b.className='v21p';b.dataset.hlv=hi;b.innerHTML=`<i style="background:${h.c}">${/url\(/.test(h.c)?'':ic('star',24)}</i><span>${esc(h.t)}</span>`;r.after(b);r=b});w.dataset.sig=sig})};
new MutationObserver(()=>{if(S.hl.length)injectHl()}).observe(document.body,{childList:true,subtree:true});

/* --- Partager le profil (à côté du crayon) --- */
const shr=()=>{let s=$('#v21sh');if(!s){s=document.createElement('div');s.id='v21sh';document.body.appendChild(s)}
s.innerHTML=`<div class="v21bk" data-v21="sx"></div><div class="v21sp" role="dialog" aria-label="Partager le profil"><div class="v21hd"><b>Partager le profil</b><button type="button" class="ib" data-v21="sx" aria-label="Fermer">×</button></div><div class="card pad" style="text-align:center"><b style="font:800 18px var(--h)">${esc(($('#mmpf .fl b')||{}).textContent||'Vous')}</b><p class="mono mu" style="font-size:13px;margin-top:2px">ujlog.app/@${MB[0].h}</p></div><button type="button" class="shx-o" data-v21="scopy">${ic('shr',22)}Copier le lien</button><button type="button" class="shx-o" data-v21="swa">${ic('cht',22)}Envoyer sur WhatsApp</button><button type="button" class="shx-o" data-v21="sqr">${ic('qr',22)}Afficher mon code QR</button><button type="button" class="shx-o" data-v21="snat">${ic('ext',22)}Plus d’options…</button></div>`;s.className='on'};
const openMenuTo=(k,o)=>{MM().hidden=false;S.hist=[];open(k,o||'home')};

/* --- Compte --- */
CFG['set|Compte']=()=>({t:'Compte',h:H.card([H.row('usr','Nom d’utilisateur','','@'+MB[0].h),H.row('doc','UJ-ID','','[UJ-ID]'),H.row('news','Adresse e-mail','','[adresse e-mail]'),H.row('pho','Téléphone','','[numéro]'),H.row('grp','UFR','','[UFR]')])+`<button class="btn" data-pedit="1">Modifier mes informations</button>`+H.sec('Sécurité et gestion')+H.card([L('shd','Sécurité et autorisations','Biométrie, alertes, appareils',K('Sécurité et autorisations')),L('doc','Gérer les publications','Archiver ou supprimer',K('Gérer les publications')),L('vbd','Vérification du profil',S.ver>=4?'Profil vérifié':S.ver+' sur 4 étapes',K('Faire vérifier mon profil'))])});

/* --- Centre de confidentialité --- */
CFG['set|Compte privé']=()=>({t:'Compte privé',h:H.card([H.sw('priv','Compte privé','Seuls tes abonnés voient tes publications',false,'Compte privé','usr')])+H.sec('Ce qui change')+H.card([H.tip(1,'Tes publications','Visibles uniquement par tes abonnés'),H.tip(2,'Nouveaux abonnés','Tu approuves chaque demande'),H.tip(3,'Tes abonnés actuels','Ils restent abonnés')])});
const prot=()=>[['Compte privé',!!S.priv,'Compte privé'],['Verrouillage biométrique',!!S.bio,'Sécurité et autorisations'],['Alertes de connexion',S.alg??true,'Sécurité et autorisations'],['Identifications approuvées',!!S.apv,'Mentions'],['Messages directs limités',(S.dm??1)!=0,'Messages directs'],['Contacts non synchronisés',!S.ctc,'Contacts et localisation']];
CFG['set|Centre de confidentialité']=()=>{S.ps=0;const p=prot(),n=p.filter(x=>x[1]).length;return{t:'Centre de confidentialité',h:
hd('shd','Tu gardes le contrôle','Choisis qui voit tes publications, qui peut te trouver et comment tes données sont utilisées.')+
`<div class="card pad"><b>Niveau de protection : ${n} sur 6</b>${H.bar(n/6*100)}<p class="mu" style="font-size:13px;margin-top:6px">${n<4?'Quelques réglages peuvent être renforcés.':n<6?'Bon niveau de protection.':'Ton compte est très bien protégé.'}</p></div>`+
H.card([L('chk','Vérification de la confidentialité','4 étapes rapides pour passer l’essentiel en revue',K('Vérification de la confidentialité'))])+
H.sec('Raccourcis')+H.card([L('eye','Qui peut voir ce que tu partages','Audience par défaut',K('Contrôle du public')),L('plus','Qui peut te contacter','Messages, commentaires, mentions',K('Messages directs')),L('pin','Comment on peut te trouver','Contacts et localisation',K('Contacts et localisation')),L('shd','Comptes bloqués','',K('Comptes bloqués')),L('dl','Tes données et ton compte','Export, suppression',K('Tes données'))])+
H.sec('Points à vérifier')+H.card(p.map(x=>x[1]?`<div class="li">${ic('chk')}<div class="fl"><b>${x[0]}</b></div><span class="v21st">OK</span></div>`:L('flt',x[0],'À renforcer',K(x[2]),'Régler')))+
H.sec('En savoir plus')+H.card([L('doc','Politique de confidentialité','Les données utilisées et pourquoi',K('Politique de confidentialité')),L('grp','Règles de la communauté','',K('Standards de la communauté')),L('book','Termes et définitions','',K('Termes et définitions'))])}};
const PSS=[['Qui peut voir ce que tu partages ?',()=>H.ch('aud',['Public','Mes followers','Privé'],0)+H.note('Ce choix s’applique à tes nouvelles publications.')],
['Qui peut te contacter ?',()=>H.ch('dm',['Tout le monde','Mes abonnés','Personne'],1)+H.sec('Commentaires')+H.ch('cmw',['Tout le monde','Mes abonnés','Personne'],0)],
['Sécurité du compte',()=>H.card([H.sw('bio','Verrouillage biométrique','Empreinte ou visage pour ouvrir l’app',false,'','shd'),H.sw('alg','Alertes de connexion','Notifie-moi d’une connexion inconnue',true,'','bell')])],
['Tes données',()=>H.card([H.sw('ctc','Synchroniser mes contacts','Pour retrouver des camarades',false,'','pho'),H.sw('loc','Position sur le campus','Pour les services autour de toi',false,'','pin'),H.sw('ads','Publicités personnalisées','',false,'','news')])]];
CFG['set|Vérification de la confidentialité']=()=>{const i=S.ps;if(i>=4)return{t:'Vérification terminée',h:hd('chk','Tout est à jour','Tes choix de confidentialité sont enregistrés.',' ok')+`<button type="button" class="btn" data-v21="psend">Terminer</button>`};
return{t:'Vérification',h:`<p class="mu" style="font-size:13px;margin:0 2px">Étape ${i+1} sur 4</p>`+H.bar((i+1)*25)+`<h3 style="font:800 20px var(--h);margin:10px 2px 0">${PSS[i][0]}</h3>`+PSS[i][1]()+`<div style="display:flex;gap:8px">${i?`<button type="button" class="btn s" data-v21="ps:-1" style="flex:1">Précédent</button>`:''}<button type="button" class="btn" data-v21="ps:1" style="flex:1">${i==3?'Terminer':'Suivant'}</button></div>`}};
CFG['set|Tes données']=()=>({t:'Tes données',h:
hd('dl','Tes données t’appartiennent','Demande une copie de tes informations ou supprime ton compte.')+
H.sec('Télécharger mes données')+`<div class="card pad"><p class="mu" style="font-size:13px">Publications, stories, commentaires et informations de profil, dans une archive envoyée par e-mail.</p>${S.exp?`<span class="v21st" style="margin-top:8px;display:inline-block">Demande en cours · prête sous 48 h</span>`:`<button type="button" class="btn s" data-v21="exp" style="margin-top:10px">Demander mon archive</button>`}</div>`+
H.sec('Supprimer le compte')+(S.del?`<div class="card pad"><b>Suppression programmée</b><p class="mu" style="font-size:13px;margin:4px 0 10px">Ton compte sera supprimé dans 30 jours. Reconnecte-toi avant pour l’annuler.</p><button type="button" class="btn s" data-v21="deln">Annuler la suppression</button></div>`:`<div class="card pad"><p class="mu" style="font-size:13px">Cette action supprime définitivement ton profil, tes publications et tes données. Pour confirmer, écris SUPPRIMER.</p><div class="field" style="margin-top:8px"><input id="dcf" placeholder="SUPPRIMER" autocomplete="off" style="${FLD}"></div><button type="button" class="btn" data-v21="del" style="background:var(--red);margin-top:10px">Supprimer mon compte</button></div>`)});

/* --- Centre d’aide --- */
const HELP=[['Compte et connexion','usr','Mot de passe, appareils',[['Comment récupérer mon compte ?','Sur l’écran de connexion, touche « Mot de passe oublié » : un lien est envoyé à ton adresse e-mail.'],['Je vois une connexion inconnue','Ouvre Sécurité et autorisations, déconnecte l’appareil concerné puis change ton mot de passe.'],['Puis-je changer mon nom d’utilisateur ?','Oui, depuis Modifier le profil. Ton UJ-ID, lui, ne change pas.']]],
['Profil et vérification','vbd','Badge, photo, bio',[['Comment obtenir le badge certifié ?','Ouvre « Faire vérifier mon profil » : préinscription, scan de la carte étudiante, puis authentification par le visage.'],['Comment mettre une publication à la une ?','Menu, « Ajouter des éléments à la une », puis crée une à la une avec un titre, une couleur et des éléments.'],['Comment partager mon profil ?','Touche l’icône de partage à côté du crayon, en haut de ton profil.']]],
['Publications et stories','cam','Publier, archiver, signaler',[['Comment archiver une publication ?','Compte, « Gérer les publications », puis Archiver. Elle reste visible uniquement par toi.'],['Comment signaler un contenu ?','Touche les trois points sur la publication, puis « Signaler » et choisis un motif.'],['Qui voit mes publications ?','Cela dépend de ton audience par défaut et du mode compte privé.']]],
['Confidentialité et sécurité','shd','Audience, blocage, données',[['Comment passer en compte privé ?','Menu, Tous les paramètres, puis Compte privé.'],['Que fait le blocage d’un compte ?','Un compte bloqué ne peut ni te suivre ni voir tes publications.'],['Puis-je récupérer mes données ?','Oui : Centre de confidentialité, Tes données, puis Demander mon archive.']]],
['Mon profil','usr','Photo, bio, identifiant',[['Comment modifier mon profil ?','Dans ton profil, touche « Modifier » : tu peux changer ta photo, ta bio et ton nom d’utilisateur.'],['À quoi sert mon UJ-ID ?','C’est ton identifiant unique, de la forme UJ-AGRO-26-ZDA : ton UFR, l’année et tes initiales. Il ne change pas.'],['Comment mettre mes meilleurs moments en avant ?','Utilise « À la une » sous ta bio pour épingler tes publications préférées.']]],
['Restocarte et services','wal','Recharge, solde, carte',[['Comment recharger ma Restocarte ?','Mon campus, Restauration, puis Recharger : choisis un montant et un moyen de paiement.'],['Où voir mon solde ?','Dans le menu, rubrique Ressources, puis Solde.'],['J’ai perdu ma carte','Contacte l’assistance pour la bloquer, puis demande un duplicata à la scolarité.']]]];
HELP.forEach(h=>{CFG['set|Aide : '+h[0]]=()=>({t:h[0],h:H.card(h[3].map(x=>H.det(...x)))+fbBox()+H.card([L('cht','Il te faut autre chose ?','Écris à l’assistance',K('Contacter l’assistance'))])})});
CFG['set|Centre d’aide']=()=>({t:'Centre d’aide',h:
`<div class="field row" style="gap:10px;color:var(--mu);align-items:center">${ic('se',20)}<input id="hq" placeholder="Rechercher dans l’aide" autocomplete="off" style="flex:1;border:0;background:none;font:inherit;color:var(--ink);outline:0"></div><div id="hres"></div><div id="hmain" style="display:flex;flex-direction:column;gap:10px">`+
H.sec('Sujets')+`<div class="v21tp">${HELP.map(h=>`<button type="button" class="card" data-ac="dlink:set|Aide : ${h[0]}"><span>${ic(h[1],24)}</span><b>${h[0]}</b><small>${h[2]}</small></button>`).join('')}</div>`+
H.sec('Questions fréquentes')+H.card(HELP.slice(0,3).map(h=>H.det(h[3][0][0],h[3][0][1])))+
H.sec('Besoin d’aide ?')+H.card([L('cht','Contacter l’assistance','Réponse sous 48 h',K('Contacter l’assistance')),L('clk','Mes demandes',S.tk.length?S.tk.length+' envoyée'+(S.tk.length>1?'s':''):'Aucune demande',K('Mes demandes')),`<button type="button" class="li" data-v21="cto:4" style="width:100%;text-align:left">${ic('flt')}<div class="fl"><b>Signaler un problème</b>${sub('Un bug ou un comportement inattendu')}</div>${ic('chv',18)}</button>`])+`</div>`+H.note('Dernière mise à jour : 8 novembre 2026')});
const CATS=['Compte et connexion','Vérification du profil','Services du campus','Publications','Signaler un problème','Autre'];
CFG['set|Contacter l’assistance']=()=>({t:'Contacter l’assistance',h:hd('cht','Écris-nous','Un membre de l’équipe te répond sous 48 h. Téléphone et WhatsApp : 05 06 17 23 17 · E-mail : monservice.ujlog@gmail.com')+H.sec('Sujet')+H.ch('cs',CATS,0)+`<div class="field"><label for="cmsg">Ton message</label><textarea id="cmsg" rows="5" maxlength="500" placeholder="Décris ton problème en quelques phrases" style="${FLD};resize:none">${esc(S.cm2)}</textarea></div><div class="mu" id="ccnt" style="text-align:right;font-size:12px;margin-top:-6px">${S.cm2.length}/500</div><button type="button" class="btn" data-v21="send">Envoyer à l’assistance</button>`});
CFG['set|Demande envoyée']=()=>{const t=S.tk[0]||{id:'—'};return{t:'Demande envoyée',h:hd('chk','Merci, on s’en occupe','Ta demande n° '+t.id+' est bien reçue. Réponse sous 48 h.',' ok')+H.card([L('clk','Voir mes demandes','',K('Mes demandes')),L('pho','Retour au Centre d’aide','',K('Centre d’aide'))])}};
CFG['set|Mes demandes']=()=>({t:'Mes demandes',h:S.tk.length?H.card(S.tk.map(t=>`<div class="li">${ic('cht')}<div class="fl"><b>${t.c}</b>${sub('n° '+t.id+' · '+t.d)}${sub(esc(t.m.slice(0,70)))}</div><span class="v21st">Reçue</span></div>`)):H.empty('cht','Aucune demande','Tes messages à l’assistance apparaîtront ici.')+L('cht','Contacter l’assistance','',K('Contacter l’assistance'))});
function fbBox(){const k=cur.key,f=S.fb[k],r=S.fb[k+'r'];
 if(f==null)return`<div class="card pad" style="text-align:center"><b>Cet article t’a-t-il été utile ?</b><div style="display:flex;gap:8px;margin-top:10px"><button type="button" class="btn s" data-v21="fb:1" style="flex:1">Oui</button><button type="button" class="btn s" data-v21="fb:0" style="flex:1">Non</button></div></div>`;
 if(f==1)return`<div class="card pad" style="text-align:center;color:var(--g)">${ic('chk',26)}<b style="display:block;margin-top:4px">Merci pour ton retour !</b><p class="mu" style="font-size:13px">Il nous aide à améliorer l’aide.</p></div>`;
 return`<div class="card pad" style="text-align:center"><b>Dommage. Que manquait-il ?</b><div class="chips" style="flex-wrap:wrap;justify-content:center;margin:8px 0 0">${['Information manquante','Pas assez clair','Ne fonctionne pas'].map((x,i)=>`<button type="button" class="chip" data-v21="fbr:${i}" aria-pressed="${r==i}">${x}</button>`).join('')}</div>${r!=null?`<p class="mu" style="margin:8px 0 0;font-size:13px">Merci, ton retour est envoyé.</p>`:''}<button type="button" class="btn s" data-ac="dlink:set|Contacter l’assistance" style="margin-top:10px">Contacter l’assistance</button></div>`}

/* --- Tous les paramètres (sans doublons avec le menu) --- */
const OPT={aud:['Public','Mes followers','Privé'],dm:['Tout le monde','Mes abonnés','Personne'],lang:['Français','English']};
const Rw=(i,t,v)=>`<button type="button" class="li" style="width:100%;text-align:left">${ic(i)}<div class="fl"><b>${t}</b></div>${v?`<span class="mu" style="font-size:13px">${v}</span>`:''}${ic('chv',18)}</button>`,Rg=(i,t,g)=>`<button type="button" class="li" data-go="${g}" style="width:100%;text-align:left">${ic(i)}<div class="fl"><b>${t}</b></div>${ic('chv',18)}</button>`;
const buildSet=()=>{const p=$('#mmp-set');if(!p||p.hidden)return;const on=k=>S[k]?'Activé':'Désactivé',g=(t,r)=>H.sec(t)+H.card(r);
[...p.children].slice(1).forEach(c=>c.remove());
p.insertAdjacentHTML('beforeend',g('Confidentialité',[Rw('eye','Contrôle du public',OPT.aud[S.aud??0]),Rw('plus','Messages directs',OPT.dm[S.dm??1]),Rw('doc','Commentaires',OPT.dm[S.cmw??0]),Rw('usr','Mentions',OPT.dm[S.mn??0]),Rw('grp','Liste de suivis'),Rw('hrt','Photos aimées'),Rw('cam','Vues'),Rw('pin','Contacts et localisation')])+
g('Interactions et partage',[Rw('shr','Réutilisation du contenu'),Rw('dl','Téléchargements'),Rw('cht','Boîte de réception et messagerie')])+
g('Contenu et lecture',[Rw('news','Préférences de contenu'),Rw('cam','Lecture')])+
g('Stockage',[Rw('coin','Libérer de l’espace')])+
g2('Votre activité','Examine ton activité et les services liés à ton compte.',[`<button type="button" class="li" data-mmp="act" style="width:100%;text-align:left">${ic('clk')}<div class="fl"><b>Historique d’activité</b></div>${ic('chv',18)}</button>`,Rw('pin','Localisation'),Rw('globe','Applications et sites Web',S.apps.length),Rw('grp','Services de l’université'),Rw('book','Comment gérer vos informations')])+
`<p class="mu" style="text-align:center;font-size:12px">Notifications, compte, langue, accessibilité et aide sont dans le menu.</p>`)};
CFG['set|Contenus hors ligne']=CFG['home|Contenus hors ligne'];

/* --- Alias depuis le menu et actions --- */
['Compte','Faire vérifier mon profil','Ajouter des éléments à la une','Conditions et politiques','Centre de confidentialité','Centre d’aide'].forEach(k=>CFG['home|'+k]=CFG['set|'+k]);
CFG['prof|Faire vérifier mon profil']=CFG['set|Faire vérifier mon profil'];CFG['prof|Ajouter des éléments à la une']=CFG['set|Ajouter des éléments à la une'];CFG['pro|Accueil de l’assistance']=CFG['set|Centre d’aide'];
const V=(a)=>{const[k,x]=a.split(':');
 if(k=='hc'){S.hf.c=+x;render()}
 else if(k=='hs'){const s=S.hf.sel,i=+x,p=s.indexOf(i);p<0?s.push(i):s.splice(p,1);hlUp()}
 else if(k=='hsave'){const f=S.hf;if(!f.t.trim())return say('Ajoute une légende');if(!f.sel.length)return say('Choisis au moins une story');if(S.hl.length>=8)return say('Maximum 8 à la une');S.hl.push({t:f.t.trim(),c:((MB[0].pub[f.sel[0]]||{}).c)||HLC[f.c],n:f.sel.map(i=>MB[0].pub[i]).filter(Boolean).map(p=>({c:p.c,cap:p.cap,t:'À la une',f:p.f,fl:p.fl}))});S.hf={t:'',sel:[],c:0};injectHl();say('À la une ajoutée à ton profil');S.dret=null;open('set|Ajouter des éléments à la une',cur.origin)}
 else if(k=='hdel'){S.hl.splice(+x,1);$$('.tkhl').forEach(w=>{$$('.v21p',w).forEach(b=>b.remove());delete w.dataset.sig});injectHl();say('À la une supprimée');render()}
 else if(k=='sx')$('#v21sh').className='';
 else if(k=='scopy'){copy('https://ujlog.app/@'+MB[0].h);$('#v21sh').className=''}
 else if(k=='swa'){window.open('https://wa.me/?text='+encodeURIComponent('Retrouve-moi sur My UJLoG : https://ujlog.app/@'+MB[0].h),'_blank','noopener');$('#v21sh').className=''}
 else if(k=='snat')doShare();
 else if(k=='sqr'){$('#v21sh').className='';MM().hidden=false;S.hist=['home'];S.syn=1;const b=document.createElement('button');b.dataset.mmp='qr';b.hidden=true;MM().appendChild(b);b.click();b.remove();S.syn=0}
 else if(k=='ps'){S.ps=Math.max(0,S.ps+ +x);render()}
 else if(k=='psend'){S.ps=0;say('Vérification terminée');S.dret=null;open('set|Centre de confidentialité',cur.origin)}
 else if(k=='exp'){S.exp=1;say('Demande enregistrée : archive envoyée par e-mail');render()}
 else if(k=='del'){const v=$('#dcf');if(!v||v.value.trim().toUpperCase()!='SUPPRIMER')return say('Écris SUPPRIMER pour confirmer');S.del=1;say('Suppression programmée');render()}
 else if(k=='deln'){S.del=0;say('Suppression annulée');render()}
 else if(k=='cto'){S.cs=+x;S.dret={to:cur.key,from:'set|Contacter l’assistance',o:cur.origin};open('set|Contacter l’assistance',cur.origin)}
 else if(k=='send'){if(S.cm2.trim().length<10)return say('Écris au moins 10 caractères');S.tk.unshift({id:'AS-'+(1001+S.tk.length),c:CATS[S.cs],m:S.cm2.trim(),d:'À l’instant'});S.cm2='';S.dret=null;open('set|Demande envoyée',cur.origin)}
 else if(k=='fb'){S.fb[cur.key]=+x;render()}
 else if(k=='fbr'){S.fb[cur.key+'r']=+x;render()}};
document.addEventListener('click',e=>{const t=s=>e.target.closest&&e.target.closest(s);
 const b=t('[data-v21]');if(b){e.preventDefault();e.stopPropagation();V(b.dataset.v21);return}
 if(t('[data-pshr]')){e.preventDefault();e.stopPropagation();shr();return}
 const hv=t('[data-hlv]');if(hv){e.preventDefault();e.stopPropagation();const h=S.hl[+hv.dataset.hlv];h&&window.UJ_SV&&UJ_SV(-1,false,0,h.t,h.n.map(x=>Object.assign({},x)));return}
 if(t('[data-hlnew]')){e.preventDefault();e.stopPropagation();openMenuTo('set|Ajouter des éléments à la une');return}
 setTimeout(buildSet,40)},true);
document.addEventListener('input',e=>{const i=e.target.id;
 if(i=='hlt'){S.hf.t=e.target.value;const b=$('#mmp-det .v21hl b');if(b)b.textContent=S.hf.t||'À la une'}
 else if(i=='cmsg'){S.cm2=e.target.value;const c=$('#ccnt');if(c)c.textContent=S.cm2.length+'/500'}
 else if(i=='hq'){const q=nz(e.target.value.trim()),r=$('#hres'),m=$('#hmain');if(!r)return;m.hidden=!!q;if(!q){r.innerHTML='';return}const h=[];HELP.forEach(t=>t[3].forEach(x=>{if(nz(x[0]+' '+x[1]).includes(q))h.push(x)}));r.innerHTML=h.length?H.card(h.map(x=>H.det(...x))):H.empty('se','Aucun résultat','Essaie un autre mot ou écris à l’assistance.')+`<button type="button" class="btn" data-ac="dlink:set|Contacter l’assistance">Contacter l’assistance</button>`}});

/* ===== v22 : aide et assistance, activité, mentions légales ===== */
Object.assign(S,{acc:[{n:'Vous',h:'@vous'}],ac:0,rp:0,rm:'',apps:['Portail UJLoG','Restocarte','Plateforme de cours']});
const g2=(t,s,r)=>H.sec(t)+H.note(s)+H.card(r);
const LG=k=>()=>{S.dh=['set|Conditions et politiques','home'];return CFG['jur|'+k]()};
[['Conditions de service','Conditions d’utilisation'],['Politique de confidentialité','Politique de confidentialité'],['Standards de la communauté','Règles de la communauté'],['Termes et définitions','Termes et définitions'],['Dédicace','Dédicace']].forEach(([a,b])=>CFG['set|'+a]=LG(b));
CFG['set|Statut du compte']=()=>({t:'Statut du compte',h:hd('chk',(window.UJMOD&&UJMOD.inf()?'Ton compte a déjà été restreint':'Ton compte est en règle'),(window.UJMOD&&UJMOD.inf()?UJMOD.inf()+' infraction(s) enregistrée(s). Chaque infraction restreint le compte pendant 72 heures.':'Aucune infraction détectée sur ton compte.'),(window.UJMOD&&UJMOD.inf()?'':' ok'))+H.card([H.row('chk','Règles de la communauté',(window.UJMOD&&UJMOD.inf()?'Infraction relevée':'Respectées')),H.row('vbd','Vérification du profil',S.ver>=4?'Profil vérifié':S.ver+' sur 4 étapes',S.ver>=4?'Oui':'En cours'),H.row('shd','Confidentialité',S.priv?'Compte privé':'Compte public'),H.row('shd','Restrictions',(window.UJMOD&&UJMOD.inf()?'72 h par infraction':'Aucune limitation active'),(window.UJMOD&&UJMOD.inf()?String(UJMOD.inf()):'0')),H.row('clk','Dernier examen','Contrôle automatique','Aujourd’hui')])+H.card([L('grp','Standards de la communauté','',K('Standards de la communauté')),L('cht','Contester une décision','Écris à l’assistance',K('Contacter l’assistance'))])});
CFG['set|Espace Assistance']=()=>({t:'Espace Assistance',h:hd('cht','Ton espace assistance','Suis tes demandes et retrouve toutes les façons de nous joindre.')+H.stats([[S.tk.length,'Demandes'],[S.tk.length,'En cours'],['48 h','Délai']])+H.card([L('cht','Nouvelle demande','',K('Contacter l’assistance')),L('clk','Mes demandes',S.tk.length?S.tk.length+' envoyée'+(S.tk.length>1?'s':''):'Aucune',K('Mes demandes')),L('pho','Centre d’aide','Réponses rapides',K('Centre d’aide')),L('flt','Signaler un problème','',K('Signaler un problème'))])+H.sec('Horaires')+H.card([H.row('clk','Lundi – vendredi','','8 h – 17 h'),H.row('clk','Samedi','','8 h – 12 h')])+H.note('Hors horaires, ton message est traité le jour ouvré suivant.')});
const RPC=['Bug d’affichage','Connexion','Paiement','Contenu inapproprié','Autre'];
CFG['set|Signaler un problème']=()=>({t:'Signaler un problème',h:hd('flt','Quelque chose ne va pas ?','Décris le problème : l’équipe le reçoit avec la version de ton application.')+H.sec('Type de problème')+H.ch('rp',RPC,0)+`<div class="field"><label for="rmsg">Ce qui s’est passé</label><textarea id="rmsg" rows="5" maxlength="500" placeholder="Que faisais-tu ? Que s’est-il passé ?" style="${FLD};resize:none">${esc(S.rm)}</textarea></div><button type="button" class="btn" data-v21="rsend">Envoyer le signalement</button>`+H.note('Pour un contenu inapproprié, utilise aussi « Signaler » sur la publication.')});
CFG['set|À propos']=()=>({t:'À propos',h:hd('home','My UJLoG','Version 1.0 · l’application de la communauté étudiante de l’Université Jean Lorougnon Guédé.')+H.card([H.row('book','Version','','1.0'),H.row('cld','Dernière mise à jour','','8 nov. 2026'),H.row('shd','Éditeur','','UJLoG'),H.row('pin','Campus','','Daloa')])+`<button type="button" class="btn s" data-v21="upd">Rechercher une mise à jour</button>`+H.sec('Informations')+H.card([L('doc','Conditions de service','',K('Conditions de service')),L('doc','Politique de confidentialité','',K('Politique de confidentialité')),L('grp','Standards de la communauté','',K('Standards de la communauté')),L('hrt','Dédicace et remerciements','',K('Dédicace'))])+H.note('© 2026 Université Jean Lorougnon Guédé')});
CFG['set|Politique d’utilisation des cookies']=()=>({t:'Cookies et stockage local',h:`<div class="card pad"><b style="font:800 20px/1.2 var(--h)">Politique d’utilisation des cookies</b>`+GD.p('My UJLoG utilise de petits fichiers et le stockage local de ton appareil pour fonctionner. Cette page explique lesquels et comment les contrôler.')+GD.h('Ce que nous utilisons')+GD.ul(['Session : te garder connecté.','Préférences : thème clair ou sombre, langue.','Brouillons : conserver un texte non envoyé.'])+GD.h('Ce que nous n’utilisons pas')+GD.ul(['Aucun suivi publicitaire entre applications.','Aucune revente de tes données.'])+`</div>`+H.card([H.sw('ck','Mesure d’audience anonyme','Aide à améliorer l’application',true,'','cld')])+H.card([L('coin','Libérer de l’espace','Vider cache et brouillons',K('Libérer de l’espace'))])});
CFG['set|Applications et sites Web']=()=>({t:'Applications et sites Web',h:S.apps.length?H.card(S.apps.map((a,i)=>`<div class="li">${ic('globe')}<div class="fl"><b>${a}</b>${sub('Connecté avec ton compte My UJLoG')}</div><button type="button" data-v21="appdel:${i}" style="font-weight:700;font-size:13px;color:var(--red);padding:8px 4px">Retirer</button></div>`))+H.note('Retirer un service coupe son accès à tes informations.'):H.empty('globe','Aucun service connecté','Les applications liées à ton compte apparaîtront ici.')});
CFG['set|Services de l’université']=()=>({t:'Services de l’université',h:H.note('Choisis les services qui peuvent utiliser ton profil My UJLoG.')+H.card([H.sw('igs','Scolarité','Afficher ton UFR et ton niveau',true,'','cap'),H.sw('igr','Restauration','Associer ta Restocarte',true,'','fork'),H.sw('igb','Bourses et aides','Partager ton statut de boursier',false,'','coin')])});
CFG['set|Comment gérer vos informations']=()=>({t:'Gérer tes informations',h:H.card([H.det('Quelles informations sont enregistrées ?','Ton compte (nom, UJ-ID, e-mail, téléphone, UFR), ton contenu et ton activité dans l’application.'),H.det('Comment les modifier ?','Menu, Compte, puis « Modifier mes informations ».'),H.det('Comment les télécharger ?','Centre de confidentialité, Tes données, puis « Demander mon archive ».'),H.det('Comment supprimer mon compte ?','Centre de confidentialité, Tes données : la suppression est programmée sous 30 jours et peut être annulée.')])+H.card([L('usr','Modifier mes informations','',K('Compte')),L('dl','Tes données','Archive et suppression',K('Tes données')),L('shd','Centre de confidentialité','',K('Centre de confidentialité'))])+fbBox()});
CFG['set|Ajouter un compte']=()=>({t:'Comptes',h:H.sec('Comptes sur cet appareil')+H.card(S.acc.map((a,i)=>`<button type="button" class="li" data-v21="acc:${i}" style="width:100%;text-align:left"><span class="ic" style="background:var(--mint);color:var(--g);border-radius:50%">${ic('usr',20)}</span><div class="fl"><b>${esc(a.n)}</b>${sub(esc(a.h)+(i==S.ac?' · compte actuel':''))}</div><span style="color:var(--g)">${i==S.ac?ic('chk',22):''}</span></button>`))+H.sec('Ajouter un compte')+`<div class="field"><label for="amat">UJ-ID</label><input id="amat" placeholder="Ex. : 21 UJLOG 0123" autocomplete="off" style="${FLD}"></div><div class="field"><label for="apw">Mot de passe</label><input id="apw" type="password" placeholder="••••••••" style="${FLD}"></div><button type="button" class="btn" data-v21="aadd">Se connecter</button>`});
CFG['set|Changer de compte']=CFG['set|Ajouter un compte'];CFG['set|Localisation']=CFG['set|Contacts et localisation'];CFG['pro|Consulter le statut de mon compte']=CFG['set|Statut du compte'];
['Espace Assistance','Statut du compte','Signaler un problème','À propos','Ajouter un compte'].forEach(k=>CFG['home|'+k]=CFG['set|'+k]);
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-v21]');if(!b)return;const[k,x]=b.dataset.v21.split(':');
 if(k=='rsend'){if(S.rm.trim().length<10)return say('Décris le problème en 10 caractères au moins');S.tk.unshift({id:'SG-'+(2001+S.tk.length),c:'Problème : '+RPC[S.rp],m:S.rm.trim(),d:'À l’instant'});S.rm='';S.dret=null;open('set|Demande envoyée',cur.origin)}
 else if(k=='upd')say('My UJLoG est à jour (version 1.0)');
 else if(k=='appdel'){const a=S.apps.splice(+x,1)[0];say(a+' retiré');render()}
 else if(k=='acc'){S.ac=+x;say('Compte actif : '+S.acc[S.ac].n);render()}
 else if(k=='aadd'){const m=($('#amat')||{value:''}).value.trim(),p=($('#apw')||{value:''}).value;if(m.length<4)return say('Saisis ton UJ-ID');if(p.length<4)return say('Saisis ton mot de passe');if(S.acc.length>=4)return say('4 comptes maximum');S.acc.push({n:'Étudiant '+m.slice(-4),h:'@'+m.toLowerCase().replace(/\s+/g,'')});S.ac=S.acc.length-1;say('Compte ajouté');render()}},true);
document.addEventListener('input',e=>{if(e.target.id=='rmsg')S.rm=e.target.value});

/* ===== v23 : statut du compte, à propos (logo, SIAMS), alias menu ===== */
CFG['set|Statut du compte']=()=>{const ok=S.ver>=4,W=Math.max(0,Math.min(3,+S.warn||0)),T=W==0?'ok':W<3?'w':'r',
HT=[['Ton compte est en règle','Aucune infraction détectée. Toutes les fonctions de My UJLoG sont disponibles.'],['Ton compte demande ton attention','Un avertissement est en cours. Relis les standards de la communauté pour éviter une limitation.'],['Certaines fonctions sont limitées','Tu as atteint 3 avertissements. Contacte l’assistance si tu penses qu’il y a une erreur.']][W==0?0:W<3?1:2],
seg=[0,1,2].map(i=>`<i class="${i<W?'on':''}"></i>`).join(''),
tile=(i,t,s,st)=>`<div class="sxt ${st}" role="img" aria-label="${t} : ${s}" title="${t} : ${s}"><span class="sxti">${ic(i,26)}</span></div>`,
step=(i,t,s,v)=>`<div class="sxs"><span class="sxd">${ic(i,15)}</span><div class="fl"><b>${t}</b>${s?`<small>${s}</small>`:''}</div>${v?`<span class="sxv">${v}</span>`:''}</div>`;
return{t:'Statut du compte',h:`<div class="card sxh ${T}"><span class="sxseal">${ic(T=='ok'?'chk':'shd',34)}</span><b>${HT[0]}</b><p>${HT[1]}</p><span class="sxpill">${ic('clk',13)}Vérifié aujourd’hui · contrôle automatique</span></div>`+
`<div class="card pad sxg"><div class="sxgh"><b>Avertissements</b><span class="mono">${W} sur 3</span></div><div class="sxbar ${T}" role="img" aria-label="${W} avertissement${W>1?'s':''} sur 3">${seg}</div><p class="mu">À 3 avertissements, certaines fonctions peuvent être limitées.</p><div class="sxm"><div><b class="mono">0</b><span>Contenus retirés</span></div><div><b class="mono">0</b><span>Signalements</span></div></div></div>`+
H.sec('Ce que tu peux faire')+`<div class="sxtl">${tile('cam','Publier et commenter','Disponible','ok')}${tile('plus','Messages directs','Disponible','ok')}${tile('star','À la une','Disponible','ok')}${tile('vbd','Badge certifié',ok?'Obtenu':S.ver+' sur 4 étapes',ok?'ok':'w')}</div>`+
(ok?'':`<button type="button" class="btn s" data-ac="open:Faire vérifier mon profil">Continuer la vérification</button>`)+
H.sec('Historique du compte')+`<div class="card pad sxtm">${step('usr','Compte créé','','[Date d’inscription]')}${step('chk','Dernier examen','Contrôle automatique','Aujourd’hui')}${step('shd','Sanctions','Aucune depuis la création','—')}</div>`+
H.sec('Bon à savoir')+H.card([H.det('Qu’est-ce qu’un avertissement ?','Un message envoyé quand un contenu enfreint les standards de la communauté. À 3 avertissements, certaines fonctions peuvent être limitées.'),H.det('Que se passe-t-il en cas d’infraction ?','Le contenu peut être retiré, une fonction limitée, puis le compte suspendu en cas de récidive. Tu es toujours prévenu.'),H.det('Comment contester une décision ?','Écris à l’assistance en rappelant le contenu concerné : l’équipe de modération réexamine sous 48 h.'),H.det('Comment garder un compte en règle ?','Respecte les autres, ne publie que des contenus dont tu as les droits et évite les interactions artificielles.')])+
H.card([L('cht','Contester une décision','Écris à l’assistance',K('Contacter l’assistance')),L('grp','Standards de la communauté','',K('Standards de la communauté')),L('shd','Sécurité du compte','Appareils et alertes',K('Sécurité et autorisations'))])}};
const LOGOX=()=>(document.querySelector('img.lg[src^="data:"]')||{}).src||'';
CFG['set|À propos']=()=>({t:'À propos',h:`<div class="card pad v21hero v24big"><img src="${LOGOX()}" alt="Logo My UJLoG" style="width:96px;height:96px;object-fit:contain;border-radius:24px"><b>My UJLoG</b><p class="mu">L’application de la communauté étudiante de l’Université Jean Lorougnon Guédé.</p><span class="v21st">Version 1.0.0</span></div>`+
H.stats([['5','UFR'],['939','Diplômés 2025-26'],['2026','Année 2026-27']])+
H.sec('Application')+H.card([H.row('book','Version','','1.0.0'),H.row('cld','Dernière mise à jour','','8 nov. 2026'),H.row('lap','Plateforme','','Application web mobile'),H.row('globe','Langues','','Français · English'),H.row('shd','Données','','Protégées')])+
`<button type="button" class="btn s" data-v21="upd">Rechercher une mise à jour</button>`+
H.card([L('star','Nouveautés','Version 1.0.0 et à venir',K('Nouveautés')),L('hrt','Licences et crédits','Propriété, polices, remerciements',K('Licences et crédits'))])+
H.sec('L’université')+H.card([H.row('bld','Établissement','Université Jean Lorougnon Guédé'),H.row('doc','Tutelle','Ministère de l’Enseignement supérieur et de la Recherche scientifique'),H.row('cap','Formation','5 unités de formation et de recherche'),H.row('pin','Adresse','BP 150 Daloa, Côte d’Ivoire'),H.row('globe','Site web','www.ujlog.edu.ci')])+
H.sec('Édition')+H.card([H.row('shd','Éditeur','','SIAMS'),H.row('home','Propriétaire','','UJLoG'),H.row('doc','Licence','','Usage universitaire')])+
H.sec('Ce que contient My UJLoG')+H.card([H.det('Vie du campus','Publications, stories, à la une, messages, notifications et profil vérifié.'),H.det('Mon campus','Emploi du temps, supports de cours, perdu/trouvé, résultats, scolarité et démarches.'),H.det('Mon espace','Carte d’étudiant numérique, informations du compte, vérification du profil, code QR et changement de compte.'),H.det('Services','Restocarte, logement, bourses, santé et bibliothèque.'),H.det('Profil','Photo, bio, identifiant UJ-ID et mise en avant de tes meilleurs moments.'),H.det('Confidentialité','Compte privé, audience, blocage, export et suppression de tes données.'),H.det('Aide','Centre d’aide, assistance, suivi des demandes et signalement.')])+
H.sec('Partager')+H.card([H.rowa('shr','Partager My UJLoG','Invite tes camarades','share','Partager'),H.rowa('star','Noter l’application','Dis-nous ce que tu en penses','say:Merci pour ta note !','Noter')])+
H.sec('Contact')+H.card([L('cht','Contacter l’assistance','Réponse sous 48 h',K('Contacter l’assistance')),L('ext','Site officiel de l’UJLoG','ujlog.edu.ci','url:https://ujlog.edu.ci'),L('flt','Signaler un problème','',K('Signaler un problème'))])+
H.sec('Informations légales')+H.card([L('doc','Conditions de service','',K('Conditions de service')),L('doc','Politique de confidentialité','',K('Politique de confidentialité')),L('cld','Politique d’utilisation des cookies','',K('Politique d’utilisation des cookies')),L('grp','Standards de la communauté','',K('Standards de la communauté')),L('hrt','Dédicace et remerciements','',K('Dédicace'))])+
`<p class="v24ft">© 2026 SIAMS · Université Jean Lorougnon Guédé. Tous droits réservés.</p>`});
CFG['set|Nouveautés']=()=>{const N=(i,t,s,n)=>`<div class="li v24nw"><span class="ic" style="background:var(--mint);color:var(--g);border-radius:14px;width:46px;height:46px">${ic(i,24)}</span><div class="fl"><b style="font-size:16px">${t}${n?'<span class="tag k" style="font-size:10px;padding:3px 7px;margin-left:6px;vertical-align:2px">Nouveau</span>':''}</b>${sub(s)}</div></div>`,C=a=>`<div class="card">${a.map(x=>N(...x)).join('')}</div>`;
return{t:'Nouveautés',h:`<div class="card pad v21hero v24big"><span class="v24ver">1.0</span><b>Nouveautés</b><p class="mu">Ce qui change dans My UJLoG, version après version.</p><span class="v21st">Version 1.0.0 · 8 nov. 2026</span></div>`+
H.sec('Dans cette version')+C([['qr','Code QR professionnel','Ton code QR avec le logo de l’UJLoG, à télécharger ou à partager.',1],['usr','Mon espace','Informations du compte, vérification, code QR, changement de compte et déconnexion au même endroit.',1],['vbd','Badge certifié plus net','Un sceau lisible : vide avant la vérification, plein une fois ton profil validé.',1],['gear','Menu simplifié','Trois blocs clairs : Paramètres, Confidentialité, Aide et assistance.',1],['star','À la une','Mets en avant tes meilleurs moments sous ta bio.'],['usr','Identifiant UJ-ID','Un identifiant unique : ton UFR, l’année et tes initiales, comme UJ-AGRO-26-ZDA.']])+
H.sec('Améliorations')+C([['cht','Aide','Centre d’aide avec recherche, assistance et suivi des demandes.'],['shr','Profil','Partage du profil et vérification par étapes.'],['shd','Confidentialité','Compte privé, audience, blocage, export et suppression des données.']])+
H.sec('Bientôt')+C([['cap','Résultats en ligne','Consulte tes notes dès leur publication.'],['grp','Ma classe','Ta promotion et ton UFR réunis.'],['hrt','Partenaires','Les soutiens de l’université, à portée de main.']])+
H.btn('Donner mon avis','say:Merci ! Ton avis a été envoyé à l’équipe','s')}};
CFG['set|Licences et crédits']=()=>({t:'Licences et crédits',h:`<div class="card pad v21hero v24big"><span class="v24ver">©</span><b>Licences et crédits</b><p class="mu">Qui possède quoi, et ce que My UJLoG utilise pour fonctionner.</p></div>`+
H.sec('Propriété')+H.card([H.det('Nom et logo','Le nom, le logo et l’identité visuelle de l’UJLoG appartiennent à l’Université Jean Lorougnon Guédé. Toute reproduction doit être autorisée.'),H.det('Armoiries et logos partenaires','Les armoiries de la République de Côte d’Ivoire, le logo du CROU-D et ceux des organismes cités appartiennent à leurs propriétaires.'),H.det('Contenus publiés','Chaque auteur reste propriétaire de ses publications et en garantit les droits. Voir les Standards de la communauté.')])+
H.sec('Conception')+H.card([H.row('shd','Éditeur','','SIAMS'),H.row('home','Propriétaire','','UJLoG'),H.row('doc','Licence','','Usage universitaire')])+
H.sec('Composants libres')+H.card([H.row('doc','Bricolage Grotesque','Polices des titres','OFL 1.1'),H.row('doc','Figtree','Police du texte','OFL 1.1'),H.row('grid','Icônes','Jeu d’icônes de l’application','Libre'),H.det('SIL Open Font License 1.1','Licence libre qui permet d’utiliser, copier et intégrer les polices dans une application, à condition de conserver la mention de licence.')])+
H.sec('Remerciements')+H.card([L('hrt','Dédicace et remerciements','',K('Dédicace'))])+
H.sec('Un droit d’auteur à signaler ?')+H.card([L('cht','Contacter l’assistance','Réponse sous 48 h',K('Contacter l’assistance'))])+
`<p class="v24ft">© 2026 SIAMS · Université Jean Lorougnon Guédé. Tous droits réservés.</p>`});
['Langue','Accessibilité','Économiseur de données','Compte privé','Comptes bloqués','Temps d’écran et bien-être','Statut du compte','À propos'].forEach(k=>CFG['home|'+k]=CFG['set|'+k]);CFG['pro|Consulter le statut de mon compte']=CFG['set|Statut du compte'];

/* ===== v112 · Marketplace : mode d’utilisation, fonctionnalités, à propos, confidentialité, conditions (source unique app + marketplace) ===== */
const MKD=[
 {t:'Mode d’utilisation',i:'book',s:'Découvrir, commander et suivre',b:[
  ['p','La Marketplace réunit les boutiques et la restauration du campus dans une seule vitrine. Tu l’ouvres depuis l’icône en haut de l’écran d’accueil.'],
  ['h','Commander en 5 étapes'],
  ['ol',['Parcours la vitrine, les boutiques ou les catégories, ou tape un mot dans la recherche.','Ouvre une fiche article, choisis la quantité puis ajoute-la au panier.','Ouvre le panier : les articles sont regroupés par boutique, avec un sous-total pour chacune.','Touche « Commander » : tes informations d’étudiant sont déjà remplies, tu choisis la livraison et le moyen de paiement proposé par la boutique.','Suis ta commande depuis « Mes commandes » et les notifications.']],
  ['h','Bon à savoir'],
  ['ul',['Chaque boutique encaisse sa propre commande : si ton panier contient plusieurs boutiques, les commandes s’enchaînent une par une.','Tu n’as pas de compte à créer : la Marketplace utilise ton profil My UJLoG.','Le mode clair ou sombre suit automatiquement celui de l’application.']]]},
 {t:'Fonctionnalités',i:'grid',s:'Tout ce que la Marketplace permet',b:[
  ['h','Découvrir'],
  ['ul',['Vitrine d’accueil avec boutiques à découvrir, offres du moment et nouveautés.','Recherche, catégories et articles vus récemment.','Boutiques en ligne et restauration (plats disponibles aujourd’hui).','Pages boutique avec logo, description et badge de boutique vérifiée.']],
  ['h','Acheter'],
  ['ul',['Fiche article avec photos, prix, ancien prix et stock limité.','Favoris et articles similaires.','Panier unique regroupé par boutique, avec total général.','Paiement proposé par chaque boutique : Wave, Orange Money ou paiement à la livraison.','Reçu ou justificatif demandé après chaque paiement mobile.']],
  ['h','Suivre'],
  ['ul',['Historique et suivi de tes commandes, avec bannière de commande en cours.','Notifications et messages des boutiques.']],
  ['h','Partager et vendre'],
  ['ul',['Partage d’un article ou d’une boutique avec tes camarades.','Bouton « Partenaire » : choisis un abonnement (Standard ou Pro), puis ouvre ta boutique My UJLoG, sans commission sur tes ventes.']],
  ['h','Confort'],
  ['ul',['Thème clair ou sombre synchronisé avec l’application.','Profil étudiant transmis automatiquement : pas de nouveau compte.']]]},
 {t:'À propos de la Marketplace',i:'home',s:'Qui l’édite et à quoi elle sert',b:[
  ['p','La Marketplace est le centre commercial du campus de l’Université Jean Lorougnon Guédé : une vitrine unique pour trouver ce que vendent les étudiants et les boutiques partenaires, et se le faire livrer.'],
  ['ul',['Éditeur : SIAMS, en partenariat avec l’UJLoG.','Technologie : boutiques et commandes Boutique My UJLoG, intégrées dans My UJLoG.','Version : 1.1 · mise à jour du 11 novembre 2026.']],
  ['p','Les boutiques sont indépendantes : chacune fixe ses prix, ses stocks, ses délais et ses moyens de paiement.']]},
 {t:'Confidentialité Marketplace',i:'shd',s:'Les données utilisées pour commander',b:[
  ['p','Pour te livrer, la Marketplace transmet à la boutique concernée uniquement ce qui est utile à ta commande.'],
  ['h','Données partagées'],
  ['ul',['Ton nom, ton numéro de téléphone et ton e-mail, issus de ton profil My UJLoG.','Le lieu de livraison et, si tu l’autorises, ta position pour guider le livreur.','Le contenu de ta commande et le justificatif de paiement.']],
  ['h','Ce que nous ne faisons pas'],
  ['ul',['Aucune revente de tes données.','Aucun suivi publicitaire entre applications.','Tes mots de passe et codes de paiement ne sont jamais demandés.']],
  ['h','Tes choix'],
  ['p','Tu peux refuser la géolocalisation, vider ton panier à tout moment et demander l’export ou la suppression de tes données depuis le Centre de confidentialité.'],
  ['ln','Ouvrir le Centre de confidentialité','set|Centre de confidentialité']]},
 {t:'Conditions et politique d’achat',i:'doc',s:'Commandes, paiements, livraisons, retours',b:[
  ['p','En commandant sur la Marketplace, tu acceptes ces règles en plus des conditions d’utilisation de My UJLoG.'],
  ['h','Commandes et paiements'],
  ['ul',['Le prix affiché est celui de la boutique, en francs CFA.','La commande est confirmée quand la boutique l’accepte.','Le paiement se fait selon les moyens proposés par la boutique ; garde ton justificatif.']],
  ['h','Livraison, retours et litiges'],
  ['ul',['Les délais et frais de livraison sont indiqués par la boutique avant la validation.','Retours et remboursements : ils dépendent de la politique de la boutique, à demander avant d’acheter.','En cas de problème, contacte d’abord la boutique, puis l’assistance My UJLoG.']],
  ['h','Règles pour les vendeurs'],
  ['ul',['Vendre uniquement des articles légaux et décrits honnêtement.','Respecter les standards de la communauté et les droits d’auteur.','Une boutique qui enfreint ces règles peut être suspendue.']],
  ['ln','Lire les conditions et politiques','set|Conditions et politiques']]}
];
window.UJMKDOC={lead:['La Marketplace My UJLoG','Tout le campus dans une seule vitrine : boutiques étudiantes, restauration, livraison et suivi.'],list:MKD};
const MKG=mkGuide('mkp','Marketplace',window.UJMKDOC.lead,[['6','moyens de paiement'],['1','panier unique'],['24/7','vitrine ouverte']],MKD);
CFG['set|Marketplace']=MKG;CFG['home|Marketplace']=MKG;
const MKR=x=>L(x.i,x.t,x.s,'dart:mkp|'+x.t);
const MKADD=(k,pick)=>{const f=CFG['set|'+k];if(!f)return;const w=()=>{const r=f();r.h=r.h.replace('<p class="v24ft">',H.sec('Marketplace')+H.card(MKD.filter((x,i)=>pick.includes(i)).map(MKR))+'<p class="v24ft">');if(!r.h.includes('Marketplace</'))r.h+=H.sec('Marketplace')+H.card(MKD.filter((x,i)=>pick.includes(i)).map(MKR));return r};CFG['set|'+k]=w;CFG['home|'+k]=w};
MKADD('À propos',[0,1,2,3,4]);MKADD('Conditions et politiques',[3,4]);MKADD('Comment ça marche',[0,1]);

renderSol();
})();
