import { koeiromapV0, koeiromapFreeV1 } from "../koeiromap/koeiromap";
import { TalkStyle } from "../messages/messages";

export async function synthesizeVoice(
  message: string,
  speaker_x: number,
  speaker_y: number,
  style: TalkStyle
) {
  const koeiroRes = await koeiromapV0(message, speaker_x, speaker_y, style);
  return { audio: koeiroRes.audio };
}

export async function synthesizeVoiceV1(
  message: string,
  speaker_x: number,
  speaker_y: number,
  style: TalkStyle,
  apiKey: string
) {
  // Free向けに感情を制限する
  let limitedStyle: "talk" | "happy" | "sad";
  if (style == "talk" || style == "happy" || style == "sad") {
    limitedStyle = style;
  } else {
    limitedStyle = "talk";
  }

  const koeiroRes = await koeiromapFreeV1(
    message,
    speaker_x,
    speaker_y,
    limitedStyle,
    apiKey
  );
  return { audio: koeiroRes.audio };
}

export async function synthesizeVoiceApi(
  message: string,
  speaker_x: number,
  speaker_y: number,
  style: TalkStyle,
  apiKey: string
) {
  const body = {
    message: message,
    speaker_x: speaker_x,
    speaker_y: speaker_y,
    style: style,
    apiKey: apiKey,
  };

  const res = await fetch("/api/tts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as any;

  return { audio: data.audio };
}
