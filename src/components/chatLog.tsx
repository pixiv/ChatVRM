import { Message } from '@/features/messages/messages'
import { useEffect, useRef } from 'react'
type Props = {
  messages: Message[]
}
export const ChatLog = ({ messages }: Props) => {
  const chatScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'center',
    })
  }, [])

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }, [messages])
  return (
    <div className="absolute w-col-span-6 max-w-full h-[100svh] pb-64">
      <div className="max-h-full px-16 pt-104 pb-64 overflow-y-auto scroll-hidden">
        {messages.map((msg, i) => {
          return (
            <div key={i} ref={messages.length - 1 === i ? chatScrollRef : null}>
              <Chat role={msg.role} message={msg.content} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Chat = ({ role, message }: { role: string; message: string }) => {
  const roleColor =
    role === 'assistant' ? 'bg-secondary text-white ' : 'bg-base text-primary'
  const roleText = role === 'assistant' ? 'text-secondary' : 'text-primary'
  const offsetX = role === 'user' ? 'pl-40' : 'pr-40'


  const removeEmotionTags = (text: string): string => {
    return text.replace(/\[\w+\]/g, '').trim()
  }

  return (
    <div className={`mx-auto max-w-sm my-16 ${offsetX}`}>
      <div
        className={`px-24 py-8 rounded-t-8 font-bold tracking-wider ${roleColor}`}
      >
        {role === 'assistant' ? 'CHARACTER' : 'YOU'}
      </div>
      <div className="px-24 py-16 bg-white rounded-b-8">
        <div className={`typography-16 font-bold ${roleText}`}>
          {removeEmotionTags(message)}
        </div>
      </div>
    </div>
  )
}
