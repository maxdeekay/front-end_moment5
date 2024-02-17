"use strict";
import Chart from "chart.js/auto";

window.onload = async () => {
    const url = "https://studenter.miun.se/~mallar/dt211g/";
    const response = await fetch(url);

    chartStyling();

    if (response.ok) {
        let data = await response.json();
        
        drawChart(filterCourses(data, "Kurs", 6), "bar");
        drawChart(filterCourses(data, "Program", 5), "pie");
    } else {
        console.log("ERROR: " + response.statusText);
    }
}

function drawChart(courses, chartType) {    
    new Chart(
    document.getElementById(chartType),
    {
        type: chartType,
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

function filterCourses(data, type, length) {
    return data.filter(course => course.type === type).sort((a, b) => b.applicantsTotal - a.applicantsTotal).slice(0, length);
}

function chartStyling() {
    Chart.defaults.font.size = 16;
    Chart.defaults.color = "white";
}