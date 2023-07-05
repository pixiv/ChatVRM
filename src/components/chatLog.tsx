import { useEffect, useRef, useState } from "react";
import FlexTextarea from "./FlexTextarea/FlexTextarea";
import { Message } from "@/features/messages/messages";
type Props = {
  messages: Message[];
  handleResume: (previousMessages: Message[], newMessage: string) => void;
};
export const ChatLog = ({
   messages ,
   handleResume
  }: Props) => {
  const handleResumeButtonClick = (num: number, newMessage: string) => {
    handleResume([...messages.slice(0, num)], newMessage);
  };
  
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({
      behavior: "auto",
      block: "center",
    });
  }, []);

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [messages]);
  return (
    <div className="absolute w-col-span-6 max-w-full h-[100svh] pb-64">
      <div className="max-h-full px-16 pt-104 pb-64 overflow-y-auto scroll-hidden">
        {messages.map((msg, i) => {
          return (
            <div key={i} ref={messages.length - 1 === i ? chatScrollRef : null}>
              <Chat
                role={msg.role}
                message={msg.content}
                num={i}
                onClickResumeButton={handleResumeButtonClick}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Chat = ({ role, message, num, onClickResumeButton}:
  { role: string; message: string; num: number,
    onClickResumeButton: (num: number, message: string) => void,
  }) => {

const [textAreaValue, setTextAreaValue] = useState(message);

const onClickButton = () => {
  const newMessage = textAreaValue
  onClickResumeButton(num, newMessage);
};

const roleColor =
  role === "assistant" ? "bg-secondary text-white " : "bg-base text-primary";
const roleText = role === "assistant" ? "text-secondary" : "text-primary";
const offsetX = role === "user" ? "pl-40" : "pr-40";

return (
  <div className={`mx-auto max-w-sm my-16 ${offsetX} `}>
    <div
      className={`px-24 py-8 rounded-t-8 font-Montserrat font-bold tracking-wider ${roleColor} flex justify-between`}
    >
      <div>
        {role === "assistant" ? "CHARACTER" : "YOU"}
      </div>
      <button className="text-right" onClick={onClickButton}>
        {role !== "assistant" && <pixiv-icon name={"24/Reload"} scale="1" ></pixiv-icon>}
      </button>
    </div>
    <div className="px-24 py-16 bg-white rounded-b-8">
      <div className={`typography-16 font-M_PLUS_2 font-bold ${roleText}`}>
        {role === "assistant" ? (
          <div>{textAreaValue}</div>
        ) : (
          <FlexTextarea value={textAreaValue} onChange={setTextAreaValue} />
        )}
      </div>
    </div>
  </div>
);
};
