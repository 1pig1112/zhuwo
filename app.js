"use strict";


// ======================
// 猪窝 V2.0
// app.js
// 页面控制中心
// ======================



document.addEventListener(
"DOMContentLoaded",
()=>{



// ----------------------
// 启动页
// ----------------------


setTimeout(()=>{


const splash =
document.getElementById(
"splash"
);



const app =
document.getElementById(
"app"
);



if(splash){

splash.classList.add(
"hidden"
);

}



if(app){

app.classList.remove(
"hidden"
);

}



},1500);







// ----------------------
// 页面切换
// ----------------------


window.showPage=function(id){



document
.querySelectorAll(".page")
.forEach(page=>{


page.classList.remove(
"active"
);


});




const target =
document.getElementById(
id
);



if(target){

target.classList.add(
"active"
);

}



};








// ----------------------
// 所有页面按钮
// ----------------------



document
.addEventListener(
"click",
e=>{



const btn =
e.target.closest(
"[data-page]"
);



if(btn){


showPage(
btn.dataset.page
);



}





const back =
e.target.closest(
"[data-back]"
);



if(back){


showPage(
back.dataset.back
);



}





});








// ----------------------
// 日志保存
// ----------------------



const saveLog =
document.getElementById(
"saveLog"
);



if(saveLog){



saveLog.addEventListener(
"click",
()=>{



const stage =
document.getElementById(
"logStage"
)?.value;



const title =
document.getElementById(
"logTitle"
)?.value;



const content =
document.getElementById(
"logContent"
)?.value;





if(!content){

alert(
"请输入施工内容"
);

return;

}






let photos=[];


const files =
document.getElementById(
"logImages"
)?.files;



if(files){


Array.from(files)
.forEach(file=>{


const reader =
new FileReader();


reader.onload=e=>{

photos.push(
e.target.result
);


};


reader.readAsDataURL(
file
);


});


}






setTimeout(()=>{



addLog({


title:title,

stage:stage,

content:content,

photos:photos,

date:
new Date()
.toLocaleDateString()



});





document.getElementById(
"logContent"
).value="";



showPage(
"logs"
);



renderLogs();



},500);





});



}







// ----------------------
// 初始渲染
// ----------------------


if(typeof renderLogs==="function"){

renderLogs();

}



if(typeof renderIssues==="function"){

renderIssues();

}





});
