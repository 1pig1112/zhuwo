// ======================
// 猪窝 V2.0
// logs.js
// 施工日志系统
// ======================


function getLogs(){

    return getData(ZHUWO_DB.logs);

}



//新增施工日志

function addLog(data){

    let logs=getLogs();


    data.id=createId();

    data.time=new Date()
    .toLocaleDateString();


    logs.unshift(data);


    saveData(
        ZHUWO_DB.logs,
        logs
    );


    return data;

}



//删除日志

function deleteLog(id){

    let logs=getLogs();


    logs=logs.filter(
        item=>item.id!==id
    );


    saveData(
        ZHUWO_DB.logs,
        logs
    );

}



//获取单条日志

function getLog(id){

    let logs=getLogs();


    return logs.find(
        item=>item.id===id
    );

}



//渲染日志列表

function renderLogs(){

    let box=document.getElementById(
        "logList"
    );


    if(!box)return;


    let logs=getLogs();



    if(logs.length===0){

        box.innerHTML=
        `
        <div class="empty">
        暂无施工记录
        </div>
        `;

        return;

    }



    box.innerHTML=
    logs.map(log=>{


        let imgs="";


        if(log.photos){

            imgs=
            log.photos.map(p=>
            `
            <img src="${p}">
            `
            ).join("");

        }



        return`

        <div class="log-card">


        <div class="log-date">

        ${log.date||""}

        </div>


        <h3>

        ${log.title||"施工记录"}

        </h3>



        <p>

        ${log.content||""}

        </p>



        <div class="photos">

        ${imgs}

        </div>



        </div>


        `;


    }).join("");



}
