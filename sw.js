// 화캉스 서비스 워커 — 홈 화면 앱으로 설치되게 하는 최소한의 역할만.
// 파일을 저장해 두지 않고 늘 서버에서 최신 파일을 받음(고친 index.html이 바로 반영되게).
// 인터넷이 끊겼을 때만 짧은 안내를 보여 줌.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(() => new Response(
    '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<body style="margin:0;display:grid;place-items:center;height:100vh;background:#DCEFE8;color:#22344A;font-family:sans-serif;text-align:center">'
    + '<p>🚽<br>인터넷에 연결되면 화캉스가 열려요</p>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )));
});
