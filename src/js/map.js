"use strict";
// GOOGLE API KEY
// AIzaSyDepr514y6-2HX0TFZd-ECtzxHJ-D8Cjgg

window.onload = async () => {
    const stockholm = { lat: 59.3293, lng: 18.0686 };

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const map = new Map(document.getElementById("map"), {
        zoom: 10,
        center: stockholm,
        mapId: "MAP_ID",
    });

    const marker = new AdvancedMarkerElement({
        map,
        position: stockholm,
        title: "Stockholm",
    });
    
    document.getElementById("search-button").onclick = () => {
        search(map, marker, document.getElementById("search-input").value);
    }

    document.getElementById("user-position").onclick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                stockholm.lat = position.coords.latitude;
                stockholm.lng = position.coords.longitude;
                
                map.setCenter(stockholm);
                marker.position = stockholm;
                marker.title = "Din position";
            });
        }
    }
}

async function search(map, marker, searchInput) {
    let request = {
        query: searchInput,
        fields: ["name", "geometry"]
    };

    const { PlacesService } = await google.maps.importLibrary("places");
    const service = new PlacesService(map);

    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            marker.position = results[0].geometry.location;
            marker.title = request.query;
            map.setCenter(results[0].geometry.location);
        } else {
            console.log("ERROR: " + status);
        }
    } );
}