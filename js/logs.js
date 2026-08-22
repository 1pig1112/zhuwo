"use strict";

/*
猪窝 V2.0
施工日志模块
*/


const LOG_KEY = "zhuwo_logs";




// 获取日志

function getLogs(){

return JSON.parse(
localStorage.getItem(LOG_KEY)
|| "[]"
);

}






// 保存日志

function saveLogs(data){

localStorage.setItem(
LOG_KEY,
JSON.stringify(data)
);

}







// 新增日志

function addLog(log){


const logs =
getLogs();


logs.unshift({

id:
Date.now(),


date:
log.date ||
new Date().toLocaleDateString(),


stage:
log.stage ||
"施工记录",


title:
log.title ||
"",


content:
log.content ||
"",


photos:
log.photos ||
[]


});



saveLogs(logs);


}







// 渲染日志列表

function renderLogs(){


const box =
document.getElementById(
"logList"
);



if(!box)return;



const logs =
getLogs();



if(logs.length===0){


box.innerHTML=
`
<div class="empty">
暂无施工记录
</div>
`;

return;

}





box.innerHTML =
logs.map(item=>`


<div class="log-card">


<div class="log-head">

<div>

<h3>
${item.title || "施工记录"}
</h3>

<span>
${item.date}
</span>

</div>


<button
onclick="deleteLog(${item.id})">

删除

</button>


</div>





<div class="log-stage">

${item.stage}

</div>





<p>

${item.content}

</p>





<div class="photos">


${
(item.photos||[])
.map(
img=>
`
<img src="${img}">
`
)
.join("")
}


</div>




</div>


`).join("");



}








// 删除日志


window.deleteLog=function(id){


let logs =
getLogs();



logs =
logs.filter(
item=>item.id!==id
);



saveLogs(logs);


renderLogs();


}







// 图片预览

window.previewImages=function(input){


const preview =
document.getElementById(
"imagePreview"
);


if(!preview)return;



preview.innerHTML="";



Array.from(input.files)
.forEach(file=>{


const reader =
new FileReader();



reader.onload=e=>{


const img =
document.createElement(
"img"
);


img.src=e.target.result;


preview.appendChild(img);


};



reader.readAsDataURL(file);



});


}






document.addEventListener(
"DOMContentLoaded",
()=>{


renderLogs();


});
