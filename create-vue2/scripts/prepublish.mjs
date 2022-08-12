#!/usr/bin/env zx
import 'zx/globals'

await $`pnpm build`
await $`pnpm snapshot`

let { version } = JSON.parse(await fs.readFile('./package.json'))

const projectRoot = path.resolve(__dirname, '../../')
cd(projectRoot)
await $`git add -A .`
await $`git tag -m "v${version}" v${version}`
try {
  await $`git commit -m "version ${version}"`
  await $`git push origin`
} catch (e) {
  if (!e.stdout.includes('nothing to commit')) {
    throw e
  }
}
