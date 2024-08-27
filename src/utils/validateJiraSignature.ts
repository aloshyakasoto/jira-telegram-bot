import crypto from 'crypto'

/**
 * Validates the HMAC SHA-256 signature sent by Jira.
 *
 * @param secret - The secret token used to calculate the HMAC.
 * @param payload - The raw body of the request.
 * @param signature - The signature received from Jira in the format "sha256=<signature>".
 * @returns boolean - Returns true if the signatures match, false otherwise.
 */
export function validateJiraSignature(secret: string, payload: string, signature: string): boolean {
  // Check if the signature is in the correct format
  const [method, sentSignature] = signature.split('=')

  // Ensure the method is sha256
  if (method !== 'sha256') {
    return false
  }

  // Calculate the HMAC using the secret and payload
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload, 'utf-8')
  const expectedSignature = hmac.digest('hex')

  // Compare the signatures using a timing-safe comparison
  return crypto.timingSafeEqual(Buffer.from(sentSignature), Buffer.from(expectedSignature))
}
