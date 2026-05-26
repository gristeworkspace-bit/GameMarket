const installButton = document.getElementById('installButton');
const instructions = document.getElementById('instructions');
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  installButton.textContent = 'ダウンロード';
  installButton.disabled = false;
});

installButton.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    deferredPrompt = null;
    if (result.outcome === 'accepted') {
      installButton.textContent = 'インストール済み';
      installButton.disabled = true;
    } else {
      installButton.textContent = 'もう一度試す';
    }
  } else {
    showIosInstructions();
  }
});

function showIosInstructions() {
  instructions.hidden = false;
  instructions.innerHTML = `
    <strong>iOS でホーム画面に追加する方法</strong>
    <ol>
      <li>Safari の共有ボタンをタップ</li>
      <li>「ホーム画面に追加」を選択</li>
      <li>右上の「追加」をタップ</li>
    </ol>
    <p>Android Chrome では、上部に「インストール」表示が出る場合があります。</p>
  `;
}

function isIos() {
  return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
}

function isInStandaloneMode() {
  return ('standalone' in window.navigator) && window.navigator.standalone;
}

if (isIos() && isInStandaloneMode()) {
  installButton.textContent = 'インストール済み';
  installButton.disabled = true;
}

if (!deferredPrompt && !isIos()) {
  installButton.textContent = 'ダウンロード';
  installButton.disabled = false;
}

if (isIos()) {
  installButton.textContent = 'iOS で追加';
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/games/sample-game/service-worker.js')
    .catch(err => console.warn('ServiceWorker registration failed:', err));
}
