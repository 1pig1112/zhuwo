"use strict";



document.addEventListener(
"DOMContentLoaded",
()=>{





// ======================
// 启动页
// ======================


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





},1200);









// ======================
// 页面切换
// ======================



window.showPage=function(id){



document
.querySelectorAll(".page")
.forEach(
page=>{


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










// ======================
// 底部导航
// ======================



document
.querySelectorAll(
"nav button"
)
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










// ======================
// 返回按钮
// ======================



document
.querySelectorAll(
"[data-back]"
)
.forEach(
btn=>{


btn.addEventListener(
"click",
()=>{


showPage(
btn.dataset.back
);


});


});









// ======================
// 首页进入日志
// ======================



document
.querySelectorAll(
"[data-page]"
)
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







});
