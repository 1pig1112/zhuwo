"use strict";


const LogManager = {


key:"pig_logs",



getAll(){

    return PigStorage.get(
        this.key
    );

},




add(data){

    let logs=this.getAll();


    logs.unshift({

        id:Date.now(),

        date:
        new Date()
        .toLocaleDateString(),


        stage:data.stage,


        content:data.content,


        images:data.images || []

    });



    PigStorage.set(
        this.key,
        logs
    );


},




delete(id){

    let logs=this.getAll();


    logs =
    logs.filter(
        item=>item.id!==id
    );


    PigStorage.set(
        this.key,
        logs
    );


}



};
