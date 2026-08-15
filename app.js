const KEY = "zhuwo_v32";



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
.forEach(p=>{

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








// 初始化首页


function init(){


let start =
new Date(data.project.start);


let now =
new Date();


let days =
Math.floor(
(now-start)/86400000
)+1;



let day =
document.getElementById("days");


if(day){

day.innerText =
days+"天";

}




document.getElementById("stage")
.innerText =
data.project.stage;




document.getElementById("progress")
.style.width =
data.project.progress+"%";



document.getElementById("progressText")
.innerText =
data.project.progress+"%";


}








// 日历



let currentDate =
new Date();





function renderCalendar(){


let box =
document.getElementById(
"calendarDays"
);


if(!box)return;



box.innerHTML="";



let year =
currentDate.getFullYear();



let month =
currentDate.getMonth();



document.getElementById(
"monthTitle"
).innerText =
year+"年"+
(month+1)+"月";




let first =
new Date(
year,
month,
1
)
.getDay();



let total =
new Date(
year,
month+1,
0
)
.getDate();




for(let i=0;i<first;i++){

box.innerHTML+=
"<div></div>";

}





for(let d=1;d<=total;d++){


let key =
formatDate(
year,
month+1,
d
);



let has =
data.records[key];



box.innerHTML+=`

<div class="calendar-day 
${has?'has-record':''}"

onclick="openRecord('${key}')">

${d}

${has?'🐷':''}

</div>

`;


}



}





function formatDate(y,m,d){

return y+
"-"+
String(m).padStart(2,"0")
+
"-"+
String(d).padStart(2,"0");

}








// 新建今天记录


function newDiary(){

let today =
new Date();



let key =
formatDate(

today.getFullYear(),

today.getMonth()+1,

today.getDate()

);



openRecord(key);


}







// 打开某一天记录


function openRecord(date){



openPage("record");



document.getElementById(
"recordTitle"
).innerText =
date+" 装修记录";



let old =
data.records[date];



if(old){


document.getElementById(
"recordStage"
).value =
old.stage || "水电施工";



document.getElementById(
"recordDone"
).value =
old.done || "";



document.getElementById(
"recordProblem"
).value =
old.problem || "";



document.getElementById(
"recordChat"
).value =
old.chat || "";



document.getElementById(
"recordMoney"
).value =
old.money || "";


}

else{


document.getElementById(
"recordDone"
).value="";


document.getElementById(
"recordProblem"
).value="";


document.getElementById(
"recordChat"
).value="";


document.getElementById(
"recordMoney"
).value="";


}




window.currentRecord =
date;


}








// 保存每日记录


function saveRecord(){



let date =
window.currentRecord;



if(!date)return;



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


time:
new Date()
.toLocaleString()


};



saveData();



alert(
"🐷 今日装修记录保存成功"
);



openPage("calendar");

}





init();
