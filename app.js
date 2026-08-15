
// =================================
// 猪窝 3.8 验收管家版
// =================================


const KEY = "zhuwo38";



let data = JSON.parse(

localStorage.getItem(KEY)

)

||

{


project:{


start:"2026-08-01",


stage:"🔌 水电施工",


progress:60


},





records:{},





photos:[],





problems:[],





checks:{





water:{


title:"🔌 水电验收",


items:[

"水管打压记录",

"管线照片保存",

"电路测试",

"插座定位确认",

"强弱电检查",

"水电图保存",

"回路标识",

"封槽前检查"

]


},





waterproof:{


title:"💧 防水验收",


items:[

"防水高度检查",

"阴角处理",

"闭水48小时",

"门槛防水",

"验收照片保存"

]


},






tile:{


title:"🧱 瓦工验收",


items:[

"瓷砖空鼓检查",

"平整度检查",

"阴阳角检查",

"砖缝检查",

"保护措施",

"验收照片"

]


},






paint:{


title:"🎨 油工验收",


items:[

"墙面平整",

"阴阳角",

"开裂检查",

"颜色确认",

"成品保护"

]


},






install:{


title:"🚪 安装验收",


items:[

"门安装",

"柜体安装",

"五金检查",

"电器安装",

"灯具检查",

"卫浴检查",

"开关检查",

"整体检查"

]


}





},





checkPhotos:[],





money:{


contract:95000,


paid:30000,


extra:0


}





};









function saveData(){


localStorage.setItem(

KEY,

JSON.stringify(data)

);


}









// =================================
// 页面切换
// =================================


function openPage(id){



document
.querySelectorAll(".page")
.forEach(function(p){


p.classList.remove("active");


});





let page =
document.getElementById(id);



if(page){


page.classList.add("active");


}







if(id==="calendar"){


setTimeout(function(){


renderCalendar();


},100);


}





if(id==="check"){


renderCheckSummary();


}





if(id==="photo"){


renderAllPhotos();


}





if(id==="problem"){


renderProblems();


}







window.scrollTo(0,0);



}








function backHome(){


openPage("home");


}









// =================================
// 首页初始化
// =================================



function init(){



let start =
new Date(
data.project.start
);



let today =
new Date();





let days =
Math.floor(

(today-start)/86400000

)+1;





let dayBox =
document.getElementById("days");



if(dayBox){


dayBox.innerText =
days;


}






let stage =
document.getElementById("stage");



if(stage){


stage.innerText =
data.project.stage;


}





let bar =
document.getElementById("progressBar");



if(bar){


bar.style.width =
data.project.progress+"%";


}





let num =
document.getElementById("progressNum");



if(num){


num.innerText =
data.project.progress+"%";


}



}


// =================================
// 验收中心
// =================================



let currentCheck = "";







function openCheck(type){

currentCheck = type;


if(!data.checks[type]){

data.checks[type]={

done:[]

};

saveData();

}



openPage("checkDetail");



let title =
document.getElementById(
"checkTitle"
);



let titles={

water:"🔌 水电验收",

waterproof:"💧 防水验收",

tile:"🧱 瓦工验收",

paint:"🎨 油工验收",

install:"🚪 安装验收"

};



if(title){

title.innerText =
titles[type];

}



renderCheckItems(type);



renderCheckPhotos();



}


currentCheck = type;



openPage("checkDetail");





let check =
data.checks[type];



if(!check){


check={};


data.checks[type]=check;


saveData();


}






let config =
data.checksConfig ?
data.checksConfig[type]
:
null;







let title =
document.getElementById(
"checkTitle"
);



if(title){


title.innerText =
data.checks[type]?.title
||
data.checks[type]?.name
||
"验收项目";


}






renderCheckItems(type);



}









// =================================
// 渲染验收项目
// =================================



function renderCheckItems(type){



let box =
document.getElementById(
"checkItems"
);



if(!box)return;



box.innerHTML="";







let allItems =
getCheckItems(type);





let checked =
data.checks[type]?.done
||
[];








allItems.forEach(function(item,index){



let isDone =
checked.includes(index);






box.innerHTML +=

`

<div class="check-item ${isDone?'done':''}">


<input

type="checkbox"

${isDone?'checked':''}

onclick="toggleCheck('${type}',${index})">


<span>

${item}

</span>


</div>


`;



});







updateDetailProgress(type);



}









// =================================
// 获取检查列表
// =================================



function getCheckItems(type){



let map={




water:[

"水管打压记录",

"管线照片保存",

"电路测试",

"插座定位确认",

"强弱电检查",

"水电图保存",

"回路标识",

"封槽前检查"

],




waterproof:[

"防水高度检查",

"阴角处理",

"闭水48小时",

"门槛防水",

"验收照片保存"

],




tile:[

"瓷砖空鼓检查",

"平整度检查",

"阴阳角检查",

"砖缝检查",

"保护措施",

"验收照片"

],





paint:[

"墙面平整",

"阴阳角",

"开裂检查",

"颜色确认",

"成品保护"

],





install:[

"门安装",

"柜体安装",

"五金检查",

"电器安装",

"灯具检查",

"卫浴检查",

"开关检查",

"整体检查"

]



};



return map[type] || [];



}









// =================================
// 勾选保存
// =================================



function toggleCheck(type,index){



if(!data.checks[type]){


data.checks[type]={

done:[]

};


}





let done =
data.checks[type].done;







if(done.includes(index)){



done.splice(

done.indexOf(index),

1

);



}else{



done.push(index);



}






saveData();





renderCheckItems(type);



renderCheckSummary();



}









// =================================
// 详情进度
// =================================



function updateDetailProgress(type){



let total =
getCheckItems(type).length;



let done =
data.checks[type]?.done?.length || 0;






let percent =
total===0
?
0
:
Math.round(done/total*100);






let bar =
document.getElementById(
"detailProgress"
);



if(bar){


bar.style.width =
percent+"%";


}







let count =
document.getElementById(
"detailCount"
);



if(count){


count.innerText =
done+" / "+total;


}



}









// =================================
// 总验收进度
// =================================



function renderCheckSummary(){



let total=0;

let complete=0;






Object.keys(data.checks)
.forEach(function(key){



let all =
getCheckItems(key).length;



let done =
data.checks[key]?.done?.length || 0;





total++;



if(all>0 && done===all){


complete
  

// =================================
// 施工日志
// =================================



function formatDate(y,m,d){


return y+"-"+
String(m).padStart(2,"0")
+"-"+
String(d).padStart(2,"0");


}






let currentMonth =
new Date();








function changeMonth(num){


currentMonth.setMonth(

currentMonth.getMonth()+num

);



renderCalendar();



}








function renderCalendar(){



let box =
document.getElementById(
"calendarDays"
);



if(!box)return;



box.innerHTML="";





let y =
currentMonth.getFullYear();



let m =
currentMonth.getMonth();





let title =
document.getElementById(
"monthTitle"
);



if(title){


title.innerText =
y+"年"+(m+1)+"月";


}







let first =
new Date(
y,
m,
1
)
.getDay();






let total =
new Date(
y,
m+1,
0
)
.getDate();







for(
let i=0;
i<first;
i++
){


box.innerHTML +=
"<div></div>";

}




for(
let d=1;
d<=total;
d++
){



let date =
formatDate(
y,
m+1,
d
);



let has =
data.records[date];






box.innerHTML +=

`

<div class="${has?'has-record':''}"

onclick="openRecord('${date}')">

${d}

</div>

`;



}



}








function newDiary(){



let now =
new Date();





let date =
formatDate(

now.getFullYear(),

now.getMonth()+1,

now.getDate()

);





openRecord(date);



}









function openRecord(date){



window.currentRecord =
date;





if(!data.records[date]){


data.records[date]={


stage:"🔌 水电施工",


done:"",


problem:"",


money:0,


photos:[]


};


saveData();


}





openPage("record");



let title =
document.getElementById(
"recordTitle"
);



if(title){


title.innerText =
date+"施工日志";


}



}









function saveRecord(){



let date =
window.currentRecord;



if(!date)return;





data.records[date]={


stage:

document.getElementById(
"recordStage"
)?.value || "",



done:

document.getElementById(
"recordDone"
)?.value || "",



problem:

document.getElementById(
"recordProblem"
)?.value || "",



photos:

data.records[date]?.photos || []


};






saveData();



alert(
"🐷 施工记录保存成功"
);



openPage("calendar");



}









// =================================
// 问题中心
// =================================



function addProblem(title){



data.problems.push({


title:title,


date:

new Date()
.toLocaleDateString(),



status:"🟡 待整改"


});





saveData();



renderProblems();



}








function renderProblems(){



let box =
document.querySelector(
".problem-list"
);



if(!box)return;



box.innerHTML="";






data.problems.forEach(function(item){



box.innerHTML +=

`

<div class="problem-item">


<h3>

${item.title}

</h3>


<p>

${item.date}

</p>


<span>

${item.status}

</span>


</div>


`;



});



}









// =================================
// 图片
// =================================



function openPhoto(src){



let viewer =
document.getElementById(
"photoViewer"
);



let img =
document.getElementById(
"bigPhoto"
);



if(viewer && img){


img.src =
src;


viewer.style.display =
"flex";


}



}








function closePhotoViewer(){



let viewer =
document.getElementById(
"photoViewer"
);



if(viewer){


viewer.style.display =
"none";


}



}









// =================================
// 启动
// =================================



window.onload=function(){


init();



renderCheckSummary();



};
