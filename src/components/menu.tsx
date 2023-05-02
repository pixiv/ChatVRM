import { IconButton } from "./iconButton";
import { Message } from "@/features/messages/messages";
import { KoeiroParam } from "@/features/constants/koeiroParam";
import { ChatLog } from "./chatLog";
import React, { useCallback, useContext, useRef, useState } from "react";
import { Settings } from "./settings";
import { ViewerContext } from "@/features/vrmViewer/viewerContext";
import { AssistantText } from "./assistantText";

type Props = {
  openAiKey: string;
  azureOpenAiKey: string;
  azureOpenAiResourceName: string;
  azureOpenAiDeploymentName: string;
  systemPrompt: string;
  chatLog: Message[];
  koeiroParam: KoeiroParam;
  assistantMessage: string;
  onChangeSystemPrompt: (systemPrompt: string) => void;
  onChangeAiKey: (key: string) => void;
  onChangeAzureOpenAiKey: (key: string) => void;
  onChangeAzureOpenAiResourceName: (resourceName: string) => void;
  onChangeAzureOpenAiDeploymentName: (deploymentName: string) => void;
  onChangeChatLog: (index: number, text: string) => void;
  onChangeKoeiromapParam: (param: KoeiroParam) => void;
};
export const Menu = ({
  openAiKey,
  azureOpenAiKey,
  azureOpenAiResourceName,
  azureOpenAiDeploymentName,
  systemPrompt,
  chatLog,
  koeiroParam,
  assistantMessage,
  onChangeSystemPrompt,
  onChangeAiKey,
  onChangeAzureOpenAiKey,
  onChangeAzureOpenAiResourceName,
  onChangeAzureOpenAiDeploymentName,
  onChangeChatLog,
  onChangeKoeiromapParam,
}: Props) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showChatLog, setShowChatLog] = useState(false);
  const { viewer } = useContext(ViewerContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeSystemPrompt = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChangeSystemPrompt(event.target.value);
    },
    [onChangeSystemPrompt]
  );

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

  const handleChangeKoeiroParam = useCallback(
    (x: number, y: number) => {
      onChangeKoeiromapParam({
        speakerX: x,
        speakerY: y,
      });
    },
    [onChangeKoeiromapParam]
  );

  const handleClickOpenVrmFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleChangeVrmFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const file = files[0];
      if (!file) return;

      const file_type = file.name.split(".").pop();

      if (file_type === "vrm") {
        const blob = new Blob([file], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(blob);
        viewer.loadVrm(url);
      }

      event.target.value = "";
    },
    [viewer]
  );

  return (
    <>
      <div className="absolute z-10 m-24">
        <div className="grid grid-flow-col gap-[8px]">
          <IconButton
            iconName="24/Menu"
            label="設定"
            isProcessing={false}
            onClick={() => setShowSettings(true)}
          ></IconButton>
          {showChatLog ? (
            <IconButton
              iconName="24/CommentOutline"
              label="会話ログ"
              isProcessing={false}
              onClick={() => setShowChatLog(false)}
            />
          ) : (
            <IconButton
              iconName="24/CommentFill"
              label="会話ログ"
              isProcessing={false}
              disabled={chatLog.length <= 0}
              onClick={() => setShowChatLog(true)}
            />
          )}
        </div>
      </div>
      {showChatLog && <ChatLog messages={chatLog} />}
      {showSettings && (
        <Settings
          openAiKey={openAiKey}
          azureOpenAiKey={azureOpenAiKey}
          azureOpenAiResourceName={azureOpenAiResourceName}
          azureOpenAiDeploymentName={azureOpenAiDeploymentName}          
          chatLog={chatLog}
          systemPrompt={systemPrompt}
          koeiroParam={koeiroParam}
          onClickClose={() => setShowSettings(false)}
          onChangeAiKey={handleAiKeyChange}
          onChangeAzureOpenAiKey={handleAzureOpenAiKeyChange}
          onChangeAzureOpenAiResourceName={handleAzureOpenAiResourceNameChange}
          onChangeAzureOpenAiDeploymentName={handleAzureOpenAiDeploymentNameChange}          
          onChangeSystemPrompt={handleChangeSystemPrompt}
          onChangeChatLog={onChangeChatLog}
          onChangeKoeiroParam={handleChangeKoeiroParam}
          onClickOpenVrmFile={handleClickOpenVrmFile}
        />
      )}
      {!showChatLog && assistantMessage && (
        <AssistantText message={assistantMessage} />
      )}
      <input
        type="file"
        className="hidden"
        accept=".vrm"
        ref={fileInputRef}
        onChange={handleChangeVrmFile}
      />
    </>
  );
};
