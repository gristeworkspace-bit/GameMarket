# GameMarket

静的ホスティング向けの PWA ゲームマーケットの初期構成です。

## 構成

- `index.html` - マーケットのトップページ
- `styles.css` - 共通スタイル
- `app.js` - マーケット用 JavaScript（今後拡張用）
- `games/game-template/` - 制作者向け PWA テンプレート
  - `index.html` - テンプレートページ
  - `manifest.json` - PWA マニフェスト
  - `service-worker.js` - 簡易サービスワーカー
  - `install.js` - インストールボタン挙動
  - `icon.svg` - アイコン
  - `README.md` - 制作者向け説明
  - `rules.txt` - ルールテンプレート
- `games/unity-template/` - Unity WebGL 公開テンプレート
  - `index.html` - Unity WebGL ゲームの公開ページ
  - `manifest.json` - PWA マニフェスト
  - `service-worker.js` - 簡易サービスワーカー
  - `install.js` - インストールボタン挙動
  - `icon.svg` - アイコン
  - `README.md` - Unity WebGL ビルド手順

## Unity WebGL の追加

Unity で作成したゲームを公開する場合、WebGL ビルドを `games/unity-template/Build/` と `games/unity-template/TemplateData/` に配置し、`games/unity-template/index.html` の `projectName` をビルド名に合わせます。

## 使い方

1. `index.html` をブラウザで開きます。
2. `ゲームページへ` をタップし、ゲームページの `ダウンロード` ボタンからホーム画面に追加します。

## 進め方の提案

- まずは複数ゲームを追加して `index.html` からページを遷移させる形にします。
- 次に、ゲームごとのメタデータを `games.json` で管理してマーケット一覧を自動生成します。
- 新しいゲームは `games/<game-id>/` に追加し、`games.json` に登録します。
- その後、ユーザー管理 / API を追加して購入・配信を実装します。
