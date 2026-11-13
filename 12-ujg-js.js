
(function(){
const R=document.createElement("div");R.className="stage";R.id="ujg";R.setAttribute("role","dialog");R.setAttribute("aria-modal","true");R.setAttribute("aria-labelledby","stT");
R.innerHTML='<div class="sbar"><button id="sBack" aria-label="Retour"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button><div class="stt"><small id="stS"></small><b id="stT"></b></div></div><div class="sbody" id="stBody"></div><canvas id="conf"></canvas>';
document.body.appendChild(R);
const $=id=>R.querySelector("#"+id),G=[],reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
function draw(g){
  const m=g[2];
  if(g[1]==="G") return Math.min(m,Math.max(5,Math.round(m*(.5+Math.random()*.5)/5)*5));
  const r=Math.random(),top=m>=200?.01:.05;
  if(r<.35) return 2;
  if(r<.8) return Math.max(2,Math.round(m*.2));
  if(r<1-top) return Math.round(m*.5);
  return m;
}
const GAME={3:"wheel",15:"wheel",4:"scratch",5:"box",30:"box",7:"coin",10:"box3",29:"box3",14:"wheel",21:"quiz",16:"quiz"},GM={};
let stopCam=()=>{};
const rnd=n=>Math.floor(Math.random()*n);
function openStage(d){$("stT").textContent=d?G[d-1][0]:"Chasse au trésor";$("stS").textContent=d?"Cadeau du jour · Jour "+d+" sur 30":"Événement spécial";$("stBody").innerHTML="";R.classList.add("on");}
function closeStage(){stopCam();stopCam=()=>{};R.classList.remove("on");}
function confetti(){
  const c=$("conf"),x=c.getContext("2d");c.width=innerWidth;c.height=innerHeight;if(reduce)return;
  const K=["#FFC83D","#fff","#7DB8FF","#4ADE80","#F87171"],P=Array.from({length:100},()=>({x:innerWidth/2,y:innerHeight*.45,vx:(Math.random()-.5)*13,vy:-Math.random()*14-3,r:Math.random()*6+3,c:K[rnd(5)]}));
  let f=0;(function s(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;x.fillStyle=p.c;x.fillRect(p.x,p.y,p.r,p.r*.6);});if(++f<120)requestAnimationFrame(s);else x.clearRect(0,0,c.width,c.height);})();
}
let cb=null;
function play(d,a,fn){G[d-1]=[a[0],a[2],a[3],a[1]];cb=fn;openStage(d);GM[GAME[d]||"box"](d,draw(G[d-1]),$("stBody"));}
function countUp(amt,ms){const el=$("cnt"),t0=performance.now(),dur=reduce?0:ms;(function step(t){const p=dur?Math.min(1,(t-t0)/dur):1;el.textContent="+"+Math.round(amt*(1-Math.pow(1-p,3))).toLocaleString("fr-FR");if(p<1)requestAnimationFrame(step);})(t0);}
const fmtN=n=>Number(n||0).toLocaleString("fr-FR");
function result(o){
  $("stBody").innerHTML='<div class="res2'+(o.lost?' lost':'')+'"><div class="rb"><span class="cn">M</span></div><small>'+o.small+'</small><h2>'+o.title+'</h2><div class="ramt"><b id="cnt">+0</b><em>MONLoG</em></div><p>'+o.note+'</p><div class="rbal"><span>Nouveau solde</span><b>'+fmtN(o.bal)+' MONLoG</b></div><button class="go" id="fin">Terminer</button></div>';
  $("fin").onclick=closeStage;$("fin").focus();countUp(o.amt,o.ms);if(o.conf)confetti();
}
function claim(d,gain){
  stopCam();const r=cb?cb(gain):{amt:gain,bal:0,extra:""},lost=G[d-1][1]==="C"&&gain===2,none=!r.amt;
  result(none?{small:"Plafond du mois",title:"Plafond atteint",amt:0,bal:r.bal,note:"Tu as atteint le plafond mensuel des cadeaux. Reviens le mois prochain."+(r.extra||""),lost:true,ms:0,conf:false}:
  {small:lost?"Pas de gros lot":"Félicitations",title:lost?"Une petite consolation":"Bravo !",amt:r.amt,bal:r.bal,note:(lost?"2 MONLoG de consolation ajoutés à ton solde.":"Ajoutés à ton solde.")+(r.extra||""),lost:lost,ms:900,conf:r.amt>2});
}

const gift=()=>'<svg class="gb" viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="gbR" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF6B5E"/><stop offset="1" stop-color="#D62B2B"/></linearGradient><linearGradient id="gbL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF8A7A"/><stop offset="1" stop-color="#EF4444"/></linearGradient><linearGradient id="gbY" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFD76A"/><stop offset=".5" stop-color="#FFE9A3"/><stop offset="1" stop-color="#F5B921"/></linearGradient></defs><g><rect x="20" y="52" width="80" height="58" rx="8" fill="url(#gbR)"/><rect x="54" y="52" width="12" height="58" fill="url(#gbY)"/><rect x="20" y="97" width="80" height="13" rx="6.5" fill="#000" fill-opacity=".14"/></g><g class="lid"><rect x="13" y="36" width="94" height="22" rx="8" fill="url(#gbL)"/><rect x="54" y="36" width="12" height="22" fill="url(#gbY)"/><path d="M60 36C40 2 10 14 36 34Z" fill="url(#gbY)"/><path d="M60 36C80 2 110 14 84 34Z" fill="url(#gbY)"/><path d="M60 36C48 14 30 16 40 30Z" fill="#E0A800" fill-opacity=".35"/><circle cx="60" cy="35" r="7" fill="#F5B921"/><circle cx="58" cy="33" r="2.4" fill="#FFF1B8"/></g></svg>';
GM.box=(d,gain,b)=>{
  const T=d===30?5:d===5?3:2;let t=T;
  b.innerHTML='<div class="gscene"><div class="rays" id="ry"></div><div class="glow"></div><button class="gbw big" id="bb" aria-label="Boîte mystère">'+gift()+'</button><div class="gsh"></div></div><div class="dots" id="dt">'+'<i></i>'.repeat(T)+'</div><p class="hint" id="bt" role="status"></p>';
  const bb=$("bb"),ds=[...b.querySelectorAll("#dt i")],msg=()=>{ds.forEach((x,i)=>x.classList.toggle("on",i<T-t));$("bt").textContent=t>1?"Touche la boîte "+t+" fois pour l’ouvrir":"Encore une fois !";};msg();
  bb.onclick=()=>{if(--t>0){bb.classList.remove("shk");void bb.offsetWidth;bb.classList.add("shk");msg();}else{ds.forEach(x=>x.classList.add("on"));bb.disabled=true;bb.classList.add("open");$("ry").classList.add("on");$("bt").textContent="";setTimeout(()=>claim(d,gain),1300);}};
};
GM.box3=(d,gain,b)=>{
  const m=G[d-1][2],oth=[2,Math.max(3,Math.round(m*.2)),Math.round(m*.5)];
  b.innerHTML='<div class="tri">'+[0,1,2].map(i=>'<button class="gbw" data-i="'+i+'" aria-label="Coffre '+(i+1)+'"><em></em>'+gift()+'</button>').join("")+'</div><p>Choisis un coffre.</p>';
  const bs=[...b.querySelectorAll(".tri button")];
  bs.forEach(btn=>btn.onclick=()=>{const c=+btn.dataset.i;bs.forEach((x,i)=>{x.disabled=true;x.classList.add("open");if(i===c)x.classList.add("pick");x.querySelector("em").textContent="+"+(i===c?gain:oth[rnd(3)]);});setTimeout(()=>claim(d,gain),1800);});
};
GM.wheel=(d,gain,b)=>{
  const m=G[d-1][2],seg=[2,Math.max(3,Math.round(m*.2)),2,Math.round(m*.5),2,Math.max(3,Math.round(m*.2)),2,m];
  if(!seg.includes(gain))seg[1]=gain;
  const pt=(a,r)=>{a=a*Math.PI/180;return[(160+r*Math.sin(a)).toFixed(1),(160-r*Math.cos(a)).toFixed(1)];};
  let s='<svg viewBox="0 0 320 320">';
  seg.forEach((v,i)=>{const a=i*45,p0=pt(a,146),p1=pt(a+45,146);s+='<path d="M160 160L'+p0.join(" ")+'A146 146 0 0 1 '+p1.join(" ")+'Z" fill="'+(i%2?"#FFC83D":"#1D4ED8")+'"/><text transform="rotate('+(a+22.5)+' 160 160)" x="160" y="64" text-anchor="middle" font-size="26" font-weight="800" fill="'+(i%2?"#0B1630":"#fff")+'">'+v+'</text>';});
  s+='<circle cx="160" cy="160" r="150" fill="none" stroke="#fff" stroke-width="10"/>';
  for(let i=0;i<16;i++){const q=pt(i*22.5,150);s+='<circle class="lt" cx="'+q[0]+'" cy="'+q[1]+'" r="4.5" fill="#FFC83D"/>';}
  s+='<circle cx="160" cy="160" r="28" fill="#fff" stroke="#0B1630" stroke-width="4"/><text x="160" y="170" text-anchor="middle" font-size="28" font-weight="800" fill="#1D4ED8">M</text></svg>';
  b.innerHTML='<div class="wwrap"><svg class="pt" viewBox="0 0 40 40"><path d="M20 38L6 6h28z" fill="#E53935" stroke="#fff" stroke-width="3"/></svg><div class="wheel" id="wh">'+s+'</div></div><button class="go" id="sp">Tourner la roue</button>';
  $("sp").onclick=()=>{
    $("sp").disabled=true;
    const ix=seg.map((v,i)=>v===gain?i:-1).filter(i=>i>=0),i=ix[rnd(ix.length)],R=360*6-(i*45+22.5)+(Math.random()*20-10),w=$("wh");
    w.style.transition=reduce?"none":"transform 5s cubic-bezier(.1,.7,.1,1)";w.style.transform="rotate("+R+"deg)";
    setTimeout(()=>claim(d,gain),reduce?200:5500);
  };
};
GM.scratch=(d,gain,b)=>{
  const pool=[5,10,15,20,30,50],r=()=>pool[rnd(6)];let v=gain>2?[gain,gain,gain]:[r(),r(),r()];
  if(gain<=2)while(v[0]===v[1]&&v[1]===v[2])v[2]=r();
  b.innerHTML='<div class="tk"><b>Carte à gratter</b><span>Trouve 3 montants identiques</span><div class="tg">'+v.map(n=>'<div class="sp"><em>'+n+'</em><canvas width="96" height="96"></canvas></div>').join("")+'</div></div><p>Gratte les 3 cases avec ton doigt.</p>';
  let left=3;
  b.querySelectorAll("canvas").forEach(cv=>{
    const x=cv.getContext("2d"),g=x.createLinearGradient(0,0,96,96);
    g.addColorStop(0,"#E3E9F5");g.addColorStop(.5,"#9AA6BF");g.addColorStop(1,"#D5DCEB");x.fillStyle=g;x.fillRect(0,0,96,96);
    x.strokeStyle="rgba(255,255,255,.45)";x.lineWidth=4;for(let i=-96;i<192;i+=14){x.beginPath();x.moveTo(i,96);x.lineTo(i+96,0);x.stroke();}
    x.fillStyle="#fff";x.font="800 34px Inter,system-ui";x.textAlign="center";x.fillText("?",48,60);
    x.globalCompositeOperation="destination-out";
    let dn=false,n=0,ok=false;
    const chk=()=>{const a=x.getImageData(0,0,96,96).data;let c=0;for(let i=3;i<a.length;i+=16)if(a[i]===0)c++;if(c/(a.length/16)>.45&&!ok){ok=true;cv.style.opacity=0;if(--left===0)setTimeout(()=>claim(d,gain),900);}};
    const sc=e=>{if(!dn||ok)return;const q=cv.getBoundingClientRect();x.beginPath();x.arc((e.clientX-q.left)*96/q.width,(e.clientY-q.top)*96/q.height,13,0,7);x.fill();if(++n%4===0)chk();};
    cv.onpointerdown=e=>{dn=true;cv.setPointerCapture(e.pointerId);sc(e);};cv.onpointermove=sc;cv.onpointerup=()=>{dn=false;};
  });
};
GM.coin=(d,gain,b)=>{
  b.innerHTML='<div class="coin3d" id="cn">M</div><div class="two"><button class="go alt" data-s="Pile">Pile</button><button class="go alt" data-s="Face">Face</button></div>';
  b.querySelectorAll(".two button").forEach(btn=>btn.onclick=()=>{
    b.querySelectorAll("button").forEach(x=>{x.disabled=true;});
    const pick=btn.dataset.s,res=gain>2?pick:(pick==="Pile"?"Face":"Pile"),c=$("cn");
    c.style.transition=reduce?"none":"transform 1.4s ease-out";c.style.transform="rotateY(1080deg)";
    setTimeout(()=>{c.textContent=res;},reduce?0:1400);
    setTimeout(()=>claim(d,gain),reduce?200:2300);
  });
};
const Q=[["Dans quelle ville se trouve ton université ?",["Daloa","Bouaké","Korhogo","Man"],0],["Quelle est la capitale politique de la Côte d’Ivoire ?",["Abidjan","Yamoussoukro","San-Pédro","Daloa"],1],["Quelle monnaie utilise-t-on en Côte d’Ivoire ?",["Le dollar","Le franc CFA","Le naira","Le cedi"],1],["Quelle est la devise de la Côte d’Ivoire ?",["Union, Discipline, Travail","Unité, Progrès, Paix","Paix, Travail, Patrie","Liberté, Égalité, Fraternité"],0]];
GM.quiz=(d,gain,b)=>{
  const q=Q[rnd(Q.length)],m=G[d-1][2];
  b.innerHTML='<div class="qq">?</div><h3>'+q[0]+'</h3><div class="opt">'+q[1].map((o,i)=>'<button class="go alt" data-i="'+i+'">'+o+'</button>').join("")+'</div>';
  const bs=[...b.querySelectorAll(".opt button")];
  bs.forEach(x=>x.onclick=()=>{const i=+x.dataset.i;bs.forEach((y,k)=>{y.disabled=true;if(k===q[2])y.classList.add("ok");else if(k===i)y.classList.add("ko");});setTimeout(()=>claim(d,i===q[2]?m:2),1300);});
};
const HUNT=["UJLOG-TRESOR-01","UJLOG-TRESOR-02"],SEED="UJLOG-TRESOR-00",PRIZE=10000,QRK="ujlog_qr_used";
const usedQR=()=>{try{return JSON.parse(localStorage.getItem(QRK)||"[]").concat(SEED);}catch(e){return[SEED];}};
let huntCb=null;function startHunt(cb){huntCb=cb;openStage(0);GM.qr(0,0,$("stBody"));}
function winHunt(){
  stopCam();const r=huntCb?huntCb(PRIZE):{bal:0};
  result({small:"Chasse au trésor",title:"Tu as trouvé le trésor !",amt:PRIZE,bal:r.bal,note:"Ajoutés à ton solde. Ce QR code est maintenant épuisé : personne d’autre ne peut le scanner.",ms:1400,conf:true});
}
GM.qr=(d,gain,b)=>{
  const QRI='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9V5a2 2 0 0 1 2-2h4M15 3h4a2 2 0 0 1 2 2v4M21 15v4a2 2 0 0 1-2 2h-4M9 21H5a2 2 0 0 1-2-2v-4"/><path d="M8 8h3v3H8zM13 8h3v3h-3zM8 13h3v3H8zM14 14h2v2h-2z"/></svg>';
  b.innerHTML='<div class="qrh"><div class="qrb2" id="qb"><video id="qv" playsinline muted></video><div class="qph">'+QRI+'<span>Caméra éteinte</span></div><i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i><u></u></div><div class="chips"><span><b>10 000</b>MONLoG</span><span><b>2</b>par mois</span><span><b>1 fois</b>par QR code</span></div><p class="st" id="qm" role="status">Trouve un QR code caché sur le campus et scanne-le.</p><button class="go" id="qc">'+QRI+'Activer la caméra</button><div class="or"><span>ou saisis le code</span></div><div class="qin"><input id="qi" placeholder="Code du QR" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="Code du QR"><button class="go" id="qk">Valider</button></div></div>';
  let on=true;const msg=(m,k)=>{const e=$("qm");e.textContent=m;e.className="st"+(k?" "+k:"");};
  const send=c=>{
    c=(c||"").trim().toUpperCase();
    if(!c)return msg("Saisis un code ou scanne un QR code.","err");
    if(!HUNT.concat(SEED).includes(c))return msg("Ce code n’est pas un QR de la chasse au trésor UJLoG.","err");
    if(usedQR().includes(c))return msg("Ce QR code a déjà été scanné par un autre étudiant. Cherches-en un autre.","err");
    try{localStorage.setItem(QRK,JSON.stringify(usedQR().concat(c)));}catch(e){}
    on=false;winHunt();
  };
  stopCam=()=>{on=false;const v=$("qv"),s=v&&v.srcObject;if(s)s.getTracks().forEach(t=>t.stop());const q=$("qb");if(q)q.classList.remove("live");};
  $("qc").onclick=async()=>{
    if(!("BarcodeDetector" in window)||!navigator.mediaDevices)return msg("Ton navigateur ne lit pas les QR codes ici. Saisis le code à la main.","err");
    try{
      const st=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}),v=$("qv"),det=new BarcodeDetector({formats:["qr_code"]});
      on=true;v.srcObject=st;await v.play();$("qb").classList.add("live");msg("Vise le QR code.");
      (async function loop(){if(!on)return;try{const r=await det.detect(v);if(r.length)send(r[0].rawValue);}catch(e){}if(on)setTimeout(loop,400);})();
    }catch(e){msg("Caméra non autorisée. Saisis le code à la main.","err");}
  };
  $("qk").onclick=()=>send($("qi").value);
  $("qi").onkeydown=e=>{if(e.key==="Enter")send($("qi").value);};
  
  
};
$("sBack").onclick=closeStage;
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&R.classList.contains("on"))closeStage();});
window.UJGAMES={play,hunt:startHunt};
let remShown=false;
function tick(){
  const mb=document.getElementById("mb"),st=window.UJGIFT&&UJGIFT.state&&UJGIFT.state();
  if(remShown||!mb||!st||st.open)return;
  remShown=true;
  const r=document.createElement("div");r.id="ujr";r.setAttribute("role","status");
  r.innerHTML='<p><b>Ton cadeau du jour t’attend</b><span>'+st.name+'</span></p><button class="o">Ouvrir</button><button class="l">Plus tard</button>';
  document.body.appendChild(r);setTimeout(()=>r.classList.add("on"),50);
  const off=()=>{r.classList.remove("on");setTimeout(()=>r.remove(),400);};
  r.querySelector(".l").onclick=off;
  r.querySelector(".o").onclick=()=>{off();const h=document.querySelector(".v29ln[data-og]");if(h)h.click();let n=0;const iv=setInterval(()=>{const b=document.querySelector('[data-ac="gopen"]');if(b&&b.offsetParent){clearInterval(iv);b.click();}else if(++n>25)clearInterval(iv);},200);};
}
setInterval(tick,1500);
})();
