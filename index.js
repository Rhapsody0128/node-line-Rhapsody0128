import linebot from 'linebot'
// 引用linebot套件
import dotenvf from 'dotenv'
// 引用dotenv套件
import rp from 'request-promise'

dotenvf.config()
// 讀取.env檔

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', async (event) => {
  // 當收到訊息時

  let msg = ''
  try {
    const data = await rp({ uri: 'https://kktix.com/events.json', json: true })
    msg = data.entry[0].title
  } catch (error) {
    msg = '發生錯誤'
  }
  event.reply(msg)
})

bot.listen('/', process.env.PORT, () => {
  // 在port啟動
  console.log('機器人已啟動')
})
