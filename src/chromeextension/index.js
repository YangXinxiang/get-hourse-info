//自动调用接口禁用海尔账号

let hasDrawTable = false;
let myApp = null;
//输出日志
function outputLog(str){
	var outputPanel = $id("outputPanel");
	if(outputPanel){
		outputPanel.value +=str+"\n";
	}else{
		console.log(str);
	}	
}

outputLog("hello world");

//var _info = "Data Loaded. ID Length = ["+window.UserIDList.length+"] , Email length = ["+window.EmailList.length+"]";

//outputLog(_info);

//封装常用的dom类库
function $id(id){
	return document.getElementById(id);
}
function $name(name){
	return document.getElementsByName(name);
}


var info = "";
function ajaxGet(url) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {		
		if(xhr.readyState==4){
			resultHandler(xhr.responseText);
		}
	}
	xhr.open("GET", url, true);
	xhr.send(null);
}



//响应按钮点击
function start(){
	outputLog("start :: enter.");
	if(myApp) {
		myApp.startParse()
	}
	
}
//响应按钮点击
function stop(){
	outputLog("stop :: enter.");
	
}

//注入添加操作界面
function addUserPanel(){
	var d= document;
	//var oFragment = d.createDocumentFragment();
	//创建外层div
	var outerDiv = d.createElement("div");
	outerDiv.style.position="fixed";
	outerDiv.style.top="50px";
	outerDiv.style.left="160px";
	outerDiv.style.border="1px solid #7ba0c3";
	outerDiv.style.width="240px";
	//outerDiv.style.height="150px";
	outerDiv.style.padding="5px"
	//创建说明提示
	var infoTips = d.createElement("span");
	infoTips.style.fontSize="14px";
	infoTips.innerHTML="如果界面上部分数据还没有显示，请尝试点击【分析页面】按钮再次分析";
	outerDiv.appendChild(infoTips);
	
	var This = this;
	
	/////////////////创建更人性化的提示框
	outerDiv.appendChild(d.createElement("br"));
	outerDiv.appendChild(d.createElement("br"));
	var b1 = d.createElement("input");
	b1.type="button";
	b1.name="startBuuton";
	b1.id="startBuuton";
	b1.value = "分析页面";
	outerDiv.appendChild(b1);
	outerDiv.appendChild(d.createElement("br"));
	b1.onclick=function(){
		start();
	};	
	// 添加到文档树
	document.body.appendChild(outerDiv);
	
	addTable()
	
}

function createTableStyle(){
	const styles = document.createElement("style");
	styles.innerHTML = `
	table.gridtable { 
        font-family: verdana,arial,sans-serif; font-size:11px; color:#333333; border-width: 1px; border-color: #666666; border-collapse: collapse; position:fixed;top:"160px";left:"300px"
    } 
    table.gridtable th 
    { border-width: 1px; padding: 8px; border-style: solid; border-color: #666666; background-color: #dedede; } 
	table.gridtable th:first-child {width:100px}
    table.gridtable td { border-width: 1px; padding: 8px; border-style: solid; border-color: #666666; background-color: #ffffff; } `
	document.head.appendChild(styles)
}

function addTable() {
	var outputArea = document.createElement("div");
	outputArea.id = "outputPanel";	
	outputArea.style.position="fixed";
	outputArea.style.top="200px";
	outputArea.style.left="30px";
	outputArea.innerHTML = `<table class="gridtable"> 
        <tr> 
            <th v-for="item in myHeaders">{{item}}</th> 
        </tr>
		
		<tr v-for="hourse in myHourseInfos">
			<td  v-for="item in hourse">{{item}}</td>
		<tr/>
       
    </table>`
																					
	document.body.appendChild(outputArea);
}

function startVueApp() {
	console.log(`myExtension startVueApp :: enter, hasDrawTable = ${hasDrawTable}`)
	if(hasDrawTable) {
		console.log(`myExtension startVueApp :: enter, hasDrawTable = ${hasDrawTable}`)
	}
	myApp = new Vue({
		el: '#outputPanel',
		data: {  		  																				
		  	myHeaders:["标题","面积（㎡）", "房间类型", "朝向", "楼层", "添加时候的报价（万）", "装修情况", "网上说的税费（万）", "预计总首付（不含中介费）", "元/㎡", "小区均价", "挂牌时间", "关注时间", "购买意愿", "是否已现场看", "是否已成交", "是否有电梯", "梯户比", "建筑年代", "持有年数",  "抵押贷款","备注", "房源连接", "其他补充说明"],
			myHourseInfos : []
		},
        mounted: function () {            
			console.log(`myExtension mounted :: enter.`)
			this.startParse();
        },
		methods: {
			startParse() {
				console.log(`myExtension startParse :: enter.`)
				const data = parse(document.documentElement.outerHTML);
				const {title, area, hourseType, orientation, floor, price, fitUp, taxation, totalDownPayment, unitPrice, averagePrice, listingTime, hasElevator, tiHuBi, buildYear, rid, holdYears, mortgageInfo} = data
				console.log(`myExtension startParse :: title = ${title}`)
				const followDate = this.getDateStr(new Date());  // "关注时间"
				const willing = ""; // "购买意愿"
				const hasViewed = false; // "是否已现场看"
				const hasClosed = false; // "是否已成交"
				const remarks = ""; // 备注
				const url = location.href;
				const others = ""
				const hourseInfo = [title, area, hourseType, orientation, floor, price, fitUp, taxation, totalDownPayment, unitPrice, averagePrice, listingTime, 
					followDate,
					willing,
					hasViewed,
					hasClosed,
					hasElevator, tiHuBi, buildYear, holdYears, mortgageInfo, remarks, url, others];
				this.myHourseInfos.push(hourseInfo);
			},
			getDateStr(date){
				const yyyy = date.getFullYear()
				const mm = (date.getMonth()+1) + "";
				const dd =  date.getDate()+ "";
				return `${yyyy}.${mm.padStart(2,"0")}.${dd.padStart(2,"0")}`
			}
		}
	  })
	  hasDrawTable = true
}
//暂时将程序注入到变更管理页面的登陆页面中
var url = location.href;
// if(url.indexOf("https://bj.lianjia.com")>=0){
if(url.indexOf("mofaxiao.com")>=0 || url.indexOf("https://bj.lianjia.com")>=0){
	// 很奇怪，会执行两遍。。。。暂时没找到解决方案。
	createTableStyle(); //创建表格样式
	addUserPanel();
	startVueApp()
	
}

document.addEventListener("load", ()=> {
	console.log(`myExtension loaded :: enter.`)
	// startVueApp()
})

