"use strict";



document.addEventListener(
"DOMContentLoaded",
function(){



// =====================
// 启动
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


},1200);







// =====================
// 页面系统
// =====================


const pages =
document.querySelectorAll(".page");



function showPage(id){


pages.forEach(function(page){

page.classList.remove("active");

});



const target =
document.getElementById(id);



if(target){

target.classList.add("active");

}


}





// 底部导航


document
.querySelectorAll("nav button")
.forEach(function(btn){


btn.addEventListener(
"click",
function(){


showPage(
btn.dataset.page
);


});


});






// 返回按钮


document
.querySelectorAll(".back-btn")
.forEach(function(btn){


btn.addEventListener(
"click",
function(){


showPage(
btn.dataset.back
);


});


});









// =====================
// 日志
// =====================


let logs =
JSON.parse(
localStorage.getItem(
"pig_logs"
)
||
"[]"
);







// 首页进入日志


const openLog =
document.getElementById(
"openLog"
);



if(openLog){


openLog.addEventListener(
"click",
function(){


showPage(
"newLogPage"
);


});


}







// 新建日志按钮


const newLog =
document.getElementById(
"newLog"
);



if(newLog){


newLog.addEventListener(
"click",
function(){


showPage(
"newLogPage"
);


});


}







// 保存


const save =
document.getElementById(
"saveLog"
);



if(save){


save.addEventListener(
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






const item={


id:Date.now(),


date:
new Date()
.toLocaleDateString(),


stage:stage,


content:content



};






logs.unshift(item);





localStorage.setItem(
"pig_logs",
JSON.stringify(logs)
);






document.getElementById(
"content"
).value="";





showPage(
"logs"
);




renderLogs();





});


}








// =====================
// 渲染日志
// =====================


function renderLogs(){



const list =
document.getElementById(
"logList"
);



const recent =
document.getElementById(
"recent"
);




if(!list){

return;

}




if(logs.length===0){


list.innerHTML=
`
<div class="muted">
暂无记录
</div>
`;



return;

}







list.innerHTML="";






logs.forEach(function(log){



const box =
document.createElement(
"div"
);



box.className=
"log-item";





box.innerHTML=
`

<div class="log-date">

${log.date}

</div>


<div class="log-stage">

${log.stage}

</div>


<div class="log-content">

${log.content}

</div>


<button>
查看详情
</button>


`;






box.querySelector("button")
.addEventListener(
"click",
function(){



showDetail(log);



});


list.appendChild(box);



});






if(recent){


const last =
logs[0];


recent.innerHTML=
`

${last.date}

<br>

${last.stage}

<br>

${last.content}

`;


}



}









function showDetail(log){



const detail =
document.getElementById(
"detailContent"
);



detail.innerHTML=
`

<h3>
${log.stage}
</h3>


<p>
${log.date}
</p>


<p>
${log.content}
</p>


`;



showPage(
"detail"
);



}





renderLogs();





});
