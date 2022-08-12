const { warn } = require('./logger')

// 计算字符串的相似程度
const levenshteinDistance = (str1 = '', str2 = '') => {
  const rows = str1.length
  const cols = str2.length

  const lev = new Array(rows + 1).fill(0).map(() => new Array(cols + 1).fill(0))

  for (let i = 0; i < rows + 1; i++) {
    lev[i][0] = i
  }

  for (let j = 0; j < cols + 1; j++) {
    lev[0][j] = j
  }

  for (let i = 1; i < rows + 1; i++) {
    for (let j = 1; j < cols + 1; j++) {
      lev[i][j] = Math.min(
        lev[i - 1][j] + 1,
        lev[i][j - 1] + 1,
        lev[i - 1][j - 1] + (str1[i - 1] !== str2[j - 1])
      )
    }
  }

  return lev[rows][cols]
}

// 获取相似的page名称
const getSimilarPage = (pageList = [], inputName = '') => {
  let minDistance = 1 // 相似距离，目前设置为1
  let similarPage = ''

  for (const page of pageList) {
    const distance = levenshteinDistance(page.toLowerCase(), inputName.toLowerCase())

    if (distance <= minDistance) {
      minDistance = distance
      similarPage = page
      break
    }
  }

  // 提示相似页面
  if (similarPage && similarPage !== inputName) {
    warn(`page名称：${inputName} 已修正为：${similarPage}`)
  }

  return similarPage
}

// 获取更正后的页面名称，如果返回为空，则不加入最终结果
const getCorrectPageNames = (entryPage = [], pageList = []) => {
  const correctPageNames = []

  entryPage.forEach((item) => {
    const rightName = getSimilarPage(pageList, item)

    rightName && correctPageNames.push(rightName)
  })

  return correctPageNames
}

module.exports = {
  getCorrectPageNames
}
