// ===============================
// 猪窝 3.7.2 app.js
// 装修进度管家修正版
// ===============================


const KEY = "zhuwo372";



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







// ===============================
// 页面切换（修复日志空白）
// ===============================


function openPage(id){



document
.querySelectorAll(".page")
.forEach(function(p){


p.classList.remove("active");


});





let target =
document.getElementById(id);



if(target){


target.classList.add("active");


}






if(id==="calendar"){



setTimeout(function(){


renderCalendar();


},100);



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








// ===============================
// 首页初始化
// ===============================



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








// ===============================
// 日期格式
// ===============================


function formatDate(y,m,d){


return y+"-"+
String(m).padStart(2,"0")
+"-"+
String(d).padStart(2,"0");


}








// ===============================
// 日历
// ===============================


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





if(!box){


return;


}



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

<div 
class="${has?'has-record':''}"

onclick="openRecord('${date}')"

>

${d}

</div>

`;



}



}


// ===============================
// 新建施工记录
// ===============================


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








// ===============================
// 打开施工日志
// ===============================


function openRecord(date){



window.currentRecord =
date;





if(!data.records[date]){


data.records[date]={


stage:"🔌 水电施工",


done:"",


problem:"",


chat:"",


money:0,


summary:"",


photos:[]



};



saveData();


}






openPage("record");






let r =
data.records[date];






let title =
document.getElementById(
"recordTitle"
);



if(title){


title.innerText =
date+" 施工日志";


}





let stage =
document.getElementById(
"recordStage"
);



if(stage){


stage.value =
r.stage;


}





let done =
document.getElementById(
"recordDone"
);



if(done){


done.value =
r.done;


}





let problem =
document.getElementById(
"recordProblem"
);



if(problem){


problem.value =
r.problem;


}





let chat =
document.getElementById(
"recordChat"
);



if(chat){


chat.value =
r.chat || "";


}





let money =
document.getElementById(
"recordMoney"
);



if(money){


money.value =
r.money;


}





let summary =
document.getElementById(
"recordSummary"
);



if(summary){


summary.value =
r.summary || "";


}





renderPhotos(date);



}








// ===============================
// 保存记录
// ===============================


function saveRecord(){



let date =
window.currentRecord;



if(!date)return;





let oldPhotos =
data.records[date]?.photos || [];






let money =
Number(

document.getElementById(
"recordMoney"
)?.value || 0

);







data.records[date]={



stage:

document.getElementById(
"recordStage"
)?.value || "水电施工",





done:

document.getElementById(
"recordDone"
)?.value || "",






problem:

document.getElementById(
"recordProblem"
)?.value || "",





chat:

document.getElementById(
"recordChat"
)?.value || "",





money:money,





summary:

document.getElementById(
"recordSummary"
)?.value || "",





photos:oldPhotos



};







if(money>0){


data.money.extra += money;


}






saveData();




alert(
"🐷 施工记录保存成功"
);





openPage("home");



}








// ===============================
// 上传照片
// ===============================


function addDailyPhotos(event){



let files =
event.target.files;



let date =
window.currentRecord;



if(!date)return;







Array.from(files)
.forEach(function(file){



let reader =
new FileReader();






reader.onload=function(e){



let photo={


src:e.target.result,


type:

document.getElementById(
"photoType"
)?.value || "施工照片",



date:date



};







data.records[date]
.photos
.push(photo);





data.photos.push(photo);






saveData();






renderPhotos(date);






};






reader.readAsDataURL(file);



});



}









// ===============================
// 显示照片
// ===============================


function renderPhotos(date){



let box =
document.getElementById(
"photoPreview"
);



if(!box)return;



box.innerHTML="";






let photos =
data.records[date]?.photos || [];






photos.forEach(function(item){



let img =
document.createElement("img");





img.src =
item.src;






img.onclick=function(){


openPhoto(item.src);


};






box.appendChild(img);



});



}








// ===============================
// 全部照片
// ===============================


function renderAllPhotos(){



let box =
document.getElementById(
"allPhotos"
);



if(!box)return;



box.innerHTML="";







data.photos
.forEach(function(item){



let img =
document.createElement("img");



img.src =
item.src;






img.onclick=function(){


openPhoto(item.src);


};






box.appendChild(img);



});



}


// ===============================
// 图片放大
// ===============================


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









// ===============================
// 问题中心
// ===============================



function renderProblems(){



let box =
document.querySelector(
".problem-list"
);



if(!box)return;



box.innerHTML="";






if(data.problems.length===0){


box.innerHTML=

`

<div class="empty-state">

🐷

<p>

暂无问题记录

</p>

</div>

`;

return;


}








data.problems.forEach(function(item){



box.innerHTML +=


`

<div class="problem-item">


<h3>

${item.title}

</h3>


<p>

发现时间：

${item.date}

</p>



<span>

${item.status}

</span>


</div>


`;



});



}









function addProblem(title){



data.problems.push({


title:title,


date:

new Date()
.toLocaleDateString(),



status:"🟡 待处理"



});




saveData();



renderProblems();



}









// ===============================
// 更新阶段
// ===============================



function updateStage(stage,progress){



data.project.stage =
stage;



data.project.progress =
progress;



saveData();



init();



}









// ===============================
// 更新费用
// ===============================



function refreshMoney(){



let box =
document.getElementById(
"extraMoney"
);



if(box){


box.innerText =
"¥"+data.money.extra;


}



}









// ===============================
// 启动
// ===============================



window.onload=function(){


init();



refreshMoney();



};
