//通过一个组合函数 去捏合洋葱圈模式
// const add = (x, y) => x + y
// const squary = (z) => z * z
// // const fn = (x,y) => squary(add(x,y))
// //const componse = (fn1,fn2) => (...args) => fn2(fn1(...args))
// const componse = (...[first, ...other]) => (...args) => {
//   let ret = first(...args)
//   other.forEach((fn) => {
//     ret = fn(ret)
//   })
//   return ret
// }
// const fn = componse(add, squary , squary)
// console.log(fn(1, 2))

//async的本质就是执行承诺

function compose(middlewares) {
  return function () {
    return dispatch(0) // 执行第0个
    function dispatch(i) {
      let fn = middlewares[i]
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(
        fn(function next() {
          // promise完成后，再执行下一个
          return dispatch(i + 1)
        }),
      )
    }
  }
}
async function fn1(next) {
  console.log('f1start')
  await next()
  console.log('f1end')
}

async function fn2(next) {
  console.log('fn2')
  await delay()
  await next()
  console.log('end fn2')
}
function fn3(next) {
  console.log('fn3')
}

function delay() {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove()
    }, 2000)
  })
}

const middlewrea = [fn1, fn2, fn3]
let f = compose(middlewrea)
f()

//世界上优秀成程序的特别，用相对比较简单的函数来分函数
