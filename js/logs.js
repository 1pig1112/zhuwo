"use strict";


// ======================
// 猪窝 V2.1
// logs.js
// 施工日志增强版
// ======================



function getLogs(){

    return getData(
        ZHUWO_DB.logs
    );

}




function saveLogs(data){

    saveData(
        ZHUWO_DB.logs,
        data
    );

}





// 新增日志

function addLog(data){


    let logs=getLogs();



    data.id=createId();


    data.created=
    new Date()
    .toLocaleDateString();



    logs.unshift(data);



    saveLogs(logs);



}








// 删除

function deleteLog(id){


    let logs=getLogs();



    logs =
    logs.filter(
        item=>item.id!==id
    );



    saveLogs(logs);



    renderLogs();


}








// 编辑

function updateLog(id,data){


    let logs=getLogs();



    let item =
    logs.find(
        x=>x.id===id
    );



    if(item){


        Object.assign(
            item,
            data
        );


    }



    saveLogs(logs);



}










// 渲染列表

function renderLogs(){



const box =
document.getElementById(
"logList"
);



if(!box)return;





let logs=getLogs();





if(logs.length===0){


box.innerHTML=
`

<div class="empty">

暂无施工记录

</div>

`;


return;


}







box.innerHTML=
logs.map(log=>{



let photos="";



if(log.photos
&&
log.photos.length){



photos=
`

<div class="photos">

${
log.photos.map(
p=>
`
<img 
src="${p}"
onclick="openPhoto('${p}')"
>
`
).join("")
}

</div>

`;



}






return`

<div class="log-card">


<div class="log-date">

${log.created}

</div>


<h3>

${log.title||"施工记录"}

</h3>



<div>

阶段：

${log.stage||""}

</div>




<p>

${log.content}

</p>



${photos}



<div class="log-actions">


<button onclick="editLog(${log.id})">

编辑

</button>



<button onclick="deleteLog(${log.id})">

删除

</button>


</div>



</div>


`;



}).join("");



}









// 查看详情


function showLogDetail(id){



let log =
getLogs()
.find(
x=>x.id===id
);



if(!log)return;




let box =
document.getElementById(
"detailBox"
);



if(!box)return;




box.innerHTML=
`

<h2>

${log.title}

</h2>



<p>

${log.created}

</p>



<p>

阶段：

${log.stage}

</p>



<p>

${log.content}

</p>




<div class="photos">

${
(log.photos||[])
.map(
p=>
`
<img src="${p}">
`
)
.join("")
}

</div>


`;



showPage(
"detail"
);



}









// 编辑入口


function editLog(id){


let log =
getLogs()
.find(
x=>x.id===id
);



if(!log)return;



showPage(
"newLog"
);



document
.getElementById(
"logTitle"
).value =
log.title||"";



document
.getElementById(
"logContent"
).value =
log.content||"";



}








// 图片放大


function openPhoto(src){



let viewer =
document.createElement(
"div"
);



viewer.className=
"photo-viewer";



viewer.innerHTML=
`

<img src="${src}">

`;



viewer.onclick=
()=>{

viewer.remove();

};



document.body.appendChild(
viewer
);



}






window.deleteLog=deleteLog;

window.editLog=editLog;

window.openPhoto=openPhoto;



document.addEventListener(
"DOMContentLoaded",
()=>{


renderLogs();


});
