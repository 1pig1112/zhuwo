"use strict";


// ======================
// 猪窝 V2.0
// app.js
// ======================



document.addEventListener(
"DOMContentLoaded",
()=>{



// 启动页

setTimeout(()=>{


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







// 页面切换


window.showPage=function(id){



document
.querySelectorAll(".page")
.forEach(page=>{


page.classList.remove("active");


});





const target =
document.getElementById(id);



if(target){

target.classList.add("active");

}



};









// 全局点击


document.addEventListener(
"click",
e=>{



const pageBtn =
e.target.closest(
"[data-page]"
);



if(pageBtn){

showPage(
pageBtn.dataset.page
);

}





const backBtn =
e.target.closest(
"[data-back]"
);



if(backBtn){

showPage(
backBtn.dataset.back
);

}



});









// 保存施工日志


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




const title =
document.getElementById(
"logTitle"
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







const input =
document.getElementById(
"logImages"
);




const files =
Array.from(
input.files
);



let photos=[];





if(files.length===0){


save();

}


else{



let count=0;



files.forEach(file=>{


const reader =
new FileReader();



reader.onload=function(e){


photos.push(
e.target.result
);



count++;



if(count===files.length){

save();

}



};



reader.readAsDataURL(
file
);



});



}





function save(){



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






// 初始化日志


if(typeof renderLogs==="function"){

renderLogs();

}




});
