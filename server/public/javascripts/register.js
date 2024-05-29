function closeMenu() {
    document.getElementById('menu').style.display = 'none';
  }
  
  document.getElementById("register_alert").addEventListener("click", function (event) {
    event.preventDefault();
    closeMenu(); 
   
    Swal.fire({
    html: `
  <img src="/images/logoAlternativo.svg" alt="logo" width="100" />
  <form id="loginForm" method="POST" class="needs-validation" novalidate autocomplete="off">
    <h1 class="fs-4 card-title fw-bold mb-4">Register</h1>
    <div class="text-center">
      <p>Registe-se no nosso site</p>
    </div>
    <div class="mb-3">
      <input id="email" type="email" class="form-control" name="email" placeholder="Email" required autofocus />
      <div class="invalid-feedback">Por favor, insira um email válido.</div>
    </div>
    <div class="mb-3">
      <input id="password" type="password" class="form-control" name="password" placeholder="Senha" required />
      <div class="invalid-feedback">Por favor, insira uma senha.</div>
    </div>
    <div class="mb-3">
      <input type="password" class="form-control" name="confirm_password" placeholder="Confirme a sua senha" required />
      <div class="invalid-feedback">Por favor, confirme sua senha.</div>
    </div>
    <div class="mb-3">
      <input type="text" class="form-control" name="nacionalidade" placeholder="Nacionalidade" required />
      <div class="invalid-feedback">Por favor, insira sua nacionalidade.</div>
    </div>
    <div class="mb-3">
      <input type="date" class="form-control" name="data_nascimento" placeholder="Data de Nascimento" required />
      <div class="invalid-feedback">Por favor, insira sua data de nascimento.</div>
    </div>
    <div class="mb-3">
      <input type="text" class="form-control" name="endereco" placeholder="Endereço" required />
      <div class="invalid-feedback">Por favor, insira seu endereço.</div>
    </div>
    <div id="textss" class="form-check">
      <input type="checkbox" name="remember" id="remember" class="form-check-input" />
      <label for="remember" class="form-check-label">Sim! Gostaria de receber os principais conteúdos, ofertas especiais e outras atualizações do Lisbon Spots.</label>
    </div>
    <div id="textss" class="text-left">
      <div class="social-text">
        <span class="show-text">Ao criar uma conta, você concorda com nossos</span>
        <span class="show-link"><a href="login.html">Termos de Uso</a></span>
        <span class="show-text"> e reconhece que leu nossa</span>
        <span class="show-link"><a href="login.html">Política de Privacidade</a></span>
      </div>
    </div>
    <div class="text-center">
      <button id="registerButton" type="submit" class="btn d-inline-flex align-items-center justify-content-center">
        Register
      </button>
    </div>
    <div id="textss" class="text-center">
      <span class="show-text">Precisa de ajuda?</span>
      <span class="show-link"><a href="support.html">Visite o nosso suporte</a></span><br />
    </div>
  </form>
  `,
        showConfirmButton: false,
        focusConfirm: false,
    });
  
    document
        .getElementById("registerButton")
        .addEventListener("click", function () {
            if (document.getElementById("loginForm").checkValidity()) {
                Swal.fire({
                    icon: "success",
                    title: "Register Successful!",
                    text: "Welcome to LisbonSpots!",
                    confirmButtonText: "Continue",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "../html/home.html";
                    }
                });
            }
        });
  });