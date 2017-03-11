$(
    function initMap() {
        map = new google.maps.Map(document.getElementById('Location-map'), {
        center: {lat: 23.5832340, lng: 120.5825975},
        zoom: 3});
    }
);
// https://developers.google.com/maps/documentation/javascript/examples/polyline-simple?hl=zh-tw
/////////////
/////////////
// $(function() function initMap()); Doesn't Work!
$(function(){
        var pinColor = "ffffff";
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));
        var markers = [];
        var interval = 12000; // 1000ms = 1sec
        var output = {lat: 23.5832340, lng:120.5825975};
        var latDom = $('#lat > span');
        var lngDom = $('#lng > span');
        var markersDom = $('#markers > span');
        var centerRead = "" // Set Flag, We only update center once
        var r;
        var g;
        var b;
        var lat;
        var lng;
        var temp_r;
        var temp_g;
        var temp_b;
        var temp_lat;
        var temp_lng;
        var _lat;
        var _lng;
        var description;
        var EQ_1;
        var EQ_2;
        var parent = [];
        /* var $Name = $('#Name');
        var $Lat = $('#Lat');
        var $Lng = $('#Lng');
        $('#AddLo').on('click', function(){
                             var Location = {Name: $Name.val(),Lat: $Lat.val(), Lng: $Lng.val()};
                             $.ajax({
                             type: 'POST',
                             url: 'http://localhost/GeoLo/index.html',
                             data: Location,
                             success: function(NewLocation){
                             $('#UserData').append('<li>' + Location.Name + '</li>'),
                             addMarker(Location.Lat, Location.Lng);
                             },
                             error: function()
                             {alert('Error');}
                             });
                            }); */
        google.maps.event.addListener(map,"click", function(event){            
            var str = prompt('Where is this place?','toilet');
            if(str)
            {
                //deleteMarkers();//doesn't work
                markersDom.append('<button class=".btn-default delete" >'+event.latLng+'</button>');
                var infowindow = new google.maps.InfoWindow(
                {
                   content: str
                });
                var marker_Click = new google.maps.Marker({
                    map: map,
                    position:event.latLng,
                    content: str
                }); 
                marker_Click.addListener('click', function() {
                               infowindow.open(map, marker_Click);
                });
                markers.push(marker_Click);
/*var oldBounds = null;
var quadTree = new QuadTree(markers);
console.log("Built quadtree with size "+quadTree.size);
google.maps.event.addListener(map,'idle', function() {
    if(oldBounds !== null) {
        quadTree.queryRectangle(oldBounds).map(function(x){x.setMap(null);});
        console.log("Old bounds:"+oldBounds);
    }
    var bounds = map.getBounds();
    quadTree.queryRectangle(bounds).map(function(x){x.setMap(map);});
    oldBounds = bounds;
});*/
                var temp_pos = event.latLng;
                var ttemp_lat = temp_pos.lat();
                var ttemp_lng = temp_pos.lng();
                $('#lat').val(ttemp_lat) ; 
                $('#lng').val(ttemp_lng) ;
                $('#description').val(str) ;
            }
                 
        });
        $('#submit').on('click', function(){
            $('#submit').toggle(500).toggle(500);
            var temp_lat = _lat;
            var temp_lng = _lng;
            _lat = parseFloat($('#lat').val()); // -16, 54
            if(_lat < -16 || _lat > 54)
            {
                alert("Invalid input!");
                $('#lat').val("");
                _lat = temp_lat;
                _lng = temp_lng;
                return false;
            }
            _lng = parseFloat($('#lng').val()); // 61, 179
            if(_lng < 61 || _lng > 179)
            {
                alert("Invalid input!");
                $('#lng').val("");
                _lng = temp_lng;
                _lat = temp_lat;
                return false;
            }
            description = $('#description').val();
            console.log("lat", _lat);
            console.log("lng", _lng);
            console.log("description", description);
            $('#lat').val("");
            $('#lng').val("");
            $('#description').val("");

            if($('#red').hasClass('clicked'))
            {
                r = 255;
                g = 0;
                b = 0;
            }
            if($('#orange').hasClass('clicked'))
            {
                r = 255;
                g = 85;
                b = 17;
            }
            if($('#purple').hasClass('clicked'))
            {
                r = 102;
                g = 0;
                b = 255;
            }
            if($('#green').hasClass('clicked'))
            {
                r = 0;
                g = 255;
                b = 0;
            }        
        });

        $('.button').on('click', function() {
            $('.button').removeClass('clicked');
            $(this).toggleClass('clicked');
        });
    

        function Color_I () {
            var arr = [];
            arr.push(r);
            arr.push(g);
            arr.push(b);
            return arr;
        }

        function GeoLo_I () {
            var arr = [];
            arr.push(_lat);
            arr.push(_lng);
            return arr;
            
        }

        function Description_I(){
            var arr = [];
            arr.push(description);
            return arr;
        }

        function EQ_I(){
            var arr = [];
            arr.push(EQ_1);
            arr.push(EQ_2);
            return arr;
        }

        function Color_O (data)
        {
            r = data[0];
            g = data[1];
            b = data[2];
            
            console.log(data);
            //addMarker(23, 120);
        }
        function Description_O (data)
        {
            description = data[0];
            console.log(data);
            if((r == temp_r && g == temp_g && b == temp_b) && (lat == temp_lat && lng == temp_lng))
                return;
            else
            {
                temp_r = r;
                temp_b = b;
                temp_g = g;
                temp_lng = lng;
                temp_lat = lat;
            }
            addMarker(lat, lng);

        }
        function EQ_O (data)
        {
            EQ_1 = data[0];
            EQ_2 = data[1];
            console.log(data);
            console.log("data[0]:", data[0]);
            console.log("data[1]:", data[1]);
            addPolyLine(EQ_1, EQ_2);
        }
        function GeoLo_O (data)
        {
            lat = data[0];
            lng = data[1];
            console.log(data);
            console.log("data[0]:", data[0]);
            console.log("data[1]:", data[1]);
            addMarker(lat, lng);
        }

        function changepinImage()
        {
            //console.log('hi');

            pinColor = rgbToHex(r,g,b).toString();
            //console.log(pinColor);
            pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));
            //console.log(pinImage);
        }

        function iot_app(){
            r = 40;
            g = 40;
            b = 40;
            
        }
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        function rgbToHex(r, g, b) {
            return componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        function domUpdater() {
            
            latDom.text(output.lat);
            lngDom.text(output.lng);
            //addMarker(output.lat, output.lng);
            requestAnimationFrame(domUpdater);
        }

        requestAnimationFrame(domUpdater); // Refresh Page

        function addMarker(lat, lng)
        {
console.log("LOL");
            if(lat == 0 && lng == 0)
                return;
            var index;
            index = markers.length;
            var string;
            var _lat = lat;
            var _lng = lng;
            string = '('  + lat + ',' + lng + ')' + '\n';
            //markersDom.append(document.createTextNode(string));
            markersDom.append('<button class=".btn-default delete" value = "'+index+'">'+string+'</button>');
            changepinImage();
            console.log(pinColor);
            var infowindow = new google.maps.InfoWindow(
               {
                   content: description
               });
            var marker = new google.maps.Marker({
                position:{ lat: lat, lng: lng },
                map: map, 
                icon: pinImage,});
            marker.addListener('click', function() {
                               infowindow.open(map, marker);
                               });
            markers.push(marker);

        }
        $(document).on('click', '.delete', function(){
                $(this).remove();
                index = $(this).val();
                markers[index].setMap(null);
            });
        
       function setMapOnAll(map) {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
          }
        }
        function clearMarkers() {
          setMapOnAll(null);
        }
        function deleteMarkers() {
          clearMarkers();
        }

        function moveToLocation(lat, lng, zoom){
            var center = new google.maps.LatLng(lat, lng);
            map.panTo(center);
            map.setZoom(zoom);
        }
        function moveMapCenter() {
            moveToLocation(output.lat , output.lng , 3 );

        } 
        function showPosition(position) {
            output.lat = position.coords.latitude;
            output.lng = position.coords.longitude;
        }

        function iotUpdater() {
            if( navigator.geolocation )
            {
                navigator.geolocation.getCurrentPosition(showPosition);
                //deleteMarkers();
                i = 0;
            }
        
            //if( window.d_name )
            //  IoTtalk.update(mac, 'Geolocation', [output.lat, output.lng]);
            // Don't Understand
            setTimeout(iotUpdater, interval);
            //requestAnimationFrame(domUpdater);

        }

        function findRoot(EQ)
        {
            var root = -1;
            for (root = EQ; parent[root] >= 0; root = parent[root]);
            return root;
        }

        function unionRoot(EQ1, EQ2)
        {
            var totalNode = parent[EQ1] + parent[EQ2];
            if (parent[EQ1] > parent[EQ2]) // w > v , since value is in negative
            {
                parent[EQ2] = totalNode;
                parent[EQ1] = EQ2;
            }
            else
            {
                parent[EQ1] = totalNode;
                parent[EQ2] = EQ1;
            }
        }

        function addPolyLine(EQ1, EQ2){
            
            if(parent.length <= EQ1 + 1)
                parent.length = EQ1 + 1;
            else if(parent.length <= EQ2 + 1)
                parent.length = EQ2 + 1;

            if (parent[EQ1] == undefined || parent[EQ1] == null) 
                parent[EQ1] = -1;
            if (parent[EQ2] == undefined || parent[EQ2] == null) 
                parent[EQ2] = -1;

            var root_EQ1 = findRoot(EQ1);
            var root_EQ2 = findRoot(EQ2);

            if(root_EQ2 == root_EQ1)
                return;
            else
                unionRoot(EQ1, EQ2);

            var polyCoordinates = [];
            for(var i = 0; i < parent.length; i++){
                if(findRoot(parent[i]) == root_EQ1)
                    polyCoordinates.push(markers[i].position);
            }

            var markersLine = new google.maps.Polyline({
                path: polyCoordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
              });

              markersLine.setMap(map);
              //polyCoordinates.length = 0;
        }
        /*$('#id').on('click', function()
            getLocation();
            )
        function getLocation()
        {
            document.getElementById('lat');
            document.getElementById('lng')
        }*/
        setTimeout(iotUpdater, interval); // Will this cause loop?
        //requestAnimationFrame(domUpdater);
        
        /*function detach() {
            window.d_name = null;
            IoTtalk.detach(mac);
        }*/
        /*window.onunload = detach;
        window.onbeforeunload = detach;
        window.onclose = detach;
        window.onpagehide = detach;*/// Didn't use , what's the purpose?
        function QuadTree (points) {
    this.root = null;
    this.size =0;
    for(var i = 0; i < points.length; i++)
         this.add(points[i]);
}
function withinBounds(p, r) {
    return  p.x > r.x1 && p.x < r.x2 && p.y > r.y1 && p.y < r.y2;
}
QuadTree.prototype.queryRectangle = function(bounds) {
    console.log("Root:"+this.root.value[0].getPosition());
    var points = [];
    this.query2D(this.root, bounds, points);
    return points;
};
// This is the problem function
QuadTree.prototype.query2D = function( h,  r, points) {
    if(h==null) return ;
    var ne = r.getNorthEast();
    var sw = r.getSouthWest();

    var xmin = sw.lng();
    var xmax = ne.lng();
    var ymin = ne.lat();
    var ymax = sw.lat();

    var rect = {x1: xmin, x2: xmax, y1: ymax, y2: ymin};
    if(withinBounds(h, rect)) {
        console.log("Found "+h.x+" "+h.y);
        for(var i = 0; i < h.value.length; i++) {
            var p = h.value[i];
            points.push(p);
        }
     }
     if ( (xmin < h.x) &&  (ymin < h.y)){this.query2D(h.SW, r, points);};
     if ( (xmin < h.x) && !(ymax < h.y)){this.query2D(h.NW, r, points);};
     if (!(xmax < h.x) &&  (ymin < h.y)){this.query2D(h.SE, r, points);};
     if (!(xmax < h.x) && !(ymax < h.y)){this.query2D(h.NE, r, points);};
};
// Other functions to make the quadtree work
QuadTree.prototype.add = function(p) {
    this.size++;
    console.log("adding node"+p.getPosition());
    this.root = this.insert(this.root,p);
};
QuadTree.prototype.insert = function insert(h, p) {
    if(h== null) return new QuadTreeNode(p);
    else if ( eq(p,h)) h.value.push(p);
    else if ( lessX(p,h) &&  lessY(p,h)) h.SW = this.insert(h.SW, p);
    else if ( lessX(p,h) && !lessY(p,h)) h.NW = this.insert(h.NW, p);
    else if (!lessX(p,h) &&  lessY(p,h)) h.SE = this.insert(h.SE, p);
    else if (!lessX(p,h) && !lessY(p,h)) h.NE = this.insert(h.NE, p);
    return h;
};
function  lessX( p,  h) {
    return p.getPosition().lat() < h.x;
}
function  lessY( p,  h) {
    return p.getPosition().lng() < h.y;
}
function eq( p,  h) {
    return p.getPosition().lat() == h.x && p.getPosition().lng() == h.y;
}

function QuadTreeNode(point) {
    this.value = [point];
    this.NW = null;
    this.NE = null;
    this.SW = null;
    this.SE = null;
    this.x = point.getPosition().lat();
    this.y = point.getPosition().lng();
}
        var profile = {
            'dm_name': 'BulbModified',
            'odf_list': [GeoLo_O,Color_O, Description_O, EQ_O/*, GeoLo_O*/],
            'idf_list': [GeoLo_I,Color_I, Description_I, EQ_I/*, GeoLo_I*/],
            'origin_odf_list': [GeoLo_O,Color_O, Description_O, EQ_O/*, GeoLo_O*/],
            'origin_idf_list': [GeoLo_I,Color_I, Description_I, EQ_I/*, GeoLo_I*/],
            'is_sim': false,
            'df_list':['GeoLo-O','Color-O', 'Description-O', 'EQ-O'/*, 'GeoLo-O'*/,'GeoLo-I', 'Color-I', 'Description-I', 'EQ-I'/*, 'GeoLo-I'*/],
        }
console.log('call ida la');
        var ida = {
            'iot_app': iot_app,
        }; // How iot device receive data (format)
 console.log('call dai la');
        dai(profile,ida);       
        
});
