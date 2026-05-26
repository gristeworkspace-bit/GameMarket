# Unity WebGL Template

Unity で作成したゲームを GameMarket に公開するためのテンプレートです。

## 使い方

1. Unity の `Build Settings` で `WebGL` を選択し、ビルドを実行します。
2. ビルド先フォルダの `Build/` と `TemplateData/` を `games/unity-template/` 配下にコピーします。
3. `games/unity-template/index.html` の `projectName` を、Unity のビルドファイル名に合わせて変更します。
   - 例: `MyGame.loader.js` なら `const projectName = 'MyGame';`
4. `games.json` に `pageUrl` と `icon` を登録すると、マーケットに表示されます。

## 期待する構成

```
games/unity-template/
  index.html
  manifest.json
  install.js
  service-worker.js
  icon.svg
  README.md
  Build/
    MyGame.loader.js
    MyGame.data.unityweb
    MyGame.framework.js.unityweb
    MyGame.wasm.unityweb
  TemplateData/
    ...
```

## 注意点

- Unity WebGL はファイル数が多いため、静的ホスティング先がすべてのファイルを配信できることを確認してください。
- `index.html` の `projectName` はビルド名と完全一致させてください。
- ローカルで動作確認する場合、Web サーバー上で開く必要があります（`file://` では動きません）。
