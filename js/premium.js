(()=>{
const init=()=>{
const C=window.CFG||{},
  $=(s,r=document)=>r.querySelector(s),
  $$=(s,r=document)=>[...r.querySelectorAll(s)],
  reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* Thème clair / sombre  */
(()=>{
const r=document.documentElement;
try{r.dataset.theme=localStorage.getItem('theme')||'dark'}catch(e){r.dataset.theme='dark'}
const icons=t=>document.querySelectorAll('.theme-toggle').forEach(x=>{x.textContent=t==='light'?'🌙':'☀️'});
document.addEventListener('click',e=>{
  if(!e.target.closest('.theme-toggle'))return;
  const t=r.dataset.theme==='light'?'dark':'light';
  r.dataset.theme=t;
  try{localStorage.setItem('theme',t)}catch(err){}
  icons(t);
});
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',()=>icons(r.dataset.theme)):icons(r.dataset.theme);
})();

/* Barre de progression en haut de page */
const bar=$('.progress');
if(bar){const sc=()=>{const h=document.documentElement;bar.style.transform=`scaleX(${h.scrollTop/(h.scrollHeight-h.clientHeight||1)})`};addEventListener('scroll',sc,{passive:true});sc()}

/* Compteurs animés (data-count, et data-suffix pour le « + ») */
const count=el=>{const t=+el.dataset.count,x=el.dataset.suffix||'';if(reduce){el.textContent=t+x;return}const s=performance.now();(function f(n){const k=Math.min((n-s)/1400,1);el.textContent=Math.round(t*(1-Math.pow(1-k,3)))+(k<1?'':x);if(k<1)requestAnimationFrame(f)})(s)};

/* Jauges de compétences (niveaux dans config.js) */
const L=C.levels||{};
$$('.tech-card').forEach(c=>{const v=L[$('h3',c).textContent]||60;c.insertAdjacentHTML('beforeend',`<div class="level"><div class="meter"><i style="--v:${v}"></i></div><b><span data-count="${v}">0</span>%</b></div>`)});

/* Projets : capture cliquable + bouton GitHub (projets « dev » uniquement) */
let d=0;
$$('.project-card').forEach((c,i)=>{const n=i+1,r=(C.devRepos||[])[d];
  c.insertAdjacentHTML('afterbegin',`<button class="shot" aria-label="Agrandir la capture du projet ${n}"><img src="assets/img/projets/projet-${n}.png" alt="Capture d'écran du projet ${n}" loading="lazy" onerror="this.onerror=null;this.src='assets/img/projet-placeholder.svg'"></button>`);
  if(c.classList.contains('dev')){d++;c.insertAdjacentHTML('beforeend',`<a class="btn btn-secondary btn-sm" href="${r?(r.startsWith('http')?r:C.github+'/'+r):C.github}" target="_blank" rel="noopener">Voir sur GitHub</a>`)}
});

/* Apparition des sections et départ des compteurs */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');$$('[data-count]',e.target).forEach(count);io.unobserve(e.target)}}),{threshold:.15});
$$('.section,.counters').forEach(s=>io.observe(s));

/* Agrandissement des captures */
const lb=document.body.appendChild(Object.assign(document.createElement('div'),{className:'lightbox'}));lb.innerHTML='<img alt="">';
document.addEventListener('click',e=>{const s=e.target.closest('.shot');if(s){$('img',lb).src=$('img',s).src;lb.classList.add('open')}else lb.classList.remove('open')});
addEventListener('keydown',e=>e.key==='Escape'&&lb.classList.remove('open'));

/* Liens de contact (valeurs de config.js) : e-mail, LinkedIn, GitHub dans cet ordre */
const ca=$$('.contact-links a');
if(ca.length>2){
  if(C.email){ca[0].href='mailto:'+C.email;ca[0].textContent='✉️ '+C.email}
  if(C.linkedin)ca[1].href=C.linkedin;
  if(C.github)ca[2].href=C.github;
}

/* Labs animés : un même code pour tous (clic sur une machine = son rôle, boutons = filtre des flux) */
const initLab=(sel,D,attr='state',infoSel='.lab-info')=>{
  const lab=$(sel),info=lab&&$(infoSel,lab);if(!lab||!info)return;
  $$('.node',lab).forEach(n=>{
    const go=()=>{const t=D[n.dataset.k];if(!t)return;$$('.node',lab).forEach(x=>x.classList.toggle('on',x===n));info.innerHTML=`<strong>${t[0]}</strong>${t[1]}`};
    n.addEventListener('click',go);
    n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}});
  });
  let btns=$$(`button[data-${attr}]`,lab);
  if(!btns.length)btns=$$(`button[data-${attr}]`,lab.parentElement); /* boutons placés juste au-dessus du schéma */
  btns.forEach(b=>b.addEventListener('click',()=>{lab.dataset[attr]=b.dataset[attr];btns.forEach(x=>x.setAttribute('aria-pressed',x===b))}));
};

/* « Mon laboratoire Ansible et logs » */
initLab('.lab',{
  master:["Nœud maître Ansible","Lance les playbooks YAML et pilote les machines par SSH."],
  managed:["Nœud administré","Reçoit la configuration d'Ansible. Auditd enregistre les événements système et Rsyslog les envoie."],
  logs:["Serveur de logs","Centralise les journaux envoyés par Rsyslog pour les consulter au même endroit."]
},'flow','#lab-info');

/* Projet 01 */
initLab('.lab-mini',{
  logs:["Serveur de logs","Centralise les journaux envoyés par la ferme de serveurs et par le serveur NOC."],
  noc:["Serveur NOC (Ansible)","Pilote la ferme de serveurs avec des playbooks et envoie lui aussi ses journaux au serveur de logs."],
  farm:["Ferme de serveurs","Les serveurs à gérer : ils reçoivent l'automatisation et envoient leurs journaux au serveur de logs."]
});

/* Projet 02 */
initLab('.lab-voip',{
  ast:["Serveur Asterisk","Le serveur VoIP (PBX) : il gère les comptes et met en relation les softphones."],
  sec:["Accès sécurisé","Contrôle qui peut se connecter au serveur : comptes authentifiés et filtrage des connexions."],
  sa:["Softphone A","Application de téléphonie installée sur le poste de l'utilisateur 1."],
  sb:["Softphone B","Application de téléphonie installée sur le poste de l'utilisateur 2."]
});

/* Projet 03 */
initLab('.lab-ad',{
  srv:["Windows Server","Le contrôleur de domaine : il héberge les services du domaine dans une machine virtuelle."],
  net:["DHCP · DNS","Le DHCP donne automatiquement une adresse IP aux postes. Le DNS leur permet de trouver le serveur et les ressources du domaine par leur nom."],
  dom:["Active Directory · GPO","L'annuaire contient les utilisateurs et les groupes et vérifie leur connexion. Les GPO appliquent des règles de configuration aux postes et aux comptes."],
  cl:["Poste client","Machine Windows rattachée au domaine : elle reçoit son adresse IP, ouvre la session avec un compte du domaine et applique les GPO."]
});

/* Projet 04 */
initLab('.lab-lamp',{
  cl:["Poste client","Il interroge d'abord le DNS pour trouver l'adresse du site, puis envoie sa requête HTTP au serveur web."],
  pri:["Serveur DNS primaire","Il détient la zone d'origine : c'est là que sont déclarés les noms et leurs adresses."],
  sec:["Serveur DNS secondaire","Il reçoit une copie de la zone depuis le primaire et prend le relais si celui-ci est indisponible."],
  apa:["Apache","Le serveur web : il reçoit les requêtes HTTP et renvoie les pages."],
  php:["PHP","Il exécute le code des pages dynamiques pour le compte d'Apache."],
  mar:["MariaDB","La base de données : PHP y lit et y enregistre les données du site."]
});

/* Projet 05 */
initLab('.lab-dual',{
  adm:["Poste d'administration","Le poste depuis lequel on crée les utilisateurs, on organise les unités d'organisation (OU) et on définit les GPO."],
  win:["Windows Server (AD DS)","Le contrôleur du domaine Windows : il héberge l'annuaire Active Directory avec les utilisateurs, les OU et les GPO."],
  smb:["Samba AD DC","Le contrôleur du domaine Linux : Samba fournit un annuaire compatible Active Directory, interrogeable en LDAP."],
  cl:["Client Windows 10","Un poste Windows 10 membre du domaine : l'utilisateur ouvre sa session avec son compte et le poste applique les GPO."]
});

/* Projet 06 */
initLab('.lab-pfs',{
  cl:["Poste utilisateur","Dès qu'il ouvre une page web, l'utilisateur est redirigé vers la page de connexion du portail captif."],
  pfs:["pfSense","Le pare-feu du réseau : son portail captif bloque l'accès à Internet tant que l'utilisateur ne s'est pas authentifié."],
  net:["Internet","Accessible uniquement après une authentification réussie sur le portail."]
});
};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
