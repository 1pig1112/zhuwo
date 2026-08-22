"use strict";


document.addEventListener(
"DOMContentLoaded",
()=>{


// 页面切换

window.showPage=function(id){


document
.querySelectorAll(".page")
.forEach(
page=>{
page.classList.remove("active");
}
);


const target=
document.getElementById(id);


if(target){

target.classList.add("active");

}


};




// 返回按钮

document
.addEventListener(
"click",
e=>{


const back=
e.target.closest("[data-back]");


if(back){

showPage(
back.dataset.back
);

}



});






// 底部导航

document
.querySelectorAll("[data-page]")
.forEach(
btn=>{


btn.addEventListener(
"click",
()=>{


showPage(
btn.dataset.page
);


});


});







// 启动页

setTimeout(()=>{


const splash=
document.getElementById("splash");


const app=
document.getElementById("app");



if(splash)
splash.classList.add("hidden");



if(app)
app.classList.remove("hidden");



},1000);




});
