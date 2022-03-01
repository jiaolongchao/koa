const Koa = require('koa');
const app = new Koa();

app.use(async (ctx,next) =>{
    const start = Date.now()
    await next()
    const end = Date.now()
    console.log(`请求${ctx.url}时间${end - start}`)
})

app.use((ctx,next) =>{
    const expire = Date.now() + 300
    while(Date.now() < expire)
    ctx.body = {
        name : "tom"
    }
})

app.listen(3000)