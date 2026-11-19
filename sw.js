// AM GOLD service worker — ثابت، ما يحتاج يتبدّل ويّا كل تحديث
const C='amgold-v2';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
// الإشعارات حتى والتطبيق مسدود
self.addEventListener('push',e=>{
  let p={};try{p=e.data?e.data.json():{}}catch(x){p={notification:{title:'AM GOLD',body:e.data?e.data.text():''}}}
  const n=p.notification||{},d=p.data||{};
  const title=n.title||d.title||'AM GOLD',link=d.link||(p.fcmOptions&&p.fcmOptions.link)||(n.click_action)||'./';
  e.waitUntil(self.registration.showNotification(title,{body:n.body||d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:d.tag||undefined,renotify:!!d.tag,dir:'rtl',lang:'ar',data:{link}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();const link=(e.notification.data&&e.notification.data.link)||'./',go=(new URL(link,self.location.href)).searchParams.get('go');
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    for(const c of cs){if('focus' in c){c.focus();if(go)c.postMessage({go});return}}
    return self.clients.openWindow(link);
  }));
});