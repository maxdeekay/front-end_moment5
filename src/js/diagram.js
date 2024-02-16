"use strict";
import Chart from "chart.js/auto";

window.onload = async () => {
    const url = "https://studenter.miun.se/~mallar/dt211g/";
    const response = await fetch(url);

    if (response.ok) {
        let data = await response.json();
        
        drawBarChart(data);
    } else {
        console.log("ERROR: " + response.statusText);
    }
}

function drawBarChart(data) {
    const courses = data.filter(course => course.type === "Kurs").sort((a, b) => b.applicantsTotal - a.applicantsTotal).slice(0, 6);
    
    Chart.defaults.font.size = 16;
    Chart.defaults.color = "white";

    new Chart(
    document.getElementById("bar-chart"),
    {
        type: "bar",
        options: {
            indexAxis: "y",
            plugins: {
                legend: {
                    display: false
                }
            }
        },
        data: {
            labels: courses.map(row => row.name),
            datasets: [
                {
                    data: courses.map(row => row.applicantsTotal),
                }
            ]
        }
    }
    );
}