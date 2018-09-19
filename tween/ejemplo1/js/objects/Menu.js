class Menu{
    constructor(name){
        this.name = name;
        this.barra_element = document.getElementById("barra");
        this.barra_element.addEventListener("click",this.getOpenClose);
        this.status = "close";
    }
    getOpenClose(event){
        console.log("apretado");
        if (this.close){
            move("open");
        }else{
            move("close");
        }
    }
    move(open_close){
        if (open_close == "open"){

        }else if(open_close == "close"){

        }
    }
}