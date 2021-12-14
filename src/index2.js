

// 地点	面积（㎡）	房间类型	朝向	楼层	添加时候的报价（万）	网上说的税费（万）	预计总首付（不含中介费）	元/㎡	小区均价	挂牌时间	关注时间	购买意愿	是否已现场看	是否已成交	是否有电梯	梯户比	建筑年代	备注	房源连接	其他补充说明

class HourseInfo {
    constructor (
        title, // 标题
        area, // 面积（㎡）
        hourseType, // 房间类型
        orientation, // 朝向
        floor, // 楼层
        price, // 总价
        taxation, // 添加时候的报价（万）
        totalDownPayment, // 网上说的税费（万）
        unitPrice, // 元/㎡
        averagePrice, // 小区均价
        listingTime, // 挂牌时间
        hasElevator, // 是否有电梯
        tiHuBi, // 梯户比
        buildYear, // 建筑年代
        url, // 房源连接
        ) {
            const addInfoTime = " ";
            const willing = " ";
            const hasViewed = "";
            const hasDealed = " ";  //是否已成交
            const comments = " " // 备注
            return {
                title, // 标题
                area, // 面积（㎡）
                hourseType, // 房间类型
                orientation, // 朝向
                floor, // 楼层
                price, // 总价
                taxation, // 添加时候的报价（万）
                totalDownPayment, // 网上说的税费（万）
                unitPrice, // 元/㎡
                averagePrice, // 小区均价
                listingTime, // 挂牌时间
                addInfoTime , //  关注时间
                willing, // 购买意愿
                hasViewed, // 是否已现场看
                hasDealed,  //是否已成交
                hasElevator, // 是否有电梯
                tiHuBi, // 梯户比
                buildYear, // 建筑年代,
                comments, // 备注
                url, // 房源连接
            }
    }
     toString() {
         return "Hello"
     }
}

function getInfo() {
    const title = document.querySelector(".total").innerHTML; // 标题
    const area = document.querySelector(".unitPriceValue").innerText.replace("元/平米", "");  // 面积（㎡）
    const hourseType = document.querySelector(".base .content ul li").innerText.replace("房屋户型", "");  // 房间类型
    const orientation = document.querySelector(".base .content ul").children[6].innerText.replace("房屋朝向", "");  // 朝向
    const floor = document.querySelector(".base .content ul").children[1].innerText.replace("所在楼层", ""); // 楼层
    const price = document.querySelector(".total").innerText;  // 总价
    const taxation = document.querySelector(".number").innerText;  // 添加时候的报价（万）
    const totalDownPayment = "";  // 网上说的税费（万）
    const unitPrice = "";  // 元/㎡
    const averagePrice = "";  // 小区均价
    const listingTime = "";  // 挂牌时间
    const hasElevator = "";  // 是否有电梯
    const tiHuBi = "";  // 梯户比
    const buildYear = "";  // 建筑年代
    const url = "";  // 房源连接
}

