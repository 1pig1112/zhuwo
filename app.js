const KEY = "zhuwo34";


let data = JSON.parse(
localStorage.getItem(KEY)
)
||
{

project:{

start:"2026-08-01",

stage:"水电施工",

progress:45

},


records:{},


photos:
data.records[date].photos || [],





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
.forEach(page=>{

page.classList.remove("active");

});



let target =
document.getElementById(id);


if(target){

target.classList.add("active");

}



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







// =================
// 日历系统
// =================


let currentMonth =
new Date();





function changeMonth(num){


currentMonth.setMonth(
currentMonth.getMonth()+num
);


renderCalendar();


}







function formatDate(y,m,d){


return y+
"-"+
String(m).padStart(2,"0")
+
"-"+
String(d).padStart(2,"0");


}







function renderCalendar(){



let box =
document.getElementById(
"calendarDays"
);



if(!box)return;



box.innerHTML="";



let year =
currentMonth.getFullYear();



let month =
currentMonth.getMonth();



document.getElementById(
"monthTitle"
)
.innerText =

year+
"年"+
(month+1)+
"月";





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
year,
month+1,
d
);



let record =
data.records[date];




box.innerHTML += `

<div

class="${record?'has-record':''}"

onclick="openRecord('${date}')"

>

${d}

</div>

`;

}


}

// =================
// 装修日记记录
// =================



function newDiary(){


let today =
new Date();



let date =
formatDate(

today.getFullYear(),

today.getMonth()+1,

today.getDate()

);



openRecord(date);


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
)
.value =
old.stage || "水电施工";



document.getElementById(
"recordDone"
)
.value =
old.done || "";



document.getElementById(
"recordProblem"
)
.value =
old.problem || "";



document.getElementById(
"recordChat"
)
.value =
old.chat || "";



document.getElementById(
"recordMoney"
)
.value =
old.money || "";



}

else{


clearRecord();


}


showPreview(date);


}








function clearRecord(){


let ids=[

"recordDone",

"recordProblem",

"recordChat",

"recordMoney"

];


ids.forEach(id=>{


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



photos:

data.records[date]?.photos || [],



time:

new Date()
.toLocaleString()


};



saveData();



alert(
"🐷 今天的装修记录保存好啦"
);



openPage("calendar");


renderCalendar();


showPreview(date);


}









// 日历预览卡


function showPreview(date){



let box =
document.getElementById(
"recordPreview"
);



if(!box)return;




let r =
data.records[date];




if(!r){


box.innerHTML=`

<div class="empty-state">

🐷

<p>
这一天还没有装修记录哦

</p>

</div>

`;

return;

}





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
${r.done || "暂无记录"}

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



<p>

📷照片：

${r.photos ? r.photos.length : 0} 张

</p>


</div>

`;



}

// =================
// 照片系统
// =================


function addDailyPhotos(event){

let files = event.target.files;

let date = window.currentRecord;

if(!date)return;


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



Array.from(files).forEach(file=>{


let reader = new FileReader();


reader.onload=function(e){


data.records[date].photos.push(
e.target.result
);



saveData();


showPhotos(date);


};



reader.readAsDataURL(file);



});


}



let files =
event.target.files;



let date =
window.currentRecord;



if(!date)return;



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





Array.from(files)
.forEach(file=>{


let reader =
new FileReader();



reader.onload=function(e){


data.records[date]
.photos
.push(
e.target.result
);



saveData();


showPhotos(date);


};



reader.readAsDataURL(file);



});



}







function showPhotos(date){



let box =
document.getElementById(
"photoPreview"
);



if(!box)return;



box.innerHTML="";



let photos =
data.records[date]?.photos || [];





photos.forEach(src=>{


let img =
document.createElement("img");


img.src=src;


box.appendChild(img);


});


}








// 点击记录后显示照片


function loadPhotos(date){


showPhotos(date);


}







// 页面打开后初始化



window.onload=function(){


init();


};
