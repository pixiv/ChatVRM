import { Character, characters } from '@/features/character/character'
import { KoeiroParam } from '@/features/constants/koeiroParam'
import { Message } from '@/features/messages/messages'
import React, { useEffect, useState } from 'react'
import { IconButton } from './iconButton'
import { Link } from './link'
import { TextButton } from './textButton'

type Props = {
  openAiKey: string
  systemPrompt: string
  chatLog: Message[]
  koeiroParam: KoeiroParam
  koeiromapKey: string
  onClickClose: () => void
  onChangeAiKey: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeSystemPrompt: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  onChangeChatLog: (index: number, text: string) => void
  onChangeKoeiroParam: (x: number, y: number) => void
  onClickOpenVrmFile: () => void
  onClickResetChatLog: () => void
  onClickResetSystemPrompt: () => void
  onChangeKoeiromapKey: (event: React.ChangeEvent<HTMLInputElement>) => void
  setCharacter: (character: Character) => void
}
export const Settings = ({
  openAiKey,
  chatLog,
  systemPrompt,
  koeiroParam,
  koeiromapKey,
  onClickClose,
  onChangeSystemPrompt,
  onChangeAiKey,
  onChangeChatLog,
  onChangeKoeiroParam,
  onClickOpenVrmFile,
  onClickResetChatLog,
  onClickResetSystemPrompt,
  onChangeKoeiromapKey,
  setCharacter,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  )

  const handleCharacterSelect = (char: Character) => {
    setSelectedCharacter(char)
    setCharacter(char)
    setIsOpen(false)
  }


  const [voiceId, setVoiceId] = useState<string>('0')
  useEffect(() => {
    if (window.localStorage.getItem('chatVRMParams')) {
      const params = JSON.parse(
        window.localStorage.getItem('chatVRMParams') as string
      )
      setVoiceId(params.voiceId)
    }
  }, [selectedCharacter])

  return (
    <div className="absolute z-40 w-full h-full bg-white/80 backdrop-blur ">
      <div className="absolute m-24">
        <IconButton
          iconName="24/Close"
          isProcessing={false}
          onClick={onClickClose}
        ></IconButton>
      </div>
      <div className="max-h-full overflow-auto">
        <div className="text-text1 max-w-3xl mx-auto px-24 py-64 ">
          <div className="my-24 typography-32 font-bold">設定</div>
          <div className="my-24">
            <div className="my-16 typography-20 font-bold">
              キャラクター選択
            </div>
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center w-full w-col-span-2 rounded-md px-16 py-8 bg-surface1 hover:bg-surface1-hover text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none rounded-8"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {selectedCharacter ?? 'キャラクターを選択'}
                </button>
              </div>

              {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-full max-w-xs rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 rounded-8">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {characters.map((char) => (
                      <button
                        key={char}
                        className="block w-full text-left px-16 py-8 text-gray-700 hover:bg-surface1-hover rounded-8"
                        role="menuitem"
                        onClick={() => {
                          handleCharacterSelect(char)
                        }}
                      >
                        {char.charAt(0).toUpperCase() + char.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="my-40">
              <div className="my-16 typography-20 font-bold">
                OpenAI API キー
              </div>
              <input
                className="text-ellipsis px-16 py-8 bg-surface1 hover:bg-surface1-hover w-full rounded-8"
                type="text"
                placeholder="sk-..."
                value={openAiKey}
                onChange={onChangeAiKey}
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
                ChatGPT
                APIはブラウザから直接アクセスしています。また、APIキーや会話内容はサーバには保存されません。
                <br />
                ※利用しているモデルはChatGPT API (GPT-3.5)です。
              </div>
            </div>
          </div>
          <div className="my-40">
            <div className="my-8">
              <div className="my-16 typography-20 font-bold">
                キャラクター設定（システムプロンプト）
              </div>
              <div>キャラクターによって自動で設定されます。</div>
            </div>

            <div className="px-16 py-8 bg-surface1 hover:bg-surface1-hover rounded-8 w-full">
              {systemPrompt}
            </div>
          </div>
          <div className="my-40">
            <div className="my-16 typography-20 font-bold">声の調整</div>
            <div>
              ローカルで起動したVOICEBOX
              Engineを使用しています。プリセットはキャラクターによって自動で設定されます。
            </div>
            <div>現在のプリセットID: {voiceId}</div>
          </div>
          {chatLog.length > 0 && (
            <div className="my-40">
              <div className="my-8 grid-cols-2">
                <div className="my-16 typography-20 font-bold">会話履歴</div>
                <TextButton onClick={onClickResetChatLog}>
                  会話履歴リセット
                </TextButton>
              </div>
              <div className="my-8">
                {chatLog.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="my-8 grid grid-flow-col  grid-cols-[min-content_1fr] gap-x-fixed"
                    >
                      <div className="w-[64px] py-8">
                        {value.role === 'assistant' ? 'Character' : 'You'}
                      </div>
                      <input
                        key={index}
                        className="bg-surface1 hover:bg-surface1-hover rounded-8 w-full px-16 py-8"
                        type="text"
                        value={value.content}
                        onChange={(event) => {
                          onChangeChatLog(index, event.target.value)
                        }}
                      ></input>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
