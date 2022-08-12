const { spawn } = require('child_process')
const args = require('yargs').argv
const readline = require('readline')

const { info, warn } = require('./logger')
const getPages = require('./getPages')
const getQuickStartAlias = require('./quickStartAlias')
const { getCorrectPageNames } = require('./similarPage')

const allPageNames = Object.keys(getPages()) // 所有获取所有的pages映射
const pageAlias = getQuickStartAlias() // 获取页面组合别名
const allPageAlias = Object.keys(pageAlias) // 别名页面key值
const completeNames = [...allPageNames, ...allPageAlias] // 所有完整补全信息
let entryPage = [] // 需要启动页面

// 逐行读取命令
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer
})

// question的promise模式
const question = (content) =>
  new Promise((resolve) => {
    rl.question(content, (answer) => {
      resolve(answer)
    })
  })

;(async () => {
  info('输入参数: ', args._)
  const buildDir = args._

  // 未输入任何参数时，提示用户输入
  if (!buildDir || !Array.isArray(buildDir) || !buildDir.length) {
    warn('未输入page参数，启动所有页面内存压力较大，建议按需启动page。')
    const answer = await question('【多个page用空格隔开，输入回车启动】请输入page: ')

    info('获取参数如下', answer)
    entryPage = answer.split(' ')
    rl.close()
  } else {
    entryPage = buildDir.slice(0)
  }

  // 修正有些许误差的page名称
  entryPage = getCorrectPageNames(entryPage, allPageNames)

  // 获取其中快捷启动的别名
  const quickStartPages = entryPage.filter((item) => allPageAlias.includes(item))

  // 添加快速启动页面
  quickStartPages.forEach((quickItem) => {
    entryPage = entryPage.concat(pageAlias[quickItem])
  })
  // 以allPageNames为全集，不再此集合中的数据过滤掉
  entryPage = entryPage.filter((item) => allPageNames.includes(item))
  // 快速启动和普通页面进行去重
  entryPage = Array.from(new Set(entryPage))
  process.env.VUE_APP_ENTRY = entryPage.join(',')
  if (entryPage.length > 0) {
    info('即将编译如下页面：', entryPage)
  } else {
    info('即将编译全部页面')
  }

  // 执行vue本地的dev命令
  spawn('vue-cli-service', ['serve'], { stdio: 'inherit' })
})()

// 命令补全函数
function completer(line) {
  const lineList = line.split(' ')

  if (lineList.length === 0) {
    return completeNames
  }

  // 已匹配的参数此处做备份
  const hasHitsParams = lineList.slice(0, lineList.length - 1)
  // 匹配想仅匹配最新一项
  let hits = completeNames.filter((c) => c.startsWith(lineList[lineList.length - 1]))

  // 如果hits长度为1，命令输入处直接替换，此时需要将已匹配参数添加至替换内容
  if (hits.length === 1) {
    hits = [[...hasHitsParams, ...hits].join(' ')]
  } else if (hits.length > 1) {
    // 如果hits长度大于1，需要将已匹配参数添加至提示数组的末尾
    hits = [...hits, ...hasHitsParams]
  }

  // 如果有命中结果，返回命中数组；否则返回全部数组
  return [hits.length ? Array.from(new Set(hits)) : completeNames, line]
}
