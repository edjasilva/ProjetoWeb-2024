const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

/*document.addEventListener('DOMContentLoaded', function () {
  const hamMenu = document.querySelector('.ham-menu');
  const offScreenMenu = document.querySelector('.off-screen-menu');
  const closeButton = document.querySelector('.close-button');

  hamMenu.addEventListener('click', function () {
    offScreenMenu.classList.toggle('active');
  });

  closeButton.addEventListener('click', function () {
    offScreenMenu.classList.remove('active');
  });
});*/