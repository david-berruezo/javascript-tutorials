/**
 * Created by david on 31/07/17.
 * Comparamos dos strings
 */

$(document).ready(function(){
    var str1 = "pedro";
    var str2 = "pedro";
    var str3 = "casa";
    var n = str1.localeCompare(str2);
    console.log("El valor comparación igual de n es:"+n);
    n = str1.localeCompare(str3);
    console.log("El valor comparación diferente de n es:"+n);
});