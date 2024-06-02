
document.addEventListener('DOMContentLoaded', function () {
    let map = L.map('map', {
        attributionControl: false,
    }).setView([38.72, -9.14], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    map.locate({setView: true, maxZoom: 16});
    

    document.querySelectorAll('.map-pin').forEach(function (pin) {
        let lat = pin.getAttribute('lat');
        let lon = pin.getAttribute('lon');
        let name = pin.getAttribute('name');
        let rating = pin.getAttribute('rating');
        let street =pin.getAttribute('street')
        let zipcode =pin.getAttribute('zipcode')
        let image = pin.getAttribute('image');
   
        
        let popup = `
        <div class="popup">
            <p class= "name">${name}</p>
            <img class=" rounded-3 mx-auto spot-img " src="/images/comm/Hotel/TheIvens/Ivens1.png" alt=""> 
            <p  >Avaliação: <b>${rating}</b>  <br>Código Postal: <b>${zipcode}</b> </p>
            <a href="/spots-Com?lat=${lat}&lon=${lon}" class="btn-details">Detalhes</a>
        </div>
        `;

       L.marker([lat, lon]).addTo(map)
            .bindPopup(popup);

    });
});
