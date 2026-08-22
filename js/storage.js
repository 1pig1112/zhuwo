// ======================
// 猪窝 V2.0
// storage.js
// 本地数据中心
// ======================


const ZHUWO_DB = {

    logs:"zhuwo_logs",

    issues:"zhuwo_issues",

    archive:"zhuwo_archive",

    settings:"zhuwo_settings"

};


// 保存

function saveData(key,data){

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


//读取

function getData(key){

    let data = localStorage.getItem(key);

    if(!data){

        return [];

    }


    try{

        return JSON.parse(data);

    }

    catch(e){

        return [];

    }

}


//删除

function removeData(key){

    localStorage.removeItem(key);

}


//生成ID

function createId(){

    return Date.now()
    +
    Math.floor(Math.random()*999);

}
