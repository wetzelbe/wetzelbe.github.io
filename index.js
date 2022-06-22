function handle(event) {
    document.getElementById("show").innerText = Math.round(event.alpha)
    console.log(event)
}

if (typeof window.DeviceOrientationEvent.requestPermission === 'function') {
    console.log("Device is iOS 13+")
    window.DeviceOrientationEvent.requestPermission()
        .then(response => {
            console.log("Request Permission: ")
            console.log(response)
            if (response == 'granted') {
                window.addEventListener('deviceorientation', handle)
            }
        })
        .catch(console.error)
} else {
    console.log("Not iOS")
    window.addEventListener("deviceorientation", handle)
}