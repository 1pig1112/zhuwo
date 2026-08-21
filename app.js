// ===============================
// 猪窝 PWA app.js V1.0.2
// ===============================


(function(){


"use strict";



// ===============================
// 启动
// ===============================


document.addEventListener("DOMContentLoaded",function(){



    // 启动画面

    setTimeout(function(){

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


    },1500);





    // 初始化

    initNavigation();

    initLog();

    renderLogs();



});





// ===============================
// 页面导航
// ===============================


function initNavigation(){


    const buttons =
    document.querySelectorAll("nav button");



    buttons.forEach(function(btn){


        btn.addEventListener("click",function(){


            openPage(
                btn.dataset.page
            );


        });


    });



}





window.openPage=function(id){


    document
    .querySelectorAll(".page")
    .forEach(function(page){

        page.classList.remove("active");

    });



    const target =
    document.getElementById(id);



    if(target){

        target.classList.add("active");

    }



    document
    .querySelectorAll("nav button")
    .forEach(function(btn){


        btn.classList.remove("active");


        if(btn.dataset.page===id){

            btn.classList.add("active");

        }


    });



};







// ===============================
// 施工日志
// ===============================



let logs = [];



function initLog(){



    try{


        logs =
        JSON.parse(
            localStorage.getItem(
                "pig_logs"
            )
        ) || [];


    }catch(e){

        logs=[];

    }







    // 新增按钮

    const addBtn =
    document.getElementById(
        "addLogBtn"
    );



    if(addBtn){


        addBtn.addEventListener(
            "click",
            function(){


                showLogForm();


            }
        );


    }






    // 图片选择

    const imageInput =
    document.getElementById(
        "logImages"
    );


    if(imageInput){


        imageInput.addEventListener(
            "change",
            previewImages
        );


    }




}





window.showLogForm=function(){


    const form =
    document.getElementById(
        "logForm"
    );


    if(form){

        form.classList.remove(
            "hidden"
        );

    }


};






window.hideLogForm=function(){


    const form =
    document.getElementById(
        "logForm"
    );


    if(form){

        form.classList.add(
            "hidden"
        );

    }


};







let images=[];



function previewImages(e){


    images=[];


    const box =
    document.getElementById(
        "imagePreview"
    );


    if(box){

        box.innerHTML="";

    }




    Array.from(
        e.target.files
    )
    .forEach(function(file){


        const url =
        URL.createObjectURL(
            file
        );


        images.push(url);



        if(box){


            const img =
            document.createElement(
                "img"
            );


            img.src=url;


            box.appendChild(img);


        }


    });



}







window.saveLog=function(){



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





    const item={


        id:Date.now(),


        date:
        new Date()
        .toISOString()
        .slice(0,10),


        stage:stage,


        content:content,


        images:images



    };





    logs.unshift(item);



    localStorage.setItem(
        "pig_logs",
        JSON.stringify(logs)
    );



    renderLogs();



    document.getElementById(
        "logContent"
    ).value="";



    hideLogForm();



};







function renderLogs(){


    const list =
    document.getElementById(
        "logList"
    );



    const recent =
    document.getElementById(
        "recentLog"
    );



    if(!list){

        return;

    }




    if(logs.length===0){


        list.innerHTML=
        `
        <div class="empty">
        暂无施工记录
        </div>
        `;


        if(recent){

            recent.innerHTML=
            "暂无装修记录";

        }


        return;

    }






    list.innerHTML="";





    logs.forEach(function(log){


        const div =
        document.createElement(
            "div"
        );


        div.className=
        "log-card";



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
            `<div>📷 ${log.images.length}张照片</div>`
            :
            ""
        }

        `;



        list.appendChild(div);



    });






    if(recent){


        const last =
        logs[0];


        recent.innerHTML=
        `
        ${last.date}
        <br>
        ${last.stage}
        <br>
        ${last.content}
        `;


    }



}







// ===============================
// Service Worker
// ===============================


if(
"serviceWorker" in navigator
){


    navigator.serviceWorker.register(
        "./service-worker.js"
    );


}



})();
