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