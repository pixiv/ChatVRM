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
cd (エンジン格納先)/macos-x64
./run --use_gpu
# Windowsの場合
cd (エンジン格納先)\windows-nvidia
run.exe --use_gpu
```

起動するとこんな感じになります。

```
❯ ./run
Warning: cpu_num_threads is set to 0. ( The library leaves the decision to the synthesis runtime )
Info: Loading core 0.14.4.
INFO:     Started server process [85952]
INFO:     Waiting for application startup.
reading /Users/hmori/Library/Application Support/voicevox-engine/.tmp.dict_csv-7c5c48e7-394b-4648-abcf-9e3c81313ef9 ... 64
emitting double-array: 100% |###########################################| 

done!
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:50021 (Press CTRL+C to quit)
```

curlで動作確認できます。

```
❯ curl -X GET "http://127.0.0.1:50021/version"
# "0.15.0-preview.4"

❯ curl -s -X POST "localhost:50021/audio_query?speaker=1" --get --data-urlencode "text=こんにちは"

{"accent_phrases":[{"moras":[{"text":"コ","consonant":"k","consonant_length":0.10002630949020386,"vowel":"o","vowel_length":0.15740256011486053,"pitch":5.714912414550781},{"text":"ン","consonant":null,"consonant_length":null,"vowel":"N","vowel_length":0.08265870064496994,"pitch":5.88542366027832},{"text":"ニ","consonant":"n","consonant_length":0.03657086566090584,"vowel":"i","vowel_length":0.11711286753416061,"pitch":5.998488426208496},{"text":"チ","consonant":"ch","consonant_length":0.08808864653110504,"vowel":"i","vowel_length":0.09015554934740067,"pitch":5.977110385894775},{"text":"ワ","consonant":"w","consonant_length":0.08290573209524155,"vowel":"a","vowel_length":0.20834361016750336,"pitch":6.048253536224365}],"accent":5,"pause_mora":null,"is_interrogative":false}],"speedScale":1.0,"pitchScale":0.0,"intonationScale":1.0,"volumeScale":1.0,"prePhonemeLength":0.1,"postPhonemeLength":0.1,"outputSamplingRate":24000,"outputStereo":false,"kana":"コンニチワ'"}
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
