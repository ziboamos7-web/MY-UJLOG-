
/* ===== CONFIGURATION À REMPLIR =====
 * 1) Supabase : Project Settings > API > renseigner window.UJ_DB={url:'…',key:'clé anon/publishable'} (une seule fois : page + appli + console boutique).
 *    Puis exécuter ujlog_supabase.sql (SQL Editor) pour créer la table des profils.
 * 2) Supabase > Authentication > Providers : activer Google et Facebook (gratuits).
 * 3) Fournisseur personnalisé plus tard (ex. TikTok) : window.UJ_PROV={Siams:'custom:siams',TikTok:'custom:tiktok'} */
window.UJ_DB=window.UJ_DB||window.UJ_SUPABASE||{url:'https://upkabxtzgzbjpageeiia.supabase.co',key:'sb_publishable_-bkL4MSypS7MmsAEyIkP7g_Cq7cauKT'};window.UJ_SUPABASE=window.UJ_DB; /* même objet : l'appli My UJLoG lit window.parent.UJ_DB */
window.UJ_PROV=window.UJ_PROV||{};
