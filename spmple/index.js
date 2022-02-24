const Koa = require('koa');
const app = new Koa();

app.use(async (ctx,next) =>{
    const start = new Date()
    await next()
    const end = new Date()
    console.log(`请求${ctx.url}时间${end - start}`)
})

app.use((ctx,next) =>{
    const expire = Date.now() + 100
    while(Date.now() < expire)
    ctx.body = {
        name : "tom"
    }
})

app.listen(3000)