const KEY = "zhuwo36";


let data =
JSON.parse(
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



checks:{},



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









// =====================
// 页面切换
// =====================



function openPage(id){



document
.querySelectorAll(".page")
.forEach(function(page){


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



if(id==="work"){


renderChecks();


}



window.scrollTo(0,0);


}







function backHome(){


openPage("home");


}









// =====================
// 首页
// =====================



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









// =====================
// 日期
// =====================



function formatDate(y,m,d){



return y+
"-"+
String(m).padStart(2,"0")
+
"-"+
String(d).padStart(2,"0");



}









// =====================
// 日历
// =====================



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


// =====================
// 施工记录
// =====================



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
date+" 施工记录";


}







if(!data.records[date]){


data.records[date]={


stage:"水电施工",


done:"",


problem:"",


chat:"",


money:0,


summary:"",


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





let summary =
document.getElementById(
"recordSummary"
);



if(summary){

summary.value =
r.summary || "";

}







setTimeout(function(){


renderPhotos(date);


},300);





}









// 保存施工记录



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






let money =
Number(
document.getElementById(
"recordMoney"
).value
||0
);






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





money:money,





summary:

document.getElementById(
"recordSummary"
).value,





photos:

oldPhotos,





time:

new Date()
.toLocaleString()



};







// 同步账本增项



data.money.extra += money;



saveData();




alert(
"🐷 今日施工记录保存成功"
);





renderCalendar();



openPage("calendar");





}









// =====================
// 日历预览
// =====================



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

🔨 阶段：

${r.stage}

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

💰 花费：

${r.money} 元

</p>





<p>

📷照片：

${r.photos.length} 张

</p>




</div>

`;



}










// =====================
// 图片上传
// =====================



function addDailyPhotos(event){



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

money:0,

summary:"",

photos:[]

};



}







let type =
document.getElementById(
"photoType"
).value;








Array.from(files)
.forEach(function(file){



let reader =
new FileReader();





reader.onload=function(e){



data.records[date]
.photos
.push({


src:e.target.result,


type:type,


time:new Date()
.toLocaleString()



});






saveData();




renderPhotos(date);




};






reader.readAsDataURL(file);



});



}


// =====================
// 图片显示
// =====================


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








// =====================
// 图片查看
// =====================



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









// =====================
// 验收系统
// =====================



let checkItems=[


"管线照片保存",

"水管打压完成",

"插座定位确认",

"电箱回路检查",

"水电图保存"


];







function renderChecks(){



let box =
document.querySelector(
"#work .diary-card:nth-of-type(2)"
);



if(!box)return;



}





function saveCheck(index,status){



if(!data.checks[index]){


data.checks[index]={};


}



data.checks[index].done =
status;



data.checks[index].time =
new Date()
.toLocaleString();



saveData();



}









// =====================
// 初始化
// =====================



window.onload=function(){


init();


};
