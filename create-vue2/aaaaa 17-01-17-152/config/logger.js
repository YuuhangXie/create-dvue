const chalk = require('chalk')

const info = (...messages) => {
  console.info(...[chalk.green('[info]:'), ...messages])
}

const warn = (...messages) => {
  console.warn(...[chalk.yellow('[warn]:'), ...messages])
}

const error = (...messages) => {
  console.log(...[chalk.red('[error]:'), ...messages])
}

module.exports = { info, warn, error }
