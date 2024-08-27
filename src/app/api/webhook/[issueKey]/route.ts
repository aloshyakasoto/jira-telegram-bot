import { NextRequest, NextResponse } from 'next/server'
import { validateJiraSignature } from '@/utils/validateJiraSignature'

export async function POST(req: NextRequest, { params: { issueKey } }: { params: { issueKey: string } }) {
  const secretToken = process.env.JIRA_SECRET_TOKEN
  const signature = req.headers.get('X-Hub-Signature')

  if (!secretToken) {
    return NextResponse.json({ message: 'Forbidden: Missing secret token in ENV' }, { status: 500 })
  }

  if (!signature) {
    return NextResponse.json({ message: 'Forbidden: Missing signature' }, { status: 403 })
  }

  const body = await req.text() // Get the raw text body for HMAC calculation

  if (validateJiraSignature(secretToken, body, signature)) {
    console.log('Signatures match. Jira Event Received:', { issueKey, body })

    // Return a success response
    return NextResponse.json({ message: 'Event received successfully' }, { status: 200 })
  } else {
    // Return a forbidden response if the signatures don't match
    return NextResponse.json({ message: 'Forbidden: Invalid signature' }, { status: 403 })
  }
}
