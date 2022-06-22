window.addEventListener("deviceorientation", (event) => {
    document.getElementById("show").innerText = event.alpha
})