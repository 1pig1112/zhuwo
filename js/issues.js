// ======================
// 猪窝 V2.0
// issues.js
// 问题清单系统
// ======================



function getIssues(){

    return getData(
        ZHUWO_DB.issues
    );

}



//新增问题

function addIssue(data){


    let list=getIssues();


    data.id=createId();


    data.time=
    new Date()
    .toLocaleDateString();



    if(!data.status){

        data.status="待处理";

    }



    list.unshift(data);



    saveData(
        ZHUWO_DB.issues,
        list
    );


    return data;


}






//修改状态

function updateIssueStatus(
id,
status
){


    let list=getIssues();



    let item=list.find(
        x=>x.id===id
    );



    if(item){

        item.status=status;

    }



    saveData(
        ZHUWO_DB.issues,
        list
    );



}








//删除问题

function deleteIssue(id){


    let list=getIssues();



    list=list.filter(
        x=>x.id!==id
    );



    saveData(
        ZHUWO_DB.issues,
        list
    );


}








//获取问题


function getIssue(id){


    let list=getIssues();


    return list.find(
        x=>x.id===id
    );


}








//显示问题列表


function renderIssues(){


    let box=
    document.getElementById(
        "issueList"
    );


    if(!box)return;



    let list=getIssues();



    if(list.length===0){


        box.innerHTML=
        `
        <div class="empty">
        暂无问题
        </div>
        `;


        return;

    }






    box.innerHTML=
    list.map(item=>{


        return`

        <div class="issue-card">


        <div class="issue-title">

        ${item.title||"装修问题"}

        </div>



        <div>

        位置：
        ${item.location||"-"}

        </div>



        <div>

        状态：
        ${item.status}

        </div>



        <p>

        ${item.content||""}

        </p>


        </div>


        `;


    }).join("");



}
