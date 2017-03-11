
$(function(){
    
    var ajaxInit = new XMLHttpRequest();
    var url = "dogData.json";

    ajaxInit.open("GET", url, true); // True for sync
    ajaxInit.setRequestHeader("content-type","application/json");
    ajaxInit.onreadystatechange = function(){
        if(ajaxInit.readyState == 4 && ajaxInit.status == 200){
            var dogJson = ajaxInit.responseText;
            console.log(dogJson);
            console.log(ajaxInit);
        }
    }   
    ajaxInit.send(null);
})       