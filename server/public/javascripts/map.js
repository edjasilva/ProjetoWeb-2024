document.addEventListener('DOMContentLoaded', function () {
    let map = L.map('map',
        {
            attributionControl: false,
        }
    ).setView([38.72, -9.14], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);



    document.querySelectorAll('.map-pin').forEach(function (pin) {
            let lat = pin.getAttribute('lat');
            let lon = pin.getAttribute('lon');
            console.log(lat, lon);
            map.setView([lat, lon], 16);
            L.marker([lat, lon]).addTo(map);

    });
});