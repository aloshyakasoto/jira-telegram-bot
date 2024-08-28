import { JsonResponse } from 'jira-client'
import { getPriorityIcon } from '@/utils/priority'
import { mapAssigneeNameToTGId } from '@/utils/assignee'
import { getStatusIcon } from '@/utils/status'
import { getIssueTypeIcon } from '@/utils/issue'

export function composeMessage(event: JsonResponse): string {
  // Extract relevant fields from the event data
  const priorityName = event.issue?.fields?.priority?.name || 'Low'
  const issueTypeName = event.issue?.fields?.issuetype?.name || 'Task'
  const assigneeName = event.issue?.fields?.assignee?.displayName || ''
  const issueSummary = event.issue?.fields?.summary || 'Untitled'
  const issueDescription = event.issue?.fields?.description
  const issueKey = event.issue?.key || 'DEV-0'
  const status = event.issue?.fields?.status?.name || ''
  const serverUrl = process.env.JIRA_SERVICE_URL

  // Build the message components
  const priorityIcon = getPriorityIcon(priorityName)
  const summaryMarkup = `<b>${issueSummary}</b>`
  const issueTypeIcon = getIssueTypeIcon(issueTypeName)
  const descriptionMarkup = issueDescription ? `\n<blockquote>${issueDescription}</blockquote>` : ''
  const statusIcon = getStatusIcon(status)
  const issueLink = `<a href="${serverUrl ? `${serverUrl}/browse/${issueKey}` : issueKey}">${issueKey}</a>`
  const assigneeTGId = mapAssigneeNameToTGId(assigneeName).toUpperCase()

  // Compose the final message
  return `${priorityIcon}${issueTypeIcon}${summaryMarkup}${descriptionMarkup}\n${issueLink} | ${status} | ${assigneeTGId}`
}
