import { koeiromapFreeV1 } from "@/features/koeiromap/koeiromap";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  audio: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const message = req.body.message;
  const speaker_x = req.body.speakerX;
  const speaker_y = req.body.speakerY;
  const style = req.body.style;
  const apiKey = req.body.apiKey;

  const voice = await koeiromapFreeV1(
    message,
    speaker_x,
    speaker_y,
    style,
    apiKey
  );

  res.status(200).json(voice);
}
