window.onload = function() {

    const btnOpenMenu = document.getElementById("ic-menu");
    if (btnOpenMenu !== null) {
        btnOpenMenu.addEventListener ('click', function() {
            console.log("Botão do menu clicado");
            const menu_layout = document.getElementById("menu");
            menu_layout.style.display = 'block';
            document.body.style.overflow = 'hidden';
        })
    } 

    const btnOpenMenu1 = document.getElementById("ic-menu1");
    if (btnOpenMenu1 !== null) {
        btnOpenMenu1.addEventListener ('click', function() {
            console.log("Botão do menu clicado");
            const menu_layout = document.getElementById("menu");
            menu_layout.style.display = 'block';
            document.body.style.overflow = 'hidden';
        })
    } 


    
    const btnCloseMenu = document.getElementById("close-menu");
    if (btnCloseMenu !== null) {

        btnCloseMenu.addEventListener('click', function () {
            const menu_layout = document.getElementById("menu");
            menu_layout.style.display = 'none';
            document.body.style.overflow = 'visible';
        })
    }
    
}

//Drop-down

document.querySelectorAll('.dropdown-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (event) {
      event.preventDefault();
      var dropdownMenu = toggle.nextElementSibling; 
      dropdownMenu.classList.toggle('show'); 
    });
  });