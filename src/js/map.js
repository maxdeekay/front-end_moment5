"use strict";

window.onload = async () => {
    // default position set to Stockholm
    const position = { lat: 59.3293, lng: 18.0686 };

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const map = new Map(document.getElementById("map"), {
        zoom: 10,
        center: position,
        mapId: "MAP_ID",
    });

    const marker = new AdvancedMarkerElement({
        map,
        position: position,
        title: "Stockholm",
    });
    
    // search and de-focus input with enter
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            search(map, marker, searchInput.value);
            searchInput.blur();
        }
    });

    // search with button 
    document.getElementById("search-button").onclick = () => {
        search(map, marker, document.getElementById("search-input").value);
    }

    // user position
    document.getElementById("user-position").onclick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                position.lat = position.coords.latitude;
                position.lng = position.coords.longitude;
                
                map.setCenter(position);
                marker.position = position;
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