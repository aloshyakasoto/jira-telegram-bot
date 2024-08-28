/**
 * Maps a status to its corresponding moon phase icon.
 *
 * @param status - The status to be mapped.
 * @returns The corresponding moon phase icon, or a default icon (🌑) if no match is found.
 */
export function getStatusIcon(status: string): string {
  switch (status.toUpperCase()) {
    case 'TODO':
      return '🌘' // Waxing Crescent (TODO)
    case 'DOING':
      return '🌗' // First Quarter (DOING)
    case 'TESTING':
      return '🌖' // Waxing Gibbous (TESTING)
    case 'DONE':
      return '🌕' // Full Moon (DONE)
    default:
      return '🌑' // New Moon (Default for unknown status)
  }
}
