const http = require('http')
const content = require('./context')
const request = require('./request')
const response = require('./response')
class KKB {
  constructor() {
    this.middlewares = []
  }
  use(middlewares) {
    // this.callback = callback
    this.middlewares.push(middlewares)
  }
  listen(...args) {
    const server = http.createServer(async (req, res) => {
      // this.callback(req,res)
      const ctx = this.createContext(req, res)
      // this.callback(ctx)
      const fn = this.compose(this.middlewares) //组合函数
      await fn(ctx)
      //响应
      res.end(ctx.body)
    })
    server.listen(...args)
  }

  createContext(req, res) {
    const ctx = Object.create(content)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)

    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res
    return ctx
  }

  compose(middlewares) {
    return function (ctx) {
      return dispatch(0) // 执行第0个
      function dispatch(i) {
        let fn = middlewares[i]
        if (!fn) {
          return Promise.resolve()
        }
        return Promise.resolve(
          fn(ctx, function next() {
            // promise完成后，再执行下一个
            return dispatch(i + 1)
          }),
        )
      }
    }
  }
}

module.exports = KKB
