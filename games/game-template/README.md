# Game Template

このフォルダは、GameMarket で公開する PWA ゲームの制作テンプレートです。

## 使い方

1. `index.html` のタイトルと説明を、ゲーム固有の内容に書き換えます。
2. `manifest.json` で `name` / `short_name` / `description` を変更します。
3. `icon.svg` をゲーム専用のアイコンに差し替えます。
4. `rules.txt` をゲームのルールや遊び方に合わせて編集します。
5. `install.js` と `service-worker.js` は PWA の基本としてそのまま利用できます。

## これだけあれば基本構成は完成です

- `index.html` - ゲームの公開ページ
- `manifest.json` - PWA のメタデータ
- `install.js` - ダウンロード / ホーム画面追加の誘導
- `service-worker.js` - PWA のキャッシュとオフライン対応
- `icon.svg` - PWA アイコン
- `rules.txt` - 製作者向けルール一式

## 表示確認

公開先の URL は `games/game-template/index.html` です。

このテンプレートをコピーして、新しいゲームフォルダを作成してもOKです。