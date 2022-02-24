const KKB = require("./kkb");
const app = new KKB();

app.use((req,res) => {
    res.writeHead(200);
    res.end("hi kaikeba");
})

app.listen(3001,() => {
    console.log('监听端口 3000')
})