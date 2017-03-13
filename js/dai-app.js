
$(function(){

    var dogDom = $('#showDogInfo > textarea');
    var ajaxInit = new XMLHttpRequest();
    var url = "dogData.json";
    ajaxInit.open("GET", url, true); // True for sync
    ajaxInit.setRequestHeader("content-type","application/json");
    ajaxInit.onreadystatechange = function(){
        if(ajaxInit.readyState == 4 && ajaxInit.status == 200)
            var dogJson = JSON.parse(ajaxInit.responseText);
        processData(dogJson);
    }   
    ajaxInit.send(null);

    function processData(dogJson)
    {
        $.each( dogJson, function(i, device) {
            if(device.code);
            else 
            {
                var k = 0;
                function showData_Tracker1() {
                    var dogData = device[Object.keys(device)[0]][k].data;
                    var dataOut = dogData.device_name + "\n" + dogData.GPS_E + "\n" + dogData.GPS_N + "\n" + dogData.recv;
                    dogDom.text(dataOut);
                    k++;
                    if( k < device[Object.keys(device)[0]].length ){
                        setTimeout( showData_Tracker1, 3000 );
                    }
                    else 
                    {
                        k = 0;
                        showData_Tracker2();
                    }
                }
                showData_Tracker1();
                function showData_Tracker2() {
                    var dogData = device[Object.keys(device)[1]][k].data;
                    var dataOut = dogData.device_name + "\n" + dogData.GPS_E + "\n" + dogData.GPS_N + "\n" + dogData.recv;
                    dogDom.text(dataOut);
                    k++;
                    if( k < device[Object.keys(device)[1]].length ){
                        setTimeout( showData_Tracker1, 3000 );
                    }
                }
                /*
                for(var j = 0; j < Object.keys(device).length; j++)
                {
                    $.each( device[Object.keys(device)[j]], function(k, dogData)
                    {
                        setTimeout(showData(dogData), 5000)
                    });
                }

                function showData(dogData)
                {
                    console.log(dogData);
                }
                */
            }
        });
    }
})       