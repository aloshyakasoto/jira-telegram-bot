import fs from 'fs'
import path from 'path'

let assigneeUsernameMap: { [key: string]: string } = {}

// Load the JSON file if it exists
const assigneeMapPath = path.resolve(process.cwd(), '@/../data/assigneeTelegramIds.json')

if (fs.existsSync(assigneeMapPath)) {
  try {
    const fileContent = fs.readFileSync(assigneeMapPath, 'utf-8')
    assigneeUsernameMap = fileContent ? JSON.parse(fileContent) : {}
  } catch (error) {
    console.error('Error reading or parsing assigneeTelegramIds.json:', error)
    assigneeUsernameMap = {}
  }
} else {
  console.warn('assigneeTelegramIds.json does not exist. Using an empty mapping.')
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
