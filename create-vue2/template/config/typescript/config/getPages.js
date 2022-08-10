const templateFile = 'public/index.html'

const pages = {
  index: {
    entry: 'src/pages/index/index.ts',
    template: templateFile,
    filename: 'index/index.html',
    title: 'welcome'
  }
}

module.exports = () => ({
  ...pages
})
