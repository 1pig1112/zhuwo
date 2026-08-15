const KEY = "zhuwo_v2";

let data = JSON.parse(
localStorage.getItem(KEY)
) || {

project:{
name:"我的装修",
budget:95000,
spent:0
},

changes:[],

quotes:[],

chats:[],

checks:[]

};



// 保存

function save(){

localStorage.setItem(
KEY,
JSON.stringify(data)
);

}





// 页面切换

function openPage(id){

document.querySelectorAll(".page")
.forEach(p=>{

p.classList.remove("active");

});


document.getElementById(id)
.classList.add("active");


window.scrollTo(0,0);

}




function backHome(){

openPage("home");

}




// 初始化

function init(){


document.getElementById("projectName")
.innerText =
data.project.name;



document.getElementById("budget")
.innerText =
"¥"+data.project.budget;



document.getElementById("spent")
.innerText =
"¥"+data.project.spent;



document.getElementById("risk")
.innerText =
data.quotes.length+
"项";



renderChanges();


}




// 合同折叠

document.querySelectorAll(".collapse-head")
.forEach(head=>{


head.onclick=function(){


this.parentElement.classList.toggle("open");


let s=this.querySelector("span");


s.innerText =
s.innerText==="+"?
"-":
"+";


}


});







// 增项


function addChange(){


let name =
prompt(
"请输入增项名称"
);


if(!name)return;


let money =
prompt(
"请输入金额"
);


data.changes.push({

name:name,

money:Number(money)||0,

status:"待确认",

date:new Date()
.toLocaleDateString()

});


save();

renderChanges();


}





function renderChanges(){


let box =
document.getElementById(
"changeList"
);


if(!box)return;



if(data.changes.length===0){

box.innerHTML=
`
<div class="empty">
暂无增项记录
</div>
`;

return;

}



box.innerHTML="";



data.changes.forEach((item,index)=>{


box.innerHTML+=

`

<div class="card">


<h3>

${item.name}

</h3>


<p>

金额：
¥${item.money}

</p>


<p>

状态：
${item.status}

</p>



<button 
class="secondary"
onclick="deleteChange(${index})">

删除

</button>


</div>

`;



});



}




function deleteChange(i){


if(confirm("删除这条增项？")){


data.changes.splice(i,1);


save();


renderChanges();


}


}







// 设置保存


function saveSetting(){


let name =
document.getElementById(
"setProject"
).value;



let budget =
document.getElementById(
"setBudget"
).value;



if(name){

data.project.name=name;

}


if(budget){

data.project.budget=
Number(budget);

}


save();


init();


alert("保存成功");

}




// 导出数据


function exportData(){


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



a.download =
"猪窝备份.json";


a.click();


}





// 清空


function clearData(){


if(confirm(
"确定删除全部装修数据？"
)){


localStorage.removeItem(KEY);


location.reload();


}


}




init();
