
const KEY = "zhuwo37";



let data =

JSON.parse(
localStorage.getItem(KEY)
)

||

{


project:{


start:"2026-08-01",


stage:"水电施工",


progress:60


},



records:{},



problems:[],



photos:[],



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






let page =
document.getElementById(id);



if(page){


page.classList.add("active");


}






if(id==="calendar"){


renderCalendar();


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









// =====================
// 初始化首页
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





let dayBox =
document.getElementById(
"days"
);



if(dayBox){


dayBox.innerText =
days;


}








let stage =
document.getElementById(
"stage"
);



if(stage){


stage.innerText =
data.project.stage;


}







let bar =
document.getElementById(
"progressBar"
);



if(bar){


bar.style.width =
data.project.progress+"%";


}





let progress =
document.getElementById(
"progressNum"
);



if(progress){


progress.innerText =
data.project.progress+"%";


}








}









// =====================
// 日期工具
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

const KEY = "zhuwo37";



let data =

JSON.parse(
localStorage.getItem(KEY)
)

||

{


project:{


start:"2026-08-01",


stage:"水电施工",


progress:60


},



records:{},



problems:[],



photos:[],



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






let page =
document.getElementById(id);



if(page){


page.classList.add("active");


}






if(id==="calendar"){


renderCalendar();


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









// =====================
// 初始化首页
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





let dayBox =
document.getElementById(
"days"
);



if(dayBox){


dayBox.innerText =
days;


}








let stage =
document.getElementById(
"stage"
);



if(stage){


stage.innerText =
data.project.stage;


}







let bar =
document.getElementById(
"progressBar"
);



if(bar){


bar.style.width =
data.project.progress+"%";


}





let progress =
document.getElementById(
"progressNum"
);



if(progress){


progress.innerText =
data.project.progress+"%";


}








}









// =====================
// 日期工具
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


// =====================
// 图片放大
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
// 问题添加
// =====================



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









// =====================
// 更新阶段
// =====================



function updateStage(stage,progress){



data.project.stage =
stage;



data.project.progress =
progress;



saveData();



init();



}









// =====================
// 更新费用
// =====================



function updateMoney(num){



data.money.extra += Number(num);



saveData();



let box =
document.getElementById(
"extraMoney"
);



if(box){


box.innerText =
"¥"+data.money.extra;


}



}









// =====================
// 页面启动
// =====================



window.onload=function(){


init();



};
