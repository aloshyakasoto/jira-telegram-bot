import { FieldObject, JsonResponse } from 'jira-client'

export function getChangeTypes(event: JsonResponse): string[] {
  if (event.changelog) {
    return event.changelog.items.map((item: FieldObject) => item.field as string)
  } else {
    return []
  }
}

export function checkChangeType(issue: JsonResponse, type: string): boolean {
  return getChangeTypes(issue).includes(type)
}

export function isAssigneeChange(issue: JsonResponse): boolean {
  return checkChangeType(issue, 'assignee')
}

export function isPriorityChange(issue: JsonResponse): boolean {
  return checkChangeType(issue, 'priority')
}

export function isSummaryChange(issue: JsonResponse): boolean {
  return checkChangeType(issue, 'summary')
}

export function isDescriptionChange(issue: JsonResponse): boolean {
  return checkChangeType(issue, 'description')
}

export function isStatusChange(issue: JsonResponse): boolean {
  return checkChangeType(issue, 'status')
}

export function getNewAssignee(issue: JsonResponse): string {
  return issue.changelog.items.find((item: FieldObject) => item.field === 'assignee')?.toString || ''
}

export function getNewPriority(issue: JsonResponse): string {
  return issue.changelog.items.find((item: FieldObject) => item.field === 'priority')?.toString || ''
}

export function getNewSummary(issue: JsonResponse): string {
  return issue.changelog.items.find((item: FieldObject) => item.field === 'summary')?.toString || ''
}

export function getNewDescription(issue: JsonResponse): string {
  return issue.changelog.items.find((item: FieldObject) => item.field === 'description')?.toString || ''
}

export function getNewStatus(issue: JsonResponse): string {
  return issue.changelog.items.find((item: FieldObject) => item.field === 'status')?.toString || ''
}

export function getChangeLog(issue: JsonResponse): string {
  if (isAssigneeChange(issue)) {
    return `Assigned to ${getNewAssignee(issue)}`
  } else if (isPriorityChange(issue)) {
    return `Priority is ${getNewPriority(issue)}`
  } else if (isSummaryChange(issue)) {
    return `New Summary is ${getNewSummary(issue)}`
  } else if (isDescriptionChange(issue)) {
    return `New Description is ${getNewDescription(issue)}`
  } else if (isStatusChange(issue)) {
    return `Moved to ${getNewStatus(issue)}`
  } else {
    return 'No changes detected'
  }
}
