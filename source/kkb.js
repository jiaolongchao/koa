const http = require('http')
const content = require('./context');
const request = require('./request');
const response = require('./response');
class KKB{
    constructor(){

    }
    use(callback){
        this.callback = callback
    }
    listen(...args){
        const server = http.createServer((req,res) =>{
            // this.callback(req,res)
            const ctx = this.createContext(req,res)
            this.callback(ctx)

            //响应
            res.end(ctx.body)
        })
        server.listen(...args)
    }

    createContext(req,res){
        const ctx = Object.create(content);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);

        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }
}

module.exports = KKB