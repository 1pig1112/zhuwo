"use strict";


// ======================
// 猪窝 V2.1
// app.js
// 主控制中心
// ======================



document.addEventListener(
"DOMContentLoaded",
()=>{





// 启动页


setTimeout(()=>{


const splash =
document.getElementById(
"splash"
);


const app =
document.getElementById(
"app"
);



if(splash)
splash.classList.add(
"hidden"
);



if(app)
app.classList.remove(
"hidden"
);



},1200);









// 页面切换


window.showPage=function(id){



document
.querySelectorAll(".page")
.forEach(
p=>{

p.classList.remove(
"active"
);

}

);



let target =
document.getElementById(
id
);



if(target){

target.classList.add(
"active"
);

}


};









// 所有页面按钮


document
.addEventListener(
"click",
e=>{


let btn =
e.target.closest(
"[data-page]"
);



if(btn){


showPage(
btn.dataset.page
);


}







let back =
e.target.closest(
"[data-back]"
);



if(back){


showPage(
back.dataset.back
);


}




});











// 保存日志


let save =
document.getElementById(
"saveLog"
);



if(save){


save.addEventListener(
"click",
()=>{



let stage =
document.getElementById(
"logStage"
).value;



let title =
document.getElementById(
"logTitle"
).value;



let content =
document.getElementById(
"logContent"
).value.trim();





if(!content){


alert(
"请输入施工内容"
);


return;


}






let input =
document.getElementById(
"logImages"
);




let files =
input.files;



let photos=[];




if(files.length===0){


finishSave();


}
else{



let count=0;



Array.from(files)
.forEach(
file=>{


let reader=
new FileReader();



reader.onload=function(e){


photos.push(
e.target.result
);



count++;



if(count===files.length){


finishSave();


}


};



reader.readAsDataURL(
file
);



});



}








function finishSave(){



addLog({

title:title,


stage:stage,


content:content,


photos:photos,


date:
new Date()
.toLocaleDateString()



});






document
.getElementById(
"logTitle"
).value="";



document
.getElementById(
"logContent"
).value="";



input.value="";





renderLogs();



showPage(
"logs"
);



}



});



}









// 日志列表点击详情


let list =
document.getElementById(
"logList"
);



if(list){


list.addEventListener(
"click",
e=>{



let card =
e.target.closest(
".log-card"
);



if(
card
&&
!e.target.closest("button")
){



let index =
[
...list.children
]
.indexOf(card);



let logs =
getLogs();



if(logs[index]){


showLogDetail(
logs[index].id
);


}



}



});



}







// 初始化


if(typeof renderLogs==="function"){

renderLogs();

}



});
