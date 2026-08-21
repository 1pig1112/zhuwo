// =====================
// 猪窝 PWA V1.0.1
// app.js
// =====================


document.addEventListener("DOMContentLoaded",()=>{


// 启动画面

setTimeout(()=>{

    document
    .getElementById("splash")
    .classList.add("hidden");


    document
    .getElementById("app")
    .classList.remove("hidden");


},1500);





// =====================
// 页面切换
// =====================


window.openPage=function(id){


    document
    .querySelectorAll(".page")
    .forEach(page=>{

        page.classList.remove("active");

    });



    const target=document.getElementById(id);


    if(target){

        target.classList.add("active");

    }



    document
    .querySelectorAll("nav button")
    .forEach(btn=>{

        btn.classList.remove("active");


        if(btn.dataset.page===id){

            btn.classList.add("active");

        }

    });


};





document
.querySelectorAll("nav button")
.forEach(btn=>{


    btn.addEventListener("click",()=>{


        openPage(btn.dataset.page);


    });


});






// =====================
// 施工日志数据
// =====================


let logs =
JSON.parse(
localStorage.getItem("pig_logs")
)
|| [];





function saveStorage(){

    localStorage.setItem(
        "pig_logs",
        JSON.stringify(logs)
    );

}






// =====================
// 打开新增日志
// =====================

const addLogBtn =
document.getElementById("addLogBtn");


if(addLogBtn){

    addLogBtn.addEventListener(
        "click",
        ()=>{

            document
            .getElementById("logForm")
            .classList.remove("hidden");

        }
    );

}


window.showLogForm=function(){

    document
    .getElementById("logForm")
    .classList.remove("hidden");

};






window.hideLogForm=function(){


    document
    .getElementById("logForm")
    .classList.add("hidden");


};







// =====================
// 图片预览
// =====================


let selectedImages=[];



document
.getElementById("logImages")
.addEventListener("change",function(e){


    selectedImages=[];


    const preview=
    document.getElementById("imagePreview");


    preview.innerHTML="";



    Array.from(e.target.files)
    .forEach(file=>{


        const url=
        URL.createObjectURL(file);



        selectedImages.push(url);



        const img=
        document.createElement("img");


        img.src=url;


        preview.appendChild(img);



    });



});







// =====================
// 保存日志
// =====================


window.saveLog=function(){



    const stage=
    document
    .getElementById("logStage")
    .value;



    const content=
    document
    .getElementById("logContent")
    .value
    .trim();



    if(!content){

        alert("请填写施工内容");

        return;

    }





    const log={


        id:Date.now(),


        date:
        new Date()
        .toISOString()
        .slice(0,10),


        stage,


        content,


        images:selectedImages



    };




    logs.unshift(log);



    saveStorage();



    renderLogs();



    hideLogForm();



    document
    .getElementById("logContent")
    .value="";


};







// =====================
// 渲染日志
// =====================


function renderLogs(){



    const box=
    document.getElementById("logList");



    const recent=
    document.getElementById("recentLog");



    if(logs.length===0){


        box.innerHTML=
        `
        <div class="empty">
        暂无施工记录
        </div>
        `;


        recent.innerHTML=
        "暂无装修记录";


        return;

    }






    box.innerHTML="";



    logs.forEach(log=>{


        const div=
        document.createElement("div");



        div.className="log-card";



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


        ${
            log.images.length
            ?
            `<div class="photo-count">
            📷 ${log.images.length} 张照片
            </div>`
            :
            ""
        }

        `;



        box.appendChild(div);



    });






    const last=logs[0];



    recent.innerHTML=
    `
    ${last.date}
    <br>
    ${last.stage}
    <br>
    ${last.content}
    `;




}





renderLogs();






// =====================
// PWA缓存
// =====================


if("serviceWorker" in navigator){


    navigator.serviceWorker
    .register("./service-worker.js");


}


});
