import Router from 'koa-router'
import compose from 'koa-compose'

import { handleCSS, handleHTML, handleModule, handleJS, handleVue } from './handler'

const router = new Router()

router.get('/', handleHTML)
router.get(/^\/@modules\//, handleModule)
router.get(/.css/, handleCSS)
router.get(/.vue/, handleVue)
router.get(/.js$/, handleJS)

export default function routes(app) {
  app.use(compose([
      router.routes(),
      router.allowedMethods()
  ]));
}
