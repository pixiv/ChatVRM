// pages/api/synthesis.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const host = '127.0.0.1'
const port = 50021
const maxRetry = 20

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const message = req.body.message.trim()

  try {
    const audioQueryUrl = new URL(`http://${host}:${port}/audio_query`)
    audioQueryUrl.searchParams.append('text', message)
    audioQueryUrl.searchParams.append('speaker', '1')
    let queryData

    for (let query_i = 0; query_i < maxRetry; query_i++) {
      const queryResponse = await fetch(audioQueryUrl.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (queryResponse.ok) {
        queryData = await queryResponse.json()
        break
      } else if (!queryResponse.ok) {
        const errorMessage = await queryResponse.text()
        console.error('Error from audio_query:', errorMessage)
        throw new Error(`Error from audio_query: ${errorMessage}`)
      }

      await new Promise((r) => setTimeout(r, 1000))
    }

    if (!queryData) {
      throw new Error('Failed to get audio query data.')
    }

    let wavData

    const synthUrl = new URL(`http://${host}:${port}/synthesis`)
    synthUrl.searchParams.append('speaker', '1')

    for (let synth_i = 0; synth_i < maxRetry; synth_i++) {
      const synthResponse = await fetch(synthUrl.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...queryData,
          speedScale: 1.2,
          pitchScale: 0.0,
          intonationScale: 1.0,
        }),
      })

      if (synthResponse.ok) {
        wavData = await synthResponse.buffer()
        break
      } else if (!synthResponse.ok) {
        const errorMessage = await synthResponse.text()
        console.error('Error from synthesis:', errorMessage)
        throw new Error(`Error from synthesis: ${errorMessage}`)
      }

      await new Promise((r) => setTimeout(r, 1000))
    }

    if (!wavData) {
      throw new Error('Failed to synthesize audio.')
    }

    res.setHeader('Content-Type', 'audio/wav')
    res.status(200).send(wavData)
  } catch (error) {
    console.error('Error during synthesis:', error)
    res
      .status(500)
      .json({ error: `An error occurred during synthesis: ${error.message}` })
  }
}
