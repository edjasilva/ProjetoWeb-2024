function closeMenu() {
    document.getElementById('menu').style.display = 'none';
  }
  
  document.getElementById("delete_alert").addEventListener("click", function (event) {
    event.preventDefault();
    closeMenu();
  
    Swal.fire({
        title: "Tem Certeza?",
        html: `
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <h4 id="text_delete" class="small-text">
                            Ao excluir a sua conta, você não poderá fazer mais login no Lisbon Spots e perderá todos os seus privilégios. Precisa de ajuda?
                            <a href="../html/support.html">Visite ao nosso suporte</a>
                        </h4>
                        <button id="confirmDeleteButton" class="btn btn-block">Sim, excluir Conta</button>
                        <button id="cancelDeleteButton" class="btn btn-block mt-3">Não, permanecer com a conta</button>
                    </div>
                    <div class="col-md-6">
                        <img class="imagedel" src="/images/deleteBoy.png" width="auto" height="200" />
                    </div>
                </div>
            </div>
        `,
        showConfirmButton: false,
        showCancelButton: false,
        focusConfirm: false,
    });
  
    document.getElementById("confirmDeleteButton").addEventListener("click", function () {
        Swal.fire({
            title: "Conta excluída",
            html: `
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-md-9">
                                    <div class="left-aligned">
                                        <div>
                                            <h4 id="text_delete" class="small-text">
                                                A sua conta foi excluída. Se isso foi feito por engano ou se você tiver alguma dúvida,
                                                <a href="../html/support.html">Visite o nosso suporte</a>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <img class="imagedel" src="/images/deleteBoy2.png" width="220" height="auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            focusConfirm: false,
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
        });
    });
  
    document.getElementById("cancelDeleteButton").addEventListener("click", function () {
        Swal.close();
    });
  });