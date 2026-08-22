"use strict";


const LogManager = {


key:"pig_logs",



getAll(){

return PigStorage.get(
this.key
);

},





save(data){

PigStorage.set(
this.key,
data
);

},





add(item){

let logs=this.getAll();


logs.unshift(item);


this.save(logs);


},





delete(id){

let logs=this.getAll();


logs =
logs.filter(
item=>item.id!==id
);


this.save(logs);


}



};







// ======================
// 页面加载后绑定
// ======================


document.addEventListener(
"DOMContentLoaded",
()=>{



let selectedImages=[];





// 图片读取


const imageInput =
document.getElementById(
"logImages"
);



if(imageInput){


imageInput.addEventListener(
"change",
function(e){


selectedImages=[];



const files =
Array.from(
e.target.files
);



files.forEach(file=>{


const reader =
new FileReader();



reader.onload=function(evt){


selectedImages.push(
evt.target.result
);


};



reader.readAsDataURL(
file
);



});



});



}








// 保存日志


const saveBtn =
document.getElementById(
"saveLog"
);



if(saveBtn){


saveBtn.addEventListener(
"click",
()=>{


const stage =
document.getElementById(
"logStage"
).value;



const content =
document.getElementById(
"logContent"
).value.trim();





if(!content){

alert(
"请输入施工内容"
);

return;

}





LogManager.add({

id:Date.now(),


date:
new Date()
.toLocaleDateString(),


stage:stage,


content:content,


images:selectedImages


});





document.getElementById(
"logContent"
).value="";



selectedImages=[];



renderLogs();



showPage(
"logs"
);



}

);

}




renderLogs();



});








// ======================
// 渲染日志
// ======================


function renderLogs(){



const list =
document.getElementById(
"logList"
);



if(!list){

return;

}




const logs =
LogManager.getAll();





if(logs.length===0){


list.innerHTML=
`
<div class="card">
暂无记录
</div>
`;


return;


}







list.innerHTML="";







logs.forEach(log=>{


const div =
document.createElement(
"div"
);



div.className=
"log-item";



let photos="";



if(log.images
&&
log.images.length){



photos=
`
<div class="photos">

${

log.images.map(
img=>
`
<img src="${img}">
`
).join("")

}

</div>

`;



}






div.innerHTML=
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


${photos}


`;






div.addEventListener(
"click",
()=>{


showDetail(
log
);


}

);





list.appendChild(div);



});




}









// ======================
// 详情
// ======================


function showDetail(log){



const box =
document.getElementById(
"detailBox"
);



if(!box){

return;

}



let photos="";



if(log.images
&&
log.images.length){


photos=
`

<div class="photos">

${
log.images.map(
img=>
`
<img src="${img}">
`
).join("")
}

</div>

`;

}




box.innerHTML=
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


${photos}


`;



showPage(
"detail"
);



}
