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


window.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('carousel');
  const items = carousel.querySelectorAll('.item');
  const numItems = items.length;
  const cloneCount = 2; // Number of clones to add on each end (adjust as needed)
  
  // Clone items and append/prepend to carousel
  for (let i = 0; i < cloneCount; i++) {
      carousel.appendChild(items[i].cloneNode(true)); // Clone and append to end
      carousel.insertBefore(items[numItems - 1 - i].cloneNode(true), items[0]); // Clone and prepend to beginning
  }

  carousel.addEventListener('scroll', function() {
      const scrollWidth = carousel.scrollWidth;
      const scrollLeft = carousel.scrollLeft;
      const clientWidth = carousel.clientWidth;
      
      // If scrolled all the way to the right, reset scroll position
      if (scrollLeft >= scrollWidth - clientWidth) {
          carousel.scrollLeft = clientWidth;
      }
      
      // If scrolled all the way to the left, reset scroll position
      if (scrollLeft === 0) {
          carousel.scrollLeft = scrollWidth - clientWidth * 2;
      }
  });
});



//SLIDES

new Splide( '#splide', {
  type   : 'loop',
  perMove: 1,
  perPage: 3,
  autoplay: true,
  pauseOnHover: false,
  pauseOnFocus: false,
  gap: '20px',
  interval: '0',
  speed: '4800',
  easing: 'linear',
  } ).mount();


  const stagger = anime({
    targets: '.splide__slide',
    translateY: [160,0],
    opacity: [0,1],
    delay: anime.stagger(120),
    duration: 800,
    easing: 'easeInOutQuad',
    })

    $('a.link').click(function(e) {
      e.preventDefault();
      var linkUrl = $(this).attr('href');
      setTimeout(function(url) { window.location = url; }, 800, linkUrl);
      });
