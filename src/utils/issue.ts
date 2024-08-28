import { JsonResponse } from 'jira-client'
import { isAssigneeChange, isStatusChange } from '@/utils/changelog'
import { composeMessage } from '@/utils/message'

export function getDebrief(event: JsonResponse): string | undefined {
  if (
    isAssigneeChange(event) ||
    // isPriorityChange(event) ||
    // isSummaryChange(event) ||
    // isDescriptionChange(event) ||
    isStatusChange(event)
  ) {
    return composeMessage(event)
  }
}

export function getIssueTypeIcon(issueType?: string): string {
  switch (issueType) {
    case 'Task':
      return '☀️'
    case 'Sub-task':
      return '🔅'
    case 'Story':
      return '⭐️'
    case 'Bug':
      return '🐞'
    case 'Epic':
      return '🌟'
    default:
      return '💥'
  }
}
