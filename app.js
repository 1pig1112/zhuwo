const KEY = "zhuwo34";


let data = JSON.parse(
localStorage.getItem(KEY)
) || {

project:{
start:"2026-08-01",
stage:"水电施工",
progress:45
},

records:{}

};




// 保存数据

function saveData(){

localStorage.setItem(
KEY,
JSON.stringify(data)
);

}





// 页面切换

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

renderCalendar();

}


window.scrollTo(0,0);

}





function backHome(){

openPage("home");

}








// 首页

function init(){


let start =
new Date(
data.project.start
);


let now =
new Date();



let days =
Math.floor(
(now-start)/86400000
)+1;



let d =
document.getElementById("days");


if(d){

d.innerText =
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








// 日期格式

function formatDate(y,m,d){

return y+"-"+
String(m).padStart(2,"0")
+"-"+
String(d).padStart(2,"0");

}





// 日历

let currentMonth =
new Date();




function changeMonth(n){

currentMonth.setMonth(
currentMonth.getMonth()+n
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
new Date(y,m,1)
.getDay();



let total =
new Date(y,m+1,0)
.getDate();




for(let i=0;i<first;i++){

box.innerHTML +=
"<div></div>";

}





for(let d=1;d<=total;d++){


let date =
formatDate(
y,
m+1,
d
);



let has =
data.records[date];



box.innerHTML += `

<div class="${has?'has-record':''}"

onclick="openRecord('${date}')">

${d}

</div>

`;

}



}

// =======================
// 装修记录
// =======================


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



openPage("record");



let title =
document.getElementById(
"recordTitle"
);



if(title){

title.innerText =
date+" 装修日记";

}




if(!data.records[date]){


data.records[date]={

stage:"水电施工",

done:"",

problem:"",

chat:"",

money:"",

photos:[]

};


saveData();


}






let r =
data.records[date];





document.getElementById(
"recordStage"
).value =
r.stage || "水电施工";



document.getElementById(
"recordDone"
).value =
r.done || "";



document.getElementById(
"recordProblem"
).value =
r.problem || "";



document.getElementById(
"recordChat"
).value =
r.chat || "";



document.getElementById(
"recordMoney"
).value =
r.money || "";





// 关键：打开记录后加载图片

setTimeout(function(){

renderPhotos(date);

},300);



}








function saveRecord(){


let date =
window.currentRecord;



if(!date)return;



let oldPhotos =
[];



if(data.records[date]
&&
data.records[date].photos){


oldPhotos =
data.records[date].photos;


}





data.records[date]={


stage:
document.getElementById(
"recordStage"
).value,



done:
document.getElementById(
"recordDone"
).value,



problem:
document.getElementById(
"recordProblem"
).value,



chat:
document.getElementById(
"recordChat"
).value,



money:
document.getElementById(
"recordMoney"
).value,



photos:
oldPhotos,



time:
new Date().toLocaleString()


};





saveData();



alert(
"🐷 保存成功"
);



renderCalendar();


openPage("calendar");


showPreview(date);



}









// 日历预览


function showPreview(date){



let box =
document.getElementById(
"recordPreview"
);



if(!box)return;




let r =
data.records[date];



if(!r){

box.innerHTML=
`

<div class="empty-state">

🐷

<p>
暂无记录

</p>

</div>

`;

return;

}





box.innerHTML=

`

<div class="diary-card">


<h3>
🌸 ${date}
</h3>


<p>
🔨 ${r.stage}
</p>


<p>
✨ ${r.done || "暂无"}
</p>


<p>
⚠️ ${r.problem || "暂无"}
</p>


<p>
💬 ${r.chat || "暂无"}
</p>


<p>
💰 ${r.money || 0} 元
</p>


<p>
📷 ${r.photos ? r.photos.length : 0} 张照片
</p>


</div>

`;



}

// =======================
// 图片系统
// =======================


function addDailyPhotos(event){


let files =
event.target.files;



let date =
window.currentRecord;



if(!date){

alert("请先打开当天记录");

return;

}



if(!data.records[date]){


data.records[date]={

stage:"水电施工",

done:"",

problem:"",

chat:"",

money:"",

photos:[]

};


}



if(!data.records[date].photos){

data.records[date].photos=[];

}





Array.from(files).forEach(function(file){



let reader =
new FileReader();



reader.onload=function(e){



data.records[date]
.photos
.push(
e.target.result
);



saveData();



renderPhotos(date);



};



reader.readAsDataURL(file);



});



}







// 显示照片


function renderPhotos(date){



let box =
document.getElementById(
"photoPreview"
);



if(!box)return;



box.innerHTML="";



let photos =
data.records[date]?.photos || [];





photos.forEach(function(src){



let img =
document.createElement("img");



img.src =
src;



box.appendChild(img);



});



}









// =======================
// 启动
// =======================


window.onload=function(){

init();

};
