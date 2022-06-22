function handle(event) {

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
