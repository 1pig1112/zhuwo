const KEY = "zhuwo_v3";


let data = JSON.parse(
localStorage.getItem(KEY)
) || {

project:{
name:"我的新家",
start:"2026-08-01",
stage:"水电施工",
progress:45
},


diary:[],


money:{
total:95000,
paid:30000
},


work:[]

};




// 保存数据

function save(){

localStorage.setItem(
KEY,
JSON.stringify(data)
);

}



// 页面切换

function openPage(id){


document
.querySelectorAll(".page")
.forEach(page=>{

page.classList.remove("active");

});



let target =
document.getElementById(id);



if(target){

target.classList.add("active");

}


window.scrollTo(0,0);

}





function backHome(){

openPage("home");

}






// 初始化首页


function init(){


document
.getElementById("currentStage")
.innerText =
data.project.stage;



document
.getElementById("progressNum")
.innerText =
data.project.progress;



document
.getElementById("progressBar")
.style.width =
data.project.progress+"%";



// 装修天数

let start =
new Date(data.project.start);


let today =
new Date();


let days =
Math.floor(
(today-start)
/86400000
)+1;



document
.getElementById("dayText")
.innerText =
"你的新家正在慢慢变好 ❤️ 已装修 "+days+" 天";



}





// 修改进度

function updateProgress(num){


data.project.progress=num;


save();


init();


}






// 添加施工记录


function addWork(){


let text =
prompt(
"今天施工完成了什么？"
);



if(!text)return;



data.work.push({

date:
new Date()
.toLocaleDateString(),


content:text

});



save();



alert(
"已记录 🐷"
);


}





// 添加日记


function addDiary(){


let text =
prompt(
"记录今天装修变化"
);



if(!text)return;



data.diary.push({

date:
new Date()
.toLocaleDateString(),


text:text

});



save();



alert(
"装修日记保存成功 🌸"
);


}






// 添加付款


function addMoney(){


let money =
prompt(
"输入付款金额"
);



if(!money)return;



data.money.paid +=
Number(money);



save();


alert(
"付款已记录"
);


}





// 数据备份


function backup(){


let blob =
new Blob(

[
JSON.stringify(
data,
null,
2
)

],

{
type:"application/json"
}

);



let a =
document.createElement("a");


a.href =
URL.createObjectURL(blob);


a.download=
"猪窝装修备份.json";


a.click();


}






// 页面启动


init();
