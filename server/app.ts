import Koa from 'koa'
import os from 'os'
import chalk from 'chalk'

import routes from './routes'

const app = new Koa()

;(async function() {
  routes(app)
})()

//todo
const options: any = {}

const start = Date.now()

app.listen(3000, () => {
  let port = options.port || 3000
  let hostname = options.hostname || 'localhost'
  const protocol = options.https ? 'https' : 'http'
  console.log()
  console.log(`  Dev server running at:`)
  const interfaces = os.networkInterfaces()
  Object.keys(interfaces).forEach((key) => {
    ;(interfaces[key] || [])
      .filter((details) => details.family === 'IPv4')
      .map((detail) => {
        return {
          type: detail.address.includes('127.0.0.1')
            ? 'Local:   '
            : 'Network: ',
          host: detail.address.replace('127.0.0.1', hostname)
        }
      })
      .forEach(({ type, host }) => {
        const url = `${protocol}://${host}:${chalk.bold(port)}/`
        console.log(`  > ${type} ${chalk.cyan(url)}`)
      })
  })
  console.log()
  require('debug')('vite:server')(`server ready in ${Date.now() - start}ms.`)

})
