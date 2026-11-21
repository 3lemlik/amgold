// FX ALI service worker — ثابت، ما يحتاج يتبدّل ويّا كل تحديث
const C='amchat-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
// الإشعارات حتى والتطبيق مسدود
self.addEventListener('push',e=>{
  let p={};try{p=e.data?e.data.json():{}}catch(x){p={notification:{title:'FX ALI',body:e.data?e.data.text():''}}}
  const n=p.notification||{},d=p.data||{};
  const title=n.title||d.title||'FX ALI',link=d.cid?'./?go=chat&c='+encodeURIComponent(d.cid):(d.link||(p.fcmOptions&&p.fcmOptions.link)||(n.click_action)||'./');
  e.waitUntil((async()=>{
    if(d.badge&&self.navigator&&self.navigator.setAppBadge){try{await self.navigator.setAppBadge(Math.max(1,+d.badge||1))}catch(x){}}
    await self.registration.showNotification(title,{body:n.body||d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:d.tag||undefined,renotify:!!d.tag,dir:'rtl',lang:'ar',vibrate:[60,40,60],data:{link,cid:d.cid||''}});
  })());
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();const dt=e.notification.data||{},link=dt.link||'./',U=new URL(link,self.location.href),go=U.searchParams.get('go'),c=U.searchParams.get('c')||dt.cid||'';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    const top=cs.find(x=>x.frameType!=='nested'&&!/chat\.html/.test(x.url)&&'focus' in x);
    if(top){top.focus();if(go||c)top.postMessage({go:go||'chat',c});return}
    return self.clients.openWindow(U.href);
  }));
});