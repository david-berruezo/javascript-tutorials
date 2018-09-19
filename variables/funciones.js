/**
 * Created by david on 25/11/17.
 */
window.onload = function(){
  var variable1;
  var variable2 = "valor";
  if (typeof(variable1) == 'undefined') {
      console.log("variable1 undefined");
  }else{
      console.log("variable1: "+variable1);
  }

  if (typeof(variable2) == 'undefined') {
      console.log("variable2 undefined");
  }else{
      console.log("variable2: "+variable2);
  }

  if (!variable1) {
    console.log("No hay valor para variable1");
  }else{
      console.log("Hay valor para variable1");
  }

  if (!variable2) {
      console.log("No hay valor para variable2");
  }else{
      console.log("Hay valor para variable2");
  }
};