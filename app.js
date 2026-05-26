document.addEventListener('DOMContentLoaded', () => {
  const gameList = document.getElementById('gameList');

  fetch('games.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('ゲーム一覧の読み込みに失敗しました');
      }
      return response.json();
    })
    .then(data => {
      renderGameList(data.games || []);
    })
    .catch(error => {
      console.error(error);
      gameList.innerHTML = '<div class="error">ゲーム一覧を読み込めませんでした。後ほど再読み込みしてください。</div>';
    });

  function renderGameList(games) {
    if (!games.length) {
      gameList.innerHTML = '<div class="error">現在、公開中のゲームはありません。</div>';
      return;
    }

    gameList.innerHTML = '';

    games.forEach(game => {
      const card = document.createElement('article');
      card.className = 'game-card';

      const title = document.createElement('h2');
      title.textContent = game.title;
      card.appendChild(title);

      const description = document.createElement('p');
      description.textContent = game.description;
      card.appendChild(description);

      if (game.tags && game.tags.length) {
        const tagList = document.createElement('div');
        tagList.className = 'game-tags';
        tagList.textContent = game.tags.join(' · ');
        card.appendChild(tagList);
      }

      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'buttons';

      const link = document.createElement('a');
      link.className = 'button';
      link.href = game.pageUrl;
      link.textContent = 'ゲームページへ';
      buttonContainer.appendChild(link);

      if (game.icon) {
        const icon = document.createElement('img');
        icon.className = 'game-icon';
        icon.src = game.icon;
        icon.alt = `${game.title} のアイコン`;
        card.insertBefore(icon, title);
      }

      card.appendChild(buttonContainer);
      gameList.appendChild(card);
    });
  }
});
