(()=>{const C=window.CFG||{},$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const bar=$('.progress'),sc=()=>{const h=document.documentElement;bar.style.transform=`scaleX(${h.scrollTop/(h.scrollHeight-h.clientHeight||1)})`};addEventListener('scroll',sc,{passive:true});sc();
const count=el=>{const t=+el.dataset.count;const x=el.dataset.suffix||'';if(reduce){el.textContent=t+x;return}const s=performance.now();(function f(n){const k=Math.min((n-s)/1400,1);el.textContent=Math.round(t*(1-Math.pow(1-k,3)))+(k<1?'':x);if(k<1)requestAnimationFrame(f)})(s)};
const L=C.levels||{};$$('.tech-card').forEach(c=>{const v=L[$('h3',c).textContent]||60;c.insertAdjacentHTML('beforeend',`<div class="level"><div class="meter"><i style="--v:${v}"></i></div><b><span data-count="${v}">0</span>%</b></div>`)});
let d=0;$$('.project-card').forEach((c,i)=>{const n=i+1,r=(C.devRepos||[])[d];c.insertAdjacentHTML('afterbegin',`<button class="shot" aria-label="Agrandir la capture du projet ${n}"><img src="assets/img/projets/projet-${n}.png" alt="Capture d'écran du projet ${n}" loading="lazy" onerror="this.onerror=null;this.src='assets/img/projet-placeholder.svg'"></button>`);if(c.classList.contains('dev')){d++;c.insertAdjacentHTML('beforeend',`<a class="btn btn-secondary btn-sm" href="${C.github}${r?'/'+r:''}" target="_blank" rel="noopener">Voir sur GitHub</a>`)}});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');$$('[data-count]',e.target).forEach(count);io.unobserve(e.target)}}),{threshold:.15});$$('.section,.counters').forEach(s=>io.observe(s));
const lb=document.body.appendChild(Object.assign(document.createElement('div'),{className:'lightbox'}));lb.innerHTML='<img alt="">';
document.addEventListener('click',e=>{const s=e.target.closest('.shot');if(s){$('img',lb).src=$('img',s).src;lb.classList.add('open')}else lb.classList.remove('open')});addEventListener('keydown',e=>e.key==='Escape'&&lb.classList.remove('open'));
const ca=$$('.contact-links a');ca[0].href='mailto:'+C.email;ca[0].textContent='✉️ '+C.email;ca[1].href=C.linkedin;ca[2].href=C.github;
const lab=$('.lab'),info=$('#lab-info'),D={master:['Nœud maître Ansible','Lance les playbooks YAML et pilote les machines par SSH.'],managed:['Nœud administré','Reçoit la configuration d\'Ansible. Auditd enregistre les événements système et Rsyslog les envoie.'],logs:['Serveur de logs','Centralise les journaux envoyés par Rsyslog pour les consulter au même endroit.']};
$$('.node',lab).forEach(n=>{const go=()=>{$$('.node',lab).forEach(x=>x.classList.toggle('on',x===n));info.innerHTML=`<strong>${D[n.dataset.k][0]}</strong>${D[n.dataset.k][1]}`};n.addEventListener('click',go);n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})});
$$('[data-flow]').forEach(b=>b.addEventListener('click',()=>{lab.dataset.flow=b.dataset.flow;$$('[data-flow]').forEach(x=>x.setAttribute('aria-pressed',x===b))}));})();

document.addEventListener('click',e=>{
  const b=e.target.closest('.theme-toggle');if(!b)return;
  const r=document.documentElement,t=r.dataset.theme==='light'?'dark':'light';
  r.dataset.theme=t;b.textContent=t==='light'?'🌙':'☀️';
  try{localStorage.setItem('theme',t)}catch(err){}
});
const tb=document.querySelector('.theme-toggle');
if(tb&&document.documentElement.dataset.theme==='light')tb.textContent='🌙';

/* Lab du projet 01 */
(()=>{const lab=document.querySelector('.lab-mini');if(!lab)return;
const info=lab.querySelector('.lab-info'),D={logs:['Serveur de logs','Centralise les journaux envoyés par la ferme de serveurs et par le serveur NOC.'],noc:['Serveur NOC (Ansible)','Pilote la ferme de serveurs avec des playbooks et envoie lui aussi ses journaux au serveur de logs.'],farm:['Ferme de serveurs','Les serveurs à gérer : ils reçoivent l\'automatisation et envoient leurs journaux au serveur de logs.']};
lab.querySelectorAll('.node').forEach(n=>{const go=()=>{lab.querySelectorAll('.node').forEach(x=>x.classList.toggle('on',x===n));info.innerHTML=`<strong>${D[n.dataset.k][0]}</strong>${D[n.dataset.k][1]}`};n.addEventListener('click',go);n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})});
lab.querySelectorAll('button[data-state]').forEach(b=>b.addEventListener('click',()=>{lab.dataset.state=b.dataset.state;lab.querySelectorAll('button[data-state]').forEach(x=>x.setAttribute('aria-pressed',x===b))}))})();

/* Lab du projet 02 */
(()=>{const lab=document.querySelector('.lab-voip');if(!lab)return;
const info=lab.querySelector('.lab-info'),D={ast:['Serveur Asterisk','Le serveur VoIP (PBX) : il gère les comptes et met en relation les softphones.'],sec:['Accès sécurisé','Contrôle qui peut se connecter au serveur : comptes authentifiés et filtrage des connexions.'],sa:['Softphone A','Application de téléphonie installée sur le poste de l\'utilisateur 1.'],sb:['Softphone B','Application de téléphonie installée sur le poste de l\'utilisateur 2.']};
lab.querySelectorAll('.node').forEach(n=>{const go=()=>{lab.querySelectorAll('.node').forEach(x=>x.classList.toggle('on',x===n));info.innerHTML=`<strong>${D[n.dataset.k][0]}</strong>${D[n.dataset.k][1]}`};n.addEventListener('click',go);n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})});
lab.querySelectorAll('button[data-state]').forEach(b=>b.addEventListener('click',()=>{lab.dataset.state=b.dataset.state;lab.querySelectorAll('button[data-state]').forEach(x=>x.setAttribute('aria-pressed',x===b))}))})();

/* Lab du projet 03 */
(()=>{const lab=document.querySelector('.lab-ad');if(!lab)return;
const info=lab.querySelector('.lab-info'),D={srv:['Windows Server','Le contrôleur de domaine : il héberge les services du domaine dans une machine virtuelle.'],net:['DHCP · DNS','Le DHCP donne automatiquement une adresse IP aux postes. Le DNS leur permet de trouver le serveur et les ressources du domaine par leur nom.'],dom:['Active Directory · GPO','L\'annuaire contient les utilisateurs et les groupes et vérifie leur connexion. Les GPO appliquent des règles de configuration aux postes et aux comptes.'],cl:['Poste client','Machine Windows rattachée au domaine : elle reçoit son adresse IP, ouvre la session avec un compte du domaine et applique les GPO.']};
lab.querySelectorAll('.node').forEach(n=>{const go=()=>{lab.querySelectorAll('.node').forEach(x=>x.classList.toggle('on',x===n));info.innerHTML=`<strong>${D[n.dataset.k][0]}</strong>${D[n.dataset.k][1]}`};n.addEventListener('click',go);n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})});
lab.querySelectorAll('button[data-state]').forEach(b=>b.addEventListener('click',()=>{lab.dataset.state=b.dataset.state;lab.querySelectorAll('button[data-state]').forEach(x=>x.setAttribute('aria-pressed',x===b))}))})();

/* Lab du projet 04 */
(()=>{const lab=document.querySelector('.lab-lamp');if(!lab)return;
const info=lab.querySelector('.lab-info'),D={cl:['Poste client','Il interroge d\'abord le DNS pour trouver l\'adresse du site, puis envoie sa requête HTTP au serveur web.'],pri:['Serveur DNS primaire','Il détient la zone d\'origine : c\'est là que sont déclarés les noms et leurs adresses.'],sec:['Serveur DNS secondaire','Il reçoit une copie de la zone depuis le primaire et prend le relais si celui-ci est indisponible.'],apa:['Apache','Le serveur web : il reçoit les requêtes HTTP et renvoie les pages.'],php:['PHP','Il exécute le code des pages dynamiques pour le compte d\'Apache.'],mar:['MariaDB','La base de données : PHP y lit et y enregistre les données du site.']};
lab.querySelectorAll('.node').forEach(n=>{const go=()=>{lab.querySelectorAll('.node').forEach(x=>x.classList.toggle('on',x===n));info.innerHTML=`<strong>${D[n.dataset.k][0]}</strong>${D[n.dataset.k][1]}`};n.addEventListener('click',go);n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})});
lab.querySelectorAll('button[data-state]').forEach(b=>b.addEventListener('click',()=>{lab.dataset.state=b.dataset.state;lab.querySelectorAll('button[data-state]').forEach(x=>x.setAttribute('aria-pressed',x===b))}))})();

/* Lab du projet 05 */
(()=>{const lab=document.querySelector('.lab-dual');if(!lab)return;
const info=lab.querySelector('.lab-info'),D={adm:['Poste d\'administration','Le poste depuis lequel on crée les utilisateurs, on organise les unités d\'organisation (OU) et on définit les GPO.'],win:['Windows Server (AD DS)','Le contrôleur du domaine Windows : il héberge l\'annuaire Active Directory avec les utilisateurs, les OU et les GPO.'],smb:['Samba AD DC','Le contrôleur du domaine Linux : Samba fournit un annuaire compatible Active Directory, interrogeable en LDAP.'],cl:['Client Windows 10','Un poste Windows 10 membre du domaine : l\'utilisateur ouvre sa session avec son compte et le poste applique les GPO.']};
lab.querySelectorAll('.node').forEach(n=>{const go=()=>{lab.querySelectorAll('.node').forEach(x=>x.classList.toggle('on',x===n));info.innerHTML=`<strong>${D[n.dataset.k][0]}</strong>${D[n.dataset.k][1]}`};n.addEventListener('click',go);n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})});
lab.querySelectorAll('button[data-state]').forEach(b=>b.addEventListener('click',()=>{lab.dataset.state=b.dataset.state;lab.querySelectorAll('button[data-state]').forEach(x=>x.setAttribute('aria-pressed',x===b))}))})();

/* Lab du projet 06 */
(()=>{const lab=document.querySelector('.lab-pfs');if(!lab)return;
const info=lab.querySelector('.lab-info'),D={cl:['Poste utilisateur','Dès qu\'il ouvre une page web, l\'utilisateur est redirigé vers la page de connexion du portail captif.'],pfs:['pfSense','Le pare-feu du réseau : son portail captif bloque l\'accès à Internet tant que l\'utilisateur ne s\'est pas authentifié.'],net:['Internet','Accessible uniquement après une authentification réussie sur le portail.']};
lab.querySelectorAll('.node').forEach(n=>{const go=()=>{lab.querySelectorAll('.node').forEach(x=>x.classList.toggle('on',x===n));info.innerHTML=`<strong>${D[n.dataset.k][0]}</strong>${D[n.dataset.k][1]}`};n.addEventListener('click',go);n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})});
lab.querySelectorAll('button[data-state]').forEach(b=>b.addEventListener('click',()=>{lab.dataset.state=b.dataset.state;lab.querySelectorAll('button[data-state]').forEach(x=>x.setAttribute('aria-pressed',x===b))}))})();