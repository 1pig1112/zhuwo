const KEY = "zhuwo33";


let data =
JSON.parse(localStorage.getItem(KEY))
||
{
 project:{
  start:"2026-08-01",
  stage:"水电施工",
  progress:45
 },

 records:{}

};





function save(){

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


document
.getElementById(id)
.classList.add("active");



if(id==="calendar"){

renderCalendar();

}


window.scrollTo(0,0);

}





function backHome(){

openPage("home");

}







// 首页初始化


function init(){


let start =
new Date(data.project.start);


let now =
new Date();


let days =
Math.floor(
(now-start)/86400000
)+1;



let d =
document.getElementById("days");


if(d){

d.innerText=days;

}




document.getElementById("stage")
.innerText =
data.project.stage;



document.getElementById("progressBar")
.style.width =
data.project.progress+"%";



document.getElementById("progressNum")
.innerText =
data.project.progress+"%";


}









// 日历


let calendarDate =
new Date();




function changeMonth(num){


calendarDate.setMonth(
calendarDate.getMonth()+num
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



let year =
calendarDate.getFullYear();


let month =
calendarDate.getMonth();



document.getElementById(
"monthTitle"
)
.innerText =
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

box.innerHTML+="<div></div>";

}





for(let d=1;d<=total;d++){



let date =
formatDate(
year,
month+1,
d
);



let has =
data.records[date];




box.innerHTML+=`

<div

class="${has?'has-record':''}"

onclick="openRecord('${date}')"

>

${d}

</div>

`;



}


}





function formatDate(y,m,d){

return y+"-"+
String(m).padStart(2,"0")
+"-"+
String(d).padStart(2,"0");

}







// 打开记录



function newDiary(){


let today =
new Date();



openRecord(

formatDate(
today.getFullYear(),
today.getMonth()+1,
today.getDate()
)

);


}





function openRecord(date){



openPage("record");



window.currentRecord =
date;



document.getElementById(
"recordTitle"
)
.innerText =
date+" 装修日记";




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


clearRecord();


}


}







function clearRecord(){


[
"recordDone",
"recordProblem",
"recordChat",
"recordMoney"

]
.forEach(id=>{


let el =
document.getElementById(id);


if(el){

el.value="";

}


});


}








// 保存记录



function saveRecord(){



let date =
window.currentRecord;



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



save();



alert(
"🐷 保存成功啦"
);



openPage("calendar");

showPreview(date);



}








// 日历下面显示摘要



function showPreview(date){



let box =
document.getElementById(
"recordPreview"
);



let r =
data.records[date];



if(!r)return;



box.innerHTML=`

<div class="diary-card">


<h3>
🌸 ${date}
</h3>


<p>
🔨 ${r.stage}
</p>


<p>
✨ 完成：
${r.done || "暂无"}
</p>


<p>
⚠️ 问题：
${r.problem || "暂无"}
</p>


<p>
💬 沟通：
${r.chat || "暂无"}
</p>


<p>
💰 花费：
${r.money || 0} 元
</p>


</div>

`;



}






// 点击日期时显示预览



let oldOpenRecord =
openRecord;



openRecord=function(date){


oldOpenRecord(date);


showPreview(date);


}







init();
