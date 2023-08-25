# AIVtuber Demo by ChatVRM

ChatVRMをベースにしたAIVTuberのデモアプリです。ブラウザで簡単にキャラクターと会話ができます。

## 実行

### 前提条件

- [VOICEVOX](https://voicevox.hiroshiba.jp/)のエンジンがインストールされていること
- Python がインストールされていること
- Node.js がインストールされていること

@Harxxki の動作環境は下記です。

- macOS Ventura 13.0.1（22A400）
- Python 3.11.0
- Node.js 18.13.0

### VOICEVOXの起動

下記からエンジン本体をダウンロード&解凍し、適当なディレクトリに保存してください。

https://github.com/VOICEVOX/voicevox_engine/releases

解凍後、以下のコマンドで起動します。

```
# Macの場合
cd (エンジン格納先)/mac
./run.sh --use_gpu
# Windowsの場合
cd (エンジン格納先)\windows-nvidia
run.exe --use_gpu
```

参考: https://note.com/__olender/n/n49f1d07c2c7d

### フロントエンドの起動

このリポジトリをクローンするか、ダウンロードしてください。

```bash
git clone git@github.com:worldmakerinc/chatVRM-aituber-demo.git
```

必要なパッケージをインストールしてください。

```bash
npm install
```

パッケージのインストールが完了した後、以下のコマンドで開発用のWebサーバーを起動します。

```bash
npm run dev
```

実行後、以下のURLにアクセスして動作を確認して下さい。

[http://localhost:3000](http://localhost:3000)
