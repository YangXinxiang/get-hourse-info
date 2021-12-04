// 入口方法
const {parse} = require("./parser")
const {pageStr : totalStr} =require("./data")

function start() {
    console.log(`start :: enter`)
    const result = parse(totalStr)
    console.log(`start :: end`)
    console.log(result)
}
start()