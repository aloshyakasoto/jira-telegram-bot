import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params: { issueKey } }: { params: { issueKey: string } }) {
  const secretToken = process.env.JIRA_SECRET_TOKEN
  const providedToken = req.headers.get('x-atlassian-token')

  if (providedToken === secretToken) {
    const eventData = await req.json()
    console.log('Jira Event Received:', { issueKey, eventData })
    return NextResponse.json({ message: 'Event received successfully' }, { status: 200 })
  } else {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
}
