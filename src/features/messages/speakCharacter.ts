import { wait } from '@/utils/wait'
import { Viewer } from '../vrmViewer/viewer'
import { Screenplay, Talk } from './messages'
import { synthesizeVoiceApi } from './synthesizeVoice'

const createSpeakCharacter = () => {
  let audioContext: AudioContext | null = null

  async function playWavAudio(arrayBuffer): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!audioContext) {
        audioContext = new AudioContext()
      }
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
      const source = audioContext.createBufferSource()
      source.buffer = audioBuffer
      source.connect(audioContext.destination)
      source.onended = (event) => resolve() // 音声再生が完了したときにresolveを呼び出す
      source.start()
    })
  }

  let lastTime = 0
  let prevFetchPromise: Promise<unknown> = Promise.resolve()
  let prevSpeakPromise: Promise<unknown> = Promise.resolve()

  return (
    screenplay: Screenplay,
    viewer: Viewer,
    koeiroApiKey: string,
    onStart?: () => void,
    onComplete?: () => void
  ) => {
    const fetchPromise = prevFetchPromise.then(async () => {
      const now = Date.now()
      if (now - lastTime < 1000) {
        await wait(1000 - (now - lastTime))
      }

      const buffer = await fetchAudio(screenplay.talk, koeiroApiKey).catch(
        () => null
      )
      lastTime = Date.now()
      return buffer
    })

    prevFetchPromise = fetchPromise
    prevSpeakPromise = Promise.all([fetchPromise, prevSpeakPromise]).then(
      async ([audioBuffer]) => {
        onStart?.()
        if (audioBuffer) {
          await playWavAudio(audioBuffer)
        }
      }
    )
    prevSpeakPromise.then(() => {
      onComplete?.()
    })
  }
}

export const speakCharacter = createSpeakCharacter()

export const fetchAudio = async (
  talk: Talk,
  apiKey: string
): Promise<ArrayBuffer> => {
  return synthesizeVoiceApi(
    talk.message,
    talk.speakerX,
    talk.speakerY,
    talk.style,
    apiKey
  )
}
