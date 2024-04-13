/*const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

document.addEventListener('DOMContentLoaded', function () {
  const hamMenu = document.querySelector('.ham-menu');
  const offScreenMenu = document.querySelector('.off-screen-menu');
  const closeButton = document.querySelector('.close-button');

  hamMenu.addEventListener('click', function () {
    offScreenMenu.classList.toggle('active');
  });

  closeButton.addEventListener('click', function () {
    offScreenMenu.classList.remove('active');
  });
});

const closeButton = document.querySelector(".close-button");

closeButton.addEventListener("click", () => {
  hamMenu.classList.remove("active");
  offScreenMenu.classList.remove("active");
});


document.addEventListener('DOMContentLoaded', function () {
  const categoryToggle = document.getElementById('category-toggle');
  const categoryList = document.getElementById('category-list');

  categoryToggle.addEventListener('click', function () {
    categoryList.classList.toggle('active');
  });
});



function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}*/

document.addEventListener('DOMContentLoaded', function () {
    const hamMenu = document.querySelector('.ham-menu');
    const offScreenMenu = document.querySelector('.off-screen-menu');
    const categoryToggle = document.getElementById('category-toggle');
    const categoryList = document.getElementById('category-list');
  
    hamMenu.addEventListener('click', function () {
      hamMenu.classList.toggle('active');
      offScreenMenu.classList.toggle('active');
    });
  
    categoryToggle.addEventListener('click', function () {
      categoryList.classList.toggle('active');
    });
  
    // Close the off-screen menu when clicking outside
    window.addEventListener('click', function(event) {
      if (!event.target.closest('.off-screen-menu') && !event.target.closest('.ham-menu')) {
        hamMenu.classList.remove('active');
        offScreenMenu.classList.remove('active');
      }
      if (!event.target.closest('.dropdown')) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(function(dropdown) {
          dropdown.classList.remove('show');
        });
      }
    });
  });
  
  
  /* local storage -> array */