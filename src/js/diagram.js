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
            categoryPercentage: 1,
            indexAxis: "y",
            plugins: {
                legend: {
                    display: false
                }
            }
        },
        data: {
            labels: courses.map(row => {
                if (chartType === "bar" && row.name.length > 32) return [[row.name.slice(0,32)], row.name.slice(32)];
                return row.name;
            }),
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

    if (window.matchMedia("(prefers-color-scheme: light").matches) Chart.defaults.color = "black";
}