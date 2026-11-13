loadApp();
let _s=0;try{_s=localStorage.getItem('ujlog_sess')=='1'}catch(_){}
if(_s&&AC&&AC.pre&&AC.nom){Object.assign(S,AC);S.pw=null;S.o='';hist=[];app()}else R();
