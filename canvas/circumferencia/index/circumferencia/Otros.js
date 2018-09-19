/*
// Save inputs
function choose_input_formula(id){
    switch(id){
        case "one_option":n_formula_add_angles = 1;console.log("1");
            break;
        case "two_option":n_formula_add_angles = 2;console.log("2");
            break;
        case "three_option":n_formula_add_angles = 3;console.log("3");
            break;
    }
}
 onclick="choose_input_formula(this.id)"

inputs = document.getElementsByTagName("input");
    for (var i=0;i<inputs.length;i++){
        console.log("index: "+i+" input checked: "+inputs[i].checked);
        var objeto = inputs[i];
        console.log("Objeto: "+objeto);
        objeto.addEventListener("click",function(this){
            console.log("Apretado: "+objeto.id);
            n_formula_add_angles = i;
        })
    }
*/