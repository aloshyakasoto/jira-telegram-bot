let assigneeUsernameMap: { [key: string]: string } = {}

// Load the mapping from the environment variable
const assigneeMapEnv = process.env.ASSIGNEE_TELEGRAM_IDS

if (assigneeMapEnv) {
  try {
    assigneeUsernameMap = JSON.parse(assigneeMapEnv)
  } catch (error) {
    console.error('Error parsing ASSIGNEE_TELEGRAM_IDS from ENV:', error)
    assigneeUsernameMap = {}
  }
} else {
  console.warn('ASSIGNEE_TELEGRAM_IDS environment variable does not exist. Using an empty mapping.')
}

/**
 * Maps an assignee's full name to their corresponding Telegram username.
 *
 * @param assigneeName - The full name of the assignee.
 * @returns The corresponding Telegram username, or the original name if no match is found.
 */
export function mapAssigneeNameToTGId(assigneeName: string): string {
  return assigneeUsernameMap[assigneeName] || assigneeName // Return the name itself if no match is found
}
