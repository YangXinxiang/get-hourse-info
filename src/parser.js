function parse(pageStr) {
    // console.log(pageStr)

    const title = getTitle(pageStr) //document.querySelector(".total").innerHTML; // 标题
    const area = getArea(pageStr) // document.querySelector(".unitPriceValue").innerText.replace("元/平米", "");  // 面积（㎡）
    const hourseType = getHourseType(pageStr) // document.querySelector(".base .content ul li").innerText.replace("房屋户型", "");  // 房间类型
    const orientation = getOrientation(pageStr) // document.querySelector(".base .content ul").children[6].innerText.replace("房屋朝向", "");  // 朝向
    const floor = getFloor(pageStr) // document.querySelector(".base .content ul").children[1].innerText.replace("所在楼层", ""); // 楼层
    const price = getPrice(pageStr) // document.querySelector(".total").innerText;  // 总价
    const fitUp = getFitUp(pageStr) //
    const taxation = getTaxation(pageStr) // document.querySelector(".number").innerText;  // 添加时候的报价（万）
    // const totalDownPayment = "";  // 总首付
    // const unitPrice = "";  // 元/㎡
    // const averagePrice = "";  // 小区均价
    // const listingTime = "";  // 挂牌时间
    // const hasElevator = "";  // 是否有电梯
    // const tiHuBi = "";  // 梯户比
    // const buildYear = "";  // 建筑年代
    // const url = "";  // 房源连接
    console.log(title, area, hourseType, orientation, floor, price, fitUp, taxation)
    return "parse reslut"
}
/**
 * 获取房子的主题描述
 * @param {*} pageStr 
 * @param {*} from 
 * @returns 
 */
function getTitle(pageStr, from = "LJ") {
    // dom 格式 <span class="total">570</span><
    const reg = /<span class="total">{1}(\d+)/;
    const rst = reg.exec(pageStr)
    if(rst && rst[1]) {
        return rst[1]
    } else {
        return -1;
    }
}
/**
 * 获取面积
 * @param {*} pageStr 
 * @param {*} from 
 * @returns 
 */
function getArea(pageStr, from = "LJ") {
    // dom 格式 <div class="area"><div class="mainInfo">86.39平米</div>
    const reg = /<div class="area"><div class="mainInfo">{1}(.+)平米/;
    const rst = reg.exec(pageStr)
    if(rst && rst[1]) {
        return rst[1]
    } else {
        return -1;
    }
}
/**
 * 获取房间的朝向类型
 * @param {*} pageStr 
 * @param {*} from 
 * @returns 
 */
function getHourseType(pageStr, from = "LJ") {
    // dom 格式 <div class="room"><div class="mainInfo">2室1厅</div>
    const reg = /<div class="room"><div class="mainInfo">{1}(.{4,10})<\/div>/;
    const rst = reg.exec(pageStr)
    if(rst && rst[1]) {
        return rst[1]
    } else {
        return -1;
    }
}

/**
 * 获取房间的朝向类型
 * @param {*} pageStr 
 * @param {*} from 
 * @returns 
 */
 function getOrientation(pageStr, from = "LJ") {
    // dom 格式 <div class="type"><div class="mainInfo" title="南 北">南 北</div>
    const reg = /<div class="type"><div class="mainInfo" title="{1}(.{2,6})">/;
    const rst = reg.exec(pageStr)
    if(rst && rst[1]) {
        return rst[1]
    } else {
        return -1;
    }
}

/**
 * 获取房间的朝向类型
 * @param {*} pageStr 
 * @param {*} from 
 * @returns 
 */
 function getFloor(pageStr, from = "LJ") {
    // dom 格式 <div class="subInfo">中楼层/共14层</div></div>
    const reg = /<div class="subInfo">{1}(.{3,12})<\/div>/;
    const rst = reg.exec(pageStr)
    if(rst && rst[1]) {
        return rst[1]
    } else {
        return -1;
    }
}

/**
 * 获取总价
 * @param {*} pageStr 
 * @param {*} from 
 * @returns 
 */
 function getPrice(pageStr, from = "LJ") {
    // dom 格式 <div class="price "><span class="total">570</span><span class="unit"></span>
    const reg = /<div class="price "><span class="total">{1}(.{3,6})<\/span>/;
    const rst = reg.exec(pageStr)
    if(rst && rst[1]) {
        return rst[1]
    } else {
        return -1;
    }
}

/**
 * 获取装修程度
 * @param {*} pageStr 
 * @param {*} from 
 * @returns 
 */
 function getFitUp(pageStr, from = "LJ") {
    // dom 格式 <div class="subInfo">平层/精装</div></div><div class="area">
    const reg = /<div class="subInfo">{1}(.{3,10})<\/div>/;
    const rst = reg.exec(pageStr)
    if(rst && rst[1]) {
        return rst[1]
    } else {
        return -1;
    }
}
/**
 * 获取税费，有点小复杂哈，哈哈
 * @param {*} pageStr 
 * @param {*} from 
 * @returns 
 */
 function getTaxation(pageStr, from = "LJ") {
    // dom 格式 
    /*
    <div class="item">
      <div class="label-title">税费合计</div>
      <div class="content">
        
        <span class="number">50.1</span><span class="unit">万元</span>
        
      </div>
    </div>
    */
    const reg = /<div class="label-title">税费合计<\/div>{1}\s+<div class="content">{1}\s+<span class="number">{1}(.{3,6})<\/span>/;
    const rst = reg.exec(pageStr)
    if(rst && rst[1]) {
        return rst[1]
    } else {
        return -1;
    }
}



function getUnitPrice(pageStr, from = "LJ") {
    return ""
}




module.exports = {
    parse,
}