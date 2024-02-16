// PURPLE COVER ANIMATION
const animationCover = document.getElementById("cover");
const toggleButton = document.getElementById("toggle");

toggleButton.onclick = () => {
    if (animationCover.classList.contains("cover-left")) animationCover.classList.remove("cover-left");
    else animationCover.classList.add("cover-left");
}

// YELLOW BALL
const yellowBall = document.getElementById("yellow");
const colorCode = document.getElementById("color-code");

yellowBall.onclick = () => {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16)
    yellowBall.style.backgroundColor = color;
    colorCode.style.color = color;
    colorCode.innerHTML = color;
}