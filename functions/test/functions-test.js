/*
//Regular Function:
hello = function() {
  document.getElementById("demo").innerHTML += this;
}

//The window object calls the function:
window.addEventListener("load", hello);

//A button object calls the function:
document.getElementById("btn").addEventListener("click", hello);
*/

  // Arrow Function:   
  hello = () => {
    document.getElementById("demo").innerHTML += this;
  }
  
  //The window object calls the function:
  window.addEventListener("load", hello);
  
  //A button object calls the function:
  document.getElementById("btn").addEventListener("click", hello);
