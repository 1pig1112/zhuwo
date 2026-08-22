"use strict";

alert("app.js运行了");


document.addEventListener(
"DOMContentLoaded",
function(){



// =====================
// 启动页
// =====================

 

setTimeout(function(){


const splash =
document.getElementById("splash");


const app =
document.getElementById("app");



if(splash){

splash.classList.add("hidden");

}



if(app){

app.classList.remove("hidden");

}



},1500);






// =====================
// 页面切换
// =====================


const navButtons =
document.querySelectorAll(
"nav button"
);



const pages =
document.querySelectorAll(
".page"
);





navButtons.forEach(
function(btn){


btn.addEventListener(
"click",
function(){


const target =
btn.dataset.page;



pages.forEach(
function(page){

page.classList.remove(
"active"
);


if(page.id===target){

page.classList.add(
"active"
);

}


});



});



});







// =====================
// 新增日志弹窗
// =====================


const openLog =
document.getElementById(
"openLog"
);



const closeLog =
document.getElementById(
"closeLog"
);



const modal =
document.getElementById(
"logModal"
);





openLog.addEventListener(
"click",
function(){


modal.classList.remove(
"hidden"
);


});





closeLog.addEventListener(
"click",
function(){


modal.classList.add(
"hidden"
);


});








// =====================
// 保存日志
// =====================


const saveBtn =
document.getElementById(
"saveLog"
);



saveBtn.addEventListener(
"click",
function(){



const stage =
document.getElementById(
"stage"
).value;




const content =
document.getElementById(
"content"
).value.trim();





if(!content){


alert(
"请输入施工内容"
);


return;


}






const logs =
JSON.parse(
localStorage.getItem(
"pig_logs"
)
|| "[]"
);





logs.unshift({


date:
new Date()
.toLocaleDateString(),


stage:stage,


content:content



});





localStorage.setItem(
"pig_logs",
JSON.stringify(logs)
);





renderLogs();





document.getElementById(
"content"
).value="";



modal.classList.add(
"hidden"
);



});







// =====================
// 渲染日志
// =====================


function renderLogs(){



const box =
document.getElementById(
"logList"
);



const recent =
document.getElementById(
"recent"
);




const logs =
JSON.parse(
localStorage.getItem(
"pig_logs"
)
|| "[]"
);





if(logs.length===0){

box.innerHTML=
"暂无记录";


return;


}






box.innerHTML="";





logs.forEach(
function(item){



const div =
document.createElement(
"div"
);



div.className=
"log-item";



div.innerHTML=
`

<div>
${item.date}
</div>

<div>
${item.stage}
</div>

<p>
${item.content}
</p>

`;



box.appendChild(div);



});





const first =
logs[0];



if(recent){

recent.innerHTML=
`

${first.date}

<br>

${first.stage}

<br>

${first.content}

`;

}



}




renderLogs();




});
