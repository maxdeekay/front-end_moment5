"use strict";
// GOOGLE API KEY
// AIzaSyDepr514y6-2HX0TFZd-ECtzxHJ-D8Cjgg

async function initMap() {
    let uluru = {lat: -25.344, lng: 131.036};
    let map = new google.maps.Map(
        document.getElementById("map"), {zoom: 4, center: uluru}
    );
    let marker = new google.maps.Marker({position: uluru, map: map});
}

function test() {
    console.log("FUNKAR");
}