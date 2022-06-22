function handle(event) {
    document.getElementById("show").innerText = Math.round(event.alpha)
    console.log(event)
}

if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response == 'granted') {
                window.addEventListener('deviceorientation', handle)
            }
        })
        .catch(console.error)
} else {
    window.addEventListener("deviceorientation", handle)
}