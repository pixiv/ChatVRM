import { reduceTalkStyle } from "@/utils/reduceTalkStyle";
import { koeiromapV0 } from "../koeiromap/koeiromap";
import { TalkStyle } from "../messages/messages";

export async function synthesizeVoice(
  message: string,
  speakerX: number,
  speakerY: number,
  style: TalkStyle
) {
  const koeiroRes = await koeiromapV0(message, speakerX, speakerY, style);
  return { audio: koeiroRes.audio };
}

export async function synthesizeVoiceApi(
  message: string,
  speakerX: number,
  speakerY: number,
  style: TalkStyle,
  apiKey: string
) {
  // Free向けに感情を制限する
  const reducedStyle = reduceTalkStyle(style);

  const body = {
    message: message,
    speakerX: speakerX,
    speakerY: speakerY,
    style: reducedStyle,
    apiKey: apiKey,
  };
  /*
  const res = await fetch("/api/tts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as any;
  */

  // voicevox 8:春日部つむぎ
  //const voice01 = 'https://deprecatedapis.tts.quest/v2/voicevox/audio/?key=D-3-40K43_9-e68&speaker=8&pitch=0&intonationScale=1&speed=1&text='+message;

  const text = message;
  const speaker = 18;
  const host = 50025;
  const res = await fetch(`http://localhost:${host}/audio_query?text=${text}&speaker=${speaker}`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      }

  })

  const query = await res.json();
  //console.log(query);

  const sound_row = await fetch(`http://localhost:${host}/synthesis?speaker=${speaker}&enable_interrogative_upspeak=true`, {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      //'accept': 'audio/wav',
      //'response-Type': 'blob'
    },
    body: JSON.stringify(query)
  })
  //console.log(sound_row.body);

  const blob = await sound_row.blob();

  const audioUrl = URL.createObjectURL(blob);
  const audio = new Audio(audioUrl);
  //audio.play();

  /*
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'audio01.wav';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  */
  return { audio: audioUrl };
}
