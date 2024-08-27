import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest, { params: { issueKey } }: { params: { issueKey: string } }) {
  const secretToken = process.env.JIRA_SECRET_TOKEN
  const signature = req.headers.get('x-hub-signature')

  if (!secretToken) {
    return NextResponse.json({ message: 'Forbidden: Missing secret token' }, { status: 403 })
  }

  if (!signature) {
    return NextResponse.json({ message: 'Forbidden: Missing signature' }, { status: 403 })
  }

  // Extract the hash method and signature from the header
  const [method, sentSignature] = signature.split('=')

  if (method !== 'sha256') {
    return NextResponse.json({ message: 'Forbidden: Unsupported signature method' }, { status: 403 })
  }

  // Calculate the expected signature using HMAC with the payload and the secret
  const body = await req.text() // Get the raw text body for HMAC calculation
  const hmac = crypto.createHmac('sha256', secretToken)
  hmac.update(body, 'utf-8')
  const expectedSignature = hmac.digest('hex')

  // Compare the signatures
  if (crypto.timingSafeEqual(Buffer.from(sentSignature), Buffer.from(expectedSignature))) {
    console.log('Signatures match. Jira Event Received:', { issueKey, body })

    // Return a success response
    return NextResponse.json({ message: 'Event received successfully' }, { status: 200 })
  } else {
    // Return a forbidden response if the signatures don't match
    return NextResponse.json({ message: 'Forbidden: Invalid signature' }, { status: 403 })
  }
}
