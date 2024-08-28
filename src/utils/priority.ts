export function getPriorityIcon(priority?: string): string {
  switch (priority) {
    case 'Highest':
      return '‼️'
    case 'High':
      return '❗'
    case 'Medium':
      return ''
    case 'Low':
      return ''
    case 'Lowest':
      return ''
    default:
      return ''
  }
}
