
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
                var trackerName;
                var trackerID;
                var GeoLo_E;
                var GeoLo_N;
                var receiveTime;
                var k = 0;

                function showData_Tracker1() {
                    var dogData = device[Object.keys(device)[0]][k].data;
                    trackerName = dogData.device_name;
                    GeoLo_N = dogData.GPS_N;
                    GeoLo_E = dogData.GPS_E;
                    receiveTime = dogData.recv;
                    var dataOut = trackerName + "\n" + GeoLo_E + "\n" + GeoLo_N + "\n" + receiveTime;
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
                    trackerName = dogData.device_name;
                    GeoLo_N = dogData.GPS_N;
                    GeoLo_E = dogData.GPS_E;
                    receiveTime = dogData.recv;
                    var dataOut = trackerName + "\n" + GeoLo_E + "\n" + GeoLo_N + "\n" + receiveTime;
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
                
                function IDGeoLoTime_I  (){
                    var jsonArr = [];
                    if(trackerName == "追蹤器_34")
                        trackerID = 0;
                    else if(trackerName == "Tracker_0035")
                        trackerID = 1;
                    jsonArr.push({TrackerID: trackerID , N: GeoLo_N, E: GeoLo_E , Time: receiveTime });
                    return jsonArr;
                }

                function iot_app(){
                  
                    
                }

                var profile = {
                    'dm_name': 'DogInput',
                    'is_sim': false,
                    'df_list':[IDGeoLoTime_I],
                    'origin_df_list': [IDGeoLoTime_I],

                }

        
                var ida = {
                        'iot_app': iot_app,
                    }; // How iot device receive data (format)
                dai(profile,ida);   
            }
        });
    }
})       
