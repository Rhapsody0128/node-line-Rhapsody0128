import linebot from 'linebot'
// 引用linebot套件
import dotenvf from 'dotenv'
// 引用dotenv套件
import rp from 'request-promise'
import cheerio from 'cheerio'

dotenvf.config()
// 讀取.env檔

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

const img = async () => {
  const findnum = async () => {
    const html = await rp('https://memes.tw/all-images')
    const $ = cheerio.load(html)
    const num = $('.flexbin.flexbin-margin.mt-2').eq(0).find('a').attr('href').slice(7, 20)
    const rand = Math.floor(Math.random() * parseInt(num)) + 1
    return rand
  }
  let re = {}
  const rand = await findnum()

  try {
    let found = ''
    while (found.length === 0) {
      const html = await rp('https://memes.tw/image/' + rand)
      const $ = cheerio.load(html)
      if ($('.text-center.mt-3 img').attr('src') !== undefined) {
        found = $('.text-center.mt-3 img').attr('src')
      }
    }
    re = {
      type: 'image',
      originalContentUrl: found,
      previewImageUrl: found
    }
  } catch (error) {
    re = {
      type: 'text',
      text: '錯誤'
    }
  }
  return re
}
const wtf = async () => {
  const findnum = async () => {
    const html = await rp('https://memes.tw/wtf/')
    const $ = cheerio.load(html)
    const num = $('.col-lg-8.text-center').eq(0).find('a').attr('href').slice(5, 20)
    const rand = Math.floor(Math.random() * parseInt(num)) + 1
    return rand
  }
  let re = {}
  const rand = await findnum()

  try {
    let found = ''

    while (found.length === 0) {
      const html = await rp('https://memes.tw/wtf/' + rand)
      const $ = cheerio.load(html)
      if ($('.text-center.mb-2 img').attr('src') !== undefined) {
        found = $('.text-center.mb-2 img').attr('src')
      }
    }
    re = {
      type: 'image',
      originalContentUrl: found,
      previewImageUrl: found
    }
  } catch (error) {
    re = {
      type: 'text',
      text: '錯誤'
    }
  }
  return re
}

const search = async (keyword) => {
  let re = []
  const array = []
  try {
    const html = await rp('https://memes.tw/maker?q=' + encodeURI(keyword))

    const $ = cheerio.load(html)

    for (let i = 0; i < $('.-shadow.mt-3.mx-2').length; i++) {
      array.push($('.mt-3.mx-2').eq(i).find('img').attr('src'))
    }

    for (let i = 0; i < 5; i++) {
      re.push({
        type: 'image',
        originalContentUrl: array[i],
        previewImageUrl: array[i]
      })
    }
  } catch (error) {
    console.log(error.message)

    if (error.name === 'StatusCodeError' && error.statusCode === 404) {
      search()
    } else {
      re = {
        type: 'text',
        text: '錯誤'
      }
    }
  }
  console.log(re)
  return re
}

const hot = async (x) => {
  let re = []
  const array = []
  try {
    const html = await rp('https://memes.tw/wtf?sort=hot')
    const $ = cheerio.load(html)

    for (let i = 0; i < $('.col-lg-8.text-center').length; i++) {
      array.push($('.col-lg-8.text-center').eq(i).find('img').attr('data-src'))
    }
    for (let i = x; i < x + 5; i++) {
      re.push({
        type: 'image',
        originalContentUrl: array[i],
        previewImageUrl: array[i]
      })
    }
  } catch (error) {
    console.log(error)
    re = {
      type: 'text',
      text: '錯誤'
    }
  }
  console.log(re)
  return re
}

const newpic = async (x) => {
  let re = []
  const array = []
  try {
    const html = await rp('https://memes.tw/wtf?sort=new')
    const $ = cheerio.load(html)

    for (let i = 0; i < $('.col-lg-8.text-center').length; i++) {
      array.push($('.col-lg-8.text-center').eq(i).find('img').attr('data-src'))
    }
    for (let i = x; i < x + 5; i++) {
      re.push({
        type: 'image',
        originalContentUrl: array[i],
        previewImageUrl: array[i]
      })
    }
  } catch (error) {
    console.log(error)
    re = {
      type: 'text',
      text: '錯誤'
    }
  }
  console.log(re)
  return re
}

const week = async (x) => {
  let re = []
  const array = []
  try {
    const html = await rp('https://memes.tw/wtf?sort=top-week')
    const $ = cheerio.load(html)

    for (let i = 0; i < $('.col-lg-8.text-center').length; i++) {
      array.push($('.col-lg-8.text-center').eq(i).find('img').attr('data-src'))
    }

    for (let i = x; i < x + 5; i++) {
      re.push({
        type: 'image',
        originalContentUrl: array[i],
        previewImageUrl: array[i]
      })
    }
  } catch (error) {
    console.log(error)
    re = {
      type: 'text',
      text: '錯誤'
    }
  }
  console.log(re)
  return re
}
// week(0)
const month = async (x) => {
  let re = []
  const array = []
  try {
    const html = await rp('https://memes.tw/wtf?sort=top-month')
    const $ = cheerio.load(html)
    for (let i = 0; i < $('.col-lg-8.text-center').length; i++) {
      array.push($('.col-lg-8.text-center').eq(i).find('img').attr('data-src'))
    }

    for (let i = x; i < x + 5; i++) {
      re.push({
        type: 'image',
        originalContentUrl: array[i],
        previewImageUrl: array[i]
      })
    }
  } catch (error) {
    re = {
      type: 'text',
      text: '錯誤'
    }
  }
  return re
}

const year = async (x) => {
  let re = []
  const array = []
  try {
    const html = await rp('https://memes.tw/wtf?sort=top-year')
    const $ = cheerio.load(html)
    for (let i = 0; i < $('.col-lg-8.text-center').length; i++) {
      array.push($('.col-lg-8.text-center').eq(i).find('img').attr('data-src'))
    }

    for (let i = x; i < x + 5; i++) {
      re.push({
        type: 'image',
        originalContentUrl: array[i],
        previewImageUrl: array[i]
      })
    }
  } catch (error) {
    re = {
      type: 'text',
      text: '錯誤'
    }
  }
  return re
}

bot.listen('/', process.env.PORT, () => {
  // 在port啟動
  console.log('機器人已啟動')
})
bot.on('message', async (event) => {
  // 當收到訊息時
  console.log(event)
  let reply = {}
  let x = parseInt(event.message.text)
  if (isNaN(x)) {
    x = ''
  }
  if (event.message.text.includes('找')) {
    reply = await search(event.message.text.slice(1, 15))
  } else {
    switch (event.message.text) {
      case '隨機':
        reply = await img()
        break
      case '抽':
        reply = await wtf()
        break
      case `${x}新`:
        reply = await newpic(0 + x)
        break
      case `${x}熱`:
        reply = await hot(0 + x)
        break
      case `${x}週`:
        reply = await week(0 + x)
        break
      case `${x}月`:
        reply = await month(0 + x)
        break
      case `${x}年`:
        reply = await year(0 + x)
        break
      case '功能':
        reply = '☑隨機：隨機抽取一張梗圖\n☑抽：隨機抽網友做的梗圖\n☑週：每週排行列出五張圖\n☑月：每月排行列出五張圖\n☑年：年度排行列出五張圖\n☑新：最新排行列出五張圖\n☑熱：熱門排行列出五張圖\n☑找x：搜尋x關鍵字的圖\n\n(年、月、週、熱、新，五個指令前面可以輸入數字，會從第n個排行{排行榜共20張}的圖後列出五張圖，沒輸入會預設最高排行的5張，  Ex:7週)'
        break
    }
  }
  event.reply(reply)
})
