import { NextRequest, NextResponse } from 'next/server'
import { validateSignature } from '@/utils/auth'
import { getDebrief } from '@/utils/issue'
import { sendTelegramMessage } from '@/utils/telegram'

export async function POST(req: NextRequest) {
  const secretToken = process.env.JIRA_SECRET_TOKEN
  const signature = req.headers.get('X-Hub-Signature')

  if (!secretToken) {
    console.error('Forbidden: Missing secret token in ENV')
    return NextResponse.json({ message: 'Forbidden: Missing secret token in ENV' }, { status: 500 })
  }

  if (!signature) {
    console.error('Forbidden: Missing signature')
    return NextResponse.json({ message: 'Forbidden: Missing signature' }, { status: 403 })
  }

  const body = await req.text() // Get the raw text body for HMAC calculation

  if (validateSignature(secretToken, body, signature)) {
    const debrief = getDebrief(JSON.parse(body))
    if (debrief) {
      console.log(`----\n${debrief}\n----`)
      await sendTelegramMessage(debrief)
    }

    // Return a success response
    return NextResponse.json({ message: 'Event received successfully' }, { status: 200 })
  } else {
    console.error('Forbidden: Invalid signature')
    return NextResponse.json({ message: 'Forbidden: Invalid signature' }, { status: 403 })
  }
}
