const KKB = require("./kkb");
const app = new KKB();



app.use(ctx =>{
    ctx.body = 'xxx'
})

app.use(ctx =>{
    ctx.body = 'bb'
})

//优雅api proxy代理对象 这里我们劫持了属性 

app.listen(3000,() => {
    console.log('监听端口 3000')
})