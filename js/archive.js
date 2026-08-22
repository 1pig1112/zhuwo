// ======================
// 猪窝 V2.0
// archive.js
// 档案管理系统
// ======================



const ARCHIVE_KEY = {

    material:"zhuwo_material",

    contract:"zhuwo_contract",

    finance:"zhuwo_finance"

};





// ======================
// 材料档案
// ======================


function getMaterials(){

    return getData(
        ARCHIVE_KEY.material
    );

}





function addMaterial(data){


    let list=getMaterials();


    data.id=createId();


    data.time=
    new Date()
    .toLocaleDateString();



    list.unshift(data);



    saveData(
        ARCHIVE_KEY.material,
        list
    );


    return data;

}





function deleteMaterial(id){


    let list=getMaterials();


    list=list.filter(
        x=>x.id!==id
    );


    saveData(
        ARCHIVE_KEY.material,
        list
    );


}









// ======================
// 合同档案
// ======================


function getContracts(){


    return getData(
        ARCHIVE_KEY.contract
    );


}




function addContract(data){


    let list=getContracts();


    data.id=createId();


    data.time=
    new Date()
    .toLocaleDateString();



    list.unshift(data);



    saveData(
        ARCHIVE_KEY.contract,
        list
    );


}







function deleteContract(id){


    let list=getContracts();


    list=list.filter(
        x=>x.id!==id
    );


    saveData(
        ARCHIVE_KEY.contract,
        list
    );


}









// ======================
// 财务记录
// ======================



function getFinance(){


    return getData(
        ARCHIVE_KEY.finance
    );


}





function addFinance(data){


    let list=getFinance();


    data.id=createId();


    data.time=
    new Date()
    .toLocaleDateString();



    list.unshift(data);



    saveData(
        ARCHIVE_KEY.finance,
        list
    );


}





function deleteFinance(id){


    let list=getFinance();



    list=list.filter(
        x=>x.id!==id
    );


    saveData(
        ARCHIVE_KEY.finance,
        list
    );


}
