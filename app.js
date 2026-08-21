document.addEventListener("DOMContentLoaded",()=>{


/*
启动页
*/

setTimeout(()=>{

    document.getElementById("splash").classList.add("hidden");

    document.getElementById("app").classList.remove("hidden");

},1800);



/*
底部导航切换
*/


const navButtons=document.querySelectorAll("nav button");

const pages=document.querySelectorAll(".page");



navButtons.forEach(btn=>{


    btn.addEventListener("click",()=>{


        const target=btn.dataset.page;



        pages.forEach(page=>{


            page.classList.remove("active");


            if(page.id===target){

                page.classList.add("active");

            }


        });



        navButtons.forEach(b=>{

            b.classList.remove("active");

        });


        btn.classList.add("active");



    });


});



/*
首页快捷入口
*/


const cards=document.querySelectorAll(".grid button");


cards.forEach(card=>{


    card.addEventListener("click",()=>{


        const text=card.innerText;



        if(text.includes("施工日志")){

            openPage("logs");

        }


        if(text.includes("问题清单")){

            openPage("issues");

        }


        if(text.includes("材料档案")){

            openPage("archive");

        }


        if(text.includes("合同档案")){

            openPage("archive");

        }


    });


});



function openPage(id){


    pages.forEach(page=>{

        page.classList.remove("active");

        if(page.id===id){

            page.classList.add("active");

        }

    });



}



});
if("serviceWorker" in navigator){

    navigator.serviceWorker.register("./service-worker.js");

}
