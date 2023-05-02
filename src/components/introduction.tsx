import { useState, useCallback, useEffect } from "react";
import { Link } from "./link";

type Props = {
  openAiKey: string;
  azureOpenAiKey: string;
  azureOpenAiResourceName: string;
  azureOpenAiDeploymentName: string;
  onChangeAiKey: (openAiKey: string) => void;
  onChangeAzureOpenAiKey: (azureOpenAiKey: string) => void;
  onChangeAzureOpenAiResourceName: (azureOpenAiResourceName: string) => void;
  onChangeAzureOpenAiDeploymentName: (azureOpenAiDeploymentName: string) => void;
};

export const Introduction = ({
  openAiKey,
  azureOpenAiKey,
  azureOpenAiResourceName,
  azureOpenAiDeploymentName,
  onChangeAiKey,
  onChangeAzureOpenAiKey,
  onChangeAzureOpenAiResourceName,
  onChangeAzureOpenAiDeploymentName,
}: Props) => {
  const [opened, setOpened] = useState(true);

  const handleAiKeyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeAiKey(event.target.value);
    },
    [onChangeAiKey]
  );

  const handleAzureOpenAiKeyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeAzureOpenAiKey(event.target.value);
    },
    [onChangeAzureOpenAiKey]
  );

  const handleAzureOpenAiResourceNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeAzureOpenAiResourceName(event.target.value);
    },
    [onChangeAzureOpenAiResourceName]
  );

  const handleAzureOpenAiDeploymentNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeAzureOpenAiDeploymentName(event.target.value);
    },
    [onChangeAzureOpenAiDeploymentName]
  );

  const [provider, setProvider] = useState("openai");

  const handleProviderChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setProvider(event.target.value);
  }, []);

  useEffect(() => {
    if (provider === "openai") {
      onChangeAzureOpenAiKey("");
      onChangeAzureOpenAiResourceName("");
      onChangeAzureOpenAiDeploymentName("");
    } else {
      onChangeAiKey("");
    }
  }, [provider, onChangeAiKey, onChangeAzureOpenAiKey, onChangeAzureOpenAiResourceName, onChangeAzureOpenAiDeploymentName]);

  return opened ? (
    <div className="absolute z-40 w-full h-full px-24 py-40  bg-black/30 font-M_PLUS_2">
      <div className="mx-auto my-auto max-w-3xl max-h-full p-24 overflow-auto bg-white rounded-16">
        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary ">
            このアプリケーションについて
          </div>
          <div>
            Webブラウザだけで3Dキャラクターとの会話を、マイクやテキスト入力、音声合成を用いて楽しめます。キャラクター（VRM）の変更や性格設定、音声調整もできます。
          </div>
        </div>
        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary">
            技術紹介
          </div>
          <div>
            3Dモデルの表示や操作には
            <Link
              url={"https://github.com/pixiv/three-vrm"}
              label={"@pixiv/three-vrm"}
            />
            、 会話文生成には
            <Link
              url={
                "https://openai.com/blog/introducing-chatgpt-and-whisper-apis"
              }
              label={"ChatGPT API (OpenAI)"}
            />
            と
            <Link
              url={
                "https://azure.microsoft.com/ja-JP/blog/chatgpt-is-now-available-in-azure-openai-service/"
              }
              label={"ChatGPT API (Azure OpenAI Service)"}
            />
            を、音声合成には
            <Link url={"http://koeiromap.rinna.jp/"} label={"Koeiro API"} />
            を使用しています。 詳細はこちらの
            <Link
              url={"https://inside.pixiv.blog/2023/04/28/160000"}
              label={"技術解説記事"}
            />
            をご覧ください。
          </div>
          <div className="my-16">
            このデモはGitHubでソースコードを公開しています。自由に変更や改変をお試しください！
            <br />
            リポジトリ：
            <Link
              url={"https://github.com/pixiv/ChatVRM"}
              label={"https://github.com/pixiv/ChatVRM"}
            />
          </div>
        </div>

        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary">
            利用上の注意
          </div>
          <div>
            差別的または暴力的な発言、特定の人物を貶めるような発言を、意図的に誘導しないでください。また、VRMモデルを使ってキャラクターを差し替える際はモデルの利用条件に従ってください。
          </div>
        </div>
        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary">
            ChatGPT APIキー
          </div>
          <div className="mb-16">
            OpenAIまたはAzure OpenAI ServiceのいずれかのAPIキーを入力してください。
          </div>
          <div className="block mb-2 text-secondary">
            プロバイダー
          </div>
          <select
            value={provider}
            onChange={handleProviderChange}
            className="my-4 px-16 py-8 w-1/2 h-40 bg-surface3 hover:bg-surface3-hover rounded-4 text-ellipsis"
          >
            <option value="openai">OpenAI</option>
            <option value="azure_openai">Azure OpenAI Service</option>
          </select>
          {provider === "openai" ? (
            <div className="my-8">
              <div className="block mb-2 text-secondary">
                APIキー
              </div>
              <input
                type="text"
                placeholder="sk-..."
                value={openAiKey}
                onChange={handleAiKeyChange}
                className="my-4 px-16 py-8 w-full h-40 bg-surface3 hover:bg-surface3-hover rounded-4 text-ellipsis"
              />
              <div>
                APIキーは
                <Link
                  url="https://platform.openai.com/account/api-keys"
                  label="OpenAIのサイト"
                />
                で取得できます。取得したAPIキーをフォームに入力してください。
              </div>
              <div className="my-16">
                入力されたAPIキーで、ブラウザから直接OpenAIのAPIを利用しますので、サーバー等には保存されません。
                なお、利用しているモデルはGPT-3です。
                <br />
                ※APIキーや会話文はピクシブのサーバーに送信されません。
              </div>
            </div>
          ) : (
            <>
              <div className="my-8">
                <div className="block mb-2 text-secondary">
                  APIキー
                </div>
                <input
                  type="text"
                  placeholder="YOUR_API_KEY"
                  value={azureOpenAiKey}
                  onChange={handleAzureOpenAiKeyChange}
                  className="my-4 px-16 py-8 w-full h-40 bg-surface3 hover:bg-surface3-hover rounded-4 text-ellipsis"
                />
              </div>
              <div className="my-8">
                <div className="block mb-2 text-secondary">
                  リソース名
                </div>
                <input
                  type="text"
                  placeholder="YOUR_RESOURCE_NAME"
                  value={azureOpenAiResourceName}
                  onChange={handleAzureOpenAiResourceNameChange}
                  className="my-4 px-16 py-8 w-full h-40 bg-surface3 hover:bg-surface3-hover rounded-4 text-ellipsis"
                />
              </div>
              <div className="my-8">
                <div className="block mb-2 text-secondary">
                  モデルのデプロイ名
                </div>
                <input
                  type="text"
                  placeholder="YOUR_DEPLOYMENT_NAME"
                  value={azureOpenAiDeploymentName}
                  onChange={handleAzureOpenAiDeploymentNameChange}
                  className="my-4 px-16 py-8 w-full h-40 bg-surface3 hover:bg-surface3-hover rounded-4 text-ellipsis"
                />
              </div>
              <div>
                <Link
                  url="https://learn.microsoft.com/ja-jp/azure/cognitive-services/openai/reference"
                  label="Azure OpenAI ServiceのREST APIリファレンス"
                />
                を参考にして各項目を入力してください。
              </div>
              <div className="my-16">
                入力されたAPIキーで、ブラウザから直接Azure OpenAI ServiceのAPIを利用しますので、サーバー等には保存されません。
                <br />
                ※APIキーや会話文はピクシブのサーバーに送信されません。
              </div>
            </>
          )}
        </div>
        <div className="my-24">
          <button
            onClick={() => {
              setOpened(false);
            }}
            className="font-bold bg-secondary hover:bg-secondary-hover active:bg-secondary-press disabled:bg-secondary-disabled text-white px-24 py-8 rounded-oval"
          >
            APIキーを入力してはじめる
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
