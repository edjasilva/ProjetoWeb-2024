/*const places = [
    { name: "Place 1", address: "Address 1", link: "page1.html" },
    { name: "Place 2", address: "Address 2", link: "page2.html" },
    { name: "Place 3", address: "Address 3", link: "page1.html" },
    { name: "Place 4", address: "Address 4", link: "page2.html" },
    { name: "Place 5", address: "Address 5", link: "page1.html" },
    { name: "Place 6", address: "Address 6", link: "page2.html" },
    { name: "Place 7", address: "Address 7", link: "page1.html" },
    { name: "Place 8", address: "Address 8", link: "page2.html" },
    { name: "Place 9", address: "Address 9", link: "page1.html" },
    { name: "Place 10", address: "Address 10", link: "page2.html" },
    { name: "Place 11", address: "Address ", link: "page1.html" },
    { name: "Place 12", address: "Address 2", link: "page2.html" },
    { name: "Place 13", address: "Address 1", link: "page1.html" },
    { name: "Place 14", address: "Address 2", link: "page2.html" },
    { name: "Place 15", address: "Address 1", link: "page1.html" },
    { name: "Place 16", address: "Address 2", link: "page2.html" },
    { name: "Place 17", address: "Address 1", link: "page1.html" },
    { name: "Place 18", address: "Address 2", link: "page2.html" },
    { name: "Place 19", address: "Address 1", link: "page1.html" },
    { name: "Place 20", address: "Address 2", link: "page2.html" },
    { name: "Place 21", address: "Address 1", link: "page1.html" },
    { name: "Place 22", address: "Address 2", link: "page2.html" },
    { name: "Place 23", address: "Address 1", link: "page1.html" },
    { name: "Place 24", address: "Address 2", link: "page2.html" },
    
  ];
  
  function initPlaces() {
    const placesContainer = document.querySelector(".places-container");
  
    places.forEach(place => {
      const placeContainer = document.createElement("div");
      placeContainer.classList.add("place");
  
      const placeText = document.createElement("div");
      placeText.classList.add("place-text");
  
      const nameHeading = document.createElement("h2");
      nameHeading.textContent = place.name;
  
      const addressParagraph = document.createElement("p");
      addressParagraph.classList.add("address");
      addressParagraph.textContent = place.address;
  

      const button = document.createElement("button");
      button.classList.add("button");
      button.textContent = "Saber mais";
      button.addEventListener("click", function() {
        window.location.href = place.link;
      });
  
      placeText.appendChild(nameHeading);
      placeText.appendChild(addressParagraph);
      placeText.appendChild(button);
  
      placeContainer.appendChild(placeText);
  
      
      const placeImage = document.createElement("img");
      placeImage.src = `../img/${place.name.toLowerCase().replace(" ", "-")}.png`; 
      placeImage.alt = place.name;
      placeImage.classList.add("place-image");
      placeContainer.appendChild(placeImage);
  
      
      placesContainer.appendChild(placeContainer);
    });
  }
  
  initPlaces();
  */

 /* const divElement = document.querySelector('hotel'); // Replace 'div' with the ID or class of your actual div element

divElement.addEventListener('click', function() {
  window.location.href = "../html/commercial.html"; // Replace 'https://www.example.com' with the URL of your desired page
});*/