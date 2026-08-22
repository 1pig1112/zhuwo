"use strict";

/*
 猪窝 V2.0
 数据存储核心
*/


const PigStorage = {


    get(key){

        try{

            return JSON.parse(
                localStorage.getItem(key)
            ) || [];

        }catch(e){

            return [];

        }

    },



    set(key,data){

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

    },



    remove(key){

        localStorage.removeItem(key);

    }


};
