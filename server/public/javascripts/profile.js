document.getElementById("profile_alert").addEventListener("click", function (event) {
    event.preventDefault();    
    Swal.fire({
       html: `
    
 <img src="../img/100x100.png" alt="logo" width="100" />
   <h1
         class="fs-4 card-title fw-bold mb-4"
         style="font-size: 60px; text-align: center"
       >
         Gerencie a sua conta do Lisbon Spots
       </h1>
       <div class="text-center" style="font-size: 20px">
         <p>Informação da Conta</p>
       </div>
       <form
         id="loginForm"
         method="POST"
         class="needs-validation"
         novalidate
         autocomplete="off"
       >
         <div class="mb-3">
           <!--<span class="info-text text-start">Email</span>-->
           <input
             id="email"
             class="form-control placeholder"
             name="email"
             readonly
             placeholder="Email"
           />
           <div class="invalid-feedback">
             Por favor, insira um email válido.
           </div>
         </div>

         <div class="mb-3">
           <!--<span class="info-text text-start">Senha</span>-->
           <input
             id="password"
             class="form-control placeholder"
             name="password"
             readonly
             placeholder="Senha"
           />
           <div class="invalid-feedback">
             Por favor, insira uma senha.
           </div>
         </div>

         <h1
           id="profileheading"
           class="fs-4 card-title fw-bold mb-4"
         >
           Personal Information
         </h1>

         <div class="mb-3">
           <!--<span class="info-text text-start">Nome </span>-->
           <input
             class="form-control placeholder B"
             name="name"
             readonly
             placeholder="Nome"
           />
           <div class="invalid-feedback">
             Por favor, confirme sua senha.
           </div>
         </div>

         <div class="mb-3">
           <!--<span class="info-text text-start">Nacionalidade </span>-->
           <input
             class="form-control placeholder B"
             name="nacionalidade"
             readonly
             placeholder="Nacionalidade"
           />
           <div class="invalid-feedback">
             Por favor, insira sua nacionalidade.
           </div>
         </div>

         <div class="mb-3">
           <!--<span class="info-text text-start">Data de Nascimento </span>-->
           <input
             class="form-control placeholder B"
             name="data_nascimento"
             readonly
             placeholder="Data de Nascimento"
           />
           <div class="invalid-feedback">
             Por favor, insira sua data de nascimento.
           </div>
         </div>

         <div class="mb-3">
           <!--<span class="info-text text-start">Endereço </span>-->
           <input
             class="form-control placeholder B"
             name="endereco"
             readonly
             placeholder="Endereço"
           />
           <div class="invalid-feedback">
             Por favor, insira seu endereço.
           </div>
         </div>

         <div class="text-center">
           <button
             id="logout"
             type="submit"
             class="btn d-inline-flex align-items-center justify-content-center"
           >
             Terminar Sessão
           </button>
         </div>

         <div
           id="textss"
           class="text-center"
         >
           <span class="show-text">Deseja excluir a sua conta? </span>




           <!--<span class="show-link"
             ><a href="support.html">Excluir</a></span
           >-->

           <span class="show-link text-primary" id="open_delete_alert">Excluir</span>
         </div>
   </form>
 `,
   showConfirmButton: false,
   focusConfirm: false,
 });
 document
   .getElementById("logout")
   .addEventListener("click", function () {
     if (document.getElementById("loginForm").checkValidity()) {
       Swal.fire({
         icon: "success",
         title: "Logout Successful!",
         text: "See you soon!",
         confirmButtonText: "Continue",
       }).then((result) => {
         if (result.isConfirmed) {
           window.location.href = "../html/home.html";
         }
       });
     }
   });




   document
       .getElementById("open_delete_alert")
       .addEventListener("click", function () {
         Swal.fire({
          title: "Tem Certeza?",
           html: `
   <div class="container">
     <div class="row">
       <div class="col-md-6">
         <h4 class="small-text">
           Ao excluir a sua conta, você não poderá fazer mais login
           no Lisbon Spots e perderá todos os seus privilégios.
           Precisa de ajuda?
           <a href="../html/support.html">Visite ao nosso suporte</a>
         </h4>
         <button
           id="confirmDeleteButton"
           class="btn btn-block"
         >
           Sim, excluir Conta
         </button>
         <button
           id="cancelDeleteButton"
           class="btn btn-block mt-3"
         >
           Não, permanecer com a conta
         </button>
       </div>
       <div class="col-md-6">
         <img
           class="imagedel"
           src="../img/boywithquestionmark.png"
           width="auto"
           height="200"
           style="padding-left: 20px"
         />
       </div>
     </div>
   </div>
 `,
       showConfirmButton: false,
       showCancelButton: false,
       //showCloseButton: true,
       focusConfirm: false,
       //customClass: {
       //  closeButton: "cross-circle",
       //},
     });

     document
       .getElementById("confirmDeleteButton")
       .addEventListener("click", function () {
         Swal.fire({
           html: `
     <div class="container">
       <div class="row">
         <div class="col-md-6">
           <h1 class="text-left mb-4" style= "font-size:30px; padding-top:0px; font-weight:600;">Conta excluída</h1>
           <div class="row justify-content-center align-items-center">
             <div class="col-md-9"> 
               <div class="left-aligned">
                 <div>
                   <h4 class="small-text" style="padding-top: 10px; padding-right: 10px; width: 130%"> 
                     A sua conta foi excluída. Se isso foi feito por engano
                     ou se você tiver alguma dúvida,
                     <a href="../html/support.html"
                       >Visite o nosso suporte</a
                     >
                   </h4>
                 </div>
               </div>
             </div>
             <div class="col-md-2"> 
               <img
                 class="imagedel"
                 src="../img/delete.png"
                 width="220"
                 height="auto"
                 style="padding-left: 20px"
               />
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

     document
       .getElementById("cancelDeleteButton")
       .addEventListener("click", function () {
         Swal.close();
       });
   });



});