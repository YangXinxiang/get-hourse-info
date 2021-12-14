// 入口方法
const { parse } = require("./parser")
const { pageStr : totalStr } =require("./data/index-xj")
const { requestGet } = require("./util/request")
const urlList = [
    "https://bj.lianjia.com/ershoufang/101113284093.html",
    "https://bj.lianjia.com/ershoufang/101113721097.html",
    "https://bj.lianjia.com/ershoufang/101113448368.html",
    "https://bj.lianjia.com/ershoufang/101113523653.html?fb_expo_id=519293611880792072",
    "https://bj.lianjia.com/ershoufang/101113758572.html"
]
async function getHourseInfo(url, params=null) {
    const result = await requestGet(url,params);
    if(result && result.status === 200) {
        return result.data
    } else {
        return null
    }
}

/**
 * 获取房子的小区信息
 * @param {*} hid ，房子id，就是链接中的数字
 * @param {*} rid 小区id，在页面中你那个读取
 * @returns 
 */
async function getHousingEstate(hid, rid) {
    console.log(`getHousingEstate :: enter, hid = ${hid}, rid = ${rid}`)
    const url = "https://bj.lianjia.com/ershoufang/housestat"
    
    const result = await requestGet(url,{hid,rid});
    if(result && result.status === 200) {
        return result.data
    } else {
        return null
    }
}

function outputTableString(resultObj) {
    const space = "\t";
    //		
    const {title, area, hourseType, orientation} = resultObj;
    const str = title + space +
                area + space +
                hourseType + space +
                orientation
    console.log(str)
}


async function start() {
    console.log(`start :: enter`)
    const result = parse(totalStr)
    outputTableString(result)
    console.log(result)
    return
    for(const url of urlList) {
        // https://bj.lianjia.com/ershoufang/101113523653.html?fb_expo_id=519293611880792072
        const hourseIdReg = /.+\/(\d+)\.html/
        const matchInfo = hourseIdReg.exec(url)
        if(matchInfo && matchInfo[1]) {
            const hourseId = matchInfo[1]
            //console.log(hourseId)
            const pageStrInfo = await getHourseInfo(url)
            const data = parse(pageStrInfo)
            const he = await getHousingEstate(hourseId, data.rid)
            const averagePrice = he.data.resblockCard.unitPrice // 小区均价，单独从接口中获取的
            // console.log(averagePrice)
            const result = {url,hourseId, ...data, averagePrice }
            outputTableString(result)
            // console.log(result)
        } else {
            console.error(`start :: 链接不对`)
        }
        
    }
    
    console.log(`start :: end`)
    
}
start()

//getHourseInfo(urlList[0])