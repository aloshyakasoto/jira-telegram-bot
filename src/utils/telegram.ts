const TelegramBot = require('node-telegram-bot-api')

const token = process.env.TELEGRAM_BOT_TOKEN
const chatId = process.env.TELEGRAM_CHAT_ID

if (!token || !chatId) {
  throw new Error('Missing required environment variables for Telegram bot')
}

const bot = new TelegramBot(token, {
  polling: false // Disable polling as we don't listen for messages for now
})

export function sendTelegramMessage(message: string): Promise<void> {
  if (!message) {
    return Promise.reject(new Error('Message content cannot be empty'))
  }

  return bot
    .sendMessage(chatId, message, {
      parse_mode: 'HTML',
      disable_web_page_preview: true
    })
    .then(() => {
      console.log('Message sent successfully')
    })
    .catch((error: any) => {
      console.error('Error sending message:', error)
    })
}
